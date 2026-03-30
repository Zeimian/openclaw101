import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// 下载文件保存目录
const DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');

// 确保下载目录存在
function ensureDownloadsDir() {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  }
}

// 从 URL 下载文件
async function downloadFromUrl(url: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ensureDownloadsDir();
    const filePath = path.join(DOWNLOADS_DIR, filename);
    const file = fs.createWriteStream(filePath);
    
    const client = url.startsWith('https://') ? https : http;
    
    const request = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(filePath);
          downloadFromUrl(redirectUrl, filename).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filePath);
        reject(new Error(`HTTP ${response.statusCode}: Failed to download ${url}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filePath);
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      reject(err);
    });
    
    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      reject(err);
    });
  });
}

// 从裁判文书网 API 获取判决书内容
async function fetchFromCourt(docId: string): Promise<{ content: string; filename: string }> {
  // 裁判文书网 