'use client';

import { FC, FormEvent, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { useRouter } from 'next/navigation';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { useProgram } from '@/hooks/useProgram';

interface FormData {
  title: string;
  description: string;
  category: string;
  fundingGoal: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  fundingGoal?: string;
}

const CreateProjectForm: FC = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.fundingGoal.trim()) {
      newErrors.fundingGoal = 'Funding goal is required';
    } else {
      const goal = parseFloat(formData.fundingGoal);
      if (isNaN(goal) || goal <= 0) {
        newErrors.fundingGoal = 'Please enter a valid funding goal';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!program) {
      alert('Program not initialized');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const fundingGoalLamports = new anchor.BN(
        parseFloat(formData.fundingGoal) * LAMPORTS_PER_SOL
      );

      // Calculate PDAs
      const [projectPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from('PROJECT'),
          Buffer.from(formData.title),
          publicKey.toBuffer(),
        ],
        program.programId
      );

      const [escrowPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('ESCROW'), projectPda.toBuffer()],
        program.programId
      );

      // Create project transaction
      const tx = await program.methods
        .createProject(fundingGoalLamports, formData.description, formData.category)
        .accounts({
          project: projectPda,
          projectEscrow: escrowPda,
          creator: publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      await connection.confirmTransaction(tx);
      
      // Redirect to the project page
      router.push(`/projects/${projectPda.toString()}`);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <Input
        label="Project Title"
        placeholder="Enter your project title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        required
      />

      <Textarea
        label="Project Description"
        placeholder="Describe your project..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        error={errors.description}
        required
      />

      <Input
        label="Category"
        placeholder="e.g., Technology, Art, Music"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        error={errors.category}
        required
      />

      <Input
        label="Funding Goal (SOL)"
        type="number"
        step="0.1"
        min="0"
        placeholder="Enter funding goal in SOL"
        value={formData.fundingGoal}
        onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
        error={errors.fundingGoal}
        required
      />

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!publicKey}
        className="w-full"
      >
        {publicKey ? 'Create Project' : 'Connect Wallet to Create Project'}
      </Button>
    </form>
  );
};

export default CreateProjectForm; 