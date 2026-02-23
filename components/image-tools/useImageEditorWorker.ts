/**
 * Hook for managing the Image Editor Worker
 */

import { useCallback, useRef, useState } from 'react'
import { getImageEditorWorker, releaseImageEditorWorker } from '../../lib/workerManager'

interface WorkerMessage {
  type: 'crop' | 'resize' | 'rotate' | 'flip' | 'filter' | 'advancedFilter' | 'adjust' | 'backgroundBlur' | 'removeRedEye' | 'smoothSkin' | 'whitenTeeth'
  id: string
  data: any
}

interface WorkerResponse {
  type: 'success' | 'error' | 'worker-ready'
  id?: string
  data?: Blob
  error?: string
}

interface ProcessOptions {
  cropArea?: { x: number; y: number; width: number; height: number }
  width?: number
  height?: number
  maintainAspect?: boolean
  angle?: number
  direction?: 'horizontal' | 'vertical'
  filterType?: 'grayscale' | 'sepia' | 'brightness' | 'contrast' | 'blur' | 'sharpen' | 'vintage' | 'cold' | 'dramatic' | 'fade' | 'vignette'
  intensity?: number
  adjustments?: {
    brightness?: number
    contrast?: number
    saturation?: number
    exposure?: number
    vibrance?: number
    highlights?: number
    shadows?: number
    temperature?: number
    tint?: number
    clarity?: number
    sharpness?: number
  }
  blurStrength?: number
  eyeRegions?: Array<{ x: number; y: number; width: number; height: number }>
  strength?: number
}

export function useImageEditorWorker() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<{ progress: number; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const pendingOperationsRef = useRef<Map<string, { resolve: (value: Blob) => void; reject: (reason?: Error) => void }>>(new Map())

  const ensureWorker = useCallback(async () => {
    if (!workerRef.current) {
      try {
        const worker = await getImageEditorWorker()
        workerRef.current = worker

        // Set up message handler
        worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
          const { type, id, data, error } = event.data

          if (type === 'worker-ready') {
            return
          }

          const operation = pendingOperationsRef.current.get(id || '')
          if (!operation) return

          pendingOperationsRef.current.delete(id || '')

          if (type === 'success' && data) {
            operation.resolve(data)
          } else if (type === 'error' && error) {
            operation.reject(new Error(error))
          }
        }

        worker.onerror = (error) => {
          console.error('Image editor worker error:', error)
          setError('Worker error occurred')
        }
      } catch (err) {
        console.error('Failed to initialize image editor worker:', err)
        setError('Failed to initialize image editor')
        throw err
      }
    }
    return workerRef.current
  }, [])

  const processImage = useCallback(async (
    imageData: string,
    operation: 'crop' | 'resize' | 'rotate' | 'flip' | 'filter' | 'advancedFilter' | 'adjust' | 'backgroundBlur' | 'removeRedEye' | 'smoothSkin' | 'whitenTeeth',
    options: ProcessOptions = {}
  ): Promise<Blob> => {
    setIsProcessing(true)
    setError(null)
    setProgress({ progress: 0, message: `Starting ${operation}...` })

    try {
      const worker = await ensureWorker()

      // Convert data URL to Blob
      const response = await fetch(imageData)
      const imageBlob = await response.blob()

      const operationId = Math.random().toString(36).substring(2, 9)

      return new Promise<Blob>((resolve, reject) => {
        pendingOperationsRef.current.set(operationId, { resolve, reject })
        setProgress({ progress: 50, message: `Processing ${operation}...` })

        const message: WorkerMessage = {
          type: operation,
          id: operationId,
          data: {
            imageData: imageBlob,
            ...options
          }
        }

        worker.postMessage(message)

        // Set a timeout for the operation
        setTimeout(() => {
          const pendingOp = pendingOperationsRef.current.get(operationId)
          if (pendingOp) {
            pendingOperationsRef.current.delete(operationId)
            reject(new Error(`${operation} operation timed out`))
          }
        }, 30000) // 30 second timeout
      })

    } catch (err) {
      const error = err instanceof Error ? err.message : `${operation} failed`
      setError(error)
      throw new Error(error)
    } finally {
      setIsProcessing(false)
      setProgress(null)
    }
  }, [ensureWorker])

  // Specific operation methods for convenience
  const cropImage = useCallback((imageData: string, cropArea: { x: number; y: number; width: number; height: number }) => {
    return processImage(imageData, 'crop', { cropArea })
  }, [processImage])

  const resizeImage = useCallback((imageData: string, width: number, height: number, maintainAspect = true) => {
    return processImage(imageData, 'resize', { width, height, maintainAspect })
  }, [processImage])

  const rotateImage = useCallback((imageData: string, angle: number) => {
    return processImage(imageData, 'rotate', { angle })
  }, [processImage])

  const flipImage = useCallback((imageData: string, direction: 'horizontal' | 'vertical') => {
    return processImage(imageData, 'flip', { direction })
  }, [processImage])

  const applyFilter = useCallback((
    imageData: string,
    filterType: 'grayscale' | 'sepia' | 'brightness' | 'contrast' | 'blur' | 'sharpen',
    intensity = 100
  ) => {
    return processImage(imageData, 'filter', { filterType, intensity })
  }, [processImage])

  const adjustImage = useCallback((
    imageData: string,
    adjustments: {
      brightness?: number
      contrast?: number
      saturation?: number
      exposure?: number
      vibrance?: number
      highlights?: number
      shadows?: number
      temperature?: number
      tint?: number
      clarity?: number
      sharpness?: number
    }
  ) => {
    return processImage(imageData, 'adjust', { adjustments })
  }, [processImage])

  const applyAdvancedFilter = useCallback((
    imageData: string,
    filterType: 'vintage' | 'cold' | 'dramatic' | 'fade' | 'vignette',
    intensity = 100
  ) => {
    return processImage(imageData, 'advancedFilter', { filterType, intensity })
  }, [processImage])

  const applyBackgroundBlur = useCallback((
    imageData: string,
    blurStrength = 20
  ) => {
    return processImage(imageData, 'backgroundBlur', { blurStrength })
  }, [processImage])

  const removeRedEye = useCallback((
    imageData: string,
    eyeRegions: Array<{ x: number; y: number; width: number; height: number }>
  ) => {
    return processImage(imageData, 'removeRedEye', { eyeRegions })
  }, [processImage])

  const smoothSkin = useCallback((
    imageData: string,
    strength = 50
  ) => {
    return processImage(imageData, 'smoothSkin', { strength })
  }, [processImage])

  const whitenTeeth = useCallback((
    imageData: string,
    strength = 50
  ) => {
    return processImage(imageData, 'whitenTeeth', { strength })
  }, [processImage])

  const reset = useCallback(() => {
    setError(null)
    setProgress(null)
  }, [])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (workerRef.current) {
      pendingOperationsRef.current.forEach(({ reject }) => {
        reject(new Error('Worker cleanup'))
      })
      pendingOperationsRef.current.clear()
      releaseImageEditorWorker()
      workerRef.current = null
    }
  }, [])

  return {
    isProcessing,
    progress,
    error,
    processImage,
    cropImage,
    resizeImage,
    rotateImage,
    flipImage,
    applyFilter,
    applyAdvancedFilter,
    applyBackgroundBlur,
    removeRedEye,
    smoothSkin,
    whitenTeeth,
    adjustImage,
    reset,
    cleanup
  }
}