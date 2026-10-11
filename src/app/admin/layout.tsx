import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import AdminLayoutClient from "./layout-client"

export const metadata: Metadata = {
  title: "WJC Admin Panel | Woxsen Japan Centre",
  description: "Administrative Content Management for Woxsen Japan Centre",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const reqHeaders = await headers()
  const pathname = reqHeaders.get("x-pathname") || ""
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/setup"

  if (!isAuthPage) {
    try {
      const session = await auth.api.getSession({
        headers: reqHeaders,
      })

      if (!session || !session.user) {
        const returnQuery = pathname ? `?returnUrl=${encodeURIComponent(pathname)}` : ""
        redirect(`/admin/login${returnQuery}`)
      }
    } catch (err: unknown) {
      const digest = (err as { digest?: string })?.digest || ""
      if (digest.startsWith("NEXT_REDIRECT")) {
        throw err
      }
      console.error("Server admin layout session verification error:", err)
      redirect("/admin/login")
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
