"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Download, Upload, FileText } from "lucide-react";

export default function FontBase64Encoder() {
  const [fontFile, setFontFile] = useState<File | null>(null);
  const [base64Output, setBase64Output] = useState("");
  const [format, setFormat] = useState<"woff2" | "woff" | "ttf" | "otf">("woff2");
  const [cssOutput, setCssOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFontFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const base64 = result.split(",")[1] || result;
        setBase64Output(base64);
        
        // Generate CSS
        const fontName = file.name.replace(/\.[^/.]+$/, "");
        const css = `@font-face {
  font-family: '${fontName}';
  src: url('data:font/${format};base64,${base64}') format('${format}');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`;
        setCssOutput(css);
      };
      reader.readAsDataURL(file);
    }
  }, [format]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const downloadBase64 = useCallback(() => {
    if (!base64Output) return;
    const blob = new Blob([base64Output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fontFile ? `${fontFile.name}.base64.txt` : "font.base64.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [base64Output, fontFile]);

  const getFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Font File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fontFile">Select Font File</Label>
              <input
                id="fontFile"
                type="file"
                accept=".woff2,.woff,.ttf,.otf"
                onChange={handleFileUpload}
                className="mt-1 w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: WOFF2, WOFF, TTF, OTF
              </p>
            </div>

            {fontFile && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>File Name:</span>
                  <span className="font-medium">{fontFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">{getFileSize(fontFile.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{fontFile.type || "font file"}</span>
                </div>
              </div>
            )}

            <div>
              <Label>Output Format</Label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="woff2">WOFF2 (Recommended)</option>
                <option value="woff">WOFF</option>
                <option value="ttf">TTF</option>
                <option value="otf">OTF</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Base64 Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {base64Output ? (
              <>
                <div className="relative">
                  <Label>Base64 Encoded Font</Label>
                  <Textarea
                    value={base64Output.substring(0, 500) + (base64Output.length > 500 ? "..." : "")}
                    readOnly
                    className="mt-1 font-mono text-xs h-32"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(base64Output)}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadBase64}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Label>CSS @font-face</Label>
                  <Textarea
                    value={cssOutput}
                    readOnly
                    className="mt-1 font-mono text-xs h-40"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-8 right-2"
                    onClick={() => copyToClipboard(cssOutput)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <p>Upload a font file to see the Base64 encoded output</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Upload your font file (WOFF2, WOFF, TTF, or OTF format)</li>
            <li>Copy the generated Base64 string or download it</li>
            <li>Use the provided CSS @font-face code in your stylesheet</li>
            <li>Apply the font-family to your elements</li>
          </ol>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-semibold mb-2">Example Usage:</p>
            <code className="text-sm">
              {`body {
  font-family: 'YourFont', sans-serif;
}`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
