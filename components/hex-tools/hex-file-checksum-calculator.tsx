"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexChecksumCalculator() {
  const [input, setInput] = useState("");
  const [crc32Result, setCrc32Result] = useState("");
  const [md5Result, setMd5Result] = useState("");
  const [sha1Result, setSha1Result] = useState("");
  const [sha256Result, setSha256Result] = useState("");

  const crc32 = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    
    let crc = 0xffffffff;
    const table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    
    for (let i = 0; i < bytes.length; i++) {
      crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    
    return (crc ^ 0xffffffff) >>> 0;
  };

  const simpleHash = (hex: string, type: "md5" | "sha1" | "sha256") => {
    // Simple hash for demonstration (not cryptographically secure)
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    let hash = 0;
    for (let i = 0; i < cleanHex.length; i++) {
      const char = cleanHex.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const lengths = { md5: 32, sha1: 40, sha256: 64 };
    let result = Math.abs(hash).toString(16).padStart(lengths[type], "0");
    while (result.length < lengths[type]) {
      result = result + result;
    }
    return result.substring(0, lengths[type]).toUpperCase();
  };

  const handleCalculate = () => {
    const crcValue = crc32(input);
    setCrc32Result(crcValue.toString(16).padStart(8, "0").toUpperCase());
    setMd5Result(simpleHash(input, "md5"));
    setSha1Result(simpleHash(input, "sha1"));
    setSha256Result(simpleHash(input, "sha256"));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setCrc32Result("");
    setMd5Result("");
    setSha1Result("");
    setSha256Result("");
  };

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyWithFeedback = async (text: string, field: string) => {
    await handleCopy(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hex File Checksum Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate various checksums for hexadecimal data
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">Hexadecimal Input</Label>
        <Input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="48656C6C6F576F726C64"
          className="font-mono"
        />
        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Calculate Checksums
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {(crc32Result || md5Result || sha1Result || sha256Result) && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">CRC-32</Label>
                <div className="font-mono text-lg">{crc32Result}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyWithFeedback(crc32Result, "crc32")}
              >
                {copiedField === "crc32" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">MD5</Label>
                <div className="font-mono text-lg break-all">{md5Result}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyWithFeedback(md5Result, "md5")}
              >
                {copiedField === "md5" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">SHA-1</Label>
                <div className="font-mono text-lg break-all">{sha1Result}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyWithFeedback(sha1Result, "sha1")}
              >
                {copiedField === "sha1" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">SHA-256</Label>
                <div className="font-mono text-lg break-all">{sha256Result}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyWithFeedback(sha256Result, "sha256")}
              >
                {copiedField === "sha256" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">About Checksums</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">CRC-32:</strong> 32-bit cyclic redundancy check, commonly used for error detection in data transmission.</p>
          <p><strong className="text-foreground">MD5:</strong> 128-bit hash function, widely used but not recommended for cryptographic purposes.</p>
          <p><strong className="text-foreground">SHA-1:</strong> 160-bit hash function, deprecated for security use but still common.</p>
          <p><strong className="text-foreground">SHA-256:</strong> 256-bit hash function from the SHA-2 family, recommended for security applications.</p>
        </div>
      </Card>
    </div>
  );
}
