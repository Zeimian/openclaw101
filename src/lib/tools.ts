// Tool definitions for the agent
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

// Downloads directory (public/downloads for serving)
const DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

/** OpenAI tool definitions */
export const TOOL_DEFINITIONS = [
  {
    type: 'function' as const,
    function: {
      name: 'download_file',
      description:
        'Download a file from a URL and save it to the downloads folder. Returns the local path of the downloaded file.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of the file to download',
          },
          filename: {
            type: 'string',
            description:
              'Optional filename to save as. If not provided, the filename will be inferred from the URL.',
          },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_downloads',
      description: 'List all files in the downloads folder.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'read_file',
      description:
        'Read the content of a downloaded text file.',
      parameters: {
        type: 'object',
        properties: {
          filename: {
            type: 'string',
            description: 'The filename to read (from downloads folder)',
          },
        },
        required: ['filename'],
      },
    },
  },
];

/** Execute a tool call and return the result */
export async function executeTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (name) {
    case 'download_file':
      return await downloadFile(
        args.url as string,
        args.filename as string | undefined
      );
    case 'list_downloads':
      return listDownloads();
    case 'read_file':
      return readDownloadedFile(args.filename as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

/** Download a file from a URL */
async function downloadFile(
  url: string,
  filename?: string
): Promise<string> {
  // Validate URL
    let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  // Determine filename
  const fname = filename || path.basename(parsedUrl.pathname) || `download_${Date.now()}`;
  const filePath = path.join(DOWNLOADS_DIR, fname);
  const file = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const handleRedirect = (redirectUrl: string) => {
      file.close();
      downloadFile(redirectUrl, fname).then(resolve).catch(reject);
    };

    const request = protocol.get(url, (response) => {
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
        reject(new Error(`HTTP ${response.statusCode}: Failed to download ${url}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/downloads/${fname}`);
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Download timed out'));
    });
  });
}

/** List all files in the downloads folder */
function listDownloads(): string {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    return JSON.stringify({ files: [], message: 'Downloads folder is empty' });
  }

  const files = fs.readdirSync(DOWNLOADS_DIR).map((fname) => {
    const fpath = path.join(DOWNLOADS_DIR, fname);
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

/** Read the content of a downloaded text file */
function readDownloadedFile(filename: string): string {
  const filePath = path.join(DOWNLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filename}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return content.slice(0, 5000);
}
