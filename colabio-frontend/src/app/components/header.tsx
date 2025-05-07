import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function Header() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Mock wallet connection (to be replaced with actual Solana wallet adapter)
  const handleConnectWallet = () => {
    if (connected) {
      setConnected(false)
      setWalletAddress("")
    } else {
      setConnected(true)
      setWalletAddress("8xrt45...9j7z")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32&text=C&fontWeight=bold&fontFamily=Roboto&fontSize=18&bg=9945FF&fg=FFFFFF"
              alt="Colabio Logo"
              width={32}
              height={32}
            />
          </div>
          <span className="font-medium text-xl">Colabio</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/create">
            <Button variant="outline" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </Link>

          <Button
            onClick={handleConnectWallet}
            className={connected ? "bg-[#9945FF] hover:bg-[#8035e0]" : "bg-[#9945FF] hover:bg-[#8035e0]"}
          >
            {connected ? `${walletAddress} • Disconnect` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  )
}
