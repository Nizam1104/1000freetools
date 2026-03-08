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

interface GrowthResult {
  ageMonths: number;
  heightPercentile: number;
  weightPercentile: number;
  heightZScore: number;
  weightZScore: number;
  heightStatus: string;
  weightStatus: string;
  bmi: number;
  bmiPercentile: number;
  bmiStatus: string;
  recommendations: string[];
}

// Simplified WHO growth chart percentiles (approximate medians and SD)
const whoBoysLength = [
  { age: 0, median: 49.9, sd: 1.9 },
  { age: 3, median: 61.4, sd: 2.1 },
  { age: 6, median: 67.6, sd: 2.2 },
  { age: 9, median: 72.0, sd: 2.3 },
  { age: 12, median: 75.7, sd: 2.4 },
  { age: 18, median: 82.3, sd: 2.6 },
  { age: 24, median: 87.1, sd: 2.7 },
];

const whoBoysWeight = [
  { age: 0, median: 3.3, sd: 0.4 },
  { age: 3, median: 6.4, sd: 0.7 },
  { age: 6, median: 7.9, sd: 0.8 },
  { age: 9, median: 8.9, sd: 0.9 },
  { age: 12, median: 9.6, sd: 1.0 },
  { age: 18, median: 10.9, sd: 1.1 },
  { age: 24, median: 12.2, sd: 1.2 },
];

const whoGirlsLength = [
  { age: 0, median: 49.1, sd: 1.8 },
  { age: 3, median: 59.8, sd: 2.0 },
  { age: 6, median: 65.7, sd: 2.1 },
  { age: 9, median: 70.1, sd: 2.2 },
  { age: 12, median: 74.0, sd: 2.3 },
  { age: 18, median: 80.7, sd: 2.5 },
  { age: 24, median: 85.7, sd: 2.6 },
];

const whoGirlsWeight = [
  { age: 0, median: 3.2, sd: 0.4 },
  { age: 3, median: 5.8, sd: 0.6 },
  { age: 6, median: 7.3, sd: 0.7 },
  { age: 9, median: 8.2, sd: 0.8 },
  { age: 12, median: 8.9, sd: 0.9 },
  { age: 18, median: 10.2, sd: 1.0 },
  { age: 24, median: 11.5, sd: 1.1 },
];

