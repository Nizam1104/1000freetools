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
import { Card, CardContent } from "@/components/ui/card";

export default function AudioThumbnailGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailSize, setThumbnailSize] = useState<number>(300);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setThumbnailUrl(null);
    setIsGenerating(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const audioTrack = await input.getPrimaryAudioTrack();
      if (!audioTrack) {
        throw new Error("No audio track found");
      }

      const canvas = document.createElement("canvas");
      canvas.width = thumbnailSize;
      canvas.height = thumbnailSize;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Canvas not supported");
      }

      const gradient = ctx.createLinearGradient(0, 0, thumbnailSize, thumbnailSize);
      gradient.addColorStop(0, "hsl(var(--primary))");
      gradient.addColorStop(1, "hsl(var(--accent))");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, thumbnailSize, thumbnailSize);

      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("AUDIO", thumbnailSize / 2, thumbnailSize / 2 - 15);
      
      ctx.font = "14px sans-serif";
      const fileName = file.name.length > 20 ? file.name.substring(0, 18) + "..." : file.name;
      ctx.fillText(fileName, thumbnailSize / 2, thumbnailSize / 2 + 15);

      const duration = await input.computeDuration();
      ctx.font = "12px sans-serif";
      const mins = Math.floor(duration / 60);
      const secs = Math.floor(duration % 60);
      ctx.fillText(`${mins}:${secs.toString().padStart(2, "0")}`, thumbnailSize / 2, thumbnailSize - 20);

      const url = canvas.toDataURL("image/png");
      setThumbnailUrl(url);

      await input.end();
    } catch (err) {
      setError("Failed to generate thumbnail");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (thumbnailUrl) {
      const link = document.createElement("a");
      link.download = `thumbnail-${selectedFile?.name || "audio"}.png`;
      link.href = thumbnailUrl;
      link.click();
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setThumbnailUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="audio-file">Audio File</Label>
          <InputField
            ref={fileInputRef}
            id="audio-file"
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            disabled={isGenerating}
            className="mt-2"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {selectedFile && (
          <div>
            <Label htmlFor="thumbnail-size">Thumbnail Size: {thumbnailSize}px</Label>
            <InputField
              id="thumbnail-size"
              type="range"
              min={100}
              max={600}
              step={50}
              value={thumbnailSize}
              onChange={(e) => setThumbnailSize(parseInt(e.target.value))}
              disabled={isGenerating}
              className="mt-2 w-full"
            />
          </div>
        )}

        {isGenerating && (
          <p className="text-sm text-muted-foreground text-center">Generating thumbnail...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {thumbnailUrl && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 flex justify-center">
                <img
                  src={thumbnailUrl}
                  alt="Audio thumbnail"
                  className="rounded-lg border"
                  style={{ width: thumbnailSize, height: thumbnailSize }}
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1">
                Download Thumbnail
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Generate Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
