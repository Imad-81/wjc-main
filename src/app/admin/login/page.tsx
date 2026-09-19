import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import LoginForm from "./login-form"

export const metadata = {
  title: "Admin Login | Woxsen Japan Centre",
}

export default async function AdminLoginPage() {
  let hasUsers = false
  try {
    const userCount = await prisma.user.count()
    hasUsers = userCount > 0
  } catch (err) {
    console.error("Error checking user count:", err)
  }

  return (
    <Suspense fallback={<div className="text-neutral-400 font-mono text-xs">Loading portal...</div>}>
      <LoginForm hasUsers={hasUsers} />
    </Suspense>
  )
}
