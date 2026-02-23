# Image Resizer Utilities

This module provides comprehensive utilities for image resizing, dimension calculation, and image data extraction for processing.

## Installation

```typescript
import {
  resizeAndGetImageData,
  getImageResizeDimensions,
  validateResizeImageFile,
  validateResizeImageFiles,
  createResizedImage,
  getAspectRatio,
  calculateResizedDimensions,
  IMAGE_DIMENSION_PRESETS,
  type ImageDataInput,
  type ResizeImageDimensions,
  type ImageDimensionPreset
} from '@/utils/image-tools';
```

## Core Types

### ImageDataInput

```typescript
interface ImageDataInput {
  data: Uint8ClampedArray;  // Raw pixel data
  width: number;           // Image width in pixels
  height: number;          // Image height in pixels
}
```

### ResizeImageDimensions

```typescript
interface ResizeImageDimensions {
  width: number;
  height: number;
}
```

## Presets

### IMAGE_DIMENSION_PRESETS

Predefined dimension presets for common use cases:

```typescript
const IMAGE_DIMENSION_PRESETS = {
  WEB: { name: 'Web', width: 800, height: 600 },
  STANDARD: { name: 'Standard', width: 1280, height: 720 },
  HD: { name: 'HD', width: 1920, height: 1080 },
  FULL_HD: { name: 'Full HD', width: 1920, height: 1080 },
  FOUR_K: { name: '4K', width: 3840, height: 2160 },
  THUMBNAIL: { name: 'Thumbnail', width: 150, height: 150 },
  MEDIUM: { name: 'Medium', width: 500, height: 500 },
  LARGE: { name: 'Large', width: 1024, height: 1024 }
} as const;
```

## Main Functions

### resizeAndGetImageData()

Resizes an image file and extracts raw pixel data for processing. This is the core function for converting files to processable ImageData.

```typescript
const imageData = await resizeAndGetImageData(file, 1920);
console.log(`Resized to: ${imageData.width}x${imageData.height}`);
console.log(`Pixel data length: ${imageData.data.length}`);
```

**Parameters:**
- `file: File` - The image file to process
- `maxWidthOrHeight?: number` - Maximum dimension (maintains aspect ratio)

**Returns:** `Promise<ImageDataInput>`

**Use Cases:**
- Preparing images for compression algorithms
- Converting to WebWorker-compatible format
- Extracting pixel data for analysis
- Creating consistent dimensions for batch processing

### createResizedImage()

Creates a resized version of an image file as a blob.

```typescript
const resizedBlob = await createResizedImage(
  file,
  1920,
  'image/webp',
  0.9
);

// Download the resized image
const url = URL.createObjectURL(resizedBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'resized-image.webp';
a.click();
URL.revokeObjectURL(url);
```

**Parameters:**
- `file: File` - Image file to resize
- `maxWidthOrHeight: number` - Maximum dimension
- `outputFormat?: string` - Output format (defaults to original)
- `quality?: number` - Quality for lossy formats (0-1, defaults to 0.9)

**Returns:** `Promise<Blob>`

### getImageResizeDimensions()

Gets the dimensions of an image file without fully loading it.

```typescript
const dimensions = await getImageResizeDimensions(file);
console.log(`Original dimensions: ${dimensions.width}x${dimensions.height}`);
```

**Parameters:**
- `file: File` - Image file to check

**Returns:** `Promise<ResizeImageDimensions>`

## Utility Functions

### calculateResizedDimensions()

Calculates new dimensions while maintaining aspect ratio.

```typescript
const newDimensions = calculateResizedDimensions(
  4000, // original width
  3000, // original height
  1920, // maxWidth
  1080  // maxHeight
);

console.log(`New dimensions: ${newDimensions.width}x${newDimensions.height}`);
```

**Parameters:**
- `originalWidth: number` - Original width
- `originalHeight: number` - Original height
- `maxWidth?: number` - Maximum width constraint
- `maxHeight?: number` - Maximum height constraint

**Returns:** `ResizeImageDimensions`

### getAspectRatio()

Calculates and formats aspect ratio.

```typescript
const aspectRatio = getAspectRatio(1920, 1080);
console.log(aspectRatio); // "16:9"

const squareRatio = getAspectRatio(1000, 1000);
console.log(squareRatio); // "1:1"
```

**Parameters:**
- `width: number` - Image width
- `height: number` - Image height

**Returns:** `string` - Formatted aspect ratio (e.g., "16:9", "4:3")

### validateResizeImageFile()

Validates if a file is a supported image format.

```typescript
const isValid = validateResizeImageFile(file);
if (!isValid) {
  console.error('Unsupported file format');
}
```

