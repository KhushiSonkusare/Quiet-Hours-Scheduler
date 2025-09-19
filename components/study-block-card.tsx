"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, MoreVertical, Edit, Trash2, CheckCircle } from "lucide-react"
import type { StudyBlock } from "@/types/study-block"

interface StudyBlockCardProps {
  studyBlock: StudyBlock
  onEdit: (studyBlock: StudyBlock) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export function StudyBlockCard({ studyBlock, onEdit, onDelete, onToggleComplete }: StudyBlockCardProps) {
  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getDuration = () => {
    const start = new Date(`2000-01-01T${studyBlock.startTime}`)
    const end = new Date(`2000-01-01T${studyBlock.endTime}`)
    const diff = end.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const isUpcoming = new Date(`${studyBlock.date}T${studyBlock.startTime}`) > new Date()
  const isPast = new Date(`${studyBlock.date}T${studyBlock.endTime}`) < new Date()

  return (
    <Card
      className={`bg-card border-border transition-all hover:shadow-md ${studyBlock.completed ? "opacity-75" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium text-card-foreground ${studyBlock.completed ? "line-through" : ""}`}>
                {studyBlock.title}
              </h3>
              {studyBlock.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>

            {studyBlock.category && (
              <div className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                {studyBlock.category}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {formatTime(studyBlock.startTime)} - {formatTime(studyBlock.endTime)}
                </span>
              </div>
              <span>•</span>
              <span>{formatDate(studyBlock.date)}</span>
              <span>•</span>
              <span>{getDuration()}</span>
            </div>

            {studyBlock.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{studyBlock.description}</p>
            )}

            <div className="flex items-center gap-2">
              {isUpcoming && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">Upcoming</span>
              )}
              {isPast && !studyBlock.completed && (
                <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-500">Missed</span>
              )}
              {isPast && studyBlock.completed && (
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">Completed</span>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onToggleComplete(studyBlock.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {studyBlock.completed ? "Mark Incomplete" : "Mark Complete"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(studyBlock)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(studyBlock.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
