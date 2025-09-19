"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"

export function useProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return {
    user,
    isEditing,
    formData,
    handleSave,
    handleEdit,
    handleCancel,
    updateFormData,
  }
}
