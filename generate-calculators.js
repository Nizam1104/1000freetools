const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('./app/calculators/remaining-to-build.json', 'utf8'));

// Helper function to convert calculator name to slug
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Helper function to get category from calculator name
function getCategory(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('fuel') || lowerName.includes('mileage') || lowerName.includes('vehicle') ||
    lowerName.includes('car') || lowerName.includes('ev ') || lowerName.includes('charging') ||
    lowerName.includes('range') || lowerName.includes('horsepower') || lowerName.includes('torque') ||
    lowerName.includes('engine') || lowerName.includes('gear') || lowerName.includes('acceleration')) {
    return 'automotive';
  }
  if (lowerName.includes('profit') || lowerName.includes('discount') || lowerName.includes('seller') ||
    lowerName.includes('roi') || lowerName.includes('cpc') || lowerName.includes('cpm') ||
    lowerName.includes('ctr') || lowerName.includes('conversion') || lowerName.includes('lifetime value') ||
    lowerName.includes('acquisition') || lowerName.includes('churn') || lowerName.includes('mrr') ||
    lowerName.includes('arr') || lowerName.includes('funnel') || lowerName.includes('nps') ||
    lowerName.includes('pricing') || lowerName.includes('dynamic')) {
    return 'business';
  }
  if (lowerName.includes('paint') || lowerName.includes('wallpaper') || lowerName.includes('curtain') ||
    lowerName.includes('room') || lowerName.includes('water tank') || lowerName.includes('heater') ||
    lowerName.includes('air conditioner') || lowerName.includes('ac tonnage')) {
    return 'home';
  }
  if (lowerName.includes('gpa') || lowerName.includes('cgpa') || lowerName.includes('grade') ||
    lowerName.includes('study') || lowerName.includes('exam') || lowerName.includes('mark') ||
    lowerName.includes('attendance') || lowerName.includes('revision') || lowerName.includes('percentile')) {
    return 'education';
  }
  if (lowerName.includes('seed') || lowerName.includes('fertilizer') || lowerName.includes('irrigation') ||
    lowerName.includes('pesticide') || lowerName.includes('crop') || lowerName.includes('livestock') ||
    lowerName.includes('soil') || lowerName.includes('greenhouse')) {
    return 'agriculture';
  }
  if (lowerName.includes('wind chill') || lowerName.includes('heat index') || lowerName.includes('dew point') ||
    lowerName.includes('humidity') || lowerName.includes('air density') || lowerName.includes('solar')) {
    return 'weather';
  }
  if (lowerName.includes('battery') || lowerName.includes('ups') || lowerName.includes('electricity') ||
    lowerName.includes('appliance') || lowerName.includes('wattage')) {
    return 'utilities';
  }
  if (lowerName.includes('sand') || lowerName.includes('gravel') || lowerName.includes('brick') ||
    lowerName.includes('mortar') || lowerName.includes('wood') || lowerName.includes('drywall') ||
    lowerName.includes('ceiling') || lowerName.includes('window') || lowerName.includes('door') ||
    lowerName.includes('stair') || lowerName.includes('ramp') || lowerName.includes('scaffold') ||
    lowerName.includes('asphalt') || lowerName.includes('foundation') || lowerName.includes('concrete') ||
    lowerName.includes('steel') || lowerName.includes('tile') || lowerName.includes('plaster') ||
    lowerName.includes('floor') || lowerName.includes('roof')) {
    return 'construction';
  }
  if (lowerName.includes('password') || lowerName.includes('entropy') || lowerName.includes('rsa') ||
    lowerName.includes('aes') || lowerName.includes('hash') || lowerName.includes('brute')) {
    return 'security';
  }
  if (lowerName.includes('recipe') || lowerName.includes('calories per serving') || lowerName.includes('baking') ||
    lowerName.includes('yeast') || lowerName.includes('oven') || lowerName.includes('coffee') ||
    lowerName.includes('tea') || lowerName.includes('alcohol') || lowerName.includes('beer') ||
    lowerName.includes('wine') || lowerName.includes('cocktail')) {
    return 'food';
  }
  if (lowerName.includes('k/d') || lowerName.includes('win') || lowerName.includes('xp') ||
    lowerName.includes('loot') || lowerName.includes('gacha') || lowerName.includes('cricket') ||
    lowerName.includes('football') || lowerName.includes('basketball') || lowerName.includes('tennis') ||
    lowerName.includes('swimming') || lowerName.includes('golf') || lowerName.includes('strength') ||
    lowerName.includes('pr estimator')) {
    return 'gaming';
  }
  if (lowerName.includes('note') || lowerName.includes('tempo') || lowerName.includes('audio') ||
    lowerName.includes('chord') || lowerName.includes('scale') || lowerName.includes('tuning')) {
    return 'music';
  }
  if (lowerName.includes('golden') || lowerName.includes('grid') || lowerName.includes('poster') ||
    lowerName.includes('aspect') || lowerName.includes('perspective') || lowerName.includes('typography') ||
    lowerName.includes('line-height')) {
    return 'design';
  }
  if (lowerName.includes('hiking') || lowerName.includes('trail') || lowerName.includes('camping') ||
    lowerName.includes('backpack') || lowerName.includes('boat') || lowerName.includes('map')) {
    return 'outdoor';
  }
  if (lowerName.includes('dog') || lowerName.includes('cat') || lowerName.includes('pet') ||
    lowerName.includes('aquarium') || lowerName.includes('horse') || lowerName.includes('bird')) {
    return 'pets';
  }
  if (lowerName.includes('baby') || lowerName.includes('diaper') || lowerName.includes('toddler') ||
    lowerName.includes('screen-time') || lowerName.includes('feeding')) {
    return 'parenting';
  }
  if (lowerName.includes('richter') || lowerName.includes('decibel') || lowerName.includes('telescope') ||
    lowerName.includes('drone') || lowerName.includes('robot') || lowerName.includes('co₂') ||
    lowerName.includes('carbon') || lowerName.includes('noise') || lowerName.includes('ventilation') ||
    lowerName.includes('indoor')) {
    return 'science';
  }
  if (lowerName.includes('shoe') || lowerName.includes('ring') || lowerName.includes('tire') ||
    lowerName.includes('altitude') || lowerName.includes('mountain') || lowerName.includes('kitchen') ||
    lowerName.includes('clothing') || lowerName.includes('screen brightness') || lowerName.includes('mobile') ||
    lowerName.includes('turning')) {
    return 'utilities';
  }
  if (lowerName.includes('volumetric') || lowerName.includes('dimensional') || lowerName.includes('container') ||
    lowerName.includes('cargo') || lowerName.includes('pallet') || lowerName.includes('office') ||
    lowerName.includes('warehouse') || lowerName.includes('weight distribution')) {
    return 'shipping';
  }
  if (lowerName.includes('camera') || lowerName.includes('shutter') || lowerName.includes('aperture') ||
    lowerName.includes('iso')) {
    return 'photography';
  }
  if (lowerName.includes('sleep') || lowerName.includes('breathing') || lowerName.includes('meditation') ||
    lowerName.includes('dopamine') || lowerName.includes('money') || lowerName.includes('habit') ||
    lowerName.includes('goal') || lowerName.includes('productivity') || lowerName.includes('biorhythm')) {
    return 'lifestyle';
  }

  return 'utilities';
}

