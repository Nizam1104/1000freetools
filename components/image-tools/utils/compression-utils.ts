/**
 * Image compression utilities
 * Provides reusable functions for image compression operations
 */

import { getImageCompressorWorker, releaseImageCompressorWorker } from '@/lib/workerManager';
import { ImageDataInput } from './image-resizer';

export interface CompressionOptions {
  quality: number; // 0.0 to 1.0
  maxWidthOrHeight?: number;
  outputFormat: string;
}

export interface CompressionResult {
  compressedBlob: Blob;
  compressedSize: number;
  originalSize: number;
  compressionRatio: number;
  savingsBytes: number;
  savingsPercentage: number;
}

export interface CompressionProgress {
  percentage: number;
  stage: 'initializing' | 'processing' | 'finalizing' | 'completed';
}

/**
 * Compresses a single image file using the web worker
 *
 * @param file - The image file to compress
 * @param options - Compression options
 * @param onProgress - Optional progress callback
 * @returns Promise resolving to compression result
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: CompressionProgress) => void
): Promise<CompressionResult> => {
  const { quality, maxWidthOrHeight, outputFormat } = options;

  try {
    onProgress?.({ percentage: 10, stage: 'initializing' });

    // Get worker from manager
    const worker = await getImageCompressorWorker();

    try {
      onProgress?.({ percentage: 30, stage: 'processing' });

      // Send ImageData to worker for compression
      const compressedBlob: Blob = await new Promise((resolve, reject) => {
        if (!worker) return reject(new Error("Worker not available."));

        const handleMessage = (e: MessageEvent) => {
          if (e.data.type === 'COMPRESSION_SUCCESS') {
            const resultBlob = new Blob([e.data.result], { type: outputFormat });
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
            resolve(resultBlob);
          } else if (e.data.type === 'COMPRESSION_ERROR') {
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
            reject(new Error(e.data.error));
          }
        };

        const handleError = (e: ErrorEvent) => {
          worker.removeEventListener('message', handleMessage);
          worker.removeEventListener('error', handleError);
          reject(new Error(`Worker error: ${e.message}`));
        };

        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);

        // We need to get the image data first - this should be done outside
        // For now, assume the caller provides the ImageData
        reject(new Error('ImageData must be provided for compression'));
      });

      onProgress?.({ percentage: 90, stage: 'finalizing' });

      const result = createCompressionResult(file, compressedBlob);
      onProgress?.({ percentage: 100, stage: 'completed' });

      return result;

    } finally {
      // Always release the worker
      releaseImageCompressorWorker();
    }

  } catch (error) {
    throw new Error(`Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Compresses image data using the web worker
 *
 * @param imageData - ImageData to compress
 * @param options - Compression options
 * @param onProgress - Optional progress callback
 * @returns Promise resolving to compressed blob
 */
export const compressImageData = async (
  imageData: ImageDataInput,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const { quality, outputFormat } = options;

  onProgress?.(25);

  const worker = await getImageCompressorWorker();

  try {
    const compressedBlob: Blob = await new Promise((resolve, reject) => {
      if (!worker) return reject(new Error("Worker not available."));

      const handleMessage = (e: MessageEvent) => {
        if (e.data.type === 'COMPRESSION_SUCCESS') {
          const resultBlob = new Blob([e.data.result], { type: outputFormat });
          worker.removeEventListener('message', handleMessage);
          worker.removeEventListener('error', handleError);
          resolve(resultBlob);
        } else if (e.data.type === 'COMPRESSION_ERROR') {
          worker.removeEventListener('message', handleMessage);
          worker.removeEventListener('error', handleError);
          reject(new Error(e.data.error));
        }
      };

      const handleError = (e: ErrorEvent) => {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        reject(new Error(`Worker error: ${e.message}`));
      };

      worker.addEventListener('message', handleMessage);
      worker.addEventListener('error', handleError);

      worker.postMessage({
        type: 'COMPRESS_IMAGE',
        imageData: {
          data: imageData.data,
          width: imageData.width,
          height: imageData.height,
        },
        format: outputFormat,
        options: {
          quality: quality
        }
      }, [imageData.data.buffer]); // Transfer buffer for efficiency
    });

    onProgress?.(100);
    return compressedBlob;

  } finally {
    releaseImageCompressorWorker();
  }
};

/**
 * Creates a compression result object with statistics
 *
 * @param originalFile - Original file
 * @param compressedBlob - Compressed blob
 * @returns Compression result with statistics
 */
export const createCompressionResult = (
  originalFile: File,
  compressedBlob: Blob
): CompressionResult => {
  const originalSize = originalFile.size;
  const compressedSize = compressedBlob.size;
  const savingsBytes = originalSize - compressedSize;
  const savingsPercentage = originalSize > 0 ? (savingsBytes / originalSize) * 100 : 0;
  const compressionRatio = originalSize > 0 ? compressedSize / originalSize : 1;

  return {
    compressedBlob,
    compressedSize,
    originalSize,
    compressionRatio,
    savingsBytes,
    savingsPercentage
  };
};

/**
 * Validates compression options
 *
 * @param options - Options to validate
 * @throws Error if options are invalid
 */
