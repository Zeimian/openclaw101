'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DeployTutorialHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { number: 1, title: 'Environment Setup', description: 'Prepare your development environment' },
    { number: 2, title: 'Install OpenClaw', description: 'Install OpenClaw core system' },
    { number: 3, title: 'Configure API Keys', description: 'Set up API keys and authentication' },
    { number: 4, title: 'Database Configuration', description: 'Configure database connections' },
    { number: 5, title: 'Customize Agents', description: 'Customize your AI agents' },
    { number: 6, title: 'Test Deployment', description: 'Test your deployment locally' },
    { number: 7, title: 'Production Deployment', description: 'Deploy to production environment' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            OpenClaw <span className="text-blue-500">Deployment</span> Tutorial
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow this step-by-step guide to deploy your own OpenClaw instance. 
            Each step includes detailed instructions, video tutorials, and troubleshooting tips.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <Link 
                href={`/deploy-tutorial/steps/${step.number}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Start Tutorial
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300 mb-6">
              If you encounter any issues during the deployment process, check our troubleshooting guide 
              or join our community for support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/deploy-tutorial/api-configuration"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                API Configuration Guide
              </Link>
              <Link 
                href="/deploy-tutorial/aliyun-bailian"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Aliyun Bailian Setup
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}