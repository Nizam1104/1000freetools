/**
 * Image resize and processing utilities
 * Provides functions for resizing images, extracting pixel data, and format validation
 */

export interface ImageDataInput {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Resizes an image file and extracts raw pixel data (ImageData) for processing
 * This function handles the main thread operations of converting file to ImageData
 * and applies resizing before sending to Web Workers for compression.
 *
 * @param file - The image file to process
 * @param maxWidthOrHeight - Maximum width or height in pixels (aspect ratio maintained)
 * @returns Promise resolving to ImageData with pixel data and dimensions
 */
export const resizeAndGetImageData = (
  file: File,
  maxWidthOrHeight?: number
): Promise<ImageDataInput> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Apply resizing if dimensions are specified and image is larger
        if (maxWidthOrHeight && (width > maxWidthOrHeight || height > maxWidthOrHeight)) {
          if (width > height) {
            height *= maxWidthOrHeight / width;
            width = maxWidthOrHeight;
          } else {
            width *= maxWidthOrHeight / height;
            height = maxWidthOrHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
          alpha: true // Preserve alpha channel
        });
        if (!ctx) {
          reject(new Error("Could not get 2D canvas context."));
          return;
        }

        // Clear canvas to transparent before drawing
        ctx.clearRect(0, 0, width, height);

        // Use composite operation to preserve alpha channel exactly
        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(img, 0, 0, width, height);

        // Reset composite operation for getImageData
        ctx.globalCompositeOperation = 'source-over';

        const imageData = ctx.getImageData(0, 0, width, height);
        resolve({
          data: imageData.data,
          width: imageData.width,
          height: imageData.height,
        });
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};

/**
 * Gets the dimensions of an image file without loading it fully
 *
 * @param file - The image file to check
 * @returns Promise resolving to image dimensions
 */
export const getImageDimensions = (file: File): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validates if a file is an image format supported for resizing
 *
 * @param file - The file to validate
 * @returns True if file is a supported image format
 */
export const validateImageFile = (file: File): boolean => {
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ];

  return supportedTypes.includes(file.type);
};

/**
 * Validates multiple image files
 *
 * @param files - Array of files to validate
 * @returns Object with validation results
 */
export const validateImageFiles = (files: File[]): {
  valid: File[];
  invalid: File[];
  errors: string[];
} => {
  const valid: File[] = [];
  const invalid: File[] = [];
  const errors: string[] = [];

  files.forEach((file, index) => {
    if (validateImageFile(file)) {
      valid.push(file);
    } else {
      invalid.push(file);
      errors.push(`File ${index + 1} (${file.name}) is not a supported image format`);
    }
  });

  return { valid, invalid, errors };
};

/**
 * Creates a resized version of an image file as a blob
 *
 * @param file - The image file to resize
 * @param maxWidthOrHeight - Maximum width or height in pixels
 * @param outputFormat - Output format (defaults to original format)
 * @param quality - Output quality for lossy formats (0-1)
 * @returns Promise resolving to resized image blob
 */
export const createResizedImage = (
  file: File,
  maxWidthOrHeight: number,
  outputFormat?: string,
  quality?: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height *= maxWidthOrHeight / width;
            width = maxWidthOrHeight;
          } else {
            width *= maxWidthOrHeight / height;
            height = maxWidthOrHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
          alpha: true // Preserve alpha channel
        });
        if (!ctx) {
          reject(new Error("Could not get 2D canvas context."));
          return;
        }

        // Clear canvas to transparent before drawing
        ctx.clearRect(0, 0, width, height);

        // Use composite operation to preserve alpha channel exactly
        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(img, 0, 0, width, height);

        // Reset composite operation for getImageData
        ctx.globalCompositeOperation = 'source-over';

        const format = outputFormat || file.type;
        const mimeType = format.startsWith('image/') ? format : `image/${format}`;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          mimeType,
          quality || 0.9
        );
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calculates the aspect ratio of an image
 *
 * @param width - Image width
 * @param height - Image height
 * @returns Aspect ratio as width:height string
 */
export const getAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

/**
 * Calculates new dimensions maintaining aspect ratio
 *
 * @param originalWidth - Original width
 * @param originalHeight - Original height
 * @param maxWidth - Maximum width constraint
 * @param maxHeight - Maximum height constraint
 * @returns New dimensions object
 */
export const calculateResizedDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): ImageDimensions => {
  let width = originalWidth;
  let height = originalHeight;

  if (!maxWidth && !maxHeight) {
    return { width, height };
  }

  const maxDimension = maxWidth || maxHeight;

  if (maxDimension && (width > maxDimension || height > maxDimension)) {
    if (width > height) {
      height = (height * maxDimension) / width;
      width = maxDimension;
    } else {
      width = (width * maxDimension) / height;
      height = maxDimension;
    }
  }

  // If both maxWidth and maxHeight are specified, ensure both constraints are met
  if (maxWidth && maxHeight) {
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  };
};

// Common image dimension presets
export const IMAGE_DIMENSION_PRESETS = {
  WEB: { name: 'Web', width: 800, height: 600 },
  STANDARD: { name: 'Standard', width: 1280, height: 720 },
  HD: { name: 'HD', width: 1920, height: 1080 },
  FULL_HD: { name: 'Full HD', width: 1920, height: 1080 },
  FOUR_K: { name: '4K', width: 3840, height: 2160 },
  THUMBNAIL: { name: 'Thumbnail', width: 150, height: 150 },
  MEDIUM: { name: 'Medium', width: 500, height: 500 },
  LARGE: { name: 'Large', width: 1024, height: 1024 }
} as const;

export type ImageDimensionPreset = keyof typeof IMAGE_DIMENSION_PRESETS;