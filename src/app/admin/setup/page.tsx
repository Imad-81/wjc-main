import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import SetupForm from "./setup-form"

export const metadata = {
  title: "Admin Setup | Woxsen Japan Centre",
}

export default async function AdminSetupPage() {
  let shouldRedirect = false
  try {
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      shouldRedirect = true
    }
  } catch (err) {
    console.error("Error checking user count:", err)
  }

  if (shouldRedirect) {
    redirect("/admin/login")
  }

  return <SetupForm />
}
