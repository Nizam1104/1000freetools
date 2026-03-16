import * as React from "react"

export default function DecimalToHexConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a decimal number in the input field. The converter transforms it to hexadecimal format using division-by-16 method, displaying the result with or without the "0x" prefix based on your preference.
          </p>
          <p>
            For negative numbers, toggle signed mode to see the two's complement representation. Choose your desired bit width (8, 16, 32, or 64 bits) to see how the number is represented in fixed-width binary systems.
          </p>
          <p>
            The conversion happens instantly as you type. Large numbers are handled using BigInt arithmetic for full precision. Copy the hex result with one click for use in code, documentation, or further calculations.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming Constants</h3>
            <p className="text-sm text-muted-foreground">
              Convert decimal values to hex for bitmasks, flags, and magic numbers in source code.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Color Conversion</h3>
            <p className="text-sm text-muted-foreground">
              Convert decimal RGB values (0-255) to hex color codes for web design and CSS.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Memory Addresses</h3>
            <p className="text-sm text-muted-foreground">
              Convert decimal memory offsets or addresses to hex for debugging and documentation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Error Codes</h3>
            <p className="text-sm text-muted-foreground">
              Look up hexadecimal error codes and status values from decimal system outputs.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Hardware Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Set register values, I/O addresses, and configuration parameters in hex format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Math Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn base conversion by seeing decimal-to-hex transformations with verification.
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
              <strong className="text-foreground">Division method:</strong> Convert by repeatedly dividing by 16 and collecting remainders. Remainders 10-15 become A-F in hex.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Two's complement:</strong> Negative numbers in computers use two's complement. For -1 in 8-bit: invert all bits of 1, add 1, giving 0xFF.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Bit width matters:</strong> The same decimal value has different hex representations at different bit widths when negative. Positive values pad with leading zeros.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">0x prefix:</strong> Many programming languages use "0x" to indicate hex literals. This is optional but helps distinguish from decimal.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case convention:</strong> Hex letters are typically uppercase (A-F) in most technical contexts, though lowercase is equally valid.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is 255 in hex?</h3>
            <p className="text-sm text-muted-foreground">
              255 in decimal equals 0xFF in hex. This is the maximum value for an 8-bit byte (all 8 bits set to 1).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert decimal to hex manually?</h3>
            <p className="text-sm text-muted-foreground">
              Divide by 16 repeatedly, tracking remainders. For 419: 419÷16=26 R3, 26÷16=1 R10(A), 1÷16=0 R1. Read remainders backward: 1A3.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is -1 in hex?</h3>
            <p className="text-sm text-muted-foreground">
              In two's complement: 8-bit = 0xFF, 16-bit = 0xFFFF, 32-bit = 0xFFFFFFFF, 64-bit = 0xFFFFFFFFFFFFFFFF. All bits are 1.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert RGB to hex color?</h3>
            <p className="text-sm text-muted-foreground">
              Convert each RGB component (0-255) to 2-digit hex. RGB(255, 128, 64) = #FF8040. Pad single-digit results with leading zero.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert very large numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The converter uses BigInt for arbitrary precision, handling numbers far beyond standard 64-bit limits.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does my hex have leading zeros?</h3>
            <p className="text-sm text-muted-foreground">
              Leading zeros indicate fixed bit width. 0x00FF is 16-bit representation of 255, showing it fits in 2 bytes with the high byte being zero.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the hex for 1024?</h3>
            <p className="text-sm text-muted-foreground">
              1024 in decimal equals 0x400 in hex. This is 2^10, a common value in computing (1 kilobyte in bytes).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
