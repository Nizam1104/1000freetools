"use client";

import { useState } from "react";
import {
  Input,
  ALL_FORMATS,
  BlobSource,
  CanvasSink,
  MetadataTags,
  InputVideoTrack,
  InputAudioTrack,
} from "mediabunny";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input as InputField } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Film,
  Music,
  FileText,
  Upload,
  Image as ImageIcon,
  Clock,
  HardDrive,
  Activity,
  Info,
} from "lucide-react";

interface TrackPacketStats {
  packetCount: number;
  byteCount: number;
  averagePacketRate: number;
  averageBitrate: number;
}

interface TrackInfo {
  id: number;
  number: number;
  type: string;
  codec: string | null;
  codecParameterString: string;
  languageCode: string;
  name: string;
  disposition: Record<string, boolean>;
  timeResolution: number;
  duration: number;
  firstTimestamp: number;
  canDecode: boolean;
  packetStats: TrackPacketStats;
  codedWidth?: number;
  codedHeight?: number;
  displayWidth?: number;
  displayHeight?: number;
  rotation?: number;
  colorSpace?: string;
  hdr?: boolean;
  frameRate?: number;
  numberOfChannels?: number;
  sampleRate?: number;
}

interface FileMetadata {
  fileName: string;
  fileSize: number;
  duration: number;
  firstTimestamp: number;
  format: string;
  mimeType: string;
  fullMimeType: string;
  tracks: TrackInfo[];
  tags: MetadataTags;
}

