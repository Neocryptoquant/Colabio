"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "react-hot-toast"
import { PROGRAM_ID } from "@/config/solana"

export default function ProjectPage() {
  const { id } = useParams()
  const { publicKey } = useWallet()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement project fetching from Solana program
    // This will involve:
    // 1. Getting the project account using the project ID
    // 2. Fetching project details from the account
    
    // For now, we'll use a mock project
    const mockProject = {
      id: id,
      title: "Sample Project",
      description: "This is a sample project description",
      category: "DeFi",
      imageUrl: "/placeholder.svg",
      goalAmount: 100,
      raisedAmount: 50,
      backers: 10,
      creatorAddress: "123...456",
    }

    setProject(mockProject)
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return <div>Loading project...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectCard project={project} isDetailPage={true} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        <div className="prose max-w-none">
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  )
}
