"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import type { ProjectData } from "@/types/project"

// Mock data - would be fetched from backend in real implementation
const mockProject: ProjectData = {
  id: "1",
  title: "Decentralized Marketplace",
  shortDescription: "A fully decentralized marketplace for digital goods built on Solana.",
  fullDescription:
    "This project aims to create a fully decentralized marketplace where users can buy and sell digital goods using Solana. The platform will feature low fees, instant transactions, and a user-friendly interface.\n\nOur team consists of experienced blockchain developers who have previously worked on several successful DeFi projects. We believe that decentralized marketplaces are the future of e-commerce, and we want to build the best possible platform for the Solana ecosystem.\n\nThe funds raised will be used for:\n- Smart contract development and auditing\n- Frontend development and UI/UX design\n- Marketing and community building\n- Legal compliance and operational costs\n\nWe plan to launch a beta version within 3 months of reaching our funding goal, with a full release scheduled for 6 months after funding.",
  creatorAddress: "8xrt45...9j7z",
  category: "DeFi",
  imageUrl:
    "/placeholder.svg?height=400&width=800&text=Decentralized Marketplace&fontWeight=bold&fontFamily=Roboto&bg=9945FF&fg=FFFFFF",
  goalAmount: 500,
  raisedAmount: 325,
  backers: 47,
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [fundAmount, setFundAmount] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  // Mock wallet connection check (to be replaced with actual wallet adapter)
  const checkWalletConnection = () => {
    return isWalletConnected
  }

  const handleFundProject = () => {
    // This would be replaced with actual contract interaction
    alert(`Funding project with ${fundAmount} SOL`)
  }

  const isButtonDisabled = () => {
    return !checkWalletConnection() || !fundAmount || isNaN(Number(fundAmount)) || Number(fundAmount) <= 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-medium">{mockProject.title}</h1>
            <Badge variant="outline" className="bg-[#F0F0F0]">
              {mockProject.category}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>Creator: {mockProject.creatorAddress}</span>
            <a
              href={`https://solscan.io/account/${mockProject.creatorAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-2 text-[#9945FF] hover:underline"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>View on Solscan</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={mockProject.imageUrl || "/placeholder.svg"}
                alt={mockProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-medium mb-4">About this project</h2>
              {mockProject.fullDescription.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-1 font-medium">
                    <span>{mockProject.raisedAmount} SOL raised</span>
                    <span>{mockProject.goalAmount} SOL goal</span>
                  </div>
                  <Progress
                    value={(mockProject.raisedAmount / mockProject.goalAmount) * 100}
                    className="h-2 mb-2"
                    indicatorClassName="bg-[#9945FF]"
                  />
                  <p className="text-sm text-gray-600">{mockProject.backers} backers</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                      Amount (SOL)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.0"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={handleFundProject}
                    disabled={isButtonDisabled()}
                    className="w-full bg-[#9945FF] hover:bg-[#8035e0]"
                  >
                    {!checkWalletConnection() ? "Connect Wallet to Fund" : "Fund Project"}
                  </Button>

                  {!checkWalletConnection() && (
                    <p className="text-xs text-center text-gray-500">You need to connect your wallet first</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
