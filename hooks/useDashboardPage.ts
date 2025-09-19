"use client"

import { useState } from "react"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

export function useDashboardPage() {
  const [editingBlock, setEditingBlock] = useState<StudyBlock | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const stats = useDashboardStats()
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

  const formatBlockTime = (block: StudyBlock) => {
    const formatTime = (time: string) => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    }

    const formatDate = (date: string) => {
      const blockDate = new Date(date)
      const now = new Date()
      const isToday = blockDate.toDateString() === now.toDateString()
      const isYesterday = blockDate.toDateString() === new Date(now.getTime() - 86400000).toDateString()
      const isTomorrow = blockDate.toDateString() === new Date(now.getTime() + 86400000).toDateString()

      if (isToday) return "Today"
      if (isYesterday) return "Yesterday"
      if (isTomorrow) return "Tomorrow"
      return blockDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    return `${formatTime(block.startTime)} - ${formatTime(block.endTime)} • ${formatDate(block.date)}`
  }

  const getDuration = (block: StudyBlock) => {
    const start = new Date(`2000-01-01T${block.startTime}`)
    const end = new Date(`2000-01-01T${block.endTime}`)
    const diff = end.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return {
    editingBlock,
    setEditingBlock,
    isUpdating,
    stats,
    handleEditBlock,
    handleDeleteBlock,
    handleToggleComplete,
    formatBlockTime,
    getDuration,
  }
}
