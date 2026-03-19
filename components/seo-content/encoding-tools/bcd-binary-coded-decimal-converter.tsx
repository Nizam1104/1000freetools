import React from "react"

export default function BcdBinaryCodedDecimalConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the BCD Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a decimal number to convert to Binary-Coded Decimal (BCD), or input BCD to convert back to decimal. The conversion happens instantly as you type.
          </p>
          <p>
            Each decimal digit (0-9) is represented by exactly 4 bits in BCD. For example, decimal 25 becomes 0010 0101 in BCD - each digit encoded separately, not as pure binary.
          </p>
          <p>
            Choose between packed BCD (two digits per byte) or unpacked BCD (one digit per byte). Packed is more space-efficient. Unpacked is simpler for some hardware interfaces.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with digital clocks</h3>
            <p className="text-sm text-muted-foreground">
              RTC chips often store time in BCD format. Hours, minutes, seconds each use one byte in packed BCD. Convert to decimal for display or calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reading 7-segment displays</h3>
            <p className="text-sm text-muted-foreground">
              7-segment display drivers accept BCD input. Each digit's segment pattern corresponds to BCD values. Convert decimal to BCD for display control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing financial data</h3>
            <p className="text-sm text-muted-foreground">
              Some financial systems use BCD for exact decimal representation. Avoids floating-point rounding errors. Convert BCD to decimal for calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Interfacing with PLCs</h3>
            <p className="text-sm text-muted-foreground">
              Industrial PLCs often use BCD for numeric I/O. Thumbwheel switches output BCD. Seven-segment displays expect BCD. Convert for proper interfacing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decoding barcode data</h3>
            <p className="text-sm text-muted-foreground">
              Some barcode formats encode digits in BCD. Decode the barcode to BCD first, then convert to decimal or ASCII for the actual data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with legacy systems</h3>
            <p className="text-sm text-muted-foreground">
              Older mainframes and minicomputers used BCD extensively. COBOL programs often store numbers in BCD. Convert for modern system integration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BCD uses more bits than pure binary.</strong>
              4 bits can represent 0-15, but BCD only uses 0-9. Values 10-15 (A-F) are invalid in BCD. This wastes some encoding space but simplifies decimal conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Packed vs unpacked affects storage.</strong>
              Packed BCD stores two digits per byte (0-99). Unpacked stores one digit per byte (0-9). Packed halves the storage requirement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BCD avoids rounding errors.</strong>
              Binary floating-point can't exactly represent many decimals. BCD represents decimals exactly. Important for financial calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Invalid BCD values exist.</strong>
              Binary values 1010-1111 (A-F hex) are invalid in BCD. If you see these, the data isn't valid BCD or uses a different encoding.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When reading BCD from hardware, verify each nibble is 0-9. Invalid values indicate communication errors or wrong byte order. Always validate BCD input.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from regular binary?</h3>
            <p className="text-sm text-muted-foreground">
              Binary 25 is 11001. BCD 25 is 0010 0101 (2 and 5 separately). Binary is more compact. BCD converts to decimal digits more easily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use BCD instead of binary?</h3>
            <p className="text-sm text-muted-foreground">
              BCD simplifies decimal display and input. No division needed to extract digits. Hardware for 7-segment displays works directly with BCD.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can BCD represent negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Standard BCD doesn't include sign. Some systems use a separate sign byte or reserve one nibble for sign (C for +, D for -).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's zoned decimal?</h3>
            <p className="text-sm text-muted-foreground">
              Zoned decimal is unpacked BCD with zone bits. Each byte has a zone (high nibble) and digit (low nibble). Common in IBM mainframes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate with BCD?</h3>
            <p className="text-sm text-muted-foreground">
              Convert to decimal first, calculate, then convert back. Some CPUs have BCD arithmetic instructions. Software BCD math is complex and slow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where is BCD still used today?</h3>
            <p className="text-sm text-muted-foreground">
              RTC chips, digital meters, industrial controls, financial systems, and legacy mainframe applications. Less common in modern computing but still relevant.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum BCD value?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on how many digits you have. One byte packed BCD: 99. Two bytes: 9999. Each additional byte adds two more decimal digits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
