"use client"

import { useMemo } from "react"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlock } from "@/types/study-block"

export interface DashboardStats {
  thisWeekHours: number
  thisWeekChange: number
  longestBlock: {
    duration: number
    title: string
    date: string
    time: string
  }
  averageSession: number
  averageChange: number
  totalBlocks: number
  completedBlocks: number
  upcomingBlocks: StudyBlock[]
  recentBlocks: StudyBlock[]
}

export function useDashboardStats(): DashboardStats {
  const { studyBlocks } = useStudyBlocks()

  return useMemo(() => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const startOfLastWeek = new Date(startOfWeek)
    startOfLastWeek.setDate(startOfWeek.getDate() - 7)

    const endOfLastWeek = new Date(startOfWeek)
    endOfLastWeek.setDate(startOfWeek.getDate() - 1)

    // Helper function to calculate duration in hours
    const getDurationHours = (block: StudyBlock): number => {
      const start = new Date(`2000-01-01T${block.startTime}`)
      const end = new Date(`2000-01-01T${block.endTime}`)
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    }

    // Helper function to check if block is in date range
    const isInDateRange = (block: StudyBlock, start: Date, end: Date): boolean => {
      const blockDate = new Date(block.date)
      return blockDate >= start && blockDate <= end
    }

    // This week's blocks
    const thisWeekBlocks = studyBlocks.filter((block) => isInDateRange(block, startOfWeek, endOfWeek))
    const thisWeekHours = thisWeekBlocks.reduce((total, block) => total + getDurationHours(block), 0)

    // Last week's blocks for comparison
    const lastWeekBlocks = studyBlocks.filter((block) => isInDateRange(block, startOfLastWeek, endOfLastWeek))
    const lastWeekHours = lastWeekBlocks.reduce((total, block) => total + getDurationHours(block), 0)

    const thisWeekChange = lastWeekHours > 0 ? ((thisWeekHours - lastWeekHours) / lastWeekHours) * 100 : 0

    // Find longest block
    let longestBlock = {
      duration: 0,
      title: "No sessions yet",
      date: "",
      time: "",
    }

    studyBlocks.forEach((block) => {
      const duration = getDurationHours(block)
      if (duration > longestBlock.duration) {
        const blockDate = new Date(block.date)
        const isToday = blockDate.toDateString() === now.toDateString()
        const isYesterday = blockDate.toDateString() === new Date(now.getTime() - 86400000).toDateString()

        let dateLabel = blockDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        if (isToday) dateLabel = "Today"
        else if (isYesterday) dateLabel = "Yesterday"

        const startTime = new Date(`2000-01-01T${block.startTime}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        const endTime = new Date(`2000-01-01T${block.endTime}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })

        longestBlock = {
          duration,
          title: block.title,
          date: dateLabel,
          time: `${startTime}-${endTime}`,
        }
      }
    })

    // Calculate average session duration
    const completedBlocks = studyBlocks.filter((block) => block.completed)
    const averageSession =
      completedBlocks.length > 0
        ? completedBlocks.reduce((total, block) => total + getDurationHours(block), 0) / completedBlocks.length
        : 0

    // Calculate average change (simplified - comparing this week vs last week)
    const thisWeekCompletedBlocks = thisWeekBlocks.filter((block) => block.completed)
    const lastWeekCompletedBlocks = lastWeekBlocks.filter((block) => block.completed)

    const thisWeekAverage =
      thisWeekCompletedBlocks.length > 0
        ? thisWeekCompletedBlocks.reduce((total, block) => total + getDurationHours(block), 0) /
          thisWeekCompletedBlocks.length
        : 0

    const lastWeekAverage =
      lastWeekCompletedBlocks.length > 0
        ? lastWeekCompletedBlocks.reduce((total, block) => total + getDurationHours(block), 0) /
          lastWeekCompletedBlocks.length
        : 0

    const averageChange = lastWeekAverage > 0 ? ((thisWeekAverage - lastWeekAverage) / lastWeekAverage) * 100 : 0

    // Get upcoming blocks (next 4)
    const upcomingBlocks = studyBlocks
      .filter((block) => {
        const blockDateTime = new Date(`${block.date}T${block.startTime}`)
        return blockDateTime > now && !block.completed
      })
      .sort((a, b) => {
        const aDateTime = new Date(`${a.date}T${a.startTime}`)
        const bDateTime = new Date(`${b.date}T${b.startTime}`)
        return aDateTime.getTime() - bDateTime.getTime()
      })
      .slice(0, 4)

    // Get recent blocks (last 4 completed or past)
    const recentBlocks = studyBlocks
      .filter((block) => {
        const blockDateTime = new Date(`${block.date}T${block.endTime}`)
        return blockDateTime <= now
      })
      .sort((a, b) => {
        const aDateTime = new Date(`${a.date}T${a.startTime}`)
        const bDateTime = new Date(`${b.date}T${b.startTime}`)
        return bDateTime.getTime() - aDateTime.getTime()
      })
      .slice(0, 4)

    return {
      thisWeekHours: Math.round(thisWeekHours * 10) / 10,
      thisWeekChange: Math.round(thisWeekChange * 10) / 10,
      longestBlock,
      averageSession: Math.round(averageSession * 10) / 10,
      averageChange: Math.round(averageChange * 10) / 10,
      totalBlocks: thisWeekBlocks.length,
      completedBlocks: completedBlocks.length,
      upcomingBlocks,
      recentBlocks,
    }
  }, [studyBlocks])
}
