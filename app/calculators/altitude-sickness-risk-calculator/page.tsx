"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
                  <div className={`p-4 rounded-lg text-center ${result.riskLevel.includes("Low") ? "bg-green-100 dark:bg-green-900/20" :
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
                          <span className={`font-medium ${item.risk === "High" ? "text-red-600" :
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
          {/* How to Use Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Altitude Sickness Risk Calculator
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Enter your climb details</h3>
                    <p className="text-sm mt-1">
                      Input your target altitude, daily ascent rate, and planned sleep altitude.
                      Be realistic about your ascent speed – rushing increases risk significantly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Add your experience and health info</h3>
                    <p className="text-sm mt-1">
                      Select your previous high altitude experience level. While there are no
                      specific health condition checkboxes, know that pre-existing heart or
                      lung conditions increase your risk.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Review your risk assessment</h3>
                    <p className="text-sm mt-1">
                      The calculator shows your risk level, expected symptoms, required
                      acclimatization days, and personalized safety recommendations. Use this
                      to plan a safer ascent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Altitude Sickness Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding Altitude Sickness
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">What is altitude sickness?</h3>
                  <p className="text-sm">
                    Altitude sickness, also called acute mountain sickness (AMS), is your body's
                    negative response to low oxygen levels at high elevation. As you climb higher,
                    the air pressure drops and each breath delivers less oxygen to your tissues.
                    Your body needs time to adapt – a process called acclimatization. Without
                    sufficient acclimatization, you get sick.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Why does it happen?</h3>
                  <p className="text-sm">
                    Atmospheric pressure decreases with altitude. At sea level, air pressure is
                    about 1013 hPa. At 5000 meters, it drops to roughly 540 hPa – nearly half.
                    Even though oxygen still makes up 21% of the air, the lower pressure means
                    fewer oxygen molecules per breath. Your blood oxygen saturation drops, and
                    organs start struggling. The brain, lungs, and cardiovascular system are
                    hit hardest.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Types of altitude sickness</h3>
                  <div className="space-y-3 mt-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground text-sm">AMS (Acute Mountain Sickness)</p>
                      <p className="text-xs mt-1">
                        The mildest and most common form. Affects 25-85% of climbers above 3000m.
                        Symptoms include headache, nausea, fatigue, and dizziness. Uncomfortable
                        but rarely life-threatening if managed properly.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground text-sm">HAPE (High Altitude Pulmonary Edema)</p>
                      <p className="text-xs mt-1">
                        Fluid builds up in your lungs. You can't breathe properly even at rest.
                        This is life-threatening and requires immediate descent. HAPE can develop
                        within hours and kills if ignored.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground text-sm">HACE (High Altitude Cerebral Edema)</p>
                      <p className="text-xs mt-1">
                        Fluid accumulates in the brain, causing swelling. Symptoms include confusion,
                        loss of coordination, and altered consciousness. HACE is fatal without
                        immediate descent and medical treatment.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Who is at risk?</h3>
                  <p className="text-sm">
                    Anyone can get altitude sickness – fitness level doesn't protect you. Young,
                    healthy athletes get hit just as hard as out-of-shape climbers. The only
                    reliable predictor is your ascent rate and previous acclimatization. Some
                    people are genetically more susceptible, but you won't know until you're
                    up there. Previous experience helps you recognize symptoms early, which
                    makes a real difference.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Altitude Zones Table */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Altitude Zones and Risk Levels
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-semibold">Zone</th>
                      <th className="text-left py-3 px-3 font-semibold">Meters</th>
                      <th className="text-left py-3 px-3 font-semibold">Feet</th>
                      <th className="text-left py-3 px-3 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-3">Low altitude</td>
                      <td className="py-3 px-3">0-1,500m</td>
                      <td className="py-3 px-3">0-5,000ft</td>
                      <td className="py-3 px-3 text-green-600 font-medium">Minimal risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">Moderate altitude</td>
                      <td className="py-3 px-3">1,500-2,500m</td>
                      <td className="py-3 px-3">5,000-8,000ft</td>
                      <td className="py-3 px-3 text-green-600 font-medium">Low risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">High altitude</td>
                      <td className="py-3 px-3">2,500-3,500m</td>
                      <td className="py-3 px-3">8,000-11,500ft</td>
                      <td className="py-3 px-3 text-amber-600 font-medium">Moderate risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">Very high altitude</td>
                      <td className="py-3 px-3">3,500-5,500m</td>
                      <td className="py-3 px-3">11,500-18,000ft</td>
                      <td className="py-3 px-3 text-orange-600 font-medium">High risk</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">Extreme altitude</td>
                      <td className="py-3 px-3">5,500m+</td>
                      <td className="py-3 px-3">18,000ft+</td>
                      <td className="py-3 px-3 text-red-600 font-medium">Very high risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Risk increases significantly when ascending faster than recommended rates.
                The zones above assume proper acclimatization protocols are followed.
              </p>
            </CardContent>
          </Card>

          {/* Symptoms Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Symptoms of Altitude Sickness
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    Mild Symptoms (AMS)
                  </h3>
                  <ul className="text-sm space-y-1 text-green-900 dark:text-green-300">
                    <li>• Headache (the most common symptom – often throbbing)</li>
                    <li>• Nausea or loss of appetite</li>
                    <li>• Fatigue and weakness</li>
                    <li>• Dizziness or lightheadedness</li>
                    <li>• Difficulty sleeping</li>
                  </ul>
                  <p className="text-xs mt-3 text-green-800 dark:text-green-400">
                    Action: Rest at current altitude until symptoms resolve. Do not ascend further.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">
                    Moderate Symptoms
                  </h3>
                  <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-300">
                    <li>• Severe, persistent headache (not relieved by painkillers)</li>
                    <li>• Vomiting</li>
                    <li>• Shortness of breath even at rest</li>
                    <li>• Rapid heartbeat</li>
                    <li>• Reduced urine output</li>
                  </ul>
                  <p className="text-xs mt-3 text-amber-800 dark:text-amber-400">
                    Action: Descend 500-1000m immediately. Consider acetazolamide. Monitor closely.
                  </p>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">
                    Severe Symptoms (HAPE/HACE) – Medical Emergency
                  </h3>
                  <ul className="text-sm space-y-1 text-red-900 dark:text-red-300">
                    <li>• Confusion or altered mental state</li>
                    <li>• Persistent dry cough (may produce pink, frothy sputum with HAPE)</li>
                    <li>• Inability to walk in a straight line (ataxia)</li>
                    <li>• Extreme fatigue or inability to get out of bed</li>
                    <li>• Gurgling breath sounds</li>
                    <li>• Blue or gray lips/fingernails (cyanosis)</li>
                  </ul>
                  <p className="text-xs mt-3 text-red-800 dark:text-red-400">
                    Action: DESCEND IMMEDIATELY. This is life-threatening. Evacuate to hospital.
                    Do not wait for morning. Do not leave the person alone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prevention Strategies Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Prevention Strategies
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Ascend gradually</h3>
                    <p className="text-sm mt-1">
                      Above 3,000 meters, limit your daily gain in sleeping altitude to 300-500 meters.
                      This is the single most important prevention strategy. Your body needs time to
                      produce more red blood cells and adjust to lower oxygen levels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Plan rest days</h3>
                    <p className="text-sm mt-1">
                      Take a rest day every 3-4 days during your ascent. On rest days, you can hike
                      higher during the day but return to sleep at the same altitude. This "climb
                      high, sleep low" approach aids acclimatization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Stay hydrated</h3>
                    <p className="text-sm mt-1">
                      Drink 3-4 liters of water per day at altitude. You lose more fluid through
                      respiration in dry mountain air. Dehydration worsens altitude sickness
                      symptoms. Monitor urine color – it should be light yellow.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Avoid alcohol initially</h3>
                    <p className="text-sm mt-1">
                      Skip alcohol for the first 48-72 hours at altitude. Alcohol depresses
                      breathing during sleep and worsens dehydration. Both effects increase
                      altitude sickness risk.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Consider acetazolamide (Diamox)</h3>
                    <p className="text-sm mt-1">
                      This prescription medication speeds acclimatization by stimulating breathing.
                      Typical dose: 125-250mg twice daily, starting one day before ascent. Consult
                      a doctor – it's not suitable for everyone (especially those with sulfa
                      allergies).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    6
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Eat well</h3>
                    <p className="text-sm mt-1">
                      Maintain a high-carbohydrate diet at altitude. Carbs require less oxygen to
                      metabolize than fats or proteins. Don't skip meals even if you've lost your
                      appetite – it's a common AMS symptom.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    What causes altitude sickness?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Altitude sickness is caused by reduced atmospheric pressure at high elevation,
                    which means less oxygen per breath. Your blood oxygen saturation drops, and
                    your body can't deliver enough oxygen to tissues and organs. The brain and
                    lungs are especially sensitive. If you ascend faster than your body can
                    adapt, you get sick.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    How can I prevent altitude sickness?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The best prevention is slow ascent. Above 3,000 meters, gain no more than
                    300-500 meters of sleeping altitude per day. Take rest days every 3-4 days.
                    Stay well hydrated, avoid alcohol early on, and consider acetazolamide if
                    you have a history of AMS. Most importantly – listen to your body and don't
                    push through symptoms.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Who is most at risk for altitude sickness?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Everyone is at risk – fitness, age, and gender don't provide reliable protection.
                    The biggest risk factors are rapid ascent, high sleeping altitude, and previous
                    history of altitude sickness. People living at sea level are more susceptible
                    than those who live at moderate altitude. Some individuals appear genetically
                    prone to AMS, but there's no way to know before you're at altitude.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    How long does altitude sickness last?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mild AMS typically resolves within 24-48 hours if you rest at the same altitude.
                    Symptoms should improve as your body acclimatizes. If symptoms persist beyond
                    48 hours or worsen, you need to descend. Severe forms (HAPE, HACE) require
                    immediate descent and medical care – they won't resolve on their own and can
                    be fatal within hours if ignored.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    When should I descend?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Descend immediately if: symptoms worsen despite rest, you develop moderate
                    symptoms (severe headache, vomiting, breathlessness at rest), or you show
                    any signs of HAPE or HACE (confusion, cough, inability to walk straight).
                    Don't wait for morning. Don't try to "sleep it off." A 500-1000 meter descent
                    often brings rapid relief. Your ego isn't worth dying for – there will be
                    other climbs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Related Tools
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/calculators/air-density-calculator"
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                >
                  <h3 className="font-medium text-foreground group-hover:text-primary text-sm">
                    Air Density Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Calculate air density at different altitudes and conditions
                  </p>
                </a>
                <a
                  href="/calculators/hiking-pace-calculator"
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                >
                  <h3 className="font-medium text-foreground group-hover:text-primary text-sm">
                    Hiking Pace Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimate hiking time based on distance and elevation gain
                  </p>
                </a>
                <a
                  href="/calculators/water-requirement-calculator"
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                >
                  <h3 className="font-medium text-foreground group-hover:text-primary text-sm">
                    Water Requirement Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Calculate daily water needs for outdoor activities
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
