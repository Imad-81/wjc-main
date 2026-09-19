import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function requireAdminSession() {
  try {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({
      headers: reqHeaders,
    })

    if (!session || !session.user) {
      return {
        error: NextResponse.json(
          { error: "Unauthorized: Administrator session required" },
          { status: 401 }
        ),
        session: null,
      }
    }

    return { error: null, session }
  } catch (err) {
    console.error("Auth guard error:", err)
    return {
      error: NextResponse.json(
        { error: "Unauthorized: Session verification failed" },
        { status: 401 }
      ),
      session: null,
    }
  }
}
