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
import { Textarea } from "@/components/ui/textarea";

export default function AudioMetadataEditor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    genre: "",
    comment: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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

      const tags = await input.getMetadataTags();
      setMetadata({
        title: tags.title || "",
        artist: tags.artist || "",
        album: tags.album || "",
        year: tags.date ? new Date(tags.date).getFullYear().toString() : "",
        genre: tags.genre || "",
        comment: tags.comment || "",
      });

      await input.dispose();
    } catch (err) {
      setError("Failed to read metadata");
    }
  };

  const handleSaveMetadata = async () => {
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

      const conversion = await Conversion.init({
        input,
        output,
        tags: {
          title: metadata.title || undefined,
          artist: metadata.artist || undefined,
          album: metadata.album || undefined,
          date: metadata.year ? new Date(parseInt(metadata.year), 0, 1) : undefined,
          genre: metadata.genre || undefined,
          comment: metadata.comment || undefined,
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
      setError("Failed to save metadata");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = `tagged-${selectedFile?.name || "audio.mp3"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setMetadata({
      title: "",
      artist: "",
      album: "",
      year: "",
      genre: "",
      comment: "",
    });
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <InputField
                  id="title"
                  value={metadata.title}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="artist">Artist</Label>
                <InputField
                  id="artist"
                  value={metadata.artist}
                  onChange={(e) => setMetadata({ ...metadata, artist: e.target.value })}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="album">Album</Label>
                <InputField
                  id="album"
                  value={metadata.album}
                  onChange={(e) => setMetadata({ ...metadata, album: e.target.value })}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <InputField
                  id="year"
                  value={metadata.year}
                  onChange={(e) => setMetadata({ ...metadata, year: e.target.value })}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="genre">Genre</Label>
                <InputField
                  id="genre"
                  value={metadata.genre}
                  onChange={(e) => setMetadata({ ...metadata, genre: e.target.value })}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={metadata.comment}
                onChange={(e) => setMetadata({ ...metadata, comment: e.target.value })}
                disabled={isProcessing}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {!resultUrl ? (
          <Button
            onClick={handleSaveMetadata}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Saving... ${progress}%` : "Save Metadata"}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleDownload} className="w-full">
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Edit Another
            </Button>
          </div>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
