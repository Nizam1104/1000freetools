// High-quality image compression using browser's Canvas API and additional optimizations
// Automatically handles transparency preservation

// Helper function to detect if image has transparency
const hasTransparency = (imageData) => {
  const data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true; // Found a non-opaque pixel
  }
  return false;
};

// Advanced compression with multiple techniques
const compressImage = async (imageData, format, quality, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      // Create an offscreen canvas for better performance in workers
      const canvas = new OffscreenCanvas(imageData.width, imageData.height);
      const ctx = canvas.getContext('2d', {
        alpha: true, // Enable alpha channel support
        willReadFrequently: false,
        desynchronized: false
      });

      if (!ctx) {
        reject(new Error('Could not get 2D context from OffscreenCanvas'));
        return;
      }

      // Create ImageData from input, preserving alpha channel
      const inputImageData = new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height
      );

      // Check if image has transparency
      const isTransparent = hasTransparency(inputImageData);

      // Auto-convert format if transparency detected and JPEG requested
      let targetFormat = format;
      if (isTransparent && format === 'image/jpeg') {
        // Try WebP first (better compression), fallback to PNG
        targetFormat = 'image/webp';
        console.warn('Image has transparency. Auto-converting from JPEG to WebP to preserve transparency.');
        
        // Optionally notify the main thread about format change
        if (options.notifyFormatChange) {
          self.postMessage({
            type: 'FORMAT_CHANGED',
            originalFormat: format,
            newFormat: targetFormat,
            reason: 'Transparency preservation'
          });
        }
      }

      // Clear canvas to ensure transparent background (not white)
      ctx.clearRect(0, 0, imageData.width, imageData.height);

      // Set composite operation to ensure proper alpha handling
      ctx.globalCompositeOperation = 'copy';
      
      // Put image data preserving alpha channel
      ctx.putImageData(inputImageData, 0, 0);
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      // For JPEG: only process if no transparency (should not reach here if transparent)
      if (targetFormat === 'image/jpeg') {
        // JPEG doesn't support transparency
        // If we reach here, image is opaque, so safe to use JPEG
        const optimizedQuality = optimizeJpegQuality(quality);

        canvas.convertToBlob({
          type: targetFormat,
          quality: optimizedQuality
        }).then(blob => convertBlobToArray(blob)).then(resolve).catch(reject);
      }
      // For WebP: use the browser's WebP compression (supports transparency)
      else if (targetFormat === 'image/webp') {
        canvas.convertToBlob({
          type: targetFormat,
          quality: quality
        }).then(blob => convertBlobToArray(blob)).then(resolve).catch(reject);
      }
      // For PNG: implement custom optimization (supports transparency)
      else if (targetFormat === 'image/png') {
        // PNG is lossless, but we can reduce colors for better compression
        const optimizedImageData = optimizeForPng(inputImageData, quality);
        
        // Clear canvas and use copy operation to preserve transparency
        ctx.clearRect(0, 0, imageData.width, imageData.height);
        ctx.globalCompositeOperation = 'copy';
        ctx.putImageData(optimizedImageData, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        
        canvas.convertToBlob({
          type: targetFormat
        }).then(blob => convertBlobToArray(blob)).then(resolve).catch(reject);
      }
      // For AVIF: use browser's AVIF if available (supports transparency)
      else if (targetFormat === 'image/avif') {
        // Check if AVIF is supported
        if (typeof OffscreenCanvas !== 'undefined' && canvas.convertToBlob) {
          canvas.convertToBlob({
            type: targetFormat,
            quality: quality
          }).then(blob => convertBlobToArray(blob)).then(resolve).catch(reject);
        } else {
          reject(new Error('AVIF format not supported in this browser'));
        }
      } else {
        reject(new Error(`Unsupported format: ${targetFormat}`));
      }

    } catch (error) {
      reject(error);
    }
  });
};

// Convert blob to Uint8Array
const convertBlobToArray = async (blob) => {
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
};

// Optimize JPEG quality for better compression/quality ratio
const optimizeJpegQuality = (uiQuality) => {
  // Convert UI quality (0-1) to optimal JPEG quality
  // This mapping provides better results than direct conversion
  if (uiQuality > 0.9) return 0.95;
  if (uiQuality > 0.8) return 0.85;
  if (uiQuality > 0.7) return 0.75;
  if (uiQuality > 0.6) return 0.65;
  if (uiQuality > 0.5) return 0.55;
  if (uiQuality > 0.4) return 0.45;
  if (uiQuality > 0.3) return 0.35;
  if (uiQuality > 0.2) return 0.25;
  return Math.max(0.1, uiQuality);
};

// Optimize image data for PNG compression
const optimizeForPng = (imageData, quality) => {
  // For PNG, quality affects color reduction
  const data = new Uint8ClampedArray(imageData.data);
  const reductionFactor = Math.floor((1 - quality) * 4); // 0-4 levels of reduction

  if (reductionFactor > 0) {
    // Apply color reduction for better PNG compression
    const step = Math.pow(2, reductionFactor);
    for (let i = 0; i < data.length; i += 4) {
      // Reduce color channels (RGB) but preserve alpha
      data[i] = Math.round(data[i] / step) * step;     // Red
      data[i + 1] = Math.round(data[i + 1] / step) * step; // Green
      data[i + 2] = Math.round(data[i + 2] / step) * step; // Blue
      // Alpha channel (data[i + 3]) remains unchanged
    }
  }

  return new ImageData(data, imageData.width, imageData.height);
};

// Main worker message handler
self.onmessage = async (event) => {
  if (event.data.type === 'COMPRESS_IMAGE') {
    const { imageData, format, options } = event.data;
    let compressedData = null;
    let error = null;
    let finalFormat = format;

    try {
      // Validate input
      if (!imageData || !imageData.data || !imageData.width || !imageData.height) {
        throw new Error('Invalid image data provided');
      }

      // Extract and validate quality
      const quality = Math.max(0.0, Math.min(1.0, options.quality || 0.75));

      // Compress the image
      compressedData = await compressImage(imageData, format, quality, options);
      
      // Determine final format (may have changed for transparency)
      const isTransparent = hasTransparency(imageData);
      if (isTransparent && format === 'image/jpeg') {
        finalFormat = 'image/webp';
      }

    } catch (e) {
      error = (e instanceof Error) ? e.message : String(e);
      console.error('Compression worker error:', e);
    }

    // Send result back to main thread
    if (compressedData) {
      self.postMessage({
        type: 'COMPRESSION_SUCCESS',
        result: compressedData,
        format: finalFormat,
        originalFormat: format
      }, [compressedData.buffer]); // Transfer buffer for efficiency
    } else {
      self.postMessage({
        type: 'COMPRESSION_ERROR',
        error: error || 'Unknown compression error occurred in worker.'
      });
    }
  }
};
