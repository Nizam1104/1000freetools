/**
 * Image Format Conversion Utilities
 * Provides modular functions for converting between different image formats
 */

import { getImageFormatConverterWorker, releaseImageFormatConverterWorker } from '@/lib/workerManager'

// Supported formats
export const SUPPORTED_INPUT_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif', 'svg', 'tiff', 'tif', 'ico', 'heic']
export const SUPPORTED_OUTPUT_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif', 'tiff', 'tif']

// Format descriptions for better UX
export const FORMAT_DESCRIPTIONS: { [key: string]: string } = {
  'jpg': 'Best for photographs',
  'png': 'Best for images with transparency',
  'webp': 'Modern format, smaller file size',
  'bmp': 'Uncompressed bitmap format',
  'gif': 'Supports animation',
  'avif': 'Next-gen format, excellent compression',
  'tiff': 'High quality, professional format',
  'ico': 'Windows icon format',
  'heic': 'Apple iPhone format'
}

// MIME type mappings
export const MIME_TYPE_MAP: { [key: string]: string } = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
  'bmp': 'image/bmp',
  'gif': 'image/gif',
  'avif': 'image/avif',
  'heic': 'image/heic',
  'heif': 'image/heif',
  'ico': 'image/x-icon',
  'tiff': 'image/tiff',
  'tif': 'image/tiff',
  'svg': 'image/svg+xml'
}

// Types
export interface ImageConversionOptions {
  quality?: number
  onProgress?: (progress: number, message: string) => void
}

export interface ImageConversionResult {
  success: boolean
  data?: Blob
  fileName?: string
  error?: string
}

export interface ImageFormatInfo {
  format: string
  isSupported: boolean
  description?: string
}

/**
 * Validates if a file format is supported for input
 */
export function validateInputFormat(format: string): boolean {
  return SUPPORTED_INPUT_FORMATS.includes(format.toLowerCase())
}

/**
 * Validates if a file format is supported for output
 */
export function validateOutputFormat(format: string): boolean {
  return SUPPORTED_OUTPUT_FORMATS.includes(format.toLowerCase())
}

/**
 * Gets format information for an input format
 */
export function getInputFormatInfo(format: string): ImageFormatInfo {
  const normalizedFormat = format.toLowerCase()
  return {
    format: normalizedFormat,
    isSupported: validateInputFormat(normalizedFormat),
    description: FORMAT_DESCRIPTIONS[normalizedFormat]
  }
}

/**
 * Gets format information for an output format
 */
export function getOutputFormatInfo(format: string): ImageFormatInfo {
  const normalizedFormat = format.toLowerCase()
  return {
    format: normalizedFormat,
    isSupported: validateOutputFormat(normalizedFormat),
    description: FORMAT_DESCRIPTIONS[normalizedFormat]
  }
}

/**
 * Detects image format from file name
 */
export function detectFormatFromFileName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase()
  return extension || 'unknown'
}

/**
 * Detects image format from File object
 */
export function detectFormatFromFile(file: File): string {
  return detectFormatFromFileName(file.name)
}

/**
 * Gets MIME type for a format
 */
export function getMimeType(format: string): string {
  return MIME_TYPE_MAP[format.toLowerCase()] || 'image/jpeg'
}

/**
 * Validates if a file is an image based on its MIME type
 */
export function validateImageFile(file: File): boolean {
  return file.type.startsWith('image/') && validateInputFormat(detectFormatFromFile(file))
}

/**
 * Validates multiple image files
 */
export function validateImageFiles(files: File[]): File[] {
  return files.filter(validateImageFile)
}

/**
 * Converts a single image file to the specified format
 */
