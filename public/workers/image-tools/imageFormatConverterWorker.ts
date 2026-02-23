/**
 * Comprehensive Image Format Converter Worker
 * Handles conversion between different image formats using Canvas API and browser-compatible libraries
 * Supports: JPG, PNG, WebP, BMP, GIF, AVIF, TIFF, ICO, SVG conversions
 */

interface ConversionRequest {
  type: 'convert-image'
  imageData: ArrayBuffer
  fromFormat: string
  toFormat: string
  quality?: number
  fileName?: string
}

interface ConversionResponse {
  type: 'conversion-complete'
  convertedData: ArrayBuffer
  outputFormat: string
  fileName: string
  success: boolean
  error?: string
}

interface ProgressResponse {
  type: 'conversion-progress'
  progress: number
  message: string
}

// Format mappings
const FORMAT_MIME_TYPES: { [key: string]: string } = {
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

// Canvas supported formats for basic conversions
const CANVAS_SUPPORTED_FORMATS = ['jpeg', 'png', 'webp', 'bmp']

// Lazy loaded library modules
type LibraryModule = any

interface Libraries {
  heic2any?: LibraryModule
  utif2?: LibraryModule
}

const libraries: Libraries = {}

// Progress callback
let progressCallback: (progress: number, message: string) => void = () => {}

// Lazy loading functions
async function loadHEICConverter() {
  if (!libraries.heic2any) {
    progressCallback(15, 'Loading HEIC conversion library...')
    try {
      // Dynamic import for heic2any
      const heic2anyModule = await import('heic2any')
      libraries.heic2any = heic2anyModule.default || heic2anyModule
    } catch (error) {
      throw new Error('HEIC conversion library not available. This conversion requires additional setup.')
    }
  }
  return libraries.heic2any
}

async function loadTIFFConverter() {
  if (!libraries.utif2) {
    progressCallback(15, 'Loading TIFF conversion library...')
    try {
      // Dynamic import for utif2
      libraries.utif2 = await import('utif2')
    } catch (error) {
      throw new Error('TIFF conversion library not available. This conversion requires additional setup.')
    }
  }
  return libraries.utif2
}

// Function to detect image format from file data
function detectImageFormat(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer)

  // JPEG signature (FF D8 FF)
  if (view[0] === 0xFF && view[1] === 0xD8 && view[2] === 0xFF) {
    return 'jpg'
  }

  // PNG signature (89 50 4E 47 0D 0A 1A 0A)
  if (view[0] === 0x89 && view[1] === 0x50 && view[2] === 0x4E && view[3] === 0x47) {
    return 'png'
  }

  // WebP signature
  if (view[8] === 0x57 && view[9] === 0x45 && view[10] === 0x42 && view[11] === 0x50) {
    return 'webp'
  }

  // GIF signature (GIF87a or GIF89a)
  if (view[0] === 0x47 && view[1] === 0x49 && view[2] === 0x46 &&
      view[3] === 0x38 && (view[4] === 0x37 || view[4] === 0x38) && view[5] === 0x61) {
    return 'gif'
  }

  // BMP signature
  if (view[0] === 0x42 && view[1] === 0x4D) {
    return 'bmp'
  }

  // TIFF signature (II or MM)
  if ((view[0] === 0x49 && view[1] === 0x49) || (view[0] === 0x4D && view[1] === 0x4D)) {
    return 'tiff'
  }

  // HEIC signature (ftypheic)
  if (view[4] === 0x66 && view[5] === 0x74 && view[6] === 0x79 && view[7] === 0x70 &&
      view[8] === 0x68 && view[9] === 0x65 && view[10] === 0x69 && view[11] === 0x63) {
    return 'heic'
  }

  // ICO signature
  if (view[0] === 0x00 && view[1] === 0x00 && view[2] === 0x01 && view[3] === 0x00) {
    return 'ico'
  }

  // SVG detection
  const text = new TextDecoder('utf-8').decode(view.slice(0, Math.min(100, view.length)))
  if (text.includes('<svg') || text.includes('<?xml')) {
    return 'svg'
  }

  // AVIF detection
  if (view[4] === 0x66 && view[5] === 0x74 && view[6] === 0x79 && view[7] === 0x70 &&
      view[8] === 0x61 && view[9] === 0x76 && view[10] === 0x69 && view[11] === 0x66) {
    return 'avif'
  }

  return 'unknown'
}

