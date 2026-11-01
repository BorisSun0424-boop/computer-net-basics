import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ChapterPage } from './pages/ChapterPage'
import { Glossary } from './pages/Glossary'
import { Home } from './pages/Home'
import { MapPage } from './pages/MapPage'
import { NotFound } from './pages/NotFound'
import { Quiz } from './pages/Quiz'
import { Roadmap } from './pages/Roadmap'
import { Scenarios } from './pages/Scenarios'
import { TopicPage } from './pages/TopicPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/ch/:chapterSlug" element={<ChapterPage />} />
          <Route path="/ch/:chapterSlug/:topicSlug" element={<TopicPage />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
