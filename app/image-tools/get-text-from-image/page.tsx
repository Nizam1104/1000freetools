"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Tesseract from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GetTextFromImageSEO } from "@/components/seo-content/image-tools/GetTextFromImage";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Selection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type Stage = "upload" | "select" | "result";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalizeRect(sel: Selection) {
  return {
    x: Math.min(sel.startX, sel.endX),
    y: Math.min(sel.startY, sel.endY),
    w: Math.abs(sel.endX - sel.startX),
    h: Math.abs(sel.endY - sel.startY),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OCRPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Paste handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) loadFile(file);
          break;
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  // ── File loading ─────────────────────────────────────────────────────────
  const loadFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setSelection(null);
      setStage("select");
    };
    reader.readAsDataURL(file);
  };

  // ── Drop zone ────────────────────────────────────────────────────────────
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const onDragLeave = () => setIsDraggingFile(false);

  // ── Selection on image ───────────────────────────────────────────────────
  const getRelativePos = (e: React.MouseEvent) => {
    const rect = overlayRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const pos = getRelativePos(e);
    setSelectionStart(pos);
    setSelection({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
    setIsSelecting(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting) return;
    const pos = getRelativePos(e);
    setSelection((s) => (s ? { ...s, endX: pos.x, endY: pos.y } : null));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isSelecting) return;
    setIsSelecting(false);
    const pos = getRelativePos(e);
    const finalSel = {
      startX: selectionStart.x,
      startY: selectionStart.y,
      endX: pos.x,
      endY: pos.y,
    };
    const { w, h } = normalizeRect(finalSel);
    if (w < 5 || h < 5) {
      setSelection(null); // treat tiny click as "no selection"
    } else {
      setSelection(finalSel);
    }
  };

  // ── OCR ──────────────────────────────────────────────────────────────────
  const runOCR = async () => {
    if (!imageSrc || !imageRef.current) return;
    setIsProcessing(true);
    setProgress(0);

    let ocrImageData: string = imageSrc;

    // Crop if selection exists
    if (selection) {
      const img = imageRef.current;
      const overlayRect = overlayRef.current!.getBoundingClientRect();
      const scaleX = img.naturalWidth / overlayRect.width;
      const scaleY = img.naturalHeight / overlayRect.height;

      const { x, y, w, h } = normalizeRect(selection);
      const canvas = canvasRef.current!;
      canvas.width = w * scaleX;
      canvas.height = h * scaleY;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        img,
        x * scaleX,
        y * scaleY,
        w * scaleX,
        h * scaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      ocrImageData = canvas.toDataURL("image/png");
    }

    try {
      const result = await Tesseract.recognize(ocrImageData, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      setExtractedText(result.data.text.trim());
      setStage("result");
    } catch (err) {
      console.error(err);
      alert("OCR failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStage("upload");
    setImageSrc(null);
    setSelection(null);
    setExtractedText("");
    setProgress(0);
  };

  // ── Selection rect style ─────────────────────────────────────────────────
  const selStyle = selection
    ? (() => {
        const { x, y, w, h } = normalizeRect(selection);
        return {
          left: x,
          top: y,
          width: w,
          height: h,
        };
      })()
    : null;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Image to Text Converter
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Extract text from images using OCR — select a region or process the
          entire image. Everything runs in your browser.
        </p>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="container mx-auto max-w-3xl py-12">
            {/* Hidden canvas for cropping */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <Card className="border-border bg-background">
              <CardContent className="p-0">
                {/* Steps */}
                <div className="flex border-b border-border px-6">
                  {(["upload", "select", "result"] as Stage[]).map((s, i) => (
                    <div
                      key={s}
                      className={`flex items-center gap-2 border-b-2 py-4 pr-6 text-xs font-medium uppercase tracking-wide transition-colors ${
                        stage === s
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-mono ${
                          stage === s
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {s}
                    </div>
                  ))}
                </div>

                {/* ── UPLOAD ──────────────────────────────────────────────── */}
                {stage === "upload" && (
                  <div className="p-6">
                    <div
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                        isDraggingFile
                          ? "border-primary bg-muted"
                          : "border-border hover:border-primary hover:bg-muted/50"
                      }`}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-3xl">
                        🖼
                      </div>
                      <Label className="text-base font-semibold">
                        Drop your image here
                      </Label>
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        Drag & drop, click to browse, or press{" "}
                        <span className="font-medium text-foreground">
                          Ctrl+V / ⌘V
                        </span>{" "}
                        to paste
                        <br />
                        PNG, JPG, WEBP, GIF, BMP · Max 20 MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) loadFile(f);
                        }}
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        📁 Browse files
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => document.execCommand("paste")}
                        title="Or use Ctrl+V / ⌘V"
                      >
                        📋 Paste image
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── SELECT ──────────────────────────────────────────────── */}
                {stage === "select" && imageSrc && (
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground">
                      <span>💡</span>
                      Drag on the image to select a region. Leave empty to OCR
                      the full image.
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-border">
                      <img
                        ref={imageRef}
                        src={imageSrc}
                        alt="Uploaded"
                        className="max-h-[420px] w-full object-contain bg-black"
                        draggable={false}
                      />
                      <div
                        ref={overlayRef}
                        className="absolute inset-0 cursor-crosshair"
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                      >
                        {selStyle && (
                          <div
                            className="absolute border-2 border-primary bg-primary/15 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
                            style={{
                              left: selStyle.left,
                              top: selStyle.top,
                              width: selStyle.width,
                              height: selStyle.height,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Button onClick={runOCR} disabled={isProcessing}>
                        ✦ Extract Text
                      </Button>
                      {selection && (
                        <Button
                          variant="outline"
                          onClick={() => setSelection(null)}
                        >
                          Clear selection
                        </Button>
                      )}
                      <Button variant="destructive" onClick={reset}>
                        ✕ Remove image
                      </Button>
                      <div className="ml-auto text-xs font-mono text-muted-foreground">
                        {selection
                          ? (() => {
                              const { w, h } = normalizeRect(selection);
                              return (
                                <>
                                  Selection:{" "}
                                  <span className="text-primary">
                                    {Math.round(w)} × {Math.round(h)}px
                                  </span>
                                </>
                              );
                            })()
                          : "No selection — full image"}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROCESSING ──────────────────────────────────────────── */}
                {isProcessing && (
                  <div className="flex flex-col items-center gap-5 py-12">
                    <div className="h-14 w-14 animate-spin rounded-full border-2 border-border border-t-primary" />
                    <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">
                      Recognizing text… {progress}%
                    </p>
                  </div>
                )}

                {/* ── RESULT ──────────────────────────────────────────────── */}
                {stage === "result" && !isProcessing && (
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Extracted Text
                      </Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {extractedText.length} characters
                      </span>
                    </div>

                    {extractedText ? (
                      <textarea
                        className="flex min-h-[220px] w-full resize-y rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary"
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        spellCheck={false}
                      />
                    ) : (
                      <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-border bg-muted p-6 text-center text-sm text-muted-foreground">
                        No text detected. Try a different region or a
                        higher-contrast image.
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={copyText}
                        disabled={!extractedText}
                        className={
                          copied ? "bg-green-500 hover:bg-green-600" : ""
                        }
                      >
                        {copied ? "✓ Copied!" : "⎘ Copy text"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelection(null);
                          setStage("select");
                        }}
                      >
                        ← Re-select region
                      </Button>
                      <Button variant="destructive" onClick={reset}>
                        Start over
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <GetTextFromImageSEO />
      </div>
    </div>
  );
}
