/**
 * Bulk image processing utilities
 * Provides reusable functions for processing multiple images with progress tracking
 */

import JSZip from 'jszip';

export interface ProcessingProgress {
  current: number;
  total: number;
  percentage: number;
  currentItem?: string;
}

export interface ProcessedImageFile<T = Blob> {
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

export interface BulkProcessingOptions<T = any> {
  maxConcurrent?: number;
  onProgress?: (progress: ProcessingProgress) => void;
  onItemComplete?: (item: ProcessedImageFile<T>) => void;
  onError?: (error: Error, item: ProcessedImageFile<T>) => void;
}

export interface ZipCreationOptions {
  folderName?: string;
  includeSummary?: boolean;
  summaryFileName?: string;
  onProgress?: (progress: ProcessingProgress) => void;
}

/**
 * Creates image file objects with unique IDs for bulk processing
 *
 * @param files - Array of File objects
 * @param maxFiles - Maximum number of files allowed
 * @returns Array of ProcessedImageFile objects
 */
export const createImageFiles = (
  files: File[],
  maxFiles?: number
): ProcessedImageFile[] => {
  if (maxFiles && files.length > maxFiles) {
    throw new Error(`Maximum ${maxFiles} files allowed at a time`);
  }

  return files.map(file => ({
    id: Math.random().toString(36).substring(2, 11),
    file,
    originalUrl: URL.createObjectURL(file),
    originalSize: file.size,
    status: 'pending'
  }));
};

/**
 * Updates the status and progress of an image file in an array
 *
 * @param files - Array of image files
 * @param id - ID of the file to update
 * @param updates - Partial updates to apply
 * @returns Updated array of files
 */
export const updateImageFileStatus = (
  files: ProcessedImageFile[],
  id: string,
  updates: Partial<ProcessedImageFile>
): ProcessedImageFile[] => {
  const index = files.findIndex(f => f.id === id);
  if (index === -1) return files;

  const updatedFiles = [...files];
  updatedFiles[index] = { ...updatedFiles[index], ...updates };
  return updatedFiles;
};

/**
 * Processes multiple images one by one to avoid overwhelming the browser
 *
 * @param files - Array of image files to process
 * @param processor - Function to process individual image
 * @param options - Processing options
 * @returns Promise resolving to array of processed files
 */
export const processBulkImages = async <T>(
  files: ProcessedImageFile[],
  processor: (file: ProcessedImageFile<T>, onProgress?: (progress: number) => void) => Promise<T>,
  options: BulkProcessingOptions<T> = {}
): Promise<ProcessedImageFile<T>[]> => {
  const {
    onProgress,
    onItemComplete,
    onError
  } = options;

  let completedCount = 0;
  const updatedFiles = files.map(file => ({ ...file })) as ProcessedImageFile<T>[];

  // Process images sequentially (can be enhanced for concurrent processing)
  for (let i = 0; i < updatedFiles.length; i++) {
    const imageFile = updatedFiles[i];

    // Update status to processing
    updatedFiles[i] = {
      ...updatedFiles[i],
      status: 'processing',
      progress: 0
    };

    // Notify progress
    onProgress?.({
      current: i,
      total: files.length,
      percentage: Math.round((i / files.length) * 100),
      currentItem: imageFile.file.name
    });

    try {
      const result = await processor(
        updatedFiles[i],
        (progress) => {
          updatedFiles[i].progress = progress;
        }
      );

      // Update with success result
      updatedFiles[i] = {
        ...updatedFiles[i],
        status: 'completed',
        processedData: result,
        progress: 100
      };

      onItemComplete?.(updatedFiles[i]);

    } catch (error) {
      // Update with error
      updatedFiles[i] = {
        ...updatedFiles[i],
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      onError?.(error instanceof Error ? error : new Error('Unknown error'), updatedFiles[i]);
    }

    completedCount++;
    onProgress?.({
      current: completedCount,
      total: files.length,
      percentage: Math.round((completedCount / files.length) * 100),
      currentItem: imageFile.file.name
    });
  }

  return updatedFiles;
};

/**
 * Creates a ZIP file from processed images
 *
 * @param files - Array of processed image files
 * @param outputFormat - Output format for filenames
 * @param options - ZIP creation options
 * @returns Promise resolving to ZIP blob
 */
export const createZipFromProcessedImages = async (
  files: ProcessedImageFile<Blob>[],
  outputFormat: string,
  options: ZipCreationOptions = {}
): Promise<Blob> => {
  const {
    folderName = 'processed-images',
    includeSummary = true,
    summaryFileName = 'processing-summary.txt',
    onProgress
  } = options;

  const completedFiles = files.filter((file: ProcessedImageFile<Blob>) => file.status === 'completed' && file.processedData);

  if (completedFiles.length === 0) {
    throw new Error('No successfully processed images to add to ZIP');
  }

  const zip = new JSZip();
  const imagesFolder = zip.folder(folderName);

  if (!imagesFolder) {
    throw new Error('Failed to create folder in ZIP');
  }

  // Add processed images to ZIP
  for (let i = 0; i < completedFiles.length; i++) {
    const file = completedFiles[i];

    if (file.processedData) {
      // Generate a clean filename
      const originalName = file.file.name;
      const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
      const extension = outputFormat.split('/')[1];
      const fileName = `${nameWithoutExt}-processed.${extension}`;

      // Add to ZIP
      imagesFolder.file(fileName, file.processedData);
    }

    // Update progress
    onProgress?.({
      current: i + 1,
      total: completedFiles.length,
      percentage: Math.round(((i + 1) / completedFiles.length) * 100),
      currentItem: file.file.name
    });
  }

  // Add summary file if requested
  if (includeSummary) {
    const summary = completedFiles.map((file: ProcessedImageFile<Blob>, index: number) => {
      const originalSizeKB = (file.originalSize / 1024).toFixed(2);
      const processedSizeKB = file.processedSize ? (file.processedSize / 1024).toFixed(2) : 'N/A';
      const savings = file.processedSize && file.originalSize
        ? (((file.originalSize - file.processedSize) / file.originalSize) * 100).toFixed(1)
        : 'N/A';

      return `${index + 1}. ${file.file.name}\n   Original: ${originalSizeKB} KB\n   Processed: ${processedSizeKB} KB\n   Savings: ${savings}%\n`;
    }).join('\n');

    const summaryContent = `Image Processing Summary\n========================\n\nGenerated: ${new Date().toLocaleString()}\nTotal Images: ${completedFiles.length}\n\n${summary}`;
    imagesFolder.file(summaryFileName, summaryContent);
  }

  // Generate the ZIP file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
};

/**
 * Downloads processed images as a ZIP file
 *
 * @param files - Array of processed image files
 * @param outputFormat - Output format for filenames
 * @param options - ZIP creation and download options
 */
export const downloadProcessedImagesAsZip = async (
  files: ProcessedImageFile<Blob>[],
  outputFormat: string,
  options: ZipCreationOptions & { zipFileName?: string } = {}
): Promise<void> => {
  const { zipFileName = `processed-images-${Date.now()}.zip` } = options;

  try {
    const zipBlob = await createZipFromProcessedImages(files, outputFormat, options);

    // Download the ZIP
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    setTimeout(() => URL.revokeObjectURL(url), 1000);

  } catch (error) {
    console.error('Failed to create ZIP file:', error);
    throw error;
  }
};

/**
 * Cleans up object URLs for image files to free memory
 *
 * @param files - Array of image files to cleanup
 */
export const cleanupImageFiles = (files: ProcessedImageFile[]): void => {
  files.forEach(file => {
    URL.revokeObjectURL(file.originalUrl);
    if (file.processedUrl) {
      URL.revokeObjectURL(file.processedUrl);
    }
  });
};

/**
 * Calculates processing statistics for bulk operations
 *
 * @param files - Array of processed image files
 * @returns Processing statistics object
 */
export const calculateProcessingStats = (files: ProcessedImageFile[]) => {
  const total = files.length;
  const completed = files.filter(f => f.status === 'completed').length;
  const failed = files.filter(f => f.status === 'error').length;
  const pending = files.filter(f => f.status === 'pending').length;
  const processing = files.filter(f => f.status === 'processing').length;

  const totalOriginalSize = files.reduce((sum, f) => sum + f.originalSize, 0);
  const totalProcessedSize = files
    .filter(f => f.processedSize)
    .reduce((sum, f) => sum + (f.processedSize || 0), 0);

  const totalSavings = totalOriginalSize > 0 && totalProcessedSize > 0
    ? ((totalOriginalSize - totalProcessedSize) / totalOriginalSize) * 100
    : 0;

  return {
    total,
    completed,
    failed,
    pending,
    processing,
    successRate: total > 0 ? (completed / total) * 100 : 0,
    totalOriginalSize,
    totalProcessedSize,
    totalSavings,
    averageSavingsPerFile: completed > 0 ? totalSavings / completed : 0
  };
};

/**
 * Filters image files by status
 *
 * @param files - Array of image files
 * @param status - Status to filter by
 * @returns Filtered array of files
 */
export const filterImagesByStatus = <T>(
  files: ProcessedImageFile<T>[],
  status: ProcessedImageFile['status']
): ProcessedImageFile<T>[] => {
  return files.filter(file => file.status === status);
};

/**
 * Gets file size formatted string
 *
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};