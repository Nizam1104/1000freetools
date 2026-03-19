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

export default function VideoKeyframeExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [keyframeUrls, setKeyframeUrls] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setKeyframeUrls([]);
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

  const handleExtract = async () => {
    if (!selectedFile || duration === null) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setKeyframeUrls([]);
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
      let keyframeCount = 0;
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
            // Extract frames at regular intervals (keyframe detection not available in VideoSample)
            // Using timestamp-based extraction instead
            const shouldExtract = frameCount === 0 || Math.floor(sample.timestamp * 30) % 30 === 0;

            if (shouldExtract) {
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
                  keyframeCount++;
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

      setKeyframeUrls(urls);

      input.dispose();
    } catch (err) {
      setError("Failed to extract keyframes");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    keyframeUrls.forEach((url, i) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `keyframe-${i + 1}-${selectedFile?.name.split(".")[0] || "video"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setKeyframeUrls([]);
    setDuration(null);
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
              {duration && ` (${Math.floor(duration)}s)`}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {keyframeUrls.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {keyframeUrls.length} keyframes
            </p>
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {keyframeUrls.map((url, i) => (
                <Card key={i}>
                  <CardContent className="p-1">
                    <img src={url} alt={`Keyframe ${i + 1}`} className="w-full rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({keyframeUrls.length} keyframes)
            </Button>
          </div>
        )}

        {!keyframeUrls.length ? (
          <Button
            onClick={handleExtract}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Extracting... ${progress}%` : "Extract Keyframes"}
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
