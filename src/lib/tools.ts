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
  