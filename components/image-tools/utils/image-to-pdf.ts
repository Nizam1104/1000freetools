export interface ImageToPdfOptions {
  mode: 'single' | 'individual'
  pageSize: 'a4' | 'letter' | 'legal'
  orientation: 'portrait' | 'landscape'
  quality: number
  margin: number
}

export interface ImageFile {
  id: string
  name: string
  size: number
  file: File
  preview?: string
}

export interface ConversionResult {
  name: string
  blob: Blob
}

export interface ImageDimensions {
  width: number
  height: number
}

/**
 * Convert a file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Get image dimensions from a data URL
 */
export function getImageDimensions(dataUrl: string): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

/**
 * Create a PDF from one or more images
 */
export async function createPdfFromImages(
  files: ImageFile[],
  options: ImageToPdfOptions
): Promise<Blob> {
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.pageSize
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const usableWidth = pageWidth - (options.margin * 2)
  const usableHeight = pageHeight - (options.margin * 2)

  for (let i = 0; i < files.length; i++) {
    const currentFile = files[i]

    if (i > 0) {
      doc.addPage()
    }

    // Convert image to base64
    const base64Data = await fileToBase64(currentFile.file)
    const imageDataUrl = `data:${currentFile.file.type};base64,${base64Data}`

    // Get image dimensions
    const dimensions = await getImageDimensions(imageDataUrl)

    // Calculate fit dimensions maintaining aspect ratio
    const aspectRatio = dimensions.width / dimensions.height
    let imgWidth = usableWidth
    let imgHeight = usableWidth / aspectRatio

    if (imgHeight > usableHeight) {
      imgHeight = usableHeight
      imgWidth = usableHeight * aspectRatio
    }

    // Center the image
    const x = (pageWidth - imgWidth) / 2
    const y = (pageHeight - imgHeight) / 2

    // Add image to PDF
    const imgFormat = currentFile.file.type.includes('png') ? 'PNG' : 'JPEG'
    doc.addImage(imageDataUrl, imgFormat, x, y, imgWidth, imgHeight)
  }

  return new Blob([doc.output('blob')], { type: 'application/pdf' })
}

/**
 * Convert multiple images to PDF(s) based on conversion mode
 */
export async function convertImagesToPdf(
  files: ImageFile[],
  options: ImageToPdfOptions,
  onProgress?: (current: number, total: number, progress: number) => void
): Promise<ConversionResult[]> {
  if (files.length === 0) {
    throw new Error('No images provided for conversion')
  }

  const results: ConversionResult[] = []

  if (options.mode === 'single') {
    // Create a single PDF with all images
    onProgress?.(1, 1, 0)

    const pdfBlob = await createPdfFromImages(files, options)

    onProgress?.(1, 1, 100)

    results.push({
      name: 'images-to-pdf.pdf',
      blob: pdfBlob
    })
  } else {
    // Create individual PDFs for each image
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const progress = Math.round(((i + 1) / files.length) * 100)

      onProgress?.(i + 1, files.length, progress)

      const pdfBlob = await createPdfFromImages([file], options)

      const baseName = file.name.replace(/\.[^/.]+$/, '')
      results.push({
        name: `${baseName}.pdf`,
        blob: pdfBlob
      })
    }
  }

  return results
}

/**
 * Validate if files are valid images
 */
export function validateImageFiles(files: File[]): File[] {
  return files.filter(file => file.type.startsWith('image/'))
}

/**
 * Create ImageFile objects from File objects
 */
export function createImageFiles(files: File[]): ImageFile[] {
  return files.map(file => ({
    id: Math.random().toString(36).substring(2, 11),
    name: file.name,
    size: file.size,
    file,
    preview: URL.createObjectURL(file)
  }))
}

/**
 * Clean up preview URLs for ImageFiles
 */
export function cleanupImageFiles(files: ImageFile[]): void {
  files.forEach(file => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview)
    }
  })
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Default options for image to PDF conversion
 */
export const DEFAULT_IMAGE_TO_PDF_OPTIONS: ImageToPdfOptions = {
  mode: 'single',
  pageSize: 'a4',
  orientation: 'portrait',
  quality: 0.9,
  margin: 10
}