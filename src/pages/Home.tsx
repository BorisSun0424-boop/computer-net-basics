import { Link } from 'react-router-dom'
import { chapters, flatTopics, roadmap, totalMinutes, totalTopics, topicPath } from '../content'
import { topicId, useProgress } from '../hooks/useProgress'

export function Home() {
  const { doneCount, isRead } = useProgress()

  const next = flatTopics.find((f) => !isRead(topicId(f.chapter.slug, f.topic.slug))) ?? flatTopics[0]
  const started = doneCount > 0

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden px-4 pb-14 pt-10 sm:-mx-6 sm:px-6 sm:pt-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
          style={{
            background:
              'radial-gradient(760px 340px at 18% 0%, #e9f0ff 0%, transparent 62%), radial-gradient(620px 300px at 92% 12%, #eaf6f1 0%, transparent 60%)',
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-100 bg-paper/80 px-3 py-1 text-[12px] tracking-[0.04em] text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-jade-500" aria-hidden />
            写给非技术人 · 不需要任何基础
          </div>

          <h1 className="font-serif text-[38px] font-semibold leading-[1.22] tracking-tight text-ink-900 sm:text-[52px]">
            电脑与网络
            <br className="sm:hidden" />
            <span className="text-ink-900">常识课</span>
          </h1>

          <p className="mt-5 max-w-xl text-[16.5px] leading-[1.85] text-ink-500">
            从 CPU 怎么算、文件存在哪，到 DNS 怎么翻译、Cookie 怎么记住你，再到最后的大模型和 Agent——
            {totalTopics} 个你每天都会碰到、却从没人讲清楚的问题，按<strong className="text-ink-900">一条因果链</strong>排好了顺序。
            每个知识点都配一个生活化的比方、一个具体例子，和几条别人踩过的坑。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={started ? topicPath(next.chapter.slug, next.topic.slug) : topicPath(flatTopics[0].chapter.slug, flatTopics[0].topic.slug)}
              className="group inline-flex items-center gap-2 rounded-lg bg-ink-900 px-5 py-2.5 text-[14.5px] font-medium text-paper transition-colors hover:bg-ink-700"
            >
              {started ? '继续上次的进度' : '从第一章开始'}
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-100 bg-paper px-5 py-2.5 text-[14.5px] text-ink-700 transition-colors hover:border-ink-300/60"
            >
              先看学习路线
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink-100 pt-6">
            <Stat label="章节" value={String(chapters.length)} />
            <Stat label="知识点" value={String(totalTopics)} />
            <Stat label="总阅读时长" value={`约 ${Math.round(totalMinutes / 5) * 5} 分钟`} />
            <Stat label="你的进度" value={`${doneCount} / ${totalTopics}`} accent />
          </dl>
        </div>
      </section>

      {/* 两条入口：先看全貌，再决定读哪 */}
      <section className="mt-2 grid gap-3 sm:grid-cols-2">
        <Link
          to="/map"
          className="group flex flex-col rounded-xl border border-ink-100 bg-paper p-5 transition-all hover:border-ink-300/50 hover:shadow-card"
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-300">
            <span className="font-mono">L0 — L7</span>
          </div>
          <h3 className="mt-2 font-serif text-[19px] font-semibold text-ink-900 transition-colors group-hover:text-accent-700">
            知识地图：每个名词都在某一层
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
            CPU、硬盘、DNS、Cookie、Token……先搞清它们各属于哪一层，就不会记成一堆散词。
          </p>
        </Link>

        <Link
          to="/journey"
          className="group flex flex-col rounded-xl border border-ink-100 bg-paper p-5 transition-all hover:border-ink-300/50 hover:shadow-card"
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-300">
            <span className="font-mono">12 STEPS</span>
          </div>
          <h3 className="mt-2 font-serif text-[19px] font-semibold text-ink-900 transition-colors group-hover:text-accent-700">
            一次点击的完整旅程
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
            你按下鼠标之后 12 步里发生的事——把所有名词按时间顺序串成一条链。
          </p>
        </Link>
      </section>

      {/* 章节地图 */}
      <section className="mt-14">
        <SectionTitle
          kicker="知识地图"
          title="八章，从「一个晶体管」讲到「一个大模型」"
          desc="顺序就是理解顺序：下层是上层的地基。跳过前面直接读网络，会在 DNS 和端口上卡住；跳过网络直接读 AI，会不知道它到底在跑什么。"
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {chapters.map((chapter) => {
            const read = chapter.topics.filter((t) => isRead(topicId(chapter.slug, t.slug))).length
            const pct = Math.round((read / chapter.topics.length) * 100)

            return (
              <Link
                key={chapter.slug}
                to={`/ch/${chapter.slug}`}
                className="group relative flex flex-col rounded-xl border border-ink-100 bg-paper p-5 transition-all hover:border-ink-300/50 hover:shadow-card"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-[7px] text-[12px] font-semibold text-white"
                    style={{ backgroundColor: chapter.color }}
                  >
                    {chapter.index}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink-300">
                    {chapter.topics.length} 个知识点
                  </span>
                  <span className="ml-auto text-[11.5px] tabular-nums text-ink-300">
                    {read > 0 ? `${read}/${chapter.topics.length}` : ''}
                  </span>
                </div>

                <h3 className="font-serif text-[21px] font-semibold tracking-tight text-ink-900 transition-colors group-hover:text-accent-700">
                  {chapter.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{chapter.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {chapter.topics.slice(0, 3).map((t) => (
                    <span key={t.slug} className="rounded bg-paper-sunk px-1.5 py-0.5 text-[11.5px] text-ink-500">
                      {t.title}
                    </span>
                  ))}
                  {chapter.topics.length > 3 && (
                    <span className="px-1 py-0.5 text-[11.5px] text-ink-300">等 {chapter.topics.length} 篇</span>
                  )}
                </div>

                <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-paper-sunk">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${pct}%`, backgroundColor: chapter.color }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 设计原则 */}
      <section className="mt-16 border-t border-ink-100 pt-10">
        <SectionTitle kicker="这门课怎么写的" title="三条原则" />
        <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          <Principle
            n="01"
            title="先给比方，再给定义"
            body="“DNS 是互联网的通讯录”比“域名到 IP 的分布式解析系统”有用得多。定义可以后补，直觉不能没有。"
          />
          <Principle
            n="02"
            title="只讲你会用到的"
            body="不讲 TCP 三次握手的报文格式，只讲为什么连不上。够用就好，剩下的等你真需要时再学。"
          />
          <Principle
            n="03"
            title="把坑写在明面上"
            body="每篇末尾都有“常见坑”。多数人的问题不是不懂原理，而是踩了同一个坑却以为是玄学。"
          />
        </div>
      </section>

      {/* 路线预览 */}
      <section className="mt-16 rounded-xl border border-ink-100 bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">建议顺序</div>
            <h2 className="mt-2 font-serif text-[24px] font-semibold tracking-tight text-ink-900">
              {roadmap.length} 个阶段，大约 {Math.round(totalMinutes / 5) * 5} 分钟
            </h2>
          </div>
          <Link to="/roadmap" className="text-[13.5px] text-accent-600 hover:underline">
            查看完整路线 →
          </Link>
        </div>

        <ol className="mt-6 space-y-0">
          {roadmap.map((stage, i) => (
            <li key={stage.title} className="relative flex gap-4 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-paper-soft text-[11px] font-medium text-ink-500">
                  {i + 1}
                </span>
                {i < roadmap.length - 1 && <span className="mt-1 w-px flex-1 bg-ink-100" aria-hidden />}
              </div>
              <div className="pb-1">
                <h3 className="text-[14.5px] font-medium text-ink-900">{stage.title.replace(/^第.阶段 · /, '')}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-500">{stage.goal}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-[11.5px] tracking-[0.1em] text-ink-300">{label}</dt>
      <dd
        className={`mt-1 text-[17px] font-medium tabular-nums ${accent ? 'text-accent-600' : 'text-ink-900'}`}
      >
        {value}
      </dd>
    </div>
  )
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">{kicker}</div>
      <h2 className="mt-2 font-serif text-[26px] font-semibold leading-snug tracking-tight text-ink-900 sm:text-[30px]">
        {title}
      </h2>
      {desc && <p className="mt-2.5 text-[14px] leading-[1.8] text-ink-500">{desc}</p>}
    </div>
  )
}

function Principle({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-[12px] text-ink-300">{n}</div>
      <h3 className="mt-1.5 font-serif text-[17px] font-semibold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-[1.8] text-ink-500">{body}</p>
    </div>
  )
}
