"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SolarIrradianceCalculatorPage() {
  const [latitude, setLatitude] = useState<string>("");
  const [season, setSeason] = useState<string>("summer");
  const [weather, setWeather] = useState<string>("clear");
  const [tiltAngle, setTiltAngle] = useState<string>("");
  const [result, setResult] = useState<{
    extraterrestrialRadiation: number;
    clearSkyIrradiance: number;
    actualIrradiance: number;
    peakSunHours: number;
    dailyEnergy: number;
    interpretation: string;
  } | null>(null);

  const calculate = () => {
    const lat = parseFloat(latitude);
    const tilt = tiltAngle ? parseFloat(tiltAngle) : lat; // Default tilt = latitude
    if (isNaN(lat)) return;

    // Solar constant (W/m²)
    const solarConstant = 1361;

    // Calculate extraterrestrial radiation based on latitude and season
    const seasonFactors: { [key: string]: number } = {
      "summer": 1.1,
      "spring": 1.0,
      "autumn": 0.95,
      "winter": 0.85
    };

    // Adjust for latitude (less radiation at higher latitudes)
    const latFactor = Math.cos((Math.abs(lat) * Math.PI) / 180);
    const extraterrestrialRadiation = solarConstant * latFactor * seasonFactors[season];

    // Clear sky irradiance (accounting for atmospheric attenuation)
    const clearSkyIrradiance = extraterrestrialRadiation * 0.75;

    // Weather factors
    const weatherFactors: { [key: string]: number } = {
      "clear": 1.0,
      "partly_cloudy": 0.7,
      "cloudy": 0.4,
      "overcast": 0.2,
      "rainy": 0.1
    };

    const actualIrradiance = clearSkyIrradiance * weatherFactors[weather];

    // Peak sun hours (equivalent hours of 1000 W/m²)
    const dayLengthFactors: { [key: string]: number } = {
      "summer": 14,
      "spring": 12,
      "autumn": 11,
      "winter": 9
    };
    const effectiveDayLength = dayLengthFactors[season] * weatherFactors[weather];
    const peakSunHours = (actualIrradiance * effectiveDayLength) / 1000;

    // Daily energy potential (kWh/m²/day)
    const dailyEnergy = peakSunHours;

    // Interpretation
    let interpretation: string;
    if (actualIrradiance > 800) {
      interpretation = "Excellent solar conditions - optimal for solar power generation";
    } else if (actualIrradiance > 500) {
      interpretation = "Good solar conditions - suitable for solar installations";
    } else if (actualIrradiance > 200) {
      interpretation = "Moderate solar conditions - solar panels will produce reduced output";
    } else {
      interpretation = "Poor solar conditions - minimal solar power generation expected";
    }

    setResult({
      extraterrestrialRadiation: Math.round(extraterrestrialRadiation),
      clearSkyIrradiance: Math.round(clearSkyIrradiance),
      actualIrradiance: Math.round(actualIrradiance),
      peakSunHours: Math.round(peakSunHours * 10) / 10,
      dailyEnergy: Math.round(dailyEnergy * 10) / 10,
      interpretation
    });
  };

  const reset = () => {
    setLatitude("");
    setTiltAngle("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Solar Irradiance Calculator – Estimate Solar Energy at Your Location</h1>
          <p className="text-muted-foreground">
            Plan solar energy systems with confidence using our Solar Irradiance Calculator. Estimate the amount of solar energy (W/m²) available at your location based on latitude, season, and weather conditions — perfect for solar panel sizing and energy yield calculations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (degrees)</Label>
                <Input 
                  id="latitude" 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 35.6895" 
                  value={latitude} 
                  onChange={(e) => setLatitude(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Positive for Northern Hemisphere, negative for Southern</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="autumn">Autumn</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weather">Weather Conditions</Label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Clear Sky</SelectItem>
                    <SelectItem value="partly_cloudy">Partly Cloudy</SelectItem>
                    <SelectItem value="cloudy">Cloudy</SelectItem>
                    <SelectItem value="overcast">Overcast</SelectItem>
                    <SelectItem value="rainy">Rainy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiltAngle">Panel Tilt Angle (optional)</Label>
                <Input 
                  id="tiltAngle" 
                  type="number" 
                  placeholder="Leave empty for optimal (equals latitude)" 
                  value={tiltAngle} 
                  onChange={(e) => setTiltAngle(e.target.value)} 
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Irradiance
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
                    <p className="text-sm text-muted-foreground">Solar Irradiance</p>
                    <p className="text-4xl font-bold text-primary">{result.actualIrradiance} W/m²</p>
                    <p className="text-xs text-muted-foreground mt-1">{result.interpretation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Peak Sun Hours</p>
                      <p className="text-xl font-semibold">{result.peakSunHours} h</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Daily Energy</p>
                      <p className="text-xl font-semibold">{result.dailyEnergy} kWh/m²</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Extraterrestrial Radiation</span>
                      <span className="font-semibold">{result.extraterrestrialRadiation} W/m²</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Clear Sky Irradiance</span>
                      <span className="font-semibold">{result.clearSkyIrradiance} W/m²</span>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Solar Tip:</p>
                    <p className="text-sm">For optimal year-round production, set panel tilt angle equal to your latitude. Adjust ±15° seasonally for maximum efficiency.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter location details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
