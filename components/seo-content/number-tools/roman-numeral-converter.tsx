import React from "react"

export default function RomanNumeralConverterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Roman Numeral Converter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts between Arabic numerals (1, 2, 3) and Roman numerals (I, II, III) in both directions.
            It handles standard Roman numeral notation including subtractive combinations like IV (4) and IX (9).
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Conversion Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter either an Arabic number (1-3999) or a Roman numeral</li>
            <li>The tool automatically detects the input type</li>
            <li>For Arabic to Roman: builds the numeral using additive and subtractive rules</li>
            <li>For Roman to Arabic: parses each symbol and applies subtractive notation</li>
            <li>Invalid Roman numerals are flagged with an error</li>
            <li>Results display with a breakdown of the conversion</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Historical Document Research</h3>
            <p className="text-sm text-muted-foreground">
              A historian encounters dates in Roman numerals in old manuscripts.
              They convert &quot;MCMXCIX&quot; to 1999 to properly catalog the document.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Movie Copyright Dates</h3>
            <p className="text-sm text-muted-foreground">
              A viewer sees &quot;MCMLXXXV&quot; at the end of a classic film and wants to know the year.
              The converter reveals it&apos;s 1985.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Clock Face Reading</h3>
            <p className="text-sm text-muted-foreground">
              Someone sees a clock with Roman numerals and isn&apos;t sure about &quot;IIII&quot; vs &quot;IV&quot; for 4.
              They learn that clock faces traditionally use IIII for aesthetic balance.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Outline and List Formatting</h3>
            <p className="text-sm text-muted-foreground">
              A writer formats document sections with Roman numerals (I, II, III for main sections,
              i, ii, iii for subsections) following style guide requirements.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Educational Exercises</h3>
            <p className="text-sm text-muted-foreground">
              A teacher creates worksheets converting between number systems.
              Students practice both directions to understand the additive and subtractive principles.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding Roman numeral rules and limitations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Standard range is 1-3999 (Romans didn&apos;t have a standard notation for larger numbers)</li>
            <li>Basic symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000</li>
            <li>Subtractive notation: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900</li>
            <li>Symbols can repeat up to 3 times (III=3, but 4 is IV not IIII)</li>
            <li>Smaller values before larger values indicate subtraction</li>
            <li>Input is case-insensitive (iv, IV, and Iv all work)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What are the basic Roman numeral symbols?</h3>
            <p className="text-sm text-muted-foreground">
              I=1, V=5, X=10, L=50, C=100, D=500, M=1000.
              These combine using addition (VI=6) and subtraction (IV=4) rules.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why is 4 sometimes IIII instead of IV?</h3>
            <p className="text-sm text-muted-foreground">
              On clock faces, IIII is traditional for visual balance with VIII on the opposite side.
              In standard notation, IV is correct (subtractive form).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do you write large numbers in Roman numerals?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Roman numerals max out at 3999 (MMMCMXCIX). For larger numbers,
              a bar over a numeral multiplied it by 1000, but this isn&apos;t universally supported.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does MMXXIV mean?</h3>
            <p className="text-sm text-muted-foreground">
              MMXXIV = 2024. MM = 2000, XX = 20, IV = 4.
              This is commonly seen in copyright dates and event naming (Super Bowl MMXXIV).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why can&apos;t I write 49 as IL?</h3>
            <p className="text-sm text-muted-foreground">
              Roman numerals have strict subtractive rules. You can only subtract powers of 10
              (I, X, C) from the next two larger values. So 49 = XLIX (40 + 9), not IL.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Is there a Roman numeral for zero?</h3>
            <p className="text-sm text-muted-foreground">
              No, the Roman numeral system has no symbol for zero. The concept of zero
              wasn&apos;t part of Roman mathematics. This is one reason Arabic numerals replaced them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
