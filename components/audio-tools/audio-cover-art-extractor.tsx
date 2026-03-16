"use client";

import React, { useState, useRef } from "react";
import {
  Input,
  BlobSource,
  ALL_FORMATS,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function AudioCoverArtExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setCoverArtUrl(null);
    setIsExtracting(true);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const tags = await input.getMetadataTags();
      
      if (tags.picture) {
        const pictureData = tags.picture;
        let mimeType = "image/jpeg";
        
        if (typeof pictureData === "object" && pictureData !== null) {
          const picObj = pictureData as { data?: ArrayBuffer | Uint8Array; type?: string; format?: string };
          if (picObj.type) mimeType = picObj.type;
          if (picObj.format) mimeType = `image/${picObj.format}`;
          
          let uint8Array: Uint8Array;
          if (picObj.data instanceof Uint8Array) {
            uint8Array = picObj.data;
          } else if (picObj.data instanceof ArrayBuffer) {
            uint8Array = new Uint8Array(picObj.data);
          } else {
            throw new Error("Invalid picture data format");
          }
          
          const blob = new Blob([uint8Array], { type: mimeType });
          const url = URL.createObjectURL(blob);
          setCoverArtUrl(url);
        }
      } else {
        setError("No cover art found in this audio file");
      }

      await input.end();
    } catch (err) {
      setError("Failed to extract cover art");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDownload = () => {
    if (coverArtUrl) {
      const link = document.createElement("a");
      link.href = coverArtUrl;
      link.download = `cover-art-${selectedFile?.name || "audio"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCoverArtUrl(null);
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
            disabled={isExtracting}
            className="mt-2"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {isExtracting && (
          <p className="text-sm text-muted-foreground text-center">Extracting cover art...</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {coverArtUrl && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 flex justify-center">
                <img
                  src={coverArtUrl}
                  alt="Extracted cover art"
                  className="w-64 h-64 object-cover rounded-lg border"
                />
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1">
                Download Cover Art
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Extract Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
