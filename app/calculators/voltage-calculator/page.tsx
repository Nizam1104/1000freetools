"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VoltageCalculator() {
  // Mode 1: V = IR
  const [current1, setCurrent1] = useState<string>("");
  const [resistance1, setResistance1] = useState<string>("");
  const [voltage1, setVoltage1] = useState<number | null>(null);
  const [power1, setPower1] = useState<number | null>(null);

  // Mode 2: V = P/I
  const [power2, setPower2] = useState<string>("");
  const [current2, setCurrent2] = useState<string>("");
  const [voltage2, setVoltage2] = useState<number | null>(null);
  const [resistance2, setResistance2] = useState<number | null>(null);

  // Mode 3: V = sqrt(PR)
  const [power3, setPower3] = useState<string>("");
  const [resistance3, setResistance3] = useState<string>("");
  const [voltage3, setVoltage3] = useState<number | null>(null);
  const [current3, setCurrent3] = useState<number | null>(null);

  // Output unit
  const [outputUnit, setOutputUnit] = useState<"V" | "mV" | "kV">("V");

  const calculateVIR = () => {
    const I = parseFloat(current1);
    const R = parseFloat(resistance1);

    if (isNaN(I) || isNaN(R) || I <= 0 || R <= 0) return;

    const V = I * R;
    const P = V * I;
    setVoltage1(V);
    setPower1(Math.round(P * 100) / 100);
  };

  const calculateVPI = () => {
    const P = parseFloat(power2);
    const I = parseFloat(current2);

    if (isNaN(P) || isNaN(I) || P <= 0 || I <= 0) return;

    const V = P / I;
    const R = V / I;
    setVoltage2(V);
    setResistance2(Math.round(R * 100) / 100);
  };

  const calculateVPR = () => {
    const P = parseFloat(power3);
    const R = parseFloat(resistance3);

    if (isNaN(P) || isNaN(R) || P <= 0 || R <= 0) return;

    const V = Math.sqrt(P * R);
    const I = V / R;
    setVoltage3(V);
    setCurrent3(Math.round(I * 1000) / 1000);
  };

  const resetVIR = () => {
    setCurrent1("");
    setResistance1("");
    setVoltage1(null);
    setPower1(null);
  };

  const resetVPI = () => {
    setPower2("");
    setCurrent2("");
    setVoltage2(null);
    setResistance2(null);
  };

  const resetVPR = () => {
    setPower3("");
    setResistance3("");
    setVoltage3(null);
    setCurrent3(null);
  };

  // Convert voltage to output unit
  const convertVoltage = (v: number): number => {
    switch (outputUnit) {
      case "mV":
        return v * 1000;
      case "kV":
        return v / 1000;
      default:
        return v;
    }
  };

  const getUnitLabel = () => {
    switch (outputUnit) {
      case "mV":
        return "mV";
      case "kV":
        return "kV";
      default:
        return "V";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <Tabs defaultValue="vir" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vir">V = IR</TabsTrigger>
              <TabsTrigger value="vpi">V = P/I</TabsTrigger>
              <TabsTrigger value="vpr">V = √(PR)</TabsTrigger>
            </TabsList>

            <TabsContent value="vir" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="current1">Current (A)</Label>
                <Input
                  id="current1"
                  type="number"
                  placeholder="e.g., 2"
                  value={current1}
                  onChange={(e) => setCurrent1(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance1">Resistance (Ω)</Label>
                <Input
                  id="resistance1"
                  type="number"
                  placeholder="e.g., 60"
                  value={resistance1}
                  onChange={(e) => setResistance1(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateVIR}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVIR}>Reset</Button>
              </div>

              {voltage1 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage1) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Power</p>
                    <p className="text-lg font-medium">{power1} W</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = I × R</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vpi" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="power2">Power (W)</Label>
                <Input
                  id="power2"
                  type="number"
                  placeholder="e.g., 240"
                  value={power2}
                  onChange={(e) => setPower2(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="current2">Current (A)</Label>
                <Input
                  id="current2"
                  type="number"
                  placeholder="e.g., 2"
                  value={current2}
                  onChange={(e) => setCurrent2(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateVPI}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVPI}>Reset</Button>
              </div>

              {voltage2 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage2) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Resistance</p>
                    <p className="text-lg font-medium">{resistance2} Ω</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = P / I</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vpr" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="power3">Power (W)</Label>
                <Input
                  id="power3"
                  type="number"
                  placeholder="e.g., 60"
                  value={power3}
                  onChange={(e) => setPower3(e.target.value)}
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
                <Button onClick={calculateVPR}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVPR}>Reset</Button>
              </div>

              {voltage3 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage3) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Current</p>
                    <p className="text-lg font-medium">{current3} A</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = √(P × R)</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-4 pt-4 border-t">
            <Label>Output Unit</Label>
            <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "V" | "mV" | "kV")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="V">Volts (V)</SelectItem>
                <SelectItem value="mV">Millivolts (mV)</SelectItem>
                <SelectItem value="kV">Kilovolts (kV)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Voltage</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Choose Calculation Method</h3>
              <p className="text-sm text-muted-foreground">Select from three methods: V = IR (Ohm&apos;s Law), V = P/I (from power), or V = √(PR) (from power and resistance).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Known Values</h3>
              <p className="text-sm text-muted-foreground">Input the values you know - current and resistance, power and current, or power and resistance.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Instant Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see voltage plus secondary results like power or resistance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Voltage Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Three Calculation Methods**</h3>
            <p className="text-sm text-muted-foreground">Calculate voltage using Ohm&apos;s Law (V=IR), from power and current (V=P/I), or from power and resistance (V=√PR).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Multiple Unit Options**</h3>
            <p className="text-sm text-muted-foreground">Display results in Volts (V), Millivolts (mV), or Kilovolts (kV) for any application.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Secondary Calculations**</h3>
            <p className="text-sm text-muted-foreground">Each method also computes related values like power or resistance for complete circuit analysis.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Educational**</h3>
            <p className="text-sm text-muted-foreground">Perfect for students, electricians, and hobbyists learning electrical fundamentals.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is Ohm&apos;s Law?</h3>
            <p className="text-sm text-muted-foreground">Ohm&apos;s Law states that voltage equals current times resistance (V = I × R). It&apos;s the fundamental relationship in electrical circuits discovered by Georg Ohm in 1827.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I calculate voltage from power?</h3>
            <p className="text-sm text-muted-foreground">If you know power and current, use V = P/I. If you know power and resistance, use V = √(P × R). Both formulas derive from the power equation P = VI.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the difference between AC and DC voltage?</h3>
            <p className="text-sm text-muted-foreground">DC (direct current) voltage flows in one direction (batteries). AC (alternating current) voltage reverses direction periodically (wall outlets). This calculator works for both types.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I convert between voltage units?</h3>
            <p className="text-sm text-muted-foreground">1 kilovolt (kV) = 1,000 volts. 1 volt = 1,000 millivolts (mV). To convert V to kV, divide by 1,000. To convert V to mV, multiply by 1,000.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What voltage is dangerous?</h3>
            <p className="text-sm text-muted-foreground">Voltages above 50V AC or 120V DC can be dangerous. Always follow safety protocols when working with electrical circuits. Consult a qualified electrician for high-voltage work.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/ohms-law-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Ohm&apos;s Law Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate voltage, current, resistance, and power for complete circuit analysis.</p>
          </a>
          <a href="/calculators/power-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Power Calculator</h3>
            <p className="text-sm text-muted-foreground">Compute electrical power from voltage, current, or resistance values.</p>
          </a>
          <a href="/calculators/resistance-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Resistance Calculator</h3>
            <p className="text-sm text-muted-foreground">Find resistance from voltage and current or from conductor properties.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
