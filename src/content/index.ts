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

/** "一次点击的完整旅程"：把八章的名词按时间顺序串成一条链 */
export interface JourneyStep {
  n: number
  title: string
  layer: string
  detail: string
  terms: { label: string; to: string }[]
}

export const journey: JourneyStep[] = [
  {
    n: 1,
    title: '手指按下鼠标',
    layer: 'L0',
    detail:
      '鼠标把物理位移变成电信号，通过 USB 或蓝牙送到主板。操作系统里专门有一个"中断处理"模块接住这个信号，把它翻译成"坐标 (820, 460) 被左键点击"。',
    terms: [
      { label: '操作系统', to: '/ch/hardware/what-is-os' },
      { label: '进程', to: '/ch/hardware/program-vs-process' },
    ],
  },
  {
    n: 2,
    title: '系统把这件事交给浏览器',
    layer: 'L0',
    detail:
      '操作系统发现点击位置属于浏览器窗口，于是把事件分发给浏览器的进程。浏览器这才知道"用户点了一个链接"。这一步占用的时间以毫秒计，你毫无知觉。',
    terms: [
      { label: '程序与进程', to: '/ch/hardware/program-vs-process' },
      { label: 'CPU', to: '/ch/hardware/what-is-cpu' },
    ],
  },
  {
    n: 3,
    title: '浏览器在内存里跑起来',
    layer: 'L0',
    detail:
      '浏览器本身是一个存在硬盘上的程序，此时它已经被加载进内存，CPU 正在一条条执行它的指令。你看到的页面，是内存里那份数据的呈现。',
    terms: [
      { label: '内存', to: '/ch/hardware/what-is-memory' },
      { label: '内存和硬盘的区别', to: '/ch/hardware/memory-vs-disk' },
    ],
  },
  {
    n: 4,
    title: '先看看本地有没有现成的',
    layer: 'L4',
    detail:
      '浏览器不会每次都重新下载。它先查缓存：这张图、这个样式表，是不是前几天下过、还没过期？如果命中强缓存，这一整趟网络旅程就直接跳过了。',
    terms: [
      { label: '缓存', to: '/ch/web/what-is-cache' },
      { label: '为什么清缓存能解决问题', to: '/ch/web/why-clear-cache-works' },
    ],
  },
  {
    n: 5,
    title: '把网址翻译成 IP',
    layer: 'L3',
    detail:
      '缓存没有，就得去网上取。但浏览器只知道 `example.com` 这个名字，它得先问 DNS："这个域名对应哪个 IP？"DNS 逐级查询，把答案带回来，顺便缓存在本地。',
    terms: [
      { label: 'URL', to: '/ch/web/what-is-url' },
      { label: 'DNS', to: '/ch/network/what-is-dns' },
      { label: '域名', to: '/ch/network/what-is-domain' },
    ],
  },
  {
    n: 6,
    title: '连上那台机器',
    layer: 'L3',
    detail:
      '有了 IP，还要连对端口（HTTPS 默认 443）。数据包从你的网卡出发，经过路由器、运营商、若干骨干节点，最终到达对方机房里的那台服务器。路上还要做一次加密协商，验证对方证书。',
    terms: [
      { label: 'IP 地址', to: '/ch/network/what-is-ip' },
      { label: '端口', to: '/ch/network/what-is-port' },
      { label: 'HTTP / HTTPS', to: '/ch/network/http-https' },
    ],
  },
  {
    n: 7,
    title: '说一句"我要这个页面"',
    layer: 'L4',
    detail:
      '浏览器按 HTTP 格式发一段请求：方法（GET）、路径（/index.html）、请求头（我能接受什么格式、我带着哪个 Cookie）。**这一句话，就是一次 URL 的完整展开。**',
    terms: [
      { label: 'URL 的组成', to: '/ch/web/url-parts' },
      { label: '一次请求的完整过程', to: '/ch/web/how-a-page-loads' },
    ],
  },
  {
    n: 8,
    title: '服务器接手',
    layer: 'L3',
    detail:
      '请求先被 Web 服务器（如 Nginx）接住，静态文件它自己就返回了；需要算的，转给后端程序；后端再查数据库。**你在页面上看到的一切个性化内容，都是在这一步现算出来的。**',
    terms: [
      { label: '服务器', to: '/ch/network/what-is-server' },
      { label: '前端与后端', to: '/ch/web/frontend-backend' },
      { label: 'API', to: '/ch/dev/what-is-api' },
    ],
  },
  {
    n: 9,
    title: '带着状态码回来',
    layer: 'L4',
    detail:
      '服务器回一句状态码（200 成功 / 404 找不到 / 500 出错），后面跟着正文。如果是登录请求，还会在响应头里塞一句 `Set-Cookie`，给你一张通行证。',
    terms: [
      { label: '状态码', to: '/ch/network/http-https' },
      { label: 'Cookie', to: '/ch/web/what-is-cookie' },
      { label: '登录状态', to: '/ch/security/login-state' },
    ],
  },
  {
    n: 10,
    title: '浏览器把内容画出来',
    layer: 'L4',
    detail:
      'HTML 变成骨架，CSS 上色排版，JS 让它能动。这一过程中还会为图片、字体、脚本各发一次请求——所以一个页面往往有几十个请求，不是一个。',
    terms: [
      { label: 'HTML / CSS / JS', to: '/ch/web/html-css-js' },
      { label: '静态与动态网站', to: '/ch/web/static-vs-dynamic' },
    ],
  },
  {
    n: 11,
    title: '顺便把东西存下来',
    layer: 'L4',
    detail:
      'Cookie 存进浏览器，下次请求自动带上；图片和样式进缓存，下次直接用。**"下次打开更快"和"记得我已登录"，都是这一步的产物。**',
    terms: [
      { label: '为什么网站会记住我', to: '/ch/web/why-remember-me' },
      { label: '缓存', to: '/ch/web/what-is-cache' },
    ],
  },
  {
    n: 12,
    title: '如果这个页面背后是 AI',
    layer: 'L7',
    detail:
      '你输入一句话，前端把它发给后端，后端再调模型 API。文本先被切成 token 计费，模型在 GPU 上做推理，通常一个字一个字流式吐回来。**这一路用的还是前面所有层：硬盘存模型、显存装参数、网络传数据、后端管密钥。**',
    terms: [
      { label: '什么是大模型', to: '/ch/ai/what-is-llm' },
      { label: 'Token', to: '/ch/ai/what-is-token' },
      { label: '训练与推理', to: '/ch/ai/training-vs-inference' },
      { label: 'GPU / 显存', to: '/ch/hardware/what-is-gpu' },
    ],
  },
]

export const allKeywords = Array.from(
  new Set(flatTopics.flatMap((f) => f.topic.keywords)),
).sort()
