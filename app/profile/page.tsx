"use client"

import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { ProfileInfo } from "@/components/profile/ProfileInfo"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { useProfilePage } from "@/hooks/useProfilePage"

export default function ProfilePage() {
  const {
    user,
    isEditing,
    formData,
    handleSave,
    handleEdit,
    handleCancel,
    updateFormData,
  } = useProfilePage()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProfileInfo
                  user={user}
                  isEditing={isEditing}
                  formData={formData}
                  handleSave={handleSave}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  updateFormData={updateFormData}
                />
              </div>
              <ProfileStats />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
