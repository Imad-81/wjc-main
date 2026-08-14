import CountUp from "@/components/ui/count-up"
import type { Dictionary } from "@/i18n/types"

/**
 * The dark statistics strip that sits directly under the hero.
 *
 * This is the *only* stats block on the home page — the prototype repeated
 * the same figures three times and the Centre asked for the other two to go.
 */
export default function StatBar({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: "2025", label: dict.home.stats.inaugurated, animate: false },
    { value: "7+", label: dict.home.stats.faculty, animate: true },
    { value: "18+", label: dict.home.stats.studentLeaders, animate: true },
    { value: "150+", label: dict.home.stats.members, animate: true },
  ]

  return (
    <section className="section-bg-alt border-y border-[var(--theme-divider)]">
      <div className="max-w-content mx-auto grid grid-cols-2 divide-x divide-y divide-[var(--theme-divider)] md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-8 text-center md:py-10">
            <p className="font-serif text-3xl text-[var(--theme-stat-number)] md:text-4xl">
              {stat.animate ? (
                <CountUp end={stat.value} duration={1600} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--theme-stat-label)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
