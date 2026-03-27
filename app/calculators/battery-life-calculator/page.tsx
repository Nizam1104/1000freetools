"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function BatteryLifeCalculator() {
  const [capacity, setCapacity] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [loadPower, setLoadPower] = useState<string>("");
  const [depthOfDischarge, setDepthOfDischarge] = useState<string>("80");
  const [batteryType, setBatteryType] = useState<"liion" | "leadacid" | "nimh">("liion");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const C = parseFloat(capacity); // Ah
    const V = parseFloat(voltage);
    const I = parseFloat(loadCurrent);
    const P = parseFloat(loadPower);
    const DoD = parseFloat(depthOfDischarge) / 100;

    let current = I;
    if (P > 0 && V > 0) {
      current = P / V;
    }

    if (C > 0 && current > 0) {
      const usableCapacity = C * DoD;
      const hours = usableCapacity / current;
      const wattHours = usableCapacity * V;
      const actualHours = hours > 100 ? "100+" : hours.toFixed(1);

      setResults({
        hours: actualHours,
        minutes: Math.round(hours * 60),
        wattHours: Math.round(wattHours),
        usableCapacity: Math.round(usableCapacity * 100) / 100,
      });
    }
  };

  const reset = () => {
    setCapacity(""); setVoltage(""); setLoadCurrent(""); setLoadPower("");
    setDepthOfDischarge("80"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Battery Capacity (Ah)</Label><Input value={capacity} onChange={e => setCapacity(e.target.value)} /></div>
              <div><Label>Battery Voltage (V)</Label><Input value={voltage} onChange={e => setVoltage(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Load Current (A)</Label><Input value={loadCurrent} onChange={e => setLoadCurrent(e.target.value)} /></div>
              <div><Label>Or Load Power (W)</Label><Input value={loadPower} onChange={e => setLoadPower(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Battery Type</Label>
                <Select value={batteryType} onValueChange={(v) => setBatteryType(v as typeof batteryType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liion">Li-Ion (80% DoD)</SelectItem>
                    <SelectItem value="leadacid">Lead Acid (50% DoD)</SelectItem>
                    <SelectItem value="nimh">NiMH (90% DoD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Depth of Discharge (%)</Label>
                <Input value={depthOfDischarge} onChange={e => setDepthOfDischarge(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Runtime</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Runtime</p>
                    <p className="text-4xl font-bold">{results.hours} hours</p>
                    <p className="text-sm text-muted-foreground">≈ {results.minutes} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usable Capacity</p>
                    <p className="text-2xl font-bold">{results.usableCapacity} Ah</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Energy Available</p>
                    <p className="text-2xl font-bold">{results.wattHours} Wh</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Battery Life Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Enter battery capacity and voltage</p>
              <p className="text-sm text-muted-foreground">Input the battery capacity in amp-hours (Ah) and the nominal voltage. These values are usually printed on the battery label.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Enter your load current or power</p>
              <p className="text-sm text-muted-foreground">Input either the current draw in amps or the power consumption in watts. If you know watts, the calculator converts using your voltage.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Set depth of discharge and calculate</p>
              <p className="text-sm text-muted-foreground">Choose your battery type for automatic DoD settings, or enter a custom value. Click Calculate to see estimated runtime.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Battery Runtime by Load and Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Battery Capacity</th>
                  <th className="text-left py-3 px-2 font-semibold">Load Current</th>
                  <th className="text-left py-3 px-2 font-semibold">Runtime (80% DoD)</th>
                  <th className="text-left py-3 px-2 font-semibold">Runtime (50% DoD)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2">50 Ah</td>
                  <td className="py-3 px-2">5A</td>
                  <td className="py-3 px-2">8 hours</td>
                  <td className="py-3 px-2">5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">50 Ah</td>
                  <td className="py-3 px-2">10A</td>
                  <td className="py-3 px-2">4 hours</td>
                  <td className="py-3 px-2">2.5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">100 Ah</td>
                  <td className="py-3 px-2">5A</td>
                  <td className="py-3 px-2">16 hours</td>
                  <td className="py-3 px-2">10 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">100 Ah</td>
                  <td className="py-3 px-2">10A</td>
                  <td className="py-3 px-2">8 hours</td>
                  <td className="py-3 px-2">5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">200 Ah</td>
                  <td className="py-3 px-2">10A</td>
                  <td className="py-3 px-2">16 hours</td>
                  <td className="py-3 px-2">10 hours</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">200 Ah</td>
                  <td className="py-3 px-2">20A</td>
                  <td className="py-3 px-2">8 hours</td>
                  <td className="py-3 px-2">5 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Runtimes are theoretical. Actual performance varies with battery age, temperature, and discharge rate (Peukert effect).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Battery Life Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">The Basic Formula</h4>
            <p>
              Battery runtime equals usable capacity divided by load current. A 100Ah battery at 10A draw gives 10 hours theoretically. But you need to account for depth of discharge limits and efficiency losses.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Depth of Discharge Explained</h4>
            <p>
              DoD is the percentage of battery capacity you can safely use. Lead-acid batteries should not discharge below 50% — going deeper damages them. Lithium batteries can use 80-90% safely. This is why a 100Ah lithium battery often outperforms a 100Ah lead-acid battery.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">The Peukert Effect</h4>
            <p>
              Battery capacity decreases at higher discharge rates. A 100Ah battery might deliver 100Ah at a 5A draw but only 80Ah at a 20A draw. This is the Peukert effect. Lead-acid batteries are more affected than lithium. This calculator uses nominal capacity — expect slightly less at high loads.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Temperature Effects</h4>
            <p>
              Cold temperatures reduce battery capacity. At 0°C (32°F), a lead-acid battery might deliver only 60-70% of its rated capacity. Heat increases capacity short-term but accelerates aging. Battery ratings are typically at 25°C (77°F).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Extending Battery Life</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Avoid deep discharges</p>
              <p>Shallow cycles extend battery life. Discharging to 50% instead of 80% can double or triple cycle life for lead-acid batteries. Plan your capacity accordingly.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Keep batteries charged when storing</p>
              <p>Lead-acid batteries self-discharge and can sulfate if left empty. Store at full charge and recharge every few months. Lithium batteries store better at 50-60% charge.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Match battery capacity to your loads</p>
              <p>Oversizing your battery bank reduces depth of discharge per cycle. If you need 50Ah per day, use a 200Ah battery for 25% DoD instead of a 100Ah battery at 50% DoD.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Monitor battery voltage</p>
              <p>Learn the voltage levels for your battery type. A 12V lead-acid battery at 12.0V is nearly empty. At 12.7V it is full. Voltage monitoring prevents accidental over-discharge.</p>
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
    question: "How do I calculate battery life in hours?",
    answer: "Divide the usable battery capacity by the load current. For a 100Ah battery at 80% DoD powering a 10A load: (100 × 0.80) / 10 = 8 hours. This calculator handles the math automatically.",
  },
{
    question: "What depth of discharge should I use?",
    answer: "It depends on battery chemistry. Lead-acid (flooded, AGM, gel) should stay at 50% DoD for maximum life. Lithium iron phosphate (LiFePO4) can safely use 80-90%. Deep cycle batteries tolerate deeper discharges than starting batteries.",
  },
{
    question: "Why is my battery dying faster than calculated?",
    answer: "Several factors reduce real-world runtime. Old batteries lose capacity. Cold temperatures reduce output. High discharge rates are less efficient (Peukert effect). Your actual load might be higher than expected. Check with a multimeter.",
  },
{
    question: "Can I convert watts to amps for this calculator?",
    answer: "Yes. Divide watts by voltage to get amps. A 120W device on a 12V system draws 10A (120/12=10). This calculator accepts either watts or amps as input and converts automatically.",
  },
{
    question: "How does battery age affect runtime?",
    answer: "Batteries lose capacity over time. A lead-acid battery might have 80% of original capacity after 300-500 cycles. Lithium batteries retain 80% capacity after 2000+ cycles. Old batteries need replacement when runtime becomes unacceptable.",
  }
  ]} />
</section>
    </div>
  );
}
