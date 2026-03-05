import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  params: Promise<{ step: string }>;
}

const STEPS = [1, 2, 3, 4, 5, 6, 7];

export async function generateStaticParams() {
  return STEPS.map((step) => ({ step: step.toString() }));
}

// Get step data based on step number
function getStepData(step: string): { title: string; description: string; content: string; videoPlaceholder: string } | null {
  const stepNum = parseInt(step);
  if (!STEPS.includes(stepNum)) return null;

  // Return mock data for each step
  const stepData: Record<number, { title: string; description: string; content: string; videoPlaceholder: string }> = {
    1: {
      title: 'Environment Setup',
      description: 'Prepare your development environment',
      content: `
        ## Environment Requirements
        
        Before installing OpenClaw, ensure your system meets the following requirements:
        
        - **Operating System**: macOS, Linux, or Windows (with WSL2)
        - **Node.js**: Version 18.0 or higher
        - **npm**: Version 8.0 or higher
        - **Git**: Latest version
        - **Python**: Version 3.8 or higher
        - **Docker**: Latest version (optional but recommended)
        
        ## Installing Prerequisites
        
        1. **Install Node.js and npm**
           - Visit [nodejs.org](https://nodejs.org/) and download the LTS version
           - Verify installation: \`node --version\` and \`npm --version\`
        
        2. **Install Git**
           - Visit [git-scm.com](https://git-scm.com/) to download and install Git
           - Verify installation: \`git --version\`
        
        3. **Install Python**
           - Visit [python.org](https://www.python.org/) to download and install Python
           - Verify installation: \`python --version\` or \`python3 --version\`
        
        4. **Install Docker (Recommended)**
           - Visit [docker.com](https://www.docker.com/) to download Docker Desktop
           - Verify installation: \`docker --version\`
        
        ## Setting up Your Workspace
        
        1. Create a dedicated workspace directory for OpenClaw:
           \`\`\`bash
           mkdir ~/openclaw-workspace
           cd ~/openclaw-workspace
           \`\`\`
        
        2. Clone the OpenClaw repository:
           \`\`\`bash
           git clone https://github.com/your-repo/openclaw.git
           \`\`\`
        
        3. Navigate to the project directory:
           \`\`\`bash
           cd openclaw
           \`\`\`
        
        Once you've completed these steps, you're ready to proceed with the OpenClaw installation!
      `,
      videoPlaceholder: 'Environment Setup Video'
    },
    2: {
      title: 'Install OpenClaw',
      description: 'Install the OpenClaw core system and verify the installation.',
      content: `
        ## Installing OpenClaw
        
        Now that your environment is set up, let's install OpenClaw.
        
        ## Installation Methods
        
        There are several ways to install OpenClaw depending on your needs:
        
        ### Option 1: Global Installation (Recommended for beginners)
        \`\`\`bash
        npm install -g openclaw
        \`\`\`
        
        ### Option 2: Local Installation (Recommended for developers)
        \`\`\`bash
        mkdir my-openclaw-project
        cd my-openclaw-project
        npm init -y
        npm install openclaw
        \`\`\`
        
        ### Option 3: Using Docker (Recommended for production)
        \`\`\`bash
        docker pull openclaw/openclaw:latest
        docker run -d -p 3000:3000 openclaw/openclaw:latest
        \`\`\`
        
        ## Verification
        
        After installation, verify that OpenClaw is properly installed:
        
        \`\`\`bash
        openclaw --version
        \`\`\`
        
        You should see the version number of OpenClaw displayed.
        
        ## Initializing Your First Project
        
        To create your first OpenClaw project:
        
        \`\`\`bash
        openclaw init my-first-agent
        cd my-first-agent
        npm install
        \`\`\`
        
        This creates a basic OpenClaw agent project structure with all necessary files.
      `,
      videoPlaceholder: 'Installation Process Video'
    },
    3: {
      title: 'Configure API Keys',
      description: 'Set up API keys and authentication for your OpenClaw instance.',
      content: `
        ## Configuring API Keys
        
        OpenClaw requires various API keys to interact with different services and AI models.
        
        ## Creating the Configuration File
        
        1. In your OpenClaw project directory, create a \`.env\` file:
           \`\`\`bash
           touch .env
           \`\`\`
        
        2. Add the following configuration template to your \`.env\` file:
           \`\`\`
           # OpenAI API Configuration
           OPENAI_API_KEY=your_openai_api_key_here
           
           # Model Configuration
           OPENAI_MODEL=gpt-4
           
           # Server Configuration
           PORT=3000
           HOST=localhost
           
           # Database Configuration (if using database)
           DATABASE_URL=your_database_url_here
           
           # Additional Service Keys
           # Add other service keys as needed
           \`\`\`
        
        ## Getting API Keys for Different Services
        
        ### OpenAI API Key
        1. Go to [platform.openai.com](https://platform.openai.com/)
        2. Sign up or log in to your account
        3. Navigate to "API Keys" section
        4. Click "Create new secret key"
        5. Copy the key and add it to your \`.env\` file
        
        ### Alternative: Using Alibaba Cloud Qwen
        If you prefer to use Alibaba Cloud's Qwen models:
        
        1. Go to [Alibaba Cloud Console](https://home.console.aliyun.com/)
        2. Find the "Qwen" or "DashScope" service
        3. Obtain your API key from the console
        4. Add to your \`.env\` file:
           \`\`\`
           ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
           ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
           \`\`\`
        
        ## Security Best Practices
        
        1. Never commit \`.env\` files to version control
        2. Ensure your \`.gitignore\` includes \`.env\`
        3. Use different API keys for development and production
        4. Regularly rotate your API keys
        5. Monitor usage to avoid unexpected charges
      `,
      videoPlaceholder: 'API Configuration Video'
    },
    4: {
      title: 'Database Configuration',
      description: 'Configure database connections for storing agent data.',
      content: `
        ## Database Configuration
        
        OpenClaw can store agent data, conversation history, and other information in a database.
        
        ## Supported Databases
        
        OpenClaw supports multiple database systems:
        
        - SQLite (Default, good for development)
        - PostgreSQL (Recommended for production)
        - MySQL (Alternative option)
        - MongoDB (NoSQL option)
        
        ## SQLite Configuration (Default)
        
        SQLite is built-in and requires no additional setup. The default configuration in OpenClaw uses SQLite:
        
        \`\`\`javascript
        // In your config file
        database: {
          type: 'sqlite',
          database: './data/openclaw.db'
        }
        \`\`\`
        
        ## PostgreSQL Configuration
        
        1. Install PostgreSQL on your system if not already installed
        2. Create a database for OpenClaw:
           \`\`\`sql
           CREATE DATABASE openclaw_db;
           CREATE USER openclaw_user WITH PASSWORD 'secure_password';
           GRANT ALL PRIVILEGES ON DATABASE openclaw_db TO openclaw_user;
           \`\`\`
        
        3. Update your \`.env\` file:
           \`\`\`
           DATABASE_URL="postgresql://openclaw_user:secure_password@localhost:5432/openclaw_db"
           \`\`\`
        
        4. Update your OpenClaw configuration:
           \`\`\`javascript
           // In your config file
           database: {
             type: 'postgresql',
             url: process.env.DATABASE_URL
           }
           \`\`\`
        
        ## Running Database Migrations
        
        After configuring your database, run migrations to set up the required tables:
        
        \`\`\`bash
        openclaw db:migrate
        \`\`\`
        
        ## Testing the Connection
        
        Test your database connection:
        
        \`\`\`bash
        openclaw db:test
        \`\`\`
      `,
      videoPlaceholder: 'Database Setup Video'
    },
    5: {
      title: 'Customize Agents',
      description: 'Customize your AI agents with specific personalities and skills.',
      content: `
        ## Customizing Agents
        
        Now that your environment is set up and configured, let's customize your AI agents.
        
        ## Understanding Agent Structure
        
        An OpenClaw agent consists of:
        
        1. **Identity**: The agent's personality and characteristics
        2. **Skills**: Capabilities and functions the agent can perform
        3. **Memory**: How the agent stores and retrieves information
        4. **Tools**: External services and APIs the agent can access
        
        ## Creating Your First Custom Agent
        
        1. Create a new agent directory:
           \`\`\`bash
           mkdir agents/my-custom-agent
           \`\`\`
        
        2. Create an identity file (\`agents/my-custom-agent/identity.mdx\`):
           \`\`\`markdown
           ---
           name: My Custom Agent
           role: Personal Assistant
           personality: Helpful, friendly, and efficient
           capabilities: 
             - Answer questions
             - Schedule meetings
             - Set reminders
             - Provide information
           limitations:
             - Cannot access external systems without permission
             - Limited knowledge of events after training cutoff
           ---
           
           # My Custom Agent Identity
           
           I am your personal assistant designed to help with daily tasks and provide information. I aim to be helpful, friendly, and efficient in all interactions.
           \`\`\`
        
        3. Define skills in a separate file (\`agents/my-custom-agent/skills.mdx\`):
           \`\`\`markdown
           ## Available Skills
           
           - **Calendar Integration**: Schedule and manage appointments
           - **Task Management**: Create and track to-do items
           - **Information Retrieval**: Search and provide information
           - **Communication**: Send messages and emails
           \`\`\`
        
        ## Adding Skills to Your Agent
        
        Skills in OpenClaw are defined as functions that the agent can execute:
        
        \`\`\`javascript
        // Example skill definition
        export const scheduleMeeting = {
          name: 'scheduleMeeting',
          description: 'Schedule a meeting with specified details',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Title of the meeting' },
              date: { type: 'string', description: 'Date of the meeting (YYYY-MM-DD)' },
              time: { type: 'string', description: 'Time of the meeting (HH:MM)' },
              participants: { type: 'array', items: { type: 'string' }, description: 'List of participant emails' }
            },
            required: ['title', 'date', 'time']
          },
          handler: async (args) => {
            // Implementation for scheduling a meeting
            console.log(\`Scheduling meeting: \${args.title}\`);
            return { success: true, message: 'Meeting scheduled successfully' };
          }
        };
        \`\`\`
        
        ## Configuring Agent Behavior
        
        In your agent's configuration file (\`agents/my-custom-agent/config.json\`):
        
        \`\`\`json
        {
          "model": "gpt-4",
          "temperature": 0.7,
          "maxTokens": 1000,
          "memory": {
            "shortTerm": 10,
            "longTerm": true
          },
          "skills": [
            "scheduleMeeting",
            "setReminder",
            "sendEmail"
          ]
        }
        \`\`\`
      `,
      videoPlaceholder: 'Agent Customization Video'
    },
    6: {
      title: 'Test Deployment',
      description: 'Test your deployment locally before going to production.',
      content: `
        ## Testing Your Deployment Locally
        
        Before deploying to production, it's essential to test your OpenClaw instance locally.
        
        ## Starting the Development Server
        
        1. Ensure all dependencies are installed:
           \`\`\`bash
           npm install
           \`\`\`
        
        2. Verify your environment variables are set:
           \`\`\`bash
           echo $OPENAI_API_KEY
           \`\`\`
        
        3. Start the development server:
           \`\`\`bash
           npm run dev
           # or
           openclaw dev
           \`\`\`
        
        4. Access your agent at [http://localhost:3000](http://localhost:3000)
        
        ## Testing Core Functionality
        
        1. **Basic Interaction Test**
           - Try having a simple conversation with your agent
           - Verify that responses are generated correctly
           - Test different types of queries
        
        2. **Skill Execution Test**
           - Try executing each of your custom skills
           - Verify that skills return expected results
           - Test error handling for invalid inputs
        
        3. **Memory Functionality Test**
           - Have a conversation that references earlier parts
           - Verify that context is maintained appropriately
           - Test long-term memory if enabled
        
        ## Common Issues and Solutions
        
        ### Issue: API Key Not Working
        **Solution**: Verify your API key in the \`.env\` file and check that the environment variable is loaded properly.
        
        ### Issue: Database Connection Error
        **Solution**: Check your database configuration and ensure the database service is running.
        
        ### Issue: Agent Not Responding
        **Solution**: Check the server logs for error messages and verify that all required services are running.
        
        ## Performance Testing
        
        1. Load testing with multiple concurrent requests
        2. Memory usage monitoring
        3. Response time measurement
        4. Stress testing under high load
        
        ## Preparing for Production
        
        Once all tests pass, you're ready to prepare for production deployment.
      `,
      videoPlaceholder: 'Testing Process Video'
    },
    7: {
      title: 'Production Deployment',
      description: 'Deploy your OpenClaw instance to a production environment.',
      content: `
        ## Production Deployment
        
        Now that everything is tested and working, let's deploy OpenClaw to a production environment.
        
        ## Production Environment Options
        
        1. **Self-Hosting**: Deploy on your own infrastructure
        2. **Cloud Platforms**: Deploy on AWS, Azure, GCP, or other platforms
        3. **Container Orchestration**: Use Kubernetes or Docker Swarm
        4. **Serverless Options**: Deploy as serverless functions (limited support)
        
        ## Self-Hosting Deployment
        
        1. **Prepare Your Server**
           - Choose a cloud provider (AWS, DigitalOcean, Linode, etc.)
           - Select an appropriate instance type (minimum 2GB RAM recommended)
           - Set up security groups/firewall rules
        
        2. **Install Dependencies on Server**
           \`\`\`bash
           # Update system packages
           sudo apt update && sudo apt upgrade -y
           
           # Install Node.js
           curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
           sudo apt-get install -y nodejs
           
           # Install PM2 for process management
           sudo npm install -g pm2
           
           # Install other dependencies as needed
           sudo apt install git docker.io -y
           \`\`\`
        
        3. **Clone and Configure Your Application**
           \`\`\`bash
           git clone your-repo-url
           cd your-app-directory
           npm install --production
           
           # Create and configure your .env file
           cp .env.example .env
           # Edit .env with production values
           \`\`\`
        
        4. **Set Up PM2 for Process Management**
           Create an ecosystem file (\`ecosystem.config.js\`):
           \`\`\`javascript
           module.exports = {
             apps: [{
               name: 'openclaw',
               script: './dist/server.js',
               instances: 'max',
               exec_mode: 'cluster',
               env: {
                 NODE_ENV: 'production',
                 PORT: 3000
               }
             }]
           };
           \`\`\`
        
        5. **Start Your Application**
           \`\`\`bash
           pm2 start ecosystem.config.js
           pm2 startup
           pm2 save
           \`\`\`
        
        ## Container-Based Deployment
        
        1. **Create a Production Dockerfile**
           \`\`\`dockerfile
           FROM node:18-alpine
           
           WORKDIR /app
           
           COPY package*.json ./
           RUN npm ci --only=production
           
           COPY . .
           
           EXPOSE 3000
           
           CMD ["npm", "start"]
           \`\`\`
        
        2. **Build and Run the Container**
           \`\`\`bash
           docker build -t openclaw-prod .
           docker run -d \
             --name openclaw \
             -p 3000:3000 \
             --env-file .env \
             --restart unless-stopped \
             openclaw-prod
           \`\`\`
        
        ## Security Considerations
        
        1. **Environment Variables**: Never expose API keys in code
        2. **HTTPS**: Always use HTTPS in production
        3. **Rate Limiting**: Implement rate limiting to prevent abuse
        4. **Authentication**: Add authentication layers where needed
        5. **Monitoring**: Set up monitoring and alerting
        
        ## Monitoring and Maintenance
        
        1. **Set up logging**: Use centralized logging solutions
        2. **Performance monitoring**: Monitor response times and resource usage
        3. **Health checks**: Implement endpoint health checks
        4. **Backup strategies**: Regular backup of data and configurations
        5. **Update procedures**: Plan for regular updates and patches
      `,
      videoPlaceholder: 'Production Deployment Video'
    }
  };

  return stepData[stepNum] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { step } = await params;
  const stepData = getStepData(step);
  
  if (!stepData) return { title: 'Not Found' };
  
  const stepNum = parseInt(step);
  const title = `Step ${stepNum}: ${stepData.title} | OpenClaw Deployment Tutorial`;
  
  return {
    title,
    description: stepData.description,
    alternates: {
      canonical: `https://openclaw101.dev/deploy-tutorial/steps/${step}`,
    },
    openGraph: {
      title,
      description: stepData.description,
      type: 'article',
      url: `https://openclaw101.dev/deploy-tutorial/steps/${step}`,
    },
  };
}

