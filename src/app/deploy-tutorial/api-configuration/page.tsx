import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Configuration Guide | OpenClaw Deployment Tutorial',
  description: 'Detailed guide on configuring API keys and authentication for your OpenClaw instance.',
  alternates: {
    canonical: 'https://openclaw101.dev/deploy-tutorial/api-configuration',
  },
};

export default function ApiConfigurationGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            API Configuration Guide
          </h1>
          
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Configuring API Keys for OpenClaw</h2>
            
            <p className="text-gray-300 mb-6">
              Proper API configuration is crucial for OpenClaw to interact with various AI models and services. 
              This guide covers setting up different API providers and managing your credentials securely.
            </p>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Supported API Providers</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">OpenAI</h4>
                    <p className="text-gray-400 text-sm">GPT-4, GPT-3.5, and other OpenAI models</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Aliyun Bailian</h4>
                    <p className="text-gray-400 text-sm">Qwen and other Alibaba Cloud models</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Anthropic</h4>
                    <p className="text-gray-400 text-sm">Claude models</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Custom Models</h4>
                    <p className="text-gray-400 text-sm">Self-hosted or third-party models</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Creating the Configuration File</h3>
                
                <p className="text-gray-300 mb-4">
                  In your OpenClaw project directory, create a <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">.env</code> file:
                </p>
                
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-green-400">
{`# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ORGANIZATION=your_organization_id (optional)
OPENAI_PROJECT=your_project_id (optional)

# Model Configuration
OPENAI_MODEL=gpt-4
ALT_OPENAI_API_BASE=https://api.openai.com/v1 (for custom endpoints)

# Aliyun Bailian Configuration
ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
BAILIAN_ENDPOINT=https://dashscope.aliyuncs.com/api/v1

# Anthropic Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-opus-20240229

# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# Database Configuration (if using database)
DATABASE_URL=your_database_url_here

# Additional Service Keys
# Add other service keys as needed`}
                </pre>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Environment Configuration</h3>
                
                <p className="text-gray-300 mb-4">
                  You can also create different environment files for different deployment stages:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li><code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">.env.development</code> - For development environment</li>
                  <li><code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">.env.production</code> - For production environment</li>
                  <li><code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">.env.test</code> - For testing environment</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Configuring in Code</h3>
                
                <p className="text-gray-300 mb-4">
                  You can also configure API settings in your OpenClaw configuration file:
                </p>
                
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-green-400">
{`// config.js or config.ts
module.exports = {
  api: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
      model: process.env.OPENAI_MODEL || 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
    },
    bailian: {
      accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
      endpoint: process.env.BAILIAN_ENDPOINT || 'https://dashscope.aliyuncs.com/api/v1',
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.ANTHROPIC_MODEL || 'claude-3-opus-20240229',
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  }
};`}
                </pre>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Testing API Connections</h3>
                
                <p className="text-gray-300 mb-4">
                  After configuring your API keys, test the connection:
                </p>
                
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-green-400">
{`# Test OpenAI connection
curl -X POST https://api.openai.com/v1/chat/completions \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Test Bailian connection (using curl)
curl -X POST https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation \\
  -H "Authorization: Bearer $BAILIAN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "qwen-max",
    "input": {
      "messages": [{"role": "user", "content": "Hello!"}]
    }
  }'`}
                </pre>
              </section>
            </div>
            
            <div className="mt-8 p-6 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="text-lg font-semibold text-blue-300 mb-2">Security Best Practices</h4>
              <ul className="list-disc pl-6 space-y-2 text-blue-200 text-sm">
                <li>Never commit <code className="bg-blue-900/50 px-1 rounded text-yellow-300">.env</code> files to version control</li>
                <li>Ensure your <code className="bg-blue-900/50 px-1 rounded text-yellow-300">.gitignore</code> includes <code className="bg-blue-900/50 px-1 rounded text-yellow-300">.env*</code></li>
                <li>Use different API keys for development and production environments</li>
                <li>Regularly rotate your API keys to maintain security</li>
                <li>Monitor API usage to detect unusual activity</li>
                <li>Implement rate limiting to prevent excessive API calls</li>
              </ul>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a 
                href="/deploy-tutorial/aliyun-bailian" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Aliyun Bailian Setup
              </a>
              <a 
                href="/deploy-tutorial/steps/3" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Back to Step 3
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}