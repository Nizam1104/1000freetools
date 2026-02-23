# Bulk Image Processing Utilities

This module provides comprehensive utilities for processing multiple images with progress tracking, ZIP creation, and statistics calculation.

## Installation

```typescript
import {
  createBulkImageFiles,
  updateImageFileStatus,
  processBulkImages,
  createZipFromProcessedImages,
  downloadProcessedImagesAsZip,
  cleanupBulkImageFiles,
  calculateProcessingStats,
  filterImagesByStatus,
  formatBulkFileSize,
  type ProcessedImageFile,
  type ProcessingProgress,
  type BulkProcessingOptions,
  type ZipCreationOptions
} from '@/utils/image-tools';
```

## Core Types

### ProcessedImageFile

```typescript
interface ProcessedImageFile<T = Blob> {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  processedUrl?: string;
  processedSize?: number;
  processedData?: T;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  progress?: number;
  metadata?: Record<string, any>;
}
```

### ProcessingProgress

```typescript
interface ProcessingProgress {
  current: number;
  total: number;
  percentage: number;
  currentItem?: string;
}
```

### BulkProcessingOptions

```typescript
interface BulkProcessingOptions {
  maxConcurrent?: number;        // Default: 1
  onProgress?: (progress: ProcessingProgress) => void;
  onItemComplete?: (item: ProcessedImageFile) => void;
  onError?: (error: Error, item: ProcessedImageFile) => void;
}
```

### ZipCreationOptions

```typescript
interface ZipCreationOptions {
  folderName?: string;           // Default: 'processed-images'
  includeSummary?: boolean;      // Default: true
  summaryFileName?: string;      // Default: 'processing-summary.txt'
  onProgress?: (progress: ProcessingProgress) => void;
}
```

## Core Functions

### createBulkImageFiles()

Creates image file objects with unique IDs for bulk processing.

```typescript
const files = createBulkImageFiles(fileList, 25); // Max 25 files
console.log(`Created ${files.length} image files for processing`);
```

**Parameters:**
- `files: File[]` - Array of File objects
- `maxFiles?: number` - Maximum number of files allowed

**Returns:** `ProcessedImageFile[]`

**Throws:** Error if maxFiles limit is exceeded

### processBulkImages()

Processes multiple images with progress tracking and error handling.

```typescript
const processedFiles = await processBulkImages(
  imageFiles,
  async (file, onProgress) => {
    // Your processing logic here
    const result = await processImage(file);
    onProgress(50);
    return result;
  },
  {
    onProgress: (progress) => {
      console.log(`Overall progress: ${progress.percentage}%`);
      console.log(`Current: ${progress.currentItem}`);
    },
    onItemComplete: (item) => {
      console.log(`Completed: ${item.file.name}`);
    },
    onError: (error, item) => {
      console.error(`Failed: ${item.file.name} - ${error.message}`);
    }
  }
);
```

**Parameters:**
- `files: ProcessedImageFile[]` - Array of image files to process
- `processor: (file, onProgress) => Promise<T>` - Processing function
- `options: BulkProcessingOptions` - Processing options

**Returns:** `Promise<ProcessedImageFile<T>[]>`

### createZipFromProcessedImages()

Creates a ZIP file from processed images.

```typescript
const zipBlob = await createZipFromProcessedImages(
  processedFiles,
  'image/webp',
  {
    folderName: 'compressed-images',
    includeSummary: true,
    summaryFileName: 'compression-report.txt',
    onProgress: (progress) => {
      console.log(`ZIP creation: ${progress.percentage}%`);
    }
  }
);
```

**Parameters:**
- `files: ProcessedImageFile<Blob>[]` - Successfully processed files
- `outputFormat: string` - Format for filenames
- `options: ZipCreationOptions` - ZIP creation options

**Returns:** `Promise<Blob>`

### downloadProcessedImagesAsZip()

Creates and downloads a ZIP file of processed images.

```typescript
await downloadProcessedImagesAsZip(
  processedFiles,
  'image/jpeg',
  {
    folderName: 'compressed-photos',
    zipFileName: `compressed-photos-${Date.now()}.zip`,
    onProgress: (progress) => {
      setZipProgress(progress.percentage);
    }
  }
);
```

