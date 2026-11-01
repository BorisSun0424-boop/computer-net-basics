import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlockRenderer } from '../components/BlockRenderer'
import { findNeighbors, getChapter, getTopic } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'
import { NotFound } from './NotFound'

export function TopicPage() {
  const { chapterSlug = '', topicSlug = '' } = useParams()
  const chapter = getChapter(chapterSlug)
  const topic = getTopic(chapterSlug, topicSlug)
  const { isRead, toggle, markRead } = useProgress()
  const [progress, setProgress] = useState(0)

  const id = topicId(chapterSlug, topicSlug)
  const done = isRead(id)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const pct = total <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / total) * 100))
      setProgress(pct)
      if (pct >= 88) markRead(id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [id, markRead, topicSlug])

  if (!chapter || !topic) return <NotFound />

  const { prev, next } = findNeighbors(chapterSlug, topicSlug)
  const indexInChapter = chapter.topics.findIndex((t) => t.slug === topic.slug)

  return (
    <article className="max-w-prose pb-16">
      <div className="sticky top-14 z-20 -mx-4 h-[2px] bg-transparent sm:-mx-6">
        <div className="h-full bg-ink-900/25 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <nav className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-300">
        <Link to="/" className="hover:text-ink-700">
          首页
        </Link>
        <span aria-hidden>/</span>
        <Link to={`/ch/${chapter.slug}`} className="hover:text-ink-700">
          {chapter.title}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">
          {String(indexInChapter + 1).padStart(2, '0')} · {topic.title}
        </span>
      </nav>

      <header className="mt-5 border-b border-ink-100 pb-6">
        <h1 className="font-serif text-[32px] font-semibold leading-[1.3] tracking-tight text-ink-900">
          {topic.title}
        </h1>
        <p className="mt-3 text-[16.5px] leading-[1.85] text-ink-500">{topic.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ink-300">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <circle cx="6" cy="6" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 3.4V6l1.8 1.1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            约 {topic.minutes} 分钟
          </span>
          <span className="text-ink-100">|</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {topic.keywords.map((k) => (
              <span key={k} className="rounded bg-paper-sunk px-1.5 py-0.5 font-mono text-[10.5px] text-ink-500">
                {k}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-2">
        <BlockRenderer blocks={topic.blocks} />
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-ink-100 pt-7">
        <button
          type="button"
          onClick={() => toggle(id)}
          className={`inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2 text-[13.5px] transition-colors ${
            done
              ? 'border-jade-500/30 bg-jade-50 text-jade-600 hover:bg-jade-50/70'
              : 'border-ink-100 bg-paper text-ink-700 hover:border-ink-300/60'
          }`}
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${
              done ? 'border-jade-500 bg-jade-500 text-white' : 'border-ink-300'
            }`}
            aria-hidden
          >
            {done ? '✓' : ''}
          </span>
          {done ? '已读，点此取消' : '标记为已读'}
        </button>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/ch/${prev.chapter.slug}/${prev.topic.slug}`}
              className="group rounded-lg border border-ink-100 bg-paper px-4 py-3 transition-colors hover:border-ink-300/50"
            >
              <span className="text-[11.5px] text-ink-300">← 上一篇</span>
              <span className="mt-0.5 block truncate text-[14px] font-medium text-ink-900 group-hover:text-accent-700">
                {prev.topic.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/ch/${next.chapter.slug}/${next.topic.slug}`}
              className="group rounded-lg border border-ink-100 bg-paper px-4 py-3 text-right transition-colors hover:border-ink-300/50"
            >
              <span className="text-[11.5px] text-ink-300">下一篇 →</span>
              <span className="mt-0.5 block truncate text-[14px] font-medium text-ink-900 group-hover:text-accent-700">
                {next.topic.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/quiz"
              className="group rounded-lg border border-ink-100 bg-paper px-4 py-3 text-right transition-colors hover:border-ink-300/50"
            >
              <span className="text-[11.5px] text-ink-300">全部读完 →</span>
              <span className="mt-0.5 block text-[14px] font-medium text-ink-900 group-hover:text-accent-700">
                去做小测验
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
