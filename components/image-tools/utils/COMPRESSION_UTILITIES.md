# Image Compression Utilities

This module provides reusable utilities for image compression operations, including single image compression, quality estimation, and compression analysis.

## Installation

```typescript
import {
  compressImage,
  compressImageData,
  createCompressionResult,
  validateCompressionOptions,
  getCompressionPreset,
  estimateQualityForTargetSize,
  analyzeCompressionPotential,
  COMPRESSION_PRESETS,
  type CompressionOptions,
  type CompressionResult,
  type CompressionProgress,
  type CompressionPreset
} from '@/utils/image-tools';
```

## Core Types

### CompressionOptions

```typescript
interface CompressionOptions {
  quality: number;        // 0.0 to 1.0
  maxWidthOrHeight?: number;  // Maximum dimension constraint
  outputFormat: string;  // e.g., 'image/jpeg', 'image/webp'
}
```

### CompressionResult

```typescript
interface CompressionResult {
  compressedBlob: Blob;
  compressedSize: number;
  originalSize: number;
  compressionRatio: number;
  savingsBytes: number;
  savingsPercentage: number;
}
```

### CompressionProgress

```typescript
interface CompressionProgress {
  percentage: number;
  stage: 'initializing' | 'processing' | 'finalizing' | 'completed';
}
```

## Main Functions

### compressImage()

Compresses a single image file using the web worker.

```typescript
const result = await compressImage(
  file,
  {
    quality: 0.75,
    outputFormat: 'image/webp',
    maxWidthOrHeight: 1920
  },
  (progress) => {
    console.log(`Progress: ${progress.percentage}% - ${progress.stage}`);
  }
);
```

**Parameters:**
- `file: File` - The image file to compress
- `options: CompressionOptions` - Compression settings
- `onProgress?: (progress: CompressionProgress) => void` - Optional progress callback

**Returns:** `Promise<CompressionResult>`

### compressImageData()

Compresses raw image data using the web worker.

```typescript
const imageData = await resizeAndGetImageData(file, 1920);
const compressedBlob = await compressImageData(
  imageData,
  {
    quality: 0.8,
    outputFormat: 'image/jpeg'
  },
  (progress) => console.log(`Progress: ${progress}%`)
);
```

**Parameters:**
- `imageData: ImageDataInput` - Raw pixel data
- `options: CompressionOptions` - Compression settings
- `onProgress?: (progress: number) => void` - Optional progress callback

**Returns:** `Promise<Blob>`

### createCompressionResult()

Creates a compression result object with statistics.

```typescript
const result = createCompressionResult(originalFile, compressedBlob);
console.log(`Savings: ${result.savingsPercentage.toFixed(1)}%`);
```

**Parameters:**
- `originalFile: File` - Original file
- `compressedBlob: Blob` - Compressed blob

**Returns:** `CompressionResult`

## Utility Functions

### validateCompressionOptions()

Validates compression options and throws errors for invalid settings.

```typescript
try {
  validateCompressionOptions({
    quality: 0.8,
    outputFormat: 'image/jpeg'
  });
} catch (error) {
  console.error('Invalid options:', error.message);
}
```

### getCompressionPreset()

Gets compression options for predefined presets.

```typescript
const options = getCompressionPreset(
  'BALANCED',
  'image/webp',
  1920
);
```

**Available Presets:**
- `HIGH_QUALITY` - Quality: 0.9, excellent quality, larger files
- `BALANCED` - Quality: 0.75, good balance of quality and size
- `COMPRESSED` - Quality: 0.5, moderate compression
- `MAX_COMPRESSION` - Quality: 0.3, maximum compression, lower quality

### estimateQualityForTargetSize()

Estimates compression quality needed to achieve target file size.

```typescript
const quality = estimateQualityForTargetSize(
  originalFile,
  100 * 1024, // 100KB target
  'image/jpeg'
);
```

**Parameters:**
- `originalFile: File` - Original file
- `targetSize: number` - Target size in bytes
- `outputFormat: string` - Output format

**Returns:** `number` - Quality setting (0-1)

### analyzeCompressionPotential()

Analyzes if compression is worthwhile for a file.

```typescript
const analysis = await analyzeCompressionPotential(file, options);
if (analysis.worthwhile) {
  console.log(`Estimated savings: ${analysis.estimatedSavings}%`);
  console.log(`Reasoning: ${analysis.reasoning}`);
}
```

**Returns:**
```typescript
{
  worthwhile: boolean;
  estimatedSavings: number;
  recommendedQuality: number;
  reasoning: string;
}
```

## Usage Examples

### Basic Compression

```typescript
import { compressImage, COMPRESSION_PRESETS } from '@/utils/image-tools';

async function compressUserImage(file: File) {
  try {
    const result = await compressImage(file, {
      quality: COMPRESSION_PRESETS.BALANCED.quality,
      outputFormat: 'image/webp',
      maxWidthOrHeight: 1920
    });

    console.log(`Original: ${(result.originalSize / 1024).toFixed(2)} KB`);
    console.log(`Compressed: ${(result.compressedSize / 1024).toFixed(2)} KB`);
    console.log(`Savings: ${result.savingsPercentage.toFixed(1)}%`);

    // Download the compressed image
    const url = URL.createObjectURL(result.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${Date.now()}.webp`;
    a.click();
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Compression failed:', error);
  }
}
```

### Smart Compression with Analysis

```typescript
import {
  analyzeCompressionPotential,
  compressImage,
  getCompressionPreset
} from '@/utils/image-tools';

async function smartCompress(file: File) {
  // Analyze compression potential
  const analysis = await analyzeCompressionPotential(file, {
    quality: 0.75,
    outputFormat: 'image/webp'
  });

  if (!analysis.worthwhile) {
    console.log('Compression not recommended:', analysis.reasoning);
    return file;
  }

  // Use recommended settings
  const options = getCompressionPreset('BALANCED', 'image/webp', 1920);
  const result = await compressImage(file, options);

  return result.compressedBlob;
}
```

### Target Size Compression

```typescript
import { estimateQualityForTargetSize, compressImage } from '@/utils/image-tools';

async function compressToTargetSize(file: File, targetSizeKB: number) {
  const quality = estimateQualityForTargetSize(
    file,
    targetSizeKB * 1024,
    'image/jpeg'
  );

  const result = await compressImage(file, {
    quality,
    outputFormat: 'image/jpeg'
  });

  return result;
}

// Usage: compress to 100KB
const compressed = await compressToTargetSize(file, 100);
```

## Error Handling

All compression functions throw errors for:

- Invalid file formats
- Corrupted image data
- Worker initialization failures
- Memory constraints
- Invalid compression options

Always wrap compression calls in try-catch blocks:

```typescript
try {
  const result = await compressImage(file, options);
  // Handle success
} catch (error) {
  if (error.message.includes('Worker')) {
    // Handle worker-related errors
  } else if (error.message.includes('format')) {
    // Handle format errors
  } else {
    // Handle other errors
  }
}
```

## Performance Considerations

1. **Memory Management**: Large images are processed with transferable objects to minimize memory copying
2. **Worker Reuse**: Workers are managed by the central worker manager for optimal resource usage
3. **Progress Tracking**: Progress callbacks help maintain UI responsiveness during long operations
4. **Format Selection**: WebP and AVIF offer better compression than JPEG for most images

## Browser Support

- **JPEG**: Universal support
- **PNG**: Universal support
- **WebP**: Modern browsers (Chrome, Edge, Firefox, Safari 14+)
- **AVIF**: Latest browsers (Chrome, Firefox, Safari 16+)

Always check format compatibility before compressing.