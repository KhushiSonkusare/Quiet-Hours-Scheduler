"use client"

import { Calendar, LayoutDashboard, User, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { StudyBlockForm } from "@/components/study-block-form"
import { useStudyBlocks } from "@/hooks/use-study-blocks"
import type { StudyBlockFormData } from "@/types/study-block"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const [showForm, setShowForm] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { createStudyBlock } = useStudyBlocks()

  const handleCreateBlock = async (data: StudyBlockFormData) => {
    setIsCreating(true)
    try {
      await createStudyBlock(data)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create study block:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground">Quiet Hours</span>
          </div>
        </div>

        <div className="flex-1 px-4 py-6">
          <Button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Study Block
          </Button>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {showForm && (
        <StudyBlockForm onSubmit={handleCreateBlock} onCancel={() => setShowForm(false)} isLoading={isCreating} />
      )}
    </>
  )
}
