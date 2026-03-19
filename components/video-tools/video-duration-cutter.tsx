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

export default function VideoDurationCutter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setIsProcessing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      setEndTime(fileDuration);

      input.dispose();
    } catch (err) {
      setError("Failed to read video file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCut = async () => {
    if (!selectedFile || startTime < 0 || !endTime || startTime >= endTime) {
      setError("Please select a valid time range");
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

      const conversion = await Conversion.init({
        input,
        output,
        trim: {
          start: startTime,
          end: endTime,
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
      setError("Failed to cut video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `cut-${selectedFile?.name || "video.mp4"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setStartTime(0);
    setEndTime(null);
    setDuration(null);
    setResultUrl(null);
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

        {selectedFile && duration && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time (seconds)</Label>
                <InputField
                  id="start-time"
                  type="number"
                  min={0}
                  max={endTime || duration}
                  step={0.1}
                  value={startTime}
                  onChange={(e) => setStartTime(parseFloat(e.target.value) || 0)}
                  disabled={isProcessing}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(startTime)}
                </p>
              </div>

              <div>
                <Label htmlFor="end-time">End Time (seconds)</Label>
                <InputField
                  id="end-time"
                  type="number"
                  min={startTime}
                  max={duration}
                  step={0.1}
                  value={endTime || duration}
                  onChange={(e) => setEndTime(parseFloat(e.target.value) || duration)}
                  disabled={isProcessing}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(endTime || duration)}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Duration: {formatTime((endTime || duration) - startTime)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={startTime}
                onChange={(e) => setStartTime(parseFloat(e.target.value))}
                className="w-full"
                disabled={isProcessing}
              />
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={endTime || duration}
                onChange={(e) => setEndTime(parseFloat(e.target.value))}
                className="w-full"
                disabled={isProcessing}
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleCut}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Cutting... ${progress}%` : "Cut Video"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Cut Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
