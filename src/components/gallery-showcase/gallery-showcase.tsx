import { useState, useCallback, useEffect } from 'react'
import { GalleryImageList } from './gallery-image-list/gallery-image-list'
import { ImagePreview } from './image-preview/image-preview'
import { useImages } from '../../hooks/use-images'
import type { Image } from '../../types/image'

export function GalleryShowcase() {
  const { data: images = [], isLoading, error } = useImages()
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  // Set first image as selected when images load
  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      setSelectedImage(images[0])
    }
  }, [images, selectedImage])

  const handleSelectImage = useCallback((image: Image) => {
    setSelectedImage(image)
  }, [])

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
      if (e.key === 'ArrowLeft') {
        handleNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNavigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading images...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load images</p>
      </div>
    )
  }

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Gallery Thumbnails */}
      <div className="w-1/3 overflow-auto">
        <GalleryImageList
          images={images}
          selectedImage={selectedImage}
          onSelectImage={handleSelectImage}
        />
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-600" />

      {/* Image Preview */}
      <div className="flex-1 flex flex-col">
        <ImagePreview
          image={selectedImage}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  )
}
