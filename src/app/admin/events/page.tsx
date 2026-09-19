"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Loader2,
  ExternalLink,
} from "lucide-react"
import MediaPicker from "@/components/admin/media-picker"

interface AdminEvent {
  id: string
  slug: string
  tab: string
  filter: string
  isoDate: string
  displayDateEn: string
  displayDateJa: string
  categoryEn: string
  categoryJa: string
  titleEn: string
  titleJa: string
  descriptionEn: string
  descriptionJa: string
  fullDescriptionEn: string
  fullDescriptionJa: string
  images: string[]
  locationEn: string | null
  locationJa: string | null
  timeEn: string | null
  timeJa: string | null
  isUpcoming: boolean
  registrationOpen: boolean
  statusEn: string | null
  statusJa: string | null
  posterSrc: string | null
  displayOrder: number
}

const BLANK_EVENT = {
  slug: "",
  tab: "culture",
  filter: "cultural",
  isoDate: new Date().toISOString().split("T")[0],
  displayDateEn: "",
  displayDateJa: "",
  categoryEn: "Cultural",
  categoryJa: "文化",
  titleEn: "",
  titleJa: "",
  descriptionEn: "",
  descriptionJa: "",
  fullDescriptionEn: "",
  fullDescriptionJa: "",
  images: [] as string[],
  locationEn: "Woxsen University",
  locationJa: "ウォクセン大学",
  timeEn: "",
  timeJa: "",
  isUpcoming: false,
  registrationOpen: false,
  statusEn: "",
  statusJa: "",
  posterSrc: "",
  displayOrder: 0,
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [tabFilter, setTabFilter] = useState("all")

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_EVENT)
  const [formLang, setFormLang] = useState<"en" | "ja">("en")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch events on mount
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/events")
      const data = await res.json()
      if (data.success) {
        setEvents(data.events || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleOpenCreate = () => {
    setEditingId(null)
    setForm(BLANK_EVENT)
    setError(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (e: AdminEvent) => {
    setEditingId(e.id)
    setForm({
      slug: e.slug,
      tab: e.tab,
      filter: e.filter,
      isoDate: e.isoDate,
      displayDateEn: e.displayDateEn,
      displayDateJa: e.displayDateJa,
      categoryEn: e.categoryEn,
      categoryJa: e.categoryJa,
      titleEn: e.titleEn,
      titleJa: e.titleJa,
      descriptionEn: e.descriptionEn,
      descriptionJa: e.descriptionJa,
      fullDescriptionEn: e.fullDescriptionEn,
      fullDescriptionJa: e.fullDescriptionJa,
      images: e.images || [],
      locationEn: e.locationEn || "",
      locationJa: e.locationJa || "",
      timeEn: e.timeEn || "",
      timeJa: e.timeJa || "",
      isUpcoming: e.isUpcoming,
      registrationOpen: e.registrationOpen,
      statusEn: e.statusEn || "",
      statusJa: e.statusJa || "",
      posterSrc: e.posterSrc || "",
      displayOrder: e.displayOrder,
    })
    setError(null)
    setModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete event "${title}"? This cannot be undone.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setEvents((prev) => prev.filter((item) => item.id !== id))
      } else {
        alert(data.error || "Failed to delete")
      }
    } catch (err: unknown) {
      alert((err as Error).message || "Delete failed")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events"
    const method = editingId ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Save failed")
      }

      setModalOpen(false)
      fetchEvents()
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  // Filtered list
  const filteredEvents = events.filter((e) => {
    const matchesTab = tabFilter === "all" || e.tab === tabFilter
    const matchesSearch =
      search === "" ||
      e.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      e.titleJa.toLowerCase().includes(search.toLowerCase()) ||
      e.categoryEn.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">Content Suite</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">行事管理</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Events & Initiatives</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(201,168,76,0.25)] cursor-pointer"
        >
          <Plus size={16} />
          <span>New Event</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Tabs" },
            { id: "culture", label: "Culture & Festivals" },
            { id: "delegations", label: "Delegations" },
            { id: "outreach", label: "Outreach" },
            { id: "next", label: "What's Next" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTabFilter(t.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                tabFilter === t.id
                  ? "bg-[#C9A84C] text-black font-semibold"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded bg-[#141414] border border-white/10 text-[#F7F5F0] placeholder:text-neutral-600 focus:outline-none focus:border-[#C9A84C] font-mono"
          />
        </div>
      </div>

      {/* Events Table / List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading events from Supabase...</span>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No events found matching current criteria. Click &ldquo;New Event&rdquo; to create one.
        </div>
      ) : (
        <div className="rounded-lg bg-[#141414] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E0E0E] text-neutral-400 font-mono text-[11px] uppercase border-b border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-4 font-normal">Date & Slug</th>
                  <th className="py-3.5 px-4 font-normal">Title (EN / JA)</th>
                  <th className="py-3.5 px-4 font-normal">Tab</th>
                  <th className="py-3.5 px-4 font-normal">Category</th>
                  <th className="py-3.5 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredEvents.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono text-neutral-400">
                      <div className="text-neutral-200 font-medium">{item.isoDate}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">/{item.slug}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <div className="font-serif text-sm text-[#F7F5F0]">{item.titleEn}</div>
                      <div className="font-serif text-xs text-neutral-400 font-jp mt-0.5">{item.titleJa}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#C9A84C] capitalize">
                        {item.tab}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-neutral-400 text-[11px]">
                      {item.categoryEn}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/events/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on site"
                          className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit event"
                          className="p-1.5 rounded hover:bg-[#C9A84C]/20 text-[#C9A84C] transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleEn)}
                          title="Delete event"
                          className="p-1.5 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-lg bg-[#141414] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-[#F7F5F0]">
                  {editingId ? "Edit Event" : "Create New Event"}
                </span>
                <span className="text-xs font-mono text-[#C9A84C]">• 行事編集</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/[0.08] bg-[#121212]">
              <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Bilingual Editor:
              </span>
              <div className="flex items-center gap-1 rounded bg-[#0A0A0A] p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setFormLang("en")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    formLang === "en"
                      ? "bg-[#C9A84C] text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  English [EN]
                </button>
                <button
                  type="button"
                  onClick={() => setFormLang("ja")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    formLang === "ja"
                      ? "bg-[#C9A84C] text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  日本語 [JA]
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              {error && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* General Core Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="kizuna-matsuri-2026"
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Tab Section
                  </label>
                  <select
                    value={form.tab}
                    onChange={(e) => setForm({ ...form, tab: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  >
                    <option value="culture">Culture & Festivals</option>
                    <option value="delegations">Delegations & Visits</option>
                    <option value="outreach">Outreach Initiatives</option>
                    <option value="next">What&apos;s Next</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Filter Category
                  </label>
                  <select
                    value={form.filter}
                    onChange={(e) => setForm({ ...form, filter: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  >
                    <option value="cultural">Cultural</option>
                    <option value="academic">Academic</option>
                    <option value="festival">Festival</option>
                  </select>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    ISO Date (YYYY-MM-DD) *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.isoDate}
                    onChange={(e) => setForm({ ...form, isoDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Display Date ({formLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formLang === "en" ? form.displayDateEn : form.displayDateJa}
                    onChange={(e) =>
                      formLang === "en"
                        ? setForm({ ...form, displayDateEn: e.target.value })
                        : setForm({ ...form, displayDateJa: e.target.value })
                    }
                    placeholder={formLang === "en" ? "February 27, 2026" : "2026年2月27日"}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                  />
                </div>
              </div>

              {/* Title & Category in Active Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Event Title ({formLang.toUpperCase()}) *
                  </label>
                  <input
                    type="text"
                    required={formLang === "en"}
                    value={formLang === "en" ? form.titleEn : form.titleJa}
                    onChange={(e) => {
                      const val = e.target.value
                      if (formLang === "en") {
                        const autoSlug = !editingId && !form.slug ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-") : form.slug
                        setForm({ ...form, titleEn: val, slug: autoSlug })
                      } else {
                        setForm({ ...form, titleJa: val })
                      }
                    }}
                    placeholder={formLang === "en" ? "Kizuna Matsuri 2026" : "絆祭り 2026"}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-serif"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Category Tag ({formLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formLang === "en" ? form.categoryEn : form.categoryJa}
                    onChange={(e) =>
                      formLang === "en"
                        ? setForm({ ...form, categoryEn: e.target.value })
                        : setForm({ ...form, categoryJa: e.target.value })
                    }
                    placeholder={formLang === "en" ? "FLAGSHIP | CULTURAL" : "旗艦行事 | 文化"}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Card Summary ({formLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={formLang === "en" ? form.descriptionEn : form.descriptionJa}
                  onChange={(e) =>
                    formLang === "en"
                      ? setForm({ ...form, descriptionEn: e.target.value })
                      : setForm({ ...form, descriptionJa: e.target.value })
                  }
                  placeholder="A concise synopsis shown on event cards..."
                  className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                />
              </div>

              {/* Full Detailed Story */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Full Story Description ({formLang.toUpperCase()})
                </label>
                <textarea
                  rows={5}
                  value={formLang === "en" ? form.fullDescriptionEn : form.fullDescriptionJa}
                  onChange={(e) =>
                    formLang === "en"
                      ? setForm({ ...form, fullDescriptionEn: e.target.value })
                      : setForm({ ...form, fullDescriptionJa: e.target.value })
                  }
                  placeholder="Full narrative for the event detail page..."
                  className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                />
              </div>

              {/* Media Picker */}
              <div className="pt-2 border-t border-white/[0.08]">
                <MediaPicker
                  label="Primary Event Photograph"
                  folder="events"
                  value={form.images[0] || ""}
                  onChange={(url) => setForm({ ...form, images: [url] })}
                />
              </div>

              {/* Upcoming Event Details */}
              <div className="p-4 rounded bg-[#0A0A0A] border border-white/[0.05] space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isUpcomingCheck"
                    checked={form.isUpcoming}
                    onChange={(e) => setForm({ ...form, isUpcoming: e.target.checked })}
                    className="accent-[#C9A84C] cursor-pointer"
                  />
                  <label htmlFor="isUpcomingCheck" className="text-xs font-mono text-neutral-200 cursor-pointer">
                    Flag as Upcoming / Announcement Card
                  </label>
                </div>

                {form.isUpcoming && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="registrationCheck"
                        checked={form.registrationOpen}
                        onChange={(e) => setForm({ ...form, registrationOpen: e.target.checked })}
                        className="accent-[#C9A84C] cursor-pointer"
                      />
                      <label htmlFor="registrationCheck" className="text-xs text-neutral-400 cursor-pointer">
                        Registration Open
                      </label>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={form.statusEn || ""}
                        onChange={(e) => setForm({ ...form, statusEn: e.target.value })}
                        placeholder="Status pill (e.g. 'Happening Today')"
                        className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-white/10 text-neutral-200 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingId ? "Save Changes" : "Create Event"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
