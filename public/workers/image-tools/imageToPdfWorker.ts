/**
 * Image to PDF Worker
 *
 * Converts images to PDF documents with support for multiple conversion modes:
 * - Single PDF: Combine multiple images into one PDF
 * - Individual PDFs: Create separate PDF for each image
 */

import jsPDF from 'jspdf';

interface ConversionOptions {
  mode: 'single' | 'individual';
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  quality: number; // 0.1 to 1.0
  margin: number; // in mm
}

interface ImageData {
  name: string;
  data: ArrayBuffer;
  type: string;
}

interface ConvertMessage {
  type: 'convert';
  images: ImageData[];
  options: ConversionOptions;
}

interface ProgressMessage {
  type: 'progress';
  progress: number;
  current: number;
  total: number;
}

interface CompleteMessage {
  type: 'complete';
  success: boolean;
  pdfs?: Array<{
    name: string;
    data: Uint8Array;
  }>;
  error?: string;
}

// Notify that worker is ready
self.postMessage({ type: 'worker-ready' });

self.onmessage = async (event: MessageEvent<ConvertMessage>) => {
  const { type, images, options } = event.data;

  if (type !== 'convert') {
    return;
  }

  try {
    const pdfs: Array<{ name: string; data: Uint8Array }> = [];

    if (options.mode === 'single') {
      // Create single PDF with all images
      const pdf = await createSinglePDF(images, options, (progress, current, total) => {
        self.postMessage({
          type: 'progress',
          progress,
          current,
          total
        } as ProgressMessage);
      });

      pdfs.push({
        name: 'images-to-pdf.pdf',
        data: pdf
      });
    } else {
      // Create individual PDF for each image
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const pdf = await createSinglePDF([image], options, (progress, current, total) => {
          const overallProgress = ((i / images.length) * 100) + (progress / images.length);
          self.postMessage({
            type: 'progress',
            progress: Math.round(overallProgress),
            current: i + 1,
            total: images.length
          } as ProgressMessage);
        });

        const baseName = image.name.replace(/\.[^/.]+$/, '');
        pdfs.push({
          name: `${baseName}.pdf`,
          data: pdf
        });
      }
    }

    self.postMessage({
      type: 'complete',
      success: true,
      pdfs
    } as CompleteMessage);

  } catch (error) {
    console.error('Image to PDF conversion error:', error);
    self.postMessage({
      type: 'complete',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    } as CompleteMessage);
  }
};

async function createSinglePDF(
  images: ImageData[],
  options: ConversionOptions,
  onProgress?: (progress: number, current: number, total: number) => void
): Promise<Uint8Array> {
  const doc = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.pageSize
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = pageWidth - (options.margin * 2);
  const usableHeight = pageHeight - (options.margin * 2);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (i > 0) {
      doc.addPage();
    }

    // Convert image data to base64
    const base64Data = arrayBufferToBase64(image.data);
    const imageDataUrl = `data:${image.type};base64,${base64Data}`;

    // Get image dimensions
    const dimensions = await getImageDimensions(image.data);

    // Calculate fit dimensions maintaining aspect ratio
    const aspectRatio = dimensions.width / dimensions.height;
    let imgWidth = usableWidth;
    let imgHeight = usableWidth / aspectRatio;

    if (imgHeight > usableHeight) {
      imgHeight = usableHeight;
      imgWidth = usableHeight * aspectRatio;
    }

    // Center the image
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    // Add image to PDF
    const imgFormat = image.type.includes('png') ? 'PNG' : 'JPEG';
    doc.addImage(imageDataUrl, imgFormat, x, y, imgWidth, imgHeight);

    // Report progress
    if (onProgress) {
      const progress = Math.round(((i + 1) / images.length) * 100);
      onProgress(progress, i + 1, images.length);
    }
  }

  return new Uint8Array(doc.output('arraybuffer'));
}

async function getImageDimensions(imageData: ArrayBuffer): Promise<{ width: number; height: number }> {
  // In a web worker, we can't use the Image constructor directly
  // We'll need to parse the image data to get dimensions
  // For now, we'll return a default aspect ratio and let jsPDF handle the scaling

  // Try to determine image type from magic bytes
  const view = new DataView(imageData);
  let width = 800, height = 600; // default dimensions

  // JPEG
  if (view.getUint16(0, false) === 0xFFD8) {
    // Parse JPEG for dimensions (simplified)
    // This is a basic implementation - in production you'd want a more robust parser
    width = 800;
    height = 600;
  }
  // PNG
  else if (view.getUint32(0, false) === 0x89504E47) {
    // PNG dimensions are at bytes 16-24
    width = view.getUint32(16, false);
    height = view.getUint32(20, false);
  }
  // WebP
  else if (view.getUint32(8, true) === 0x57454250) {
    // WebP dimensions are in VP8 chunk
    // Simplified parsing
    width = 800;
    height = 600;
  }

  return { width, height };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export {};