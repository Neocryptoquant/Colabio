"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useConnection } from "@solana/wallet-adapter-react"
import { toast } from "react-hot-toast"
import { PROGRAM_ID } from "@/config/solana"

export default function CreateProject() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    goalAmount: "",
    category: "DeFi",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!publicKey) {
        throw new Error("Please connect your wallet first")
      }

      // TODO: Implement actual project creation transaction
      // This will involve:
      // 1. Creating the project account
      // 2. Creating the escrow account
      // 3. Initializing the project with the provided data

      toast.success("Project created successfully!")
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief description of your project"
              required
            />
          </div>

          <div>
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Detailed description of your project..."
              required
            />
          </div>

          <div>
            <Label htmlFor="goalAmount">Goal Amount (SOL)</Label>
            <Input
              id="goalAmount"
              name="goalAmount"
              type="number"
              value={formData.goalAmount}
              onChange={handleChange}
              placeholder="Enter goal amount in SOL"
              required
              min="0.1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="DeFi">DeFi</option>
              <option value="NFT">NFT</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Games">Games</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
