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

export default function VideoFrameSequenceExporter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [frameInterval, setFrameInterval] = useState<number>(1);
  const [duration, setDuration] = useState<number | null>(null);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setThumbnailUrls([]);
    setProgress(0);
    setIsProcessing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);

      input.dispose();
    } catch (err) {
      setError("Failed to read video file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    if (!selectedFile || duration === null) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setThumbnailUrls([]);
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

      const urls: string[] = [];
      let frameCount = 0;
      const videoWidth = videoTrack.displayWidth;
      const videoHeight = videoTrack.displayHeight;
      const totalFrames = Math.floor(duration * 30);

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: (sample: VideoSample) => {
            if (frameCount % frameInterval === 0) {
              const canvas = document.createElement("canvas");
              canvas.width = 320;
              canvas.height = 320 * (videoHeight / videoWidth);
              const ctx = canvas.getContext("2d");

              if (ctx) {
                const image = sample.toCanvasImageSource();
                if (image) {
                  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  const url = canvas.toDataURL("image/jpeg", 0.8);
                  urls.push(url);
                }
              }
            }
            frameCount++;
            setProgress(Math.round((frameCount / totalFrames) * 100));
            return null;
          },
        },
      });

      await conversion.execute();

      setThumbnailUrls(urls);

      input.dispose();
    } catch (err) {
      setError("Failed to export frames");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    thumbnailUrls.forEach((url, i) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `frame-${i * frameInterval}-${selectedFile?.name.split(".")[0] || "video"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFrameInterval(1);
    setDuration(null);
    setThumbnailUrls([]);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
              {duration && ` (~${Math.floor(duration * 30)} frames)`}
            </p>
          )}
        </div>

        {duration !== null && (
          <div>
            <Label htmlFor="frame-interval">Export Every Nth Frame: {frameInterval}</Label>
            <InputField
              id="frame-interval"
              type="range"
              min={1}
              max={30}
              step={1}
              value={frameInterval}
              onChange={(e) => setFrameInterval(parseInt(e.target.value))}
              disabled={isProcessing}
              className="mt-2 w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Will export ~{Math.floor((duration * 30) / frameInterval)} frames
            </p>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {thumbnailUrls.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Exported {thumbnailUrls.length} frames
              </p>
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {thumbnailUrls.map((url, i) => (
                  <img key={i} src={url} alt={`Frame ${i}`} className="w-full rounded border" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!thumbnailUrls.length ? (
          <Button
            onClick={handleExport}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Exporting... ${progress}%` : "Export Frames"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({thumbnailUrls.length} frames)
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Export Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
