"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ElectricityApplianceWattageCalculatorPage() {
  const [wattage, setWattage] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [electricityRate, setElectricityRate] = useState<string>("0.13");
  const [daysPerMonth, setDaysPerMonth] = useState<string>("30");
  const [result, setResult] = useState<{
    dailyKwh: number;
    monthlyKwh: number;
    yearlyKwh: number;
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
  } | null>(null);

  const presetAppliances = [
    { name: "LED Light Bulb", watts: "10" },
    { name: "Incandescent Bulb", watts: "60" },
    { name: "Ceiling Fan", watts: "75" },
    { name: "Table Fan", watts: "50" },
    { name: "Refrigerator", watts: "150" },
    { name: "Air Conditioner (1 ton)", watts: "1000" },
    { name: "Air Conditioner (2 ton)", watts: "2000" },
    { name: "Heater", watts: "1500" },
    { name: "TV (LED 55\")", watts: "100" },
    { name: "Computer Desktop", watts: "200" },
    { name: "Laptop", watts: "50" },
    { name: "Microwave", watts: "1000" },
    { name: "Oven", watts: "2000" },
    { name: "Dishwasher", watts: "1200" },
    { name: "Washing Machine", watts: "500" },
    { name: "Dryer", watts: "3000" },
    { name: "Water Heater", watts: "4000" },
    { name: "Coffee Maker", watts: "900" },
    { name: "Toaster", watts: "800" },
    { name: "Hair Dryer", watts: "1500" },
    { name: "Iron", watts: "1000" },
    { name: "Vacuum Cleaner", watts: "1000" },
    { name: "Phone Charger", watts: "5" },
    { name: "Router", watts: "10" },
  ];

  const applyPreset = (watts: string) => {
    setWattage(watts);
  };

  const calculate = () => {
    const watts = parseFloat(wattage);
    const hours = parseFloat(hoursPerDay);
    const rate = parseFloat(electricityRate);
    const days = parseFloat(daysPerMonth) || 30;

    if (isNaN(watts) || isNaN(hours) || isNaN(rate) || watts <= 0 || hours <= 0) return;

    // Daily kWh = (Watts × Hours) / 1000
    const dailyKwh = (watts * hours) / 1000;

    // Monthly kWh
    const monthlyKwh = dailyKwh * days;

    // Yearly kWh
    const yearlyKwh = dailyKwh * 365;

    // Costs
    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const yearlyCost = yearlyKwh * rate;

    setResult({
      dailyKwh: Math.round(dailyKwh * 1000) / 1000,
      monthlyKwh: Math.round(monthlyKwh * 100) / 100,
      yearlyKwh: Math.round(yearlyKwh * 100) / 100,
      dailyCost: Math.round(dailyCost * 100) / 100,
      monthlyCost: Math.round(monthlyCost * 100) / 100,
      yearlyCost: Math.round(yearlyCost * 100) / 100,
    });
  };

  const reset = () => {
    setWattage("");
    setHoursPerDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill
          </h1>
          <p className="text-muted-foreground">
            Find out exactly how much each appliance costs to run with our Electricity Appliance
            Wattage Calculator. Enter wattage and daily usage hours to see kWh consumption and
            monthly electricity cost — perfect for reducing your power bill.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Quick Select Appliance</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {presetAppliances.map((appliance) => (
                    <Button
                      key={appliance.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(appliance.watts)}
                      className="justify-start text-xs"
                    >
                      {appliance.name} ({appliance.watts}W)
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wattage">Appliance Wattage (Watts)</Label>
                <Input
                  id="wattage"
                  type="number"
                  placeholder="e.g., 100"
                  value={wattage}
                  onChange={(e) => setWattage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Check the appliance label or manual for wattage
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours Used Per Day</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 4"
                  step="0.5"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Electricity Rate ($/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="0.13"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  US average: $0.10-$0.20/kWh
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days">Days Per Month</Label>
                <Input
                  id="days"
                  type="number"
                  placeholder="30"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Energy Consumption Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlyCost.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Daily Usage</p>
                      <p className="text-lg font-bold">{result.dailyKwh} kWh</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Usage</p>
                      <p className="text-lg font-bold">{result.monthlyKwh} kWh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Yearly Cost</p>
                    <p className="text-2xl font-bold">${result.yearlyCost.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({result.yearlyKwh} kWh/year)
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Cost breakdown:</strong> ${result.dailyCost.toFixed(3)}/day at {wattage}W
                      for {hoursPerDay} hours/day
                    </p>
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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How to Calculate Electricity Cost</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Daily kWh = (Watts × Hours) ÷ 1000</div>
            <div>Monthly kWh = Daily kWh × Days</div>
            <div>Monthly Cost = Monthly kWh × Rate ($/kWh)</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> A 100W TV running 5 hours/day at $0.13/kWh:
            <br />
            Daily: (100 × 5) / 1000 = 0.5 kWh
            <br />
            Monthly: 0.5 × 30 = 15 kWh → $1.95/month
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the Appliance Wattage Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Select or Enter Wattage</h3>
                    <p className="text-sm text-muted-foreground">Choose from common appliances or enter your device wattage manually from the label.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Usage Details</h3>
                    <p className="text-sm text-muted-foreground">Input daily usage hours and your electricity rate per kWh for accurate cost calculation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Energy Cost Breakdown</h3>
                    <p className="text-sm text-muted-foreground">See daily, monthly, and yearly energy consumption in kWh and actual electricity costs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This Electricity Cost Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Preset Appliance Library</h3>
                      <p className="text-sm text-muted-foreground">Quick-select from 24 common appliances with typical wattage values for instant calculations.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Complete Cost Breakdown</h3>
                      <p className="text-sm text-muted-foreground">See energy costs broken down by day, month, and year for budget planning.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">kWh Consumption Tracking</h3>
                      <p className="text-sm text-muted-foreground">Calculate kilowatt-hour usage to understand your energy consumption patterns.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Custom Electricity Rates</h3>
                      <p className="text-sm text-muted-foreground">Enter your actual utility rate for precise cost calculations tailored to your location.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Energy Savings Insights</h3>
                      <p className="text-sm text-muted-foreground">Identify energy-hungry appliances to target for efficiency improvements and cost savings.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Energy Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free electricity calculator for homeowners, renters, and energy auditors.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Common Appliance Wattage Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Appliance</th>
                        <th className="text-left py-2">Typical Wattage</th>
                        <th className="text-left py-2">Monthly Cost (4 hrs/day)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">LED Light Bulb</td>
                        <td className="py-2">10W</td>
                        <td className="py-2">$0.16</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Ceiling Fan</td>
                        <td className="py-2">75W</td>
                        <td className="py-2">$1.17</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Refrigerator</td>
                        <td className="py-2">150W</td>
                        <td className="py-2">$2.34</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">TV (55&quot; LED)</td>
                        <td className="py-2">100W</td>
                        <td className="py-2">$1.56</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Air Conditioner (1 ton)</td>
                        <td className="py-2">1000W</td>
                        <td className="py-2">$15.60</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Clothes Dryer</td>
                        <td className="py-2">3000W</td>
                        <td className="py-2">$46.80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I calculate my appliance electricity cost?</h3>
                  <p className="text-sm text-muted-foreground">Multiply the appliance wattage by hours used per day, divide by 1000 to get kWh, then multiply by your electricity rate. For example: 100W x 5 hours / 1000 = 0.5 kWh/day x $0.13 = $0.065 per day or about $1.95 per month.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Where can I find my appliance wattage?</h3>
                  <p className="text-sm text-muted-foreground">Check the label on the back or bottom of the appliance, look in the user manual, or search online for your model number. Many appliances list watts (W) or amps (A) - if amps, multiply by 120V to get watts.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the average electricity rate in the US?</h3>
                  <p className="text-sm text-muted-foreground">The US average electricity rate is around $0.13-0.15 per kWh, but varies significantly by state. California averages $0.22/kWh, while Louisiana is around $0.09/kWh. Check your utility bill for your exact rate.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Which appliances use the most electricity?</h3>
                  <p className="text-sm text-muted-foreground">Heating and cooling systems use the most energy, followed by water heaters, dryers, and electric ovens. Running these for fewer hours or upgrading to energy-efficient models can significantly reduce your electricity bill.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How can I reduce my appliance energy costs?</h3>
                  <p className="text-sm text-muted-foreground">Use appliances during off-peak hours, unplug devices when not in use, switch to LED bulbs, use ceiling fans instead of AC when possible, and replace old appliances with Energy Star certified models for maximum savings.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Related Energy Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/solar-panel-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Solar Panel Calculator</h3>
                  <p className="text-sm text-muted-foreground">Estimate solar panel needs and potential savings based on your electricity consumption.</p>
                </a>
                <a href="/calculators/battery-life-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Battery Life Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate how long a battery will power your devices based on wattage and capacity.</p>
                </a>
                <a href="/calculators/led-savings-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">LED Savings Calculator</h3>
                  <p className="text-sm text-muted-foreground">Compare LED vs incandescent bulb costs to see how much you can save by switching.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
