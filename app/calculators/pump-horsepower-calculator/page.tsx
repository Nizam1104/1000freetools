"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function PumpHorsepowerCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [head, setHead] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("");
  const [fluidDensity, setFluidDensity] = useState<string>("1000");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(flowRate); // m³/s
    const H = parseFloat(head); // m
    const η = parseFloat(efficiency) / 100;
    const ρ = parseFloat(fluidDensity); // kg/m³

    if (Q > 0 && H > 0 && η > 0) {
      const g = 9.81;
      // Hydraulic power: P = ρgQH
      const hydraulicPower = ρ * g * Q * H;
      // Shaft power: P_shaft = P_hydraulic / η
      const shaftPower = hydraulicPower / η;
      const hp = shaftPower / 745.7;
      const kW = shaftPower / 1000;

      setResults({
        hydraulicPower: hydraulicPower,
        shaftPower: shaftPower,
        hp: hp,
        kW: kW,
      });
    }
  };

  const reset = () => {
    setFlowRate(""); setHead(""); setEfficiency(""); setFluidDensity("1000"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (m³/s)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>Total Head (m)</Label><Input value={head} onChange={e => setHead(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pump Efficiency (%)</Label><Input value={efficiency} onChange={e => setEfficiency(e.target.value)} placeholder="e.g., 75" /></div>
              <div><Label>Fluid Density (kg/m³)</Label><Input value={fluidDensity} onChange={e => setFluidDensity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Power</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Hydraulic Power</p>
                    <p className="text-2xl font-bold">{Math.round(results.hydraulicPower * 100) / 100} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shaft Power Required</p>
                    <p className="text-2xl font-bold">{Math.round(results.shaftPower * 100) / 100} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horsepower</p>
                    <p className="text-3xl font-bold">{Math.round(results.hp * 100) / 100} HP</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kilowatts</p>
                    <p className="text-2xl font-bold">{Math.round(results.kW * 100) / 100} kW</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Pump Horsepower Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter flow rate and head</p>
                  <p>Input the volumetric flow rate in cubic meters per second and the total head (height) the pump must lift the fluid.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Specify pump efficiency</p>
                  <p>Enter the pump efficiency as a percentage. Typical centrifugal pumps range from 60-85% efficiency.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get power requirements</p>
                  <p>The calculator shows hydraulic power, shaft power, and motor size in both horsepower and kilowatts.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Pump Power Calculation Formulas
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The hydraulic power represents the theoretical minimum energy needed to move the fluid. The shaft power accounts for pump inefficiency — the actual power the motor must deliver.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm space-y-2">
                <div>Hydraulic Power: P_h = ρ × g × Q × H</div>
                <div>Shaft Power: P_s = P_h / η</div>
                <div>Horsepower: HP = P_s / 745.7</div>
              </div>
              <p>
                Where ρ is fluid density (kg/m³), g is gravity (9.81 m/s²), Q is flow rate (m³/s), H is head (m), and η is pump efficiency.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Typical Pump Efficiencies
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Pump Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Efficiency Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Centrifugal (large)</td>
                    <td className="py-3 px-2">80-90%</td>
                    <td className="py-3 px-2">High flow, low viscosity</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Centrifugal (small)</td>
                    <td className="py-3 px-2">50-70%</td>
                    <td className="py-3 px-2">General purpose</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Positive Displacement</td>
                    <td className="py-3 px-2">70-90%</td>
                    <td className="py-3 px-2">High viscosity, precise flow</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Submersible</td>
                    <td className="py-3 px-2">60-80%</td>
                    <td className="py-3 px-2">Deep wells, sewage</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Gear Pump</td>
                    <td className="py-3 px-2">60-80%</td>
                    <td className="py-3 px-2">Hydraulic systems, oils</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is total head in pump calculations?",
    answer: "Total head is the total height the pump must lift the fluid, including vertical lift, friction losses in pipes, and any pressure requirements at the outlet. It represents the total energy the pump must add to the fluid.",
  },
{
    question: "How do I choose a motor size?",
    answer: "Select a motor rated 10-25% higher than the calculated shaft power to provide a safety margin. This accounts for startup loads, voltage variations, and ensures the motor doesn't run at maximum capacity continuously.",
  },
{
    question: "Why does fluid density matter?",
    answer: "Denser fluids require more power to move. Water has a density of 1000 kg/m³. Oil might be 850 kg/m³, while sludge could be 1200 kg/m³. The calculator adjusts power requirements based on the fluid you specify.",
  },
{
    question: "What affects pump efficiency?",
    answer: "Efficiency depends on pump type, size, age, and operating point. Pumps are most efficient at their design flow rate. Running too far from the best efficiency point (BEP) wastes energy and causes premature wear.",
  },
{
    question: "How do I convert between HP and kW?",
    answer: "1 horsepower equals 745.7 watts or 0.746 kW. To convert HP to kW, multiply by 0.746. To convert kW to HP, divide by 0.746. Motor nameplates typically show both ratings.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
