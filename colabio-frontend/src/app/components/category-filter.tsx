"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  onFilterChange: (category: string | null) => void
}

export default function CategoryFilter({ categories, onFilterChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
      onFilterChange(null)
    } else {
      setActiveCategory(category)
      onFilterChange(category)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={activeCategory === null ? "default" : "outline"}
        className={activeCategory === null ? "bg-[#9945FF] hover:bg-[#8035e0]" : ""}
        onClick={() => {
          setActiveCategory(null)
          onFilterChange(null)
        }}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className={activeCategory === category ? "bg-[#9945FF] hover:bg-[#8035e0]" : ""}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
