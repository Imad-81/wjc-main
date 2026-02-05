import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="absolute top-6 left-6 z-20 md:top-8 md:left-12 hover:opacity-80 transition-opacity">
      <Image
        src="/wjc-logo.png"
        alt="Woxsen Japan Centre Logo"
        width={80}
        height={80}
        priority
        className="w-16 md:w-20 h-auto"
      />
    </Link>
  )
}
