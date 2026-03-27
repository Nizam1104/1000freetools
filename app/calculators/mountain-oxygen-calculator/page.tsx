"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


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
                    <p className={`text-3xl font-bold ${result.riskLevel === "No Risk" ? "text-green-500" :
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Mountain Oxygen Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your altitude</p>
                    <p>Input the elevation you will be at. This could be a mountain peak, ski resort, or flight altitude.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your unit of measurement</p>
                    <p>Choose meters or feet depending on how your altitude is measured. Most international maps use meters.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review oxygen availability</p>
                    <p>Click Calculate to see oxygen partial pressure, atmospheric pressure percentage, and altitude sickness risk level.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Oxygen Levels at Different Altitudes
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Altitude</th>
                      <th className="text-right py-3 px-2 font-semibold">Pressure</th>
                      <th className="text-right py-3 px-2 font-semibold">O2 Partial Pressure</th>
                      <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Sea Level (0m)</td>
                      <td className="text-right py-3 px-2">101.3 kPa</td>
                      <td className="text-right py-3 px-2">21.2 kPa</td>
                      <td className="text-left py-3 px-2">No Risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Denver, CO (1,600m)</td>
                      <td className="text-right py-3 px-2">83.5 kPa</td>
                      <td className="text-right py-3 px-2">17.5 kPa</td>
                      <td className="text-left py-3 px-2">Low Risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Mount Rainier (4,392m)</td>
                      <td className="text-right py-3 px-2">58.9 kPa</td>
                      <td className="text-right py-3 px-2">12.3 kPa</td>
                      <td className="text-left py-3 px-2">High Risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Everest Base Camp (5,364m)</td>
                      <td className="text-right py-3 px-2">51.3 kPa</td>
                      <td className="text-right py-3 px-2">10.7 kPa</td>
                      <td className="text-left py-3 px-2">Very High Risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Mount Everest Summit (8,849m)</td>
                      <td className="text-right py-3 px-2">33.7 kPa</td>
                      <td className="text-right py-3 px-2">7.0 kPa</td>
                      <td className="text-left py-3 px-2">Death Zone</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Commercial Flight (10,000m)</td>
                      <td className="text-right py-3 px-2">26.5 kPa</td>
                      <td className="text-right py-3 px-2">5.5 kPa</td>
                      <td className="text-left py-3 px-2">Cabin Pressurized</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Altitude and Oxygen
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Oxygen Decreases with Altitude</h4>
                  <p>
                    The percentage of oxygen in air stays constant at about 21% at all altitudes. What changes
                    is atmospheric pressure. At higher elevations, there is less air above you pushing down,
                    so air molecules are more spread out. This means each breath contains fewer oxygen molecules
                    even though the percentage is the same. Your body must work harder to get the oxygen it needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Altitude Sickness Occurs</h4>
                  <p>
                    Acute Mountain Sickness (AMS) happens when you ascend faster than your body can adapt.
                    Symptoms include headache, nausea, fatigue, and dizziness. Mild AMS affects about 25% of
                    people above 2,500m and up to 80% above 4,000m. Severe forms like HAPE (fluid in lungs)
                    and HACE (brain swelling) are life-threatening and require immediate descent.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Acclimatization Process</h4>
                  <p>
                    Your body adapts to altitude over days to weeks. Breathing rate increases immediately.
                    Over 2-5 days, your body produces more red blood cells to carry oxygen. Full acclimatization
                    can take weeks at extreme altitudes. The general rule is to ascend no more than 300-500m
                    per day above 3,000m and take rest days every 1,000m gained.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                High Altitude Safety Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ascend gradually</p>
                    <p>Climb high, sleep low. Do not increase sleeping elevation by more than 500m per day above 3,000m.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Stay hydrated</p>
                    <p>Drink 3-4 liters of water daily. Dehydration worsens altitude sickness symptoms significantly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know when to descend</p>
                    <p>If symptoms worsen or do not improve with rest, descend immediately. No summit is worth your life.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider medication</p>
                    <p>Acetazolamide (Diamox) can help prevent AMS. Consult a doctor before your trip. Start taking it 24 hours before ascent.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "At what altitude does oxygen become dangerous?",
    answer: "Most people start feeling effects above 2,500m (8,200ft). Serious risk begins around 3,500m (11,500ft). Above 5,500m (18,000ft), the body cannot fully acclimatize and will deteriorate over time. The death zone above 8,000m (26,000ft) has insufficient oxygen to sustain human life for extended periods without supplemental oxygen.",
  },
{
    question: "Does fitness protect against altitude sickness?",
    answer: "No. Fitness does not prevent altitude sickness. Some studies suggest fit people may be at higher risk because they push harder and ascend faster. Altitude sickness affects everyone regardless of age, fitness, or previous high-altitude experience. The only prevention is gradual ascent and proper acclimatization.",
  },
{
    question: "How long does it take to acclimatize?",
    answer: "Initial adaptation takes 2-5 days at a given altitude. Full acclimatization to 4,000m can take 2-3 weeks. Above 5,000m, complete acclimatization is not possible — the body will eventually deteriorate even with proper acclimatization. Plan rest days and gradual ascent.",
  },
{
    question: "Can you sleep at high altitude safely?",
    answer: "Yes, with proper precautions. Sleep altitude should not exceed 300-500m above your previous night's elevation. Many climbers use the climb high, sleep low strategy — ascending during the day but returning to lower elevation to sleep. This aids acclimatization while reducing risk.",
  },
{
    question: "What are the signs of severe altitude sickness?",
    answer: "Warning signs include severe headache unrelieved by medication, persistent vomiting, difficulty walking (ataxia), confusion, cough with pink frothy sputum (HAPE), or altered consciousness (HACE). These are medical emergencies requiring immediate descent of at least 500-1,000m and evacuation if possible.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
