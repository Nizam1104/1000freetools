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

export default function AreaPage() {
  const config = converterMappings["Area"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Area"</p>
      </div>
    );
  }

  const commonConversions = [
    { metric: "1 square centimeter", imperial: "0.155 square inches" },
    { metric: "1 square meter", imperial: "10.764 square feet" },
    { metric: "1 hectare", imperial: "2.471 acres" },
    { metric: "1 square kilometer", imperial: "0.386 square miles" },
    { metric: "100 square meters", imperial: "1,076.39 square feet" },
    { metric: "1,000 square meters", imperial: "0.247 acres" },
  ];

  const realWorldExamples = [
    { object: "Standard parking space", measurement: "12.5 m² (134.5 ft²)" },
    { object: "Tennis court (singles)", measurement: "195.08 m² (2,100 ft²)" },
    { object: "Basketball court (NBA)", measurement: "420 m² (4,520 ft²)" },
    { object: "Football field (NFL)", measurement: "5,351 m² (1.32 acres)" },
    { object: "Average house (US)", measurement: "232 m² (2,500 ft²)" },
    { object: "One acre", measurement: "4,047 m² (43,560 ft²)" },
  ];

  const areaFormulas = [
    { shape: "Rectangle", formula: "Area = length × width", example: "5m × 3m = 15 m²" },
    { shape: "Square", formula: "Area = side²", example: "4m × 4m = 16 m²" },
    { shape: "Triangle", formula: "Area = (base × height) ÷ 2", example: "(6m × 4m) ÷ 2 = 12 m²" },
    { shape: "Circle", formula: "Area = π × radius²", example: "π × 3² = 28.27 m²" },
    { shape: "Trapezoid", formula: "Area = ((a + b) × h) ÷ 2", example: "((5m + 3m) × 4m) ÷ 2 = 16 m²" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Area Converter</h1>
        <p className="text-muted-foreground">Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction.</p>
      </div>
      <UnitConverterBase
        title="Area Converter"
        description="Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Area Measurements</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Area measures the size of a two-dimensional surface. You use area calculations when buying property, installing flooring, painting walls, or planning gardens. Area units express how much space a surface covers.
            </p>
            <p>
              The SI unit for area is the square meter (m²). One square meter represents a square with sides of one meter each. Larger areas use hectares or square kilometers, while smaller areas use square centimeters or square inches.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Area Calculation Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Geometric Area Formulas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shape</TableHead>
                    <TableHead>Formula</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areaFormulas.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.shape}</TableCell>
                      <TableCell className="font-mono text-sm">{item.formula}</TableCell>
                      <TableCell className="text-sm">{item.example}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Area Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Square Meters to Square Feet</p>
                  <p className="text-lg font-semibold">ft² = m² × 10.7639</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 50 m² × 10.7639 = 538.2 ft²</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Square Feet to Square Meters</p>
                  <p className="text-lg font-semibold">m² = ft² × 0.0929</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1,000 ft² × 0.0929 = 92.9 m²</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Hectares to Acres</p>
                  <p className="text-lg font-semibold">acres = hectares × 2.47105</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 ha × 2.47105 = 12.355 ac</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Acres to Hectares</p>
                  <p className="text-lg font-semibold">hectares = acres × 0.404686</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 ac × 0.404686 = 4.047 ha</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Area Conversions</h2>
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
          <h2 className="text-2xl font-semibold mb-4">Area Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In m²</TableHead>
                    <TableHead>System</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Square Millimeter</TableCell>
                    <TableCell>mm²</TableCell>
                    <TableCell>0.000001 m²</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Centimeter</TableCell>
                    <TableCell>cm²</TableCell>
                    <TableCell>0.0001 m²</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Meter</TableCell>
                    <TableCell>m²</TableCell>
                    <TableCell>1 m²</TableCell>
                    <TableCell>Metric (SI)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hectare</TableCell>
                    <TableCell>ha</TableCell>
                    <TableCell>10,000 m²</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Kilometer</TableCell>
                    <TableCell>km²</TableCell>
                    <TableCell>1,000,000 m²</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Inch</TableCell>
                    <TableCell>in²</TableCell>
                    <TableCell>0.000645 m²</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Foot</TableCell>
                    <TableCell>ft²</TableCell>
                    <TableCell>0.0929 m²</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Yard</TableCell>
                    <TableCell>yd²</TableCell>
                    <TableCell>0.8361 m²</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Acre</TableCell>
                    <TableCell>ac</TableCell>
                    <TableCell>4,046.86 m²</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Square Mile</TableCell>
                    <TableCell>mi²</TableCell>
                    <TableCell>2,589,988 m²</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Area Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Surface</TableHead>
                    <TableHead>Area</TableHead>
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
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Area Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metric Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Square Centimeters (cm²)</p>
                  <p className="text-muted-foreground">Small surfaces, paper sizes, electronic components, tiles</p>
                </div>
                <div>
                  <p className="font-semibold">Square Meters (m²)</p>
                  <p className="text-muted-foreground">Room sizes, house areas, flooring, real estate listings</p>
                </div>
                <div>
                  <p className="font-semibold">Hectares (ha)</p>
                  <p className="text-muted-foreground">Farmland, large properties, parks, agricultural planning</p>
                </div>
                <div>
                  <p className="font-semibold">Square Kilometers (km²)</p>
                  <p className="text-muted-foreground">Cities, regions, countries, geographical areas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imperial Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Square Inches (in²)</p>
                  <p className="text-muted-foreground">Small components, screen areas, material samples</p>
                </div>
                <div>
                  <p className="font-semibold">Square Feet (ft²)</p>
                  <p className="text-muted-foreground">Room sizes, house areas (US/UK), flooring, real estate</p>
                </div>
                <div>
                  <p className="font-semibold">Acres (ac)</p>
                  <p className="text-muted-foreground">Land plots, farms, large yards, property listings (US/UK)</p>
                </div>
                <div>
                  <p className="font-semibold">Square Miles (mi²)</p>
                  <p className="text-muted-foreground">Cities, counties, geographical regions (US/UK)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Area Calculation Tips</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Measuring Irregular Rooms</h3>
                <p className="text-muted-foreground">Divide irregular spaces into rectangles. Calculate each rectangle&apos;s area separately, then add them together. This approach works for L-shaped rooms, spaces with alcoves, or any complex floor plan.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Accounting for Waste</h3>
                <p className="text-muted-foreground">Add 10-15% extra material when buying flooring, tiles, or carpet. Cutting and fitting creates waste. For complex patterns or diagonal installations, add 20% to your calculated area.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Paint Coverage</h3>
                <p className="text-muted-foreground">One gallon of paint covers approximately 350-400 square feet (32-37 m²). Calculate wall area by multiplying perimeter by height, then subtract door and window areas.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many square feet are in an acre?</h3>
                <p className="text-muted-foreground">One acre equals exactly 43,560 square feet. This measurement dates back to medieval England, representing the area a yoke of oxen could plow in one day.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between a hectare and an acre?</h3>
                <p className="text-muted-foreground">A hectare equals 10,000 square meters (2.471 acres), while an acre equals 4,047 square meters (0.405 hectares). Hectares are used globally for land measurement, acres primarily in the US and UK.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I calculate square footage of a room?</h3>
                <p className="text-muted-foreground">Measure the length and width in feet, then multiply them. For a 12-foot by 15-foot room: 12 × 15 = 180 square feet. For irregular rooms, divide into rectangles and add individual areas.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why is area measured in square units?</h3>
                <p className="text-muted-foreground">Area represents two-dimensional space. Multiplying length by width creates square units because you count how many unit squares fit inside the boundary. A 3m × 4m rectangle holds twelve 1m × 1m squares.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
