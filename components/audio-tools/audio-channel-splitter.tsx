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

      const combinedBuffer = samples[0].toAudioBuffer();
      const numberOfChannels = combinedBuffer.numberOfChannels;
      const urls: { url: string; name: string; channel: string }[] = [];

      const channelNames = ["Left", "Right", "Center", "LFE", "Left Surround", "Right Surround"];

      for (let channel = 0; channel < Math.min(numberOfChannels, 6); channel++) {
        const outputBuffer = new AudioBuffer({
          length: combinedBuffer.length,
          numberOfChannels: 1,
          sampleRate: combinedBuffer.sampleRate,
        });

        outputBuffer.copyToChannel(
          combinedBuffer.getChannelData(channel),
          0
        );

        const ctx = new AudioContext({ sampleRate: combinedBuffer.sampleRate });
        const destination = ctx.createMediaStreamDestination();
        const source = ctx.createBufferSource();
        source.buffer = outputBuffer;
        source.connect(destination);

        const mediaRecorder = new MediaRecorder(destination.stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        const promise = new Promise<Blob>((resolve) => {
          mediaRecorder.onstop = () => resolve(new Blob(chunks, { type: "audio/webm" }));
        });

        mediaRecorder.start();
        source.start();

        const duration = outputBuffer.length / combinedBuffer.sampleRate;
        setTimeout(() => {
          mediaRecorder.stop();
          source.stop();
          ctx.close();
        }, duration * 1000);

        const blob = await promise;
        const url = URL.createObjectURL(blob);

        urls.push({
          url,
          name: `channel-${channel + 1}-${selectedFile.name}`,
          channel: channelNames[channel] || `Channel ${channel + 1}`,
        });

        setProgress(Math.round(((channel + 1) / Math.min(numberOfChannels, 6)) * 100));
      }

      setResultUrls(urls);

      await input.end();
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
