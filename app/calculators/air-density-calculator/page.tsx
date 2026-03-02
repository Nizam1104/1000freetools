"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wind, Info, Thermometer, Gauge } from "lucide-react";

interface AirDensityResult {
  density: number;
  densityImperial: number;
  molarVolume: number;
  altitude: number;
  conditions: string;
}

export default function AirDensityCalculatorPage() {
  const [temperature, setTemperature] = useState<string>("15");
  const [pressure, setPressure] = useState<string>("1013.25");
  const [humidity, setHumidity] = useState<string>("50");
  const [altitude, setAltitude] = useState<string>("0");
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [pressureUnit, setPressureUnit] = useState<"hPa" | "inHg" | "mmHg" | "atm">("hPa");
  const [result, setResult] = useState<AirDensityResult | null>(null);

  const calculateAirDensity = () => {
    let tempC = parseFloat(temperature);
    let pressureHpa = parseFloat(pressure);
    const rh = parseFloat(humidity) || 0;
    const altMeters = parseFloat(altitude) || 0;

    if (isNaN(tempC) || isNaN(pressureHpa)) {
      return;
    }

    if (tempUnit === "fahrenheit") {
      tempC = (tempC - 32) * 5/9;
    }

    if (pressureUnit === "inHg") {
      pressureHpa = pressureHpa * 33.8639;
    } else if (pressureUnit === "mmHg") {
      pressureHpa = pressureHpa * 1.33322;
    } else if (pressureUnit === "atm") {
      pressureHpa = pressureHpa * 1013.25;
    }

    const tempK = tempC + 273.15;

    const saturationVaporPressure = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
    const actualVaporPressure = (rh / 100) * saturationVaporPressure;
    const dryAirPressure = pressureHpa - actualVaporPressure;

    const R_dry = 287.058;
    const R_vapor = 461.495;

    const density = (dryAirPressure * 100) / (R_dry * tempK) + (actualVaporPressure * 100) / (R_vapor * tempK);

    const densityImperial = density * 0.062428;

    const molarVolume = 0.028966 / density;

    let conditions: string;
    if (density > 1.25) conditions = "Dense (cold/high pressure)";
    else if (density > 1.20) conditions = "Above average";
    else if (density > 1.15) conditions = "Average (sea level)";
    else if (density > 1.10) conditions = "Below average";
    else conditions = "Thin (hot/high altitude)";

    setResult({
      density: Math.round(density * 1000) / 1000,
      densityImperial: Math.round(densityImperial * 1000) / 1000,
      molarVolume: Math.round(molarVolume * 1000) / 1000,
      altitude: altMeters,
      conditions,
    });
  };

  const reset = () => {
    setTemperature("15");
    setPressure("1013.25");
    setHumidity("50");
    setAltitude("0");
    setResult(null);
  };

  useEffect(() => {
    calculateAirDensity();
  }, [temperature, pressure, humidity, altitude, tempUnit, pressureUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Air Density Calculator – Calculate Air Density by Temperature & Pressure</h1>
          <p className="text-muted-foreground">
            Calculate the density of air at any altitude, temperature, and pressure with our Air Density Calculator. Essential for aviation, HVAC engineering, meteorology, and aerodynamics calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Atmospheric Conditions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <div className="flex gap-2">
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="e.g., 15"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={tempUnit} onValueChange={(v) => setTempUnit(v as "celsius" | "fahrenheit")}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celsius">°C</SelectItem>
                          <SelectItem value="fahrenheit">°F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressure">Atmospheric Pressure</Label>
                    <div className="flex gap-2">
                      <Input
                        id="pressure"
                        type="number"
                        placeholder="1013.25"
                        value={pressure}
                        onChange={(e) => setPressure(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={pressureUnit} onValueChange={(v) => setPressureUnit(v as "hPa" | "inHg" | "mmHg" | "atm")}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hPa">hPa</SelectItem>
                          <SelectItem value="inHg">inHg</SelectItem>
                          <SelectItem value="mmHg">mmHg</SelectItem>
                          <SelectItem value="atm">atm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Relative Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 50"
                      min="0"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altitude">Altitude (meters)</Label>
                    <Input
                      id="altitude"
                      type="number"
                      placeholder="e.g., 0"
                      value={altitude}
                      onChange={(e) => setAltitude(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Air density decreases with increasing temperature, humidity, and altitude. Standard sea-level density is 1.225 kg/m³.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateAirDensity} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Air Density</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.density} kg/m³</p>
                      <p className="text-lg text-muted-foreground">({result.densityImperial} lb/ft³)</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Conditions</p>
                    <p className="text-lg font-bold">{result.conditions}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Gauge className="h-3 w-3" />
                        Molar Volume
                      </p>
                      <p className="text-lg font-bold">{result.molarVolume} m³/kmol</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        Altitude
                      </p>
                      <p className="text-lg font-bold">{result.altitude} m</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> Ideal Gas Law (with humidity)</p>
                    <p className="font-mono text-xs mt-1">ρ = (P_d / R_d T) + (P_v / R_v T)</p>
                    <p className="text-xs mt-1">
                      R_d = 287.058 J/(kg·K), R_v = 461.495 J/(kg·K)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter conditions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Air Density Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Condition</th>
                    <th className="text-left py-2 pr-4">Density (kg/m³)</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Standard sea level (15°C)</td>
                    <td className="py-2 pr-4 font-mono">1.225</td>
                    <td className="py-2">ISA standard atmosphere</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Hot day (35°C)</td>
                    <td className="py-2 pr-4 font-mono">1.146</td>
                    <td className="py-2">Reduced engine performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Cold day (-10°C)</td>
                    <td className="py-2 pr-4 font-mono">1.341</td>
                    <td className="py-2">Improved engine performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">1000m altitude</td>
                    <td className="py-2 pr-4 font-mono">1.112</td>
                    <td className="py-2">~10% density reduction</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">3000m altitude</td>
                    <td className="py-2 pr-4 font-mono">0.909</td>
                    <td className="py-2">~25% density reduction</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">5000m altitude</td>
                    <td className="py-2 pr-4 font-mono">0.736</td>
                    <td className="py-2">~40% density reduction</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
