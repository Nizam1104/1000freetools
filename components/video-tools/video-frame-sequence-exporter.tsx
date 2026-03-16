"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  BlobSource,
  ALL_FORMATS,
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

      await input.end();
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
      const decoder = await videoTrack.createDecoder();
      let frameCount = 0;

      for await (const sample of decoder) {
        if (frameCount % frameInterval === 0) {
          const canvas = document.createElement("canvas");
          canvas.width = 320;
          canvas.height = 320 * (videoTrack.displayHeight / videoTrack.displayWidth);
          const ctx = canvas.getContext("2d");

          if (ctx) {
            const image = sample.toImage();
            if (image) {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              const url = canvas.toDataURL("image/jpeg", 0.8);
              urls.push(url);
            }
          }
        }
        frameCount++;
        setProgress(Math.round((frameCount / (duration * 30)) * 100));
      }

      setThumbnailUrls(urls);

      await input.end();
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
