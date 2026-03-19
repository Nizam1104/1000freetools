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

export default function AudioSampleExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [samplePosition, setSamplePosition] = useState<number>(0);
  const [sampleValue, setSampleValue] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [totalSamples, setTotalSamples] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setSampleValue(null);
    setIsAnalyzing(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const duration = await input.computeDuration();
      setDuration(duration);

      let totalSamplesCount = 0;

      const conversion = await Conversion.init({
        input,
        output: new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        }),
        audio: {
          process: async (sample) => {
            const buffer = sample.toAudioBuffer();
            totalSamplesCount += buffer.length;
            return sample;
          },
        },
      });

      await conversion.execute();
      setTotalSamples(totalSamplesCount);
      setSamplePosition(0);

      await input.dispose();
    } catch (err) {
      setError("Failed to analyze audio");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExtractSample = async () => {
    if (!selectedFile || samplePosition === null) {
      setError("Please select an audio file first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      let currentSample = 0;
      let foundValue: number | null = null;

      const conversion = await Conversion.init({
        input,
        output: new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        }),
        audio: {
          process: async (sample) => {
            const buffer = sample.toAudioBuffer();
            if (currentSample + buffer.length > samplePosition) {
              const offset = samplePosition - currentSample;
              if (offset < buffer.length) {
                foundValue = buffer.getChannelData(0)[offset];
              }
            }
            currentSample += buffer.length;
            return sample;
          },
        },
      });

      await conversion.execute();
      setSampleValue(foundValue);

      await input.dispose();
    } catch (err) {
      setError("Failed to extract sample");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSamplePosition(0);
    setSampleValue(null);
    setDuration(null);
    setTotalSamples(null);
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
              {totalSamples && ` (${totalSamples.toLocaleString()} samples)`}
            </p>
          )}
        </div>

        {totalSamples && (
          <div>
            <Label htmlFor="sample-position">Sample Position</Label>
            <InputField
              id="sample-position"
              type="number"
              min={0}
              max={totalSamples - 1}
              value={samplePosition}
              onChange={(e) => setSamplePosition(parseInt(e.target.value) || 0)}
              disabled={isAnalyzing}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a value between 0 and {totalSamples - 1}
            </p>
          </div>
        )}

        {isAnalyzing && (
          <p className="text-sm text-muted-foreground text-center">Processing...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {sampleValue !== null && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Sample Value at Position {samplePosition.toLocaleString()}</p>
                <p className="text-4xl font-bold my-4">{sampleValue.toFixed(6)}</p>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, ((sampleValue + 1) / 2) * 100))}%`,
                      marginLeft: `${Math.max(0, ((sampleValue + 1) / 2) * 100 - 50)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Range: -1.0 to 1.0
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleExtractSample}
            disabled={!selectedFile || isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing && sampleValue === null ? "Analyzing..." : "Extract Sample"}
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
