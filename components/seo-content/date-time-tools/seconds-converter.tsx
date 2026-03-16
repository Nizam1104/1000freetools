import React from "react"

export default function SecondsConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a value in any time unit - seconds, minutes, hours, days, weeks, months, or years. The converter instantly shows equivalent values in all other units simultaneously.
          </p>
          <p>
            The breakdown section shows the duration in compound format. Instead of just "1,000,000 seconds", see "11 days, 13 hours, 46 minutes, 40 seconds" for better comprehension.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Input: 3665 seconds

Results:
Minutes: 61.08
Hours: 1.018
Days: 0.042
Breakdown: 1 hour, 1 minute, 5 seconds</pre>
          </div>
          <p>
            Quick conversion buttons provide common values like 1 minute, 1 hour, 1 day. Scientific notation displays for very large numbers. All calculations use standard time unit definitions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Video and audio editing</h3>
            <p className="text-sm text-muted-foreground">
              Convert frame counts to time. Calculate video duration. Plan segment lengths. Export timing specifications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific experiments</h3>
            <p className="text-sm text-muted-foreground">
              Log data in seconds. Report in appropriate units. Compare experiment durations. Standardize measurements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Programming and debugging</h3>
            <p className="text-sm text-muted-foreground">
              Convert timeout values. Understand log timestamps. Debug performance issues. Set appropriate intervals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fitness and sports timing</h3>
            <p className="text-sm text-muted-foreground">
              Convert race times. Track workout duration. Compare performances. Plan training intervals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Astronomy and physics</h3>
            <p className="text-sm text-muted-foreground">
              Calculate orbital periods. Convert light travel time. Express cosmic durations. Educational demonstrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data analysis</h3>
            <p className="text-sm text-muted-foreground">
              Process timestamp data. Convert duration columns. Prepare visualizations. Normalize time series.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Months and years are approximate.</strong>
              Month = 30.44 days average. Year = 365.25 days. Actual months vary 28-31 days. Use for estimation, not precise calendar math.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scientific notation for large numbers.</strong>
              Values over 1 million show as 1.23e+6. Standard scientific format. Prevents display overflow. Accurate representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Breakdown uses integer units.</strong>
              1.5 hours shows as "1 hour, 30 minutes". Each unit is whole number. Remainder cascades to smaller units. Easy to understand.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Decimal precision varies.</strong>
              Small values show more decimals. Large values show fewer. Prevents false precision. Appropriate significant figures.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For precise calendar calculations, use the date difference tools. This converter is for duration math, not calendar dates.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are months approximate?</h3>
            <p className="text-sm text-muted-foreground">
              Calendar months vary: 28, 29, 30, or 31 days. Average is 30.44 days. Good for estimation. Use date tools for exact calendar months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many seconds in a day?</h3>
            <p className="text-sm text-muted-foreground">
              Exactly 86,400 seconds. 24 hours × 60 minutes × 60 seconds. Universal constant. Used for all day calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a leap second?</h3>
            <p className="text-sm text-muted-foreground">
              Occasional one-second adjustment. Keeps atomic time aligned with Earth rotation. Rarely added. Not accounted for in standard conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert milliseconds?</h3>
            <p className="text-sm text-muted-foreground">
              Enter as decimal seconds. 500 milliseconds = 0.5 seconds. Results show in all units. Milliseconds column displays directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the breakdown?</h3>
            <p className="text-sm text-muted-foreground">
              Mathematically exact. Uses integer division. Remainder carries to next unit. 3665 seconds = 1h 1m 5s exactly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum value?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript handles large numbers well. Practical limit is billions of years. Scientific notation prevents display issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I copy individual values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, each result has copy button. Click to copy that unit. Paste into documents. Share specific conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
