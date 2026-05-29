"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  Output,
  Mp3OutputFormat,
  Mp4OutputFormat,
  WebMOutputFormat,
  WavOutputFormat,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AudioFormatConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("mp3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formats = [
    { value: "mp3", label: "MP3", mimeType: "audio/mpeg" },
    { value: "wav", label: "WAV", mimeType: "audio/wav" },
    { value: "webm", label: "WebM (Opus)", mimeType: "audio/webm" },
    { value: "mp4", label: "MP4 (AAC)", mimeType: "audio/mp4" },
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
      if (outputFormat === "mp3") {
        await ensureMp3EncoderRegistered();
      }
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      let outputFormatObj;
      let mimeType;

      switch (outputFormat) {
        case "mp3":
          outputFormatObj = new Mp3OutputFormat();
          mimeType = "audio/mpeg";
          break;
        case "wav":
          outputFormatObj = new WavOutputFormat();
          mimeType = "audio/wav";
          break;
        case "webm":
          outputFormatObj = new WebMOutputFormat();
          mimeType = "audio/webm";
          break;
        case "mp4":
          outputFormatObj = new Mp4OutputFormat();
          mimeType = "audio/mp4";
          break;
        default:
          throw new Error("Unsupported format");
      }

      const output = new Output({
        format: outputFormatObj,
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
      });

      await conversion.execute();

      const buffer = output.target.buffer;
      if (!buffer) throw new Error("No buffer");
      const blob = new Blob([buffer], { type: mimeType });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);

      await input.dispose();
    } catch (err) {
      setError("Failed to convert format");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `converted-${selectedFile?.name.split(".")[0] || "audio"}.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOutputFormat("mp3");
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
            <Label htmlFor="output-format">Output Format</Label>
            <Select
              value={outputFormat}
              onValueChange={setOutputFormat}
            >
              <SelectTrigger id="output-format" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleConvert}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Converting... ${progress}%` : `Convert to ${outputFormat.toUpperCase()}`}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Convert Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
