'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Sparkles, Sun, Camera, Thermometer, Droplet as DropletIcon, Eye, Glasses } from 'lucide-react'

interface AdjustmentsTabProps {
  brightness: number[]
  setBrightness: (value: number[]) => void
  contrast: number[]
  setContrast: (value: number[]) => void
  exposure: number[]
  setExposure: (value: number[]) => void
  saturation: number[]
  setSaturation: (value: number[]) => void
  vibrance: number[]
  setVibrance: (value: number[]) => void
  highlights: number[]
  setHighlights: (value: number[]) => void
  shadows: number[]
  setShadows: (value: number[]) => void
  temperature: number[]
  setTemperature: (value: number[]) => void
  tint: number[]
  setTint: (value: number[]) => void
  clarity: number[]
  setClarity: (value: number[]) => void
  sharpness: number[]
  setSharpness: (value: number[]) => void
}

export function AdjustmentsTab({
  brightness,
  setBrightness,
  contrast,
  setContrast,
  exposure,
  setExposure,
  saturation,
  setSaturation,
  vibrance,
  setVibrance,
  highlights,
  setHighlights,
  shadows,
  setShadows,
  temperature,
  setTemperature,
  tint,
  setTint,
  clarity,
  setClarity,
  sharpness,
  setSharpness
}: AdjustmentsTabProps) {
  return (
    <div className="text-xs">
      <div className="space-y-2">
        <Label>Brightness ({brightness[0]})</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness[0]}
          onChange={(e) => setBrightness([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Contrast ({contrast[0]})</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={contrast[0]}
          onChange={(e) => setContrast([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Exposure ({exposure[0]})</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={exposure[0]}
          onChange={(e) => setExposure([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Saturation ({saturation[0]})</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={saturation[0]}
          onChange={(e) => setSaturation([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Vibrance ({vibrance[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={vibrance[0]}
          onChange={(e) => setVibrance([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Highlights ({highlights[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={highlights[0]}
          onChange={(e) => setHighlights([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          Shadows ({shadows[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={shadows[0]}
          onChange={(e) => setShadows([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Thermometer className="h-4 w-4" />
          Temperature ({temperature[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={temperature[0]}
          onChange={(e) => setTemperature([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <DropletIcon className="h-4 w-4" />
          Tint ({tint[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={tint[0]}
          onChange={(e) => setTint([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Clarity ({clarity[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={clarity[0]}
          onChange={(e) => setClarity([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Glasses className="h-4 w-4" />
          Sharpness ({sharpness[0]})
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          value={sharpness[0]}
          onChange={(e) => setSharpness([parseInt(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  )
}