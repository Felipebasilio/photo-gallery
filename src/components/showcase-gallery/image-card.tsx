import { type Image } from '../../types/types'
interface ImageCardProps {
  image: Image
  onImageClick: (image: Image) => void
}

export function ImageCard({ image, onImageClick }: ImageCardProps) {
  return <div className="flex flex-col items-center gap-2">
    <img src={image.download_url} alt={image.author} className="max-w-[50px] max-h-[50px] object-cover" onClick={() => onImageClick(image)} />
    <p className="text-sm">{image.author}</p>
  </div>
}