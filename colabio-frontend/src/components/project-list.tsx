import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ProjectData } from "@/types/project"

import { ProjectListProps } from "@/types/project"

export default function ProjectList({ projects, selectedCategory }: ProjectListProps) {
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video relative bg-gray-100">
              <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.shortDescription}</p>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{project.category}</Badge>
                <span className="text-sm text-gray-500">{project.backers} backers</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Goal: {project.goalAmount} SOL</span>
                  <span className="text-green-600">{project.raisedAmount} SOL raised</span>
                </div>
                <Progress value={(project.raisedAmount / project.goalAmount) * 100} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
