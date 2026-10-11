import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { ZodError } from "zod"

export function handleApiError(error: unknown, fallbackMessage = "Internal server error") {
  if (error instanceof ZodError) {
    const issues = error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }))
    const firstMessage = issues[0]?.message || "Invalid input data"
    return NextResponse.json(
      {
        error: firstMessage,
        details: issues,
      },
      { status: 400 }
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint failed
    if (error.code === "P2002") {
      const target = Array.isArray(error.meta?.target)
        ? error.meta.target.join(", ")
        : (error.meta?.target as string) || "field"
      return NextResponse.json(
        {
          error: `A record with this ${target} already exists. Please choose a unique value.`,
          code: "DUPLICATE_RECORD",
        },
        { status: 409 }
      )
    }

    // P2025: Record to update/delete not found
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "The requested record was not found or has already been deleted.",
          code: "NOT_FOUND",
        },
        { status: 404 }
      )
    }

    // P2003: Foreign key constraint failed
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error: "Foreign key constraint failed.",
          code: "FOREIGN_KEY_VIOLATION",
        },
        { status: 400 }
      )
    }
  }

  if (error instanceof Error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: error.message || fallbackMessage },
      { status: 500 }
    )
  }

  console.error("Unknown API error:", error)
  return NextResponse.json(
    { error: fallbackMessage },
    { status: 500 }
  )
}
