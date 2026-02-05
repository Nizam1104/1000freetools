"use client";

import React, { useState, useCallback } from "react";
import {
  getImageCompressorWorker,
  releaseImageCompressorWorker,
} from "@/lib/workerManager";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NextImage from "next/image";
import ImageComparisonSlider from "./ImageComparisonSlider";
import { zipAndDownloadFiles } from "@/utils/zipFiles";
import { decodeQoiFormat, decodeJxlFormat } from "@/utils/decodImageFormats";

// Helper function to get ImageData from file
const getImageDataFromFile = async (
  file: File,
  maxDimension: number = 0,
): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Resize if maxDimension is specified
      if (maxDimension > 0) {
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      resolve(imageData);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};

// Format-specific option types
interface MozJPEGOptions {
  progressive?: boolean;
  optimize_coding?: boolean;
  smoothing?: number;
  chroma_subsample?: number;
}

interface WebPOptions {
  lossless?: number;
  method?: number;
  near_lossless?: number;
  alpha_quality?: number;
}

interface AVIFOptions {
  speed?: number;
  subsample?: number;
  enableSharpYUV?: boolean;
  sharpness?: number;
}

interface JXLOptions {
  effort?: number;
  progressive?: boolean;
  lossyPalette?: boolean;
}

interface WP2Options {
  effort?: number;
  sns?: number;
  uv_mode?: number;
}

interface PNGOptions {
  lossless?: boolean;
}

interface ImageCompressorProps {
  initialQuality?: number;
  initialOutputFormat?: string;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({
  initialQuality = 0.75,
  initialOutputFormat = "mozjpeg",
}) => {
  // Single image state
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showCompressAgain, setShowCompressAgain] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [hasTransparency, setHasTransparency] = useState<boolean>(false);

  // Bulk processing state
  const [isBulkMode, setIsBulkMode] = useState<boolean>(false);
  const [preserveFormats, setPreserveFormats] = useState<boolean>(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkResults, setBulkResults] = useState<
    Array<{
      file: File;
      originalUrl: string;
      compressedUrl: string | null;
      originalSize: number;
      compressedSize: number | null;
      outputFormat?: string; // Track the format used for this image
      status: "pending" | "processing" | "completed" | "error";
      error?: string;
    }>
  >([]);
  const [bulkProcessing, setBulkProcessing] = useState<boolean>(false);
  const [bulkProgress, setBulkProgress] = useState<number>(0);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const [allProcessed, setAllProcessed] = useState<boolean>(false);

  // Compression settings
  const [quality, setQuality] = useState<number>(initialQuality);
  const [outputFormat, setOutputFormat] = useState<string>(initialOutputFormat);

  // Dimension settings
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Advanced options visibility
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  // Format-specific options
  const [mozjpegOptions, setMozjpegOptions] = useState<MozJPEGOptions>({
    progressive: true,
    optimize_coding: true,
    smoothing: 0,
    chroma_subsample: 2,
  });

  const [webpOptions, setWebpOptions] = useState<WebPOptions>({
    lossless: 0,
    method: 4,
    near_lossless: 100,
    alpha_quality: 100,
  });

  const [avifOptions, setAVIFOptions] = useState<AVIFOptions>({
    speed: 6,
    subsample: 1,
    enableSharpYUV: false,
    sharpness: 0,
  });

  const [jxlOptions, setJXLOptions] = useState<JXLOptions>({
    effort: 7,
    progressive: false,
    lossyPalette: false,
  });

  const [wp2Options, setWP2Options] = useState<WP2Options>({
    effort: 5,
    sns: 50,
    uv_mode: 3,
  });

  const [pngOptions, setPngOptions] = useState<PNGOptions>({
    lossless: false, // Default to lossy compression
  });

  // Effect to check if all images have been processed
  React.useEffect(() => {
    if (!bulkProcessing && bulkResults.length > 0) {
      const allCompleted = bulkResults.every(
        (result) => result.status === "completed" || result.status === "error",
      );
      if (allCompleted) {
        const allSuccessful = bulkResults.every(
          (result) => result.status === "completed",
        );
        setAllProcessed(allSuccessful);
      }
    }
  }, [bulkResults, bulkProcessing]);

