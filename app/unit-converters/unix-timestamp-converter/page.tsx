"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function UnixTimestampConverterPage() {
  const config = converterMappings["Unix Timestamp Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Unix Timestamp Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Unix Timestamp Converter</h1>
        <p className="text-muted-foreground">Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers.</p>
      </div>
      <UnitConverterBase
        title="Unix Timestamp Converter"
        description="Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Unix Timestamps</h2>
          <p className="text-muted-foreground mb-4">
            Unix timestamps represent time as the number of seconds elapsed since January 1, 1970, at 00:00:00 UTC. This epoch time system provides a universal way to store and manipulate dates across different systems and time zones.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Epoch Time Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Timestamp = (Current Date - Epoch Date) in seconds</p>
            <p>Date = Epoch Date + (Timestamp seconds)</p>
            <p>Epoch: January 1, 1970 00:00:00 UTC</p>
          </div>

          <p className="text-muted-foreground">
            Unix timestamps ignore leap seconds for simplicity. Most systems use 32-bit or 64-bit integers. The Year 2038 problem affects 32-bit systems when timestamps overflow on January 19, 2038.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Unix Timestamps Reference</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Date/Time</th>
                  <th className="border border-border p-3 text-left">Unix Timestamp</th>
                  <th className="border border-border p-3 text-left">Event</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Jan 1, 1970 00:00:00</td>
                  <td className="border border-border p-3">0</td>
                  <td className="border border-border p-3">Unix Epoch Start</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jan 1, 2000 00:00:00</td>
                  <td className="border border-border p-3">946684800</td>
                  <td className="border border-border p-3">Y2K Millennium</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jan 1, 2020 00:00:00</td>
                  <td className="border border-border p-3">1577836800</td>
                  <td className="border border-border p-3">Start of 2020</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jan 1, 2025 00:00:00</td>
                  <td className="border border-border p-3">1735689600</td>
                  <td className="border border-border p-3">Start of 2025</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jan 19, 2038 03:14:07</td>
                  <td className="border border-border p-3">2147483647</td>
                  <td className="border border-border p-3">32-bit Overflow</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Dec 31, 2099 23:59:59</td>
                  <td className="border border-border p-3">4102444799</td>
                  <td className="border border-border p-3">End of 21st Century</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Timestamp to Date</p>
              <p className="text-muted-foreground">
                Timestamp: 1609459200<br/>
                Calculation: 1609459200 seconds after Jan 1, 1970<br/>
                Result: January 1, 2021 00:00:00 UTC
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Date to Timestamp</p>
              <p className="text-muted-foreground">
                Date: July 4, 2024 12:00:00 UTC<br/>
                Days from epoch: 19,908<br/>
                Result: 1720094400
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Millisecond Timestamps</p>
              <p className="text-muted-foreground">
                JavaScript uses milliseconds: 1704067200000<br/>
                Convert to seconds: divide by 1000<br/>
                Result: 1704067200 (January 1, 2024)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Time Zone Adjustment</p>
              <p className="text-muted-foreground">
                UTC Timestamp: 1704067200<br/>
                EST (UTC-5): Same timestamp, displays as Dec 31, 2023 7:00 PM<br/>
                JST (UTC+9): Same timestamp, displays as Jan 1, 2024 9:00 AM
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Programming Language Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">JavaScript</p>
              <p className="text-muted-foreground font-mono text-sm">
                // Current timestamp (ms)<br/>
                Date.now()<br/><br/>
                // Current timestamp (seconds)<br/>
                Math.floor(Date.now() / 1000)<br/><br/>
                // Timestamp to date<br/>
                new Date(1704067200 * 1000)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Python</p>
              <p className="text-muted-foreground font-mono text-sm">
                import time<br/>
                from datetime import datetime<br/><br/>
                # Current timestamp<br/>
                time.time()<br/><br/>
                # Timestamp to date<br/>
                datetime.fromtimestamp(1704067200)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">PHP</p>
              <p className="text-muted-foreground font-mono text-sm">
                // Current timestamp<br/>
                time();<br/><br/>
                // Timestamp to date<br/>
                date('Y-m-d H:i:s', 1704067200);<br/><br/>
                // Date to timestamp<br/>
                strtotime('2024-01-01');
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">SQL</p>
              <p className="text-muted-foreground font-mono text-sm">
                -- PostgreSQL<br/>
                SELECT EXTRACT(EPOCH FROM NOW());<br/>
                SELECT to_timestamp(1704067200);<br/><br/>
                -- MySQL<br/>
                SELECT UNIX_TIMESTAMP();<br/>
                SELECT FROM_UNIXTIME(1704067200);
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why does Unix time start at 1970?</h3>
              <p className="text-muted-foreground">
                January 1, 1970 was chosen as the Unix epoch by early Unix developers at Bell Labs. The date provided a reasonable reference point that kept timestamp values manageable with limited computing resources of the era.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the Year 2038 problem?</h3>
              <p className="text-muted-foreground">
                32-bit signed integers overflow on January 19, 2038 at 03:14:07 UTC. Systems using 32-bit timestamps will incorrectly interpret subsequent timestamps as negative values. Migration to 64-bit timestamps solves this issue.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do Unix timestamps include leap seconds?</h3>
              <p className="text-muted-foreground">
                Unix timestamps ignore leap seconds for simplicity. Each day is treated as exactly 86,400 seconds. This creates a small drift from UTC over decades but simplifies time calculations in most applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert Unix time to my local timezone?</h3>
              <p className="text-muted-foreground">
                Unix timestamps are always in UTC. Use your programming language's date formatting functions with timezone parameters. Most systems automatically convert to local time when displaying dates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
