"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Type, Search } from "lucide-react";

const HtmlSpecialCharactersLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inputText, setInputText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const categories = [
    { id: "all", name: "All Characters" },
    { id: "basic", name: "Basic Latin" },
    { id: "currency", name: "Currency" },
    { id: "math", name: "Mathematical" },
    { id: "greek", name: "Greek" },
    { id: "arrows", name: "Arrows" },
    { id: "symbols", name: "Symbols" },
    { id: "latin", name: "Latin Extended" },
  ];

  const specialChars = [
    // Basic Latin
    { char: "&", name: "Ampersand", entity: "&amp;", decimal: "&#38;", hex: "&#x26;", category: "basic" },
    { char: "<", name: "Less Than", entity: "&lt;", decimal: "&#60;", hex: "&#x3C;", category: "basic" },
    { char: ">", name: "Greater Than", entity: "&gt;", decimal: "&#62;", hex: "&#x3E;", category: "basic" },
    { char: '"', name: "Quotation Mark", entity: "&quot;", decimal: "&#34;", hex: "&#x22;", category: "basic" },
    { char: "'", name: "Apostrophe", entity: "&apos;", decimal: "&#39;", hex: "&#x27;", category: "basic" },
    { char: " ", name: "Non-breaking Space", entity: "&nbsp;", decimal: "&#160;", hex: "&#xA0;", category: "basic" },
    
    // Currency
    { char: "$", name: "Dollar Sign", entity: "&dollar;", decimal: "&#36;", hex: "&#x24;", category: "currency" },
    { char: "€", name: "Euro Sign", entity: "&euro;", decimal: "&#8364;", hex: "&#x20AC;", category: "currency" },
    { char: "£", name: "Pound Sign", entity: "&pound;", decimal: "&#163;", hex: "&#xA3;", category: "currency" },
    { char: "¥", name: "Yen Sign", entity: "&yen;", decimal: "&#165;", hex: "&#xA5;", category: "currency" },
    { char: "¢", name: "Cent Sign", entity: "&cent;", decimal: "&#162;", hex: "&#xA2;", category: "currency" },
    { char: "₿", name: "Bitcoin Sign", entity: "&#8377;", decimal: "&#8377;", hex: "&#x20BF;", category: "currency" },
    
    // Mathematical
    { char: "×", name: "Multiplication", entity: "&times;", decimal: "&#215;", hex: "&#xD7;", category: "math" },
    { char: "÷", name: "Division", entity: "&divide;", decimal: "&#247;", hex: "&#xF7;", category: "math" },
    { char: "±", name: "Plus-Minus", entity: "&plusmn;", decimal: "&#177;", hex: "&#xB1;", category: "math" },
    { char: "²", name: "Superscript 2", entity: "&sup2;", decimal: "&#178;", hex: "&#xB2;", category: "math" },
    { char: "³", name: "Superscript 3", entity: "&sup3;", decimal: "&#179;", hex: "&#xB3;", category: "math" },
    { char: "√", name: "Square Root", entity: "&radic;", decimal: "&#8730;", hex: "&#x221A;", category: "math" },
    { char: "∞", name: "Infinity", entity: "&infin;", decimal: "&#8734;", hex: "&#x221E;", category: "math" },
    { char: "≠", name: "Not Equal", entity: "&ne;", decimal: "&#8800;", hex: "&#x2260;", category: "math" },
    { char: "≤", name: "Less or Equal", entity: "&le;", decimal: "&#8804;", hex: "&#x2264;", category: "math" },
    { char: "≥", name: "Greater or Equal", entity: "&ge;", decimal: "&#8805;", hex: "&#x2265;", category: "math" },
    
    // Greek
    { char: "α", name: "Alpha", entity: "&alpha;", decimal: "&#940;", hex: "&#x3B1;", category: "greek" },
    { char: "β", name: "Beta", entity: "&beta;", decimal: "&#946;", hex: "&#x3B2;", category: "greek" },
    { char: "γ", name: "Gamma", entity: "&gamma;", decimal: "&#947;", hex: "&#x3B3;", category: "greek" },
    { char: "δ", name: "Delta", entity: "&delta;", decimal: "&#948;", hex: "&#x3B4;", category: "greek" },
    { char: "π", name: "Pi", entity: "&pi;", decimal: "&#960;", hex: "&#x3C0;", category: "greek" },
    { char: "Σ", name: "Sigma", entity: "&Sigma;", decimal: "&#931;", hex: "&#x3A3;", category: "greek" },
    { char: "Ω", name: "Omega", entity: "&Omega;", decimal: "&#937;", hex: "&#x3A9;", category: "greek" },
    
    // Arrows
    { char: "←", name: "Left Arrow", entity: "&larr;", decimal: "&#8592;", hex: "&#x2190;", category: "arrows" },
    { char: "↑", name: "Up Arrow", entity: "&uarr;", decimal: "&#8593;", hex: "&#x2191;", category: "arrows" },
    { char: "→", name: "Right Arrow", entity: "&rarr;", decimal: "&#8594;", hex: "&#x2192;", category: "arrows" },
    { char: "↓", name: "Down Arrow", entity: "&darr;", decimal: "&#8595;", hex: "&#x2193;", category: "arrows" },
    { char: "↔", name: "Left-Right Arrow", entity: "&harr;", decimal: "&#8596;", hex: "&#x2194;", category: "arrows" },
    { char: "⇐", name: "Left Double Arrow", entity: "&lArr;", decimal: "&#8656;", hex: "&#x21D0;", category: "arrows" },
    { char: "⇒", name: "Right Double Arrow", entity: "&rArr;", decimal: "&#8658;", hex: "&#x21D2;", category: "arrows" },
    
    // Symbols
    { char: "©", name: "Copyright", entity: "&copy;", decimal: "&#169;", hex: "&#xA9;", category: "symbols" },
    { char: "®", name: "Registered", entity: "&reg;", decimal: "&#174;", hex: "&#xAE;", category: "symbols" },
    { char: "™", name: "Trademark", entity: "&trade;", decimal: "&#8482;", hex: "&#x2122;", category: "symbols" },
    { char: "§", name: "Section Sign", entity: "&sect;", decimal: "&#167;", hex: "&#xA7;", category: "symbols" },
    { char: "¶", name: "Paragraph", entity: "&para;", decimal: "&#182;", hex: "&#xB6;", category: "symbols" },
    { char: "†", name: "Dagger", entity: "&dagger;", decimal: "&#8224;", hex: "&#x2020;", category: "symbols" },
    { char: "‡", name: "Double Dagger", entity: "&Dagger;", decimal: "&#8225;", hex: "&#x2021;", category: "symbols" },
    { char: "•", name: "Bullet", entity: "&bull;", decimal: "&#8226;", hex: "&#x2022;", category: "symbols" },
    { char: "…", name: "Ellipsis", entity: "&hellip;", decimal: "&#8230;", hex: "&#x2026;", category: "symbols" },
    { char: "♥", name: "Heart", entity: "&hearts;", decimal: "&#9829;", hex: "&#x2665;", category: "symbols" },
    { char: "♦", name: "Diamond", entity: "&diams;", decimal: "&#9830;", hex: "&#x2666;", category: "symbols" },
    { char: "♠", name: "Spade", entity: "&spades;", decimal: "&#9824;", hex: "&#x2660;", category: "symbols" },
    { char: "♣", name: "Club", entity: "&clubs;", decimal: "&#9827;", hex: "&#x2663;", category: "symbols" },
    
    // Latin Extended
    { char: "À", name: "A Grave", entity: "&Agrave;", decimal: "&#192;", hex: "&#xC0;", category: "latin" },
    { char: "Á", name: "A Acute", entity: "&Aacute;", decimal: "&#193;", hex: "&#xC1;", category: "latin" },
    { char: "Â", name: "A Circumflex", entity: "&Acirc;", decimal: "&#194;", hex: "&#xC2;", category: "latin" },
    { char: "Ä", name: "A Umlaut", entity: "&Auml;", decimal: "&#196;", hex: "&#xC4;", category: "latin" },
    { char: "Ç", name: "C Cedilla", entity: "&Ccedil;", decimal: "&#199;", hex: "&#xC7;", category: "latin" },
    { char: "É", name: "E Acute", entity: "&Eacute;", decimal: "&#201;", hex: "&#xC9;", category: "latin" },
    { char: "Ñ", name: "N Tilde", entity: "&Ntilde;", decimal: "&#209;", hex: "&#xD1;", category: "latin" },
    { char: "Ü", name: "U Umlaut", entity: "&Uuml;", decimal: "&#220;", hex: "&#xDC;", category: "latin" },
  ];

  const filteredChars = specialChars.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         char.char.includes(searchTerm) ||
                         char.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || char.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEncode = useCallback(() => {
    if (!inputText) return;
    
    const encoded = inputText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    
    setEncodedText(encoded);
  }, [inputText]);

  const handleDecode = useCallback(() => {
    if (!inputText) return;
    
    const decoded = inputText
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, " ");
    
    setDecodedText(decoded);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText("");
    setEncodedText("");
    setDecodedText("");
  }, []);

  const handleCopy = useCallback((text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            HTML Special Characters Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search characters..."
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-96 overflow-auto p-2 border rounded">
            {filteredChars.map((char, i) => (
              <button
                key={i}
                className="p-2 border rounded hover:bg-gray-100 text-center group relative"
                onClick={() => handleCopy(char.entity)}
                title={`${char.name} - Click to copy`}
              >
                <span className="text-xl">{char.char}</span>
                <span className="block text-xs text-gray-500 mt-1">{char.entity}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                  {char.name}
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "encode" ? "default" : "outline"}
                onClick={() => setMode("encode")}
              >
                Encode
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "outline"}
                onClick={() => setMode("decode")}
              >
                Decode
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inputText">Input Text</Label>
              <Textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter HTML entities to decode..."}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={mode === "encode" ? handleEncode : handleDecode} disabled={!inputText}>
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              <Button 
                onClick={() => handleCopy(mode === "encode" ? encodedText : decodedText)} 
                variant="outline" 
                disabled={!encodedText && !decodedText}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            {(encodedText || decodedText) && (
              <div className="space-y-2">
                <Label>Output</Label>
                <Textarea
                  value={mode === "encode" ? encodedText : decodedText}
                  readOnly
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">Quick Reference:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>&amp; = &amp;amp;</div>
              <div>&lt; = &amp;lt;</div>
              <div>&gt; = &amp;gt;</div>
              <div>&quot; = &amp;quot;</div>
              <div>&apos; = &amp;apos;</div>
              <div>&nbsp; = &amp;nbsp;</div>
              <div>&copy; = &amp;copy;</div>
              <div>&reg; = &amp;reg;</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlSpecialCharactersLibrary;
