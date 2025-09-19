"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { CalendarView } from "@/components/calendar-view"
import { StudyBlockForm } from "@/components/study-block-form"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

export default function SchedulePage() {
  const [editingBlock, setEditingBlock] = useState<StudyBlock | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const { updateStudyBlock, deleteStudyBlock, toggleComplete } = useStudyBlocks()

  const handleEditBlock = async (data: StudyBlockFormData) => {
    if (!editingBlock) return

    setIsUpdating(true)
    try {
      await updateStudyBlock(editingBlock.id, data)
      setEditingBlock(null)
    } catch (error) {
      console.error("Failed to update study block:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteBlock = async (id: string) => {
    try {
      await deleteStudyBlock(id)
    } catch (error) {
      console.error("Failed to delete study block:", error)
    }
  }

  const handleToggleComplete = async (id: string) => {
    try {
      await toggleComplete(id)
    } catch (error) {
      console.error("Failed to toggle completion:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Schedule</h1>
              <p className="text-muted-foreground">View and manage your study blocks in calendar format</p>
            </div>

            <CalendarView
              onEdit={setEditingBlock}
              onDelete={handleDeleteBlock}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </main>
      </div>

      {editingBlock && (
        <StudyBlockForm
          studyBlock={editingBlock}
          onSubmit={handleEditBlock}
          onCancel={() => setEditingBlock(null)}
          isLoading={isUpdating}
        />
      )}
    </div>
  )
}
