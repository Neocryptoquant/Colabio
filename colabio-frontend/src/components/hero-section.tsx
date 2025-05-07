import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] py-16 mb-12 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/placeholder.svg?height=600&width=1200&text=&bg=FFFFFF"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fund the Future on Solana</h1>
          <p className="text-xl text-white/90 mb-8">
            Colabio connects innovative projects with backers in the Solana ecosystem. Launch your idea or support the
            next big thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/create">
              <Button className="bg-white text-[#9945FF] hover:bg-white/90">Start a Project</Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Explore Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
