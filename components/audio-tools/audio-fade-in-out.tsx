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
import { Switch } from "@/components/ui/switch";

export default function AudioFadeInOut() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fadeInDuration, setFadeInDuration] = useState<number>(2);
  const [fadeOutDuration, setFadeOutDuration] = useState<number>(2);
  const [enableFadeIn, setEnableFadeIn] = useState<boolean>(true);
  const [enableFadeOut, setEnableFadeOut] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      await input.dispose();
    } catch (err) {
      setError("Failed to read audio file");
    }
  };

  const handleFade = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    if (!enableFadeIn && !enableFadeOut) {
      setError("Enable at least fade-in or fade-out");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
      });

      const fadeInSamples = enableFadeIn ? Math.floor(fadeInDuration * 44100) : 0;
      const fadeOutSamples = enableFadeOut ? Math.floor(fadeOutDuration * 44100) : 0;

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            const audioBuffer = sample.toAudioBuffer();
            const offlineCtx = new OfflineAudioContext(
              audioBuffer.numberOfChannels,
              audioBuffer.length,
              audioBuffer.sampleRate
            );

            const source = offlineCtx.createBufferSource();
            source.buffer = audioBuffer;

            const gainNode = offlineCtx.createGain();
            gainNode.gain.setValueAtTime(0, 0);

            if (enableFadeIn && fadeInSamples > 0) {
              gainNode.gain.linearRampToValueAtTime(1, fadeInSamples / audioBuffer.sampleRate);
            } else {
              gainNode.gain.setValueAtTime(1, 0);
            }

            if (enableFadeOut && fadeOutSamples > 0) {
              const fadeOutStart = audioBuffer.length / audioBuffer.sampleRate - fadeOutDuration;
              gainNode.gain.setValueAtTime(1, fadeOutStart);
              gainNode.gain.linearRampToValueAtTime(0, audioBuffer.length / audioBuffer.sampleRate);
            }

            source.connect(gainNode);
            gainNode.connect(offlineCtx.destination);
            source.start();

            const processedBuffer = await offlineCtx.startRendering();
            return AudioSample.fromAudioBuffer(processedBuffer, sample.timestamp)[0];
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
      setError("Failed to apply fade effects");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `fade-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFadeInDuration(2);
    setFadeOutDuration(2);
    setEnableFadeIn(true);
    setEnableFadeOut(true);
    setResultUrl(null);
    setError(null);
    setProgress(0);
    setDuration(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const maxFadeDuration = duration ? Math.min(duration / 2, 10) : 10;

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
              {duration && ` (${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")})`}
            </p>
          )}
        </div>

        {selectedFile && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-fade-in">Enable Fade In</Label>
              <Switch
                id="enable-fade-in"
                checked={enableFadeIn}
                onCheckedChange={setEnableFadeIn}
                disabled={isProcessing}
              />
            </div>

            {enableFadeIn && (
              <div>
                <Label htmlFor="fade-in">Fade In Duration: {fadeInDuration}s</Label>
                <InputField
                  id="fade-in"
                  type="range"
                  min={0.5}
                  max={maxFadeDuration}
                  step={0.5}
                  value={fadeInDuration}
                  onChange={(e) => setFadeInDuration(parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="mt-2 w-full"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-fade-out">Enable Fade Out</Label>
              <Switch
                id="enable-fade-out"
                checked={enableFadeOut}
                onCheckedChange={setEnableFadeOut}
                disabled={isProcessing}
              />
            </div>

            {enableFadeOut && (
              <div>
                <Label htmlFor="fade-out">Fade Out Duration: {fadeOutDuration}s</Label>
                <InputField
                  id="fade-out"
                  type="range"
                  min={0.5}
                  max={maxFadeDuration}
                  step={0.5}
                  value={fadeOutDuration}
                  onChange={(e) => setFadeOutDuration(parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="mt-2 w-full"
                />
              </div>
            )}
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleFade}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Processing... ${progress}%` : "Apply Fade"}
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
