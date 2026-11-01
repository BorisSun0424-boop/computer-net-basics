import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scenarios } from '../content/scenarios'

export function Scenarios() {
  const [open, setOpen] = useState<number[]>([0])

  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Troubleshooting</div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-tight tracking-tight text-ink-900">
          常见场景问答
        </h1>
        <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-500">
          这些是真实会被问到的问题。每一条都给出「怎么判断」和「怎么处理」，而不是一句"重启试试"。
        </p>
      </header>

      <div className="mt-4 divide-y divide-ink-100/70">
        {scenarios.map((s, i) => {
          const isOpen = open.includes(i)
          return (
            <div key={s.q} className="py-1">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start gap-3 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="mt-0.5 shrink-0 font-mono text-[11.5px] text-ink-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-serif text-[17px] font-semibold leading-snug text-ink-900">
                  {s.q}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className={`mt-1.5 shrink-0 text-ink-300 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden
                >
                  <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {isOpen && (
                <div className="animate-fade-in pb-6 pl-8 pr-2">
                  <ol className="space-y-2.5">
                    {s.a.map((line, li) => (
                      <li key={li} className="flex gap-2.5 text-[14.5px] leading-[1.85] text-ink-700">
                        <span className="mt-[11px] block h-1 w-1 shrink-0 rounded-full bg-ink-300" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ol>

                  {s.refs && s.refs.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-[12px] text-ink-300">相关：</span>
                      {s.refs.map((r) => (
                        <Link
                          key={r.to}
                          to={r.to}
                          className="rounded-md border border-ink-100 bg-paper px-2 py-1 text-[12px] text-ink-700 transition-colors hover:border-accent-100 hover:text-accent-700"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
