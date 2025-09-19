"use client"

import { useState, useEffect } from "react"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

// Mock data for demonstration
const mockStudyBlocks: StudyBlock[] = [
  {
    id: "1",
    title: "Advanced Calculus",
    startTime: "14:00",
    endTime: "16:30",
    date: "2024-12-19",
    description: "Integration techniques and applications",
    category: "Mathematics",
    completed: true,
    createdAt: "2024-12-18T10:00:00Z",
    updatedAt: "2024-12-18T10:00:00Z",
  },
  {
    id: "2",
    title: "Physics Lab Report",
    startTime: "10:00",
    endTime: "12:00",
    date: "2024-12-18",
    description: "Complete lab report on electromagnetic induction",
    category: "Science",
    completed: true,
    createdAt: "2024-12-17T09:00:00Z",
    updatedAt: "2024-12-17T09:00:00Z",
  },
  {
    id: "3",
    title: "Literature Review",
    startTime: "19:00",
    endTime: "21:30",
    date: "2024-12-18",
    description: "Research paper on modern poetry",
    category: "Literature",
    completed: true,
    createdAt: "2024-12-17T15:00:00Z",
    updatedAt: "2024-12-17T15:00:00Z",
  },
  {
    id: "4",
    title: "Organic Chemistry",
    startTime: "09:00",
    endTime: "11:00",
    date: "2024-12-20",
    description: "Reaction mechanisms and synthesis",
    category: "Science",
    completed: false,
    createdAt: "2024-12-19T08:00:00Z",
    updatedAt: "2024-12-19T08:00:00Z",
  },
  {
    id: "5",
    title: "Group Project Meeting",
    startTime: "14:00",
    endTime: "15:30",
    date: "2024-12-20",
    description: "Discuss final presentation structure",
    category: "Other",
    completed: false,
    createdAt: "2024-12-19T12:00:00Z",
    updatedAt: "2024-12-19T12:00:00Z",
  },
]

export function useStudyBlocks() {
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading from localStorage or API
    const savedBlocks = localStorage.getItem("studyBlocks")
    if (savedBlocks) {
      setStudyBlocks(JSON.parse(savedBlocks))
    } else {
      setStudyBlocks(mockStudyBlocks)
      localStorage.setItem("studyBlocks", JSON.stringify(mockStudyBlocks))
    }
    setIsLoading(false)
  }, [])

  const saveToStorage = (blocks: StudyBlock[]) => {
    localStorage.setItem("studyBlocks", JSON.stringify(blocks))
  }

  const createStudyBlock = (data: StudyBlockFormData): Promise<StudyBlock> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBlock: StudyBlock = {
          id: Date.now().toString(),
          ...data,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const updatedBlocks = [...studyBlocks, newBlock]
        setStudyBlocks(updatedBlocks)
        saveToStorage(updatedBlocks)
        resolve(newBlock)
      }, 500)
    })
  }

  const updateStudyBlock = (id: string, data: StudyBlockFormData): Promise<StudyBlock> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBlocks = studyBlocks.map((block) =>
          block.id === id
            ? {
                ...block,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : block,
        )
        setStudyBlocks(updatedBlocks)
        saveToStorage(updatedBlocks)
        const updatedBlock = updatedBlocks.find((block) => block.id === id)!
        resolve(updatedBlock)
      }, 500)
    })
  }

  const deleteStudyBlock = (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBlocks = studyBlocks.filter((block) => block.id !== id)
        setStudyBlocks(updatedBlocks)
        saveToStorage(updatedBlocks)
        resolve()
      }, 300)
    })
  }

  const toggleComplete = (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBlocks = studyBlocks.map((block) =>
          block.id === id
            ? {
                ...block,
                completed: !block.completed,
                updatedAt: new Date().toISOString(),
              }
            : block,
        )
        setStudyBlocks(updatedBlocks)
        saveToStorage(updatedBlocks)
        resolve()
      }, 300)
    })
  }

  return {
    studyBlocks,
    isLoading,
    createStudyBlock,
    updateStudyBlock,
    deleteStudyBlock,
    toggleComplete,
  }
}
