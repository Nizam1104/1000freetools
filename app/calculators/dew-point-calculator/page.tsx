"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      tempC = (tempC - 32) * 5/9;
    }

    const a = 17.27;
    const b = 237.7;

    const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
    const dewPointC = (b * alpha) / (a - alpha);

    const dewPointF = (dewPointC * 9/5) + 32;

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
      </div>
    </div>
  );
}
