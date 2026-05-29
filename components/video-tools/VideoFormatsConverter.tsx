"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import {
  VideoConverter,
  SUPPORTED_INPUT_FORMATS,
  SUPPORTED_OUTPUT_FORMATS,
  getSupportedConversions,
  AUDIO_FORMATS,
  VIDEO_FORMATS,
} from "@/lib/media-bunny-utils/formatConversions";

import { ensureMp3EncoderRegistered } from "@/lib/media-bunny-utils/ensureMp3Encoder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileVideo,
  ArrowRight,
  Download,
  RotateCcw,
  Zap,
  Shield,
  Layers,
  Music,
  Film,
} from "lucide-react";

// MP3 encoder is loaded on demand in handlers via ensureMp3EncoderRegistered()

export default function VideoFormatsConversion() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputFormat, setInputFormat] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<string>("mp4");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [possibleOutputs, setPossibleOutputs] = useState<string[]>([
    ...SUPPORTED_OUTPUT_FORMATS,
  ]);
  const [activeTab, setActiveTab] = useState<string>("converter");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);

      // Extract format from file extension
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (SUPPORTED_INPUT_FORMATS.includes(ext as any)) {
        setInputFormat(ext);
        setPossibleOutputs(VideoConverter.getPossibleOutputFormats(ext));
        // Set default output if not compatible
        if (!VideoConverter.isConversionPossible(ext, outputFormat)) {
          setOutputFormat(possibleOutputs[0] || "mp4");
        }
      } else {
        setInputFormat("unknown");
        setPossibleOutputs([...SUPPORTED_OUTPUT_FORMATS]);
      }
    }
  };

  // Handle format change
  const handleInputChange = (value: string) => {
    setInputFormat(value);
    const outputs = VideoConverter.getPossibleOutputFormats(value);
    setPossibleOutputs([...outputs]);

    // Reset output format if it's not compatible with new input
    if (!VideoConverter.isConversionPossible(value, outputFormat)) {
      setOutputFormat(outputs[0] || "mp4");
    }
  };

  // Handle output format change
  const handleOutputChange = (value: string) => {
    setOutputFormat(value);
  };

  // Handle conversion process
  const handleConvert = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    if (!VideoConverter.isConversionPossible(inputFormat, outputFormat)) {
      setError(
        `Conversion from ${inputFormat} to ${outputFormat} is not supported`,
      );
      return;
    }

    setIsConverting(true);
    setError(null);
    setProgress(0);
    setResultUrl(null);

    try {
      if (outputFormat === "mp3") {
        await ensureMp3EncoderRegistered();
      }
      const isVideoToAudio =
        VIDEO_FORMATS.includes(inputFormat as any) &&
        AUDIO_FORMATS.includes(outputFormat as any);

      const result = await VideoConverter.convert(selectedFile, {
        outputFormat,
        removeVideo: isVideoToAudio,
        onProgress: (progress) => {
          setProgress(Math.round(progress * 100));
        },
      });

      setProgress(100);

      if (result.success && result.blob) {
        // Create download URL
        const url = URL.createObjectURL(result.blob);
        setResultUrl(url);

        // Set filename with new extension
        const newName = fileName.replace(/\.[^/.]+$/, `.${outputFormat}`);
        setFileName(newName);
      } else {
        setError(result.error || "Conversion failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion");
    } finally {
      setIsConverting(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset the form
  const handleReset = () => {
    setSelectedFile(null);
    setInputFormat("");
    setOutputFormat("mp4");
    setProgress(0);
    setResultUrl(null);
    setError(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get all possible conversions for reference
  const allConversions = getSupportedConversions();

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="converter" className="gap-2">
            <FileVideo className="w-4 h-4" />
            Converter
          </TabsTrigger>
          <TabsTrigger value="info" className="gap-2">
            <Layers className="w-4 h-4" />
            Format Info
          </TabsTrigger>
        </TabsList>

        {/* Converter Tab */}
        <TabsContent value="converter" className="space-y-6">
          <Card className="border-border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Convert Your Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  selectedFile
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={`.${SUPPORTED_INPUT_FORMATS.join(", .")}`}
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isConverting}
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1">
                      {selectedFile ? "File Selected" : "Drop your file here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedFile
                        ? `${fileName} (${formatSize(selectedFile.size)})`
                        : "or click to browse"}
                    </p>
                  </div>
                  {selectedFile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      disabled={isConverting}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Choose Different File
                    </Button>
                  )}
                </div>
              </div>

              {/* Format Selection */}
              {selectedFile && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="input-format">Input Format</Label>
                    <Select
                      value={inputFormat}
                      onValueChange={handleInputChange}
                      disabled={isConverting}
                    >
                      <SelectTrigger id="input-format" className="w-full">
                        <SelectValue placeholder="Auto-detect" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_INPUT_FORMATS.map((format) => (
                          <SelectItem
                            key={`input-${format}`}
                            value={format}
                            className="bg-card text-card-foreground"
                          >
                            {format.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select
                      value={outputFormat}
                      onValueChange={handleOutputChange}
                      disabled={!selectedFile || isConverting}
                    >
                      <SelectTrigger id="output-format" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {possibleOutputs.map((format) => (
                          <SelectItem
                            key={`output-${format}`}
                            value={format}
                            className="bg-card text-card-foreground"
                          >
                            {format.toUpperCase()} (
                            {VideoConverter.getMimeType(format)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Conversion Arrow */}
              {selectedFile && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                </div>
              )}

              {/* Convert Button */}
              {selectedFile && !resultUrl && (
                <Button
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  {isConverting ? (
                    <>
                      <Zap className="w-5 h-5 mr-2 animate-pulse" />
                      Converting... {progress}%
                    </>
                  ) : (
                    <>
                      <FileVideo className="w-5 h-5 mr-2" />
                      Convert to {outputFormat.toUpperCase()}
                    </>
                  )}
                </Button>
              )}

              {/* Progress Bar */}
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success & Download */}
              {resultUrl && (
                <Alert className="border-green-500 bg-green-500/10">
                  <AlertDescription className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Conversion Complete!</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        onClick={handleDownload}
                        className="flex-1 sm:flex-none gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 sm:flex-none gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Convert Another
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Format Info Tab */}
        <TabsContent value="info" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Supported Formats */}
            <Card className="border-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Supported Formats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Input Formats
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_INPUT_FORMATS.map((format) => (
                      <Badge key={`input-${format}`} variant="secondary">
                        {format.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Output Formats
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_OUTPUT_FORMATS.map((format) => (
                      <Badge key={`output-${format}`} variant="outline">
                        {format.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capabilities */}
            <Card className="border-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Film className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium">Container Conversion</span>
                      <p className="text-sm text-muted-foreground">
                        MP4 ↔ WebM ↔ MKV ↔ MOV
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileVideo className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium">
                        Video Codec Conversion
                      </span>
                      <p className="text-sm text-muted-foreground">
                        H.264 ↔ H.265 ↔ VP8 ↔ VP9 ↔ AV1
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium">Audio Extraction</span>
                      <p className="text-sm text-muted-foreground">
                        Extract audio as MP3, WAV, AAC, FLAC, or Opus
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium">Fast Transmuxing</span>
                      <p className="text-sm text-muted-foreground">
                        Copy tracks without re-encoding when possible
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Matrix Preview */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Popular Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {allConversions.slice(0, 24).map((conv, index) => (
                  <Badge
                    key={`conv-${index}`}
                    variant="outline"
                    className="justify-center"
                  >
                    {conv.from.toUpperCase()} → {conv.to.toUpperCase()}
                  </Badge>
                ))}
              </div>
              {allConversions.length > 24 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  + {allConversions.length - 24} more conversions available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-0.5">
                    1
                  </Badge>
                  <div>
                    <span className="font-medium">Best Compatibility</span>
                    <p className="text-sm text-muted-foreground">
                      Use <strong>MP4 (H.264)</strong> for maximum device and
                      platform support
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-0.5">
                    2
                  </Badge>
                  <div>
                    <span className="font-medium">Web Optimization</span>
                    <p className="text-sm text-muted-foreground">
                      Choose <strong>WebM (VP9)</strong> for smaller file sizes
                      on websites
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-0.5">
                    3
                  </Badge>
                  <div>
                    <span className="font-medium">Audio Only</span>
                    <p className="text-sm text-muted-foreground">
                      Select MP3, WAV, or AAC output to extract audio from
                      videos
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Features Bar */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium text-sm">100% Private</p>
            <p className="text-xs text-muted-foreground">
              Files never leave your device
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
          <Zap className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium text-sm">Lightning Fast</p>
            <p className="text-xs text-muted-foreground">
              Browser-powered conversion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
          <Layers className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium text-sm">Unlimited</p>
            <p className="text-xs text-muted-foreground">No file size limits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
