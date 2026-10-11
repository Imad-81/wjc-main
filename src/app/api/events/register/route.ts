import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { eventRegistrationSchema } from "@/lib/validations"
import { checkRateLimit } from "@/lib/rate-limit"
import { handleApiError } from "@/lib/api-errors"

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for") || "unknown"
    const limit = checkRateLimit(`event-rsvp:${clientIp}`, {
      limit: 10,
      windowMs: 60 * 1000,
    })
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait a minute." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validated = eventRegistrationSchema.parse(body)

    // Verify event exists and registration is open
    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id: validated.eventId }, { slug: validated.slug }],
      },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    if (!event.registrationOpen) {
      return NextResponse.json(
        {
          error:
            validated.locale === "ja"
              ? "現在、このイベントの登録は受け付けておりません。"
              : "Registration for this event is currently closed.",
        },
        { status: 400 }
      )
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        slug: event.slug,
        name: validated.name.trim(),
        email: validated.email.toLowerCase().trim(),
        phone: validated.phone?.trim() || null,
        locale: validated.locale,
        notes: validated.notes?.trim() || null,
      },
    })

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      message:
        validated.locale === "ja"
          ? "イベントへの参加登録が完了いたしました。"
          : `You have successfully registered for "${event.titleEn}".`,
    })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to submit event registration")
  }
}
