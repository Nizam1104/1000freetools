"use client";

import { useEffect, useRef } from "react";

interface FaviconPreviewProps {
  text: string;
  backgroundColor: string;
  fontColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  shape: string;
  size: number;
  className?: string;
  isFontReady?: boolean;
  isFontLoading?: boolean;
}

export default function FaviconPreview({
  text,
  backgroundColor,
  fontColor,
  fontFamily,
  fontSize,
  fontWeight,
  shape,
  size,
  className = "",
  isFontReady = true,
  isFontLoading = false,
}: FaviconPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("ff c", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    // Only render when font is ready
    if (!isFontReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Function to render the favicon
    const renderFavicon = () => {
      // Set canvas size
      canvas.width = size;
      canvas.height = size;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw background shape
      ctx.fillStyle = backgroundColor;
      ctx.beginPath();

      switch (shape) {
        case "circle":
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case "rounded":
          const radius = size / 8;
          ctx.roundRect(0, 0, size, size, radius);
          ctx.fill();
          break;
        case "square":
        default:
          ctx.fillRect(0, 0, size, size);
          break;
      }

      // Draw text with improved centering
      ctx.fillStyle = fontColor;
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      // Simple visual centering adjustment for preview
      const x = size / 2;
      const y = size / 2 + fontSize * 0.3; // Adjust for text baseline
      ctx.fillText(text.slice(0, 3), x, y);
    };

    // Check if font is actually loaded in the browser
    const checkAndRender = async () => {
      try {
        // Try to check if the font is loaded using the Font Loading API
        if (document.fonts && document.fonts.check) {
          const fontSpec = `${fontWeight} ${fontSize}px ${fontFamily}`;
          const isFontLoaded = document.fonts.check(fontSpec);

          if (!isFontLoaded) {
            // Wait for the font to load
            await document.fonts.load(fontSpec);
          }
        }
      } catch (error) {
        console.warn("Font loading check failed:", error);
      } finally {
        // Render regardless of font check result
        renderFavicon();
      }
    };

    checkAndRender();
  }, [
    text,
    backgroundColor,
    fontColor,
    fontFamily,
    fontSize,
    fontWeight,
    shape,
    size,
    isFontReady,
  ]);

  // Show loading ring when font is loading
  if (isFontLoading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div
          className="animate-spin border-2 border-gray-300 border-t-blue-500 rounded-full"
          style={{
            width: Math.min(size * 0.6, 20),
            height: Math.min(size * 0.6, 20),
            borderWidth: Math.max(size * 0.1, 2),
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
