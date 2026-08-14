import type { ReactNode } from "react"
import "./globals.css"

/**
 * The real document shell lives in `app/[locale]/layout.tsx`, which needs the
 * locale param to set <html lang>. This root layout only exists to satisfy
 * Next's requirement for one at the app root.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
