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
import { Switch } from "@/components/ui/switch";

export default function AudioSpeedChanger() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [preservePitch, setPreservePitch] = useState<boolean>(true);
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

  const handleSpeedChange = async () => {
    if (!selectedFile) {
      setError("Please select an audio file");
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

      const conversion = await Conversion.init({
        input,
        output,
        audio: {
          process: async (sample) => {
            const audioBuffer = sample.toAudioBuffer();
            
            if (preservePitch) {
              const offlineCtx = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                Math.floor(audioBuffer.length / playbackRate),
                audioBuffer.sampleRate
              );

              const source = offlineCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.playbackRate.value = playbackRate;

              source.connect(offlineCtx.destination);
              source.start();

              const processedBuffer = await offlineCtx.startRendering();
              return sample.constructor.fromAudioBuffer(processedBuffer);
            } else {
              const newSampleRate = audioBuffer.sampleRate * playbackRate;
              const offlineCtx = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                audioBuffer.length,
                newSampleRate
              );

              const source = offlineCtx.createBufferSource();
              source.buffer = audioBuffer;

              source.connect(offlineCtx.destination);
              source.start();

              const processedBuffer = await offlineCtx.startRendering();
              
              const resampledCtx = new AudioContext({ sampleRate: audioBuffer.sampleRate });
              const resampledBuffer = resampledCtx.createBuffer(
                processedBuffer.numberOfChannels,
                processedBuffer.length,
                audioBuffer.sampleRate
              );
              
              for (let i = 0; i < processedBuffer.numberOfChannels; i++) {
                resampledBuffer.copyToChannel(
                  processedBuffer.getChannelData(i),
                  i
                );
              }
              
              await resampledCtx.close();
              return sample.constructor.fromAudioBuffer(resampledBuffer);
            }
          },
        },
      });

      await conversion.execute();

      const buffer = output.target.buffer;
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);

      await input.end();
    } catch (err) {
      setError("Failed to change speed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `speed-${playbackRate}x-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPlaybackRate(1);
    setPreservePitch(true);
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
              <Label htmlFor="speed">Playback Speed: {playbackRate}x</Label>
              <InputField
                id="speed"
                type="range"
                min={0.25}
                max={4}
                step={0.25}
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-2 w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.25x</span>
                <span>0.5x</span>
                <span>1x</span>
                <span>2x</span>
                <span>4x</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="preserve-pitch">Preserve Pitch</Label>
              <Switch
                id="preserve-pitch"
                checked={preservePitch}
                onCheckedChange={setPreservePitch}
                disabled={isProcessing}
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleSpeedChange}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Processing... ${progress}%` : "Change Speed"}
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
