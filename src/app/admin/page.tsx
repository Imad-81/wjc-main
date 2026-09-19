import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, Image as ImageIcon, Users, FolderOpen, ArrowUpRight } from "lucide-react"
import SyncArchiveButton from "./sync-archive-button"

export const metadata = {
  title: "Dashboard | WJC Administration",
}

export default async function AdminDashboardPage() {
  let counts = { events: 0, upcomingEvents: 0, gallery: 0, teamFaculty: 0, teamStudents: 0 }

  try {
    const [eventsTotal, upcomingTotal, galleryTotal, facultyTotal, studentsTotal] = await Promise.all([
      prisma.event.count({ where: { isUpcoming: false } }),
      prisma.event.count({ where: { isUpcoming: true } }),
      prisma.galleryItem.count(),
      prisma.teamMember.count({ where: { category: "faculty" } }),
      prisma.teamMember.count({ where: { category: "student" } }),
    ])

    counts = {
      events: eventsTotal,
      upcomingEvents: upcomingTotal,
      gallery: galleryTotal,
      teamFaculty: facultyTotal,
      teamStudents: studentsTotal,
    }
  } catch (err) {
    console.error("Error loading dashboard counts:", err)
  }

  const totalTeam = counts.teamFaculty + counts.teamStudents
  const totalEvents = counts.events + counts.upcomingEvents

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-xs font-mono tracking-widest text-[#C9A84C] uppercase">Executive Panel</span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-serif text-neutral-400 font-jp">管理総覧</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[#F7F5F0] tracking-tight">
            Centre Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Supabase Online</span>
          </div>
          <SyncArchiveButton />
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Events Card */}
        <Link
          href="/admin/events"
          className="group p-6 rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]">
              <Calendar size={20} />
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-[#C9A84C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="mt-6">
            <div className="text-3xl font-serif font-light text-[#F7F5F0] tracking-tight mb-1">
              {totalEvents}
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Managed Events</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              {counts.events} Flagship • {counts.upcomingEvents} Upcoming
            </p>
          </div>
        </Link>

        {/* Gallery Card */}
        <Link
          href="/admin/gallery"
          className="group p-6 rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <ImageIcon size={20} />
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="mt-6">
            <div className="text-3xl font-serif font-light text-[#F7F5F0] tracking-tight mb-1">
              {counts.gallery}
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Gallery Photographs</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Festivals, Cultural & Academic
            </p>
          </div>
        </Link>

        {/* Team Card */}
        <Link
          href="/admin/team"
          className="group p-6 rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Users size={20} />
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="mt-6">
            <div className="text-3xl font-serif font-light text-[#F7F5F0] tracking-tight mb-1">
              {totalTeam}
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Team Members</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              {counts.teamFaculty} Faculty • {counts.teamStudents} Students
            </p>
          </div>
        </Link>

        {/* Media Library Card */}
        <Link
          href="/admin/media"
          className="group p-6 rounded-lg bg-[#141414] border border-white/[0.08] hover:border-[#C9A84C]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <FolderOpen size={20} />
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="mt-6">
            <div className="text-3xl font-serif font-light text-[#F7F5F0] tracking-tight mb-1">
              Local Storage
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Public Media</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              /public/images/ directory
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Navigation & Section Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Quick Manager */}
        <div className="p-6 rounded-lg bg-[#141414] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-sm text-[#C9A84C] tracking-wide">行事管理</span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase">Events & Programs</span>
            </div>
            <h3 className="font-serif text-lg text-[#F7F5F0] mb-2">Publish & Edit Events</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Create flagship Matsuri events, upcoming symposiums, delegate visits, and community celebrations with full bilingual support.
            </p>
          </div>
          <Link
            href="/admin/events"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white/[0.04] hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C]/40 text-neutral-200 hover:text-[#F7F5F0] text-xs font-medium tracking-wide transition-all"
          >
            <span>Open Events Editor</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Gallery Quick Manager */}
        <div className="p-6 rounded-lg bg-[#141414] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-sm text-[#C9A84C] tracking-wide">写真管理</span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase">Photo Archive</span>
            </div>
            <h3 className="font-serif text-lg text-[#F7F5F0] mb-2">Curate Gallery Exhibition</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upload photographs, assign masonry cell layouts (tall, wide, square), and categorize them for the public masonry grid.
            </p>
          </div>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white/[0.04] hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C]/40 text-neutral-200 hover:text-[#F7F5F0] text-xs font-medium tracking-wide transition-all"
          >
            <span>Open Gallery Editor</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Team Quick Manager */}
        <div className="p-6 rounded-lg bg-[#141414] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-sm text-[#C9A84C] tracking-wide">組織管理</span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase">Faculty & Students</span>
            </div>
            <h3 className="font-serif text-lg text-[#F7F5F0] mb-2">Update Leadership & Team</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Maintain faculty profiles, student leadership heads, biographies, portrait portraits, and crop framing overrides.
            </p>
          </div>
          <Link
            href="/admin/team"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white/[0.04] hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C]/40 text-neutral-200 hover:text-[#F7F5F0] text-xs font-medium tracking-wide transition-all"
          >
            <span>Open Team Editor</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
