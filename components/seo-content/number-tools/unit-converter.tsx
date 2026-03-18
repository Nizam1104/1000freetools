import React from "react"

export default function UnitConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select a category (digital storage, length, weight, or time), enter a value, choose the source and target units, and get instant conversion results.
          </p>
          <p>
            The converter uses precise conversion factors for accurate results. Digital storage uses binary (1024-based) units, while length and weight use standard metric and imperial conversions.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Digital: 1 GB = 1024 MB = 1,048,576 KB
Length: 1 mile = 1.60934 km = 5280 feet
Weight: 1 pound = 453.592 grams = 16 ounces
Time: 1 day = 24 hours = 1,440 minutes</pre>
          </div>
          <p>
            Results display with appropriate precision. Large numbers use scientific notation, while small conversions show full decimal places for accuracy.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">File size planning</h3>
            <p className="text-sm text-muted-foreground">
              Your video is 2.5 GB but your cloud storage shows limits in MB. The converter shows 2.5 GB equals 2,560 MB, helping you understand if you have enough space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Recipe conversions</h3>
            <p className="text-sm text-muted-foreground">
              A British recipe calls for 250 grams of flour but your scale shows ounces. The converter shows 250g equals 8.8 oz, so you measure accordingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">DIY and construction projects</h3>
            <p className="text-sm text-muted-foreground">
              Building plans use metric but your tape measure is imperial. Converting 2.4 meters to 7.87 feet helps you cut materials to the right length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shipping weight calculations</h3>
            <p className="text-sm text-muted-foreground">
              A carrier charges by the pound but your package scale shows kilograms. Converting 3.2 kg to 7.05 lbs helps calculate shipping costs accurately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data transfer estimates</h3>
            <p className="text-sm text-muted-foreground">
              Your internet is 100 Mbps but your file is 5 GB. Converting to consistent units shows the download will take about 7 minutes at full speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fitness and health tracking</h3>
            <p className="text-sm text-muted-foreground">
              Your goal is 10,000 steps but your tracker shows distance in km. Converting steps to kilometers (roughly 8 km for average stride) helps track progress.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Digital storage uses binary units.</strong>
              1 KB = 1024 bytes, not 1000. This is why a "500 GB" hard drive shows as 465 GB in your OS. The converter uses binary (1024-based) units for accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Precision matters for small measurements.</strong>
              Converting 0.1 inches to millimeters gives 2.54 mm. For engineering work, keep full precision. For everyday use, rounding to 2.5 mm is usually fine.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some conversions are exact, others approximate.</strong>
              1 inch = 25.4 mm exactly. But 1 kg = 2.20462 lbs is approximate. The converter shows sufficient precision for practical use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time conversions are straightforward.</strong>
              Unlike length or weight, time units have fixed relationships: 60 seconds per minute, 60 minutes per hour, 24 hours per day. No approximation needed.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For digital storage, remember the rule of thumb: divide GB by 0.93 to get actual usable space. A "1 TB" drive holds about 930 GB usable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is 1 GB not exactly 1000 MB?</h3>
            <p className="text-sm text-muted-foreground">
              Computers use binary (base-2) math. 2^10 = 1024, so 1 KB = 1024 bytes. Storage manufacturers use decimal (1000-based) for marketing. This creates the "missing" space discrepancy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert between metric and imperial?</h3>
            <p className="text-sm text-muted-foreground">
              Key conversions: 1 inch = 2.54 cm, 1 foot = 30.48 cm, 1 mile = 1.609 km, 1 pound = 453.6 grams, 1 gallon = 3.785 liters. The converter handles these automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between KB and KiB?</h3>
            <p className="text-sm text-muted-foreground">
              KB (kilobyte) technically means 1000 bytes. KiB (kibibyte) means 1024 bytes. Most software uses KB to mean 1024 bytes. The converter uses the common 1024-based convention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate are the weight conversions?</h3>
            <p className="text-sm text-muted-foreground">
              Conversions use standard factors: 1 lb = 453.59237 g exactly. For cooking and everyday use, 454 g per pound is close enough. The converter shows appropriate precision.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert very large or small numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the converter handles scientific notation for extreme values. Converting nanometers to kilometers or petabytes to bytes works correctly with appropriate precision.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do length conversions have many decimal places?</h3>
            <p className="text-sm text-muted-foreground">
              Metric-imperial conversions often result in repeating decimals. 1 meter = 3.28084 feet. The converter shows sufficient precision for most applications without excessive digits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert data transfer speeds?</h3>
            <p className="text-sm text-muted-foreground">
              Network speeds use bits (Mbps) while files use bytes (MB). 1 byte = 8 bits. So 100 Mbps = 12.5 MB/s. Divide megabits by 8 to get megabytes per second.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
