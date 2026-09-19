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
  Crown,
  ArrowUp,
  ArrowDown,
  Table as TableIcon,
  LayoutList,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"
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
  isFeatured: boolean
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
  isFeatured: false,
  statusEn: "",
  statusJa: "",
  posterSrc: "",
  displayOrder: 1,
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [tabFilter, setTabFilter] = useState("culture")
  const [viewMode, setViewMode] = useState<"priority" | "table">("priority")

  // Reordering feedback
  const [savingReorder, setSavingReorder] = useState(false)
  const [reorderToast, setReorderToast] = useState(false)

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_EVENT)
  const [formLang, setFormLang] = useState<"en" | "ja">("en")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAddGalleryPicker, setShowAddGalleryPicker] = useState(false)

  const fetchEvents = async () => {
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
    const currentTabEvents = events.filter((e) => e.tab === (tabFilter === "all" ? "culture" : tabFilter))
    setForm({
      ...BLANK_EVENT,
      tab: tabFilter === "all" ? "culture" : tabFilter,
      displayOrder: currentTabEvents.length + 1,
    })
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
      isFeatured: e.isFeatured || false,
      statusEn: e.statusEn || "",
      statusJa: e.statusJa || "",
      posterSrc: e.posterSrc || "",
      displayOrder: e.displayOrder || 1,
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

    // Auto-generate display dates from isoDate if left empty
    let displayDateEn = form.displayDateEn
    let displayDateJa = form.displayDateJa
    if (!displayDateEn && form.isoDate) {
      try {
        const [y, m, d] = form.isoDate.split("-").map(Number)
        const dateObj = new Date(y, m - 1, d)
        displayDateEn = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      } catch {
        displayDateEn = form.isoDate
      }
    }
    if (!displayDateJa && form.isoDate) {
      try {
        const [y, m, d] = form.isoDate.split("-").map(Number)
        displayDateJa = `${y}年${m}月${d}日`
      } catch {
        displayDateJa = form.isoDate
      }
    }

    const payload = {
      ...form,
      displayDateEn,
      displayDateJa,
      displayOrder: Number(form.displayOrder) || 1,
      isFeatured: Boolean(form.isFeatured),
    }

    try {
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!data.success) {
        setError(data.error || "Operation failed")
        setSaving(false)
        return
      }

      await fetchEvents()
      setModalOpen(false)
    } catch (err: unknown) {
      setError((err as Error).message || "Operation failed")
    } finally {
      setSaving(false)
    }
  }

  // Handle live reordering (Move Up / Move Down)
  const handleMove = async (item: AdminEvent, direction: "up" | "down") => {
    const tabEvents = events
      .filter((e) => e.tab === item.tab)
      .sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
        return b.isoDate.localeCompare(a.isoDate)
      })

    const currentIndex = tabEvents.findIndex((e) => e.id === item.id)
    if (currentIndex === -1) return

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= tabEvents.length) return

    const targetItem = tabEvents[targetIndex]
    const reorderedList = [...tabEvents]
    reorderedList[currentIndex] = targetItem
    reorderedList[targetIndex] = item

    // Assign sequential ranks
    const reorderPayload = reorderedList.map((ev, idx) => ({
      id: ev.id,
      displayOrder: idx + 1,
      isFeatured: ev.tab === "culture" ? idx === 0 : false,
    }))

    // Optimistically update state
    setEvents((prev) =>
      prev.map((ev) => {
        const found = reorderPayload.find((p) => p.id === ev.id)
        return found ? { ...ev, displayOrder: found.displayOrder, isFeatured: found.isFeatured } : ev
      })
    )

    // Persist to server
    setSavingReorder(true)
    try {
      const res = await fetch("/api/admin/events/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: reorderPayload }),
      })
      const data = await res.json()
      if (data.success) {
        setReorderToast(true)
        setTimeout(() => setReorderToast(false), 3500)
      }
    } catch (err) {
      console.error("Reorder failed:", err)
    } finally {
      setSavingReorder(false)
    }
  }

  // Handle promoting an event directly to Hero Banner (#1 spot)
  const handlePromoteToHero = async (item: AdminEvent) => {
    const tabEvents = events
      .filter((e) => e.tab === item.tab)
      .sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
        return b.isoDate.localeCompare(a.isoDate)
      })

    const otherEvents = tabEvents.filter((e) => e.id !== item.id)
    const newOrderedList = [item, ...otherEvents]

    const reorderPayload = newOrderedList.map((ev, idx) => ({
      id: ev.id,
      displayOrder: idx + 1,
      isFeatured: idx === 0,
    }))

    // Optimistically update
    setEvents((prev) =>
      prev.map((ev) => {
        const found = reorderPayload.find((p) => p.id === ev.id)
        return found ? { ...ev, displayOrder: found.displayOrder, isFeatured: found.isFeatured } : ev
      })
    )

    setSavingReorder(true)
    try {
      const res = await fetch("/api/admin/events/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: reorderPayload }),
      })
      const data = await res.json()
      if (data.success) {
        setReorderToast(true)
        setTimeout(() => setReorderToast(false), 3500)
      }
    } catch (err) {
      console.error("Failed to promote to hero:", err)
    } finally {
      setSavingReorder(false)
    }
  }

  // Filter and sort events based on active tab and search
  const currentTab = tabFilter === "all" ? "culture" : tabFilter
  const activeTabEvents = events
    .filter((e) => tabFilter === "all" || e.tab === tabFilter)
    .filter((e) => {
      if (!search) return true
      return (
        e.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        e.titleJa.toLowerCase().includes(search.toLowerCase()) ||
        e.slug.toLowerCase().includes(search.toLowerCase()) ||
        e.categoryEn.toLowerCase().includes(search.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (a.tab !== b.tab) return a.tab.localeCompare(b.tab)
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
      return b.isoDate.localeCompare(a.isoDate)
    })

  // In Culture tab, separate the #1 Hero event from secondary grid cards
  const heroEvent = currentTab === "culture" ? activeTabEvents[0] : null
  const secondaryEvents = currentTab === "culture" ? activeTabEvents.slice(1) : activeTabEvents

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {reorderToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-[#C9A84C] text-black font-mono text-xs font-semibold shadow-2xl animate-fade-in">
          <CheckCircle2 size={16} />
          <span>Priority order saved! Live website updated instantly.</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">Content Suite</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">行事優先管理</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Events & Priority Manager</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#141414] p-1 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode("priority")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                viewMode === "priority"
                  ? "bg-[#C9A84C] text-black font-bold shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutList size={14} />
              <span>Live Priority Order</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#C9A84C] text-black font-bold shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TableIcon size={14} />
              <span>Table View</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(201,168,76,0.25)] cursor-pointer"
          >
            <Plus size={16} />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Tab Filters matching public site */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "culture", label: "Culture & Festivals" },
            { id: "outreach", label: "Outreach Initiatives" },
            { id: "next", label: "What's Next" },
            { id: "delegations", label: "Delegations" },
            { id: "all", label: "All Events" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTabFilter(t.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                tabFilter === t.id
                  ? "bg-[#C9A84C] text-black font-semibold shadow"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
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

      {/* Main Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading events from Supabase...</span>
        </div>
      ) : activeTabEvents.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No events found in this category. Click &ldquo;New Event&rdquo; to add one.
        </div>
      ) : viewMode === "priority" ? (
        /* -------------------------------------------------------------
           VIEW MODE 1: LIVE PRIORITY ORDER VIEW
        ------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Section 1: Hero Banner (Only in Culture tab or when Hero exists) */}
          {currentTab === "culture" && heroEvent && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#C9A84C] text-black text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(201,168,76,0.3)]">
                    <Crown size={14} className="fill-black" />
                    Featured Hero Spot (Live Page #1)
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Takes the prominent large banner at the top of /events
                  </span>
                </div>
                {savingReorder && (
                  <span className="text-xs font-mono text-[#C9A84C] flex items-center gap-1.5">
                    <Loader2 size={13} className="animate-spin" /> Saving order...
                  </span>
                )}
              </div>

              {/* Hero Card Container */}
              <div className="rounded-xl border-2 border-[#C9A84C] bg-gradient-to-r from-[#141414] to-[#1a1813] p-5 shadow-[0_0_30px_rgba(201,168,76,0.12)]">
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                  <div className="flex gap-4 items-center min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A] shrink-0">
                      {heroEvent.images?.[0] ? (
                        <Image
                          src={heroEvent.images[0]}
                          alt={heroEvent.titleEn}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-[10px]">
                          No image
                        </div>
                      )}
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[#C9A84C] font-mono text-[9px] font-bold">
                        #1 HERO
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] uppercase">
                          {heroEvent.categoryEn}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">
                          {heroEvent.displayDateEn || heroEvent.isoDate}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-[#F7F5F0] truncate">
                        {heroEvent.titleEn}
                      </h3>
                      <p className="text-xs font-serif text-neutral-400 font-jp truncate">
                        {heroEvent.titleJa}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      disabled={secondaryEvents.length === 0 || savingReorder}
                      onClick={() => handleMove(heroEvent, "down")}
                      title="Move Down in Priority"
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 text-xs font-mono transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown size={14} />
                      <span>Move Down</span>
                    </button>

                    <a
                      href={`/events/${heroEvent.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="View live page"
                      className="p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 transition-colors"
                    >
                      <ExternalLink size={15} />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(heroEvent)}
                      title="Edit event"
                      className="p-2 rounded bg-[#C9A84C]/15 hover:bg-[#C9A84C]/25 text-[#C9A84C] transition-colors cursor-pointer"
                    >
                      <Edit3 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(heroEvent.id, heroEvent.titleEn)}
                      title="Delete event"
                      className="p-2 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Secondary Cards / Remaining Priority List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {currentTab === "culture"
                  ? "Secondary Grid Cards (Sequential Display Order)"
                  : `${tabFilter.toUpperCase()} Live Display Sequence`}
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Ordered sequentially: Rank #1 → #{activeTabEvents.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {secondaryEvents.map((item, index) => {
                const rankNumber = currentTab === "culture" ? index + 2 : index + 1
                const isFirst = index === 0
                const isLast = index === secondaryEvents.length - 1

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#141414] border border-white/[0.08] hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Priority Rank Badge */}
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded bg-[#0A0A0A] border border-white/10 shrink-0">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase">Rank</span>
                        <span className="font-mono text-base font-bold text-[#C9A84C]">
                          #{rankNumber}
                        </span>
                      </div>

                      {/* Thumbnail */}
                      <div className="relative w-16 h-12 rounded overflow-hidden border border-white/10 bg-[#0A0A0A] shrink-0">
                        {item.images?.[0] ? (
                          <Image
                            src={item.images[0]}
                            alt={item.titleEn}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-[9px]">
                            No img
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-neutral-300">
                            {item.categoryEn}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            {item.displayDateEn || item.isoDate}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">
                            /{item.slug}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm text-[#F7F5F0] truncate">
                          {item.titleEn}
                        </h4>
                        <p className="text-xs font-serif text-neutral-400 font-jp truncate">
                          {item.titleJa}
                        </p>
                      </div>
                    </div>

                    {/* Reordering & Edit Actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      {/* Make Hero Button (Only for Culture Tab) */}
                      {currentTab === "culture" && (
                        <button
                          type="button"
                          onClick={() => handlePromoteToHero(item)}
                          disabled={savingReorder}
                          title="Promote to Featured Hero Banner"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-mono transition-colors cursor-pointer"
                        >
                          <Crown size={13} />
                          <span className="hidden md:inline">Make Hero</span>
                        </button>
                      )}

                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={isFirst && currentTab !== "culture"}
                        onClick={() => handleMove(item, "up")}
                        title="Move Up in Priority"
                        className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 disabled:opacity-20 transition-colors cursor-pointer"
                      >
                        <ArrowUp size={15} />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => handleMove(item, "down")}
                        title="Move Down in Priority"
                        className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 disabled:opacity-20 transition-colors cursor-pointer"
                      >
                        <ArrowDown size={15} />
                      </button>

                      {/* View Link */}
                      <a
                        href={`/events/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View on site"
                        className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit event"
                        className="p-1.5 rounded hover:bg-[#C9A84C]/20 text-[#C9A84C] transition-colors cursor-pointer"
                      >
                        <Edit3 size={14} />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.titleEn)}
                        title="Delete event"
                        className="p-1.5 rounded hover:bg-rose-950/40 text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        /* -------------------------------------------------------------
           VIEW MODE 2: TABLE VIEW
        ------------------------------------------------------------- */
        <div className="rounded-lg bg-[#141414] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E0E0E] text-neutral-400 font-mono text-[11px] uppercase border-b border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-4 font-normal">Priority</th>
                  <th className="py-3.5 px-4 font-normal">Date & Slug</th>
                  <th className="py-3.5 px-4 font-normal">Title (EN / JA)</th>
                  <th className="py-3.5 px-4 font-normal">Tab</th>
                  <th className="py-3.5 px-4 font-normal">Category</th>
                  <th className="py-3.5 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {activeTabEvents.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono">
                      {item.isFeatured ? (
                        <span className="px-2 py-0.5 rounded bg-[#C9A84C] text-black font-bold text-[10px] flex items-center gap-1 w-fit">
                          <Crown size={12} className="fill-black" /> #1 Hero
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-mono text-xs">
                          #{idx + 1}
                        </span>
                      )}
                    </td>
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
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit event"
                          className="p-1.5 rounded hover:bg-[#C9A84C]/20 text-[#C9A84C] transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
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

      {/* -------------------------------------------------------------
         MODAL: ADD / EDIT EVENT
      ------------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-lg bg-[#141414] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-[#F7F5F0]">
                  {editingId ? "Edit Event" : "Create New Event"}
                </span>
                <span className="text-xs font-mono text-[#C9A84C]">• 行事編集</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5 cursor-pointer"
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
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
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
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
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

              {/* SECTION: Live Page Placement & Priority */}
              <div className="p-4 rounded-lg bg-[#0E0E0E] border border-[#C9A84C]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown size={16} className="text-[#C9A84C]" />
                    <span className="text-xs font-mono font-bold text-[#F7F5F0] uppercase tracking-wider">
                      Live Page Placement & Priority Rank
                    </span>
                  </div>
                  {form.isFeatured && (
                    <span className="px-2 py-0.5 rounded bg-[#C9A84C] text-black font-mono text-[10px] font-bold">
                      Hero Banner Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Display Priority Rank (1 = Top / First)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={form.displayOrder || 1}
                      onChange={(e) =>
                        setForm({ ...form, displayOrder: Math.max(1, parseInt(e.target.value) || 1) })
                      }
                      className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                    />
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">
                      Lower numbers appear first on the live page.
                    </p>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={form.isFeatured}
                        onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                        className="accent-[#C9A84C] cursor-pointer w-4 h-4"
                      />
                      <span className="text-xs font-mono text-neutral-200">
                        Featured Hero Banner Spot
                      </span>
                    </label>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1 pl-6">
                      Renders as the prominent hero spotlight banner in the Culture tab.
                    </p>
                  </div>
                </div>
              </div>

              {/* General Core Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase">
                      URL Slug *
                    </label>
                    {form.titleEn && (
                      <button
                        type="button"
                        onClick={() => {
                          const generated = form.titleEn
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .trim()
                            .replace(/\s+/g, "-")
                          setForm({ ...form, slug: generated })
                        }}
                        className="text-[10px] font-mono text-[#C9A84C] hover:underline cursor-pointer"
                      >
                        Auto from Title
                      </button>
                    )}
                  </div>
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
                    <option value="outreach">Outreach Initiatives</option>
                    <option value="next">What&apos;s Next</option>
                    <option value="delegations">Delegations & Visits</option>
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
                        const autoSlug =
                          !editingId && !form.slug
                            ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                            : form.slug
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

              {/* Multi-Image Section: Primary Cover + Detail Gallery Photos */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider">Visual Assets</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs font-serif text-neutral-400 font-jp">画像設定</span>
                </div>

                {/* Primary Cover Image */}
                <MediaPicker
                  label="Primary Event Cover Photograph (Spotlight & Grid Hero)"
                  folder="events"
                  value={form.images[0] || ""}
                  onChange={(url) => {
                    const rest = form.images.slice(1)
                    setForm({ ...form, images: url ? [url, ...rest] : rest })
                  }}
                />

                {/* Additional Detail Gallery Photos */}
                <div className="p-4 rounded-lg bg-[#0E0E0E] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-300 uppercase font-semibold">
                        Detail Page Photo Gallery ({Math.max(0, form.images.length - 1)} additional photos)
                      </label>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Secondary photos displayed in the narrative gallery on /events/[slug].
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddGalleryPicker(!showAddGalleryPicker)}
                      className="px-3 py-1.5 rounded bg-white/[0.05] hover:bg-[#C9A84C]/15 border border-white/10 hover:border-[#C9A84C]/40 text-[#F7F5F0] text-xs font-mono transition-colors cursor-pointer"
                    >
                      {showAddGalleryPicker ? "Cancel" : "+ Add Gallery Photo"}
                    </button>
                  </div>

                  {showAddGalleryPicker && (
                    <div className="p-3 rounded bg-[#141414] border border-[#C9A84C]/30">
                      <MediaPicker
                        label="Choose photo to append to gallery"
                        folder="events"
                        value=""
                        onChange={(url) => {
                          if (url) {
                            setForm({ ...form, images: [...form.images, url] })
                            setShowAddGalleryPicker(false)
                          }
                        }}
                      />
                    </div>
                  )}

                  {form.images.length > 1 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                      {form.images.slice(1).map((imgUrl, idx) => {
                        const actualIdx = idx + 1
                        return (
                          <div
                            key={`${imgUrl}-${idx}`}
                            className="group relative aspect-video rounded overflow-hidden border border-white/10 bg-[#0A0A0A]"
                          >
                            <Image src={imgUrl} alt={`Gallery ${idx + 1}`} fill unoptimized className="object-cover" />
                            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#C9A84C]">
                              #{idx + 1}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...form.images]
                                updated.splice(actualIdx, 1)
                                setForm({ ...form, images: updated })
                              }}
                              className="absolute top-1 right-1 p-1 rounded bg-black/80 hover:bg-rose-950 text-neutral-300 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-[11px] font-mono text-neutral-600 italic">
                      No secondary gallery photos. Click &quot;+ Add Gallery Photo&quot; to append detail shots.
                    </p>
                  )}
                </div>
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
