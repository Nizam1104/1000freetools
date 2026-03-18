import React from "react"

export default function ScientificNotationConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Convert numbers between standard decimal notation and scientific notation. Enter a number like 123,456,789 or 0.00000123, and get the scientific notation equivalent.
          </p>
          <p>
            Choose from scientific notation (a × 10^n), engineering notation (exponent is a multiple of 3), or E-notation (1.23e+8). Control significant figures for precise output.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Standard → Scientific:
123,456,789 → 1.23456789 × 10⁸
0.00000123 → 1.23 × 10⁻⁶
6,022,000,000,000,000,000,000,000 → 6.022 × 10²³

Scientific → Standard:
3.0 × 10⁸ → 300,000,000
1.6 × 10⁻¹⁹ → 0.00000000000000000016

Engineering notation:
1,234,567 → 1.234567 × 10⁶</pre>
          </div>
          <p>
            The converter handles both directions: standard to scientific and scientific to standard. E-notation input like "1.23e+8" converts to full decimal form.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics and chemistry calculations</h3>
            <p className="text-sm text-muted-foreground">
              Planck's constant is 6.626 × 10⁻³⁴ J·s. The speed of light is 3.0 × 10⁸ m/s. Scientific notation makes these extreme values manageable in calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Astronomy and cosmology</h3>
            <p className="text-sm text-muted-foreground">
              Distance to the Sun: 1.496 × 10¹¹ meters. Mass of Earth: 5.972 × 10²⁴ kg. Age of universe: 4.35 × 10¹⁷ seconds. Scientific notation is essential for these scales.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Microbiology and nanotechnology</h3>
            <p className="text-sm text-muted-foreground">
              Virus sizes are measured in nanometers: 1 × 10⁻⁷ m. DNA base pairs: 3.3 × 10⁻¹⁰ m apart. Scientific notation handles the tiny scales of the microscopic world.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Engineering and electronics</h3>
            <p className="text-sm text-muted-foreground">
              Capacitor values: 4.7 × 10⁻⁶ F (4.7 μF). Processor speeds: 3.2 × 10⁹ Hz (3.2 GHz). Engineering notation with metric prefixes is standard in technical fields.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Financial modeling</h3>
            <p className="text-sm text-muted-foreground">
              National debts in trillions: 3.1 × 10¹² dollars. Market cap of large companies: 2.5 × 10¹². Scientific notation helps compare and calculate with huge financial figures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Computer science and data</h3>
            <p className="text-sm text-muted-foreground">
              Storage sizes: 1 × 10¹² bytes (1 TB). Network speeds: 1 × 10¹⁰ bits/sec (10 Gbps). Algorithm complexity often expressed with scientific notation for large inputs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scientific notation format: a × 10^n.</strong>
              The coefficient 'a' is between 1 and 10 (not including 10). The exponent 'n' is an integer. This standard form ensures consistent representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Engineering notation uses exponent multiples of 3.</strong>
              Exponents are ..., -6, -3, 0, 3, 6, 9, ... This aligns with metric prefixes: milli (10⁻³), kilo (10³), mega (10⁶), giga (10⁹).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">E-notation is calculator/computer format.</strong>
              1.23e+8 means 1.23 × 10⁸. The 'e' stands for "exponent" or "times ten to the." Programming languages and calculators use this compact form.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Significant figures control precision.</strong>
              123456789 with 3 sig figs becomes 1.23 × 10⁸. With 5 sig figs: 1.2346 × 10⁸. More sig figs = more precision but longer representation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When multiplying numbers in scientific notation, multiply coefficients and add exponents. (2 × 10³) × (3 × 10⁴) = 6 × 10⁷.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert to scientific notation manually?</h3>
            <p className="text-sm text-muted-foreground">
              Move the decimal point until one non-zero digit is to the left. Count the moves: that's your exponent. Left moves = positive exponent. Right moves = negative exponent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between scientific and engineering notation?</h3>
            <p className="text-sm text-muted-foreground">
              Scientific: coefficient between 1-10, any integer exponent. Engineering: coefficient between 1-1000, exponent must be multiple of 3. Engineering matches metric prefixes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I enter scientific notation in the converter?</h3>
            <p className="text-sm text-muted-foreground">
              Use E-notation: type "1.23e8" or "1.23e+8" for 1.23 × 10⁸. For negative exponents: "1.23e-6" for 1.23 × 10⁻⁶. The converter parses this format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are significant figures?</h3>
            <p className="text-sm text-muted-foreground">
              Sig figs are the meaningful digits in a measurement. 1.23 has 3 sig figs. Leading zeros don't count (0.00123 has 3). Trailing zeros after decimal do count (1.230 has 4).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use scientific notation?</h3>
            <p className="text-sm text-muted-foreground">
              It's compact for extreme values. Easier to compare magnitudes (just check exponents). Reduces errors from counting zeros. Standard in science and engineering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add numbers in scientific notation?</h3>
            <p className="text-sm text-muted-foreground">
              First make exponents the same. (3 × 10⁵) + (2 × 10⁴) = (3 × 10⁵) + (0.2 × 10⁵) = 3.2 × 10⁵. Then add coefficients, keep the exponent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Avogadro's number in scientific notation?</h3>
            <p className="text-sm text-muted-foreground">
              Avogadro's number is 6.022 × 10²³. This is the number of particles in one mole of substance. Writing it as 602,200,000,000,000,000,000,000 is impractical.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
