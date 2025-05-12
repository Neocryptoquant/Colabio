import React from 'react';
import { ProjectData, ProjectCategory } from '@/types/project';

interface ProjectListProps {
  projects: ProjectData[];
  selectedCategory: ProjectCategory | "all";
}

export default function ProjectList({ projects, selectedCategory }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects
        .filter((project) => selectedCategory === "all" || project.category === selectedCategory)
        .map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.shortDescription}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{project.category}</span>
            <span className="text-sm text-green-500">{project.goalAmount} SOL</span>
          </div>
        </div>
      ))}
    </div>
  );
}
