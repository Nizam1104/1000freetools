"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TimePage() {
  const config = converterMappings["Time"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Time"</p>
      </div>
    );
  }

  const commonConversions = [
    { unit: "1 minute", seconds: "60 seconds", hours: "0.0167 hours" },
    { unit: "1 hour", seconds: "3,600 seconds", hours: "1 hour" },
    { unit: "1 day", seconds: "86,400 seconds", hours: "24 hours" },
    { unit: "1 week", seconds: "604,800 seconds", hours: "168 hours" },
    { unit: "1 month (avg)", seconds: "2,628,000 seconds", hours: "730 hours" },
    { unit: "1 year (avg)", seconds: "31,536,000 seconds", hours: "8,760 hours" },
  ];

  const timeUnits = [
    { unit: "Nanosecond", symbol: "ns", seconds: "0.000000001 s", use: "Computer processors, light travel" },
    { unit: "Microsecond", symbol: "μs", seconds: "0.000001 s", use: "High-speed photography" },
    { unit: "Millisecond", symbol: "ms", seconds: "0.001 s", use: "Computer response times" },
    { unit: "Second", symbol: "s", seconds: "1 s", use: "Base SI unit, everyday timing" },
    { unit: "Minute", symbol: "min", seconds: "60 s", use: "Short durations, calls, meetings" },
    { unit: "Hour", symbol: "h", seconds: "3,600 s", use: "Work shifts, travel, events" },
    { unit: "Day", symbol: "d", seconds: "86,400 s", use: "Daily cycles, deadlines" },
    { unit: "Week", symbol: "wk", seconds: "604,800 s", use: "Projects, schedules" },
    { unit: "Month (avg)", symbol: "mo", seconds: "2,628,000 s", use: "Billing cycles, pregnancies" },
    { unit: "Year (avg)", symbol: "y", seconds: "31,536,000 s", use: "Age, anniversaries, finance" },
  ];

  const practicalExamples = [
    { activity: "Blink of an eye", duration: "100-400 milliseconds" },
    { activity: "Human reaction time", duration: "200-250 milliseconds" },
    { activity: "Average kiss", duration: "12 seconds" },
    { activity: "Boiling an egg (soft)", duration: "4-6 minutes" },
    { activity: "Boiling an egg (hard)", duration: "9-12 minutes" },
    { activity: "Feature film", duration: "90-180 minutes" },
    { activity: "Full work day", duration: "8 hours" },
    { activity: "Flight: NYC to London", duration: "7 hours" },
    { activity: "Human pregnancy", duration: "40 weeks (280 days)" },
    { activity: "Earth orbit around Sun", duration: "365.25 days" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Time Converter</h1>
        <p className="text-muted-foreground">Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use.</p>
      </div>
      <UnitConverterBase
        title="Time Converter"
        description="Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Time Measurements</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Time measures the progression of events from past to future. The second serves as the SI base unit for time, defined by the vibration of cesium-133 atoms. You use time measurements constantly — scheduling meetings, tracking project deadlines, cooking meals, or planning travel.
            </p>
            <p>
              Time units follow a mixed base system. Sixty seconds make a minute, sixty minutes make an hour, twenty-four hours make a day. This sexagesimal system originated with ancient Babylonians. Weeks, months, and years connect to astronomical cycles — Earth&apos;s rotation, Moon&apos;s orbit, and Earth&apos;s journey around the Sun.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Time Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Hours to Minutes</p>
                  <p className="text-lg font-semibold">minutes = hours × 60</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 2.5 h × 60 = 150 min</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Minutes to Seconds</p>
                  <p className="text-lg font-semibold">seconds = minutes × 60</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 15 min × 60 = 900 s</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Days to Hours</p>
                  <p className="text-lg font-semibold">hours = days × 24</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 7 d × 24 = 168 h</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Hours to Seconds</p>
                  <p className="text-lg font-semibold">seconds = hours × 3,600</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1 h × 3,600 = 3,600 s</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Weeks to Days</p>
                  <p className="text-lg font-semibold">days = weeks × 7</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 4 wk × 7 = 28 d</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Years to Days</p>
                  <p className="text-lg font-semibold">days = years × 365.25</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 y × 365.25 = 1,826.25 d</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Time Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>In Seconds</TableHead>
                    <TableHead>In Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.unit}</TableCell>
                      <TableCell>{conv.seconds}</TableCell>
                      <TableCell>{conv.hours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Time Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals</TableHead>
                    <TableHead>Common Uses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeUnits.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.unit}</TableCell>
                      <TableCell>{item.symbol}</TableCell>
                      <TableCell className="text-sm">{item.seconds}</TableCell>
                      <TableCell className="text-sm">{item.use}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Time Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity/Event</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {practicalExamples.map((example, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{example.activity}</TableCell>
                      <TableCell>{example.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Time Conversion Tips</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Converting Decimal Hours</h3>
                <p className="text-muted-foreground">Multiply the decimal part by 60 to get minutes. Example: 2.75 hours = 2 hours + (0.75 × 60) = 2 hours 45 minutes. For seconds, multiply the remaining decimal by 60 again.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Converting Minutes to Decimal Hours</h3>
                <p className="text-muted-foreground">Divide minutes by 60. Example: 45 minutes ÷ 60 = 0.75 hours. Add to whole hours: 3 hours 45 minutes = 3.75 hours. Useful for payroll and time tracking.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Accounting for Leap Years</h3>
                <p className="text-muted-foreground">Use 365.25 days per year for average calculations. Leap years occur every 4 years, except century years not divisible by 400. 2000 was a leap year, 2100 will not be.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Month Length Variations</h3>
                <p className="text-muted-foreground">Months range from 28-31 days. For calculations, use 30.44 days (365.25 ÷ 12) as the average. Remember: &quot;Thirty days hath September, April, June, and November...&quot;</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Time in Different Contexts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scientific Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Nanoseconds</p>
                  <p className="text-muted-foreground">CPU clock cycles, light travels 30 cm</p>
                </div>
                <div>
                  <p className="font-semibold">Microseconds</p>
                  <p className="text-muted-foreground">Network latency, high-speed sensors</p>
                </div>
                <div>
                  <p className="font-semibold">Milliseconds</p>
                  <p className="text-muted-foreground">Screen refresh rates, human perception</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Minutes/Hours</p>
                  <p className="text-muted-foreground">Meetings, calls, task durations</p>
                </div>
                <div>
                  <p className="font-semibold">Days/Weeks</p>
                  <p className="text-muted-foreground">Project deadlines, sprints, deliverables</p>
                </div>
                <div>
                  <p className="font-semibold">Months/Quarters</p>
                  <p className="text-muted-foreground">Billing cycles, financial reporting</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Everyday Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Minutes</p>
                  <p className="text-muted-foreground">Cooking, commutes, TV episodes</p>
                </div>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-muted-foreground">Work shifts, movies, sleep</p>
                </div>
                <div>
                  <p className="font-semibold">Days/Weeks</p>
                  <p className="text-muted-foreground">Vacations, habits, routines</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Long-Term Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Months</p>
                  <p className="text-muted-foreground">Pregnancy, leases, subscriptions</p>
                </div>
                <div>
                  <p className="font-semibold">Years</p>
                  <p className="text-muted-foreground">Age, anniversaries, investments</p>
                </div>
                <div>
                  <p className="font-semibold">Decades/Centuries</p>
                  <p className="text-muted-foreground">Historical periods, generations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many seconds are in a day?</h3>
                <p className="text-muted-foreground">One day contains exactly 86,400 seconds. Calculate: 24 hours × 60 minutes × 60 seconds = 86,400 seconds.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why are there 60 seconds in a minute?</h3>
                <p className="text-muted-foreground">The Babylonians used a base-60 (sexagesimal) number system around 2000 BCE. Sixty divides evenly by 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, and 30, making calculations easier without fractions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I calculate time differences?</h3>
                <p className="text-muted-foreground">Convert both times to the same unit (usually minutes), subtract, then convert back. Example: 3:45 to 5:20 = 225 min to 320 min = 95 min = 1 hour 35 minutes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is Unix timestamp?</h3>
                <p className="text-muted-foreground">Unix time counts seconds since January 1, 1970, 00:00:00 UTC. It provides a simple way to represent dates in computing. January 1, 2025, equals approximately 1,735,689,600 seconds since the epoch.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
