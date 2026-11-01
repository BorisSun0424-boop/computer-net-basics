import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { quizBank } from '../content/quiz'
import { useQuizBest } from '../hooks/useProgress'

const ROUND_SIZE = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function drawRound() {
  return shuffle(quizBank).slice(0, ROUND_SIZE)
}

export function Quiz() {
  const { best, record } = useQuizBest()
  const [seed, setSeed] = useState(0)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<(number | null)[]>(() => Array(ROUND_SIZE).fill(null))
  const [finished, setFinished] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => drawRound(), [seed])

  const restart = useCallback(() => {
    setSeed((s) => s + 1)
    setIdx(0)
    setPicked(Array(ROUND_SIZE).fill(null))
    setFinished(false)
  }, [])

  const current = questions[idx]
  const chosen = picked[idx]
  const answered = chosen !== null

  const correctCount = questions.reduce(
    (n, q, i) => (picked[i] === q.answer ? n + 1 : n),
    0,
  )

  const choose = (optionIndex: number) => {
    if (answered) return
    setPicked((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
      return next
    })
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true)
      record(Math.round((correctCount / questions.length) * 100))
    } else {
      setIdx((i) => i + 1)
    }
  }

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100)
    const verdict =
      score >= 90
        ? '很稳，这套概念你已经能讲给别人听了。'
        : score >= 70
          ? '基本掌握，把错的那几道对应的知识点重读一遍就够了。'
          : score >= 50
            ? '有印象但还不牢。建议回「学习路线」按顺序补一遍。'
            : '别急，这套内容本来就不是一遍能记住的。从第一章重读，会比硬背答案有用得多。'

    return (
      <div className="max-w-prose pb-10">
        <header className="border-b border-ink-100 pb-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Result</div>
          <h1 className="mt-2 font-serif text-[32px] font-semibold tracking-tight text-ink-900">本轮结果</h1>
        </header>

        <div className="mt-8 flex items-end gap-4">
          <div className="font-serif text-[64px] font-semibold leading-none tracking-tight text-ink-900 tabular-nums">
            {score}
          </div>
          <div className="pb-2 text-[14px] text-ink-500">
            <div>
              答对 {correctCount} / {questions.length} 题
            </div>
            <div className="mt-0.5 text-[12.5px] text-ink-300">历史最好成绩 {Math.max(best, score)} 分</div>
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-ink-100 bg-paper px-4 py-3 text-[14px] leading-[1.8] text-ink-700">
          {verdict}
        </p>

        <h2 className="mt-8 font-serif text-[19px] font-semibold text-ink-900">逐题回顾</h2>
        <ol className="mt-3 space-y-3">
          {questions.map((q, i) => {
            const ok = picked[i] === q.answer
            return (
              <li
                key={q.id}
                className={`rounded-lg border px-4 py-3 ${ok ? 'border-ink-100 bg-paper' : 'border-clay-500/25 bg-clay-50/60'}`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] text-white ${
                      ok ? 'bg-jade-500' : 'bg-clay-500'
                    }`}
                    aria-hidden
                  >
                    {ok ? '✓' : '✕'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium leading-snug text-ink-900">
                      <RichText text={q.q} />
                    </div>
                    {!ok && (
                      <div className="mt-1.5 text-[13px] text-ink-700">
                        正确答案：<RichText text={q.options[q.answer]} />
                      </div>
                    )}
                    <div className="mt-1.5 text-[13px] leading-[1.75] text-ink-500">
                      <RichText text={q.explain} />
                    </div>
                    <div className="mt-1 text-[11.5px] text-ink-300">{q.chapter}</div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-lg bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-ink-700"
          >
            再测一轮
          </button>
          <Link
            to="/roadmap"
            className="rounded-lg border border-ink-100 bg-paper px-5 py-2.5 text-[14px] text-ink-700 transition-colors hover:border-ink-300/60"
          >
            回到学习路线
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-prose pb-10">
      <header className="border-b border-ink-100 pb-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-300">Quiz</div>
            <h1 className="mt-2 font-serif text-[28px] font-semibold tracking-tight text-ink-900">小测验</h1>
          </div>
          <div className="text-[12.5px] tabular-nums text-ink-300">
            {idx + 1} / {questions.length}
            {best > 0 && <span className="ml-3">最好 {best} 分</span>}
          </div>
        </div>

        <div className="mt-4 flex gap-1">
          {questions.map((_, i) => {
            const p = picked[i]
            const state =
              p === null ? 'idle' : p === questions[i].answer ? 'ok' : 'bad'
            return (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  state === 'ok'
                    ? 'bg-jade-500'
                    : state === 'bad'
                      ? 'bg-clay-500'
                      : i === idx
                        ? 'bg-ink-300'
                        : 'bg-ink-100'
                }`}
              />
            )
          })}
        </div>
      </header>

      <div className="mt-8">
        <div className="text-[11.5px] uppercase tracking-[0.14em] text-ink-300">{current.chapter}</div>
        <h2 className="mt-2 font-serif text-[22px] font-semibold leading-snug tracking-tight text-ink-900">
          <RichText text={current.q} />
        </h2>

        <div className="mt-6 space-y-2.5">
          {current.options.map((opt, i) => {
            const isPicked = chosen === i
            const isAnswer = current.answer === i
            let cls = 'border-ink-100 bg-paper hover:border-ink-300/60'
            if (answered) {
              if (isAnswer) cls = 'border-jade-500/50 bg-jade-50'
              else if (isPicked) cls = 'border-clay-500/50 bg-clay-50'
              else cls = 'border-ink-100 bg-paper opacity-60'
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${cls}`}
              >
                <span
                  className={`mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${
                    answered && isAnswer
                      ? 'border-jade-500 bg-jade-500 text-white'
                      : answered && isPicked
                        ? 'border-clay-500 bg-clay-500 text-white'
                        : 'border-ink-300 text-ink-500'
                  }`}
                  aria-hidden
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-[14.5px] leading-[1.7] text-ink-900">
                  <RichText text={opt} />
                </span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-5 animate-fade-in rounded-lg border border-ink-100 bg-paper-soft px-4 py-3">
            <div className="text-[12px] font-semibold text-ink-900">
              {chosen === current.answer ? '对了' : '再想想'}
            </div>
            <p className="mt-1.5 text-[13.5px] leading-[1.8] text-ink-700">
              <RichText text={current.explain} />
            </p>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between">
          <Link to="/roadmap" className="text-[13px] text-ink-300 hover:text-ink-700">
            退出测验
          </Link>
          <button
            type="button"
            onClick={next}
            disabled={!answered}
            className={`rounded-lg px-5 py-2.5 text-[14px] font-medium transition-colors ${
              answered
                ? 'bg-ink-900 text-paper hover:bg-ink-700'
                : 'cursor-not-allowed bg-ink-100 text-ink-300'
            }`}
          >
            {idx + 1 >= questions.length ? '看结果' : '下一题'}
          </button>
        </div>
      </div>
    </div>
  )
}
