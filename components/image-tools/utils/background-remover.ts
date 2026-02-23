/**
 * Background removal utilities
 * Provides reusable functions for removing image backgrounds using AI
 */

import {
  compressImageData,
  type CompressionOptions,
} from "./compression-utils";

export interface ImageData {
  file: File;
  url: string;
  name: string;
  width: number;
  height: number;
}

export interface BackgroundRemovalOptions {
  outputFormat?: "png" | "jpeg";
  quality?: number;
  debug?: boolean;
  onProgress?: (status: string, progress: number) => void;
}

export interface BackgroundRemovalResult {
  blob: Blob;
  url: string;
  originalSize: number;
  processedSize: number;
  sizeReduction: number;
  processingTime: number;
}

/**
 * Loads image data and extracts metadata
 *
 * @param file - The image file to load
 * @returns Promise resolving to image data with metadata
 */
export const loadImageData = async (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        file,
        url,
        name: file.name,
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };

    img.src = url;
  });
};

/**
 * Validates image file for processing
 *
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10)
 * @returns Validation result with error message if invalid
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 10,
): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith("image/")) {
    return {
      valid: false,
      error: "Please select a valid image file",
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Image size must be less than ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
};

/**
 * Removes background from an image using AI
 *
 * @param imageSource - The image source to process (File, Blob, URL, string, ImageData, etc.)
 * @param options - Background removal options
 * @returns Promise resolving to processed image blob
 */
