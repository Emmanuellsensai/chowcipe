import { useState } from 'react'
import Landing from './pages/Landing'
import AppPage from './pages/AppPage'

type Page = 'landing' | 'app'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  if (page === 'app') {
    return <AppPage onExit={() => setPage('landing')} />
  }

  return <Landing onStart={() => setPage('app')} />
}
