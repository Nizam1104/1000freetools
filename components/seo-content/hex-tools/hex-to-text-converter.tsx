import * as React from "react"

export default function HexToTextConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter hexadecimal data representing encoded text. The converter processes pairs of hex digits as bytes and translates them to characters using ASCII or UTF-8 encoding.
          </p>
          <p>
            Choose between ASCII (for basic English text) and UTF-8 (for international characters and emoji). The converter handles multi-byte UTF-8 sequences correctly, reconstructing full characters from their component bytes.
          </p>
          <p>
            Results display instantly as you type. Non-printable bytes are shown as dots or escape sequences. Copy the decoded text with one click for use in documents or further processing.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Reverse Engineering</h3>
            <p className="text-sm text-muted-foreground">
              Extract readable strings from hex dumps of binaries, firmware, or memory captures.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">CTF Competitions</h3>
            <p className="text-sm text-muted-foreground">
              Decode hex-encoded flags and messages in cybersecurity capture-the-flag challenges.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Read hex-encoded fields in log files to understand application behavior and errors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Recovery</h3>
            <p className="text-sm text-muted-foreground">
              Extract text from corrupted files or raw disk data represented in hex format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Network Forensics</h3>
            <p className="text-sm text-muted-foreground">
              Decode text payloads from packet captures for security analysis and investigation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex string literals in code to readable text for debugging and documentation.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Byte pairs:</strong> Each pair of hex digits represents one byte/character. "48 65" = "He". Spaces between pairs are optional.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">ASCII vs UTF-8:</strong> ASCII handles 0x00-0x7F. UTF-8 extends to all Unicode using 1-4 bytes per character for international text.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Non-printable characters:</strong> Control codes (0x00-0x1F) don't display. They're shown as escape sequences or placeholder symbols.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Null termination:</strong> C strings end with 0x00 (null). This tool shows null as a character; some systems treat it as string end.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case insensitive:</strong> Input accepts uppercase or lowercase hex letters. Output text depends on the encoded content, not input case.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0x48656C6C6F as text?</h3>
            <p className="text-sm text-muted-foreground">
              0x48656C6C6F decodes to "Hello". Each pair: 48=H, 65=e, 6C=l, 6C=l, 6F=o.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert hex to text manually?</h3>
            <p className="text-sm text-muted-foreground">
              Look up each byte pair in an ASCII table. 0x41='A', 0x42='B', etc. Or use this converter for speed and accuracy.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I decode emoji from hex?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use UTF-8 mode. Emoji are multi-byte: 😀 is F0 9F 98 80. The converter reconstructs the full character.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if I see garbage characters?</h3>
            <p className="text-sm text-muted-foreground">
              The hex may not be text data, or you may need to switch between ASCII and UTF-8 encoding modes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert text to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use the text-to-hex converter for the reverse operation, encoding readable text as hex bytes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does 00 mean in hex text?</h3>
            <p className="text-sm text-muted-foreground">
              0x00 is the null character. In C it terminates strings. In other contexts it's just a non-printable byte.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I handle spaces in hex?</h3>
            <p className="text-sm text-muted-foreground">
              Spaces between hex pairs are ignored. "48 65 6C 6C 6F" and "48656C6C6F" both decode to "Hello".
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
