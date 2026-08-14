import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import PageShell from './components/PageShell.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const Vibes = lazy(() => import('./pages/Vibes.jsx'))
const AiUsage = lazy(() => import('./pages/AiUsage.jsx'))
const Wall = lazy(() => import('./pages/Wall.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <PageShell>
      <ScrollToTop />
      <Nav />
      <main>
        <Suspense
          fallback={
            <div className="mx-auto max-w-[1400px] px-5 pt-40 text-center font-mono text-xs tracking-[0.2em] text-zinc-400">
              loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/vibes" element={<Vibes />} />
            <Route path="/ai" element={<AiUsage />} />
            <Route path="/wall" element={<Wall />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </PageShell>
  )
}
