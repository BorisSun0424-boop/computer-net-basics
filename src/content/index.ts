import type { Chapter, Topic } from '../types'
import { chHardware } from './ch-hardware'
import { chPath } from './ch-path'
import { chCloud } from './ch-cloud'
import { chNetwork } from './ch-network'
import { chWeb } from './ch-web'
import { chSecurity } from './ch-security'
import { chDev } from './ch-dev'
import { chAi } from './ch-ai'

/** 顺序即学习顺序：从最底层的硬件，一路到最上层的模型。 */
export const chapters: Chapter[] = [
  chHardware,
  chPath,
  chCloud,
  chNetwork,
  chWeb,
  chSecurity,
  chDev,
  chAi,
]

export const totalTopics = chapters.reduce((n, c) => n + c.topics.length, 0)

export const totalMinutes = chapters.reduce(
  (n, c) => n + c.topics.reduce((m, t) => m + t.minutes, 0),
  0,
)

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug)
}

export function getTopic(chapterSlug: string, topicSlug: string): Topic | undefined {
  return getChapter(chapterSlug)?.topics.find((t) => t.slug === topicSlug)
}

export interface FlatTopic {
  chapter: Chapter
  topic: Topic
  /** 全局顺序，用于上一页/下一页 */
  order: number
}

export const flatTopics: FlatTopic[] = (() => {
  const out: FlatTopic[] = []
  let order = 0
  for (const chapter of chapters) {
    for (const topic of chapter.topics) {
      out.push({ chapter, topic, order: order++ })
    }
  }
  return out
})()

export function topicPath(chapterSlug: string, topicSlug: string): string {
  return `/ch/${chapterSlug}/${topicSlug}`
}

export function findNeighbors(chapterSlug: string, topicSlug: string) {
  const i = flatTopics.findIndex(
    (f) => f.chapter.slug === chapterSlug && f.topic.slug === topicSlug,
  )
  if (i < 0) return { prev: undefined, next: undefined }
  return { prev: flatTopics[i - 1], next: flatTopics[i + 1] }
}

/** 学习路线：五段，与知识地图的七层对应 */
export interface Stage {
  title: string
  goal: string
  chapterSlugs: string[]
  note: string
}

export const roadmap: Stage[] = [
  {
    title: '第一阶段 · 底座：一台电脑怎么工作',
    goal: '搞清 CPU、内存、硬盘各管什么，以及文件为什么会有"路径"。',
    chapterSlugs: ['hardware', 'path'],
    note: '这是整门课的地基。后面讲缓存、讲卡顿、讲云端、讲显存，全都要回到这三块硬件。',
  },
  {
    title: '第二阶段 · 归属：数据放在谁家的硬盘上',
    goal: '分清本地与云端，认清"同步"和"备份"是两件事。',
    chapterSlugs: ['cloud'],
    note: '这一章最实用，也最容易交学费：只开同步、不做备份，是绝大多数人丢数据的真正原因。',
  },
  {
    title: '第三阶段 · 连接：数据怎么从 A 跑到 B',
    goal: '建立"客户端发请求、服务器回响应"的模型，认识 IP、域名、DNS、端口。',
    chapterSlugs: ['network'],
    note: '信息密度最高的一章。一次只读 3 篇，读完用自己的话复述"打开网页发生了什么"。',
  },
  {
    title: '第四阶段 · 使用：你每天在用的东西',
    goal: 'URL、HTML/CSS/JS、前后端、Cookie、缓存、登录状态、安全。',
    chapterSlugs: ['web', 'security'],
    note: '读完这一段，你应该能自己判断一个链接可不可点、"清缓存就好了"是怎么回事。',
  },
  {
    title: '第五阶段 · 造物：从看懂到能做出来',
    goal: '命令行、环境变量、API、JSON、Git、部署，以及最上层的 AI 与大模型。',
    chapterSlugs: ['dev', 'ai'],
    note: '不需要会写代码，但需要知道每个词在指什么。AI 那一章会反复引用前面的硬件和网络概念。',
  },
]

/** 知识地图：名词按"在哪一层"归位，避免散成一堆孤立术语 */
export interface MapLayer {
  id: string
  name: string
  tagline: string
  terms: string[]
  chapterSlug: string
  color: string
}

export const mapLayers: MapLayer[] = [
  {
    id: 'L0',
    name: '硬件层',
    tagline: '电和硅：东西在哪被算、在哪被存',
    terms: ['CPU', '内存 RAM', '硬盘 / SSD', 'GPU / 显存', '操作系统', '进程'],
    chapterSlug: 'hardware',
    color: '#5b6b8c',
  },
  {
    id: 'L1',
    name: '数据组织',
    tagline: '把一大块空间切成能指得准的文件',
    terms: ['路径', '绝对 / 相对路径', '根目录', '扩展名', '文件系统'],
    chapterSlug: 'path',
    color: '#2f6bdc',
  },
  {
    id: 'L2',
    name: '存储归属',
    tagline: '同一份数据，放在谁的盘上',
    terms: ['本地', '云端', '同步', '备份', '网盘', '缓存'],
    chapterSlug: 'cloud',
    color: '#0e8f74',
  },
  {
    id: 'L3',
    name: '连接层',
    tagline: '两台机器怎么找到对方、怎么说话',
    terms: ['服务器', '客户端', 'IP', '域名', 'DNS', 'HTTP / HTTPS', '端口', 'NAT'],
    chapterSlug: 'network',
    color: '#c2643b',
  },
  {
    id: 'L4',
    name: '网页层',
    tagline: '浏览器拿到什么、怎么画出来',
    terms: ['URL', 'HTML / CSS / JS', '前端', '后端', 'Cookie', '缓存'],
    chapterSlug: 'web',
    color: '#7c5cd6',
  },
  {
    id: 'L5',
    name: '身份层',
    tagline: '网站怎么确认"你是你"',
    terms: ['登录状态', 'Session', 'Token', '二次验证', '密码管理器', '钓鱼'],
    chapterSlug: 'security',
    color: '#b3452f',
  },
  {
    id: 'L6',
    name: '工程层',
    tagline: '人怎么把这些东西做出来、发出去',
    terms: ['终端', '环境变量 / PATH', 'API', 'JSON', 'Git', 'GitHub', '开源', '部署'],
    chapterSlug: 'dev',
    color: '#3f4f8f',
  },
  {
    id: 'L7',
    name: '模型层',
    tagline: '在最上面跑的那层"会说话的程序"',
    terms: ['LLM', '参数量', 'Token', 'Prompt', '上下文窗口', '训练 / 推理', '幻觉', 'RAG', 'Agent'],
    chapterSlug: 'ai',
    color: '#8a5a9e',
  },
]

export const allKeywords = Array.from(
  new Set(flatTopics.flatMap((f) => f.topic.keywords)),
).sort()
