import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { glossary } from '../content/glossary'

export function Glossary() {
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const key = q.trim().toLowerCase()
    if (!key) return glossary
    return glossary.filter((g) =>
      `${g.term} ${g.en ?? ''} ${g.brief}`.toLowerCase().includes(key),
    )
  }, [q])

  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Glossary</div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-tight tracking-tight text-ink-900">
          术语词典
        </h1>
        <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-500">
          {glossary.length} 个词，每个都用一句人话解释。听到不懂的词先来这里查，再点进对应知识点看完整版。
        </p>

        <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-ink-100 bg-paper px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0 text-ink-300" aria-hidden>
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="筛选术语，如 DNS、缓存、Cookie…"
            className="flex-1 bg-transparent text-[14.5px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="text-[12px] text-ink-300 hover:text-ink-700"
            >
              清除
            </button>
          )}
        </div>
      </header>

      {list.length === 0 ? (
        <p className="py-12 text-center text-[14px] text-ink-300">没有匹配的术语</p>
      ) : (
        <ul className="mt-2 divide-y divide-ink-100/70">
          {list.map((g) => (
            <li key={g.term} className="group py-4">
              <div className="flex items-baseline gap-2.5">
                <h3 className="font-serif text-[17px] font-semibold text-ink-900">{g.term}</h3>
                {g.en && <span className="font-mono text-[11.5px] text-ink-300">{g.en}</span>}
                {g.ref && (
                  <Link
                    to={g.ref}
                    className="ml-auto shrink-0 text-[12px] text-accent-600 opacity-0 transition-opacity hover:underline focus:opacity-100 group-hover:opacity-100"
                  >
                    看详情 →
                  </Link>
                )}
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.8] text-ink-700">{g.brief}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 rounded-lg border border-ink-100 bg-paper px-5 py-4 text-[13.5px] leading-[1.8] text-ink-500">
        没找到想要的词？用右上角的搜索（
        <kbd className="rounded border border-ink-100 px-1 py-px font-mono text-[11px]">⌘K</kbd>
        ）能搜到所有正文里的内容，不只是标题。
      </div>
    </div>
  )
}
