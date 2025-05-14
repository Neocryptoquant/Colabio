import { Metadata } from 'next';
import ProjectGrid from '@/components/project/ProjectGrid';

export const metadata: Metadata = {
  title: 'Colabio - Decentralized Crowdfunding on Solana',
  description: 'Discover and fund innovative projects on the Solana blockchain',
};

export default function HomePage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Crowdfunding on Solana
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover innovative projects, support creators, and be part of the future of decentralized funding.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Projects', value: '0' },
            { label: 'Total Funded', value: '0 SOL' },
            { label: 'Active Projects', value: '0' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <ProjectGrid />
        </div>
      </div>
    </div>
  );
}
