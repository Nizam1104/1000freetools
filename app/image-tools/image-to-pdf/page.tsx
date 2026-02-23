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
      question:
        "Is this free image to PDF converter actually free to use offline?",
      answer:
        "Yes, generating your compiled PDF documents costs absolutely nothing. Once the web application interface loads in your browser window, you can process high volumes entirely offline without hitting hidden paywalls or subscription prompts.",
    },
    {
      question:
        "Will the compiled PDF compilation ruin my original image quality?",
      answer:
        "No. The conversion engine fundamentally embeds your exact original images directly into the PDF framework intact. The visual fidelity, contrast, and resolution of your uploaded photography remains perfectly preserved without forceful compression algorithms.",
    },
    {
      question:
        "Do you store the generated PDF portfolios on an internet server?",
      answer:
        "Absolutely not. The entire conversion execution runs strictly locally using your active tab memory. Your highly sensitive ID scans or private family files remain completely secure on your personal device and are never broadcasted externally.",
    },
    {
      question:
        "Can I combine multiple distinct pictures into one specific PDF file?",
      answer:
        "Yes, you simply drag multiple photos onto the canvas area simultaneously. The interface allows you to select the 'Single PDF' mode, enabling you to sort the hierarchy before generating one multi-page compiled document.",
    },
    {
      question: "What specific image formats can I upload to the application?",
      answer:
        "The interface accepts a wide array of graphic types natively, including standard JPG, transparent PNG, WebP, GIF, and BMP files. You can effortlessly mix and match these fundamentally different formats securely within the very same document presentation.",
    },
    {
      question:
        "How do I ensure the images completely fill the PDF page borders?",
      answer:
        "In the primary settings window, you can designate formatting parameters. Selecting specific uniform layouts like A4 sheets and setting the orientation perfectly matches standard printing paper sizes, resulting in a remarkably professional corporate output.",
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
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Attempting to submit multiple individual JPG photos to official
            application portals or sending messy email attachments often results
            in chaotic formatting errors. This free image to PDF converter
            allows you to seamlessly merge various photos into a single,
            cohesive PDF document securely inside your browser. It solves
            formatting headaches by packing mismatched file types into a
            universally readable structure utilizing secure local processing.
            You guarantee exact display sizes and flawless layouts without
            installing expensive desktop office suites or uploading sensitive
            identity scans online.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Upload your image assets</strong>
            <br />
            Simply drag the desired JPG, PNG, or WebP files from your desktop
            onto the designated dashed canvas. Our algorithms instantly generate
            visual thumbnails horizontally, verifying that your private graphics
            have loaded cleanly into local memory.
          </p>
          <p className="mb-4">
            <strong>2. Configure your PDF layout</strong>
            <br />
            Adjust the exact document blueprint using the intuitive settings
            panel directly above the image grid. Toggle the master switch to
            compile one massive multi-page PDF or process separate distinct file
            downloads, then designate the specific paper dimensions like A4 or
            Letter sizes.
          </p>
          <p className="mb-4">
            <strong>3. Execute and securely download</strong>
            <br />
            Click the big convert button after eliminating unneeded photos via
            the tiny 'X' marks. The progress bar completes incredibly quickly
            via Javascript execution, instantly revealing secure download links
            or a convenient ZIP archive containing the finalized corporate-ready
            document.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Submitting secure identity verification documents</strong>
            <br />
            Immigration systems strictly require applicants to upload perfectly
            collated passport scans and utility bills as a single digital
            bundle. Dragging your disparate smartphone photography into this
            utility safely outputs one compliant PDF file while avoiding
            dangerous cloud-based data harvesting servers.
          </p>
          <p className="mb-4">
            <strong>Assembling impressive creative design portfolios</strong>
            <br />
            Sending a prospective employer 15 random loose graphical JPGs
            practically guarantees confusion and rejection. Utilizing the
            unified Single PDF generation mode sequences your artwork formally,
            producing an elegant scrolling presentation optimized for quick
            corporate evaluations.
          </p>
          <p className="mb-4">
            <strong>Digitizing heavy printed taxation receipts</strong>
            <br />
            Freelancers often photograph hundreds of disjointed physical dining
            receipts for critical quarterly reporting purposes. Ingesting these
            files into the bulk editor translates the mess into one cleanly
            ordered, printable chronological ledger document tailored exactly
            for rigorous accounting audits.
          </p>
          <p className="mb-4">
            <strong>Distributing educational storyboard materials</strong>
            <br />
            Teachers routinely need to disseminate sequential comic strip pages
            or physical textbook scans for remote learning assignments. The tool
            organizes these confusing isolated frames onto uniformly scaled A4
            layouts, preventing young students from opening lessons completely
            out of physical order.
          </p>
          <p className="mb-4">
            <strong>Standardizing client architectural sketches</strong>
            <br />
            Contractors receiving unpredictable bundles of blueprints via email
            struggle to reference the chaotic file extensions swiftly on mobile
            hardware. Converting every obscure format uniformly into individual
            PDF blueprints enables perfect cross-platform viewing compatibility
            natively on construction site tablets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Target Conversion Mode</strong>
            <br />
            This dictation toggle controls the primary architecture entirely.
            Choose "Single PDF" to stitch hundreds of photos securely into one
            giant scrolling magazine file, whereas "Individual PDFs" outputs a
            completely isolated 1-page PDF file for every single photo uploaded.
          </p>
          <p className="mb-4">
            <strong>Designated Page Size</strong>
            <br />
            This structural option strictly defines the mathematical bounding
            constraints of the final PDF generation. You should explicitly pick
            A4 or Letter sizes if the recipient intends to physically print out
            the document on standard commercial office hardware.
          </p>
          <p className="mb-4">
            <strong>Physical Layout Orientation</strong>
            <br />
            This determines if the rectangular PDF canvas reads vertically or
            horizontally. Select Portrait when packaging standard upright
            document snapshots or human headshots, but actively toggle Landscape
            specifically when showcasing wide scenic photography or sweeping
            panoramic data charts.
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
