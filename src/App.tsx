import './App.css'
import { GalleryShowcase, Header } from './components'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// QueryClient should be created outside the component to avoid recreation on re-renders
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 overflow-hidden">
          <GalleryShowcase />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
