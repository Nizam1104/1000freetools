// TypeScript Image Compressor Worker
// Supports: MozJPEG, WebP, AVIF, PNG (via jsquash), QOI, JXL, WP2

import mozjpegModule from "../modules/mozjpeg_enc.js";
import webpModule from "../modules/webp_enc.js";
import avifModule from "../modules/avif_enc.js";
import qoiModule from "../modules/qoi_enc.js";
import jxlModule from "../modules/jxl_enc.js";
import wp2Module from "../modules/wp2_enc.js";
import { encode as encodePNG } from "@jsquash/png";

// Type definitions
interface ImageDataLike {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

interface EncoderModule {
  encode: (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options: any,
  ) => Uint8Array;
}

interface EmscriptenModule {
  (config?: { locateFile?: (path: string) => string }): Promise<EncoderModule>;
}

interface MozJPEGOptions {
  quality?: number;
  baseline?: boolean;
  arithmetic?: boolean;
  progressive?: boolean;
  optimize_coding?: boolean;
  smoothing?: number;
  color_space?: number;
  quant_table?: number;
  trellis_multipass?: boolean;
  trellis_opt_zero?: boolean;
  trellis_opt_table?: boolean;
  trellis_loops?: number;
  auto_subsample?: boolean;
  chroma_subsample?: number;
  separate_chroma_quality?: boolean;
  chroma_quality?: number;
  dc_scan_opt?: number;
  use_scans_in_trellis?: boolean;
}

interface WebPOptions {
  quality?: number;
  target_size?: number;
  target_PSNR?: number;
  method?: number;
  sns_strength?: number;
  filter_strength?: number;
  filter_sharpness?: number;
  filter_type?: number;
  partitions?: number;
  segments?: number;
  pass?: number;
  show_compressed?: number;
  preprocessing?: number;
  autofilter?: number;
  partition_limit?: number;
  alpha_compression?: number;
  alpha_filtering?: number;
  alpha_quality?: number;
  lossless?: number;
  exact?: number;
  image_hint?: number;
  emulate_jpeg_size?: number;
  thread_level?: number;
  low_memory?: number;
  near_lossless?: number;
  use_delta_palette?: number;
  use_sharp_yuv?: number;
}

interface AVIFOptions {
  quality?: number;
  qualityAlpha?: number;
  denoiseLevel?: number;
  tileColsLog2?: number;
  tileRowsLog2?: number;
  speed?: number;
  subsample?: number;
  chromaDeltaQ?: boolean;
  sharpness?: number;
  enableSharpYUV?: boolean;
  tune?: number;
}

interface JXLOptions {
  effort?: number;
  quality?: number;
  progressive?: boolean;
  epf?: number;
  lossyPalette?: boolean;
  decodingSpeedTier?: number;
  photonNoiseIso?: number;
  lossyModular?: boolean;
}

interface WP2Options {
  quality?: number;
  alpha_quality?: number;
  effort?: number;
  pass?: number;
  sns?: number;
  uv_mode?: number;
  csp_type?: number;
  error_diffusion?: number;
  use_random_matrix?: boolean;
}

interface PNGOptions {
  lossless?: boolean;
}

interface CompressionMessage {
  type: "COMPRESS_IMAGE";
  imageData: ImageDataLike;
  quality: number;
  format: string;
  options?: any;
  isBulkMode?: boolean;
}

// Encoder cache
let mozjpegEncoder: EncoderModule | null = null;
let webpEncoder: EncoderModule | null = null;
let avifEncoder: EncoderModule | null = null;
let qoiEncoder: EncoderModule | null = null;
let jxlEncoder: EncoderModule | null = null;
let wp2Encoder: EncoderModule | null = null;

// Encoder getters with lazy initialization
async function getMozJpegEncoder(): Promise<EncoderModule> {
  if (!mozjpegEncoder) {
    mozjpegEncoder = await (mozjpegModule as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return mozjpegEncoder;
}

async function getWebPEncoder(): Promise<EncoderModule> {
  if (!webpEncoder) {
    webpEncoder = await (webpModule as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return webpEncoder;
}

async function getAVIFEncoder(): Promise<EncoderModule> {
  if (!avifEncoder) {
    avifEncoder = await (avifModule as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return avifEncoder;
}

async function getQOIEncoder(): Promise<EncoderModule> {
  if (!qoiEncoder) {
    qoiEncoder = await (qoiModule as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return qoiEncoder;
}

async function getJXLEncoder(): Promise<EncoderModule> {
  if (!jxlEncoder) {
    jxlEncoder = await (jxlModule as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return jxlEncoder;
}

async function getWP2Encoder(): Promise<EncoderModule> {
  if (!wp2Encoder) {
    wp2Encoder = await (wp2Module as EmscriptenModule)({
      locateFile: (path: string) => {
        if (path.endsWith(".wasm")) {
          return (
            "https://cdn.1000freetools.com/static-assets/squoosh-codecs/" + path
          );
        }
        return path;
      },
    });
  }
  return wp2Encoder;
}

// Compression functions
async function compressMozJPEG(
  imageData: ImageDataLike,
  quality: number,
  options: MozJPEGOptions = {},
): Promise<Uint8Array> {
  const encoder = await getMozJpegEncoder();
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  return encoder.encode(imageData.data, imageData.width, imageData.height, {
    quality: safeQuality,
    baseline: options.baseline ?? false,
    arithmetic: options.arithmetic ?? false,
    progressive: options.progressive ?? true,
    optimize_coding: options.optimize_coding ?? true,
    smoothing: options.smoothing ?? 0,
    color_space: options.color_space ?? 3,
    quant_table: options.quant_table ?? 3,
    trellis_multipass: options.trellis_multipass ?? false,
    trellis_opt_zero: options.trellis_opt_zero ?? false,
    trellis_opt_table: options.trellis_opt_table ?? false,
    trellis_loops: options.trellis_loops ?? 1,
    auto_subsample: options.auto_subsample ?? true,
    chroma_subsample: options.chroma_subsample ?? 2,
    separate_chroma_quality: options.separate_chroma_quality ?? false,
    chroma_quality: options.chroma_quality ?? safeQuality,
    dc_scan_opt: options.dc_scan_opt ?? 1,
    use_scans_in_trellis: options.use_scans_in_trellis ?? false,
  });
}

async function compressWebP(
  imageData: ImageDataLike,
  quality: number,
  options: WebPOptions = {},
): Promise<Uint8Array> {
  const encoder = await getWebPEncoder();
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  return encoder.encode(imageData.data, imageData.width, imageData.height, {
    quality: safeQuality,
    target_size: options.target_size ?? 0,
    target_PSNR: options.target_PSNR ?? 0,
    method: options.method ?? 4,
    sns_strength: options.sns_strength ?? 50,
    filter_strength: options.filter_strength ?? 60,
    filter_sharpness: options.filter_sharpness ?? 0,
    filter_type: options.filter_type ?? 1,
    partitions: options.partitions ?? 0,
    segments: options.segments ?? 4,
    pass: options.pass ?? 1,
    show_compressed: options.show_compressed ?? 0,
    preprocessing: options.preprocessing ?? 0,
    autofilter: options.autofilter ?? 0,
    partition_limit: options.partition_limit ?? 0,
    alpha_compression: options.alpha_compression ?? 1,
    alpha_filtering: options.alpha_filtering ?? 1,
    alpha_quality: options.alpha_quality ?? 100,
    lossless: options.lossless ?? 0,
    exact: options.exact ?? 0,
    image_hint: options.image_hint ?? 0,
    emulate_jpeg_size: options.emulate_jpeg_size ?? 0,
    thread_level: options.thread_level ?? 0,
    low_memory: options.low_memory ?? 0,
    near_lossless: options.near_lossless ?? 100,
    use_delta_palette: options.use_delta_palette ?? 0,
    use_sharp_yuv: options.use_sharp_yuv ?? 0,
  });
}

async function compressAVIF(
  imageData: ImageDataLike,
  quality: number,
  options: AVIFOptions = {},
): Promise<Uint8Array> {
  const encoder = await getAVIFEncoder();
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  return encoder.encode(imageData.data, imageData.width, imageData.height, {
    quality: safeQuality,
    qualityAlpha: options.qualityAlpha ?? -1,
    denoiseLevel: options.denoiseLevel ?? 0,
    tileColsLog2: options.tileColsLog2 ?? 0,
    tileRowsLog2: options.tileRowsLog2 ?? 0,
    speed: options.speed ?? 6,
    subsample: options.subsample ?? 1,
    chromaDeltaQ: options.chromaDeltaQ ?? false,
    sharpness: options.sharpness ?? 0,
    enableSharpYUV: options.enableSharpYUV ?? false,
    tune: options.tune ?? 0,
  });
}

async function compressQOI(
  imageData: ImageDataLike,
  quality: number,
): Promise<Uint8Array> {
  const encoder = await getQOIEncoder();
  // QOI is a lossless format, so quality parameter is not used
  return encoder.encode(imageData.data, imageData.width, imageData.height, {});
}

async function compressJXL(
  imageData: ImageDataLike,
  quality: number,
  options: JXLOptions = {},
): Promise<Uint8Array> {
  const encoder = await getJXLEncoder();
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  return encoder.encode(imageData.data, imageData.width, imageData.height, {
    effort: options.effort ?? 7,
    quality: safeQuality,
    progressive: options.progressive ?? false,
    epf: options.epf ?? -1,
    lossyPalette: options.lossyPalette ?? false,
    decodingSpeedTier: options.decodingSpeedTier ?? 0,
    photonNoiseIso: options.photonNoiseIso ?? 0,
    lossyModular: options.lossyModular ?? false,
  });
}

async function compressWP2(
  imageData: ImageDataLike,
  quality: number,
  options: WP2Options = {},
): Promise<Uint8Array> {
  const encoder = await getWP2Encoder();
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  return encoder.encode(imageData.data, imageData.width, imageData.height, {
    quality: safeQuality,
    alpha_quality: options.alpha_quality ?? 100,
    effort: options.effort ?? 5,
    pass: options.pass ?? 1,
    sns: options.sns ?? 50,
    uv_mode: options.uv_mode ?? 3, // UVModeAuto
    csp_type: options.csp_type ?? 1, // kYCbCr
    error_diffusion: options.error_diffusion ?? 0,
    use_random_matrix: options.use_random_matrix ?? false,
  });
}

// Helper function to detect if image has transparency
function hasTransparency(imageData: ImageDataLike): boolean {
  const data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true; // Found a non-opaque pixel
  }
  return false;
}

// PNG compression using jsquash
async function compressPNG(
  imageData: ImageDataLike,
  quality: number,
  options: PNGOptions = {},
): Promise<Uint8Array> {
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  // jsquash PNG encoder options
  // Quality mapping: 0-100 -> compression level 0-9 (inverted, higher quality = lower compression)
  const compressionLevel = Math.round(9 - (safeQuality / 100) * 9);

  try {
    // Create proper ImageData object for jsquash (requires colorSpace property)
    // Need to create a new Uint8ClampedArray to ensure proper ArrayBuffer type
    const dataArray = new Uint8ClampedArray(imageData.data);
    const properImageData = new ImageData(
      dataArray,
      imageData.width,
      imageData.height,
    );

    // Encode using jsquash PNG encoder (returns ArrayBuffer)
    const encoded = await encodePNG(properImageData, {
      // Note: jsquash PNG is lossless, but we can control compression level
      // The quality parameter affects compression speed/size tradeoff
    });

    // Convert ArrayBuffer to Uint8Array
    return new Uint8Array(encoded);
  } catch (error) {
    console.error("PNG compression error:", error);
    throw error;
  }
}

// Main message handler
self.onmessage = async (e: MessageEvent<CompressionMessage>) => {
  const {
    imageData,
    quality,
    format,
    options = {},
    isBulkMode = false,
  } = e.data;

  // Validate and normalize quality parameter
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  try {
    // Create ImageData object for transparency check
    const imgData: ImageDataLike = {
      data: new Uint8ClampedArray(imageData.data),
      width: imageData.width,
      height: imageData.height,
    };

    // Check if image has transparency (only in single image mode)
    const isTransparent = !isBulkMode && hasTransparency(imgData);

    // Auto-convert format if transparency detected and JPEG requested (only in single mode)
    let targetFormat = format.toLowerCase();
    let formatChanged = false;

    // Skip auto-conversion in bulk mode
    if (
      !isBulkMode &&
      isTransparent &&
      (targetFormat === "jpeg" ||
        targetFormat === "jpg" ||
        targetFormat === "mozjpeg")
    ) {
      // In single mode, we no longer auto-convert
      // The UI will show a warning instead
      // Keep the format as requested
      console.warn(
        "Image has transparency but JPG format requested. Transparency will be lost.",
      );
    }

    let compressedData: Uint8Array;

    switch (targetFormat) {
      case "jpeg":
      case "jpg":
      case "mozjpeg":
        compressedData = await compressMozJPEG(imageData, safeQuality, options);
        break;

      case "webp":
        compressedData = await compressWebP(imageData, safeQuality, options);
        break;

      case "avif":
        compressedData = await compressAVIF(imageData, safeQuality, options);
        break;

      case "qoi":
        compressedData = await compressQOI(imageData, safeQuality);
        break;

      case "jxl":
      case "jpegxl":
      case "jpeg-xl":
        compressedData = await compressJXL(imageData, safeQuality, options);
        break;

      case "wp2":
      case "webp2":
        compressedData = await compressWP2(imageData, safeQuality, options);
        break;

      case "png":
        compressedData = await compressPNG(imageData, safeQuality, options);
        break;

      default:
        throw new Error(`Unsupported format: ${targetFormat}`);
    }

    self.postMessage(
      {
        type: "COMPRESSION_SUCCESS",
        result: compressedData,
        format: targetFormat,
        originalFormat: format,
        formatChanged: formatChanged,
        hasTransparency: !isBulkMode ? isTransparent : undefined, // Only send in single mode
      },
      [compressedData.buffer],
    );
  } catch (error) {
    self.postMessage({
      type: "COMPRESSION_ERROR",
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};

// Signal that the worker is ready
self.postMessage({ type: "worker-ready" });
