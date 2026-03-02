"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MountainOxygenCalculatorPage() {
  const [altitude, setAltitude] = useState<string>("");
  const [unit, setUnit] = useState<string>("m");
  const [result, setResult] = useState<{
    oxygenPercentage: number;
    partialPressure: number;
    seaLevelComparison: string;
    riskLevel: string;
    symptoms: string[];
  } | null>(null);

  const calculate = () => {
    const alt = parseFloat(altitude);
    
    if (isNaN(alt)) return;

    let altitudeM = alt;
    if (unit === "ft") altitudeM = alt * 0.3048;

    // Barometric pressure formula (barometric formula for troposphere)
    // P = P0 * (1 - L*h/T0)^(g*M/(R*L))
    const P0 = 101325; // Sea level pressure (Pa)
    const L = 0.0065; // Temperature lapse rate (K/m)
    const T0 = 288.15; // Sea level temperature (K)
    const g = 9.80665; // Gravity (m/s²)
    const M = 0.0289644; // Molar mass of air (kg/mol)
    const R = 8.31447; // Universal gas constant (J/(mol·K))

    const pressure = P0 * Math.pow(1 - L * altitudeM / T0, (g * M) / (R * L));
    
    // Oxygen percentage remains ~20.9% but partial pressure decreases
    const oxygenPercentage = 20.9;
    const partialPressure = (pressure / 101325) * 21.2; // kPa at sea level is ~21.2 kPa for O2

    // Determine risk level and symptoms
    let riskLevel: string;
    let seaLevelComparison: string;
    let symptoms: string[] = [];

    if (altitudeM < 1500) {
      riskLevel = "No Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["No significant effects expected"];
    } else if (altitudeM < 2500) {
      riskLevel = "Low Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["Slight increase in breathing during exertion", "Minor performance decrease in athletics"];
    } else if (altitudeM < 3500) {
      riskLevel = "Moderate Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["Increased breathing rate", "Possible headache", "Decreased physical performance", "May experience mild AMS"];
    } else if (altitudeM < 4500) {
      riskLevel = "High Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["Significant hypoxia during exertion", "High risk of Acute Mountain Sickness (AMS)", "Headache, nausea, dizziness common", "Acclimatization required"];
    } else if (altitudeM < 5500) {
      riskLevel = "Very High Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["Severe hypoxia", "Risk of HAPE and HACE", "Cannot acclimatize long-term", "Supplemental O₂ recommended for some"];
    } else {
      riskLevel = "Extreme Risk";
      seaLevelComparison = `${(pressure / P0 * 100).toFixed(1)}% of sea level pressure`;
      symptoms = ["Life-threatening hypoxia", "Death zone above 8000m", "Supplemental oxygen required", "Extended exposure fatal without O₂"];
    }

    setResult({
      oxygenPercentage,
      partialPressure: Math.round(partialPressure * 100) / 100,
      seaLevelComparison,
      riskLevel,
      symptoms
    });
  };

  const reset = () => {
    setAltitude("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude</h1>
          <p className="text-muted-foreground">
            Understand how altitude affects your breathing with our Mountain Oxygen Calculator. Enter elevation in meters or feet to calculate available oxygen percentage and effective O₂ partial pressure — vital for mountaineers, climbers, and aviation planners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="altitude">Altitude</Label>
                  <Input 
                    id="altitude" 
                    type="number" 
                    placeholder="e.g., 4000" 
                    value={altitude} 
                    onChange={(e) => setAltitude(e.target.value)} 
                  />
                </div>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="ft">Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Oxygen
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
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className={`text-3xl font-bold ${
                      result.riskLevel === "No Risk" ? "text-green-500" :
                      result.riskLevel === "Low Risk" ? "text-blue-500" :
                      result.riskLevel === "Moderate Risk" ? "text-yellow-500" :
                      result.riskLevel === "High Risk" ? "text-orange-500" : "text-red-500"
                    }`}>{result.riskLevel}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">O₂ Percentage</p>
                      <p className="text-xl font-semibold">{result.oxygenPercentage}%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">O₂ Partial Pressure</p>
                      <p className="text-xl font-semibold">{result.partialPressure} kPa</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Atmospheric Pressure</p>
                    <p className="text-lg font-semibold">{result.seaLevelComparison}</p>
                  </div>

                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm font-semibold text-destructive mb-2">Expected Symptoms:</p>
                    <ul className="text-sm space-y-1">
                      {result.symptoms.map((symptom, i) => (
                        <li key={i}>• {symptom}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter altitude and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
