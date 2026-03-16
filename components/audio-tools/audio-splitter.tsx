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
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AudioSplitter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<"equal" | "count">("equal");
  const [segmentDuration, setSegmentDuration] = useState<number>(60);
  const [segmentCount, setSegmentCount] = useState<number>(3);
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

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      await input.end();
    } catch (err) {
      setError("Failed to read audio file");
    }
  };

  const handleSplit = async () => {
    if (!selectedFile || !duration) {
      setError("Please select an audio file");
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

      const segments: { start: number; end: number }[] = [];

      if (splitMode === "equal") {
        const numSegments = Math.ceil(duration / segmentDuration);
        for (let i = 0; i < numSegments; i++) {
          segments.push({
            start: i * segmentDuration,
            end: Math.min((i + 1) * segmentDuration, duration),
          });
        }
      } else {
        const segmentLength = duration / segmentCount;
        for (let i = 0; i < segmentCount; i++) {
          segments.push({
            start: i * segmentLength,
            end: (i + 1) * segmentLength,
          });
        }
      }

      const urls: { url: string; name: string }[] = [];

      for (let i = 0; i < segments.length; i++) {
        const output = new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        });

        const conversion = await Conversion.init({
          input,
          output,
          trim: {
            start: segments[i].start,
            end: segments[i].end,
          },
        });

        await conversion.execute();

        const buffer = output.target.buffer;
        const blob = new Blob([buffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);

        urls.push({
          url,
          name: `part-${i + 1}-${selectedFile.name}`,
        });

        setProgress(Math.round(((i + 1) / segments.length) * 100));
      }

      setResultUrls(urls);

      await input.end();
    } catch (err) {
      setError("Failed to split audio");
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
    setDuration(null);
    setResultUrls([]);
    setError(null);
    setProgress(0);
    setSegmentDuration(60);
    setSegmentCount(3);
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

        {selectedFile && duration && (
          <>
            <Tabs value={splitMode} onValueChange={(v) => setSplitMode(v as "equal" | "count")}>
              <TabsList className="w-full">
                <TabsTrigger value="equal" className="flex-1">Equal Duration</TabsTrigger>
                <TabsTrigger value="count" className="flex-1">Fixed Count</TabsTrigger>
              </TabsList>

              <TabsContent value="equal" className="space-y-2 mt-4">
                <Label htmlFor="segment-duration">Segment Duration: {segmentDuration}s</Label>
                <InputField
                  id="segment-duration"
                  type="range"
                  min={10}
                  max={Math.max(10, duration / 2)}
                  step={10}
                  value={segmentDuration}
                  onChange={(e) => setSegmentDuration(parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Will create {Math.ceil(duration / segmentDuration)} segments
                </p>
              </TabsContent>

              <TabsContent value="count" className="space-y-2 mt-4">
                <Label htmlFor="segment-count">Number of Segments</Label>
                <InputField
                  id="segment-count"
                  type="number"
                  min={2}
                  max={100}
                  value={segmentCount}
                  onChange={(e) => setSegmentCount(parseInt(e.target.value) || 2)}
                  disabled={isProcessing}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Each segment will be {(duration / segmentCount).toFixed(1)}s
                </p>
              </TabsContent>
            </Tabs>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrls.length ? (
          <Button
            onClick={handleSplit}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Splitting... ${progress}%` : "Split Audio"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({resultUrls.length} files)
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Split Another
            </Button>
            <div className="space-y-2 pt-2">
              <Label>Segments:</Label>
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
