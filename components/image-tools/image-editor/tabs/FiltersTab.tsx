'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Palette, Wand2 } from 'lucide-react'

interface FiltersTabProps {
  filterIntensity: number[]
  setFilterIntensity: (value: number[]) => void
  onFilter: (filterType: string) => void
  onAdvancedFilter: (filterType: string) => void
  isProcessing: boolean
}

export function FiltersTab({
  filterIntensity,
  setFilterIntensity,
  onFilter,
  onAdvancedFilter,
  isProcessing
}: FiltersTabProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Palette className="h-4 w-4" />
          Classic Filters
        </div>
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilter('grayscale')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-600 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Grayscale</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilter('sepia')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-yellow-100 to-orange-200 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Sepia</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilter('blur')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-blue-100 to-blue-300 rounded-sm opacity-60"></div>
            <span className="text-[10px] leading-tight">Blur</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilter('sharpen')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-gray-100 to-gray-800 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Sharpen</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Wand2 className="h-4 w-4" />
          Instagram Filters
        </div>
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdvancedFilter('vintage')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-orange-200 to-red-200 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Vintage</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdvancedFilter('cold')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Cold</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdvancedFilter('dramatic')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Dramatic</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdvancedFilter('fade')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-sm"></div>
            <span className="text-[10px] leading-tight">Fade</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAdvancedFilter('vignette')}
            disabled={isProcessing}
            className="h-12 px-1 py-1 flex flex-col gap-0.5"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 rounded-full"></div>
            <span className="text-[10px] leading-tight">Vignette</span>
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium">Filter Intensity ({filterIntensity[0]}%)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filterIntensity[0]}
          onChange={(e) => setFilterIntensity([parseInt(e.target.value)])}
          className="w-full h-1"
        />
      </div>
    </div>
  )
}