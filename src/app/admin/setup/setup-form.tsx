"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Sparkles, ArrowRight, Loader2, Lock, Mail, User } from "lucide-react"
import { signUp } from "@/lib/auth-client"

export default function SetupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setLoading(true)
    try {
      const res = await signUp.email({
        email,
        password,
        name,
      })

      if (res.error) {
        setError(res.error.message || "Registration failed. Please try again.")
        setLoading(false)
        return
      }

      router.push("/admin")
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-lg bg-[#141414] border border-[#C9A84C]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
      {/* Subtle Japanese Monogram Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C] font-serif text-2xl mb-4 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
          絆
        </div>
        <h1 className="font-serif text-2xl tracking-wide text-[#F7F5F0]">Master Admin Setup</h1>
        <p className="text-xs font-mono text-[#C9A84C] mt-1.5 uppercase tracking-widest">
          Initial System Registration
        </p>
        <p className="text-neutral-400 text-xs mt-2 max-w-xs mx-auto">
          Create the primary administrator account for the Woxsen Japan Centre management suite.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
          <span className="font-bold font-mono">!</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Administrator"
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/[0.1] focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
            Official Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@woxsen.edu.in"
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/[0.1] focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
            Secure Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/[0.1] focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/[0.1] focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Configuring Account...</span>
            </>
          ) : (
            <>
              <span>Initialize Admin</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
