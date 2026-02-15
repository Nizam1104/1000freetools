'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Download, Upload } from 'lucide-react';
import { compressVideo, CompressionSettings } from '@/utils/video-utils/videoCompressor';

export default function VideoCompressionPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [compressedFileSize, setCompressedFileSize] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const originalVideoUrl = useRef<string | null>(null);

    // Compression settings
    const [compressionSettings, setCompressionSettings] = useState<CompressionSettings>({
        width: 1280,
        height: 720,
        bitrate: 2000000, // 2 Mbps
        codec: 'vp9', // Default to VP9
        format: 'mp4', // Default to MP4
    });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    // Clean up object URLs when component unmounts or file changes
    useEffect(() => {
        return () => {
            if (originalVideoUrl.current) {
                URL.revokeObjectURL(originalVideoUrl.current);
            }
            if (compressedUrl) {
                URL.revokeObjectURL(compressedUrl);
            }
        };
    }, [compressedUrl]);

    // Handle original video URL and reset compression results when selectedFile changes
    useEffect(() => {
        if (originalVideoUrl.current) {
            URL.revokeObjectURL(originalVideoUrl.current);
            originalVideoUrl.current = null;
        }

        if (selectedFile) {
            originalVideoUrl.current = URL.createObjectURL(selectedFile);
        }

        // Reset compression results when file changes
        setCompressedUrl(null);
        setCompressedFileSize(null);

        return () => {
            if (originalVideoUrl.current) {
                URL.revokeObjectURL(originalVideoUrl.current);
                originalVideoUrl.current = null;
            }
        };
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);
            setError(null);
        } else {
            setError('Please select a valid video file');
        }
    };

    const handleSettingChange = (field: keyof CompressionSettings, value: string | number) => {
        setCompressionSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCompress = async () => {
        if (!selectedFile) {
            setError('Please select a video file first');
            return;
        }

        setIsProcessing(true);
        setProgress(0);
        setError(null);

        try {
            const url = await compressVideo(
                selectedFile,
                compressionSettings,
                (progressValue: number) => {
                    setProgress(progressValue);
                }
            );

            // Get the size of the compressed file
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                setCompressedFileSize(blob.size);
            } catch (sizeErr) {
                console.error('Could not determine compressed file size:', sizeErr);
                setCompressedFileSize(null);
            }

            setCompressedUrl(url);
        } catch (err) {
            console.error('Compression error:', err);
            setError(`Compression failed: ${(err as Error).message || 'Unknown error'}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (compressedUrl) {
            const a = document.createElement('a');
            a.href = compressedUrl;
            a.download = `compressed_video.${compressionSettings.format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <Card className="w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Video Compression Tool</CardTitle>
                    <CardDescription>Upload and compress your videos with custom settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* File Upload Section */}
                    <div className="space-y-2">
                        <Label htmlFor="video-upload">Select Video File</Label>
                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-input rounded-lg p-4 transition-colors hover:border-accent">
                            <Upload className="h-8 w-8 text-muted-foreground mb-1" />
                            <Input
                                id="video-upload"
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                disabled={isProcessing}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Label
                                htmlFor="video-upload"
                                className="cursor-pointer text-center w-full py-2"
                            >
                                <span className="text-muted-foreground text-sm">
                                    {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to upload a video file or drag and drop'}
                                </span>
                            </Label>
                        </div>
                        {selectedFile && (
                            <div className="text-sm text-muted-foreground mt-2">
                                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                        )}
                    </div>

                    {/* Error Display */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Main Content Area */}
                    {selectedFile && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Settings Panel */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Compression Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Output Format</Label>
                                        <Select
                                            value={compressionSettings.format}
                                            onValueChange={(value) => handleSettingChange('format', value)}
                                            disabled={isProcessing}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="webm">WebM</SelectItem>
                                                <SelectItem value="mp4">MP4</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <Label>Bitrate: {(compressionSettings.bitrate / 1000000).toFixed(2)} Mbps</Label>
                                        </div>
                                        <Slider
                                            min={100000}
                                            max={10000000}
                                            step={100000}
                                            value={[compressionSettings.bitrate]}
                                            onValueChange={(value) => handleSettingChange('bitrate', value[0])}
                                            disabled={isProcessing}
                                            className="w-full"
                                        />
                                        <p className="text-xs text-muted-foreground italic">
                                            Low bitrate → low quality video, high compression
                                        </p>
                                        <p className='text-xs text-muted-foreground italic'>
                                            High bitrate → high quality video, less compression
                                        </p>
                                    </div>

                                    {/* Advanced Options Toggle */}
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                                        >
                                            {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                                        </button>
                                    </div>

                                    {/* Advanced Options */}
                                    {showAdvancedOptions && (
                                        <div className="space-y-4 pt-4 border-t border-gray-200">
                                            <div className="space-y-2">
                                                <Label>Video Codec</Label>
                                                <Select
                                                    value={compressionSettings.codec}
                                                    onValueChange={(value) => handleSettingChange('codec', value)}
                                                    disabled={isProcessing}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="vp9">VP9</SelectItem>
                                                        <SelectItem value="vp8">VP8</SelectItem>
                                                        <SelectItem value="avc1">H.264</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Resolution: {compressionSettings.width} x {compressionSettings.height}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs">Width</Label>
                                                        <Input
                                                            type="number"
                                                            value={compressionSettings.width}
                                                            onChange={(e) => handleSettingChange('width', Number(e.target.value))}
                                                            disabled={isProcessing}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs">Height</Label>
                                                        <Input
                                                            type="number"
                                                            value={compressionSettings.height}
                                                            onChange={(e) => handleSettingChange('height', Number(e.target.value))}
                                                            disabled={isProcessing}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Preview Panel */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedFile && originalVideoUrl.current && (
                                        <div className="space-y-4">
                                            <video
                                                src={originalVideoUrl.current}
                                                controls
                                                className="w-full h-auto rounded-md bg-muted"
                                            />
                                            <p className="text-sm text-muted-foreground text-center">
                                                Original video preview
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Compress Button */}
                    <div className="flex flex-col items-center space-y-4">
                        <Button
                            onClick={handleCompress}
                            disabled={!selectedFile || isProcessing}
                            className="w-full max-w-xs"
                        >
                            {isProcessing ? 'Compressing...' : 'Compress Video'}
                        </Button>

                        {/* Progress Bar */}
                        {isProcessing && (
                            <div className="w-full max-w-md space-y-2">
                                <Progress value={progress} className="w-full" />
                                <div className="text-center text-sm text-muted-foreground">
                                    {Math.round(progress)}% complete
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Result Display */}
                    {compressedUrl && !isProcessing && (
                        <div className="space-y-4">
                            <video
                                src={compressedUrl}
                                controls
                                className="w-full h-auto rounded-md bg-muted"
                            />
                            {/* File Size Information */}
                            <div className="bg-gray-50 p-3 rounded-md border">
                                <h3 className="font-medium text-sm mb-2">File Size Information</h3>

                                <div className="grid grid-cols-3 gap-2">
                                    {/* Original */}
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Original
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {selectedFile
                                                ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    {/* Compressed */}
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Compressed
                                        </p>
                                        <p className="text-sm font-semibold text-green-600">
                                            {compressedFileSize !== null
                                                ? `${(compressedFileSize / (1024 * 1024)).toFixed(2)} MB`
                                                : "…"}
                                        </p>
                                    </div>

                                    {/* Savings */}
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Savings
                                        </p>
                                        <p className="text-sm font-semibold text-blue-600">
                                            {selectedFile && compressedFileSize !== null
                                                ? `${(
                                                    (1 - compressedFileSize / selectedFile.size) *
                                                    100
                                                ).toFixed(1)}%`
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {selectedFile && compressedFileSize !== null && (
                                    <p className="mt-2 text-xs text-center text-muted-foreground">
                                        Reduced by{" "}
                                        <span className="font-medium">
                                            {(
                                                (selectedFile.size - compressedFileSize) /
                                                (1024 * 1024)
                                            ).toFixed(2)}{" "}
                                            MB
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <Button onClick={handleDownload}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Compressed Video
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
