"use client"

import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { StudyBlockForm } from "@/components/study-block-form"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardActivity } from "@/components/dashboard/DashboardActivity"
import { useDashboardPage } from "@/hooks/useDashboardPage"

export default function Dashboard() {
  const {
    editingBlock,
    setEditingBlock,
    isUpdating,
    stats,
    handleEditBlock,
    handleDeleteBlock,
    handleToggleComplete,
    formatBlockTime,
    getDuration,
  } = useDashboardPage()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <DashboardStats stats={stats} />
            <DashboardActivity 
              recentBlocks={stats.recentBlocks}
              upcomingBlocks={stats.upcomingBlocks}
              formatBlockTime={formatBlockTime}
              getDuration={getDuration}
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
