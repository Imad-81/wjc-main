"use client"

import { useState, useTransition, type FormEvent } from "react"
import { CalendarCheck2, CheckCircle2, Loader2, Sparkles, X } from "lucide-react"
import type { Locale } from "@/i18n/config"

interface EventRsvpModalProps {
  slug: string
  title: string
  locale: Locale
  buttonLabel?: string
  className?: string
}

export default function EventRsvpModal({
  slug,
  title,
  locale,
  buttonLabel,
  className = "",
}: EventRsvpModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const isJa = locale === "ja"

  const defaultBtnText = isJa ? "参加登録する (RSVP)" : "Register for Event"
  const triggerText = buttonLabel || defaultBtnText

  const handleOpen = () => {
    setStatus("idle")
    setFeedbackMessage("")
    setIsOpen(true)
  }

  const handleClose = () => {
    if (isPending) return
    setIsOpen(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    startTransition(async () => {
      try {
        const res = await fetch("/api/events/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            name,
            email,
            phone: phone || undefined,
            locale,
            notes: notes || undefined,
          }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
          setStatus("error")
          setFeedbackMessage(data.error || (isJa ? "登録に失敗しました。もう一度お試しください。" : "Failed to register. Please try again."))
          return
        }

        setStatus("success")
        setFeedbackMessage(data.message || (isJa ? "ご登録ありがとうございます。" : "Thank you for registering!"))
      } catch (err: unknown) {
        setStatus("error")
        setFeedbackMessage((err as Error).message || (isJa ? "通信エラーが発生しました。" : "A network error occurred."))
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
          className || "bg-[var(--theme-accent,#c59b27)] text-[#141210] hover:bg-white hover:text-black shadow-lg hover:shadow-xl"
        }`}
      >
        <CalendarCheck2 className="size-4" />
        <span>{triggerText}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg overflow-hidden border border-[#c59b27]/30 bg-[#171513] text-[#f2efe9] shadow-2xl transition-all">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-[#2d2925] px-6 py-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c59b27]">
                <Sparkles className="size-3.5" />
                <span>{isJa ? "イベント参加登録" : "Event RSVP"}</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="rounded-full p-1 text-[#8c827a] hover:bg-[#25221e] hover:text-[#f2efe9] transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {status === "success" ? (
                <div className="text-center py-6">
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#f2efe9] mb-2">
                    {isJa ? "登録が完了しました" : "Registration Confirmed"}
                  </h3>
                  <p className="text-sm text-[#a89e92] max-w-md mx-auto leading-relaxed mb-6">
                    {feedbackMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#25221e] hover:bg-[#322e29] text-[#f2efe9] border border-[#3d3832] transition-colors"
                  >
                    {isJa ? "閉じる" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="font-serif text-xl sm:text-2xl text-[#f2efe9] leading-snug">
                      {title}
                    </h2>
                    <p className="mt-1 text-xs text-[#8c827a] leading-relaxed">
                      {isJa
                        ? "以下のフォームにご記入の上、送信してください。確認メールおよび詳細情報をお送りします。"
                        : "Complete the form below to reserve your place. We will keep you updated with event announcements."}
                    </p>
                  </div>

                  {status === "error" && (
                    <div className="mb-5 rounded border border-rose-500/30 bg-rose-950/40 px-4 py-3 text-xs text-rose-300">
                      {feedbackMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#a89e92] mb-1.5">
                        {isJa ? "氏名 *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isJa ? "山田 太郎" : "Jane Doe"}
                        className="w-full bg-[#100e0d] border border-[#2d2925] px-3.5 py-2.5 text-sm text-[#f2efe9] placeholder-[#57514a] focus:border-[#c59b27] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#a89e92] mb-1.5">
                        {isJa ? "メールアドレス *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-[#100e0d] border border-[#2d2925] px-3.5 py-2.5 text-sm text-[#f2efe9] placeholder-[#57514a] focus:border-[#c59b27] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#a89e92] mb-1.5">
                        {isJa ? "電話番号 (任意)" : "Phone Number (Optional)"}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 / +81 ..."
                        className="w-full bg-[#100e0d] border border-[#2d2925] px-3.5 py-2.5 text-sm text-[#f2efe9] placeholder-[#57514a] focus:border-[#c59b27] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#a89e92] mb-1.5">
                        {isJa ? "ご質問・特記事項 (任意)" : "Notes or Inquiries (Optional)"}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={isJa ? "参加にあたっての要望など" : "Dietary restrictions, seating preferences..."}
                        className="w-full bg-[#100e0d] border border-[#2d2925] px-3.5 py-2.5 text-sm text-[#f2efe9] placeholder-[#57514a] focus:border-[#c59b27] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-[#c59b27] hover:bg-[#d8ab31] text-[#141210] font-semibold text-xs uppercase tracking-[0.18em] py-3.5 transition-colors disabled:opacity-50"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>{isJa ? "送信中..." : "Submitting..."}</span>
                          </>
                        ) : (
                          <span>{isJa ? "参加登録を確定する" : "Confirm RSVP"}</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
