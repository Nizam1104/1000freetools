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
import { ensureMp3EncoderRegistered } from "@/lib/media-bunny-utils/ensureMp3Encoder";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function AudioGainAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gainData, setGainData] = useState<{
    peakDb: number;
    rmsDb: number;
    dynamicRange: number;
    averageGain: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setGainData(null);
    setIsAnalyzing(true);

    try {
      await ensureMp3EncoderRegistered();
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      let maxPeak = 0;
      let sumSquares = 0;
      let totalSamples = 0;
      let minPeak = 1;

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
                const amp = Math.abs(channelData[i]);
                if (amp > maxPeak) maxPeak = amp;
                if (amp > 0.001 && amp < minPeak) minPeak = amp;
                sumSquares += amp * amp;
                totalSamples++;
              }
            }
            return sample;
          },
        },
      });

      await conversion.execute();

      const rms = Math.sqrt(sumSquares / totalSamples);
      const peakDb = 20 * Math.log10(maxPeak);
      const rmsDb = 20 * Math.log10(rms);
      const minDb = minPeak < 1 ? 20 * Math.log10(minPeak) : 0;
      const dynamicRange = peakDb - minDb;
      const averageGain = (peakDb + rmsDb) / 2;

      setGainData({
        peakDb,
        rmsDb,
        dynamicRange: Math.abs(dynamicRange),
        averageGain,
      });

      await input.dispose();
    } catch (err) {
      setError("Failed to analyze gain");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setGainData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getGainStatus = (db: number) => {
    if (db > -1) return { status: "Clipping Risk", color: "text-red-600" };
    if (db > -6) return { status: "Hot", color: "text-orange-600" };
    if (db > -18) return { status: "Good", color: "text-green-600" };
    return { status: "Low", color: "text-blue-600" };
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
          <p className="text-sm text-muted-foreground text-center">Analyzing gain...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {gainData && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Peak Level</p>
                    <p className="text-2xl font-bold">{gainData.peakDb.toFixed(1)} dB</p>
                    <p className={`text-xs ${getGainStatus(gainData.peakDb).color}`}>
                      {getGainStatus(gainData.peakDb).status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">RMS Level</p>
                    <p className="text-2xl font-bold">{gainData.rmsDb.toFixed(1)} dB</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dynamic Range</p>
                    <p className="text-2xl font-bold">{gainData.dynamicRange.toFixed(1)} dB</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Gain</p>
                    <p className="text-2xl font-bold">{gainData.averageGain.toFixed(1)} dB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>-60 dB</span>
                <span>-18 dB (Target)</span>
                <span>-6 dB</span>
                <span>0 dB (Clip)</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden relative">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-red-500"
                  style={{ left: 0, right: 0 }}
                />
                <div
                  className="absolute h-full w-1 bg-white"
                  style={{ left: `${Math.min(100, Math.max(0, ((gainData.peakDb + 60) / 60) * 100))}%` }}
                />
              </div>
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
