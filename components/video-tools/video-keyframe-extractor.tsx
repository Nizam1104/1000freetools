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
      const decoder = await videoTrack.createDecoder();
      let frameCount = 0;
      let keyframeCount = 0;

      for await (const sample of decoder) {
        const isKeyframe = sample.isKeyFrame;
        
        if (isKeyframe) {
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
              keyframeCount++;
            }
          }
        }
        frameCount++;
        setProgress(Math.round((frameCount / (duration * 30)) * 100));
      }

      setKeyframeUrls(urls);

      await input.end();
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
