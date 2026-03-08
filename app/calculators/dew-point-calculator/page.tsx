"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Droplets, Thermometer, Info, Cloud, CloudRain } from "lucide-react";

interface DewPointResult {
  dewPoint: number;
  dewPointCelsius: number;
  comfort: string;
  humidityRatio: number;
  condensationTemp: number;
}

export default function DewPointCalculatorPage() {
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<"fahrenheit" | "celsius">("fahrenheit");
  const [result, setResult] = useState<DewPointResult | null>(null);

  const calculateDewPoint = () => {
    let tempC = parseFloat(temperature);
    const rh = parseFloat(humidity);

    if (isNaN(tempC) || isNaN(rh) || rh < 0 || rh > 100) {
      return;
    }

    if (tempUnit === "fahrenheit") {
      tempC = (tempC - 32) * 5 / 9;
    }

    const a = 17.27;
    const b = 237.7;

    const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
    const dewPointC = (b * alpha) / (a - alpha);

    const dewPointF = (dewPointC * 9 / 5) + 32;

    const humidityRatio = 0.622 * (6.112 * Math.exp((17.67 * dewPointC) / (dewPointC + 243.5))) / 1013.25;

    let comfort: string;
    if (dewPointF < 50) comfort = "Dry/Comfortable";
    else if (dewPointF < 60) comfort = "Comfortable";
    else if (dewPointF < 65) comfort = "Slightly Humid";
    else if (dewPointF < 70) comfort = "Humid";
    else if (dewPointF < 75) comfort = "Very Humid";
    else comfort = "Extremely Uncomfortable";

    setResult({
      dewPoint: Math.round(dewPointF * 10) / 10,
      dewPointCelsius: Math.round(dewPointC * 10) / 10,
      comfort,
      humidityRatio: Math.round(humidityRatio * 10000) / 10000,
      condensationTemp: Math.round(dewPointF),
    });
  };

  const reset = () => {
    setTemperature("");
    setHumidity("");
    setResult(null);
  };

  useEffect(() => {
    calculateDewPoint();
  }, [temperature, humidity, tempUnit]);

  const getComfortColor = (comfort: string) => {
    if (comfort.includes("Comfortable") || comfort.includes("Dry")) return "text-green-500 bg-green-500/10";
    if (comfort.includes("Slightly") || comfort.includes("Humid")) return "text-yellow-500 bg-yellow-500/10";
    if (comfort.includes("Very")) return "text-orange-500 bg-orange-500/10";
    return "text-destructive bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dew Point Calculator – Calculate Dew Point from Temperature & Humidity</h1>
          <p className="text-muted-foreground">
            Calculate the dew point temperature instantly with our free Dew Point Calculator. Enter air temperature and relative humidity to determine when condensation will form — useful for weather forecasting, HVAC, and agriculture.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Air Temperature</Label>
                    <div className="flex gap-2">
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="e.g., 75"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={tempUnit} onValueChange={(v) => setTempUnit(v as "fahrenheit" | "celsius")}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fahrenheit">°F</SelectItem>
                          <SelectItem value="celsius">°C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Relative Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 65"
                      min="0"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Dew point is the temperature at which air becomes saturated and water vapor condenses into liquid water.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDewPoint} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Dew Point Temperature</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.dewPoint}°F</p>
                      <p className="text-lg text-muted-foreground">({result.dewPointCelsius}°C)</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${getComfortColor(result.comfort)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-5 w-5" />
                      <p className="font-semibold">Comfort Level</p>
                    </div>
                    <p className="text-lg">{result.comfort}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Cloud className="h-3 w-3" />
                        Humidity Ratio
                      </p>
                      <p className="text-lg font-bold">{result.humidityRatio} kg/kg</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <CloudRain className="h-3 w-3" />
                        Condensation At
                      </p>
                      <p className="text-lg font-bold">{result.condensationTemp}°F</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> Magnus Formula</p>
                    <p className="font-mono text-xs mt-1">
                      Td = (b × α) / (a - α)
                    </p>
                    <p className="text-xs mt-1">
                      where α = (aT)/(b+T) + ln(RH/100), a=17.27, b=237.7°C
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter temperature and humidity to calculate dew point</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Dew Point Comfort Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Dew Point</th>
                    <th className="text-left py-2 pr-4">Comfort Level</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Below 50°F</td>
                    <td className="py-2 pr-4 text-green-500 font-medium">Dry/Comfortable</td>
                    <td className="py-2">Very comfortable, dry air</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">50-60°F</td>
                    <td className="py-2 pr-4 text-green-500 font-medium">Comfortable</td>
                    <td className="py-2">Most people feel comfortable</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">60-65°F</td>
                    <td className="py-2 pr-4 text-yellow-500 font-medium">Slightly Humid</td>
                    <td className="py-2">Starting to feel humid</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">65-70°F</td>
                    <td className="py-2 pr-4 text-orange-500 font-medium">Humid</td>
                    <td className="py-2">Uncomfortable for most people</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">70-75°F</td>
                    <td className="py-2 pr-4 text-red-500 font-medium">Very Humid</td>
                    <td className="py-2">Very uncomfortable, oppressive</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Above 75°F</td>
                    <td className="py-2 pr-4 text-destructive font-medium">Extremely Uncomfortable</td>
                    <td className="py-2">Dangerous for sensitive individuals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Dew Point Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the air temperature</p>
                    <p>Type the current air temperature in Fahrenheit or Celsius. This is the ambient temperature you measure with a thermometer.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input the relative humidity percentage</p>
                    <p>Enter the relative humidity as a percentage (0-100%). You can find this from a weather app or hygrometer.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Read your dew point and comfort level</p>
                    <p>The calculator instantly shows the dew point temperature and tells you how humid it feels. Use this to plan outdoor activities or check for condensation risk.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dew Point and Relative Humidity Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Dew Point Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Comfort Level</th>
                      <th className="text-left py-3 px-2 font-semibold">What It Feels Like</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Below 50 F (10 C)</td>
                      <td className="py-3 px-2 text-green-500 font-medium">Dry/Comfortable</td>
                      <td className="py-3 px-2">Crisp, dry air. Very comfortable for most people.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">50-59 F (10-15 C)</td>
                      <td className="py-3 px-2 text-green-500 font-medium">Comfortable</td>
                      <td className="py-3 px-2">Pleasant humidity. Most people feel comfortable.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">60-64 F (16-18 C)</td>
                      <td className="py-3 px-2 text-yellow-500 font-medium">Slightly Humid</td>
                      <td className="py-3 px-2">Starting to feel sticky. Noticeable moisture in the air.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">65-69 F (18-21 C)</td>
                      <td className="py-3 px-2 text-orange-500 font-medium">Humid</td>
                      <td className="py-3 px-2">Uncomfortable for many people. Air feels heavy.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">70-74 F (21-23 C)</td>
                      <td className="py-3 px-2 text-red-500 font-medium">Very Humid</td>
                      <td className="py-3 px-2">Oppressive. Difficult to cool down through sweating.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">75 F+ (24 C+)</td>
                      <td className="py-3 px-2 text-destructive font-medium">Extremely Uncomfortable</td>
                      <td className="py-3 px-2">Dangerous for sensitive individuals. Avoid strenuous activity.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dew Point
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Dew point is the temperature at which air becomes saturated with water vapor and condensation begins. Unlike relative humidity, dew point is an absolute measure of moisture in the air — it doesn't change with temperature.
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Dew Point Matters More Than Humidity</h4>
                  <p>
                    Relative humidity changes with temperature even when moisture stays the same. A 90 F day at 50% humidity feels different than a 70 F day at 50% humidity. Dew point stays constant, making it a better indicator of how humid it actually feels. A dew point of 65 F feels humid whether it's 75 F or 95 F outside.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Condensation Forms</h4>
                  <p>
                    When air cools to its dew point temperature, it can no longer hold all its water vapor. The excess condenses into liquid water. This is why you see dew on grass in the morning — the ground cooled overnight, dropping the air temperature to the dew point. It's also why cold drinks sweat on a hot day.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Magnus Formula</h4>
                  <p>
                    This calculator uses the Magnus formula, a widely accepted approximation for dew point. The formula relates temperature, relative humidity, and dew point through empirical constants. It's accurate for typical atmospheric conditions between -40 C and 50 C.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Dew Point and Weather Forecasting</h4>
                  <p>
                    Meteorologists use dew point to predict fog, frost, and precipitation. When the air temperature and dew point are within a few degrees, fog is likely. If the dew point is above freezing and the temperature drops to meet it, you get rain. If both are below freezing, you get frost or snow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Dew Point Scenarios
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                      <th className="text-left py-3 px-2 font-semibold">Temperature</th>
                      <th className="text-left py-3 px-2 font-semibold">Relative Humidity</th>
                      <th className="text-left py-3 px-2 font-semibold">Dew Point</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Desert day</td>
                      <td className="py-3 px-2">95 F</td>
                      <td className="py-3 px-2">15%</td>
                      <td className="py-3 px-2">~35 F (very dry)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Comfortable spring</td>
                      <td className="py-3 px-2">72 F</td>
                      <td className="py-3 px-2">50%</td>
                      <td className="py-3 px-2">~52 F (pleasant)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Summer afternoon</td>
                      <td className="py-3 px-2">85 F</td>
                      <td className="py-3 px-2">60%</td>
                      <td className="py-3 px-2">~70 F (humid)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Tropical day</td>
                      <td className="py-3 px-2">90 F</td>
                      <td className="py-3 px-2">75%</td>
                      <td className="py-3 px-2">~81 F (oppressive)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Foggy morning</td>
                      <td className="py-3 px-2">55 F</td>
                      <td className="py-3 px-2">100%</td>
                      <td className="py-3 px-2">55 F (saturation)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Winter indoor air</td>
                      <td className="py-3 px-2">70 F</td>
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">~25 F (very dry)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Using Dew Point Data
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Plan Outdoor Activities Around Dew Point</p>
                    <p>For exercise or outdoor work, aim for dew points below 60 F. Above 70 F, take frequent breaks and stay hydrated. Above 75 F, consider postponing strenuous activity.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Prevent Condensation in Your Home</p>
                    <p>If your window surface temperature drops below the indoor dew point, condensation forms. In winter, keep indoor humidity lower (30-40%) to prevent window condensation and mold growth.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know When Frost Is Likely</p>
                    <p>If the dew point is at or below freezing and the forecast low is near or below the dew point, expect frost. This matters for gardeners even when the air temperature stays above 32 F.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">HVAC Sizing and Dew Point</p>
                    <p>High dew points mean your AC has to work harder to remove moisture. In humid climates, proper dehumidification matters as much as cooling capacity for comfort.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a comfortable dew point?</h4>
                  <p>
                    Most people feel comfortable with dew points between 50 F and 59 F (10-15 C). Below 50 F feels dry and crisp. Above 60 F starts feeling humid. Above 70 F feels oppressive to most people.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can dew point be higher than temperature?</h4>
                  <p>
                    No. Dew point cannot exceed air temperature. When they're equal, relative humidity is 100% and condensation occurs. If you see a reading where dew point appears higher, it's a measurement error.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What causes high dew points?</h4>
                  <p>
                    High dew points come from moisture in the air. Sources include evaporation from bodies of water, transpiration from plants, and moist air masses moving in from tropical regions. Gulf Coast states often see dew points above 70 F in summer.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does dew point affect health?</h4>
                  <p>
                    High dew points make it harder for sweat to evaporate, reducing your body's ability to cool itself. This increases heat stress risk. People with respiratory conditions may also find high humidity uncomfortable. Low dew points (dry air) can irritate skin and airways.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why does my car fog up?</h4>
                  <p>
                    Your breath adds moisture to the car's air, raising the dew point. When that moist air hits cold windows, it cools below the dew point and condenses. Running the AC removes moisture from the air, lowering the dew point and clearing the fog.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