  // Function to download all processed images as a zip
  const handleDownloadAll = useCallback(async () => {
    if (!allProcessed) return;

    // Extract the files that were successfully processed
    const processedFiles = bulkResults
      .filter((result) => result.status === "completed" && result.compressedUrl)
      .map((result) => {
        // Use the stored outputFormat for this specific image
        const fileExtension =
          result.outputFormat === "mozjpeg"
            ? "jpg"
            : result.outputFormat || "jpg";
        const newFilename = result.file.name.replace(
          /\.[^/.]+$/,
          `.${fileExtension}`,
        );

        // Since we have compressedUrl as an object URL, we need to fetch the blob
        // TS knows compressedUrl is not null here due to the filter
        return fetch(result.compressedUrl!)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], newFilename, {
                type: `image/${result.outputFormat || "jpeg"}`,
              }),
          );
      });

    try {
      // Wait for all file objects to be created
      const files = await Promise.all(processedFiles);
      // Zip and download the files
      await zipAndDownloadFiles(files, `compressed-images-${Date.now()}.zip`);
    } catch (error) {
      console.error("Error downloading files:", error);
      setBulkError("Failed to download files");
    }
  }, [allProcessed, bulkResults, outputFormat]);

  // Get current format options
  const getCurrentFormatOptions = () => {
    switch (outputFormat) {
      case "mozjpeg":
      case "jpeg":
      case "jpg":
        return mozjpegOptions;
      case "webp":
        return webpOptions;
      case "avif":
        return avifOptions;
      case "jxl":
      case "jpegxl":
        return jxlOptions;
      case "wp2":
      case "webp2":
        return wp2Options;
      case "png":
        return pngOptions;
      default:
        return {};
    }
  };

  const compressImage = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);

      try {
        // Get worker from manager
        const worker = await getImageCompressorWorker();

        // Get ImageData from the original file
        const maxDimension = Math.max(maxWidth || 0, maxHeight || 0);
        const imageData = await getImageDataFromFile(file, maxDimension);

        // Store original dimensions
        setImageDimensions({
          width: imageData.width,
          height: imageData.height,
        });

        // Get format-specific options
        const formatOptions = getCurrentFormatOptions();

        // Send ImageData to worker for compression
        const compressedBlob: Blob = await new Promise((resolve, reject) => {
          if (!worker) return reject(new Error("Worker not available."));

          const handleMessage = (e: MessageEvent) => {
            if (e.data.type === "COMPRESSION_SUCCESS") {
              // Capture transparency status
              if (e.data.hasTransparency !== undefined) {
                setHasTransparency(e.data.hasTransparency);
              }

              const resultBlob = new Blob([e.data.result], {
                type: `image/${outputFormat}`,
              });
              worker.removeEventListener("message", handleMessage);
              worker.removeEventListener("error", handleError);
              resolve(resultBlob);
            } else if (e.data.type === "COMPRESSION_ERROR") {
              worker.removeEventListener("message", handleMessage);
              worker.removeEventListener("error", handleError);
              reject(new Error(e.data.error));
            }
          };

          const handleError = (e: ErrorEvent) => {
            worker.removeEventListener("message", handleMessage);
            worker.removeEventListener("error", handleError);
            reject(new Error(`Worker error: ${e.message}`));
          };

          worker.addEventListener("message", handleMessage);
          worker.addEventListener("error", handleError);

          // Post message with transferable ImageData.data
          worker.postMessage(
            {
              type: "COMPRESS_IMAGE",
              imageData: {
                data: imageData.data,
                width: imageData.width,
                height: imageData.height,
              },
              format: outputFormat,
              quality: quality * 100, // Convert 0-1 to 0-100
              options: formatOptions,
              isBulkMode: false, // Single image mode
            },
            [imageData.data.buffer],
          );
        });

        // Release worker back to manager
        releaseImageCompressorWorker();

        if (outputFormat === "qoi") {
          const dataUrl = await decodeQoiFormat(compressedBlob);
          setCompressedImage(dataUrl || "");
        } else if (outputFormat === "jxl") {
          const dataUrl = await decodeJxlFormat(compressedBlob);
          setCompressedImage(dataUrl || "");
        } else {
          setCompressedImage(URL.createObjectURL(compressedBlob));
        }

        setCompressedSize(compressedBlob.size);
        setShowCompressAgain(false);
      } catch (e: any) {
        console.error("Compression process failed:", e);
        setError(`Image compression failed: ${e.message}.`);
        try {
          releaseImageCompressorWorker();
        } catch (releaseError) {
          console.error("Error releasing worker:", releaseError);
        }
      } finally {
        setLoading(false);
      }
    },
    [
      quality,
      outputFormat,
      maxWidth,
      maxHeight,
      mozjpegOptions,
      webpOptions,
      avifOptions,
      jxlOptions,
      wp2Options,
      pngOptions,
    ],
  );

  // Bulk processing functions
  const handleBulkFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      if (files.length === 0) {
        setBulkFiles([]);
        setBulkResults([]);
        return;
      }

      if (files.length > 100) {
        setBulkError("Maximum 100 images allowed at a time");
        event.target.value = "";
        return;
      }

      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length !== files.length) {
        setBulkError("Only image files are allowed");
        return;
      }

      setBulkError(null);
      setBulkFiles(imageFiles);

      // Create initial results
      const initialResults = imageFiles.map((file) => ({
        file,
        originalUrl: URL.createObjectURL(file),
        compressedUrl: null,
        originalSize: file.size,
        compressedSize: null,
        status: "pending" as const,
      }));

      setBulkResults(initialResults);
    },
    [],
  );

  const handleBulkProcessing = useCallback(async () => {
    if (bulkResults.length === 0) return;

    setBulkProcessing(true);
    setBulkError(null);
    setBulkProgress(0);

    const formatOptions = getCurrentFormatOptions();
    const maxDimension = Math.max(maxWidth || 0, maxHeight || 0);

    try {
      for (let i = 0; i < bulkResults.length; i++) {
        const result = bulkResults[i];

        // Update status to processing
        setBulkResults((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, status: "processing" as const } : r,
          ),
        );

        try {
          const worker = await getImageCompressorWorker();
          const imageData = await getImageDataFromFile(
            result.file,
            maxDimension,
          );

          // Determine the format to use
          let targetFormat = outputFormat;
          if (preserveFormats) {
            // Extract original format from file extension
            const extension =
              result.file.name.split(".").pop()?.toLowerCase() || "jpg";
            // Map common extensions to format names
            const formatMap: Record<string, string> = {
              jpg: "mozjpeg",
              jpeg: "mozjpeg",
              png: "png",
              webp: "webp",
              avif: "avif",
              jxl: "jxl",
              qoi: "qoi",
              wp2: "wp2",
            };
            targetFormat = formatMap[extension] || "mozjpeg";
          }

          const compressedBlob: Blob = await new Promise((resolve, reject) => {
            if (!worker) return reject(new Error("Worker not available."));

            const handleMessage = (e: MessageEvent) => {
              if (e.data.type === "COMPRESSION_SUCCESS") {
                const resultBlob = new Blob([e.data.result], {
                  type: `image/${targetFormat}`,
                });
                worker.removeEventListener("message", handleMessage);
                worker.removeEventListener("error", handleError);
                resolve(resultBlob);
              } else if (e.data.type === "COMPRESSION_ERROR") {
                worker.removeEventListener("message", handleMessage);
                worker.removeEventListener("error", handleError);
                reject(new Error(e.data.error));
              }
            };

            const handleError = (e: ErrorEvent) => {
              worker.removeEventListener("message", handleMessage);
              worker.removeEventListener("error", handleError);
              reject(new Error(`Worker error: ${e.message}`));
            };

            worker.addEventListener("message", handleMessage);
            worker.addEventListener("error", handleError);

            worker.postMessage(
              {
                type: "COMPRESS_IMAGE",
                imageData: {
                  data: imageData.data,
                  width: imageData.width,
                  height: imageData.height,
                },
                format: targetFormat,
                quality: quality * 100,
                options: formatOptions,
                isBulkMode: true, // Bulk mode - skip transparency checks
              },
              [imageData.data.buffer],
            );
          });

          releaseImageCompressorWorker();

          // Update with success
          setBulkResults((prev) =>
            prev.map((r, idx) =>
              idx === i
                ? {
                    ...r,
                    compressedUrl: URL.createObjectURL(compressedBlob),
                    compressedSize: compressedBlob.size,
                    outputFormat: targetFormat, // Store the format used
                    status: "completed" as const,
                  }
                : r,
            ),
          );
        } catch (error) {
          // Update with error
          setBulkResults((prev) =>
            prev.map((r, idx) =>
              idx === i
                ? {
                    ...r,
                    status: "error" as const,
                    error:
                      error instanceof Error ? error.message : "Unknown error",
                  }
                : r,
            ),
          );
        }

        // Update progress
        setBulkProgress(Math.round(((i + 1) / bulkResults.length) * 100));
      }
    } catch (error) {
      setBulkError(
        error instanceof Error ? error.message : "Bulk processing failed",
      );
    } finally {
      setBulkProcessing(false);
    }
  }, [
    bulkResults,
    quality,
    outputFormat,
    maxWidth,
    maxHeight,
    mozjpegOptions,
    webpOptions,
    avifOptions,
    jxlOptions,
    wp2Options,
    pngOptions,
    preserveFormats,
  ]);

  const clearBulkImages = useCallback(() => {
    // Revoke URLs to free memory
    bulkResults.forEach((result) => {
      URL.revokeObjectURL(result.originalUrl);
      if (result.compressedUrl) {
        URL.revokeObjectURL(result.compressedUrl);
      }
    });

    setBulkFiles([]);
    setBulkResults([]);
    setBulkError(null);
    setBulkProgress(0);
  }, [bulkResults]);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        setOriginalImage(null);
        setCompressedImage(null);
        setOriginalSize(null);
        setCompressedSize(null);
        setCurrentFile(null);
        setError(null);
        setShowCompressAgain(false);
        setImageDimensions(null);
        return;
      }

      // Detect file format and set output format accordingly
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const formatMap: Record<string, string> = {
        jpg: "mozjpeg",
        jpeg: "mozjpeg",
        png: "png",
        webp: "webp",
        avif: "avif",
        jxl: "jxl",
        qoi: "qoi",
        wp2: "wp2",
      };
      const detectedFormat = formatMap[extension] || "mozjpeg";
      setOutputFormat(detectedFormat);

      setOriginalImage(URL.createObjectURL(file));
      setOriginalSize(file.size);
      setCurrentFile(file);
      setCompressedImage(null);
      setCompressedSize(null);
      setShowCompressAgain(false);
      setError(null);

      // Get image dimensions for display
      try {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          setImageDimensions({
            width: img.width,
            height: img.height,
          });
          URL.revokeObjectURL(url);
        };
        img.src = url;
      } catch (e) {
        console.error("Failed to load image dimensions:", e);
      }
    },
    [],
  );

  const handleSettingsChange = useCallback(() => {
    if (currentFile && compressedImage) {
      setShowCompressAgain(true);
    }
  }, [currentFile, compressedImage]);

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    handleSettingsChange();
  };

  const handleFormatChange = (newFormat: string) => {
    setOutputFormat(newFormat);
    handleSettingsChange();
  };

  const handleCompressAgain = async () => {
    if (currentFile) {
      await compressImage(currentFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Mode Toggle */}
      <div className="mb-6 flex flex-col items-center justify-center">
        <div className="inline-flex rounded-lg border p-1">
          <Button
            variant={!isBulkMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsBulkMode(false)}
            className="px-4 py-2"
          >
            Single Image
          </Button>
          <Button
            variant={isBulkMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsBulkMode(true)}
            className="px-4 py-2"
          >
            Bulk Processing (Max 100)
          </Button>
        </div>
      </div>

      <TooltipProvider>
        <Card className="mb-8 border-0 shadow-lg w-screen sm:w-[80vw] md:w-[70vw] lg:w-[50vw]">
          <CardContent className="space-y-4">
            {/* File Upload Section */}
            <div className="rounded-lg border p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <Label htmlFor="file-input" className="text-sm font-semibold">
                  {isBulkMode ? "Upload Images" : "Upload Image"}
                </Label>
              </div>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple={isBulkMode}
                  onChange={
                    isBulkMode ? handleBulkFileChange : handleFileChange
                  }
                  className="sr-only"
                  disabled={loading || bulkProcessing}
                />

                {/* Mobile: Simple Button */}
                <div className="block sm:hidden">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    disabled={loading || bulkProcessing}
                  >
                    <label htmlFor="file-input" className="cursor-pointer">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {isBulkMode ? "Select Images" : "Select Image"}
                    </label>
                  </Button>
                </div>

                {/* Desktop: Drag Area */}
                <div className="hidden sm:block mx-auto">
                  <label
                    htmlFor="file-input"
                    className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-md cursor-pointer transition-all duration-200 ${
                      loading || bulkProcessing
                        ? "border-muted bg-muted cursor-not-allowed"
                        : "border-border bg-background hover:bg-muted hover:border-primary"
                    }`}
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-6 w-6 mb-1"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-xs mb-1">
                        <span className="font-medium">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs opacity-70">
                        {isBulkMode
                          ? "PNG, JPG, GIF up to 100 images"
                          : "PNG, JPG, GIF up to 10MB"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              {isBulkMode && (
                <p className="text-xs mt-1.5 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Maximum 100 images at a time
                </p>
              )}
            </div>

            {/* JPG Transparency Warning */}
            {!isBulkMode &&
              hasTransparency &&
              (outputFormat === "mozjpeg" ||
                outputFormat === "jpg" ||
                outputFormat === "jpeg") && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 p-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-amber-900 dark:text-amber-100">
                      jpg don't support transparence
                    </span>
                  </div>
                </div>
              )}

            {/* Settings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Quality Setting */}
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-semibold">Quality</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="px-2 py-0.5 rounded-full text-xs font-bold">
                        {Math.round(quality * 100)}%
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        {quality >= 0.9
                          ? "Excellent quality, larger file size"
                          : quality >= 0.7
                            ? "Good balance of quality and size"
                            : quality >= 0.5
                              ? "Moderate compression"
                              : "Maximum compression, lower quality"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => handleQualityChange(value[0])}
                  min={0.1}
                  max={1}
                  step={0.01}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              {/* Output Format Setting - Hidden in bulk mode when preserveFormats is true */}
              {(!isBulkMode || !preserveFormats) && (
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-xs font-semibold">
                      Output Format
                    </Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <svg
                          className="w-3 h-3 opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          Choose the output format. WebP, AVIF, and JXL offer
                          better compression.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={outputFormat}
                    onValueChange={handleFormatChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mozjpeg">JPEG (MozJPEG)</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="avif">AVIF</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="qoi">QOI (Lossless)</SelectItem>
                      <SelectItem value="jxl">JPEG XL</SelectItem>
                      <SelectItem value="wp2">WebP2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Preserve Formats Checkbox - Only in bulk mode */}
              {isBulkMode && (
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="preserve-formats"
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Preserve formats for each image
                    </Label>
                    <Switch
                      id="preserve-formats"
                      checked={preserveFormats}
                      onCheckedChange={setPreserveFormats}
                    />
                  </div>
                  <p className="text-xs opacity-70 mt-2">
                    When enabled, each image will keep its original format
                    (JPG→JPG, PNG→PNG, etc.)
                  </p>
                </div>
              )}
            </div>

            {/* Advanced Options */}
            <Collapsible
              open={showAdvancedOptions}
              onOpenChange={setShowAdvancedOptions}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <svg
                    className={`w-4 h-4 mr-2 transition-transform ${showAdvancedOptions ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Advanced Options
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 space-y-3">
                {/* Dimension Controls */}
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-xs font-semibold">Dimensions</Label>
                    {imageDimensions && (
                      <span className="text-xs opacity-70">
                        Current: {imageDimensions.width} ×{" "}
                        {imageDimensions.height}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs opacity-70">
                        Max Width (0 = no limit)
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={maxWidth}
                        onChange={(e) => {
                          setMaxWidth(parseInt(e.target.value) || 0);
                          handleSettingsChange();
                        }}
                        className="h-8 text-sm"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label className="text-xs opacity-70">
                        Max Height (0 = no limit)
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={maxHeight}
                        onChange={(e) => {
                          setMaxHeight(parseInt(e.target.value) || 0);
                          handleSettingsChange();
                        }}
                        className="h-8 text-sm"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* JPEG Options */}
                {(outputFormat === "mozjpeg" ||
                  outputFormat === "jpeg" ||
                  outputFormat === "jpg") && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">
                      JPEG Options
                    </Label>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Progressive</Label>
                      <Switch
                        checked={mozjpegOptions.progressive}
                        onCheckedChange={(checked) => {
                          setMozjpegOptions({
                            ...mozjpegOptions,
                            progressive: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Optimize Coding</Label>
                      <Switch
                        checked={mozjpegOptions.optimize_coding}
                        onCheckedChange={(checked) => {
                          setMozjpegOptions({
                            ...mozjpegOptions,
                            optimize_coding: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Smoothing</Label>
                        <span className="text-xs">
                          {mozjpegOptions.smoothing}
                        </span>
                      </div>
                      <Slider
                        value={[mozjpegOptions.smoothing || 0]}
                        onValueChange={(value) => {
                          setMozjpegOptions({
                            ...mozjpegOptions,
                            smoothing: value[0],
                          });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-xs mb-1 block">
                        Chroma Subsampling
                      </Label>
                      <Select
                        value={String(mozjpegOptions.chroma_subsample)}
                        onValueChange={(value) => {
                          setMozjpegOptions({
                            ...mozjpegOptions,
                            chroma_subsample: parseInt(value),
                          });
                          handleSettingsChange();
                        }}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">
                            4:4:4 (Best quality)
                          </SelectItem>
                          <SelectItem value="1">4:2:2</SelectItem>
                          <SelectItem value="2">
                            4:2:0 (Smallest size)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* WebP Options */}
                {outputFormat === "webp" && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">
                      WebP Options
                    </Label>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Lossless Mode</Label>
                      <Switch
                        checked={webpOptions.lossless === 1}
                        onCheckedChange={(checked) => {
                          setWebpOptions({
                            ...webpOptions,
                            lossless: checked ? 1 : 0,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">
                          Method (Speed vs Size)
                        </Label>
                        <span className="text-xs">{webpOptions.method}</span>
                      </div>
                      <Slider
                        value={[webpOptions.method || 4]}
                        onValueChange={(value) => {
                          setWebpOptions({ ...webpOptions, method: value[0] });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={6}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs opacity-70 mt-1">
                        0 = Fast, 6 = Slowest/Best
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Near Lossless</Label>
                        <span className="text-xs">
                          {webpOptions.near_lossless}
                        </span>
                      </div>
                      <Slider
                        value={[webpOptions.near_lossless || 100]}
                        onValueChange={(value) => {
                          setWebpOptions({
                            ...webpOptions,
                            near_lossless: value[0],
                          });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Alpha Quality</Label>
                        <span className="text-xs">
                          {webpOptions.alpha_quality}
                        </span>
                      </div>
                      <Slider
                        value={[webpOptions.alpha_quality || 100]}
                        onValueChange={(value) => {
                          setWebpOptions({
                            ...webpOptions,
                            alpha_quality: value[0],
                          });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* AVIF Options */}
                {outputFormat === "avif" && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">
                      AVIF Options
                    </Label>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Speed</Label>
                        <span className="text-xs">{avifOptions.speed}</span>
                      </div>
                      <Slider
                        value={[avifOptions.speed || 6]}
                        onValueChange={(value) => {
                          setAVIFOptions({ ...avifOptions, speed: value[0] });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs opacity-70 mt-1">
                        0 = Slowest/Best, 10 = Fastest
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs mb-1 block">
                        Chroma Subsampling
                      </Label>
                      <Select
                        value={String(avifOptions.subsample)}
                        onValueChange={(value) => {
                          setAVIFOptions({
                            ...avifOptions,
                            subsample: parseInt(value),
                          });
                          handleSettingsChange();
                        }}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">
                            4:4:4 (Best quality)
                          </SelectItem>
                          <SelectItem value="1">4:2:2</SelectItem>
                          <SelectItem value="2">
                            4:2:0 (Smallest size)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Enable Sharp YUV</Label>
                      <Switch
                        checked={avifOptions.enableSharpYUV}
                        onCheckedChange={(checked) => {
                          setAVIFOptions({
                            ...avifOptions,
                            enableSharpYUV: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Sharpness</Label>
                        <span className="text-xs">{avifOptions.sharpness}</span>
                      </div>
                      <Slider
                        value={[avifOptions.sharpness || 0]}
                        onValueChange={(value) => {
                          setAVIFOptions({
                            ...avifOptions,
                            sharpness: value[0],
                          });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={7}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* JXL Options */}
                {(outputFormat === "jxl" || outputFormat === "jpegxl") && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">
                      JPEG XL Options
                    </Label>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Effort</Label>
                        <span className="text-xs">{jxlOptions.effort}</span>
                      </div>
                      <Slider
                        value={[jxlOptions.effort || 7]}
                        onValueChange={(value) => {
                          setJXLOptions({ ...jxlOptions, effort: value[0] });
                          handleSettingsChange();
                        }}
                        min={1}
                        max={9}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs opacity-70 mt-1">
                        1 = Fast, 9 = Slowest/Best
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Progressive</Label>
                      <Switch
                        checked={jxlOptions.progressive}
                        onCheckedChange={(checked) => {
                          setJXLOptions({
                            ...jxlOptions,
                            progressive: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Lossy Palette</Label>
                      <Switch
                        checked={jxlOptions.lossyPalette}
                        onCheckedChange={(checked) => {
                          setJXLOptions({
                            ...jxlOptions,
                            lossyPalette: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* WP2 Options */}
                {(outputFormat === "wp2" || outputFormat === "webp2") && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">
                      WebP2 Options
                    </Label>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">Effort</Label>
                        <span className="text-xs">{wp2Options.effort}</span>
                      </div>
                      <Slider
                        value={[wp2Options.effort || 5]}
                        onValueChange={(value) => {
                          setWP2Options({ ...wp2Options, effort: value[0] });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={9}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">SNS</Label>
                        <span className="text-xs">{wp2Options.sns}</span>
                      </div>
                      <Slider
                        value={[wp2Options.sns || 50]}
                        onValueChange={(value) => {
                          setWP2Options({ ...wp2Options, sns: value[0] });
                          handleSettingsChange();
                        }}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* PNG Options */}
                {outputFormat === "png" && (
                  <div className="rounded-lg border p-3 space-y-3">
                    <Label className="text-xs font-semibold">PNG Options</Label>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs font-medium">
                          Lossless Compression
                        </Label>
                        <p className="text-xs opacity-70 max-w-xs">
                          {pngOptions.lossless
                            ? "Perfect quality, larger file size"
                            : "Good quality, smaller file size"}
                        </p>
                      </div>
                      <Switch
                        checked={pngOptions.lossless}
                        onCheckedChange={(checked) => {
                          setPngOptions({
                            ...pngOptions,
                            lossless: checked,
                          });
                          handleSettingsChange();
                        }}
                      />
                    </div>

                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs opacity-80">
                        <strong>Lossy:</strong> Reduces file size by removing
                        some data. Good for web use.
                        <br />
                        <strong>Lossless:</strong> Preserves all image data.
                        Best for archiving.
                      </p>
                    </div>
                  </div>
                )}

                {/* QOI - No options */}
                {outputFormat === "qoi" && (
                  <div className="rounded-lg border p-3">
                    <p className="text-xs opacity-70">
                      QOI is a lossless format with no configurable options.
                    </p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Compress Button - Show when file is uploaded but not yet compressed */}
            {!isBulkMode && currentFile && !compressedImage && !loading && (
              <div className="flex justify-center pt-2">
                <Button
                  onClick={handleCompressAgain}
                  disabled={loading}
                  size="lg"
                  className="flex items-center gap-2 h-11 px-6"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Compress Image
                </Button>
              </div>
            )}

            {/* Compress Again Button - Show when already compressed and settings changed */}
            {!isBulkMode &&
              showCompressAgain &&
              currentFile &&
              compressedImage && (
                <div className="flex justify-center pt-2">
                  <Button
                    onClick={handleCompressAgain}
                    disabled={loading}
                    size="sm"
                    className="flex items-center gap-2 h-9 px-4"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-3 w-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Compressing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Compress Again
                      </>
                    )}
                  </Button>
                </div>
              )}

            {/* Bulk Processing Controls */}
            {isBulkMode && bulkResults.length > 0 && (
              <div className="mt-4 space-y-4">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-12 justify-center">
                  <Button
                    onClick={handleBulkProcessing}
                    disabled={bulkProcessing || bulkResults.length === 0}
                    className="flex items-center gap-2"
                  >
                    {bulkProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing (
                        {
                          bulkResults.filter((f) => f.status === "completed")
                            .length
                        }
                        /{bulkResults.length})
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Process All Images ({bulkResults.length})
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={clearBulkImages}
                    disabled={bulkProcessing}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Clear All
                  </Button>
                </div>

                {/* Download All Button - appears when all images are processed successfully */}
                {allProcessed && !bulkProcessing && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleDownloadAll}
                      className="flex items-center gap-2 px-6 py-3"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download All as ZIP
                    </Button>
                  </div>
                )}

                {/* Overall Progress */}
                {bulkProcessing && (
                  <div className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Overall Progress
                      </span>
                      <span className="text-sm">{bulkProgress}%</span>
                    </div>
                    <Progress value={bulkProgress} className="w-full" />
                  </div>
                )}

                {/* File List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bulkResults.map((result, idx) => (
                    <Card key={idx} className="relative">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium truncate flex items-center justify-between">
                          <span className="truncate">{result.file.name}</span>
                          <Badge
                            variant="outline"
                            className="ml-2 flex-shrink-0"
                          >
                            {result.status === "pending" && "Pending"}
                            {result.status === "processing" && "Processing"}
                            {result.status === "completed" && "Completed"}
                            {result.status === "error" && "Error"}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {/* Image Preview */}
                          <div className="relative w-full h-32 rounded border overflow-hidden">
                            <NextImage
                              src={result.originalUrl}
                              alt={result.file.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          {/* File Info */}
                          <div className="text-xs space-y-1">
                            <div>
                              Original:{" "}
                              {(result.originalSize / 1024).toFixed(2)} KB
                            </div>
                            {result.compressedSize && (
                              <div>
                                Compressed:{" "}
                                {(result.compressedSize / 1024).toFixed(2)} KB
                                <span className="ml-1 font-semibold">
                                  (
                                  {(
                                    ((result.originalSize -
                                      result.compressedSize) /
                                      result.originalSize) *
                                    100
                                  ).toFixed(1)}
                                  % saved)
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Error Message */}
                          {result.error && (
                            <div className="text-xs p-2 rounded text-destructive">
                              {result.error}
                            </div>
                          )}

                          {/* Download Button */}
                          {result.status === "completed" &&
                            result.compressedUrl && (
                              <a
                                href={result.compressedUrl}
                                download={`compressed-${result.file.name.split(".")[0]}.${outputFormat}`}
                                className="inline-flex items-center text-xs"
                              >
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                                Download
                              </a>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TooltipProvider>

      {/* Bulk Processing Status */}
      {bulkProcessing && (
        <div className="text-center text-lg my-4 p-3 rounded-md shadow">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing {bulkResults.length} images... {bulkProgress}% complete.
        </div>
      )}

      {bulkError && (
        <Alert className="my-4">
          <AlertDescription>
            <strong className="font-bold">Bulk Processing Error!</strong>
            <span className="block sm:inline ml-2">{bulkError}</span>
          </AlertDescription>
        </Alert>
      )}

      {loading && !bulkProcessing && (
        <div className="text-center text-lg my-4 p-3 rounded-md shadow">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Compressing image... Please wait.
        </div>
      )}

      {error && (
        <Alert className="my-4" variant="destructive">
          <AlertDescription>
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Single Image Display - Only show when not in bulk mode */}
      {!isBulkMode && originalImage && compressedImage ? (
        <>
          <div className="mt-4 w-4xl mx-auto p-2 md:p-4 bg-muted/50 rounded-lg">
            <ImageComparisonSlider
              originalImage={originalImage}
              compressedImage={compressedImage}
              originalSize={originalSize}
              compressedSize={compressedSize}
              outputFormat={outputFormat}
            />
          </div>

          {/* Side by Side View */}
          <div className="gap-6 mt-8 max-w-7xl mx-auto">
            {compressedSize && (
              <div className="mt-3 p-3 rounded-lg bg-muted/50">
                <p className="text-sm">
                  Size: {(compressedSize / 1024).toFixed(2)} KB
                </p>
                {originalSize && (
                  <p className="text-sm font-semibold">
                    Savings:{" "}
                    {(
                      ((originalSize - compressedSize) / originalSize) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                )}
                <Button asChild variant="default" size="sm" className="mt-2">
                  <a
                    href={compressedImage}
                    download={`compressed-${Date.now()}.${outputFormat}`}
                    className="inline-flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Image
                  </a>
                </Button>
              </div>
            )}
          </div>
        </>
      ) : !isBulkMode && originalImage && !compressedImage ? (
        <>
          {/* Show uploaded image preview before compression */}
          <div className="mt-4 w-full max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Uploaded Image Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 md:h-96 rounded border overflow-hidden mb-4">
                  <NextImage
                    src={originalImage}
                    alt="Uploaded image preview"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  {imageDimensions && (
                    <p>
                      <span className="font-semibold">Dimensions:</span>{" "}
                      {imageDimensions.width} × {imageDimensions.height} px
                    </p>
                  )}
                  {originalSize && (
                    <p>
                      <span className="font-semibold">Original Size:</span>{" "}
                      {(originalSize / 1024).toFixed(2)} KB
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Output Format:</span>{" "}
                    {outputFormat.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageCompressor;
