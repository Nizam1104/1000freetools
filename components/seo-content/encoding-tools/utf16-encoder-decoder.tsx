import React from "react"

export default function Utf16EncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the UTF-16 Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text to encode, or paste UTF-16 hex bytes to decode. Select the byte order: Big Endian (BE) or Little Endian (LE). The conversion happens instantly as you type.
          </p>
          <p>
            UTF-16 represents each character as one or two 16-bit code units. Common characters use one unit. Rare characters outside the Basic Multilingual Plane use surrogate pairs - two 16-bit values.
          </p>
          <p>
            BOM (Byte Order Mark) handling is automatic. The encoder can add a BOM to indicate byte order. The decoder detects and removes BOM automatically. Choose whether to include BOM in your output.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging Windows API calls</h3>
            <p className="text-sm text-muted-foreground">
              Windows uses UTF-16 internally for strings. When debugging API calls, you'll see UTF-16 byte sequences. Decode them to understand what strings are being passed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing binary file formats</h3>
            <p className="text-sm text-muted-foreground">
              Many file formats store strings as UTF-16. Extract string data from binaries by decoding UTF-16 sequences. Identify file metadata and embedded text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with Java strings</h3>
            <p className="text-sm text-muted-foreground">
              Java uses UTF-16 internally for String objects. When examining Java memory or serialized data, strings appear as UTF-16. Decode to read the actual text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing Windows registry exports</h3>
            <p className="text-sm text-muted-foreground">
              Registry files store strings in UTF-16 LE. When parsing registry hives programmatically, decode UTF-16 LE to read key names and values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling XML with BOM</h3>
            <p className="text-sm text-muted-foreground">
              XML files may start with UTF-16 BOM. Detect the BOM to determine encoding and byte order. Properly decode the XML content for parsing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Forensic text extraction</h3>
            <p className="text-sm text-muted-foreground">
              Digital forensics often involves extracting text from raw data. Identify UTF-16 encoded strings in memory dumps or disk images. Decode for analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Byte order matters.</strong>
              Big Endian stores high byte first. Little Endian stores low byte first. Windows uses LE. Network protocols typically use BE. Mismatched order produces garbage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BOM indicates byte order.</strong>
              BOM is FEFF for BE, FFFE for LE. It's optional but helpful. Some systems require BOM, others reject it. Know your target system's expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Surrogate pairs represent rare characters.</strong>
              Characters above U+FFFF use two 16-bit values. Emoji and many CJK characters need surrogate pairs. Decoding handles these automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-16 isn't always 2 bytes per character.</strong>
              Common characters use 2 bytes. Rare characters use 4 bytes (surrogate pairs). Average is slightly over 2 bytes per character for mixed text.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When decoding unknown UTF-16, try both byte orders. One will produce readable text, the other will look like alternating null bytes. The readable one is correct.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between UTF-16 BE and LE?</h3>
            <p className="text-sm text-muted-foreground">
              Byte order. BE stores high byte first (network order). LE stores low byte first (Intel/Windows order). Same data, different byte arrangement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I include BOM?</h3>
            <p className="text-sm text-muted-foreground">
              Include BOM when the reader might not know the byte order. Omit BOM when byte order is specified elsewhere or for protocols that don't expect BOM.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I identify UTF-16 in a file?</h3>
            <p className="text-sm text-muted-foreground">
              Look for BOM at the start: FEFF (BE) or FFFE (LE). Without BOM, look for patterns - ASCII text in UTF-16 has alternating null bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use UTF-16 over UTF-8?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-16 provides fixed-width for common characters. Windows and Java use it internally. UTF-8 is more space-efficient for ASCII-heavy text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can UTF-16 represent all Unicode?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, UTF-16 covers all Unicode code points. Characters above U+FFFF use surrogate pairs. All valid Unicode can be encoded in UTF-16.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are surrogate pairs?</h3>
            <p className="text-sm text-muted-foreground">
              Two 16-bit values that together represent one character above U+FFFF. High surrogate (D800-DFFF) followed by low surrogate (DC00-DFFF).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is UTF-16 compatible with ASCII?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. ASCII characters in UTF-16 have a null byte. "A" is 0041 in UTF-16 BE, not 41 as in ASCII. Conversion is needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
