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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VideoFrameExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [frameNumber, setFrameNumber] = useState<number>(1);
  const [extractMode, setExtractMode] = useState<"single" | "range">("single");
  const [startFrame, setStartFrame] = useState<number>(1);
  const [endFrame, setEndFrame] = useState<number>(10);
  const [duration, setDuration] = useState<number | null>(null);
  const [frameRate, setFrameRate] = useState<number>(30);
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

      const videoTrack = await input.getPrimaryVideoTrack();
      if (videoTrack) {
        const estimatedFrames = Math.floor(fileDuration * 30);
        setFrameRate(30);
        setEndFrame(estimatedFrames);
      }

      await input.end();
    } catch (err) {
      setError("Failed to read video file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtract = async () => {
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

      const totalFrames = Math.floor(duration * frameRate);
      const framesToExtract = extractMode === "single" 
        ? [frameNumber] 
        : Array.from({ length: endFrame - startFrame + 1 }, (_, i) => startFrame + i);

      const urls: string[] = [];
      const decoder = await videoTrack.createDecoder();
      let frameCount = 0;

      for await (const sample of decoder) {
        if (framesToExtract.includes(frameCount + 1)) {
          const canvas = document.createElement("canvas");
          canvas.width = 640;
          canvas.height = 640 * (videoTrack.displayHeight / videoTrack.displayWidth);
          const ctx = canvas.getContext("2d");

          if (ctx) {
            const image = sample.toImage();
            if (image) {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              const url = canvas.toDataURL("image/jpeg", 0.9);
              urls.push(url);
            }
          }
        }
        frameCount++;
        setProgress(Math.round((frameCount / totalFrames) * 100));
      }

      setThumbnailUrls(urls);

      await input.end();
    } catch (err) {
      setError("Failed to extract frames");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    thumbnailUrls.forEach((url, i) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `frame-${extractMode === "single" ? frameNumber : startFrame + i}-${selectedFile?.name.split(".")[0] || "video"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFrameNumber(1);
    setStartFrame(1);
    setEndFrame(10);
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
              {duration && ` (~${Math.floor(duration * frameRate)} frames at ${frameRate}fps)`}
            </p>
          )}
        </div>

        {duration !== null && (
          <>
            <Select value={extractMode} onValueChange={(v) => setExtractMode(v as "single" | "range")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Frame</SelectItem>
                <SelectItem value="range">Frame Range</SelectItem>
              </SelectContent>
            </Select>

            {extractMode === "single" ? (
              <div>
                <Label htmlFor="frame-number">Frame Number</Label>
                <InputField
                  id="frame-number"
                  type="number"
                  min={1}
                  max={Math.floor(duration * frameRate)}
                  value={frameNumber}
                  onChange={(e) => setFrameNumber(parseInt(e.target.value) || 1)}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-frame">Start Frame</Label>
                  <InputField
                    id="start-frame"
                    type="number"
                    min={1}
                    max={Math.floor(duration * frameRate)}
                    value={startFrame}
                    onChange={(e) => setStartFrame(parseInt(e.target.value) || 1)}
                    disabled={isProcessing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="end-frame">End Frame</Label>
                  <InputField
                    id="end-frame"
                    type="number"
                    min={startFrame}
                    max={Math.floor(duration * frameRate)}
                    value={endFrame}
                    onChange={(e) => setEndFrame(parseInt(e.target.value) || startFrame)}
                    disabled={isProcessing}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {thumbnailUrls.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {thumbnailUrls.map((url, i) => (
                <Card key={i}>
                  <CardContent className="p-2">
                    <img src={url} alt={`Frame ${i + 1}`} className="w-full rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({thumbnailUrls.length} frames)
            </Button>
          </div>
        )}

        {!thumbnailUrls.length ? (
          <Button
            onClick={handleExtract}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Extracting... ${progress}%` : "Extract Frames"}
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="w-full">
            Extract Another
          </Button>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
