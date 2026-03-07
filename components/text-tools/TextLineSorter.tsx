"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function TextLineSorter() {
  const [text, setText] = useState("");
  const [sortMethod, setSortMethod] = useState<"alphabetical" | "length" | "numeric" | "random">("alphabetical");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeBlanks, setRemoveBlanks] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";

    let lines = text.split('\n');

    if (trimWhitespace) {
      lines = lines.map(line => line.trim());
    }

    if (removeBlanks) {
      lines = lines.filter(line => line.length > 0);
    }

    lines.sort((a, b) => {
      if (sortMethod === "random") {
        return Math.random() - 0.5;
      }

      if (sortMethod === "length") {
        return order === "asc" ? a.length - b.length : b.length - a.length;
      }

      if (sortMethod === "numeric") {
        const numA = parseFloat(a) || 0;
        const numB = parseFloat(b) || 0;
        return order === "asc" ? numA - numB : numB - numA;
      }

      // Alphabetical
      const compareA = caseSensitive ? a : a.toLowerCase();
      const compareB = caseSensitive ? b : b.toLowerCase();
      return order === "asc" 
        ? compareA.localeCompare(compareB) 
        : compareB.localeCompare(compareA);
    });

    return lines.join('\n');
  }, [text, sortMethod, order, caseSensitive, removeBlanks, trimWhitespace]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
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
          placeholder="Paste your list here (one item per line)..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="sort-method" className="text-base font-medium block mb-2">
            Sort method
          </Label>
          <Select value={sortMethod} onValueChange={(v) => setSortMethod(v as typeof sortMethod)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="length">By length</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="random">Random (shuffle)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortMethod !== "random" && (
          <div>
            <Label htmlFor="order" className="text-base font-medium block mb-2">
              Order
            </Label>
            <Select value={order} onValueChange={(v) => setOrder(v as typeof order)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending (A-Z)</SelectItem>
                <SelectItem value="desc">Descending (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-4 pt-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="case-sensitive"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
              disabled={sortMethod === "random" || sortMethod === "length"}
            />
            <Label htmlFor="case-sensitive" className="text-sm">Case sensitive</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remove-blanks"
            checked={removeBlanks}
            onCheckedChange={(checked) => setRemoveBlanks(checked as boolean)}
          />
          <Label htmlFor="remove-blanks" className="text-sm">Remove blank lines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="trim-whitespace"
            checked={trimWhitespace}
            onCheckedChange={(checked) => setTrimWhitespace(checked as boolean)}
          />
          <Label htmlFor="trim-whitespace" className="text-sm">Trim whitespace</Label>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {text.trim() && (
            <span>{text.split('\n').filter(l => l.trim()).length} lines → {result.split('\n').filter(l => l.trim()).length} lines after sorting</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!result}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
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

      <div>
        <Label className="text-base font-medium block mb-2">Sorted Result</Label>
        <Textarea
          value={result}
          readOnly
          className="min-h-[200px] font-mono text-sm bg-muted"
          placeholder="Sorted result will appear here..."
        />
      </div>
    </div>
  );
}
