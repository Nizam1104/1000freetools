# Image Tools Utilities

This directory contains modular utility functions for image processing, including image format conversion, image-to-PDF conversion, image compression, bulk processing, and ZIP file creation. These utilities are designed to be reusable across different tools and components in your application.

## Features

### Core Features
- **Image Format Conversion**: Convert between different image formats (JPG, PNG, WebP, BMP, GIF, AVIF, TIFF, etc.)
- **Image to PDF Conversion**: Convert single or multiple images to PDF files
- **Flexible Options**: Customize page size, orientation, quality, and margins

### New Modularized Features
- **Image Resizing**: Resize images while maintaining aspect ratio, extract pixel data for processing
- **Image Compression**: Advanced compression with quality control and intelligent analysis
- **Background Removal**: AI-powered background removal with multiple presets and progress tracking
- **Bulk Processing**: Process multiple images with progress tracking and error handling
- **Progress Tracking**: Built-in progress callbacks for long-running operations
- **File Validation**: Validate image files before processing
- **ZIP Creation**: Bundle multiple processed files into a single ZIP file with summaries
- **Memory Management**: Proper cleanup of temporary resources
- **Batch Processing**: Convert multiple files concurrently with control over concurrency

## Installation

Simply import the functions you need from the utils directory:

```typescript
import {
  // Core functionality
  convertImagesToPdf,
  convertImageFile,
  createZipFile,

  // New modularized utilities
  resizeAndGetImageData,
  createResizedImage,
  calculateResizedDimensions,

  processBulkImages,
  downloadProcessedImagesAsZip,
  calculateProcessingStats,

  compressImageData,
  analyzeCompressionPotential,
  getCompressionPreset,

  // Background removal
  loadBackgroundImageData,
  validateBackgroundImageFile,
  removeImageBackground,
  processBackgroundRemoval,
  downloadProcessedImage,
  extractImageMetadata,
  analyzeImageForBackgroundRemoval,

  // File operations
  validateImageFile,
  formatFileSize,

  // Types
  type ProcessedImageFile,
  type CompressionOptions,
  type ImageDataInput,
  type ProcessingProgress,
  type BackgroundRemovalOptions,
  type BackgroundRemovalResult
} from '@/utils/image-tools'
```

## Quick Start Examples

### Basic Image Resizing and Compression

```typescript
import {
  resizeAndGetImageData,
  compressImageData,
  createResizedImage
} from '@/utils/image-tools';

// Resize and compress an image
async function processImage(file: File) {
  // Resize to max 1920px
  const imageData = await resizeAndGetImageData(file, 1920);

  // Compress with 75% quality
  const compressed = await compressImageData(imageData, {
    quality: 0.75,
    outputFormat: 'image/webp'
  });

  return compressed;
}
```

### Bulk Processing

```typescript
import {
  createBulkImageFiles,
  processBulkImages,
  downloadProcessedImagesAsZip
} from '@/utils/image-tools';

// Process multiple images
async function processMultipleImages(files: File[]) {
  const imageFiles = createBulkImageFiles(files, 25);

  const processedFiles = await processBulkImages(
    imageFiles,
    async (file, onProgress) => {
      // Your processing logic here
      const result = await processSingleImage(file.file);
      onProgress(100);
      return { processedData: result };
    }
  );

  // Download as ZIP
  await downloadProcessedImagesAsZip(processedFiles, 'image/webp');
}
```

### Background Removal

```typescript
import {
  validateBackgroundImageFile,
  processBackgroundRemoval,
  downloadProcessedImage,
  getBackgroundRemovalPreset
} from '@/utils/image-tools';

// Remove background with preset
async function removeBackground(file: File) {
  // Validate file
  const validation = validateBackgroundImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Use preset for optimal settings
  const options = getBackgroundRemovalPreset('PRODUCT_PHOTO', {
    onProgress: (status, progress) => {
      console.log(`${status}: ${progress}%`);
    }
  });

  // Process background removal
  const result = await processBackgroundRemoval(file, options);

  // Download result
  downloadProcessedImage(result.url, file.name);

  return result;
}
```

## Image Format Conversion Functions

### `convertImageFile(file, toFormat, options?)`

Convert a single image file to the specified format.

**Parameters:**
- `file`: File object to convert
- `toFormat`: Target format (e.g., 'png', 'jpg', 'webp')
- `options`: Conversion options including quality and progress callback

**Returns:** Promise<ImageConversionResult>

### `convertMultipleImageFiles(files, toFormat, options?)`

Convert multiple image files with concurrent processing.

**Parameters:**
- `files`: Array of File objects
- `toFormat`: Target format
- `options`: Conversion options with concurrency control

**Returns:** Promise<ImageConversionResult[]>

### `downloadConvertedImage(file, toFormat, options?)`

Convert and download a single image file.

**Parameters:**
- `file`: File object to convert
- `toFormat`: Target format
- `options`: Conversion options

**Returns:** Promise<boolean> indicating success

### `downloadConvertedImagesAsZip(files, toFormat, options?)`

