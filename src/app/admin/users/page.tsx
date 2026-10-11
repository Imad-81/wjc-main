"use client"

import { useState, useEffect } from "react"
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Mail,
  User,
  Lock,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      if (data.success) {
        setUsers(data.users || [])
      }
    } catch (err) {
      console.error("Failed to load administrators:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create administrator account.")
      }

      setSuccessToast(data.message || `Administrator "${name}" provisioned.`)
      setTimeout(() => setSuccessToast(null), 4000)

      setName("")
      setEmail("")
      setPassword("")
      setModalOpen(false)
      fetchUsers()
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteUser = async (user: AdminUser) => {
    if (session?.user?.id === user.id) {
      alert("You cannot delete your own active administrator account.")
      return
    }

    if (!confirm(`Are you sure you want to remove administrator "${user.name}" (${user.email})?`)) {
      return
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete administrator.")
      }

      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      setSuccessToast(`Administrator "${user.name}" removed successfully.`)
      setTimeout(() => setSuccessToast(null), 4000)
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to delete administrator.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-emerald-950/95 border border-emerald-600/60 text-emerald-200 text-xs shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">
              Access Control
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">管理者一覧</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">System Administrators</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage executive accounts authorized to publish and update Centre content.
          </p>
        </div>

        <button
          onClick={() => {
            setError(null)
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(201,168,76,0.2)]"
        >
          <UserPlus size={15} />
          <span>Add Administrator</span>
        </button>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading authorized accounts...</span>
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No administrator accounts found.
        </div>
      ) : (
        <div className="rounded-lg bg-[#141414] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0E0E0E] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Administrator</th>
                  <th className="py-3.5 px-6">Official Email</th>
                  <th className="py-3.5 px-6">Security Role</th>
                  <th className="py-3.5 px-6">Provisioned Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-xs">
                {users.map((u) => {
                  const isCurrent = session?.user?.id === u.id
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-white/[0.02] transition-colors font-sans"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] font-serif font-bold text-xs">
                            {u.name ? u.name[0].toUpperCase() : "A"}
                          </div>
                          <div>
                            <p className="font-medium text-[#F7F5F0] flex items-center gap-2">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-950/60 border border-emerald-700/60 text-emerald-300">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-mono">{u.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono text-neutral-300">
                        {u.email}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]">
                          <ShieldCheck size={12} />
                          <span>{u.role || "admin"}</span>
                        </span>
                      </td>

                      <td className="py-4 px-6 font-mono text-neutral-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-6 text-right">
                        {!isCurrent && users.length > 1 && (
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 rounded hover:bg-rose-950/40 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Remove Administrator"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Provision Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-[#141414] border border-[#C9A84C]/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[#C9A84C]" />
                <h2 className="font-serif text-lg text-[#F7F5F0]">Add Administrator</h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Prof. John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@woxsen.edu.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Initial Password (min. 8 characters)
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] text-sm font-sans"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded text-xs text-neutral-400 hover:text-white font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>Provision Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
