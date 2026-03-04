"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  XIcon,
  UploadIcon,
  FilmIcon,
  MusicIcon,
  FileTextIcon,
} from "lucide-react";

const SUPPORTED_FORMATS = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/mpeg",
  "video/3gpp",
  "video/x-flv",
  "video/x-ms-wmv",
  "audio/mp4",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/x-m4a",
  "audio/aac",
  "audio/x-aiff",
  "audio/flac",
];

const FILE_ACCEPT_STRING = SUPPORTED_FORMATS.join(",");

function srtToVtt(srt: string): string {
  const vtt =
    "WEBVTT\n\n" +
    srt
      .trim()
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/^\d+\n/gm, "")
      .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
  return vtt;
}

interface SubtitleTrack {
  label: string;
  url: string;
  fileName: string;
}

export default function VideoPlayerPage() {
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrack[]>([]);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [subtitleError, setSubtitleError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = i === activeTrackIndex ? "showing" : "hidden";
    }
  }, [activeTrackIndex, subtitleTracks]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    const objectUrl = URL.createObjectURL(file);
    if (currentFile) URL.revokeObjectURL(currentFile);
    setCurrentFile(objectUrl);
    setFileName(file.name);
    setFileType(file.type || "Unknown type");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubtitleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSubtitleError("");

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["vtt", "srt"].includes(ext ?? "")) {
      setSubtitleError("Only .vtt and .srt subtitle files are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      let vttContent = text;

      if (ext === "srt") {
        vttContent = srtToVtt(text);
      }

      const blob = new Blob([vttContent], { type: "text/vtt" });
      const url = URL.createObjectURL(blob);
      const label = file.name.replace(/\.(vtt|srt)$/i, "");

      setSubtitleTracks((prev) => [
        ...prev,
        { label, url, fileName: file.name },
      ]);
      setActiveTrackIndex(subtitleTracks.length);
    };
    reader.readAsText(file);

    if (subtitleInputRef.current) subtitleInputRef.current.value = "";
  };

  const removeTrack = (index: number) => {
    URL.revokeObjectURL(subtitleTracks[index].url);
    setSubtitleTracks((prev) => prev.filter((_, i) => i !== index));
    if (activeTrackIndex === index) setActiveTrackIndex(null);
    else if (activeTrackIndex !== null && activeTrackIndex > index) {
      setActiveTrackIndex(activeTrackIndex - 1);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    if (
      !SUPPORTED_FORMATS.includes(file.type) &&
      !file.name.match(
        /\.(mp4|webm|ogg|mov|avi|mkv|mpeg|mpg|3gp|flv|wmv|mp3|wav|m4a|aac|aiff|aif|flac)$/i,
      )
    ) {
      setError(`Unsupported file type: ${file.type || "Unknown"}`);
      return;
    }
    setError("");
    const objectUrl = URL.createObjectURL(file);
    if (currentFile) URL.revokeObjectURL(currentFile);
    setCurrentFile(objectUrl);
    setFileName(file.name);
    setFileType(file.type || "Unknown type");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClear = () => {
    if (currentFile) URL.revokeObjectURL(currentFile);
    subtitleTracks.forEach((t) => URL.revokeObjectURL(t.url));
    setCurrentFile(null);
    setFileName("");
    setFileType("");
    setError("");
    setSubtitleTracks([]);
    setActiveTrackIndex(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* File Input */}
        <Card>
          <CardContent className="p-4">
            <input
              ref={fileInputRef}
              type="file"
              accept={FILE_ACCEPT_STRING}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <UploadIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag & Drop or Click to Upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                MP4, WebM, MOV, AVI, MKV, MP3, WAV, M4A, FLAC
              </p>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Video Player + Controls */}
        {currentFile && (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <video
                  ref={videoRef}
                  src={currentFile}
                  controls
                  autoPlay
                  className="w-full bg-black"
                  style={{ maxHeight: "60vh" }}
                >
                  {subtitleTracks.map((track, i) => (
                    <track
                      key={track.url}
                      kind="subtitles"
                      src={track.url}
                      label={track.label}
                      default={i === activeTrackIndex}
                    />
                  ))}
                  Your browser does not support the video tag.
                </video>
              </CardContent>
            </Card>

            {/* File Info + Subtitles */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{fileName}</p>
                    <p className="text-xs text-muted-foreground">{fileType}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    Clear
                  </Button>
                </div>

                <Separator />

                {/* Subtitles */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                      Subtitles
                    </span>
                    <input
                      ref={subtitleInputRef}
                      type="file"
                      accept=".vtt,.srt"
                      onChange={handleSubtitleSelect}
                      className="hidden"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => subtitleInputRef.current?.click()}
                    >
                      <PlusIcon className="w-3.5 h-3.5 mr-1.5" />
                      Add
                    </Button>
                  </div>

                  {subtitleError && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-xs">
                        {subtitleError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {subtitleTracks.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      No subtitles. Add .vtt or .srt file.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="subtitle-track"
                          checked={activeTrackIndex === null}
                          onChange={() => setActiveTrackIndex(null)}
                          className="accent-primary w-3.5 h-3.5"
                        />
                        <span className="text-xs text-muted-foreground">
                          Off
                        </span>
                      </label>

                      {subtitleTracks.map((track, i) => (
                        <div
                          key={track.url}
                          className="flex items-center gap-2"
                        >
                          <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                            <input
                              type="radio"
                              name="subtitle-track"
                              checked={activeTrackIndex === i}
                              onChange={() => setActiveTrackIndex(i)}
                              className="accent-primary w-3.5 h-3.5 shrink-0"
                            />
                            <div className="flex items-center gap-1.5 min-w-0">
                              <FileTextIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="text-xs truncate">
                                {track.label}
                              </span>
                            </div>
                          </label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTrack(i)}
                            className="shrink-0 h-7 w-7 p-0"
                          >
                            <XIcon className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Supported Formats */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold mb-2">Supported Formats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FilmIcon className="w-3.5 h-3.5" />
                <span className="font-medium">Video:</span>
                <span className="text-muted-foreground/80">
                  MP4, WebM, MOV, AVI, MKV
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MusicIcon className="w-3.5 h-3.5" />
                <span className="font-medium">Audio:</span>
                <span className="text-muted-foreground/80">
                  MP3, WAV, M4A, FLAC
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileTextIcon className="w-3.5 h-3.5" />
                <span className="font-medium">Subs:</span>
                <span className="text-muted-foreground/80">VTT, SRT</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
