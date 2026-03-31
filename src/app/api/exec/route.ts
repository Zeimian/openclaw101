import { NextRequest } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

// ─── 类型定义 ─────────────────────────────────────────────
interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

interface AgentStep {
  type: 'thought' | 'tool_call' | 'tool_result' | 'final_answer';
  content: string;
  tool?: string;
  input?: Record<string, unknown>;
  output?: string;
}

// ─── 内置工具定义 ────────────────────────────────────────────
const TOOLS: Tool[] = [
  {
    name: 'download_file',
    description: '从指定URL下载文件并保存到服务器，返回文件的本地访问路径',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string', description: '要下载的文件URL' },
        filename: { type: 'string', description: '保存的文件名（可选，默认从URL提取）' },
      },
      required: ['url'],
    },
  },
  {
    name: 'fetch_webpage',
    description: '获取网页内容（纯文本）',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string', description: '要获取的网页URL' },
      },
      required: ['url'],
    },
  },
  {
    name: 'list_downloads',
    description: '列出已下载的文件',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];

// ─── 工具执行函数 ──────────────────────────────────────────────
async function executeDownloadFile(url: string, filename?: string): Promise<string> {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // 提取文件名
  let fname = filename;
  if (!fname) {
    try {
      const parsed = new URL(url);
      fname = path.basename(parsed.pathname) || `download_${Date.now()}`;
    } catch {
      fname = `download_${Date.now()}`;
    }
  }

  // 确保文件名安全
  fname = fname.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = path.join(downloadsDir, fname);

  // 下载文件
  await new Promise<void>((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filePath);

    const handleRedirect = (redirectUrl: string) => {
      file.close();
      executeDownloadFile(redirectUrl, fname).then(() => resolve()).catch(reject);
    };

    const request = protocol.get(url, (response) => {
      // 处理重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          handleRedirect(redirectUrl);
          return;
        }
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('下载超时（30秒）'));
    });
  });

  const stats = fs.statSync(filePath);
  return JSON.stringify({
    success: true,
    filename: fname,
    path: `/downloads/${fname}`,
    size: `${(stats.size / 1024).toFixed(2)} KB`,
    message: `文件已成功保存到 /downloads/${fname}`,
  });
}

async function executeFetchWebpage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; OpenClaw-Bot/1.0)',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    const html = await response.text();
    // 简单提取文本内容（去除HTML标签）
    const text = html
      .replace(/<script[^>]*>.*?<\/script>/gsi, '')
      .replace(/<style[^>]*>.*?<\/style>/gsi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 3000);
    return `网页内容（前3000字符）：\n${text}`;
  } else {
    const text = await response.text();
    return text.slice(0, 3000);
  }
}

async function executeListDownloads(): Promise<string> {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    return JSON.stringify({ files: [], message: '下载目录为空' });
  }

  const files = fs.readdirSync(downloadsDir).map((fname) => {
    const fpath = path.join(downloadsDir, fname);
    const stats = fs.statSync(fpath);
    return {
      name: fname,
      path: `/downloads/${fname}`,
      size: `${(stats.size / 1024).toFixed(2)} KB`,
      modified: stats.mtime.toISOString(),
    };
  });

  return JSON.stringify({ files, total: files.length });
}

async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  switch (name) {
    case 'download_file':
      return executeDownloadFile(input.url as string, input.filename as string | undefined);
    case 'fetch_webpage':
      return executeFetchWebpage(input.url as string);
    case 'list_downloads':
      return executeListDownloads();
    default:
      throw new Error(`未知工具: ${name}`);
  }
}

// ─── 调用大模型（带工具） ────────────────────────────────────────
async function callLLM(
  messages: Array<{ role: string; content: string }>,
  tools: Tool[]
): Promise<{ content: string; tool_calls?: Array<{ name: string; arguments: Record<string, unknown> }> }> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.LLM_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    // 模拟模式（无API Key时）
    return simulateLLM(messages, tools);
  