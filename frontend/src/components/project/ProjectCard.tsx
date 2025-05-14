import { FC } from 'react';
import Link from 'next/link';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Project, ProjectState } from '@/idl/colabio';

interface ProjectCardProps {
  project: Project;
  publicKey: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, publicKey }) => {
  const progress = (project.totalFunded / project.fundingGoal) * 100;
  const isCreator = project.creator === publicKey;

  return (
    <Link 
      href={`/projects/${publicKey}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {project.category}
          </span>
          {isCreator && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Your Project
            </span>
          )}
        </div>

        {/* Project Info */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              {(project.totalFunded / LAMPORTS_PER_SOL).toFixed(2)} SOL raised
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Goal: {(project.fundingGoal / LAMPORTS_PER_SOL).toFixed(2)} SOL
            </span>
            <span className={`font-medium ${getStateColor(project.state)}`}>
              {formatState(project.state)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Helper functions for formatting
const formatState = (state: keyof ProjectState): string => {
  return state.toString().replace(/([A-Z])/g, ' $1').trim();
};

const getStateColor = (state: keyof ProjectState): string => {
  const colors: Record<keyof ProjectState, string> = {
    funding: 'text-green-600 dark:text-green-400',
    goalReached: 'text-blue-600 dark:text-blue-400',
    failed: 'text-red-600 dark:text-red-400',
    cancelled: 'text-gray-600 dark:text-gray-400',
    withdrawn: 'text-purple-600 dark:text-purple-400',
  };
  return colors[state];
};

export default ProjectCard; 