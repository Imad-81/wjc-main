"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Loader2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
} from "lucide-react"
import MediaPicker from "@/components/admin/media-picker"
import { getAdminCached, setAdminCached } from "@/lib/admin-cache"

interface AdminGalleryItem {
  id: string
  src: string
  category: string
  titleEn: string
  titleJa: string
  dateEn: string
  dateJa: string
  altEn: string
  altJa: string
  span: string
  displayOrder: number
}

const BLANK_ITEM = {
  src: "",
  category: "festivals",
  titleEn: "Woxsen Japan Centre Celebration",
  titleJa: "ウォクセン日本センター 祝賀行事",
  dateEn: "February 2026",
  dateJa: "2026年2月",
  altEn: "Woxsen Japan Centre photograph",
  altJa: "ウォクセン日本センター 写真",
  span: "square",
  displayOrder: 0,
}

export default function AdminGalleryPage() {
  const cachedItems = getAdminCached<AdminGalleryItem[]>("admin-gallery")
  const [items, setItems] = useState<AdminGalleryItem[]>(cachedItems || [])
  const [loading, setLoading] = useState(!cachedItems)
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_ITEM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reorderToast, setReorderToast] = useState(false)

  const fetchItems = async (silent?: boolean) => {
    const hasCache = Boolean(getAdminCached("admin-gallery"))
    const shouldBeSilent = silent ?? hasCache
    if (!shouldBeSilent) setLoading(true)
    try {
      const res = await fetch("/api/admin/gallery")
      const data = await res.json()
      if (data.success) {
        setItems(data.items || [])
        setAdminCached("admin-gallery", data.items || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleOpenCreate = () => {
    setEditingId(null)
    setForm({
      ...BLANK_ITEM,
      category: categoryFilter === "all" ? "festivals" : categoryFilter,
      displayOrder: items.length + 1,
    })
    setError(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (item: AdminGalleryItem) => {
    setEditingId(item.id)
    setForm({
      src: item.src,
      category: item.category,
      titleEn: item.titleEn,
      titleJa: item.titleJa,
      dateEn: item.dateEn,
      dateJa: item.dateJa,
      altEn: item.altEn,
      altJa: item.altJa,
      span: item.span,
      displayOrder: item.displayOrder,
    })
    setError(null)
    setModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove photograph "${title}" from the gallery?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setItems((prev) => {
          const next = prev.filter((i) => i.id !== id)
          setAdminCached("admin-gallery", next)
          return next
        })
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

    const url = editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery"
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
      fetchItems()
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  const handleMove = async (item: AdminGalleryItem, direction: "up" | "down") => {
    const list = [...items]
    const currentIndex = list.findIndex((i) => i.id === item.id)
    if (currentIndex === -1) return

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= list.length) return

    const targetItem = list[targetIndex]
    list[currentIndex] = targetItem
    list[targetIndex] = item

    const payload = list.map((it, idx) => ({
      id: it.id,
      displayOrder: idx + 1,
    }))

    setItems((prev) => {
      const next = prev.map((it) => {
        const found = payload.find((p) => p.id === it.id)
        return found ? { ...it, displayOrder: found.displayOrder } : it
      })
      setAdminCached("admin-gallery", next)
      return next
    })

    try {
      const res = await fetch("/api/admin/gallery/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      })
      const data = await res.json()
      if (data.success) {
        setReorderToast(true)
        setTimeout(() => setReorderToast(false), 3000)
      }
    } catch (err) {
      console.error("Failed to reorder gallery:", err)
    }
  }

  const filteredItems = items.filter((item) => {
    return categoryFilter === "all" || item.category === categoryFilter
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">Visual Archive</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">写真展示</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Gallery Curation</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(201,168,76,0.25)] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Photograph</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Works" },
            { id: "festivals", label: "Festivals (祭り)" },
            { id: "cultural", label: "Cultural (文化)" },
            { id: "academic", label: "Academic (学術)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? "bg-[#C9A84C] text-black font-semibold"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-neutral-500">
          Showing {filteredItems.length} photos
        </div>
      </div>

      {/* Gallery Grid Preview */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading gallery photographs...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No photographs found in this category. Click &ldquo;Add Photograph&rdquo; to upload.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/50 overflow-hidden flex flex-col transition-all duration-300 shadow-md"
            >
              {/* Photo Thumbnail */}
              <div className="relative aspect-4/3 w-full bg-[#0A0A0A] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.titleEn}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-xs text-[10px] font-mono text-[#C9A84C] font-semibold border border-[#C9A84C]/30">
                    #{index + 1}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-mono text-neutral-300 capitalize border border-white/10">
                    {item.span}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-serif text-xs text-[#F7F5F0] truncate" title={item.titleEn}>
                    {item.titleEn}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-mono capitalize">
                    {item.category} • {item.dateEn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(item, "up")}
                      className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer transition-colors"
                      title="Move Earlier in Gallery"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={index === filteredItems.length - 1}
                      onClick={() => handleMove(item, "down")}
                      className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer transition-colors"
                      title="Move Later in Gallery"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 rounded hover:bg-[#C9A84C]/20 text-[#C9A84C] transition-colors cursor-pointer"
                      title="Edit photo info"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.titleEn)}
                      className="p-1 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                      title="Delete from gallery"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-lg bg-[#141414] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-[#F7F5F0]">
                  {editingId ? "Edit Gallery Item" : "Add Gallery Photograph"}
                </span>
                <span className="text-xs font-mono text-[#C9A84C]">• 写真設定</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              {error && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Media Picker */}
              <MediaPicker
                label="Photograph File *"
                folder="gallery"
                value={form.src}
                onChange={(url) => setForm({ ...form, src: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Category Tag
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  >
                    <option value="festivals">Festivals (祭り)</option>
                    <option value="cultural">Cultural (文化)</option>
                    <option value="academic">Academic (学術)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Masonry Span Cell
                  </label>
                  <select
                    value={form.span}
                    onChange={(e) => setForm({ ...form, span: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  >
                    <option value="square">Square (1x1 Ratio)</option>
                    <option value="tall">Tall Portrait (1x2 Ratio)</option>
                    <option value="wide">Wide Landscape (2x1 Ratio)</option>
                  </select>
                </div>
              </div>

              {/* Bilingual Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-serif"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Title (Japanese)
                  </label>
                  <input
                    type="text"
                    value={form.titleJa}
                    onChange={(e) => setForm({ ...form, titleJa: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-serif font-jp"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Date Label (EN)
                  </label>
                  <input
                    type="text"
                    value={form.dateEn}
                    onChange={(e) => setForm({ ...form, dateEn: e.target.value })}
                    placeholder="February 2026"
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Date Label (JA)
                  </label>
                  <input
                    type="text"
                    value={form.dateJa}
                    onChange={(e) => setForm({ ...form, dateJa: e.target.value })}
                    placeholder="2026年2月"
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono font-jp"
                  />
                </div>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Accessibility Alt Text (English)
                </label>
                <input
                  type="text"
                  value={form.altEn}
                  onChange={(e) => setForm({ ...form, altEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0]"
                />
              </div>

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
                  <span>{editingId ? "Save Changes" : "Publish Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {reorderToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs font-mono shadow-2xl">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>Gallery order synchronized with live website!</span>
        </div>
      )}
    </div>
  )
}
