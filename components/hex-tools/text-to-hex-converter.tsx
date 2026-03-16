"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TextToHexConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [delimiter, setDelimiter] = useState<"none" | "space" | "0x">("none");

  const textToHex = (text: string) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    
    let hexArray = Array.from(bytes).map((b) => {
      const hex = b.toString(16);
      return uppercase ? hex.padStart(2, "0").toUpperCase() : hex.padStart(2, "0");
    });
    
    if (delimiter === "space") {
      return hexArray.join(" ");
    } else if (delimiter === "0x") {
      return hexArray.map((h) => "0x" + h).join(" ");
    }
    
    return hexArray.join("");
  };

  const handleConvert = () => {
    setOutput(textToHex(input));
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
        <h2 className="text-2xl font-bold">Text to Hex Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert plain text to hexadecimal representation
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="uppercase" className="text-sm">Uppercase</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Label className="text-sm">Format:</Label>
            <div className="flex gap-2">
              {(["none", "space", "0x"] as const).map((d) => (
                <Button
                  key={d}
                  variant={delimiter === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDelimiter(d)}
                >
                  {d === "none" ? "Continuous" : d === "space" ? "Spaces" : "0x prefix"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">Text Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hello World"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">Hexadecimal Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="48656C6C6F20576F726C64"
            className="font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">"Hello"</div>
            <div>48656C6C6F</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">"A"</div>
            <div>41</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">"123"</div>
            <div>313233</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">"Hi" (with spaces)</div>
            <div>48 69</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
