"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Device {
  id: number;
  name: string;
  wattage: string;
  quantity: string;
}

export default function UpsLoadCalculatorPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "Computer", wattage: "", quantity: "1" },
  ]);
  const [upsVA, setUpsVA] = useState<string>("");
  const [upsVoltage, setUpsVoltage] = useState<string>("12");
  const [batteryAh, setBatteryAh] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.6");
  const [efficiency, setEfficiency] = useState<string>("90");
  const [result, setResult] = useState<{
    totalWatts: number;
    totalVA: number;
    upsLoadPercent: number;
    runtimeMinutes: number;
    runtimeHours: number;
    recommendedVA: number;
  } | null>(null);

  const addDevice = () => {
    setDevices([...devices, { id: Date.now(), name: "", wattage: "", quantity: "1" }]);
  };

  const removeDevice = (id: number) => {
    if (devices.length > 1) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  const updateDevice = (id: number, field: keyof Device, value: string) => {
    setDevices(devices.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const presetDevices = [
    { name: "Desktop PC", watts: "300" },
    { name: "Laptop", watts: "65" },
    { name: "Monitor 24\"", watts: "30" },
    { name: "Monitor 27\"", watts: "40" },
    { name: "Router", watts: "10" },
    { name: "Modem", watts: "15" },
    { name: "NAS", watts: "50" },
    { name: "TV 55\"", watts: "100" },
    { name: "Gaming Console", watts: "150" },
    { name: "Server Rack", watts: "500" },
    { name: "Network Switch", watts: "30" },
    { name: "External HDD", watts: "10" },
  ];

  const applyPreset = (device: { name: string; watts: string }, index: number) => {
    const newDevices = [...devices];
    newDevices[index] = { ...newDevices[index], name: device.name, wattage: device.watts };
    setDevices(newDevices);
  };

  const calculate = () => {
    const upsVaNum = parseFloat(upsVA);
    const batteryCapacity = parseFloat(batteryAh);
    const pf = parseFloat(powerFactor);
    const eff = parseFloat(efficiency) / 100;

    // Calculate total load
    let totalWatts = 0;
    for (const device of devices) {
      const watts = parseFloat(device.wattage) || 0;
      const qty = parseInt(device.quantity) || 1;
      totalWatts += watts * qty;
    }

    if (totalWatts <= 0) return;

    // Calculate VA from Watts (VA = Watts / Power Factor)
    const totalVA = totalWatts / pf;

    // UPS load percentage
    const upsLoadPercent = upsVaNum > 0 ? (totalVA / upsVaNum) * 100 : 0;

    // Calculate runtime
    // Runtime = (Battery Voltage × Battery Ah × Efficiency) / Total Watts
    let runtimeMinutes = 0;
    if (batteryCapacity > 0 && parseFloat(upsVoltage) > 0) {
      const batteryWh = parseFloat(upsVoltage) * batteryCapacity;
      const usableWh = batteryWh * eff;
      const runtimeHours = usableWh / totalWatts;
      runtimeMinutes = runtimeHours * 60;
    }

    // Recommended UPS size (25% headroom)
    const recommendedVA = totalVA * 1.25;

    setResult({
      totalWatts,
      totalVA: Math.round(totalVA),
      upsLoadPercent: Math.round(upsLoadPercent * 10) / 10,
      runtimeMinutes: Math.round(runtimeMinutes),
      runtimeHours: Math.round(runtimeMinutes * 100 / 60) / 100,
      recommendedVA: Math.round(recommendedVA / 100) * 100,
    });
  };

  const reset = () => {
    setDevices([{ id: 1, name: "", wattage: "", quantity: "1" }]);
    setUpsVA("");
    setBatteryAh("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            UPS Load Calculator – Calculate UPS Capacity & Runtime for Your Equipment
          </h1>
          <p className="text-muted-foreground">
            Make sure your UPS can handle your equipment with our UPS Load Calculator. Enter the
            wattage of connected devices and your UPS battery rating to determine total load,
            required VA rating, and estimated backup runtime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Connected Devices</h3>

              {devices.map((device, index) => (
                <div key={device.id} className="space-y-2 border-b pb-4 last:border-0">
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Device name"
                      value={device.name}
                      onChange={(e) => updateDevice(device.id, "name", e.target.value)}
                      className="flex-1"
                    />
                    {devices.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDevice(device.id)}
                        className="text-destructive"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Watts"
                        value={device.wattage}
                        onChange={(e) => updateDevice(device.id, "wattage", e.target.value)}
                      />
                    </div>
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={device.quantity}
                      onChange={(e) => updateDevice(device.id, "quantity", e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {presetDevices.slice(0, 6).map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset, index)}
                        className="text-xs h-6"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <Button variant="outline" size="sm" onClick={addDevice} className="w-full">
                + Add Device
              </Button>

              <h3 className="font-semibold pt-4">UPS Specifications</h3>

              <div className="space-y-2">
                <Label htmlFor="upsVA">UPS VA Rating</Label>
                <Input
                  id="upsVA"
                  type="number"
                  placeholder="e.g., 1000"
                  value={upsVA}
                  onChange={(e) => setUpsVA(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="upsVoltage">Battery Voltage (V)</Label>
                  <Select value={upsVoltage} onValueChange={setUpsVoltage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12V</SelectItem>
                      <SelectItem value="24">24V</SelectItem>
                      <SelectItem value="36">36V</SelectItem>
                      <SelectItem value="48">48V</SelectItem>
                      <SelectItem value="96">96V</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batteryAh">Battery Capacity (Ah)</Label>
                  <Input
                    id="batteryAh"
                    type="number"
                    placeholder="e.g., 7"
                    value={batteryAh}
                    onChange={(e) => setBatteryAh(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="powerFactor">Power Factor</Label>
                  <Input
                    id="powerFactor"
                    type="number"
                    placeholder="0.6"
                    step="0.1"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="efficiency">Efficiency (%)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    placeholder="90"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">UPS Load Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Load</p>
                    <p className="text-3xl font-bold text-primary">{result.totalWatts} W ({result.totalVA} VA)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">UPS Load</p>
                      <p className="text-xl font-bold">{result.upsLoadPercent}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.upsLoadPercent < 50 ? "✓ Excellent headroom" :
                          result.upsLoadPercent < 80 ? "✓ Good" :
                            result.upsLoadPercent < 100 ? "⚠ Near capacity" :
                              "✗ Overloaded!"}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Est. Runtime</p>
                      <p className="text-xl font-bold">
                        {result.runtimeHours >= 1
                          ? `${result.runtimeHours} hours`
                          : `${result.runtimeMinutes} min`}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended UPS Size</p>
                    <p className="text-2xl font-bold">{result.recommendedVA} VA</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (25% headroom for safety and efficiency)
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Note:</strong> Runtime is estimated. Actual runtime varies with
                      battery age, temperature, and load characteristics.
                    </p>
                    <p>
                      <strong>Tip:</strong> Keep UPS load between 50-80% for optimal efficiency
                      and battery life.
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
          <h3 className="text-lg font-semibold mb-3">UPS Calculation Formulas</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Total Watts = Σ(Device Watts × Quantity)</div>
            <div>Total VA = Total Watts ÷ Power Factor</div>
            <div>Load % = (Total VA ÷ UPS VA Rating) × 100</div>
            <div>Runtime (hrs) = (Battery V × Battery Ah × Efficiency) ÷ Total Watts</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Power Factor:</strong> Most electronics have PF between 0.6-0.9. Higher PF
            means more efficient power usage.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate UPS Load Capacity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Add Your Devices</h3>
                <p className="text-sm text-muted-foreground">Enter each device's wattage or select from presets like PC, monitor, router, and NAS.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter UPS Specifications</h3>
                <p className="text-sm text-muted-foreground">Input your UPS VA rating, battery voltage, and amp-hour capacity for accurate analysis.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Load Analysis</h3>
                <p className="text-sm text-muted-foreground">See total load percentage, estimated runtime, and recommended UPS size for your setup.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This UPS Load Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Multi-Device Support</h3>
              <p className="text-sm text-muted-foreground">Add unlimited devices with quantity support and quick-select presets for common equipment.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">VA to Watts Conversion</h3>
              <p className="text-sm text-muted-foreground">Automatically converts between VA and watts using power factor for accurate load assessment.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Load Percentage Warning</h3>
              <p className="text-sm text-muted-foreground">Visual indicators show if your UPS is underloaded, optimally loaded, or dangerously overloaded.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Runtime Estimation</h3>
              <p className="text-sm text-muted-foreground">Calculates expected backup time based on battery capacity and total connected load.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Common Device Power Consumption</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Device</th>
                  <th className="text-left py-2">Typical Watts</th>
                  <th className="text-left py-2">Device</th>
                  <th className="text-left py-2">Typical Watts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Desktop PC</td>
                  <td className="py-2">300-500W</td>
                  <td className="py-2">Router</td>
                  <td className="py-2">10-15W</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Laptop</td>
                  <td className="py-2">45-90W</td>
                  <td className="py-2">Modem</td>
                  <td className="py-2">10-20W</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Monitor 24"</td>
                  <td className="py-2">25-35W</td>
                  <td className="py-2">NAS</td>
                  <td className="py-2">30-60W</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Monitor 27"</td>
                  <td className="py-2">35-50W</td>
                  <td className="py-2">TV 55"</td>
                  <td className="py-2">80-120W</td>
                </tr>
                <tr>
                  <td className="py-2">Gaming Console</td>
                  <td className="py-2">100-200W</td>
                  <td className="py-2">Network Switch</td>
                  <td className="py-2">20-40W</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What size UPS do I need for my PC?</h3>
              <p className="text-sm text-muted-foreground">Add up all device watts and multiply by 1.25 for headroom. A gaming PC (400W) + monitor (40W) + router (15W) = 455W × 1.25 = 569W minimum. Choose a UPS rated at least 700-800W (1000-1200VA).</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between VA and watts?</h3>
              <p className="text-sm text-muted-foreground">VA (volt-amps) is apparent power, while watts is real power. Watts = VA × Power Factor. Most electronics have PF of 0.6-0.9, so a 1000VA UPS typically delivers 600-900 watts of real power.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much load should I put on my UPS?</h3>
              <p className="text-sm text-muted-foreground">Keep UPS load between 50-80% of rated capacity for optimal efficiency and battery life. Running at 100% reduces runtime and stresses the battery. Overloading (&gt;100%) will trip the UPS or damage it.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long will my UPS keep devices running?</h3>
              <p className="text-sm text-muted-foreground">Runtime depends on battery capacity and load. A typical 1000VA UPS with 7Ah battery runs a 200W load for 15-20 minutes. Halving the load roughly doubles runtime. For hours of backup, add external battery packs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Should I run my laser printer on UPS?</h3>
              <p className="text-sm text-muted-foreground">No. Laser printers draw 5-10× their rated power during warm-up, which can overload or damage a UPS. Use a surge protector instead. Inkjet printers are safe to connect to UPS.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Power Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/ups-generator-runtime-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">UPS Generator Runtime Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate how long your backup power will last during outages.</p>
            </a>
            <a href="/calculators/power-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Power Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate electrical power, voltage, current, and resistance.</p>
            </a>
            <a href="/calculators/electricity-appliance-wattage-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Electricity Appliance Wattage Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate power consumption of household appliances.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
