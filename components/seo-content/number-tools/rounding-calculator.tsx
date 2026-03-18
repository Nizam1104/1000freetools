import React from "react"

export default function RoundingCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a number and select a rounding method. Choose from decimal places, significant figures, nearest value, round up (ceiling), or round down (floor).
          </p>
          <p>
            Each method serves different purposes. Decimal rounding is common for money. Significant figures matter in science. Rounding to nearest 0.5 or 5 is useful for estimates and pricing.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Examples of each method:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Number: 3.14159

Decimal places (2): 3.14
Significant figures (3): 3.14
Nearest 0.5: 3.0
Round up (2 places): 3.15
Round down (2 places): 3.14

Number: 1234
Significant figures (2): 1200
Nearest 100: 1200</pre>
          </div>
          <p>
            The calculator handles positive and negative numbers, very small decimals, and large values. Results avoid floating-point artifacts that can occur in spreadsheet software.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Financial calculations</h3>
            <p className="text-sm text-muted-foreground">
              Currency requires exactly 2 decimal places. $10.996 rounds to $11.00. Tax calculations often round to the nearest cent. Banks use specific rounding rules for interest.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific measurements</h3>
            <p className="text-sm text-muted-foreground">
              Lab results report with appropriate significant figures. A measurement of 3.14159 cm with 3 sig figs becomes 3.14 cm. This reflects the precision of the measuring instrument.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Retail pricing</h3>
            <p className="text-sm text-muted-foreground">
              Prices often end in .99 or .95. A calculated price of $23.47 might round to $23.99 for psychological pricing. Or round to nearest $5 for simplicity: $25.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Construction and manufacturing</h3>
            <p className="text-sm text-muted-foreground">
              Measurements round to practical precision. A cut length of 47.3 mm might round to 47 mm or 47.5 mm depending on tool capability. Over-specifying precision wastes effort.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Statistical reporting</h3>
            <p className="text-sm text-muted-foreground">
              Survey results round to whole percentages. 67.8% support becomes 68%. Averages might round to one decimal place. Consistent rounding prevents false precision.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Time estimation</h3>
            <p className="text-sm text-muted-foreground">
              Project estimates round to practical units. 3.7 hours becomes 4 hours. 23 minutes might round to 25 or 30 minutes. Rounding up provides buffer for delays.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Rounding method affects results.</strong>
              2.5 rounds to 3 with standard rounding, but to 2 with "round half to even" (banker's rounding). Different fields use different conventions. Know which your context requires.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Significant figures count from first non-zero digit.</strong>
              0.00345 has 3 significant figures (3, 4, 5). Leading zeros don't count. Trailing zeros after a decimal do count: 3.450 has 4 sig figs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Round up vs round down are directional.</strong>
              Round up (ceiling) always goes toward positive infinity. Round down (floor) goes toward negative infinity. For positive numbers, up increases and down decreases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Rounding to nearest value is flexible.</strong>
              Round to nearest 0.25 for quarter increments. Round to nearest 5 for pricing. Round to nearest 100 for rough estimates. Choose the increment that fits your needs.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For financial calculations, always round at the final step, not intermediate steps. Rounding multiple times accumulates errors. Keep full precision until the end.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between decimal places and significant figures?</h3>
            <p className="text-sm text-muted-foreground">
              Decimal places count digits after the decimal point (3.14 has 2). Significant figures count all meaningful digits (0.00314 has 3 sig figs). Sig figs work for any magnitude.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I round to the nearest dollar?</h3>
            <p className="text-sm text-muted-foreground">
              Use "nearest value" with 1 as the increment. $23.47 rounds to $23. $23.50 rounds to $24. Or use 0 decimal places for the same result with positive numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is banker's rounding?</h3>
            <p className="text-sm text-muted-foreground">
              Also called "round half to even." When the digit is exactly 5, round to the nearest even number. 2.5 → 2, 3.5 → 4. This reduces bias in large datasets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does 0.1 + 0.2 not equal 0.3?</h3>
            <p className="text-sm text-muted-foreground">
              Floating-point representation can't exactly store 0.1 or 0.2 in binary. The result is 0.30000000000000004. Rounding to a reasonable number of decimal places fixes display issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many significant figures should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Match your measurement precision. A ruler marked in millimeters gives 3-4 sig figs. A caliper might give 4-5. Don't report more precision than your instrument provides.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's ceiling and floor rounding?</h3>
            <p className="text-sm text-muted-foreground">
              Ceiling always rounds up to the next integer (ceil(3.1) = 4). Floor always rounds down (floor(3.9) = 3). These are useful for resource allocation and capacity planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I round negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Standard rounding: -3.6 → -4 (closer to zero is -4). Round up: -3.6 → -3 (toward positive infinity). Round down: -3.6 → -4 (toward negative infinity).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
