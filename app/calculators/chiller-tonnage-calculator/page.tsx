"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChillerTonnageCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [deltaT, setDeltaT] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const GPM = parseFloat(flowRate);
    const ΔT = parseFloat(deltaT);

    if (GPM > 0 && ΔT > 0) {
      // Tonnage = (GPM × ΔT × 500) / 12000
      const tons = (GPM * ΔT * 500) / 12000;
      const kW = tons * 3.517;
      const btuh = tons * 12000;

      setResults({ tons: Math.round(tons * 10) / 10, kW: Math.round(kW * 10) / 10, btuh });
    }
  };

  const reset = () => {
    setFlowRate(""); setDeltaT(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (GPM)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>ΔT (°F)</Label><Input value={deltaT} onChange={e => setDeltaT(e.target.value)} placeholder="Typical: 10°F" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Tonnage</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                    <p className="text-3xl font-bold">{results.tons} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In kW</p>
                    <p className="text-2xl font-bold">{results.kW}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">BTU/h</p>
                    <p className="text-xl font-bold">{results.btuh.toLocaleString()}</p>
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
              How to Use This Chiller Tonnage Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the water flow rate in GPM</p>
                  <p>GPM stands for gallons per minute. This is the rate at which water flows through your chiller system. Check your pump specifications or flow meter.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the temperature difference (Delta T)</p>
                  <p>Delta T is the difference between supply and return water temperatures. For most HVAC systems, this is around 10 degrees Fahrenheit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate Tonnage</p>
                  <p>The calculator uses the formula: Tonnage = (GPM x Delta T x 500) / 12,000. You&apos;ll see cooling capacity in tons, kilowatts, and BTU/hour.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Chiller Tonnage Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Flow Rate (GPM)</th>
                    <th className="text-left py-3 px-2 font-semibold">Delta T (10 F)</th>
                    <th className="text-left py-3 px-2 font-semibold">Tonnage</th>
                    <th className="text-left py-3 px-2 font-semibold">kW</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">24 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">10 tons</td>
                    <td className="py-3 px-2">35.2 kW</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">48 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">20 tons</td>
                    <td className="py-3 px-2">70.3 kW</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">72 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">30 tons</td>
                    <td className="py-3 px-2">105.5 kW</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">96 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">40 tons</td>
                    <td className="py-3 px-2">140.7 kW</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">120 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">50 tons</td>
                    <td className="py-3 px-2">175.9 kW</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">240 GPM</td>
                    <td className="py-3 px-2">10 F</td>
                    <td className="py-3 px-2">100 tons</td>
                    <td className="py-3 px-2">351.7 kW</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: This table assumes a standard 10 F temperature difference. Actual tonnage varies with your specific Delta T.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Chiller Tonnage Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is a Ton of Cooling</h4>
                <p>
                  One ton of cooling equals 12,000 BTU per hour. This comes from the amount of heat needed to melt one ton of ice in 24 hours. In metric terms, one ton equals approximately 3.517 kilowatts. Commercial chillers range from 10 tons for small buildings to over 1,000 tons for large facilities.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Chiller Tonnage Formula</h4>
                <p>
                  The formula Tonnage = (GPM x Delta T x 500) / 12,000 combines flow rate and temperature change. The 500 factor comes from water&apos;s specific heat (1 BTU/lb-F) multiplied by water weight (8.33 lb/gallon) and minutes per hour (60). Dividing by 12,000 converts BTU/hour to tons.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Delta T Matters</h4>
                <p>
                  Delta T represents how much heat the water absorbs as it circulates through your system. A typical HVAC design uses 10-12 F Delta T. Lower Delta T means water flows faster without absorbing much heat, which wastes pump energy. Higher Delta T can indicate undersized equipment or flow problems.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Chiller Sizing Best Practices
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Size for peak load, not average</p>
                  <p>Chillers should handle the hottest day of the year. Undersized units run continuously and fail prematurely. Add 10-15 percent safety margin for future expansion.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider variable flow systems</p>
                  <p>Variable primary flow chillers adjust water flow based on demand. They save pump energy and maintain better Delta T compared to constant flow systems.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Match chiller type to application</p>
                  <p>Air-cooled chillers work well for smaller installations. Water-cooled chillers are more efficient for large systems but need cooling towers. Consider maintenance access and noise requirements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Plan for redundancy</p>
                  <p>Critical facilities often install multiple smaller chillers instead of one large unit. If one fails, others can handle partial load. This also improves part-load efficiency.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is a good Delta T for a chiller system?</h4>
                <p>
                  Most HVAC systems are designed for 10-12 F Delta T. Industrial processes may use 15-20 F Delta T. If your actual Delta T is much lower than design, you may have flow issues or oversized pumps. Higher than design Delta T can indicate fouled heat exchangers or low flow.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert tons to kilowatts?</h4>
                <p>
                  One ton of cooling equals 3.517 kilowatts. To convert tons to kW, multiply by 3.517. For example, a 50-ton chiller produces 175.9 kW of cooling. Note that this is cooling output, not electrical input. Actual power consumption depends on the chiller&apos;s efficiency (COP or kW/ton rating).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What size chiller do I need for my building?</h4>
                <p>
                  Building cooling load depends on square footage, occupancy, equipment heat, and climate. A rough estimate is 1 ton per 400-600 square feet for offices. For accurate sizing, have an HVAC engineer perform a load calculation using Manual N or similar methods.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why is my chiller short cycling?</h4>
                <p>
                  Short cycling happens when a chiller turns on and off frequently. Common causes include oversized equipment, low flow conditions, or faulty controls. Short cycling reduces efficiency and increases wear. Check that flow rates match design specifications and verify control setpoints.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How can I improve chiller efficiency?</h4>
                <p>
                  Keep heat exchanger tubes clean, maintain proper water treatment, and ensure adequate flow rates. Lower condenser water temperatures improve efficiency. Variable speed drives on pumps and fans save energy at part load. Regular maintenance prevents efficiency degradation over time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
