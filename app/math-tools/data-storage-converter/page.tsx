"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  byte: 1,
  kilobyte: 1024,
  megabyte: 1024 * 1024,
  gigabyte: 1024 * 1024 * 1024,
  terabyte: 1024 * 1024 * 1024 * 1024,
  petabyte: 1024 * 1024 * 1024 * 1024 * 1024,
};

const unitLabels: Record<string, string> = {
  byte: "Bytes (B)",
  kilobyte: "Kilobytes (KB)",
  megabyte: "Megabytes (MB)",
  gigabyte: "Gigabytes (GB)",
  terabyte: "Terabytes (TB)",
  petabyte: "Petabytes (PB)",
};

export default function DataStorageConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("megabyte");
  const [toUnit, setToUnit] = useState("gigabyte");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const bytes = val * units[fromUnit];
    const converted = bytes / units[toUnit];
    setResult(converted);
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const loadExample = (type: string) => {
    const examples: Record<string, { value: string; from: string; to: string }> = {
      mb_gb: { value: "1024", from: "megabyte", to: "gigabyte" },
      gb_tb: { value: "500", from: "gigabyte", to: "terabyte" },
      kb_mb: { value: "512", from: "kilobyte", to: "megabyte" },
      tb_pb: { value: "1000", from: "terabyte", to: "petabyte" },
      bytes_kb: { value: "8192", from: "byte", to: "kilobyte" },
      gb_mb: { value: "2", from: "gigabyte", to: "megabyte" },
      pb_tb: { value: "1", from: "petabyte", to: "terabyte" }
    };
    const ex = examples[type] || examples.mb_gb;
    setValue(ex.value);
    setFromUnit(ex.from);
    setToUnit(ex.to);
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(10)).toString();
  };

  const getUnitSymbol = (unit: string): string => {
    const symbols: Record<string, string> = {
      byte: "B",
      kilobyte: "KB",
      megabyte: "MB",
      gigabyte: "GB",
      terabyte: "TB",
      petabyte: "PB",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Data Storage Converter – Convert KB, MB, GB, TB Online</h1>
        <p className="text-muted-foreground">
          Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); setResult(null); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swap} className="w-12 h-10 p-0">⇄</Button>
          </div>

          <div className="md:col-span-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg min-h-[42px] flex items-center">
                {result !== null ? `${round(result)} ${getUnitSymbol(toUnit)}` : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("mb_gb")}>MB→GB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("gb_tb")}>GB→TB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("kb_mb")}>KB→MB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("tb_pb")}>TB→PB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("bytes_kb")}>B→KB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("gb_mb")}>GB→MB</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pb_tb")}>PB→TB</Button>
        </div>

        {result !== null && value && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conversion Formula</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {getUnitSymbol(fromUnit)} = {round(result)} {getUnitSymbol(toUnit)}
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Digital Storage Units</h2>
        <p className="text-muted-foreground">
          Digital storage is measured in bytes – a single byte can store one character of text. But modern files are much larger, so we use bigger units: kilobytes (thousands of bytes), megabytes (millions), gigabytes (billions), terabytes (trillions), and petabytes (quadrillions).
        </p>
        <p className="text-muted-foreground">
          Here's where it gets interesting: computers use binary (base 2), not decimal (base 10). So a kilobyte isn't 1,000 bytes – it's 1,024 bytes (2¹⁰). Each step up multiplies by 1,024, not 1,000. This is why a "500 GB" hard drive shows up as about 465 GB in your operating system – the manufacturer uses decimal, but your computer uses binary.
        </p>
        <p className="text-muted-foreground">
          Understanding these conversions helps you make sense of file sizes, storage capacity, and data usage. Is 50 GB enough for your phone? Can that USB drive hold your photo collection? This converter helps you answer those questions.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Storage Unit Reference</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4">
            Each unit = 1,024 of the previous unit (binary system)
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Byte (B)</span>
                <span className="text-muted-foreground">1 character</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Kilobyte (KB)</span>
                <span className="text-muted-foreground">1,024 bytes</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Megabyte (MB)</span>
                <span className="text-muted-foreground">1,024 KB</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Gigabyte (GB)</span>
                <span className="text-muted-foreground">1,024 MB</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Terabyte (TB)</span>
                <span className="text-muted-foreground">1,024 GB</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Petabyte (PB)</span>
                <span className="text-muted-foreground">1,024 TB</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Exabyte (EB)</span>
                <span className="text-muted-foreground">1,024 PB</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-semibold">1 Zettabyte (ZB)</span>
                <span className="text-muted-foreground">1,024 EB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Real-World Size Examples</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">1 KB:</span> Short email or text document
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">1 MB:</span> 1-minute MP3 song or high-res photo
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">1 GB:</span> 1-hour HD video or 250 songs
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">1 TB:</span> 250,000 photos or 500 hours of HD video
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">1 PB:</span> 13 years of HD video or 500 billion pages of text
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Common Storage Capacities</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Smartphone:</span> 64 GB - 512 GB
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Laptop SSD:</span> 256 GB - 2 TB
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">External HDD:</span> 1 TB - 5 TB
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Desktop HDD:</span> 2 TB - 10 TB
              </div>
              <div className="p-2 bg-muted rounded">
                <span className="font-semibold">Enterprise Storage:</span> 10 TB - 100+ TB
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Converting MB to GB</h3>
            <p className="text-sm text-muted-foreground mb-3">Your phone shows 2,048 MB used. How many GB is that?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Given:</strong> 2,048 MB</div>
              <div><strong>Conversion:</strong> 1 GB = 1,024 MB</div>
              <div className="pt-2 border-t font-mono">
                2,048 MB ÷ 1,024 = 2 GB
              </div>
              <div className="text-muted-foreground">
                Your phone is using exactly 2 GB of storage.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Hard Drive Capacity</h3>
            <p className="text-sm text-muted-foreground mb-3">A hard drive is advertised as 2 TB. How many GB is that?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Given:</strong> 2 TB</div>
              <div><strong>Conversion:</strong> 1 TB = 1,024 GB</div>
              <div className="pt-2 border-t font-mono">
                2 TB × 1,024 = 2,048 GB
              </div>
              <div className="text-muted-foreground">
                The drive has 2,048 GB of storage space.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Photo Storage</h3>
            <p className="text-sm text-muted-foreground mb-3">Each photo is 5 MB. How many photos fit on a 64 GB card?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Card capacity:</strong> 64 GB = 64 × 1,024 = 65,536 MB</div>
              <div><strong>Photo size:</strong> 5 MB each</div>
              <div className="pt-2 border-t font-mono">
                65,536 MB ÷ 5 MB = 13,107 photos
              </div>
              <div className="text-muted-foreground">
                You can store approximately 13,000 photos on a 64 GB card.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Video Streaming Data</h3>
            <p className="text-sm text-muted-foreground mb-3">HD streaming uses about 3 GB per hour. How many TB for 100 hours?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Usage rate:</strong> 3 GB/hour</div>
              <div><strong>Total hours:</strong> 100 hours</div>
              <div><strong>Total GB:</strong> 3 × 100 = 300 GB</div>
              <div className="pt-2 border-t font-mono">
                300 GB ÷ 1,024 = 0.293 TB
              </div>
              <div className="text-muted-foreground">
                100 hours of HD streaming uses about 0.29 TB of data.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 5: File Transfer Time</h3>
            <p className="text-sm text-muted-foreground mb-3">How long to transfer 500 MB at 100 Mbps?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>File size:</strong> 500 MB = 500 × 8 = 4,000 megabits</div>
              <div><strong>Speed:</strong> 100 megabits per second</div>
              <div className="pt-2 border-t font-mono">
                4,000 Mb ÷ 100 Mbps = 40 seconds
              </div>
              <div className="text-muted-foreground">
                Note: Mbps (megabits/second) is different from MB/s (megabytes/second). 1 byte = 8 bits.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>The term "byte"</strong> was coined by Werner Buchholz in 1956 while working on the IBM Stretch computer. It's a deliberate respelling of "bite" to avoid confusion with "bit" (binary digit). A byte was originally 6 bits, but settled at 8 bits (enough for one ASCII character) by the 1960s. The prefixes kilo-, mega-, giga- come from Greek numbers, but in computing they mean powers of 1,024 (2¹⁰), not 1,000. To reduce confusion, the IEC introduced binary prefixes in 1998: KiB (kibibyte = 1,024 bytes), MiB (mebibyte), GiB (gibibyte), but the old terms remain more common.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is 1 KB equal to 1,024 bytes and not 1,000?</h3>
            <p className="text-sm text-muted-foreground">
              Computers use binary (base 2), not decimal (base 10). 2¹⁰ = 1,024, which is close to 1,000, so "kilo" was adopted. This pattern continues: 2²⁰ = 1,048,576 (called "mega"), 2³⁰ = 1,073,741,824 (called "giga"). Storage manufacturers sometimes use decimal (1 KB = 1,000 bytes), which is why a "500 GB" drive shows as ~465 GB in your OS.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between Mbps and MB/s?</h3>
            <p className="text-sm text-muted-foreground">
              Mbps (megabits per second) measures network speed. MB/s (megabytes per second) measures file transfer speed. Since 1 byte = 8 bits, divide Mbps by 8 to get MB/s. A 100 Mbps connection transfers at about 12.5 MB/s. Internet speeds are advertised in Mbps; file sizes are in MB or GB.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How much storage do I really need?</h3>
            <p className="text-sm text-muted-foreground">
              For basic use (web, email, documents): 128-256 GB. For photos and moderate apps: 256-512 GB. For gaming or video editing: 512 GB - 1 TB minimum. Professional video work: 1+ TB plus external storage. Cloud storage can supplement local storage for files you don't need constant access to.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why does my USB drive show less capacity than advertised?</h3>
            <p className="text-sm text-muted-foreground">
              Two reasons: (1) Manufacturers use decimal (1 GB = 1,000,000,000 bytes) while computers use binary (1 GB = 1,073,741,824 bytes). A "64 GB" drive has 64,000,000,000 bytes, which equals about 59.6 GiB in binary. (2) Some space is used for the file system overhead.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is a petabyte used for?</h3>
            <p className="text-sm text-muted-foreground">
              Petabytes are used for massive data operations: Google processes over 20 PB per day. The Wayback Machine stores 700+ PB of web archives. Large scientific projects (particle physics, astronomy, genomics) generate petabytes of data. Netflix's entire library is estimated at several petabytes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I convert between binary and decimal storage?</h3>
            <p className="text-sm text-muted-foreground">
              To convert from decimal (manufacturer) to binary (OS): multiply by 1,000³ and divide by 1,024³. Example: 500 GB (decimal) = 500 × 1,000,000,000 ÷ 1,073,741,824 = 465.66 GiB. To convert binary to decimal: multiply by 1,024³ and divide by 1,000³.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What comes after petabyte?</h3>
            <p className="text-sm text-muted-foreground">
              After petabyte (PB) comes exabyte (EB, 1,024 PB), zettabyte (ZB, 1,024 EB), and yottabyte (YB, 1,024 ZB). The total data created globally is measured in zettabytes – about 120 ZB was created in 2023. A yottabyte is so large it could store all the atoms in about 100 million Earths (if each atom stored one byte).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
