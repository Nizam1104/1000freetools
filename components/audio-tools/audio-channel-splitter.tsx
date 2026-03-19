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

export default function AudioChannelSplitter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrls, setResultUrls] = useState<{ url: string; name: string; channel: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResultUrls([]);
      setProgress(0);
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrls([]);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      const audioTrack = await input.getPrimaryAudioTrack();
      if (!audioTrack) {
        throw new Error("No audio track found");
      }

      const numberOfChannels = audioTrack.numberOfChannels;
      const urls: { url: string; name: string; channel: string }[] = [];

      const channelNames = ["Left", "Right", "Center", "LFE", "Left Surround", "Right Surround"];

      for (let channel = 0; channel < Math.min(numberOfChannels, 6); channel++) {
        const output = new Output({
          format: new Mp3OutputFormat(),
          target: new BufferTarget(),
        });

        const conversion = await Conversion.init({
          input,
          output,
          audio: {
            numberOfChannels: 1,
            process: async (sample) => {
              const audioBuffer = sample.toAudioBuffer();
              const outputBuffer = new AudioBuffer({
                length: audioBuffer.length,
                numberOfChannels: 1,
                sampleRate: audioBuffer.sampleRate,
              });

              outputBuffer.copyToChannel(
                audioBuffer.getChannelData(channel),
                0
              );

              return AudioSample.fromAudioBuffer(outputBuffer, sample.timestamp)[0];
            },
          },
        });

        await conversion.execute();

        const buffer = output.target.buffer;
        if (!buffer) throw new Error("No buffer");
        const blob = new Blob([buffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);

        urls.push({
          url,
          name: `channel-${channel + 1}-${selectedFile.name}`,
          channel: channelNames[channel] || `Channel ${channel + 1}`,
        });

        setProgress(Math.round(((channel + 1) / Math.min(numberOfChannels, 6)) * 100));
      }

      setResultUrls(urls);

      await input.dispose();
    } catch (err) {
      setError("Failed to split channels");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    resultUrls.forEach(({ url, name }) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResultUrls([]);
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

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrls.length ? (
          <Button
            onClick={handleSplit}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Splitting... ${progress}%` : "Split Channels"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({resultUrls.length} files)
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Split Another
            </Button>
            <div className="space-y-2 pt-2">
              <Label>Extracted Channels:</Label>
              {resultUrls.map(({ name, channel }, i) => (
                <div key={i} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                  {channel}: {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
