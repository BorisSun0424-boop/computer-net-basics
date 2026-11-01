import { Fragment, type ReactNode } from 'react'

/**
 * 极简行内语法：**加粗** 与 `代码`。
 * 内容里只用到这两种，不值得引入完整 markdown 解析器。
 */
export function RichText({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter((t) => t !== '')

  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
          return <strong key={i}>{token.slice(2, -2)}</strong>
        }
        if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
          return (
            <code key={i} className="rounded bg-paper-sunk px-1.5 py-0.5 font-mono text-[0.86em] text-ink-900">
              {token.slice(1, -1)}
            </code>
          )
        }
        return <Fragment key={i}>{withBreaks(token)}</Fragment>
      })}
    </>
  )
}

function withBreaks(text: string): ReactNode {
  if (!text.includes('\n')) return text
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}
