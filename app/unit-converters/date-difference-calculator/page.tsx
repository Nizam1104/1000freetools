"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DateDifferenceCalculatorPage() {
  const config = converterMappings["Date Difference Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Date Difference Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Date Difference Calculator</h1>
        <p className="text-muted-foreground">Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning.</p>
      </div>
      <UnitConverterBase
        title="Date Difference Calculator"
        description="Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Date Difference Calculations</h2>
          <p className="text-muted-foreground mb-4">
            Date difference calculations measure the time span between two specific dates. This tool handles varying month lengths, leap years, and provides results in multiple time units for comprehensive planning.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Duration Breakdown Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Total Days = |Date2 - Date1|</p>
            <p>Weeks = Total Days / 7</p>
            <p>Months = approximate based on average month length</p>
            <p>Years = Total Days / 365.25</p>
          </div>

          <p className="text-muted-foreground">
            The calculation provides both exact day counts and approximate breakdowns in larger units. Month calculations use average month length for consistency.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Business Days Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Business days exclude weekends and holidays. Use business day calculations for project timelines, delivery estimates, and legal deadlines.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Scenario</th>
                  <th className="border border-border p-3 text-left">Calendar Days</th>
                  <th className="border border-border p-3 text-left">Business Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 week period</td>
                  <td className="border border-border p-3">7</td>
                  <td className="border border-border p-3">5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2 week period</td>
                  <td className="border border-border p-3">14</td>
                  <td className="border border-border p-3">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 month (avg)</td>
                  <td className="border border-border p-3">30.44</td>
                  <td className="border border-border p-3">21.74</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 year</td>
                  <td className="border border-border p-3">365</td>
                  <td className="border border-border p-3">260-262</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mt-4">
            Business day counts vary by country due to different holiday schedules. Always verify local holiday calendars for accurate business day calculations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Date Difference Scenarios</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Project Planning</p>
              <p className="text-muted-foreground">
                Calculate project duration from start to end date. Add buffer time for unexpected delays. Break down into phases with milestone dates.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Anniversary Tracking</p>
              <p className="text-muted-foreground">
                Track years, months, and days since a special event. Calculate upcoming anniversary dates. Plan celebrations based on milestone anniversaries.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Deadline Management</p>
              <p className="text-muted-foreground">
                Count remaining days until a deadline. Work backward from due dates to set intermediate targets. Account for weekends and holidays in timeline planning.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Age and Milestone Calculations</p>
              <p className="text-muted-foreground">
                Calculate time between birth and current date. Determine days until retirement. Track employment tenure for benefits eligibility.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Duration Breakdown Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: One Year Period</p>
              <p className="text-muted-foreground">
                Start: January 1, 2024<br/>
                End: January 1, 2025<br/>
                Result: 366 days (leap year), 52 weeks, 12 months, 1 year
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Cross-Month Calculation</p>
              <p className="text-muted-foreground">
                Start: March 15, 2024<br/>
                End: May 20, 2024<br/>
                Result: 66 days, 9 weeks, 2 months, 5 days
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Multi-Year Span</p>
              <p className="text-muted-foreground">
                Start: June 1, 2020<br/>
                End: December 31, 2024<br/>
                Result: 1,674 days, 239 weeks, approximately 4 years, 7 months
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do you calculate days between two dates?</h3>
              <p className="text-muted-foreground">
                Subtract the earlier date from the later date. Most calculators handle this automatically. For manual calculation, count full years first, then remaining months, then remaining days. Account for leap years in the period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between calendar days and business days?</h3>
              <p className="text-muted-foreground">
                Calendar days include all days of the week. Business days exclude weekends and public holidays. A 5-day calendar period might contain only 3 business days if it spans a weekend.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate are month calculations?</h3>
              <p className="text-muted-foreground">
                Month calculations use average month length of 30.44 days. Actual months range from 28 to 31 days. For precise legal or financial calculations, use exact day counts instead of month approximations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I calculate negative date differences?</h3>
              <p className="text-muted-foreground">
                Date difference is typically expressed as an absolute value. If you need to know which date comes first, compare the dates directly. A negative result indicates the second date precedes the first.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
