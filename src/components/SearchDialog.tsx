import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search } from '../lib/search'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => search(q), [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setCursor(0)
      // 等 portal 挂载后再聚焦，避免 iOS 上焦点弹跳
      const t = window.setTimeout(() => inputRef.current?.focus(), 40)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, Math.max(results.length - 1, 0)))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    }
    if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault()
      go(results[cursor].to)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="搜索">
      <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <div className="relative w-full max-w-xl animate-fade-up overflow-hidden rounded-xl border border-ink-100 bg-paper shadow-[0_24px_64px_-24px_rgba(26,26,24,0.28)]">
        <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-ink-300" aria-hidden>
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setCursor(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="搜索知识点、术语或场景…"
            className="flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <kbd className="hidden rounded border border-ink-100 px-1.5 py-0.5 text-[11px] text-ink-300 sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {q.trim() === '' && (
            <p className="px-3 py-6 text-center text-[13px] text-ink-300">
              试试搜「DNS」「缓存」「找不到路径」
            </p>
          )}

          {q.trim() !== '' && results.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-ink-300">没有找到相关内容</p>
          )}

          {results.map((hit, i) => (
            <button
              key={`${hit.to}-${hit.title}-${i}`}
              type="button"
              onMouseEnter={() => setCursor(i)}
              onClick={() => go(hit.to)}
              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                i === cursor ? 'bg-accent-50' : 'hover:bg-paper-soft'
              }`}
            >
              <span className="mt-[3px] shrink-0 rounded border border-ink-100 bg-paper px-1.5 py-0.5 text-[10.5px] text-ink-500">
                {hit.kind}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium text-ink-900">{hit.title}</span>
                <span className="mt-0.5 block truncate text-[12.5px] text-ink-500">{hit.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
