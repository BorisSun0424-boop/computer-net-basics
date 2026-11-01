import { useCallback, useSyncExternalStore } from 'react'

const READ_KEY = 'net-basics:read:v1'
const QUIZ_KEY = 'net-basics:quiz-best:v1'

function safeParse(raw: string | null): string[] {
  if (!raw) return []
  try {
    const v = JSON.parse(raw)
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

/** 一个极小的外部 store：让侧边栏、目录树、首页读同一份进度，且跨组件即时同步。 */
function createListStore(storageKey: string) {
  let state: string[] = safeParse(typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null)
  const listeners = new Set<() => void>()

  function commit(next: string[]) {
    state = next
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      /* 隐私模式下写入会失败，进度仅本次会话有效 */
    }
    listeners.forEach((l) => l())
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === storageKey) {
        state = safeParse(e.newValue)
        listeners.forEach((l) => l())
      }
    })
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot() {
      return state
    },
    add(id: string) {
      if (!state.includes(id)) commit([...state, id])
    },
    remove(id: string) {
      if (state.includes(id)) commit(state.filter((x) => x !== id))
    },
    toggle(id: string) {
      if (state.includes(id)) commit(state.filter((x) => x !== id))
      else commit([...state, id])
    },
    clear() {
      commit([])
    },
  }
}

const readStore = createListStore(READ_KEY)
const quizStore = createListStore(QUIZ_KEY)

export function topicId(chapterSlug: string, topicSlug: string) {
  return `${chapterSlug}/${topicSlug}`
}

export function useProgress() {
  const list = useSyncExternalStore(readStore.subscribe, readStore.getSnapshot, readStore.getSnapshot)
  const done = new Set(list)

  const isRead = useCallback((id: string) => done.has(id), [done])
  const toggle = useCallback((id: string) => readStore.toggle(id), [])
  const markRead = useCallback((id: string) => readStore.add(id), [])
  const reset = useCallback(() => readStore.clear(), [])

  return { done, doneCount: done.size, isRead, toggle, markRead, reset }
}

/** 小测最好成绩（0-100） */
export function useQuizBest() {
  const list = useSyncExternalStore(quizStore.subscribe, quizStore.getSnapshot, quizStore.getSnapshot)
  const best = list.reduce((max, v) => {
    const n = Number(v)
    return Number.isFinite(n) && n > max ? n : max
  }, 0)

  const record = useCallback((score: number) => {
    quizStore.add(String(score))
  }, [])

  return { best, record }
}
