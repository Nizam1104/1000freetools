"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ImageElement from "next/image";

interface Point {
  x: number;
  y: number;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

type SelectionType = "rectangle" | "freehand";
type ResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "move";

export default function CropImage() {
  const [image, setImage] = useState<string | null>(null);
  const [selectionType, setSelectionType] =
    useState<SelectionType>("rectangle");
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
  const [selection, setSelection] = useState<Point[]>([]);
  const [cropRectangle, setCropRectangle] = useState<Rectangle | null>(null);
  const [isResizing, setIsResizing] = useState<ResizeHandle | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [initialRect, setInitialRect] = useState<Rectangle | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        setCroppedImage(null);
        setSelection([]);
        setStartPoint(null);
        setCurrentPoint(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  }, []);

  const getMousePosition = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ): Point => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Get scaled coordinates, then divide by scale to get original image coordinates
    const scaledX = (event.clientX - rect.left) * scaleX;
    const scaledY = (event.clientY - rect.top) * scaleY;
    const displayScale = 2; // Match the scale used in canvas rendering

    return {
      x: scaledX / displayScale,
      y: scaledY / displayScale,
    };
  };

  const getResizeHandle = (
    point: Point,
    rect: Rectangle | null,
  ): ResizeHandle | null => {
    if (!rect) return null;

    const handleSize = 8;
    const { x, y, width, height } = rect;

    // Corner handles
    if (
      Math.abs(point.x - x) < handleSize &&
      Math.abs(point.y - y) < handleSize
    )
      return "nw";
    if (
      Math.abs(point.x - (x + width)) < handleSize &&
      Math.abs(point.y - y) < handleSize
    )
      return "ne";
    if (
      Math.abs(point.x - (x + width)) < handleSize &&
      Math.abs(point.y - (y + height)) < handleSize
    )
      return "se";
    if (
      Math.abs(point.x - x) < handleSize &&
      Math.abs(point.y - (y + height)) < handleSize
    )
      return "sw";

    // Edge handles
    if (
      Math.abs(point.x - x) < handleSize &&
      point.y >= y &&
      point.y <= y + height
    )
      return "w";
    if (
      Math.abs(point.x - (x + width)) < handleSize &&
      point.y >= y &&
      point.y <= y + height
    )
      return "e";
    if (
      Math.abs(point.y - y) < handleSize &&
      point.x >= x &&
      point.x <= x + width
    )
      return "n";
    if (
      Math.abs(point.y - (y + height)) < handleSize &&
      point.x >= x &&
      point.x <= x + width
    )
      return "s";

    // Inside rectangle for moving
    if (
      point.x >= x &&
      point.x <= x + width &&
      point.y >= y &&
      point.y <= y + height
    )
      return "move";

    return null;
  };

  const getCursorForHandle = (handle: ResizeHandle | null): string => {
    switch (handle) {
      case "nw":
      case "se":
        return "nwse-resize";
      case "ne":
      case "sw":
        return "nesw-resize";
      case "n":
      case "s":
        return "ns-resize";
      case "e":
      case "w":
        return "ew-resize";
      case "move":
        return "move";
      default:
        return "crosshair";
    }
  };

  const startSelection = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;

    const pos = getMousePosition(event);
    const handle = getResizeHandle(pos, cropRectangle);

    if (selectionType === "rectangle" && cropRectangle && handle) {
      // Start resizing or dragging existing rectangle
      if (handle === "move") {
        setIsDragging(true);
        setDragStart(pos);
        setInitialRect({ ...cropRectangle });
      } else {
        setIsResizing(handle);
        setDragStart(pos);
        setInitialRect({ ...cropRectangle });
      }
    } else {
      // Start new selection
      setIsSelecting(true);
      setStartPoint(pos);
      setCurrentPoint(pos);
      setCropRectangle(null);

      if (selectionType === "freehand") {
        setSelection([pos]);
      }
    }
  };

  const updateSelection = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePosition(event);

    if (isResizing && initialRect && dragStart) {
      // Handle resizing
      const deltaX = pos.x - dragStart.x;
      const deltaY = pos.y - dragStart.y;

      const newRect = { ...initialRect };

      switch (isResizing) {
        case "nw":
          newRect.x += deltaX;
          newRect.y += deltaY;
          newRect.width -= deltaX;
          newRect.height -= deltaY;
          break;
        case "n":
          newRect.y += deltaY;
          newRect.height -= deltaY;
          break;
        case "ne":
          newRect.y += deltaY;
          newRect.width += deltaX;
          newRect.height -= deltaY;
          break;
        case "e":
          newRect.width += deltaX;
          break;
        case "se":
          newRect.width += deltaX;
          newRect.height += deltaY;
          break;
        case "s":
          newRect.height += deltaY;
          break;
        case "sw":
          newRect.x += deltaX;
          newRect.width -= deltaX;
          newRect.height += deltaY;
          break;
        case "w":
          newRect.x += deltaX;
          newRect.width -= deltaX;
          break;
      }

      // Ensure minimum size and bounds
      if (
        newRect.width > 10 &&
        newRect.height > 10 &&
        newRect.x >= 0 &&
        newRect.y >= 0 &&
        newRect.x + newRect.width <= imageSize.width &&
        newRect.y + newRect.height <= imageSize.height
      ) {
        setCropRectangle(newRect);
      }
    } else if (isDragging && initialRect && dragStart) {
      // Handle dragging
      const deltaX = pos.x - dragStart.x;
      const deltaY = pos.y - dragStart.y;

      const newRect = {
        x: initialRect.x + deltaX,
        y: initialRect.y + deltaY,
        width: initialRect.width,
        height: initialRect.height,
      };

      // Ensure bounds
      if (
        newRect.x >= 0 &&
        newRect.y >= 0 &&
        newRect.x + newRect.width <= imageSize.width &&
        newRect.y + newRect.height <= imageSize.height
      ) {
        setCropRectangle(newRect);
      }
    } else if (isSelecting && startPoint) {
      // Handle new selection
      setCurrentPoint(pos);

      if (selectionType === "freehand") {
        setSelection((prev) => [...prev, pos]);
      } else if (selectionType === "rectangle") {
        const x = Math.min(startPoint.x, pos.x);
        const y = Math.min(startPoint.y, pos.y);
        const width = Math.abs(pos.x - startPoint.x);
        const height = Math.abs(pos.y - startPoint.y);

        setCropRectangle({ x, y, width, height });
      }
    }
  };

  const endSelection = () => {
    if (isResizing || isDragging) {
      setIsResizing(null);
      setIsDragging(false);
      setDragStart(null);
      setInitialRect(null);
      return;
    }

    if (!isSelecting || !startPoint) return;

    setIsSelecting(false);

    if (selectionType === "rectangle" && currentPoint) {
      const x = Math.min(startPoint.x, currentPoint.x);
      const y = Math.min(startPoint.y, currentPoint.y);
      const width = Math.abs(currentPoint.x - startPoint.x);
      const height = Math.abs(currentPoint.y - startPoint.y);

      if (width > 10 && height > 10) {
        setCropRectangle({ x, y, width, height });

        const rectanglePoints: Point[] = [
          { x, y },
          { x: x + width, y },
          { x: x + width, y: y + height },
          { x, y: y + height },
          { x, y },
        ];
        setSelection(rectanglePoints);
      }
    }
  };

  const clearSelection = () => {
    setSelection([]);
    setCropRectangle(null);
    setStartPoint(null);
    setCurrentPoint(null);
    setCroppedImage(null);
    setIsResizing(null);
    setIsDragging(false);
    setDragStart(null);
    setInitialRect(null);
  };

  const hasSelection = () => {
    return (
      (selectionType === "rectangle" && cropRectangle) ||
      (selectionType === "freehand" && selection.length > 0)
    );
  };

  const cropImage = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    let minX: number, minY: number, width: number, height: number;

    if (selectionType === "rectangle" && cropRectangle) {
      minX = cropRectangle.x;
      minY = cropRectangle.y;
      width = cropRectangle.width;
      height = cropRectangle.height;
    } else if (selectionType === "freehand" && selection.length > 0) {
      // Find the bounding box of the freehand selection
      minX = Infinity;
      minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      selection.forEach((point) => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      });
      width = maxX - minX;
      height = maxY - minY;
    } else {
      toast.error("Please select an area to crop");
      return;
    }

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = width;
    cropCanvas.height = height;
    const cropCtx = cropCanvas.getContext("2d");

    if (!cropCtx) return;

    // Create a clipping path for freehand selection
    if (selectionType === "freehand") {
      cropCtx.beginPath();
      selection.forEach((point, index) => {
        const adjustedPoint = {
          x: point.x - minX,
          y: point.y - minY,
        };
        if (index === 0) {
          cropCtx.moveTo(adjustedPoint.x, adjustedPoint.y);
        } else {
          cropCtx.lineTo(adjustedPoint.x, adjustedPoint.y);
        }
      });
      cropCtx.closePath();
      cropCtx.clip();
    }

    // Load the original image and draw only the selected portion
    const img = new Image();
    img.onload = () => {
      // Draw the cropped portion of the original image
      cropCtx.drawImage(img, minX, minY, width, height, 0, 0, width, height);

      // Convert to blob and create URL
      cropCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCroppedImage(url);
          toast.success("Image cropped successfully!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!croppedImage) {
      toast.error("No cropped image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `cropped-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Draw the image on the main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set display scale to make image appear larger (2x size)
      const scale = 2;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw the image scaled up
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = image;
  }, [image]);

  // Update cursor based on mouse position
  const updateCursor = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePosition(event);
    const handle = getResizeHandle(pos, cropRectangle);

    if (overlayCanvasRef.current) {
      overlayCanvasRef.current.style.cursor = getCursorForHandle(handle);
    }
  };

  // Draw the selection on the overlay canvas
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const mainCanvas = canvasRef.current;
    if (!overlayCanvas || !mainCanvas || !image) return;

    const ctx = overlayCanvas.getContext("2d");
    if (!ctx) return;

    // Set display scale to match main canvas
    const scale = 2;
    overlayCanvas.width = mainCanvas.width;
    overlayCanvas.height = mainCanvas.height;

    // Clear the overlay canvas
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Draw crop rectangle
    if (cropRectangle) {
      const { x, y, width, height } = cropRectangle;

      // Scale coordinates for display
      const scaledX = x * scale;
      const scaledY = y * scale;
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      // Draw semi-transparent overlay outside the crop area
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      // Clear the crop area
      ctx.clearRect(scaledX, scaledY, scaledWidth, scaledHeight);

      // Draw selection border
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

      // Draw resize handles
      ctx.fillStyle = "#3b82f6";
      const handleSize = 8 * scale;

      // Corner handles
      ctx.fillRect(
        scaledX - handleSize / 2,
        scaledY - handleSize / 2,
        handleSize,
        handleSize,
      ); // nw
      ctx.fillRect(
        scaledX + scaledWidth - handleSize / 2,
        scaledY - handleSize / 2,
        handleSize,
        handleSize,
      ); // ne
      ctx.fillRect(
        scaledX + scaledWidth - handleSize / 2,
        scaledY + scaledHeight - handleSize / 2,
        handleSize,
        handleSize,
      ); // se
      ctx.fillRect(
        scaledX - handleSize / 2,
        scaledY + scaledHeight - handleSize / 2,
        handleSize,
        handleSize,
      ); // sw

      // Edge handles
      ctx.fillRect(
        scaledX + scaledWidth / 2 - handleSize / 2,
        scaledY - handleSize / 2,
        handleSize,
        handleSize,
      ); // n
      ctx.fillRect(
        scaledX + scaledWidth - handleSize / 2,
        scaledY + scaledHeight / 2 - handleSize / 2,
        handleSize,
        handleSize,
      ); // e
      ctx.fillRect(
        scaledX + scaledWidth / 2 - handleSize / 2,
        scaledY + scaledHeight - handleSize / 2,
        handleSize,
        handleSize,
      ); // s
      ctx.fillRect(
        scaledX - handleSize / 2,
        scaledY + scaledHeight / 2 - handleSize / 2,
        handleSize,
        handleSize,
      ); // w
    }

    // Draw freehand selection
    if (selectionType === "freehand" && selection.length > 0) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2 * scale;
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)";

      ctx.beginPath();
      selection.forEach((point, index) => {
        const scaledPoint = {
          x: point.x * scale,
          y: point.y * scale,
        };
        if (index === 0) {
          ctx.moveTo(scaledPoint.x, scaledPoint.y);
        } else {
          ctx.lineTo(scaledPoint.x, scaledPoint.y);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw current selection for rectangle when creating new selection
    if (
      selectionType === "rectangle" &&
      isSelecting &&
      startPoint &&
      currentPoint &&
      !cropRectangle
    ) {
      const x = Math.min(startPoint.x, currentPoint.x) * scale;
      const y = Math.min(startPoint.y, currentPoint.y) * scale;
      const width = Math.abs(currentPoint.x - startPoint.x) * scale;
      const height = Math.abs(currentPoint.y - startPoint.y) * scale;

      // Draw semi-transparent overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      // Clear the selection area
      ctx.clearRect(x, y, width, height);

      // Draw selection border
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(x, y, width, height);
    }
  }, [
    image,
    selection,
    selectionType,
    isSelecting,
    startPoint,
    currentPoint,
    cropRectangle,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-upload">
            Upload Image (JPG, PNG, WebP, GIF)
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <p className="text-sm text-muted-foreground">
            Supports all image formats including JPG, JPEG, PNG, WebP, GIF, BMP,
            and TIFF. Your images are processed locally for privacy.
          </p>
        </div>

        {image && (
          <>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Label>Selection Type:</Label>
                  <Tabs
                    value={selectionType}
                    onValueChange={(value) =>
                      setSelectionType(value as SelectionType)
                    }
                  >
                    <TabsList>
                      <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
                      <TabsTrigger value="freehand">Freehand</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex space-x-2">
                  {hasSelection() && (
                    <Button variant="outline" onClick={clearSelection}>
                      Clear Selection
                    </Button>
                  )}
                  <Button onClick={cropImage} disabled={!hasSelection()}>
                    Crop Image
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium">How to crop images:</p>
                {selectionType === "rectangle" ? (
                  <>
                    <p>• Click and drag to select a rectangular area</p>
                    <p>• Use corner and edge handles to resize the selection</p>
                    <p>• Drag inside the selection to move it</p>
                    <p>
                      • Perfect for precise crops and social media dimensions
                    </p>
                  </>
                ) : (
                  <>
                    <p>• Click and drag to draw a freehand selection</p>
                    <p>• Create custom shapes and irregular selections</p>
                    <p>• Ideal for creative cropping and removing objects</p>
                    <p>• Follow the natural flow of your image content</p>
                  </>
                )}
                <p className="pt-2 text-blue-600">
                  ✓ Free image cropping with no watermarks
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Original Image (Click and drag to select area)</Label>
                <div className="border rounded-lg overflow-hidden bg-muted/10 relative">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ display: "block" }}
                  />
                  <canvas
                    ref={overlayCanvasRef}
                    className="max-w-full h-auto absolute top-0 left-0"
                    style={{ display: "block" }}
                    onMouseDown={startSelection}
                    onMouseMove={(e) => {
                      updateSelection(e);
                      updateCursor(e);
                    }}
                    onMouseUp={endSelection}
                    onMouseLeave={endSelection}
                  />
                  <ImageElement
                    ref={imageRef as React.RefObject<HTMLImageElement>}
                    src={image}
                    alt="Original"
                    onLoad={handleImageLoad}
                    className="hidden"
                    width={0}
                    height={0}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Image size: {imageSize.width} � {imageSize.height}px
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cropped Result</Label>
                <div className="border rounded-lg overflow-hidden bg-muted/10 min-h-[200px] flex items-center justify-center">
                  {croppedImage ? (
                    <ImageElement
                      src={croppedImage}
                      alt="Cropped"
                      className="max-w-full h-auto"
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <div className="text-muted-foreground text-center p-8">
                      <p>Cropped image will appear here</p>
                      <p className="text-sm mt-2">
                        Select an area and click "Crop Image"
                      </p>
                    </div>
                  )}
                </div>
                {croppedImage && (
                  <Button onClick={downloadImage} className="w-full">
                    Download Cropped Image
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