export default function ToddlerGrowthChartCalculatorPage() {
  const [age, setAge] = useState<string>("");
  const [ageUnit, setAgeUnit] = useState<string>("months");
  const [height, setHeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [gender, setGender] = useState<string>("boy");
  const [result, setResult] = useState<GrowthResult | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) return;

    // Convert age to months
    let ageMonths = ageNum;
    if (ageUnit === "years") {
      ageMonths = ageNum * 12;
    }

    // Convert height to cm
    let heightCm = heightNum;
    if (heightUnit === "inches") {
      heightCm = heightNum * 2.54;
    }

    // Convert weight to kg
    let weightKg = weightNum;
    if (weightUnit === "lbs") {
      weightKg = weightNum / 2.205;
    }

    // Select appropriate chart
    const lengthChart = gender === "boy" ? whoBoysLength : whoGirlsLength;
    const weightChart = gender === "boy" ? whoBoysWeight : whoGirlsWeight;

    // Find closest age data points
    const findClosestData = (chart: typeof whoBoysLength, age: number) => {
      // Find bracketing ages
      let lower = chart[0];
      let upper = chart[chart.length - 1];

      for (let i = 0; i < chart.length - 1; i++) {
        if (chart[i].age <= age && chart[i + 1].age >= age) {
          lower = chart[i];
          upper = chart[i + 1];
          break;
        }
      }

      // Interpolate
      const t = age === lower.age ? 0 : (age - lower.age) / (upper.age - lower.age);
      return {
        median: lower.median + t * (upper.median - lower.median),
        sd: lower.sd + t * (upper.sd - lower.sd),
      };
    };

    const heightData = findClosestData(lengthChart, ageMonths);
    const weightData = findClosestData(weightChart, ageMonths);

    // Calculate Z-scores
    const heightZScore = (heightCm - heightData.median) / heightData.sd;
    const weightZScore = (weightKg - weightData.median) / weightData.sd;

    // Convert Z-scores to percentiles (approximation using normal distribution)
    const zToPercentile = (z: number): number => {
      // Approximation of normal CDF
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return z > 0 ? (1 - p) * 100 : p * 100;
    };

    const heightPercentile = zToPercentile(heightZScore);
    const weightPercentile = zToPercentile(weightZScore);

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // BMI Z-score approximation for toddlers
    const bmiZScore = (bmi - 16) / 2; // Simplified
    const bmiPercentile = zToPercentile(bmiZScore);

    // Determine status
    const getStatus = (percentile: number): string => {
      if (percentile < 3) return "Underweight (<3rd percentile)";
      if (percentile < 15) return "Low (3rd-15th percentile)";
      if (percentile < 85) return "Normal (15th-85th percentile)";
      if (percentile < 97) return "High (85th-97th percentile)";
      return "Very High (>97th percentile)";
    };

    const heightStatus = getStatus(heightPercentile);
    const weightStatus = getStatus(weightPercentile);
    const bmiStatus = getStatus(bmiPercentile);

    // Generate recommendations
    const recommendations: string[] = [];
    if (weightPercentile < 15) {
      recommendations.push("Consider consulting pediatrician about nutrition intake.");
      recommendations.push("Ensure frequent, nutrient-dense meals.");
    } else if (weightPercentile > 85) {
      recommendations.push("Focus on balanced nutrition and active play.");
      recommendations.push("Avoid restrictive diets; consult pediatrician.");
    } else {
      recommendations.push("Great growth pattern! Continue current feeding approach.");
    }

    if (Math.abs(heightPercentile - weightPercentile) > 40) {
      recommendations.push("Significant height/weight percentile difference. Discuss with pediatrician.");
    }

    setResult({
      ageMonths,
      heightPercentile: parseFloat(heightPercentile.toFixed(1)),
      weightPercentile: parseFloat(weightPercentile.toFixed(1)),
      heightZScore: parseFloat(heightZScore.toFixed(2)),
      weightZScore: parseFloat(weightZScore.toFixed(2)),
      heightStatus,
      weightStatus,
      bmi: parseFloat(bmi.toFixed(1)),
      bmiPercentile: parseFloat(bmiPercentile.toFixed(1)),
      bmiStatus,
      recommendations,
    });
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child
          </h1>
          <p className="text-muted-foreground">
            Monitor your child&apos;s healthy development with our Toddler Growth Chart Calculator.
            Enter age, height, and weight to plot on WHO/CDC growth charts and see height and weight
            percentile rankings — helping parents identify growth patterns early.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="girl">Girl</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="age-unit">Unit</Label>
                  <Select value={ageUnit} onValueChange={setAgeUnit}>
                    <SelectTrigger id="age-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height-unit">Unit</Label>
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger id="height-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="inches">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="weight-unit">Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="weight-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Growth Chart Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Height Percentile</p>
                      <p className="text-2xl font-bold text-primary">{result.heightPercentile}%</p>
                      <p className="text-xs text-muted-foreground mt-1">{result.heightStatus}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Weight Percentile</p>
                      <p className="text-2xl font-bold text-primary">{result.weightPercentile}%</p>
                      <p className="text-xs text-muted-foreground mt-1">{result.weightStatus}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">BMI:</span>
                      <span className="font-semibold">{result.bmi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">BMI Percentile:</span>
                      <span className="font-semibold">{result.bmiPercentile}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">BMI Status:</span>
                      <span className="font-semibold">{result.bmiStatus}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Height Z-Score:</span>
                      <span className="font-mono text-sm">{result.heightZScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weight Z-Score:</span>
                      <span className="font-mono text-sm">{result.weightZScore}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Percentiles show how your child compares to
                      WHO growth standards. Consistent growth along a percentile curve is
                      more important than the specific percentile number.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your child&apos;s measurements and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Growth Charts
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Growth charts from WHO and CDC help track your child&apos;s development:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Percentile:</strong> Shows what percentage of children your
                    child&apos;s age are smaller. 50th percentile = average.
                  </li>
                  <li>
                    <strong>Z-Score:</strong> Standard deviations from the median.
                    0 = median, ±1 = 68% of children, ±2 = 95% of children.
                  </li>
                  <li>
                    <strong>Normal Range:</strong> 3rd to 97th percentile is considered normal.
                  </li>
                  <li>
                    <strong>Tracking:</strong> Consistent growth along a curve is more
                    important than the specific percentile.
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculator uses WHO growth standards for
                  children 0-24 months. Always consult your pediatrician for professional
                  growth assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Child Details</h4>
                    <p className="text-xs text-muted-foreground">Select gender and enter age in months or years. Growth charts are gender-specific due to different growth patterns.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Input Measurements</h4>
                    <p className="text-xs text-muted-foreground">Enter height/length and weight. Supports both metric (cm, kg) and imperial (inches, lbs) units.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Percentile Results</h4>
                    <p className="text-xs text-muted-foreground">See height, weight, and BMI percentiles with Z-scores and personalized health recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                WHO Growth Percentile Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Percentile</th>
                      <th className="text-left py-2 px-3 font-semibold">Classification</th>
                      <th className="text-left py-2 px-3 font-semibold">Z-Score</th>
                      <th className="text-left py-2 px-3 font-semibold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">&gt; 97th</td>
                      <td className="py-2 px-3 text-red-600">Very High</td>
                      <td className="py-2 px-3 text-xs">&gt; +2.0</td>
                      <td className="py-2 px-3 text-xs">Significantly above average</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">85th - 97th</td>
                      <td className="py-2 px-3 text-amber-600">High</td>
                      <td className="py-2 px-3 text-xs">+1.0 to +2.0</td>
                      <td className="py-2 px-3 text-xs">Above average growth</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">15th - 85th</td>
                      <td className="py-2 px-3 text-green-600">Normal</td>
                      <td className="py-2 px-3 text-xs">-1.0 to +1.0</td>
                      <td className="py-2 px-3 text-xs">Healthy growth range</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">3rd - 15th</td>
                      <td className="py-2 px-3 text-amber-600">Low</td>
                      <td className="py-2 px-3 text-xs">-2.0 to -1.0</td>
                      <td className="py-2 px-3 text-xs">Below average growth</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">&lt; 3rd</td>
                      <td className="py-2 px-3 text-red-600">Underweight</td>
                      <td className="py-2 px-3 text-xs">&lt; -2.0</td>
                      <td className="py-2 px-3 text-xs">Significantly below average</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">WHO Standards Based</h4>
                  <p className="text-xs text-muted-foreground">Uses World Health Organization growth standards for children 0-24 months, the global reference for healthy growth.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Complete Growth Assessment</h4>
                  <p className="text-xs text-muted-foreground">Calculates height percentile, weight percentile, BMI, and BMI percentile for comprehensive growth tracking.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Z-Score Calculation</h4>
                  <p className="text-xs text-muted-foreground">Provides Z-scores (standard deviations from median) used by healthcare professionals for precise assessment.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Personalized Recommendations</h4>
                  <p className="text-xs text-muted-foreground">Generates age-appropriate nutrition and health guidance based on your child's growth pattern.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What does my child's percentile mean?</h4>
                <p className="text-xs text-muted-foreground">
                  A percentile shows how your child compares to other children the same age. If your child is at the 75th percentile for height, they're taller than 75% of children their age. The 50th percentile is average.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a normal growth percentile for toddlers?</h4>
                <p className="text-xs text-muted-foreground">
                  Any percentile between 3rd and 97th is considered normal. What matters most is consistent growth along a curve. A child consistently at the 10th percentile is growing normally, just smaller than average.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">When should I be concerned about my child's growth?</h4>
                <p className="text-xs text-muted-foreground">
                  Consult your pediatrician if: your child drops across two major percentile lines, is below 3rd or above 97th percentile, or if height and weight percentiles differ by more than 40 points.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a Z-score in growth charts?</h4>
                <p className="text-xs text-muted-foreground">
                  Z-score measures how many standard deviations a measurement is from the median. Z-score of 0 = median (50th percentile), +1 = 84th percentile, -1 = 16th percentile, +2 = 97th percentile.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How often should I track my toddler's growth?</h4>
                <p className="text-xs text-muted-foreground">
                  Pediatricians typically measure at well-child visits: monthly for first 6 months, every 2-3 months until age 1, then every 3-6 months. Home tracking between visits helps identify trends early.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
