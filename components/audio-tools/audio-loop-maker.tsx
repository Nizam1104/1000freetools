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

export default function AudioLoopMaker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loopCount, setLoopCount] = useState<number>(3);
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

  const handleLoop = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    if (loopCount < 1) {
      setError("Loop count must be at least 1");
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

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            const audioBuffer = sample.toAudioBuffer();
            
            const outputBuffer = new AudioBuffer({
              length: audioBuffer.length * loopCount,
              numberOfChannels: audioBuffer.numberOfChannels,
              sampleRate: audioBuffer.sampleRate,
            });

            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
              const inputData = audioBuffer.getChannelData(channel);
              const outputData = outputBuffer.getChannelData(channel);
              
              for (let loop = 0; loop < loopCount; loop++) {
                for (let i = 0; i < inputData.length; i++) {
                  outputData[loop * inputData.length + i] = inputData[i];
                }
              }
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
      setError("Failed to create loop");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `loop-${loopCount}x-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setLoopCount(3);
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
            <Label htmlFor="loop-count">Number of Loops</Label>
            <InputField
              id="loop-count"
              type="number"
              min={1}
              max={100}
              value={loopCount}
              onChange={(e) => setLoopCount(parseInt(e.target.value) || 1)}
              disabled={isProcessing}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              The audio will repeat {loopCount} time{loopCount !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleLoop}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Creating Loop... ${progress}%` : "Create Loop"}
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
