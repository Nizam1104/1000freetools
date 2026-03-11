"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberSorterOrganizer() {
  const [input, setInput] = useState("");
  const [sortedAsc, setSortedAsc] = useState<number[]>([]);
  const [sortedDesc, setSortedDesc] = useState<number[]>([]);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [separator, setSeparator] = useState<"comma" | "space" | "newline">("comma");

  const parseNumbers = (str: string) => {
    const separators = {
      comma: ",",
      space: /\s+/,
      newline: /\n+/,
    };
    return str
      .split(separators[separator])
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  };

  const handleSort = () => {
    const numbers = parseNumbers(input);
    
    let asc = [...numbers].sort((a, b) => a - b);
    let desc = [...numbers].sort((a, b) => b - a);
    
    if (removeDuplicates) {
      asc = [...new Set(asc)];
      desc = [...new Set(desc)];
    }
    
    setSortedAsc(asc);
    setSortedDesc(desc);
  };

  const handleClear = () => {
    setInput("");
    setSortedAsc([]);
    setSortedDesc([]);
  };

  const getStats = (numbers: number[]) => {
    if (numbers.length === 0) return null;
    return {
      count: numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      sum: numbers.reduce((a, b) => a + b, 0),
      avg: numbers.reduce((a, b) => a + b, 0) / numbers.length,
      range: Math.max(...numbers) - Math.min(...numbers),
    };
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const stats = getStats(sortedAsc);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Sorter and Organizer</h2>
        <p className="text-sm text-muted-foreground">
          Sort numbers, remove duplicates, and calculate statistics
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="removeDuplicates"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="removeDuplicates" className="text-sm">Remove duplicates</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Label className="text-sm">Input separator:</Label>
            <div className="flex gap-2">
              {(["comma", "space", "newline"] as const).map((s) => (
                <Button
                  key={s}
                  variant={separator === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSeparator(s)}
                >
                  {s === "comma" ? "Comma" : s === "space" ? "Space" : "Newline"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="input">Numbers</Label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="5, 2, 8, 1, 9, 3, 7, 4, 6"
          className="w-full min-h-[100px] p-3 font-mono rounded-md border border-input"
        />
        <div className="flex gap-2">
          <Button onClick={handleSort} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Sort Numbers
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {stats && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Count</div>
              <div className="text-xl font-bold">{stats.count}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Minimum</div>
              <div className="text-xl font-bold font-mono">{stats.min}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Maximum</div>
              <div className="text-xl font-bold font-mono">{stats.max}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sum</div>
              <div className="text-xl font-bold font-mono">{stats.sum}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average</div>
              <div className="text-xl font-bold font-mono">{stats.avg.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Range</div>
              <div className="text-xl font-bold font-mono">{stats.range}</div>
            </div>
          </div>
        </Card>
      )}

      {(sortedAsc.length > 0 || sortedDesc.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Label>Ascending Order</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(sortedAsc.join(", "))}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="font-mono text-sm break-all">{sortedAsc.join(", ")}</div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Label>Descending Order</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(sortedDesc.join(", "))}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="font-mono text-sm break-all">{sortedDesc.join(", ")}</div>
          </Card>
        </div>
      )}
    </div>
  );
}
