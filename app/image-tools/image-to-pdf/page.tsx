"use client";
import { useState, useCallback } from "react";
import {
  Image as ImageIcon,
  FileText,
  Download,
  Upload,
  X,
  Loader2,
  Settings,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";

import { toast } from "sonner";
import NextImage from "next/image";

import {
  convertImagesToPdf,
  createImageFiles,
  cleanupImageFiles,
  validateImageFiles,
  formatFileSize,
  DEFAULT_IMAGE_TO_PDF_OPTIONS,
  createAndDownloadZip,
  downloadFile as downloadFileUtil,
  type ImageFile,
  type ImageToPdfOptions,
  type ConversionResult,
} from "@/components/image-tools/utils";

import Faqs from "@/components/utils/Faqs";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<ImageFile[]>([]);

  const faqs = [
    {
      question: "Is this image to PDF tool actually free?",
      answer:
        "Yes. Converting your images into PDF documents costs absolutely nothing. You do not hit hidden paywalls or subscription prompts during the process.",
    },
    {
      question: "Will the PDF compilation ruin my image quality?",
      answer:
        "The converter engine embeds your original images into the PDF structure intact. The visual fidelity of your uploaded photos remains perfectly preserved.",
    },
    {
      question: "Do you store the generated PDF on your server?",
      answer:
        "No. The entire conversion from image to PDF executes locally inside your active browser tab. Your files remain completely secure on your personal device.",
    },
    {
      question: "Can I combine multiple pictures into one specific file?",
      answer:
        "Yes. You simply drag multiple photos onto the canvas simultaneously. The interface allows you to sort them before generating a single multi-page PDF.",
    },
    {
      question: "What image formats can I upload?",
      answer:
        "The platform accepts a wide variety including standard JPG, transparent PNG, WebP, and BMP. You mix these different types effortlessly within the same document.",
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
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<
    Array<{ name: string; blob: Blob }>
  >([]);
  const [options, setOptions] = useState<ImageToPdfOptions>(
    DEFAULT_IMAGE_TO_PDF_OPTIONS,
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = validateImageFiles(acceptedFiles);

    if (imageFiles.length === 0) {
      setError("Please select image files only");
      return;
    }

    const newFiles = createImageFiles(imageFiles);

    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
    toast.success(`${imageFiles.length} image(s) added successfully`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      }
      return prev.filter((file) => file.id !== id);
    });
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      setError("Please add at least one image file");
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError(null);
    setGeneratedFiles([]);

    try {
      const results: ConversionResult[] = await convertImagesToPdf(
        files,
        options,
        (current, total, progress) => {
          setProgress(progress);
          setCurrentFile(current);
          setTotalFiles(total);
        },
      );

      setGeneratedFiles(results);
      setProgress(100);

      // If individual mode and multiple files, create ZIP
      if (options.mode === "individual" && results.length > 1) {
        await createAndDownloadZip(
          results.map((result) => ({ name: result.name, blob: result.blob })),
          {
            zipName: "converted-pdfs.zip",
            onComplete: (success) => {
              if (success) {
                toast.success("PDFs created and packaged in ZIP file!");
              } else {
                toast.error("Failed to create ZIP file");
              }
            },
          },
        );
      } else {
        toast.success("Images converted to PDF successfully!");
      }

      setProcessing(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during conversion",
      );
      setProcessing(false);
      toast.error("Conversion failed");
    }
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Image to PDF Converter
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Combine multiple photos into a single PDF document securely directly
          in your browser. Maintain high image quality while building organized,
          shareable files instantly.
        </p>
      </div>

      {/* 2. Tool Interface - SECOND ELEMENT */}
      <div className="container mx-auto py-8 w-full">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>
                  Drag and drop image files or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-blue-600">
                      Drop the image files here...
                    </p>
                  ) : (
                    <div>
                      <p className="text-slate-600 mb-2">
                        Drag & drop images here, or click to select files
                      </p>
                      <p className="text-sm text-slate-500">
                        Multiple files supported • JPG, PNG, GIF, BMP, WebP
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Conversion Options
                </CardTitle>
                <CardDescription>
                  Configure how your images will be converted to PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mode Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conversion Mode</Label>
                    <Select
                      value={options.mode}
                      onValueChange={(value: "single" | "individual") =>
                        setOptions((prev) => ({ ...prev, mode: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">
                          Single PDF (all images)
                        </SelectItem>
                        <SelectItem value="individual">
                          Individual PDFs
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Page Size</Label>
                    <Select
                      value={options.pageSize}
                      onValueChange={(value: "a4" | "letter" | "legal") =>
                        setOptions((prev) => ({ ...prev, pageSize: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Orientation */}
                <div className="flex items-center space-x-4">
                  <Label htmlFor="orientation">Orientation</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="orientation"
                      checked={options.orientation === "landscape"}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          orientation: checked ? "landscape" : "portrait",
                        }))
                      }
                    />
                    <Label htmlFor="orientation" className="text-sm">
                      {options.orientation === "portrait"
                        ? "Portrait"
                        : "Landscape"}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Images to Convert ({files.length})
                  </CardTitle>
                  <CardDescription>
                    Total size: {formatFileSize(totalSize)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="relative group cursor-pointer border rounded-lg overflow-hidden"
                      >
                        {file.preview && (
                          <NextImage
                            src={file.preview}
                            alt={`Preview of ${file.name}`}
                            className="w-full h-24 object-cover"
                            height={160}
                            width={90}
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-white hover: hover:bg-opacity-20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-center p-1 truncate bg-gray-50">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress */}
            {processing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Converting images...
                      </span>
                      <span className="text-sm text-slate-500">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-slate-500 text-center">
                      Processing file {currentFile} of {totalFiles}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success */}
            {generatedFiles.length > 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto p-3 rounded-full bg-green-100 w-12 h-12 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">
                        Conversion Complete!
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        {generatedFiles.length} file(s) generated
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      {generatedFiles.map((file, index) => (
                        <Button
                          key={index}
                          onClick={() => downloadFileUtil(file)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {file.name.endsWith(".zip") ? (
                            <Archive className="h-4 w-4 mr-2" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          Download {file.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={convertToPdf}
                disabled={files.length === 0 || processing}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Convert to PDF
                    {options.mode === "individual" && files.length > 1
                      ? "s"
                      : ""}
                  </>
                )}
              </Button>
              {files.length > 0 && !processing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    cleanupImageFiles(files);
                    setFiles([]);
                    setGeneratedFiles([]);
                    setError(null);
                    setProgress(0);
                  }}
                  size="lg"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Organize Your Visual Files Effectively
          </h2>
          <p className="mb-4">
            Managing numerous individual image files creates significant
            friction during digital communication. When you attempt to email
            twenty separate photographs to a colleague or client, you frequently
            encounter strict attachment size limits. Furthermore, the recipient
            must open each optical file individually, completely ruining the
            intended viewing sequence. Converting multiple related images into a
            single, cohesive PDF document eliminates this specific workflow
            bottleneck entirely. You guarantee that your audience views your
            visual data exactly as you designed it.
          </p>
          <p className="mb-4">
            PDFs operate fundamentally differently than standard graphical data
            formats. This specific structure provides universal compatibility
            across virtually every modern device architecture. You confidently
            send a PDF portfolio containing high-definition JPGs and PNGs to a
            smartphone, a tablet, or an older desktop computer. The file renders
            consistently across all operating systems without requiring
            specialized viewing software. This ensures your professional
            presentations or personal photo collections always display perfectly
            intact.
          </p>
          <p className="mb-4">
            Data security represents another major advantage when utilizing a
            specialized local processing application. Unlike traditional
            cloud-based generation services, our platform executes the entire
            compilation routine explicitly within your local browser
            environment. You convert highly sensitive identity documents,
            confidential corporate sketches, or private family pictures into
            standardized PDFs without exposing them to remote internet servers.
            You retain absolute control over your digital properties throughout
            the entire conversion cycle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            The compilation process begins cleanly at the central upload
            interface. You locate the designated drop zone prominently displayed
            on the primary canvas. You select multiple distinct images from your
            internal storage and pull them directly onto the browser window. Our
            client-side algorithm instantly parses the metadata from standard
            inputs like JPG, PNG, and WebP. The interface subsequently populates
            a clean visual array displaying your individual file cards.
          </p>
          <p className="mb-4">
            Properly ordering your files ensures a coherent final document. You
            examine the loaded thumbnails and reorganize them logically within
            the provided grid structure. Next, you navigate toward the specific
            configuration panel. Here, you dictate the final document layout.
            You choose either a unified single-file export or individual
            distinct PDF generations. You also designate essential formatting
            parameters including target page size (like precise dimensions for
            standard A4 or Letter sheets) and explicit layout orientation.
          </p>
          <p className="mb-4">
            After finalizing the structural variables, you execute the creation
            command by clicking the primary conversion button. The engine
            accesses your local memory and rapidly anchors every individual
            image onto a separate discrete PDF page. Tracking the generation
            speed occurs visually via the integrated progress bar. Upon hitting
            the conclusion milestone, the platform presents immediate download
            links. You save the finalized PDF document immediately back to your
            local hardware.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This advanced assembly platform functions primarily as a localized
            document compiler. Instead of simply compressing pixels, the
            application engine builds a robust PDF container file dynamically.
            It translates the raw binary data from your uploaded photos and
            embeds them flawlessly into the new structure. This sophisticated
            client-side execution means you generate professional documents at
            extremely high speeds, completely bypassing the massive lag times
            typically associated with uploading heavy graphics to a remote data
            center.
          </p>
          <p className="mb-4">
            The diverse configuration options present powerful advantages for
            specific professional use cases. You select accurate page
            constraints that perfectly match physical printing dimensions. The
            intelligent software automatically scales your varied pictures
            conditionally to fit the targeted dimensions without accidentally
            distorting the core visual aspect ratios. You maintain professional
            standards while rapidly formatting casual smartphone snaps
            identically alongside high-resolution digital camera exports.
          </p>
          <p className="mb-4">
            We expressly designed this streamlined operation to handle
            significant workloads safely. You add substantial quantities of
            files simultaneously without overwhelming your device resources or
            triggering browser crashes. We provide this completely unregulated
            access explicitly free of charge. You avoid restrictive paywalls or
            required email registrations while building secure, portable PDF
            portfolios reliably and endlessly.
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
