import { Link } from 'react-router-dom'
import { chapters, mapLayers, totalTopics } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'

export function MapPage() {
  const { isRead } = useProgress()

  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-7">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Knowledge Map</div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-tight tracking-tight text-ink-900">
          知识地图
        </h1>
        <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-500">
          所有名词都在某一层上。<strong className="text-ink-900">越往下越靠近硬件，越往上越靠近你的使用</strong>
          ——上层依赖下层，所以下层出问题时，上层的表现往往莫名其妙（比如 DNS 挂了，你会以为"网站坏了"）。
        </p>
      </header>

      <div className="mt-8">
        {mapLayers.map((layer, i) => {
          const chapter = chapters.find((c) => c.slug === layer.chapterSlug)
          const read = chapter
            ? chapter.topics.filter((t) => isRead(topicId(chapter.slug, t.slug))).length
            : 0
          const isLast = i === mapLayers.length - 1

          return (
            <div key={layer.id} className="relative flex gap-4">
              <div className="flex w-9 shrink-0 flex-col items-center">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[11.5px] font-semibold text-white"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.id}
                </span>
                {!isLast && <span className="mt-1 w-px flex-1 bg-ink-100" aria-hidden />}
              </div>

              <div className={`min-w-0 flex-1 ${isLast ? 'pb-0' : 'pb-7'}`}>
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <h2 className="font-serif text-[19px] font-semibold tracking-tight text-ink-900">
                    {layer.name}
                  </h2>
                  <span className="text-[12.5px] text-ink-300">{layer.tagline}</span>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {layer.terms.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-ink-100 bg-paper px-2 py-[3px] text-[12.5px] text-ink-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {chapter && (
                  <Link
                    to={`/ch/${chapter.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-accent-600 hover:underline"
                  >
                    第 {chapter.index} 章 · {chapter.title}
                    <span className="text-ink-300">
                      （{read}/{chapter.topics.length}）
                    </span>
                    →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 rounded-lg border border-ink-100 bg-paper p-5">
        <h3 className="font-serif text-[17px] font-semibold text-ink-900">这张图怎么用</h3>
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.8] text-ink-700">
          <li className="flex gap-2">
            <span className="text-ink-300">1.</span>
            <span>
              听到一个陌生词，先在图里找到它在哪一层——
              <strong className="text-ink-900">知道它属于哪一层，就大概知道它管什么</strong>。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-ink-300">2.</span>
            <span>
              遇到故障时，从<strong className="text-ink-900">下往上</strong>排查。下层不通，上层的报错全是噪声。
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed text-ink-300">
        共 {mapLayers.length} 层、{chapters.length} 章、{totalTopics} 个知识点。层与层之间不是严格的技术分层，
        而是按"理解顺序"排的——目的是让你知道一个词为什么出现在这里。
      </p>
    </div>
  )
}
