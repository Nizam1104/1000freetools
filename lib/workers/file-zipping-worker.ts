interface FileToZip {
  name: string;
  content: string | ArrayBuffer | Uint8Array;
  type?: string;
}

interface ZipWorkerMessage {
  type: "create-zip" | "add-files" | "finish-zip";
  files?: FileToZip[];
  options?: {
    compressionLevel?: number;
    password?: string;
  };
}

interface ZipWorkerResponse {
  type: "success" | "error" | "progress";
  data?: {
    zipBlob?: ArrayBuffer;
    filesProcessed?: number;
    totalFiles?: number;
    fileName?: string;
  };
  error?: string;
}

// Import JSZip dynamically
let JSZip: any = null;

async function loadJSZip() {
  if (!JSZip) {
    try {
      // In a worker, we need to import JSZip differently
      // This will be handled by webpack bundling
      const jszipModule = await import("jszip");
      JSZip = jszipModule.default;
    } catch (error) {
      throw new Error("Failed to load JSZip library");
    }
  }
  return JSZip;
}

self.onmessage = async (event: MessageEvent<ZipWorkerMessage>) => {
  const { type, files, options } = event.data;

  try {
    switch (type) {
      case "create-zip":
        await handleCreateZip(files || [], options);
        break;
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    const response: ZipWorkerResponse = {
      type: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
    self.postMessage(response);
  }
};

async function handleCreateZip(
  files: FileToZip[],
  options?: {
    compressionLevel?: number;
    password?: string;
  },
) {
  try {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error("No files to zip");
    }

    // Load JSZip library
    const JSZip = await loadJSZip();

    // Create a new zip file
    const zip = new JSZip();

    // Send progress update
    self.postMessage({
      type: "progress",
      data: {
        filesProcessed: 0,
        totalFiles: files.length,
      },
    } as ZipWorkerResponse);

    // Add files to zip
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.name) {
        throw new Error(`File at index ${i} is missing a name`);
      }

      if (!file.content) {
        throw new Error(`File "${file.name}" has no content`);
      }

      // Convert content to appropriate format
      let fileContent: any = file.content;

      if (typeof file.content === "string") {
        fileContent = file.content;
      } else if (file.content instanceof ArrayBuffer) {
        fileContent = new Uint8Array(file.content);
      } else if (file.content instanceof Uint8Array) {
        fileContent = file.content;
      }

      // Add file to zip
      zip.file(file.name, fileContent, {
        compression: options?.compressionLevel ? "DEFLATE" : "STORE",
        compressionOptions: options?.compressionLevel
          ? {
              level: options.compressionLevel,
            }
          : undefined,
      });

      // Send progress update
      self.postMessage({
        type: "progress",
        data: {
          filesProcessed: i + 1,
          totalFiles: files.length,
        },
      } as ZipWorkerResponse);
    }

    // Generate the zip file
    const zipBlob = await zip.generateAsync({
      type: "arraybuffer",
      compression: "DEFLATE",
      compressionOptions: {
        level: options?.compressionLevel || 6,
      },
      password: options?.password,
    });

    const response: ZipWorkerResponse = {
      type: "success",
      data: {
        zipBlob,
        fileName: "archive.zip",
      },
    };

    self.postMessage(response);
  } catch (error) {
    throw new Error(
      `Failed to create ZIP: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
