import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { hashPassword } from "better-auth/crypto"
import { checkRateLimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ success: true, users })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch users"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError, session } = await requireAdminSession()
    if (authError) return authError

    // Rate limit account creation to 10 per hour per IP
    const clientIp = request.headers.get("x-forwarded-for") || "unknown"
    const limit = checkRateLimit(`admin-user-create:${clientIp}`, {
      limit: 10,
      windowMs: 60 * 60 * 1000,
    })
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many admin accounts created. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, password } = body

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Administrator name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })
    if (existing) {
      return NextResponse.json(
        { error: `An account with email "${normalizedEmail}" already exists` },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)

    // Create user and credentials account in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          emailVerified: true,
          role: "admin",
        },
      })

      await tx.account.create({
        data: {
          userId: u.id,
          accountId: u.id,
          providerId: "credential",
          password: hashedPassword,
        },
      })

      return u
    })

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      message: `Administrator "${name}" provisioned successfully by ${session?.user?.email || "admin"}.`,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create administrator"
    console.error("Admin user creation error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { error: authError, session } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const { id } = body

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Safety checks
    if (session?.user?.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own active administrator account." },
        { status: 400 }
      )
    }

    const totalUsers = await prisma.user.count()
    if (totalUsers <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the sole remaining administrator account." },
        { status: 400 }
      )
    }

    const deleted = await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: `Administrator "${deleted.name}" removed successfully.`,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete administrator"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
