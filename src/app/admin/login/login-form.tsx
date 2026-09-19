"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield, ArrowRight, Loader2, Lock, Mail, KeyRound } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export default function LoginForm({ hasUsers }: { hasUsers: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await signIn.email({
        email,
        password,
      })

      if (res.error) {
        setError(res.error.message || "Invalid credentials. Please verify your email and password.")
        setLoading(false)
        return
      }

      router.push(returnUrl)
      router.refresh()
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred during authentication.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-lg bg-[#141414] border border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.8)] relative">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C] font-serif text-2xl mb-4 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
          絆
        </div>
        <h1 className="font-serif text-2xl tracking-wide text-[#F7F5F0]">WJC Management Suite</h1>
        <p className="text-xs font-mono text-[#C9A84C] mt-1.5 uppercase tracking-widest">
          Administrator Authentication
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
            Email Address
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
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/[0.1] focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(201,168,76,0.25)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {!hasUsers && (
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
          <p className="text-xs text-neutral-400 mb-2">No administrator account detected.</p>
          <Link
            href="/admin/setup"
            className="inline-flex items-center gap-1.5 text-xs text-[#C9A84C] hover:text-[#D4A94D] font-mono font-medium underline underline-offset-4"
          >
            <KeyRound size={14} />
            <span>Complete Initial Setup</span>
          </Link>
        </div>
      )}
    </div>
  )
}
