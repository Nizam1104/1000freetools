"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function TextToBinaryConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", details: [] };

    if (mode === "text-to-binary") {
      const details = Array.from(input).map(char => ({
        char,
        binary: char.charCodeAt(0).toString(2).padStart(8, "0"),
        ascii: char.charCodeAt(0),
        hex: char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"),
        decimal: char.charCodeAt(0)
      }));
      const output = details.map(d => d.binary).join(" ");
      return { output, details };
    } else {
      const binaries = input.match(/[01]{8}/g) || [];
      const details = binaries.map(bin => ({
        char: String.fromCharCode(parseInt(bin, 2)),
        binary: bin,
        ascii: parseInt(bin, 2),
        hex: parseInt(bin, 2).toString(16).toUpperCase().padStart(2, "0"),
        decimal: parseInt(bin, 2)
      }));
      const output = details.map(d => d.char).join("");
      return { output, details };
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleSwap = () => {
    setMode(mode === "text-to-binary" ? "binary-to-text" : "text-to-binary");
    setInput("");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="text-to-binary">Text to Binary</TabsTrigger>
            <TabsTrigger value="binary-to-text">Binary to Text</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="icon" onClick={handleSwap}>
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="input" className="text-base font-medium block mb-2">
          {mode === "text-to-binary" ? "Enter text to convert" : "Enter binary to decode"}
        </Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "text-to-binary" ? "Hello World" : "01001000 01100101 01101100 01101100 01101111"}
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {result.details.length > 0 && `${result.details.length} ${mode === "text-to-binary" ? 'characters' : 'bytes'}`}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!result.output}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!input}
          >
            Clear
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium block mb-2">
          {mode === "text-to-binary" ? "Binary Output" : "Decoded Text"}
        </Label>
        <Textarea
          value={result.output}
          readOnly
          className="min-h-[100px] font-mono text-sm bg-muted"
          placeholder="Result will appear here..."
        />
      </div>

      {result.details.length > 0 && result.details.length <= 50 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Detailed Breakdown</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 bg-muted p-3 font-medium text-sm">
              <div className="col-span-1">Character</div>
              <div className="col-span-1">Binary</div>
              <div className="col-span-1">Decimal</div>
              <div className="col-span-1">Hex</div>
              <div className="col-span-1">ASCII</div>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {result.details.map((item, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-5 p-3 border-t text-sm font-mono"
                >
                  <div className="col-span-1">{item.char || "␀"}</div>
                  <div className="col-span-1">{item.binary}</div>
                  <div className="col-span-1">{item.decimal}</div>
                  <div className="col-span-1">{item.hex}</div>
                  <div className="col-span-1">{item.ascii}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
