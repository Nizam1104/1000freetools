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

export default function WeightAndMassPage() {
  const config = converterMappings["Weight and Mass"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Weight and Mass"</p>
      </div>
    );
  }

  const commonConversions = [
    { metric: "1 gram", imperial: "0.035 ounces" },
    { metric: "1 kilogram", imperial: "2.205 pounds" },
    { metric: "100 grams", imperial: "3.527 ounces" },
    { metric: "500 grams", imperial: "1.102 pounds" },
    { metric: "1 metric ton", imperial: "2,204.62 pounds" },
    { metric: "10 kilograms", imperial: "22.046 pounds" },
  ];

  const cookingConversions = [
    { ingredient: "Flour (all-purpose)", cupToGrams: "125 g", gramToCup: "8 g per tbsp" },
    { ingredient: "Sugar (granulated)", cupToGrams: "200 g", gramToCup: "12.5 g per tbsp" },
    { ingredient: "Butter", cupToGrams: "227 g", gramToCup: "14 g per tbsp" },
    { ingredient: "Rice (uncooked)", cupToGrams: "185 g", gramToCup: "11.5 g per tbsp" },
    { ingredient: "Milk", cupToGrams: "245 g", gramToCup: "15.3 g per tbsp" },
    { ingredient: "Honey", cupToGrams: "340 g", gramToCup: "21 g per tbsp" },
  ];

  const realWorldExamples = [
    { object: "Paperclip", measurement: "1 gram (0.035 oz)" },
    { object: "Smartphone", measurement: "150-200 grams (5.3-7 oz)" },
    { object: "Laptop computer", measurement: "1.5-2.5 kg (3.3-5.5 lb)" },
    { object: "Average adult male", measurement: "70-90 kg (154-198 lb)" },
    { object: "Average adult female", measurement: "55-75 kg (121-165 lb)" },
    { object: "Compact car", measurement: "1,200-1,500 kg (2,645-3,307 lb)" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Weight and Mass Converter</h1>
        <p className="text-muted-foreground">Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science.</p>
      </div>
      <UnitConverterBase
        title="Weight and Mass Converter"
        description="Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Weight vs Mass</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Mass measures the amount of matter in an object. Weight measures the gravitational force acting on that mass. Your mass stays constant everywhere, but your weight changes on different planets due to varying gravity.
            </p>
            <p>
              On Earth, we use weight and mass interchangeably because gravity remains nearly constant. The kilogram serves as the SI base unit for mass. Pounds and ounces form the imperial system for everyday weight measurements.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weight Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilograms to Pounds</p>
                  <p className="text-lg font-semibold">lb = kg × 2.20462</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 70 kg × 2.20462 = 154.32 lb</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Pounds to Kilograms</p>
                  <p className="text-lg font-semibold">kg = lb × 0.453592</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 150 lb × 0.453592 = 68.04 kg</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Grams to Ounces</p>
                  <p className="text-lg font-semibold">oz = g × 0.035274</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 g × 0.035274 = 3.527 oz</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Ounces to Grams</p>
                  <p className="text-lg font-semibold">g = oz × 28.3495</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 8 oz × 28.3495 = 226.8 g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Weight Conversions</h2>
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
          <h2 className="text-2xl font-semibold mb-4">Cooking Ingredient Weights</h2>
          <Card>
            <CardHeader>
              <CardTitle>Cup to Gram Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>1 Cup =</TableHead>
                    <TableHead>1 Tablespoon =</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookingConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.ingredient}</TableCell>
                      <TableCell>{conv.cupToGrams}</TableCell>
                      <TableCell>{conv.gramToCup}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weight Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In kg</TableHead>
                    <TableHead>System</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Milligram</TableCell>
                    <TableCell>mg</TableCell>
                    <TableCell>0.000001 kg</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gram</TableCell>
                    <TableCell>g</TableCell>
                    <TableCell>0.001 kg</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilogram</TableCell>
                    <TableCell>kg</TableCell>
                    <TableCell>1 kg</TableCell>
                    <TableCell>Metric (SI)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Metric Ton</TableCell>
                    <TableCell>t</TableCell>
                    <TableCell>1,000 kg</TableCell>
                    <TableCell>Metric</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ounce</TableCell>
                    <TableCell>oz</TableCell>
                    <TableCell>0.02835 kg</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pound</TableCell>
                    <TableCell>lb</TableCell>
                    <TableCell>0.45359 kg</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Stone</TableCell>
                    <TableCell>st</TableCell>
                    <TableCell>6.35029 kg</TableCell>
                    <TableCell>Imperial (UK)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">US Ton</TableCell>
                    <TableCell>ton</TableCell>
                    <TableCell>907.185 kg</TableCell>
                    <TableCell>Imperial (US)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Long Ton (UK)</TableCell>
                    <TableCell>long ton</TableCell>
                    <TableCell>1,016.047 kg</TableCell>
                    <TableCell>Imperial (UK)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Weight Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object</TableHead>
                    <TableHead>Weight/Mass</TableHead>
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
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Weight Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metric Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Milligrams (mg)</p>
                  <p className="text-muted-foreground">Medicine doses, vitamins, supplements, precious metals</p>
                </div>
                <div>
                  <p className="font-semibold">Grams (g)</p>
                  <p className="text-muted-foreground">Food portions, cooking ingredients, postal weights, jewelry</p>
                </div>
                <div>
                  <p className="font-semibold">Kilograms (kg)</p>
                  <p className="text-muted-foreground">Body weight, produce, luggage, packages, gym weights</p>
                </div>
                <div>
                  <p className="font-semibold">Metric Tons (t)</p>
                  <p className="text-muted-foreground">Vehicles, cargo, construction materials, industrial goods</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imperial Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Ounces (oz)</p>
                  <p className="text-muted-foreground">Food portions, letters, small packages, liquids (fl oz)</p>
                </div>
                <div>
                  <p className="font-semibold">Pounds (lb)</p>
                  <p className="text-muted-foreground">Body weight (US), produce, meat, luggage, packages</p>
                </div>
                <div>
                  <p className="font-semibold">Stone (st)</p>
                  <p className="text-muted-foreground">Body weight (UK only), one stone equals 14 pounds</p>
                </div>
                <div>
                  <p className="font-semibold">Tons</p>
                  <p className="text-muted-foreground">Vehicles, heavy cargo, construction (US ton = 2,000 lb)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weight in Different Contexts</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Body Weight</h3>
                <p className="text-muted-foreground">Most countries use kilograms for body weight. The US and Liberia use pounds. The UK uses stone and pounds (1 stone = 14 lb). A healthy BMI ranges from 18.5 to 24.9 kg/m².</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Shipping and Postal</h3>
                <p className="text-muted-foreground">Shipping costs depend on weight. Domestic packages often use pounds or kilograms. International shipping requires metric measurements. Always round up to the nearest unit for accurate pricing.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Cooking and Baking</h3>
                <p className="text-muted-foreground">Professional bakers use grams for precision. Volume measurements (cups) vary with packing density. Weight measurements ensure consistent results. Digital kitchen scales improve accuracy.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many pounds are in a kilogram?</h3>
                <p className="text-muted-foreground">One kilogram equals exactly 2.20462 pounds. For quick estimates, multiply kilograms by 2.2. Example: 5 kg × 2.2 = 11 lb (actual: 11.02 lb).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between a US ton and a metric ton?</h3>
                <p className="text-muted-foreground">A US (short) ton equals 2,000 pounds (907.18 kg). A metric ton (tonne) equals 1,000 kilograms (2,204.62 lb). A UK (long) ton equals 2,240 pounds (1,016.05 kg).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I convert my weight from pounds to kilograms?</h3>
                <p className="text-muted-foreground">Divide pounds by 2.20462. For quick mental math, divide by 2, then subtract 10%. Example: 180 lb ÷ 2 = 90, minus 9 = 81 kg (actual: 81.65 kg).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why do recipes use grams instead of cups?</h3>
                <p className="text-muted-foreground">Weight measurements provide consistent results. One cup of flour can vary from 120-150 grams depending on how you scoop it. Grams eliminate this variation, ensuring your baked goods turn out the same every time.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
