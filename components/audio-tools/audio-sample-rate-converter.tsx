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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AudioSampleRateConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sampleRate, setSampleRate] = useState<number>(44100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleRates = [8000, 11025, 16000, 22050, 32000, 44100, 48000, 88200, 96000, 192000];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
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

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          sampleRate: sampleRate,
        },
      });

      await conversion.execute();

      const buffer = output.target.buffer;
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);

      await input.end();
    } catch (err) {
      setError("Failed to convert sample rate");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `${sampleRate}hz-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSampleRate(44100);
    setResultUrl(null);
    setError(null);
    setProgress(0);
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
            </p>
          )}
        </div>

        {selectedFile && (
          <div>
            <Label htmlFor="sample-rate">Sample Rate</Label>
            <Select
              value={sampleRate.toString()}
              onValueChange={(value) => setSampleRate(parseInt(value))}
            >
              <SelectTrigger id="sample-rate" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sampleRates.map((rate) => (
                  <SelectItem key={rate} value={rate.toString()}>
                    {rate >= 1000 ? `${rate / 1000} kHz` : `${rate} Hz`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              {sampleRate <= 16000 && "Telephone quality"}
              {sampleRate > 16000 && sampleRate <= 22050 && "AM radio quality"}
              {sampleRate > 22050 && sampleRate <= 32000 && "FM radio quality"}
              {sampleRate > 32000 && sampleRate <= 44100 && "CD quality"}
              {sampleRate > 44100 && "High-resolution audio"}
            </p>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleConvert}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Converting... ${progress}%` : "Convert Sample Rate"}
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
