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
  VideoSample,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export default function VideoThumbnailGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [thumbnailSize, setThumbnailSize] = useState<number>(640);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setThumbnailUrl(null);
    setProgress(0);
    setIsProcessing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      setTimestamp(fileDuration * 0.1);

      input.dispose();
    } catch (err) {
      setError("Failed to read video file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile || duration === null) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setThumbnailUrl(null);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const videoTrack = await input.getPrimaryVideoTrack();
      if (!videoTrack) {
        throw new Error("No video track found");
      }

      const canvas = document.createElement("canvas");
      canvas.width = thumbnailSize;
      canvas.height = thumbnailSize * (videoTrack.displayHeight / videoTrack.displayWidth);
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas not supported");
      }

      const targetTimestamp = timestamp * 1000000; // Convert to microseconds
      let foundFrame = false;

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: (sample: VideoSample) => {
            if (!foundFrame && sample.timestamp >= targetTimestamp) {
              const image = sample.toCanvasImageSource();
              if (image) {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                foundFrame = true;
              }
            }
            return null;
          },
        },
      });

      await conversion.execute();

      const url = canvas.toDataURL("image/jpeg", 0.9);
      setThumbnailUrl(url);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError("Failed to generate thumbnail");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (thumbnailUrl) {
      const link = document.createElement("a");
      link.href = thumbnailUrl;
      link.download = `thumbnail-${selectedFile?.name.split(".")[0] || "video"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setTimestamp(0);
    setDuration(null);
    setThumbnailUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="video-file">Video File</Label>
          <InputField
            ref={fileInputRef}
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            disabled={isProcessing}
            className="mt-2"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name}
              {duration && ` (${formatTime(duration)})`}
            </p>
          )}
        </div>

        {duration !== null && (
          <>
            <div>
              <Label htmlFor="timestamp">Timestamp: {formatTime(timestamp)}</Label>
              <InputField
                id="timestamp"
                type="range"
                min={0}
                max={duration}
                step={1}
                value={timestamp}
                onChange={(e) => setTimestamp(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
            </div>

            <div>
              <Label htmlFor="thumbnail-size">Thumbnail Width: {thumbnailSize}px</Label>
              <InputField
                id="thumbnail-size"
                type="range"
                min={320}
                max={1920}
                step={160}
                value={thumbnailSize}
                onChange={(e) => setThumbnailSize(parseInt(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {thumbnailUrl && (
          <Card>
            <CardContent className="pt-6 flex justify-center">
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="rounded-lg border max-w-full"
              />
            </CardContent>
          </Card>
        )}

        {!thumbnailUrl ? (
          <Button
            onClick={handleGenerate}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Generating... ${progress}%` : "Generate Thumbnail"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download Thumbnail
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Generate Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
