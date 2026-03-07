"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function TextSizeCalculator() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!text) {
      return {
        bytes: 0,
        kb: 0,
        mb: 0,
        utf8Bytes: 0,
        asciiBytes: 0,
        ratio: 0
      };
    }

    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(text).length;

    let asciiBytes = 0;
    for (let i = 0; i < text.length; i++) {
      asciiBytes += text.charCodeAt(i) <= 127 ? 1 : 2;
    }

    const kb = utf8Bytes / 1024;
    const mb = utf8Bytes / (1024 * 1024);
    const ratio = text.length > 0 ? (utf8Bytes / text.length).toFixed(2) : "0";

    return {
      bytes: utf8Bytes,
      kb,
      mb,
      utf8Bytes,
      asciiBytes,
      ratio
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Label htmlFor="text-input" className="text-base font-medium block mb-2">
          Enter your text
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to calculate its size..."
          className="min-h-[150px] max-h-[500px] overflow-y-auto font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.bytes}</div>
          <div className="text-sm text-muted-foreground">Bytes</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.kb.toFixed(4)}</div>
          <div className="text-sm text-muted-foreground">Kilobytes (KB)</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.mb.toFixed(6)}</div>
          <div className="text-sm text-muted-foreground">Megabytes (MB)</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{text.length}</div>
          <div className="text-sm text-muted-foreground">Characters</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Encoding Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">UTF-8</span>
              <span className="font-mono">{stats.utf8Bytes} bytes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">ASCII (estimated)</span>
              <span className="font-mono">{stats.asciiBytes} bytes</span>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Character-to-Byte Ratio</h3>
          <div className="text-2xl font-bold mb-2">{stats.ratio}</div>
          <p className="text-sm text-muted-foreground">
            Average bytes per character. UTF-8 uses 1-4 bytes per character depending on the character.
          </p>
        </div>
      </div>

      {text.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {stats.utf8Bytes > stats.asciiBytes && (
              <span>Text contains non-ASCII characters (uses more bytes in UTF-8)</span>
            )}
            {stats.utf8Bytes === stats.asciiBytes && (
              <span>All characters are ASCII (1 byte each)</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Text"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!text}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
