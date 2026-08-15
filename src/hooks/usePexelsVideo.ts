import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY

interface PexelsVideo {
  videoUrl: string | null;
  posterUrl: string | null;
  loading: boolean;
}

const cache: Record<string, PexelsVideo> = {}

export function usePexelsVideo(query: string, fallbackVideoId: string): PexelsVideo {
  const [state, setState] = useState<PexelsVideo>({ videoUrl: null, posterUrl: null, loading: true })

  useEffect(() => {
    if (cache[query]) { setState(cache[query]); return }

    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
          { headers: { Authorization: API_KEY } }
        )
        const data = await res.json()
        if (data.videos?.length > 0) {
          const video = data.videos[0]
          const file = video.video_files.find((f: any) => f.quality === 'hd' || f.quality === 'sd')
          const result = { videoUrl: file?.link || null, posterUrl: video.image || null, loading: false }
          cache[query] = result
          setState(result)
        } else {
          throw new Error('No results')
        }
      } catch {
        const fallback = {
          videoUrl: `https://www.pexels.com/video/${fallbackVideoId}/download/`,
          posterUrl: null,
          loading: false
        }
        cache[query] = fallback
        setState(fallback)
      }
    }

    fetchVideo()
  }, [query, fallbackVideoId])

  return state
}
