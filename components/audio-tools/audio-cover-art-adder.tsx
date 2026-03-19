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
import { Card, CardContent } from "@/components/ui/card";

export default function AudioCoverArtAdder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverArtFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCoverArtPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCover = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    if (!coverArtFile) {
      setError("Please select a cover art image");
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
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
      });

      const coverArrayBuffer = await coverArtFile.arrayBuffer();
      const coverUint8Array = new Uint8Array(coverArrayBuffer);

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            return sample;
          },
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
      setError("Failed to add cover art");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `cover-art-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCoverArtFile(null);
    setCoverArtPreview(null);
    setResultUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (coverInputRef.current) coverInputRef.current.value = "";
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
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="cover-art">Cover Art Image</Label>
          <InputField
            ref={coverInputRef}
            id="cover-art"
            type="file"
            accept="image/*"
            onChange={handleCoverSelect}
            disabled={isProcessing}
            className="mt-2"
          />
          {coverArtPreview && (
            <Card className="mt-4">
              <CardContent className="pt-6 flex justify-center">
                <img
                  src={coverArtPreview}
                  alt="Cover art preview"
                  className="w-48 h-48 object-cover rounded-lg border"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleAddCover}
            disabled={!selectedFile || !coverArtFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Processing... ${progress}%` : "Add Cover Art"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Process Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
