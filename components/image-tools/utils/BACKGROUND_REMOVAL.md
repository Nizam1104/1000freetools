# Background Removal Utilities

This module provides comprehensive utilities for removing image backgrounds using AI-powered technology. It includes functions for image validation, processing, analysis, and file management.

## Installation

```typescript
import {
  loadBackgroundImageData,
  validateBackgroundImageFile,
  removeImageBackground,
  processBackgroundRemoval,
  downloadProcessedImage,
  extractImageMetadata,
  calculateBackgroundAspectRatio,
  cleanupObjectUrls,
  getBackgroundRemovalPreset,
  analyzeImageForBackgroundRemoval,
  BACKGROUND_REMOVAL_PRESETS,
  formatBackgroundFileSize,
  type BackgroundImageData,
  type BackgroundRemovalOptions,
  type BackgroundRemovalResult,
  type BackgroundRemovalPreset
} from '@/utils/image-tools';
```

## Core Types

### BackgroundImageData

```typescript
interface BackgroundImageData {
  file: File;
  url: string;
  name: string;
  width: number;
  height: number;
}
```

### BackgroundRemovalOptions

```typescript
interface BackgroundRemovalOptions {
  outputFormat?: 'png' | 'jpeg';    // Default: 'png'
  quality?: number;                 // 0.1 - 1.0, Default: 0.9
  debug?: boolean;                  // Default: false
  onProgress?: (status: string, progress: number) => void;
}
```

### BackgroundRemovalResult

```typescript
interface BackgroundRemovalResult {
  blob: Blob;                       // Processed image blob
  url: string;                      // Object URL for blob
  originalSize: number;             // Original file size in bytes
  processedSize: number;            // Processed file size in bytes
  sizeReduction: number;            // Percentage size change
  processingTime: number;           // Processing time in milliseconds
}
```

## Presets

### BACKGROUND_REMOVAL_PRESETS

Predefined configurations for different use cases:

```typescript
const BACKGROUND_REMOVAL_PRESETS = {
  PRODUCT_PHOTO: {
    name: 'Product Photo',
    outputFormat: 'png',
    quality: 0.95,
    description: 'High quality output for e-commerce product images'
  },
  PORTRAIT: {
    name: 'Portrait',
    outputFormat: 'png',
    quality: 0.9,
    description: 'Optimized for portraits and people photos'
  },
  WEB_OPTIMIZED: {
    name: 'Web Optimized',
    outputFormat: 'jpeg',
    quality: 0.8,
    description: 'Smaller file size for web use with white background'
  },
  HIGH_QUALITY: {
    name: 'High Quality',
    outputFormat: 'png',
    quality: 1.0,
    description: 'Maximum quality for professional use'
  }
} as const;
```

**Available Presets:**
- `PRODUCT_PHOTO` - High quality PNG for e-commerce
- `PORTRAIT` - Optimized for people photos
- `WEB_OPTIMIZED` - JPEG with white background for web
- `HIGH_QUALITY` - Maximum quality output

## Main Functions

### validateBackgroundImageFile()

Validates image files for background removal processing.

```typescript
const validation = validateBackgroundImageFile(file, 10); // 10MB limit
if (!validation.valid) {
  console.error(validation.error);
} else {
  console.log('File is valid for processing');
}
```

**Parameters:**
- `file: File` - The file to validate
- `maxSizeMB?: number` - Maximum file size in MB (default: 10)

**Returns:**
```typescript
{
  valid: boolean;
  error?: string;
}
```

**Supported Formats:** JPG, PNG, GIF, WebP, and other image formats

### loadBackgroundImageData()

Loads image data and extracts metadata.

```typescript
const imageData = await loadBackgroundImageData(file);
console.log(`Image dimensions: ${imageData.width}x${imageData.height}`);
console.log(`File name: ${imageData.name}`);
```

**Parameters:**
- `file: File` - The image file to load

**Returns:** `Promise<BackgroundImageData>`

**Features:**
- Extracts image dimensions without full processing
- Creates object URLs for display
- Handles loading errors gracefully

### removeImageBackground()

Core background removal function using AI.

```typescript
const blob = await removeImageBackground(imageUrl, {
  outputFormat: 'png',
  quality: 0.9,
  debug: false,
  onProgress: (status, progress) => {
    console.log(`${status}: ${progress}%`);
  }
});
```

**Parameters:**
- `imageUrl: string` - URL of the image to process
- `options: BackgroundRemovalOptions` - Processing options

**Returns:** `Promise<Blob>`

**Features:**
- Uses @imgly/background-removal library
- Supports PNG (transparent) and JPEG (white background)
- Progress tracking during processing
- Debug mode for development

### processBackgroundRemoval()

Complete background removal workflow with detailed results.

```typescript
const result = await processBackgroundRemoval(file, {
  outputFormat: 'png',
  quality: 0.9,
  onProgress: (status, progress) => {
    updateProgressBar(progress);
  }
});

console.log(`Processing time: ${result.processingTime}ms`);
console.log(`Size reduction: ${result.sizeReduction}%`);
```

