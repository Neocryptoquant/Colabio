import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Colabio</h3>
            <p className="text-gray-600 text-sm">
              A crowdfunding platform built on Solana blockchain, connecting innovators with backers.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#9945FF]">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for updates</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Colabio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
