# React Photo Gallery - Implementation Guide
## Total Time: 40 minutes

---

## 📋 REQUIREMENTS CHECKLIST
- [ ] Populate data from API
- [ ] Show selected image in preview
- [ ] Highlight active thumbnail
- [ ] Enable arrow key navigation

---

## ⏱️ PHASE 1: Project Setup (5 min)

### 1.1 Create Project
```bash
npm create vite@latest gallery -- --template react-ts
cd gallery
npm install
npm install @tanstack/react-query
npm install -D tailwindcss @tailwindcss/vite
```

### 1.2 Configure Tailwind (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 1.3 Add Tailwind to CSS (`src/index.css`)
```css
@import "tailwindcss";
```

### 1.4 Clean `App.tsx` (remove boilerplate)

---

## ⏱️ PHASE 2: Types & API Hook (5 min)

### 2.1 Create Types (`src/types/image.ts`)
```typescript
export interface Image {
  id: string
  author: string
  download_url: string
}
```

### 2.2 Create API Hook (`src/hooks/use-images.ts`)
```typescript
import { useQuery } from '@tanstack/react-query'
import type { Image } from '../types/image'

const API_URL = 'https://picsum.photos/v2/list'

async function fetchImages(): Promise<Image[]> {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}

export function useImages() {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  })
}
```

---

## ⏱️ PHASE 3: App Setup with React Query (3 min)

### 3.1 Configure `App.tsx`
```typescript
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { GalleryShowcase } from './components/GalleryShowcase'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <header className="py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center">
            Photo Gallery
          </h1>
        </header>
        <main className="flex-1 overflow-hidden">
          <GalleryShowcase />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
```

---

## ⏱️ PHASE 4: Gallery Container (10 min)

### 4.1 Create `src/components/GalleryShowcase.tsx`

**This is the MAIN component - handles all state!**

```typescript
import { useState, useCallback, useEffect } from 'react'
import { useImages } from '../hooks/use-images'
import { GalleryImageList } from './GalleryImageList'
import { ImagePreview } from './ImagePreview'
import type { Image } from '../types/image'

export function GalleryShowcase() {
  const { data: images = [], isLoading } = useImages()
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  // Auto-select first image when loaded
  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      setSelectedImage(images[0])
    }
  }, [images, selectedImage])

  // Handle image selection
  const handleSelectImage = useCallback((image: Image) => {
    setSelectedImage(image)
  }, [])

  // Handle navigation (prev/next)
  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage || images.length === 0) return
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    let newIndex: number
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedImage(images[newIndex])
  }, [selectedImage, images])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleNavigate('prev')
      else if (e.key === 'ArrowRight') handleNavigate('next')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNavigate])

  if (isLoading) return <p className="p-4">Loading...</p>

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left: Thumbnails */}
      <div className="w-1/3 overflow-auto">
        <GalleryImageList
          images={images}
          selectedImage={selectedImage}
          onSelectImage={handleSelectImage}
        />
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-600" />

      {/* Right: Preview */}
      <div className="flex-1">
        <ImagePreview
          image={selectedImage}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  )
}
```

---

## ⏱️ PHASE 5: Thumbnail Grid (7 min)

### 5.1 Create `src/components/GalleryImageList.tsx`

```typescript
import type { Image } from '../types/image'

interface Props {
  images: Image[]
  selectedImage: Image | null
  onSelectImage: (image: Image) => void
}

export function GalleryImageList({ images, selectedImage, onSelectImage }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image) => {
        const isSelected = selectedImage?.id === image.id
        
        return (
          <button
            key={image.id}
            onClick={() => onSelectImage(image)}
            className={`
              overflow-hidden rounded-lg cursor-pointer
              transition-all hover:scale-105
              ${isSelected ? 'ring-3 ring-blue-500' : ''}
            `}
          >
            <img
              src={image.download_url}
              alt={`Photo by ${image.author}`}
              className="w-full aspect-square object-cover"
            />
          </button>
        )
      })}
    </div>
  )
}
```

---

## ⏱️ PHASE 6: Image Preview + Controls (10 min)

### 6.1 Create `src/components/ImagePreview.tsx`

```typescript
import type { Image } from '../types/image'

interface Props {
  image: Image | null
  onNavigate: (direction: 'prev' | 'next') => void
}

export function ImagePreview({ image, onNavigate }: Props) {
  if (!image) {
    return <p className="text-gray-400">Select an image</p>
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={image.download_url}
          alt={`Photo by ${image.author}`}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      </div>

      {/* Author */}
      <p className="text-center text-gray-400">
        Photo by <span className="text-white">{image.author}</span>
      </p>

      {/* Controls */}
      <div className="flex justify-center gap-4 py-4">
        <button
          onClick={() => onNavigate('prev')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          ← Prev
        </button>
        
        <span className="text-gray-500 text-sm self-center">
          Use arrow keys
        </span>
        
        <button
          onClick={() => onNavigate('next')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
```

---

## 🎯 DESIGN PATTERNS TO MENTION

| Pattern | Where | Why |
|---------|-------|-----|
| **Custom Hooks** | `useImages` | Encapsulates data fetching |
| **Container/Presentational** | `GalleryShowcase` vs others | Separates logic from UI |
| **Lifting State Up** | `selectedImage` in parent | Single source of truth |
| **Callback Props** | `onSelectImage`, `onNavigate` | Child-to-parent communication |

---

## 📁 FINAL FILE STRUCTURE

```
src/
├── App.tsx
├── components/
│   ├── GalleryShowcase.tsx    ← Container (state)
│   ├── GalleryImageList.tsx   ← Thumbnails
│   └── ImagePreview.tsx       ← Preview + Controls
├── hooks/
│   └── use-images.ts          ← API hook
└── types/
    └── image.ts               ← Types
```

---

## ⚡ QUICK TIPS

1. **Start with types** - Define `Image` interface first
2. **API hook next** - Get data flowing early
3. **Build container** - `GalleryShowcase` with all state
4. **Add children** - Thumbnail grid, then preview
5. **Keyboard last** - Add after buttons work

---

## 🔑 KEY CONCEPTS TO EXPLAIN

**React Query vs useState+useEffect:**
> "React Query handles caching, loading states, and refetching automatically"

**useCallback:**
> "Prevents unnecessary re-renders by memoizing functions"

**Cleanup in useEffect:**
> "Prevents memory leaks by removing event listeners"

**Lifting State Up:**
> "Parent manages state, children receive via props"

---

## ✅ TESTING CHECKLIST

1. [ ] Images load on page load
2. [ ] First image auto-selected
3. [ ] Click thumbnail → preview changes
4. [ ] Selected thumbnail has blue ring
5. [ ] Next/Prev buttons work
6. [ ] Arrow keys navigate
7. [ ] Wraps at beginning/end

---

*Print this document for reference during the interview!*

