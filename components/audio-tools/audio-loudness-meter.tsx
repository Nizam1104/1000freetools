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
import { Card, CardContent } from "@/components/ui/card";

export default function AudioLoudnessMeter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loudnessData, setLoudnessData] = useState<{
    integrated: number;
    truePeak: number;
    loudnessRange: number;
    rms: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setLoudnessData(null);
    setIsAnalyzing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      let sumSquares = 0;
      let totalSamples = 0;
      let maxPeak = 0;

      const conversion = await Conversion.init({
        input,
        output: new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        }),
        audio: {
          process: async (sample) => {
            const buffer = sample.toAudioBuffer();
            for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
              const channelData = buffer.getChannelData(channel);
              for (let i = 0; i < channelData.length; i++) {
                const amp = channelData[i];
                sumSquares += amp * amp;
                totalSamples++;
                if (Math.abs(amp) > maxPeak) {
                  maxPeak = Math.abs(amp);
                }
              }
            }
            return sample;
          },
        },
      });

      await conversion.execute();

      const rms = Math.sqrt(sumSquares / totalSamples);
      const rmsDb = 20 * Math.log10(rms);
      const truePeakDb = 20 * Math.log10(maxPeak);

      const integratedLoudness = rmsDb - 0.691;
      const loudnessRange = Math.max(0, truePeakDb - integratedLoudness);

      setLoudnessData({
        integrated: integratedLoudness,
        truePeak: truePeakDb,
        loudnessRange: loudnessRange,
        rms: rmsDb,
      });

      await input.dispose();
    } catch (err) {
      setError("Failed to analyze loudness");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setLoudnessData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getLoudnessGrade = (db: number) => {
    if (db >= -16 && db <= -14) return { grade: "Excellent", color: "text-green-600" };
    if (db >= -18 && db < -14) return { grade: "Good", color: "text-blue-600" };
    if (db >= -23 && db < -18) return { grade: "Moderate", color: "text-yellow-600" };
    return { grade: "Low", color: "text-red-600" };
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
          <p className="text-sm text-muted-foreground text-center">Analyzing loudness...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {loudnessData && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Integrated Loudness</p>
                    <p className="text-2xl font-bold">{loudnessData.integrated.toFixed(1)} LUFS</p>
                    <p className={`text-xs ${getLoudnessGrade(loudnessData.integrated).color}`}>
                      {getLoudnessGrade(loudnessData.integrated).grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">True Peak</p>
                    <p className="text-2xl font-bold">{loudnessData.truePeak.toFixed(1)} dBTP</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loudness Range</p>
                    <p className="text-2xl font-bold">{loudnessData.loudnessRange.toFixed(1)} LU</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">RMS Level</p>
                    <p className="text-2xl font-bold">{loudnessData.rms.toFixed(1)} dB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>-70 LUFS</span>
                <span>-14 LUFS (Streaming)</span>
                <span>0 LUFS</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((loudnessData.integrated + 70) / 70) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Target for streaming: -14 LUFS (Spotify, Apple Music)
              </p>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              Analyze Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
