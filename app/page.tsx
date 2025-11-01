import type React from "react"
import AuthContainer from "@/components/auth-container"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white/20 selection:text-white fixed inset-0 -z-10">
      <img
        src="/background.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100 -z-10"
      />
      <div className="relative z-10 min-h-screen justify-center">
        {/* <LoginForm />
        <RegisterForm /> */}
        <AuthContainer />
      </div>
    </div>

  );
}
