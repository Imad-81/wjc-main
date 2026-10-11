import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { handleApiError } from "@/lib/api-errors"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format")
    const type = searchParams.get("type") || "subscribers"

    // 1. CSV Export Mode
    if (format === "csv") {
      if (type === "subscribers") {
        const subscribers = await prisma.newsletterSubscriber.findMany({
          orderBy: { createdAt: "desc" },
        })
        const csvRows = [
          ["ID", "Email", "Locale", "Active", "Created At"],
          ...subscribers.map((s) => [
            s.id,
            `"${s.email}"`,
            s.locale,
            s.isActive ? "Yes" : "No",
            `"${s.createdAt.toISOString()}"`,
          ]),
        ]
        const csvString = csvRows.map((r) => r.join(",")).join("\n")
        return new NextResponse(csvString, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="wjc-newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv"`,
          },
        })
      }

      if (type === "registrations") {
        const registrations = await prisma.eventRegistration.findMany({
          orderBy: { createdAt: "desc" },
        })
        const csvRows = [
          ["ID", "Event Slug", "Name", "Email", "Phone", "Locale", "Notes", "Created At"],
          ...registrations.map((r) => [
            r.id,
            `"${r.slug}"`,
            `"${r.name.replace(/"/g, '""')}"`,
            `"${r.email}"`,
            `"${r.phone || ""}"`,
            r.locale,
            `"${(r.notes || "").replace(/"/g, '""')}"`,
            `"${r.createdAt.toISOString()}"`,
          ]),
        ]
        const csvString = csvRows.map((r) => r.join(",")).join("\n")
        return new NextResponse(csvString, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="wjc-event-registrations-${new Date().toISOString().split("T")[0]}.csv"`,
          },
        })
      }
    }

    // 2. JSON Admin Dashboard Metrics Mode
    const [subscriberCount, registrationCount, recentSubscribers, recentRegistrations] =
      await Promise.all([
        prisma.newsletterSubscriber.count(),
        prisma.eventRegistration.count(),
        prisma.newsletterSubscriber.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
        }),
        prisma.eventRegistration.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
        }),
      ])

    return NextResponse.json({
      success: true,
      counts: {
        subscribers: subscriberCount,
        registrations: registrationCount,
      },
      recentSubscribers,
      recentRegistrations,
    })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to fetch inquiries data")
  }
}
