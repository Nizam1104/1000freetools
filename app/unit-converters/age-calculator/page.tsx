"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AgeCalculatorPage() {
  const config = converterMappings["Age Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Age Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Age Calculator</h1>
        <p className="text-muted-foreground">Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.</p>
      </div>
      <UnitConverterBase
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Age Calculation Works</h2>
          <p className="text-muted-foreground mb-4">
            Age calculation determines the time elapsed between your birth date and a target date. The calculation accounts for varying month lengths and leap years to provide accurate results in years, months, and days.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Age Calculation Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Years = Target Year - Birth Year</p>
            <p>Months = Target Month - Birth Month (adjust if negative)</p>
            <p>Days = Target Day - Birth Day (adjust if negative)</p>
          </div>

          <p className="text-muted-foreground mb-4">
            When the target day is less than the birth day, borrow days from the previous month. When the target month is less than the birth month, borrow a year and add 12 months.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Leap Year Handling</h3>
          <p className="text-muted-foreground mb-4">
            Leap years occur every 4 years, except for years divisible by 100 but not by 400. February has 29 days in leap years and 28 days in common years. This affects age calculations for people born on February 29.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <p className="font-semibold mb-2">Leap Year Rules:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Divisible by 4 = leap year</li>
              <li>Divisible by 100 = not a leap year (exception)</li>
              <li>Divisible by 400 = leap year (exception to exception)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Age in Different Units</h2>
          <p className="text-muted-foreground mb-4">
            Express your age in various time units for different purposes. Scientists use seconds for precise measurements, while everyday life uses years and months.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Equivalent to 1 Year</th>
                  <th className="border border-border p-3 text-left">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Years</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">Legal documents, birthdays</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Months</td>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">Infant development, contracts</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Weeks</td>
                  <td className="border border-border p-3">52.14</td>
                  <td className="border border-border p-3">Pregnancy, project planning</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Days</td>
                  <td className="border border-border p-3">365.25</td>
                  <td className="border border-border p-3">Medical treatments, travel</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Hours</td>
                  <td className="border border-border p-3">8,766</td>
                  <td className="border border-border p-3">Work calculations</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Minutes</td>
                  <td className="border border-border p-3">525,960</td>
                  <td className="border border-border p-3">Scientific studies</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Seconds</td>
                  <td className="border border-border p-3">31,557,600</td>
                  <td className="border border-border p-3">Physics, computing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Basic Age Calculation</p>
              <p className="text-muted-foreground">
                Birth Date: March 15, 1990<br/>
                Target Date: January 20, 2025<br/>
                Calculation: 2025 - 1990 = 35 years, but January comes before March<br/>
                Result: 34 years, 10 months, 5 days
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Leap Year Birthday</p>
              <p className="text-muted-foreground">
                Birth Date: February 29, 2000<br/>
                Target Date: February 28, 2025<br/>
                Result: 24 years, 11 months, 30 days (or 25 years minus 1 day)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Age in Seconds</p>
              <p className="text-muted-foreground">
                Age: 30 years<br/>
                Seconds = 30 × 365.25 × 24 × 60 × 60<br/>
                Result: 946,728,000 seconds
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do you calculate age accurately?</h3>
              <p className="text-muted-foreground">
                Calculate the difference in years first, then adjust for months and days. If the target month is before the birth month, subtract one year and add 12 to the month difference. If the target day is before the birth day, borrow days from the previous month based on its actual length.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What age do you turn on a leap year?</h3>
              <p className="text-muted-foreground">
                People born on February 29 celebrate their birthday on February 28 or March 1 in non-leap years. Legally, most jurisdictions consider March 1 as the official birthday for leap year babies in common years.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why is age calculated differently in some cultures?</h3>
              <p className="text-muted-foreground">
                East Asian age reckoning counts a person as 1 year old at birth and adds a year on New Year. This differs from the Western system where age increases on birthdays. Korea recently adopted the international system for legal purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many days old am I?</h3>
              <p className="text-muted-foreground">
                Multiply your age in years by 365.25 to account for leap years. For precise calculations, count the exact days between your birth date and today, including leap days that occurred during your lifetime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
