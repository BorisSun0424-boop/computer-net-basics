import { Link } from 'react-router-dom'
import { journey } from '../content'

export function Journey() {
  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-7">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">One Click</div>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-tight tracking-tight text-ink-900">
          一次点击的完整旅程
        </h1>
        <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-500">
          前面八章是分开放的。这一页把它们按时间顺序串起来：
          <strong className="text-ink-900">你按下鼠标之后，12 步之内，所有名词依次登场</strong>。
          读完这一页，你会知道它们不是并列的知识点，而是一条链上的环节。
        </p>
      </header>

      <ol className="mt-9">
        {journey.map((step, i) => (
          <li key={step.n} className="relative flex gap-4">
            <div className="flex w-8 shrink-0 flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 bg-paper font-mono text-[12px] font-medium tabular-nums text-ink-700">
                {String(step.n).padStart(2, '0')}
              </span>
              {i < journey.length - 1 && <span className="mt-1 w-px flex-1 bg-ink-100" aria-hidden />}
            </div>

            <div className={`min-w-0 flex-1 ${i < journey.length - 1 ? 'pb-8' : ''}`}>
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-serif text-[18px] font-semibold tracking-tight text-ink-900">
                  {step.title}
                </h2>
                <span className="rounded bg-paper-sunk px-1.5 py-px font-mono text-[10.5px] text-ink-500">
                  {step.layer}
                </span>
              </div>

              <p className="mt-2 text-[14.5px] leading-[1.85] text-ink-700">{step.detail}</p>

              {step.terms.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {step.terms.map((t) => (
                    <Link
                      key={t.to + t.label}
                      to={t.to}
                      className="rounded-md border border-ink-100 bg-paper px-2 py-1 text-[12px] text-ink-700 transition-colors hover:border-accent-100 hover:bg-accent-50 hover:text-accent-700"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-lg border border-ink-100 bg-paper p-5">
        <h3 className="font-serif text-[17px] font-semibold text-ink-900">这一页真正想让你记住的</h3>
        <p className="mt-2.5 text-[14px] leading-[1.85] text-ink-700">
          任何一次"上网"，都是这 12 步的一次完整重演。所以当它坏了，
          <strong className="text-ink-900">不要从头猜，要按顺序缩小范围</strong>：
          是根本连不上（第 5、6 步），还是连上了但内容不对（第 8、9 步），还是内容到了但画不出来（第 10 步）。
          这三刀切完，问题基本就定位了。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/scenarios"
            className="rounded-lg border border-ink-100 bg-paper-soft px-3 py-1.5 text-[12.5px] text-ink-700 hover:border-ink-300/60"
          >
            按症状排查：常见场景问答 →
          </Link>
          <Link
            to="/map"
            className="rounded-lg border border-ink-100 bg-paper-soft px-3 py-1.5 text-[12.5px] text-ink-700 hover:border-ink-300/60"
          >
            按层级看：知识地图 →
          </Link>
        </div>
      </div>
    </div>
  )
}
