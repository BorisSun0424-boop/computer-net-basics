import { Link } from 'react-router-dom'
import { chapters, getChapter, roadmap, totalMinutes, totalTopics } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'

export function Roadmap() {
  const { isRead, doneCount } = useProgress()

  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-7">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Study Path</div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-tight tracking-tight text-ink-900">
          学习路线
        </h1>
        <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-500">
          按这个顺序读，每一章都在为下一章铺路。总共 {chapters.length} 章、{totalTopics} 个知识点、
          约 {Math.round(totalMinutes / 5) * 5} 分钟。不用一口气读完——一次读 3 篇，中间停一下，想一想能不能用自己的话讲出来。
        </p>
        <div className="mt-5 flex items-center gap-3 text-[13px] text-ink-500">
          <div className="h-1 w-40 overflow-hidden rounded-full bg-paper-sunk">
            <div
              className="h-full rounded-full bg-accent-500 transition-[width] duration-500"
              style={{ width: `${Math.round((doneCount / totalTopics) * 100)}%` }}
            />
          </div>
          <span className="tabular-nums">
            {doneCount} / {totalTopics}
          </span>
        </div>
      </header>

      <div className="mt-10 space-y-12">
        {roadmap.map((stage, si) => (
          <section key={stage.title} className="relative">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-mono text-[13px] font-medium text-paper">
                  {si + 1}
                </span>
                {si < roadmap.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-gradient-to-b from-ink-100 to-transparent" aria-hidden />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-2">
                <h2 className="font-serif text-[21px] font-semibold tracking-tight text-ink-900">
                  {stage.title.replace(/^第.阶段 · /, '')}
                </h2>
                <p className="mt-1.5 text-[14.5px] leading-[1.8] text-ink-700">{stage.goal}</p>
                <p className="mt-2 border-l-2 border-jade-500/40 pl-3 text-[13px] leading-[1.8] text-ink-500">
                  {stage.note}
                </p>

                <div className="mt-5 space-y-2.5">
                  {stage.chapterSlugs.map((slug) => {
                    const chapter = getChapter(slug)
                    if (!chapter) return null
                    const read = chapter.topics.filter((t) => isRead(topicId(chapter.slug, t.slug))).length

                    return (
                      <div key={slug} className="rounded-lg border border-ink-100 bg-paper">
                        <Link
                          to={`/ch/${chapter.slug}`}
                          className="flex items-center gap-3 border-b border-ink-100/70 px-4 py-3 transition-colors hover:bg-paper-soft"
                        >
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-[5px] text-[10.5px] font-semibold text-white"
                            style={{ backgroundColor: chapter.color }}
                          >
                            {chapter.index}
                          </span>
                          <span className="text-[14.5px] font-medium text-ink-900">{chapter.title}</span>
                          <span className="ml-auto text-[12px] tabular-nums text-ink-300">
                            {read}/{chapter.topics.length}
                          </span>
                        </Link>
                        <ul className="divide-y divide-ink-100/60">
                          {chapter.topics.map((topic, ti) => {
                            const done = isRead(topicId(chapter.slug, topic.slug))
                            return (
                              <li key={topic.slug}>
                                <Link
                                  to={`/ch/${chapter.slug}/${topic.slug}`}
                                  className="flex items-center gap-3 px-4 py-2 text-[13.5px] transition-colors hover:bg-paper-soft"
                                >
                                  <span className="w-4 shrink-0 font-mono text-[11px] text-ink-300">
                                    {String(ti + 1).padStart(2, '0')}
                                  </span>
                                  <span className={done ? 'text-ink-300 line-through' : 'text-ink-700'}>
                                    {topic.title}
                                  </span>
                                  <span className="ml-auto shrink-0 text-[11.5px] text-ink-300">{topic.minutes}′</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-ink-100 bg-paper p-5">
        <h3 className="font-serif text-[17px] font-semibold text-ink-900">读完怎么知道自己会了？</h3>
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.8] text-ink-700">
          <li className="flex gap-2">
            <span className="text-ink-300">1.</span>
            合上页面，用一句话向完全不懂的人解释这个概念，能讲清楚就算过。
          </li>
          <li className="flex gap-2">
            <span className="text-ink-300">2.</span>
            去「小测验」做一遍，错的那几道回到对应知识点重读。
          </li>
          <li className="flex gap-2">
            <span className="text-ink-300">3.</span>
            遇到一个真实问题（网页打不开、文件找不到）时，能自己按顺序排查，才算真的会。
          </li>
        </ul>
        <Link
          to="/quiz"
          className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent-600 hover:underline"
        >
          现在去做小测验 →
        </Link>
      </div>
    </div>
  )
}
