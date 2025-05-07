import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    goalAmount: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would be replaced with actual contract interaction
    console.log("Form submitted:", formData)
    alert("Project creation request submitted!")
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium mb-8 text-center">Create a New Project</h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
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

              <div className="space-y-2">
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

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed description of your project"
                  className="resize-none h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DeFi">DeFi</SelectItem>
                    <SelectItem value="NFT">NFT</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goalAmount">Funding Goal (SOL) *</Label>
                <Input
                  id="goalAmount"
                  name="goalAmount"
                  type="number"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  placeholder="0.0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="relative w-24 h-24 mb-2">
                      <Image
                        src="/placeholder.svg?height=96&width=96&text=📷&fontFamily=Roboto&fontSize=36&bg=F8F9FA&fg=9945FF"
                        alt="Upload image"
                        width={96}
                        height={96}
                      />
                    </div>
                    <p className="text-gray-500">Drag and drop an image here, or click to browse</p>
                    <p className="text-xs text-gray-400">(Image upload will be available soon)</p>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={!isFormValid()} className="w-full bg-[#9945FF] hover:bg-[#8035e0]">
                Create Project
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
