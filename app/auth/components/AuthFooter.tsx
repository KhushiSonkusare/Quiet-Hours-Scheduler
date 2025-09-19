"use client"

import Link from "next/link"

export function AuthFooter() {
  return (
    <p className="text-center text-xs text-muted-foreground mt-6">
      By continuing, you agree to our{" "}
      <Link href="/terms" className="text-primary hover:underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="text-primary hover:underline">
        Privacy Policy
      </Link>
    </p>
  )
}


