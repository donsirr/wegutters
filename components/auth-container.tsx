"use client"

import type React from "react"
import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

type AuthMode = "login" | "register"

export default function AuthContainer(): React.ReactNode {
  const [mode, setMode] = useState<AuthMode>("login")

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Card Container */}
      <div className="relative z-10 w-full max-w-3xl my-auto">
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </main>
  )
}
