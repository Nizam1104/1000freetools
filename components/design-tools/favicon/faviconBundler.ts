// Direct favicon generation without workers
export interface FaviconOptions {
  text?: string;
  imageUrl?: string;
  emoji?: string;
  contentType?: 'text' | 'image' | 'emoji';
  backgroundColor: string;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  shape: "square" | "circle" | "rounded";
  canvasSize: number;
}

export interface FaviconBundle {
  ico: string;
  png16: string;
  png32: string;
  png64: string;
  png150: string;
  png180: string;
  png192: string;
  png512: string;
}

export class CanvasToIconGenerator {
  private canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement("canvas");
  }

  /**
   * Generate favicon bundle directly on the main thread
   */
  async generateFaviconBundle(options: FaviconOptions): Promise<FaviconBundle> {
    // Create the base canvas
    await this.createBaseCanvasAsync(options);

    // Use the existing FaviconGenerator class
    const generator = new FaviconGenerator(this.canvas);
    return generator.bundle();
  }

  /**
   * Async version of createBaseCanvas to handle image loading
   */
  private async createBaseCanvasAsync(options: FaviconOptions): Promise<void> {
    const {
      canvasSize,
      text,
      imageUrl,
      emoji,
      contentType = 'text',
      backgroundColor,
      fontColor = '#FFFFFF',
      fontFamily = 'Arial, sans-serif',
      fontSize = 64,
      fontWeight = 'bold',
      shape,
    } = options;

    // Set canvas size (2x for retina displays)
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;

    const ctx = this.canvas.getContext("2d")!;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw background
    this.drawBackground(ctx, backgroundColor, shape, canvasSize);

    // Draw content based on type
    switch (contentType) {
      case 'image':
        if (imageUrl) {
          await this.drawImage(ctx, imageUrl, canvasSize);
        }
        break;
      case 'emoji':
        if (emoji) {
          this.drawEmoji(ctx, emoji, canvasSize);
        }
        break;
      case 'text':
      default:
        if (text && text.trim() !== "") {
          this.drawText(
            ctx,
            text,
            fontColor,
            fontFamily,
            fontSize,
            fontWeight,
            canvasSize,
          );
        }
    }
  }

  /**
   * Create the base canvas with text and background
   */
  private createBaseCanvas(options: FaviconOptions): void {
    const {
      canvasSize,
      text,
      imageUrl,
      emoji,
      contentType = 'text',
      backgroundColor,
      fontColor = '#FFFFFF',
      fontFamily = 'Arial, sans-serif',
      fontSize = 64,
      fontWeight = 'bold',
      shape,
    } = options;

    // Set canvas size (2x for retina displays)
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;

    const ctx = this.canvas.getContext("2d")!;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw background
    this.drawBackground(ctx, backgroundColor, shape, canvasSize);

    // Draw content based on type
    switch (contentType) {
      case 'image':
        if (imageUrl) {
          this.drawImage(ctx, imageUrl, canvasSize);
        }
        break;
      case 'emoji':
        if (emoji) {
          this.drawEmoji(ctx, emoji, canvasSize);
        }
        break;
      case 'text':
      default:
        if (text && text.trim() !== "") {
          this.drawText(
            ctx,
            text,
            fontColor,
            fontFamily,
            fontSize,
            fontWeight,
            canvasSize,
          );
        }
    }
  }

  /**
   * Draw background shape
   */
  private drawBackground(
    ctx: CanvasRenderingContext2D,
    backgroundColor: string,
    shape: string,
    size: number,
  ): void {
    ctx.fillStyle = backgroundColor;

    switch (shape) {
      case "square":
        ctx.fillRect(0, 0, size, size);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "rounded":
        const radius = size / 10;
        ctx.beginPath();
        ctx.moveTo(size, size);
        ctx.arcTo(0, size, 0, 0, radius);
        ctx.arcTo(0, 0, size, 0, radius);
        ctx.arcTo(size, 0, size, size, radius);
        ctx.arcTo(size, size, 0, size, radius);
        ctx.fill();
        break;
      default:
        ctx.fillRect(0, 0, size, size);
    }
  }

  /**
   * Draw centered text
   */
  private drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    fontColor: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: string,
    size: number,
  ): void {
    ctx.fillStyle = fontColor;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);
  }

  /**
   * Draw an image on the canvas
   */
  private async drawImage(
    ctx: CanvasRenderingContext2D,
    imageUrl: string,
    size: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Handle CORS if needed
      img.onload = () => {
        try {
          // Calculate dimensions to fit image in the canvas while maintaining aspect ratio
          const scale = Math.min(size / img.width, size / img.height);
          const width = img.width * scale;
          const height = img.height * scale;
          const x = (size - width) / 2;
          const y = (size - height) / 2;

          ctx.drawImage(img, x, y, width, height);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = (error) => {
        console.error('Error loading image:', error);
        // Draw a fallback if image fails to load
        this.drawFallbackContent(ctx, size);
        resolve(); // Resolve anyway to continue processing
      };
      img.src = imageUrl;
    });
  }

  /**
   * Draw an emoji on the canvas
   */
  private drawEmoji(
    ctx: CanvasRenderingContext2D,
    emoji: string,
    size: number,
  ): void {
    // Use a large font size for the emoji
    const fontSize = size * 0.8;
    ctx.font = `normal ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Enable text smoothing for better emoji appearance
    ctx.imageSmoothingEnabled = true;
    ctx.textRendering = 'optimizeLegibility';

    ctx.fillText(emoji, size / 2, size / 2);
  }

  /**
   * Draw fallback content when image fails to load
   */
  private drawFallbackContent(
    ctx: CanvasRenderingContext2D,
    size: number,
  ): void {
    ctx.fillStyle = '#CCCCCC';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IMG', size / 2, size / 2);
  }
}

/**
 * Generate favicon bundle directly without workers
 */
export async function generateFaviconBundle(
  options: FaviconOptions,
): Promise<FaviconBundle> {
  const generator = new CanvasToIconGenerator();
  return generator.generateFaviconBundle(options);
}

class Resize {
  /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */
  generate(width: number, height: number) {
    while (this.canvas.width / 2 >= width)
      this._resize(this.canvas.width / 2, this.canvas.height / 2);
    if (this.canvas.width > width) this._resize(width, height);
    return this.canvas;
  }

  /**
   * Simple resize of a canvas element.
   */
  private _resize(width: number, height: number) {
    const canvas = document.createElement("canvas");
    const resizedContext = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;
    resizedContext.drawImage(this.canvas, 0, 0, width, height);
    this.canvas = canvas;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Ico {
  generate(sizes = [16, 32, 48]) {
    const canvasMaster = new Resize(this.canvas).generate(128, 128);
    const iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
    let iconDirectoryEntries = "";
    let bitmapData = "";

    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const canvas = new Resize(canvasMaster).generate(size, size);
      const context = canvas.getContext("2d")!;
      const width = canvas.width;
      const height = canvas.height;
      // const imageData = context.getImageData(0, 0, width, height);
      const bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
      const bitmapImageData = this.createBitmapImageData(canvas);
      const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
      const bitmapOffset = this.calculateBitmapOffset(sizes, i);
      iconDirectoryEntries += this.createIconDirectoryEntry(
        width,
        height,
        bitmapSize,
        bitmapOffset,
      );
      bitmapData += bitmapInfoHeader + bitmapImageData;
    }

    const binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
    const base64 = "data:image/x-icon;base64," + btoa(binary);
    return base64;
  }

  /**
   * Calculates the location to the bitmap entry.
   */
  private calculateBitmapOffset(sizes: number[], entry: number) {
    let offset = 6; // icon header size
    offset += 16 * sizes.length; // icon entry header size
    // size of previous bitmaps
    for (let i = 0; i < entry; i++) {
      const size = sizes[i];
      offset += 40; // bitmap header size
      offset += 4 * size * size; // bitmap data size
      offset += (2 * size * size) / 8; // bitmap mask size
    }
    return offset;
  }

  private createBitmapImageData(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bitmapPixelData = new Uint32Array(imageData.data.buffer);
    // const bitmapBuffer = bitmapPixelData.reverse().buffer;
    const bitmapMask = new Uint8Array((canvas.width * canvas.height * 2) / 8);
    bitmapMask.fill(0);
    let binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
    binary += this.Uint8ArrayToBinary(bitmapMask);
    return binary;
  }

  private canvasToBitmap(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const rgbaData8 = imageData.data;
    const bgraData8 = new Uint8ClampedArray(imageData.data.length);

    for (let i = 0; i < rgbaData8.length; i += 4) {
      const r = rgbaData8[i];
      const g = rgbaData8[i + 1];
      const b = rgbaData8[i + 2];
      const a = rgbaData8[i + 3];
      bgraData8[i] = b;
      bgraData8[i + 1] = g;
      bgraData8[i + 2] = r;
      bgraData8[i + 3] = a;
    }

    const bgraData32 = new Uint32Array(bgraData8.buffer);
    const bgraData32Rotated = new Uint32Array(bgraData32.length);

    for (let i1 = 0; i1 < bgraData32.length; i1++) {
      const xPos = i1 % canvas.width;
      const yPos = Math.floor(i1 / canvas.width);
      const xPosRotated = xPos;
      const yPosRotated = canvas.height - 1 - yPos;
      const indexRotated = yPosRotated * canvas.width + xPosRotated;
      const pixel = bgraData32[i1];
      bgraData32Rotated[indexRotated] = pixel;
    }

    return bgraData32Rotated.buffer;
  }

  private createIconDirectoryHeader(numImages: number) {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true); // Reserved. Must always be 0.
    view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
    view.setUint16(4, numImages, true); // Number of images.
    return this.arrayBufferToBinary(buffer);
  }

  private createIconDirectoryEntry(
    width: number,
    height: number,
    size: number,
    offset: number,
  ) {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
    view.setUint8(1, height); // Pixel height (0..256). 0 = 256 pixels.
    view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
    view.setUint8(3, 0); // Reserved. Should be 0.
    view.setUint16(4, 1, true); // Color planes. 0 or 1.
    view.setUint16(6, 32, true); // Specifies bits per pixel.
    view.setUint32(8, size, true); // Image size (bytes).
    view.setUint32(12, offset, true); // Offset to BMP of PNG.
    return this.arrayBufferToBinary(buffer);
  }

  private createBitmapInfoHeader(width: number, height: number) {
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);
    view.setUint32(0, 40, true); // Header size (40 bytes).
    view.setInt32(4, width, true); // BMP width.
    view.setInt32(8, 2 * height, true); // BMP height.
    view.setUint16(12, 1, true); // Number of color planes. Must be 1.
    view.setUint16(14, 32, true); // Bits per pixel
    view.setUint32(16, 0, true); // Compression method. 0 = none.
    view.setUint32(20, 0, true); // Image size (bytes). 0 = no compression.
    view.setUint32(24, 0, true); // Horizontal resolution.
    view.setUint32(28, 0, true); // Vertical resolution.
    view.setUint32(32, 0, true); // Number of colors. 0 = default.
    view.setUint32(36, 0, true); // Number of important colors. 0 =  all
    return this.arrayBufferToBinary(buffer);
  }

  private arrayBufferToBinary(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return binary;
  }

  private Uint8ArrayToBinary(Uint8Array: Uint8Array) {
    let binary = "";
    const bytes = Uint8Array;
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return binary;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Png {
  generate(size: number) {
    return new Resize(this.canvas).generate(size, size).toDataURL();
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Bundle {
  generate() {
    const ico = new Ico(this.canvas);
    const png = new Png(this.canvas);
    return {
      ico: ico.generate([16, 32, 48]),
      png16: png.generate(16),
      png32: png.generate(32),
      png64: png.generate(64),
      png150: png.generate(150),
      png180: png.generate(180),
      png192: png.generate(192),
      png512: png.generate(512),
    };
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class FaviconGenerator {
  bundle() {
    return new Bundle(this.canvas).generate();
  }

  ico(sizes?: number[]) {
    return new Ico(this.canvas).generate(sizes);
  }

  png(size: number) {
    return new Png(this.canvas).generate(size);
  }

  resize(size: number) {
    return new Resize(this.canvas).generate(size, size);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}
