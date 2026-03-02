#!/usr/bin/env python3
import json
import os
import re

# Read the JSON file
with open('./app/calculators/remaining-to-build.json', 'r') as f:
    calculators = json.load(f)

def to_slug(name):
    """Convert calculator name to slug"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = re.sub(r'^-|-$', '', slug)
    return slug

def to_component_name(name):
    """Convert calculator name to component name"""
    return re.sub(r'[^a-zA-Z0-9]', '', name)

def get_category(name):
    """Get category from calculator name"""
    lower_name = name.lower()
    
    if any(x in lower_name for x in ['fuel', 'mileage', 'vehicle', 'car loan', 'ev ', 'charging', 'range', 'horsepower', 'torque', 'engine', 'gear shifting', 'acceleration']):
        return 'automotive'
    if any(x in lower_name for x in ['profit', 'discount', 'seller', 'roi', 'cpc', 'cpm', 'ctr', 'conversion', 'lifetime value', 'acquisition', 'churn', 'mrr', 'arr', 'funnel', 'nps', 'pricing', 'dynamic']):
        return 'business'
    if any(x in lower_name for x in ['paint', 'wallpaper', 'curtain', 'room heater', 'water tank', 'air conditioner', 'ac tonnage']):
        return 'home'
    if any(x in lower_name for x in ['gpa', 'cgpa', 'grade', 'study', 'exam', 'mark', 'attendance', 'revision', 'percentile']):
        return 'education'
    if any(x in lower_name for x in ['seed', 'fertilizer', 'irrigation', 'pesticide', 'crop', 'livestock', 'soil', 'greenhouse']):
        return 'agriculture'
    if any(x in lower_name for x in ['wind chill', 'heat index', 'dew point', 'humidity', 'air density', 'solar']):
        return 'weather'
    if any(x in lower_name for x in ['battery', 'ups', 'electricity', 'appliance', 'wattage']):
        return 'utilities'
    if any(x in lower_name for x in ['sand', 'gravel', 'brick', 'mortar', 'wood', 'drywall', 'ceiling', 'window', 'door', 'stair', 'ramp', 'scaffold', 'asphalt']):
        return 'construction'
    if any(x in lower_name for x in ['password', 'entropy', 'rsa', 'aes', 'hash', 'brute']):
        return 'security'
    if any(x in lower_name for x in ['recipe', 'calories per serving', 'baking', 'yeast', 'oven', 'coffee', 'tea', 'alcohol', 'beer', 'wine', 'cocktail']):
        return 'food'
    if any(x in lower_name for x in ['k/d', 'win', 'xp', 'loot', 'gacha', 'cricket', 'football', 'basketball', 'tennis', 'swimming', 'golf', 'strength', 'pr estimator']):
        return 'gaming'
    if any(x in lower_name for x in ['note', 'tempo', 'audio', 'chord', 'scale', 'tuning']):
        return 'music'
    if any(x in lower_name for x in ['golden', 'grid', 'poster', 'aspect', 'perspective', 'typography', 'line-height']):
        return 'design'
    if any(x in lower_name for x in ['hiking', 'trail', 'camping', 'backpack', 'boat', 'map']):
        return 'outdoor'
    if any(x in lower_name for x in ['dog', 'cat', 'pet', 'aquarium', 'horse', 'bird']):
        return 'pets'
    if any(x in lower_name for x in ['baby', 'diaper', 'toddler', 'screen-time', 'feeding']):
        return 'parenting'
    if any(x in lower_name for x in ['richter', 'decibel', 'telescope', 'drone', 'robot', 'co₂', 'carbon', 'noise', 'ventilation', 'indoor']):
        return 'science'
    if any(x in lower_name for x in ['shoe', 'ring', 'tire', 'altitude', 'mountain', 'kitchen', 'clothing', 'screen brightness', 'mobile', 'turning']):
        return 'utilities'
    if any(x in lower_name for x in ['volumetric', 'dimensional', 'container', 'cargo', 'pallet', 'office', 'warehouse', 'weight distribution']):
        return 'shipping'
    if any(x in lower_name for x in ['camera', 'shutter', 'aperture', 'iso']):
        return 'photography'
    if any(x in lower_name for x in ['sleep', 'breathing', 'meditation', 'dopamine', 'money', 'habit', 'goal', 'productivity', 'biorhythm']):
        return 'lifestyle'
    
    return 'utilities'

def generate_calculator_logic(name):
    """Generate calculator-specific logic based on name"""
    lower_name = name.lower()
    
    # Automotive Calculators
    if 'fuel cost' in lower_name:
        return {
            'state': '''  const [distance, setDistance] = useState<string>("");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("");
  const [fuelPrice, setFuelPrice] = useState<string>("");
  const [unit, setUnit] = useState<"mpg" | "l100km">("mpg");
  const [result, setResult] = useState<{ totalFuel: number; totalCost: number } | null>(null);''',
            'inputs': '''              <div className="space-y-2">
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
              </div>''',
            'results': '''                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                    <p className="text-3xl font-bold text-primary">${result?.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Needed</p>
                    <p className="text-lg font-bold">{result?.totalFuel.toFixed(2)} gallons</p>
                  </div>''',
            'calculate': '''  const calculate = () => {
    const dist = parseFloat(distance);
    const eff = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(eff) || isNaN(price) || dist <= 0 || eff <= 0 || price <= 0) {
      return;
    }

    const totalFuel = dist / eff;
    const totalCost = totalFuel * price;

    setResult({ totalFuel, totalCost });
  };

  const reset = () => {
    setDistance("");
    setFuelEfficiency("");
    setFuelPrice("");
    setResult(null);
  };'''
        }
    
    elif 'mileage' in lower_name:
        return {
            'state': '''  const [distance, setDistance] = useState<string>("");
  const [fuelUsed, setFuelUsed] = useState<string>("");
  const [unit, setUnit] = useState<"mpg" | "kmpl" | "l100km">("mpg");
  const [result, setResult] = useState<number | null>(null);''',
            'inputs': '''              <div className="space-y-2">
                <Label htmlFor="distance">Distance Traveled</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelUsed">Fuel Used</Label>
                <Input
                  id="fuelUsed"
                  type="number"
                  placeholder="Enter fuel used"
                  value={fuelUsed}
                  onChange={(e) => setFuelUsed(e.target.value)}
                />
              </div>''',
            'results': '''                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                    <p className="text-3xl font-bold text-primary">{result?.toFixed(2)} {unit === "mpg" ? "MPG" : unit === "kmpl" ? "km/L" : "L/100km"}</p>
                  </div>''',
            'calculate': '''  const calculate = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);

    if (isNaN(dist) || isNaN(fuel) || dist <= 0 || fuel <= 0) {
      return;
    }

    const mileage = dist / fuel;
    setResult(mileage);
  };

  const reset = () => {
    setDistance("");
    setFuelUsed("");
    setResult(null);
  };'''
        }
    
    elif 'trip cost' in lower_name:
        return {
            'state': '''  const [distance, setDistance] = useState<string>("");
  const [fuelPrice, setFuelPrice] = useState<string>("");
  const [mpg, setMpg] = useState<string>("");
  const [tolls, setTolls] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [accommodation, setAccommodation] = useState<string>("");
  const [result, setResult] = useState<{ fuelCost: number; totalCost: number } | null>(null);''',
            'inputs': '''              <div className="space-y-2">
                <Label htmlFor="distance">Distance (miles)</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Enter total distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
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
                <Label htmlFor="mpg">Vehicle MPG</Label>
                <Input
                  id="mpg"
                  type="number"
                  placeholder="Enter vehicle MPG"
                  value={mpg}
                  onChange={(e) => setMpg(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tolls">Toll Costs ($)</Label>
                <Input
                  id="tolls"
                  type="number"
                  placeholder="Enter toll costs"
                  value={tolls}
                  onChange={(e) => setTolls(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="food">Food Budget ($)</Label>
                <Input
                  id="food"
                  type="number"
                  placeholder="Enter food budget"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation ($)</Label>
                <Input
                  id="accommodation"
                  type="number"
                  placeholder="Enter accommodation cost"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
              </div>''',
            'results': '''                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Trip Cost</p>
                    <p className="text-3xl font-bold text-primary">${result?.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Fuel</p>
                      <p className="text-lg font-bold">${result?.fuelCost.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Other</p>
                      <p className="text-lg font-bold">${((parseFloat(tolls || '0') + parseFloat(food || '0') + parseFloat(accommodation || '0'))).toFixed(2)}</p>
                    </div>
                  </div>''',
            'calculate': '''  const calculate = () => {
    const dist = parseFloat(distance);
    const price = parseFloat(fuelPrice);
    const mpgVal = parseFloat(mpg);
    const tollsVal = parseFloat(tolls) || 0;
    const foodVal = parseFloat(food) || 0;
    const accomVal = parseFloat(accommodation) || 0;

    if (isNaN(dist) || isNaN(price) || isNaN(mpgVal) || dist <= 0 || price <= 0 || mpgVal <= 0) {
      return;
    }

    const fuelCost = (dist / mpgVal) * price;
    const totalCost = fuelCost + tollsVal + foodVal + accomVal;

    setResult({ fuelCost, totalCost });
  };

  const reset = () => {
    setDistance("");
    setFuelPrice("");
    setMpg("");
    setTolls("");
    setFood("");
    setAccommodation("");
    setResult(null);
  };'''
        }
    
    elif 'depreciation' in lower_name:
        return {
            'state': '''  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [depreciationRate, setDepreciationRate] = useState<string>("");
  const [result, setResult] = useState<{ currentValue: number; totalDepreciation: number } | null>(null);''',
            'inputs': '''              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Original Purchase Price ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="Enter purchase price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Vehicle Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Annual Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="Enter annual mileage"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depreciationRate">Annual Depreciation Rate (%)</Label>
                <Input
                  id="depreciationRate"
                  type="number"
                  placeholder="Enter depreciation rate"
                  value={depreciationRate}
                  onChange={(e) => setDepreciationRate(e.target.value)}
                />
              </div>''',
            'results': '''                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-3xl font-bold text-primary">${result?.currentValue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Depreciation</p>
                    <p className="text-lg font-bold">${result?.totalDepreciation.toFixed(2)}</p>
                  </div>''',
            'calculate': '''  const calculate = () => {
    const price = parseFloat(purchasePrice);
    const ageVal = parseFloat(age);
    const depRate = parseFloat(depreciationRate) / 100;

    if (isNaN(price) || isNaN(ageVal) || isNaN(depRate) || price <= 0 || ageVal < 0) {
      return;
    }

    const currentValue = price * Math.pow(1 - depRate, ageVal);
    const totalDepreciation = price - currentValue;

    setResult({ currentValue, totalDepreciation });
  };

  const reset = () => {
    setPurchasePrice("");
    setAge("");
    setMileage("");
    setDepreciationRate("");
    setResult(null);
  };'''
        }
    
    # Default template for other calculators
    return {
        'state': '''  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);''',
        'inputs': '''              <div className="space-y-2">
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
              </div>''',
        'results': '''                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className="text-3xl font-bold text-primary">{result}</p>
                  </div>''',
        'calculate': '''  const calculate = () => {
    const val1 = parseFloat(input1);
    const val2 = parseFloat(input2);

    if (isNaN(val1) || isNaN(val2)) {
      return;
    }

    setResult(val1 + val2);
  };

  const reset = () => {
    setInput1("");
    setInput2("");
    setResult(null);
  };'''
    }

def generate_page(calc):
    """Generate a calculator page"""
    slug = to_slug(calc['calculatorName'])
    component_name = to_component_name(calc['calculatorName'])
    category = get_category(calc['calculatorName'])
    logic = generate_calculator_logic(calc['calculatorName'])
    
    content = f'''"use client";

import {useState} from "react";
import {{ Card, CardContent }} from "@/components/ui/card";
import {{ Button }} from "@/components/ui/button";
import {{ Input }} from "@/components/ui/input";
import {{ Label }} from "@/components/ui/label";

export default function {component_name}Page() {{
{logic['state']}

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{calc['h1']}</h1>
          <p className="text-muted-foreground">
            {calc['p']}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
{logic['inputs']}

              <div className="flex gap-2 pt-4">
                <Button onClick={{calculate}} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={{reset}}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {{result ? (
                <div className="space-y-4">
{logic['results']}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}}
'''
    # Fix the calculate and reset references
    content = content.replace('{calculate}', 'calculate').replace('{reset}', 'reset')
    
    return content

# Create directories and files
created = 0
skipped = 0

for calc in calculators:
    slug = to_slug(calc['calculatorName'])
    dir_path = os.path.join('./app/calculators', slug)
    file_path = os.path.join(dir_path, 'page.tsx')
    
    # Check if directory already exists
    if os.path.exists(dir_path):
        print(f"Skipping (exists): {calc['calculatorName']}")
        skipped += 1
        continue
    
    # Create directory
    os.makedirs(dir_path, exist_ok=True)
    
    # Generate and write file
    content = generate_page(calc)
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"Created: {calc['calculatorName']} -> {slug}")
    created += 1

print(f"\n=== Summary ===")
print(f"Created: {created} calculators")
print(f"Skipped: {skipped} calculators")
print(f"Total: {len(calculators)} calculators")
