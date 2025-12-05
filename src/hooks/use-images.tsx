import { type Image } from '../types/types'
import { useQuery } from '@tanstack/react-query'

const API_URL = 'https://picsum.photos/v2/list'

async function fetchImages(): Promise<Image[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch images')
  }
  return response.json()
}

export function useImages() {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  })
}