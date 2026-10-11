"use client"

import { useState, useEffect } from "react"
import {
  Mail,
  Ticket,
  Search,
  Download,
  Loader2,
  Calendar,
  Phone,
  Globe,
  FileText,
} from "lucide-react"

interface Subscriber {
  id: string
  email: string
  locale: string
  isActive: boolean
  createdAt: string
}

interface Registration {
  id: string
  eventId: string
  slug: string
  name: string
  email: string
  phone: string | null
  locale: string
  notes: string | null
  createdAt: string
}

export default function AdminInquiriesPage() {
  const [tab, setTab] = useState<"subscribers" | "registrations">("subscribers")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [counts, setCounts] = useState({ subscribers: 0, registrations: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/inquiries")
      const data = await res.json()
      if (data.success) {
        setCounts(data.counts || { subscribers: 0, registrations: 0 })
        setSubscribers(data.recentSubscribers || [])
        setRegistrations(data.recentRegistrations || [])
      }
    } catch (err) {
      console.error("Failed to load inquiries data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredSubscribers = subscribers.filter(
    (s) => search === "" || s.email.toLowerCase().includes(search.toLowerCase())
  )

  const filteredRegistrations = registrations.filter(
    (r) =>
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">
              Audience Inquiries
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">名簿管理</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Audience & Registrations</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Browse newsletter email subscribers and upcoming event attendee RSVPs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/api/admin/inquiries?format=csv&type=subscribers"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white/[0.04] hover:bg-[#C9A84C]/15 border border-white/10 hover:border-[#C9A84C]/40 text-neutral-200 hover:text-white text-xs font-mono transition-colors"
          >
            <Download size={14} className="text-[#C9A84C]" />
            <span>Export Subscribers</span>
          </a>
          <a
            href="/api/admin/inquiries?format=csv&type=registrations"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white/[0.04] hover:bg-[#C9A84C]/15 border border-white/10 hover:border-[#C9A84C]/40 text-neutral-200 hover:text-white text-xs font-mono transition-colors"
          >
            <Download size={14} className="text-[#C9A84C]" />
            <span>Export RSVPs</span>
          </a>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("subscribers")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "subscribers"
                ? "bg-[#C9A84C] text-black font-semibold shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            <Mail size={14} />
            <span>Subscribers ({counts.subscribers})</span>
          </button>

          <button
            onClick={() => setTab("registrations")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "registrations"
                ? "bg-[#C9A84C] text-black font-semibold shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            <Ticket size={14} />
            <span>Event RSVPs ({counts.registrations})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tab === "subscribers" ? "Search emails..." : "Search attendees or events..."}
            className="w-full pl-9 pr-3 py-2 text-xs rounded bg-[#141414] border border-white/10 text-[#F7F5F0] placeholder:text-neutral-600 focus:outline-none focus:border-[#C9A84C] font-mono"
          />
        </div>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading audience records...</span>
        </div>
      ) : tab === "subscribers" ? (
        filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
            No newsletter subscribers found.
          </div>
        ) : (
          <div className="rounded-lg bg-[#141414] border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#0E0E0E] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Email Address</th>
                    <th className="py-3.5 px-6">Locale Language</th>
                    <th className="py-3.5 px-6">Subscription Status</th>
                    <th className="py-3.5 px-6">Subscribed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-xs">
                  {filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-mono text-[#F7F5F0] font-medium flex items-center gap-2.5">
                        <Mail size={14} className="text-[#C9A84C]" />
                        <span>{s.email}</span>
                      </td>

                      <td className="py-4 px-6 font-mono text-neutral-300">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 uppercase text-[10px]">
                          <Globe size={11} />
                          <span>{s.locale}</span>
                        </span>
                      </td>

                      <td className="py-4 px-6 font-mono">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] bg-emerald-950/40 border border-emerald-700/50 text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>Active</span>
                        </span>
                      </td>

                      <td className="py-4 px-6 font-mono text-neutral-400 text-[11px]">
                        {new Date(s.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : filteredRegistrations.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No event RSVPs found.
        </div>
      ) : (
        <div className="rounded-lg bg-[#141414] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0E0E0E] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Event Program</th>
                  <th className="py-3.5 px-6">Attendee Name</th>
                  <th className="py-3.5 px-6">Contact Email & Phone</th>
                  <th className="py-3.5 px-6">Attendee Notes</th>
                  <th className="py-3.5 px-6">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-xs">
                {filteredRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-mono">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-[11px]">
                        <Calendar size={13} />
                        <span className="font-semibold">{r.slug}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 font-medium text-[#F7F5F0]">
                      {r.name}
                    </td>

                    <td className="py-4 px-6 font-mono text-neutral-300">
                      <div>{r.email}</div>
                      {r.phone && (
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} />
                          <span>{r.phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6 text-neutral-400 max-w-xs truncate">
                      {r.notes ? (
                        <span title={r.notes} className="flex items-center gap-1 text-[11px]">
                          <FileText size={12} className="shrink-0 text-neutral-500" />
                          <span>{r.notes}</span>
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>

                    <td className="py-4 px-6 font-mono text-neutral-400 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
