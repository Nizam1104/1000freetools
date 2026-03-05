"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Timer, Activity, TrendingUp } from "lucide-react";

interface CooperTestResult {
  vo2Max: number;
  fitnessLevel: string;
  category: string;
  distancePerMinute: number;
}

export default function CooperTestCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<CooperTestResult | null>(null);

  const calculateCooperTest = () => {
    const dist = parseFloat(distance);
    const ageNum = parseFloat(age);

    if (isNaN(dist) || isNaN(ageNum) || dist <= 0 || ageNum <= 0) {
      setResult(null);
      return;
    }

    const vo2Max = (dist - 504.9) / 44.73;
    const distancePerMinute = dist / 12;

    let fitnessLevel = "";
    let category = "";

    if (gender === "male") {
      if (ageNum <= 29) {
        if (dist >= 2800) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2400) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 2200) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1600) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else if (ageNum <= 39) {
        if (dist >= 2700) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2300) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 2000) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1500) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else if (ageNum <= 49) {
        if (dist >= 2500) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2100) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1700) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1400) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else {
        if (dist >= 2400) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2000) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1600) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1300) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      }
    } else {
      if (ageNum <= 29) {
        if (dist >= 2700) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2200) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1800) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1500) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else if (ageNum <= 39) {
        if (dist >= 2500) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 2000) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1700) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1400) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else if (ageNum <= 49) {
        if (dist >= 2400) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 1900) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1500) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1200) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      } else {
        if (dist >= 2200) { fitnessLevel = "Excellent"; category = "Superior"; }
        else if (dist >= 1700) { fitnessLevel = "Good"; category = "Above Average"; }
        else if (dist >= 1400) { fitnessLevel = "Average"; category = "Average"; }
        else if (dist >= 1100) { fitnessLevel = "Fair"; category = "Below Average"; }
        else { fitnessLevel = "Poor"; category = "Very Poor"; }
      }
    }

    setResult({
      vo2Max: Math.round(vo2Max * 10) / 10,
      fitnessLevel,
      category,
      distancePerMinute: Math.round(distancePerMinute * 10) / 10,
    });
  };

  const reset = () => {
    setDistance("");
    setAge("");
    setResult(null);
  };

  useEffect(() => {
    calculateCooperTest();
  }, [distance, age, gender]);

  const getFitnessColor = (level: string) => {
    switch (level) {
      case "Excellent": return "text-green-500 bg-green-500/10";
      case "Good": return "text-blue-500 bg-blue-500/10";
      case "Average": return "text-yellow-500 bg-yellow-500/10";
      case "Fair": return "text-orange-500 bg-orange-500/10";
      case "Poor": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Cooper Test Calculator – Calculate VO2 Max from 12-Minute Run</h1>
          <p className="text-muted-foreground">
            Estimate your VO2 max and aerobic fitness with the Cooper 12-minute run test. Used by athletes, military, and fitness professionals worldwide to assess cardiovascular endurance and track training progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance Covered (meters)</Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="e.g., 2400"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  The Cooper test requires running as far as possible in exactly 12 minutes on a flat surface or track.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCooperTest} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Fitness Assessment</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated VO2 Max</p>
                    <p className="text-3xl font-bold text-primary">{result.vo2Max} ml/kg/min</p>
                  </div>

                  <div className={`p-4 rounded-lg ${getFitnessColor(result.fitnessLevel)}`}>
                    <p className="text-sm text-muted-foreground">Fitness Level</p>
                    <p className="text-2xl font-bold">{result.fitnessLevel}</p>
                    <p className="text-sm">{result.category}</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Average Pace</p>
                    <p className="text-lg font-semibold">{result.distancePerMinute} m/min</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> VO2 max = (distance - 504.9) / 44.73</p>
                    <p className="mt-1">Distance in meters, result in ml/kg/min</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your Cooper test results to assess fitness</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">VO2 Max Standards</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Male Standards (age 20-29):
                </h4>
                <ul className="space-y-1">
                  <li><span className="text-green-500 font-medium">Excellent:</span> 2800m+ (VO2 max 52+)</li>
                  <li><span className="text-blue-500 font-medium">Good:</span> 2400-2799m (VO2 max 43-51)</li>
                  <li><span className="text-yellow-500 font-medium">Average:</span> 2200-2399m (VO2 max 38-42)</li>
                  <li><span className="text-orange-500 font-medium">Fair:</span> 1600-2199m (VO2 max 25-37)</li>
                  <li><span className="text-red-500 font-medium">Poor:</span> &lt;1600m (VO2 max &lt;25)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Female Standards (age 20-29):
                </h4>
                <ul className="space-y-1">
                  <li><span className="text-green-500 font-medium">Excellent:</span> 2700m+ (VO2 max 49+)</li>
                  <li><span className="text-blue-500 font-medium">Good:</span> 2200-2699m (VO2 max 40-48)</li>
                  <li><span className="text-yellow-500 font-medium">Average:</span> 1800-2199m (VO2 max 35-39)</li>
                  <li><span className="text-orange-500 font-medium">Fair:</span> 1500-1799m (VO2 max 22-34)</li>
                  <li><span className="text-red-500 font-medium">Poor:</span> &lt;1500m (VO2 max &lt;22)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Perform the Cooper Test</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Warm Up</h3>
                <p className="text-sm text-muted-foreground">Do 10-15 minutes of light jogging and dynamic stretching.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Run 12 Minutes</h3>
                <p className="text-sm text-muted-foreground">Run as far as possible in exactly 12 minutes on a track or flat surface.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Measure Distance</h3>
                <p className="text-sm text-muted-foreground">Record the total distance covered in meters as accurately as possible.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Get VO2 Max</h3>
                <p className="text-sm text-muted-foreground">Enter distance, age, and gender to calculate your fitness level.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  VO2 Max Estimation
                </h3>
                <p className="text-sm text-muted-foreground">Calculate maximal oxygen uptake using the validated Cooper equation.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Age & Gender Norms
                </h3>
                <p className="text-sm text-muted-foreground">Compare results against standardized fitness tables by age and gender.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Fitness Classification
                </h3>
                <p className="text-sm text-muted-foreground">Get instant feedback on your cardiovascular fitness level.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Training Benchmark
                </h3>
                <p className="text-sm text-muted-foreground">Track improvements in aerobic capacity over time with repeat testing.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the Cooper test?</h3>
                <p className="text-sm text-muted-foreground">The Cooper 12-minute run test measures aerobic fitness by having you run as far as possible in 12 minutes. Distance covered correlates with VO2 max, the gold standard for cardiovascular fitness.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How accurate is the Cooper test VO2 max?</h3>
                <p className="text-sm text-muted-foreground">Studies show correlation of 0.90+ with laboratory VO2 max testing. Accuracy depends on running economy and motivation. Best for tracking changes in the same person over time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a good Cooper test score?</h3>
                <p className="text-sm text-muted-foreground">For men 20-29, 2400m+ is good to excellent. For women 20-29, 2200m+ is good to excellent. Scores decrease with age. Elite endurance athletes exceed 3000m (men) or 2700m (women).</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How often should I do the Cooper test?</h3>
                <p className="text-sm text-muted-foreground">Test every 6-8 weeks during training cycles. Allow full recovery between tests. Don't test when injured, ill, or fatigued from hard training.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I walk during the Cooper test?</h3>
                <p className="text-sm text-muted-foreground">Yes, but the goal is maximum distance. Brief walk breaks are fine if needed, but continuous running at a sustainable hard pace typically produces the best results.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/running-split-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Running Split Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate pace splits for races and training runs.</p>
              </a>
              <a href="/calculators/met-calorie-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">MET Calorie Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate calories burned during physical activities.</p>
              </a>
              <a href="/calculators/heart-rate-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Heart Rate Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate target heart rate zones for training.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
