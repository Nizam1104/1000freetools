"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeCharacterLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "codepoint" | "character">("name");
  const [results, setResults] = useState<Array<{ char: string; codepoint: string; name: string; category: string }>>([]);

  // Common Unicode characters database (subset for demonstration)
  const unicodeDatabase = [
    { char: "A", codepoint: "U+0041", name: "LATIN CAPITAL LETTER A", category: "Letter" },
    { char: "a", codepoint: "U+0061", name: "LATIN SMALL LETTER A", category: "Letter" },
    { char: "0", codepoint: "U+0030", name: "DIGIT ZERO", category: "Number" },
    { char: " ", codepoint: "U+0020", name: "SPACE", category: "Separator" },
    { char: "!", codepoint: "U+0021", name: "EXCLAMATION MARK", category: "Punctuation" },
    { char: "@", codepoint: "U+0040", name: "COMMERCIAL AT", category: "Symbol" },
    { char: "#", codepoint: "U+0023", name: "NUMBER SIGN", category: "Symbol" },
    { char: "$", codepoint: "U+0024", name: "DOLLAR SIGN", category: "Symbol" },
    { char: "%", codepoint: "U+0025", name: "PERCENT SIGN", category: "Symbol" },
    { char: "&", codepoint: "U+0026", name: "AMPERSAND", category: "Symbol" },
    { char: "*", codepoint: "U+002A", name: "ASTERISK", category: "Symbol" },
    { char: "+", codepoint: "U+002B", name: "PLUS SIGN", category: "Symbol" },
    { char: "-", codepoint: "U+002D", name: "HYPHEN-MINUS", category: "Punctuation" },
    { char: ".", codepoint: "U+002E", name: "FULL STOP", category: "Punctuation" },
    { char: "/", codepoint: "U+002F", name: "SOLIDUS", category: "Symbol" },
    { char: ":", codepoint: "U+003A", name: "COLON", category: "Punctuation" },
    { char: ";", codepoint: "U+003B", name: "SEMICOLON", category: "Punctuation" },
    { char: "<", codepoint: "U+003C", name: "LESS-THAN SIGN", category: "Symbol" },
    { char: "=", codepoint: "U+003D", name: "EQUALS SIGN", category: "Symbol" },
    { char: ">", codepoint: "U+003E", name: "GREATER-THAN SIGN", category: "Symbol" },
    { char: "?", codepoint: "U+003F", name: "QUESTION MARK", category: "Punctuation" },
    { char: "[", codepoint: "U+005B", name: "LEFT SQUARE BRACKET", category: "Punctuation" },
    { char: "\\", codepoint: "U+005C", name: "REVERSE SOLIDUS", category: "Symbol" },
    { char: "]", codepoint: "U+005D", name: "RIGHT SQUARE BRACKET", category: "Punctuation" },
    { char: "^", codepoint: "U+005E", name: "CIRCUMFLEX ACCENT", category: "Symbol" },
    { char: "_", codepoint: "U+005F", name: "LOW LINE", category: "Punctuation" },
    { char: "`", codepoint: "U+0060", name: "GRAVE ACCENT", category: "Symbol" },
    { char: "{", codepoint: "U+007B", name: "LEFT CURLY BRACKET", category: "Punctuation" },
    { char: "|", codepoint: "U+007C", name: "VERTICAL LINE", category: "Symbol" },
    { char: "}", codepoint: "U+007D", name: "RIGHT CURLY BRACKET", category: "Punctuation" },
    { char: "~", codepoint: "U+007E", name: "TILDE", category: "Symbol" },
    { char: "©", codepoint: "U+00A9", name: "COPYRIGHT SIGN", category: "Symbol" },
    { char: "®", codepoint: "U+00AE", name: "REGISTERED SIGN", category: "Symbol" },
    { char: "°", codepoint: "U+00B0", name: "DEGREE SIGN", category: "Symbol" },
    { char: "±", codepoint: "U+00B1", name: "PLUS-MINUS SIGN", category: "Symbol" },
    { char: "×", codepoint: "U+00D7", name: "MULTIPLICATION SIGN", category: "Symbol" },
    { char: "÷", codepoint: "U+00F7", name: "DIVISION SIGN", category: "Symbol" },
    { char: "€", codepoint: "U+20AC", name: "EURO SIGN", category: "Symbol" },
    { char: "£", codepoint: "U+00A3", name: "POUND SIGN", category: "Symbol" },
    { char: "¥", codepoint: "U+00A5", name: "YEN SIGN", category: "Symbol" },
    { char: "¢", codepoint: "U+00A2", name: "CENT SIGN", category: "Symbol" },
    { char: "§", codepoint: "U+00A7", name: "SECTION SIGN", category: "Symbol" },
    { char: "¶", codepoint: "U+00B6", name: "PILCROW SIGN", category: "Symbol" },
    { char: "•", codepoint: "U+2022", name: "BULLET", category: "Punctuation" },
    { char: "…", codepoint: "U+2026", name: "HORIZONTAL ELLIPSIS", category: "Punctuation" },
    { char: "™", codepoint: "U+2122", name: "TRADE MARK SIGN", category: "Symbol" },
    { char: "∞", codepoint: "U+221E", name: "INFINITY", category: "Symbol" },
    { char: "√", codepoint: "U+221A", name: "SQUARE ROOT", category: "Symbol" },
    { char: "∫", codepoint: "U+222B", name: "INTEGRAL", category: "Symbol" },
    { char: "≈", codepoint: "U+2248", name: "ALMOST EQUAL TO", category: "Symbol" },
    { char: "≠", codepoint: "U+2260", name: "NOT EQUAL TO", category: "Symbol" },
    { char: "≤", codepoint: "U+2264", name: "LESS-THAN OR EQUAL TO", category: "Symbol" },
    { char: "≥", codepoint: "U+2265", name: "GREATER-THAN OR EQUAL TO", category: "Symbol" },
    { char: "α", codepoint: "U+03B1", name: "GREEK SMALL LETTER ALPHA", category: "Letter" },
    { char: "β", codepoint: "U+03B2", name: "GREEK SMALL LETTER BETA", category: "Letter" },
    { char: "γ", codepoint: "U+03B3", name: "GREEK SMALL LETTER GAMMA", category: "Letter" },
    { char: "δ", codepoint: "U+03B4", name: "GREEK SMALL LETTER DELTA", category: "Letter" },
    { char: "π", codepoint: "U+03C0", name: "GREEK SMALL LETTER PI", category: "Letter" },
    { char: "Σ", codepoint: "U+03A3", name: "GREEK CAPITAL LETTER SIGMA", category: "Letter" },
    { char: "Ω", codepoint: "U+03A9", name: "GREEK CAPITAL LETTER OMEGA", category: "Letter" },
    { char: "😀", codepoint: "U+1F600", name: "GRINNING FACE", category: "Emoji" },
    { char: "😂", codepoint: "U+1F602", name: "FACE WITH TEARS OF JOY", category: "Emoji" },
    { char: "❤️", codepoint: "U+2764", name: "HEAVY BLACK HEART", category: "Emoji" },
    { char: "👍", codepoint: "U+1F44D", name: "THUMBS UP SIGN", category: "Emoji" },
    { char: "🎉", codepoint: "U+1F389", name: "PARTY POPPER", category: "Emoji" },
    { char: "🔥", codepoint: "U+1F525", name: "FIRE", category: "Emoji" },
    { char: "✨", codepoint: "U+2728", name: "SPARKLES", category: "Emoji" },
    { char: "🚀", codepoint: "U+1F680", name: "ROCKET", category: "Emoji" },
    { char: "★", codepoint: "U+2605", name: "BLACK STAR", category: "Symbol" },
    { char: "☆", codepoint: "U+2606", name: "WHITE STAR", category: "Symbol" },
    { char: "✓", codepoint: "U+2713", name: "CHECK MARK", category: "Symbol" },
    { char: "✗", codepoint: "U+2717", name: "BALLOT X", category: "Symbol" },
    { char: "→", codepoint: "U+2192", name: "RIGHTWARDS ARROW", category: "Symbol" },
    { char: "←", codepoint: "U+2190", name: "LEFTWARDS ARROW", category: "Symbol" },
    { char: "↑", codepoint: "U+2191", name: "UPWARDS ARROW", category: "Symbol" },
    { char: "↓", codepoint: "U+2193", name: "DOWNWARDS ARROW", category: "Symbol" },
    { char: "⇒", codepoint: "U+21D2", name: "DOUBLE RIGHTWARDS ARROW", category: "Symbol" },
    { char: "⇐", codepoint: "U+21D0", name: "DOUBLE LEFTWARDS ARROW", category: "Symbol" },
    { char: "⟨", codepoint: "U+27E8", name: "MATHEMATICAL LEFT ANGLE BRACKET", category: "Symbol" },
    { char: "⟩", codepoint: "U+27E9", name: "MATHEMATICAL RIGHT ANGLE BRACKET", category: "Symbol" },
    { char: "∑", codepoint: "U+2211", name: "N-ARY SUMMATION", category: "Symbol" },
    { char: "∏", codepoint: "U+220F", name: "N-ARY PRODUCT", category: "Symbol" },
    { char: "∂", codepoint: "U+2202", name: "PARTIAL DIFFERENTIAL", category: "Symbol" },
    { char: "∆", codepoint: "U+2206", name: "INCREMENT", category: "Symbol" },
    { char: "∇", codepoint: "U+2207", name: "NABLA", category: "Symbol" },
    { char: "∈", codepoint: "U+2208", name: "ELEMENT OF", category: "Symbol" },
    { char: "∉", codepoint: "U+2209", name: "NOT AN ELEMENT OF", category: "Symbol" },
    { char: "∅", codepoint: "U+2205", name: "EMPTY SET", category: "Symbol" },
    { char: "∩", codepoint: "U+2229", name: "INTERSECTION", category: "Symbol" },
    { char: "∪", codepoint: "U+222A", name: "UNION", category: "Symbol" },
    { char: "⊂", codepoint: "U+2282", name: "SUBSET OF", category: "Symbol" },
    { char: "⊃", codepoint: "U+2283", name: "SUPERSET OF", category: "Symbol" },
    { char: "⊆", codepoint: "U+2286", name: "SUBSET OF OR EQUAL TO", category: "Symbol" },
    { char: "⊇", codepoint: "U+2287", name: "SUPERSET OF OR EQUAL TO", category: "Symbol" },
    { char: "⊕", codepoint: "U+2295", name: "CIRCLED PLUS", category: "Symbol" },
    { char: "⊗", codepoint: "U+2297", name: "CIRCLED TIMES", category: "Symbol" },
    { char: "⊥", codepoint: "U+27C2", name: "PERPENDICULAR", category: "Symbol" },
    { char: "∥", codepoint: "U+2225", name: "PARALLEL TO", category: "Symbol" },
    { char: "∠", codepoint: "U+2220", name: "ANGLE", category: "Symbol" },
    { char: "∟", codepoint: "U+221F", name: "RIGHT ANGLE", category: "Symbol" },
    { char: "⌀", codepoint: "U+2300", name: "DIAMETER SIGN", category: "Symbol" },
    { char: "⌂", codepoint: "U+2302", name: "HOUSE", category: "Symbol" },
    { char: "⌘", codepoint: "U+2318", name: "PLACE OF INTEREST SIGN", category: "Symbol" },
    { char: "⌥", codepoint: "U+2325", name: "OPTION KEY", category: "Symbol" },
    { char: "⌫", codepoint: "U+232B", name: "ERASE TO THE LEFT", category: "Symbol" },
    { char: "⌦", codepoint: "U+2326", name: "ERASE TO THE RIGHT", category: "Symbol" },
    { char: "⏎", codepoint: "U+23CE", name: "RETURN SYMBOL", category: "Symbol" },
    { char: "␣", codepoint: "U+2423", name: "OPEN BOX", category: "Symbol" },
    { char: "☀", codepoint: "U+2600", name: "BLACK SUN WITH RAYS", category: "Symbol" },
    { char: "☁", codepoint: "U+2601", name: "CLOUD", category: "Symbol" },
    { char: "☂", codepoint: "U+2602", name: "UMBRELLA", category: "Symbol" },
    { char: "☃", codepoint: "U+2603", name: "SNOWMAN", category: "Symbol" },
    { char: "☄", codepoint: "U+2604", name: "COMET", category: "Symbol" },
    { char: "☎", codepoint: "U+260E", name: "BLACK TELEPHONE", category: "Symbol" },
    { char: "☑", codepoint: "U+2611", name: "BALLOT BOX WITH CHECK", category: "Symbol" },
    { char: "☔", codepoint: "U+2614", name: "UMBRELLA WITH RAIN DROPS", category: "Emoji" },
    { char: "☕", codepoint: "U+2615", name: "HOT BEVERAGE", category: "Emoji" },
    { char: "☘", codepoint: "U+2618", name: "SHAMROCK", category: "Symbol" },
    { char: "☠", codepoint: "U+2620", name: "SKULL AND CROSSBONES", category: "Symbol" },
    { char: "☢", codepoint: "U+2622", name: "RADIOACTIVE SIGN", category: "Symbol" },
    { char: "☣", codepoint: "U+2623", name: "BIOHAZARD SIGN", category: "Symbol" },
    { char: "☮", codepoint: "U+262E", name: "PEACE SYMBOL", category: "Symbol" },
    { char: "☯", codepoint: "U+262F", name: "YIN YANG", category: "Symbol" },
    { char: "☸", codepoint: "U+2638", name: "WHEEL OF DHARMA", category: "Symbol" },
    { char: "☹", codepoint: "U+2639", name: "WHITE FROWNING FACE", category: "Emoji" },
    { char: "☺", codepoint: "U+263A", name: "WHITE SMILING FACE", category: "Emoji" },
    { char: "♀", codepoint: "U+2640", name: "FEMALE SIGN", category: "Symbol" },
    { char: "♂", codepoint: "U+2642", name: "MALE SIGN", category: "Symbol" },
    { char: "♠", codepoint: "U+2660", name: "BLACK SPADE SUIT", category: "Symbol" },
    { char: "♣", codepoint: "U+2663", name: "BLACK CLUB SUIT", category: "Symbol" },
    { char: "♥", codepoint: "U+2665", name: "BLACK HEART SUIT", category: "Symbol" },
    { char: "♦", codepoint: "U+2666", name: "BLACK DIAMOND SUIT", category: "Symbol" },
    { char: "♩", codepoint: "U+2669", name: "QUARTER NOTE", category: "Symbol" },
    { char: "♪", codepoint: "U+266A", name: "EIGHTH NOTE", category: "Symbol" },
    { char: "♫", codepoint: "U+266B", name: "BEAMED EIGHTH NOTES", category: "Symbol" },
    { char: "♬", codepoint: "U+266C", name: "BEAMED SIXTEENTH NOTES", category: "Symbol" },
    { char: "♭", codepoint: "U+266D", name: "MUSIC FLAT SIGN", category: "Symbol" },
    { char: "♮", codepoint: "U+266E", name: "MUSIC NATURAL SIGN", category: "Symbol" },
    { char: "♯", codepoint: "U+266F", name: "MUSIC SHARP SIGN", category: "Symbol" },
  ];

  const search = () => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    let filtered: typeof unicodeDatabase = [];

    if (searchType === "name") {
      filtered = unicodeDatabase.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
    } else if (searchType === "codepoint") {
      const cleanTerm = term.replace("u+", "");
      filtered = unicodeDatabase.filter((item) =>
        item.codepoint.toLowerCase().includes("u+" + cleanTerm)
      );
    } else if (searchType === "character") {
      filtered = unicodeDatabase.filter((item) =>
        item.char.includes(searchTerm)
      );
    }

    setResults(filtered.slice(0, 50)); // Limit to 50 results
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Character Lookup</h2>
        <p className="text-sm text-muted-foreground">
          Find Unicode characters by name, code point, or the character itself
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            {(["name", "codepoint", "character"] as const).map((type) => (
              <Button
                key={type}
                variant={searchType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder={
                searchType === "name"
                  ? "Search by name (e.g., 'arrow', 'heart')"
                  : searchType === "codepoint"
                  ? "Search by code point (e.g., '2192', 'U+2192')"
                  : "Search by character"
              }
            />
          </div>
          <Button onClick={search}>Search</Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card className="p-4">
          <div className="mb-4 text-sm text-muted-foreground">
            Found {results.length} character{results.length !== 1 ? "s" : ""}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <div
                key={item.codepoint}
                className="flex items-center gap-3 p-3 rounded border hover:bg-muted cursor-pointer"
                onClick={() => {
                  handleCopy(item.char);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-muted rounded">
                  {item.char}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-muted-foreground">{item.codepoint}</div>
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.category}</div>
                </div>
                {copied && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Popular Unicode Categories</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Arrows", examples: "→ ← ↑ ↓ ⇒ ⇐" },
            { name: "Math Symbols", examples: "∑ ∏ ∂ ∆ ∇ ∈ ∉" },
            { name: "Currency", examples: "$ € £ ¥ ¢" },
            { name: "Punctuation", examples: "… • † ‡ § ¶" },
            { name: "Greek Letters", examples: "α β γ δ π Σ Ω" },
            { name: "Emoji", examples: "😀 ❤️ 🔥 ✨ 🚀" },
            { name: "Shapes", examples: "★ ☆ ✓ ✗ ● ○" },
            { name: "Technical", examples: "⌘ ⌥ ⌫ ⏎ ␣" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="p-3 rounded border bg-muted"
            >
              <div className="font-semibold text-sm">{cat.name}</div>
              <div className="text-xl mt-1">{cat.examples}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
