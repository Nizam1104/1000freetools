import * as React from "react"

export default function HexAdditionSubtractionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter two hexadecimal numbers in the input fields and select whether to add or subtract them. The calculator accepts hex numbers with or without the "0x" prefix and handles both uppercase and lowercase letters (A-F or a-f).
          </p>
          <p>
            The calculation is performed using arbitrary-precision arithmetic to handle very large hex numbers accurately. Results are displayed in hexadecimal format with options to also view the decimal equivalent for verification.
          </p>
          <p>
            For subtraction, if the result would be negative, the calculator displays the result with a negative sign and shows the two's complement representation for fixed-width operations. Copy results with a single click for use in your code or documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Memory Address Calculation</h3>
            <p className="text-sm text-muted-foreground">
              Calculate memory offsets, base addresses, and pointer arithmetic in hexadecimal for low-level programming.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Color Value Adjustments</h3>
            <p className="text-sm text-muted-foreground">
              Adjust RGB color values in hex format for design work, calculating lighter or darker variations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Checksum Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Add hex values when computing checksums, CRC values, or verifying data integrity in protocols.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Assembly Programming</h3>
            <p className="text-sm text-muted-foreground">
              Perform address calculations and offset computations common in assembly language programming.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Network Addressing</h3>
            <p className="text-sm text-muted-foreground">
              Calculate IPv6 address ranges, subnet offsets, and MAC address modifications in hex format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cryptographic Operations</h3>
            <p className="text-sm text-muted-foreground">
              Work with hex-encoded cryptographic values, keys, and hashes that require arithmetic operations.
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
              <strong className="text-foreground">Hexadecimal basics:</strong> Hex uses digits 0-9 and letters A-F (representing 10-15). Each hex digit represents 4 binary bits, making it compact for representing binary data.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Carry and borrow:</strong> Hex addition carries at 16 (not 10), and subtraction borrows 16. For example, F + 1 = 10 in hex (15 + 1 = 16 in decimal).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Two's complement:</strong> For negative results in fixed-width operations, the two's complement representation is shown. This is how computers store negative numbers.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">No overflow limits:</strong> This calculator uses arbitrary precision, so there's no overflow for very large numbers. Real systems may have width limits (8-bit, 16-bit, 32-bit, 64-bit).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case insensitive:</strong> Input accepts both uppercase (A-F) and lowercase (a-f) hex letters. Output is typically shown in uppercase for consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I add hex numbers manually?</h3>
            <p className="text-sm text-muted-foreground">
              Add digit by digit from right to left, carrying when the sum reaches 16. For example: 1A + 2B = 45 (A+B=25, which is 19 in hex, write 9 carry 1; 1+2+1=4).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does 0x mean?</h3>
            <p className="text-sm text-muted-foreground">
              "0x" is a prefix indicating a hexadecimal number. It's commonly used in programming languages like C, Python, and JavaScript to distinguish hex from decimal numbers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I subtract a larger hex number from a smaller one?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The result will be negative, shown with a minus sign. For computer arithmetic, you may also want the two's complement representation for a specific bit width.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I verify the calculation?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator shows both hex and decimal results. Convert to decimal, verify the math, then convert back to hex to confirm the answer is correct.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the maximum number size?</h3>
            <p className="text-sm text-muted-foreground">
              There's no practical limit. The calculator handles hex numbers of any length, limited only by your browser's memory capacity.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why use hex instead of decimal?</h3>
            <p className="text-sm text-muted-foreground">
              Hex aligns with binary (4 bits per digit), making it ideal for representing memory addresses, color values, and binary data more compactly than binary but more precisely than decimal.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I chain multiple operations?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one operation at a time. For multiple operations, use the result of one calculation as input for the next, or use a calculator that supports expressions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
