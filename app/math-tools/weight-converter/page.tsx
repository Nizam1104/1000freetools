"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  metricTon: 1000,
  pound: 0.453592,
  ounce: 0.0283495,
  stone: 6.35029,
  usTon: 907.185,
  imperialTon: 1016.05,
  carat: 0.0002,
};

const unitLabels: Record<string, string> = {
  kilogram: "Kilograms (kg)",
  gram: "Grams (g)",
  milligram: "Milligrams (mg)",
  metricTon: "Metric Tons (t)",
  pound: "Pounds (lbs)",
  ounce: "Ounces (oz)",
  stone: "Stone (st)",
  usTon: "US Tons",
  imperialTon: "Imperial Tons",
  carat: "Carats (ct)",
};

export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const kg = val * units[fromUnit];
    const converted = kg / units[toUnit];
    setResult(converted);
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const loadExample = () => {
    setValue("1");
    setFromUnit("kilogram");
    setToUnit("pound");
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(10)).toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Weight Converter – Convert kg, lbs, grams, oz Online</h1>
        <p className="text-muted-foreground">
          Convert between any weight or mass unit with our free online weight converter. Supports kilograms, pounds, grams, ounces, stones, metric tons, and more instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); setResult(null); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swap} className="w-12 h-10 p-0">⇄</Button>
          </div>

          <div className="md:col-span-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg min-h-[42px] flex items-center">
                {result !== null ? round(result) : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {result !== null && value && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conversion Result</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {unitLabels[fromUnit].split(" ")[0]} = {round(result)} {unitLabels[toUnit].split(" ")[0]}
            </code>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Weight Converter Works</h2>
          <p className="text-muted-foreground mb-4">
            Weight (or more precisely, mass) conversion is essential for cooking, science, shipping, and everyday measurements. This converter handles both metric units (kilograms, grams, milligrams) and imperial/US customary units (pounds, ounces, stones), plus specialized units like carats for gemstones.
          </p>
          <p className="text-muted-foreground mb-4">
            The converter uses kilograms as the base unit internally. When converting between any two units, it first converts your input to kilograms, then converts from kilograms to your target unit. This ensures consistent, accurate results across all unit combinations.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Key conversion factors:</p>
            <p>• 1 pound (lb) = 0.4536 kg</p>
            <p>• 1 kilogram = 2.2046 lbs</p>
            <p>• 1 ounce = 28.35 grams</p>
            <p>• 1 stone = 14 lbs = 6.35 kg</p>
            <p>• 1 carat = 0.2 grams</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Weight Conversions</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Body Weight: Pounds to Kilograms</h3>
          <p className="text-muted-foreground mb-2">
            Common body weight conversions:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>150 lbs = 68.04 kg</p>
            <p>180 lbs = 81.65 kg</p>
            <p>200 lbs = 90.72 kg</p>
            <p className="mt-2 text-muted-foreground">Quick estimate: divide lbs by 2.2</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Cooking: Grams to Ounces</h3>
          <p className="text-muted-foreground mb-2">
            Recipe ingredient conversions:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>250g flour = 8.82 oz</p>
            <p>500g sugar = 17.64 oz (1.1 lbs)</p>
            <p>100g butter = 3.53 oz</p>
            <p className="mt-2 text-muted-foreground">1 oz ≈ 28g for quick estimates</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Shipping: Stones to Pounds</h3>
          <p className="text-muted-foreground mb-2">
            UK stone to US pounds (common for body weight):
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>10 stone = 140 lbs</p>
            <p>12 stone = 168 lbs</p>
            <p>15 stone = 210 lbs</p>
            <p className="mt-2 text-muted-foreground">1 stone = 14 lbs exactly</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Jewelry: Carats to Grams</h3>
          <p className="text-muted-foreground mb-2">
            Gemstone weight conversions:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>1 carat = 0.2 grams</p>
            <p>5 carats = 1 gram</p>
            <p>25 carats = 5 grams</p>
            <p className="mt-2 text-muted-foreground">Not to be confused with gold karats (purity)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: The Kilogram's Journey</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              For over 130 years, the kilogram was defined by a physical object: <strong>Le Grand K</strong>, a platinum-iridium cylinder stored in a vault near Paris. Created in 1889, it was the last SI unit defined by a physical artifact. But Le Grand K was slowly losing mass (about 50 micrograms per century)! In 2019, scientists redefined the kilogram using <strong>Planck's constant</strong> and a device called a Kibble balance. Now the kilogram is defined by fundamental physics, ensuring it will never change. The pound, meanwhile, is legally defined as exactly 0.45359237 kilograms since 1959.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between weight and mass?</h3>
              <p className="text-muted-foreground">
                Mass measures the amount of matter in an object (constant everywhere). Weight is the force of gravity on that mass (changes with gravity). On Earth, we use them interchangeably because gravity is nearly constant. Your mass is 70 kg on Earth and the Moon; your weight differs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I quickly convert kg to lbs in my head?</h3>
              <p className="text-muted-foreground">
                Multiply by 2.2. For a quick estimate: double the kg value and add 10%. Example: 75 kg × 2 = 150, plus 10% (15) = 165 lbs. Actual: 165.35 lbs. For lbs to kg: divide by 2.2 or halve and subtract 10%.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is a stone and where is it used?</h3>
              <p className="text-muted-foreground">
                The stone (st) equals 14 pounds or 6.35 kg. It's primarily used in the UK and Ireland for measuring body weight. Americans typically use pounds, while most of the world uses kilograms. A British person might say "11 stone" instead of "154 pounds."
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Are troy ounces the same as regular ounces?</h3>
              <p className="text-muted-foreground">
                No! Troy ounces (used for precious metals) weigh 31.1 grams, while regular (avoirdupois) ounces weigh 28.35 grams. A troy ounce is about 10% heavier. Gold and silver prices are quoted per troy ounce, not regular ounce.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many grams are in a pound?</h3>
              <p className="text-muted-foreground">
                1 pound = 453.592 grams (often rounded to 454g). For cooking, 450g is a convenient approximation. Half a pound = 227g (or 225g for easy math). Quarter pound = 113g (famously, the McDonald's Quarter Pounder).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the best unit for measuring small weights?</h3>
              <p className="text-muted-foreground">
                For very small weights: milligrams (mg) for medication doses, micrograms (μg) for vitamins and hormones. A grain of salt weighs about 0.00006 grams (60 μg). Kitchen scales typically measure to 1g precision; jewelry scales measure to 0.01g or better.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why do some countries use kg and others use lbs?</h3>
              <p className="text-muted-foreground">
                Most countries adopted the metric system (kg) during the 19th-20th centuries for its simplicity. The US, Liberia, and Myanmar still primarily use imperial units (lbs). The UK uses a mix: kg in shops, but stone/lbs for body weight. Science worldwide uses metric exclusively.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
