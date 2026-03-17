"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Download, Files } from "lucide-react";

export default function BulkFileMinifier() {
  const [files, setFiles] = useState<Array<{ name: string; content: string; minified: string }>>([]);
  const [textInput, setTextInput] = useState("");
  const [fileName, setFileName] = useState("file1.txt");
  const [copied, setCopied] = useState(false);

  const minifyContent = useCallback((content: string): string => {
    return content
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
      .replace(/\/\/.*$/gm, "") // Remove single-line comments
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .replace(/\s*([{};:,])\s*/g, "$1") // Remove whitespace around special chars
      .trim();
  }, []);

  const addFile = useCallback(() => {
    if (!textInput.trim()) return;
    const minified = minifyContent(textInput);
    setFiles([...files, { name: fileName, content: textInput, minified }]);
    setTextInput("");
    setFileName(`file${files.length + 2}.txt`);
  }, [files, textInput, fileName, minifyContent]);

  const minifyAll = useCallback(() => {
    return files.map((f) => f.minified).join("\n\n");
  }, [files]);

  const getTotalStats = useCallback(() => {
    const originalSize = files.reduce((acc, f) => acc + f.content.length, 0);
    const minifiedSize = files.reduce((acc, f) => acc + f.minified.length, 0);
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    return { originalSize, minifiedSize, reduction };
  }, [files]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(minifyAll());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [minifyAll]);

  const downloadAll = useCallback(() => {
    const content = files.map((f) => `// ${f.name}\n${f.minified}`).join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified-bulk.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [files]);

  const removeFile = useCallback((index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  }, [files]);

  const stats = getTotalStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Files className="w-5 h-5" />
            Add Files to Minify
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Label>File Name</Label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-3">
              <Label>Content</Label>
              <Textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste file content here..."
                className="mt-1 h-24 font-mono text-sm"
              />
            </div>
          </div>
          <Button onClick={addFile} disabled={!textInput.trim()} className="w-full md:w-auto">
            Add File
          </Button>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Files ({files.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy All
              </Button>
              <Button onClick={downloadAll}>
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {files.map((file, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{file.name}</span>
                    <Button size="sm" variant="ghost" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Original: {file.content.length} chars</div>
                    <div>Minified: {file.minified.length} chars</div>
                    <div className={file.content.length > file.minified.length ? "text-green-600" : ""}>
                      Reduction: {((1 - file.minified.length / file.content.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Combined Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="text-2xl font-bold">{stats.originalSize.toLocaleString()} chars</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minified Size</p>
                  <p className="text-2xl font-bold">{stats.minifiedSize.toLocaleString()} chars</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reduction</p>
                  <p className={`text-2xl font-bold ${stats.reduction > 0 ? "text-green-600" : ""}`}>
                    {stats.reduction.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {files.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            <Files className="w-12 h-12 mx-auto mb-4" />
            <p>Add files to begin bulk minification</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
