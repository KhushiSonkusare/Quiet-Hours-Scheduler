"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react"

export type AuthMainProps = {
  activeTab: "signin" | "signup"
  setActiveTab: (t: "signin" | "signup") => void
  formData: { name: string; email: string; password: string; confirmPassword: string }
  showPassword: boolean
  showConfirmPassword: boolean
  isLoading: boolean
  errors: Record<string, string>
  setShowPassword: (v: boolean) => void
  setShowConfirmPassword: (v: boolean) => void
  updateFormData: (field: string, value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  handleGoogle: () => void
}

export function AuthMain(props: AuthMainProps) {
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
  } = props

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Study Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {activeTab === "signin" ? "Welcome back" : "Get started"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {activeTab === "signin"
              ? "Sign in to continue planning your study sessions"
              : "Create your account to start organizing your study time"}
          </p>
        </div>

        <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            {/* Tab Navigation */}
            <div className="flex bg-muted/50 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("signin")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                  activeTab === "signin"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                  activeTab === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Sign Up Only) */}
              {activeTab === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className={`pl-10 bg-background/50 border-border ${errors.name ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={`pl-10 bg-background/50 border-border ${errors.email ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className={`pl-10 pr-10 bg-background/50 border-border ${errors.password ? "border-destructive" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {activeTab === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 bg-background/50 border-border ${errors.confirmPassword ? "border-destructive" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Forgot Password Link (Sign In Only) */}
              {activeTab === "signin" && (
                <div className="flex justify-end">
                  <a href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium" disabled={isLoading}>
                {isLoading ? (activeTab === "signin" ? "Signing in..." : "Creating account...") : activeTab === "signin" ? "Sign in" : "Create account"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button type="button" variant="outline" className="w-full border-border bg-background/50 hover:bg-accent" onClick={handleGoogle} disabled={isLoading}>
                <Chrome className="h-4 w-4 mr-2" />
                {activeTab === "signin" ? "Sign in with Google" : "Sign up with Google"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


