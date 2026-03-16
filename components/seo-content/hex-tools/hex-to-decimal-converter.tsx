import * as React from "react"

export default function HexToDecimalConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a hexadecimal number in the input field. The converter accepts numbers with or without the "0x" prefix and handles both uppercase and lowercase letters. Paste entire columns of hex values for batch conversion.
          </p>
          <p>
            The conversion uses BigInt arithmetic to handle arbitrarily large numbers without precision loss. Results appear instantly as you type, with the decimal value displayed in standard base-10 format.
          </p>
          <p>
            Toggle signed mode to interpret the hex value as a two's complement signed number. This is essential for working with memory values, sensor data, or any binary data that uses signed representations.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming Debugging</h3>
            <p className="text-sm text-muted-foreground">
              Convert memory addresses, register values, or error codes from hex dumps to understand their decimal equivalents.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Color Code Conversion</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex color codes to decimal RGB values for use in applications that require separate channel values.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex-encoded sensor readings, instrument outputs, or log file values to decimal for analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Network Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Interpret packet captures and network traces that display values in hexadecimal format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Cryptography</h3>
            <p className="text-sm text-muted-foreground">
              Convert cryptographic hashes, keys, or encrypted values between hex and decimal representations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn number base conversion by seeing hex-to-decimal transformations with step-by-step verification.
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
              <strong className="text-foreground">Positional notation:</strong> Each hex digit represents a power of 16. The rightmost digit is 16^0, next is 16^1, then 16^2, and so on.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Signed vs unsigned:</strong> Unsigned hex treats all bits as magnitude. Signed (two's complement) uses the highest bit as a sign indicator for negative numbers.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Leading zeros:</strong> Leading zeros don't affect the value (0x00FF = 0xFF = 255). They're often used for padding to fixed widths.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case insensitive:</strong> Hex letters A-F and a-f represent the same values (10-15). The converter accepts either format.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Large number support:</strong> Unlike some calculators limited to 32 or 64 bits, this tool handles hex numbers of any length using BigInt.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert hex to decimal manually?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply each digit by 16 raised to its position power, then sum. For example: 1A3 = (1×16²) + (10×16¹) + (3×16⁰) = 256 + 160 + 3 = 419.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is 0xFF in decimal?</h3>
            <p className="text-sm text-muted-foreground">
              0xFF equals 255 in decimal. This is a common value representing maximum byte value (8 bits all set to 1) or pure red/blue/green in color codes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I handle negative hex numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Enable signed mode to interpret hex as two's complement. For example, 0xFF as a signed 8-bit value is -1, but as unsigned it's 255.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert decimal to hex?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts hex to decimal. For the reverse, use the decimal-to-hex converter tool which performs the opposite transformation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the largest hex number I can convert?</h3>
            <p className="text-sm text-muted-foreground">
              There's no practical limit. The converter uses JavaScript BigInt which can handle numbers with thousands of digits, limited only by browser memory.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does my hex color have letters?</h3>
            <p className="text-sm text-muted-foreground">
              Hex colors use A-F to represent values 10-15. For example, #FF0000 is pure red (255, 0, 0). Letters allow representing all 256 values per channel in just 2 digits.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert a column of hex values?</h3>
            <p className="text-sm text-muted-foreground">
              Paste multiple hex values (one per line) into the input. The converter processes each line and displays all results for batch conversion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
