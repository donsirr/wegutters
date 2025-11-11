"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Package, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface PasswordStrength {
    minLength: boolean
    hasNumber: boolean
    hasSpecial: boolean
}

interface RegisterFormProps {
    onSwitchToLogin: () => void
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps): React.ReactNode {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const supabase = createClient()

    const passwordStrength: PasswordStrength = {
        minLength: password.length > 8,
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    }

    const isPasswordStrong: boolean = Object.values(passwordStrength).every(Boolean)
    const isFormValid: boolean =
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        email.trim().length > 2 &&
        isPasswordStrong &&
        agreedToTerms

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if (!isFormValid) return

        setIsLoading(true)
        setErrorMessage(null)
        setSuccessMessage(null)

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        setIsLoading(false)

        if (error) {
            setErrorMessage(error.message)
        } else if (data.user) {
            setSuccessMessage("Account created! Please check your email to confirm.")
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setAgreedToTerms(false)
        }
    }

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword)
    }

    const StrengthIndicator = ({ met, label }: { met: boolean; label: string }): React.ReactNode => (
        <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full transition-colors ${met ? "bg-green-400" : "bg-white/20"}`}></div>
            <span className={`text-xs ${met ? "text-green-400/90" : "text-white/60"}`}>{label}</span>
        </div>
    )

    return (
        <main className="relative flex min-h-screen items-center justify-center p-4 sm:p-6">
            {/* Card Container */}
            <div className="relative z-10 w-full max-w-3xl">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-3xl shadow-2xl shadow-black/40 ring-1 ring-white/20 transition-all duration-300 hover:border-white/30 hover:ring-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(249,115,22,0.35)]">
                    {/* Top hairline */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* Split: Image + Details */}
                    <div className="relative flex flex-col sm:flex-row">
                        {/* Image (Left) */}
                        <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
                            <img
                                src="/register-frame.avif"
                                alt="Futuristic render"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent"></div>
                        </div>

                        {/* Details (Right) */}
                        <div className="p-6 sm:p-8 w-full sm:w-1/2 max-h-[90vh] overflow-y-auto">
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
                                <h1 className="text-[26px] font-semibold tracking-tight text-white">Create Account</h1>
                                <p className="mt-1.5 text-sm text-white/60">Become part of the family.</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Inputs */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* First Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-sm text-white/80">
                                            First Name
                                        </label>
                                        <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                                            <User className="mr-2 h-4.5 w-4.5 text-white/60" />
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="block text-sm text-white/80">
                                            Last Name
                                        </label>
                                        <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                                            <User className="mr-2 h-4.5 w-4.5 text-white/60" />
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                            autoComplete="email"
                                            placeholder="you@domain.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm text-white/80">
                                        Password
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

                                {/* Password Strength Criteria */}
                                {password.length > 0 && (
                                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
                                        <p className="text-xs font-semibold text-white/70">Strong Password Criteria:</p>
                                        <div className="space-y-1.5">
                                            <StrengthIndicator met={passwordStrength.minLength} label="More than 8 characters long" />
                                            <StrengthIndicator met={passwordStrength.hasNumber} label="Include a number (0-9)" />
                                            <StrengthIndicator
                                                met={passwordStrength.hasSpecial}
                                                label="Include a special character (!@#$%^&*...)"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Terms Checkbox */}
                                <label className="inline-flex cursor-pointer select-none items-center gap-2 pt-1">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <span className="grid h-5 w-5 place-items-center rounded-md border border-white/15 bg-white/5 transition-all peer-checked:bg-blue-500 peer-checked:border-blue-400 peer-checked:shadow-[0_0_0_3px_rgba(22,115,249,0.25)]">
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
                                    <span className="text-sm text-white/80">
                                        I agree to the{" "}
                                        <a href="#" className="text-blue-300/90 hover:text-blue-300 underline-offset-2 hover:underline">
                                            Terms of Service
                                        </a>
                                    </span>
                                </label>

                                {/* 4. RENDER MESSAGES HERE */}
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

                                {/* Divider */}
                                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                {/* Divider */}
                                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                {/* Submit Button */}
                                <div className="grid gap-3">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || isLoading}
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
                                        {isLoading ? "Creating account..." : "Create account"}
                                    </button>
                                    <p className="text-center text-xs text-white/55">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={onSwitchToLogin}
                                            className="text-blue-300/90 hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer"
                                        >
                                            Sign in
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