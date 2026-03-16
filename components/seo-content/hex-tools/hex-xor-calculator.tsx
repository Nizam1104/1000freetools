import * as React from "react"

export default function HexXorCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter two hexadecimal values of equal or different lengths. The XOR (exclusive OR) calculator processes each bit position, outputting 1 when bits differ and 0 when they're the same.
          </p>
          <p>
            For inputs of different lengths, the shorter value is zero-padded on the left to match. The operation is performed byte-by-byte, with results displayed in hexadecimal format.
          </p>
          <p>
            XOR has useful properties: A XOR A = 0, A XOR 0 = A, and A XOR B XOR A = B. This makes it valuable for cryptography, checksums, and data manipulation. Results copy with one click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Simple Encryption</h3>
            <p className="text-sm text-muted-foreground">
              XOR data with a key for basic encryption. XOR again with the same key to decrypt.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Checksum Calculation</h3>
            <p className="text-sm text-muted-foreground">
              XOR multiple values together to create a simple parity checksum for error detection.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Bitmask Operations</h3>
            <p className="text-sm text-muted-foreground">
              Toggle specific bits by XORing with a mask. Useful for flag manipulation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cryptography Study</h3>
            <p className="text-sm text-muted-foreground">
              Understand XOR-based cipher operations used in stream ciphers and block cipher modes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">CTF Challenges</h3>
            <p className="text-sm text-muted-foreground">
              Solve XOR-based crypto challenges common in cybersecurity competitions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Comparison</h3>
            <p className="text-sm text-muted-foreground">
              XOR two values to find which bits differ. Non-zero result indicates differences.
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
              <strong className="text-foreground">XOR truth table:</strong> 0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1, 1 XOR 1 = 0. Output is 1 only when inputs differ.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Reversible operation:</strong> XOR is its own inverse. (A XOR B) XOR B = A. This property enables simple encryption/decryption.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Length handling:</strong> Different length inputs are zero-padded. 0xFF XOR 0x1234 = 0x00FF XOR 0x1234 = 0x12CB.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">XOR with zero:</strong> Any value XOR 0 equals itself. XOR with all 1s (0xFF, 0xFFFF) inverts all bits.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Not secure encryption:</strong> Simple XOR with repeating key is easily broken. Use proper encryption algorithms for security.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0xFF XOR 0x0F?</h3>
            <p className="text-sm text-muted-foreground">
              0xFF XOR 0x0F = 0xF0. Binary: 11111111 XOR 00001111 = 11110000. Bits that differ become 1.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I XOR hex manually?</h3>
            <p className="text-sm text-muted-foreground">
              Convert to binary, XOR each bit position, convert back to hex. Or use this calculator for instant results.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I XOR more than two values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. XOR is associative. XOR the first two, then XOR the result with the third, and so on.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is XOR used for in crypto?</h3>
            <p className="text-sm text-muted-foreground">
              XOR combines plaintext with keystream in stream ciphers. It's also used in block cipher modes like CBC and CTR.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What happens if I XOR a value with itself?</h3>
            <p className="text-sm text-muted-foreground">
              Any value XOR itself equals 0. All bits match, so all output bits are 0. This is useful for zeroing registers in assembly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I decrypt XOR-encrypted data?</h3>
            <p className="text-sm text-muted-foreground">
              XOR the ciphertext with the same key again. XOR encryption is symmetric - encryption and decryption use the same operation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's XOR checksum?</h3>
            <p className="text-sm text-muted-foreground">
              XOR all data bytes together for a simple checksum. It detects odd numbers of bit flips but misses even numbers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
