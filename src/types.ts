/** 内容模型：全部知识点以数据形式描述，渲染层只负责把 block 变成排版。 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; code: string; caption?: string }
  | { type: 'analogy'; title?: string; text: string }
  | { type: 'pitfall'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; tone: 'info' | 'warn' | 'key'; title?: string; text: string }

export interface Topic {
  slug: string
  title: string
  /** 一句话定义，同时也用于搜索摘要 */
  summary: string
  /** 预计阅读分钟数 */
  minutes: number
  /** 关键词，供搜索与关联推荐 */
  keywords: string[]
  blocks: Block[]
}

export interface Chapter {
  slug: string
  index: number
  title: string
  subtitle: string
  /** 章节主色（用于编号徽章与进度条），hex */
  color: string
  /** 在整个知识地图里的层级，如 "L0 · 硬件" */
  layer: string
  /** 这一章为什么排在这里：一句话说明它在整条链上的位置 */
  why: string
  /** 前置章节 slug，用于"读完这些再读这章" */
  dependsOn: string[]
  topics: Topic[]
}

export interface GlossaryEntry {
  term: string
  en?: string
  brief: string
  /** 关联到知识点的 slug，形如 network/dns */
  ref?: string
}

export interface Scenario {
  q: string
  a: string[]
  refs?: { label: string; to: string }[]
}

export interface QuizQuestion {
  id: string
  chapter: string
  q: string
  options: string[]
  answer: number
  explain: string
}
