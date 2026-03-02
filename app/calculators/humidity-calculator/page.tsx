"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Info } from "lucide-react";

interface HumidityResult {
  relativeHumidity: number;
  absoluteHumidity: number;
  specificHumidity: number;
  vaporPressure: number;
  saturationVaporPressure: number;
}

export default function HumidityCalculatorPage() {
  const [temperature, setTemperature] = useState<string>("");
  const [dewPoint, setDewPoint] = useState<string>("");
  const [actualVaporPressure, setActualVaporPressure] = useState<string>("");
  const [saturationVaporPressure, setSaturationVaporPressure] = useState<string>("");
  const [pressure, setPressure] = useState<string>("1013.25");
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [pressureUnit, setPressureUnit] = useState<"hPa" | "inHg" | "mmHg">("hPa");
  const [result, setResult] = useState<HumidityResult | null>(null);
  const [vaporResult, setVaporResult] = useState<number | null>(null);

  const calculateHumidity = () => {
    let tempC = parseFloat(temperature);
    let dewPointC = parseFloat(dewPoint);
    let pressureHpa = parseFloat(pressure);

    if (isNaN(tempC) || isNaN(dewPointC) || isNaN(pressureHpa)) {
      return;
    }

    if (tempUnit === "fahrenheit") {
      tempC = (tempC - 32) * 5/9;
      dewPointC = (dewPointC - 32) * 5/9;
    }

    if (pressureUnit === "inHg") {
      pressureHpa = pressureHpa * 33.8639;
    } else if (pressureUnit === "mmHg") {
      pressureHpa = pressureHpa * 1.33322;
    }

    const saturationVaporPressure = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
    const actualVaporPress = 6.112 * Math.exp((17.67 * dewPointC) / (dewPointC + 243.5));

    const relativeHumidity = (actualVaporPress / saturationVaporPressure) * 100;

    const absoluteHumidity = (100 * actualVaporPress) / (461.5 * (tempC + 273.15));

    const specificHumidity = (0.622 * actualVaporPress) / (pressureHpa - (0.378 * actualVaporPress));

    setResult({
      relativeHumidity: Math.round(relativeHumidity * 10) / 10,
      absoluteHumidity: Math.round(absoluteHumidity * 100) / 100,
      specificHumidity: Math.round(specificHumidity * 1000) / 1000,
      vaporPressure: Math.round(actualVaporPress * 100) / 100,
      saturationVaporPressure: Math.round(saturationVaporPressure * 100) / 100,
    });
  };

  const calculateFromVapor = () => {
    const actual = parseFloat(actualVaporPressure);
    const saturation = parseFloat(saturationVaporPressure);
    if (isNaN(actual) || isNaN(saturation) || saturation === 0) return;
    setVaporResult(Math.round((actual / saturation) * 100 * 10) / 10);
  };

  const reset = () => {
    setTemperature("");
    setDewPoint("");
    setActualVaporPressure("");
    setSaturationVaporPressure("");
    setPressure("1013.25");
    setResult(null);
    setVaporResult(null);
  };

  useEffect(() => {
    calculateHumidity();
  }, [temperature, dewPoint, pressure, tempUnit, pressureUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Humidity Calculator – Calculate Relative, Absolute & Specific Humidity</h1>
          <p className="text-muted-foreground">
            Calculate various humidity measurements with our comprehensive Humidity Calculator. Enter temperature and dew point to determine relative humidity, absolute humidity, specific humidity, and vapor pressure — essential for meteorology, HVAC, and environmental monitoring.
          </p>
        </div>

        <Tabs defaultValue="dewpoint" className="mb-6">
          <TabsList>
            <TabsTrigger value="dewpoint">From Dew Point</TabsTrigger>
            <TabsTrigger value="vapor">From Vapor Pressure</TabsTrigger>
          </TabsList>

          <TabsContent value="dewpoint">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Air Temperature</Label>
                        <div className="flex gap-2">
                          <Input
                            id="temperature"
                            type="number"
                            placeholder="e.g., 25"
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
                        <Label htmlFor="dewPoint">Dew Point</Label>
                        <Input
                          id="dewPoint"
                          type="number"
                          placeholder="e.g., 15"
                          value={dewPoint}
                          onChange={(e) => setDewPoint(e.target.value)}
                        />
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
                          <Select value={pressureUnit} onValueChange={(v) => setPressureUnit(v as "hPa" | "inHg" | "mmHg")}>
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hPa">hPa</SelectItem>
                              <SelectItem value="inHg">inHg</SelectItem>
                              <SelectItem value="mmHg">mmHg</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={calculateHumidity} className="flex-1">
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
                        <p className="text-sm text-muted-foreground">Relative Humidity</p>
                        <p className="text-4xl font-bold text-primary">{result.relativeHumidity}%</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">Absolute Humidity</p>
                          <p className="text-lg font-bold">{result.absoluteHumidity} g/m³</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">Specific Humidity</p>
                          <p className="text-lg font-bold">{result.specificHumidity} g/kg</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">Vapor Pressure</p>
                          <p className="text-lg font-bold">{result.vaporPressure} hPa</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">Saturation Vapor Pressure</p>
                          <p className="text-lg font-bold">{result.saturationVaporPressure} hPa</p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground pt-4 border-t">
                        <p><strong>Formulas:</strong></p>
                        <p className="font-mono text-xs mt-1">RH = (e/es) × 100%</p>
                        <p className="font-mono text-xs">AH = (100 × e) / (461.5 × T)</p>
                        <p className="font-mono text-xs">SH = (0.622 × e) / (P - 0.378e)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Enter temperature and dew point to calculate humidity</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vapor">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="actualVapor">Actual Vapor Pressure (hPa)</Label>
                  <Input
                    id="actualVapor"
                    type="number"
                    placeholder="e.g., 20"
                    value={actualVaporPressure}
                    onChange={(e) => setActualVaporPressure(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="satVapor">Saturation Vapor Pressure (hPa)</Label>
                  <Input
                    id="satVapor"
                    type="number"
                    placeholder="e.g., 30"
                    value={saturationVaporPressure}
                    onChange={(e) => setSaturationVaporPressure(e.target.value)}
                  />
                </div>
                <Button onClick={calculateFromVapor} className="w-full">
                  Calculate Relative Humidity
                </Button>
                {vaporResult && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Relative Humidity</p>
                    <p className="text-4xl font-bold text-primary">{vaporResult}%</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Humidity Types Explained
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Relative Humidity (RH)</p>
                <p>Ratio of actual water vapor to maximum possible at that temperature, expressed as percentage.</p>
                <p className="font-mono text-xs mt-2">RH = (e/es) × 100%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Absolute Humidity (AH)</p>
                <p>Mass of water vapor per unit volume of air (g/m³).</p>
                <p className="font-mono text-xs mt-2">AH = m_vapor / V_air</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Specific Humidity (SH)</p>
                <p>Mass of water vapor per unit mass of moist air (g/kg).</p>
                <p className="font-mono text-xs mt-2">SH = m_vapor / m_total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
