import type { Image } from '../../../types/image'
import { Controls } from './controls'

interface ImagePreviewProps {
  image: Image | null
  onNavigate: (direction: 'prev' | 'next') => void
}

export function ImagePreview({ image, onNavigate }: ImagePreviewProps) {
  if (!image) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Select an image to preview</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={image.download_url}
          alt={`Photo by ${image.author}`}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      </div>

      {/* Image Info */}
      <div className="text-center text-sm text-gray-400">
        <p>Photo by <span className="text-white font-medium">{image.author}</span></p>
      </div>

      {/* Navigation Controls */}
      <Controls onNavigate={onNavigate} />
    </div>
  )
}


