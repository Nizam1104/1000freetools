import * as React from "react"

export default function TextToHexConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter or paste any text into the input field. The converter transforms each character into its hexadecimal representation using ASCII or UTF-8 encoding, showing the hex value for every byte.
          </p>
          <p>
            Choose between different output formats: continuous hex string, space-separated bytes, or formatted with "0x" prefixes. Select the encoding (ASCII for basic characters, UTF-8 for Unicode support including emojis and international characters).
          </p>
          <p>
            The conversion happens in real-time as you type. Copy the hex output with one click, or use the reverse converter to transform hex back to readable text. Special characters and whitespace are clearly represented in the output.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">String Literal Encoding</h3>
            <p className="text-sm text-muted-foreground">
              Convert strings to hex for use in code, especially for obfuscation or embedding binary-safe data.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Forensics</h3>
            <p className="text-sm text-muted-foreground">
              Search for text strings within hex dumps of files, memory, or disk images during investigations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Protocol Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Encode text messages in hex format for network protocol testing and packet crafting.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Database Storage</h3>
            <p className="text-sm text-muted-foreground">
              Convert text to hex for storage in binary database fields or for hex-encoded transmission.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">CTF Challenges</h3>
            <p className="text-sm text-muted-foreground">
              Decode hex-encoded flags and messages in capture-the-flag cybersecurity competitions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Embedded Systems</h3>
            <p className="text-sm text-muted-foreground">
              Prepare text strings for transmission to embedded devices that expect hex-encoded commands.
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
              <strong className="text-foreground">ASCII vs UTF-8:</strong> ASCII encodes basic Latin characters as single bytes. UTF-8 uses 1-4 bytes per character, supporting all Unicode characters including emojis.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Byte order:</strong> Text is converted left-to-right, with each character's bytes appearing in order. Multi-byte UTF-8 characters maintain their byte sequence.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Whitespace handling:</strong> Spaces, tabs, and newlines are all converted to their hex equivalents (space = 0x20, newline = 0x0A).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity:</strong> Output hex is typically uppercase (A-F) for consistency, but lowercase is equally valid in most contexts.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Null characters:</strong> The null character (ASCII 0) converts to 0x00. This is important for C-style strings which are null-terminated.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is "Hello" in hex?</h3>
            <p className="text-sm text-muted-foreground">
              "Hello" in ASCII hex is: 48 65 6C 6C 6F. Each letter converts to its ASCII code: H=72=0x48, e=101=0x65, l=108=0x6C, o=111=0x6F.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert emojis to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Use UTF-8 encoding mode. Emojis are multi-byte characters. For example, 😀 encodes as F0 9F 98 80 in UTF-8 hex (4 bytes).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert hex back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use the hex-to-text converter tool which reverses this process, transforming hex bytes back into readable characters.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the hex for a newline?</h3>
            <p className="text-sm text-muted-foreground">
              A newline (line feed) is 0x0A in hex. Windows uses CRLF (0x0D 0x0A), while Unix/Linux and macOS use just LF (0x0A).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why use hex for text?</h3>
            <p className="text-sm text-muted-foreground">
              Hex representation is binary-safe and human-readable. It's useful for transmitting text through systems that might corrupt special characters or for examining raw data.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I include hex in my code?</h3>
            <p className="text-sm text-muted-foreground">
              Format depends on language: C/Java use \x48 for bytes, Python uses b'\x48', JavaScript uses \x48 in strings. Choose the output format that matches your needs.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What about non-English text?</h3>
            <p className="text-sm text-muted-foreground">
              Use UTF-8 encoding mode for international text. Characters like é, ñ, or 中文 will be encoded as multi-byte sequences correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
