import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Calendar,
  Image as ImageIcon,
  Users,
  FolderOpen,
  ArrowUpRight,
  Mail,
  Download,
  Ticket,
} from "lucide-react"
import SyncArchiveButton from "./sync-archive-button"
import { CACHE_TAGS } from "@/lib/cache"
import { isR2Configured } from "@/lib/r2"

export const metadata = {
  title: "Dashboard | WJC Administration",
}

const getDashboardCounts = unstable_cache(
  async () => {
    try {
      const [
        eventsTotal,
        upcomingTotal,
        galleryTotal,
        facultyTotal,
        studentsTotal,
        subscribersTotal,
        registrationsTotal,
      ] = await Promise.all([
        prisma.event.count({ where: { isUpcoming: false } }),
        prisma.event.count({ where: { isUpcoming: true } }),
        prisma.galleryItem.count(),
        prisma.teamMember.count({ where: { category: "faculty" } }),
        prisma.teamMember.count({ where: { category: "student" } }),
        prisma.newsletterSubscriber.count(),
        prisma.eventRegistration.count(),
      ])

      return {
        events: eventsTotal,
        upcomingEvents: upcomingTotal,
        gallery: galleryTotal,
        teamFaculty: facultyTotal,
        teamStudents: studentsTotal,
        subscribers: subscribersTotal,
        registrations: registrationsTotal,
      }
    } catch (err) {
      console.error("Error loading dashboard counts:", err)
      return {
        events: 0,
        upcomingEvents: 0,
        gallery: 0,
        teamFaculty: 0,
        teamStudents: 0,
        subscribers: 0,
        registrations: 0,
      }
    }
  },
  ["admin-dashboard-counts"],
  {
    tags: [CACHE_TAGS.DASHBOARD],
    revalidate: 3600,
  }
)

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts()
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
            <span>Neon Online</span>
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
            <div className="text-2xl font-serif font-light text-[#F7F5F0] tracking-tight mb-1">
              {isR2Configured ? "Cloudflare R2" : "Local Disk"}
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Asset Storage</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              {isR2Configured ? "wjc-main-website (Active)" : "/public/images/ fallback"}
            </p>
          </div>
        </Link>
      </div>

      {/* Lead Capture & Inquiries Module */}
      <div className="p-6 rounded-lg bg-[#141414] border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail size={16} className="text-[#C9A84C]" />
              <h2 className="font-serif text-lg text-[#F7F5F0]">Audience & Registrations</h2>
            </div>
            <p className="text-xs text-neutral-400">
              Visitor newsletter subscribers and upcoming event RSVPs collected from the website.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="/api/admin/inquiries?format=csv&type=subscribers"
              download
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-200 text-xs font-mono transition-colors"
            >
              <Download size={13} />
              <span>Subscribers CSV</span>
            </a>
            <a
              href="/api/admin/inquiries?format=csv&type=registrations"
              download
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-200 text-xs font-mono transition-colors"
            >
              <Download size={13} />
              <span>RSVPs CSV</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded bg-[#0A0A0A] border border-white/[0.05] flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-neutral-400 uppercase">Newsletter Subscribers</p>
              <div className="text-2xl font-serif text-[#F7F5F0] mt-1">{counts.subscribers}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
              <Mail size={18} />
            </div>
          </div>

          <div className="p-4 rounded bg-[#0A0A0A] border border-white/[0.05] flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-neutral-400 uppercase">Event Registrations</p>
              <div className="text-2xl font-serif text-[#F7F5F0] mt-1">{counts.registrations}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Ticket size={18} />
            </div>
          </div>
        </div>
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
