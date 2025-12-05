import { useState } from 'react'
import { useImages } from '../../hooks/use-images'
import { ImageCard } from './image-card'
import { ImagePreview } from './image-preview'
import { type Image } from '../../types/types'

export function ShowcaseGallery() {
  const { data: images = [], isLoading } = useImages()
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  const handleImageClick = (image: Image) => {
    setSelectedImage(image)
  }

  if (isLoading) return <div>Loading...</div>

  return <>
    {/* Main container */}
    <div className='flex flex-row items-center gap-4'>

      {/* Images grid */}
      <div className='grid grid-cols-5 gap-4 grow basis-1/2'>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} onImageClick={handleImageClick} />
        ))}
      </div>

      {/* Image preview */}
      <div className='flex grow basis-1/2'>
        <ImagePreview image={selectedImage} />
      </div>
    </div>
  </>
}