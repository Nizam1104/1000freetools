"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Thermometer, Droplets, AlertTriangle, Info, Sun } from "lucide-react";

interface HeatIndexResult {
  heatIndex: number;
  heatIndexCelsius: number;
  category: string;
  riskLevel: "Caution" | "Extreme Caution" | "Danger" | "Extreme Danger";
  precautions: string[];
}

export default function HeatIndexCalculatorPage() {
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<"fahrenheit" | "celsius">("fahrenheit");
  const [result, setResult] = useState<HeatIndexResult | null>(null);

  const calculateHeatIndex = () => {
    let tempF = parseFloat(temperature);
    const rh = parseFloat(humidity);

    if (isNaN(tempF) || isNaN(rh) || tempF < 40 || rh < 1 || rh > 100) {
      return;
    }

    if (tempUnit === "celsius") {
      tempF = (tempF * 9 / 5) + 32;
    }

    let hi: number;

    if (tempF < 80) {
      hi = tempF;
    } else {
      const T = tempF;
      const R = rh;

      hi = -42.379 + 2.04901523 * T + 10.14333127 * R
        - 0.22475541 * T * R - 0.00683783 * T * T
        - 0.05481717 * R * R + 0.00122874 * T * T * R
        + 0.00085282 * T * R * R - 0.00000199 * T * T * R * R;

      if (R < 13 && T >= 80 && T <= 112) {
        const adjustment = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
        hi -= adjustment;
      } else if (R > 85 && T >= 80 && T <= 87) {
        const adjustment = ((R - 85) / 10) * ((87 - T) / 5);
        hi += adjustment;
      }
    }

    const hiC = (hi - 32) * 5 / 9;

    let category: string;
    let riskLevel: HeatIndexResult["riskLevel"];
    let precautions: string[] = [];

    if (hi < 80) {
      category = "Normal";
      riskLevel = "Caution";
      precautions = ["No special precautions needed"];
    } else if (hi < 90) {
      category = "Caution";
      riskLevel = "Caution";
      precautions = [
        "Fatigue possible with prolonged exposure",
        "Stay hydrated",
        "Take breaks in shade"
      ];
    } else if (hi < 103) {
      category = "Extreme Caution";
      riskLevel = "Extreme Caution";
      precautions = [
        "Heat cramps and heat exhaustion possible",
        "Limit outdoor activity",
        "Drink plenty of water",
        "Wear lightweight clothing"
      ];
    } else if (hi < 124) {
      category = "Danger";
      riskLevel = "Danger";
      precautions = [
        "Heat cramps and heat exhaustion likely",
        "Heat stroke possible with prolonged exposure",
        "Avoid strenuous outdoor activities",
        "Stay in air-conditioned areas when possible"
      ];
    } else {
      category = "Extreme Danger";
      riskLevel = "Extreme Danger";
      precautions = [
        "Heat stroke imminent",
        "Stay indoors with air conditioning",
        "Never leave children or pets in vehicles",
        "Seek medical attention if feeling ill"
      ];
    }

    setResult({
      heatIndex: Math.round(hi * 10) / 10,
      heatIndexCelsius: Math.round(hiC * 10) / 10,
      category,
      riskLevel,
      precautions,
    });
  };

  const reset = () => {
    setTemperature("");
    setHumidity("");
    setResult(null);
  };

  useEffect(() => {
    calculateHeatIndex();
  }, [temperature, humidity, tempUnit]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Caution": return "text-yellow-500 bg-yellow-500/10";
      case "Extreme Caution": return "text-orange-500 bg-orange-500/10";
      case "Danger": return "text-red-500 bg-red-500/10";
      case "Extreme Danger": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Heat Index Calculator – Calculate the 'Feels Like' Temperature</h1>
          <p className="text-muted-foreground">
            Know how hot it really feels outside with our Heat Index Calculator. Combine air temperature and humidity to calculate the apparent temperature — helping you prepare for heat-related risks during summer and outdoor activities.
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
                        placeholder="e.g., 95"
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
                      placeholder="e.g., 60"
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
                  Heat index is most significant when temperature is above 80°F (27°C) and humidity is above 40%.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateHeatIndex} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Heat Index (Feels Like)</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.heatIndex}°F</p>
                      <p className="text-lg text-muted-foreground">({result.heatIndexCelsius}°C)</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p className="font-semibold">{result.riskLevel}</p>
                    </div>
                    <p className="text-sm">{result.category}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Precautions:
                    </p>
                    <ul className="text-sm space-y-1">
                      {result.precautions.map((precaution, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          <span>{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> NWS Heat Index (Rothfusz Regression)</p>
                    <p className="text-xs mt-1">
                      HI = -42.379 + 2.049T + 10.143RH - 0.225TR - 0.00684T² - 0.0548RH² + 0.00123T²RH + 0.000853TRH² - 0.00000199TR²
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter temperature and humidity to calculate heat index</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Heat Index Safety Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Heat Index</th>
                    <th className="text-left py-2 pr-4">Category</th>
                    <th className="text-left py-2">Health Effects</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Below 80°F</td>
                    <td className="py-2 pr-4 text-green-500 font-medium">Normal</td>
                    <td className="py-2">No significant effects</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">80-90°F</td>
                    <td className="py-2 pr-4 text-yellow-500 font-medium">Caution</td>
                    <td className="py-2">Fatigue with prolonged exposure</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">90-103°F</td>
                    <td className="py-2 pr-4 text-orange-500 font-medium">Extreme Caution</td>
                    <td className="py-2">Heat cramps/exhaustion possible</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">103-124°F</td>
                    <td className="py-2 pr-4 text-red-500 font-medium">Danger</td>
                    <td className="py-2">Heat stroke possible</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">125°F+</td>
                    <td className="py-2 pr-4 text-destructive font-medium">Extreme Danger</td>
                    <td className="py-2">Heat stroke imminent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Heat Index</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Air Temperature</h3>
                <p className="text-sm text-muted-foreground">Input the current air temperature in Fahrenheit or Celsius.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Relative Humidity</h3>
                <p className="text-sm text-muted-foreground">Enter the relative humidity percentage from your weather source or hygrometer.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Heat Index Results</h3>
                <p className="text-sm text-muted-foreground">See the "feels like" temperature with risk level and safety precautions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features of This Heat Index Calculator</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  NWS Formula Accuracy
                </h3>
                <p className="text-sm text-muted-foreground">Uses the official National Weather Service Rothfusz regression equation for precise heat index calculations.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Risk Level Classification
                </h3>
                <p className="text-sm text-muted-foreground">Automatically categorizes heat index into Caution, Extreme Caution, Danger, or Extreme Danger levels.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Safety Precautions Display
                </h3>
                <p className="text-sm text-muted-foreground">Shows specific health recommendations based on your calculated heat index level.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Dual Temperature Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for both Fahrenheit and Celsius input with automatic conversion.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Comprehensive Safety Guide
                </h3>
                <p className="text-sm text-muted-foreground">Reference table explains health effects at different heat index levels for quick decision-making.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Heat Index</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the difference between temperature and heat index?</h3>
                <p className="text-sm text-muted-foreground">Temperature measures actual air heat. Heat index combines temperature and humidity to show how hot it feels to your body. High humidity prevents sweat evaporation, making it feel hotter than the thermometer reads.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">At what heat index is it dangerous?</h3>
                <p className="text-sm text-muted-foreground">Heat index above 103°F (39°C) is considered dangerous. Above 125°F (52°C) is extreme danger where heat stroke becomes imminent. Limit outdoor activity and stay hydrated at these levels.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why does humidity make it feel hotter?</h3>
                <p className="text-sm text-muted-foreground">Your body cools itself through sweat evaporation. High humidity means air is already saturated with water vapor, slowing evaporation. This reduces your body ability to cool down, making you feel hotter.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does heat index apply in the shade?</h3>
                <p className="text-sm text-muted-foreground">Yes, heat index calculations assume shady conditions. Direct sunlight can increase the perceived temperature by up to 15°F (8°C) additional heat stress.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Who is most at risk from high heat index?</h3>
                <p className="text-sm text-muted-foreground">Children, elderly adults, pregnant women, and people with heart or lung conditions are most vulnerable. Anyone doing strenuous outdoor work or exercise in high heat index conditions should take extra precautions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Weather Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/wind-chill-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Wind Chill Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate how cold it feels when wind combines with low temperatures.</p>
              </a>
              <a href="/calculators/dew-point-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Dew Point Calculator</h3>
                <p className="text-sm text-muted-foreground">Find the temperature at which air becomes saturated and dew forms.</p>
              </a>
              <a href="/calculators/humidity-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Humidity Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate relative humidity, absolute humidity, and moisture content in air.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
