"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Users,
  FolderOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  Shield,
} from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", kanji: "総覧", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", kanji: "行事", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", kanji: "写真", icon: ImageIcon },
  { href: "/admin/team", label: "Team", kanji: "組織", icon: Users },
  { href: "/admin/media", label: "Media Library", kanji: "書庫", icon: FolderOpen },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/setup"
  const { data: session } = useSession()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F7F5F0] flex flex-col justify-center items-center p-4">
        {children}
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch {
      router.push("/admin/login")
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F5F0] flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#121212]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-[#C9A84C]/40 bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] font-serif font-bold text-sm">
            絆
          </div>
          <div>
            <span className="font-serif text-sm tracking-wide text-[#F7F5F0]">WOXSEN JAPAN CENTRE</span>
            <span className="block text-[10px] tracking-widest text-[#C9A84C] uppercase font-mono">Administration</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded border border-white/10 hover:border-[#C9A84C]/40 text-neutral-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#121212] border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-10 h-10 rounded-sm border border-[#C9A84C]/50 bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] font-serif font-bold text-lg shadow-[0_0_15px_rgba(201,168,76,0.15)]">
                絆
              </div>
              <div>
                <h1 className="font-serif text-base tracking-wider text-[#F7F5F0]">WJC CONTROL</h1>
                <p className="text-[11px] tracking-widest text-[#C9A84C] uppercase font-mono font-medium">
                  Woxsen Japan Centre
                </p>
              </div>
            </div>
            <div className="mt-3 px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Supabase Connected
              </span>
              <span className="text-[#C9A84C] font-serif text-xs font-jp">管理</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
              Content Management
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 text-sm font-sans ${
                    isActive
                      ? "bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#F7F5F0] shadow-[inset_0_1px_0_rgba(201,168,76,0.2)]"
                      : "text-neutral-400 hover:text-[#F7F5F0] hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive ? "text-[#C9A84C]" : "text-neutral-400 group-hover:text-neutral-200"
                      }`}
                    />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </div>
                  <span
                    className={`font-serif text-xs font-jp transition-opacity ${
                      isActive ? "text-[#C9A84C] opacity-90" : "text-neutral-600 opacity-50 group-hover:opacity-80"
                    }`}
                  >
                    {item.kanji}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* User & Footer Actions */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0E0E0E] space-y-3">
            {session?.user && (
              <div className="px-3 py-2 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] font-serif text-xs">
                  {session.user.name ? session.user.name[0].toUpperCase() : "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-200 truncate">{session.user.name || "Administrator"}</p>
                  <p className="text-[10px] text-neutral-500 font-mono truncate">{session.user.email}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/20 rounded bg-white/[0.02] hover:bg-white/[0.06] transition-colors"
              >
                <ExternalLink size={13} />
                <span>Live Site</span>
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-rose-400/80 hover:text-rose-300 border border-rose-900/30 hover:border-rose-800/60 rounded bg-rose-950/20 hover:bg-rose-950/40 transition-colors"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}
