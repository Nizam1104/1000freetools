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

export default function SpeedPage() {
  const config = converterMappings["Speed"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Speed"</p>
      </div>
    );
  }

  const commonConversions = [
    { metric: "10 km/h", imperial: "6.21 mph", ms: "2.78 m/s", knots: "5.40 kn" },
    { metric: "50 km/h", imperial: "31.07 mph", ms: "13.89 m/s", knots: "27.00 kn" },
    { metric: "100 km/h", imperial: "62.14 mph", ms: "27.78 m/s", knots: "54.00 kn" },
    { metric: "60 mph", imperial: "96.56 km/h", ms: "26.82 m/s", knots: "52.14 kn" },
    { metric: "100 mph", imperial: "160.93 km/h", ms: "44.70 m/s", knots: "86.90 kn" },
    { metric: "1 m/s", imperial: "2.24 mph", kmh: "3.60 km/h", knots: "1.94 kn" },
  ];

  const speedReference = [
    { object: "Walking speed (average)", kmh: "5 km/h", mph: "3.1 mph", ms: "1.4 m/s" },
    { object: "Running (jogging)", kmh: "8-10 km/h", mph: "5-6.2 mph", ms: "2.2-2.8 m/s" },
    { object: "Running (sprinting)", kmh: "25-30 km/h", mph: "15.5-18.6 mph", ms: "6.9-8.3 m/s" },
    { object: "City driving", kmh: "30-50 km/h", mph: "19-31 mph", ms: "8.3-13.9 m/s" },
    { object: "Highway driving", kmh: "90-120 km/h", mph: "56-75 mph", ms: "25-33.3 m/s" },
    { object: "Commercial aircraft", kmh: "800-900 km/h", mph: "500-560 mph", ms: "222-250 m/s" },
    { object: "Sound (at sea level)", kmh: "1,235 km/h", mph: "767 mph", ms: "343 m/s" },
    { object: "Light (in vacuum)", kmh: "1.08 billion km/h", mph: "670.6 million mph", ms: "299,792,458 m/s" },
  ];

  const vehicleSpeeds = [
    { vehicle: "Electric scooter", typical: "25 km/h", max: "45 km/h" },
    { vehicle: "Bicycle (casual)", typical: "15-20 km/h", max: "30 km/h" },
    { vehicle: "Bicycle (racing)", typical: "40 km/h", max: "70 km/h" },
    { vehicle: "Motorcycle", typical: "80-120 km/h", max: "200+ km/h" },
    { vehicle: "Car (city)", typical: "40-60 km/h", max: "100 km/h" },
    { vehicle: "Car (highway)", typical: "100-130 km/h", max: "200+ km/h" },
    { vehicle: "High-speed train", typical: "250-320 km/h", max: "430 km/h" },
    { vehicle: "Formula 1 car", typical: "200-300 km/h", max: "370 km/h" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Speed Converter</h1>
        <p className="text-muted-foreground">Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.</p>
      </div>
      <UnitConverterBase
        title="Speed Converter"
        description="Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Speed and Velocity</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Speed measures how fast an object moves. Velocity includes both speed and direction. You encounter speed measurements daily — driving, running, flying, or watching weather reports. Speed equals distance traveled divided by time taken.
            </p>
            <p>
              Different fields use different speed units. Roads use kilometers per hour (most countries) or miles per hour (US, UK). Science uses meters per second. Aviation and maritime navigation use knots (nautical miles per hour). Each unit serves specific practical purposes.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Speed Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">km/h to mph</p>
                  <p className="text-lg font-semibold">mph = km/h × 0.621371</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 km/h × 0.621371 = 62.14 mph</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">mph to km/h</p>
                  <p className="text-lg font-semibold">km/h = mph × 1.60934</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 60 mph × 1.60934 = 96.56 km/h</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">km/h to m/s</p>
                  <p className="text-lg font-semibold">m/s = km/h ÷ 3.6</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 72 km/h ÷ 3.6 = 20 m/s</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">m/s to km/h</p>
                  <p className="text-lg font-semibold">km/h = m/s × 3.6</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 m/s × 3.6 = 36 km/h</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">km/h to knots</p>
                  <p className="text-lg font-semibold">knots = km/h × 0.539957</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 km/h × 0.539957 = 54.00 kn</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">knots to km/h</p>
                  <p className="text-lg font-semibold">km/h = knots × 1.852</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 50 kn × 1.852 = 92.6 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Speed Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Speed</TableHead>
                    <TableHead>mph</TableHead>
                    <TableHead>m/s</TableHead>
                    <TableHead>Knots</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.metric}</TableCell>
                      <TableCell>{conv.imperial}</TableCell>
                      <TableCell>{conv.ms}</TableCell>
                      <TableCell>{conv.knots || conv.kmh}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Speed Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Activity</TableHead>
                    <TableHead>km/h</TableHead>
                    <TableHead>mph</TableHead>
                    <TableHead>m/s</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {speedReference.map((ref, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ref.object}</TableCell>
                      <TableCell>{ref.kmh}</TableCell>
                      <TableCell>{ref.mph}</TableCell>
                      <TableCell>{ref.ms}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Vehicle Speed Comparison</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Typical Speed</TableHead>
                    <TableHead>Maximum Speed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleSpeeds.map((vehicle, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vehicle.vehicle}</TableCell>
                      <TableCell>{vehicle.typical}</TableCell>
                      <TableCell>{vehicle.max}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Speed Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In m/s</TableHead>
                    <TableHead>Common Uses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Meter/second</TableCell>
                    <TableCell>m/s</TableCell>
                    <TableCell>1 m/s</TableCell>
                    <TableCell>Science, physics, engineering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilometer/hour</TableCell>
                    <TableCell>km/h</TableCell>
                    <TableCell>0.2778 m/s</TableCell>
                    <TableCell>Road signs, vehicles (most countries)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mile/hour</TableCell>
                    <TableCell>mph</TableCell>
                    <TableCell>0.4470 m/s</TableCell>
                    <TableCell>Road signs, vehicles (US, UK)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Knot</TableCell>
                    <TableCell>kn</TableCell>
                    <TableCell>0.5144 m/s</TableCell>
                    <TableCell>Aviation, maritime navigation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Foot/second</TableCell>
                    <TableCell>ft/s</TableCell>
                    <TableCell>0.3048 m/s</TableCell>
                    <TableCell>Engineering (US), ballistics</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Speed Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kilometers per Hour (km/h)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Road Traffic</p>
                  <p className="text-muted-foreground">Speed limits, vehicle speedometers, traffic reports (most countries)</p>
                </div>
                <div>
                  <p className="font-semibold">Sports</p>
                  <p className="text-muted-foreground">Cycling, running, skiing speeds</p>
                </div>
                <div>
                  <p className="font-semibold">Weather</p>
                  <p className="text-muted-foreground">Wind speeds (many countries)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Miles per Hour (mph)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Road Traffic</p>
                  <p className="text-muted-foreground">Speed limits, vehicle speedometers (US, UK)</p>
                </div>
                <div>
                  <p className="font-semibold">Sports</p>
                  <p className="text-muted-foreground">Baseball pitches, football throws, track events (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Weather</p>
                  <p className="text-muted-foreground">Wind speeds, storm warnings (US, UK)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meters per Second (m/s)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Science</p>
                  <p className="text-muted-foreground">Physics calculations, research, experiments</p>
                </div>
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Fluid dynamics, structural analysis</p>
                </div>
                <div>
                  <p className="font-semibold">Weather</p>
                  <p className="text-muted-foreground">Scientific meteorology, wind measurements</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Knots (kn)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Aviation</p>
                  <p className="text-muted-foreground">Aircraft speed, wind speed, air traffic control</p>
                </div>
                <div>
                  <p className="font-semibold">Maritime</p>
                  <p className="text-muted-foreground">Ship speed, current speed, navigation</p>
                </div>
                <div>
                  <p className="font-semibold">Meteorology</p>
                  <p className="text-muted-foreground">Aviation weather, marine forecasts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Speed Calculation Tips</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Calculate Average Speed</h3>
                <p className="text-muted-foreground">Divide total distance by total time. Example: 150 km in 2 hours = 150 ÷ 2 = 75 km/h average speed. This works regardless of speed variations during the journey.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Convert Travel Time</h3>
                <p className="text-muted-foreground">Time = Distance ÷ Speed. Example: 300 km at 100 km/h = 300 ÷ 100 = 3 hours. Add extra time for stops, traffic, and delays.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Quick km/h to mph Estimate</h3>
                <p className="text-muted-foreground">Divide km/h by 8, then multiply by 5. Example: 100 km/h ÷ 8 = 12.5 × 5 = 62.5 mph (actual: 62.14 mph). Good enough for quick mental estimates.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the speed of sound?</h3>
                <p className="text-muted-foreground">Sound travels at 343 m/s (1,235 km/h, 767 mph) in dry air at 20°C. Speed varies with temperature, humidity, and altitude. Supersonic speeds exceed Mach 1 (the speed of sound).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is a knot and why do ships use it?</h3>
                <p className="text-muted-foreground">One knot equals one nautical mile per hour (1.852 km/h, 1.151 mph). Nautical miles match Earth&apos;s latitude measurements, making navigation calculations simpler. One nautical mile equals one minute of latitude.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How fast is the speed of light?</h3>
                <p className="text-muted-foreground">Light travels at exactly 299,792,458 m/s in vacuum (about 300,000 km/s or 186,000 miles/s). Nothing travels faster. This universal constant defines the maximum speed for all matter and information.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is Mach number?</h3>
                <p className="text-muted-foreground">Mach number expresses speed relative to the speed of sound. Mach 1 equals the speed of sound. Mach 2 means twice the speed of sound. Fighter jets and spacecraft use Mach numbers for high-speed flight.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
