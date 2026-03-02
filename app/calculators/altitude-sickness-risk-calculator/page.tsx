"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AltitudeResult {
  altitude: number;
  oxygenLevel: number;
  riskLevel: string;
  symptoms: string[];
  acclimatizationDays: number;
  recommendations: string[];
  riskFactors: Array<{ factor: string; risk: string }>;
}

export default function AltitudeSicknessRiskCalculatorPage() {
  const [targetAltitude, setTargetAltitude] = useState<string>("");
  const [ascentRate, setAscentRate] = useState<string>("");
  const [sleepAltitude, setSleepAltitude] = useState<string>("");
  const [previousExperience, setPreviousExperience] = useState<string>("none");
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [result, setResult] = useState<AltitudeResult | null>(null);

  const calculate = () => {
    const targetNum = parseFloat(targetAltitude) || 0;
    const ascentNum = parseFloat(ascentRate) || 0;
    const sleepNum = parseFloat(sleepAltitude) || targetNum;

    if (targetNum === 0) return;

    // Calculate oxygen level at altitude
    // Oxygen decreases ~10% per 1000m above sea level
    const oxygenLevel = Math.max(50, 100 - (targetNum / 1000) * 10);

    // Risk assessment based on altitude
    let riskLevel = "";
    let acclimatizationDays = 0;
    const symptoms: string[] = [];

    if (targetNum < 1500) {
      riskLevel = "Low - Minimal risk of AMS";
      acclimatizationDays = 0;
    } else if (targetNum < 2500) {
      riskLevel = "Moderate - Some risk of mild AMS";
      acclimatizationDays = 1;
      symptoms.push("Mild headache", "Slight shortness of breath");
    } else if (targetNum < 3500) {
      riskLevel = "High - Significant AMS risk";
      acclimatizationDays = 2;
      symptoms.push("Headache", "Nausea", "Fatigue", "Dizziness", "Loss of appetite");
    } else if (targetNum < 5500) {
      riskLevel = "Very High - Severe AMS, HAPE, HACE risk";
      acclimatizationDays = 3;
      symptoms.push("Severe headache", "Vomiting", "Confusion", "Difficulty breathing at rest");
    } else {
      riskLevel = "Extreme - Life-threatening altitude";
      acclimatizationDays = 5;
      symptoms.push("All AMS symptoms", "HAPE (fluid in lungs)", "HACE (brain swelling)");
    }

    // Adjust for ascent rate
    if (ascentNum > 500) {
      riskLevel = "⚠️ " + riskLevel + " (Fast ascent increases risk)";
      acclimatizationDays += 1;
    }

    // Risk factors
    const riskFactors = [
      { factor: "Altitude", risk: targetNum >= 3500 ? "High" : targetNum >= 2500 ? "Moderate" : "Low" },
      { factor: "Ascent Rate", risk: ascentNum > 500 ? "High" : "Low" },
      { factor: "Previous Experience", risk: previousExperience === "none" ? "Higher" : "Lower" },
      { factor: "Sleep Altitude", risk: sleepNum > 3000 ? "High" : "Moderate" },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (targetNum >= 2500) {
      recommendations.push("📈 Ascend gradually: max 300-500m sleeping altitude per day above 3000m");
      recommendations.push("💤 Sleep at lower altitude than maximum reached (climb high, sleep low)");
    }

    if (targetNum >= 3500) {
      recommendations.push("💊 Consider Diamox (acetazolamide) for prevention - consult doctor");
      recommendations.push("🚁 Know evacuation routes and have emergency plan");
    }

    if (ascentNum > 500) {
      recommendations.push("⏸️ Add rest days for acclimatization");
      recommendations.push("📉 Reduce ascent rate to 300m/day above 3000m");
    }

    recommendations.push("💧 Stay hydrated: 3-4 liters of water per day");
    recommendations.push("🚫 Avoid alcohol and sedatives");
    recommendations.push("🍽️ Eat high-carbohydrate diet");
    recommendations.push("⚠️ Descend immediately if symptoms worsen");

    if (targetNum >= 5000) {
      recommendations.push("🏥 Carry emergency oxygen and medical kit");
      recommendations.push("📱 Ensure communication device for emergencies");
    }

    setResult({
      altitude: targetNum,
      oxygenLevel: parseFloat(oxygenLevel.toFixed(1)),
      riskLevel,
      symptoms,
      acclimatizationDays,
      recommendations,
      riskFactors,
    });
  };

  const reset = () => {
    setTargetAltitude("");
    setAscentRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing
          </h1>
          <p className="text-muted-foreground">
            Stay safe at high altitude with our Altitude Sickness Risk Calculator.
            Enter your ascent rate, target altitude, and health risk factors to evaluate
            your Acute Mountain Sickness (AMS) risk level and get acclimatization recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-altitude">Target Altitude (meters)</Label>
                <Input
                  id="target-altitude"
                  type="number"
                  value={targetAltitude}
                  onChange={(e) => setTargetAltitude(e.target.value)}
                  placeholder="e.g., 4000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ascent-rate">Daily Ascent Rate (meters/day)</Label>
                <Input
                  id="ascent-rate"
                  type="number"
                  value={ascentRate}
                  onChange={(e) => setAscentRate(e.target.value)}
                  placeholder="e.g., 500"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 300-500m/day above 3000m
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleep-altitude">Sleep Altitude (meters)</Label>
                <Input
                  id="sleep-altitude"
                  type="number"
                  value={sleepAltitude}
                  onChange={(e) => setSleepAltitude(e.target.value)}
                  placeholder="Same as target"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Previous High Altitude Experience</Label>
                <Select value={previousExperience} onValueChange={setPreviousExperience}>
                  <SelectTrigger id="experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No experience</SelectItem>
                    <SelectItem value="some">Some (below 4000m)</SelectItem>
                    <SelectItem value="extensive">Extensive (above 4000m)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.riskLevel.includes("Low") ? "bg-green-100 dark:bg-green-900/20" :
                    result.riskLevel.includes("Moderate") ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className="text-lg font-bold mt-1">{result.riskLevel}</p>
                    <p className="text-sm mt-2">
                      Oxygen Level: {result.oxygenLevel}% of sea level
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Acclimatization</p>
                      <p className="text-lg font-bold">{result.acclimatizationDays} days</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Altitude</p>
                      <p className="text-lg font-bold">{result.altitude}m</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Risk Factors</h4>
                    <div className="space-y-1">
                      {result.riskFactors.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{item.factor}</span>
                          <span className={`font-medium ${
                            item.risk === "High" ? "text-red-600" :
                            item.risk === "Moderate" ? "text-amber-600" :
                            "text-green-600"
                          }`}>
                            {item.risk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.symptoms.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Possible Symptoms</h4>
                      <ul className="space-y-1">
                        {result.symptoms.map((symptom, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-amber-600">⚠️</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Safety Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter altitude details and click Calculate to assess risk</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Altitude Sickness
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>AMS (Acute Mountain Sickness):</strong> Most common, affects 25-85% above 3000m
                  </li>
                  <li>
                    <strong>HAPE:</strong> High Altitude Pulmonary Edema - fluid in lungs
                  </li>
                  <li>
                    <strong>HACE:</strong> High Altitude Cerebral Edema - brain swelling
                  </li>
                  <li>
                    <strong>Prevention:</strong> Gradual ascent, proper acclimatization
                  </li>
                </ul>
                <p>
                  <strong>Golden Rule:</strong> If symptoms worsen, DESCEND immediately.
                  No medication replaces descent for severe altitude illness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
