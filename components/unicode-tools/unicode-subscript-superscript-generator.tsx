"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeSubscriptSuperscriptGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"sub" | "super">("super");

  const superscripts: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
    "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ",
    "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ⁱ", "j": "ʲ",
    "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ",
    "p": "ᵖ", "r": "ʳ", "s": "ˢ", "t": "ᵗ", "u": "ᵘ",
    "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ", "z": "ᶻ",
    "A": "ᴬ", "B": "ᴮ", "D": "ᴰ", "E": "ᴱ", "G": "ᴳ",
    "H": "ᴴ", "I": "ᴵ", "J": "ᴶ", "K": "ᴷ", "L": "ᴸ",
    "M": "ᴹ", "N": "ᴺ", "O": "ᴼ", "P": "ᴾ", "R": "ᴿ",
    "T": "ᵀ", "U": "ᵁ", "V": "ⱽ", "W": "ᵂ",
  };

  const subscripts: Record<string, string> = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
    "a": "ₐ", "e": "ₑ", "h": "ₕ", "i": "ᵢ", "j": "ⱼ",
    "k": "ₖ", "l": "ₗ", "m": "ₘ", "n": "ₙ", "o": "ₒ",
    "p": "ₚ", "r": "ᵣ", "s": "ₛ", "t": "ₜ", "u": "ᵤ",
    "v": "ᵥ", "x": "ₓ",
  };

  const convert = (text: string, m: typeof mode) => {
    const map = m === "super" ? superscripts : subscripts;
    return text.split("").map((char) => map[char] || char).join("");
  };

  const handleConvert = () => {
    if (!input) return;
    setOutput(convert(input, mode));
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
        <h2 className="text-2xl font-bold">Unicode Subscript & Superscript Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate subscript and superscript text using Unicode characters
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "super" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("super")}
            >
              Superscript (x²)
            </Button>
            <Button
              variant={mode === "sub" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("sub")}
            >
              Subscript (H₂O)
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "super" ? "x2 + y2 = z2" : "H2O"}
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
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">Output</Label>
              <div className="text-2xl font-mono mt-1">{output}</div>
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
        <h3 className="font-semibold mb-2">Available Characters</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Superscripts</h4>
            <div className="text-lg font-mono">
              ⁰¹²³⁴⁵⁶⁷⁸⁹ ⁺⁻⁼⁽⁾ ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ ᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Subscripts</h4>
            <div className="text-lg font-mono">
              ₀₁₂₃₄₅₆₇₈₉ ₊₋₌₍₎ ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Mathematical: x² + y² = z²</span>
            <span className="font-mono">x2 + y2 = z2</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Chemical: H₂O, CO₂, H₂SO₄</span>
            <span className="font-mono">H2O, CO2, H2SO4</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Ordinal: 1ˢᵗ, 2ⁿᵈ, 3ʳᵈ, 4ᵗʰ</span>
            <span className="font-mono">1st, 2nd, 3rd, 4th</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
