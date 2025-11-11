"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, Package } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function UpdatePasswordPage(): React.ReactNode {
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()
  const isValid: boolean = password.length >= 8 // Or use your password strength logic

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!isValid) return

    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    // This is the Supabase function to update the password
    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    setIsLoading(false)

    if (error) {
      setErrorMessage(error.message)
    } else {
      setSuccessMessage("Password updated successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative min-h-screen text-white antialiased selection:bg-white/20 selection:text-white overflow-auto">
      {/* Background Image */}
      <img
        src="/background.png"
        className="fixed inset-0 h-full w-full object-cover object-center opacity-100 -z-10"
      />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative z-10 w-full max-w-md">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-3xl shadow-2xl shadow-black/40 ring-1 ring-white/20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center bg-stone-400/20 border border-white/15 rounded-xl shadow-sm">
                  <Package className="h-5 w-5 text-white/90" />
                </div>
                <div>
                  <div className="text-[22px] tracking-tight font-semibold text-white">Western Edge Gutters</div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h1 className="text-[26px] font-semibold tracking-tight text-white">Choose a New Password</h1>
                <p className="mt-1.5 text-sm text-white/60">Enter your new password below.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm text-white/80">
                    New Password
                  </label>
                  <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                    <Lock className="mr-2 h-4.5 w-4.5 text-white/60" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="ml-2 grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:text-white/90 hover:bg-white/10 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {errorMessage && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
                    {successMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="grid gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isLoading || !!successMessage}
                    className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/30 outline-none ring-1 ring-blue-400/30 transition-all hover:shadow-blue-900/40 focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 hover:brightness-110 hover:saturate-125"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 0% 0%, rgba(60,146,251,1) 0%, rgba(22,115,249,1) 36%, rgba(60,146,251,0.25) 60%), radial-gradient(120% 120% at 100% 0%, rgba(11,158,245,1) 0%, rgba(60,146,251,0.9) 45%, rgba(11,158,245,0.25) 70%), radial-gradient(140% 140% at 100% 100%, rgba(22,115,249,1) 10%, rgba(12,88,234,1) 45%, rgba(18,52,154,1) 85%)",
                    }}
                  >
                    {isLoading ? "Saving..." : "Save New Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}