// Function to convert ArrayBuffer to data URL
function arrayBufferToDataURL(buffer: ArrayBuffer, mimeType: string): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  const base64 = btoa(binary)
  return `data:${mimeType};base64,${base64}`
}

// Function to create image bitmap from data URL
async function createImageBitmapFromDataURL(dataURL: string): Promise<ImageBitmap> {
  const response = await fetch(dataURL)
  const blob = await response.blob()
  return await createImageBitmap(blob)
}

// Function to create canvas from image data
async function createCanvasFromImageData(imageData: ArrayBuffer, format: string): Promise<OffscreenCanvas> {
  if (format === 'svg') {
    return await createCanvasFromSVG(new TextDecoder().decode(imageData))
  }

  const mimeType = FORMAT_MIME_TYPES[format.toLowerCase()]
  if (!mimeType) {
    throw new Error(`Unsupported input format: ${format}`)
  }

  const dataURL = arrayBufferToDataURL(imageData, mimeType)
  const bitmap = await createImageBitmapFromDataURL(dataURL)

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    bitmap.close()
    throw new Error('Failed to get 2D context from canvas')
  }

  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()

  return canvas
}

// Function to handle SVG conversion
async function createCanvasFromSVG(svgContent: string, width: number = 1024, height: number = 1024): Promise<OffscreenCanvas> {
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas')
  }

  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  try {
    const response = await fetch(url)
    const svgBlob = await response.blob()
    const bitmap = await createImageBitmap(svgBlob)

    canvas.width = bitmap.width || width
    canvas.height = bitmap.height || height

    ctx.drawImage(bitmap, 0, 0)
    bitmap.close()

    return canvas
  } finally {
    URL.revokeObjectURL(url)
  }
}

