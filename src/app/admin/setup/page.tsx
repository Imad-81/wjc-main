import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import SetupForm from "./setup-form"

export const metadata = {
  title: "Admin Setup | Woxsen Japan Centre",
}

export default async function AdminSetupPage() {
  try {
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      redirect("/admin/login")
    }
  } catch (err) {
    console.error("Error checking user count:", err)
  }

  return <SetupForm />
}
