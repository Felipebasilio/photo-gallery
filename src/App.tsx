import './App.css'
import { GalleryShowcase, Header } from './components'

function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-10 h-full'>
        {/* Header Container */}
        <div className='w-full'>
          <Header />
        </div>

        {/* Gallery Showcase Container */}
        <div className='w-full flex justify-center items-center grow shrink basis-full'>
          <GalleryShowcase />
        </div>
      </div>
    </>
  )
}

export default App
