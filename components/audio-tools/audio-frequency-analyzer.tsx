"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Output,
  Mp3OutputFormat,
  BufferTarget,
  BlobSource,
  ALL_FORMATS,
  Conversion,
} from "mediabunny";
import { ensureMp3EncoderRegistered } from "@/lib/media-bunny-utils/ensureMp3Encoder";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AudioFrequencyAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [frequencyData, setFrequencyData] = useState<{ freq: number; magnitude: number }[]>([]);
  const [fftSize, setFftSize] = useState<number>(2048);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setFrequencyData([]);
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

      const conversion = await Conversion.init({
        input,
        output: new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        }),
        audio: {
          process: async (sample: any) => {
            const buffer = sample.toAudioBuffer();
            const sampleRate = buffer.sampleRate;
            const analyserData = new Float32Array(fftSize / 2);
            const fftResult = new Float32Array(fftSize);

            const channelData = buffer.getChannelData(0);
            const toProcess = Math.min(channelData.length, fftSize);
            
            for (let i = 0; i < toProcess; i++) {
              fftResult[i] = channelData[i];
            }

            for (let i = toProcess; i < fftSize; i++) {
              fftResult[i] = 0;
            }

            for (let i = 0; i < fftSize / 2; i++) {
              let real = 0;
              let imag = 0;
              for (let j = 0; j < fftSize; j++) {
                const angle = (2 * Math.PI * i * j) / fftSize;
                real += fftResult[j] * Math.cos(angle);
                imag -= fftResult[j] * Math.sin(angle);
              }
              const magnitude = Math.sqrt(real * real + imag * imag) / fftSize;
              analyserData[i] = magnitude;
            }

            const nyquist = sampleRate / 2;
            const data: { freq: number; magnitude: number }[] = [];

            for (let i = 0; i < fftSize / 2; i++) {
              const freq = (i * nyquist) / (fftSize / 2);
              if (freq <= 20000) {
                data.push({
                  freq,
                  magnitude: 20 * Math.log10(analyserData[i] + 0.00001),
                });
              }
            }

            setFrequencyData(data);
            return sample;
          },
        },
      });

      await conversion.execute();
      await input.dispose();
    } catch (err) {
      setError("Failed to analyze frequency");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (frequencyData.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "hsl(var(--muted))";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 1;
      ctx.beginPath();

      const maxDb = -20;
      const minDb = -100;

      for (let i = 0; i < frequencyData.length; i++) {
        const x = (i / frequencyData.length) * width;
        const normalizedDb = (frequencyData[i].magnitude - minDb) / (maxDb - minDb);
        const y = height - (normalizedDb * height);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = 0.5;
      
      [20, 100, 1000, 10000, 20000].forEach((freq) => {
        const x = (Math.log10(freq) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20)) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.fillStyle = "hsl(var(--muted-foreground))";
        ctx.font = "10px sans-serif";
        ctx.fillText(freq >= 1000 ? `${freq / 1000}k` : `${freq}`, x + 2, 12);
      });
    }
  }, [frequencyData]);

  const handleReset = () => {
    setSelectedFile(null);
    setFrequencyData([]);
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

        {selectedFile && (
          <div>
            <Label htmlFor="fft-size">FFT Size (Resolution)</Label>
            <Select
              value={fftSize.toString()}
              onValueChange={(value) => setFftSize(parseInt(value))}
            >
              <SelectTrigger id="fft-size" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024">1024 (Low)</SelectItem>
                <SelectItem value="2048">2048 (Medium)</SelectItem>
                <SelectItem value="4096">4096 (High)</SelectItem>
                <SelectItem value="8192">8192 (Very High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {isAnalyzing && (
          <p className="text-sm text-muted-foreground text-center">Analyzing frequency...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {frequencyData.length > 0 && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={300}
                className="w-full"
                style={{ maxHeight: 300 }}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const link = document.createElement("a");
                    link.download = `frequency-${selectedFile?.name || "audio"}.png`;
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
