"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VO2MaxCalculator() {
  const [method, setMethod] = useState<"resting" | "cooper">("resting");
  const [age, setAge] = useState<string>("");
  const [restingHR, setRestingHR] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [vo2Max, setVo2Max] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    let result: number;

    if (method === "resting") {
      const ageValue = parseFloat(age);
      const restingHRValue = parseFloat(restingHR);

      if (isNaN(ageValue) || isNaN(restingHRValue) || ageValue <= 0 || restingHRValue <= 0) return;

      const maxHR = 220 - ageValue;
      result = 15 * (maxHR / restingHRValue);
    } else {
      const ageValue = parseFloat(age);
      const distanceValue = parseFloat(distance);

      if (isNaN(ageValue) || isNaN(distanceValue) || ageValue <= 0 || distanceValue <= 0) return;

      // Cooper test formula: VO2max = (distance in meters - 504.9) / 44.73
      const distanceInMeters = distanceValue * 1000;
      result = (distanceInMeters - 504.9) / 44.73;
    }

    const roundedResult = Math.round(result * 10) / 10;
    setVo2Max(roundedResult);

    // Categorize based on age and gender norms (simplified)
    const ageValue = parseFloat(age) || 30;
    if (roundedResult < 25) {
      setCategory("Poor");
    } else if (roundedResult < 33) {
      setCategory("Fair");
    } else if (roundedResult < 42) {
      setCategory("Good");
    } else if (roundedResult < 52) {
      setCategory("Excellent");
    } else {
      setCategory("Superior");
    }
  };

  const reset = () => {
    setAge("");
    setRestingHR("");
    setDistance("");
    setVo2Max(null);
    setCategory("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>VO2 Max Calculator – Estimate Your Aerobic Fitness Level</CardTitle>
          <CardDescription>
            Measure your cardiovascular fitness with our VO2 max calculator. Estimate your maximal oxygen uptake using simple field test data and compare your results to fitness norms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as "resting" | "cooper")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resting">Resting Heart Rate Method</SelectItem>
                  <SelectItem value="cooper">Cooper Test (12-minute run)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {method === "resting" ? (
              <div>
                <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
                <Input
                  id="restingHR"
                  type="number"
                  placeholder="e.g., 60"
                  value={restingHR}
                  onChange={(e) => setRestingHR(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Measure your resting HR first thing in the morning</p>
              </div>
            ) : (
              <div>
                <Label htmlFor="distance">Distance Covered (km in 12 minutes)</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2.5"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">How far did you run in 12 minutes?</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate VO2 Max</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {vo2Max !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your VO2 Max</p>
                <p className="text-4xl font-bold mt-1">{vo2Max} <span className="text-lg font-normal">ml/kg/min</span></p>
                <p className="text-lg font-medium mt-2">Category: <span className="text-primary">{category}</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is VO2 Max?</CardTitle>
          <CardDescription>Understanding your aerobic fitness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            VO2 max measures the maximum amount of oxygen your body can use during intense exercise. It's expressed in milliliters of oxygen per kilogram of body weight per minute (ml/kg/min). Think of it as your engine size – bigger is better.
          </p>
          <p className="text-sm text-muted-foreground">
            Athletes care about VO2 max because it predicts endurance performance. The higher your number, the more oxygen you can deliver to working muscles, the longer you can sustain hard efforts. Tour de France cyclists typically score 70-85. Average folks? More like 30-40.
          </p>
          <p className="text-sm text-muted-foreground">
            You can improve your VO2 max with training. High-intensity interval work – those brutally hard efforts that leave you gasping – produces the biggest gains. Most people can boost their score by 10-20% with consistent training over a few months.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>VO2 Max Calculation Methods</CardTitle>
          <CardDescription>Two ways to estimate your fitness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Resting Heart Rate Method</h4>
            <p className="text-xs text-muted-foreground mb-3">
              This method uses the relationship between resting heart rate and fitness. Fitter people have lower resting heart rates because their hearts pump more blood per beat. The formula: VO2 max = 15 × (max HR ÷ resting HR), where max HR = 220 - age.
            </p>
            <p className="text-xs text-muted-foreground">
              Best for: People who can accurately measure their resting heart rate. Take it first thing in the morning, before getting out of bed, for the most reliable reading.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Cooper Test Method</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Developed by Dr. Kenneth Cooper in 1968 for the U.S. military. Run as far as you can in 12 minutes, then plug the distance into the formula. It's harder but more accurate for trained athletes.
            </p>
            <p className="text-xs text-muted-foreground">
              Best for: Runners and athletes who can push themselves hard for 12 minutes. Requires a track or measured course and a serious willingness to suffer.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>VO2 Max Norms by Age and Gender</CardTitle>
          <CardDescription>How you compare to others</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Men (20-29)</TableHead>
                <TableHead>Women (20-29)</TableHead>
                <TableHead>Men (30-39)</TableHead>
                <TableHead>Women (30-39)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Superior</TableCell>
                <TableCell className="font-mono text-xs">&gt;51</TableCell>
                <TableCell className="font-mono text-xs">&gt;48</TableCell>
                <TableCell className="font-mono text-xs">&gt;48</TableCell>
                <TableCell className="font-mono text-xs">&gt;45</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Excellent</TableCell>
                <TableCell className="font-mono text-xs">40-51</TableCell>
                <TableCell className="font-mono text-xs">37-48</TableCell>
                <TableCell className="font-mono text-xs">38-48</TableCell>
                <TableCell className="font-mono text-xs">35-45</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Good</TableCell>
                <TableCell className="font-mono text-xs">30-39</TableCell>
                <TableCell className="font-mono text-xs">30-36</TableCell>
                <TableCell className="font-mono text-xs">29-37</TableCell>
                <TableCell className="font-mono text-xs">28-34</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fair</TableCell>
                <TableCell className="font-mono text-xs">22-29</TableCell>
                <TableCell className="font-mono text-xs">24-29</TableCell>
                <TableCell className="font-mono text-xs">22-28</TableCell>
                <TableCell className="font-mono text-xs">22-27</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Poor</TableCell>
                <TableCell className="font-mono text-xs">&lt;22</TableCell>
                <TableCell className="font-mono text-xs">&lt;24</TableCell>
                <TableCell className="font-mono text-xs">&lt;22</TableCell>
                <TableCell className="font-mono text-xs">&lt;22</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Source: Adapted from American College of Sports Medicine guidelines. Values are ml/kg/min.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Improve Your VO2 Max</CardTitle>
          <CardDescription>Training strategies that work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">High-Intensity Interval Training (HIIT)</p>
                <p className="text-xs text-muted-foreground">Four to six rounds of 3-5 minutes at 90-95% of max heart rate, with equal rest between intervals. This is the gold standard for VO2 max improvement.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Tempo Runs</p>
                <p className="text-xs text-muted-foreground">Sustained efforts of 20-40 minutes at "comfortably hard" pace – about 85-90% of max heart rate. Builds your aerobic engine without the brutality of intervals.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Base Training</p>
                <p className="text-xs text-muted-foreground">Long, slow distance work builds the aerobic foundation. Most elite endurance athletes spend 80% of training time at easy paces. Boring but effective.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good VO2 max score?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on your age and gender. For a 25-year-old man, 40-45 is solid. For a 25-year-old woman, 35-40 is comparable. Elite endurance athletes often score 60+. Don't compare yourself to Olympians – compare yourself to your age group.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this VO2 max calculator?</h4>
            <p className="text-xs text-muted-foreground">
              Field tests like these get you within 10-15% of lab-tested values. The Cooper test tends to be more accurate for trained runners. Resting heart rate method works better for sedentary folks. For a precise number, you'd need a metabolic cart and a really expensive treadmill.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does VO2 max matter for non-athletes?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Higher VO2 max correlates with lower risk of heart disease, better cognitive function, and longer lifespan. A 2018 study found that every 1-MET increase in cardiorespiratory fitness reduced mortality risk by about 13%. It's not just for runners.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I improve my VO2 max without running?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. Cycling, rowing, swimming, and even circuit training can boost your VO2 max. The key is intensity – you need to get your heart rate up to 85-95% of maximum, regardless of the activity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does VO2 max decrease with age?</h4>
            <p className="text-xs text-muted-foreground">
              Max heart rate drops about 1 beat per minute per year. Muscle mass declines. Recovery slows. But here's the good news: trained 60-year-olds often have better VO2 max than sedentary 20-year-olds. Training slows the decline significantly.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/heart-rate-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Heart Rate Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate target heart rate zones</p>
            </a>
            <a href="/calculators/running-pace-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Running Pace Calculator</p>
              <p className="text-xs text-muted-foreground">Plan your race pace</p>
            </a>
            <a href="/calculators/calorie-burn-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Calorie Burn Calculator</p>
              <p className="text-xs text-muted-foreground">Track calories burned during exercise</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
