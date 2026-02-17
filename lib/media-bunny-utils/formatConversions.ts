import {
  Input,
  Output,
  ALL_FORMATS,
  Mp4OutputFormat,
  WebMOutputFormat,
  MkvOutputFormat,
  MovOutputFormat,
  Mp3OutputFormat,
  WavOutputFormat,
  OggOutputFormat,
  FlacOutputFormat,
  MpegTsOutputFormat,
  BufferTarget,
  BlobSource,
  Conversion as MediabunnyConversion,
} from "mediabunny";

/**
 * Supported input formats
 */
export const SUPPORTED_INPUT_FORMATS = [
  "mp4",
  "mov",
  "webm",
  "mkv",
  "avi",
  "flv",
  "mp3",
  "wav",
  "aac",
  "flac",
  "ogg",
  "m4a",
  "mts",
  "ts",
] as const;

/**
 * Supported output formats
 */
export const SUPPORTED_OUTPUT_FORMATS = [
  "mp4",
  "mov",
  "webm",
  "mkv",
  "mp3",
  "wav",
  "ogg",
  "flac",
] as const;

/**
 * Audio formats
 */
export const AUDIO_FORMATS = [
  "mp3",
  "wav",
  "aac",
  "flac",
  "ogg",
  "m4a",
] as const;

/**
 * Video formats
 */
export const VIDEO_FORMATS = [
  "mp4",
  "mov",
  "webm",
  "mkv",
  "avi",
  "flv",
  "mts",
  "ts",
] as const;

/**
 * Video codec options
 */
export const VIDEO_CODECS = {
  h264: "avc1.42E01E",
  h265: "hev1.1.6.L93.B0",
  vp8: "vp8",
  vp9: "vp09.00.50.08",
  av1: "av01.0.04M.08",
} as const;

/**
 * Audio codec options
 */
export const AUDIO_CODECS = {
  aac: "mp4a.40.2",
  opus: "opus",
  mp3: "mp3",
  vorbis: "vorbis",
  flac: "fLaC",
} as const;

/**
 * Format conversion map to determine appropriate output format classes
 */
const FORMAT_MAP: Record<string, () => any> = {
  mp4: () => new Mp4OutputFormat(),
  mov: () => new MovOutputFormat(),
  webm: () => new WebMOutputFormat(),
  mkv: () => new MkvOutputFormat(),
  mp3: () => new Mp3OutputFormat(),
  wav: () => new WavOutputFormat(),
  ogg: () => new OggOutputFormat(),
  flac: () => new FlacOutputFormat(),
};

/**
 * Interface for conversion options
 */
export interface ConversionOptions {
  inputFormat?: string;
  outputFormat: string;
  videoCodec?: keyof typeof VIDEO_CODECS;
  audioCodec?: keyof typeof AUDIO_CODECS;
  videoBitrate?: number;
  audioBitrate?: number;
  width?: number;
  height?: number;
  fastStart?: boolean;
  preserveMetadata?: boolean;
  removeAudio?: boolean;
  removeVideo?: boolean;
  onProgress?: (progress: number) => void;
}

/**
 * Interface for conversion result
 */
export interface ConversionResult {
  success: boolean;
  blob?: Blob;
  error?: string;
  discardedTracks?: any[];
}

/**
 * Main conversion service class
 */
export class VideoConverter {
  /**
   * Determines if a conversion between two formats is possible
   */
  static isConversionPossible(from: string, to: string): boolean {
    return (
      SUPPORTED_INPUT_FORMATS.includes(from as any) &&
      SUPPORTED_OUTPUT_FORMATS.includes(to as any)
    );
  }

  /**
   * Get all possible output formats for a given input format
   */
  static getPossibleOutputFormats(inputFormat: string): string[] {
    if (!SUPPORTED_INPUT_FORMATS.includes(inputFormat as any)) {
      return [];
    }

    return [...SUPPORTED_OUTPUT_FORMATS].filter((x) => x != inputFormat);
  }

  /**
   * Perform the actual conversion using Mediabunny
   */
  static async convert(
    inputFile: File,
    options: ConversionOptions,
  ): Promise<ConversionResult> {
    const {
      outputFormat,
      videoCodec,
      audioCodec,
      videoBitrate,
      audioBitrate,
      width,
      height,
      fastStart,
      preserveMetadata = true,
      removeAudio = false,
      removeVideo = false,
      onProgress,
    } = options;

    console.log("remove video", removeVideo);

    try {
      // Validate output format
      if (!SUPPORTED_OUTPUT_FORMATS.includes(outputFormat as any)) {
        throw new Error(`Unsupported output format: ${outputFormat}`);
      }

      // Create input source
      const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
      });

