"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ElectricPowerCalculator() {
  // Mode 1: P = VI
  const [voltage1, setVoltage1] = useState<string>("");
  const [current1, setCurrent1] = useState<string>("");
  const [power1, setPower1] = useState<number | null>(null);

  // Mode 2: P = I²R
  const [current2, setCurrent2] = useState<string>("");
  const [resistance2, setResistance2] = useState<string>("");
  const [power2, setPower2] = useState<number | null>(null);

  // Mode 3: P = V²/R
  const [voltage3, setVoltage3] = useState<string>("");
  const [resistance3, setResistance3] = useState<string>("");
  const [power3, setPower3] = useState<number | null>(null);

  // Energy consumption
  const [timeHours, setTimeHours] = useState<string>("");
  const [energyConsumption, setEnergyConsumption] = useState<number | null>(null);

  const calculatePVI = () => {
    const V = parseFloat(voltage1);
    const I = parseFloat(current1);

    if (isNaN(V) || isNaN(I) || V <= 0 || I <= 0) return;

    const P = V * I;
    setPower1(Math.round(P * 100) / 100);
  };

  const calculatePI2R = () => {
    const I = parseFloat(current2);
    const R = parseFloat(resistance2);

    if (isNaN(I) || isNaN(R) || I <= 0 || R <= 0) return;

    const P = I * I * R;
    setPower2(Math.round(P * 100) / 100);
  };

  const calculatePV2R = () => {
    const V = parseFloat(voltage3);
    const R = parseFloat(resistance3);

    if (isNaN(V) || isNaN(R) || V <= 0 || R <= 0) return;

    const P = (V * V) / R;
    setPower3(Math.round(P * 100) / 100);
  };

  const calculateEnergy = (power: number) => {
    const t = parseFloat(timeHours);
    if (isNaN(t) || t <= 0) return;

    const energy = power * t; // Wh
    setEnergyConsumption(Math.round(energy * 100) / 100);
  };

  const resetPVI = () => {
    setVoltage1("");
    setCurrent1("");
    setPower1(null);
    setEnergyConsumption(null);
  };

  const resetPI2R = () => {
    setCurrent2("");
    setResistance2("");
    setPower2(null);
    setEnergyConsumption(null);
  };

  const resetPV2R = () => {
    setVoltage3("");
    setResistance3("");
    setPower3(null);
    setEnergyConsumption(null);
  };

  // Unit conversions
  const toKw = (watts: number) => watts / 1000;
  const toHp = (watts: number) => watts * 0.00134102;
  const toBtuPerHour = (watts: number) => watts * 3.41214;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <Tabs defaultValue="pvi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pvi">P = VI</TabsTrigger>
              <TabsTrigger value="pi2r">P = I²R</TabsTrigger>
              <TabsTrigger value="pv2r">P = V²/R</TabsTrigger>
            </TabsList>

            <TabsContent value="pvi" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="voltage1">Voltage (V)</Label>
                <Input
                  id="voltage1"
                  type="number"
                  placeholder="e.g., 120"
                  value={voltage1}
                  onChange={(e) => setVoltage1(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="current1">Current (A)</Label>
                <Input
                  id="current1"
                  type="number"
                  placeholder="e.g., 5"
                  value={current1}
                  onChange={(e) => setCurrent1(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePVI}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPVI}>Reset</Button>
              </div>

              {power1 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power1} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power1) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power1) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power1))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours1">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours1"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power1)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = V × I</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pi2r" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="current2">Current (A)</Label>
                <Input
                  id="current2"
                  type="number"
                  placeholder="e.g., 5"
                  value={current2}
                  onChange={(e) => setCurrent2(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance2">Resistance (Ω)</Label>
                <Input
                  id="resistance2"
                  type="number"
                  placeholder="e.g., 10"
                  value={resistance2}
                  onChange={(e) => setResistance2(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePI2R}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPI2R}>Reset</Button>
              </div>

              {power2 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power2} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power2) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power2) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power2))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours2">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours2"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power2)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = I² × R</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pv2r" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="voltage3">Voltage (V)</Label>
                <Input
                  id="voltage3"
                  type="number"
                  placeholder="e.g., 120"
                  value={voltage3}
                  onChange={(e) => setVoltage3(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance3">Resistance (Ω)</Label>
                <Input
                  id="resistance3"
                  type="number"
                  placeholder="e.g., 240"
                  value={resistance3}
                  onChange={(e) => setResistance3(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePV2R}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPV2R}>Reset</Button>
              </div>

              {power3 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power3} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power3) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power3) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power3))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours3">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours3"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power3)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = V² / R</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Electric Power</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Choose your calculation method based on what values you know - voltage and current, current and resistance, or voltage and resistance.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter your values in the appropriate fields above.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the power result in watts plus conversions to kilowatts, horsepower, and BTU/hour.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Electric Power Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Electric Power</h4>
            <p className="text-sm text-muted-foreground">
              Electric power measures how fast electrical energy transfers through a circuit. Think of it like water flowing through a pipe - voltage is the pressure pushing the water, current is how much water flows, and power is the total work the water can do. The standard unit is the watt (W), named after James Watt.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Three Ways to Calculate Power</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You can find power using different combinations of electrical values:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">P = V × I</p>
                <p className="text-xs text-muted-foreground">
                  Use when you know voltage and current. Most common for household appliances.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">P = I² × R</p>
                <p className="text-xs text-muted-foreground">
                  Use when you know current and resistance. Common in circuit analysis.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">P = V² / R</p>
                <p className="text-xs text-muted-foreground">
                  Use when you know voltage and resistance. Useful for load calculations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why Power Calculations Matter</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Knowing how much power your devices use helps you size circuits correctly, estimate electricity costs, and avoid overloading outlets. A typical household circuit handles 15-20 amps at 120 volts, giving you 1,800-2,400 watts to work with.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Power Ratings Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Typical Power (W)</TableHead>
                <TableHead>Current at 120V (A)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>LED light bulb</TableCell>
                <TableCell className="font-mono">8-12 W</TableCell>
                <TableCell className="font-mono">0.07-0.1 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Laptop charger</TableCell>
                <TableCell className="font-mono">45-90 W</TableCell>
                <TableCell className="font-mono">0.4-0.75 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Refrigerator</TableCell>
                <TableCell className="font-mono">150-400 W</TableCell>
                <TableCell className="font-mono">1.25-3.3 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Microwave</TableCell>
                <TableCell className="font-mono">800-1,200 W</TableCell>
                <TableCell className="font-mono">6.7-10 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Space heater</TableCell>
                <TableCell className="font-mono">1,500 W</TableCell>
                <TableCell className="font-mono">12.5 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hair dryer</TableCell>
                <TableCell className="font-mono">1,200-1,875 W</TableCell>
                <TableCell className="font-mono">10-15.6 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Electric oven</TableCell>
                <TableCell className="font-mono">2,000-5,000 W</TableCell>
                <TableCell className="font-mono">16.7-41.7 A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Central AC (3 ton)</TableCell>
                <TableCell className="font-mono">3,500 W</TableCell>
                <TableCell className="font-mono">29 A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Actual power consumption varies by model and usage. Check device labels for exact ratings.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Power Consumption Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { device: "LED Bulb", watts: 10, hours: 8, wh: 80 },
                  { device: "Laptop", watts: 65, hours: 6, wh: 390 },
                  { device: "Fridge", watts: 200, hours: 24, wh: 4800 },
                  { device: "Microwave", watts: 1000, hours: 0.5, wh: 500 },
                  { device: "Space Heater", watts: 1500, hours: 4, wh: 6000 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: "Watt-hours (Wh)", position: "insideBottom", offset: -5 }} />
                <YAxis type="category" dataKey="device" width={100} />
                <Tooltip formatter={(value: number) => `${value} Wh`} />
                <Legend />
                <Bar dataKey="wh" fill="#3b82f6" name="Daily Energy (Wh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            Daily energy use for common devices. Multiply wattage by hours of use to get watt-hours. A typical US household uses 30,000 Wh (30 kWh) per day.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Electric Power Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Basic Power Formula</h4>
            <p className="font-mono text-sm mb-2">P = V × I</p>
            <p className="text-xs text-muted-foreground">
              Power (watts) equals voltage (volts) times current (amps). This is the most direct way to calculate power in DC circuits and AC circuits with resistive loads.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Power from Current and Resistance</h4>
            <p className="font-mono text-sm mb-2">P = I² × R</p>
            <p className="text-xs text-muted-foreground">
              Substitute V = I × R (Ohm's Law) into P = V × I. This form shows that power loss in a resistor increases with the square of current - doubling the current quadruples the power dissipation.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Power from Voltage and Resistance</h4>
            <p className="font-mono text-sm mb-2">P = V² / R</p>
            <p className="text-xs text-muted-foreground">
              Another Ohm's Law substitution. Useful when you know the voltage drop across a component and its resistance. Shows that for a fixed resistance, power increases with the square of voltage.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Energy Consumption</h4>
            <p className="font-mono text-sm mb-2">Energy = Power × Time</p>
            <p className="text-xs text-muted-foreground">
              Energy (watt-hours) equals power (watts) times time (hours). Your electricity bill charges you per kilowatt-hour (kWh), which is 1,000 watt-hours.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate electric power?</h4>
            <p className="text-sm text-muted-foreground">
              Use P = V × I if you know voltage and current. For example, a 120V device drawing 2A uses 240W. If you know resistance instead, use P = I²R or P = V²/R depending on what values you have.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is the difference between watts and watt-hours?</h4>
            <p className="text-sm text-muted-foreground">
              Watts measure power - how fast energy is used right now. Watt-hours measure energy - the total amount used over time. A 100W bulb running for 10 hours uses 1,000 Wh (1 kWh) of energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How many watts can a 15 amp outlet handle?</h4>
            <p className="text-sm text-muted-foreground">
              A 15A outlet at 120V can handle up to 1,800W (15 × 120). For continuous loads like space heaters, use 80% of that - about 1,440W. A 20A outlet handles 2,400W, or 1,920W for continuous use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Does higher wattage always mean more electricity cost?</h4>
            <p className="text-sm text-muted-foreground">
              Higher wattage means faster energy use, but cost depends on how long you run the device. A 1,500W heater running 1 hour costs the same as a 100W bulb running 15 hours. Check your electricity rate - the US average is around 15 cents per kWh.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this calculator for AC circuits?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for resistive loads like heaters and incandescent bulbs. For motors, transformers, or electronics, you need to account for power factor. Real power (watts) = V × I × power factor. Power factor ranges from 0 to 1, with 1 being purely resistive.
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
            <a href="/calculators/ohms-law-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Ohm's Law Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate voltage, current, and resistance</p>
            </a>
            <a href="/calculators/electrical-load-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Electrical Load Calculator</p>
              <p className="text-xs text-muted-foreground">Size circuits for multiple devices</p>
            </a>
            <a href="/calculators/energy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Energy Calculator</p>
              <p className="text-xs text-muted-foreground">Convert between energy units</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