**Parameters:**
- `file: File` - The image file to process
- `options: BackgroundRemovalOptions` - Processing options

**Returns:** `Promise<BackgroundRemovalResult>`

**Features:**
- Handles complete workflow from file to result
- Automatic memory management
- Detailed processing statistics
- Error handling and recovery

## Utility Functions

### downloadProcessedImage()

Downloads processed images with proper naming.

```typescript
downloadProcessedImage(
  imageUrl,
  originalFileName,
  'no-bg',
  'png'
); // Downloads as "original-name_no-bg.png"
```

**Parameters:**
- `imageUrl: string` - URL of image to download
- `originalName: string` - Original file name
- `suffix?: string` - Suffix to add to filename (default: 'no-bg')
- `format?: string` - Output format (default: 'png')

### extractImageMetadata()

Extracts and formats image metadata for display.

```typescript
const metadata = extractImageMetadata(imageData);
console.log(metadata);
// {
//   name: "photo.jpg",
//   size: "2.5 MB",
//   dimensions: "1920 × 1080px",
//   type: "image/jpeg",
//   aspectRatio: "16:9",
//   megapixels: "2.1"
// }
```

**Parameters:**
- `imageData: BackgroundImageData` - Image data object

**Returns:** Formatted metadata object

### analyzeImageForBackgroundRemoval()

Analyzes image for processing complexity and recommendations.

```typescript
const analysis = analyzeImageForBackgroundRemoval(imageData);
console.log(`Complexity: ${analysis.complexity}`);
console.log(`Estimated time: ${analysis.estimatedTime}`);
console.log(`Recommended preset: ${analysis.recommendedPreset}`);
```

**Parameters:**
- `imageData: BackgroundImageData` - Image data to analyze

**Returns:**
```typescript
{
  complexity: 'Low' | 'Medium' | 'High';
  estimatedTime: 'Fast' | 'Medium' | 'Slow';
  recommendedPreset: BackgroundRemovalPreset;
  megapixels: string;
  dimensions: string;
  fileSize: string;
  tips: string[];
}
```

### getBackgroundRemovalPreset()

Gets processing options from preset with overrides.

```typescript
const options = getBackgroundRemovalPreset('PRODUCT_PHOTO', {
  quality: 0.85,
  debug: true
});
```

**Parameters:**
- `preset: BackgroundRemovalPreset` - Preset name
- `overrides?: Partial<BackgroundRemovalOptions>` - Option overrides

**Returns:** `BackgroundRemovalOptions`

### cleanupObjectUrls()

Cleans up object URLs to prevent memory leaks.

```typescript
cleanupObjectUrls(url1, url2, url3); // Cleanup multiple URLs
```

**Parameters:**
- `...urls: (string | null | undefined)[]` - URLs to revoke

## Usage Examples

### Basic Background Removal

```typescript
import {
  validateBackgroundImageFile,
  processBackgroundRemoval,
  downloadProcessedImage
} from '@/utils/image-tools';

async function removeBackground(file: File) {
  // Validate file
  const validation = validateBackgroundImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Process background removal
  const result = await processBackgroundRemoval(file, {
    outputFormat: 'png',
    quality: 0.9,
    onProgress: (status, progress) => {
      console.log(`${status}: ${progress}%`);
    }
  });

  // Download result
  downloadProcessedImage(result.url, file.name);

  return result;
}
```

### Preset-Based Processing

```typescript
import {
  getBackgroundRemovalPreset,
  processBackgroundRemoval,
  BACKGROUND_REMOVAL_PRESETS,
  type BackgroundRemovalPreset
} from '@/utils/image-tools';

async function processWithPreset(file: File, preset: BackgroundRemovalPreset) {
  const options = getBackgroundRemovalPreset(preset, {
    onProgress: (status, progress) => {
      updateUI(status, progress);
    }
  });

  const result = await processBackgroundRemoval(file, options);
  return result;
}

// Usage examples
await processWithPreset(file, 'PRODUCT_PHOTO');
await processWithPreset(file, 'PORTRAIT');
await processWithPreset(file, 'WEB_OPTIMIZED');
```

### Advanced Processing with Analysis

```typescript
import {
  loadBackgroundImageData,
  analyzeImageForBackgroundRemoval,
  getBackgroundRemovalPreset,
  processBackgroundRemoval,
  extractImageMetadata
} from '@/utils/image-tools';

async function smartBackgroundRemoval(file: File) {
  // Load image data
  const imageData = await loadBackgroundImageData(file);

  // Analyze for optimal settings
  const analysis = analyzeImageForBackgroundRemoval(imageData);
  console.log('Analysis:', analysis);

  // Get recommended preset
  const options = getBackgroundRemovalPreset(analysis.recommendedPreset, {
    onProgress: (status, progress) => {
      showProgress(status, progress);
    }
  });

  // Process with optimal settings
  const result = await processBackgroundRemoval(file, options);

  // Display results
  const metadata = extractImageMetadata(imageData);
  console.log('Image metadata:', metadata);
  console.log('Processing result:', result);

  return {
    imageData,
    analysis,
    result,
    metadata
  };
}
```

