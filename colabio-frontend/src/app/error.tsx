"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="mb-4">An unexpected error occurred while loading the page.</p>
      <button
        onClick={reset}
        className="bg-[#9945FF] text-white px-4 py-2 rounded-lg hover:bg-[#8035e0]"
      >
        Try again
      </button>
    </div>
  )
}
