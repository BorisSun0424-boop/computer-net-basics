import type { Block } from '../types'
import { RichText } from './RichText'

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-doc">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      )

    case 'h':
      return (
        <h3>
          <RichText text={block.text} />
        </h3>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      )
    }

    case 'code':
      return (
        <figure className="my-6">
          <pre className="overflow-x-auto rounded-lg border border-ink-100 bg-paper-soft p-4 text-[13.5px] leading-relaxed text-ink-900">
            <code className="font-mono">{block.code}</code>
          </pre>
          {block.caption && (
            <figcaption className="mt-2 text-center text-[13px] text-ink-500">
              <RichText text={block.caption} />
            </figcaption>
          )}
        </figure>
      )

    case 'analogy':
      return (
        <div className="my-7 rounded-lg border border-ink-100 border-l-[3px] border-l-jade-500 bg-jade-50/60 px-5 py-4">
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-jade-600">
            <span aria-hidden>◍</span>
            {block.title ?? '打个比方'}
          </div>
          <p className="text-[16px] leading-[1.85] text-ink-900">
            <RichText text={block.text} />
          </p>
        </div>
      )

    case 'pitfall':
      return (
        <div className="my-7 rounded-lg border border-clay-500/20 bg-clay-50/70 px-5 py-4">
          <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-clay-600">
            <span aria-hidden>⚠</span>
            常见坑
          </div>
          <ul className="space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[15.5px] leading-[1.8] text-ink-700">
                <span className="mt-[9px] block h-1 w-1 shrink-0 rounded-full bg-clay-500" aria-hidden />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'table':
      return (
        <div className="my-7 overflow-x-auto rounded-lg border border-ink-100">
          <table className="w-full border-collapse text-[14.5px]">
            <thead>
              <tr className="bg-paper-soft">
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-ink-100 px-4 py-2.5 text-left font-semibold text-ink-900 whitespace-nowrap"
                  >
                    <RichText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="align-top even:bg-paper-soft/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-ink-100/70 px-4 py-2.5 leading-[1.7] text-ink-700">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'note': {
      const tone = {
        info: {
          wrap: 'border-accent-100 bg-accent-50/70',
          label: 'text-accent-600',
          icon: 'ℹ',
        },
        warn: {
          wrap: 'border-clay-500/25 bg-clay-50',
          label: 'text-clay-600',
          icon: '!',
        },
        key: {
          wrap: 'border-jade-500/25 bg-jade-50',
          label: 'text-jade-600',
          icon: '★',
        },
      }[block.tone]

      return (
        <div className={`my-7 rounded-lg border px-5 py-4 ${tone.wrap}`}>
          {block.title && (
            <div className={`mb-2 flex items-center gap-2 text-[13px] font-semibold ${tone.label}`}>
              <span
                aria-hidden
                className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none"
              >
                {tone.icon}
              </span>
              {block.title}
            </div>
          )}
          <p className="text-[15.5px] leading-[1.8] text-ink-700">
            <RichText text={block.text} />
          </p>
        </div>
      )
    }

    default:
      return null
  }
}
