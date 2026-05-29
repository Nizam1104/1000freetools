"use client";

import React, { useState, useRef, useEffect } from "react";
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
      await ensureMp3EncoderRegistered();
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const audioTrack = await input.getPrimaryAudioTrack();
      if (!audioTrack) {
        throw new Error("No audio track found");
      }

      // Get audio info for waveform generation
      const duration = await input.computeDuration();
      const sampleRate = audioTrack.sampleRate || 44100;
      const totalSamples = Math.floor(duration * sampleRate);
      const samplesPerDataPoint = Math.ceil(totalSamples / canvasWidth);

      // Generate waveform by processing audio
      const data: number[] = [];
      let currentMax = 0;
      let currentCount = 0;

      const conversion = await Conversion.init({
        input,
        output: new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        }),
        audio: {
          process: async (sample) => {
            const buffer = sample.toAudioBuffer();
            const channelData = buffer.getChannelData(0);
            
            for (let i = 0; i < channelData.length; i++) {
              const amp = Math.abs(channelData[i]);
              if (amp > currentMax) currentMax = amp;
              currentCount++;
              
              if (currentCount >= samplesPerDataPoint) {
                data.push(currentMax);
                currentMax = 0;
                currentCount = 0;
              }
            }
            return sample;
          },
        },
      });

      await conversion.execute();
      
      // Fill remaining data points if needed
      while (data.length < canvasWidth) {
        data.push(currentMax);
      }
      
      setWaveformData(data.slice(0, canvasWidth));

      await input.dispose();
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
