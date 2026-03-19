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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VideoCompressorSimple() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<string>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressionLevels = [
    { value: "low", label: "Low Compression (Higher quality, larger file)", bitrate: 4000000 },
    { value: "medium", label: "Medium Compression (Balanced)", bitrate: 2000000 },
    { value: "high", label: "High Compression (Smaller file, lower quality)", bitrate: 1000000 },
    { value: "extreme", label: "Extreme Compression (Smallest file)", bitrate: 500000 },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      const selectedLevel = compressionLevels.find(l => l.value === compressionLevel);

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          bitrate: selectedLevel?.bitrate || 2000000,
        },
      });

      await conversion.execute();

      const buffer = output.target.buffer;
      if (!buffer) throw new Error("No buffer");
      const blob = new Blob([buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError("Failed to compress video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `compressed-${selectedFile?.name || "video.mp4"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCompressionLevel("medium");
    setResultUrl(null);
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
              Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024 / 1024)} MB)
            </p>
          )}
        </div>

        {selectedFile && (
          <div>
            <Label htmlFor="compression">Compression Level</Label>
            <Select
              value={compressionLevel}
              onValueChange={setCompressionLevel}
            >
              <SelectTrigger id="compression" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {compressionLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleCompress}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Compressing... ${progress}%` : "Compress Video"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Compress Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
