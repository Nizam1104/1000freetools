"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
      tempC = (tempC - 32) * 5 / 9;
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

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How to Use This Air Density Calculator</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>Enter the temperature and select your preferred unit (Celsius or Fahrenheit). For standard conditions, use 15°C (59°F).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <span>Input the atmospheric pressure in hPa, inHg, mmHg, or atm. Standard sea level pressure is 1013.25 hPa.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>Set the relative humidity percentage and altitude in meters, then click Calculate to see the air density result.</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Air Density</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Air density is the mass of air per unit volume, typically measured in kilograms per cubic meter (kg/m³). It tells you how much air molecules are packed into a given space. The denser the air, the more molecules are present in each cubic meter.
              </p>
              <p>
                Air density follows the ideal gas law, which describes the relationship between pressure, temperature, and volume for gases. This fundamental physics principle explains why air behaves differently under various atmospheric conditions.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Temperature Effect</h4>
                  <p className="text-sm">As temperature increases, air molecules move faster and spread apart, making the air less dense. Cold air is denser than warm air.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Pressure Effect</h4>
                  <p className="text-sm">Higher pressure compresses air molecules closer together, increasing density. Lower pressure allows molecules to spread out.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Humidity Effect</h4>
                  <p className="text-sm">Water vapor is lighter than dry air molecules. More humidity means lower air density, though the effect is relatively small.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Air Density Formula</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-mono text-center text-primary">ρ = P / (R × T)</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Where:</p>
                  <ul className="space-y-1 text-muted-foreground mt-2">
                    <li><strong>ρ</strong> = air density (kg/m³)</li>
                    <li><strong>P</strong> = atmospheric pressure (Pa)</li>
                    <li><strong>R</strong> = specific gas constant for air (287.058 J/(kg·K))</li>
                    <li><strong>T</strong> = absolute temperature (Kelvin)</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2">Standard Reference</p>
                  <p className="text-muted-foreground">
                    At sea level with standard atmospheric conditions (15°C, 1013.25 hPa), air density is:
                  </p>
                  <p className="text-xl font-bold text-primary mt-2">1.225 kg/m³</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                This calculator uses an enhanced formula that accounts for humidity by treating moist air as a mixture of dry air and water vapor, each with their own gas constants.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Air Density at Different Conditions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 pr-4">Altitude</th>
                    <th className="text-left py-3 pr-4">Temperature</th>
                    <th className="text-left py-3">Air Density</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Sea level</td>
                    <td className="py-3 pr-4">15°C</td>
                    <td className="py-3 font-mono font-semibold">1.225 kg/m³</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Sea level</td>
                    <td className="py-3 pr-4">30°C</td>
                    <td className="py-3 font-mono">1.164 kg/m³</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">1000m</td>
                    <td className="py-3 pr-4">15°C</td>
                    <td className="py-3 font-mono">1.112 kg/m³</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">2000m</td>
                    <td className="py-3 pr-4">15°C</td>
                    <td className="py-3 font-mono">1.007 kg/m³</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">3000m</td>
                    <td className="py-3 pr-4">15°C</td>
                    <td className="py-3 font-mono">0.909 kg/m³</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Why Air Density Matters</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Aircraft Performance
                </h4>
                <p className="text-sm text-muted-foreground">
                  Denser air provides more lift for wings and more oxygen for engines. Pilots must account for density altitude when calculating takeoff distances and climb rates.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Weather Patterns
                </h4>
                <p className="text-sm text-muted-foreground">
                  Air density differences drive atmospheric circulation, wind formation, and weather systems. Meteorologists use density data for forecasting.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Engine Tuning
                </h4>
                <p className="text-sm text-muted-foreground">
                  Internal combustion engines produce more power in dense air. Racing teams and tuners adjust fuel-air mixtures based on air density conditions.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Wind Turbine Efficiency
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wind turbine power output is directly proportional to air density. Colder, denser air generates more electricity from the same wind speed.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg sm:col-span-2">
                <h4 className="font-semibold mb-2">Sports Ball Flight</h4>
                <p className="text-sm text-muted-foreground">
                  Baseballs, golf balls, and soccer balls travel farther in thin air (high altitude, hot weather). Athletes and coaches account for air density when training at different elevations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What is the density of air at sea level?</h3>
                <p className="text-muted-foreground">
                  At standard sea level conditions (15°C, 1013.25 hPa), air density is 1.225 kg/m³ (0.0765 lb/ft³). This is the International Standard Atmosphere (ISA) reference value used in aviation and engineering.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does air density change with temperature?</h3>
                <p className="text-muted-foreground">
                  Yes. As temperature increases, air molecules gain energy and spread apart, reducing density. For example, air at 30°C is about 5% less dense than air at 15°C at the same pressure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Why is air less dense at higher altitudes?</h3>
                <p className="text-muted-foreground">
                  Atmospheric pressure decreases with altitude because there is less air above pushing down. Lower pressure means air molecules are less compressed, resulting in lower density. At 3000m, air density is about 25% lower than at sea level.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How does humidity affect air density?</h3>
                <p className="text-muted-foreground">
                  Humid air is actually less dense than dry air. Water vapor molecules (H₂O) are lighter than the nitrogen (N₂) and oxygen (O₂) molecules they replace. However, this effect is small compared to temperature and pressure changes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What unit is used for air density?</h3>
                <p className="text-muted-foreground">
                  The SI unit for air density is kilograms per cubic meter (kg/m³). In imperial units, it is measured in pounds per cubic foot (lb/ft³). Some scientific contexts use grams per liter (g/L), where 1 kg/m³ = 1 g/L.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <a href="/calculators/ideal-gas-law-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
                <h4 className="font-semibold mb-1">Ideal Gas Law Calculator</h4>
                <p className="text-sm text-muted-foreground">Calculate pressure, volume, and temperature relationships for gases</p>
              </a>
              <a href="/calculators/pressure-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
                <h4 className="font-semibold mb-1">Pressure Calculator</h4>
                <p className="text-sm text-muted-foreground">Convert between different pressure units and calculate atmospheric pressure</p>
              </a>
              <a href="/calculators/temperature-converter" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
                <h4 className="font-semibold mb-1">Temperature Converter</h4>
                <p className="text-sm text-muted-foreground">Convert between Celsius, Fahrenheit, Kelvin, and other temperature scales</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
