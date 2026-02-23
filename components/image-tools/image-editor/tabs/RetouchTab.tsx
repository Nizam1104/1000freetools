'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart, User, Zap, Smile } from 'lucide-react'

interface RetouchTabProps {
  skinSmoothingStrength: number[]
  setSkinSmoothingStrength: (value: number[]) => void
  teethWhiteningStrength: number[]
  setTeethWhiteningStrength: (value: number[]) => void
  onSkinSmoothing: () => void
  onTeethWhitening: () => void
  isProcessing: boolean
}

export function RetouchTab({
  skinSmoothingStrength,
  setSkinSmoothingStrength,
  teethWhiteningStrength,
  setTeethWhiteningStrength,
  onSkinSmoothing,
  onTeethWhitening,
  isProcessing
}: RetouchTabProps) {
  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Heart className="h-4 w-4 text-pink-500" />
        <h3 className="text-sm font-medium">Beauty & Retouch</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <User className="h-3 w-3" />
            <span className="font-medium">Skin Smoothing ({skinSmoothingStrength[0]})</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={skinSmoothingStrength[0]}
              onChange={(e) => setSkinSmoothingStrength([parseInt(e.target.value)])}
              className="flex-1 h-2 accent-pink-500"
            />
            <Button
              onClick={onSkinSmoothing}
              disabled={isProcessing}
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs whitespace-nowrap"
            >
              <Smile className="h-3 w-3 mr-1" />
              Apply
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <Zap className="h-3 w-3" />
            <span className="font-medium">Teeth Whitening ({teethWhiteningStrength[0]})</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={teethWhiteningStrength[0]}
              onChange={(e) => setTeethWhiteningStrength([parseInt(e.target.value)])}
              className="flex-1 h-2 accent-blue-500"
            />
            <Button
              onClick={onTeethWhitening}
              disabled={isProcessing}
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs whitespace-nowrap"
            >
              <Zap className="h-3 w-3 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}