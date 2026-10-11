import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { newsletterSubscribeSchema } from "@/lib/validations"
import { checkRateLimit } from "@/lib/rate-limit"
import { handleApiError } from "@/lib/api-errors"

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for") || "unknown"
    const limit = checkRateLimit(`newsletter:${clientIp}`, {
      limit: 6,
      windowMs: 60 * 1000,
    })
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please wait a minute." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validated = newsletterSubscribeSchema.parse(body)
    const normalizedEmail = validated.email.toLowerCase().trim()

    await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        locale: validated.locale,
        isActive: true,
      },
      create: {
        email: normalizedEmail,
        locale: validated.locale,
        isActive: true,
      },
    })

    return NextResponse.json({
      success: true,
      message:
        validated.locale === "ja"
          ? "ニュースレターにご登録いただき、誠にありがとうございます。"
          : "Thank you for subscribing to the Japan Centre newsletter.",
    })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to subscribe to newsletter")
  }
}
