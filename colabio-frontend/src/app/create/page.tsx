import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { toast } from "react-hot-toast"
import { PROGRAM_ID } from "@/config/solana"

export default function CreateProject() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "DeFi",
    goalAmount: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!publicKey) {
        throw new Error("Please connect your wallet first")
      }

      // TODO: Implement actual project creation transaction using:
      // - connection
      // - sendTransaction
      // - PROGRAM_ID
      // - formData

      toast.success("Project created successfully!")
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create project")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.shortDescription.trim() !== "" &&
      formData.category !== "" &&
      formData.goalAmount !== "" &&
      Number(formData.goalAmount) > 0
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <Card className="w-full">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Project Title *</Label>
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
              <Label htmlFor="shortDescription">
                Short Description *<span className="text-xs text-gray-500 ml-1">(max 150 characters)</span>
              </Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description of your project"
                maxLength={150}
                required
                className="resize-none h-20"
              />
              <div className="text-xs text-right text-gray-500">{formData.shortDescription.length}/150</div>
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
                className="resize-none h-32"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
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
                <option value="Gaming">Gaming</option>
                <option value="Social">Social</option>
                <option value="Education">Education</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="goalAmount">Goal Amount (SOL) *</Label>
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

            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-24 h-24 mb-2">
                    <img
                      src="/placeholder.svg?height=96&width=96&text=📷&fontFamily=Roboto&fontSize=36&bg=F8F9FA&fg=9945FF"
                      alt="Upload image"
                      width={96}
                      height={96}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Drag and drop an image here, or click to select</p>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