      // Determine output format
      const outputFormatInstance = FORMAT_MAP[outputFormat]?.();
      if (!outputFormatInstance) {
        throw new Error(`Unknown output format: ${outputFormat}`);
      }

      // Set format-specific options
      if (fastStart && typeof outputFormatInstance.fastStart !== "undefined") {
        outputFormatInstance.fastStart = true;
      }

      // Create output
      const output = new Output({
        format: outputFormatInstance,
        target: new BufferTarget(),
      });

      // Prepare conversion options
      const conversionOptions: any = {
        input,
        output,
      };

      // Set video options
      if (removeVideo) {
        conversionOptions.video = { discard: true };
      } else if (videoCodec || videoBitrate || width || height) {
        conversionOptions.video = {};
        if (videoCodec) {
          conversionOptions.video.codec = VIDEO_CODECS[videoCodec];
        }
        if (videoBitrate) {
          conversionOptions.video.bitrate = videoBitrate;
        }
        if (width || height) {
          conversionOptions.video.width = width;
          conversionOptions.video.height = height;
        }
      } else {
        // If not removing video and no specific video options, allow default processing
        conversionOptions.video = {};
      }

      // Set audio options
      if (removeAudio) {
        conversionOptions.audio = { discard: true };
      } else if (audioCodec || audioBitrate) {
        conversionOptions.audio = {};
        if (audioCodec) {
          conversionOptions.audio.codec = AUDIO_CODECS[audioCodec];
        }
        if (audioBitrate) {
          conversionOptions.audio.bitrate = audioBitrate;
        }
      } else {
        // If not removing audio and no specific audio options, allow default processing
        conversionOptions.audio = {};
      }

      // For audio-only output (when removing video), ensure audio processing is enabled
      if (removeVideo) {
        // Make sure audio options are preserved even if not explicitly set
        if (!conversionOptions.audio) {
          conversionOptions.audio = {};
        }
      }

      // Initialize conversion
      const conversion = await MediabunnyConversion.init(conversionOptions);

      // Check if conversion is valid
      if (!conversion.isValid) {
        return {
          success: false,
          error: "Invalid conversion - some tracks may be discarded",
          discardedTracks: conversion.discardedTracks,
        };
      }

      // Set up progress callback
      if (onProgress) {
        conversion.onProgress = (progress: number) => {
          onProgress(progress);
        };
      }

      // Execute conversion
      await conversion.execute();

      // Get result
      const outputTarget = output.target as BufferTarget;
      const resultBuffer = outputTarget.buffer;
      if (!resultBuffer) {
        throw new Error("Conversion produced no output buffer");
      }
      const mimeType = this.getMimeType(outputFormat);
      const resultBlob = new Blob([resultBuffer], { type: mimeType });

      // Clean up
      input[Symbol.dispose]();

      return {
        success: true,
        blob: resultBlob,
      };
    } catch (error: any) {
      console.error("Conversion failed:", error);
      return {
        success: false,
        error: error.message || "Conversion failed",
      };
    }
  }

  /**
   * Get MIME type for a given format
   */
  static getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      mp4: "video/mp4",
      mov: "video/quicktime",
      webm: "video/webm",
      mkv: "video/x-matroska",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      ogg: "audio/ogg",
      flac: "audio/flac",
    };

    return mimeTypes[format] || "application/octet-stream";
  }

  /**
   * Get all possible conversion combinations
   */
  static getAllPossibleConversions(): Array<{ from: string; to: string }> {
    const conversions: Array<{ from: string; to: string }> = [];

    for (const inputFormat of SUPPORTED_INPUT_FORMATS) {
      const possibleOutputs = this.getPossibleOutputFormats(inputFormat);
      for (const outputFormat of possibleOutputs) {
        conversions.push({ from: inputFormat, to: outputFormat });
      }
    }

    return conversions;
  }
}

/**
 * Convenience function to perform conversion with default options
 */
export const convertFile = async (
  inputFile: File,
  outputFormat: string,
): Promise<ConversionResult> => {
  return VideoConverter.convert(inputFile, { outputFormat });
};

/**
 * Get all supported conversions for UI purposes
 */
export const getSupportedConversions = () => {
  return VideoConverter.getAllPossibleConversions();
};