// Template for calculator page
function generateCalculatorPage(calc) {
  const slug = toSlug(calc.calculatorName);
  const componentName = calc.calculatorName.replace(/[^a-zA-Z0-9]/g, '');
  const category = getCategory(calc.calculatorName);

  // Generate specific calculator logic based on the calculator type
  const calculatorLogic = getCalculatorLogic(calc.calculatorName, slug);

  return `"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ${componentName}Page() {
${calculatorLogic.state}

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">${calc.h1}</h1>
          <p className="text-muted-foreground">
            ${calc.p}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              ${calculatorLogic.inputs}

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  ${calculatorLogic.results}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
`;
}

// Generate calculator-specific logic
function getCalculatorLogic(name, slug) {
  const lowerName = name.toLowerCase();

  // Automotive Calculators
  if (lowerName.includes('fuel cost')) {
    return {
      state: `  const [distance, setDistance] = useState<string>("");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("");
  const [fuelPrice, setFuelPrice] = useState<string>("");
  const [unit, setUnit] = useState<"mpg" | "l100km">("mpg");
  const [result, setResult] = useState<{ totalFuel: number; totalCost: number } | null>(null);`,
      inputs: `
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (miles)</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelEfficiency">Fuel Efficiency (MPG)</Label>
                <Input
                  id="fuelEfficiency"
                  type="number"
                  placeholder="Enter fuel efficiency"
                  value={fuelEfficiency}
                  onChange={(e) => setFuelEfficiency(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelPrice">Fuel Price ($/gallon)</Label>
                <Input
                  id="fuelPrice"
                  type="number"
                  placeholder="Enter fuel price"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Units</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={unit === "mpg"}
                      onChange={() => setUnit("mpg")}
                    />
                    MPG (US)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={unit === "l100km"}
                      onChange={() => setUnit("l100km")}
                    />
                    L/100km
                  </label>
                </div>
              </div>
`,
      results: `
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                    <p className="text-3xl font-bold text-primary">${result?.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Needed</p>
                    <p className="text-lg font-bold">{result?.totalFuel.toFixed(2)} {unit === "mpg" ? "gallons" : "liters"}</p>
                  </div>
`,
      calculate: `
  const calculate = () => {
    const dist = parseFloat(distance);
    const eff = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(eff) || isNaN(price) || dist <= 0 || eff <= 0 || price <= 0) {
      return;
    }

    let totalFuel: number;
    if (unit === "mpg") {
      totalFuel = dist / eff;
    } else {
      totalFuel = (dist * eff) / 100;
    }
    const totalCost = totalFuel * price;

    setResult({ totalFuel, totalCost });
  };

  const reset = () => {
    setDistance("");
    setFuelEfficiency("");
    setFuelPrice("");
    setResult(null);
  };
`
    };
  }

  if (lowerName.includes('mileage')) {
    return {
      state: `  const [distance, setDistance] = useState<string>("");
  const [fuelUsed, setFuelUsed] = useState<string>("");
  const [unit, setUnit] = useState<"mpg" | "kmpl" | "l100km">("mpg");
  const [result, setResult] = useState<number | null>(null);`,
      inputs: `
              <div className="space-y-2">
                <Label htmlFor="distance">Distance Traveled ({unit === "mpg" ? "miles" : "km"})</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelUsed">Fuel Used ({unit === "mpg" ? "gallons" : unit === "kmpl" ? "liters" : "liters"})</Label>
                <Input
                  id="fuelUsed"
                  type="number"
                  placeholder="Enter fuel used"
                  value={fuelUsed}
                  onChange={(e) => setFuelUsed(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Output Unit</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={unit === "mpg"}
                      onChange={() => setUnit("mpg")}
                    />
                    MPG
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={unit === "kmpl"}
                      onChange={() => setUnit("kmpl")}
                    />
                    km/L
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={unit === "l100km"}
                      onChange={() => setUnit("l100km")}
                    />
                    L/100km
                  </label>
                </div>
              </div>
`,
      results: `
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                    <p className="text-3xl font-bold text-primary">
                      {unit === "l100km" ? (100 / (result || 1)).toFixed(2) : result?.toFixed(2)} {unit === "mpg" ? "MPG" : unit === "kmpl" ? "km/L" : "L/100km"}
                    </p>
                  </div>
`,
      calculate: `
  const calculate = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);

    if (isNaN(dist) || isNaN(fuel) || dist <= 0 || fuel <= 0) {
      return;
    }

    let mileage: number;
    if (unit === "l100km") {
      mileage = dist / fuel;
    } else {
      mileage = dist / fuel;
    }

    setResult(mileage);
  };

  const reset = () => {
    setDistance("");
    setFuelUsed("");
    setResult(null);
  };
`
    };
  }

  // Default template for other calculators
  return {
    state: `  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [result, setResult] = useState<Record<string, number> | null>(null);`,
    inputs: `
              <div className="space-y-2">
                <Label htmlFor="input1">Input 1</Label>
                <Input
                  id="input1"
                  type="number"
                  placeholder="Enter value"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="input2">Input 2</Label>
                <Input
                  id="input2"
                  type="number"
                  placeholder="Enter value"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                />
              </div>
`,
    results: `
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className="text-3xl font-bold text-primary">{JSON.stringify(result)}</p>
                  </div>
`,
    calculate: `
  const calculate = () => {
    const val1 = parseFloat(input1);
    const val2 = parseFloat(input2);

    if (isNaN(val1) || isNaN(val2)) {
      return;
    }

    setResult({ value: val1 + val2 });
  };

  const reset = () => {
    setInput1("");
    setInput2("");
    setResult(null);
  };
`
  };
}

// Create directories and files
let created = 0;
let skipped = 0;

jsonData.forEach((calc) => {
  const slug = toSlug(calc.calculatorName);
  const dirPath = path.join('./app/calculators', slug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Check if directory already exists
  if (fs.existsSync(dirPath)) {
    console.log(`Skipping (exists): ${calc.calculatorName}`);
    skipped++;
    return;
  }

  // Create directory
  fs.mkdirSync(dirPath, { recursive: true });

  // Generate and write file
  const content = generateCalculatorPage(calc);
  fs.writeFileSync(filePath, content);

  console.log(`Created: ${calc.calculatorName} -> ${slug}`);
  created++;
});

console.log(`\n=== Summary ===`);
console.log(`Created: ${created} calculators`);
console.log(`Skipped: ${skipped} calculators`);
console.log(`Total: ${jsonData.length} calculators`);
