import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Mono, DM_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google"
import { ThemeScript } from "@/components/wjc/theme-provider"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["300", "400", "500"],
  display: "swap",
})

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://japancentre.woxsen.edu.in"),
  title: {
    default: "Woxsen Japan Centre | ウォクセン日本センター",
    template: "%s | Woxsen Japan Centre",
  },
  description: "Bridging Japan and Global Business Leadership",
  icons: {
    icon: "/images/logos/white-logo.png",
    apple: "/images/logos/white-logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#232323",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} ${notoSerifJp.variable} ${notoSansJp.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}

