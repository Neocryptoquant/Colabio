import { Metadata } from 'next';
import CreateProjectForm from '@/components/project/CreateProjectForm';

export const metadata: Metadata = {
  title: 'Create Project - Colabio',
  description: 'Create a new crowdfunding project on Colabio',
};

export default function CreateProjectPage() {
  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create a New Project
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Launch your project and start raising funds on the Solana blockchain.
        </p>
        
        <CreateProjectForm />
      </div>
    </div>
  );
} 