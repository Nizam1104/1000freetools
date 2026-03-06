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

  const loadExample = () => {
    setValue("1024");
    setFromUnit("megabyte");
    setToUnit("gigabyte");
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

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Digital Storage Units</h2>
        <p className="text-muted-foreground">
          Digital storage is measured in bytes, with each larger unit being 1,024 times the previous one (binary system). This is different from the decimal system where each unit is 1,000 times larger. Understanding these units helps when comparing storage devices, file sizes, and data transfer limits.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Storage Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Binary System (Base 1024)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Kilobyte (KB) = 1,024 Bytes</li>
              <li>• 1 Megabyte (MB) = 1,024 KB = 1,048,576 Bytes</li>
              <li>• 1 Gigabyte (GB) = 1,024 MB = 1,073,741,824 Bytes</li>
              <li>• 1 Terabyte (TB) = 1,024 GB = 1,099,511,627,776 Bytes</li>
              <li>• 1 Petabyte (PB) = 1,024 TB = 1,125,899,906,842,624 Bytes</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Real-World Examples</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 KB: Small text file</li>
              <li>• 1 MB: 1 minute of MP3 audio</li>
              <li>• 1 GB: 1 hour of HD video</li>
              <li>• 1 TB: 250,000 photos or 500 hours of HD video</li>
              <li>• 1 PB: 500 billion pages of text</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Quick Reference Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">From</th>
                <th className="text-left p-3">To</th>
                <th className="text-left p-3">Multiply by</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Bytes</td>
                <td className="p-3">Kilobytes</td>
                <td className="p-3 font-mono">÷ 1,024</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Kilobytes</td>
                <td className="p-3">Megabytes</td>
                <td className="p-3 font-mono">÷ 1,024</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Megabytes</td>
                <td className="p-3">Gigabytes</td>
                <td className="p-3 font-mono">÷ 1,024</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Gigabytes</td>
                <td className="p-3">Terabytes</td>
                <td className="p-3 font-mono">÷ 1,024</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Terabytes</td>
                <td className="p-3">Petabytes</td>
                <td className="p-3 font-mono">÷ 1,024</td>
              </tr>
              <tr>
                <td className="p-3">Gigabytes</td>
                <td className="p-3">Megabytes</td>
                <td className="p-3 font-mono">× 1,024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Storage Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">GB to MB</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 2.5 GB to MB
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              2.5 GB × 1,024 = 2,560 MB
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">TB to GB</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 1.5 TB to GB
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              1.5 TB × 1,024 = 1,536 GB
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">MB to KB</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 50 MB to KB
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              50 MB × 1,024 = 51,200 KB
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is 1 KB equal to 1,024 bytes and not 1,000?</h3>
            <p className="text-sm text-muted-foreground">
              Computers use binary (base-2) system, so storage units are powers of 2. 2^10 = 1,024, which is close to 1,000. However, some manufacturers use 1,000 for marketing, which is why a "500 GB" drive shows less space in your OS.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between GB and GiB?</h3>
            <p className="text-sm text-muted-foreground">
              GB (gigabyte) uses decimal (1,000^3 = 1 billion bytes), while GiB (gibibyte) uses binary (1,024^3 = 1,073,741,824 bytes). Operating systems typically show GiB but label it as GB.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many GB is 1,000 MB?</h3>
            <p className="text-sm text-muted-foreground">
              1,000 MB equals approximately 0.977 GB (1,000 ÷ 1,024). For quick estimation, you can say roughly 1 GB.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How much storage do I need?</h3>
            <p className="text-sm text-muted-foreground">
              For basic use (documents, web browsing): 128-256 GB. For photos and moderate media: 512 GB-1 TB. For video editing or gaming: 1-2 TB or more.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/number-base-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Number Base Converter</p>
            <p className="text-xs text-muted-foreground">Binary, hex, octal</p>
          </a>
          <a href="/math-tools/bitwise-operations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Bitwise Operations</p>
            <p className="text-xs text-muted-foreground">AND, OR, XOR, shifts</p>
          </a>
          <a href="/math-tools/binary-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Binary Arithmetic</p>
            <p className="text-xs text-muted-foreground">Binary math operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
