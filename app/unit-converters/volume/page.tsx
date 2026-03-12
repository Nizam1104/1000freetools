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

export default function VolumePage() {
  const config = converterMappings["Volume"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume"</p>
      </div>
    );
  }

  const commonConversions = [
    { metric: "1 milliliter", imperial: "0.034 fluid ounces" },
    { metric: "1 liter", imperial: "33.814 fluid ounces" },
    { metric: "1 liter", imperial: "0.264 gallons" },
    { metric: "1 cubic meter", imperial: "35.315 cubic feet" },
    { metric: "5 liters", imperial: "1.32 gallons" },
    { metric: "10 liters", imperial: "2.64 gallons" },
  ];

  const cookingConversions = [
    { unit: "1 tablespoon", metric: "14.79 mL", imperial: "0.5 fl oz" },
    { unit: "1 teaspoon", metric: "4.93 mL", imperial: "0.167 fl oz" },
    { unit: "1 cup (US)", metric: "236.59 mL", imperial: "8 fl oz" },
    { unit: "1 pint (US)", metric: "473.18 mL", imperial: "16 fl oz" },
    { unit: "1 quart (US)", metric: "946.35 mL", imperial: "32 fl oz" },
    { unit: "1 gallon (US)", metric: "3.785 L", imperial: "128 fl oz" },
  ];

  const realWorldExamples = [
    { object: "Standard soda can", measurement: "355 mL (12 fl oz)" },
    { object: "Wine bottle", measurement: "750 mL (25.4 fl oz)" },
    { object: "Bathtub capacity", measurement: "150-300 L (40-80 gal)" },
    { object: "Car fuel tank (average)", measurement: "50-70 L (13-18 gal)" },
    { object: "Olympic swimming pool", measurement: "2,500,000 L (660,000 gal)" },
    { object: "Refrigerator capacity", measurement: "400-600 L (14-21 ft³)" },
  ];

  const volumeFormulas = [
    { shape: "Cube", formula: "Volume = side³", example: "3m × 3m × 3m = 27 m³" },
    { shape: "Rectangular Prism", formula: "Volume = length × width × height", example: "4m × 3m × 2m = 24 m³" },
    { shape: "Cylinder", formula: "Volume = π × radius² × height", example: "π × 2² × 5 = 62.83 m³" },
    { shape: "Sphere", formula: "Volume = (4/3) × π × radius³", example: "(4/3) × π × 3³ = 113.1 m³" },
    { shape: "Cone", formula: "Volume = (1/3) × π × radius² × height", example: "(1/3) × π × 2² × 6 = 25.13 m³" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volume Converter</h1>
        <p className="text-muted-foreground">Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions.</p>
      </div>
      <UnitConverterBase
        title="Volume Converter"
        description="Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Volume Measurements</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Volume measures the three-dimensional space an object occupies or a container holds. You encounter volume measurements when cooking, filling a gas tank, buying beverages, or calculating storage capacity.
            </p>
            <p>
              The SI unit for volume is the cubic meter (m³). For everyday use, liters and milliliters serve as practical metric units. The imperial system uses gallons, quarts, pints, and fluid ounces for liquids, plus cubic feet and inches for solid volumes.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume Calculation Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Geometric Volume Formulas</CardTitle>
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
                  {volumeFormulas.map((item, index) => (
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
          <h2 className="text-2xl font-semibold mb-4">Volume Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Liters to Gallons (US)</p>
                  <p className="text-lg font-semibold">gal = L × 0.264172</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 20 L × 0.264172 = 5.28 gal</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Gallons to Liters</p>
                  <p className="text-lg font-semibold">L = gal × 3.78541</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 gal × 3.78541 = 37.85 L</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Cubic Meters to Cubic Feet</p>
                  <p className="text-lg font-semibold">ft³ = m³ × 35.3147</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 2 m³ × 35.3147 = 70.63 ft³</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Fluid Ounces to Milliliters</p>
                  <p className="text-lg font-semibold">mL = fl oz × 29.5735</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 8 fl oz × 29.5735 = 236.59 mL</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Volume Conversions</h2>
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
          <h2 className="text-2xl font-semibold mb-4">Cooking Volume Conversions</h2>
          <Card>
            <CardHeader>
              <CardTitle>US Cooking Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Imperial (fl oz)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookingConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.unit}</TableCell>
                      <TableCell>{conv.metric}</TableCell>
                      <TableCell>{conv.imperial}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Liters</TableHead>
                    <TableHead>System</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Milliliter</TableCell>
                    <TableCell>mL</TableCell>
                    <TableCell>0.001 L</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Liter</TableCell>
                    <TableCell>L</TableCell>
                    <TableCell>1 L</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cubic Meter</TableCell>
                    <TableCell>m³</TableCell>
                    <TableCell>1,000 L</TableCell>
                    <TableCell>Metric (SI)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cubic Centimeter</TableCell>
                    <TableCell>cm³</TableCell>
                    <TableCell>0.001 L</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Teaspoon</TableCell>
                    <TableCell>tsp</TableCell>
                    <TableCell>0.00493 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tablespoon</TableCell>
                    <TableCell>tbsp</TableCell>
                    <TableCell>0.01479 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fluid Ounce (US)</TableCell>
                    <TableCell>fl oz</TableCell>
                    <TableCell>0.02957 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cup (US)</TableCell>
                    <TableCell>cup</TableCell>
                    <TableCell>0.23659 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pint (US)</TableCell>
                    <TableCell>pt</TableCell>
                    <TableCell>0.47318 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quart (US)</TableCell>
                    <TableCell>qt</TableCell>
                    <TableCell>0.94635 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gallon (US)</TableCell>
                    <TableCell>gal</TableCell>
                    <TableCell>3.78541 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cubic Foot</TableCell>
                    <TableCell>ft³</TableCell>
                    <TableCell>28.3168 L</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Volume Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Container</TableHead>
                    <TableHead>Volume</TableHead>
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
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Volume Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metric Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Milliliters (mL)</p>
                  <p className="text-muted-foreground">Medicine doses, small liquid amounts, perfume, flavorings</p>
                </div>
                <div>
                  <p className="font-semibold">Liters (L)</p>
                  <p className="text-muted-foreground">Beverages, fuel, cooking liquids, container capacities</p>
                </div>
                <div>
                  <p className="font-semibold">Cubic Meters (m³)</p>
                  <p className="text-muted-foreground">Large tanks, shipping containers, room volumes, water usage</p>
                </div>
                <div>
                  <p className="font-semibold">Cubic Centimeters (cm³)</p>
                  <p className="text-muted-foreground">Engine displacement, small containers, medical measurements</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imperial Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Teaspoons/Tablespoons</p>
                  <p className="text-muted-foreground">Cooking recipes, medicine doses, small ingredient amounts</p>
                </div>
                <div>
                  <p className="font-semibold">Fluid Ounces (fl oz)</p>
                  <p className="text-muted-foreground">Beverage servings, cosmetics, small liquid products</p>
                </div>
                <div>
                  <p className="font-semibold">Gallons (gal)</p>
                  <p className="text-muted-foreground">Fuel, milk, large containers, water heaters (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Cubic Feet (ft³)</p>
                  <p className="text-muted-foreground">Refrigerator capacity, room volumes, shipping, HVAC</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Important Volume Notes</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">US vs UK Gallons</h3>
                <p className="text-muted-foreground">US gallons equal 3.785 liters, while UK (imperial) gallons equal 4.546 liters. A UK gallon holds about 20% more than a US gallon. Always check which system your recipe or specification uses.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Dry vs Liquid Measurements</h3>
                <p className="text-muted-foreground">US dry gallons differ from liquid gallons. Dry gallons equal 4.405 liters versus 3.785 liters for liquid. For cooking, use standard liquid measurements unless a recipe specifically calls for dry measures.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Metric Cooking Measurements</h3>
                <p className="text-muted-foreground">Many countries use metric measurements in cooking. One metric cup equals 250 mL (vs 236.59 mL for US cups). Australian tablespoons equal 20 mL (vs 14.79 mL for US). Check your recipe&apos;s origin for accurate conversions.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many ounces are in a liter?</h3>
                <p className="text-muted-foreground">One liter equals 33.814 US fluid ounces. For quick mental math, multiply liters by 34. A standard 16.9 oz water bottle holds about 0.5 liters.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between mL and cm³?</h3>
                <p className="text-muted-foreground">One milliliter equals exactly one cubic centimeter. These units measure the same volume. Milliliters describe liquids, cubic centimeters describe solids or engine displacement.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I convert cups to milliliters?</h3>
                <p className="text-muted-foreground">Multiply cups by 236.59 for US cups. Example: 2 cups × 236.59 = 473.18 mL. For metric cups, multiply by 250. One cup equals 16 tablespoons or 48 teaspoons.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How much is a gallon of water?</h3>
                <p className="text-muted-foreground">One US gallon equals 3.785 liters, 128 fluid ounces, or 16 cups. A gallon of water weighs approximately 8.34 pounds (3.78 kg) at room temperature.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