## Utility Functions

### updateImageFileStatus()

Updates the status and progress of an image file.

```typescript
const updatedFiles = updateImageFileStatus(
  files,
  'file-id-123',
  {
    status: 'completed',
    processedSize: 50000,
    processedUrl: URL.createObjectURL(blob)
  }
);
```

### calculateProcessingStats()

Calculates comprehensive processing statistics.

```typescript
const stats = calculateProcessingStats(processedFiles);
console.log(`Success rate: ${stats.successRate.toFixed(1)}%`);
console.log(`Total savings: ${stats.totalSavings.toFixed(1)}%`);
console.log(`Average savings per file: ${stats.averageSavingsPerFile.toFixed(1)}%`);
```

**Returns:**
```typescript
{
  total: number;
  completed: number;
  failed: number;
  pending: number;
  processing: number;
  successRate: number;
  totalOriginalSize: number;
  totalProcessedSize: number;
  totalSavings: number;
  averageSavingsPerFile: number;
}
```

### filterImagesByStatus()

Filters image files by processing status.

```typescript
const completedFiles = filterImagesByStatus(processedFiles, 'completed');
const failedFiles = filterImagesByStatus(processedFiles, 'error');
const pendingFiles = filterImagesByStatus(processedFiles, 'pending');
```

### cleanupBulkImageFiles()

Cleans up object URLs to free memory.

```typescript
// Call when component unmounts or files are no longer needed
cleanupBulkImageFiles(imageFiles);
```

## Usage Examples

### Complete Bulk Processing Workflow

```typescript
import {
  createBulkImageFiles,
  processBulkImages,
  downloadProcessedImagesAsZip,
  cleanupBulkImageFiles,
  calculateProcessingStats
} from '@/utils/image-tools';

async function bulkCompressImages(files: File[]) {
  try {
    // Step 1: Create image file objects
    const imageFiles = createBulkImageFiles(files, 25);

    // Step 2: Process all images
    const processedFiles = await processBulkImages(
      imageFiles,
      async (file, onProgress) => {
        // Your compression logic here
        const compressed = await compressImage(file.file, {
          quality: 0.75,
          outputFormat: 'image/webp'
        });

        onProgress(100);
        return {
          processedData: compressed.blob,
          processedSize: compressed.size,
          processedUrl: URL.createObjectURL(compressed.blob)
        };
      },
      {
        onProgress: (progress) => {
          console.log(`Processing: ${progress.percentage}%`);
        },
        onError: (error, item) => {
          console.error(`Failed to process ${item.file.name}:`, error.message);
        }
      }
    );

    // Step 3: Calculate statistics
    const stats = calculateProcessingStats(processedFiles);
    console.log(`Processed ${stats.completed}/${stats.total} files`);
    console.log(`Success rate: ${stats.successRate.toFixed(1)}%`);

    // Step 4: Download results
    await downloadProcessedImagesAsZip(
      processedFiles,
      'image/webp',
      {
        folderName: 'compressed-images',
        zipFileName: `compressed-images-${Date.now()}.zip`
      }
    );

    return processedFiles;

  } catch (error) {
    console.error('Bulk processing failed:', error);
    throw error;
  }
}

// Cleanup when done
React.useEffect(() => {
  return () => {
    cleanupBulkImageFiles(imageFiles);
  };
}, [imageFiles]);
```

### Custom Processing Pipeline

