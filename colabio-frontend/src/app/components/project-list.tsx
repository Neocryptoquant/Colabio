import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import type { ProjectData } from "@/types/project"

interface ProjectListProps {
  projects: ProjectData[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video relative bg-gray-100">
              <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardContent className="p-5">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-medium line-clamp-1">{project.title}</h2>
                  <Badge variant="outline" className="bg-[#F0F0F0]">
                    {project.category}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{project.shortDescription}</p>
                <p className="text-gray-500 text-xs">Creator: {project.creatorAddress}</p>
              </div>

              <div>
                <Progress
                  value={(project.raisedAmount / project.goalAmount) * 100}
                  className="h-2 mb-2"
                  indicatorClassName="bg-[#9945FF]"
                />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{project.raisedAmount} SOL raised</span>
                  <span className="text-gray-500">of {project.goalAmount} SOL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
