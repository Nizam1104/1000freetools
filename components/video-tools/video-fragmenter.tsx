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

export default function VideoFragmenter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fragmentDuration, setFragmentDuration] = useState<number>(60);
  const [duration, setDuration] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrls, setResultUrls] = useState<{ url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setResultUrls([]);
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

  const handleFragment = async () => {
    if (!selectedFile || duration === null) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrls([]);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const numFragments = Math.ceil(duration / fragmentDuration);
      const urls: { url: string; name: string }[] = [];

      for (let i = 0; i < numFragments; i++) {
        const output = new Output({
          format: new Mp4OutputFormat(),
          target: new BufferTarget(),
        });

        const startTime = i * fragmentDuration;
        const endTime = Math.min((i + 1) * fragmentDuration, duration);

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
        const blob = new Blob([buffer], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);

        urls.push({
          url,
          name: `part-${i + 1}-${selectedFile.name}`,
        });

        setProgress(Math.round(((i + 1) / numFragments) * 100));
      }

      setResultUrls(urls);

      await input.end();
    } catch (err) {
      setError("Failed to fragment video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    resultUrls.forEach(({ url, name }) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFragmentDuration(60);
    setDuration(null);
    setResultUrls([]);
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
              {duration && ` (${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")})`}
            </p>
          )}
        </div>

        {duration !== null && (
          <div>
            <Label htmlFor="fragment-duration">Fragment Duration: {fragmentDuration}s</Label>
            <InputField
              id="fragment-duration"
              type="range"
              min={10}
              max={Math.max(10, duration / 2)}
              step={10}
              value={fragmentDuration}
              onChange={(e) => setFragmentDuration(parseFloat(e.target.value))}
              disabled={isProcessing}
              className="mt-2 w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Will create {Math.ceil(duration / fragmentDuration)} fragments
            </p>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrls.length ? (
          <Button
            onClick={handleFragment}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Fragmenting... ${progress}%` : "Fragment Video"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({resultUrls.length} files)
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Fragment Another
            </Button>
            <div className="space-y-2 pt-2">
              <Label>Fragments:</Label>
              {resultUrls.map(({ name }, i) => (
                <div key={i} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
