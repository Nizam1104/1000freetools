"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function Iso8601TimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [output, setOutput] = useState("");
  const [includeTimezone, setIncludeTimezone] = useState(true);

  const handleConvert = () => {
    if (!input) return;

    if (mode === "to") {
      // ISO to Unix timestamp
      const date = new Date(input);
      if (!isNaN(date.getTime())) {
        const seconds = Math.floor(date.getTime() / 1000);
        setOutput(`${seconds}\nMilliseconds: ${date.getTime()}`);
      } else {
        setOutput("Invalid ISO date format");
      }
    } else {
      // Unix timestamp to ISO
      const ts = parseInt(input);
      if (!isNaN(ts)) {
        const date = new Date(ts > 10000000000 ? ts : ts * 1000);
        let iso = date.toISOString();
        if (!includeTimezone) {
          iso = iso.replace("Z", "");
        }
        setOutput(iso);
      } else {
        setOutput("Invalid timestamp");
      }
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Invalid")) {
      await navigator.clipboard.writeText(output.split("\n")[0]);
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
        <h2 className="text-2xl font-bold">ISO 8601 Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between ISO 8601 formatted date-time strings and Unix timestamps
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "to" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("to")}
            >
              ISO → Unix
            </Button>
            <Button
              variant={mode === "from" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("from")}
            >
              Unix → ISO
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "to" ? "ISO 8601 Date" : "Unix Timestamp"}
            </Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "to" ? "2024-01-15T10:30:00Z" : "1705312200"}
              className="font-mono"
            />
          </div>

          {mode === "from" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="timezone"
                checked={includeTimezone}
                onChange={(e) => setIncludeTimezone(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="timezone" className="text-sm">
                Include timezone (Z suffix)
              </Label>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className={`p-4 ${output.startsWith("Invalid") ? "border-destructive" : ""}`}>
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Result</Label>
              <pre className={`font-mono mt-2 whitespace-pre-wrap ${output.startsWith("Invalid") ? "text-destructive" : ""}`}>
                {output}
              </pre>
            </div>
            {!output.startsWith("Invalid") && (
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
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">ISO 8601 Examples</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>2024-01-15T10:30:00Z</span>
            <span className="text-muted-foreground">UTC</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>2024-01-15T10:30:00+05:30</span>
            <span className="text-muted-foreground">IST</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>2024-01-15T10:30:00-08:00</span>
            <span className="text-muted-foreground">PST</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>2024-01-15</span>
            <span className="text-muted-foreground">Date only</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
