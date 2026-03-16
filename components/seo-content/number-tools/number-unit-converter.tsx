import React from "react"

export default function NumberUnitConverterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Unit Converter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts values between different units of measurement across four categories:
            Digital Storage, Length, Weight, and Time. Select a category, enter a value, choose source and target units.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Conversion Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select a category: Digital Storage, Length, Weight, or Time</li>
            <li>Enter the value you want to convert</li>
            <li>Choose the &quot;From&quot; unit (current unit of your value)</li>
            <li>Choose the &quot;To&quot; unit (desired output unit)</li>
            <li>Click &quot;Convert&quot; to see the result</li>
            <li>Results are formatted with appropriate precision or scientific notation for extreme values</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">File Size Planning</h3>
            <p className="text-sm text-muted-foreground">
              A video editor needs to know if a 4.5 GB file fits on a 700 MB CD. They convert GB to MB
              and discover it&apos;s 4,608 MB - far too large, so they choose a different storage option.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">International Recipe Conversion</h3>
            <p className="text-sm text-muted-foreground">
              A cook following a European recipe sees 250 grams of flour but their scale shows ounces.
              They convert grams to ounces (8.82 oz) to measure accurately.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Construction Measurement</h3>
            <p className="text-sm text-muted-foreground">
              A contractor has measurements in feet but materials are sold by the meter.
              They convert 150 feet to meters (45.72 m) to order the correct amount.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Network Latency Analysis</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer sees response times in milliseconds but needs to report in seconds.
              They convert 2,450 ms to 2.45 seconds for the status report.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Shipping Weight Calculation</h3>
            <p className="text-sm text-muted-foreground">
              An e-commerce seller needs shipping costs based on weight in pounds, but their scale shows kilograms.
              They convert 2.5 kg to 5.51 lbs to calculate accurate shipping.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding unit conversion categories and precision:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Digital Storage: bytes, KB, MB, GB, TB (using 1024-based conversion)</li>
            <li>Length: meters, kilometers, centimeters, millimeters, feet, inches, miles</li>
            <li>Weight: grams, kilograms, milligrams, pounds, ounces</li>
            <li>Time: seconds, milliseconds, microseconds, nanoseconds, minutes, hours, days</li>
            <li>Very large or small results use scientific notation for readability</li>
            <li>Results show up to 10 significant figures for precision</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Is 1 KB equal to 1000 or 1024 bytes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses 1024 bytes per KB, which is the binary (computer science) convention.
              Some storage manufacturers use 1000 (decimal), which is why a &quot;1 TB&quot; drive shows less space in your OS.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How accurate are the conversions?</h3>
            <p className="text-sm text-muted-foreground">
              Conversions use precise conversion factors. For example, 1 inch = 2.54 cm exactly.
              Results show up to 10 significant figures, with scientific notation for very large/small values.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I convert between categories?</h3>
            <p className="text-sm text-muted-foreground">
              No, conversions only work within a category. You can&apos;t convert length to weight,
              for example. Select the appropriate category for your conversion type.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why does my result show scientific notation?</h3>
            <p className="text-sm text-muted-foreground">
              Very large numbers (over 1 million) or very small numbers (under 0.000001) are shown
              in scientific notation (like 1.5e+9) for readability. This equals 1,500,000,000.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I convert feet and inches to meters?</h3>
            <p className="text-sm text-muted-foreground">
              First convert everything to inches (feet × 12 + inches), then convert inches to meters.
              For example, 5&apos;10&quot; = 70 inches = 1.778 meters.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between microsecond and millisecond?</h3>
            <p className="text-sm text-muted-foreground">
              A millisecond (ms) is 1/1000 of a second. A microsecond (μs) is 1/1,000,000 of a second.
              There are 1,000 microseconds in 1 millisecond.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
