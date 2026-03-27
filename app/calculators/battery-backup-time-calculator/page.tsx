"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function BatteryBackupTimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [batteryVoltage, setBatteryVoltage] = useState<string>("12");
  const [deviceWattage, setDeviceWattage] = useState<string>("");
  const [deviceVoltage, setDeviceVoltage] = useState<string>("12");
  const [batteryType, setBatteryType] = useState<"lead-acid" | "lithium" | "agm" | "gel">("lead-acid");
  const [efficiency, setEfficiency] = useState<string>("85");
  const [result, setResult] = useState<{
    batteryWh: number;
    usableWh: number;
    runtimeHours: number;
    runtimeMinutes: number;
    deviceAmps: number;
  } | null>(null);

  const calculate = () => {
    const capacity = parseFloat(batteryCapacity);
    const battVolt = parseFloat(batteryVoltage);
    const deviceWatt = parseFloat(deviceWattage);
    const deviceVolt = parseFloat(deviceVoltage);
    const eff = parseFloat(efficiency) / 100;

    if (isNaN(capacity) || isNaN(battVolt) || isNaN(deviceWatt) || capacity <= 0 || battVolt <= 0 || deviceWatt <= 0) return;

    // Battery capacity in Watt-hours
    const batteryWh = capacity * battVolt;

    // Depth of discharge based on battery type
    const dodFactors = {
      "lead-acid": 0.5,  // 50% DoD recommended
      "lithium": 0.9,    // 90% DoD for LiFePO4
      "agm": 0.6,        // 60% DoD for AGM
      "gel": 0.6,        // 60% DoD for Gel
    };

    const dod = dodFactors[batteryType];
    const usableWh = batteryWh * dod * eff;

    // Runtime in hours
    const runtimeHours = usableWh / deviceWatt;
    const runtimeMinutes = runtimeHours * 60;

    // Device current draw
    const deviceAmps = deviceWatt / deviceVolt;

    setResult({
      batteryWh: Math.round(batteryWh),
      usableWh: Math.round(usableWh),
      runtimeHours: Math.round(runtimeHours * 100) / 100,
      runtimeMinutes: Math.round(runtimeMinutes),
      deviceAmps: Math.round(deviceAmps * 100) / 100,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setDeviceWattage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Battery Backup Time Calculator – How Long Will Your Battery Last?
          </h1>
          <p className="text-muted-foreground">
            Find out how long your battery will power your devices with our Battery Backup Time
            Calculator. Enter battery capacity in Ah or Wh and your device's power draw in watts to
            get an accurate runtime estimate — ideal for solar systems, UPS, and portable power banks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Battery Specifications</h3>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Battery Capacity (Ah)</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 100"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voltage">Battery Voltage (V)</Label>
                <Select value={batteryVoltage} onValueChange={setBatteryVoltage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6V</SelectItem>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batteryType">Battery Type</Label>
                <Select value={batteryType} onValueChange={(v) => setBatteryType(v as "lead-acid" | "lithium" | "agm" | "gel")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-acid">Lead-Acid (Flooded)</SelectItem>
                    <SelectItem value="agm">AGM (Absorbent Glass Mat)</SelectItem>
                    <SelectItem value="gel">Gel Cell</SelectItem>
                    <SelectItem value="lithium">Lithium (LiFePO4)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Affects depth of discharge limits
                </p>
              </div>

              <h3 className="font-semibold pt-2">Device Specifications</h3>

              <div className="space-y-2">
                <Label htmlFor="wattage">Device Power (Watts)</Label>
                <Input
                  id="wattage"
                  type="number"
                  placeholder="e.g., 100"
                  value={deviceWattage}
                  onChange={(e) => setDeviceWattage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceVoltage">Device Voltage (V)</Label>
                <Select value={deviceVoltage} onValueChange={setDeviceVoltage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5V (USB)</SelectItem>
                    <SelectItem value="12">12V (DC)</SelectItem>
                    <SelectItem value="24">24V (DC)</SelectItem>
                    <SelectItem value="120">120V (AC)</SelectItem>
                    <SelectItem value="230">230V (AC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency">System Efficiency (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  placeholder="85"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Inverter/convertor losses (typically 80-95%)
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Backup Time Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Runtime</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.runtimeHours >= 1 
                        ? `${result.runtimeHours} hours` 
                        : `${result.runtimeMinutes} minutes`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Battery Capacity</p>
                      <p className="text-lg font-bold">{result.batteryWh} Wh</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Usable Energy</p>
                      <p className="text-lg font-bold">{result.usableWh} Wh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Device Current Draw</p>
                    <p className="text-xl font-bold">{result.deviceAmps} A</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Note:</strong> Runtime is estimated. Actual performance varies with
                      battery age, temperature, and load conditions.
                    </p>
                    <p>
                      <strong>Tip:</strong> For lead-acid batteries, never discharge below 50% to
                      maximize battery life.
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
          <h3 className="text-lg font-semibold mb-3">Battery Backup Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Battery Energy (Wh) = Capacity (Ah) × Voltage (V)</div>
            <div>Usable Energy = Battery Energy × DoD × Efficiency</div>
            <div>Runtime (hours) = Usable Energy (Wh) ÷ Device Power (W)</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Battery Type</th>
                <th className="text-left py-2">Recommended DoD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Lead-Acid (Flooded)</td>
                <td className="py-2">50%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">AGM</td>
                <td className="py-2">60%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Gel</td>
                <td className="py-2">60%</td>
              </tr>
              <tr>
                <td className="py-2">Lithium (LiFePO4)</td>
                <td className="py-2">90%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use This Battery Backup Time Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter your battery specifications</p>
                <p className="text-sm text-muted-foreground">Input the battery capacity in amp-hours (Ah) and select the voltage. Choose your battery type to apply the correct depth of discharge limit.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter your device power requirements</p>
                <p className="text-sm text-muted-foreground">Input the wattage of the device you want to power. You can find this on the device label or power adapter. Select the device voltage.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate to see runtime</p>
                <p className="text-sm text-muted-foreground">Get your estimated backup time in hours or minutes, plus usable energy and device current draw calculations.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typical Power Consumption by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Device</th>
                    <th className="text-left py-3 px-2 font-semibold">Power (Watts)</th>
                    <th className="text-left py-3 px-2 font-semibold">Runtime on 100Ah 12V</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">LED Light Bulb (10W)</td>
                    <td className="py-3 px-2">10W</td>
                    <td className="py-3 px-2">~54 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Laptop Computer</td>
                    <td className="py-3 px-2">45-65W</td>
                    <td className="py-3 px-2">~8-12 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">LED TV (42 inch)</td>
                    <td className="py-3 px-2">80-100W</td>
                    <td className="py-3 px-2">~5-6 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Mini Fridge</td>
                    <td className="py-3 px-2">50-100W (avg)</td>
                    <td className="py-3 px-2">~5-10 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">CPAP Machine</td>
                    <td className="py-3 px-2">30-60W</td>
                    <td className="py-3 px-2">~8-16 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">WiFi Router</td>
                    <td className="py-3 px-2">5-15W</td>
                    <td className="py-3 px-2">~30-90 hours</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Phone Charger</td>
                    <td className="py-3 px-2">5-10W</td>
                    <td className="py-3 px-2">~50-100 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Runtimes assume lead-acid battery with 50% DoD and 85% inverter efficiency. Actual results vary.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Battery Backup Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Amp-Hours vs Watt-Hours</h4>
              <p>
                Battery capacity is often listed in amp-hours (Ah), but devices consume watts. To compare them, multiply Ah by voltage to get watt-hours (Wh). A 100Ah 12V battery stores 1200Wh of energy. This conversion is essential for accurate runtime estimates.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Depth of Discharge (DoD)</h4>
              <p>
                DoD is how much of the battery capacity you can safely use. Lead-acid batteries should not discharge below 50% or their lifespan drops dramatically. Lithium batteries can safely use 80-90% of their capacity. This is why lithium costs more but delivers more usable energy.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Inverter Efficiency</h4>
              <p>
                Inverters convert DC battery power to AC for household devices. This conversion is not perfect — some energy becomes heat. Typical efficiency is 80-95%. A 100W device might actually draw 115W from the battery after accounting for inverter losses.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Runtime Is an Estimate</h4>
              <p>
                Battery capacity ratings are measured under ideal conditions. Cold temperatures reduce capacity. Old batteries hold less charge. High current draws reduce effective capacity (Peukert effect). Motors and compressors have startup surges. Plan for 20-30% less runtime than calculated.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Maximizing Battery Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Use LED lighting</p>
                <p>LED bulbs use 80-90% less power than incandescent. A 10W LED replaces a 60W bulb. This single change can extend your backup time by hours.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Prioritize essential loads</p>
                <p>Make a list of what you really need during an outage. Lights, phone charging, and maybe a fridge. Skip the TV and microwave. Every watt counts.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Keep batteries at room temperature</p>
                <p>Cold reduces battery capacity. Heat shortens battery life. Store batteries in a climate-controlled space when possible. A garage that freezes in winter is not ideal.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Maintain your batteries</p>
                <p>Flooded lead-acid batteries need water checks. All batteries need clean terminals and secure connections. Check voltage periodically. Replace batteries that no longer hold a charge.</p>
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
    question: "How long will a 100Ah battery last?",
    answer: "It depends on your load. A 100Ah 12V lead-acid battery has about 600Wh usable (50% DoD). Running a 50W device gives roughly 12 hours. A 100W device gives about 6 hours. Double the wattage, halve the runtime.",
  },
{
    question: "Should I choose lithium or lead-acid for backup?",
    answer: "Lithium costs more upfront but lasts longer and provides more usable capacity. Lead-acid is cheaper but heavier and needs more maintenance. For occasional outages, lead-acid works. For daily use or critical backup, lithium is worth the investment.",
  },
{
    question: "What size inverter do I need?",
    answer: "Add up the wattage of all devices you might run simultaneously. Choose an inverter rated 20-25% higher than that total. Motors and compressors need surge capacity — check the inverter surge rating for starting loads.",
  },
{
    question: "Can I connect multiple batteries together?",
    answer: "Yes. Connecting in parallel (positive to positive, negative to negative) increases capacity (Ah) while keeping voltage the same. Connecting in series increases voltage. Match battery type, age, and capacity when connecting batteries.",
  },
{
    question: "Why is my actual runtime shorter than calculated?",
    answer: "Several factors reduce real-world runtime. Battery capacity decreases with age. Cold temperatures reduce capacity. High current draws are less efficient. Inverter efficiency varies with load. Device wattage labels show maximum, not average consumption.",
  }
  ]} />
</section>
      </div>
    </div>
  );
}
