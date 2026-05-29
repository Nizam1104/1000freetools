"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Minimize2 } from "lucide-react";

// Dynamically load qrcode library
const loadQRCode = (): Promise<typeof import("qrcode")> =>
  import("qrcode" as any).catch(() => {
    // fallback: inject script tag if import fails (Next.js edge case)
    return new Promise((resolve, reject) => {
      if ((window as any).QRCode) {
        resolve((window as any).QRCode);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.onload = () => resolve((window as any).QRCode);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  });

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type OutputFormat = "png" | "jpg" | "webp" | "svg";

interface SizeInfo {
  original: number;
  optimized: number;
}

const QrCodeFileSizeOptimizer: React.FC = () => {
  const [qrData, setQrData] = useState("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>("M");
  const [margin, setMargin] = useState(4);
  const [scale, setScale] = useState(8);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(90);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const errorCorrectionLevels: { value: ErrorCorrectionLevel; label: string }[] = [
    { value: "L", label: "L — Low (7%)" },
    { value: "M", label: "M — Medium (15%)" },
    { value: "Q", label: "Q — Quartile (25%)" },
    { value: "H", label: "H — High (30%)" },
  ];

  const outputFormats: OutputFormat[] = ["png", "jpg", "webp", "svg"];

  const generateQR = useCallback(async () => {
    if (!qrData.trim()) {
      setPreviewUrl(null);
      setSvgContent(null);
      setSizeInfo(null);
      setError(null);
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const QRCode = await import("qrcode");

      const opts: Parameters<typeof QRCode.toCanvas>[2] = {
        errorCorrectionLevel,
        margin,
        scale,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      };

      if (outputFormat === "svg") {
        // Generate SVG string
        const svgStr = await QRCode.toString(qrData, {
          ...opts,
          type: "svg",
        } as any) as unknown as string;
        setSvgContent(svgStr);
        setPreviewUrl(null);

        // Compute byte sizes
        const encoder = new TextEncoder();
        const svgBytes = encoder.encode(svgStr).byteLength;
        // "original" for SVG is the uncompressed size
        setSizeInfo({ original: svgBytes, optimized: svgBytes });
      } else {
        // Raster formats: generate on canvas then convert
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, qrData, opts);

        // Get "original" PNG size (lossless baseline)
        const originalDataUrl = canvas.toDataURL("image/png");
        const originalBytes = Math.round(
          ((originalDataUrl.length - "data:image/png;base64,".length) * 3) / 4
        );

        // Get optimized output format size
        const mimeType =
          outputFormat === "jpg" ? "image/jpeg" : `image/${outputFormat}`;
        const optimizedDataUrl = canvas.toDataURL(
          mimeType,
          outputFormat === "png" ? undefined : quality / 100
        );
        const optimizedBytes = Math.round(
          ((optimizedDataUrl.length - `data:${mimeType};base64,`.length) * 3) / 4
        );

        setPreviewUrl(optimizedDataUrl);
        setSvgContent(null);
        setSizeInfo({ original: originalBytes, optimized: optimizedBytes });
      }
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes("data too long")) {
        setError("Data is too long for the selected QR version. Try a higher error correction or shorter input.");
      } else {
        setError("Failed to generate QR code. Please check your input.");
      }
      setPreviewUrl(null);
      setSvgContent(null);
      setSizeInfo(null);
    } finally {
      setGenerating(false);
    }
  }, [qrData, errorCorrectionLevel, margin, scale, outputFormat, quality, darkColor, lightColor]);

  // Debounced auto-generate on setting changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      generateQR();
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [generateQR]);

  const handleClear = useCallback(() => {
    setQrData("");
    setErrorCorrectionLevel("M");
    setMargin(4);
    setScale(8);
    setOutputFormat("png");
    setQuality(90);
    setDarkColor("#000000");
    setLightColor("#ffffff");
    setPreviewUrl(null);
    setSvgContent(null);
    setSizeInfo(null);
    setError(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (outputFormat === "svg" && svgContent) {
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "qr-code.svg";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else if (previewUrl) {
      const link = document.createElement("a");
      link.download = `qr-code.${outputFormat}`;
      link.href = previewUrl;
      link.click();
    }
  }, [outputFormat, svgContent, previewUrl]);

  const handleCopy = useCallback(async () => {
    if (!previewUrl && !svgContent) return;
    try {
      if (outputFormat === "svg" && svgContent) {
        await navigator.clipboard.writeText(svgContent);
      } else if (previewUrl) {
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy data URL as text
      if (previewUrl) {
        navigator.clipboard.writeText(previewUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, [previewUrl, svgContent, outputFormat]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const hasOutput = previewUrl || svgContent;
  const savingsPercent =
    sizeInfo && outputFormat !== "svg" && sizeInfo.original > sizeInfo.optimized
      ? ((1 - sizeInfo.optimized / sizeInfo.original) * 100).toFixed(1)
      : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minimize2 className="w-5 h-5" />
            QR Code File Size Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Data input */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="qrData">QR Code Data</Label>
              <Textarea
                id="qrData"
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder="Enter a URL or any text…"
                rows={3}
              />
              {qrData && (
                <p className="text-xs text-gray-500">
                  {qrData.length} characters
                </p>
              )}
            </div>

            {/* Error correction */}
            <div className="space-y-2">
              <Label htmlFor="errorCorrection">Error Correction Level</Label>
              <select
                id="errorCorrection"
                value={errorCorrectionLevel}
                onChange={(e) => setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)}
                className="w-full p-2 border rounded-md bg-white text-sm"
              >
                {errorCorrectionLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Lower = smaller file · Higher = more damage resistant
              </p>
            </div>

            {/* Output format */}
            <div className="space-y-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <select
                id="outputFormat"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                className="w-full p-2 border rounded-md bg-white text-sm"
              >
                {outputFormats.map((f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Margin */}
            <div className="space-y-2">
              <Label htmlFor="margin">Quiet Zone / Margin (modules)</Label>
              <Input
                id="margin"
                type="number"
                value={margin}
                onChange={(e) => setMargin(Math.max(0, Math.min(20, Number(e.target.value))))}
                min={0}
                max={20}
              />
              <p className="text-xs text-gray-500">
                Minimum 4 recommended for reliable scanning
              </p>
            </div>

            {/* Scale */}
            <div className="space-y-2">
              <Label htmlFor="scale">Scale / Pixel Size per Module</Label>
              <Input
                id="scale"
                type="number"
                value={scale}
                onChange={(e) => setScale(Math.max(1, Math.min(20, Number(e.target.value))))}
                min={1}
                max={20}
              />
              <p className="text-xs text-gray-500">
                Higher = larger image, better scannability
              </p>
            </div>

            {/* Quality (only for lossy formats) */}
            {(outputFormat === "jpg" || outputFormat === "webp") && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="quality">
                  Quality — {quality}%{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    (lower = smaller file)
                  </span>
                </Label>
                <input
                  id="quality"
                  type="range"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Smaller file</span>
                  <span>Best quality</span>
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="space-y-2">
              <Label>Dark Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border p-0.5"
                />
                <Input
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="font-mono text-sm"
                  maxLength={7}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Light / Background Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border p-0.5"
                />
                <Input
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="font-mono text-sm"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Preview */}
          {(hasOutput || generating) && (
            <div className="mt-2 flex flex-col items-center gap-4 rounded-xl border bg-gray-50 p-6">
              {generating ? (
                <div className="flex h-40 items-center justify-center text-sm text-gray-400 animate-pulse">
                  Generating…
                </div>
              ) : outputFormat === "svg" && svgContent ? (
                <div
                  className="max-w-xs"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Generated QR code preview"
                  className="max-w-xs rounded"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : null}

              {/* Size stats */}
              {sizeInfo && !generating && (
                <div className="flex gap-6 text-sm text-center">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">
                      {outputFormat === "svg" ? "SVG Size" : "PNG (baseline)"}
                    </p>
                    <p className="font-semibold">{formatBytes(sizeInfo.original)}</p>
                  </div>
                  {outputFormat !== "svg" && (
                    <>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">
                          {outputFormat.toUpperCase()} Output
                        </p>
                        <p className="font-semibold text-green-600">
                          {formatBytes(sizeInfo.optimized)}
                        </p>
                      </div>
                      {savingsPercent && Number(savingsPercent) > 0 && (
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Saved</p>
                          <p className="font-semibold text-blue-600">{savingsPercent}%</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              onClick={handleDownload}
              disabled={!hasOutput || generating}
            >
              <Download className="w-4 h-4 mr-2" />
              Download {outputFormat.toUpperCase()}
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              disabled={!hasOutput || generating}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Image"}
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Tips */}
          <div className="rounded-lg border bg-blue-50 px-4 py-3 text-sm text-blue-800 space-y-1">
            <p className="font-semibold">Tips for smaller, scannable QR codes</p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-700 text-xs">
              <li>Use <strong>PNG</strong> for logos/printing — lossless, QR modules stay crisp.</li>
              <li>Use <strong>WebP</strong> for web embeds — best compression with no scanning artifacts.</li>
              <li>Avoid <strong>JPG</strong> for QR codes — compression blurs sharp edges and may break scanning.</li>
              <li>Keep <strong>Error Correction at L or M</strong> to minimise data and file size.</li>
              <li>Shorter URLs = fewer modules = smaller QR = smaller file.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeFileSizeOptimizer;