Convert multiple images and download as ZIP file.

**Parameters:**
- `files`: Array of File objects
- `toFormat`: Target format
- `options`: Conversion and ZIP options

**Returns:** Promise<boolean> indicating success

### `validateImageFile(file)`

Check if a file is a valid image supported for conversion.

**Parameters:**
- `file`: File object to validate

**Returns:** boolean

### `getAvailableOutputFormats(files)`

Get list of available output formats for the given files.

**Parameters:**
- `files`: Array of File objects

**Returns:** Array of format objects with value, label, and description

### `detectFormatFromFile(file)`

Detect the image format from a file object.

**Parameters:**
- `file`: File object

**Returns:** string (format name)

## Image to PDF Conversion Functions

### `convertImagesToPdf(files, options, onProgress?)`

Convert images to PDF(s) based on conversion mode.

**Parameters:**
- `files`: Array of ImageFile objects
- `options`: ImageToPdfOptions configuration
- `onProgress`: Optional progress callback function

**Returns:** Promise<ConversionResult[]>

### `createImageFiles(files)`

Convert File objects to ImageFile objects with preview URLs.

**Parameters:**
- `files`: Array of File objects

**Returns:** ImageFile[]

### `validateImageFiles(files)`

Filter and validate that files are images.

**Parameters:**
- `files`: Array of File objects

**Returns:** File[] (filtered to only valid images)

### `formatFileSize(bytes)`

Format file size for human-readable display.

**Parameters:**
- `bytes`: Number of bytes

**Returns:** Formatted string (e.g., "1.5 MB")

## Configuration Options

### Image Conversion Options

```typescript
interface ImageConversionOptions {
  quality?: number                 // Image quality (0-1)
  onProgress?: (progress: number, message: string) => void  // Progress callback
  maxConcurrent?: number          // Maximum concurrent conversions (default: 3)
  delayBetween?: number           // Delay between batches in ms (default: 100)
}
```

### Image to PDF Options

```typescript
interface ImageToPdfOptions {
  mode: 'single' | 'individual'    // Convert to single PDF or individual PDFs
  pageSize: 'a4' | 'letter' | 'legal'  // Page size
  orientation: 'portrait' | 'landscape'  // Page orientation
  quality: number                  // Image quality (0-1)
  margin: number                   // Page margins in mm
}
```

## Usage Examples

### Image Format Conversion

```typescript
import {
  convertImageFile,
  convertMultipleImageFiles,
  downloadConvertedImage,
  validateImageFile
} from '@/utils/image-tools'

// Convert a single image
async function convertSingleImage(file: File) {
  if (!validateImageFile(file)) {
    throw new Error('Invalid image file')
  }

  const result = await convertImageFile(file, 'webp', {
    quality: 0.9,
    onProgress: (progress, message) => {
      console.log(`Progress: ${progress}% - ${message}`)
    }
  })

  if (result.success) {
    return result.data // Blob
  } else {
    throw new Error(result.error)
  }
}

// Convert multiple images
async function batchConversion(files: File[]) {
  const validFiles = files.filter(validateImageFile)

  const results = await convertMultipleImageFiles(validFiles, 'png', {
    quality: 0.95,
    maxConcurrent: 2,
    onProgress: (progress, message) => {
      console.log(`Batch progress: ${progress}%`)
    }
  })

  return results
}

// Convert and download
async function convertAndDownload(file: File) {
  const success = await downloadConvertedImage(file, 'jpg', {
    quality: 0.85
  })

  console.log('Download successful:', success)
}
```

### Image to PDF Conversion

```typescript
import { convertImagesToPdf, createImageFiles, validateImageFiles } from '@/utils/image-tools'

async function convertImages(imageFiles: File[]) {
  // Validate files
  const validImages = validateImageFiles(imageFiles)

  // Create image file objects
  const imageFileObjects = createImageFiles(validImages)

  // Convert to single PDF
  const results = await convertImagesToPdf(
    imageFileObjects,
    DEFAULT_IMAGE_TO_PDF_OPTIONS,
    (current, total, progress) => {
      console.log(`Progress: ${progress}%`)
    }
  )

  return results[0].blob
}
```

### Custom Configuration

```typescript
import { convertImagesToPdf, DEFAULT_IMAGE_TO_PDF_OPTIONS } from '@/utils/image-tools'

const customOptions = {
  ...DEFAULT_IMAGE_TO_PDF_OPTIONS,
  mode: 'individual' as const,
  pageSize: 'letter' as const,
  orientation: 'landscape' as const,
  quality: 0.95,
  margin: 15
}

const results = await convertImagesToPdf(imageFiles, customOptions)
```

### ZIP Creation for Multiple Files

```typescript
import { createAndDownloadZip } from '@/utils/image-tools'

// After converting to individual PDFs
if (results.length > 1) {
  await createAndDownloadZip(
    results.map(result => ({ name: result.name, blob: result.blob })),
    {
      zipName: 'converted-images.zip',
      onComplete: (success) => console.log('ZIP created:', success)
    }
  )
}
```