**Supported Formats:**
- JPEG (image/jpeg, image/jpg)
- PNG (image/png)
- WebP (image/webp)
- AVIF (image/avif)
- GIF (image/gif)
- BMP (image/bmp)
- TIFF (image/tiff)

### validateResizeImageFiles()

Validates multiple image files.

```typescript
const validation = validateResizeImageFiles(fileList);
if (validation.invalid.length > 0) {
  console.error('Invalid files:', validation.invalid);
  console.error('Errors:', validation.errors);
} else {
  console.log(`All ${validation.valid.length} files are valid`);
}
```

**Returns:**
```typescript
{
  valid: File[];
  invalid: File[];
  errors: string[];
}
```

## Usage Examples

### Basic Image Resizing

```typescript
import { resizeAndGetImageData, IMAGE_DIMENSION_PRESETS } from '@/utils/image-tools';

async function resizeForWeb(file: File) {
  try {
    // Resize to web dimensions
    const imageData = await resizeAndGetImageData(
      file,
      IMAGE_DIMENSION_PRESETS.WEB.width
    );

    console.log(`Resized to ${imageData.width}x${imageData.height}`);

    // Use imageData for compression, analysis, or other processing
    return imageData;

  } catch (error) {
    console.error('Resize failed:', error.message);
    throw error;
  }
}
```

### Batch Image Resizing

```typescript
import {
  validateResizeImageFiles,
  getImageResizeDimensions,
  calculateResizedDimensions,
  createResizedImage
} from '@/utils/image-tools';

async function batchResize(files: File[], targetWidth: number) {
  // Validate all files first
  const validation = validateResizeImageFiles(files);
  if (validation.invalid.length > 0) {
    throw new Error(`Invalid files: ${validation.errors.join(', ')}`);
  }

  const results = [];

  for (const file of validation.valid) {
    try {
      // Get original dimensions
      const original = await getImageResizeDimensions(file);

      // Calculate new dimensions
      const resized = calculateResizedDimensions(
        original.width,
        original.height,
        targetWidth
      );

      // Create resized image
      const blob = await createResizedImage(file, targetWidth);

      results.push({
        originalFile: file,
        originalDimensions: original,
        newDimensions: resized,
        resizedBlob: blob
      });

    } catch (error) {
      console.error(`Failed to resize ${file.name}:`, error);
      results.push({
        originalFile: file,
        error: error.message
      });
    }
  }

  return results;
}
```

### Smart Image Resizing

```typescript
import {
  getImageResizeDimensions,
  calculateResizedDimensions,
  createResizedImage,
  getAspectRatio
} from '@/utils/image-tools';

async function smartResize(file: File, maxDimension: number) {
  // Get original dimensions
  const original = await getImageResizeDimensions(file);
  const aspectRatio = getAspectRatio(original.width, original.height);

  // Check if resizing is needed
  if (original.width <= maxDimension && original.height <= maxDimension) {
    console.log('Image is already small enough');
    return { file, resized: false, dimensions: original };
  }

  // Calculate optimal dimensions
  const newDimensions = calculateResizedDimensions(
    original.width,
    original.height,
    maxDimension
  );

  console.log(`Resizing from ${original.width}x${original.height} to ${newDimensions.width}x${newDimensions.height}`);
  console.log(`Maintaining aspect ratio: ${aspectRatio}`);

  // Create resized image
  const resizedBlob = await createResizedImage(
    file,
    maxDimension,
    undefined, // Keep original format
    0.95       // High quality
  );

  return {
    file,
    resized: true,
    originalDimensions: original,
    newDimensions,
    aspectRatio,
    resizedBlob
  };
}
```

### Multi-Size Image Generation

```typescript
import {
  createResizedImage,
  IMAGE_DIMENSION_PRESETS,
  type ImageDimensionPreset
} from '@/utils/image-tools';

async function generateMultipleSizes(file: File) {
  const sizes: ImageDimensionPreset[] = ['THUMBNAIL', 'MEDIUM', 'LARGE', 'HD'];
  const results = [];

  for (const preset of sizes) {
    const presetData = IMAGE_DIMENSION_PRESETS[preset];

    try {
      const blob = await createResizedImage(
        file,
        presetData.width,
        'image/jpeg',
        0.85
      );

      results.push({
        preset,
        name: presetData.name,
        dimensions: { width: presetData.width, height: presetData.height },
        blob,
        url: URL.createObjectURL(blob),
        size: blob.size
      });

    } catch (error) {
      console.error(`Failed to create ${preset} size:`, error);
    }
  }

  return results;
}

// Usage
const sizes = await generateMultipleSizes(originalFile);
console.log('Generated sizes:', sizes.map(s => `${s.name}: ${s.size} bytes`));
```

