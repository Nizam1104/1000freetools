"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import ImageElement from "next/image";

export default function ChangeImageDimensions() {
  const [image, setImage] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [inputWidth, setInputWidth] = useState<string>("");
  const [inputHeight, setInputHeight] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        setResizedImage(null);

        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const ratio = width / height;

          setOriginalWidth(width);
          setOriginalHeight(height);
          setCurrentWidth(width);
          setCurrentHeight(height);
          setAspectRatio(ratio);
          setInputWidth(width.toString());
          setInputHeight(height.toString());
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const updateDimensionsFromSlider = useCallback(
    ([width]: number[]) => {
      setCurrentWidth(width);
      setInputWidth(width.toString());

      if (lockAspectRatio) {
        const newHeight = Math.round(width / aspectRatio);
        setCurrentHeight(newHeight);
        setInputHeight(newHeight.toString());
      }
    },
    [aspectRatio, lockAspectRatio],
  );

  const updateDimensionsFromSliderHeight = useCallback(
    ([height]: number[]) => {
      setCurrentHeight(height);
      setInputHeight(height.toString());

      if (lockAspectRatio) {
        const newWidth = Math.round(height * aspectRatio);
        setCurrentWidth(newWidth);
        setInputWidth(newWidth.toString());
      }
    },
    [aspectRatio, lockAspectRatio],
  );

  const handleWidthInputChange = (value: string) => {
    setInputWidth(value);
    const width = parseInt(value);

    if (!isNaN(width) && width > 0) {
      setCurrentWidth(width);
      if (lockAspectRatio) {
        const newHeight = Math.round(width / aspectRatio);
        setCurrentHeight(newHeight);
        setInputHeight(newHeight.toString());
      }
    }
  };

  const handleHeightInputChange = (value: string) => {
    setInputHeight(value);
    const height = parseInt(value);

    if (!isNaN(height) && height > 0) {
      setCurrentHeight(height);
      if (lockAspectRatio) {
        const newWidth = Math.round(height * aspectRatio);
        setCurrentWidth(newWidth);
        setInputWidth(newWidth.toString());
      }
    }
  };

  const resizeImage = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    const width = currentWidth;
    const height = currentHeight;

    if (width <= 0 || height <= 0) {
      toast.error("Please enter valid dimensions");
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Create a new canvas for the resized image
      const resizeCanvas = document.createElement("canvas");
      resizeCanvas.width = width;
      resizeCanvas.height = height;
      const resizeCtx = resizeCanvas.getContext("2d");

      if (!resizeCtx) return;

      // Draw the resized image
      resizeCtx.drawImage(img, 0, 0, width, height);

      // Convert to blob and create URL
      resizeCanvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResizedImage(url);
            toast.success("Image resized successfully!");
          }
        },
        "image/png",
        0.95,
      );
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!resizedImage) {
      toast.error("No resized image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-image-${currentWidth}x${currentHeight}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetToOriginal = () => {
    if (originalWidth && originalHeight) {
      setCurrentWidth(originalWidth);
      setCurrentHeight(originalHeight);
      setInputWidth(originalWidth.toString());
      setInputHeight(originalHeight.toString());
      setResizedImage(null);
    }
  };

  // Calculate slider max value (up to 200% of original)
  const sliderMax = Math.max(originalWidth * 2, originalHeight * 2);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2"></div>

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
            {/* Original dimensions info */}
            <div className=" bg-muted/30 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Original Size:</span>
                  <div className="text-lg">
                    {originalWidth} × {originalHeight}px
                  </div>
                </div>
                <div>
                  <span className="font-medium">Original Aspect Ratio:</span>
                  <div className="text-lg">{aspectRatio.toFixed(2)}:1</div>
                </div>
              </div>
            </div>

            <Separator />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Original Image</Label>
                <div className="border rounded-lg overflow-hidden bg-muted/10 p-4">
                  <ImageElement
                    src={image}
                    alt="Original"
                    width={originalWidth}
                    height={originalHeight}
                    className="max-w-full h-auto mx-auto"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    {originalWidth} × {originalHeight}px
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Resized Result</Label>
                <div className="border rounded-lg overflow-hidden bg-muted/10 p-4 min-h-[300px] flex items-center justify-center">
                  {resizedImage ? (
                    <div className="w-full">
                      <ImageElement
                        src={resizedImage}
                        alt="Resized"
                        width={currentWidth}
                        height={currentHeight}
                        className="max-w-full h-auto mx-auto"
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                      <div className="text-xs text-muted-foreground text-center mt-2">
                        {currentWidth} × {currentHeight}px
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-center p-8">
                      <p>Resized image will appear here</p>
                      <p className="text-sm mt-2">
                        Adjust dimensions and click "Resize Image"
                      </p>
                    </div>
                  )}
                </div>
                {resizedImage && (
                  <Button onClick={downloadImage} className="w-full">
                    Download Resized Image
                  </Button>
                )}
              </div>
            </div>
            <Separator />

            <div className="space-y-6">
              {/* Controls */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="lock-aspect"
                    checked={lockAspectRatio}
                    onChange={(e) => setLockAspectRatio(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="lock-aspect">Lock aspect ratio</Label>
                </div>

                {/* Width slider */}
                <div className="space-y-2">
                  <Label>Width: {currentWidth}px</Label>
                  <Slider
                    value={[currentWidth]}
                    onValueChange={updateDimensionsFromSlider}
                    max={sliderMax}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Height slider */}
                <div className="space-y-2">
                  <Label>Height: {currentHeight}px</Label>
                  <Slider
                    value={[currentHeight]}
                    onValueChange={updateDimensionsFromSliderHeight}
                    max={sliderMax}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* Manual input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width-input">Width (px)</Label>
                    <Input
                      id="width-input"
                      type="number"
                      value={inputWidth}
                      onChange={(e) => handleWidthInputChange(e.target.value)}
                      min="1"
                      placeholder="Enter width"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height-input">Height (px)</Label>
                    <Input
                      id="height-input"
                      type="number"
                      value={inputHeight}
                      onChange={(e) => handleHeightInputChange(e.target.value)}
                      min="1"
                      placeholder="Enter height"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={resizeImage} disabled={!image}>
                    Resize Image
                  </Button>
                  <Button variant="outline" onClick={resetToOriginal}>
                    Reset to Original
                  </Button>
                </div>
              </div>

              <Separator />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
