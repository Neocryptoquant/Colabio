"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/"
        className={`text-lg font-medium ${pathname === "/" ? "text-[#9945FF]" : "text-gray-600"}`}
      >
        Home
      </Link>

      <Link
        href="/create"
        className={`text-lg font-medium ${pathname === "/create" ? "text-[#9945FF]" : "text-gray-600"}`}
      >
        Create
      </Link>

      <Link
        href="/projects"
        className={`text-lg font-medium ${pathname === "/projects" ? "text-[#9945FF]" : "text-gray-600"}`}
      >
        Projects
      </Link>

      <Link href="/create">
        <Button variant="outline" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Create Project</span>
        </Button>
      </Link>
    </nav>
  )
}
