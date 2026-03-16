"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function Base64ToSvgDecoder() {
  const [base64Input, setBase64Input] = useState("");
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");

  const handleDecode = () => {
    if (!base64Input) return;

    try {
      // Handle data URL format
      let base64Data = base64Input;
      if (base64Input.includes(",")) {
        base64Data = base64Input.split(",")[1];
      }

      // Remove any whitespace
      base64Data = base64Data.replace(/\s/g, "");

      // Decode base64
      const svgString = atob(base64Data);
      setOutput(svgString);
      setPreview(`data:image/svg+xml;base64,${base64Data}`);
    } catch (e) {
      setOutput("Error: Invalid Base64 input");
      setPreview("");
    }
  };

  const handleEncode = () => {
    if (!base64Input) return;

    try {
      const base64String = btoa(base64Input);
      setOutput(`data:image/svg+xml;base64,${base64String}`);
      setPreview(base64Input);
    } catch (e) {
      setOutput("Error: Invalid SVG input");
      setPreview("");
    }
  };

  const [mode, setMode] = useState<"decode" | "encode">("decode");

  const handleDownload = () => {
    if (output && !output.startsWith("Error") && mode === "decode") {
      const blob = new Blob([output], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "decoded.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Error")) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setBase64Input("");
    setOutput("");
    setPreview("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Base64 to SVG Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Convert Base64 data URI strings back to SVG files
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("decode")}
          >
            Base64 → SVG
          </Button>
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("encode")}
          >
            SVG → Base64
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input">
            {mode === "decode" ? "Base64 Input" : "SVG Input"}
          </Label>
          <textarea
            id="input"
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            placeholder={
              mode === "decode"
                ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci..."
                : '<svg xmlns="http://www.w3.org/2000/svg">...</svg>'
            }
            className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={mode === "decode" ? handleDecode : handleEncode} disabled={!base64Input} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            {mode === "decode" ? "Decode" : "Encode"}
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!base64Input}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={mode === "decode" ? handleDecode : handleEncode} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          {mode === "decode" ? "Decode" : "Encode"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!base64Input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && !output.startsWith("Error") && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg p-4 flex items-center justify-center bg-background min-h-[200px]">
              {mode === "decode" ? (
                <div dangerouslySetInnerHTML={{ __html: output }} />
              ) : (
                <img src={preview} alt="SVG Preview" className="max-w-full" />
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleCopy();
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                {mode === "decode" && (
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px] break-all">
              {output.substring(0, 1000)}
              {output.length > 1000 ? "..." : ""}
            </pre>
          </Card>
        </div>
      )}

      {output.startsWith("Error") && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{output}</p>
        </Card>
      )}
    </div>
  );
}
