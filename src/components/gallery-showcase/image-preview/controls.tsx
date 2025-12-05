interface ControlsProps {
  onNavigate: (direction: 'prev' | 'next') => void
}

export function Controls({ onNavigate }: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={() => onNavigate('prev')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        aria-label="Previous image"
      >
        <span>←</span>
        <span>Prev</span>
      </button>
      
      <span className="text-gray-500 text-sm">Use arrow keys to navigate</span>
      
      <button
        onClick={() => onNavigate('next')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        aria-label="Next image"
      >
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  )
}