### Progressive Image Loading

```typescript
import { createResizedImage, IMAGE_DIMENSION_PRESETS } from '@/utils/image-tools';

async function createProgressiveImages(file: File) {
  // Create multiple versions for progressive loading
  const versions = [
    { name: 'tiny', size: 100, quality: 0.6 },
    { name: 'small', size: 300, quality: 0.7 },
    { name: 'medium', size: 800, quality: 0.8 },
    { name: 'large', size: 1920, quality: 0.9 }
  ];

  const progressiveImages = [];

  for (const version of versions) {
    try {
      const blob = await createResizedImage(
        file,
        version.size,
        'image/webp',
        version.quality
      );

      progressiveImages.push({
        name: version.name,
        size: version.size,
        blob,
        url: URL.createObjectURL(blob),
        fileSize: blob.size
      });

    } catch (error) {
      console.error(`Failed to create ${version.name} version:`, error);
    }
  }

  // Sort by file size for progressive loading
  return progressiveImages.sort((a, b) => a.fileSize - b.fileSize);
}
```

## Performance Considerations

### Memory Management

```typescript
import { resizeAndGetImageData } from '@/utils/image-tools';

async function memoryEfficientResize(file: File) {
  try {
    // This function handles memory cleanup automatically
    const imageData = await resizeAndGetImageData(file, 1920);

    // Process the image data
    const result = await processImageData(imageData);

    // No manual cleanup needed for resizeAndGetImageData
    return result;

  } catch (error) {
    console.error('Resize failed:', error);
    throw error;
  }
}
```

### Large Image Handling

```typescript
async function handleLargeImages(file: File) {
  const MAX_SIZE = 4000; // Prevent processing extremely large images

  try {
    const dimensions = await getImageResizeDimensions(file);

    if (dimensions.width > MAX_SIZE || dimensions.height > MAX_SIZE) {
      console.log('Image is very large, using progressive resize');

      // First resize to a manageable size
      const intermediate = await createResizedImage(file, MAX_SIZE);

      // Then process to final size
      const finalSize = Math.min(dimensions.width, dimensions.height, 1920);
      const finalImageData = await resizeAndGetImageData(
        new File([intermediate], file.name, { type: file.type }),
        finalSize
      );

      return finalImageData;
    }

    return await resizeAndGetImageData(file);

  } catch (error) {
    console.error('Failed to handle large image:', error);
    throw error;
  }
}
```

## Error Handling

```typescript
import {
  resizeAndGetImageData,
  validateResizeImageFile
} from '@/utils/image-tools';

async function safeResize(file: File, maxSize: number) {
  try {
    // Validate file first
    if (!validateResizeImageFile(file)) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    // Check file size (prevent memory issues)
    if (file.size > 50 * 1024 * 1024) { // 50MB
      throw new Error('File too large for processing');
    }

    const imageData = await resizeAndGetImageData(file, maxSize);

    if (!imageData || imageData.data.length === 0) {
      throw new Error('Failed to extract image data');
    }

    return imageData;

  } catch (error) {
    console.error('Image resize error:', error.message);

    // Provide user-friendly error messages
    if (error.message.includes('canvas')) {
      throw new Error('Failed to process image. The file may be corrupted.');
    } else if (error.message.includes(' FileReader')) {
      throw new Error('Failed to read image file. Please try again.');
    } else {
      throw error;
    }
  }
}
```

## Integration Examples

### With Compression Utils

```typescript
import {
  resizeAndGetImageData,
  calculateResizedDimensions
} from '@/utils/image-tools';

import {
  compressImageData
} from '@/utils/image-tools';

async function resizeAndCompress(file: File, maxSize: number, quality: number) {
  // Resize first
  const imageData = await resizeAndGetImageData(file, maxSize);

  // Then compress
  const compressed = await compressImageData(imageData, {
    quality,
    outputFormat: 'image/webp'
  });

  return compressed;
}
```

### With Bulk Processing

```typescript
import {
  createBulkImageFiles,
  processBulkImages
} from '@/utils/image-tools';

import {
  resizeAndGetImageData
} from '@/utils/image-tools';

async function bulkResize(files: File[], targetSize: number) {
  const imageFiles = createBulkImageFiles(files);

  return await processBulkImages(
    imageFiles,
    async (file, onProgress) => {
      const imageData = await resizeAndGetImageData(file.file, targetSize);

      return {
        processedData: imageData,
        metadata: {
          originalSize: file.originalSize,
          newDimensions: { width: imageData.width, height: imageData.height }
        }
      };
    }
  );
}
```