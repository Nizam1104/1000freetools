"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CO2Result {
  activityType: string;
  activityValue: number;
  emissions: number;
  emissionsFormatted: string;
  equivalentTrees: number;
  equivalentMiles: number;
  recommendations: string[];
}

export default function COEmissionsCalculatorPage() {
  const [activityType, setActivityType] = useState<string>("car");
  const [activityValue, setActivityValue] = useState<string>("");
  const [result, setResult] = useState<CO2Result | null>(null);

  const calculate = () => {
    const valueNum = parseFloat(activityValue) || 0;
    if (valueNum === 0) return;

    // Emission factors (kg CO2 per unit)
    const emissionFactors: Record<string, { factor: number; unit: string; name: string }> = {
      car: { factor: 0.192, unit: "km", name: "Car (average)" },
      carMiles: { factor: 0.309, unit: "miles", name: "Car (average)" },
      flight: { factor: 0.255, unit: "km", name: "Flight (short-haul)" },
      electricity: { factor: 0.4, unit: "kWh", name: "Electricity (grid average)" },
      naturalGas: { factor: 2.0, unit: "m³", name: "Natural Gas" },
      beef: { factor: 27, unit: "kg", name: "Beef production" },
      tree: { factor: -22, unit: "trees", name: "Tree (annual absorption)" },
    };

    const factorData = emissionFactors[activityType] || emissionFactors.car;
    const emissions = valueNum * factorData.factor;

    // Equivalent trees needed to offset (1 tree absorbs ~22 kg CO2/year)
    const equivalentTrees = emissions / 22;

    // Equivalent miles driven (0.192 kg CO2/km)
    const equivalentMiles = emissions / 0.309;

    // Format emissions
    let emissionsFormatted = "";
    if (emissions < 1) {
      emissionsFormatted = `${(emissions * 1000).toFixed(0)} g CO₂`;
    } else if (emissions < 1000) {
      emissionsFormatted = `${emissions.toFixed(1)} kg CO₂`;
    } else {
      emissionsFormatted = `${(emissions / 1000).toFixed(2)} tonnes CO₂`;
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Activity: ${valueNum} ${factorData.unit}`);
    recommendations.push(`🏭 Emissions: ${emissionsFormatted}`);

    if (activityType === "car" || activityType === "carMiles") {
      recommendations.push("🚗 Consider carpooling or public transport");
      recommendations.push("⚡ Electric vehicles produce 0 direct emissions");
    } else if (activityType === "flight") {
      recommendations.push("✈️ Consider train for short distances");
      recommendations.push("🌱 Purchase carbon offsets for flights");
    } else if (activityType === "electricity") {
      recommendations.push("💡 Switch to LED bulbs to reduce consumption");
      recommendations.push("☀️ Consider solar panels for clean energy");
    } else if (activityType === "beef") {
      recommendations.push("🥗 Consider plant-based alternatives");
      recommendations.push("🐄 Beef has highest carbon footprint per kg");
    }

    recommendations.push(`🌳 Trees to offset: ${equivalentTrees.toFixed(1)} trees/year`);
    recommendations.push(`🚗 Equivalent to driving: ${equivalentMiles.toFixed(0)} miles`);

    setResult({
      activityType: factorData.name,
      activityValue: valueNum,
      emissions: parseFloat(emissions.toFixed(2)),
      emissionsFormatted,
      equivalentTrees: parseFloat(equivalentTrees.toFixed(1)),
      equivalentMiles: parseFloat(equivalentMiles.toFixed(0)),
      recommendations,
    });
  };

  const reset = () => {
    setActivityValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity
          </h1>
          <p className="text-muted-foreground">
            Quantify your carbon impact with our CO₂ Emissions Calculator. Enter data for
            transportation, electricity use, or other activities to calculate total CO₂
            emissions — supporting sustainability reporting and carbon reduction planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger id="activity-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car Travel (km)</SelectItem>
                    <SelectItem value="carMiles">Car Travel (miles)</SelectItem>
                    <SelectItem value="flight">Flight (km)</SelectItem>
                    <SelectItem value="electricity">Electricity (kWh)</SelectItem>
                    <SelectItem value="naturalGas">Natural Gas (m³)</SelectItem>
                    <SelectItem value="beef">Beef Consumption (kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-value">Activity Value</Label>
                <Input
                  id="activity-value"
                  type="number"
                  value={activityValue}
                  onChange={(e) => setActivityValue(e.target.value)}
                  placeholder="e.g., 100"
                />
              </div>

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
              <h3 className="text-lg font-semibold mb-4">Emissions Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                    <p className="text-4xl font-bold text-primary">{result.emissionsFormatted}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Trees to Offset</p>
                      <p className="text-lg font-bold">{result.equivalentTrees}</p>
                      <p className="text-xs text-muted-foreground">per year</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Equivalent Driving</p>
                      <p className="text-lg font-bold">{result.equivalentMiles}</p>
                      <p className="text-xs text-muted-foreground">miles</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter activity data and click Calculate to see emissions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Carbon Footprint Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Transportation:</strong> 29% of global emissions
                  </li>
                  <li>
                    <strong>Electricity:</strong> 25% of global emissions
                  </li>
                  <li>
                    <strong>Food:</strong> Beef has 10x footprint of chicken
                  </li>
                  <li>
                    <strong>Trees:</strong> One tree absorbs ~22 kg CO₂/year
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Emission factors are averages and vary by
                  region, vehicle efficiency, and energy source. Use local factors
                  for precise calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This CO2 Emissions Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your activity type</p>
                    <p>Choose from transportation (car, flight), home energy (electricity, natural gas), or food (beef). Each activity has different emission factors.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the activity value</p>
                    <p>Input the distance traveled, energy consumed, or food consumed in the appropriate units. The calculator uses standard emission factors for each activity.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see emissions</p>
                    <p>Results show CO2 emissions in grams, kilograms, or tonnes, plus equivalent trees needed to offset and miles driven for comparison.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                CO2 Emission Factors Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Activity</th>
                      <th className="text-left py-3 px-2 font-semibold">Unit</th>
                      <th className="text-left py-3 px-2 font-semibold">CO2 per Unit</th>
                      <th className="text-left py-3 px-2 font-semibold">Source</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Average car</td>
                      <td className="py-3 px-2">per km</td>
                      <td className="py-3 px-2">0.192 kg CO2</td>
                      <td className="py-3 px-2">EPA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Average car</td>
                      <td className="py-3 px-2">per mile</td>
                      <td className="py-3 px-2">0.309 kg CO2</td>
                      <td className="py-3 px-2">EPA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Short-haul flight</td>
                      <td className="py-3 px-2">per km</td>
                      <td className="py-3 px-2">0.255 kg CO2</td>
                      <td className="py-3 px-2">ICAO</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Grid electricity</td>
                      <td className="py-3 px-2">per kWh</td>
                      <td className="py-3 px-2">0.4 kg CO2</td>
                      <td className="py-3 px-2">IEA average</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Natural gas</td>
                      <td className="py-3 px-2">per m3</td>
                      <td className="py-3 px-2">2.0 kg CO2</td>
                      <td className="py-3 px-2">EPA</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Beef production</td>
                      <td className="py-3 px-2">per kg</td>
                      <td className="py-3 px-2">27 kg CO2e</td>
                      <td className="py-3 px-2">Our World in Data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Emission factors are averages and vary by region, vehicle efficiency, and energy source. Electricity emissions depend heavily on local grid mix.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Carbon Emissions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is CO2 Equivalent</h4>
                  <p>
                    CO2 equivalent (CO2e) expresses the warming impact of different greenhouse gases in terms of carbon dioxide. Methane is about 28 times more potent than CO2, so 1 kg of methane equals 28 kg CO2e. This calculator uses CO2e for activities like beef production that involve multiple gases.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Where Emissions Come From</h4>
                  <p>
                    Transportation accounts for about 29 percent of US greenhouse gas emissions, with cars and trucks being the largest contributors. Electricity generation adds 25 percent. Food production, especially beef and lamb, contributes significantly through land use changes, animal digestion, and processing.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Tree Offset Means</h4>
                  <p>
                    A mature tree absorbs approximately 22 kg of CO2 per year through photosynthesis. The &quot;trees to offset&quot; figure shows how many trees would need to grow for one year to absorb the emissions from your activity. This helps put abstract numbers in concrete terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Ways to Reduce Your Carbon Footprint
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose lower-carbon transportation</p>
                    <p>Public transit produces about 75 percent less CO2 per passenger-km than driving alone. Electric vehicles eliminate tailpipe emissions. For flights, consider trains for trips under 500 km where available.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Switch to clean energy</p>
                    <p>Install solar panels or choose a green energy supplier. LED bulbs use 75 percent less energy than incandescent. Smart thermostats can reduce heating and cooling by 10-15 percent.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adjust your diet</p>
                    <p>Beef has about 10 times the carbon footprint of chicken and 20 times that of beans. Reducing beef consumption even one day per week makes a measurable difference over a year.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider carbon offsets</p>
                    <p>Verified offset programs fund renewable energy, reforestation, or methane capture. Offsets should complement, not replace, direct emissions reductions. Look for Gold Standard or Verra certification.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How accurate are these emission estimates?",
    answer: "These are reasonable averages based on published emission factors. Actual emissions vary by vehicle efficiency, driving conditions, electricity grid mix, and production methods. For precise carbon accounting, use location-specific factors and actual consumption data.",
  },
{
    question: "Why does beef have such high emissions?",
    answer: "Cattle produce methane during digestion, which is 28 times more potent than CO2. Beef production also requires large amounts of land, water, and feed. Land use changes like deforestation for grazing add to the carbon footprint.",
  },
{
    question: "Do electric vehicles really produce zero emissions?",
    answer: "EVs have zero tailpipe emissions, but electricity generation may produce CO2 depending on the grid mix. In regions with clean electricity, EVs have much lower lifecycle emissions. As grids decarbonize, EV emissions decrease automatically.",
  },
{
    question: "How many trees do I need to plant to offset my emissions?",
    answer: "Divide your annual emissions in kg by 22 to find trees needed. An average American produces about 15,000 kg CO2 per year, requiring roughly 680 trees. However, trees take years to reach full absorption capacity, and existing forests are already counted in global carbon cycles.",
  },
{
    question: "What is a good carbon footprint target?",
    answer: "To limit warming to 1.5 C, global average emissions must reach about 2,000 kg CO2 per person per year by 2050. Current averages range from 15,000 kg (US) to under 1,000 kg (many African nations). Reducing personal emissions by 50-80 percent is often recommended for developed countries.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
