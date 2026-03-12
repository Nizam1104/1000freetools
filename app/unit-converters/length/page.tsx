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

export default function LengthPage() {
  const config = converterMappings["Length"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Length"</p>
      </div>
    );
  }

  const commonConversions = [
    { metric: "1 millimeter", imperial: "0.039 inches" },
    { metric: "1 centimeter", imperial: "0.394 inches" },
    { metric: "1 meter", imperial: "3.281 feet" },
    { metric: "1 kilometer", imperial: "0.621 miles" },
    { metric: "10 meters", imperial: "32.808 feet" },
    { metric: "100 meters", imperial: "328.084 feet" },
  ];

  const realWorldExamples = [
    { object: "Standard door height", measurement: "2.0 meters (6.56 feet)" },
    { object: "Olympic swimming pool", measurement: "50 meters (164.04 feet)" },
    { object: "Football field (NFL)", measurement: "109.7 meters (120 yards)" },
    { object: "Basketball court (NBA)", measurement: "28.65 meters (94 feet)" },
    { object: "Marathon race", measurement: "42.195 kilometers (26.22 miles)" },
    { object: "Average human height (male)", measurement: "1.75 meters (5.74 feet)" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Length Converter</h1>
        <p className="text-muted-foreground">Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.</p>
      </div>
      <UnitConverterBase
        title="Length Converter"
        description="Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Length Measurements</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Length measures distance between two points. The metric system uses meters as the base unit, while the imperial system uses feet and inches. You encounter length measurements daily when measuring rooms, checking your height, or planning travel distances.
            </p>
            <p>
              The International System of Units (SI) defines the meter as the standard unit of length. One meter equals the distance light travels in vacuum during 1/299,792,458 of a second. This definition ensures precise, consistent measurements worldwide.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Length Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Meters to Feet</p>
                  <p className="text-lg font-semibold">feet = meters × 3.28084</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 m × 3.28084 = 16.404 ft</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Feet to Meters</p>
                  <p className="text-lg font-semibold">meters = feet × 0.3048</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 ft × 0.3048 = 3.048 m</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilometers to Miles</p>
                  <p className="text-lg font-semibold">miles = kilometers × 0.621371</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 km × 0.621371 = 62.137 mi</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Inches to Centimeters</p>
                  <p className="text-lg font-semibold">cm = inches × 2.54</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 12 in × 2.54 = 30.48 cm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Length Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Imperial Equivalent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conversion, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conversion.metric}</TableCell>
                      <TableCell>{conversion.imperial}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Length Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Meters</TableHead>
                    <TableHead>System</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Millimeter</TableCell>
                    <TableCell>mm</TableCell>
                    <TableCell>0.001 m</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Centimeter</TableCell>
                    <TableCell>cm</TableCell>
                    <TableCell>0.01 m</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Meter</TableCell>
                    <TableCell>m</TableCell>
                    <TableCell>1 m</TableCell>
                    <TableCell>Metric (SI)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilometer</TableCell>
                    <TableCell>km</TableCell>
                    <TableCell>1,000 m</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Inch</TableCell>
                    <TableCell>in</TableCell>
                    <TableCell>0.0254 m</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Foot</TableCell>
                    <TableCell>ft</TableCell>
                    <TableCell>0.3048 m</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Yard</TableCell>
                    <TableCell>yd</TableCell>
                    <TableCell>0.9144 m</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mile</TableCell>
                    <TableCell>mi</TableCell>
                    <TableCell>1,609.344 m</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nautical Mile</TableCell>
                    <TableCell>nmi</TableCell>
                    <TableCell>1,852 m</TableCell>
                    <TableCell>Navigation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Length Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Distance</TableHead>
                    <TableHead>Measurement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {realWorldExamples.map((example, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{example.object}</TableCell>
                      <TableCell>{example.measurement}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Length Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metric Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Millimeters (mm)</p>
                  <p className="text-muted-foreground">Precision engineering, manufacturing tolerances, small mechanical parts</p>
                </div>
                <div>
                  <p className="font-semibold">Centimeters (cm)</p>
                  <p className="text-muted-foreground">Body measurements, clothing sizes, small household objects</p>
                </div>
                <div>
                  <p className="font-semibold">Meters (m)</p>
                  <p className="text-muted-foreground">Room dimensions, human height, sports distances, construction</p>
                </div>
                <div>
                  <p className="font-semibold">Kilometers (km)</p>
                  <p className="text-muted-foreground">Road distances, running events, geography, travel planning</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imperial Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Inches (in)</p>
                  <p className="text-muted-foreground">Screen sizes, pipe diameters, lumber thickness, small measurements</p>
                </div>
                <div>
                  <p className="font-semibold">Feet (ft)</p>
                  <p className="text-muted-foreground">Room dimensions, human height (US/UK), building heights</p>
                </div>
                <div>
                  <p className="font-semibold">Yards (yd)</p>
                  <p className="text-muted-foreground">Fabric lengths, sports fields (American football), landscaping</p>
                </div>
                <div>
                  <p className="font-semibold">Miles (mi)</p>
                  <p className="text-muted-foreground">Road distances (US/UK), running events, geography</p>
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
                <h3 className="font-semibold mb-2">How do I convert meters to feet quickly?</h3>
                <p className="text-muted-foreground">Multiply meters by 3.28 for a quick estimate. For precise conversions, use 3.28084. Example: 2 meters × 3.28 = 6.56 feet.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between a nautical mile and a regular mile?</h3>
                <p className="text-muted-foreground">A nautical mile equals 1,852 meters (6,076 feet), while a statute mile equals 1,609 meters (5,280 feet). Nautical miles measure distance at sea and in aviation, based on Earth&apos;s circumference.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why does the US still use inches and feet?</h3>
                <p className="text-muted-foreground">The US customary system evolved from British imperial units. Despite global metric adoption, the US maintains imperial units due to existing infrastructure, manufacturing standards, and public familiarity.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How accurate is the inch to centimeter conversion?</h3>
                <p className="text-muted-foreground">The conversion is exact: 1 inch equals precisely 2.54 centimeters. This definition was internationally agreed upon in 1959, ensuring consistent conversions worldwide.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
