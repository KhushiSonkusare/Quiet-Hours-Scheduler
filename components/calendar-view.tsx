"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, X } from "lucide-react"
import { StudyBlockCard } from "@/components/study-block-card"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlock } from "@/types/study-block"

interface CalendarViewProps {
  onEdit: (studyBlock: StudyBlock) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export function CalendarView({ onEdit, onDelete, onToggleComplete }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [modalDate, setModalDate] = useState<Date | null>(null)
  const { studyBlocks, isLoading } = useStudyBlocks()

  const currentMonth = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of month and adjust to start from Sunday
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    // Generate 42 days (6 weeks) to fill calendar grid
    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }

    return days
  }, [currentDate])

  const getBlocksForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return studyBlocks
      .filter((block) => block.date === dateString)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setModalDate(null)
    setShowModal(false)
  }

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const handleDateClick = (date: Date) => {
    const blocks = getBlocksForDate(date)
    if (blocks.length > 0) {
      setModalDate(date)
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setModalDate(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading schedule...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="text-2xl font-semibold text-card-foreground flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-primary" />
                {formatMonthYear()}
              </CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="border-border/60 text-card-foreground bg-background/50 hover:bg-accent/50 px-4 py-2 font-medium"
              >
                Today
              </Button>
              <div className="flex items-center border border-border/60 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                  className="border-0 rounded-none hover:bg-accent/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                  className="border-0 rounded-none hover:bg-accent/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
        <CardContent className="p-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {currentMonth.map((date, index) => {
              const dayBlocks = getBlocksForDate(date)
              const isCurrentMonthDate = isCurrentMonth(date)
              const isTodayDate = isToday(date)

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    min-h-[120px] p-2 rounded-lg border transition-all duration-200 cursor-pointer
                    ${
                      isTodayDate
                        ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30"
                        : "bg-background/50 border-border/30 hover:bg-background/70"
                    }
                    ${!isCurrentMonthDate ? "opacity-40" : ""}
                    ${dayBlocks.length > 0 ? "hover:shadow-md" : ""}
                  `}
                >
                  {/* Date number */}
                  <div
                    className={`text-sm font-medium mb-2 ${isTodayDate ? "text-primary" : isCurrentMonthDate ? "text-card-foreground" : "text-muted-foreground"}`}
                  >
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayBlocks.slice(0, 3).map((block) => (
                      <div key={block.id} className="text-xs p-1.5 rounded bg-primary/20 text-primary truncate">
                        <div className="font-medium truncate">{block.subject}</div>
                        <div className="text-primary/70">{block.startTime}</div>
                      </div>
                    ))}
                    {dayBlocks.length > 3 && (
                      <div className="text-xs text-muted-foreground font-medium text-center py-1">
                        +{dayBlocks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal popup */}
      {showModal && modalDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-card-foreground">
                {modalDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h2>
              <Button variant="ghost" size="sm" onClick={closeModal} className="hover:bg-accent/50">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              {getBlocksForDate(modalDate).map((block) => (
                <StudyBlockCard
                  key={block.id}
                  studyBlock={block}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
