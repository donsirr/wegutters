"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Package, ImageIcon, Shield, Clock } from "lucide-react"

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps): React.ReactNode {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isValid: boolean = email.trim().length > 2 && password.length >= 6

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!isValid) return

    setIsLoading(true)
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Login attempted:", { email, password, remember })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 sm:p-6">
      {/* Card Container */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-3xl shadow-2xl shadow-black/40 ring-1 ring-white/20 transition-all duration-300 hover:border-white/30 hover:ring-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(22,115,249,0.85)]">
          {/* Top hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Split: Image + Details */}
          <div className="relative flex flex-col sm:flex-row">
            {/* Image (Left) */}
            <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
              <img
                src="/login-frame.avif"
                alt="Futuristic render"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent"></div>
            </div>

            {/* Details (Right) */}
            <div className="p-6 sm:p-8 w-full sm:w-1/2">
              {/* Header with Logo */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center bg-stone-400/20 border border-white/15 rounded-xl shadow-sm">
                    <Package className="h-5 w-5 text-white/90" />
                  </div>
                  <div>
                    <div className="text-[22px] tracking-tight font-semibold text-white">Western Edge Gutters</div>
                  </div>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="mb-6">
                <h1 className="text-[26px] font-semibold tracking-tight text-white">Welcome</h1>
                <p className="mt-1.5 text-sm text-white/60">Sign in to continue your access.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-white/80">
                    Email
                  </label>
                  <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                    <Mail className="mr-2 h-4.5 w-4.5 text-white/60" />
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="username"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-white/80">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-blue-300/80 hover:text-blue-300 underline-offset-4 transition-colors hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                    <Lock className="mr-2 h-4.5 w-4.5 text-white/60" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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

                {/* Options */}
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex cursor-pointer select-none items-center gap-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="grid h-5 w-5 place-items-center rounded-md border border-white/15 bg-white/5 transition-all peer-checked:bg-blue-500 peer-checked:border-blue-400 peer-checked:shadow-[0_0_0_3px_rgba(9,115,249,0.25)]">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                      >
                        <path
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 6 9 17l-5-5"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white/80 underline-offset-4 transition-colors hover:underline"
                  >
                    Need help?
                  </a>
                </div>

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Submit Button */}
                <div className="grid gap-3">
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/30 outline-none ring-1 ring-blue-400/30 transition-all hover:shadow-blue-900/40 focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 hover:brightness-110 hover:saturate-125"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 0% 0%, rgba(60,146,251,1) 0%, rgba(22,115,249,1) 36%, rgba(60,146,251,0.25) 60%), radial-gradient(120% 120% at 100% 0%, rgba(11,158,245,1) 0%, rgba(60,146,251,0.9) 45%, rgba(11,158,245,0.25) 70%), radial-gradient(140% 140% at 100% 100%, rgba(22,115,249,1) 10%, rgba(12,88,234,1) 45%, rgba(18,52,154,1) 85%)",
                    }}
                  >
                    <span className="absolute inset-0 -z-10 rounded-xl bg-blue-400/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"></span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4.5 w-4.5"
                    >
                      <path d="m10 17 5-5-5-5"></path>
                      <path d="M15 12H3"></path>
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    </svg>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                  <p className="text-center text-xs text-white/55">
                    New here?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-blue-300/90 hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
