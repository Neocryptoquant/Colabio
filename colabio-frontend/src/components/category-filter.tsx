"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { CategoryFilterProps } from "@/types/project"

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategoryChange("all")
    } else {
      onCategoryChange(category)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => handleCategoryClick("all")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
