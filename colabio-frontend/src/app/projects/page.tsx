"use client"

import { ProjectList } from "@/components/project-list"
import { useWallet } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react"
import type { ProjectData } from "@/types/project"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { PROGRAM_ID } from "@/config/solana"
import { toast } from "react-hot-toast"
import BN from "bn.js"

export default function ProjectsPage() {
  const { publicKey } = useWallet();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all project accounts from the program
        const connection = new Connection(clusterApiUrl("devnet"));
        const projectAccounts = await connection.getProgramAccounts(new PublicKey(PROGRAM_ID));

        // Convert to ProjectData format
        const projectData = projectAccounts.map(account => {
          const data = account.account.data;
          return {
            id: account.pubkey.toString(),
            title: new TextDecoder().decode(data.slice(0, 100)).trim(),
            shortDescription: new TextDecoder().decode(data.slice(100, 200)).trim(),
            fullDescription: new TextDecoder().decode(data.slice(200, 500)).trim(),
            creatorAddress: new PublicKey(data.slice(500, 532)).toString(),
            category: new TextDecoder().decode(data.slice(532, 564)).trim(),
            imageUrl: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(account.pubkey.toString())}&fontWeight=bold&fontFamily=Roboto&bg=9945FF&fg=FFFFFF`,
            goalAmount: Number(new BN(data.slice(564, 572)).toString()),
            raisedAmount: Number(new BN(data.slice(572, 580)).toString()),
            backers: Number(new BN(data.slice(580, 584)).toString()),
          };
        });

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Projects</h1>
      
      <div className="mb-8">
        <CategoryFilter
          categories={Array.from(new Set(projects.map(p => p.category)))}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      ) : (
        <ProjectList
          projects={projects}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
}
