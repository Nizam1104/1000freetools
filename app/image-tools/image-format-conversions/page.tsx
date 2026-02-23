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
import { Card, CardContent } from "@/components/ui/card";
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
import Faqs from "@/components/utils/Faqs";

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

  const faqs = [
    {
      question: "Is this image converter tool free to use?",
      answer:
        "Yes. Converting between image formats using our platform is completely free. You perform bulk conversions without encountering hidden subscriptions.",
    },
    {
      question: "Which image formats do you support?",
      answer:
        "We support a wide array of formats including JPG, PNG, WebP, BMP, GIF, AVIF, and TIFF. You seamlessly convert between these types securely.",
    },
    {
      question: "Is there a limit to how many images I can convert?",
      answer:
        "You process up to 200 images simultaneously. This bulk processing capability handles large folders efficiently directly within your browser.",
    },
    {
      question: "Will I lose image quality during conversion?",
      answer:
        "The converter maintains high fidelity automatically. By default, it preserves maximum quality limits matching your chosen output format specifications.",
    },
    {
      question: "Do you save my converted photos?",
      answer:
        "No. All conversion operations happen locally on your hardware. We never transmit or store your personal files on internet servers.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const MAX_BULK_CONVERSION_LIMIT = 200;
  const PREVIEW_LIMIT = 50;

  // Get possible output formats based on input files
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

      // Check if adding these files would exceed the limit
      const totalFilesAfterAdding = files.length + imageFiles.length;
      if (totalFilesAfterAdding > MAX_BULK_CONVERSION_LIMIT) {
        toast.error(
          `Cannot add more than ${MAX_BULK_CONVERSION_LIMIT} images at once. You currently have ${files.length} images.`,
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

      // Reset showAllImages when new files are added
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
          onProgress: (progress, message) => {
            // Optional: Handle progress updates if needed
          },
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
      // Small delay between conversions to prevent overwhelming the browser
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
      // Fallback to original file
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Online Image Format Converter
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Convert your images smoothly between multiple formats entirely within
          your browser. Process large batches of photos safely and download the
          results instantly.
        </p>
      </div>

      {/* 2. Tool Interface - SECOND ELEMENT */}
      <div className="container mx-auto py-8 w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 space-y-4">
          {/* Upload Area */}
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
                      Drag & drop images here, or click to select
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

          {/* Main Interface - Show only when files exist */}
          {files.length > 0 && (
            <>
              {/* Settings Bar */}
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
                      {files.length > MAX_BULK_CONVERSION_LIMIT * 0.8 && (
                        <span className="text-xs text-orange-600 font-medium">
                          ({files.length}/{MAX_BULK_CONVERSION_LIMIT})
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

              {/* Files Grid */}
              <div className="max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                  {files
                    .slice(0, showAllImages ? files.length : PREVIEW_LIMIT)
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

                  {/* Show More/Less Button */}
                  {files.length > PREVIEW_LIMIT && (
                    <div className="col-span-full">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllImages(!showAllImages)}
                        className="w-full h-8 text-sm"
                      >
                        {showAllImages ? (
                          <>Show Less ({PREVIEW_LIMIT} previews)</>
                        ) : (
                          <>
                            Show More (+{files.length - PREVIEW_LIMIT} images)
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Summary */}
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

          {/* Error Display */}
          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Supported Formats - Only show on initial load */}
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Adapt Your Visual Content Easily
          </h2>
          <p className="mb-4">
            Managing distinct image formats creates unnecessary friction during
            your daily digital tasks. Website developers frequently need modern
            WebP files to increase page loading speeds dramatically.
            Photographers require high-resolution TIFF images for print, while
            social media managers rely strictly on standard JPG files for
            universal compatibility. Converting these graphical formats manually
            via desktop software wastes valuable time. A robust online converter
            solves this issue by instantly adapting your graphics to meet the
            exact requirements of any digital platform.
          </p>
          <p className="mb-4">
            File sizes heavily depend directly on the specific formatting
            chosen. Older formats like BMP and standard PNG files contain
            massive amounts of uncompressed data. This bloats your physical
            storage drives needlessly. By converting these older standards into
            highly efficient contemporary formats like WebP or AVIF, you
            significantly reduce the footprint of your entire digital library.
            Doing this optimizes your storage workflow cleanly without
            sacrificing noticeable visual quality.
          </p>
          <p className="mb-4">
            Privacy ranks alongside speed as a primary requirement. We
            constructed this application specifically to decode and encode your
            graphic structures locally within your modern browser. When you drop
            a sensitive document or a family portrait onto the screen, your
            local computer handles the heavy mathematical translation. You
            safely convert highly confidential documents instantly without
            exposing them to remote cloud processing services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            We built this streamlined interface to handle large volumes of work
            flawlessly. You begin the translation process by locating the
            central upload region on your screen. You select multiple files
            simultaneously using the file picker mode or simply highlight an
            entire folder of photos and drag them violently onto the interface.
            The application immediately reads the existing internal formatting
            of every individual file and displays them neatly into an organized
            grid structure.
          </p>
          <p className="mb-4">
            Once you load the images onto the visual stage, you navigate to the
            main formatting dropdown menu. You click to expose the extensive
            list of supported outputs. The system intelligently filters this
            specific list based exclusively on the specific files you uploaded,
            ensuring you select valid target formats. You pick a target like
            JPG, PNG, or AVIF based on your immediate needs. You verify the
            individual file cards update correctly.
          </p>
          <p className="mb-4">
            Generating the final exports requires only a single definitive
            click. You press the prominent convert button located above the
            picture grid. The local engine initiates the processing sequence for
            every queued item sequentially. A transparent progress bar provides
            real-time updates regarding the overall batch status. Once the
            software finishes computing the mathematical data, you choose
            between clicking individual download buttons or packing the entire
            converted library into a single optimized zip file.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This specialized encoding platform operates strictly as a local
            format translator. The fundamental engine utilizes advanced
            scripting algorithms to disassemble the structure of an incoming
            image and rebuild it utilizing an entirely different structural
            blueprint. By executing these complex commands via your native
            hardware instructions, the tool provides professional application
            performance entirely inside an open web tab. You execute reliable
            conversions continuously without experiencing crashing or slow
            response times.
          </p>
          <p className="mb-4">
            The batch manipulation feature serves as the core utility for
            professional users. You drag up to two hundred distinct items into
            the processor simultaneously. The robust queue management software
            tracks each individual file progression securely. Even if you
            encounter a corrupted file mid-queue, the system isolates the
            specific error cleanly while successfully generating the remaining
            valid images. You review detailed status updates instantly located
            directly underneath each image thumbnail.
          </p>
          <p className="mb-4">
            Furthermore, the platform guarantees immediate availability. Since
            no remote queueing exists, you never wait in line behind other
            active internet users. You gain unmetered access to advanced
            conversion libraries capable of handling complex transparency
            translation routines. The resulting files maintain pristine visual
            integrity explicitly mirroring the graphical content you uploaded
            initially. We supply this extremely capable bulk processing
            mechanism devoid of required payments or hidden constraints.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqs} />
        </section>
      </div>
    </div>
  );
}
