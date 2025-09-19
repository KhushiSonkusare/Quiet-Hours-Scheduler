"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudyBlockForm } from "@/components/study-block-form"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import { Clock, Target, TrendingUp, Calendar, TrendingDown } from "lucide-react"
import type { StudyBlock, StudyBlockFormData } from "@/types/study-block"

export default function Dashboard() {
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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{stats.thisWeekHours}h</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {stats.thisWeekChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    {stats.thisWeekChange >= 0 ? "+" : ""}
                    {stats.thisWeekChange.toFixed(1)}% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Longest Block</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    {stats.longestBlock.duration > 0 ? `${stats.longestBlock.duration.toFixed(1)}h` : "0h"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.longestBlock.duration > 0
                      ? `${stats.longestBlock.date}, ${stats.longestBlock.time}`
                      : "No sessions completed yet"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{stats.averageSession.toFixed(1)}h</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {stats.averageChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    {stats.averageChange >= 0 ? "+" : ""}
                    {stats.averageChange.toFixed(1)}% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Blocks</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{stats.totalBlocks}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recent Study Blocks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.recentBlocks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No recent study blocks</div>
                  ) : (
                    stats.recentBlocks.map((block) => (
                      <div key={block.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-card-foreground">{block.title}</p>
                          <p className="text-xs text-muted-foreground">{formatBlockTime(block)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-muted-foreground">{getDuration(block)}</div>
                          {block.completed && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.upcomingBlocks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No upcoming study blocks</div>
                  ) : (
                    stats.upcomingBlocks.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-card-foreground">{session.title}</p>
                          <p className="text-xs text-muted-foreground">{formatBlockTime(session)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-muted-foreground">{getDuration(session)}</div>
                          {session.category && (
                            <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {session.category}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
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
