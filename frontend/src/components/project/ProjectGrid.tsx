'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import ProjectCard from './ProjectCard';
import { useProjects } from '@/hooks/useProjects';

const ProjectGrid: FC = () => {
  const { projects, loading, error } = useProjects();
  const { publicKey } = useWallet();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="flex justify-between mt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 mb-2">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Try again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No projects yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Be the first to create a project!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.publicKey}
          project={project}
          publicKey={publicKey?.toString() || ''}
        />
      ))}
    </div>
  );
};

export default ProjectGrid; 