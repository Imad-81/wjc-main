"use client"

import { useState, useEffect } from "react"
import { Upload, Image as ImageIcon, X, Check, Loader2, Link2, Folder } from "lucide-react"
import Image from "next/image"

interface MediaPickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
  folder?: "events" | "gallery" | "team" | "uploads"
}

interface MediaItem {
  url: string
  name: string
  folder: string
  size: number
}

export default function MediaPicker({
  value,
  onChange,
  label = "Image",
  folder = "uploads",
}: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"upload" | "archive" | "url">("upload")
  const [uploading, setUploading] = useState(false)
  const [archive, setArchive] = useState<MediaItem[]>([])
  const [loadingArchive, setLoadingArchive] = useState(false)
  const [manualUrl, setManualUrl] = useState(value || "")
  const [filterFolder, setFilterFolder] = useState<string>("all")

  // Load archive on open
  useEffect(() => {
    if (open && tab === "archive" && archive.length === 0) {
      setLoadingArchive(true)
      fetch("/api/admin/media")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setArchive(data.items || [])
          }
        })
        .catch(console.error)
        .finally(() => setLoadingArchive(false))
    }
  }, [open, tab, archive.length])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success && data.url) {
        onChange(data.url)
        setOpen(false)
      } else {
        alert(data.error || "Upload failed")
      }
    } catch (err: unknown) {
      alert((err as Error).message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSelectFromArchive = (url: string) => {
    onChange(url)
    setOpen(false)
  }

  const handleApplyManualUrl = () => {
    if (manualUrl) {
      onChange(manualUrl)
      setOpen(false)
    }
  }

  const filteredArchive =
    filterFolder === "all" ? archive : archive.filter((item) => item.folder.startsWith(filterFolder))

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative w-16 h-16 rounded border border-white/10 bg-[#0A0A0A] overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized
              className="object-cover"
              onError={(e) => {
                // If broken image, clear preview
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ) : (
            <ImageIcon size={20} className="text-neutral-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/..."
            className="w-full px-3 py-2 text-xs rounded bg-[#0A0A0A] border border-white/10 text-neutral-200 focus:border-[#C9A84C] focus:outline-none font-mono truncate"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded bg-white/[0.05] hover:bg-[#C9A84C]/15 border border-white/10 hover:border-[#C9A84C]/40 text-[#F7F5F0] text-xs font-mono shrink-0 transition-colors cursor-pointer"
        >
          Select Media
        </button>
      </div>

      {/* Modal Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-lg bg-[#141414] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base text-[#F7F5F0]">Select Media</span>
                <span className="text-xs font-mono text-[#C9A84C]">• 写真選択</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/[0.08] bg-[#0E0E0E]">
              <button
                type="button"
                onClick={() => setTab("upload")}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-mono transition-colors border-b-2 cursor-pointer ${
                  tab === "upload"
                    ? "border-[#C9A84C] text-[#C9A84C]"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Upload size={14} />
                <span>Upload New</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("archive")}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-mono transition-colors border-b-2 cursor-pointer ${
                  tab === "archive"
                    ? "border-[#C9A84C] text-[#C9A84C]"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Folder size={14} />
                <span>Archive Photos</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("url")}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-mono transition-colors border-b-2 cursor-pointer ${
                  tab === "url"
                    ? "border-[#C9A84C] text-[#C9A84C]"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Link2 size={14} />
                <span>Direct Path</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Tab 1: Upload */}
              {tab === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-white/15 hover:border-[#C9A84C]/50 rounded-lg p-8 text-center transition-colors">
                    <input
                      type="file"
                      id="media-upload-input"
                      accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <label
                      htmlFor="media-upload-input"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center mb-3">
                        {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={22} />}
                      </div>
                      <p className="text-sm font-medium text-neutral-200 mb-1">
                        {uploading ? "Uploading to public folder..." : "Click or drag image to upload"}
                      </p>
                      <p className="text-xs text-neutral-500 font-mono">
                        Saved into: <span className="text-[#C9A84C]">/public/images/{folder}/</span>
                      </p>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 2: Archive Browser */}
              {tab === "archive" && (
                <div className="space-y-4">
                  {/* Folder filter */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {["all", "gallery", "events", "team", "uploads"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFilterFolder(f)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                          filterFolder === f
                            ? "bg-[#C9A84C] text-black font-semibold"
                            : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {loadingArchive ? (
                    <div className="py-12 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
                      <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
                      <span>Loading public media library...</span>
                    </div>
                  ) : filteredArchive.length === 0 ? (
                    <div className="py-12 text-center text-neutral-500 text-xs font-mono">
                      No archive images found in this folder.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
                      {filteredArchive.map((item) => {
                        const isSelected = value === item.url
                        return (
                          <div
                            key={item.url}
                            onClick={() => handleSelectFromArchive(item.url)}
                            className={`group relative aspect-square rounded overflow-hidden border cursor-pointer transition-all ${
                              isSelected
                                ? "border-[#C9A84C] ring-2 ring-[#C9A84C]"
                                : "border-white/10 hover:border-[#C9A84C]/50"
                            }`}
                          >
                            <Image
                              src={item.url}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#C9A84C] text-black flex items-center justify-center shadow">
                                <Check size={12} className="stroke-[3]" />
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs p-1 text-[9px] font-mono text-neutral-300 truncate">
                              {item.name}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Direct URL */}
              {tab === "url" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Enter direct path or URL:
                    </label>
                    <input
                      type="text"
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      placeholder="/images/gallery/DSC00027-compressed.webp"
                      className="w-full px-3 py-2 text-sm rounded bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] focus:outline-none text-[#F7F5F0] font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyManualUrl}
                    className="px-4 py-2 rounded bg-[#C9A84C] text-black font-semibold text-xs font-mono"
                  >
                    Apply URL
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
