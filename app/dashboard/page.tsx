// app/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server" // Your working file!
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  // Fetch profile data from your 'profiles' table
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single()

  return (
    <div className="relative min-h-screen text-white antialiased selection:bg-white/20 selection:text-white overflow-auto">
      <img
        src="/background.png"
        className="fixed inset-0 h-full w-full object-cover object-center opacity-100 -z-10"
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10 shadow-xl">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome, {profile?.first_name || user.email}
          </h1>
          <p className="text-white/70 mb-2">
            You are successfully logged in.
          </p>
          <p className="text-sm text-white/50 mb-6">User ID: {user.id}</p>
          
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}