### Batch Processing

```typescript
import {
  processBackgroundRemoval,
  validateBackgroundImageFile
} from '@/utils/image-tools';

async function batchBackgroundRemoval(files: File[]) {
  const results = [];

  for (const file of files) {
    try {
      // Validate each file
      const validation = validateBackgroundImageFile(file);
      if (!validation.valid) {
        console.error(`Skipping ${file.name}: ${validation.error}`);
        continue;
      }

      // Process with consistent settings
      const result = await processBackgroundRemoval(file, {
        outputFormat: 'png',
        quality: 0.9,
        onProgress: (status, progress) => {
          console.log(`${file.name}: ${status} (${progress}%)`);
        }
      });

      results.push({
        file: file.name,
        success: true,
        result
      });

    } catch (error) {
      results.push({
        file: file.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}
```

### Integration with React Components

```typescript
import React, { useState, useCallback } from 'react';
import {
  validateBackgroundImageFile,
  loadBackgroundImageData,
  processBackgroundRemoval,
  cleanupObjectUrls
} from '@/utils/image-tools';

function BackgroundRemoverComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file
    const validation = validateBackgroundImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setSelectedFile(file);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setProgress(0);

    try {
      const processedResult = await processBackgroundRemoval(selectedFile, {
        outputFormat: 'png',
        quality: 0.9,
        onProgress: (status, progress) => {
          setProgress(progress);
        }
      });

      setResult(processedResult.url);
    } catch (error) {
      console.error('Processing failed:', error);
      alert('Failed to remove background');
    } finally {
      setProcessing(false);
    }
  }, [selectedFile]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (result) {
        cleanupObjectUrls(result);
      }
    };
  }, [result]);

  return (
    <div>
      {/* File input and processing UI */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
      />

      {selectedFile && (
        <button onClick={handleProcess} disabled={processing}>
          {processing ? `Processing... ${progress}%` : 'Remove Background'}
        </button>
      )}

      {result && (
        <img src={result} alt="Background removed" />
      )}
    </div>
  );
}
```

## Error Handling

All functions include comprehensive error handling:

```typescript
import { validateBackgroundImageFile, processBackgroundRemoval } from '@/utils/image-tools';

async function safeBackgroundRemoval(file: File) {
  try {
    // Validate first
    const validation = validateBackgroundImageFile(file);
    if (!validation.valid) {
      throw new Error(`Invalid file: ${validation.error}`);
    }

    // Process with error handling
    const result = await processBackgroundRemoval(file);
    return result;

  } catch (error) {
    console.error('Background removal failed:', error);

    // Provide user-friendly error messages
    if (error.message.includes('size')) {
      throw new Error('Image is too large. Please use an image under 10MB.');
    } else if (error.message.includes('format')) {
      throw new Error('Unsupported image format. Please use JPG, PNG, or WebP.');
    } else {
      throw new Error('Failed to remove background. Please try again.');
    }
  }
}
```

## Performance Considerations

### Memory Management

```typescript
import { cleanupObjectUrls } from '@/utils/image-tools';

// Always cleanup object URLs
const imageUrl = URL.createObjectURL(blob);

// Cleanup when done
cleanupObjectUrls(imageUrl);

// Cleanup multiple URLs
cleanupObjectUrls(url1, url2, url3);
```

### Large Image Handling

```typescript
import { analyzeImageForBackgroundRemoval } from '@/utils/image-tools';

const analysis = analyzeImageForBackgroundRemoval(imageData);

if (analysis.complexity === 'High') {
  console.log('Large image detected. Processing may take longer...');
  // Consider showing loading indicators
  // Maybe suggest image resizing first
}
```

### Progress Tracking

```typescript
const options = {
  onProgress: (status: string, progress: number) => {
    // Update UI with progress
    updateProgressBar(progress);
    updateStatus(status);

    // Provide user feedback
    if (progress < 30) {
      showMessage('Loading AI model...');
    } else if (progress < 80) {
      showMessage('Processing image...');
    } else {
      showMessage('Finalizing...');
    }
  }
};
```

## Browser Compatibility

- **Modern Browsers**: Full support with WebAssembly
- **Image Formats**: JPG, PNG, GIF, WebP, AVIF
- **File Size**: Recommended limit 10MB for optimal performance
- **Memory**: Automatic cleanup prevents memory leaks

## Dependencies

- `@imgly/background-removal` - AI-powered background removal
- Browser APIs: File API, Blob API, URL API

## Best Practices

1. **Always validate files** before processing
2. **Use presets** for consistent results
3. **Implement progress tracking** for better UX
4. **Cleanup object URLs** to prevent memory leaks
5. **Handle errors gracefully** with user-friendly messages
6. **Analyze images** first to set expectations
7. **Use appropriate formats** (PNG for transparency, JPEG for size)