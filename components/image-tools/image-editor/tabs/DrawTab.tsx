'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { PenTool, Minus, Square, Circle, Type } from 'lucide-react'

interface DrawingTool {
  type: 'pen' | 'rectangle' | 'circle' | 'line' | 'text' | 'arrow'
  color: string
  strokeWidth: number
  fontSize?: number
}

interface DrawTabProps {
  currentTool: DrawingTool
  setCurrentTool: (tool: DrawingTool) => void
}

export function DrawTab({
  currentTool,
  setCurrentTool
}: DrawTabProps) {
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <PenTool className="h-4 w-4" />
          Draw
        </h3>
      </div>

      <div className="flex gap-1">
        <Button
          variant={currentTool.type === 'pen' ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentTool({ ...currentTool, type: 'pen' })}
          className="p-2"
        >
          <PenTool className="h-4 w-4" />
        </Button>
        <Button
          variant={currentTool.type === 'line' ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentTool({ ...currentTool, type: 'line' })}
          className="p-2"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant={currentTool.type === 'rectangle' ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentTool({ ...currentTool, type: 'rectangle' })}
          className="p-2"
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={currentTool.type === 'circle' ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentTool({ ...currentTool, type: 'circle' })}
          className="p-2"
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={currentTool.type === 'text' ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentTool({ ...currentTool, type: 'text' })}
          className="p-2"
        >
          <Type className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Color:</span>
          <input
            type="color"
            value={currentTool.color}
            onChange={(e) => setCurrentTool({ ...currentTool, color: e.target.value })}
            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={currentTool.strokeWidth}
            onChange={(e) => setCurrentTool({ ...currentTool, strokeWidth: parseInt(e.target.value) })}
            className="w-16"
          />
          <span className="text-xs text-gray-500 w-4">{currentTool.strokeWidth}</span>
        </div>
      </div>

      {currentTool.type === 'text' && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Font:</span>
          <input
            type="range"
            min="8"
            max="72"
            value={currentTool.fontSize}
            onChange={(e) => setCurrentTool({ ...currentTool, fontSize: parseInt(e.target.value) })}
            className="w-16"
          />
          <span className="text-xs text-gray-500 w-6">{currentTool.fontSize}</span>
        </div>
      )}
    </div>
  )
}