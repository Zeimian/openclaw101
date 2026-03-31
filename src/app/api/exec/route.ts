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


// ─── 模拟 LLM（无 API Key 时） ────────────────────────────────────────
function simulateLLM(
  messages: Array<{ role: string; content: string }>,
  tools: Tool[]
): { content: string; tool_calls?: Array<{ name: string; arguments: Record<string, unknown> }> } {
  const lastMessage = messages[messages.length - 1];
  const userContent = lastMessage?.content || '';

  if (userContent.includes('下载') || userContent.includes('download')) {
    return {
      content: '我来帮你下载文件。',
      tool_calls: [{ name: 'download_file', arguments: { url: 'https://example.com/file.pdf' } }],
    };
  }

  if (userContent.includes('网页') || userContent.includes('fetch')) {
    return {
      content: '我来获取网页内容。',
      tool_calls: [{ name: 'fetch_webpage', arguments: { url: 'https://example.com' } }],
    };
  }

  if (userContent.includes('列表') || userContent.includes('list')) {
    return {
      content: '我来列出已下载的文件。',
      tool_calls: [{ name: 'list_downloads', arguments: {} }],
    };
  }

  return {
    content: '你好！我是一个 AI 助手，可以帮你下载文件、获取网页内容或列出已下载的文件。',
  };
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
    }

  // 实际调用 LLM API（简化版本）
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        tools: tools.map(t => ({ type: 'function', function: t })),
        tool_choice: 'auto',
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API 错误：${response.status}`);
    }

    const data = await response.json();
    const choice = data.choices[0];
    const message = choice.message;

    return {
      content: message.content || '',
      tool_calls: message.tool_calls?.map((tc: any) => ({
        name: tc.function.name,
        arguments: JSON.parse(tc.function.arguments),
      })),
    };
  } catch (error: any) {
    console.error('LLM 调用失败:', error);
    return {
      content: `LLM 调用失败：${error.message}`,
    };
  }
}

// ─── Agent 执行循环 ──────────────────────────────────────────────
async function runAgentLoop(
  messages: Array<{ role: string; content: string }>,
  tools: Tool[],
  maxSteps = 5
): Promise<AgentStep[]> {
  const steps: AgentStep[] = [];
  const conversation = [...messages];

  for (let step = 0; step < maxSteps; step++) {
    const llmResult = await callLLM(conversation, tools);
    
    steps.push({ type: 'thought', content: llmResult.content });

    if (!llmResult.tool_calls || llmResult.tool_calls.length === 0) {
      steps.push({ type: 'final_answer', content: llmResult.content });
      break;
    }

    for (const toolCall of llmResult.tool_calls) {
      steps.push({
        type: 'tool_call',
        content: `调用工具：${toolCall.name}`,
        tool: toolCall.name,
        input: toolCall.arguments,
      });

      try {
        const result = await executeTool(toolCall.name, toolCall.arguments);
        steps.push({
          type: 'tool_result',
          content: '工具执行成功',
          tool: toolCall.name,
          output: result,
        });

        conversation.push({ role: 'assistant', content: llmResult.content });
        conversation.push({ role: 'tool', content: result } as any);
      } catch (error: any) {
        steps.push({
          type: 'tool_result',
          content: `工具执行失败：${error.message}`,
          tool: toolCall.name,
          output: error.message,
        });
      }
    }
  }

  return steps;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages = [] } = body;

    const steps = await runAgentLoop(messages, TOOLS);
    const finalAnswer = steps.find(s => s.type === 'final_answer');

    return Response.json({
      success: true,
      steps,
      answer: finalAnswer?.content || '未能生成答案',
    });
  } catch (error: any) {
    console.error('执行失败:', error);
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
