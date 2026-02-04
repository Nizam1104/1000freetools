"use strict";
/**
 * File Zipper Web Worker
 *
 * This worker handles file zipping operations in a separate thread to avoid blocking
 * the main UI thread. It uses JSZip library to create zip archives from single or
 * multiple files of any format (images, documents, spreadsheets, etc.).
 *
 * Features:
 * - Supports single and multiple file zipping
 * - Works with any file format (images, CSV, Excel, PDF, etc.)
 * - Provides progress updates during compression
 * - Runs in a separate thread for better performance
 *
 * Message Types:
 * - Input: { type: 'zip', files: Array<{name: string, data: ArrayBuffer}>, zipName: string }
 * - Output: { type: 'success', data: Blob, zipName: string }
 * - Output: { type: 'progress', progress: number, message: string }
 * - Output: { type: 'error', error: string }
 */
// Import JSZip for creating zip files
// Note: JSZip needs to be loaded via CDN in the worker
importScripts("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
// Send ready signal to indicate worker is initialized
self.postMessage({ type: "worker-ready" });
// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
    const { type, files, zipName } = event.data;
    if (type === "zip") {
        try {
            // Validate input
            if (!files || !Array.isArray(files) || files.length === 0) {
                throw new Error("No files provided for zipping");
            }
            // Create a new JSZip instance
            const zip = new JSZip();
            // Add files to the zip
            self.postMessage({
                type: "progress",
                progress: 10,
                message: "Adding files to archive...",
            });
            files.forEach((file, index) => {
                if (!file.name || !file.data) {
                    throw new Error(`Invalid file at index ${index}`);
                }
                // Add file to zip with its original name
                zip.file(file.name, file.data);
                // Send progress update
                const progress = 10 + ((index + 1) / files.length) * 40;
                self.postMessage({
                    type: "progress",
                    progress: Math.round(progress),
                    message: `Added ${index + 1} of ${files.length} files`,
                });
            });
            // Generate the zip file
            self.postMessage({
                type: "progress",
                progress: 60,
                message: "Compressing files...",
            });
            const zipBlob = await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6, // Balanced compression (0-9, where 9 is maximum compression)
                },
            }, (metadata) => {
                // Progress callback during zip generation
                const progress = 60 + metadata.percent * 0.4;
                self.postMessage({
                    type: "progress",
                    progress: Math.round(progress),
                    message: `Compressing... ${Math.round(metadata.percent)}%`,
                });
            });
            // Send the completed zip file back to the main thread
            self.postMessage({
                type: "success",
                data: zipBlob,
                zipName: zipName || "archive.zip",
            });
        }
        catch (error) {
            // Send error message back to the main thread
            self.postMessage({
                type: "error",
                error: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
    }
});
