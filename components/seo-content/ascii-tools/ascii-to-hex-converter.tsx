import React from "react"

export default function AsciiToHexConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts ASCII text to hexadecimal representation. Each
            character becomes its ASCII code expressed in base-16 (hexadecimal)
            using two digits (00-FF).
          </p>
          <p>
            The converter takes each character, finds its ASCII value (0-127),
            and converts to hex. For example, 'A' is ASCII 65, which is 0x41
            in hex. Spaces and formatting options make the output readable.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">ABC</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">41 42 43</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">48 65 6c 6c 6f</code>
              </div>
            </div>
          </div>
          <p>
            Type text to see hex output instantly. Choose output format:
            space-separated, continuous, or with 0x prefix. Reverse conversion
            (hex to ASCII) also works.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reading hex dumps in debugging</h3>
            <p className="text-sm text-muted-foreground">
              A developer examines a memory dump showing hex values. They
              convert known text strings to hex to locate them in the dump,
              helping identify where data sits in memory.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating byte arrays for code</h3>
            <p className="text-sm text-muted-foreground">
              A programmer needs a byte array containing specific text. They
              convert to hex and format as {"{0x48, 0x65, 0x6c, 0x6c, 0x6f}"}
              for C/C++ code or [0x48, 0x65, ...] for other languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing network packet captures</h3>
            <p className="text-sm text-muted-foreground">
              A network engineer inspects packet data in Wireshark. They
              convert expected text to hex to find it in the payload,
              verifying that the correct data is being transmitted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with color codes in design</h3>
            <p className="text-sm text-muted-foreground">
              A designer converts text to hex for creative encoding in CSS
              or SVG. They might encode hidden messages in color values or
              create data-driven visualizations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for hex editors</h3>
            <p className="text-sm text-muted-foreground">
              Someone modifies a binary file and needs to find a specific
              string. They convert the text to hex, then search for that
              hex pattern in the hex editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building forensic analysis tools</h3>
            <p className="text-sm text-muted-foreground">
              A digital forensics analyst creates signatures for known file
              types. They convert magic bytes (file headers) to hex patterns
              for automated file identification.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hex output is typically lowercase.</strong>
              Hex digits a-f can be uppercase or lowercase. 0x4a and 0x4A
              mean the same thing. This tool uses lowercase by default but
              both are valid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Each character becomes two hex digits.</strong>
              ASCII characters (0-127) fit in one byte, shown as two hex
              digits. 'A' is 41, not just 41. Leading zeros matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 encoding affects non-ASCII characters.</strong>
              Characters outside ASCII (like é or 中文) encode as multiple
              bytes in UTF-8. Each byte becomes two hex digits. É becomes
              C3 89, not a single value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">0x prefix indicates hexadecimal.</strong>
              Programming languages use 0x prefix to mark hex literals.
              0x41 means hex 41 (decimal 65). Without 0x, context determines
              the base.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Learn common hex values: 0x20=space,
              0x30-0x39=digits, 0x41-0x5A=uppercase, 0x61-0x7A=lowercase.
              The pattern makes hex dumps easier to read.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is hex 41 in text?</h3>
            <p className="text-sm text-muted-foreground">
              Hex 41 is decimal 65, which is ASCII 'A'. Uppercase letters
              start at 0x41 ('A') and go to 0x5A ('Z'). Lowercase 'a' is
              0x61.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert hex back to text?</h3>
            <p className="text-sm text-muted-foreground">
              Paste hex values like "48 65 6c 6c 6f" and the tool converts
              each pair to its ASCII character. Spaces are optional. The
              result spells "Hello".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use hex instead of decimal?</h3>
            <p className="text-sm text-muted-foreground">
              Hex maps cleanly to binary—each digit is 4 bits. Two hex digits
              make one byte (8 bits). This makes hex ideal for representing
              binary data compactly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert binary files to hex?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles text input. For binary files, use a hex editor
              or command-line tools like xxd or hexdump. The concept is the
              same—each byte becomes two hex digits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the hex for space character?</h3>
            <p className="text-sm text-muted-foreground">
              Space is ASCII 32, which is 0x20 in hex. In a hex dump, spaces
              appear as 20 between other characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is hex encoding reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, hex encoding is lossless. Convert text to hex, then hex
              back to text—you get the original exactly. No information is
              lost in the conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I format hex for code?</h3>
            <p className="text-sm text-muted-foreground">
              Common formats: space-separated (48 65 6c), comma-separated
              (0x48, 0x65, 0x6c), or array format ([0x48, 0x65, 0x6c]).
              Choose based on your language's syntax.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
