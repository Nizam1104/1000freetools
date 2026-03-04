"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HVACBtuCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good">("average");
  const [climate, setClimate] = useState<"hot" | "moderate" | "cool">("moderate");
  const [sunExposure, setSunExposure] = useState<"high" | "average" | "low">("average");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);

    if (L > 0 && W > 0 && H > 0) {
      const area = L * W;
      const volume = area * H;
      
      // Base BTU: 25 BTU per sq ft (≈270 per m²)
      let btu = area * 270;

      // Insulation factor
      if (insulation === "poor") btu *= 1.2;
      if (insulation === "good") btu *= 0.85;

      // Climate factor
      if (climate === "hot") btu *= 1.15;
      if (climate === "cool") btu *= 0.85;

      // Sun exposure
      if (sunExposure === "high") btu *= 1.1;
      if (sunExposure === "low") btu *= 0.9;

      // Height adjustment (standard is 2.5m)
      if (H > 2.5) btu *= (H / 2.5);

      const tons = btu / 12000;
      const kW = btu * 0.000293071;

      setResults({ btu: Math.round(btu), tons: Math.round(tons * 10) / 10, kW: Math.round(kW * 100) / 100 });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setHeight(""); setInsulation("average");
    setClimate("moderate"); setSunExposure("average"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>HVAC BTU Calculator – What Size Air Conditioner Do You Need?</CardTitle>
          <CardDescription>
            Choose the right HVAC unit with our BTU calculator. Enter room size, insulation, and climate to determine the required heating or cooling capacity in BTUs per hour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Insulation</Label>
                <Select value={insulation} onValueChange={(v) => setInsulation(v as typeof insulation)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Climate</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as typeof climate)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="cool">Cool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sun Exposure</Label>
                <Select value={sunExposure} onValueChange={(v) => setSunExposure(v as typeof sunExposure)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BTU</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                    <p className="text-3xl font-bold">{results.btu.toLocaleString()} BTU/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Tons</p>
                    <p className="text-3xl font-bold">{results.tons} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In kW</p>
                    <p className="text-2xl font-bold">{results.kW} kW</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This HVAC BTU Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter room dimensions</p>
                  <p>Measure the length, width, and height of your room in meters. For irregular rooms, calculate the total floor area.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select insulation, climate, and sun exposure</p>
                  <p>Choose options that match your space. Poor insulation and hot climates need more cooling capacity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your recommended BTU rating</p>
                  <p>Results show BTU/h, tons, and kW. Use this to size window units, mini-splits, or central air systems.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              BTU Requirements by Room Size
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Room Size (m²)</th>
                    <th className="text-left py-3 px-2 font-semibold">Room Size (ft²)</th>
                    <th className="text-left py-3 px-2 font-semibold">Base BTU/h</th>
                    <th className="text-left py-3 px-2 font-semibold">Tons</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">10-15 m²</td>
                    <td className="py-3 px-2">100-150 ft²</td>
                    <td className="py-3 px-2">5,000-6,000</td>
                    <td className="py-3 px-2">0.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">15-25 m²</td>
                    <td className="py-3 px-2">150-250 ft²</td>
                    <td className="py-3 px-2">6,000-8,000</td>
                    <td className="py-3 px-2">0.5-0.75</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">25-35 m²</td>
                    <td className="py-3 px-2">250-350 ft²</td>
                    <td className="py-3 px-2">8,000-10,000</td>
                    <td className="py-3 px-2">0.75-1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">35-50 m²</td>
                    <td className="py-3 px-2">350-500 ft²</td>
                    <td className="py-3 px-2">10,000-14,000</td>
                    <td className="py-3 px-2">1-1.25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">50-70 m²</td>
                    <td className="py-3 px-2">500-700 ft²</td>
                    <td className="py-3 px-2">14,000-18,000</td>
                    <td className="py-3 px-2">1.25-1.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">70-100 m²</td>
                    <td className="py-3 px-2">700-1,000 ft²</td>
                    <td className="py-3 px-2">18,000-24,000</td>
                    <td className="py-3 px-2">1.5-2</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">100-150 m²</td>
                    <td className="py-3 px-2">1,000-1,500 ft²</td>
                    <td className="py-3 px-2">24,000-36,000</td>
                    <td className="py-3 px-2">2-3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Base values assume average insulation, moderate climate, and normal sun exposure. Adjust using the calculator for your specific conditions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding BTU and HVAC Sizing
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is a BTU?</h4>
                <p>
                  BTU stands for British Thermal Unit. One BTU is the energy needed to heat one pound of water by one degree Fahrenheit. For air conditioners, BTU/h measures cooling capacity — how much heat the unit can remove per hour. A typical window unit ranges from 5,000 to 25,000 BTU/h.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What Does "Ton" Mean in HVAC?</h4>
                <p>
                  One ton of cooling equals 12,000 BTU/h. The term comes from the heat absorbed when one ton of ice melts over 24 hours. Residential central air systems range from 1.5 to 5 tons. Window units are usually under 1 ton.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Proper Sizing Matters</h4>
                <p>
                  An oversized unit cools quickly but shuts off before removing humidity, leaving the room cold and clammy. It also wears out faster from frequent cycling. An undersized unit runs constantly, struggles to reach temperature, and drives up energy bills.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Factors That Affect BTU Needs</h4>
                <p>
                  Insulation quality changes heat gain significantly. Poor insulation can add 20% to your BTU needs. Hot climates require 15% more capacity. Rooms with large south-facing windows or high sun exposure need 10% more. High ceilings increase the volume to cool.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Choosing the Right AC Unit
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check energy efficiency ratings</p>
                  <p>Look for high SEER (Seasonal Energy Efficiency Ratio) or EER ratings. A SEER of 16+ is considered efficient for central air.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider variable-speed compressors</p>
                  <p>Inverter or variable-speed units adjust output to match demand. They maintain steady temperatures and use less energy than single-speed units.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Improve insulation first</p>
                  <p>Seal air leaks, add attic insulation, and upgrade windows before sizing a new system. Better insulation means you can install a smaller, cheaper unit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Get a professional load calculation</p>
                  <p>For central air systems, have an HVAC contractor perform a Manual J calculation. It accounts for all heat gain factors and ensures proper sizing.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How many BTUs do I need per square foot?</h4>
                <p>
                  As a rough rule, you need about 20 BTU per square foot (or about 270 BTU per square meter). A 20 m² room needs roughly 5,400 BTU/h. This varies based on ceiling height, insulation, climate, and sun exposure — use this calculator for a more accurate estimate.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is it better to oversize or undersize an AC?</h4>
                <p>
                  Neither is ideal, but undersizing is usually less problematic. An oversized unit short-cycles, wasting energy and failing to dehumidify. An undersized unit runs longer but will eventually cool the space. Slightly undersized is better than oversized.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What size AC do I need for a 20 square meter room?</h4>
                <p>
                  A 20 m² room typically needs 6,000-7,000 BTU/h (about 0.5-0.6 tons) with average conditions. Increase to 8,000 BTU if you have poor insulation, a hot climate, or large sunny windows.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does ceiling height affect BTU requirements?</h4>
                <p>
                  Yes. Standard calculations assume 2.4-2.7m (8-9 ft) ceilings. Higher ceilings mean more air volume to cool. For ceilings over 3m, increase BTU capacity proportionally to the volume difference.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert BTU to tons or kW?</h4>
                <p>
                  To convert BTU/h to tons, divide by 12,000. To convert BTU/h to kW, multiply by 0.000293. For example, 24,000 BTU/h equals 2 tons or about 7 kW.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/hvac-airflow-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">HVAC Airflow Calculator</span>
                <p className="text-muted-foreground">Calculate required CFM for room ventilation</p>
              </a>
              <a
                href="/calculators/humidity-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Humidity Calculator</span>
                <p className="text-muted-foreground">Calculate relative and absolute humidity levels</p>
              </a>
              <a
                href="/calculators/ideal-bedtime-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ideal Bedtime Calculator</span>
                <p className="text-muted-foreground">Find the best sleep time based on wake schedule</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
