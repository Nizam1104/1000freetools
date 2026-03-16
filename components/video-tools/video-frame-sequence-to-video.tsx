"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  Output,
  Mp4OutputFormat,
  BufferTarget,
  BlobSource,
  Conversion,
  ALL_FORMATS,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function VideoFrameSequenceToVideo() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [frameRate, setFrameRate] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      setSelectedFiles(sortedFiles);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const handleCreateVideo = async () => {
    if (selectedFiles.length < 2) {
      setError("Please select at least 2 images");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      const firstImage = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(selectedFiles[0]);
      });

      canvas.width = firstImage.width;
      canvas.height = firstImage.height;

      const mediaRecorder = new MediaRecorder(
        (canvas as HTMLCanvasElement).captureStream(frameRate),
        { mimeType: "video/webm;codecs=vp9" }
      );

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      const promise = new Promise<Blob>((resolve) => {
        mediaRecorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
      });

      mediaRecorder.start();

      for (let i = 0; i < selectedFiles.length; i++) {
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = URL.createObjectURL(selectedFiles[i]);
        });

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000 / frameRate));
        setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }

      mediaRecorder.stop();
      const blob = await promise;
      const url = URL.createObjectURL(blob);

      setResultUrl(url);

      selectedFiles.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    } catch (err) {
      setError("Failed to create video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `sequence-video.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setFrameRate(30);
    setResultUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="image-files">Image Files</Label>
          <InputField
            ref={fileInputRef}
            id="image-files"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={isProcessing}
            className="mt-2"
          />
          {selectedFiles.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFiles.length} images
            </p>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div>
            <Label htmlFor="frame-rate">Frame Rate: {frameRate} fps</Label>
            <InputField
              id="frame-rate"
              type="range"
              min={1}
              max={60}
              step={1}
              value={frameRate}
              onChange={(e) => setFrameRate(parseInt(e.target.value))}
              disabled={isProcessing}
              className="mt-2 w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Video duration: {(selectedFiles.length / frameRate).toFixed(1)}s
            </p>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleCreateVideo}
            disabled={selectedFiles.length < 2 || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Creating... ${progress}%` : "Create Video"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download Video
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Create Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
