"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeNormalizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [form, setForm] = useState<"NFC" | "NFD" | "NFKC" | "NFKD">("NFC");

  const normalize = (text: string, normalizationForm: typeof form) => {
    return text.normalize(normalizationForm);
  };

  const handleNormalize = () => {
    if (!input) return;
    setOutput(normalize(input, form));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Normalizer</h2>
        <p className="text-sm text-muted-foreground">
          Normalize Unicode text to any of the four standard normalization forms
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["NFC", "NFD", "NFKC", "NFKD"] as const).map((f) => (
              <Button
                key={f}
                variant={form === f ? "default" : "outline"}
                size="sm"
                onClick={() => setForm(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to normalize..."
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleNormalize} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Normalize ({form})
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleNormalize} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Normalize
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Normalized Output ({form})</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded">
                {output}
              </pre>
              <div className="text-xs text-muted-foreground mt-2">
                Length: {output.length} characters | Bytes (UTF-8): {new TextEncoder().encode(output).length}
              </div>
            </div>
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
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Normalization Forms</h3>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-muted rounded">
            <div className="font-semibold">NFC (Canonical Decomposition, followed by Canonical Composition)</div>
            <div className="text-muted-foreground">Most common form. Combines characters where possible. Used by macOS filesystem.</div>
            <div className="font-mono text-xs mt-1">é (U+00E9) stays as é</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="font-semibold">NFD (Canonical Decomposition)</div>
            <div className="text-muted-foreground">Decomposes characters. Used for searching and comparison.</div>
            <div className="font-mono text-xs mt-1">é becomes e + ́ (U+0065 U+0301)</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="font-semibold">NFKC (Compatibility Decomposition, followed by Canonical Composition)</div>
            <div className="text-muted-foreground">Also normalizes compatibility characters. Recommended for identifiers.</div>
            <div className="font-mono text-xs mt-1">ﬁ becomes fi, ² becomes 2</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="font-semibold">NFKD (Compatibility Decomposition)</div>
            <div className="text-muted-foreground">Full decomposition including compatibility characters.</div>
            <div className="font-mono text-xs mt-1">ﬁ becomes f + i, ² becomes 2</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
