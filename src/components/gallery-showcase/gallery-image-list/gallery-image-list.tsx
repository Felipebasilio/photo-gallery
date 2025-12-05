import type { Image } from '../../../types/image'

interface GalleryImageListProps {
  images: Image[]
  selectedImage: Image | null
  onSelectImage: (image: Image) => void
}

export function GalleryImageList({ images, selectedImage, onSelectImage }: GalleryImageListProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image) => {
        const isSelected = selectedImage?.id === image.id
        
        return (
          <button
            key={image.id}
            onClick={() => onSelectImage(image)}
            className={`
              relative overflow-hidden rounded-lg cursor-pointer
              transition-all duration-200 hover:scale-105
              ${isSelected ? 'ring-3 ring-blue-500 ring-offset-2 ring-offset-gray-900' : ''}
            `}
          >
            <img
              src={image.download_url}
              alt={`Photo by ${image.author}`}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            {isSelected && (
              <div className="absolute inset-0 bg-blue-500/20" />
            )}
          </button>
        )
      })}
    </div>
  )
}
