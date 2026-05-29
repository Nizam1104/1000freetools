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
import { ensureMp3EncoderRegistered } from "@/lib/media-bunny-utils/ensureMp3Encoder";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function AudioSilenceRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState<number>(-40);
  const [minDuration, setMinDuration] = useState<number>(0.5);
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

  const handleRemoveSilence = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      await ensureMp3EncoderRegistered();
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
      });

      const thresholdLinear = Math.pow(10, threshold / 20);
      const minSilenceSamples = Math.floor(minDuration * 44100);

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            const audioBuffer = sample.toAudioBuffer();
            const samples = audioBuffer.getChannelData(0);
            
            const isSilent = (start: number, end: number): boolean => {
              let sum = 0;
              for (let i = start; i < end; i++) {
                sum += Math.abs(samples[i]);
              }
              return (sum / (end - start)) < thresholdLinear;
            };

            const segments: { start: number; end: number }[] = [];
            let segmentStart = 0;
            let i = 0;

            while (i < samples.length) {
              if (isSilent(i, Math.min(i + minSilenceSamples, samples.length))) {
                let silenceEnd = i;
                while (silenceEnd < samples.length && isSilent(silenceEnd, Math.min(silenceEnd + minSilenceSamples, samples.length))) {
                  silenceEnd++;
                }
                if (i > segmentStart) {
                  segments.push({ start: segmentStart, end: i });
                }
                segmentStart = silenceEnd;
                i = silenceEnd;
              } else {
                i++;
              }
            }

            if (segmentStart < samples.length) {
              segments.push({ start: segmentStart, end: samples.length });
            }

            if (segments.length === 0) {
              return sample;
            }

            const totalLength = segments.reduce((sum, seg) => sum + (seg.end - seg.start), 0);
            const outputBuffer = new AudioBuffer({
              length: totalLength,
              numberOfChannels: audioBuffer.numberOfChannels,
              sampleRate: audioBuffer.sampleRate,
            });

            let outputPos = 0;
            for (const segment of segments) {
              for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const channelData = audioBuffer.getChannelData(channel);
                const outputData = outputBuffer.getChannelData(channel);
                outputData.set(channelData.subarray(segment.start, segment.end), outputPos);
              }
              outputPos += segment.end - segment.start;
            }

            return AudioSample.fromAudioBuffer(outputBuffer, sample.timestamp)[0];
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
      setError("Failed to remove silence");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `silence-removed-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setThreshold(-40);
    setMinDuration(0.5);
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
          <>
            <div>
              <Label htmlFor="threshold">Silence Threshold: {threshold} dB</Label>
              <InputField
                id="threshold"
                type="range"
                min={-60}
                max={-20}
                step={1}
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-60 dB (very quiet)</span>
                <span>-40 dB (default)</span>
                <span>-20 dB (only very loud)</span>
              </div>
            </div>

            <div>
              <Label htmlFor="min-duration">Minimum Silence Duration: {minDuration}s</Label>
              <InputField
                id="min-duration"
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={minDuration}
                onChange={(e) => setMinDuration(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleRemoveSilence}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Processing... ${progress}%` : "Remove Silence"}
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
