import { useState } from "react"
import ProjectList from "@/components/project-list"
import HeroSection from "@/components/hero-section"
import CategoryFilter from "@/components/category-filter"
import type { ProjectData } from "@/types/project"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

// Mock data - would be fetched from backend in real implementation
const mockProjects: ProjectData[] = [
  {
    id: "1",
    title: "Decentralized Marketplace",
    shortDescription: "A fully decentralized marketplace for digital goods built on Solana.",
    fullDescription:
      "This project aims to create a fully decentralized marketplace where users can buy and sell digital goods using Solana. The platform will feature low fees, instant transactions, and a user-friendly interface.",
    creatorAddress: "8xrt45...9j7z",
    category: "DeFi",
    imageUrl:
      "/placeholder.svg?height=200&width=400&text=Marketplace&fontWeight=bold&fontFamily=Roboto&bg=9945FF&fg=FFFFFF",
    goalAmount: 500,
    raisedAmount: 325,
    backers: 47,
  },
  {
    id: "2",
    title: "NFT Collection: Solana Dreamers",
    shortDescription: "A unique collection of 10,000 generative NFTs celebrating Solana developers.",
    fullDescription:
      "Solana Dreamers is a collection of 10,000 unique, generative NFTs that celebrate the builders and developers in the Solana ecosystem. Each NFT features a unique combination of traits and attributes.",
    creatorAddress: "3jrt78...2k4p",
    category: "NFT",
    imageUrl:
      "/placeholder.svg?height=200&width=400&text=NFT Collection&fontWeight=bold&fontFamily=Roboto&bg=14F195&fg=000000",
    goalAmount: 200,
    raisedAmount: 85,
    backers: 23,
  },
  {
    id: "3",
    title: "DeFi Lending Protocol",
    shortDescription: "A next-generation lending protocol with dynamic interest rates based on market conditions.",
    fullDescription:
      "Our DeFi lending protocol introduces dynamic interest rates that adjust based on real-time market conditions. This ensures optimal returns for lenders and fair rates for borrowers at all times.",
    creatorAddress: "5qwt12...7f3s",
    category: "DeFi",
    imageUrl:
      "/placeholder.svg?height=200&width=400&text=DeFi Protocol&fontWeight=bold&fontFamily=Roboto&bg=E42575&fg=FFFFFF",
    goalAmount: 1000,
    raisedAmount: 750,
    backers: 112,
  },
  {
    id: "4",
    title: "Solana Educational Platform",
    shortDescription: "Interactive courses teaching Solana development from beginner to advanced.",
    fullDescription:
      "Our educational platform offers comprehensive, interactive courses on Solana development. From beginner concepts to advanced topics, we cover everything you need to become a proficient Solana developer.",
    creatorAddress: "2prt67...4j2z",
    category: "Education",
    imageUrl:
      "/placeholder.svg?height=200&width=400&text=Education&fontWeight=bold&fontFamily=Roboto&bg=3871E0&fg=FFFFFF",
    goalAmount: 300,
    raisedAmount: 120,
    backers: 35,
  },
  {
    id: "5",
    title: "Decentralized Social Media",
    shortDescription: "A censorship-resistant social platform where users own their data and content.",
    fullDescription:
      "Our decentralized social media platform puts users in control of their data and content. Built on Solana for speed and low costs, it offers a censorship-resistant alternative to traditional social networks.",
    creatorAddress: "7xzt89...5h3p",
    category: "Social",
    imageUrl:
      "/placeholder.svg?height=200&width=400&text=Social Media&fontWeight=bold&fontFamily=Roboto&bg=FFA500&fg=000000",
    goalAmount: 800,
    raisedAmount: 275,
    backers: 64,
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { publicKey, connected } = useWallet()

  // Extract unique categories
  const categories = Array.from(new Set(mockProjects.map((project) => project.category)))

  const handleFilterChange = (category: string | null) => {
    if (category === null) {
      // setFilteredProjects(mockProjects)
    } else {
      // setFilteredProjects(mockProjects.filter((project) => project.category === category))
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <HeroSection />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProjectList
          projects={mockProjects}
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  )
}
