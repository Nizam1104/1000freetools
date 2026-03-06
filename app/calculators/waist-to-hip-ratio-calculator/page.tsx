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

export default function WaistToHipRatioCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"cm" | "inches">("cm");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [whr, setWhr] = useState<number | null>(null);
  const [risk, setRisk] = useState<string>("");

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const ratio = w / h;
    setWhr(Math.round(ratio * 100) / 100);

    const lowRisk = gender === "male" ? 0.9 : 0.85;
    const highRisk = gender === "male" ? 1.0 : 0.9;

    if (ratio < lowRisk) {
      setRisk("Low Risk");
    } else if (ratio < highRisk) {
      setRisk("Moderate Risk");
    } else {
      setRisk("High Risk");
    }
  };

  const reset = () => {
    setWaist("");
    setHip("");
    setWhr(null);
    setRisk("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "cm" | "inches")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="inches">Inches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="waist">Waist Circumference ({unit})</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder={unit === "cm" ? "e.g., 80" : "e.g., 32"}
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hip">Hip Circumference ({unit})</Label>
                <Input
                  id="hip"
                  type="number"
                  placeholder={unit === "cm" ? "e.g., 100" : "e.g., 40"}
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate WHR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {whr !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Waist-to-Hip Ratio</p>
                <p className="text-4xl font-bold mt-1">{whr}</p>
                <p className="text-lg font-medium mt-2">Health Risk: {risk}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {gender === "male"
                    ? "Low risk: <0.9 | Moderate: 0.9-1.0 | High: >1.0"
                    : "Low risk: <0.85 | Moderate: 0.85-0.9 | High: >0.9"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is Waist-to-Hip Ratio?</CardTitle>
          <CardDescription>Why body shape matters for health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Waist-to-hip ratio (WHR) compares the circumference of your waist to your hips. It's a quick way to assess where your body stores fat – and that matters because belly fat is more dangerous than fat stored elsewhere.
          </p>
          <p className="text-sm text-muted-foreground">
            People who carry weight around their middle (apple-shaped) face higher health risks than those who carry it in their hips and thighs (pear-shaped). Visceral fat – the kind that wraps around your organs – pumps out inflammatory chemicals and messes with your metabolism.
          </p>
          <p className="text-sm text-muted-foreground">
            The World Health Organization uses WHR to assess cardiovascular risk. A ratio above 0.90 for men or 0.85 for women signals increased risk, even if your BMI is normal. You can be skinny-fat and still be at risk – which is why WHR adds useful information beyond the scale.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Measure Waist and Hips</CardTitle>
          <CardDescription>Get accurate measurements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Waist Measurement</h4>
              <p className="text-xs text-muted-foreground">
                Stand up straight and breathe normally. Place a tape measure around your bare stomach, halfway between the bottom of your ribs and the top of your hip bone. That's usually just above your belly button. Exhale gently and take the measurement. Don't suck in your gut – that defeats the purpose.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Hip Measurement</h4>
              <p className="text-xs text-muted-foreground">
                Stand with your feet together. Wrap the tape measure around the widest part of your hips and buttocks. Keep the tape parallel to the floor and snug but not tight. Check yourself in a mirror – if the tape is angled, you'll get a wrong number.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WHR Health Risk Categories</CardTitle>
          <CardDescription>Risk levels by gender</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Level</TableHead>
                <TableHead>Men</TableHead>
                <TableHead>Women</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-green-600">Low Risk</TableCell>
                <TableCell className="font-mono text-xs">&lt; 0.90</TableCell>
                <TableCell className="font-mono text-xs">&lt; 0.85</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-yellow-600">Moderate Risk</TableCell>
                <TableCell className="font-mono text-xs">0.90 – 1.0</TableCell>
                <TableCell className="font-mono text-xs">0.85 – 0.9</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">High Risk</TableCell>
                <TableCell className="font-mono text-xs">&gt; 1.0</TableCell>
                <TableCell className="font-mono text-xs">&gt; 0.9</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Source: World Health Organization (WHO) guidelines for cardiovascular risk assessment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WHR vs BMI: Which Is Better?</CardTitle>
          <CardDescription>Comparing health indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">BMI (Body Mass Index)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                BMI uses height and weight to estimate body fatness. It's useful for population studies but has serious limitations for individuals.
              </p>
              <p className="text-xs text-muted-foreground">
                Problem: A muscular athlete and a sedentary person can have identical BMIs. BMI doesn't distinguish between muscle and fat, or tell you where fat is stored.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Waist-to-Hip Ratio</h4>
              <p className="text-xs text-muted-foreground mb-2">
                WHR specifically measures fat distribution. It identifies people with dangerous visceral fat, even at normal weights.
              </p>
              <p className="text-xs text-muted-foreground">
                Advantage: WHR predicts cardiovascular risk better than BMI, especially in older adults and postmenopausal women.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Best approach? Use both. BMI gives you a general category. WHR tells you if your fat distribution is healthy. Together, they paint a more complete picture.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Reduce Your Waist-to-Hip Ratio</CardTitle>
          <CardDescription>Evidence-based strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Cut refined carbs and sugar</p>
                <p className="text-xs text-muted-foreground">Studies consistently show that reducing sugar-sweetened beverages and refined grains targets visceral fat specifically. White bread, pastries, and soda are the main culprits.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Increase soluble fiber</p>
                <p className="text-xs text-muted-foreground">Soluble fiber – found in oats, legumes, and fruits – forms a gel in your gut and helps reduce belly fat. Aim for 5-10 grams of soluble fiber daily.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Do aerobic exercise</p>
                <p className="text-xs text-muted-foreground">Cardio – walking, running, cycling – burns visceral fat more effectively than strength training alone. Aim for 150-300 minutes of moderate activity per week.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-medium text-sm">Manage stress and sleep</p>
                <p className="text-xs text-muted-foreground">High cortisol from chronic stress and poor sleep promotes belly fat storage. Seven to eight hours of quality sleep and stress management techniques actually move the needle on waist circumference.</p>
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
            <h4 className="font-semibold text-sm mb-2">What is a healthy waist-to-hip ratio?</h4>
            <p className="text-xs text-muted-foreground">
              For men, below 0.90 is considered low risk. For women, below 0.85. These thresholds come from WHO research linking WHR to cardiovascular disease risk across multiple populations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can WHR be high even with normal BMI?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, and this is common. Someone can have a normal BMI but carry excess fat around their middle – the so-called "TOFI" (thin outside, fat inside) phenotype. These individuals still face elevated metabolic risk despite appearing slim.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do women have different WHR thresholds than men?</h4>
            <p className="text-xs text-muted-foreground">
              Women naturally store more fat in hips and thighs due to estrogen – an evolutionary adaptation for childbearing. After menopause, as estrogen drops, women tend to shift toward abdominal fat storage and their WHR increases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How often should I measure my WHR?</h4>
            <p className="text-xs text-muted-foreground">
              Once a month is sufficient for tracking progress. Measure at the same time of day, ideally in the morning before eating. Small day-to-day fluctuations from food and water weight aren't meaningful – look for trends over weeks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does spot reduction work for belly fat?</h4>
            <p className="text-xs text-muted-foreground">
              No. Crunches and planks strengthen abdominal muscles but don't specifically burn the fat covering them. Visceral fat responds to overall calorie deficit and aerobic exercise, not targeted ab workouts.
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
            <a href="/calculators/bmi-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">BMI Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate your body mass index</p>
            </a>
            <a href="/calculators/body-fat-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Body Fat Calculator</p>
              <p className="text-xs text-muted-foreground">Estimate body fat percentage</p>
            </a>
            <a href="/calculators/waist-to-height-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Waist-to-Height Ratio</p>
              <p className="text-xs text-muted-foreground">Another health risk indicator</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