```typescript
async function customImageProcessing(files: File[]) {
  const imageFiles = createBulkImageFiles(files);

  const processedFiles = await processBulkImages(
    imageFiles,
    async (file, onProgress) => {
      try {
        // Step 1: Get image dimensions
        const dimensions = await getImageDimensions(file.file);
        onProgress(25);

        // Step 2: Resize if needed
        const resized = await resizeImageIfNeeded(file.file, 1920);
        onProgress(50);

        // Step 3: Apply filters
        const filtered = await applyFilters(resized);
        onProgress(75);

        // Step 4: Compress
        const compressed = await compressImage(filtered, 0.8);
        onProgress(100);

        return {
          processedData: compressed,
          processedSize: compressed.size,
          processedUrl: URL.createObjectURL(compressed),
          metadata: {
            originalDimensions: dimensions,
            processedAt: new Date().toISOString(),
            filters: ['brightness', 'contrast']
          }
        };

      } catch (error) {
        throw new Error(`Failed to process ${file.file.name}: ${error.message}`);
      }
    },
    {
      maxConcurrent: 3, // Process 3 images at once
      onProgress: (progress) => {
        updateProgressBar(progress.percentage);
        setCurrentFile(progress.currentItem);
      },
      onItemComplete: (item) => {
        showNotification(`Completed: ${item.file.name}`, 'success');
      },
      onError: (error, item) => {
        showNotification(`Failed: ${item.file.name}`, 'error');
      }
    }
  );

  return processedFiles;
}
```

### Progress Monitoring

```typescript
function BulkProcessor({ files }: { files: File[] }) {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [processedFiles, setProcessedFiles] = useState<ProcessedImageFile[]>([]);

  const handleBulkProcess = async () => {
    const imageFiles = createBulkImageFiles(files);

    const result = await processBulkImages(
      imageFiles,
      async (file, onProgress) => {
        // Your processing logic
        return await processImage(file);
      },
      {
        onProgress: (progress) => {
          setProgress(progress.percentage);
          setCurrentFile(progress.currentItem || '');
        },
        onItemComplete: (item) => {
          setProcessedFiles(prev => [...prev, item]);
        }
      }
    );

    setProcessedFiles(result);
  };

  return (
    <div>
      <div>Progress: {progress}%</div>
      <div>Current: {currentFile}</div>
      <div>Completed: {processedFiles.length}</div>
      <button onClick={handleBulkProcess}>Start Processing</button>
    </div>
  );
}
```

## Error Handling Strategies

### Individual File Errors

```typescript
const processedFiles = await processBulkImages(
  imageFiles,
  processor,
  {
    onError: (error, item) => {
      // Log individual errors without stopping the entire process
      console.error(`Error processing ${item.file.name}:`, error.message);

      // Track errors for reporting
      errorTracker.add({
        file: item.file.name,
        error: error.message,
        timestamp: new Date()
      });
    }
  }
);
```

### Retry Failed Files

```typescript
async function retryFailedFiles(failedFiles: ProcessedImageFile[]) {
  const retryFiles = failedFiles.map(file => ({
    ...file,
    status: 'pending' as const,
    error: undefined,
    progress: 0
  }));

  return await processBulkImages(retryFiles, processor);
}
```

## Performance Tips

1. **Memory Management**: Always call `cleanupBulkImageFiles()` when files are no longer needed
2. **Concurrency**: Use `maxConcurrent` option to balance performance and memory usage
3. **Progress Updates**: Throttle progress updates to avoid excessive re-renders
4. **Large Files**: Consider implementing file size limits and chunking for very large files
5. **Worker Pool**: For CPU-intensive operations, use worker pools to avoid blocking the main thread

## Integration with Other Utils

These bulk processing utilities work seamlessly with other image utilities:

```typescript
import {
  createBulkImageFiles,
  processBulkImages,
  downloadProcessedImagesAsZip
} from '@/utils/image-tools';

import {
  compressImageData,
  resizeAndGetImageData
} from '@/utils/image-tools';

// Combine compression and resizing in bulk
async function bulkResizeAndCompress(files: File[]) {
  const imageFiles = createBulkImageFiles(files);

  return await processBulkImages(
    imageFiles,
    async (file, onProgress) => {
      // Resize first
      const imageData = await resizeAndGetImageData(file.file, 1920);
      onProgress(50);

      // Then compress
      const compressed = await compressImageData(imageData, {
        quality: 0.8,
        outputFormat: 'image/webp'
      });
      onProgress(100);

      return {
        processedData: compressed,
        processedSize: compressed.size,
        processedUrl: URL.createObjectURL(compressed)
      };
    }
  );
}
```