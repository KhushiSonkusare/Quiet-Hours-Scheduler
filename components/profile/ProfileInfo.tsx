"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileInfo({ 
  user, 
  isEditing, 
  formData, 
  handleSave, 
  handleEdit, 
  handleCancel, 
  updateFormData 
}: {
  user: any
  isEditing: boolean
  formData: { name: string; email: string }
  handleSave: () => void
  handleEdit: () => void
  handleCancel: () => void
  updateFormData: (field: string, value: string) => void
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Personal Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/diverse-user-avatars.png" alt="User" />
            <AvatarFallback className="text-lg">
              {user?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium text-card-foreground">{user?.name}</h3>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-card-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-border text-foreground"
            />
          </div>
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-border text-card-foreground"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
