"use client"

import { useState } from "react"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

export function useSchedulePage() {
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

  return {
    editingBlock,
    setEditingBlock,
    isUpdating,
    handleEditBlock,
    handleDeleteBlock,
    handleToggleComplete,
  }
}
