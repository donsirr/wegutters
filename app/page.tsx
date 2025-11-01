import AuthContainer from "@/components/auth-container"

export default function Home() {
  return (
    <div className="relative min-h-screen text-white antialiased selection:bg-white/20 selection:text-white overflow-auto">
      <img
        src="/background.png"
        className="fixed inset-0 h-full w-full object-cover object-center opacity-100 -z-10"
      />
      <div className="relative z-10 min-h-screen justify-center">
        {/* <LoginForm />
        <RegisterForm /> */}
        <AuthContainer />
      </div>
    </div>

  );
}