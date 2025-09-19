"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

interface StudyBlockFormProps {
  studyBlock?: StudyBlock
  onSubmit: (data: StudyBlockFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

const categories = [
  "Mathematics",
  "Science",
  "Literature",
  "History",
  "Programming",
  "Languages",
  "Art",
  "Music",
  "Other",
]

export function StudyBlockForm({ studyBlock, onSubmit, onCancel, isLoading = false }: StudyBlockFormProps) {
  const [formData, setFormData] = useState<StudyBlockFormData>({
    title: studyBlock?.title || "",
    startTime: studyBlock?.startTime || "",
    endTime: studyBlock?.endTime || "",
    date: studyBlock?.date || new Date().toISOString().split("T")[0],
    description: studyBlock?.description || "",
    category: studyBlock?.category || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof StudyBlockFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-card-foreground">
              {studyBlock ? "Edit Study Block" : "New Study Block"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {studyBlock ? "Update your study session details" : "Plan your focused study session"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-card-foreground">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Advanced Calculus"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-card-foreground">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-card-foreground">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-card-foreground">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  required
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-card-foreground">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  required
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-card-foreground">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add notes about what you'll be studying..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="bg-background border-border text-foreground resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-border text-card-foreground hover:bg-accent bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Saving..." : studyBlock ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
