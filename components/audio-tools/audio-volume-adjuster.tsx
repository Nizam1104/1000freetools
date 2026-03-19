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
  AudioSample,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function AudioVolumeAdjuster() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gainDb, setGainDb] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const handleVolumeAdjust = async () => {
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

      const gainMultiplier = Math.pow(10, gainDb / 20);

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            const audioBuffer = sample.toAudioBuffer();
            const offlineCtx = new OfflineAudioContext(
              audioBuffer.numberOfChannels,
              audioBuffer.length,
              audioBuffer.sampleRate
            );

            const source = offlineCtx.createBufferSource();
            source.buffer = audioBuffer;

            const gainNode = offlineCtx.createGain();
            gainNode.gain.value = gainMultiplier;

            source.connect(gainNode);
            gainNode.connect(offlineCtx.destination);
            source.start();

            const processedBuffer = await offlineCtx.startRendering();

            const processedSample = AudioSample.fromAudioBuffer(
              processedBuffer, sample.timestamp
            )[0];
            return processedSample;
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
      setError("Failed to adjust volume");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `volume-adjusted-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setGainDb(0);
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
            <Label htmlFor="gain">Volume Adjustment (dB): {gainDb} dB</Label>
            <InputField
              id="gain"
              type="range"
              min={-20}
              max={20}
              step={0.5}
              value={gainDb}
              onChange={(e) => setGainDb(parseFloat(e.target.value))}
              disabled={isProcessing}
              className="mt-2 w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>-20 dB (quieter)</span>
              <span>0 dB (original)</span>
              <span>+20 dB (louder)</span>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleVolumeAdjust}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Adjusting... ${progress}%` : "Adjust Volume"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Adjust Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
