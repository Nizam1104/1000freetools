"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HeatPumpCopCalculator() {
  const [heatOutput, setHeatOutput] = useState<string>("");
  const [powerInput, setPowerInput] = useState<string>("");
  const [sourceTemp, setSourceTemp] = useState<string>("");
  const [sinkTemp, setSinkTemp] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(heatOutput);
    const W = parseFloat(powerInput);
    const Tc = parseFloat(sourceTemp) + 273.15;
    const Th = parseFloat(sinkTemp) + 273.15;

    if (Q > 0 && W > 0) {
      const cop = Q / W;
      const copCarnot = Th / (Th - Tc);
      const efficiency = (cop / copCarnot) * 100;

      setResults({ cop, copCarnot: Math.round(copCarnot * 100) / 100, efficiency: Math.round(efficiency) });
    }
  };

  const reset = () => {
    setHeatOutput(""); setPowerInput(""); setSourceTemp(""); setSinkTemp(""); setResults(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Heat Output (kW)</Label><Input value={heatOutput} onChange={e => setHeatOutput(e.target.value)} /></div>
              <div><Label>Power Input (kW)</Label><Input value={powerInput} onChange={e => setPowerInput(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Source Temp (°C)</Label><Input value={sourceTemp} onChange={e => setSourceTemp(e.target.value)} /></div>
              <div><Label>Sink Temp (°C)</Label><Input value={sinkTemp} onChange={e => setSinkTemp(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate COP</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Actual COP</p>
                    <p className="text-3xl font-bold">{Math.round(results.cop * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carnot COP</p>
                    <p className="text-2xl font-bold">{results.copCarnot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold">{results.efficiency}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Heat Pump COP Calculation Works</CardTitle>
          <CardDescription>Understanding coefficient of performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Calculate Actual COP</h4>
                <p className="text-sm text-muted-foreground">
                  COP = Heat Output / Power Input. If your heat pump delivers 4 kW of heat using 1 kW of electricity, COP = 4. This means you get 4 units of heat for every unit of electricity.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Find Carnot COP Limit</h4>
                <p className="text-sm text-muted-foreground">
                  Carnot COP = T_hot / (T_hot - T_cold) using absolute temperatures (Kelvin). This is the theoretical maximum efficiency any heat pump can achieve between those temperatures.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Determine Efficiency Percentage</h4>
                <p className="text-sm text-muted-foreground">
                  Efficiency = (Actual COP / Carnot COP) × 100%. Real heat pumps achieve 30-60% of Carnot efficiency. Higher percentages indicate better engineering and less energy waste.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heat Pump COP Features and Benefits</CardTitle>
          <CardDescription>Why COP matters for heating efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Energy Efficiency Rating**</h4>
              <p className="text-xs text-muted-foreground">
                COP directly measures efficiency. A COP of 3 means 300% efficiency – you get 3 kW of heat for 1 kW of electricity. Higher COP means lower operating costs and reduced carbon footprint.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Temperature Dependence**</h4>
              <p className="text-xs text-muted-foreground">
                COP decreases as the temperature difference increases. Air source heat pumps have lower COP in winter. Ground source systems maintain higher COP year-round due to stable ground temperatures.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Carnot Limit Benchmark**</h4>
              <p className="text-xs text-muted-foreground">
                Carnot COP sets the theoretical maximum. Comparing actual COP to Carnot reveals how well-engineered the system is. Modern heat pumps reach 50-60% of Carnot efficiency.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Cost Savings Calculator**</h4>
              <p className="text-xs text-muted-foreground">
                Higher COP means lower electricity bills. A COP 4 heat pump costs 1/4 as much to run as electric resistance heating. Compare COP values when shopping for heat pump systems.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Typical COP Values by Heat Pump Type</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Heat Pump Type</TableHead>
                  <TableHead>Typical COP</TableHead>
                  <TableHead>Best Conditions</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Air Source (mild)</TableCell>
                  <TableCell className="font-mono">3.0-4.0</TableCell>
                  <TableCell className="text-xs">7°C outside</TableCell>
                  <TableCell className="text-xs">Most common residential type</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Air Source (cold)</TableCell>
                  <TableCell className="font-mono">2.0-2.5</TableCell>
                  <TableCell className="text-xs">-7°C outside</TableCell>
                  <TableCell className="text-xs">COP drops in winter</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ground Source</TableCell>
                  <TableCell className="font-mono">3.5-5.0</TableCell>
                  <TableCell className="text-xs">10°C ground</TableCell>
                  <TableCell className="text-xs">Stable year-round performance</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Water Source</TableCell>
                  <TableCell className="font-mono">4.0-5.5</TableCell>
                  <TableCell className="text-xs">15°C water</TableCell>
                  <TableCell className="text-xs">Highest efficiency option</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CO2 (R744)</TableCell>
                  <TableCell className="font-mono">3.0-4.5</TableCell>
                  <TableCell className="text-xs">Hot water heating</TableCell>
                  <TableCell className="text-xs">Eco-friendly refrigerant</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a good COP for a heat pump?</h4>
            <p className="text-xs text-muted-foreground">
              A COP of 3.0 or higher is considered good for air source heat pumps. Ground source systems should achieve COP 4.0+. Modern premium units reach COP 5.0+ under ideal conditions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does COP decrease in cold weather?</h4>
            <p className="text-xs text-muted-foreground">
              Larger temperature difference between source and sink requires more work. The compressor must raise refrigerant temperature more, consuming more electricity. This is why ground source maintains better winter COP.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is COP the same as efficiency?</h4>
            <p className="text-xs text-muted-foreground">
              COP can exceed 100% because it measures heat moved, not heat created. A COP of 4 equals 400% "efficiency" – but this isn't free energy. The extra heat comes from the outdoor environment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What affects heat pump COP?</h4>
            <p className="text-xs text-muted-foreground">
              Source temperature, sink temperature, refrigerant type, compressor efficiency, heat exchanger design, and system maintenance all affect COP. Proper sizing and installation are critical for optimal performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is COP different from HSPF?</h4>
            <p className="text-xs text-muted-foreground">
              COP is instantaneous efficiency at specific conditions. HSPF (Heating Seasonal Performance Factor) is seasonal average efficiency over a heating season. HSPF accounts for varying outdoor temperatures.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/energy-efficiency-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Energy Efficiency Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate energy savings</p>
            </a>
            <a href="/calculators/heating-cost-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Heating Cost Calculator</p>
              <p className="text-xs text-muted-foreground">Estimate heating expenses</p>
            </a>
            <a href="/calculators/carnot-efficiency-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Carnot Efficiency Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate theoretical limits</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
