"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Download,
  Square,
  PenTool,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Undo,
  Redo,
} from "lucide-react";
import { toast } from "sonner";

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

interface SelectionArea {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "rectangle" | "freehand";
  points?: Point[];
}

type ResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "move";

export function BlurImage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // History management for undo/redo
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Helper functions for undo/redo
  const addToHistory = useCallback(
    (imageData: string) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(imageData);
        // Limit history to 50 items to prevent memory issues
        if (newHistory.length > 50) {
          newHistory.shift();
        }
        return newHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    },
    [historyIndex],
  );

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setCurrentImage(history[newIndex]);
    toast.success("Undo successful");
  }, [canUndo, history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setCurrentImage(history[newIndex]);
    toast.success("Redo successful");
  }, [canRedo, history, historyIndex]);

  // Blur settings
  const [blurType, setBlurType] = useState<"smooth" | "pixelate">("smooth");
  const [blurStrength, setBlurStrength] = useState(10);

  // Selection settings
  const [selectionMode, setSelectionMode] = useState<
    "rectangle" | "freehand" | "none"
  >("none");
  const [selectionArea, setSelectionArea] = useState<SelectionArea | null>(
    null,
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [tempPoints, setTempPoints] = useState<Point[]>([]);
  const [isResizing, setIsResizing] = useState<ResizeHandle | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [initialRect, setInitialRect] = useState<Rectangle | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Drawing states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const currentMousePosRef = useRef<{ x: number; y: number } | null>(null);

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
        // Initialize history with the original image
        setHistory([imageData]);
        setHistoryIndex(0);
        setSelectionArea(null);
        setTempPoints([]);
        toast.success("Image loaded successfully");
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const getMousePos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [],
  );

  const getResizeHandle = (
    point: Point,
    rect: SelectionArea | null,
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!selectionMode || selectionMode === "none" || !originalImage) return;

      const pos = getMousePos(e);
      const handle = getResizeHandle(pos, selectionArea);

      if (selectionMode === "rectangle" && selectionArea && handle) {
        // Start resizing or dragging existing rectangle
        if (handle === "move") {
          setIsDragging(true);
          setDragStart(pos);
          setInitialRect({ ...selectionArea });
        } else {
          setIsResizing(handle);
          setDragStart(pos);
          setInitialRect({ ...selectionArea });
        }
      } else {
        // Start new selection
        setIsSelecting(true);
        startRef.current = pos;
        currentMousePosRef.current = pos;
        setSelectionArea(null);

        if (selectionMode === "freehand") {
          setTempPoints([pos]);
        } else if (selectionMode === "rectangle") {
          setSelectionArea({
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            type: "rectangle",
          });
        }
      }
    },
    [selectionMode, originalImage, getMousePos, selectionArea],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = getMousePos(e);

      // Update cursor
      if (canvasRef.current && !isResizing && !isDragging && !isSelecting) {
        const handle = getResizeHandle(pos, selectionArea);
        canvasRef.current.style.cursor = getCursorForHandle(handle);
      }

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
          setSelectionArea({ ...newRect, type: "rectangle" });
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
          setSelectionArea({ ...newRect, type: "rectangle" });
        }
      } else if (isSelecting && startRef.current) {
        // Handle new selection
        currentMousePosRef.current = pos;

        if (selectionMode === "freehand") {
          setTempPoints((prev) => [...prev, pos]);
        } else if (selectionMode === "rectangle") {
          const width = pos.x - startRef.current.x;
          const height = pos.y - startRef.current.y;

          setSelectionArea({
            x: Math.min(startRef.current.x, pos.x),
            y: Math.min(startRef.current.y, pos.y),
            width: Math.abs(width),
            height: Math.abs(height),
            type: "rectangle",
          });
        }
      }
    },
    [
      isResizing,
      isDragging,
      isSelecting,
      initialRect,
      dragStart,
      selectionMode,
      imageSize,
      getMousePos,
      selectionArea,
    ],
  );

  const handleMouseUp = useCallback(() => {
    if (isResizing || isDragging) {
      setIsResizing(null);
      setIsDragging(false);
      setDragStart(null);
      setInitialRect(null);
      return;
    }

    if (!isSelecting || !startRef.current) return;

    setIsSelecting(false);

    // If it's a freehand selection, complete it
    if (selectionMode === "freehand" && tempPoints.length > 0) {
      const completedArea: SelectionArea = {
        x: Math.min(...tempPoints.map((p) => p.x)),
        y: Math.min(...tempPoints.map((p) => p.y)),
        width:
          Math.max(...tempPoints.map((p) => p.x)) -
          Math.min(...tempPoints.map((p) => p.x)),
        height:
          Math.max(...tempPoints.map((p) => p.y)) -
          Math.min(...tempPoints.map((p) => p.y)),
        type: "freehand",
        points: [...tempPoints],
      };
      setSelectionArea(completedArea);
    } else if (selectionMode === "rectangle" && currentMousePosRef.current) {
      const x = Math.min(startRef.current.x, currentMousePosRef.current.x);
      const y = Math.min(startRef.current.y, currentMousePosRef.current.y);
      const width = Math.abs(currentMousePosRef.current.x - startRef.current.x);
      const height = Math.abs(
        currentMousePosRef.current.y - startRef.current.y,
      );

      if (width > 10 && height > 10) {
        setSelectionArea({ x, y, width, height, type: "rectangle" });
      }
    }

    startRef.current = null;
    currentMousePosRef.current = null;
  }, [isResizing, isDragging, isSelecting, selectionMode, tempPoints]);

  const applyBlurToArea = (
    ctx: CanvasRenderingContext2D,
    area: SelectionArea,
    blurType: "smooth" | "pixelate",
    blurStrength: number,
  ) => {
    // Get the area to blur
    const imageData = ctx.getImageData(area.x, area.y, area.width, area.height);
    const { data } = imageData;
    const width = imageData.width;
    const height = imageData.height;

    if (blurType === "smooth") {
      // Apply a simple box blur algorithm
      const radius = Math.max(1, Math.floor(blurStrength / 5));
      const newImageData = new ImageData(
        new Uint8ClampedArray(data),
        width,
        height,
      );
      const newData = newImageData.data;

      // Create a temporary array to store the original data
      const tempData = new Uint8ClampedArray(data);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;

          // Check if the pixel should be blurred based on the selection type
          if (shouldBlurPixel(x, y, area)) {
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            let count = 0;

            // Calculate the average color values for the blur area
            for (let ky = -radius; ky <= radius; ky++) {
              for (let kx = -radius; kx <= radius; kx++) {
                const nx = x + kx;
                const ny = y + ky;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const nindex = (ny * width + nx) * 4;
                  r += tempData[nindex];
                  g += tempData[nindex + 1];
                  b += tempData[nindex + 2];
                  a += tempData[nindex + 3];
                  count++;
                }
              }
            }

            // Set the blurred pixel values
            newData[index] = r / count;
            newData[index + 1] = g / count;
            newData[index + 2] = b / count;
            newData[index + 3] = a / count;
          } else {
            // Keep the original pixel value
            newData[index] = data[index];
            newData[index + 1] = data[index + 1];
            newData[index + 2] = data[index + 2];
            newData[index + 3] = data[index + 3];
          }
        }
      }

      ctx.putImageData(newImageData, area.x, area.y);
    } else if (blurType === "pixelate") {
      // Pixelate effect
      const pixelSize = Math.max(2, Math.floor(blurStrength / 3));

      // First, copy the original data to a temporary array
      const tempData = new Uint8ClampedArray(data);

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          // Check if this block should be pixelated based on the selection type
          const blockShouldBePixelated =
            shouldBlurPixel(x, y, area) ||
            shouldBlurPixel(x + pixelSize - 1, y, area) ||
            shouldBlurPixel(x, y + pixelSize - 1, area) ||
            shouldBlurPixel(x + pixelSize - 1, y + pixelSize - 1, area);

          if (blockShouldBePixelated) {
            // Get the average color for the pixel block
            let r = 0,
              g = 0,
              b = 0,
              a = 0,
              count = 0;

            const blockHeight = Math.min(pixelSize, height - y);
            const blockWidth = Math.min(pixelSize, width - x);

            for (let ky = 0; ky < blockHeight; ky++) {
              for (let kx = 0; kx < blockWidth; kx++) {
                if (shouldBlurPixel(x + kx, y + ky, area)) {
                  const index = ((y + ky) * width + (x + kx)) * 4;
                  r += tempData[index];
                  g += tempData[index + 1];
                  b += tempData[index + 2];
                  a += tempData[index + 3];
                  count++;
                }
              }
            }

            if (count > 0) {
              r = Math.floor(r / count);
              g = Math.floor(g / count);
              b = Math.floor(b / count);
              a = Math.floor(a / count);

              // Fill the block with the average color
              for (let ky = 0; ky < blockHeight; ky++) {
                for (let kx = 0; kx < blockWidth; kx++) {
                  if (shouldBlurPixel(x + kx, y + ky, area)) {
                    const index = ((y + ky) * width + (x + kx)) * 4;
                    data[index] = r;
                    data[index + 1] = g;
                    data[index + 2] = b;
                    data[index + 3] = a;
                  }
                }
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, area.x, area.y);
    }
  };

  // Helper function to determine if a pixel should be blurred based on the selection type
  const shouldBlurPixel = (
    x: number,
    y: number,
    area: SelectionArea,
  ): boolean => {
    // Adjust coordinates to be relative to the area
    const relX = x;
    const relY = y;

    switch (area.type) {
      case "rectangle":
        return true; // Always blur within the rectangle

      case "freehand":
        if (!area.points) return false;

        // Convert absolute points to relative points within the area
        const relPoints = area.points.map((p) => ({
          x: p.x - area.x,
          y: p.y - area.y,
        }));

        // Use ray casting algorithm to determine if point is inside polygon
        let inside = false;
        for (
          let i = 0, j = relPoints.length - 1;
          i < relPoints.length;
          j = i++
        ) {
          if (
            relPoints[i].y > relY !== relPoints[j].y > relY &&
            relX <
              ((relPoints[j].x - relPoints[i].x) * (relY - relPoints[i].y)) /
                (relPoints[j].y - relPoints[i].y) +
                relPoints[i].x
          ) {
            inside = !inside;
          }
        }
        return inside;

      default:
        return true;
    }
  };

  const handleApplyBlur = useCallback(async () => {
    if (!originalImage || !currentImage) return;

    setIsProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to create canvas context");
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (selectionArea) {
          // Apply blur to the selected area only
          applyBlurToArea(ctx, selectionArea, blurType, blurStrength);
        } else {
          // Apply blur to the entire image
          applyBlurToArea(
            ctx,
            {
              x: 0,
              y: 0,
              width: img.width,
              height: img.height,
              type: "rectangle",
            },
            blurType,
            blurStrength,
          );
        }

        const newImageData = canvas.toDataURL("image/png");
        setCurrentImage(newImageData);
        // Add to history for undo/redo functionality
        addToHistory(newImageData);
        // Clear the selection after blur is applied to remove the selection drawing
        setSelectionArea(null);
        setTempPoints([]);
        toast.success("Blur applied successfully");
      };
      img.src = currentImage;
    } catch (error) {
      toast.error("Failed to apply blur");
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, currentImage, selectionArea, blurType, blurStrength]);

  const handleRotate = useCallback(
    async (angle: number) => {
      if (!currentImage) return;

      // For rotate, we'll implement it in the main thread for now
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to create canvas context");
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Calculate new canvas dimensions based on rotation
        if (angle === 90 || angle === -90 || angle === 270 || angle === -270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Apply rotation transformation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();

        const newImageData = canvas.toDataURL("image/png");
        setCurrentImage(newImageData);
        setOriginalImage(newImageData); // Update original for consistent rotations
        addToHistory(newImageData);
        toast.success(`Image rotated ${angle} degrees`);
      };
      img.src = currentImage;
    },
    [currentImage],
  );

  const handleFlip = useCallback(
    async (direction: "horizontal" | "vertical") => {
      if (!currentImage) return;

      // For flip, we'll implement it in the main thread for now
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to create canvas context");
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply flip transformation
        ctx.save();
        if (direction === "horizontal") {
          ctx.translate(img.width, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(0, img.height);
          ctx.scale(1, -1);
        }
        ctx.drawImage(img, 0, 0);
        ctx.restore();

        const newImageData = canvas.toDataURL("image/png");
        setCurrentImage(newImageData);
        setOriginalImage(newImageData); // Update original for consistent flips
        addToHistory(newImageData);
        toast.success(`Image flipped ${direction}ly`);
      };
      img.src = currentImage;
    },
    [currentImage],
  );

  const handleDownload = useCallback(() => {
    if (!currentImage) return;

    const link = document.createElement("a");
    link.href = currentImage;
    link.download = `blurred-image.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully");
  }, [currentImage]);

  const clearSelection = useCallback(() => {
    setSelectionArea(null);
    setTempPoints([]);
  }, []);

  // Draw the image and selection area to canvas
  useEffect(() => {
    if (!canvasRef.current || !currentImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      setImageSize({ width: img.width, height: img.height });

      // Draw selection area with outline only
      if (selectionArea || (isSelecting && startRef.current)) {
        ctx.save();

        // Draw completed selection with outline only (no overlay)
        if (selectionArea && selectionArea.type === "rectangle") {
          const { x, y, width, height } = selectionArea;

          // Draw selection border
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          // Draw resize handles
          ctx.fillStyle = "#3b82f6";
          const handleSize = 8;

          // Corner handles
          ctx.fillRect(
            x - handleSize / 2,
            y - handleSize / 2,
            handleSize,
            handleSize,
          ); // nw
          ctx.fillRect(
            x + width - handleSize / 2,
            y - handleSize / 2,
            handleSize,
            handleSize,
          ); // ne
          ctx.fillRect(
            x + width - handleSize / 2,
            y + height - handleSize / 2,
            handleSize,
            handleSize,
          ); // se
          ctx.fillRect(
            x - handleSize / 2,
            y + height - handleSize / 2,
            handleSize,
            handleSize,
          ); // sw

          // Edge handles
          ctx.fillRect(
            x + width / 2 - handleSize / 2,
            y - handleSize / 2,
            handleSize,
            handleSize,
          ); // n
          ctx.fillRect(
            x + width - handleSize / 2,
            y + height / 2 - handleSize / 2,
            handleSize,
            handleSize,
          ); // e
          ctx.fillRect(
            x + width / 2 - handleSize / 2,
            y + height - handleSize / 2,
            handleSize,
            handleSize,
          ); // s
          ctx.fillRect(
            x - handleSize / 2,
            y + height / 2 - handleSize / 2,
            handleSize,
            handleSize,
          ); // w
        }

        // Draw completed freehand selection
        if (
          selectionArea &&
          selectionArea.type === "freehand" &&
          selectionArea.points
        ) {
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(selectionArea.points[0].x, selectionArea.points[0].y);
          for (let i = 1; i < selectionArea.points.length; i++) {
            ctx.lineTo(selectionArea.points[i].x, selectionArea.points[i].y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Draw temporary selection while dragging
        if (isSelecting && startRef.current && selectionMode === "rectangle") {
          if (currentMousePosRef.current) {
            const x = Math.min(
              startRef.current.x,
              currentMousePosRef.current.x,
            );
            const y = Math.min(
              startRef.current.y,
              currentMousePosRef.current.y,
            );
            const w = Math.abs(
              currentMousePosRef.current.x - startRef.current.x,
            );
            const h = Math.abs(
              currentMousePosRef.current.y - startRef.current.y,
            );

            // Draw selection border
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, h);
          }
        }

        // Draw temporary freehand path
        if (
          isSelecting &&
          selectionMode === "freehand" &&
          tempPoints.length > 0
        ) {
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(tempPoints[0].x, tempPoints[0].y);
          for (let i = 1; i < tempPoints.length; i++) {
            ctx.lineTo(tempPoints[i].x, tempPoints[i].y);
          }
          ctx.stroke();
        }

        ctx.restore();
      }
    };
    img.src = currentImage;
  }, [currentImage, selectionArea, tempPoints, isSelecting, selectionMode]);

  if (!currentImage) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Image Blur Tool
          </CardTitle>
          <CardDescription>
            Upload an image to blur it using smooth or pixelate effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Upload an image to start
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
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle>Blur Image Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4 mr-2" />
              Redo
            </Button>
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
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
            <Button size="sm" onClick={handleDownload}>
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
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center min-h-[300px]">
                {isProcessing ? (
                  <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Processing image...
                    </p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="border border-border max-w-full h-auto cursor-crosshair max-h-[400px]"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* Blur Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blur Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Blur Type</Label>
                <Select
                  value={blurType}
                  onValueChange={(value: "smooth" | "pixelate") =>
                    setBlurType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smooth">Smooth Blur</SelectItem>
                    <SelectItem value="pixelate">Pixelate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Blur Strength: {blurStrength}</Label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={blurStrength}
                  onChange={(e) => setBlurStrength(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleApplyBlur}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Applying Blur...
                  </>
                ) : (
                  "Apply Blur"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Selection Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selection Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Select how to blur your image:
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectionMode === "none" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectionMode("none")}
                  className="justify-start"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Blur Entire Image
                </Button>
                <Button
                  variant={
                    selectionMode === "rectangle" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectionMode("rectangle")}
                  className="justify-start"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Rectangle Selection
                </Button>
                <Button
                  variant={selectionMode === "freehand" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectionMode("freehand")}
                  className="justify-start"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Freehand Selection
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Click and drag on the image to create your selection
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {selectionArea ? (
                  <p>Selection: {selectionArea.type}</p>
                ) : (
                  <p>No selection active</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
