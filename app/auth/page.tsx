"use client"

import type React from "react"
import { useState } from "react"
import { AuthTopBar } from "./components/AuthTopBar"
import { AuthMain } from "./components/AuthMain"
import { AuthFooter } from "./components/AuthFooter"
import { useAuthPage } from "@/hooks/useAuthPage"

export default function AuthPage() {
  const {
    activeTab,
    setActiveTab,
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    errors,
    setShowPassword,
    setShowConfirmPassword,
    updateFormData,
    handleSubmit,
    handleGoogle,
  } = useAuthPage()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthTopBar />
      <AuthMain
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formData={formData}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        isLoading={isLoading}
        errors={errors}
        setShowPassword={setShowPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        updateFormData={updateFormData}
        handleSubmit={handleSubmit}
        handleGoogle={handleGoogle}
      />
      <div className="w-full max-w-md mx-auto">
        <AuthFooter />
      </div>
    </div>
  )
}
