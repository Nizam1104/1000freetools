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
import { Progress } from "@/components/ui/progress";

export default function AudioMerger() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
      setError(null);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newFiles.length) return prev;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      setError("Please select at least 2 audio files");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    try {
      await ensureMp3EncoderRegistered();
      const audioBuffers: AudioBuffer[] = [];
      let sampleRate = 44100;
      let numberOfChannels = 2;

      for (const file of selectedFiles) {
        const input = new Input({
          source: new BlobSource(file),
          formats: ALL_FORMATS,
        });

        const conversion = await Conversion.init({
          input,
          output: new Output({
            format: new Mp3OutputFormat(),
            target: new BufferTarget(),
          }),
          audio: {
            process: async (sample) => {
              const buffer = sample.toAudioBuffer();
              sampleRate = buffer.sampleRate;
              numberOfChannels = buffer.numberOfChannels;
              audioBuffers.push(buffer);
              return sample;
            },
          },
        });

        await conversion.execute();
        await input.dispose();
      }

      const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.length, 0);
      const outputBuffer = new AudioBuffer({
        length: totalLength,
        numberOfChannels,
        sampleRate,
      });

      let offset = 0;
      for (const buffer of audioBuffers) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const outputData = outputBuffer.getChannelData(channel);
          const inputData = buffer.getChannelData(channel);
          outputData.set(inputData, offset);
        }
        offset += buffer.length;
      }

      const ctx = new AudioContext({ sampleRate });
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

      const duration = outputBuffer.length / sampleRate;
      setTimeout(() => {
        mediaRecorder.stop();
        source.stop();
        ctx.close();
      }, duration * 1000);

      const blob = await promise;
      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setProgress(100);
    } catch (err) {
      setError("Failed to merge audio files");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `merged-${selectedFiles[0]?.name || "audio.webm"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setResultUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="audio-files">Audio Files</Label>
          <InputField
            ref={fileInputRef}
            id="audio-files"
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileSelect}
            disabled={isProcessing}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Select multiple audio files to merge
          </p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Files ({selectedFiles.length}):</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 p-2 bg-muted rounded"
                >
                  <span className="text-sm flex-1 truncate">{index + 1}. {file.name}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      ↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === selectedFiles.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      ↓
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 text-destructive"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleMerge}
            disabled={selectedFiles.length < 2 || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Merging... ${progress}%` : `Merge ${selectedFiles.length} Files`}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download Merged Audio
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Merge Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
