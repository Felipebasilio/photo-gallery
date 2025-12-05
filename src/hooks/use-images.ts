import { useQuery } from '@tanstack/react-query'
import type { Image } from '../types/image'

const IMAGES_API_URL = 'https://picsum.photos/v2/list'

async function fetchImages(): Promise<Image[]> {
  const response = await fetch(IMAGES_API_URL)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status}`)
  }
  
  return response.json()
}

export function useImages() {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  })
}


