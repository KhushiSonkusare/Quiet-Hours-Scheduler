"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp, signInWithGoogle } from "@/lib/authActions"

export type AuthTab = "signin" | "signup"

export function useAuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AuthTab>("signin")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

    if (activeTab === "signup") {
      if (!formData.name) newErrors.name = "Name is required"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setErrors({})
    try {
      if (activeTab === "signin") {
        await signIn(formData.email, formData.password)
      } else {
        await signUp(formData.name, formData.email, formData.password)
      }
      router.push("/dashboard")
    } catch (err: any) {
      setErrors({ general: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setErrors({ general: err.message })
    }
  }

  return {
    // state
    activeTab,
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    errors,
    // setters
    setActiveTab,
    setShowPassword,
    setShowConfirmPassword,
    updateFormData,
    setErrors,
    // actions
    handleSubmit,
    handleGoogle,
  }
}


