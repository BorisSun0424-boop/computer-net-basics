import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] max-w-prose flex-col justify-center pb-10">
      <div className="font-mono text-[12px] tracking-[0.2em] text-ink-300">404</div>
      <h1 className="mt-3 font-serif text-[30px] font-semibold tracking-tight text-ink-900">
        这个页面找不到
      </h1>
      <p className="mt-3 text-[15px] leading-[1.85] text-ink-500">
        顺便复习一下上一章：这就是典型的「路径不存在」——地址写错了，或者内容已经挪走了。
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-ink-900 px-4 py-2 text-[13.5px] font-medium text-paper hover:bg-ink-700"
        >
          回首页
        </Link>
        <Link
          to="/roadmap"
          className="rounded-lg border border-ink-100 bg-paper px-4 py-2 text-[13.5px] text-ink-700 hover:border-ink-300/60"
        >
          看学习路线
        </Link>
      </div>
    </div>
  )
}