export const removeImageBackground = async (
  imageSource:
    | File
    | Blob
    | string
    | ImageData
    | ArrayBuffer
    | Uint8Array
    | URL,
  options: BackgroundRemovalOptions = {},
): Promise<Blob> => {
  const {
    outputFormat = "png",
    quality = 0.9,
    debug = false,
    onProgress,
  } = options;

  try {
    onProgress?.("Loading background removal model...", 10);

    // Dynamically import the background removal library
    const { removeBackground: imglyRemoveBackground } =
      await import("@imgly/background-removal");
    type Config = {
      publicPath?: string;
      debug?: boolean;
      rescale?: boolean;
      device?: "cpu" | "gpu";
      proxyToWorker?: boolean;
      fetchArgs?: any;
      progress?: (key: string, current: number, total: number) => void;
      model?: "isnet" | "isnet_fp16" | "isnet_quint8";
      output?: {
        format?:
          | "image/png"
          | "image/jpeg"
          | "image/webp"
          | "image/x-rgba8"
          | "image/x-alpha8";
        quality?: number;
      };
    };

    onProgress?.("Processing image...", 30);

    // Configure the public path for WASM files
    // Must be a full URL, not just a path
    const publicPath =
      "https://static-assets.indeetools.com/util-models/image-bg-removal-models/";

    const config: Config = {
      publicPath: publicPath, // path to the wasm files
    };

    // Call the background removal function with config
    const blob: Blob = await imglyRemoveBackground(imageSource, config);

    onProgress?.("Finalizing...", 95);

    return blob;
  } catch (error) {
    throw new Error(
      `Background removal failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

/**
 * Processes image background removal with comprehensive result
 *
 * @param file - The image file to process
 * @param options - Background removal options
 * @returns Promise resolving to detailed processing result
 */
export const processBackgroundRemoval = async (
  file: File,
  options: BackgroundRemovalOptions = {},
): Promise<BackgroundRemovalResult> => {
  const startTime = Date.now();
  const originalSize = file.size;

  try {
    // Load image data for metadata
    const imageData = await loadImageData(file);
    options.onProgress?.("Image loaded", 20);

    // Remove background - pass the File object directly
    let processedBlob = await removeImageBackground(imageData.file, options);
    options.onProgress?.("Background removed", 90);

    // Check if compression is needed (only if the processed image is larger than original)
    if (processedBlob.size > originalSize) {
      options.onProgress?.("Compressing image...", 95);

      try {
        // Convert blob to ImageData for compression
        const imageBitmap = await createImageBitmap(processedBlob);
        const canvas = new OffscreenCanvas(
          imageBitmap.width,
          imageBitmap.height,
        );
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        // Draw the image bitmap to canvas
        ctx.drawImage(imageBitmap, 0, 0);

        // Get ImageData from the canvas
        const imageProcessedData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        // Compress with 75% quality using PNG format to preserve transparency
        const compressionOptions: CompressionOptions = {
          quality: 0.75,
          outputFormat: "image/png",
        };

        const compressedBlob = await compressImageData(
          imageProcessedData,
          compressionOptions,
          () => {}, // No progress updates for this internal step
        );

        // Use compressed blob only if it's smaller than the processed blob
        if (compressedBlob.size < processedBlob.size) {
          processedBlob = compressedBlob;
        }
      } catch (compressionError) {
        // If compression fails, continue with the uncompressed processed image
        console.warn(
          "Compression failed, continuing with original processed image:",
          compressionError,
        );
      }
    }

    // Create URL for processed image
    const processedUrl = URL.createObjectURL(processedBlob);
    const processedSize = processedBlob.size;
    const processingTime = Date.now() - startTime;

    // Calculate size reduction
    const sizeReduction =
      originalSize > 0
        ? ((originalSize - processedSize) / originalSize) * 100
        : 0;

    options.onProgress?.("Complete!", 100);

    return {
      blob: processedBlob,
      url: processedUrl,
      originalSize,
      processedSize,
      sizeReduction,
      processingTime,
    };
  } catch (error) {
    throw new Error(
      `Processing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

/**
 * Downloads a processed image with proper naming
 *
 * @param imageUrl - The URL of the image to download
 * @param originalName - Original file name
 * @param suffix - Suffix to add to filename (default: 'no-bg')
 * @param format - Output format (default: 'png')
 */
export const downloadProcessedImage = (
  imageUrl: string,
  originalName: string,
  suffix: string = "no-bg",
  format: string = "png",
): void => {
  const link = document.createElement("a");
  link.href = imageUrl;

  // Generate filename with proper extension
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  const fileName = `${nameWithoutExt}_${suffix}.${format}`;

  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formats file size for display
 *
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Extracts image metadata for display
 *
 * @param imageData - The image data object
 * @returns Formatted metadata object
 */
export const extractImageMetadata = (imageData: ImageData) => {
  return {
    name: imageData.name,
    size: formatFileSize(imageData.file.size),
    dimensions: `${imageData.width} × ${imageData.height}px`,
    type: imageData.file.type,
    aspectRatio: calculateAspectRatio(imageData.width, imageData.height),
    megapixels: ((imageData.width * imageData.height) / 1000000).toFixed(1),
  };
};

/**
 * Calculates aspect ratio from dimensions
 *
 * @param width - Image width
 * @param height - Image height
 * @returns Formatted aspect ratio string
 */
export const calculateAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

/**
 * Cleans up object URLs to prevent memory leaks
 *
 * @param urls - Array of URLs to revoke
 */
export const cleanupObjectUrls = (
  ...urls: (string | null | undefined)[]
): void => {
  urls.forEach((url) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  });
};

/**
 * Background removal presets for different use cases
 */
export const BACKGROUND_REMOVAL_PRESETS = {
  PRODUCT_PHOTO: {
    name: "Product Photo",
    outputFormat: "png" as const,
    quality: 0.95,
    description: "High quality output for e-commerce product images",
  },
  PORTRAIT: {
    name: "Portrait",
    outputFormat: "png" as const,
    quality: 0.9,
    description: "Optimized for portraits and people photos",
  },
  WEB_OPTIMIZED: {
    name: "Web Optimized",
    outputFormat: "jpeg" as const,
    quality: 0.8,
    description: "Smaller file size for web use with white background",
  },
  HIGH_QUALITY: {
    name: "High Quality",
    outputFormat: "png" as const,
    quality: 1.0,
    description: "Maximum quality for professional use",
  },
} as const;

export type BackgroundRemovalPreset = keyof typeof BACKGROUND_REMOVAL_PRESETS;

/**
 * Gets background removal options from preset
 *
 * @param preset - The preset name
 * @param overrides - Optional option overrides
 * @returns Background removal options
 */
export const getBackgroundRemovalPreset = (
  preset: BackgroundRemovalPreset,
  overrides: Partial<BackgroundRemovalOptions> = {},
): BackgroundRemovalOptions => {
  const presetConfig = BACKGROUND_REMOVAL_PRESETS[preset];

  return {
    outputFormat: presetConfig.outputFormat,
    quality: presetConfig.quality,
    ...overrides,
  };
};

/**
 * Analyzes image for background removal suitability
 *
 * @param imageData - The image data to analyze
 * @returns Analysis result with recommendations
 */
export const analyzeImageForBackgroundRemoval = (imageData: ImageData) => {
  const { width, height, file } = imageData;
  const megapixels = (width * height) / 1000000;

  let complexity = "Low";
  let estimatedTime = "Fast";
  let recommendedPreset: BackgroundRemovalPreset = "WEB_OPTIMIZED";

  // Analyze image size
  if (megapixels > 5) {
    complexity = "High";
    estimatedTime = "Slow";
    recommendedPreset = "WEB_OPTIMIZED";
  } else if (megapixels > 2) {
    complexity = "Medium";
    estimatedTime = "Medium";
    recommendedPreset = "PORTRAIT";
  }

  // Analyze file type
  if (file.type === "image/png") {
    recommendedPreset = "PRODUCT_PHOTO";
  }

  return {
    complexity,
    estimatedTime,
    recommendedPreset,
    megapixels: megapixels.toFixed(1),
    dimensions: `${width} × ${height}`,
    fileSize: formatFileSize(file.size),
    tips: [
      "Images with clear subject-background separation work best",
      "High contrast images process faster",
      "Portrait orientation is optimized for people photos",
      "Larger images may take longer to process",
    ],
  };
};
