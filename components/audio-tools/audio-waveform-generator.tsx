"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  BlobSource,
  ALL_FORMATS,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AudioWaveformGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(200);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setWaveformData([]);
    setIsAnalyzing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const audioTrack = await input.getPrimaryAudioTrack();
      if (!audioTrack) {
        throw new Error("No audio track found");
      }

      const decoder = await audioTrack.createDecoder();
      const samples: AudioSample[] = [];
      
      for await (const sample of decoder) {
        samples.push(sample);
      }

      if (samples.length === 0) {
        throw new Error("No audio samples found");
      }

      const combinedBuffer = new AudioBuffer({
        length: samples.reduce((sum, s) => sum + s.toAudioBuffer().length, 0),
        numberOfChannels: 1,
        sampleRate: samples[0].toAudioBuffer().sampleRate,
      });

      let offset = 0;
      for (const sample of samples) {
        const buffer = sample.toAudioBuffer();
        const channelData = buffer.getChannelData(0);
        combinedBuffer.copyToChannel(channelData, 0, offset);
        offset += buffer.length;
      }

      const samplesPerDataPoint = Math.ceil(combinedBuffer.length / canvasWidth);
      const data: number[] = [];

      for (let i = 0; i < canvasWidth; i++) {
        const start = i * samplesPerDataPoint;
        const end = Math.min(start + samplesPerDataPoint, combinedBuffer.length);
        let max = 0;
        
        const channelData = combinedBuffer.getChannelData(0);
        for (let j = start; j < end; j++) {
          const amp = Math.abs(channelData[j]);
          if (amp > max) max = amp;
        }
        
        data.push(max);
      }

      setWaveformData(data);

      await input.end();
    } catch (err) {
      setError("Failed to generate waveform");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (waveformData.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      ctx.fillStyle = "hsl(var(--muted))";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "hsl(var(--primary))";
      
      const barWidth = canvasWidth / waveformData.length;
      const scaleY = canvasHeight / 2;

      for (let i = 0; i < waveformData.length; i++) {
        const barHeight = waveformData[i] * scaleY;
        const x = i * barWidth;
        const y = (canvasHeight - barHeight) / 2;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      }
    }
  }, [waveformData, canvasWidth, canvasHeight]);

  const handleReset = () => {
    setSelectedFile(null);
    setWaveformData([]);
    setError(null);
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
          <p className="text-sm text-muted-foreground text-center">Generating waveform...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {waveformData.length > 0 && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="w-full"
                style={{ maxHeight: canvasHeight }}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const link = document.createElement("a");
                    link.download = `waveform-${selectedFile?.name || "audio"}.png`;
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                  }
                }}
                className="flex-1"
              >
                Download as PNG
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
