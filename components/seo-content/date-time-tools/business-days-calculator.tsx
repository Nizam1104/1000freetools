import React from "react"

export default function BusinessDaysCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select two dates to calculate the number of business days between them. Choose a country to automatically exclude that nation's public holidays. Weekends (Saturday and Sunday) are always excluded.
          </p>
          <p>
            Alternatively, add or subtract business days from a start date to find the resulting date. This is essential for deadline calculations that must account for non-working days.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Business days example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">From: Monday, Jan 1, 2024
To: Friday, Jan 31, 2024
Total days: 31
Business days: 23
Weekend days: 8
Holidays: 1 (New Year's Day)</pre>
          </div>
          <p>
            Custom holidays can be added for company-specific closures. Track office closures, team events, or local observances not in the national calendar.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legal deadline calculation</h3>
            <p className="text-sm text-muted-foreground">
              Court filings use business days. Contract notices specify business days. Compliance deadlines exclude weekends. Calculate accurately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shipping and delivery estimates</h3>
            <p className="text-sm text-muted-foreground">
              Carriers quote business days. E-commerce sets delivery expectations. Warehouse processing uses business days. Customer communication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project management</h3>
            <p className="text-sm text-muted-foreground">
              Schedule tasks in business days. Account for non-working time. Set realistic deadlines. Resource planning accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">HR and payroll</h3>
            <p className="text-sm text-muted-foreground">
              Calculate notice periods. Track PTO in business days. Process payroll timelines. Onboarding schedules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Banking and finance</h3>
            <p className="text-sm text-muted-foreground">
              Settlement periods use business days. Wire transfer timing. Trade settlement T+2. Interest calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Government processing</h3>
            <p className="text-sm text-muted-foreground">
              Permit processing times. Application reviews. Response deadlines. Official business operates on business days.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Holidays vary by country.</strong>
              Select your country for accurate holidays. US holidays differ from UK. Working internationally? Check both calendars. Regional holidays may not be included.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Custom holidays are browser-local.</strong>
              Company holidays you add save locally. Clear browser data removes them. Document them separately for team use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Weekends are Saturday and Sunday.</strong>
              Some countries have different weekends. Middle East may be Friday-Saturday. This tool uses standard Sat-Sun. Adjust manually if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative business days go backward.</strong>
              Subtracting 10 business days finds past date. Useful for lookback calculations. "10 business days ago" from today.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For legal deadlines, always verify holiday rules. Some jurisdictions count differently. When mailing, add days for delivery time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as a business day?</h3>
            <p className="text-sm text-muted-foreground">
              Monday through Friday, excluding public holidays. Weekends never count. Some industries have different definitions. Check your context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do you include all holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Major national holidays are included. Regional holidays may be missing. Bank holidays vs public holidays vary. Add custom holidays as needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add company holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Custom Holidays section. Enter date and name. Saves in your browser. Excluded from calculations automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my country isn't listed?</h3>
            <p className="text-sm text-muted-foreground">
              Select closest match or US as default. Add your holidays manually. Country list grows over time. Request additions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle half-days?</h3>
            <p className="text-sm text-muted-foreground">
              No, full days only. Half-days count as full business days. Christmas Eve may be half-day in some companies. Track separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate working hours?</h3>
            <p className="text-sm text-muted-foreground">
              This tool counts days only. For hours, multiply business days by work hours per day. 5 business days × 8 hours = 40 hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are my results different from another tool?</h3>
            <p className="text-sm text-muted-foreground">
              Holiday lists may differ. Some tools include regional holidays. Others don't. Verify which holidays each tool uses.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