export async function convertImageFile(
  file: File,
  toFormat: string,
  options: ImageConversionOptions = {}
): Promise<ImageConversionResult> {
  try {
    // Validate inputs
    if (!file) {
      return {
        success: false,
        error: 'No file provided'
      }
    }

    const fromFormat = detectFormatFromFile(file)

    if (!validateInputFormat(fromFormat)) {
      return {
        success: false,
        error: `Input format ${fromFormat.toUpperCase()} is not supported`
      }
    }

    if (!validateOutputFormat(toFormat)) {
      return {
        success: false,
        error: `Output format ${toFormat.toUpperCase()} is not supported`
      }
    }

    // Get worker instance
    const worker = await getImageFormatConverterWorker()

    return new Promise((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        const { type, convertedData, outputFormat, fileName, success, error: workerError, progress, message } = event.data

        if (type === 'conversion-progress') {
          options.onProgress?.(progress, message)
        } else if (type === 'conversion-complete') {
          // Clean up
          worker.removeEventListener('message', handleMessage)
          worker.removeEventListener('error', handleError)
          releaseImageFormatConverterWorker()

          if (success && convertedData && convertedData.byteLength > 0) {
            const mimeType = getMimeType(outputFormat)
            const blob = new Blob([convertedData], { type: mimeType })

            resolve({
              success: true,
              data: blob,
              fileName: fileName
            })
          } else {
            resolve({
              success: false,
              error: workerError || 'Conversion failed'
            })
          }
        }
      }

      const handleError = (error: ErrorEvent) => {
        // Clean up
        worker.removeEventListener('message', handleMessage)
        worker.removeEventListener('error', handleError)
        releaseImageFormatConverterWorker()

        resolve({
          success: false,
          error: `Worker error: ${error.message}`
        })
      }

      // Add event listeners
      worker.addEventListener('message', handleMessage)
      worker.addEventListener('error', handleError)

      // Read file as ArrayBuffer
      const reader = new FileReader()

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer

        // Send message to worker
        worker.postMessage({
          type: 'convert-image',
          imageData: arrayBuffer,
          fromFormat,
          toFormat: toFormat.toLowerCase(),
          quality: options.quality || 0.9,
          fileName: file.name
        })
      }

      reader.onerror = () => {
        // Clean up
        worker.removeEventListener('message', handleMessage)
        worker.removeEventListener('error', handleError)
        releaseImageFormatConverterWorker()

        resolve({
          success: false,
          error: 'Failed to read file'
        })
      }

      reader.readAsArrayBuffer(file)
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Converts multiple image files to the specified format
 */
export async function convertMultipleImageFiles(
  files: File[],
  toFormat: string,
  options: ImageConversionOptions & {
    maxConcurrent?: number
    delayBetween?: number
  } = {}
): Promise<ImageConversionResult[]> {
  const { maxConcurrent = 3, delayBetween = 100, onProgress, ...conversionOptions } = options

  const results: ImageConversionResult[] = []
  const validFiles = validateImageFiles(files)

  if (validFiles.length === 0) {
    return [{
      success: false,
      error: 'No valid image files provided'
    }]
  }

  // Process files in batches
  for (let i = 0; i < validFiles.length; i += maxConcurrent) {
    const batch = validFiles.slice(i, i + maxConcurrent)

    // Process batch concurrently
    const batchPromises = batch.map((file, batchIndex) =>
      convertImageFile(file, toFormat, {
        ...conversionOptions,
        onProgress: (progress, message) => {
          const overallProgress = ((i + batchIndex) / validFiles.length) * 100 + (progress / validFiles.length)
          onProgress?.(overallProgress, `Processing ${file.name}: ${message}`)
        }
      })
    )

    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)

    // Add delay between batches to prevent overwhelming the browser
    if (i + maxConcurrent < validFiles.length && delayBetween > 0) {
      await new Promise(resolve => setTimeout(resolve, delayBetween))
    }
  }

  return results
}

/**
 * Gets available output formats based on input files
 */
export function getAvailableOutputFormats(files: File[]): Array<{
  value: string
  label: string
  description?: string
}> {
  // For now, return all supported output formats
  // In a more advanced version, we could filter based on input formats
  return SUPPORTED_OUTPUT_FORMATS.map(format => ({
    value: format,
    label: format.toUpperCase(),
    description: FORMAT_DESCRIPTIONS[format]
  }))
}

/**
 * Converts an image file and returns a download URL
 */
export async function convertImageToDownloadUrl(
  file: File,
  toFormat: string,
  options: ImageConversionOptions = {}
): Promise<{
  success: boolean
  url?: string
  fileName?: string
  error?: string
}> {
  const result = await convertImageFile(file, toFormat, options)

  if (result.success && result.data) {
    const url = URL.createObjectURL(result.data)
    return {
      success: true,
      url,
      fileName: result.fileName
    }
  }

  return {
    success: false,
    error: result.error
  }
}

/**
 * Converts multiple images and creates a ZIP file for download
 */
export async function convertImagesToZip(
  files: File[],
  toFormat: string,
  options: ImageConversionOptions & {
    zipFileName?: string
  } = {}
): Promise<{
  success: boolean
  url?: string
  fileName?: string
  error?: string
}> {
  const results = await convertMultipleImageFiles(files, toFormat, options)

  if (results.every(r => r.success)) {
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()

    // Add successfully converted files to zip
    results.forEach((result, index) => {
      if (result.success && result.data && result.fileName) {
        zip.file(result.fileName, result.data)
      }
    })

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const zipFileName = options.zipFileName || `converted-images-${Date.now()}.zip`
    const url = URL.createObjectURL(zipBlob)

    return {
      success: true,
      url,
      fileName: zipFileName
    }
  }

  const errors = results
    .filter(r => !r.success)
    .map(r => r.error)
    .filter(Boolean) as string[]

  return {
    success: false,
    error: `Failed to convert some files: ${errors.join(', ')}`
  }
}

/**
 * Triggers download of a blob URL
 */
export function downloadBlob(url: string, fileName: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Downloads a converted image file
 */
export async function downloadConvertedImage(
  file: File,
  toFormat: string,
  options: ImageConversionOptions = {}
): Promise<boolean> {
  const result = await convertImageToDownloadUrl(file, toFormat, options)

  if (result.success && result.url && result.fileName) {
    downloadBlob(result.url, result.fileName)
    // Clean up the URL after download
    setTimeout(() => URL.revokeObjectURL(result.url!), 1000)
    return true
  }

  return false
}

/**
 * Downloads multiple converted images as a ZIP file
 */
export async function downloadConvertedImagesAsZip(
  files: File[],
  toFormat: string,
  options: ImageConversionOptions & {
    zipFileName?: string
  } = {}
): Promise<boolean> {
  const result = await convertImagesToZip(files, toFormat, options)

  if (result.success && result.url && result.fileName) {
    downloadBlob(result.url, result.fileName)
    // Clean up the URL after download
    setTimeout(() => URL.revokeObjectURL(result.url!), 1000)
    return true
  }

  return false
}

/**
 * Utility function to format file sizes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Creates a preview URL for an image file
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Cleans up a preview URL
 */
export function cleanupImagePreview(url: string): void {
  URL.revokeObjectURL(url)
}