export const validateCompressionOptions = (options: CompressionOptions): void => {
  const { quality, outputFormat } = options;

  if (typeof quality !== 'number' || quality < 0 || quality > 1) {
    throw new Error('Quality must be a number between 0 and 1');
  }

  if (!outputFormat || typeof outputFormat !== 'string') {
    throw new Error('Output format must be specified');
  }

  const supportedFormats = ['image/jpeg', 'image/webp', 'image/png', 'image/avif'];
  if (!supportedFormats.includes(outputFormat)) {
    throw new Error(`Unsupported output format: ${outputFormat}. Supported formats: ${supportedFormats.join(', ')}`);
  }
};

/**
 * Gets default compression options for different use cases
 */
export const COMPRESSION_PRESETS = {
  HIGH_QUALITY: {
    name: 'High Quality',
    quality: 0.9,
    description: 'Excellent quality, larger file size'
  },
  BALANCED: {
    name: 'Balanced',
    quality: 0.75,
    description: 'Good balance of quality and size'
  },
  COMPRESSED: {
    name: 'Compressed',
    quality: 0.5,
    description: 'Moderate compression'
  },
  MAX_COMPRESSION: {
    name: 'Maximum Compression',
    quality: 0.3,
    description: 'Maximum compression, lower quality'
  }
} as const;

export type CompressionPreset = keyof typeof COMPRESSION_PRESETS;

/**
 * Gets compression options for a preset
 *
 * @param preset - Preset name
 * @param outputFormat - Output format
 * @param maxWidthOrHeight - Optional max dimension
 * @returns Compression options
 */
export const getCompressionPreset = (
  preset: CompressionPreset,
  outputFormat: string = 'image/jpeg',
  maxWidthOrHeight?: number
): CompressionOptions => {
  const presetConfig = COMPRESSION_PRESETS[preset];

  return {
    quality: presetConfig.quality,
    outputFormat,
    maxWidthOrHeight
  };
};

/**
 * Estimates compression quality needed to achieve target file size
 *
 * @param originalFile - Original file
 * @param targetSize - Target size in bytes
 * @param outputFormat - Output format
 * @returns Estimated quality setting (0-1)
 */
export const estimateQualityForTargetSize = (
  originalFile: File,
  targetSize: number,
  outputFormat: string
): number => {
  const originalSize = originalFile.size;

  if (targetSize >= originalSize) {
    return 1.0; // No compression needed
  }

  // Simple estimation - this could be improved with machine learning models
  const compressionRatio = targetSize / originalSize;

  // Rough quality estimation based on format
  switch (outputFormat) {
    case 'image/jpeg':
      // JPEG: quality roughly correlates with file size linearly
      return Math.max(0.1, Math.min(1.0, compressionRatio));

    case 'image/webp':
      // WebP is more efficient, so we can achieve similar quality with lower size
      return Math.max(0.1, Math.min(1.0, compressionRatio * 1.2));

    case 'image/png':
      // PNG is lossless, quality doesn't apply the same way
      // This is a rough approximation for PNG compression
      return Math.max(0.1, Math.min(1.0, compressionRatio * 0.8));

    default:
      return Math.max(0.1, Math.min(1.0, compressionRatio));
  }
};

/**
 * Analyzes if compression is worthwhile for a file
 *
 * @param file - File to analyze
 * @param options - Compression options
 * @returns Analysis result
 */
export const analyzeCompressionPotential = async (
  file: File,
  options: CompressionOptions
): Promise<{
  worthwhile: boolean;
  estimatedSavings: number;
  recommendedQuality: number;
  reasoning: string;
}> => {
  const { quality, outputFormat } = options;

  // Check if file is already compressed
  const isAlreadyCompressed = file.type === 'image/jpeg' && file.size < 100 * 1024; // Less than 100KB JPEG

  if (isAlreadyCompressed) {
    return {
      worthwhile: false,
      estimatedSavings: 0,
      recommendedQuality: quality,
      reasoning: 'File is already quite small and likely compressed'
    };
  }

  // Check format conversion potential
  const isLosslessFormat = file.type === 'image/png' || file.type === 'image/bmp';
  const convertingToLossy = isLosslessFormat && (outputFormat === 'image/jpeg' || outputFormat === 'image/webp');

  if (convertingToLossy) {
    const estimatedSavings = 50 + (1 - quality) * 30; // 50-80% savings potential
    return {
      worthwhile: true,
      estimatedSavings,
      recommendedQuality: quality,
      reasoning: `Converting from ${file.type.split('/')[1].toUpperCase()} to ${outputFormat.split('/')[1].toUpperCase()} offers significant compression`
    };
  }

  // Check if quality reduction will help
  if (quality < 0.8) {
    const estimatedSavings = (1 - quality) * 40; // Rough estimate
    return {
      worthwhile: estimatedSavings > 10,
      estimatedSavings,
      recommendedQuality: quality,
      reasoning: `Quality reduction to ${Math.round(quality * 100)}% should provide reasonable compression`
    };
  }

  return {
    worthwhile: false,
    estimatedSavings: 0,
    recommendedQuality: quality,
    reasoning: 'File may not benefit significantly from compression with current settings'
  };
};