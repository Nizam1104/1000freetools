// components/QoiViewer.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { decode } from "@jsquash/qoi";

interface QoiViewerProps {
  qoiData: Uint8Array | ArrayBuffer;
}

const QoiViewer: React.FC<QoiViewerProps> = ({ qoiData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const decodeQoi = async () => {
    let buffer: ArrayBuffer;

    if (qoiData instanceof Uint8Array) {
      // Create a new ArrayBuffer from the Uint8Array to ensure it's not a SharedArrayBuffer
      buffer = qoiData.slice().buffer;
    } else {
      buffer = qoiData;
    }

    const decodedImage = await decode(buffer);

    // Draw the decoded image to the canvas
    const canvas = canvasRef.current;
    if (canvas && decodedImage) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions to match the decoded image
        canvas.width = decodedImage.width;
        canvas.height = decodedImage.height;

        // Create ImageData from the decoded pixel data
        const imageData = new ImageData(
          new Uint8ClampedArray(decodedImage.data),
          decodedImage.width,
          decodedImage.height
        );

        // Draw the image data to the canvas
        ctx.putImageData(imageData, 0, 0);
      }
    }
  };

  useEffect(() => {
    decodeQoi();
  }, [qoiData]); // Re-run effect if qoiData changes

  // Render just the canvas element, with no additional styling or elements.
  return <canvas ref={canvasRef} />;
};

export default QoiViewer;
