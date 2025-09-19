"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

export function ProfileStats() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Account Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Member since</p>
              <p className="text-xs text-muted-foreground">December 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Total study time</p>
              <p className="text-xs text-muted-foreground">127.5 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Study blocks</p>
              <p className="text-xs text-muted-foreground">42 completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">Email notifications</span>
            <Button variant="outline" size="sm" className="border-border text-card-foreground bg-transparent">
              Enabled
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">Theme</span>
            <Button variant="outline" size="sm" className="border-border text-card-foreground bg-transparent">
              Dark
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">Time format</span>
            <Button variant="outline" size="sm" className="border-border text-card-foreground bg-transparent">
              12-hour
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