export default function MetaDataViewer() {
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setMetadata(null);
    setThumbnail(null);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });

      const duration = await input.computeDuration();
      const firstTimestamp = await input.getFirstTimestamp();
      const format = await input.getFormat();
      const mimeType = format.mimeType;
      const fullMimeType = await input.getMimeType();

      const tracks = await input.getTracks();
      const trackInfos: TrackInfo[] = await Promise.all(
        tracks.map(async (track) => {
          const [
            codecParameterString,
            canDecode,
            trackDuration,
            firstTimestamp,
            packetStats,
          ] = await Promise.all([
            track.getCodecParameterString(),
            track.canDecode(),
            track.computeDuration(),
            track.getFirstTimestamp(),
            track.computePacketStats(100),
          ]);

          const trackInfo: TrackInfo = {
            id: track.id,
            number: track.number,
            type: track.type,
            codec: track.codec,
            codecParameterString: codecParameterString || "",
            languageCode: track.languageCode,
            name: track.name || "",
            disposition: track.disposition,
            timeResolution: track.timeResolution,
            duration: trackDuration,
            firstTimestamp,
            canDecode,
            packetStats: {
              packetCount: packetStats.packetCount,
              byteCount: Math.round(
                (packetStats.averageBitrate * trackDuration) / 8,
              ),
              averagePacketRate: packetStats.averagePacketRate,
              averageBitrate: packetStats.averageBitrate,
            },
          };

          if (track.isVideoTrack()) {
            const videoTrack = track as InputVideoTrack;
            trackInfo.codedWidth = videoTrack.codedWidth;
            trackInfo.codedHeight = videoTrack.codedHeight;
            trackInfo.displayWidth = videoTrack.displayWidth;
            trackInfo.displayHeight = videoTrack.displayHeight;
            trackInfo.rotation = videoTrack.rotation;
            trackInfo.colorSpace = JSON.stringify(
              await videoTrack.getColorSpace(),
            );
            trackInfo.hdr = await videoTrack.hasHighDynamicRange();
            trackInfo.frameRate = packetStats.averagePacketRate;
          } else if (track.isAudioTrack()) {
            const audioTrack = track as InputAudioTrack;
            trackInfo.numberOfChannels = audioTrack.numberOfChannels;
            trackInfo.sampleRate = audioTrack.sampleRate;
          }

          return trackInfo;
        }),
      );

      const tags = await input.getMetadataTags();

      let thumbnailUrl: string | null = null;
      const videoTrack = await input.getPrimaryVideoTrack();
      if (videoTrack) {
        try {
          const decodable = await videoTrack.canDecode();
          if (decodable) {
            const sink = new CanvasSink(videoTrack, {
              width: 320,
            });
            const result = await sink.getCanvas(1);
            if (result && result.canvas) {
              const canvas = result.canvas as
                | HTMLCanvasElement
                | OffscreenCanvas;
              if ("toDataURL" in canvas) {
                thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
              } else {
                const blob = await canvas.convertToBlob({
                  type: "image/jpeg",
                  quality: 0.8,
                });
                thumbnailUrl = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.readAsDataURL(blob);
                });
              }
            }
          }
        } catch {
          // Thumbnail extraction failed
        }
      }

      input.dispose();

      setMetadata({
        fileName: file.name,
        fileSize: file.size,
        duration,
        firstTimestamp,
        format: format.name,
        mimeType,
        fullMimeType,
        tracks: trackInfos,
        tags,
      });

      if (thumbnailUrl) {
        setThumbnail(thumbnailUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read metadata");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (seconds === undefined) return "N/A";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatBitrate = (bps?: number) => {
    if (bps === undefined) return "N/A";
    if (bps >= 1e6) return `${(bps / 1e6).toFixed(2)} Mbps`;
    if (bps >= 1e3) return `${(bps / 1e3).toFixed(2)} kbps`;
    return `${bps.toFixed(0)} bps`;
  };

  const formatDisposition = (disposition: Record<string, boolean>) => {
    const activeFlags = Object.entries(disposition)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    return activeFlags.length > 0 ? activeFlags.join(", ") : "None";
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case "video":
        return Film;
      case "audio":
        return Music;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5" />
            Select a File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <InputField
              type="file"
              accept="video/*,audio/*,.mp4,.mov,.webm,.mkv,.mp3,.wav,.aac,.flac,.ogg"
              onChange={handleFileSelect}
              disabled={loading}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">
              Supported: MP4, MOV, WebM, MKV, MP3, WAV, AAC, FLAC, Ogg,
              MPEG-TS
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Loading metadata...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Metadata Display */}
      {metadata && (
        <div className="space-y-6">
          {/* Thumbnail */}
          {thumbnail && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ImageIcon className="h-5 w-5" />
                  Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="max-h-[300px] w-auto rounded-md border object-contain"
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-40">
                      File Name
                    </TableCell>
                    <TableCell>{metadata.fileName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        File Size
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(metadata.fileSize)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Duration
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDuration(metadata.duration)} (
                      {metadata.duration.toFixed(3)}s)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      First Timestamp
                    </TableCell>
                    <TableCell>
                      {metadata.firstTimestamp.toFixed(6)}s
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Format</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{metadata.format}</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      MIME Type (Base)
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {metadata.mimeType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      MIME Type (Full)
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {metadata.fullMimeType}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tracks */}
          <div className="space-y-4">
            {metadata.tracks.map((track) => {
              const TrackIcon = getTrackIcon(track.type);
              return (
                <Card key={track.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrackIcon className="h-4 w-4" />
                      {track.type.toUpperCase()} Track #{track.number}
                      <Badge variant="outline" className="ml-2">
                        ID: {track.id}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Common Properties */}
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        Common Properties
                      </h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium w-40">
                              Codec
                            </TableCell>
                            <TableCell>{track.codec || "Unknown"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Codec Parameter
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {track.codecParameterString || "N/A"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Language
                            </TableCell>
                            <TableCell>{track.languageCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Name
                            </TableCell>
                            <TableCell>{track.name || "N/A"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Disposition
                            </TableCell>
                            <TableCell>
                              {formatDisposition(track.disposition)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Time Resolution
                            </TableCell>
                            <TableCell>{track.timeResolution} Hz</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Duration
                            </TableCell>
                            <TableCell>
                              {formatDuration(track.duration)} (
                              {track.duration.toFixed(3)}s)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Can Decode
                            </TableCell>
                            <TableCell>
                              {track.canDecode ? (
                                <Badge variant="default">Yes</Badge>
                              ) : (
                                <Badge variant="secondary">No</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Packet Statistics */}
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Packet Statistics
                        </div>
                      </h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium w-40">
                              Packet Count
                            </TableCell>
                            <TableCell>
                              {track.packetStats.packetCount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Byte Count
                            </TableCell>
                            <TableCell>
                              {formatFileSize(track.packetStats.byteCount)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Average Packet Rate
                            </TableCell>
                            <TableCell>
                              {track.packetStats.averagePacketRate.toFixed(2)}{" "}
                              packets/s
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Average Bitrate
                            </TableCell>
                            <TableCell>
                              {formatBitrate(
                                track.packetStats.averageBitrate,
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Video Properties */}
                    {track.type === "video" && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                          Video Properties
                        </h4>
                        <Table>
                          <TableBody>
                            {track.codedWidth !== undefined && (
                              <TableRow>
                                <TableCell className="font-medium w-40">
                                  Coded Resolution
                                </TableCell>
                                <TableCell>
                                  {track.codedWidth} x {track.codedHeight}
                                </TableCell>
                              </TableRow>
                            )}
                            {track.displayWidth !== undefined && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  Display Resolution
                                </TableCell>
                                <TableCell>
                                  {track.displayWidth} x {track.displayHeight}
                                </TableCell>
                              </TableRow>
                            )}
                            {track.rotation !== undefined &&
                              track.rotation !== 0 && (
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Rotation
                                  </TableCell>
                                  <TableCell>{track.rotation}°</TableCell>
                                </TableRow>
                              )}
                            {track.colorSpace && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  Color Space
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                  {track.colorSpace}
                                </TableCell>
                              </TableRow>
                            )}
                            {track.hdr !== undefined && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  HDR
                                </TableCell>
                                <TableCell>
                                  {track.hdr ? (
                                    <Badge variant="default">Yes</Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            )}
                            {track.frameRate && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  Frame Rate
                                </TableCell>
                                <TableCell>
                                  {track.frameRate.toFixed(2)} fps
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {/* Audio Properties */}
                    {track.type === "audio" && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                          Audio Properties
                        </h4>
                        <Table>
                          <TableBody>
                            {track.numberOfChannels !== undefined && (
                              <TableRow>
                                <TableCell className="font-medium w-40">
                                  Channels
                                </TableCell>
                                <TableCell>
                                  {track.numberOfChannels === 1 && "(Mono)"}
                                  {track.numberOfChannels === 2 && "(Stereo)"}
                                </TableCell>
                              </TableRow>
                            )}
                            {track.sampleRate && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  Sample Rate
                                </TableCell>
                                <TableCell>{track.sampleRate} Hz</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {metadata.tags && Object.keys(metadata.tags).length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metadata Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {metadata.tags.title && (
                      <TableRow>
                        <TableCell className="font-medium w-40">
                          Title
                        </TableCell>
                        <TableCell>{metadata.tags.title}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.artist && (
                      <TableRow>
                        <TableCell className="font-medium">Artist</TableCell>
                        <TableCell>{metadata.tags.artist}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.album && (
                      <TableRow>
                        <TableCell className="font-medium">Album</TableCell>
                        <TableCell>{metadata.tags.album}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.genre && (
                      <TableRow>
                        <TableCell className="font-medium">Genre</TableCell>
                        <TableCell>{metadata.tags.genre}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.date && (
                      <TableRow>
                        <TableCell className="font-medium">Date</TableCell>
                        <TableCell>{metadata.tags.date.toString()}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.comment && (
                      <TableRow>
                        <TableCell className="font-medium">Comment</TableCell>
                        <TableCell>{metadata.tags.comment}</TableCell>
                      </TableRow>
                    )}
                    {metadata.tags.trackNumber && (
                      <TableRow>
                        <TableCell className="font-medium">
                          Track Number
                        </TableCell>
                        <TableCell>{metadata.tags.trackNumber}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Embedded Images */}
                {metadata.tags.images && metadata.tags.images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium">
                      Embedded Images: {metadata.tags.images.length}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {metadata.tags.images.map((image, index) => (
                        <div key={index} className="text-center">
                          <img
                            src={`data:${image.mimeType};base64,${btoa(String.fromCharCode(...image.data))}`}
                            alt={image.kind || `Image ${index + 1}`}
                            className="mx-auto h-32 w-32 rounded-md border object-cover"
                          />
                          <p className="mt-2 text-xs text-muted-foreground">
                            {image.kind || "Unknown"} ({image.mimeType})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-sm text-muted-foreground">
                  No metadata tags found in this file
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
