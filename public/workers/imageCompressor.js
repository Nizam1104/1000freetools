// Polyfill for window object in Web Worker context
// This is needed because some libraries (like UPNG) reference window
if (typeof window === "undefined") {
  globalThis.window = self;
}

// import mozjpegModule from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/mozjpeg_enc.js';
// import webpModule from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/webp_enc.js';
// import avifModule from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/avif_enc.js';
// import qoiModule from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/qoi_enc.js';
// import jxlModule from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/jxl_enc.js';
// import wp2Module from 'https://cdn.1000freetools.com/static-assets/squoosh-codecs/wp2_enc.js';

// import from public foler 'public/modules'
import mozjpegModule from "/modules/mozjpeg_enc.js";
import webpModule from "/modules/webp_enc.js";
import avifModule from "/modules/avif_enc.js";
import qoiModule from "/modules/qoi_enc.js";
import wp2Module from "/modules/wp2_enc.js";
import UPNG from "/modules/upng.js";

let mozjpegEncoder = null;
let webpEncoder = null;
let avifEncoder = null;
let qoiEncoder = null;
let wp2Encoder = null;

async function getMozJpegEncoder() {
  if (!mozjpegEncoder) {
    mozjpegEncoder = await mozjpegModule({
      locateFile: (path) => {
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

async function getWebPEncoder() {
  if (!webpEncoder) {
    webpEncoder = await webpModule({
      locateFile: (path) => {
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

async function getAVIFEncoder() {
  if (!avifEncoder) {
    avifEncoder = await avifModule({
      locateFile: (path) => {
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

async function getQOIEncoder() {
  if (!qoiEncoder) {
    qoiEncoder = await qoiModule({
      locateFile: (path) => {
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

async function getWP2Encoder() {
  if (!wp2Encoder) {
    wp2Encoder = await wp2Module({
      locateFile: (path) => {
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

async function compressMozJPEG(imageData, quality, options = {}) {
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

async function compressWebP(imageData, quality, options = {}) {
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

async function compressAVIF(imageData, quality, options = {}) {
  try {
    const encoder = await getAVIFEncoder();
    const safeQuality =
      typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

    const result = encoder.encode(
      imageData.data,
      imageData.width,
      imageData.height,
      {
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
      },
    );

    // Reset encoder to free memory
    avifEncoder = null;

    return result;
  } catch (error) {
    // Reset encoder on error
    avifEncoder = null;
    throw error;
  }
}

async function compressQOI(imageData, quality) {
  const encoder = await getQOIEncoder();
  // QOI is a lossless format, so quality parameter is not used
  return encoder.encode(imageData.data, imageData.width, imageData.height, {});
}

async function compressWP2(imageData, quality, options = {}) {
  try {
    const encoder = await getWP2Encoder();
    const safeQuality =
      typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

    const result = encoder.encode(
      imageData.data,
      imageData.width,
      imageData.height,
      {
        quality: safeQuality,
        alpha_quality: options.alpha_quality ?? 100,
        effort: options.effort ?? 5,
        pass: options.pass ?? 1,
        sns: options.sns ?? 50,
        uv_mode: options.uv_mode ?? 3, // UVModeAuto
        csp_type: options.csp_type ?? 1, // kYCbCr
        error_diffusion: options.error_diffusion ?? 0,
        use_random_matrix: options.use_random_matrix ?? false,
      },
    );

    // Reset encoder to free memory
    wp2Encoder = null;

    return result;
  } catch (error) {
    // Reset encoder on error
    wp2Encoder = null;
    throw error;
  }
}

async function compressPNG(imageDataBuffer, quality, options = {}) {
  const decoded = UPNG.decode(imageDataBuffer);
  const rgbFrames = UPNG.toRGBA8(decoded);
  // For PNG, determine if lossless based on options
  const compressionLevel = options.lossless ? 256 : quality; // 256 for lossless, or use quality level
  const compressed = UPNG.encode(
    rgbFrames,
    decoded.width,
    decoded.height,
    compressionLevel,
  );
  console.log("here");
  // Return the raw encoded bytes, not as a Blob
  return new Uint8Array(compressed);
}

self.onmessage = async (e) => {
  const { imageData, quality, format, options = {} } = e.data;
  // Validate and normalize quality parameter here as well
  const safeQuality =
    typeof quality === "number" ? Math.max(0, Math.min(100, quality)) : 75;

  try {
    let compressedData;

    switch (format.toLowerCase()) {
      case "jpeg":
      case "jpg":
      case "mozjpeg":
        compressedData = await compressMozJPEG(imageData, safeQuality, options);
        console.log("compressedData", compressedData.buffer);
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

      case "wp2":
      case "webp2":
        compressedData = await compressWP2(imageData, safeQuality, options);
        break;

      case "png":
        compressedData = await compressPNG(
          imageData.buffer,
          safeQuality,
          options,
        );
        console.log("compressedData", compressedData.buffer);
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Determine if the result contains a transferable buffer
    let hasTransferable = false;
    let transferables = [];

    // Check if compressedData has a buffer property that is transferable
    if (compressedData && compressedData.buffer instanceof ArrayBuffer) {
      hasTransferable = true;
      transferables = [compressedData.buffer];
    }

    if (hasTransferable) {
      self.postMessage(
        {
          type: "COMPRESSION_SUCCESS",
          result: compressedData,
          format: format,
        },
        transferables,
      );
    } else {
      // If it's not transferable, send without transferables
      self.postMessage({
        type: "COMPRESSION_SUCCESS",
        result: compressedData,
        format: format,
      });
    }
  } catch (error) {
    // Provide more detailed error information
    const errorMessage = error.message || String(error);
    const detailedError = `${format.toUpperCase()} compression failed: ${errorMessage}`;

    self.postMessage({
      type: "COMPRESSION_ERROR",
      error: detailedError,
      stack: error.stack,
      format: format,
    });
  }
};

// Signal that the worker is ready
self.postMessage({ type: "worker-ready" });
