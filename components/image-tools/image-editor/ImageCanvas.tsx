'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'

interface DrawingTool {
  type: 'pen' | 'rectangle' | 'circle' | 'line' | 'text' | 'arrow'
  color: string
  strokeWidth: number
  fontSize?: number
}

interface TextAnnotation {
  x: number
  y: number
  text: string
  color: string
  fontSize: number
}

interface DrawingPoint {
  x: number
  y: number
}

interface DrawingElement {
  id: string
  tool: DrawingTool
  points?: DrawingPoint[]
  startX?: number
  startY?: number
  endX?: number
  endY?: number
  text?: string
}

interface ImageCanvasProps {
  imageData: string | null
  currentTool: DrawingTool
  onImageLoad: (width: number, height: number) => void
  onDrawingChange: (elements: DrawingElement[]) => void
  drawingElements: DrawingElement[]
  drawingMode?: boolean
  onDrawingComplete?: () => void // Callback when a drawing operation is completed
  className?: string
}

export function ImageCanvas({
  imageData,
  currentTool,
  onImageLoad,
  onDrawingChange,
  drawingElements,
  drawingMode = true,
  onDrawingComplete,
  className
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [showTextInput, setShowTextInput] = useState(false)
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [tempText, setTempText] = useState('')
  // Capture the drawing tool that was active when the text input was opened,
  // so changing tools while the modal is open does not affect the text element.
  const [textToolAtOpen, setTextToolAtOpen] = useState<DrawingTool | null>(null)

  // Refs to cache the loaded image and prevent re-loading
  const cachedImageRef = useRef<HTMLImageElement | null>(null)
  const imageDataRef = useRef<string | null>(null)

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!cachedImageRef.current) return

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw the background image
    ctx.drawImage(cachedImageRef.current, 0, 0)
  }, [])

  const drawElement = useCallback((ctx: CanvasRenderingContext2D, element: DrawingElement) => {
    ctx.strokeStyle = element.tool.color
    ctx.lineWidth = element.tool.strokeWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    switch (element.tool.type) {
      case 'pen':
        if (element.points && element.points.length > 1) {
          ctx.beginPath()
          ctx.moveTo(element.points[0].x, element.points[0].y)
          element.points.forEach(point => {
            ctx.lineTo(point.x, point.y)
          })
          ctx.stroke()
        }
        break

      case 'line':
        if (element.startX !== undefined && element.startY !== undefined &&
            element.endX !== undefined && element.endY !== undefined) {
          ctx.beginPath()
          ctx.moveTo(element.startX, element.startY)
          ctx.lineTo(element.endX, element.endY)
          ctx.stroke()
        }
        break

      case 'rectangle':
        if (element.startX !== undefined && element.startY !== undefined &&
            element.endX !== undefined && element.endY !== undefined) {
          ctx.beginPath()
          ctx.rect(
            element.startX,
            element.startY,
            element.endX - element.startX,
            element.endY - element.startY
          )
          ctx.stroke()
        }
        break

      case 'circle':
        if (element.startX !== undefined && element.startY !== undefined &&
            element.endX !== undefined && element.endY !== undefined) {
          const radius = Math.sqrt(
            Math.pow(element.endX - element.startX, 2) +
            Math.pow(element.endY - element.startY, 2)
          )
          ctx.beginPath()
          ctx.arc(element.startX, element.startY, radius, 0, 2 * Math.PI)
          ctx.stroke()
        }
        break

      case 'arrow':
        if (element.startX !== undefined && element.startY !== undefined &&
            element.endX !== undefined && element.endY !== undefined) {
          // Draw line
          ctx.beginPath()
          ctx.moveTo(element.startX, element.startY)
          ctx.lineTo(element.endX, element.endY)
          ctx.stroke()

          // Draw arrowhead
          const angle = Math.atan2(element.endY - element.startY, element.endX - element.startX)
          const arrowLength = 15
          const arrowAngle = Math.PI / 6

          ctx.beginPath()
          ctx.moveTo(element.endX, element.endY)
          ctx.lineTo(
            element.endX - arrowLength * Math.cos(angle - arrowAngle),
            element.endY - arrowLength * Math.sin(angle - arrowAngle)
          )
          ctx.moveTo(element.endX, element.endY)
          ctx.lineTo(
            element.endX - arrowLength * Math.cos(angle + arrowAngle),
            element.endY - arrowLength * Math.sin(angle + arrowAngle)
          )
          ctx.stroke()
        }
        break

      case 'text':
        if (element.text) {
          const fontSize = element.tool.fontSize || 16
          ctx.font = `${fontSize}px Arial`
          ctx.fillStyle = element.tool.color
          ctx.textBaseline = 'top'
          const x = element.points?.[0]?.x || element.startX || 0
          const y = element.points?.[0]?.y || element.startY || 0
          ctx.fillText(element.text, x, y)
        }
        break
    }
  }, [])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (cachedImageRef.current) {
      ctx.drawImage(cachedImageRef.current, 0, 0)

      // Redraw all drawing elements
      drawingElements.forEach(element => drawElement(ctx, element))

      // Draw current element being created
      if (currentElement) {
        drawElement(ctx, currentElement)
      }
    }
  }, [drawingElements, currentElement, drawElement])


  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingMode) return

    if (currentTool.type === 'text') {
      const pos = getMousePos(e)
      setTextPosition(pos)
      setTextToolAtOpen(currentTool)
      setShowTextInput(true)
      return
    }

    const pos = getMousePos(e)
    setIsDrawing(true)

    const newElement: DrawingElement = {
      id: Date.now().toString(),
      tool: currentTool,
      points: currentTool.type === 'pen' ? [pos] : undefined,
      startX: pos.x,
      startY: pos.y,
      endX: pos.x,
      endY: pos.y
    }

    setCurrentElement(newElement)
  }, [currentTool, getMousePos, drawingMode])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement) return

    const pos = getMousePos(e)
    const updatedElement = { ...currentElement }

    if (currentElement.tool.type === 'pen') {
      updatedElement.points = [...(currentElement.points || []), pos]
    } else {
      updatedElement.endX = pos.x
      updatedElement.endY = pos.y
    }

    setCurrentElement(updatedElement)
  }, [isDrawing, currentElement, getMousePos])

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentElement) {
      const newElements = [...drawingElements, currentElement]
      onDrawingChange(newElements)
      setCurrentElement(null)
      // Notify parent component that a drawing operation was completed
      onDrawingComplete?.()
    }
    setIsDrawing(false)
  }, [isDrawing, currentElement, drawingElements, onDrawingChange, onDrawingComplete])

  const handleTextSubmit = useCallback(() => {
    if (tempText.trim()) {
      const toolForText = textToolAtOpen || currentTool
      const textElement: DrawingElement = {
        id: Date.now().toString(),
        tool: toolForText,
        points: [{ x: textPosition.x, y: textPosition.y }],
        startX: textPosition.x,
        startY: textPosition.y,
        text: tempText
      }

      const newElements = [...drawingElements, textElement]
      onDrawingChange(newElements)
      // Notify parent component that a drawing operation was completed
      onDrawingComplete?.()
    }

    setShowTextInput(false)
    setTempText('')
    setTextToolAtOpen(null)
  }, [tempText, textPosition, textToolAtOpen, currentTool, drawingElements, onDrawingChange, onDrawingComplete])

  const clearDrawing = useCallback(() => {
    onDrawingChange([])
  }, [onDrawingChange])

  // Note: Drawing undo is now handled by the parent ImageEditor component
  // This function is kept for potential future use if we want local drawing undo
  const undoLastDrawing = useCallback(() => {
    const newElements = drawingElements.slice(0, -1)
    onDrawingChange(newElements)
  }, [drawingElements, onDrawingChange])

  // Load image only when imageData changes
  useEffect(() => {
    // Only reload if imageData is different from cached
    if (imageData !== imageDataRef.current) {
      imageDataRef.current = imageData
      cachedImageRef.current = null

      if (imageData) {
        const img = new Image()
        img.onload = () => {
          cachedImageRef.current = img
          // Set canvas dimensions
          const canvas = canvasRef.current
          if (canvas) {
            canvas.width = img.width
            canvas.height = img.height
            // Trigger initial redraw
            redrawCanvas()
          }
          // Update image dimensions and notify parent
          setImageDimensions({ width: img.width, height: img.height })
          onImageLoad(img.width, img.height)
        }
        img.src = imageData
      }
    }
  }, [imageData, redrawCanvas, onImageLoad])

  // Redraw canvas whenever elements change (using cached image)
  useEffect(() => {
    if (!cachedImageRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(cachedImageRef.current, 0, 0)

    // Redraw all drawing elements
    drawingElements.forEach(element => drawElement(ctx, element))

    // Draw current element being created
    if (currentElement) {
      drawElement(ctx, currentElement)
    }
  }, [drawingElements, currentElement, drawElement])

  return (
    <div className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className={`border border-border max-w-full h-auto ${drawingMode ? 'cursor-crosshair' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Text Input Modal */}
      {showTextInput && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTextSubmit()
                } else if (e.key === 'Escape') {
                  setShowTextInput(false)
                  setTempText('')
                }
              }}
              placeholder="Enter text..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleTextSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowTextInput(false)
                  setTempText('')
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}