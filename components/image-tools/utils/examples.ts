/**
 * Example usage of the modular image-to-pdf utilities
 *
 * This file demonstrates how to use the image-to-pdf functions
 * in other parts of your application or tools.
 */

import {
  convertImagesToPdf,
  createImageFiles,
  validateImageFiles,
  formatFileSize,
  DEFAULT_IMAGE_TO_PDF_OPTIONS,
  createAndDownloadZip,
  type ImageToPdfOptions,
  type ImageFile
} from './index'

/**
 * Example 1: Convert images to a single PDF
 */
export async function convertToSinglePdf(imageFiles: File[]) {
  try {
    // Validate and create image file objects
    const validImages = validateImageFiles(imageFiles)
    const imageFileObjects = createImageFiles(validImages)

    // Use default options
    const options: ImageToPdfOptions = DEFAULT_IMAGE_TO_PDF_OPTIONS

    // Convert with progress tracking
    const results = await convertImagesToPdf(
      imageFileObjects,
      options,
      (current, total, progress) => {
        console.log(`Progress: ${progress}% (${current}/${total})`)
      }
    )

    return results[0] // Single PDF result
  } catch (error) {
    console.error('Error converting to PDF:', error)
    throw error
  }
}

/**
 * Example 2: Convert images to individual PDFs with custom options
 */
export async function convertToIndividualPdfs(imageFiles: File[]) {
  try {
    const validImages = validateImageFiles(imageFiles)
    const imageFileObjects = createImageFiles(validImages)

    // Custom options
    const options: ImageToPdfOptions = {
      mode: 'individual',
      pageSize: 'letter',
      orientation: 'landscape',
      quality: 0.95,
      margin: 15
    }

    const results = await convertImagesToPdf(
      imageFileObjects,
      options,
      (current, total, progress) => {
        console.log(`Processing ${current} of ${total} images: ${progress}%`)
      }
    )

    return results
  } catch (error) {
    console.error('Error converting to individual PDFs:', error)
    throw error
  }
}

/**
 * Example 3: Convert and download as ZIP for multiple individual PDFs
 */
export async function convertAndDownloadZip(imageFiles: File[]) {
  try {
    const results = await convertToIndividualPdfs(imageFiles)

    if (results.length > 1) {
      // Create and download ZIP file
      await createAndDownloadZip(
        results.map(result => ({ name: result.name, blob: result.blob })),
        {
          zipName: 'converted-images.zip',
          onComplete: (success) => {
            console.log('ZIP creation completed:', success)
          },
          onError: (error) => {
            console.error('ZIP creation failed:', error)
          }
        }
      )
    } else {
      // Download single file directly
      const { downloadFile } = await import('./index')
      downloadFile(results[0])
    }
  } catch (error) {
    console.error('Error in convert and download:', error)
    throw error
  }
}

/**
 * Example 4: Get file information for display
 */
export function getFileInfo(files: File[]) {
  const validImages = validateImageFiles(files)

  return {
    totalFiles: validImages.length,
    validFiles: validImages.length,
    invalidFiles: files.length - validImages.length,
    totalSize: files.reduce((sum, file) => sum + file.size, 0),
    formattedSize: formatFileSize(files.reduce((sum, file) => sum + file.size, 0)),
    supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  }
}

/**
 * Example 5: Create a reusable image-to-pdf converter class
 */
export class ImageToPdfConverter {
  private options: ImageToPdfOptions

  constructor(options: Partial<ImageToPdfOptions> = {}) {
    this.options = { ...DEFAULT_IMAGE_TO_PDF_OPTIONS, ...options }
  }

  async convert(images: File[]): Promise<Blob[]> {
    const validImages = validateImageFiles(images)
    const imageFileObjects = createImageFiles(validImages)

    const results = await convertImagesToPdf(
      imageFileObjects,
      this.options,
      (current, total, progress) => {
        this.onProgress?.(current, total, progress)
      }
    )

    return results.map(result => result.blob)
  }

  setOptions(newOptions: Partial<ImageToPdfOptions>) {
    this.options = { ...this.options, ...newOptions }
  }

  getOptions(): ImageToPdfOptions {
    return { ...this.options }
  }

  onProgress?: (current: number, total: number, progress: number) => void
}

// Usage example:
// const converter = new ImageToPdfConverter({ mode: 'individual', pageSize: 'a4' })
// converter.onProgress = (current, total, progress) => {
//   console.log(`Progress: ${progress}%`)
// }
// const pdfBlobs = await converter.convert(imageFiles)