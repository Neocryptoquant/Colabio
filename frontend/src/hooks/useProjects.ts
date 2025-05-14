'use client';

import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useProgram } from './useProgram';
import type { ProjectAccount } from '../types/colabio';

export const useProjects = () => {
  const { program } = useProgram();
  const { connection } = useConnection();
  const [projects, setProjects] = useState<ProjectAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!program) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all project accounts
        const accounts = await program.account.project.all();
        
        // Transform the accounts into our Project type
        const projectData = accounts.map((account: any) => ({
          ...account.account,
          publicKey: account.publicKey.toString(),
        }));

        setProjects(projectData);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [program, connection]);

  return {
    projects,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
    },
  };
}; 