"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeCharacterInspector() {
  const [input, setInput] = useState("");
  const [charDetails, setCharDetails] = useState<Array<{
    char: string;
    codePoint: number;
    name: string;
    category: string;
    block: string;
  }>>([]);

  const getUnicodeCategory = (code: number): string => {
    const char = String.fromCodePoint(code);
    
    if (/[\p{Lu}]/u.test(char)) return "Uppercase Letter";
    if (/[\p{Ll}]/u.test(char)) return "Lowercase Letter";
    if (/[\p{Lt}]/u.test(char)) return "Titlecase Letter";
    if (/[\p{Lm}]/u.test(char)) return "Modifier Letter";
    if (/[\p{Lo}]/u.test(char)) return "Other Letter";
    if (/[\p{Mn}]/u.test(char)) return "Nonspacing Mark";
    if (/[\p{Mc}]/u.test(char)) return "Spacing Mark";
    if (/[\p{Me}]/u.test(char)) return "Enclosing Mark";
    if (/[\p{Nd}]/u.test(char)) return "Decimal Number";
    if (/[\p{Nl}]/u.test(char)) return "Letter Number";
    if (/[\p{No}]/u.test(char)) return "Other Number";
    if (/[\p{Pc}]/u.test(char)) return "Connector Punctuation";
    if (/[\p{Pd}]/u.test(char)) return "Dash Punctuation";
    if (/[\p{Ps}]/u.test(char)) return "Open Punctuation";
    if (/[\p{Pe}]/u.test(char)) return "Close Punctuation";
    if (/[\p{Pi}]/u.test(char)) return "Initial Punctuation";
    if (/[\p{Pf}]/u.test(char)) return "Final Punctuation";
    if (/[\p{Po}]/u.test(char)) return "Other Punctuation";
    if (/[\p{Sm}]/u.test(char)) return "Math Symbol";
    if (/[\p{Sc}]/u.test(char)) return "Currency Symbol";
    if (/[\p{Sk}]/u.test(char)) return "Modifier Symbol";
    if (/[\p{So}]/u.test(char)) return "Other Symbol";
    if (/[\p{Zs}]/u.test(char)) return "Space Separator";
    if (/[\p{Zl}]/u.test(char)) return "Line Separator";
    if (/[\p{Zp}]/u.test(char)) return "Paragraph Separator";
    if (/[\p{Cc}]/u.test(char)) return "Control";
    if (/[\p{Cf}]/u.test(char)) return "Format";
    if (/[\p{Cs}]/u.test(char)) return "Surrogate";
    if (/[\p{Co}]/u.test(char)) return "Private Use";
    if (/[\p{Cn}]/u.test(char)) return "Unassigned";
    
    return "Unknown";
  };

  const getUnicodeBlock = (code: number): string => {
    const blocks: [number, number, string][] = [
      [0x0000, 0x007F, "Basic Latin"],
      [0x0080, 0x00FF, "Latin-1 Supplement"],
      [0x0100, 0x017F, "Latin Extended-A"],
      [0x0180, 0x024F, "Latin Extended-B"],
      [0x0370, 0x03FF, "Greek and Coptic"],
      [0x0400, 0x04FF, "Cyrillic"],
      [0x0530, 0x058F, "Armenian"],
      [0x0590, 0x05FF, "Hebrew"],
      [0x0600, 0x06FF, "Arabic"],
      [0x0900, 0x097F, "Devanagari"],
      [0x4E00, 0x9FFF, "CJK Unified Ideographs"],
      [0x3040, 0x309F, "Hiragana"],
      [0x30A0, 0x30FF, "Katakana"],
      [0x1F600, 0x1F64F, "Emoticons"],
      [0x1F300, 0x1F5FF, "Miscellaneous Symbols and Pictographs"],
      [0x2600, 0x26FF, "Miscellaneous Symbols"],
      [0x2700, 0x27BF, "Dingbats"],
      [0x2000, 0x206F, "General Punctuation"],
      [0x2070, 0x209F, "Superscripts and Subscripts"],
      [0x20A0, 0x20CF, "Currency Symbols"],
      [0x2100, 0x214F, "Letterlike Symbols"],
      [0x2150, 0x218F, "Number Forms"],
      [0x2190, 0x21FF, "Arrows"],
      [0x2200, 0x22FF, "Mathematical Operators"],
      [0x2300, 0x23FF, "Miscellaneous Technical"],
      [0x2400, 0x243F, "Control Pictures"],
      [0x2440, 0x245F, "Optical Character Recognition"],
      [0x2460, 0x24FF, "Enclosed Alphanumerics"],
      [0x2500, 0x257F, "Box Drawing"],
      [0x2580, 0x259F, "Block Elements"],
      [0x25A0, 0x25FF, "Geometric Shapes"],
      [0xFE00, 0xFE0F, "Variation Selectors"],
      [0xFFF0, 0xFFFF, "Specials"],
    ];

    for (const [start, end, name] of blocks) {
      if (code >= start && code <= end) {
        return name;
      }
    }
    
    return "Unknown Block";
  };

  const inspectCharacters = () => {
    if (!input) return;

    const details = Array.from(input).map((char) => {
      const code = char.codePointAt(0) || 0;
      return {
        char,
        codePoint: code,
        name: getCharName(code),
        category: getUnicodeCategory(code),
        block: getUnicodeBlock(code),
      };
    });

    setCharDetails(details);
  };

  const getCharName = (code: number): string => {
    const names: Record<number, string> = {
      0x0020: "SPACE",
      0x000A: "LINE FEED",
      0x000D: "CARRIAGE RETURN",
      0x0009: "CHARACTER TABULATION",
      0x200B: "ZERO WIDTH SPACE",
      0x200C: "ZERO WIDTH NON-JOINER",
      0x200D: "ZERO WIDTH JOINER",
      0x00A0: "NO-BREAK SPACE",
      0x2000: "EN QUAD",
      0x2001: "EM QUAD",
      0x2002: "EN SPACE",
      0x2003: "EM SPACE",
      0x2004: "THREE-PER-EM SPACE",
      0x2005: "FOUR-PER-EM SPACE",
      0x2006: "SIX-PER-EM SPACE",
      0x2007: "FIGURE SPACE",
      0x2008: "PUNCTUATION SPACE",
      0x2009: "THIN SPACE",
      0x200A: "HAIR SPACE",
      0x2028: "LINE SEPARATOR",
      0x2029: "PARAGRAPH SEPARATOR",
      0x202F: "NARROW NO-BREAK SPACE",
      0x205F: "MEDIUM MATHEMATICAL SPACE",
      0x3000: "IDEOGRAPHIC SPACE",
      0xFEFF: "ZERO WIDTH NO-BREAK SPACE",
    };
    
    return names[code] || "CHARACTER";
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setCharDetails([]);
  };

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Character Inspector</h2>
        <p className="text-sm text-muted-foreground">
          Analyze each character in a text string for Unicode properties
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to inspect..."
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={inspectCharacters} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Inspect
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={inspectCharacters} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Inspect
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {charDetails.length > 0 && (
        <Card className="p-4 overflow-x-auto">
          <h3 className="font-semibold mb-4">Character Analysis</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">#</th>
                <th className="text-left py-2 pr-4">Char</th>
                <th className="text-left py-2 pr-4">Code Point</th>
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Category</th>
                <th className="text-left py-2 pr-4">Block</th>
                <th className="text-left py-2">Copy</th>
              </tr>
            </thead>
            <tbody>
              {charDetails.map((detail, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                  <td className="py-2 pr-4 font-mono text-lg">{detail.char}</td>
                  <td className="py-2 pr-4 font-mono">U+{detail.codePoint.toString(16).toUpperCase().padStart(4, "0")}</td>
                  <td className="py-2 pr-4">{detail.name}</td>
                  <td className="py-2 pr-4">{detail.category}</td>
                  <td className="py-2 pr-4">{detail.block}</td>
                  <td className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleCopy(detail.char);
                        setCopiedIndex(i);
                        setTimeout(() => setCopiedIndex(null), 1500);
                      }}
                    >
                      {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
