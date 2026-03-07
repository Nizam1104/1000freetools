"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const FLIPPED_CHARS: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
  'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l',
  'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
  's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ',
  'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥',
  'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
  'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '.': '˙', ',': "'", "'": ',', '!': '¡', '?': '¿',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
  '<': '>', '>': '<', '&': '⅋', '_': '‾', '-': '⁻',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'h',
  '5': 'S', '6': '9', '7': 'L', '8': '8', '9': '6'
};

export default function TextReverser() {
  const [text, setText] = useState("");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!text) {
      return {
        reversed: "",
        wordOrder: "",
        eachWord: "",
        mirror: ""
      };
    }

    const reversed = text.split('').reverse().join('');
    
    const wordOrder = text.split(/\s+/).reverse().join(' ');
    
    const eachWord = text.split(/(\s+)/).map(part => 
      /\s+/.test(part) ? part : part.split('').reverse().join('')
    ).join('');

    const mirror = text.split('').reverse().map(char => 
      FLIPPED_CHARS[char] || char
    ).join('');

    return { reversed, wordOrder, eachWord, mirror };
  }, [text]);

  const handleCopy = (result: string, type: string) => {
    navigator.clipboard.writeText(result);
    setCopiedType(type);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const outputSections = [
    { name: "Reversed Text", value: results.reversed, type: "reversed" },
    { name: "Reverse Word Order", value: results.wordOrder, type: "wordOrder" },
    { name: "Reverse Each Word", value: results.eachWord, type: "eachWord" },
    { name: "Mirror Text (Upside Down)", value: results.mirror, type: "mirror" },
  ];

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
          placeholder="Paste or type your text here..."
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!text}
        >
          Clear
        </Button>
      </div>

      <div className="space-y-4">
        {outputSections.map((section) => (
          <div key={section.type} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{section.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(section.value, section.type)}
                disabled={!section.value}
              >
                {copiedType === section.type ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedType === section.type ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="bg-muted rounded p-3 min-h-[40px] text-sm font-mono break-all">
              {section.value || <span className="text-muted-foreground">Result will appear here</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
