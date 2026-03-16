"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Search } from "lucide-react";

export default function UnicodeCharacterMapByBlock() {
  const [selectedBlock, setSelectedBlock] = useState<string>("Basic Latin");
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const unicodeBlocks: Record<string, [number, number]> = {
    "Basic Latin": [0x0000, 0x007F],
    "Latin-1 Supplement": [0x0080, 0x00FF],
    "Latin Extended-A": [0x0100, 0x017F],
    "Latin Extended-B": [0x0180, 0x024F],
    "IPA Extensions": [0x0250, 0x02AF],
    "Spacing Modifier Letters": [0x02B0, 0x02FF],
    "Combining Diacritical Marks": [0x0300, 0x036F],
    "Greek and Coptic": [0x0370, 0x03FF],
    "Cyrillic": [0x0400, 0x04FF],
    "Cyrillic Supplement": [0x0500, 0x052F],
    "Armenian": [0x0530, 0x058F],
    "Hebrew": [0x0590, 0x05FF],
    "Arabic": [0x0600, 0x06FF],
    "Syriac": [0x0700, 0x074F],
    "Arabic Supplement": [0x0750, 0x077F],
    "Thaana": [0x0780, 0x07BF],
    "NKo": [0x07C0, 0x07FF],
    "Samaritan": [0x0800, 0x083F],
    "Mandaic": [0x0840, 0x085F],
    "Devanagari": [0x0900, 0x097F],
    "Bengali": [0x0980, 0x09FF],
    "Gurmukhi": [0x0A00, 0x0A7F],
    "Gujarati": [0x0A80, 0x0AFF],
    "Oriya": [0x0B00, 0x0B7F],
    "Tamil": [0x0B80, 0x0BFF],
    "Telugu": [0x0C00, 0x0C7F],
    "Kannada": [0x0C80, 0x0CFF],
    "Malayalam": [0x0D00, 0x0D7F],
    "Sinhala": [0x0D80, 0x0DFF],
    "Thai": [0x0E00, 0x0E7F],
    "Lao": [0x0E80, 0x0EFF],
    "Tibetan": [0x0F00, 0x0FFF],
    "Myanmar": [0x1000, 0x109F],
    "Georgian": [0x10A0, 0x10FF],
    "Hangul Jamo": [0x1100, 0x11FF],
    "Ogham": [0x1680, 0x169F],
    "Runic": [0x16A0, 0x16FF],
    "Tagalog": [0x1700, 0x171F],
    "Hanunoo": [0x1720, 0x173F],
    "Buhid": [0x1740, 0x175F],
    "Tagbanwa": [0x1760, 0x177F],
    "Khmer": [0x1780, 0x17FF],
    "Mongolian": [0x1800, 0x18AF],
    "Hiragana": [0x3040, 0x309F],
    "Katakana": [0x30A0, 0x30FF],
    "Bopomofo": [0x3100, 0x312F],
    "Hangul Compatibility Jamo": [0x3130, 0x318F],
    "Kanbun": [0x3190, 0x319F],
    "Bopomofo Extended": [0x31A0, 0x31BF],
    "CJK Strokes": [0x31C0, 0x31EF],
    "Katakana Phonetic Extensions": [0x31F0, 0x31FF],
    "Enclosed CJK Letters and Months": [0x3200, 0x32FF],
    "CJK Compatibility": [0x3300, 0x33FF],
    "CJK Unified Ideographs Extension A": [0x3400, 0x4DBF],
    "Yijing Hexagram Symbols": [0x4DC0, 0x4DFF],
    "CJK Unified Ideographs": [0x4E00, 0x9FFF],
    "Yi Syllables": [0xA000, 0xA48F],
    "Yi Radicals": [0xA490, 0xA4CF],
    "Lisu": [0xA4D0, 0xA4FF],
    "Vai": [0xA500, 0xA63F],
    "Cyrillic Extended-B": [0xA640, 0xA69F],
    "Bamum": [0xA6A0, 0xA6FF],
    "Modifier Tone Letters": [0xA700, 0xA71F],
    "Latin Extended-D": [0xA720, 0xA7FF],
    "Syloti Nagri": [0xA800, 0xA82F],
    "Common Indic Number Forms": [0xA830, 0xA83F],
    "Phags-pa": [0xA840, 0xA87F],
    "Saurashtra": [0xA880, 0xA8DF],
    "Devanagari Extended": [0xA8E0, 0xA8FF],
    "Kayah Li": [0xA900, 0xA92F],
    "Rejang": [0xA930, 0xA95F],
    "Hangul Jamo Extended-A": [0xA960, 0xA97F],
    "Javanese": [0xA980, 0xA9DF],
    "Myanmar Extended-B": [0xA9E0, 0xA9FF],
    "Cham": [0xAA00, 0xAA5F],
    "Myanmar Extended-A": [0xAA60, 0xAA7F],
    "Tai Viet": [0xAA80, 0xAADF],
    "Meetei Mayek Extensions": [0xAAE0, 0xAAFF],
    "Ethiopic Extended-A": [0xAB00, 0xAB2F],
    "Latin Extended-E": [0xAB30, 0xAB6F],
    "Cherokee Supplement": [0xAB70, 0xABBF],
    "Meetei Mayek": [0xABC0, 0xABFF],
    "Hangul Syllables": [0xAC00, 0xD7AF],
    "Hangul Jamo Extended-B": [0xD7B0, 0xD7FF],
    "High Surrogates": [0xD800, 0xDB7F],
    "High Private Use Surrogates": [0xDB80, 0xDBFF],
    "Low Surrogates": [0xDC00, 0xDFFF],
    "Private Use Area": [0xE000, 0xF8FF],
    "CJK Compatibility Ideographs": [0xF900, 0xFAFF],
    "Alphabetic Presentation Forms": [0xFB00, 0xFB4F],
    "Arabic Presentation Forms-A": [0xFB50, 0xFDFF],
    "Variation Selectors": [0xFE00, 0xFE0F],
    "Vertical Forms": [0xFE10, 0xFE1F],
    "Combining Half Marks": [0xFE20, 0xFE2F],
    "CJK Compatibility Forms": [0xFE30, 0xFE4F],
    "Small Form Variants": [0xFE50, 0xFE6F],
    "Arabic Presentation Forms-B": [0xFE70, 0xFEFF],
    "Halfwidth and Fullwidth Forms": [0xFF00, 0xFFEF],
    "Specials": [0xFFF0, 0xFFFF],
    "Linear B Syllabary": [0x10000, 0x1007F],
    "Linear B Ideograms": [0x10080, 0x100FF],
    "Aegean Numbers": [0x10100, 0x1013F],
    "Ancient Greek Numbers": [0x10140, 0x1018F],
    "Ancient Symbols": [0x10190, 0x101CF],
    "Phaistos Disc": [0x101D0, 0x101FF],
    "Lycian": [0x10280, 0x1029F],
    "Carian": [0x102A0, 0x102DF],
    "Coptic Epact Numbers": [0x102E0, 0x102FF],
    "Old Italic": [0x10300, 0x1032F],
    "Gothic": [0x10330, 0x1034F],
    "Old Permic": [0x10350, 0x1037F],
    "Ugaritic": [0x10380, 0x1039F],
    "Old Persian": [0x103A0, 0x103DF],
    "Deseret": [0x10400, 0x1044F],
    "Shavian": [0x10450, 0x1047F],
    "Osmanya": [0x10480, 0x104AF],
    "Osage": [0x104B0, 0x104FF],
    "Elbasan": [0x10500, 0x1052F],
    "Caucasian Albanian": [0x10530, 0x1056F],
    "Vithkuqi": [0x10570, 0x105BF],
    "Linear A": [0x10600, 0x1077F],
    "Latin Extended-F": [0x10780, 0x107BF],
    "Cypriot Syllabary": [0x10800, 0x1083F],
    "Imperial Aramaic": [0x10840, 0x1085F],
    "Palmyrene": [0x10860, 0x1087F],
    "Nabataean": [0x10880, 0x108AF],
    "Hatran": [0x108E0, 0x108FF],
    "Phoenician": [0x10900, 0x1091F],
    "Lydian": [0x10920, 0x1093F],
    "Meroitic Hieroglyphs": [0x10980, 0x1099F],
    "Meroitic Cursive": [0x109A0, 0x109FF],
    "Kharoshthi": [0x10A00, 0x10A5F],
    "Old South Arabian": [0x10A60, 0x10A7F],
    "Old North Arabian": [0x10A80, 0x10A9F],
    "Manichaean": [0x10AC0, 0x10AFF],
    "Avestan": [0x10B00, 0x10B3F],
    "Inscriptional Parthian": [0x10B40, 0x10B5F],
    "Inscriptional Pahlavi": [0x10B60, 0x10B7F],
    "Psalter Pahlavi": [0x10B80, 0x10BAF],
    "Old Turkic": [0x10C00, 0x10C4F],
    "Old Hungarian": [0x10C80, 0x10CFF],
    "Hanifi Rohingya": [0x10D00, 0x10D3F],
    "Rumi Numeral Symbols": [0x10E60, 0x10E7F],
    "Yezidi": [0x10E80, 0x10EBF],
    "Arabic Extended-C": [0x10EC0, 0x10EFF],
    "Old Sogdian": [0x10F00, 0x10F2F],
    "Sogdian": [0x10F30, 0x10F6F],
    "Old Uyghur": [0x10F70, 0x10FAF],
    "Chorasmian": [0x10FB0, 0x10FDF],
    "Elymaic": [0x10FE0, 0x10FFF],
    "Brahmi": [0x11000, 0x1107F],
    "Kaithi": [0x11080, 0x110CF],
    "Sora Sompeng": [0x110D0, 0x110FF],
    "Chakma": [0x11100, 0x1114F],
    "Mahajani": [0x11150, 0x1117F],
    "Sharada": [0x11180, 0x111DF],
    "Sinhala Archaic Numbers": [0x111E0, 0x111FF],
    "Khojki": [0x11200, 0x1124F],
    "Multani": [0x11280, 0x112AF],
    "Khudawadi": [0x112B0, 0x112FF],
    "Grantha": [0x11300, 0x1137F],
    "Newa": [0x11400, 0x1147F],
    "Tirhuta": [0x11480, 0x114DF],
    "Siddham": [0x11580, 0x115FF],
    "Modi": [0x11600, 0x1165F],
    "Mongolian Supplement": [0x11660, 0x1167F],
    "Takri": [0x11680, 0x116CF],
    "Ahom": [0x11700, 0x1173F],
    "Dogra": [0x11800, 0x1184F],
    "Warang Citi": [0x118A0, 0x118FF],
    "Dives Akuru": [0x11900, 0x1195F],
    "Nandinagari": [0x119A0, 0x119FF],
    "Zanabazar Square": [0x11A00, 0x11A4F],
    "Soyombo": [0x11A50, 0x11AAF],
    "Unified Canadian Aboriginal Syllabics Extended-A": [0x11AB0, 0x11ABF],
    "Pau Cin Hau": [0x11AC0, 0x11AFF],
    "Devanagari Extended-A": [0x11B00, 0x11B5F],
    "Bhaiksuki": [0x11C00, 0x11C6F],
    "Marchen": [0x11C70, 0x11CBF],
    "Masaram Gondi": [0x11D00, 0x11D5F],
    "Gunjala Gondi": [0x11D60, 0x11DAF],
    "Makasar": [0x11EE0, 0x11EFF],
    "Kawi": [0x11F00, 0x11F5F],
    "Lisu Supplement": [0x11FB0, 0x11FBF],
    "Tamil Supplement": [0x11FC0, 0x11FFF],
    "Cuneiform": [0x12000, 0x123FF],
    "Cuneiform Numbers and Punctuation": [0x12400, 0x1247F],
    "Early Dynastic Cuneiform": [0x12480, 0x1254F],
    "Cypro-Minoan": [0x12F90, 0x12FFF],
    "Egyptian Hieroglyphs": [0x13000, 0x1342F],
    "Egyptian Hieroglyph Format Controls": [0x13430, 0x1345F],
    "Anatolian Hieroglyphs": [0x14400, 0x1467F],
    "Bamum Supplement": [0x16800, 0x16A3F],
    "Mro": [0x16A40, 0x16A6F],
    "Tangsa": [0x16A70, 0x16ACF],
    "Bassa Vah": [0x16AD0, 0x16AFF],
    "Pahawh Hmong": [0x16B00, 0x16B8F],
    "Medefaidrin": [0x16E40, 0x16E9F],
    "Miao": [0x16F00, 0x16F9F],
    "Ideographic Symbols and Punctuation": [0x16FE0, 0x16FFF],
    "Tangut": [0x17000, 0x187FF],
    "Tangut Components": [0x18800, 0x18AFF],
    "Khitan Small Script": [0x18B00, 0x18CFF],
    "Tangut Supplement": [0x18D00, 0x18D7F],
    "Kana Extended-B": [0x1AFF0, 0x1AFFF],
    "Kana Supplement": [0x1B000, 0x1B0FF],
    "Kana Extended-A": [0x1B100, 0x1B12F],
    "Small Kana Extension": [0x1B130, 0x1B16F],
    "Nushu": [0x1B170, 0x1B2FF],
    "Duployan": [0x1BC00, 0x1BC9F],
    "Shorthand Format Controls": [0x1BCA0, 0x1BCAF],
    "Znamenny Musical Notation": [0x1CF00, 0x1CFCF],
    "Byzantine Musical Symbols": [0x1D000, 0x1D0FF],
    "Musical Symbols": [0x1D100, 0x1D1FF],
    "Ancient Greek Musical Notation": [0x1D200, 0x1D24F],
    "Kaktovik Numerals": [0x1D2C0, 0x1D2DF],
    "Mayan Numerals": [0x1D2E0, 0x1D2FF],
    "Tai Xuan Jing Symbols": [0x1D300, 0x1D35F],
    "Counting Rod Numerals": [0x1D360, 0x1D37F],
    "Mathematical Alphanumeric Symbols": [0x1D400, 0x1D7FF],
    "Sutton SignWriting": [0x1D800, 0x1DAFF],
    "Latin Extended-G": [0x1DF00, 0x1DFFF],
    "Glagolitic Supplement": [0x1E000, 0x1E02F],
    "Cyrillic Extended-D": [0x1E030, 0x1E08F],
    "Nyiakeng Puachue Hmong": [0x1E100, 0x1E14F],
    "Toto": [0x1E290, 0x1E2BF],
    "Wancho": [0x1E2C0, 0x1E2FF],
    "Nag Mundari": [0x1E4D0, 0x1E4FF],
    "Ethiopic Extended-B": [0x1E7E0, 0x1E7FF],
    "Mende Kikakui": [0x1E800, 0x1E8DF],
    "Adlam": [0x1E900, 0x1E95F],
    "Indic Siyaq Numbers": [0x1EC70, 0x1ECBF],
    "Ottoman Siyaq Numbers": [0x1ED00, 0x1ED4F],
    "Arabic Mathematical Alphabetic Symbols": [0x1EE00, 0x1EEFF],
    "Mahjong Tiles": [0x1F000, 0x1F02F],
    "Domino Tiles": [0x1F030, 0x1F09F],
    "Playing Cards": [0x1F0A0, 0x1F0FF],
    "Enclosed Alphanumeric Supplement": [0x1F100, 0x1F1FF],
    "Enclosed Ideographic Supplement": [0x1F200, 0x1F2FF],
    "Miscellaneous Symbols and Pictographs": [0x1F300, 0x1F5FF],
    "Emoticons": [0x1F600, 0x1F64F],
    "Ornamental Dingbats": [0x1F650, 0x1F67F],
    "Transport and Map Symbols": [0x1F680, 0x1F6FF],
    "Alchemical Symbols": [0x1F700, 0x1F77F],
    "Geometric Shapes Extended": [0x1F780, 0x1F7FF],
    "Supplemental Arrows-C": [0x1F800, 0x1F8FF],
    "Supplemental Symbols and Pictographs": [0x1F900, 0x1F9FF],
    "Chess Symbols": [0x1FA00, 0x1FA6F],
    "Symbols and Pictographs Extended-A": [0x1FA70, 0x1FAFF],
    "Symbols for Legacy Computing": [0x1FB00, 0x1FBFF],
    "CJK Unified Ideographs Extension B": [0x20000, 0x2A6DF],
    "CJK Unified Ideographs Extension C": [0x2A700, 0x2B73F],
    "CJK Unified Ideographs Extension D": [0x2B740, 0x2B81F],
    "CJK Unified Ideographs Extension E": [0x2B820, 0x2CEAF],
    "CJK Unified Ideographs Extension F": [0x2CEB0, 0x2EBEF],
    "CJK Compatibility Ideographs Supplement": [0x2F800, 0x2FA1F],
    "Tags": [0xE0000, 0xE007F],
    "Variation Selectors Supplement": [0xE0100, 0xE01EF],
  };

  const getCharacters = (blockName: string) => {
    const range = unicodeBlocks[blockName];
    if (!range) return [];

    const [start, end] = range;
    const chars: string[] = [];
    
    for (let i = start; i <= end; i++) {
      const char = String.fromCodePoint(i);
      if (char.trim() || char === " ") {
        chars.push(char);
      }
    }
    
    return chars;
  };

  const characters = getCharacters(selectedBlock);
  const filteredCharacters = characters.filter((char) =>
    searchTerm === "" || char.includes(searchTerm)
  );

  const handleCopy = async (char: string) => {
    await navigator.clipboard.writeText(char);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Character Map by Block</h2>
        <p className="text-sm text-muted-foreground">
          Browse all Unicode characters organized by block
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="p-4 lg:col-span-1">
          <h3 className="font-semibold mb-3">Unicode Blocks</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search blocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mb-3"
            />
          </div>
          <div className="space-y-1 max-h-[600px] overflow-auto">
            {Object.keys(unicodeBlocks)
              .filter((block) =>
                searchTerm === "" || block.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((block) => (
                <Button
                  key={block}
                  variant={selectedBlock === block ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedBlock(block)}
                  className="w-full justify-start text-xs truncate"
                >
                  {block}
                </Button>
              ))}
          </div>
        </Card>

        <Card className="p-4 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">{selectedBlock}</h3>
              <p className="text-sm text-muted-foreground">
                {filteredCharacters.length} characters
              </p>
            </div>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2">
            {filteredCharacters.slice(0, 512).map((char, i) => (
              <button
                key={i}
                onClick={() => handleCopy(char)}
                className="text-xl p-2 hover:bg-muted rounded transition-colors relative group"
                title={`U+${char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}`}
              >
                {char}
                {copied && (
                  <div className="absolute inset-0 bg-primary/20 rounded flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
          {filteredCharacters.length > 512 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Showing 512 of {filteredCharacters.length} characters. Use search to find specific characters.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
