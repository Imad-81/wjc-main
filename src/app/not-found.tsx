import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#141414] text-[#F8F7F4] flex flex-col items-center justify-center p-6 text-center">
      <span className="font-serif text-6xl text-[#A63A2B] mb-4">404</span>
      <h1 className="font-serif text-2xl md:text-3xl mb-2">Page Not Found / ページが見つかりません</h1>
      <p className="text-sm text-neutral-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xs bg-[#A63A2B] hover:bg-[#8e3124] text-white text-sm font-medium transition-colors"
      >
        Return Home / ホームへ戻る
      </Link>
    </div>
  )
}
