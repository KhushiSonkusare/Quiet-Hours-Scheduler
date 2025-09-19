"use client"

import { BookOpen } from "lucide-react"

export function AuthTopBar() {
  return (
    <div className="w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">Quiet Hours Scheduler</span>
          </div>
          <div className="text-sm text-muted-foreground">Focus • Plan • Achieve</div>
        </div>
      </div>
    </div>
  )
}


