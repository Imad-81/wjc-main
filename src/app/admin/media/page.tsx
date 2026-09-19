"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  FolderOpen,
  Upload,
  Search,
  Copy,
  Check,
  Loader2,
  ExternalLink,
  Folder,
} from "lucide-react"

interface MediaItem {
  url: string
  name: string
  folder: string
  size: number
  mtime: number
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [folderFilter, setFolderFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [targetFolder, setTargetFolder] = useState("uploads")

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/media")
      const data = await res.json()
      if (data.success) {
        setMedia(data.items || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])
        formData.append("folder", targetFolder)

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (!data.success) {
          alert(`Failed to upload ${files[i].name}: ${data.error}`)
        }
      }
      fetchMedia()
    } catch (err: unknown) {
      alert((err as Error).message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2500)
  }

  const filteredMedia = media.filter((item) => {
    const matchesFolder = folderFilter === "all" || item.folder.startsWith(folderFilter)
    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.folder.toLowerCase().includes(search.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#C9A84C] tracking-widest uppercase">File System</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">画像書庫</span>
          </div>
          <h1 className="font-serif text-3xl text-[#F7F5F0]">Public Media Library</h1>
        </div>

        {/* Upload Control */}
        <div className="flex items-center gap-3">
          <select
            value={targetFolder}
            onChange={(e) => setTargetFolder(e.target.value)}
            className="px-3 py-2 rounded bg-[#141414] border border-white/10 text-xs font-mono text-neutral-300 focus:border-[#C9A84C] focus:outline-none"
          >
            <option value="uploads">To: /uploads</option>
            <option value="events">To: /events</option>
            <option value="gallery">To: /gallery</option>
            <option value="team">To: /team</option>
          </select>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C9A84C] hover:bg-[#D4A94D] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(201,168,76,0.2)]">
            <Upload size={14} />
            <span>{uploading ? "Uploading..." : "Upload Images"}</span>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["all", "uploads", "events", "gallery", "team", "hero-banner"].map((f) => (
            <button
              key={f}
              onClick={() => setFolderFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-mono capitalize transition-colors cursor-pointer ${
                folderFilter === f
                  ? "bg-[#C9A84C] text-black font-semibold"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filenames..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded bg-[#141414] border border-white/10 text-[#F7F5F0] placeholder:text-neutral-600 focus:outline-none focus:border-[#C9A84C] font-mono"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs font-mono gap-2">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Scanning local media directory...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center rounded-lg bg-[#141414] border border-white/[0.08] text-neutral-400 font-mono text-xs">
          No files found. Upload images to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredMedia.map((item) => (
            <div
              key={item.url}
              className="group relative rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/50 overflow-hidden flex flex-col transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square w-full bg-[#0A0A0A] overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="p-2 rounded bg-black/80 text-white hover:text-[#C9A84C] border border-white/20 hover:border-[#C9A84C]/50 transition-colors"
                    title="Copy URL"
                  >
                    {copiedUrl === item.url ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-black/80 text-white hover:text-[#C9A84C] border border-white/20 hover:border-[#C9A84C]/50 transition-colors"
                    title="Open full size"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-2 text-[10px] font-mono border-t border-white/[0.05] bg-[#0E0E0E]">
                <p className="text-neutral-300 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-neutral-500 mt-1">
                  <span className="truncate">{item.folder}</span>
                  <span>{(item.size / 1024).toFixed(0)} KB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
