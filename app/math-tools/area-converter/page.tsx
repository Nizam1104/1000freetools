"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareMillimeter: 0.000001,
  squareFoot: 0.092903,
  squareYard: 0.836127,
  squareInch: 0.00064516,
  squareMile: 2589988.11,
  acre: 4046.86,
  hectare: 10000,
};

const unitLabels: Record<string, string> = {
  squareMeter: "Square meters (m²)",
  squareKilometer: "Square kilometers (km²)",
  squareCentimeter: "Square centimeters (cm²)",
  squareMillimeter: "Square millimeters (mm²)",
  squareFoot: "Square feet (ft²)",
  squareYard: "Square yards (yd²)",
  squareInch: "Square inches (in²)",
  squareMile: "Square miles (mi²)",
  acre: "Acres",
  hectare: "Hectares (ha)",
};

export default function AreaConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("squareMeter");
  const [toUnit, setToUnit] = useState("squareFoot");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const sqm = val * units[fromUnit];
    const converted = sqm / units[toUnit];
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

  const loadExample = (val: string, from: string, to: string) => {
    setValue(val);
    setFromUnit(from);
    setToUnit(to);
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(6)).toString();
  };

  const getUnitSymbol = (unit: string): string => {
    const symbols: Record<string, string> = {
      squareMeter: "m²",
      squareKilometer: "km²",
      squareCentimeter: "cm²",
      squareMillimeter: "mm²",
      squareFoot: "ft²",
      squareYard: "yd²",
      squareInch: "in²",
      squareMile: "mi²",
      acre: "ac",
      hectare: "ha",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Area Converter – Convert sq ft, sq m, Acres, Hectares Online</h1>
        <p className="text-muted-foreground">
          Convert between any area unit with our free online area converter. Supports square meters, square feet, acres, hectares, and many more area measurement units.
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
                <SelectTrigger className="w-48">
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
                {result !== null ? `${round(result)} ${getUnitSymbol(toUnit)}` : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-48">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "acre", "hectare")}>
            1 acre to hectares
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "squareFoot", "squareMeter")}>
            1000 sq ft to sq m
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "hectare", "acre")}>
            5 hectares to acres
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "squareMile", "acre")}>
            1 sq mile to acres
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "squareMeter", "squareFoot")}>
            100 m² to ft²
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("43560", "squareFoot", "acre")}>
            43,560 sq ft to acres
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2.5", "acre", "squareFoot")}>
            2.5 acres to sq ft
          </Button>
        </div>

        {result !== null && value && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conversion Formula</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {getUnitSymbol(fromUnit)} = {round(result)} {getUnitSymbol(toUnit)}
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Area Unit Converter – Convert Between Any Area Measurements</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Area conversions come up constantly in real life. Real estate listings switch between square feet and square meters. Land surveys use acres or hectares. Construction plans might specify square yards for concrete or square inches for tiles. This converter handles all the common area units instantly.
          </p>
          <p className="text-muted-foreground">
            The math behind area conversion is straightforward but easy to mess up manually. Area units scale by the square of linear conversions – since 1 foot = 0.3048 meters, 1 square foot = 0.092903 square meters (not 0.3048). This calculator handles all the squared conversion factors correctly.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Area Units Explained</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Meter (m²)</h4>
            <p className="text-sm text-muted-foreground">
              The SI unit for area. Used worldwide for real estate, construction, and science. A square meter is about 10.76 square feet – roughly the size of a small bathroom.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Foot (ft²)</h4>
            <p className="text-sm text-muted-foreground">
              Common in the US and UK for real estate and construction. A typical bedroom is 100-200 sq ft. One square foot equals 144 square inches.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Acre</h4>
            <p className="text-sm text-muted-foreground">
              Used for land measurement, especially in agriculture and real estate. One acre = 43,560 square feet = 4,840 square yards = 0.4047 hectares. Historically, an acre was the area a yoke of oxen could plow in one day.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Hectare (ha)</h4>
            <p className="text-sm text-muted-foreground">
              Metric land measurement equal to 10,000 square meters or about 2.47 acres. Common for farms, forests, and large properties outside the US. A hectare is a square 100 meters on each side.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Kilometer (km²)</h4>
            <p className="text-sm text-muted-foreground">
              Used for cities, parks, and large geographic areas. One km² = 1,000,000 m² = 100 hectares = about 0.386 square miles. Manhattan Island is about 59 km².
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Mile (mi²)</h4>
            <p className="text-sm text-muted-foreground">
              Used for large land areas in the US and UK. One square mile = 640 acres = 2.59 km². A square mile is a square with each side measuring one mile (5,280 feet).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Conversion Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Square Feet to Square Meters</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Convert a 2,500 sq ft house to square meters.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1 ft² = 0.092903 m²</div>
              <div>2,500 ft² × 0.092903 = 232.26 m²</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Acres to Hectares</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A farm is 160 acres. How many hectares is that?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1 acre = 0.404686 hectares</div>
              <div>160 acres × 0.404686 = 64.75 hectares</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Square Meters to Square Yards</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Carpet is sold by the square yard. You need to cover 50 m². How many square yards?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1 m² = 1.19599 yd²</div>
              <div>50 m² × 1.19599 = 59.80 yd²</div>
              <div>Order 60 square yards to have a small buffer</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Hectares to Acres</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A vineyard in France is 25 hectares. What's that in acres?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1 hectare = 2.47105 acres</div>
              <div>25 hectares × 2.47105 = 61.78 acres</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Square Miles to Acres</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A ranch covers 5 square miles. How many acres?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1 square mile = 640 acres</div>
              <div>5 square miles × 640 = 3,200 acres</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The word "acre" comes from Old English "æcer," meaning "field." It originally referred to the amount of land a yoke of oxen could plow in one day. The modern acre was standardized in the 13th century under Edward I as 4,840 square yards – exactly one furlong (220 yards) by one chain (22 yards).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How many square feet are in an acre?</h4>
            <p className="text-sm text-muted-foreground">
              One acre equals exactly 43,560 square feet. This comes from the historical definition: an acre is one chain (66 feet) by one furlong (660 feet), and 66 × 660 = 43,560. A square acre would be about 208.7 feet on each side.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a hectare and an acre?</h4>
            <p className="text-sm text-muted-foreground">
              A hectare is larger – one hectare equals about 2.47 acres. Hectares are metric (10,000 square meters, or a 100m × 100m square). Acres are imperial (43,560 square feet). Most countries use hectares; the US, UK, and some Commonwealth nations still use acres.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert square meters to square feet?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply square meters by 10.764 to get square feet. For example, 100 m² × 10.764 = 1,076.4 ft². To go the other way, divide square feet by 10.764 or multiply by 0.092903.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why can't I just square the linear conversion?</h4>
            <p className="text-sm text-muted-foreground">
              You actually can – and should! If 1 foot = 0.3048 meters, then 1 square foot = 0.3048² = 0.092903 square meters. The mistake people make is forgetting to square the conversion factor. Linear and area conversions are related, but area uses the square of the linear ratio.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How big is a square mile in acres?</h4>
            <p className="text-sm text-muted-foreground">
              One square mile contains exactly 640 acres. This comes from the surveying system: a mile is 8 furlongs, so a square mile is 8 × 8 = 64 square furlongs. Each square furlong is 10 acres, giving 640 acres total.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good size for a house lot?</h4>
            <p className="text-sm text-muted-foreground">
              Typical suburban lots range from 0.1 to 0.5 acres (4,356 to 21,780 sq ft). Urban lots might be 0.05 acres (2,178 sq ft) or smaller. Rural properties often start at 1+ acres. For reference, a standard American football field (including end zones) is about 1.32 acres.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate area from dimensions?</h4>
            <p className="text-sm text-muted-foreground">
              For rectangles, multiply length × width. Make sure both are in the same unit first. For example, a room that's 15 feet by 12 feet has an area of 180 square feet. For circles, use π × radius². For triangles, use ½ × base × height.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
