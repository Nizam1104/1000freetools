import React from "react"

export default function TextToBinaryConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts text to binary representation. Each character
            becomes its ASCII code expressed in 8-bit binary (base-2), using
            only 0s and 1s.
          </p>
          <p>
            The converter takes each character, finds its ASCII value, and
            converts to binary. For example, 'A' is ASCII 65, which is
            01000001 in binary (64 + 1 = 65).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">A</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">01000001</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hi</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">01001000 01101001</code>
              </div>
            </div>
          </div>
          <p>
            Type text to see binary output instantly. Choose output format:
            space-separated bytes, continuous stream, or with line breaks.
            Reverse conversion (binary to text) also works.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning how computers store text</h3>
            <p className="text-sm text-muted-foreground">
              A computer science student studies data representation. They
              convert their name to binary to understand that all text is
              just numbers, and all numbers are just bits in memory.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating binary puzzles and ciphers</h3>
            <p className="text-sm text-muted-foreground">
              A teacher makes a cryptography exercise where students decode
              binary messages. They convert clues to binary and students
              practice binary-to-text conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging bit-level protocols</h3>
            <p className="text-sm text-muted-foreground">
              An embedded engineer works with a protocol that sends text as
              raw bits. They convert expected messages to binary to verify
              the bit stream matches what the device sends.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making binary-themed designs</h3>
            <p className="text-sm text-muted-foreground">
              A designer creates tech-themed artwork with binary patterns.
              They convert meaningful words to binary and incorporate the
              0s and 1s into the visual design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing binary serialization code</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes code that serializes strings to binary.
              They use this tool to generate expected output for test
              cases, verifying their implementation is correct.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding network packet structure</h3>
            <p className="text-sm text-muted-foreground">
              A networking student analyzes packet captures and sees binary
              data. They convert known text to binary to identify string
              fields in the packet structure.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Each character uses 8 bits (1 byte).</strong>
              Standard ASCII fits in 8 bits. The leading bit is always 0 for
              ASCII (0-127). Extended ASCII (128-255) uses the full 8 bits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros matter.</strong>
              'A' is 65, which is 1000001 in pure binary. But we show 01000001
              (8 bits) because computers store full bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode characters need more bits.</strong>
              Emoji and non-Latin scripts use multiple bytes in UTF-8. Each
              byte becomes 8 bits. A single emoji might be 32+ bits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Binary is case-insensitive for input.</strong>
              When converting from binary, 01000001 and 01000001 both mean
              'A'. Case only matters for the text output, not the binary
              representation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Fun fact:</strong> Binary code isn't how computers
              actually store data internally. They use electrical signals,
              magnetic states, or charge levels. Binary is just our way
              of representing those states.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is binary code?</h3>
            <p className="text-sm text-muted-foreground">
              Binary code represents data using only two symbols: 0 and 1.
              Computers use binary because electronic circuits easily
              represent two states (on/off, high/low voltage).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I read binary text?</h3>
            <p className="text-sm text-muted-foreground">
              Split into 8-bit groups. Convert each group to decimal. Look
              up the ASCII character. 01001000 = 72 = 'H', 01101001 = 105 = 'i'.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why 8 bits per character?</h3>
            <p className="text-sm text-muted-foreground">
              8 bits (1 byte) can represent 256 values (0-255), enough for
              ASCII plus extended characters. It became the standard unit
              of data in most computer systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert images to binary?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts text. Images are already binary data. You
              could view an image file as binary, but it would be millions
              of 0s and 1s without the structure that makes it an image.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the binary for space?</h3>
            <p className="text-sm text-muted-foreground">
              Space is ASCII 32, which is 00100000 in binary. It's a valid
              character with its own binary code, just like letters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is binary the same as machine code?</h3>
            <p className="text-sm text-muted-foreground">
              Machine code is binary, but not all binary is machine code.
              Machine code specifically refers to CPU instructions. Text
              encoded as binary is data, not instructions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I write my name in binary?</h3>
            <p className="text-sm text-muted-foreground">
              Convert each letter: J=01001010, o=01101111, h=01101000, n=01101110.
              Put them together: 01001010 01101111 01101000 01101110.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
