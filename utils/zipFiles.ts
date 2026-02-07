/**
 * File Zipping Utility
 *
 * This utility provides a simple interface to zip and download files using a web worker.
 * It supports single or multiple files of any format (images, documents, spreadsheets, etc.)
 * and automatically triggers a download of the generated zip file.
 *
 * Usage Examples:
 *
 * // Single file
 * const file = document.getElementById('fileInput').files[0]
 * await zipAndDownloadFiles(file, 'my-file.zip')
 *
 * // Multiple files
 * const files = Array.from(document.getElementById('fileInput').files)
 * await zipAndDownloadFiles(files, 'my-files.zip')
 *
 * // With progress callback
 * await zipAndDownloadFiles(files, 'archive.zip', (progress, message) => {
 *   console.log(`${progress}%: ${message}`)
 * })
 *
 * @module zipFiles
 */

import {
  getFileZipperWorker,
  releaseFileZipperWorker,
} from "@/lib/workerManager";

/**
 * Progress callback function type
 * @param progress - Progress percentage (0-100)
 * @param message - Progress message
 */
export type ZipProgressCallback = (progress: number, message: string) => void;

/**
 * File data structure for the worker
 */
interface FileData {
  name: string;
  data: ArrayBuffer;
}

/**
 * Converts File objects to ArrayBuffer format for the worker
 * @param files - Single file or array of files
 * @returns Promise resolving to array of file data objects
 */
async function prepareFiles(files: File | File[]): Promise<FileData[]> {
  const fileArray = Array.isArray(files) ? files : [files];

  const fileDataPromises = fileArray.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    return {
      name: file.name,
      data: arrayBuffer,
    };
  });

  return Promise.all(fileDataPromises);
}

/**
 * Triggers a download of a blob with the specified filename
 * @param blob - The blob to download
 * @param filename - The name for the downloaded file
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the object URL after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Zips files and automatically downloads the resulting zip file
 *
 * @param files - Single File object or array of File objects to zip
 * @param zipName - Name for the output zip file (default: 'archive.zip')
 * @param onProgress - Optional callback for progress updates
 * @returns Promise that resolves when the zip is created and download is triggered
 * @throws Error if zipping fails
 *
 * @example
 * // Zip a single file
 * const file = new File(['content'], 'document.txt')
 * await zipAndDownloadFiles(file, 'my-document.zip')
 *
 * @example
 * // Zip multiple files with progress tracking
 * const files = [file1, file2, file3]
 * await zipAndDownloadFiles(files, 'images.zip', (progress, msg) => {
 *   console.log(`${progress}%: ${msg}`)
 * })
 */
export async function zipAndDownloadFiles(
  files: File | File[],
  zipName: string = "archive.zip",
  onProgress?: ZipProgressCallback,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure zipName has .zip extension
      const finalZipName = zipName.endsWith(".zip")
        ? zipName
        : `${zipName}.zip`;

      // Prepare files for the worker
      onProgress?.(0, "Preparing files...");
      const fileData = await prepareFiles(files);

      if (fileData.length === 0) {
        throw new Error("No files provided");
      }

      // Get the worker instance
      const worker = await getFileZipperWorker();

      // Set up message handler
      const handleMessage = (event: MessageEvent) => {
        const {
          type,
          data,
          zipName: resultZipName,
          progress,
          message,
          error,
        } = event.data;

        switch (type) {
          case "progress":
            onProgress?.(progress, message);
            break;

          case "success":
            // Download the zip file
            downloadBlob(data, resultZipName);

            // Clean up
            worker.removeEventListener("message", handleMessage);
            releaseFileZipperWorker();

            onProgress?.(100, "Download started!");
            resolve();
            break;

          case "error":
            // Clean up
            worker.removeEventListener("message", handleMessage);
            releaseFileZipperWorker();

            reject(new Error(error));
            break;
        }
      };

      // Set up error handler
      const handleError = (error: ErrorEvent) => {
        worker.removeEventListener("message", handleMessage);
        worker.removeEventListener("error", handleError);
        releaseFileZipperWorker();

        reject(new Error(`Worker error: ${error.message}`));
      };

      worker.addEventListener("message", handleMessage);
      worker.addEventListener("error", handleError);

      // Send files to worker for zipping
      worker.postMessage({
        type: "zip",
        files: fileData,
        zipName: finalZipName,
      });
    } catch (error) {
      reject(
        error instanceof Error ? error : new Error("Unknown error occurred"),
      );
    }
  });
}

/**
 * Convenience function to zip files without automatic download
 * Returns the zip blob instead of downloading it
 *
 * @param files - Single File object or array of File objects to zip
 * @param zipName - Name for the output zip file (default: 'archive.zip')
 * @param onProgress - Optional callback for progress updates
 * @returns Promise resolving to the zip file as a Blob
 * @throws Error if zipping fails
 *
 * @example
 * const zipBlob = await zipFiles([file1, file2])
 * // Do something with the blob (e.g., upload to server)
 */
export async function zipFiles(
  files: File | File[],
  zipName: string = "archive.zip",
  onProgress?: ZipProgressCallback,
): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const finalZipName = zipName.endsWith(".zip")
        ? zipName
        : `${zipName}.zip`;

      onProgress?.(0, "Preparing files...");
      const fileData = await prepareFiles(files);

      if (fileData.length === 0) {
        throw new Error("No files provided");
      }

      const worker = await getFileZipperWorker();

      const handleMessage = (event: MessageEvent) => {
        const { type, data, progress, message, error } = event.data;

        switch (type) {
          case "progress":
            onProgress?.(progress, message);
            break;

          case "success":
            worker.removeEventListener("message", handleMessage);
            releaseFileZipperWorker();

            onProgress?.(100, "Zip created successfully!");
            resolve(data);
            break;

          case "error":
            worker.removeEventListener("message", handleMessage);
            releaseFileZipperWorker();

            reject(new Error(error));
            break;
        }
      };

      const handleError = (error: ErrorEvent) => {
        worker.removeEventListener("message", handleMessage);
        worker.removeEventListener("error", handleError);
        releaseFileZipperWorker();

        reject(new Error(`Worker error: ${error.message}`));
      };

      worker.addEventListener("message", handleMessage);
      worker.addEventListener("error", handleError);

      worker.postMessage({
        type: "zip",
        files: fileData,
        zipName: finalZipName,
      });
    } catch (error) {
      reject(
        error instanceof Error ? error : new Error("Unknown error occurred"),
      );
    }
  });
}
