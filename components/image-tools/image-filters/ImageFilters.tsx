'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { toast } from 'sonner';
import ImageElement from 'next/image';

// Define filter types
type FilterType =
  | 'original'
  | 'grayscale'
  | 'sepia'
  | 'invert'
  | 'brightness'
  | 'contrast'
  | 'saturate'
  | 'hue-rotate'
  | 'blur'
  | 'matrix' // "The Matrix" style green filter
  | 'mexico' // Mexico flag pattern overlay
  | 'vintage'
  | 'warm'
  | 'cool'
  | 'dreamy'
  | 'neon'
  | 'pastel'
  | 'cinematic';

import { clamp, applyMatrixEffect, applyMexicoEffect } from './utils/filterUtils';

export function ImageFilters() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('original');
  const [isProcessing, setIsProcessing] = useState(false);
  const [multipleFilterMode, setMultipleFilterMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  // For some filters that require additional parameters
  const [filterIntensity, setFilterIntensity] = useState(100);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      setCurrentImage(imageData);
      setSelectedFilter('original');
      setFilterIntensity(100);
      toast.success('Image loaded successfully');
    };
    reader.readAsDataURL(file);
  }, []);

  const applyFilter = useCallback((filterToApply: FilterType) => {
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
        ctx.drawImage(img, 0, 0);

        // Get image data to manipulate pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply selected filter
        switch (filterToApply) {
          case 'grayscale':
            applyGrayscaleFilter(data);
            break;
          case 'sepia':
            applySepiaFilter(data);
            break;
          case 'invert':
            applyInvertFilter(data);
            break;
          case 'brightness':
            applyBrightnessFilter(data, filterIntensity / 100);
            break;
          case 'contrast':
            applyContrastFilter(data, filterIntensity / 100);
            break;
          case 'saturate':
            applySaturateFilter(data, filterIntensity / 100);
            break;
          case 'hue-rotate':
            applyHueRotateFilter(data, filterIntensity);
            break;
          case 'blur':
            applyBlurFilter(canvas, ctx, filterIntensity);
            break;
          case 'matrix':
            applyMatrixFilter(data);
            break;
          case 'mexico':
            applyMexicoFilter(data);
            break;
          case 'vintage':
            applyVintageFilter(data);
            break;
          case 'warm':
            applyWarmFilter(data);
            break;
          case 'cool':
            applyCoolFilter(data);
            break;
          case 'dreamy':
            applyDreamyFilter(data);
            break;
          case 'neon':
            applyNeonFilter(data);
            break;
          case 'pastel':
            applyPastelFilter(data);
            break;
          case 'cinematic':
            applyCinematicFilter(data);
            break;
          default:
            // Original filter - no changes
            break;
        }

        // Put the modified image data back to canvas (except for blur which is handled directly)
        if (filterToApply !== 'blur') {
          ctx.putImageData(imageData, 0, 0);
        }

        const newImageData = canvas.toDataURL('image/png');
        setCurrentImage(newImageData);
        toast.success(`${filterToApply.charAt(0).toUpperCase() + filterToApply.slice(1)} filter applied successfully`);
      };
      img.src = originalImage;
    } catch (error) {
      toast.error('Failed to apply filter');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, filterIntensity]);

  const applyMultipleFilters = useCallback(() => {
    if (!originalImage || activeFilters.length === 0) return;

    setIsProcessing(true);
    try {
      // Start with the original image
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

        // Draw original image to canvas
        ctx.drawImage(img, 0, 0);

        // Apply each filter in sequence
        activeFilters.forEach(filter => {
          // Get image data to manipulate pixels
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          switch (filter) {
            case 'grayscale':
              applyGrayscaleFilter(data);
              break;
            case 'sepia':
              applySepiaFilter(data);
              break;
            case 'invert':
              applyInvertFilter(data);
              break;
            case 'brightness':
              applyBrightnessFilter(data, filterIntensity / 100);
              break;
            case 'contrast':
              applyContrastFilter(data, filterIntensity / 100);
              break;
            case 'saturate':
              applySaturateFilter(data, filterIntensity / 100);
              break;
            case 'hue-rotate':
              applyHueRotateFilter(data, filterIntensity);
              break;
            case 'blur':
              // For blur we need to apply it directly to canvas context
              const radius = Math.max(1, Math.floor(filterIntensity / 10));
              ctx.filter = `blur(${radius}px)`;
              ctx.drawImage(canvas, 0, 0); // Re-draw the image with blur effect
              ctx.filter = 'none';
              break;
            case 'matrix':
              applyMatrixFilter(data);
              break;
            case 'mexico':
              applyMexicoFilter(data);
              break;
            case 'vintage':
              applyVintageFilter(data);
              break;
            case 'warm':
              applyWarmFilter(data);
              break;
            case 'cool':
              applyCoolFilter(data);
              break;
            case 'dreamy':
              applyDreamyFilter(data);
              break;
            case 'neon':
              applyNeonFilter(data);
              break;
            case 'pastel':
              applyPastelFilter(data);
              break;
            case 'cinematic':
              applyCinematicFilter(data);
              break;
            default:
              // Original filter - no changes
              break;
          }

          // Put the modified image data back to canvas (except for blur which is handled directly)
          if (filter !== 'blur') {
            ctx.putImageData(imageData, 0, 0);
          }
        });

        const newImageData = canvas.toDataURL('image/png');
        setCurrentImage(newImageData);
        toast.success('Multiple filters applied successfully');
      };
      img.src = originalImage;
    } catch (error) {
      toast.error('Failed to apply filters');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, activeFilters, filterIntensity]);

  const toggleFilter = useCallback((filter: FilterType) => {
    if (multipleFilterMode) {
      // In multiple filter mode, toggle the filter in the activeFilters array
      if (filter === 'original') {
        // If original is selected in multiple mode, clear all active filters
        setActiveFilters([]);
      } else {
        setActiveFilters(prev => {
          const newFilters = prev.includes(filter)
            ? prev.filter(f => f !== filter)
            : [...prev, filter];
          return newFilters;
        });
      }
    } else {
      // In single filter mode, just set the selected filter
      setSelectedFilter(filter);
      if (filter === 'original') {
        setCurrentImage(originalImage);
      } else {
        applyFilter(filter);
      }
    }
  }, [multipleFilterMode, originalImage, applyFilter]);

  // Filter functions
  const applyGrayscaleFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;     // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }
  };

  const applySepiaFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)); // Red
      data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // Green
      data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // Blue
    }
  };

  const applyInvertFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];     // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
    }
  };

  const applyBrightnessFilter = (data: Uint8ClampedArray, intensity: number) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * intensity);     // Red
      data[i + 1] = Math.min(255, data[i + 1] * intensity); // Green
      data[i + 2] = Math.min(255, data[i + 2] * intensity); // Blue
    }
  };

  const applyContrastFilter = (data: Uint8ClampedArray, intensity: number) => {
    const factor = (259 * (intensity + 255)) / (255 * (259 - intensity));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, factor * (data[i] - 128) + 128);     // Red
      data[i + 1] = Math.min(255, factor * (data[i + 1] - 128) + 128); // Green
      data[i + 2] = Math.min(255, factor * (data[i + 2] - 128) + 128); // Blue
    }
  };

  const applySaturateFilter = (data: Uint8ClampedArray, intensity: number) => {
    for (let i = 0; i < data.length; i += 4) {
      // Convert to grayscale
      const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2];
      
      // Apply saturation
      data[i] = gray + intensity * (data[i] - gray);       // Red
      data[i + 1] = gray + intensity * (data[i + 1] - gray); // Green
      data[i + 2] = gray + intensity * (data[i + 2] - gray); // Blue
      
      // Clamp values
      data[i] = Math.max(0, Math.min(255, data[i]));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
    }
  };

  const applyHueRotateFilter = (data: Uint8ClampedArray, angle: number) => {
    // Convert angle to radians
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Precomputed rotation matrix for hue
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Apply hue rotation
      const newR = Math.round(
        (0.213 + 0.787 * cos - 0.213 * sin) * r +
        (0.715 - 0.715 * cos - 0.715 * sin) * g +
        (0.072 - 0.072 * cos + 0.928 * sin) * b
      );
      
      const newG = Math.round(
        (0.213 - 0.213 * cos + 0.143 * sin) * r +
        (0.715 + 0.285 * cos + 0.140 * sin) * g +
        (0.072 - 0.072 * cos - 0.283 * sin) * b
      );
      
      const newB = Math.round(
        (0.213 - 0.213 * cos - 0.787 * sin) * r +
        (0.715 - 0.715 * cos + 0.715 * sin) * g +
        (0.072 + 0.928 * cos + 0.072 * sin) * b
      );

      data[i] = Math.max(0, Math.min(255, newR));     // Red
      data[i + 1] = Math.max(0, Math.min(255, newG)); // Green
      data[i + 2] = Math.max(0, Math.min(255, newB)); // Blue
    }
  };

  const applyBlurFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, intensity: number) => {
    // This is handled directly in the canvas context
    const radius = Math.max(1, Math.floor(intensity / 10));
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  };

  const applyMatrixFilter = (data: Uint8ClampedArray) => {
    applyMatrixEffect(data);
  };

  const applyMexicoFilter = (data: Uint8ClampedArray) => {
    applyMexicoEffect(data);
  };

  const applyVintageFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Slightly decrease saturation and add warm tones
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Reduce blues and add warmth
      data[i] = Math.min(255, r * 1.1);           // Red slightly warmer
      data[i + 1] = Math.min(255, g * 0.9);       // Green slightly cooler
      data[i + 2] = Math.min(255, b * 0.7);       // Blue much cooler
    }
  };

  const applyWarmFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Increase reds and yellows
      data[i] = Math.min(255, data[i] * 1.15);     // Red
      data[i + 1] = Math.min(255, data[i + 1] * 1.05); // Green
      data[i + 2] = Math.min(255, data[i + 2] * 0.9);  // Blue
    }
  };

  const applyCoolFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Increase blues and decrease reds
      data[i] = Math.min(255, data[i] * 0.85);     // Red
      data[i + 1] = Math.min(255, data[i + 1] * 0.9);  // Green
      data[i + 2] = Math.min(255, data[i + 2] * 1.15); // Blue
    }
  };

  const applyDreamyFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Soft pastel effect with increased brightness and reduced contrast
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Increase brightness slightly and reduce contrast
      data[i] = Math.min(255, 150 + (r - 128) * 0.6);     // Red
      data[i + 1] = Math.min(255, 150 + (g - 128) * 0.6); // Green
      data[i + 2] = Math.min(255, 150 + (b - 128) * 0.6); // Blue
    }
  };

  const applyNeonFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // High contrast with saturated colors
      data[i] = Math.min(255, data[i] * 1.5);     // Red
      data[i + 1] = Math.min(255, data[i + 1] * 1.3); // Green
      data[i + 2] = Math.min(255, data[i + 2] * 1.7); // Blue
    }
  };

  const applyPastelFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Reduce saturation and increase brightness for pastel effect
      const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2];
      data[i] = Math.min(255, gray * 0.6 + data[i] * 0.4);      // Red
      data[i + 1] = Math.min(255, gray * 0.6 + data[i + 1] * 0.4); // Green
      data[i + 2] = Math.min(255, gray * 0.6 + data[i + 2] * 0.4); // Blue
    }
  };

  const applyCinematicFilter = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      // Apply cinematic color grading - darker shadows and highlights
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      
      // Apply contrast curve similar to cinematic grading
      data[i] = Math.min(255, 255 * ((r - 0.5) * 1.2 + 0.5));      // Red
      data[i + 1] = Math.min(255, 255 * ((g - 0.5) * 1.1 + 0.5));  // Green
      data[i + 2] = Math.min(255, 255 * ((b - 0.5) * 1.0 + 0.5));  // Blue
    }
  };

  const handleRotate = useCallback(async (angle: number) => {
    if (!currentImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast.error('Failed to create canvas context');
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

      const newImageData = canvas.toDataURL('image/png');
      setCurrentImage(newImageData);
      setOriginalImage(newImageData); // Update original for consistent rotations
      toast.success(`Image rotated ${angle} degrees`);
    };
    img.src = currentImage;
  }, [currentImage]);

  const handleFlip = useCallback(async (direction: 'horizontal' | 'vertical') => {
    if (!currentImage) return;

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

      // Apply flip transformation
      ctx.save();
      if (direction === 'horizontal') {
        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, img.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      const newImageData = canvas.toDataURL('image/png');
      setCurrentImage(newImageData);
      setOriginalImage(newImageData); // Update original for consistent flips
      toast.success(`Image flipped ${direction}ly`);
    };
    img.src = currentImage;
  }, [currentImage]);

  const handleDownload = useCallback(() => {
    if (!currentImage) return;

    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `filtered-image.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully');
  }, [currentImage]);

  const resetFilters = useCallback(() => {
    if (originalImage) {
      setCurrentImage(originalImage);
      setSelectedFilter('original');
      setActiveFilters([]);
      setFilterIntensity(100);
      toast.success('Filters reset');
    }
  }, [originalImage]);

  // Handle original image display when not in multiple filter mode and original is selected
  useEffect(() => {
    if (!multipleFilterMode && selectedFilter === 'original' && originalImage) {
      setCurrentImage(originalImage);
    }
  }, [selectedFilter, originalImage, multipleFilterMode]);

  // Apply multiple filters when activeFilters change and multipleFilterMode is enabled
  useEffect(() => {
    if (multipleFilterMode && activeFilters.length > 0) {
      applyMultipleFilters();
    } else if (multipleFilterMode && activeFilters.length === 0 && originalImage) {
      // If no active filters in multiple mode, show original
      setCurrentImage(originalImage);
    }
  }, [activeFilters, multipleFilterMode, applyMultipleFilters, originalImage]);

  // Re-apply the selected filter when filter intensity changes in single filter mode
  useEffect(() => {
    if (!multipleFilterMode &&
        originalImage &&
        selectedFilter !== 'original' &&
        (selectedFilter === 'brightness' ||
         selectedFilter === 'contrast' ||
         selectedFilter === 'saturate' ||
         selectedFilter === 'hue-rotate' ||
         selectedFilter === 'blur')) {
      applyFilter(selectedFilter);
    }
  }, [filterIntensity, selectedFilter, multipleFilterMode, originalImage, applyFilter]);

  if (!currentImage) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Image Filters Tool
          </CardTitle>
          <CardDescription>
            Upload an image to apply various filters including fun filters like Matrix and Mexico
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
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Image Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => handleRotate(-90)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Rotate Left
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleRotate(90)}>
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate Right
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFlip('horizontal')}>
              <FlipHorizontal className="h-4 w-4 mr-2" />
              Flip H
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFlip('vertical')}>
              <FlipVertical className="h-4 w-4 mr-2" />
              Flip V
            </Button>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
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
                    <p className="text-sm text-muted-foreground">Applying filter...</p>
                  </div>
                ) : (
                  <ImageElement
                    src={currentImage}
                    alt="Filtered preview"
                    className="border border-border max-w-full h-auto max-h-[400px]"
                    width={0}
                    height={0}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="multipleFilterMode"
                  checked={multipleFilterMode}
                  onChange={(e) => setMultipleFilterMode(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="multipleFilterMode">Multiple Filter Mode</Label>
              </div>

              {/* Intensity slider for filters that support it */}
              {(selectedFilter !== 'original' &&
                (selectedFilter === 'brightness' ||
                selectedFilter === 'contrast' ||
                selectedFilter === 'saturate' ||
                selectedFilter === 'hue-rotate' ||
                selectedFilter === 'blur') ||
                (multipleFilterMode &&
                  activeFilters.some(filter =>
                    filter === 'brightness' ||
                    filter === 'contrast' ||
                    filter === 'saturate' ||
                    filter === 'hue-rotate' ||
                    filter === 'blur'
                  ))) && (
                <div className="space-y-2">
                  <Label>
                    {(selectedFilter === 'hue-rotate' || activeFilters.includes('hue-rotate'))
                      ? `Hue Rotate: ${filterIntensity}°`
                      : `${(selectedFilter !== 'original' ? selectedFilter : activeFilters[0]).charAt(0).toUpperCase() + (selectedFilter !== 'original' ? selectedFilter.slice(1) : activeFilters[0].slice(1))}: ${filterIntensity}%`}
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max={selectedFilter === 'hue-rotate' || activeFilters.includes('hue-rotate') ? "360" : "200"}
                    value={filterIntensity}
                    onChange={(e) => setFilterIntensity(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Filter Toggle Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {/* Basic Filters */}
                <Button
                  variant={selectedFilter === 'original' && !multipleFilterMode ? "default" : activeFilters.includes('original') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('original')}
                  disabled={isProcessing}
                >
                  Original
                </Button>
                <Button
                  variant={selectedFilter === 'grayscale' && !multipleFilterMode ? "default" : activeFilters.includes('grayscale') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('grayscale')}
                  disabled={isProcessing}
                >
                  Grayscale
                </Button>
                <Button
                  variant={selectedFilter === 'sepia' && !multipleFilterMode ? "default" : activeFilters.includes('sepia') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('sepia')}
                  disabled={isProcessing}
                >
                  Sepia
                </Button>
                <Button
                  variant={selectedFilter === 'invert' && !multipleFilterMode ? "default" : activeFilters.includes('invert') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('invert')}
                  disabled={isProcessing}
                >
                  Invert
                </Button>
                <Button
                  variant={selectedFilter === 'brightness' && !multipleFilterMode ? "default" : activeFilters.includes('brightness') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('brightness')}
                  disabled={isProcessing}
                >
                  Brightness
                </Button>
                <Button
                  variant={selectedFilter === 'contrast' && !multipleFilterMode ? "default" : activeFilters.includes('contrast') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('contrast')}
                  disabled={isProcessing}
                >
                  Contrast
                </Button>
                <Button
                  variant={selectedFilter === 'saturate' && !multipleFilterMode ? "default" : activeFilters.includes('saturate') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('saturate')}
                  disabled={isProcessing}
                >
                  Saturate
                </Button>
                <Button
                  variant={selectedFilter === 'hue-rotate' && !multipleFilterMode ? "default" : activeFilters.includes('hue-rotate') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('hue-rotate')}
                  disabled={isProcessing}
                >
                  Hue Rotate
                </Button>
                <Button
                  variant={selectedFilter === 'blur' && !multipleFilterMode ? "default" : activeFilters.includes('blur') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('blur')}
                  disabled={isProcessing}
                >
                  Blur
                </Button>

                {/* Vintage & Mood Filters */}
                <Button
                  variant={selectedFilter === 'vintage' && !multipleFilterMode ? "default" : activeFilters.includes('vintage') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('vintage')}
                  disabled={isProcessing}
                >
                  Vintage
                </Button>
                <Button
                  variant={selectedFilter === 'warm' && !multipleFilterMode ? "default" : activeFilters.includes('warm') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('warm')}
                  disabled={isProcessing}
                >
                  Warm
                </Button>
                <Button
                  variant={selectedFilter === 'cool' && !multipleFilterMode ? "default" : activeFilters.includes('cool') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('cool')}
                  disabled={isProcessing}
                >
                  Cool
                </Button>
                <Button
                  variant={selectedFilter === 'dreamy' && !multipleFilterMode ? "default" : activeFilters.includes('dreamy') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('dreamy')}
                  disabled={isProcessing}
                >
                  Dreamy
                </Button>
                <Button
                  variant={selectedFilter === 'cinematic' && !multipleFilterMode ? "default" : activeFilters.includes('cinematic') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('cinematic')}
                  disabled={isProcessing}
                >
                  Cinematic
                </Button>

                {/* Fun Filters */}
                <Button
                  variant={selectedFilter === 'matrix' && !multipleFilterMode ? "default" : activeFilters.includes('matrix') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('matrix')}
                  disabled={isProcessing}
                >
                  Matrix
                </Button>
                <Button
                  variant={selectedFilter === 'mexico' && !multipleFilterMode ? "default" : activeFilters.includes('mexico') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('mexico')}
                  disabled={isProcessing}
                >
                  Mexico
                </Button>
                <Button
                  variant={selectedFilter === 'neon' && !multipleFilterMode ? "default" : activeFilters.includes('neon') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('neon')}
                  disabled={isProcessing}
                >
                  Neon
                </Button>
                <Button
                  variant={selectedFilter === 'pastel' && !multipleFilterMode ? "default" : activeFilters.includes('pastel') && multipleFilterMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('pastel')}
                  disabled={isProcessing}
                >
                  Pastel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filter Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                {multipleFilterMode ? (
                  <>
                    <p><strong>Active Filters:</strong> {activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}</p>
                    <p className="text-muted-foreground text-xs">
                      Multiple filter mode is active. Filters are applied in sequence.
                    </p>
                  </>
                ) : (
                  <>
                    <p><strong>Selected:</strong> {selectedFilter}</p>
                    <p className="text-muted-foreground text-xs">
                      {selectedFilter === 'matrix' && 'The Matrix - Green code effect'}
                      {selectedFilter === 'mexico' && 'Mexico - Mexican flag stripe overlay'}
                      {selectedFilter === 'vintage' && 'Vintage - Old photo look'}
                      {selectedFilter === 'cinematic' && 'Cinematic - Movie-like color grading'}
                      {selectedFilter === 'dreamy' && 'Dreamy - Soft pastel look'}
                      {selectedFilter === 'neon' && 'Neon - High contrast & vibrant'}
                      {selectedFilter === 'pastel' && 'Pastel - Muted, soft colors'}
                      {!['matrix', 'mexico', 'vintage', 'cinematic', 'dreamy', 'neon', 'pastel'].includes(selectedFilter) && 'Select a filter from the toggle buttons'}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}