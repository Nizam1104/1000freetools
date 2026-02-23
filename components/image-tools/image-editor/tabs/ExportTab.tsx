'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Download } from 'lucide-react'

interface ExportTabProps {
  resizeWidth: string
  setResizeWidth: (value: string) => void
  resizeHeight: string
  setResizeHeight: (value: string) => void
  maintainAspect: boolean
  setMaintainAspect: (value: boolean) => void
  onResize: () => void
  onDownload: (format: string) => void
  isProcessing: boolean
}

export function ExportTab({
  resizeWidth,
  setResizeWidth,
  resizeHeight,
  setResizeHeight,
  maintainAspect,
  setMaintainAspect,
  onResize,
  onDownload,
  isProcessing
}: ExportTabProps) {
  return (
    <div className="space-y-3 p-2">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Download className="h-4 w-4" />
        <span className="font-medium text-sm">Export</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs font-medium">Resize</Label>
          <div className="flex gap-1.5">
            <Input
              value={resizeWidth}
              onChange={(e) => setResizeWidth(e.target.value)}
              type="number"
              placeholder="W"
              className="h-8 text-sm"
            />
            <Input
              value={resizeHeight}
              onChange={(e) => setResizeHeight(e.target.value)}
              type="number"
              placeholder="H"
              className="h-8 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="maintain-aspect"
              checked={maintainAspect}
              onCheckedChange={setMaintainAspect}
            />
            <Label htmlFor="maintain-aspect" className="text-xs">Maintain ratio</Label>
          </div>

          <Button
            onClick={onResize}
            disabled={isProcessing || !resizeWidth || !resizeHeight}
            size="sm"
            className="w-full h-7 text-xs"
          >
            Apply Resize
          </Button>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Download</Label>
          <div className="flex gap-1">
            <Button
              variant="outline"
              onClick={() => onDownload('png')}
              size="sm"
              className="flex-1 h-7 text-xs"
            >
              PNG
            </Button>
            <Button
              variant="outline"
              onClick={() => onDownload('jpeg')}
              size="sm"
              className="flex-1 h-7 text-xs"
            >
              JPEG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}