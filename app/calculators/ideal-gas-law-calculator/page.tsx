"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IdealGasLawCalculator() {
  const [solveFor, setSolveFor] = useState<"P" | "V" | "n" | "T">("P");
  const [pressure, setPressure] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [moles, setMoles] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const R = 8.314; // Ideal gas constant J/(mol·K)

  const calculate = () => {
    const P = parseFloat(pressure);
    const V = parseFloat(volume);
    const n = parseFloat(moles);
    const T = parseFloat(temperature) + 273.15; // Convert to Kelvin

    switch (solveFor) {
      case "P":
        if (n > 0 && T > 0 && V > 0) {
          const result = (n * R * T) / V;
          setResults({ value: result, unit: "Pa", label: "Pressure" });
        }
        break;
      case "V":
        if (n > 0 && T > 0 && P > 0) {
          const result = (n * R * T) / P;
          setResults({ value: result, unit: "m³", label: "Volume" });
        }
        break;
      case "n":
        if (P > 0 && V > 0 && T > 0) {
          const result = (P * V) / (R * T);
          setResults({ value: result, unit: "mol", label: "Amount of Substance" });
        }
        break;
      case "T":
        if (P > 0 && V > 0 && n > 0) {
          const result = (P * V) / (n * R);
          setResults({ value: result - 273.15, unit: "°C", label: "Temperature" });
        }
        break;
    }
  };

  const reset = () => {
    setPressure(""); setVolume(""); setMoles(""); setTemperature("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Solve For</Label>
              <Select value={solveFor} onValueChange={(v) => setSolveFor(v as typeof solveFor)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P">Pressure (P)</SelectItem>
                  <SelectItem value="V">Volume (V)</SelectItem>
                  <SelectItem value="n">Amount (n)</SelectItem>
                  <SelectItem value="T">Temperature (T)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {solveFor !== "P" && (
                <div><Label>Pressure (Pa)</Label><Input value={pressure} onChange={e => setPressure(e.target.value)} /></div>
              )}
              {solveFor !== "V" && (
                <div><Label>Volume (m³)</Label><Input value={volume} onChange={e => setVolume(e.target.value)} /></div>
              )}
              {solveFor !== "n" && (
                <div><Label>Moles (mol)</Label><Input value={moles} onChange={e => setMoles(e.target.value)} /></div>
              )}
              {solveFor !== "T" && (
                <div><Label>Temperature (°C)</Label><Input value={temperature} onChange={e => setTemperature(e.target.value)} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 100) / 100 : results.value} {results.unit}</p>
                <p className="text-xs text-muted-foreground mt-2">PV = nRT, R = 8.314 J/(mol·K)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Ideal Gas Law Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose which variable to solve for</p>
                  <p>Select pressure (P), volume (V), amount of substance (n), or temperature (T) from the dropdown menu.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the three known values</p>
                  <p>Fill in the remaining fields. Temperature is entered in Celsius and converted to Kelvin automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your calculated result</p>
                  <p>The calculator applies PV = nRT to find the unknown variable with proper SI units.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Gas Properties Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Gas</th>
                    <th className="text-left py-3 px-2 font-semibold">Molar Mass (g/mol)</th>
                    <th className="text-left py-3 px-2 font-semibold">Boiling Point (°C)</th>
                    <th className="text-left py-3 px-2 font-semibold">Density at STP (g/L)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Helium (He)</td>
                    <td className="py-3 px-2">4.00</td>
                    <td className="py-3 px-2">-268.9</td>
                    <td className="py-3 px-2">0.179</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Nitrogen (N₂)</td>
                    <td className="py-3 px-2">28.01</td>
                    <td className="py-3 px-2">-195.8</td>
                    <td className="py-3 px-2">1.25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Oxygen (O₂)</td>
                    <td className="py-3 px-2">32.00</td>
                    <td className="py-3 px-2">-183.0</td>
                    <td className="py-3 px-2">1.43</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Carbon Dioxide (CO₂)</td>
                    <td className="py-3 px-2">44.01</td>
                    <td className="py-3 px-2">-78.5 (sublimes)</td>
                    <td className="py-3 px-2">1.98</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Hydrogen (H₂)</td>
                    <td className="py-3 px-2">2.02</td>
                    <td className="py-3 px-2">-252.9</td>
                    <td className="py-3 px-2">0.090</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Methane (CH₄)</td>
                    <td className="py-3 px-2">16.04</td>
                    <td className="py-3 px-2">-161.5</td>
                    <td className="py-3 px-2">0.717</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Air (average)</td>
                    <td className="py-3 px-2">28.97</td>
                    <td className="py-3 px-2">-194.3</td>
                    <td className="py-3 px-2">1.29</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              STP = Standard Temperature and Pressure (0°C, 1 atm or 101.325 kPa)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding the Ideal Gas Law
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is the Ideal Gas Law?</h4>
                <p>
                  The ideal gas law relates pressure, volume, temperature, and amount of gas in one equation: PV = nRT. It combines Boyle's law, Charles's law, Avogadro's law, and Gay-Lussac's law. Real gases behave like ideal gases at high temperatures and low pressures.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Variables Explained</h4>
                <p>
                  P is pressure in pascals (Pa). V is volume in cubic meters (m³). n is the amount of substance in moles (mol). T is absolute temperature in kelvin (K). R is the universal gas constant, 8.314 J/(mol·K).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Temperature Must Be in Kelvin</h4>
                <p>
                  The ideal gas law requires absolute temperature. Convert Celsius to Kelvin by adding 273.15. Zero kelvin (absolute zero) is -273.15°C, the point where molecular motion theoretically stops. This calculator handles the conversion for you.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When Real Gases Deviate</h4>
                <p>
                  Ideal gas behavior breaks down at high pressures or low temperatures. Gas molecules have volume and attract each other. The van der Waals equation corrects for these effects. For most classroom problems and moderate conditions, the ideal gas law works well.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Gas Law Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Watch your units</p>
                  <p>Always convert to SI units before calculating: pascals for pressure, cubic meters for volume, kelvin for temperature. This calculator uses SI units internally.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know your gas constant</p>
                  <p>R = 8.314 J/(mol·K) when using pascals and cubic meters. If using atmospheres and liters, R = 0.0821 L·atm/(mol·K). Match R to your units.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use molar mass to find moles</p>
                  <p>If you have mass instead of moles, divide by molar mass: n = mass / molar mass. For example, 32 g of O₂ equals 1 mole (32 g ÷ 32 g/mol).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check if your answer makes sense</p>
                  <p>Does the pressure seem reasonable? Is the volume plausible? If you get negative kelvin or impossible values, recheck your inputs and unit conversions.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is the ideal gas law used for?</h4>
                <p>
                  The ideal gas law predicts how gases behave when conditions change. Chemists use it to calculate reactant volumes in gas reactions. Engineers apply it to design pneumatic systems. Meteorologists use it to model atmospheric behavior.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the value of R in the ideal gas law?</h4>
                <p>
                  R equals 8.314 J/(mol·K) in SI units. This is the most common value for physics and chemistry calculations. In other unit systems: 0.0821 L·atm/(mol·K), 62.36 L·torr/(mol·K), or 1.987 cal/(mol·K).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When does the ideal gas law not work?</h4>
                <p>
                  The ideal gas law fails at very high pressures (molecules are crowded) or very low temperatures (molecules attract strongly). Near the condensation point, real gases deviate significantly. The van der Waals equation handles these cases better.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I convert between pressure units?</h4>
                <p>
                  1 atm = 101,325 Pa = 101.325 kPa = 760 mmHg = 760 torr = 14.7 psi. To convert, multiply by the appropriate factor. For example, 2 atm × 101,325 = 202,650 Pa.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is molar volume at STP?</h4>
                <p>
                  At standard temperature and pressure (0°C, 1 atm), one mole of any ideal gas occupies 22.4 liters. This is useful for quick estimates. At SATP (25°C, 1 bar), molar volume is about 24.8 L/mol.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/humidity-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Humidity Calculator</span>
                <p className="text-muted-foreground">Calculate water vapor properties in air</p>
              </a>
              <a
                href="/calculators/indoor-co-level-estimator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Indoor CO2 Level Estimator</span>
                <p className="text-muted-foreground">Estimate carbon dioxide concentration in rooms</p>
              </a>
              <a
                href="/calculators/hvac-airflow-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">HVAC Airflow Calculator</span>
                <p className="text-muted-foreground">Calculate ventilation requirements for spaces</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
