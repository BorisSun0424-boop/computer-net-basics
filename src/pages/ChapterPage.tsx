import { Link, useParams } from 'react-router-dom'
import { chapters, getChapter } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'
import { NotFound } from './NotFound'

export function ChapterPage() {
  const { chapterSlug = '' } = useParams()
  const chapter = getChapter(chapterSlug)
  const { isRead } = useProgress()

  if (!chapter) return <NotFound />

  const read = chapter.topics.filter((t) => isRead(topicId(chapter.slug, t.slug))).length
  const pct = Math.round((read / chapter.topics.length) * 100)
  const nextIndex = chapters.findIndex((c) => c.slug === chapter.slug)

  return (
    <div className="max-w-prose pb-10">
      <nav className="flex items-center gap-1.5 text-[12.5px] text-ink-300">
        <Link to="/" className="hover:text-ink-700">
          首页
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">第 {chapter.index} 章</span>
      </nav>

      <header className="mt-4 border-b border-ink-100 pb-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[14px] font-semibold text-white"
            style={{ backgroundColor: chapter.color }}
          >
            {chapter.index}
          </span>
          <span className="rounded bg-paper-sunk px-2 py-[3px] font-mono text-[11px] text-ink-500">
            {chapter.layer}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">
            {chapter.topics.length} 个知识点 · {chapter.topics.reduce((n, t) => n + t.minutes, 0)} 分钟
          </span>
        </div>

        <h1 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-tight text-ink-900">
          {chapter.title}
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-[1.85] text-ink-500">{chapter.subtitle}</p>

        <div className="mt-5 rounded-lg border border-ink-100 bg-paper px-4 py-3">
          <div className="text-[11.5px] font-medium tracking-[0.1em] text-ink-300">这一章在链条上的位置</div>
          <p className="mt-1.5 text-[14px] leading-[1.8] text-ink-700">{chapter.why}</p>
          {chapter.dependsOn.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[12px]">
              <span className="text-ink-300">前置：</span>
              {chapter.dependsOn.map((slug) => {
                const dep = chapters.find((c) => c.slug === slug)
                if (!dep) return null
                return (
                  <Link
                    key={slug}
                    to={`/ch/${dep.slug}`}
                    className="rounded border border-ink-100 px-1.5 py-0.5 text-ink-700 hover:border-accent-100 hover:text-accent-700"
                  >
                    第 {dep.index} 章 · {dep.title}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-1 w-36 overflow-hidden rounded-full bg-paper-sunk">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${pct}%`, backgroundColor: chapter.color }}
            />
          </div>
          <span className="text-[12.5px] tabular-nums text-ink-500">
            {read}/{chapter.topics.length} 已读
          </span>
        </div>
      </header>

      <ol className="mt-2 divide-y divide-ink-100/70">
        {chapter.topics.map((topic, i) => {
          const done = isRead(topicId(chapter.slug, topic.slug))
          return (
            <li key={topic.slug}>
              <Link
                to={`/ch/${chapter.slug}/${topic.slug}`}
                className="group flex items-start gap-4 py-5 transition-colors"
              >
                <span className="mt-1 w-6 shrink-0 font-mono text-[12px] tabular-nums text-ink-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-serif text-[18.5px] font-semibold text-ink-900 transition-colors group-hover:text-accent-700">
                      {topic.title}
                    </span>
                    {done && (
                      <span className="rounded bg-jade-50 px-1.5 py-px text-[10.5px] text-jade-600">已读</span>
                    )}
                  </span>
                  <span className="mt-1.5 block text-[14px] leading-[1.8] text-ink-500">{topic.summary}</span>
                </span>
                <span className="mt-1.5 shrink-0 text-[11.5px] text-ink-300">{topic.minutes}′</span>
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="mt-10 flex items-center justify-between border-t border-ink-100 pt-6 text-[13.5px]">
        {nextIndex > 0 ? (
          <Link to={`/ch/${chapters[nextIndex - 1].slug}`} className="text-ink-500 hover:text-ink-900">
            ← {chapters[nextIndex - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {nextIndex < chapters.length - 1 ? (
          <Link to={`/ch/${chapters[nextIndex + 1].slug}`} className="group text-right">
            <span className="block text-[11.5px] text-ink-300">下一章</span>
            <span className="text-ink-900 group-hover:text-accent-700">{chapters[nextIndex + 1].title} →</span>
          </Link>
        ) : (
          <Link to="/quiz" className="text-ink-900 hover:text-accent-700">
            去做小测验 →
          </Link>
        )}
      </div>
    </div>
  )
}
