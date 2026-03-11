"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberScientificNotationConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sigFigs, setSigFigs] = useState<number | null>(null);
  const [notation, setNotation] = useState<"scientific" | "engineering" | "e">("scientific");

  const toScientific = (num: number, sigFigs: number | null, type: "scientific" | "engineering" | "e") => {
    if (num === 0) return type === "e" ? "0e+0" : "0 × 10⁰";
    
    const sign = num < 0 ? "-" : "";
    const absNum = Math.abs(num);
    
    let exponent = Math.floor(Math.log10(absNum));
    let mantissa = absNum / Math.pow(10, exponent);
    
    // Adjust for engineering notation (exponent must be multiple of 3)
    if (type === "engineering") {
      const adjustedExp = Math.floor(exponent / 3) * 3;
      mantissa = absNum / Math.pow(10, adjustedExp);
      exponent = adjustedExp;
      
      // Handle case where mantissa becomes >= 1000
      if (mantissa >= 1000) {
        mantissa /= 1000;
        exponent += 3;
      }
    }
    
    // Apply significant figures
    if (sigFigs !== null && sigFigs > 0) {
      mantissa = parseFloat(mantissa.toPrecision(sigFigs));
      // Re-adjust if rounding changed mantissa
      if (mantissa >= 10) {
        mantissa /= 10;
        exponent += 1;
      }
    } else {
      mantissa = parseFloat(mantissa.toPrecision(10));
    }
    
    if (type === "e") {
      return `${sign}${mantissa}e${exponent >= 0 ? "+" : ""}${exponent}`;
    }
    
    const expStr = exponent >= 0 ? `10^${exponent}` : `10^${exponent}`;
    return `${sign}${mantissa} × ${expStr}`;
  };

  const fromScientific = (str: string) => {
    // Handle e-notation
    const eMatch = str.match(/^(-?[\d.]+)e([+-]?\d+)$/i);
    if (eMatch) {
      const mantissa = parseFloat(eMatch[1]);
      const exponent = parseInt(eMatch[2]);
      return (mantissa * Math.pow(10, exponent)).toString();
    }
    
    // Handle × 10^n notation
    const timesMatch = str.match(/^(-?[\d.]+)\s*×?\s*10\^?(-?\d+)$/i);
    if (timesMatch) {
      const mantissa = parseFloat(timesMatch[1]);
      const exponent = parseInt(timesMatch[2]);
      return (mantissa * Math.pow(10, exponent)).toString();
    }
    
    return "Error: Invalid format";
  };

  const [mode, setMode] = useState<"to" | "from">("to");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (mode === "to") {
      const num = parseFloat(input);
      if (isNaN(num)) {
        setOutput("Error: Invalid number");
        return;
      }
      setOutput(toScientific(num, sigFigs, notation));
    } else {
      setOutput(fromScientific(input));
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Error")) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number to Scientific Notation Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert numbers between standard, scientific, and engineering notation
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "to" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("to")}
            >
              To Scientific
            </Button>
            <Button
              variant={mode === "from" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("from")}
            >
              From Scientific
            </Button>
          </div>

          {mode === "to" && (
            <>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Sig Figs:</Label>
                <Input
                  type="number"
                  min="1"
                  max="15"
                  placeholder="Auto"
                  value={sigFigs ?? ""}
                  onChange={(e) => setSigFigs(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-20 h-8"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Format:</Label>
                <div className="flex gap-2">
                  {(["scientific", "engineering", "e"] as const).map((n) => (
                    <Button
                      key={n}
                      variant={notation === n ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotation(n)}
                    >
                      {n === "scientific" ? "Scientific" : n === "engineering" ? "Engineering" : "E-notation"}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">{mode === "to" ? "Standard Number" : "Scientific Notation"}</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "to" ? "123456789" : "1.23e+8"}
            className="font-mono"
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
          <Label htmlFor="output">{mode === "to" ? "Scientific Notation" : "Standard Number"}</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output || output.startsWith("Error")}
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
            <div>123,456,789</div>
            <div>→ 1.23456789 × 10⁸</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>0.00000123</div>
            <div>→ 1.23 × 10⁻⁶</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>1,234,567 (Engineering)</div>
            <div>→ 1.234567 × 10⁶</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>1.23e+8</div>
            <div>→ 123,000,000</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
