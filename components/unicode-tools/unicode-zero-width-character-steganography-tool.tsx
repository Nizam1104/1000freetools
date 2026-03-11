"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeZeroWidthCharacterSteganographyTool() {
  const [input, setInput] = useState("");
  const [coverText, setCoverText] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  // Zero-width characters for encoding
  const zeroWidthChars = {
    "0": "\u200B", // Zero Width Space
    "1": "\u200C", // Zero Width Non-Joiner
  };

  const binaryToZeroWidth = (binary: string) => {
    return binary.split("").map((bit) => zeroWidthChars[bit as "0" | "1"]).join("");
  };

  const zeroWidthToBinary = (text: string) => {
    let binary = "";
    for (const char of text) {
      if (char === zeroWidthChars["0"]) binary += "0";
      else if (char === zeroWidthChars["1"]) binary += "1";
    }
    return binary;
  };

  const textToBinary = (text: string) => {
    return Array.from(text)
      .map((char) => char.codePointAt(0)?.toString(2).padStart(8, "0") || "")
      .join("");
  };

  const binaryToText = (binary: string) => {
    const chars: string[] = [];
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      if (byte.length === 8) {
        chars.push(String.fromCodePoint(parseInt(byte, 2)));
      }
    }
    return chars.join("");
  };

  const encode = (message: string, cover: string) => {
    const binary = textToBinary(message);
    const zeroWidth = binaryToZeroWidth(binary);
    // Insert zero-width characters after each character in cover text
    const result = cover.split("").map((char, i) => {
      const zw = zeroWidth.substr(i * 8, 8) || "";
      return char + zw;
    }).join("");
    return result + zeroWidth.substr(cover.length * 8);
  };

  const decode = (text: string) => {
    const binary = zeroWidthToBinary(text);
    return binaryToText(binary);
  };

  const handleConvert = () => {
    if (!input) return;

    if (mode === "encode") {
      const cover = coverText || "This is a normal looking text that contains a hidden message.";
      setOutput(encode(input, cover));
    } else {
      setOutput(decode(input));
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setCoverText("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Zero-Width Character Steganography Tool</h2>
        <p className="text-sm text-muted-foreground">
          Encode and decode hidden messages using zero-width Unicode characters
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encode")}
            >
              Encode (Hide Message)
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("decode")}
            >
              Decode (Reveal Message)
            </Button>
          </div>

          {mode === "encode" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="message">Secret Message</Label>
                <textarea
                  id="message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter the secret message to hide..."
                  className="w-full min-h-[80px] p-3 font-mono text-sm rounded-md border border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover">Cover Text (optional)</Label>
                <textarea
                  id="cover"
                  value={coverText}
                  onChange={(e) => setCoverText(e.target.value)}
                  placeholder="Enter cover text or leave empty for default..."
                  className="w-full min-h-[80px] p-3 rounded-md border border-input"
                />
                <p className="text-xs text-muted-foreground">
                  The secret message will be hidden within this text using invisible characters.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="encoded">Text with Hidden Message</Label>
              <textarea
                id="encoded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste text that may contain a hidden message..."
                className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
              />
              <p className="text-xs text-muted-foreground">
                The text may look normal but could contain hidden zero-width characters.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {mode === "encode" ? "Hide Message" : "Reveal Message"}
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
          {mode === "encode" ? "Hide" : "Reveal"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">
                {mode === "encode" ? "Encoded Text (copy and share)" : "Decoded Message"}
              </Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded text-sm">
                {output}
              </pre>
              {mode === "encode" && (
                <p className="text-xs text-muted-foreground mt-2">
                  The output looks identical to the cover text but contains hidden zero-width characters.
                </p>
              )}
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
        <h3 className="font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground mb-3">
          This tool uses zero-width Unicode characters to hide messages within normal text:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Each character of your message is converted to binary (8 bits)</li>
          <li>Binary 0 = Zero Width Space (U+200B)</li>
          <li>Binary 1 = Zero Width Non-Joiner (U+200C)</li>
          <li>The zero-width characters are inserted into the cover text</li>
          <li>The result looks identical to normal text but contains hidden data</li>
        </ul>
      </Card>
    </div>
  );
}