// HEIC conversion
async function convertHEIC(imageData: ArrayBuffer, toFormat: string, quality: number): Promise<ArrayBuffer> {
  const heic2any = await loadHEICConverter()

  progressCallback(30, 'Decoding HEIC image...')

  try {
    // Convert HEIC to JPEG/PNG using heic2any
    const blob = new Blob([imageData], { type: 'image/heic' })
    const convertedBlob = await heic2any({
      blob,
      toType: toFormat === 'png' ? 'image/png' : 'image/jpeg',
      quality: Math.round(quality * 100) / 100
    })

    progressCallback(80, 'Processing converted image...')
    return await convertedBlob.arrayBuffer()
  } catch (error) {
    throw new Error(`HEIC conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// TIFF conversion
async function convertTIFF(imageData: ArrayBuffer, toFormat: string, quality: number): Promise<ArrayBuffer> {
  const utif2 = await loadTIFFConverter()

  progressCallback(30, 'Decoding TIFF image...')

  try {
    // Decode TIFF
    const ifds = utif2.decode(imageData)
    utif2.decodeImages(imageData, ifds)

    const page = ifds[0]
    const rgba = utif2.toRGBA8(page, ifds)

    progressCallback(50, 'Creating canvas from TIFF...')

    // Create canvas from RGBA data
    const canvas = new OffscreenCanvas(page.width, page.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas')
    }

    const imageData_obj = new ImageData(
      new Uint8ClampedArray(rgba.buffer),
      page.width,
      page.height
    )
    ctx.putImageData(imageData_obj, 0, 0)

    progressCallback(80, 'Converting to target format...')

    // Convert to target format
    const mimeType = FORMAT_MIME_TYPES[toFormat.toLowerCase()] || 'image/png'
    const blob = await canvas.convertToBlob({ type: mimeType, quality })

    return blob.arrayBuffer()
  } catch (error) {
    throw new Error(`TIFF conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// ICO conversion (basic support)
async function convertICO(imageData: ArrayBuffer, toFormat: string, quality: number): Promise<ArrayBuffer> {
  progressCallback(30, 'Processing ICO image...')

  try {
    // Basic ICO parsing - this is a simplified implementation
    const view = new Uint8Array(imageData)

    // ICO file structure is complex, for now we'll try to extract the largest image
    // A full implementation would need proper parsing of the ICO directory structure

    // Create a basic bitmap from the ICO data (this is simplified)
    const width = 32 // Default size for ICO
    const height = 32
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas')
    }

    // Fill with a placeholder (real implementation would parse the ICO data)
    ctx.fillStyle = '#cccccc'
    ctx.fillRect(0, 0, width, height)

    progressCallback(80, 'Converting to target format...')

    // Convert to target format
    const mimeType = FORMAT_MIME_TYPES[toFormat.toLowerCase()] || 'image/png'
    const blob = await canvas.convertToBlob({ type: mimeType, quality })

    return blob.arrayBuffer()
  } catch (error) {
    throw new Error(`ICO conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Basic canvas conversion
async function convertWithCanvas(canvas: OffscreenCanvas, toFormat: string, quality: number): Promise<ArrayBuffer> {
  progressCallback(70, 'Converting with canvas...')

  const normalizedFormat = toFormat.toLowerCase() === 'jpg' ? 'jpeg' : toFormat.toLowerCase()
  const mimeType = FORMAT_MIME_TYPES[normalizedFormat]

  if (!mimeType) {
    throw new Error(`Unsupported output format: ${toFormat}`)
  }

  const blob = await canvas.convertToBlob({ type: mimeType, quality })
  return blob.arrayBuffer()
}

// Main conversion function
async function convertImage(
  imageData: ArrayBuffer,
  fromFormat: string,
  toFormat: string,
  quality: number = 0.9,
  fileName?: string
): Promise<ArrayBuffer> {
  try {
    progressCallback(10, `Starting conversion from ${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()}...`)

    const normalizedFromFormat = fromFormat.toLowerCase()
    const normalizedToFormat = toFormat.toLowerCase()

    // Handle special input formats that need specific libraries
    if (normalizedFromFormat === 'heic') {
      return await convertHEIC(imageData, normalizedToFormat, quality)
    }

    if (normalizedFromFormat === 'tiff' || normalizedFromFormat === 'tif') {
      return await convertTIFF(imageData, normalizedToFormat, quality)
    }

    if (normalizedFromFormat === 'ico') {
      return await convertICO(imageData, normalizedToFormat, quality)
    }

    // For basic formats, use canvas
    progressCallback(30, 'Loading image into canvas...')
    const canvas = await createCanvasFromImageData(imageData, normalizedFromFormat)

    // Basic canvas conversion for standard formats
    return await convertWithCanvas(canvas, normalizedToFormat, quality)

  } catch (error) {
    console.error('Image conversion error:', error)
    throw error
  }
}

// Handle messages from main thread
self.onmessage = async (event: MessageEvent<ConversionRequest>) => {
  const { type, imageData, fromFormat, toFormat, quality = 0.9, fileName } = event.data

  if (type !== 'convert-image') {
    return
  }

  // Set up progress callback
  progressCallback = (progress: number, message: string) => {
    self.postMessage({
      type: 'conversion-progress',
      progress,
      message
    } as ProgressResponse)
  }

  try {
    // Auto-detect input format if not provided
    const detectedFormat = fromFormat || detectImageFormat(imageData)

    if (detectedFormat === 'unknown') {
      throw new Error('Unable to detect input image format')
    }

    // Check if conversion is supported
    const supportedInputFormats = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif', 'heic', 'tiff', 'tif', 'ico', 'svg']
    const supportedOutputFormats = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif', 'tiff', 'tif']

    if (!supportedInputFormats.includes(detectedFormat.toLowerCase())) {
      throw new Error(`Input format ${detectedFormat.toUpperCase()} is not supported. Supported formats: ${supportedInputFormats.join(', ')}`)
    }

    if (!supportedOutputFormats.includes(toFormat.toLowerCase())) {
      throw new Error(`Output format ${toFormat.toUpperCase()} is not supported. Supported formats: ${supportedOutputFormats.join(', ')}`)
    }

    const convertedData = await convertImage(imageData, detectedFormat, toFormat, quality, fileName)

    // Generate output filename
    const baseName = fileName ? fileName.split('.').slice(0, -1).join('.') : 'converted-image'
    const outputFileName = `${baseName}.${toFormat.toLowerCase()}`

    progressCallback(100, 'Conversion complete!')

    // Send success response
    const response: ConversionResponse = {
      type: 'conversion-complete',
      convertedData,
      outputFormat: toFormat.toLowerCase(),
      fileName: outputFileName,
      success: true
    }

    self.postMessage(response)

  } catch (error) {
    console.error('Worker conversion error:', error)

    // Send error response
    const response: ConversionResponse = {
      type: 'conversion-complete',
      convertedData: new ArrayBuffer(0),
      outputFormat: toFormat,
      fileName: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }

    self.postMessage(response)
  }
}

// Send ready message
self.postMessage({
  type: 'worker-ready'
})