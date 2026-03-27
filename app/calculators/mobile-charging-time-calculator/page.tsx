"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function MobileChargingTimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [electricityRate, setElectricityRate] = useState<string>("");
  const [result, setResult] = useState<{ chargingCost: number } | null>(null);

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const rate = parseFloat(electricityRate);
    if (isNaN(capacity) || isNaN(rate) || capacity <= 0 || rate <= 0) return;
    const chargingCost = capacity * rate;
    setResult({ chargingCost });
  };
  const reset = () => { setBatteryCapacity(""); setElectricityRate(""); setResult(null); };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?</h1>
          <p className="text-muted-foreground">
            Find out exactly when your phone will be fully charged with our Mobile Charging Time Calculator. Enter battery capacity (mAh), charger wattage, and current charge level to get an accurate estimated charging time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batteryCapacity">Battery Capacity (kWh)</Label>
                <Input id="batteryCapacity" type="number" placeholder="Enter battery capacity" value={batteryCapacity} onChange={(e) => setBatteryCapacity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
                <Input id="electricityRate" type="number" placeholder="Enter electricity rate" value={electricityRate} onChange={(e) => setElectricityRate(e.target.value)} />
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Charging Cost</p>
                    <p className="text-3xl font-bold text-primary">${result?.chargingCost.toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Charging Cost Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter battery capacity</p>
                    <p>Input your device's battery capacity in kWh. For phones, convert from mAh: (mAh × V) / 1,000,000 = kWh.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your electricity rate</p>
                    <p>Find this on your utility bill. US average is about $0.15/kWh. Rates vary by location and time of use.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate charging cost</p>
                    <p>See how much it costs to fully charge your device. Multiply by charging cycles for monthly estimates.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Battery Capacities and Charging Costs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Device</th>
                      <th className="text-left py-3 px-2 font-semibold">Battery (mAh)</th>
                      <th className="text-left py-3 px-2 font-semibold">Capacity (kWh)</th>
                      <th className="text-left py-3 px-2 font-semibold">Cost per Charge*</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">iPhone 15</td>
                      <td className="py-3 px-2">3,349</td>
                      <td className="py-3 px-2">0.013</td>
                      <td className="py-3 px-2">$0.002</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Samsung Galaxy S24</td>
                      <td className="py-3 px-2">4,000</td>
                      <td className="py-3 px-2">0.015</td>
                      <td className="py-3 px-2">$0.002</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">iPad Air</td>
                      <td className="py-3 px-2">7,604</td>
                      <td className="py-3 px-2">0.029</td>
                      <td className="py-3 px-2">$0.004</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">MacBook Air</td>
                      <td className="py-3 px-2">49.9 Wh</td>
                      <td className="py-3 px-2">0.050</td>
                      <td className="py-3 px-2">$0.008</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Tesla Model 3</td>
                      <td className="py-3 px-2">60 kWh</td>
                      <td className="py-3 px-2">60</td>
                      <td className="py-3 px-2">$9.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                *Based on $0.15/kWh electricity rate. Actual costs vary by location and charging efficiency losses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Battery Charging Costs
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Basic Formula</h4>
                  <p>
                    Charging cost = Battery capacity (kWh) × Electricity rate ($/kWh). A 0.015 kWh phone battery at $0.15/kWh costs about 0.2 cents per full charge. Even charging daily, that's less than $1 per year.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Charging Efficiency Losses</h4>
                  <p>
                    Not all electricity reaches the battery. Some is lost as heat in the charger and phone circuitry. Typical efficiency is 80-90%. Add 10-20% to calculated costs for real-world estimates.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Phone Charging Is Cheap</h4>
                  <p>
                    Phone batteries are tiny compared to home energy use. A phone uses about 5-10 kWh per year—less than a refrigerator uses in a week. Electric vehicles, by contrast, use 3,000-4,000 kWh annually.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips to Reduce Charging Costs
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Charge during off-peak hours</p>
                    <p>Many utilities offer lower rates at night. Time-of-use plans can cut charging costs by 30-50%.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use the original charger</p>
                    <p>Cheap chargers often have poor efficiency. Quality chargers waste less energy as heat.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Unplug when not charging</p>
                    <p>Chargers draw small amounts of power even when idle. Unplugging saves a few dollars per year per charger.</p>
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
    question: "How much does it cost to charge a phone for a year?",
    answer: "About $0.50-1.00 for most smartphones. Even with daily full charges, phone batteries are so small that annual charging costs are negligible compared to other household electricity use.",
  },
{
    question: "Does fast charging cost more?",
    answer: "No. Fast charging uses more power per minute but for less time. Total energy delivered to the battery is the same. However, fast chargers may be slightly less efficient, adding a tiny amount to costs.",
  },
{
    question: "How do I convert mAh to kWh?",
    answer: "Multiply mAh by voltage (usually 3.7V for lithium), then divide by 1,000,000. Example: 4000 mAh × 3.7V = 14,800 mWh = 0.0148 kWh. Phone specs often list Wh directly.",
  },
{
    question: "Is it cheaper to charge at home or use public chargers?",
    answer: "Home charging is almost always cheaper. Public USB ports are often free but may charge slowly. Some airports and cafes charge for fast charging stations. Home rates are typically $0.10-0.30/kWh.",
  },
{
    question: "Does leaving my phone plugged in overnight waste energy?",
    answer: "Modern phones stop drawing significant power once fully charged. The charger may use a tiny amount of standby power, but it's minimal—pennies per year. The bigger concern is battery health, not cost.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