## Reusable Converter Class

For more complex scenarios, you can use the provided converter class:

```typescript
import { ImageToPdfConverter } from '@/utils/image-tools/examples'

const converter = new ImageToPdfConverter({
  mode: 'individual',
  pageSize: 'a4',
  quality: 0.9
})

converter.onProgress = (current, total, progress) => {
  console.log(`Processing: ${progress}%`)
}

const pdfBlobs = await converter.convert(imageFiles)
```

## Module Documentation

### Core Modules
- [Image to PDF](./image-to-pdf.md) - Convert images to PDF documents
- [Image Format Converter](./image-format-converter.md) - Convert between image formats
- [ZIP Utilities](./zip-utils.md) - Create and download ZIP files

### New Modularized Modules
- [Image Resizer](./IMAGE_RESIZER.md) - Image resizing, dimensions, and pixel data extraction
- [Bulk Processing](./BULK_PROCESSING.md) - Bulk image processing with progress tracking
- [Compression Utilities](./COMPRESSION_UTILITIES.md) - Image compression and analysis
- [Background Removal](./BACKGROUND_REMOVAL.md) - AI-powered background removal with presets

## Architecture Benefits

### Reusability
- Functions are modularized and can be used across different tools
- Consistent API patterns across all utilities
- TypeScript support with comprehensive type definitions

### Performance
- Efficient memory management with automatic cleanup
- Transferable objects for large data handling
- Worker-based processing for CPU-intensive operations

### Progress Tracking
- Built-in progress callbacks for long-running operations
- Bulk processing with individual item progress
- ZIP creation progress tracking

### Error Handling
- Comprehensive error handling with meaningful messages
- Validation utilities for input data
- Graceful degradation for unsupported formats

## Common Patterns

### Error Handling Pattern
```typescript
import { validateResizeImageFile } from '@/utils/image-tools';

async function safeOperation(file: File) {
  try {
    // Validate first
    if (!validateResizeImageFile(file)) {
      throw new Error('Invalid file format');
    }

    // Process
    const result = await someImageOperation(file);
    return result;

  } catch (error) {
    console.error('Operation failed:', error.message);
    throw error;
  }
}
```

### Progress Tracking Pattern
```typescript
import { processBulkImages } from '@/utils/image-tools';

const results = await processBulkImages(
  files,
  processor,
  {
    onProgress: (progress) => {
      updateUI(progress.percentage, progress.currentItem);
    },
    onItemComplete: (item) => {
      showSuccess(item.file.name);
    },
    onError: (error, item) => {
      showError(`${item.file.name}: ${error.message}`);
    }
  }
);
```

### Cleanup Pattern
```typescript
import { cleanupBulkImageFiles } from '@/utils/image-tools';

// Cleanup on component unmount
React.useEffect(() => {
  return () => {
    cleanupBulkImageFiles(processedFiles);
  };
}, [processedFiles]);
```

## File Structure

```
utils/image-tools/
├── index.ts                          # Main exports
├── image-format-converter.ts         # Core image format conversion functionality
├── image-format-converter-examples.ts # Usage examples for image conversion
├── image-to-pdf.ts                   # Core image-to-pdf functionality
├── zip-utils.ts                      # ZIP file creation utilities
├── examples.ts                       # Usage examples and converter class
├── image-resizer.ts                  # NEW: Image resizing and dimension utilities
├── bulk-image-processor.ts           # NEW: Bulk processing with progress tracking
├── compression-utils.ts              # NEW: Image compression and analysis
├── background-remover.ts             # NEW: Background removal with AI
├── README.md                         # This documentation
├── IMAGE_RESIZER.md                  # Image resizer documentation
├── BULK_PROCESSING.md                # Bulk processing documentation
├── COMPRESSION_UTILITIES.md          # Compression utilities documentation
└── BACKGROUND_REMOVAL.md             # Background removal documentation
```

## Supported Image Formats

### Input Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- WebP (.webp)
- AVIF (.avif)
- SVG (.svg)
- TIFF (.tiff, .tif)
- ICO (.ico)
- HEIC (.heic)

### Output Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- WebP (.webp)
- AVIF (.avif)
- TIFF (.tiff, .tif)

## Memory Management

The utilities automatically handle:

- Preview URL cleanup when images are removed
- Proper disposal of temporary resources
- Memory-efficient processing for large files

## Error Handling

All functions include proper error handling:

```typescript
try {
  const results = await convertImagesToPdf(files, options)
  // Handle success
} catch (error) {
  console.error('Conversion failed:', error)
  // Handle error
}
```

## Browser Compatibility

These utilities work in all modern browsers that support:

- File API
- Blob API
- Canvas API (for image processing)
- Web Workers (for ZIP creation)

## Dependencies

- jsPDF: For PDF generation
- jszip: For ZIP file creation (via web worker)

## Performance Considerations

- Large images are processed efficiently with proper memory management
- Progress callbacks allow for responsive UI updates
- Web Workers handle CPU-intensive tasks without blocking the main thread