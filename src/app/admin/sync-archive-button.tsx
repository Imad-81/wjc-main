"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react"

export default function SyncArchiveButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSync = async () => {
    if (!confirm("Sync static archive data into Neon Database? Any new entries will be inserted and existing entries updated.")) {
      return
    }

    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Sync failed")
      }

      setMessage(data.message || "Database synchronized successfully!")
      router.refresh()
      setTimeout(() => setMessage(null), 5000)
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred while syncing.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleSync}
        disabled={loading}
        className="flex items-center gap-2 px-3.5 py-2 rounded bg-white/[0.04] hover:bg-[#C9A84C]/15 border border-white/[0.1] hover:border-[#C9A84C]/40 text-neutral-300 hover:text-[#F7F5F0] text-xs font-mono transition-all disabled:opacity-50 cursor-pointer"
      >
        <RefreshCw size={14} className={loading ? "animate-spin text-[#C9A84C]" : "text-neutral-400"} />
        <span>{loading ? "Syncing..." : "Sync Archive"}</span>
      </button>

      {message && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded bg-emerald-950/90 border border-emerald-700/60 text-emerald-200 text-xs shadow-xl flex items-start gap-2 z-50">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded bg-rose-950/90 border border-rose-700/60 text-rose-200 text-xs shadow-xl flex items-start gap-2 z-50">
          <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
