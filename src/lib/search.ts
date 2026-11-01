import { flatTopics, topicPath } from '../content'
import { glossary } from '../content/glossary'
import { scenarios } from '../content/scenarios'

export interface SearchHit {
  kind: '知识点' | '术语' | '场景'
  title: string
  hint: string
  to: string
}

interface Indexed extends SearchHit {
  haystack: string
}

const index: Indexed[] = [
  ...flatTopics.map(({ chapter, topic }) => ({
    kind: '知识点' as const,
    title: topic.title,
    hint: topic.summary,
    to: topicPath(chapter.slug, topic.slug),
    haystack: `${chapter.title} ${topic.title} ${topic.summary} ${topic.keywords.join(' ')}`.toLowerCase(),
  })),
  ...glossary.map((g) => ({
    kind: '术语' as const,
    title: g.en ? `${g.term} · ${g.en}` : g.term,
    hint: g.brief,
    to: g.ref ?? '/glossary',
    haystack: `${g.term} ${g.en ?? ''} ${g.brief}`.toLowerCase(),
  })),
  ...scenarios.map((s) => ({
    kind: '场景' as const,
    title: s.q,
    hint: s.a[0] ?? '',
    to: '/scenarios',
    haystack: `${s.q} ${s.a.join(' ')}`.toLowerCase(),
  })),
]

export function search(raw: string, limit = 12): SearchHit[] {
  const q = raw.trim().toLowerCase()
  if (!q) return []

  const terms = q.split(/\s+/).filter(Boolean)
  const scored = index
    .map((item) => {
      let score = 0
      for (const t of terms) {
        if (!item.haystack.includes(t)) return { item, score: -1 }
        if (item.title.toLowerCase().includes(t)) score += 10
        if (item.hint.toLowerCase().includes(t)) score += 3
        score += 1
      }
      return { item, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored.map(({ item }) => ({
    kind: item.kind,
    title: item.title,
    hint: item.hint,
    to: item.to,
  }))
}
