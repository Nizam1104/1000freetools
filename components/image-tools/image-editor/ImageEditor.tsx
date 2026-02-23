"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useImageEditorWorker } from "@/components/image-tools/useImageEditorWorker";
import { ImageCanvas } from "./ImageCanvas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Download,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Loader2,
  Undo2,
  Redo2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useRefreshWarning } from "@/hooks/confirm-refresh";
import {
  AdjustmentsTab,
  FiltersTab,
  BackgroundTab,
  RetouchTab,
  DrawTab,
  ExportTab,
} from "./tabs";

interface DrawingTool {
  type: "pen" | "rectangle" | "circle" | "line" | "text" | "arrow";
  color: string;
  strokeWidth: number;
  fontSize?: number;
}

interface ImageHistory {
  data: string;
  drawingElements: any[];
  timestamp: number;
}

export function ImageEditor() {
  useRefreshWarning();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRealTimeAdjustment, setIsRealTimeAdjustment] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [history, setHistory] = useState<ImageHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Drawing state
  const [currentTool, setCurrentTool] = useState<DrawingTool>({
    type: "pen",
    color: "#000000",
    strokeWidth: 2,
    fontSize: 16,
  });
  const [drawingElements, setDrawingElements] = useState<any[]>([]);
  const [drawingMode, setDrawingMode] = useState(false);

  // Basic Adjustments
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [exposure, setExposure] = useState([50]);
  const [filterIntensity, setFilterIntensity] = useState([100]);

  // Advanced Adjustments
  const [vibrance, setVibrance] = useState([50]);
  const [highlights, setHighlights] = useState([50]);
  const [shadows, setShadows] = useState([50]);
  const [temperature, setTemperature] = useState([50]);
  const [tint, setTint] = useState([50]);
  const [clarity, setClarity] = useState([50]);
  const [sharpness, setSharpness] = useState([50]);

  // Retouching
  const [skinSmoothingStrength, setSkinSmoothingStrength] = useState([50]);
  const [teethWhiteningStrength, setTeethWhiteningStrength] = useState([50]);

  // Background
  const [backgroundBlurStrength, setBackgroundBlurStrength] = useState([20]);

  // UI States
  const [activeTab, setActiveTab] = useState("adjustments");

  // Resize
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [maintainAspect, setMaintainAspect] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    resizeImage,
    rotateImage,
    flipImage,
    applyFilter,
    applyAdvancedFilter,
    applyBackgroundBlur,
    smoothSkin,
    whitenTeeth,
    adjustImage,
  } = useImageEditorWorker();

  // Note: we intentionally DO NOT depend on drawingElements here to avoid
  // creating a circular dependency with drawing-related state and the
  // debounced adjustment effect.
  const addToHistory = useCallback(
    (imageData: string, elements: any[] = []) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({
        data: imageData,
        drawingElements: [...elements],
        timestamp: Date.now(),
      });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex],
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setOriginalImage(imageData);
        setCurrentImage(imageData);
        setHistory([
          {
            data: imageData,
            drawingElements: [],
            timestamp: Date.now(),
          },
        ]);
        setHistoryIndex(0);
        setDrawingElements([]);
        toast.success("Image loaded successfully");
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentImage(previousState.data);
      setDrawingElements([...previousState.drawingElements]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentImage(nextState.data);
      setDrawingElements([...nextState.drawingElements]);
    }
  }, [history, historyIndex]);

  // Apply current adjustments and save to history (for final result)
  const applyCurrentAdjustments = useCallback(async () => {
    if (!originalImage) return;

    setIsRealTimeAdjustment(true);
    try {
      const result = await adjustImage(originalImage, {
        brightness: brightness[0],
        contrast: contrast[0],
        saturation: saturation[0],
        exposure: exposure[0],
        vibrance: vibrance[0],
        highlights: highlights[0],
        shadows: shadows[0],
        temperature: temperature[0],
        tint: tint[0],
        clarity: clarity[0],
        sharpness: sharpness[0],
      });

      const newImageData = URL.createObjectURL(result);
      setCurrentImage(newImageData);
      // Save to history when adjustments are applied.
      // We deliberately do NOT include drawingElements in this hook's
      // dependency array to avoid triggering adjustments when only
      // drawing state changes.
      addToHistory(newImageData, drawingElements);
    } catch (error) {
      toast.error("Failed to apply adjustments");
    } finally {
      setIsRealTimeAdjustment(false);
    }
  }, [
    originalImage,
    brightness,
    contrast,
    saturation,
    exposure,
    vibrance,
    highlights,
    shadows,
    temperature,
    tint,
    clarity,
    sharpness,
    adjustImage,
    addToHistory,
  ]);

  // Create a ref to store the timeout ID so we can clear it
  const adjustmentTimeoutRef = useRef<number | null>(null);

  // Prevent infinite loop by tracking if we just applied adjustments
  const justAppliedAdjustments = useRef(false);

  // Real-time adjustments effect - only apply and save to history when user stops adjusting
  useEffect(() => {
    if (!originalImage || justAppliedAdjustments.current) return;

    // Clear the previous timeout if it exists
    if (adjustmentTimeoutRef.current) {
      window.clearTimeout(adjustmentTimeoutRef.current);
    }

    // Set a new timeout to apply adjustments after the user stops adjusting
    adjustmentTimeoutRef.current = window.setTimeout(() => {
      justAppliedAdjustments.current = true;
      applyCurrentAdjustments().finally(() => {
        // Reset the flag after a short delay to prevent immediate re-triggering
        setTimeout(() => {
          justAppliedAdjustments.current = false;
        }, 100);
      });
    }, 800); // 800ms delay after user stops adjusting to save to history

    return () => {
      if (adjustmentTimeoutRef.current) {
        window.clearTimeout(adjustmentTimeoutRef.current);
      }
    };
  }, [
    brightness,
    contrast,
    saturation,
    exposure,
    vibrance,
    highlights,
    shadows,
    temperature,
    tint,
    clarity,
    sharpness,
    originalImage,
    applyCurrentAdjustments,
  ]);

  const handleFilter = useCallback(
    async (filterType: string) => {
      if (!currentImage) return;

      setIsProcessing(true);
      try {
        const result = await applyFilter(
          currentImage,
          filterType as any,
          filterIntensity[0],
        );

        const newImageData = URL.createObjectURL(result);
        setCurrentImage(newImageData);
        addToHistory(newImageData, drawingElements); // Include current drawing elements
        toast.success(`${filterType} filter applied successfully`);
      } catch (error) {
        toast.error(`Failed to apply ${filterType} filter`);
      } finally {
        setIsProcessing(false);
      }
    },
    [currentImage, applyFilter, filterIntensity, addToHistory, drawingElements],
  );

  const handleAdvancedFilter = useCallback(
    async (filterType: string) => {
      if (!currentImage) return;

      setIsProcessing(true);
      try {
        const result = await applyAdvancedFilter(
          currentImage,
          filterType as any,
          filterIntensity[0],
        );

        const newImageData = URL.createObjectURL(result);
        setCurrentImage(newImageData);
        addToHistory(newImageData, drawingElements); // Include current drawing elements
        toast.success(`${filterType} filter applied successfully`);
      } catch (error) {
        toast.error(`Failed to apply ${filterType} filter`);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      currentImage,
      applyAdvancedFilter,
      filterIntensity,
      addToHistory,
      drawingElements,
    ],
  );

  const handleBackgroundBlur = useCallback(async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      const result = await applyBackgroundBlur(
        currentImage,
        backgroundBlurStrength[0],
      );

      const newImageData = URL.createObjectURL(result);
      setCurrentImage(newImageData);
      addToHistory(newImageData, drawingElements); // Include current drawing elements
      toast.success("Background blur applied successfully");
    } catch (error) {
      toast.error("Failed to apply background blur");
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentImage,
    applyBackgroundBlur,
    backgroundBlurStrength,
    addToHistory,
    drawingElements,
  ]);

  const handleSkinSmoothing = useCallback(async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      const result = await smoothSkin(currentImage, skinSmoothingStrength[0]);

      const newImageData = URL.createObjectURL(result);
      setCurrentImage(newImageData);
      addToHistory(newImageData, drawingElements); // Include current drawing elements
      toast.success("Skin smoothing applied successfully");
    } catch (error) {
      toast.error("Failed to apply skin smoothing");
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentImage,
    smoothSkin,
    skinSmoothingStrength,
    addToHistory,
    drawingElements,
  ]);

  const handleTeethWhitening = useCallback(async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      const result = await whitenTeeth(currentImage, teethWhiteningStrength[0]);

      const newImageData = URL.createObjectURL(result);
      setCurrentImage(newImageData);
      addToHistory(newImageData, drawingElements); // Include current drawing elements
      toast.success("Teeth whitening applied successfully");
    } catch (error) {
      toast.error("Failed to apply teeth whitening");
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentImage,
    whitenTeeth,
    teethWhiteningStrength,
    addToHistory,
    drawingElements,
  ]);

  const handleRemoveBackground = useCallback(async () => {
    if (!currentImage) {
      return;
    }

    setIsProcessing(true);

    try {
      // Dynamically import the background removal library.
      // This ensures it's only loaded and executed on the client-side.
      const { removeBackground } = await import("@imgly/background-removal");

      // Call the background removal function.
      // It can accept various inputs, including a Data URL string.
      const blob = await removeBackground(currentImage);

      // Create a new object URL from the resulting Blob for display
      const url = URL.createObjectURL(blob);
      setCurrentImage(url);
      addToHistory(url, drawingElements); // Include current drawing elements
    } catch (err) {
      console.error("Error removing background:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [currentImage, addToHistory, drawingElements]);

  const handleRotate = useCallback(
    async (angle: number) => {
      if (!currentImage) return;

      setIsProcessing(true);
      try {
        const result = await rotateImage(currentImage, angle);

        const newImageData = URL.createObjectURL(result);
        setCurrentImage(newImageData);
        addToHistory(newImageData, drawingElements); // Include current drawing elements
        toast.success(`Image rotated ${angle} degrees`);
      } catch (error) {
        toast.error("Failed to rotate image");
      } finally {
        setIsProcessing(false);
      }
    },
    [currentImage, rotateImage, addToHistory, drawingElements],
  );

  const handleFlip = useCallback(
    async (direction: "horizontal" | "vertical") => {
      if (!currentImage) return;

      setIsProcessing(true);
      try {
        const result = await flipImage(currentImage, direction);

        const newImageData = URL.createObjectURL(result);
        setCurrentImage(newImageData);
        addToHistory(newImageData, drawingElements); // Include current drawing elements
        toast.success(`Image flipped ${direction}ly`);
      } catch (error) {
        toast.error("Failed to flip image");
      } finally {
        setIsProcessing(false);
      }
    },
    [currentImage, flipImage, addToHistory, drawingElements],
  );

  const handleResize = useCallback(async () => {
    if (!currentImage || !resizeWidth || !resizeHeight) return;

    setIsProcessing(true);
    try {
      const result = await resizeImage(
        currentImage,
        parseInt(resizeWidth),
        parseInt(resizeHeight),
        maintainAspect,
      );

      const newImageData = URL.createObjectURL(result);
      setCurrentImage(newImageData);
      addToHistory(newImageData, drawingElements); // Include current drawing elements
      toast.success("Image resized successfully");
    } catch (error) {
      toast.error("Failed to resize image");
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentImage,
    resizeWidth,
    resizeHeight,
    maintainAspect,
    resizeImage,
    addToHistory,
    drawingElements,
  ]);

  const handleDownload = useCallback(
    (format = "png") => {
      if (!currentImage) return;

      const link = document.createElement("a");
      link.href = currentImage;
      link.download = `edited-image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully");
    },
    [currentImage],
  );

  // Update resize dimensions when aspect ratio should be maintained
  useEffect(() => {
    if (maintainAspect && imageDimensions.width && imageDimensions.height) {
      if (resizeWidth && !resizeHeight) {
        const ratio = imageDimensions.height / imageDimensions.width;
        setResizeHeight(Math.round(parseInt(resizeWidth) * ratio).toString());
      } else if (resizeHeight && !resizeWidth) {
        const ratio = imageDimensions.width / imageDimensions.height;
        setResizeWidth(Math.round(parseInt(resizeHeight) * ratio).toString());
      }
    }
  }, [resizeWidth, resizeHeight, maintainAspect, imageDimensions]);

  if (!currentImage) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Editor
          </CardTitle>
          <CardDescription>
            Upload an image to start editing with powerful tools and effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Upload an image to edit
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to select an image file
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Select Image
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle>Image Editor Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={historyIndex > 0 ? "default" : "outline"}
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button
              variant={
                historyIndex < history.length - 1 ? "default" : "outline"
              }
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo2 className="h-4 w-4 mr-2" />
              Redo
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(-90)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Rotate Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(90)}
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFlip("horizontal")}
            >
              <FlipHorizontal className="h-4 w-4 mr-2" />
              Flip H
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFlip("vertical")}
            >
              <FlipVertical className="h-4 w-4 mr-2" />
              Flip V
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload("png")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-center items-center min-h-[400px]">
                {isProcessing && !isRealTimeAdjustment ? (
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Processing image...
                    </p>
                  </div>
                ) : (
                  <ImageCanvas
                    imageData={currentImage}
                    currentTool={currentTool}
                    onImageLoad={(w, h) => {
                      setImageDimensions({ width: w, height: h });
                      setResizeWidth(w.toString());
                      setResizeHeight(h.toString());
                    }}
                    onDrawingChange={setDrawingElements}
                    drawingElements={drawingElements}
                    drawingMode={drawingMode}
                    onDrawingComplete={() => {
                      // When drawing is completed, save to history with current image and drawing elements
                      if (currentImage) {
                        addToHistory(currentImage, drawingElements);
                      }
                    }}
                    className="max-w-full"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="adjustments" className="text-xs">
                Adjust
              </TabsTrigger>
              <TabsTrigger value="filters" className="text-xs">
                Filters
              </TabsTrigger>
              <TabsTrigger value="background" className="text-xs">
                BG
              </TabsTrigger>
              <TabsTrigger value="retouch" className="text-xs">
                Retouch
              </TabsTrigger>
              <TabsTrigger value="draw" className="text-xs">
                Draw
              </TabsTrigger>
              <TabsTrigger value="export" className="text-xs">
                Export
              </TabsTrigger>
            </TabsList>

            {/* Adjustments Tab */}
            <TabsContent value="adjustments" className="space-y-4">
              <AdjustmentsTab
                brightness={brightness}
                setBrightness={setBrightness}
                contrast={contrast}
                setContrast={setContrast}
                exposure={exposure}
                setExposure={setExposure}
                saturation={saturation}
                setSaturation={setSaturation}
                vibrance={vibrance}
                setVibrance={setVibrance}
                highlights={highlights}
                setHighlights={setHighlights}
                shadows={shadows}
                setShadows={setShadows}
                temperature={temperature}
                setTemperature={setTemperature}
                tint={tint}
                setTint={setTint}
                clarity={clarity}
                setClarity={setClarity}
                sharpness={sharpness}
                setSharpness={setSharpness}
              />
            </TabsContent>

            {/* Filters Tab */}
            <TabsContent value="filters" className="space-y-4">
              <FiltersTab
                filterIntensity={filterIntensity}
                setFilterIntensity={setFilterIntensity}
                onFilter={handleFilter}
                onAdvancedFilter={handleAdvancedFilter}
                isProcessing={isProcessing}
              />
            </TabsContent>

            {/* Background Tab */}
            <TabsContent value="background" className="space-y-4">
              <BackgroundTab
                backgroundBlurStrength={backgroundBlurStrength}
                setBackgroundBlurStrength={setBackgroundBlurStrength}
                onRemoveBackground={handleRemoveBackground}
                onBackgroundBlur={handleBackgroundBlur}
                isProcessing={isProcessing}
              />
            </TabsContent>

            {/* Retouch Tab */}
            <TabsContent value="retouch" className="space-y-4">
              <RetouchTab
                skinSmoothingStrength={skinSmoothingStrength}
                setSkinSmoothingStrength={setSkinSmoothingStrength}
                teethWhiteningStrength={teethWhiteningStrength}
                setTeethWhiteningStrength={setTeethWhiteningStrength}
                onSkinSmoothing={handleSkinSmoothing}
                onTeethWhitening={handleTeethWhitening}
                isProcessing={isProcessing}
              />
            </TabsContent>

            {/* Draw Tab */}
            <TabsContent value="draw" className="space-y-4">
              <DrawTab
                currentTool={currentTool}
                setCurrentTool={setCurrentTool}
              />
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-4">
              <ExportTab
                resizeWidth={resizeWidth}
                setResizeWidth={setResizeWidth}
                resizeHeight={resizeHeight}
                setResizeHeight={setResizeHeight}
                maintainAspect={maintainAspect}
                setMaintainAspect={setMaintainAspect}
                onResize={handleResize}
                onDownload={handleDownload}
                isProcessing={isProcessing}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
