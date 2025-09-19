"use client"

import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { CalendarView } from "@/components/calendar-view"
import { StudyBlockForm } from "@/components/study-block-form"
import { ScheduleHeader } from "@/components/schedule/ScheduleHeader"
import { useSchedulePage } from "@/hooks/useSchedulePage"

export default function SchedulePage() {
  const {
    editingBlock,
    setEditingBlock,
    isUpdating,
    handleEditBlock,
    handleDeleteBlock,
    handleToggleComplete,
  } = useSchedulePage()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <ScheduleHeader />
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
