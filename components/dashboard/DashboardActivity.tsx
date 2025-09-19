"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardActivity({ 
  recentBlocks, 
  upcomingBlocks, 
  formatBlockTime, 
  getDuration 
}: { 
  recentBlocks: any[]
  upcomingBlocks: any[]
  formatBlockTime: (block: any) => string
  getDuration: (block: any) => string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Study Blocks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentBlocks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No recent study blocks</div>
          ) : (
            recentBlocks.map((block) => (
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
          {upcomingBlocks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No upcoming study blocks</div>
          ) : (
            upcomingBlocks.map((session) => (
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
  )
}
