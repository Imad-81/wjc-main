"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  Loader2,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import MediaPicker from "@/components/admin/media-picker"

interface AdminTeamMember {
  id: string
  name: string
  roleEn: string
  roleJa: string
  subtitleEn: string
  subtitleJa: string
  image: string
  bioEn: string | null
  bioJa: string | null
  category: string
  scale: string | null
  hoverScale: string | null
  position: string | null
  displayOrder: number
}

const BLANK_MEMBER = {
  id: "",
  name: "",
  roleEn: "",
  roleJa: "",
  subtitleEn: "Woxsen University",
  subtitleJa: "ウォクセン大学",
  image: "",
  bioEn: "",
  bioJa: "",
  category: "faculty",
  scale: "",
  hoverScale: "",
  position: "",
  displayOrder: 0,
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<AdminTeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryTab, setCategoryTab] = useState<"faculty" | "student">("faculty")

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_MEMBER)
  const [formLang, setFormLang] = useState<"en" | "ja">("en")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/team")
      const data = await res.json()
      if (data.success) {
        setMembers(data.members || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleOpenCreate = () => {
    setEditingId(null)
    setForm({ ...BLANK_MEMBER, category: categoryTab })
    setError(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (m: AdminTeamMember) => {
    setEditingId(m.id)
    setForm({
      id: m.id,
      name: m.name,
      roleEn: m.roleEn,
      roleJa: m.roleJa,
      subtitleEn: m.subtitleEn,
      subtitleJa: m.subtitleJa,
      image: m.image,
      bioEn: m.bioEn || "",
      bioJa: m.bioJa || "",
      category: m.category,
      scale: m.scale || "",
      hoverScale: m.hoverScale || "",
      position: m.position || "",
      displayOrder: m.displayOrder,
    })
    setError(null)
    setModalOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove team member "${name}"?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setMembers((prev) => prev.filter((m) => m.id !== id))
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

    const url = editingId ? `/api/admin/team/${editingId}` : "/api/admin/team"
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
      fetchMembers()
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  const filteredMembers = members.filter((m) => m.category === categoryTab)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">Personnel</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">組織管理</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Leadership & Community</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(201,168,76,0.25)] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCategoryTab("faculty")}
            className={`px-4 py-2 rounded text-xs font-mono transition-colors cursor-pointer ${
              categoryTab === "faculty"
                ? "bg-[#C9A84C] text-black font-semibold"
                : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
            }`}
          >
            Faculty & Leadership (指導体制)
          </button>
          <button
            onClick={() => setCategoryTab("student")}
            className={`px-4 py-2 rounded text-xs font-mono transition-colors cursor-pointer ${
              categoryTab === "student"
                ? "bg-[#C9A84C] text-black font-semibold"
                : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
            }`}
          >
            Student Community (学生幹部)
          </button>
        </div>

        <div className="text-xs font-mono text-neutral-500">
          {filteredMembers.length} {categoryTab === "faculty" ? "Faculty" : "Students"}
        </div>
      </div>

      {/* Members Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Loading team members...</span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No members found in this group. Click &ldquo;Add Member&rdquo; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="group relative rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/50 overflow-hidden flex flex-col transition-all duration-300 shadow-md"
            >
              {/* Portrait Image */}
              <div className="relative aspect-3/4 w-full bg-[#0A0A0A] overflow-hidden">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    unoptimized
                    className={`object-cover group-hover:scale-105 transition-transform duration-500 ${m.position || "object-top"}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 font-serif text-3xl">
                    {m.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#C9A84C]/90 text-black text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                    {m.roleEn}
                  </span>
                  <h3 className="font-serif text-base text-[#F7F5F0] font-medium leading-tight">
                    {m.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {m.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Bio & Actions */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-3 bg-[#111111]">
                {m.bioEn ? (
                  <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                    {m.bioEn}
                  </p>
                ) : (
                  <p className="text-xs text-neutral-600 italic font-mono">No biography provided.</p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-serif text-neutral-400 font-jp">
                    {m.roleJa}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="p-1.5 rounded hover:bg-[#C9A84C]/20 text-[#C9A84C] transition-colors cursor-pointer"
                      title="Edit member"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      className="p-1.5 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                      title="Delete member"
                    >
                      <Trash2 size={14} />
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
                  {editingId ? "Edit Member" : "Add Team Member"}
                </span>
                <span className="text-xs font-mono text-[#C9A84C]">• 役職設定</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/[0.08] bg-[#121212]">
              <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Bilingual Details:
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

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              {error && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Portrait Picker */}
              <MediaPicker
                label="Portrait Photograph *"
                folder="team"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. Raul Rodriguez"
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-serif"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Category Tier
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                  >
                    <option value="faculty">Faculty & Leadership</option>
                    <option value="student">Student Leadership</option>
                  </select>
                </div>
              </div>

              {/* Role & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Role Title ({formLang.toUpperCase()}) *
                  </label>
                  <input
                    type="text"
                    required={formLang === "en"}
                    value={formLang === "en" ? form.roleEn : form.roleJa}
                    onChange={(e) =>
                      formLang === "en"
                        ? setForm({ ...form, roleEn: e.target.value })
                        : setForm({ ...form, roleJa: e.target.value })
                    }
                    placeholder={formLang === "en" ? "Chairperson" : "会長"}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Subtitle / Affiliation ({formLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formLang === "en" ? form.subtitleEn : form.subtitleJa}
                    onChange={(e) =>
                      formLang === "en"
                        ? setForm({ ...form, subtitleEn: e.target.value })
                        : setForm({ ...form, subtitleJa: e.target.value })
                    }
                    placeholder={formLang === "en" ? "Woxsen University" : "ウォクセン大学"}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Biography / Credentials ({formLang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={formLang === "en" ? form.bioEn : form.bioJa}
                  onChange={(e) =>
                    formLang === "en"
                      ? setForm({ ...form, bioEn: e.target.value })
                      : setForm({ ...form, bioJa: e.target.value })
                  }
                  placeholder="Official bio or role overview..."
                  className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-sans"
                />
              </div>

              {/* Advanced Crop Positioning (Optional) */}
              <div className="p-3 rounded bg-[#0A0A0A] border border-white/[0.05] space-y-2">
                <span className="block text-[10px] font-mono text-neutral-400 uppercase">
                  Framing & Object Alignment (CSS):
                </span>
                <input
                  type="text"
                  value={form.position || ""}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  placeholder="e.g. object-top or object-[20%_30%]"
                  className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-white/10 text-neutral-300 font-mono"
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
                  <span>{editingId ? "Save Changes" : "Create Profile"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
