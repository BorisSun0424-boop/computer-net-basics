import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { chapters } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'

const navItems = [
  { to: '/', label: '首页' },
  { to: '/map', label: '知识地图' },
  { to: '/roadmap', label: '学习路线' },
  { to: '/scenarios', label: '场景问答' },
  { to: '/glossary', label: '术语词典' },
  { to: '/quiz', label: '小测验' },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const { isRead } = useProgress()

  const activeChapter = chapters.find((c) => pathname.startsWith(`/ch/${c.slug}`))?.slug
  const [open, setOpen] = useState<string[]>(() => (activeChapter ? [activeChapter] : ['path']))

  useEffect(() => {
    if (activeChapter && !open.includes(activeChapter)) {
      setOpen((prev) => [...prev, activeChapter])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChapter])

  const toggle = (slug: string) =>
    setOpen((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))

  return (
    <div className="pb-16">
      <nav className="mb-6 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'block rounded-md px-3 py-1.5 text-[14px] transition-colors',
                isActive
                  ? 'bg-ink-900/[0.055] font-medium text-ink-900'
                  : 'text-ink-500 hover:bg-ink-900/[0.03] hover:text-ink-900',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">
        知识地图
      </div>

      <ul className="space-y-0.5">
        {chapters.map((chapter) => {
          const isOpen = open.includes(chapter.slug)
          const readCount = chapter.topics.filter((t) => isRead(topicId(chapter.slug, t.slug))).length
          const allRead = readCount === chapter.topics.length

          return (
            <li key={chapter.slug}>
              <button
                type="button"
                onClick={() => toggle(chapter.slug)}
                className="group flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-left transition-colors hover:bg-ink-900/[0.03]"
                aria-expanded={isOpen}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] text-[11px] font-semibold text-white"
                  style={{ backgroundColor: allRead ? chapter.color : `${chapter.color}99` }}
                >
                  {chapter.index}
                </span>
                <span className="flex-1 text-[14px] font-medium text-ink-700 group-hover:text-ink-900">
                  {chapter.title}
                </span>
                <span className="text-[11px] tabular-nums text-ink-300">
                  {readCount}/{chapter.topics.length}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className={`shrink-0 text-ink-300 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  aria-hidden
                >
                  <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isOpen && (
                <ul className="mb-1 ml-[22px] space-y-0 border-l border-ink-100 pl-2.5">
                  {chapter.topics.map((topic) => {
                    const done = isRead(topicId(chapter.slug, topic.slug))
                    return (
                      <li key={topic.slug}>
                        <NavLink
                          to={`/ch/${chapter.slug}/${topic.slug}`}
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            [
                              'flex items-baseline gap-2 rounded px-2 py-[5px] text-[13.5px] leading-snug transition-colors',
                              isActive
                                ? 'bg-accent-50 font-medium text-accent-700'
                                : 'text-ink-500 hover:bg-ink-900/[0.03] hover:text-ink-900',
                            ].join(' ')
                          }
                        >
                          <span
                            className={`mt-[6px] h-1 w-1 shrink-0 rounded-full ${
                              done ? 'bg-jade-500' : 'bg-ink-300/60'
                            }`}
                            aria-hidden
                          />
                          <span className="flex-1">{topic.title}</span>
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
