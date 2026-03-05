import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aliyun Bailian API Setup Guide | OpenClaw Deployment Tutorial',
  description: 'Learn how to register for Aliyun Bailian and obtain API keys for your OpenClaw deployment.',
  alternates: {
    canonical: 'https://openclaw101.dev/deploy-tutorial/aliyun-bailian',
  },
};

export default function AliyunBailianGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Aliyun Bailian API Setup Guide
          </h1>
          
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Introduction to Aliyun Bailian</h2>
            
            <p className="text-gray-300 mb-6">
              Aliyun Bailian is Alibaba Cloud's comprehensive large model platform that provides access to 
              various AI models including Qwen. This guide will walk you through registering for Bailian 
              and obtaining your API keys for use with OpenClaw.
            </p>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Step 1: Register for an Aliyun Account</h3>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                  <li>Visit the <a href="https://www.aliyun.com/" className="text-blue-400 hover:underline">Aliyun official website</a></li>
                  <li>Click on "Register" in the top right corner</li>
                  <li>Choose your preferred registration method (phone number or email)</li>
                  <li>Follow the verification process to complete your registration</li>
                  <li>Verify your account with real-name authentication (required for accessing Bailian)</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Step 2: Navigate to the Bailian Platform</h3>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                  <li>Log in to your Aliyun account</li>
                  <li>Search for "Bailian" in the product catalog or visit the <a href="https://bailian.console.aliyun.com/" className="text-blue-400 hover:underline">Bailian console directly</a></li>
                  <li>If prompted, activate the Bailian service</li>
                  <li>Explore the Bailian dashboard to familiarize yourself with the interface</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Step 3: Obtain Your API Credentials</h3>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                  <li>In the Bailian console, navigate to the "API Key Management" section</li>
                  <li>Click on "Create API Key" or "Generate Key"</li>
                  <li>Confirm the creation and securely copy your API Key</li>
                  <li>Note down your Access Key ID and Access Key Secret from your Aliyun account settings</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Step 4: Configure OpenClaw with Bailian</h3>
                
                <p className="text-gray-300 mb-4">
                  Once you have your credentials, add them to your OpenClaw configuration:
                </p>
                
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-green-400">
{`# In your .env file
ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
BALIAN_API_KEY=your_bailian_api_key`}
                </pre>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Step 5: Test Your Configuration</h3>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                  <li>Restart your OpenClaw instance to load the new environment variables</li>
                  <li>Test the connection by making a simple API call</li>
                  <li>Verify that your agent can successfully communicate with Bailian models</li>
                </ol>
              </section>
            </div>
            
            <div className="mt-8 p-6 bg-blue-900/30 rounded-lg border border-blue-700">
              <h4 className="text-lg font-semibold text-blue-300 mb-2">Important Security Notes</h4>
              <ul className="list-disc pl-6 space-y-2 text-blue-200 text-sm">
                <li>Never share your API keys publicly or commit them to version control</li>
                <li>Use environment variables to store sensitive credentials</li>
                <li>Regularly rotate your API keys for enhanced security</li>
                <li>Monitor your API usage to avoid unexpected charges</li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="/deploy-tutorial/steps/3" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Continue to API Configuration Step
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}