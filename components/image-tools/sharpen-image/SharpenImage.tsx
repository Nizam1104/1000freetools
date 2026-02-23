'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react';
import ImageElement from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RotateCcw, Zap } from 'lucide-react';
import { toast } from 'sonner';

export function SharpenImage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [sharpenedImage, setSharpenedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sharpenIntensity, setSharpenIntensity] = useState([50]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setOriginalImage(imageData);
      setSharpenedImage(imageData);
      toast.success('Image loaded successfully');
    };
    reader.readAsDataURL(file);
  }, []);

  const applySharpen = useCallback(() => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Failed to create canvas context');
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        // Create a copy for the sharpened result
        const resultData = new Uint8ClampedArray(data);

        // Convert intensity from [0, 100] to [0, 5] for kernel calculation
        const intensity = sharpenIntensity[0] / 20;

        // Sharpen kernel (basic 3x3 convolution)
        // Higher intensity = more aggressive sharpening
        const kernel = [
          0, -intensity, 0,
          -intensity, 1 + 4 * intensity, -intensity,
          0, -intensity, 0
        ];

        // Apply convolution
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) { // RGB channels only
              let sum = 0;
              let kernelIndex = 0;

              // Apply 3x3 kernel
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const pixelIndex = ((y + ky) * width + (x + kx)) * 4 + c;
                  sum += data[pixelIndex] * kernel[kernelIndex++];
                }
              }

              // Clamp result to valid range
              const resultIndex = (y * width + x) * 4 + c;
              resultData[resultIndex] = Math.max(0, Math.min(255, sum));
            }
          }
        }

        // Put the sharpened image data back
        const resultImageData = new ImageData(resultData, width, height);
        ctx.putImageData(resultImageData, 0, 0);

        const sharpenedDataUrl = canvas.toDataURL('image/png');
        setSharpenedImage(sharpenedDataUrl);
        toast.success('Image sharpened successfully');
      };

      img.src = originalImage;
    } catch (error) {
      toast.error('Failed to sharpen image');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, sharpenIntensity]);

  const resetImage = useCallback(() => {
    if (originalImage) {
      setSharpenedImage(originalImage);
      setSharpenIntensity([50]);
      toast.success('Image reset to original');
    }
  }, [originalImage]);

  const handleDownload = useCallback(() => {
    if (!sharpenedImage) return;

    const link = document.createElement('a');
    link.href = sharpenedImage;
    link.download = `sharpened-image.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully');
  }, [sharpenedImage]);

  // Auto-apply sharpen when intensity changes
  useEffect(() => {
    if (originalImage) {
      applySharpen();
    }
  }, [sharpenIntensity]);

  if (!originalImage) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Sharpen Image Tool
          </CardTitle>
          <CardDescription>
            Upload an image and adjust the sharpen intensity to enhance details and edges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload an image to start</h3>
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
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Sharpen Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={resetImage}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sharpen-intensity">
              Sharpen Intensity: {sharpenIntensity[0]}%
            </Label>
            <Slider
              id="sharpen-intensity"
              min={0}
              max={100}
              step={1}
              value={sharpenIntensity}
              onValueChange={setSharpenIntensity}
              className="w-full"
              disabled={isProcessing}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtle</span>
              <span>Strong</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <Card>
          <CardHeader>
            <CardTitle>Original Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center min-h-[300px]">
              <ImageElement
                src={originalImage}
                alt="Original image"
                className="border border-border max-w-full h-auto max-h-[400px] rounded"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sharpened Image */}
        <Card>
          <CardHeader>
            <CardTitle>Sharpened Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center min-h-[300px]">
              {isProcessing ? (
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Sharpening image...</p>
                </div>
              ) : (
                <ImageElement
                  src={sharpenedImage || ''}
                  alt="Sharpened image"
                  className="border border-border max-w-full h-auto max-h-[400px] rounded"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>About Image Sharpening</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2 text-muted-foreground">
            <p>
              <strong>How it works:</strong> Image sharpening enhances edges and fine details by increasing contrast between adjacent pixels.
            </p>
            <p>
              <strong>Usage tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use lower intensity (10-30%) for subtle enhancement</li>
              <li>Use medium intensity (40-70%) for noticeable sharpening</li>
              <li>Use higher intensity (80-100%) for dramatic effect</li>
              <li>Be careful with high settings as they can create halos around edges</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}