'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Droplets as Blur, Scissors } from 'lucide-react'

interface BackgroundTabProps {
  backgroundBlurStrength: number[]
  setBackgroundBlurStrength: (value: number[]) => void
  onRemoveBackground: () => void
  onBackgroundBlur: () => void
  isProcessing: boolean
}

export function BackgroundTab({
  backgroundBlurStrength,
  setBackgroundBlurStrength,
  onRemoveBackground,
  onBackgroundBlur,
  isProcessing
}: BackgroundTabProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700">
        <Camera className="h-4 w-4" />
        Background
      </h3>

      <Button
        onClick={onRemoveBackground}
        disabled={isProcessing}
        className="w-full h-8 text-xs"
        variant="outline"
        size="sm"
      >
        <Scissors className="h-3 w-3 mr-1.5" />
        Remove Background
      </Button>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium flex items-center gap-1.5 text-gray-600">
            <Blur className="h-3 w-3" />
            Blur
          </span>
          <span className="text-xs text-gray-500">{backgroundBlurStrength[0]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={backgroundBlurStrength[0]}
          onChange={(e) => setBackgroundBlurStrength([parseInt(e.target.value)])}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <Button
          onClick={onBackgroundBlur}
          disabled={isProcessing}
          className="w-full h-7 text-xs"
          variant="outline"
          size="sm"
        >
          Apply Blur
        </Button>
      </div>
    </div>
  )
}