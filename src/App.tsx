import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { ShowcaseGallery, Header } from './components'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='flex flex-col h-screen gap-20'>
          <Header />

          <main>
            <ShowcaseGallery />
          </main>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
