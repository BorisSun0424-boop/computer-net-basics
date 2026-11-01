import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { chapters, totalTopics } from '../content'
import { useProgress } from '../hooks/useProgress'
import { SearchDialog } from './SearchDialog'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const { doneCount } = useProgress()

  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawerOpen])

  const pct = Math.round((doneCount / totalTopics) * 100)

  return (
    <div className="min-h-screen">
      {/* 全站阅读进度，细到几乎不打扰 */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-accent-500 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper-soft/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="-ml-1 rounded-md p-1.5 text-ink-500 hover:bg-ink-900/5 lg:hidden"
            aria-label="打开目录"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink-900 font-serif text-[15px] leading-none text-paper">
              常
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[15px] font-semibold tracking-tight text-ink-900">常识课</span>
              <span className="mt-[3px] text-[10.5px] tracking-[0.12em] text-ink-300">COMPUTER &amp; INTERNET</span>
            </span>
          </NavLink>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-md border border-ink-100 bg-paper px-2.5 py-1.5 text-[13px] text-ink-500 transition-colors hover:border-ink-300/60 hover:text-ink-900"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
                <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">搜索</span>
              <kbd className="hidden rounded border border-ink-100 px-1 py-px text-[10.5px] text-ink-300 md:inline">
                ⌘K
              </kbd>
            </button>

            <div className="hidden items-center gap-2 rounded-md border border-ink-100 bg-paper px-2.5 py-1.5 md:flex">
              <span className="text-[11.5px] text-ink-300">已读</span>
              <span className="text-[12.5px] font-medium tabular-nums text-ink-900">
                {doneCount}
                <span className="text-ink-300">/{totalTopics}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] px-4 sm:px-6">
        <aside className="hidden w-[248px] shrink-0 border-r border-ink-100/70 pt-6 pr-5 lg:block">
          <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto pb-8">
            <Sidebar />
          </div>
        </aside>

        <main className="min-w-0 flex-1 pt-6 lg:pl-10">
          <Outlet />
        </main>
      </div>

      <footer className="mt-16 border-t border-ink-100 py-8">
        <div className="mx-auto max-w-[1180px] px-4 text-[12.5px] text-ink-300 sm:px-6">
          <p>
            {chapters.length} 章 · {totalTopics} 个知识点 · 写给非技术人的基础常识
          </p>
          <p className="mt-1.5">内容基于通行标准整理，涉及具体产品时以官方文档为准。</p>
        </div>
      </footer>

      {/* 移动端抽屉 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div className="absolute inset-0 bg-ink-900/25 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} aria-hidden />
          <div className="relative h-full w-[286px] animate-fade-in overflow-y-auto border-r border-ink-100 bg-paper-soft px-4 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-[15px] font-semibold text-ink-900">目录</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-1 text-ink-500 hover:bg-ink-900/5"
                aria-label="关闭目录"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
