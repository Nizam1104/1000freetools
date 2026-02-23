"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Upload,
  Trash2,
  RotateCcw,
  Loader2,
  ImageIcon,
  Settings,
  ChevronDown,
  Archive,
  X,
  Grid,
  List,
} from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";

// Import modularized utilities
import {
  loadBackgroundImageData,
  validateBackgroundImageFile,
  processBackgroundRemoval,
  downloadProcessedImage,
  extractImageMetadata,
  cleanupObjectUrls,
  getBackgroundRemovalPreset,
  analyzeImageForBackgroundRemoval,
  BACKGROUND_REMOVAL_PRESETS,
  type BackgroundImageData,
  type BackgroundRemovalResult,
  type BackgroundRemovalPreset,
} from "@/components/image-tools/utils";

interface RemoveImageBackgroundProps {
  onImageUploaded?: (image: BackgroundImageData) => void;
  onBackgroundRemoved?: (result: BackgroundRemovalResult) => void;
  onImageRemoved?: () => void;
}

export default function RemoveImageBackground({
  onImageUploaded,
  onBackgroundRemoved,
  onImageRemoved,
}: RemoveImageBackgroundProps) {
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<BackgroundImageData | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [selectedPreset, setSelectedPreset] =
    useState<BackgroundRemovalPreset>("PRODUCT_PHOTO");
  const [outputFormat, setOutputFormat] = useState<"PNG" | "JPEG">("PNG");
  const [imageQuality, setImageQuality] = useState(0.9);

  // Bulk processing states
  const [bulkImages, setBulkImages] = useState<BackgroundImageData[]>([]);
  const [processedBulkImages, setProcessedBulkImages] = useState<
    Array<{
      original: BackgroundImageData;
      processed: string;
      error?: string;
    }>
  >([]);
  const [bulkProcessingProgress, setBulkProcessingProgress] = useState(0);
  const [currentlyProcessing, setCurrentlyProcessing] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const processedImageRef = useRef<string | null>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      cleanupObjectUrls(processedImageRef.current, selectedImage?.url);
      // Cleanup bulk images URLs
      bulkImages.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
      // Cleanup processed bulk images URLs
      processedBulkImages.forEach((img) => {
        if (img.processed) URL.revokeObjectURL(img.processed);
      });
    };
  }, [selectedImage, bulkImages, processedBulkImages]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file using modularized utility
      const validation = validateBackgroundImageFile(file, 10);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }

      try {
        setLoading(true);
        const imageData = await loadBackgroundImageData(file);
        setSelectedImage(imageData);

        // Clear previous processed image
        cleanupObjectUrls(processedImageRef.current);
        setProcessedImage(null);
        processedImageRef.current = null;

        toast.success("Image uploaded successfully");
        onImageUploaded?.(imageData);
      } catch (error) {
        console.error("Error loading image:", error);
        toast.error("Failed to load image. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [onImageUploaded]
  );

  const handleBulkImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      // Validate maximum limit
      if (files.length > 25) {
        toast.error("Maximum 25 images allowed per batch");
        return;
      }

      // Validate each file
      const validFiles: File[] = [];
      for (const file of files) {
        const validation = validateBackgroundImageFile(file, 10);
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length === 0) {
        toast.error("No valid images selected");
        return;
      }

      try {
        setLoading(true);
        const imageDataPromises = validFiles.map((file) =>
          loadBackgroundImageData(file)
        );
        const imagesData = await Promise.all(imageDataPromises);

        setBulkImages((prev) => [...prev, ...imagesData]);
        setProcessedBulkImages((prev) => [
          ...prev,
          ...imagesData.map((img) => ({
            original: img,
            processed: "",
            error: undefined,
          })),
        ]);

        toast.success(`${imagesData.length} images uploaded successfully`);
      } catch (error) {
        console.error("Error loading images:", error);
        toast.error("Failed to load some images. Please try again.");
      } finally {
        setLoading(false);
        if (bulkFileInputRef.current) {
          bulkFileInputRef.current.value = "";
        }
      }
    },
    []
  );

  const removeBulkImage = useCallback((index: number) => {
    setBulkImages((prev) => {
      const newImages = [...prev];
      if (newImages[index]?.url) {
        URL.revokeObjectURL(newImages[index].url);
      }
      newImages.splice(index, 1);
      return newImages;
    });
    setProcessedBulkImages((prev) => {
      const newProcessed = [...prev];
      if (newProcessed[index]?.processed) {
        URL.revokeObjectURL(newProcessed[index].processed);
      }
      newProcessed.splice(index, 1);
      return newProcessed;
    });
  }, []);

  const processBulkImages = useCallback(async () => {
    if (bulkImages.length === 0) {
      toast.error("Please upload images first");
      return;
    }

    setLoading(true);
    setBulkProcessingProgress(0);

    // Get preset options
    const presetOptions = getBackgroundRemovalPreset(selectedPreset, {
      outputFormat: outputFormat.toLowerCase() as "png" | "jpeg",
      quality: imageQuality,
      debug: advancedOptions,
      onProgress: () => {}, // We'll handle progress differently for bulk
    });

    const updatedProcessedImages = [...processedBulkImages];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < bulkImages.length; i++) {
      const image = bulkImages[i];
      setCurrentlyProcessing(image.name);
      setBulkProcessingProgress((i / bulkImages.length) * 100);

      try {
        const result = await processBackgroundRemoval(
          image.file,
          presetOptions
        );

        // Update the processed image in our array
        const index = updatedProcessedImages.findIndex(
          (img) => img.original.name === image.name
        );
        if (index !== -1) {
          // Clean up previous processed image if exists
          if (updatedProcessedImages[index].processed) {
            URL.revokeObjectURL(updatedProcessedImages[index].processed);
          }
          updatedProcessedImages[index] = {
            original: image,
            processed: result.url,
          };
          successCount++;
        }
      } catch (err) {
        console.error(`Error processing ${image.name}:`, err);
        const index = updatedProcessedImages.findIndex(
          (img) => img.original.name === image.name
        );
        if (index !== -1) {
          updatedProcessedImages[index] = {
            original: image,
            processed: "",
            error: err instanceof Error ? err.message : "Processing failed",
          };
          errorCount++;
        }
      }
    }

    setProcessedBulkImages(updatedProcessedImages);
    setBulkProcessingProgress(100);
    setCurrentlyProcessing(null);

    toast.success(
      `Processing complete: ${successCount} successful, ${errorCount} failed`
    );
  }, [
    bulkImages,
    processedBulkImages,
    selectedPreset,
    outputFormat,
    imageQuality,
    advancedOptions,
  ]);

  const downloadAllProcessedImages = useCallback(async () => {
    const successfulImages = processedBulkImages.filter(
      (img) => img.processed && !img.error
    );
    if (successfulImages.length === 0) {
      toast.error("No processed images available for download");
      return;
    }

    try {
      const zip = new JSZip();

      // Fetch all processed images and add to ZIP
      for (const img of successfulImages) {
        try {
          const response = await fetch(img.processed);
          const blob = await response.blob();
          const fileName =
            img.original.name.replace(/\.[^/.]+$/, "") +
            "_no-bg." +
            outputFormat.toLowerCase();
          zip.file(fileName, blob);
        } catch (error) {
          console.error(
            `Failed to fetch processed image ${img.original.name}:`,
            error
          );
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "background_removed_images.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${successfulImages.length} images as ZIP`);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      toast.error("Failed to create ZIP file");
    }
  }, [processedBulkImages, outputFormat]);

  const handleDownloadProcessedImage = useCallback(
    (imageUrl: string, fileName: string) => {
      downloadProcessedImage(
        imageUrl,
        fileName,
        "no-bg",
        outputFormat.toLowerCase()
      );
      toast.success("Image downloaded successfully");
    },
    [outputFormat]
  );

  const removeImageBackground = useCallback(async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    setProcessingProgress(0);

    try {
      // Clean up previous processed image
      cleanupObjectUrls(processedImageRef.current);
      setProcessedImage(null);
      processedImageRef.current = null;

      // Get preset options or use custom settings
      const presetOptions = getBackgroundRemovalPreset(selectedPreset, {
        outputFormat: outputFormat.toLowerCase() as "png" | "jpeg",
        quality: imageQuality,
        debug: advancedOptions,
        onProgress: (_status: string, progress: number) => {
          setProcessingProgress(progress);
        },
      });

      // Process background removal using modularized utility
      const result = await processBackgroundRemoval(
        selectedImage.file,
        presetOptions
      );

      // Store result and update UI
      setProcessedImage(result.url);
      processedImageRef.current = result.url;

      setProcessingProgress(100);

      toast.success("Background removed successfully!");
      onBackgroundRemoved?.(result);

      // Auto-download the processed image
      handleDownloadProcessedImage(
        result.url,
        selectedImage.name.replace(/\.[^/.]+$/, "")
      );
    } catch (err) {
      console.error("Error removing background:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to remove background: ${errorMessage}`);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setProcessingProgress(0);
      }, 1000);
    }
  }, [
    selectedImage,
    advancedOptions,
    selectedPreset,
    outputFormat,
    handleDownloadProcessedImage,
    imageQuality,
    onBackgroundRemoved,
  ]);

  const resetAll = useCallback(() => {
    // Cleanup using modularized utility
    cleanupObjectUrls(processedImageRef.current, selectedImage?.url);

    setSelectedImage(null);
    setProcessedImage(null);
    processedImageRef.current = null;
    setProcessingProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Reset bulk mode
    setBulkImages([]);
    setProcessedBulkImages([]);
    setBulkProcessingProgress(0);
    setCurrentlyProcessing(null);

    if (bulkFileInputRef.current) {
      bulkFileInputRef.current.value = "";
    }

    onImageRemoved?.();
    toast.success("Reset successfully");
  }, [selectedImage, onImageRemoved]);

  // Tool Interface Component
  const ToolInterface = () => (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Processing Mode</CardTitle>
          <CardDescription className="text-xs">
            Choose between single image or bulk processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={!isBulkMode ? "default" : "outline"}
              onClick={() => setIsBulkMode(false)}
              className="text-xs h-8"
            >
              <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
              Single Image
            </Button>
            <Button
              variant={isBulkMode ? "default" : "outline"}
              onClick={() => setIsBulkMode(true)}
              className="text-xs h-8"
            >
              <Grid className="h-3.5 w-3.5 mr-1.5" />
              Bulk Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      {!isBulkMode ? (
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Upload Image</CardTitle>
            <CardDescription className="text-xs">
              Select an image to remove its background using AI technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-primary/50 transition-colors flex flex-col items-center justify-center min-h-[120px]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm font-medium mb-1">
                Click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, GIF, WebP (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bulk Upload Images</CardTitle>
            <CardDescription className="text-xs">
              Select multiple images (Max 25 images, 10MB each) for batch
              processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-primary/50 transition-colors flex flex-col items-center justify-center min-h-[120px]"
              onClick={() => bulkFileInputRef.current?.click()}
            >
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm font-medium mb-1">
                Click to upload images
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, GIF, WebP (Max 25 images)
              </p>
              <input
                ref={bulkFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleBulkImageUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Options Toggle */}
      <div className="flex items-center space-x-2 px-1">
        <Label
          htmlFor="advanced-options"
          className="text-xs text-muted-foreground"
        >
          Show advanced options
        </Label>
        <Switch
          id="advanced-options"
          checked={advancedOptions}
          onCheckedChange={setAdvancedOptions}
        />
      </div>

      {/* Advanced Options */}
      {advancedOptions && (
        <Card>
          <Collapsible open={advancedOptions}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer py-2">
                <CardTitle className="flex items-center gap-2 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  Advanced Options
                  <ChevronDown className="h-3.5 w-3.5" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="outputFormat" className="text-xs">
                      Output Format
                    </Label>
                    <Select
                      value={outputFormat}
                      onValueChange={(value: "PNG" | "JPEG") =>
                        setOutputFormat(value)
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PNG">PNG (Transparent)</SelectItem>
                        <SelectItem value="JPEG">JPEG (White)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {outputFormat === "JPEG" && (
                    <div className="space-y-1.5">
                      <Label htmlFor="quality" className="text-xs">
                        Quality: {Math.round(imageQuality * 100)}%
                      </Label>
                      <input
                        type="range"
                        id="quality"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={imageQuality}
                        onChange={(e) =>
                          setImageQuality(parseFloat(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {selectedImage && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 bg-muted/50 rounded-lg">
                      <p className="text-xs font-medium mb-1.5">Image Info</p>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        {(() => {
                          const metadata = extractImageMetadata(selectedImage);
                          return (
                            <>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium truncate">
                                  Size:
                                </span>{" "}
                                <span>{metadata.size}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">Dim:</span>{" "}
                                <span>{metadata.dimensions}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">Type:</span>{" "}
                                <span>{metadata.type}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="p-2.5 bg-muted/50 rounded-lg">
                      <p className="text-xs font-medium mb-1.5">Analysis</p>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        {(() => {
                          const analysis =
                            analyzeImageForBackgroundRemoval(selectedImage);
                          return (
                            <>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">Complexity:</span>{" "}
                                <span>{analysis.complexity}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">Time:</span>{" "}
                                <span>{analysis.estimatedTime}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="font-medium">Preset:</span>{" "}
                                <span>
                                  {
                                    BACKGROUND_REMOVAL_PRESETS[
                                      analysis.recommendedPreset
                                    ].name
                                  }
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-xs">
              <span>Image Preview</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (selectedImage.url) {
                    URL.revokeObjectURL(selectedImage.url);
                  }
                  setSelectedImage(null);
                  if (processedImageRef.current) {
                    URL.revokeObjectURL(processedImageRef.current);
                  }
                  setProcessedImage(null);
                  processedImageRef.current = null;
                }}
                className="h-7 px-2 text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Remove
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-2">
              <div>
                <h4 className="text-xs font-medium mb-1.5">Original</h4>
                <div className="aspect-square sm:aspect-video lg:aspect-[4/3] rounded-lg border overflow-hidden bg-muted max-h-[200px] lg:max-h-[150px]">
                  <Image
                    src={selectedImage.url}
                    alt="Original image"
                    className="w-full h-full object-contain"
                    width={400}
                    height={400}
                    unoptimized
                  />
                </div>
                <p
                  className="text-xs text-muted-foreground mt-1.5 truncate"
                  title={selectedImage.name}
                >
                  {selectedImage.name}
                </p>
              </div>

              {processedImage && (
                <div>
                  <h4 className="text-xs font-medium mb-1.5">Processed</h4>
                  <div className="aspect-square sm:aspect-video lg:aspect-[4/3] rounded-lg border overflow-hidden bg-muted relative group max-h-[200px] lg:max-h-[150px]">
                    <div className="absolute top-1.5 right-1.5 opacity-100 transition-opacity z-10 lg:opacity-0 lg:group-hover:opacity-100">
                      <Button
                        size="sm"
                        className="h-7 w-7 p-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                        onClick={() =>
                          downloadProcessedImage(
                            processedImage,
                            selectedImage.name.replace(/\.[^/.]+$/, "") +
                              "_no-bg." +
                              outputFormat.toLowerCase()
                          )
                        }
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="w-full h-full bg-checkerboard">
                      <Image
                        src={processedImage}
                        alt="Background removed"
                        className="w-full h-full object-contain"
                        width={400}
                        height={400}
                        unoptimized
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleDownloadProcessedImage(
                        processedImage,
                        selectedImage.name.replace(/\.[^/.]+$/, "")
                      )
                    }
                    className="w-full mt-2 text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Download className="h-3 w-3 mr-1.5" />
                    Download Image
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Images Preview */}
      {isBulkMode && bulkImages.length > 0 && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Bulk Images ({bulkImages.length}/25)</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className="h-7 px-2 text-xs rounded-r-none"
                  >
                    <Grid className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className="h-7 px-2 text-xs rounded-l-none"
                  >
                    <List className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBulkImages([]);
                    setProcessedBulkImages([]);
                  }}
                  className="h-7 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {processedBulkImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg border overflow-hidden bg-muted">
                      <Image
                        src={img.original.url}
                        alt={img.original.name}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                        unoptimized
                      />
                      {img.processed && !img.error && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                      {img.error && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p
                      className="text-xs text-muted-foreground mt-1 truncate"
                      title={img.original.name}
                    >
                      {img.original.name}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeBulkImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {processedBulkImages.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 border rounded-lg"
                  >
                    <div className="w-12 h-12 rounded border overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={img.original.url}
                        alt={img.original.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {img.original.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {img.processed && !img.error ? (
                          <span className="text-green-600">Processed</span>
                        ) : img.error ? (
                          <span className="text-red-600">
                            Error: {img.error}
                          </span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeBulkImage(index)}
                      className="h-7 px-2 text-xs"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bulk Processing Progress */}
      {isBulkMode && loading && bulkProcessingProgress > 0 && (
            <div className="space-y-3 max-w-[500px] mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bulk Processing</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(bulkProcessingProgress)}%
                </span>
              </div>
              <Progress value={bulkProcessingProgress} className="w-full" />
              {currentlyProcessing && (
                <p className="text-xs text-muted-foreground">
                  Currently processing: {currentlyProcessing}
                </p>
              )}
            </div>
      )}

      {isBulkMode && (
        <div className="flex items-center max-w-[500px] mx-auto justify-between p-2 bg-muted/50 rounded-lg">
          <span className="text-xs font-medium">
            Images: {bulkImages.length}/25
          </span>
          {processedBulkImages.some((img) => img.processed && !img.error) && (
            <Button
              size="lg"
              variant="default"
              onClick={downloadAllProcessedImages}
              className="h-12 px-4 text-xs"
            >
              <Archive className="h-3 w-3 mr-1" />
              Download All
            </Button>
          )}
        </div>
      )}

      {/* Progress Display - Single Image */}
      {!isBulkMode && loading && processingProgress > 0 && (
        <div className="flex flex-col items-center justify-center p-4 space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm font-medium">
            {Math.min(100, Math.max(0, Math.round(processingProgress)))}%
          </span>
        </div>
      )}

      {/* Action Buttons */}
      {(!isBulkMode && selectedImage) ||
      (isBulkMode && bulkImages.length > 0) ? (
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Button
            onClick={!isBulkMode ? removeImageBackground : processBulkImages}
            disabled={loading}
            className="flex-1 text-xs h-8 sm:text-sm sm:h-9"
          >
            <ImageIcon className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
            {loading
              ? isBulkMode
                ? `Processing (${Math.round(bulkProcessingProgress)}%)`
                : "Processing..."
              : isBulkMode
              ? `Process ${bulkImages.length} Images`
              : "Remove Background"}
          </Button>
          <Button
            variant="outline"
            onClick={resetAll}
            disabled={loading}
            className="text-xs h-8 sm:text-sm sm:h-9"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
            Reset All
          </Button>
        </div>
      ) : null}


      {/* Preset Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Processing Preset</CardTitle>
          <CardDescription className="text-xs">
            Choose a preset optimized for your specific use case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(BACKGROUND_REMOVAL_PRESETS).map(([key, preset]) => (
              <div
                key={key}
                className={`p-2.5 sm:p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedPreset === key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() =>
                  setSelectedPreset(key as BackgroundRemovalPreset)
                }
              >
                <h4 className="font-medium text-xs sm:text-sm mb-1">
                  {preset.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {preset.description}
                </p>
                <Badge variant="secondary" className="mt-1.5 text-xs">
                  {preset.outputFormat.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="w-full">
      <ToolInterface />
    </div>
  );
}
