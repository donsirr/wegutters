// app/dashboard/logout-button.tsx
"use client"

import { logout } from "@/app/auth/actions"
import { useState } from "react"

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    await logout()
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={isLoading}
        className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-900/30 outline-none ring-1 ring-red-400/30 transition-all hover:shadow-red-900/40 focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60 bg-red-600/50 hover:bg-red-600/70"
      >
        {isLoading ? "Signing out..." : "Sign Out"}
      </button>
    </form>
  )
}