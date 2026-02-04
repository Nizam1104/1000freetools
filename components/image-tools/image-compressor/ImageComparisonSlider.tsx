'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import NextImage from 'next/image';

interface ImageComparisonSliderProps {
  originalImage: string;
  compressedImage: string;
  originalSize?: number | null;
  compressedSize?: number | null;
  outputFormat?: string | null;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ originalImage, compressedImage, originalSize, compressedSize, outputFormat }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Restore text selection after drag
    document.body.style.userSelect = '';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border shadow-sm"
      style={{ paddingBottom: '75%' }} // 4:3 aspect ratio
      onDragStart={(e) => isDragging && e.preventDefault()}
    >
      <div className="absolute inset-0">
        {/* Original Image (Left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <NextImage
            src={originalImage}
            alt="Original"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Compressed Image (Right side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <NextImage
            src={compressedImage}
            alt="Compressed"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 shadow-lg cursor-ew-resize z-10 border-l-2 border-primary"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-lg border-2 border-primary bg-background flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 rounded text-xs font-semibold md:text-sm backdrop-blur-sm border">
          {/* <span>Original: {(originalSize || 0 / 1024 / 1024).toFixed(2)} KB</span>
           */}
           <span> Original: {((originalSize || 0)/1024).toFixed(2)} KB</span>
        </div>
        
        <div className="absolute top-2 right-2 px-2 py-1 bg-background/90 rounded text-xs font-semibold md:text-sm backdrop-blur-sm border">
        <span> Compressed: {((originalSize || 0)/1024).toFixed(2)} KB</span>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;