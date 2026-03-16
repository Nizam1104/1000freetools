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

export default function VideoResolutionAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resolutionData, setResolutionData] = useState<{
    width: number;
    height: number;
    aspectRatio: string;
    displayWidth: number;
    displayHeight: number;
    rotation: number;
    codec: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setResolutionData(null);
    setIsAnalyzing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const videoTrack = await input.getPrimaryVideoTrack();
      if (!videoTrack) {
        throw new Error("No video track found");
      }

      const rotation = videoTrack.rotation || 0;
      const isRotated = rotation === 90 || rotation === 270;
      
      const width = isRotated ? videoTrack.codedHeight : videoTrack.codedWidth;
      const height = isRotated ? videoTrack.codedWidth : videoTrack.codedHeight;
      
      const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
      };
      const divisor = gcd(width, height);
      const aspectRatio = `${width / divisor}:${height / divisor}`;

      setResolutionData({
        width,
        height,
        aspectRatio,
        displayWidth: videoTrack.displayWidth,
        displayHeight: videoTrack.displayHeight,
        rotation,
        codec: videoTrack.codec || "Unknown",
      });

      await input.end();
    } catch (err) {
      setError("Failed to analyze resolution");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResolutionData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getResolutionName = (width: number, height: number) => {
    if (height <= 480) return "SD (480p)";
    if (height <= 720) return "HD (720p)";
    if (height <= 1080) return "Full HD (1080p)";
    if (height <= 1440) return "2K (1440p)";
    if (height <= 2160) return "4K (2160p)";
    return "8K+";
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
            disabled={isAnalyzing}
            className="mt-2"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {isAnalyzing && (
          <p className="text-sm text-muted-foreground text-center">Analyzing resolution...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {resolutionData && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolution</p>
                    <p className="text-2xl font-bold">{resolutionData.width} x {resolutionData.height}</p>
                    <p className="text-xs text-muted-foreground">
                      {getResolutionName(resolutionData.width, resolutionData.height)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aspect Ratio</p>
                    <p className="text-2xl font-bold">{resolutionData.aspectRatio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rotation</p>
                    <p className="text-2xl font-bold">{resolutionData.rotation}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Codec</p>
                    <p className="text-lg font-bold">{resolutionData.codec}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const canvas = document.createElement("canvas");
                  canvas.width = resolutionData.width;
                  canvas.height = resolutionData.height;
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#fff";
                    ctx.font = "24px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(
                      `${resolutionData.width} x ${resolutionData.height}`,
                      canvas.width / 2,
                      canvas.height / 2
                    );
                    const link = document.createElement("a");
                    link.download = `resolution-${resolutionData.width}x${resolutionData.height}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                  }
                }}
                className="flex-1"
              >
                Save Resolution Info
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Analyze Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
