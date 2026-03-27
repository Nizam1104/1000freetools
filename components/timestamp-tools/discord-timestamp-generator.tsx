"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function DiscordTimestampGenerator() {
  const [timestamp, setTimestamp] = useState("");
  const [style, setStyle] = useState<"t" | "T" | "d" | "D" | "f" | "F" | "R">("f");
  const [output, setOutput] = useState("");

  const styleLabels: Record<string, string> = {
    t: "Short Time (16:20)",
    T: "Long Time (16:20:30)",
    d: "Short Date (20/01/2024)",
    D: "Long Date (20 January 2024)",
    f: "Short DateTime (20 January 2024 16:20)",
    F: "Long DateTime (Saturday, 20 January 2024 16:20)",
    R: "Relative Time (2 months ago)",
  };

  const generateDiscordTimestamp = () => {
    if (!timestamp) return;

    const ts = parseInt(timestamp);
    const isMilliseconds = ts > 10000000000;
    const seconds = isMilliseconds ? Math.floor(ts / 1000) : ts;

    setOutput(`<t:${seconds}:${style}>`);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setTimestamp("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Unix Timestamp (seconds)</Label>
            <Input
              id="timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1705312200"
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>Display Style</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.entries(styleLabels) as [string, string][]).map(([value, label]) => (
                <Button
                  key={value}
                  variant={style === value ? "default" : "outline"}
                  onClick={() => setStyle(value as typeof style)}
                  className="justify-start"
                >
                  <span className="font-mono mr-2">&lt;t:...:{value}&gt;</span>
                  <span className="text-muted-foreground text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateDiscordTimestamp} disabled={!timestamp} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Generate
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={generateDiscordTimestamp} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">Discord Timestamp</Label>
              <div className="text-2xl font-mono font-bold mt-1">{output}</div>
              <div className="text-muted-foreground mt-1">
                Preview: {style === "R" ? "Relative time" : new Date(parseInt(timestamp) > 10000000000 ? parseInt(timestamp) : parseInt(timestamp) * 1000).toLocaleString()}
              </div>
            </div>
            <Button
              variant="outline"
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
        <h3 className="font-semibold mb-2">Style Examples</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>&lt;t:1705312200:t&gt;</span>
            <span>16:20</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>&lt;t:1705312200:d&gt;</span>
            <span>20/01/2024</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>&lt;t:1705312200:f&gt;</span>
            <span>20 January 2024 16:20</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>&lt;t:1705312200:R&gt;</span>
            <span>2 months ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
