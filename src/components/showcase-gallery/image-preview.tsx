import { type Image } from '../../types/types'

interface ImagePreviewProps {
  image?: Image | null
}

export function ImagePreview({ image }: ImagePreviewProps) {
  if (!image) return <div>No image selected</div>
  
  return (
    <div className='flex flex-col items-center gap-2 w-full h-full'>
      <img src={image.download_url} alt={image.author} />
      <p>{image.author}</p>
    </div>
  )
}