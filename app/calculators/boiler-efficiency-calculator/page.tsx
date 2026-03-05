"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BoilerEfficiencyCalculator() {
  const [fuelInput, setFuelInput] = useState<string>("");
  const [heatOutput, setHeatOutput] = useState<string>("");
  const [exhaustTemp, setExhaustTemp] = useState<string>("");
  const [ambientTemp, setAmbientTemp] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Qin = parseFloat(fuelInput);
    const Qout = parseFloat(heatOutput);
    const Tex = parseFloat(exhaustTemp);
    const Tamb = parseFloat(ambientTemp);

    if (Qin > 0 && Qout > 0) {
      const efficiency = (Qout / Qin) * 100;
      
      // Stack loss approximation
      const stackLoss = 0.5 * (Tex - Tamb);
      const estimatedEff = 100 - stackLoss;

      setResults({
        efficiency: Math.round(efficiency * 10) / 10,
        estimatedEff: Math.round(estimatedEff * 10) / 10,
        stackLoss: Math.round(stackLoss * 10) / 10,
      });
    }
  };

  const reset = () => {
    setFuelInput(""); setHeatOutput(""); setExhaustTemp(""); setAmbientTemp(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Boiler Efficiency Calculator – Calculate Boiler Efficiency</CardTitle>
          <CardDescription>
            Calculate boiler efficiency from fuel input and heat output. Estimate stack losses from exhaust temperature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Fuel Input (kW)</Label><Input value={fuelInput} onChange={e => setFuelInput(e.target.value)} /></div>
              <div><Label>Heat Output (kW)</Label><Input value={heatOutput} onChange={e => setHeatOutput(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Exhaust Temp (°C)</Label><Input value={exhaustTemp} onChange={e => setExhaustTemp(e.target.value)} /></div>
              <div><Label>Ambient Temp (°C)</Label><Input value={ambientTemp} onChange={e => setAmbientTemp(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Efficiency</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Direct Efficiency</p>
                    <p className="text-4xl font-bold">{results.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. from Stack</p>
                    <p className="text-3xl font-bold">{results.estimatedEff}%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Stack loss: ~{results.stackLoss}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Boiler Efficiency Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter fuel input and heat output</p>
                  <p>Input the energy content of fuel consumed and the useful heat produced, both in kW.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Add exhaust and ambient temperatures</p>
                  <p>Enter flue gas exhaust temperature and ambient air temperature for stack loss estimation.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate and review efficiency</p>
                  <p>Get direct efficiency from input/output ratio and estimated efficiency from stack analysis.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Boiler Efficiency Standards by Type
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Boiler Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Efficiency</th>
                    <th className="text-left py-3 px-2 font-semibold">Max Efficiency</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Cast Iron (Old)</td>
                    <td className="py-3 px-2">60-70%</td>
                    <td className="py-3 px-2">75%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Steel Fire-Tube</td>
                    <td className="py-3 px-2">75-85%</td>
                    <td className="py-3 px-2">88%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Water-Tube</td>
                    <td className="py-3 px-2">80-88%</td>
                    <td className="py-3 px-2">92%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Condensing</td>
                    <td className="py-3 px-2">90-95%</td>
                    <td className="py-3 px-2">98%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Electric</td>
                    <td className="py-3 px-2">95-99%</td>
                    <td className="py-3 px-2">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Actual efficiency depends on maintenance, load conditions, and fuel type.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Boiler Efficiency
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Boiler Efficiency?</h4>
                <p>
                  Boiler efficiency measures how effectively a boiler converts fuel energy into usable heat.
                  It is expressed as a percentage — the ratio of heat output to fuel input. Higher efficiency
                  means less fuel waste and lower operating costs.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Direct Method (Input-Output)</h4>
                <p>
                  The direct method calculates efficiency as (Heat Output / Fuel Input) × 100. This is simple
                  but requires accurate measurement of both fuel consumption and heat delivered. It does not
                  identify where losses occur.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Indirect Method (Stack Loss)</h4>
                <p>
                  The indirect method estimates efficiency by calculating heat losses. The main loss is stack
                  loss — heat escaping through the flue. Stack loss increases with higher exhaust temperature
                  and excess air. Efficiency equals 100% minus total losses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Improving Boiler Efficiency
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Reduce stack temperature</p>
                  <p>Every 20°C reduction in flue gas temperature improves efficiency by about 1%. Install economizers to recover waste heat.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Control excess air</p>
                  <p>Too much air cools the flame and carries heat up the stack. Optimize air-fuel ratio with oxygen trim controls.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Prevent scale and soot buildup</p>
                  <p>Scale on heat transfer surfaces reduces efficiency by 2-5%. Clean tubes regularly and treat feedwater properly.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Recover blowdown heat</p>
                  <p>Install blowdown heat recovery systems to capture energy from water discharged to control dissolved solids.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is a good boiler efficiency?</h4>
                <p>
                  Modern gas boilers should achieve 85-95% efficiency. Condensing boilers can reach 95-98%.
                  Older non-condensing boilers typically operate at 70-80%. If your boiler is below 75%,
                  replacement may be cost-effective.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is stack temperature important?</h4>
                <p>
                  Stack temperature indicates how much heat is being lost up the chimney. Higher exhaust
                  temperatures mean more wasted energy. However, temperature must stay above the dew point
                  to prevent condensation corrosion in non-condensing boilers.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How often should boiler efficiency be tested?</h4>
                <p>
                  Industrial boilers should be tested quarterly or after major maintenance. Commercial systems
                  should be tested annually. Regular combustion analysis helps maintain optimal efficiency
                  and identifies problems before they cause significant energy waste.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What causes low boiler efficiency?</h4>
                <p>
                  Common causes include scale buildup on heat transfer surfaces, soot accumulation, excess
                  air from poor combustion control, high stack temperature, steam leaks, and inadequate
                  insulation. Poor maintenance is the leading cause of efficiency degradation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is a condensing boiler worth it?</h4>
                <p>
                  Condensing boilers recover latent heat from water vapor in flue gases, achieving 10-15%
                  better efficiency than conventional boilers. They are most cost-effective in cold climates
                  with long heating seasons and low return water temperatures.
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
                href="/calculators/fuel-cost-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fuel Cost Calculator</span>
                <p className="text-muted-foreground">Compare heating costs across different fuel types and efficiencies</p>
              </a>
              <a
                href="/calculators/energy-consumption-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Energy Consumption Calculator</span>
                <p className="text-muted-foreground">Estimate energy usage and costs for appliances and equipment</p>
              </a>
              <a
                href="/calculators/heat-load-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Heat Load Calculator</span>
                <p className="text-muted-foreground">Calculate heating requirements for buildings and rooms</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
