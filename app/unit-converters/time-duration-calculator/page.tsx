"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TimeDurationCalculatorPage() {
  const config = converterMappings["Time Duration Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Time Duration Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Time Duration Calculator</h1>
        <p className="text-muted-foreground">Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling.</p>
      </div>
      <UnitConverterBase
        title="Time Duration Calculator"
        description="Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Time Duration Calculation Basics</h2>
          <p className="text-muted-foreground mb-4">
            Time duration calculations measure elapsed time between two points or combine multiple time intervals. This tool handles hours, minutes, seconds, and larger units for accurate scheduling and planning.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Time Arithmetic Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Duration = End Time - Start Time</p>
            <p>Total Seconds = (Hours × 3600) + (Minutes × 60) + Seconds</p>
            <p>Hours = Total Seconds / 3600</p>
            <p>Minutes = (Total Seconds % 3600) / 60</p>
          </div>

          <p className="text-muted-foreground">
            Convert all time values to a common unit before performing calculations. Seconds work well as the base unit for precise arithmetic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Time Unit Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Seconds</th>
                  <th className="border border-border p-3 text-left">Minutes</th>
                  <th className="border border-border p-3 text-left">Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 Minute</td>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">0.0167</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Hour</td>
                  <td className="border border-border p-3">3,600</td>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Day</td>
                  <td className="border border-border p-3">86,400</td>
                  <td className="border border-border p-3">1,440</td>
                  <td className="border border-border p-3">24</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Week</td>
                  <td className="border border-border p-3">604,800</td>
                  <td className="border border-border p-3">10,080</td>
                  <td className="border border-border p-3">168</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Month (avg)</td>
                  <td className="border border-border p-3">2,629,746</td>
                  <td className="border border-border p-3">43,829</td>
                  <td className="border border-border p-3">730.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Year</td>
                  <td className="border border-border p-3">31,557,600</td>
                  <td className="border border-border p-3">525,960</td>
                  <td className="border border-border p-3">8,766</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Project Planning Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Work Hours Calculation</p>
              <p className="text-muted-foreground">
                Start: 9:00 AM<br/>
                End: 5:30 PM<br/>
                Break: 30 minutes<br/>
                Result: 8 hours of work time
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Task Duration Sum</p>
              <p className="text-muted-foreground">
                Task A: 2 hours 45 minutes<br/>
                Task B: 1 hour 30 minutes<br/>
                Task C: 3 hours 15 minutes<br/>
                Total: 7 hours 30 minutes
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Cross-Midnight Duration</p>
              <p className="text-muted-foreground">
                Start: 10:00 PM<br/>
                End: 6:00 AM (next day)<br/>
                Result: 8 hours
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Project Timeline</p>
              <p className="text-muted-foreground">
                Phase 1: 3 weeks<br/>
                Phase 2: 2 weeks 4 days<br/>
                Phase 3: 1 week 3 days<br/>
                Total: 7 weeks (49 days)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Time Calculations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Hours in a Work Week</p>
              <p className="text-muted-foreground">
                Standard: 40 hours (8 hours × 5 days)<br/>
                Extended: 45-50 hours<br/>
                Part-time: 20-30 hours
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Minutes in Common Periods</p>
              <p className="text-muted-foreground">
                1 hour: 60 minutes<br/>
                Half day: 720 minutes<br/>
                Full day: 1,440 minutes<br/>
                Work week: 2,400 minutes
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Time Zone Differences</p>
              <p className="text-muted-foreground">
                EST to PST: 3 hours<br/>
                EST to GMT: 5 hours<br/>
                GMT to IST: 5.5 hours<br/>
                EST to JST: 14 hours
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Decimal Time Conversion</p>
              <p className="text-muted-foreground">
                1.5 hours = 1 hour 30 minutes<br/>
                2.25 hours = 2 hours 15 minutes<br/>
                3.75 hours = 3 hours 45 minutes<br/>
                0.5 hours = 30 minutes
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do you calculate time duration manually?</h3>
              <p className="text-muted-foreground">
                Convert both times to 24-hour format. Subtract the start time from the end time. If minutes in the end time are less than start minutes, borrow 1 hour (60 minutes). If the result crosses midnight, add 24 hours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the 24-hour time format?</h3>
              <p className="text-muted-foreground">
                The 24-hour format runs from 00:00 (midnight) to 23:59. Add 12 to PM hours except for 12 PM. 1:00 PM becomes 13:00, 6:00 PM becomes 18:00, and 12:00 AM becomes 00:00.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do you add time durations?</p>
              <p className="text-muted-foreground">
                Add hours together and minutes together separately. If minutes exceed 60, convert excess to hours. For example, 2 hours 45 minutes plus 1 hour 30 minutes equals 4 hours 15 minutes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate overtime hours?</h3>
              <p className="text-muted-foreground">
                Subtract standard work hours from total hours worked. For a 40-hour work week, any hours beyond 40 count as overtime. Daily overtime rules vary by jurisdiction and employer policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
