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
import { Card, CardContent } from "@/components/ui/card";

export default function VideoFrameRateAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [frameRateData, setFrameRateData] = useState<{
    averageFps: number;
    minFps: number;
    maxFps: number;
    totalFrames: number;
    duration: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setFrameRateData(null);
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

      const duration = await input.computeDuration();
      
      const frameTimes: number[] = [];
      let lastTimestamp = -1;

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: (sample: VideoSample) => {
            const timestamp = sample.timestamp;
            if (lastTimestamp >= 0) {
              const delta = (timestamp - lastTimestamp) / 1000000;
              if (delta > 0) {
                frameTimes.push(1 / delta);
              }
            }
            lastTimestamp = timestamp;
            return null;
          },
        },
      });

      await conversion.execute();

      const averageFps = frameTimes.length > 0
        ? frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
        : 0;
      const minFps = frameTimes.length > 0 ? Math.min(...frameTimes) : 0;
      const maxFps = frameTimes.length > 0 ? Math.max(...frameTimes) : 0;

      setFrameRateData({
        averageFps,
        minFps,
        maxFps,
        totalFrames: frameTimes.length + 1,
        duration,
      });

      input.dispose();
    } catch (err) {
      setError("Failed to analyze frame rate");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFrameRateData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFrameRateStatus = (fps: number) => {
    if (fps >= 55) return { status: "Excellent (60fps)", color: "text-green-600" };
    if (fps >= 25) return { status: "Good (30fps)", color: "text-blue-600" };
    if (fps >= 20) return { status: "Acceptable (24fps)", color: "text-yellow-600" };
    return { status: "Low", color: "text-red-600" };
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
          <p className="text-sm text-muted-foreground text-center">Analyzing frame rate...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {frameRateData && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average FPS</p>
                    <p className="text-2xl font-bold">{frameRateData.averageFps.toFixed(1)}</p>
                    <p className={`text-xs ${getFrameRateStatus(frameRateData.averageFps).color}`}>
                      {getFrameRateStatus(frameRateData.averageFps).status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Frames</p>
                    <p className="text-2xl font-bold">{frameRateData.totalFrames.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min FPS</p>
                    <p className="text-2xl font-bold">{frameRateData.minFps.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max FPS</p>
                    <p className="text-2xl font-bold">{frameRateData.maxFps.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>0 fps</span>
                <span>24 fps</span>
                <span>30 fps</span>
                <span>60 fps</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, (frameRateData.averageFps / 60) * 100)}%` }}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              Analyze Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
