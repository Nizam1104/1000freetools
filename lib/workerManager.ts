/**
 * Centralized Worker Manager
 *
 * Manages web workers across the application to avoid redundant creation
 * and ensure efficient resource usage. Workers are shared between pages
 * and persist during navigation.
 */

interface WorkerInstance {
  worker: Worker;
  refCount: number;
  lastUsed: number;
  isInitializing: boolean;
}

interface WorkerConfig {
  workerPath: string | URL;
  maxIdleTime?: number; // in milliseconds, default 5 minutes
  type?: "module" | "classic";
}

type WorkerType =
  | "imageCompressor"
  | "fileZipper"
  | "mockDataGenerator"
  | "imageFormatConverter"
  | "imageEditor"
  | "fileZipping"
  | "csvParser";

class WorkerManager {
  private workers: Map<WorkerType, WorkerInstance> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;
  private readonly DEFAULT_MAX_IDLE_TIME = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Start cleanup interval to remove unused workers
    this.startCleanupInterval();
  }

  /**
   * Get or create a worker instance
   */
  async getWorker(type: WorkerType, config: WorkerConfig): Promise<Worker> {
    const {
      workerPath,
      maxIdleTime = this.DEFAULT_MAX_IDLE_TIME,
      type: workerType = "module",
    } = config;

    // Check if worker already exists
    let workerInstance = this.workers.get(type);

    if (workerInstance) {
      // Update reference count and last used time
      workerInstance.refCount++;
      workerInstance.lastUsed = Date.now();
      // console.log(`[WorkerManager] Reusing ${type} worker (refCount: ${workerInstance.refCount})`)

      // Wait for initialization if in progress
      if (workerInstance.isInitializing) {
        await this.waitForInitialization(type);
      }

      return workerInstance.worker;
    }

    try {
      const worker = new Worker(workerPath, { type: workerType });

      // Create worker instance
      workerInstance = {
        worker,
        refCount: 1,
        lastUsed: Date.now(),
        isInitializing: true,
      };

      this.workers.set(type, workerInstance);

      // Set up error handling
      this.setupWorkerErrorHandling(worker, type);

      // Wait a brief moment for worker to initialize
      await this.waitForInitialization(type);

      workerInstance.isInitializing = false;

      return worker;
    } catch (error) {
      console.error(`[WorkerManager] Failed to create ${type} worker:`, error);
      throw error;
    }
  }

  /**
   * Release a worker reference
   */
  releaseWorker(type: WorkerType): void {
    const workerInstance = this.workers.get(type);

    if (!workerInstance) {
      console.warn(
        `[WorkerManager] Attempted to release non-existent ${type} worker`,
      );
      return;
    }

    workerInstance.refCount--;
    workerInstance.lastUsed = Date.now();

    // console.log(`[WorkerManager] Released ${type} worker (refCount: ${workerInstance.refCount})`)

    // Schedule cleanup if no more references
    if (workerInstance.refCount <= 0) {
      this.scheduleCleanup(type);
    }
  }

  /**
   * Force terminate a specific worker
   */
  terminateWorker(type: WorkerType): void {
    const workerInstance = this.workers.get(type);

    if (!workerInstance) {
      return;
    }

    // console.log(`[WorkerManager] Terminating ${type} worker`)

    try {
      workerInstance.worker.terminate();
    } catch (error) {
      console.error(`[WorkerManager] Error terminating ${type} worker:`, error);
    }

    this.workers.delete(type);
  }

  /**
   * Terminate all workers
   */
  terminateAllWorkers(): void {
    // console.log(`[WorkerManager] Terminating all workers`)

    for (const [type, workerInstance] of Array.from(this.workers.entries())) {
      try {
        workerInstance.worker.terminate();
      } catch (error) {
        console.error(
          `[WorkerManager] Error terminating ${type} worker:`,
          error,
        );
      }
    }

    this.workers.clear();
  }

  /**
   * Get worker statistics
   */
  getStats(): {
    [key in WorkerType]?: {
      refCount: number;
      lastUsed: number;
      isInitializing: boolean;
    };
  } {
    const stats: {
      [key in WorkerType]?: {
        refCount: number;
        lastUsed: number;
        isInitializing: boolean;
      };
    } = {};

    for (const [type, workerInstance] of Array.from(this.workers.entries())) {
      stats[type] = {
        refCount: workerInstance.refCount,
        lastUsed: workerInstance.lastUsed,
        isInitializing: workerInstance.isInitializing,
      };
    }

    return stats;
  }

  /**
   * Wait for worker initialization
   */
  private waitForInitialization(type: WorkerType): Promise<void> {
    return new Promise((resolve) => {
      const maxWaitTime = 5000; // 5 seconds
      const timeout = setTimeout(() => {
        console.warn(`[WorkerManager] ${type} worker initialization timeout`);
        resolve();
      }, maxWaitTime);

      const workerInstance = this.workers.get(type);
      if (!workerInstance) {
        clearTimeout(timeout);
        resolve();
        return;
      }

      const handleInit = (event: MessageEvent) => {
        if (event.data && event.data.type === "worker-ready") {
          workerInstance.worker.removeEventListener("message", handleInit);
          clearTimeout(timeout);
          resolve();
        }
      };

      workerInstance.worker.addEventListener("message", handleInit);
    });
  }

  /**
   * Set up worker error handling
   */
  private setupWorkerErrorHandling(worker: Worker, type: WorkerType): void {
    worker.onerror = (error) => {
      console.error(`[WorkerManager] ${type} worker error:`, error);
      // Don't automatically terminate on error, let the component handle it
    };

    worker.onmessageerror = (error) => {
      console.error(`[WorkerManager] ${type} worker message error:`, error);
    };
  }

  /**
   * Schedule cleanup of idle worker
   */
  private scheduleCleanup(type: WorkerType): void {
    // Schedule cleanup after max idle time
    setTimeout(() => {
      this.cleanupWorker(type);
    }, this.DEFAULT_MAX_IDLE_TIME);
  }

  /**
   * Clean up idle worker if no longer needed
   */
  private cleanupWorker(type: WorkerType): void {
    const workerInstance = this.workers.get(type);

    if (!workerInstance || workerInstance.refCount > 0) {
      return;
    }

    const timeSinceLastUsed = Date.now() - workerInstance.lastUsed;

    if (timeSinceLastUsed >= this.DEFAULT_MAX_IDLE_TIME) {
      // console.log(`[WorkerManager] Cleaning up idle ${type} worker`)
      this.terminateWorker(type);
    }
  }

  /**
   * Start periodic cleanup interval
   */
  private startCleanupInterval(): void {
    if (this.cleanupInterval) {
      return;
    }

    this.cleanupInterval = setInterval(() => {
      this.performPeriodicCleanup();
    }, 60000); // Check every minute
  }

  /**
   * Perform periodic cleanup of all idle workers
   */
  private performPeriodicCleanup(): void {
    for (const [type] of Array.from(this.workers.keys())) {
      this.cleanupWorker(type as WorkerType);
    }
  }

  /**
   * Cleanup method to be called when the app is shutting down
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    this.terminateAllWorkers();
  }
}
export const workerManager = new WorkerManager();
export type { WorkerType, WorkerConfig };

export const destroyWorkerManager = () => workerManager.destroy();

export const getImageCompressorWorker = () =>
  workerManager.getWorker("imageCompressor", {
    workerPath: "/workers/imageCompressor.js",
    type: "module",
  });

export const releaseImageCompressorWorker = () =>
  workerManager.releaseWorker("imageCompressor");

export const getFileZipperWorker = () =>
  workerManager.getWorker("fileZipper", {
    workerPath: "/workers/fileZipper.bundle.js",
    type: "module",
  });

export const releaseFileZipperWorker = () =>
  workerManager.releaseWorker("fileZipper");

export const getMockDataWorker = () =>
  workerManager.getWorker("mockDataGenerator", {
    workerPath: "/workers/mockDataWorker.bundle.js",
    type: "classic",
  });

export const releaseMockDataWorker = () =>
  workerManager.releaseWorker("mockDataGenerator");

// Image Format Converter Worker
export const getImageFormatConverterWorker = () =>
  workerManager.getWorker("imageFormatConverter", {
    workerPath: "/workers/image-tools/imageFormatConverterWorker.js",
  });

export const releaseImageFormatConverterWorker = () =>
  workerManager.releaseWorker("imageFormatConverter");

// Image Editor Worker
export const getImageEditorWorker = () =>
  workerManager.getWorker("imageEditor", {
    workerPath: "/workers/image-tools/imageEditorWorker.js",
  });

export const releaseImageEditorWorker = () =>
  workerManager.releaseWorker("imageEditor");

// File Zipping Worker
export const getFileZippingWorker = () =>
  workerManager.getWorker("fileZipping", {
    workerPath: "/workers/file-zipping-worker.js",
  });

export const releaseFileZippingWorker = () =>
  workerManager.releaseWorker("fileZipping");

// CSV Worker
export const getCsvWorker = () =>
  workerManager.getWorker("csvParser", {
    workerPath: new URL("./workers/csv-worker.ts", import.meta.url),
    type: "module",
  });

export const releaseCsvWorker = () => workerManager.releaseWorker("csvParser");