export default async function DeployStepPage({ params }: Props) {
  const { step } = await params;
  const stepData = getStepData(step);
  
  if (!stepData) {
    notFound();
  }
  
  const stepNum = parseInt(step);
  const prevStep = stepNum > 1 ? stepNum - 1 : null;
  const nextStep = stepNum < 7 ? stepNum + 1 : null;

  // Render markdown content

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Step {stepNum} of 7</span>
            <span className="text-white">{Math.round(((stepNum - 1) / 7) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(stepNum / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {prevStep !== null && (
              <a 
                href={`/deploy-tutorial/steps/${prevStep}`}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 inline-flex items-center"
              >
                ← Prev Step ({prevStep})
              </a>
            )}
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{stepData.title}</h1>
            <p className="text-gray-400">{stepData.description}</p>
          </div>
          
          <div>
            {nextStep !== null ? (
              <a 
                href={`/deploy-tutorial/steps/${nextStep}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 inline-flex items-center"
              >
                Next Step ({nextStep}) →
              </a>
            ) : (
              <a 
                href="/deploy-tutorial"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Finish Tutorial
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mb-6" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-white mb-3 mt-6" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-white mb-2 mt-4" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-base font-semibold text-white mb-2 mt-3" {...props} />,
                    h6: ({node, ...props}) => <h6 className="text-sm font-semibold text-white mb-2 mt-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 transition-colors duration-300" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300 text-sm" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto mb-4" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-300 italic my-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                  }}
                >
                  {stepData.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Video Placeholder */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Tutorial Video</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-blue-500 text-4xl mb-2">▶</div>
                  <p className="text-gray-400">{stepData.videoPlaceholder}</p>
                  <p className="text-gray-500 text-sm mt-2">Video will be available soon</p>
                </div>
              </div>
            </div>

            {/* Step List */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">All Steps</h3>
              <ul className="space-y-2">
                {STEPS.map((s) => (
                  <li key={s}>
                    <a 
                      href={`/deploy-tutorial/steps/${s}`}
                      className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                        s === stepNum 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span className="font-medium">Step {s}:</span> {getStepData(s.toString())?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/docs" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 block"
                  >
                    Full Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="/community" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 block"
                  >
                    Community Support
                  </a>
                </li>
                <li>
                  <a 
                    href="/troubleshooting" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 block"
                  >
                    Troubleshooting Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}