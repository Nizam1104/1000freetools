"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function MacFileTimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"mac" | "windows" | "unix">("mac");
  const [output, setOutput] = useState("");

  // Mac Absolute Time epoch: January 1, 1904
  const MAC_EPOCH = -2082844800000; // milliseconds from Unix epoch
  
  // Windows FILETIME epoch: January 1, 1601
  const WINDOWS_EPOCH = -11644473600000; // milliseconds from Unix epoch
  const WINDOWS_TICKS_PER_MS = 10000;

  const convertMacToUnix = (macSeconds: number) => {
    return Math.floor((macSeconds * 1000 - MAC_EPOCH) / 1000);
  };

  const convertUnixToMac = (unixSeconds: number) => {
    return Math.floor((unixSeconds * 1000 + MAC_EPOCH) / 1000);
  };

  const convertWindowsToUnix = (filetime: string) => {
    const ticks = BigInt(filetime.replace(/[^0-9]/g, ""));
    const ms = Number(ticks / BigInt(WINDOWS_TICKS_PER_MS));
    return Math.floor((ms + WINDOWS_EPOCH) / 1000);
  };

  const convertUnixToWindows = (unixSeconds: number) => {
    const ms = unixSeconds * 1000 - WINDOWS_EPOCH;
    return (BigInt(ms) * BigInt(WINDOWS_TICKS_PER_MS)).toString();
  };

  const handleConvert = () => {
    if (!input) return;

    let result = "";

    if (mode === "mac") {
      const macTs = parseFloat(input);
      if (!isNaN(macTs)) {
        const unixTs = convertMacToUnix(macTs);
        result = `Unix Timestamp: ${unixTs}\nDate: ${new Date(unixTs * 1000).toLocaleString()}`;
      }
    } else if (mode === "windows") {
      const unixTs = convertWindowsToUnix(input);
      result = `Unix Timestamp: ${unixTs}\nDate: ${new Date(unixTs * 1000).toLocaleString()}`;
    } else {
      const unixTs = parseInt(input);
      if (!isNaN(unixTs)) {
        if (mode === "unix") {
          const macTs = convertUnixToMac(unixTs);
          const winTs = convertUnixToWindows(unixTs);
          result = `Mac Absolute Time: ${macTs} seconds\nWindows FILETIME: ${winTs}\nDate: ${new Date(unixTs * 1000).toLocaleString()}`;
        }
      }
    }

    setOutput(result);
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
        <h2 className="text-2xl font-bold">MAC & File Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert timestamps from various file systems to Unix timestamps
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "mac" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("mac")}
            >
              Mac Absolute
            </Button>
            <Button
              variant={mode === "windows" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("windows")}
            >
              Windows FILETIME
            </Button>
            <Button
              variant={mode === "unix" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("unix")}
            >
              Unix → All
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "mac" ? "Mac Absolute Time (seconds since 1904)" : 
               mode === "windows" ? "Windows FILETIME (100-nanosecond ticks)" :
               "Unix Timestamp (seconds)"}
            </Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "mac" ? "3786912000" :
                mode === "windows" ? "133500000000000000" :
                "1705312200"
              }
              className="font-mono"
            />
          </div>

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
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Result</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap">{output}</pre>
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
        <h3 className="font-semibold mb-2">Timestamp Epochs</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Unix Epoch</span>
            <span className="font-mono">Jan 1, 1970</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Mac Absolute Time</span>
            <span className="font-mono">Jan 1, 1904</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Windows FILETIME</span>
            <span className="font-mono">Jan 1, 1601</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
