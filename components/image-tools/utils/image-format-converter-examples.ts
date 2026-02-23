/**
 * Examples of using the image format converter utilities
 * This file demonstrates how to use the modularized image conversion functions
 */

import {
  convertImageFile,
  convertMultipleImageFiles,
  downloadConvertedImage,
  downloadConvertedImagesAsZip,
  validateImageFile,
  detectFormatFromFile,
  getAvailableOutputFormats,
  formatImageFileSize,
  createImagePreview,
  cleanupImagePreview
} from './index'

// Example 1: Basic single file conversion
export async function convertSingleImageExample(file: File, targetFormat: string) {
  // Validate the file is an image
  if (!validateImageFile(file)) {
    throw new Error('Invalid image file')
  }

  // Detect the input format
  const inputFormat = detectFormatFromFile(file)
  console.log(`Converting ${inputFormat} to ${targetFormat}`)

  // Convert the file with progress tracking
  const result = await convertImageFile(file, targetFormat, {
    quality: 0.9,
    onProgress: (progress, message) => {
      console.log(`Progress: ${progress}% - ${message}`)
    }
  })

  if (result.success && result.data) {
    console.log(`Conversion successful! File size: ${formatImageFileSize(result.data.size)}`)
    return result.data
  } else {
    throw new Error(result.error || 'Conversion failed')
  }
}

// Example 2: Batch conversion with concurrent processing
export async function convertMultipleImagesExample(files: File[], targetFormat: string) {
  // Filter and validate files
  const validFiles = files.filter(validateImageFile)
  console.log(`Processing ${validFiles.length} valid image files`)

  // Convert multiple files with concurrency control
  const results = await convertMultipleImageFiles(validFiles, targetFormat, {
    quality: 0.85,
    maxConcurrent: 3, // Process 3 files at a time
    delayBetween: 200, // Wait 200ms between batches
    onProgress: (progress, message) => {
      console.log(`Overall Progress: ${progress.toFixed(1)}% - ${message}`)
    }
  })

  // Check results
  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`Successfully converted ${successful.length} files`)
  if (failed.length > 0) {
    console.error(`Failed to convert ${failed.length} files:`)
    failed.forEach(result => {
      console.error(`- ${result.error}`)
    })
  }

  return results
}

// Example 3: Convert and download directly
export async function convertAndDownloadExample(file: File, targetFormat: string) {
  const success = await downloadConvertedImage(file, targetFormat, {
    quality: 0.95,
    onProgress: (progress, message) => {
      console.log(`Downloading progress: ${progress}% - ${message}`)
    }
  })

  if (success) {
    console.log('Image converted and downloaded successfully!')
  } else {
    console.error('Failed to convert and download image')
  }

  return success
}

// Example 4: Convert multiple files to ZIP
export async function convertToZipExample(files: File[], targetFormat: string) {
  const success = await downloadConvertedImagesAsZip(files, targetFormat, {
    quality: 0.9,
    zipFileName: `converted-${targetFormat}-images-${Date.now()}.zip`,
    onProgress: (progress, message) => {
      console.log(`ZIP creation progress: ${progress.toFixed(1)}% - ${message}`)
    }
  })

  if (success) {
    console.log('ZIP file created and downloaded successfully!')
  } else {
    console.error('Failed to create ZIP file')
  }

  return success
}

// Example 5: File information and validation
export function analyzeImageFiles(files: File[]) {
  const analysis = files.map(file => {
    const isValid = validateImageFile(file)
    const format = detectFormatFromFile(file)
    const size = formatImageFileSize(file.size)

    return {
      name: file.name,
      format,
      size,
      isValid,
      type: file.type
    }
  })

  // Group by format
  const byFormat = analysis.reduce((acc, file) => {
    if (!acc[file.format]) {
      acc[file.format] = []
    }
    acc[file.format].push(file)
    return acc
  }, {} as Record<string, typeof analysis>)

  console.log('File Analysis:')
  Object.entries(byFormat).forEach(([format, files]) => {
    console.log(`${format.toUpperCase()}: ${files.length} files`)
    files.forEach(file => {
      console.log(`  - ${file.name} (${file.size}) ${file.isValid ? '✓' : '✗'}`)
    })
  })

  return analysis
}

// Example 6: Get available conversion options
export function getConversionOptions(files: File[]) {
  const validFiles = files.filter(validateImageFile)
  const options = getAvailableOutputFormats(validFiles)

  console.log('Available output formats:')
  options.forEach(option => {
    console.log(`- ${option.label}: ${option.description}`)
  })

  return options
}

// Example 7: Create and manage image previews
export function manageImagePreviews(files: File[]) {
  const validFiles = files.filter(validateImageFile)
  const previews = validFiles.map(file => ({
    file,
    preview: createImagePreview(file),
    format: detectFormatFromFile(file)
  }))

  console.log(`Created ${previews.length} image previews`)

  // Remember to clean up previews when done
  return {
    previews,
    cleanup: () => {
      previews.forEach(preview => {
        cleanupImagePreview(preview.preview)
      })
      console.log('Cleaned up all previews')
    }
  }
}

// Example 8: Advanced conversion with custom options
export async function advancedConversionExample(file: File, options: {
  targetFormat: string
  quality?: number
  onProgress?: (progress: number, message: string) => void
}) {
  const { targetFormat, quality = 0.9, onProgress } = options

  // Pre-conversion validation
  if (!validateImageFile(file)) {
    throw new Error(`Invalid image file: ${file.name}`)
  }

  const inputFormat = detectFormatFromFile(file)
  console.log(`Starting conversion: ${inputFormat} → ${targetFormat}`)

  // Convert with detailed progress tracking
  const startTime = Date.now()

  const result = await convertImageFile(file, targetFormat, {
    quality,
    onProgress: (progress, message) => {
      console.log(`[${progress.toFixed(1)}%] ${message}`)
      onProgress?.(progress, message)
    }
  })

  const endTime = Date.now()
  const duration = endTime - startTime

  if (result.success && result.data) {
    console.log(`Conversion completed in ${duration}ms`)
    console.log(`Input size: ${formatImageFileSize(file.size)}`)
    console.log(`Output size: ${formatImageFileSize(result.data.size)}`)

    const compressionRatio = ((1 - result.data.size / file.size) * 100).toFixed(1)
    console.log(`Size reduction: ${compressionRatio}%`)

    return {
      data: result.data,
      fileName: result.fileName,
      duration,
      compressionRatio: parseFloat(compressionRatio)
    }
  } else {
    throw new Error(`Conversion failed: ${result.error}`)
  }
}

// Example usage in a component
export function usageExamples() {
  // These are examples of how you might use these functions in React components

  /*
  // In a React component:
  const handleFileUpload = async (files: File[]) => {
    try {
      // Analyze files
      analyzeImageFiles(files)

      // Get conversion options
      getConversionOptions(files)

      // Convert files
      const results = await convertMultipleImagesExample(files, 'webp')

      // Or convert and download
      await convertAndDownloadExample(files[0], 'png')

      // Or create a ZIP
      await convertToZipExample(files, 'jpg')

    } catch (error) {
      console.error('Conversion error:', error)
    }
  }
  */

  console.log('Image format converter examples loaded')
}