import type { Metadata } from "next"
import AdminLayoutClient from "./layout-client"

export const metadata: Metadata = {
  title: "WJC Admin Panel | Woxsen Japan Centre",
  description: "Administrative Content Management for Woxsen Japan Centre",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
