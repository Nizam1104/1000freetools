import { useState, useCallback, useRef } from "react";
import {
  getImageFormatConverterWorker,
  releaseImageFormatConverterWorker,
} from "./workerManager";

interface ConversionProgress {
  progress: number;
  message: string;
}

interface ConversionOptions {
  quality?: number;
}

interface UseImageFormatConverterWorkerReturn {
  isProcessing: boolean;
  progress: ConversionProgress | null;
  error: string | null;
  convertImage: (
    file: File,
    toFormat: string,
    options?: ConversionOptions,
  ) => Promise<{ blob: Blob; fileName: string } | null>;
  reset: () => void;
}

export function useImageFormatConverterWorker(): UseImageFormatConverterWorkerReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setProgress(null);
  }, []);

  const detectImageFormat = (file: File): string => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension || "unknown";
  };

  const convertImage = useCallback(
    async (
      file: File,
      toFormat: string,
      options?: ConversionOptions,
    ): Promise<{ blob: Blob; fileName: string } | null> => {
      if (!file) {
        setError("No file selected");
        return null;
      }

      if (!toFormat) {
        setError("No output format specified");
        return null;
      }

      setIsProcessing(true);
      setError(null);
      setProgress({ progress: 0, message: "Initializing conversion..." });

      try {
        // Get worker instance
        const worker = await getImageFormatConverterWorker();
        workerRef.current = worker;

        return new Promise((resolve, reject) => {
          const handleMessage = (event: MessageEvent) => {
            const {
              type,
              convertedData,
              outputFormat,
              fileName,
              success,
              error: workerError,
              progress: workerProgress,
              message,
            } = event.data;

            if (type === "conversion-progress") {
              setProgress({
                progress: workerProgress,
                message: message,
              });
            } else if (type === "conversion-complete") {
              // Clean up
              worker.removeEventListener("message", handleMessage);
              worker.removeEventListener("error", handleError);
              releaseImageFormatConverterWorker();

              setIsProcessing(false);

              if (success && convertedData && convertedData.byteLength > 0) {
                const mimeType = getMimeTypeFromFormat(outputFormat);
                const blob = new Blob([convertedData], { type: mimeType });
                setProgress({ progress: 100, message: "Conversion complete!" });
                resolve({ blob, fileName });
              } else {
                setError(workerError || "Conversion failed");
                reject(new Error(workerError || "Conversion failed"));
              }
            }
          };

          const handleError = (error: ErrorEvent) => {
            // Clean up
            worker.removeEventListener("message", handleMessage);
            worker.removeEventListener("error", handleError);
            releaseImageFormatConverterWorker();

            setIsProcessing(false);
            setError(`Worker error: ${error.message}`);
            reject(new Error(`Worker error: ${error.message}`));
          };

          // Add event listeners
          worker.addEventListener("message", handleMessage);
          worker.addEventListener("error", handleError);

          // Read file as ArrayBuffer
          const reader = new FileReader();

          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;

            // Send message to worker
            worker.postMessage({
              type: "convert-image",
              imageData: arrayBuffer,
              fromFormat: detectImageFormat(file),
              toFormat: toFormat.toLowerCase(),
              quality: options?.quality || 0.9,
              fileName: file.name,
            });
          };

          reader.onerror = () => {
            // Clean up
            worker.removeEventListener("message", handleMessage);
            worker.removeEventListener("error", handleError);
            releaseImageFormatConverterWorker();

            setIsProcessing(false);
            setError("Failed to read file");
            reject(new Error("Failed to read file"));
          };

          reader.readAsArrayBuffer(file);
        });
      } catch (err) {
        setIsProcessing(false);
        setError(
          err instanceof Error ? err.message : "Failed to convert image",
        );
        return null;
      }
    },
    [],
  );

  return {
    isProcessing,
    progress,
    error,
    convertImage,
    reset,
  };
}

// Helper function to get MIME type from format
function getMimeTypeFromFormat(format: string): string {
  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    bmp: "image/bmp",
    gif: "image/gif",
    avif: "image/avif",
    heic: "image/heic",
    heif: "image/heif",
    ico: "image/x-icon",
    tiff: "image/tiff",
    tif: "image/tiff",
    svg: "image/svg+xml",
  };

  return mimeTypes[format.toLowerCase()] || "image/jpeg";
}
