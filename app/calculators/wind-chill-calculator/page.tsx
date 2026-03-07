"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Thermometer, Wind, AlertTriangle, Info } from "lucide-react";

interface WindChillResult {
  windChill: number;
  windChillCelsius: number;
  feelsLike: string;
  riskLevel: "Low" | "Moderate" | "High" | "Very High" | "Extreme";
  frostbiteTime: string;
}

export default function WindChillCalculatorPage() {
  const [temperature, setTemperature] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<"fahrenheit" | "celsius">("fahrenheit");
  const [windUnit, setWindUnit] = useState<"mph" | "kmh" | "ms" | "knots">("mph");
  const [result, setResult] = useState<WindChillResult | null>(null);

  const calculateWindChill = () => {
    let tempF = parseFloat(temperature);
    let windMph = parseFloat(windSpeed);

    if (isNaN(tempF) || isNaN(windMph) || tempF > 50 || windMph < 3) {
      if (tempF > 50) {
        setResult(null);
        return;
      }
    }

    if (tempUnit === "celsius") {
      tempF = (tempF * 9 / 5) + 32;
    }

    if (windUnit === "kmh") {
      windMph = windMph * 0.621371;
    } else if (windUnit === "ms") {
      windMph = windMph * 2.23694;
    } else if (windUnit === "knots") {
      windMph = windMph * 1.15078;
    }

    let windChillF: number;

    if (tempF <= 50 && windMph >= 3) {
      windChillF = 35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) + 0.4275 * tempF * Math.pow(windMph, 0.16);
    } else {
      windChillF = tempF;
    }

    const windChillC = (windChillF - 32) * 5 / 9;

    let feelsLike: string;
    if (windChillF >= 30) feelsLike = "Cold";
    else if (windChillF >= 15) feelsLike = "Very Cold";
    else if (windChillF >= 0) feelsLike = "Bitter Cold";
    else if (windChillF >= -20) feelsLike = "Dangerously Cold";
    else feelsLike = "Extremely Dangerous";

    let riskLevel: WindChillResult["riskLevel"];
    let frostbiteTime: string;

    if (windChillF >= 30) {
      riskLevel = "Low";
      frostbiteTime = "More than 2 hours";
    } else if (windChillF >= 15) {
      riskLevel = "Moderate";
      frostbiteTime = "1-2 hours";
    } else if (windChillF >= 0) {
      riskLevel = "High";
      frostbiteTime = "30-60 minutes";
    } else if (windChillF >= -20) {
      riskLevel = "Very High";
      frostbiteTime = "10-30 minutes";
    } else {
      riskLevel = "Extreme";
      frostbiteTime = "Less than 10 minutes";
    }

    setResult({
      windChill: Math.round(windChillF * 10) / 10,
      windChillCelsius: Math.round(windChillC * 10) / 10,
      feelsLike,
      riskLevel,
      frostbiteTime,
    });
  };

  const reset = () => {
    setTemperature("");
    setWindSpeed("");
    setResult(null);
  };

  useEffect(() => {
    calculateWindChill();
  }, [temperature, windSpeed, tempUnit, windUnit]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-500 bg-green-500/10";
      case "Moderate": return "text-yellow-500 bg-yellow-500/10";
      case "High": return "text-orange-500 bg-orange-500/10";
      case "Very High": return "text-red-500 bg-red-500/10";
      case "Extreme": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Wind Chill Calculator – Find Out What the Temperature Really Feels Like</h1>
          <p className="text-muted-foreground">
            Dress appropriately for the weather with our Wind Chill Calculator. Enter the air temperature and wind speed to calculate the real feel temperature — essential for outdoor activity planning in cold and windy conditions.
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
                        placeholder="e.g., 20"
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
                    <Label htmlFor="windSpeed">Wind Speed</Label>
                    <div className="flex gap-2">
                      <Input
                        id="windSpeed"
                        type="number"
                        placeholder="e.g., 15"
                        value={windSpeed}
                        onChange={(e) => setWindSpeed(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={windUnit} onValueChange={(v) => setWindUnit(v as "mph" | "kmh" | "ms" | "knots")}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mph">mph</SelectItem>
                          <SelectItem value="kmh">km/h</SelectItem>
                          <SelectItem value="ms">m/s</SelectItem>
                          <SelectItem value="knots">knots</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Wind chill is most significant when temperature is below 50°F (10°C) and wind speed is above 3 mph.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWindChill} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Wind Chill Temperature</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.windChill}°F</p>
                      <p className="text-lg text-muted-foreground">({result.windChillCelsius}°C)</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Feels Like</p>
                    <p className="text-xl font-bold">{result.feelsLike}</p>
                  </div>

                  <div className={`p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p className="font-semibold">Risk Level: {result.riskLevel}</p>
                    </div>
                    <p className="text-sm">Frostbite possible in: {result.frostbiteTime}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> NWS Wind Chill (2001)</p>
                    <p className="font-mono text-xs mt-1">
                      35.74 + 0.6215T - 35.75V^0.16 + 0.4275TV^0.16
                    </p>
                    <p className="text-xs mt-1">T=Temp(°F), V=Wind(mph)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter temperature and wind speed to calculate wind chill</p>
                  {temperature && parseFloat(temperature) > 50 && (
                    <p className="text-sm mt-2">Note: Wind chill is only calculated for temperatures ≤ 50°F</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Wind Chill Safety Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Risk Levels:
                </h4>
                <ul className="space-y-2">
                  <li><span className="text-green-500 font-medium">Low (30°F+):</span> Minimal risk for properly clothed individuals</li>
                  <li><span className="text-yellow-500 font-medium">Moderate (15-30°F):</span> Uncomfortable cold, dress warmly</li>
                  <li><span className="text-orange-500 font-medium">High (0-15°F):</span> Risk of frostbite with prolonged exposure</li>
                  <li><span className="text-red-500 font-medium">Very High (-20-0°F):</span> Frostbite in 10-30 minutes</li>
                  <li><span className="text-destructive font-medium">Extreme (below -20°F):</span> Frostbite in less than 10 minutes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Safety Tips:
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dress in layers to trap warm air</li>
                  <li>Cover exposed skin, especially face and hands</li>
                  <li>Wear a hat - significant heat loss occurs from head</li>
                  <li>Stay dry - wet clothing increases heat loss</li>
                  <li>Limit time outdoors in extreme wind chill</li>
                  <li>Watch for signs of frostbite: numbness, white/gray skin</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Wind Chill</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Air Temperature</h3>
                <p className="text-sm text-muted-foreground">Input the current air temperature in Fahrenheit or Celsius.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Wind Speed</h3>
                <p className="text-sm text-muted-foreground">Enter the wind speed in mph, km/h, m/s, or knots.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Wind Chill Results</h3>
                <p className="text-sm text-muted-foreground">See the "feels like" temperature with risk level and frostbite time estimates.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features of This Wind Chill Calculator</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  NWS Official Formula
                </h3>
                <p className="text-sm text-muted-foreground">Uses the 2001 National Weather Service wind chill formula for accurate calculations.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Wind Speed Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for mph, km/h, m/s, and knots with automatic conversion.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Frostbite Time Estimates
                </h3>
                <p className="text-sm text-muted-foreground">Shows approximate time until frostbite risk at calculated wind chill temperature.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Risk Level Classification
                </h3>
                <p className="text-sm text-muted-foreground">Automatic categorization from Low to Extreme risk with color-coded alerts.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Safety Tips Included
                </h3>
                <p className="text-sm text-muted-foreground">Comprehensive cold weather safety guidance for outdoor activities.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Wind Chill</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is wind chill temperature?</h3>
                <p className="text-sm text-muted-foreground">Wind chill is how cold it feels when wind combines with low temperatures. Wind removes heat from your body faster than still air, making it feel colder than the actual air temperature.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">At what wind chill is it dangerous?</h3>
                <p className="text-sm text-muted-foreground">Wind chill below 0°F (-18°C) is considered dangerous with frostbite possible in 30 minutes or less. Below -20°F (-29°C) is extreme danger with frostbite in under 10 minutes.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does wind chill affect cars and pipes?</h3>
                <p className="text-sm text-muted-foreground">No, wind chill only affects living things that generate body heat. Car engines and water pipes cool to the actual air temperature, not the wind chill temperature.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is there a minimum wind speed for wind chill?</h3>
                <p className="text-sm text-muted-foreground">The wind chill formula applies when wind speed is above 3 mph. Below this, the cooling effect is minimal. Calm air wind chill equals the actual temperature.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How does wind chill cause frostbite?</h3>
                <p className="text-sm text-muted-foreground">Wind accelerates heat loss from exposed skin. When skin temperature drops below freezing, ice crystals form in tissue cells, causing frostbite. Wind chill speeds this process dramatically.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
