import React from "react"

export default function HammingCodeEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Hamming Code Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter binary data to encode with Hamming error correction, or input Hamming-encoded data to decode and check for errors. Select the Hamming code variant: (7,4), (15,11), or custom.
          </p>
          <p>
            Hamming codes add parity bits at positions that are powers of 2 (1, 2, 4, 8...). Data bits fill the remaining positions. The encoder calculates parity based on specific bit positions.
          </p>
          <p>
            The decoder checks parity bits to detect and correct single-bit errors. If an error is found, the tool identifies and fixes the erroneous bit. Double-bit errors are detected but not corrected.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning error correction</h3>
            <p className="text-sm text-muted-foreground">
              Hamming codes are taught in computer science courses. Work through examples to understand error detection and correction. Visual learning tool for students.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding ECC memory</h3>
            <p className="text-sm text-muted-foreground">
              ECC RAM uses Hamming-like codes. Understand how memory corrects bit flips. See how parity bits protect data integrity in servers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing communication protocols</h3>
            <p className="text-sm text-muted-foreground">
              Building a protocol that needs error correction? Hamming codes add minimal overhead. Good for low-error-rate channels with single-bit errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Simulating transmission errors</h3>
            <p className="text-sm text-muted-foreground">
              Test how Hamming codes handle errors. Encode data, flip bits, decode to see correction in action. Educational demonstration of error resilience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with embedded systems</h3>
            <p className="text-sm text-muted-foreground">
              Some microcontrollers use Hamming codes for flash memory. Understand the encoding for firmware development. Debug memory corruption issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing data storage systems</h3>
            <p className="text-sm text-muted-foreground">
              RAID systems and SSDs use error correction. Hamming codes are foundational. Understand the principles behind more complex codes like Reed-Solomon.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Single-bit error correction only.</strong>
              Hamming codes correct exactly one bit error per codeword. Two-bit errors may be detected as uncorrectable. For multiple errors, use stronger codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Overhead increases with protection.</strong>
              (7,4) code: 3 parity bits for 4 data bits (75% overhead). (15,11): 4 parity for 11 data (36% overhead). Larger blocks are more efficient.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Parity bit positions are fixed.</strong>
              Positions 1, 2, 4, 8... are always parity. Other positions hold data. This pattern enables error location calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SECDED adds another parity bit.</strong>
              SECDED (Single Error Correction, Double Error Detection) adds one overall parity bit. Detects two-bit errors that standard Hamming might miss.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> The syndrome (parity check result) directly gives the error position. Syndrome 0 means no error. Syndrome 5 means bit 5 is wrong. This elegant property makes Hamming codes efficient.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does (7,4) mean?</h3>
            <p className="text-sm text-muted-foreground">
              7 total bits, 4 data bits. The remaining 3 are parity bits. Every 4 bits of data become 7 bits when encoded. 75% overhead but single-error correction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are parity positions calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Parity bit 1 covers positions 1,3,5,7,9... Parity bit 2 covers 2,3,6,7,10,11... Each parity bit covers positions where its bit is set in the binary index.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it correct burst errors?</h3>
            <p className="text-sm text-muted-foreground">
              No, Hamming codes assume random single-bit errors. Burst errors (multiple adjacent bits) require interleaving or different codes like convolutional codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the minimum distance?</h3>
            <p className="text-sm text-muted-foreground">
              Hamming (7,4) has minimum distance 3. This means any two valid codewords differ by at least 3 bits. Enables single-error correction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does error location work?</h3>
            <p className="text-sm text-muted-foreground">
              Recalculate all parity bits. The pattern of failed parity checks forms a binary number. This number is the position of the erroneous bit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Hamming code still used?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in ECC memory, some storage systems, and as a building block for more complex codes. Foundation for understanding modern error correction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about extended Hamming code?</h3>
            <p className="text-sm text-muted-foreground">
              Extended Hamming adds an overall parity bit. (8,4) instead of (7,4). Detects double-bit errors. Can't correct them but knows correction failed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
