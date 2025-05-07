"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-[#9945FF] text-white px-4 py-2 rounded-lg hover:bg-[#8035e0]">
        Go back home
      </Link>
    </div>
  )
}
