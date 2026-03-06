"use client";
import { useState, useCallback, useMemo } from "react";
import {
  Image as ImageIcon,
  Download,
  X,
  Loader2,
  Settings,
  AlertCircle,
  FileImage,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { useImageFormatConverterWorker } from "@/lib/useImageFormatConverterWorker";
import {
  SUPPORTED_INPUT_FORMATS,
  SUPPORTED_OUTPUT_FORMATS,
  FORMAT_DESCRIPTIONS,
  validateImageFile,
  getAvailableOutputFormats,
  detectFormatFromFile,
  formatImageFileSize,
  createImagePreview,
  cleanupImagePreview,
  convertImageFile,
  convertImagesToZip,
  downloadBlob,
} from "@/components/image-tools/utils";

import { toast } from "sonner";
import Image from "next/image";
import { ImageFormatConverterSEO } from "@/components/seo-content/image-tools/ImageFormatConverter";

interface ImageFile {
  id: string;
  name: string;
  size: number;
  file: File;
  preview: string;
  originalFormat: string;
  convertedFormat?: string;
  convertedData?: Blob;
  status: "pending" | "processing" | "completed" | "error";
  error?: string;
}

export default function ImageFormatConversionsPage() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [selectedOutputFormat, setSelectedOutputFormat] = useState<string>("");
  const [creatingZip, setCreatingZip] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const { isProcessing, progress, error, reset } =
    useImageFormatConverterWorker();

  const possibleOutputFormats = useMemo(() => {
    const fileObjects = files.map((f) => f.file);
    return getAvailableOutputFormats(fileObjects);
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFiles = validateImageFile
        ? acceptedFiles.filter(validateImageFile)
        : acceptedFiles.filter((file) =>
            SUPPORTED_INPUT_FORMATS.includes(
              file.name.split(".").pop()?.toLowerCase() || "",
            ),
          );

      const totalFilesAfterAdding = files.length + imageFiles.length;
      if (totalFilesAfterAdding > 200) {
        toast.error(
          `Cannot add more than 200 images at once. You currently have ${files.length} images.`,
        );
        return;
      }

      const newFiles: ImageFile[] = imageFiles.map((file) => {
        const originalFormat = detectFormatFromFile(file);
        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          file,
          preview: createImagePreview(file),
          originalFormat,
          status: "pending" as const,
        };
      });

      setFiles((prev) => [...prev, ...newFiles]);
      reset();
      setShowAllImages(false);
    },
    [reset, files.length],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": SUPPORTED_INPUT_FORMATS.map((format) => `.${format}`),
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const clearAll = () => {
    files.forEach((file) => {
      cleanupImagePreview(file.preview);
    });
    setFiles([]);
    setSelectedOutputFormat("");
    setShowAllImages(false);
    reset();
  };

  const convertSingleFile = async (imageFile: ImageFile) => {
    if (!selectedOutputFormat) {
      toast.error("Please select an output format");
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.id === imageFile.id
          ? { ...f, status: "processing", error: undefined }
          : f,
      ),
    );

    try {
      const result = await convertImageFile(
        imageFile.file,
        selectedOutputFormat,
        {
          onProgress: (progress, message) => {},
        },
      );

      if (result.success && result.data) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === imageFile.id
              ? {
                  ...f,
                  status: "completed",
                  convertedFormat: selectedOutputFormat,
                  convertedData: result.data,
                }
              : f,
          ),
        );
        toast.success(
          `${imageFile.name} converted to ${selectedOutputFormat.toUpperCase()}`,
        );
      } else {
        throw new Error(result.error || "Conversion failed");
      }
    } catch (err) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === imageFile.id
            ? {
                ...f,
                status: "error",
                error: err instanceof Error ? err.message : "Conversion failed",
              }
            : f,
        ),
      );
      toast.error(`Failed to convert ${imageFile.name}`);
    }
  };

  const convertAllFiles = async () => {
    if (!selectedOutputFormat) {
      toast.error("Please select an output format");
      return;
    }

    const pendingFiles = files.filter((f) => f.status === "pending");

    for (const file of pendingFiles) {
      await convertSingleFile(file);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const downloadFile = (imageFile: ImageFile) => {
    if (imageFile.status !== "completed") return;

    if (imageFile.convertedData) {
      const url = URL.createObjectURL(imageFile.convertedData);
      const fileName = `${imageFile.name.split(".")[0]}.${imageFile.convertedFormat || selectedOutputFormat}`;
      downloadBlob(url, fileName);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      const a = document.createElement("a");
      a.href = imageFile.preview;
      a.download = `${imageFile.name.split(".")[0]}.${imageFile.convertedFormat || selectedOutputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const downloadAllFiles = async () => {
    const completedFiles = files.filter((f) => f.status === "completed");

    if (completedFiles.length === 0) {
      toast.error("No files to download");
      return;
    }

    setCreatingZip(true);
    toast.info("Creating ZIP file...");

    try {
      const originalFiles = completedFiles.map((f) => f.file);
      const result = await convertImagesToZip(
        originalFiles,
        selectedOutputFormat,
        {
          zipFileName: `converted-images-${Date.now()}.zip`,
          onProgress: (progress, message) => {
            console.log(`ZIP Progress: ${progress}%, ${message}`);
          },
        },
      );

      if (result.success && result.url) {
        downloadBlob(
          result.url,
          result.fileName || `converted-images-${Date.now()}.zip`,
        );
        setTimeout(() => URL.revokeObjectURL(result.url!), 1000);
        toast.success("ZIP file downloaded successfully");
      } else {
        throw new Error(result.error || "Failed to create ZIP file");
      }
    } catch (error) {
      console.error("Error creating zip file:", error);
      toast.error("Failed to create ZIP file");
    } finally {
      setCreatingZip(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return formatImageFileSize(bytes);
  };

  const completedCount = files.filter((f) => f.status === "completed").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Online Image Format Converter
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Convert images between formats online. Support for JPG, PNG, WebP,
          AVIF, BMP, GIF, TIFF, ICO, SVG, HEIC. Batch convert up to 200 files.
        </p>
      </div>

      <div className="container mx-auto py-8 w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 space-y-4">
          <div className="w-full max-w-md mx-auto sm:max-w-lg">
            <CardContent className="p-4 sm:p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all hover:border-primary/50 ${
                  isDragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-muted-foreground/25"
                }`}
              >
                <input {...getInputProps()} />
                <FileImage className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="font-medium text-sm sm:text-base">
                    Drop images here
                  </p>
                ) : (
                  <div>
                    <p className="font-medium mb-2 text-sm sm:text-base">
                      Drag & drop images here, or click to browse
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      JPG, PNG, WebP, BMP, GIF, AVIF, SVG, TIFF, ICO, HEIC • Max
                      50MB
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          {files.length > 0 && (
            <>
              <div className="bg-background border rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
                    <Settings className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Label
                      htmlFor="output-format"
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      Convert to:
                    </Label>
                    <Select
                      value={selectedOutputFormat}
                      onValueChange={setSelectedOutputFormat}
                    >
                      <SelectTrigger className="w-32 sm:w-40 h-8 flex-1 sm:flex-none">
                        <SelectValue placeholder="Choose format" />
                      </SelectTrigger>
                      <SelectContent>
                        {possibleOutputFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {format.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end ">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {files.length} {files.length === 1 ? "file" : "files"}
                      </span>
                      {files.length > 200 * 0.8 && (
                        <span className="text-xs text-orange-600 font-medium">
                          ({files.length}/200)
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={convertAllFiles}
                        disabled={!selectedOutputFormat || isProcessing}
                        size="sm"
                        className="h-8 text-xs sm:text-sm"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            <span className="hidden sm:inline">
                              Converting...
                            </span>
                            <span className="sm:hidden">Convert...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">
                              Convert All
                            </span>
                            <span className="sm:hidden">Convert</span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAll}
                        className="h-8 px-2 sm:px-3"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                  {files
                    .slice(0, showAllImages ? files.length : 50)
                    .map((imageFile) => (
                      <Card
                        key={imageFile.id}
                        className="overflow-hidden group"
                      >
                        <div className="aspect-square relative bg-muted/20">
                          <Image
                            src={imageFile.preview}
                            alt={imageFile.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => removeFile(imageFile.id)}
                              className="h-5 w-5 p-0 rounded-full bg-black/60 hover:bg-black/80 text-white"
                            >
                              <X className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                          <div className="absolute bottom-1 left-1 right-1">
                            <div className="flex gap-1 justify-center">
                              {imageFile.status === "pending" &&
                                selectedOutputFormat && (
                                  <Button
                                    size="sm"
                                    onClick={() => convertSingleFile(imageFile)}
                                    disabled={isProcessing}
                                    className="h-5 px-1.5 text-[10px] bg-black/60 hover:bg-black/80 text-white border-0 leading-tight"
                                  >
                                    Convert
                                  </Button>
                                )}
                              {imageFile.status === "processing" && (
                                <div className="h-5 px-1.5 text-[10px] bg-black/60 text-white rounded flex items-center justify-center">
                                  <Loader2 className="h-2.5 w-2.5 animate-spin mr-0.5" />
                                  <span className="hidden xs:inline">
                                    Processing
                                  </span>
                                  <span className="xs:hidden">...</span>
                                </div>
                              )}
                              {imageFile.status === "completed" && (
                                <Button
                                  size="sm"
                                  onClick={() => downloadFile(imageFile)}
                                  className="h-5 px-1.5 text-[10px] bg-green-600 hover:bg-green-700 text-white border-0 leading-tight"
                                >
                                  <Download className="h-2.5 w-2.5" />
                                </Button>
                              )}
                              {imageFile.status === "error" && (
                                <Button
                                  size="sm"
                                  onClick={() => convertSingleFile(imageFile)}
                                  className="h-5 px-1.5 text-[10px] bg-orange-600 hover:bg-orange-700 text-white border-0 leading-tight"
                                >
                                  Retry
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <p
                            className="text-xs font-medium truncate"
                            title={imageFile.name}
                          >
                            {imageFile.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {formatFileSize(imageFile.size)} •{" "}
                            {imageFile.originalFormat.toUpperCase()}
                            {imageFile.convertedFormat &&
                              ` → ${imageFile.convertedFormat.toUpperCase()}`}
                          </p>
                        </div>
                      </Card>
                    ))}

                  {files.length > 50 && (
                    <div className="col-span-full">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllImages(!showAllImages)}
                        className="w-full h-8 text-sm"
                      >
                        {showAllImages ? (
                          <>Show Less (50 previews)</>
                        ) : (
                          <>Show More (+{files.length - 50} images)</>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {(completedCount > 0 || errorCount > 0) && (
                <div className="bg-background border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-sm font-medium">
                        {completedCount} of {files.length} completed
                      </span>
                      {progress && (
                        <div className="w-24 sm:w-32">
                          <Progress value={progress.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-green-600">
                          ✓ {completedCount}
                        </span>
                        {errorCount > 0 && (
                          <span className="text-red-600">⚠ {errorCount}</span>
                        )}
                      </div>
                      {completedCount > 0 && (
                        <Button
                          onClick={downloadAllFiles}
                          disabled={creatingZip}
                          size="sm"
                          className="h-8 text-xs sm:text-sm"
                        >
                          {creatingZip ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              <span className="hidden sm:inline">
                                Creating ZIP...
                              </span>
                              <span className="sm:hidden">ZIP...</span>
                            </>
                          ) : (
                            <>
                              <Package className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">
                                Download All
                              </span>
                              <span className="sm:hidden">All</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {files.length === 0 && (
            <div className="max-w-md mx-auto">
              <div className="bg-muted/20 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-sm mb-3 text-center">
                  Supported Formats
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Input:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {SUPPORTED_INPUT_FORMATS.slice(0, 8).map((format) => (
                        <span
                          key={format}
                          className="px-1.5 py-0.5 bg-background rounded text-[10px] sm:text-xs font-mono"
                        >
                          {format.toUpperCase()}
                        </span>
                      ))}
                      {SUPPORTED_INPUT_FORMATS.length > 8 && (
                        <span className="px-1.5 py-0.5 bg-background rounded text-[10px] sm:text-xs text-muted-foreground">
                          +{SUPPORTED_INPUT_FORMATS.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Output:
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {SUPPORTED_OUTPUT_FORMATS.map((format) => (
                        <span
                          key={format}
                          className="px-1.5 py-0.5 bg-primary/10 rounded text-[10px] sm:text-xs font-mono"
                        >
                          {format.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <ImageFormatConverterSEO />
      </div>
    </div>
  );
}
