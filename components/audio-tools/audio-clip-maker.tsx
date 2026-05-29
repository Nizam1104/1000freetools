"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  Output,
  Mp3OutputFormat,
  BufferTarget,
  BlobSource,
  Conversion,
  ALL_FORMATS,
} from "mediabunny";
import { ensureMp3EncoderRegistered } from "@/lib/media-bunny-utils/ensureMp3Encoder";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function AudioClipMaker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [clipDuration, setClipDuration] = useState<number>(30);
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

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      await input.dispose();
    } catch (err) {
      setError("Failed to read audio file");
    }
  };

  const handleCreateClip = async () => {
    if (!selectedFile || !duration) {
      setError("Please select an audio file");
      return;
    }

    if (startTime < 0 || startTime >= duration) {
      setError("Invalid start time");
      return;
    }

    const endTime = Math.min(startTime + clipDuration, duration);

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      await ensureMp3EncoderRegistered();
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp3OutputFormat(),
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
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);

      await input.dispose();
    } catch (err) {
      setError("Failed to create clip");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `clip-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setStartTime(0);
    setClipDuration(30);
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
          <Label htmlFor="audio-file">Audio File</Label>
          <InputField
            ref={fileInputRef}
            id="audio-file"
            type="file"
            accept="audio/*"
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
            <div>
              <Label htmlFor="start-time">Start Time: {formatTime(startTime)}</Label>
              <InputField
                id="start-time"
                type="range"
                min={0}
                max={duration - clipDuration}
                step={1}
                value={startTime}
                onChange={(e) => setStartTime(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
            </div>

            <div>
              <Label htmlFor="clip-duration">Clip Duration: {clipDuration}s</Label>
              <InputField
                id="clip-duration"
                type="range"
                min={5}
                max={Math.min(300, duration)}
                step={5}
                value={clipDuration}
                onChange={(e) => setClipDuration(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Clip will be from {formatTime(startTime)} to {formatTime(Math.min(startTime + clipDuration, duration))}
            </div>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleCreateClip}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Creating Clip... ${progress}%` : "Create Clip"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download Clip
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Create Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
