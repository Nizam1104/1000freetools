"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
      tempC = (tempC - 32) * 5 / 9;
      dewPointC = (dewPointC - 32) * 5 / 9;
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Humidity Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter air temperature and dew point</p>
                    <p>Input the current air temperature and dew point temperature. Select Celsius or Fahrenheit for your region.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set atmospheric pressure (optional)</p>
                    <p>Standard pressure is 1013.25 hPa. Adjust if you know the local pressure for more accurate results.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View all humidity measurements</p>
                    <p>Results show relative humidity, absolute humidity, specific humidity, and vapor pressure instantly.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Comfort and Health Humidity Levels
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Relative Humidity</th>
                      <th className="text-left py-3 px-2 font-semibold">Comfort Level</th>
                      <th className="text-left py-3 px-2 font-semibold">Health Impact</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Below 30%</td>
                      <td className="py-3 px-2">Too dry</td>
                      <td className="py-3 px-2">Dry skin, irritated eyes, respiratory discomfort</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">30-40%</td>
                      <td className="py-3 px-2">Acceptable</td>
                      <td className="py-3 px-2">May feel dry in winter months</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">Ideal comfort zone</td>
                      <td className="py-3 px-2">Optimal for health and comfort</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">60-70%</td>
                      <td className="py-3 px-2">Slightly humid</td>
                      <td className="py-3 px-2">May feel sticky; mold risk increases</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Above 70%</td>
                      <td className="py-3 px-2">Too humid</td>
                      <td className="py-3 px-2">High mold/mite risk; respiratory issues</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Source: ASHRAE Standard 55 and EPA indoor air quality guidelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Humidity Measurements
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Relative Humidity?</h4>
                  <p>
                    Relative humidity tells you how full the air is with water vapor compared to how much it could hold at that temperature. Warm air holds more moisture than cold air. That is why 50% humidity feels different at 30°C versus 10°C. When RH hits 100%, the air is saturated and condensation forms.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Dew Point Explained</h4>
                  <p>
                    Dew point is the temperature where air becomes saturated and water condenses. If the dew point equals the air temperature, you have fog or dew. Higher dew points mean more moisture in the air. A dew point above 18°C feels humid; above 21°C feels oppressive.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Absolute vs Specific Humidity</h4>
                  <p>
                    Absolute humidity measures water vapor mass per cubic meter of air. It changes with temperature and pressure. Specific humidity measures water vapor per kilogram of moist air. It stays constant as air rises or sinks, making it useful for meteorology.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Vapor Pressure</h4>
                  <p>
                    Vapor pressure is the partial pressure exerted by water vapor in the air. Saturation vapor pressure is the maximum vapor pressure possible at a given temperature. The ratio of actual to saturation vapor pressure gives you relative humidity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Managing Indoor Humidity
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use a hygrometer</p>
                    <p>Keep a digital hygrometer in your main living area. Check it daily during seasonal changes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ventilate during high-moisture activities</p>
                    <p>Run bathroom fans when showering. Use kitchen exhaust when cooking. Open windows when outdoor humidity is lower.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fix moisture sources</p>
                    <p>Repair leaks promptly. Ensure gutters direct water away from your foundation. Grade soil so it slopes away from the house.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use humidifiers and dehumidifiers wisely</p>
                    <p>Run a humidifier in winter if RH drops below 30%. Use a dehumidifier in basements or during humid summers to keep RH below 60%.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a comfortable indoor humidity level?</h4>
                  <p>
                    Most people feel comfortable between 40% and 60% relative humidity. Below 30%, you may notice dry skin and static electricity. Above 60%, the air feels sticky and mold can grow. The EPA recommends keeping indoor humidity between 30% and 50% for health and comfort.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I calculate relative humidity from dew point?</h4>
                  <p>
                    Use the Magnus formula: first calculate saturation vapor pressure at both the air temperature and dew point. Then divide the actual vapor pressure (from dew point) by the saturation vapor pressure (from air temperature) and multiply by 100. This calculator does it automatically.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why does humidity matter for HVAC systems?</h4>
                  <p>
                    Humidity affects how warm or cool air feels. High humidity makes cooling less efficient because sweat does not evaporate well. Low humidity makes heating feel less effective because dry air conducts heat away from skin faster. Proper humidity control improves comfort and reduces energy costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What causes high indoor humidity?</h4>
                  <p>
                    Common sources include cooking, showering, breathing, houseplants, and drying clothes indoors. Poor ventilation traps moisture. Basements and crawl spaces often have high humidity from ground moisture. Leaky pipes or roof leaks add significant water vapor.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can humidity be too low?</h4>
                  <p>
                    Yes. Humidity below 30% causes dry skin, irritated eyes, and nosebleeds. It increases susceptibility to colds and flu. Low humidity damages wood furniture and musical instruments. Static electricity becomes a problem. Winter air often needs humidification to stay healthy.
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
                  href="/calculators/hvac-btu-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">HVAC BTU Calculator</span>
                  <p className="text-muted-foreground">Size your air conditioner based on room dimensions and climate</p>
                </a>
                <a
                  href="/calculators/hvac-airflow-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">HVAC Airflow Calculator</span>
                  <p className="text-muted-foreground">Calculate required CFM for proper room ventilation</p>
                </a>
                <a
                  href="/calculators/indoor-co-level-estimator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Indoor CO2 Level Estimator</span>
                  <p className="text-muted-foreground">Estimate indoor air quality based on occupancy and ventilation</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
