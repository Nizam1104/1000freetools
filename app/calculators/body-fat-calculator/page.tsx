"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [neck, setNeck] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    const ht = parseFloat(height);

    if (isNaN(n) || isNaN(w) || isNaN(ht) || n <= 0 || w <= 0 || ht <= 0) return;
    if (gender === "female" && (isNaN(h) || h <= 0)) return;

    let bodyFatValue: number;

    if (unit === "metric") {
      // Convert cm to inches for US Navy formula
      const neckInches = n / 2.54;
      const waistInches = w / 2.54;
      const hipInches = h / 2.54;
      const heightInches = ht / 2.54;

      if (gender === "male") {
        // US Navy formula for men: 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76
        bodyFatValue = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
      } else {
        // US Navy formula for women: 163.205×log10(waist+hip-neck) - 97.684×log10(height) - 78.387
        bodyFatValue = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
      }
    } else {
      // Already in inches
      if (gender === "male") {
        bodyFatValue = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(ht) + 36.76;
      } else {
        bodyFatValue = 163.205 * Math.log10(w + h - n) - 97.684 * Math.log10(ht) - 78.387;
      }
    }

    bodyFatValue = Math.round(bodyFatValue * 10) / 10;
    setBodyFat(bodyFatValue);

    // Determine category based on gender and body fat percentage
    let cat: string;
    if (gender === "male") {
      if (bodyFatValue < 2) cat = "Essential Fat";
      else if (bodyFatValue < 6) cat = "Athletes";
      else if (bodyFatValue < 14) cat = "Fitness";
      else if (bodyFatValue < 18) cat = "Average";
      else cat = "Obese";
    } else {
      if (bodyFatValue < 10) cat = "Essential Fat";
      else if (bodyFatValue < 14) cat = "Athletes";
      else if (bodyFatValue < 21) cat = "Fitness";
      else if (bodyFatValue < 25) cat = "Average";
      else cat = "Obese";
    }
    setCategory(cat);
  };

  const reset = () => {
    setNeck("");
    setWaist("");
    setHip("");
    setHeight("");
    setBodyFat(null);
    setCategory("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
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
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="neck">Neck Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="neck"
                type="number"
                placeholder={unit === "metric" ? "e.g., 38" : "e.g., 15"}
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="waist">Waist Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="waist"
                type="number"
                placeholder={unit === "metric" ? "e.g., 82" : "e.g., 32"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
            </div>

            {gender === "female" && (
              <div>
                <Label htmlFor="hip">Hip Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
                <Input
                  id="hip"
                  type="number"
                  placeholder={unit === "metric" ? "e.g., 95" : "e.g., 37"}
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Body Fat</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bodyFat !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Body Fat Percentage</p>
                <p className="text-4xl font-bold mt-1">{bodyFat}%</p>
                <p className="text-lg font-medium mt-2">Category: {category}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Body Fat Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select gender and unit system</p>
                  <p>Choose male or female, and select metric (cm) or imperial (inches) for measurements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Take your body measurements</p>
                  <p>Measure neck, waist, and hip circumference. Use a flexible tape measure at the specified locations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate and review results</p>
                  <p>Get your estimated body fat percentage along with your fitness category classification.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Body Fat Categories by Gender
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Category</th>
                    <th className="text-left py-3 px-2 font-semibold">Men</th>
                    <th className="text-left py-3 px-2 font-semibold">Women</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Essential Fat</td>
                    <td className="py-3 px-2">2-5%</td>
                    <td className="py-3 px-2">10-13%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Athletes</td>
                    <td className="py-3 px-2">6-13%</td>
                    <td className="py-3 px-2">14-20%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Fitness</td>
                    <td className="py-3 px-2">14-17%</td>
                    <td className="py-3 px-2">21-24%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Average</td>
                    <td className="py-3 px-2">18-24%</td>
                    <td className="py-3 px-2">25-31%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Obese</td>
                    <td className="py-3 px-2">25%+</td>
                    <td className="py-3 px-2">32%+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Women naturally carry more body fat than men due to hormonal and reproductive needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Body Fat Percentage
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Body Fat Matters</h4>
                <p>
                  Body fat percentage is a better health indicator than weight or BMI alone. It distinguishes between
                  fat mass and lean mass, giving a clearer picture of body composition. Two people can weigh the same
                  but have very different body fat percentages based on muscle mass.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The US Navy Method</h4>
                <p>
                  This calculator uses the U.S. Navy body fat formula, which estimates body fat from circumference
                  measurements. For men, it uses neck and waist measurements. For women, it adds hip circumference.
                  The formula accounts for the fact that fat tends to accumulate differently in men and women.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Essential vs Storage Fat</h4>
                <p>
                  Essential fat is necessary for normal bodily function — it protects organs, regulates temperature,
                  and supports hormone production. Storage fat accumulates from excess calorie intake. Men need about
                  2-5% essential fat; women need 10-13% due to childbearing and hormonal functions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Accurate Measurements
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Measure at the right locations</p>
                  <p>Neck: just below the larynx. Waist: at the navel for men, at the narrowest point for women. Hips: at the widest part of the buttocks.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Keep the tape level and snug</p>
                  <p>The tape should be parallel to the floor and snug against skin without compressing tissue. Don't pull tight.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Measure at the same time of day</p>
                  <p>Body measurements can fluctuate with meals and hydration. Morning measurements before eating are most consistent.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Take multiple measurements</p>
                  <p>Measure each site 2-3 times and use the average. This reduces errors from slight positioning differences.</p>
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
    question: "How accurate is this body fat calculator?",
    answer: "The Navy method provides a reasonable estimate with about 3-4% margin of error compared to DEXA scans. It is more accurate than BMI but less precise than professional methods like hydrostatic weighing or DEXA. Use it to track trends rather than absolute values.",
  },
{
    question: "Why do women have higher body fat than men?",
    answer: "Women naturally carry more body fat due to hormonal differences and reproductive needs. Estrogen promotes fat storage, particularly in hips and thighs. Women need higher essential fat levels for menstruation, pregnancy, and breastfeeding.",
  },
{
    question: "Can I have too little body fat?",
    answer: "Yes. Body fat below essential levels (under 5% for men, 10% for women) can cause health problems including hormone disruption, weakened immune function, and organ damage. Extremely low body fat is not sustainable or healthy for most people.",
  },
{
    question: "How can I reduce my body fat percentage?",
    answer: "Create a moderate calorie deficit through diet and exercise. Combine strength training to preserve muscle with cardio for calorie burn. Aim for 0.5-1% body weight loss per week. Rapid weight loss often results in muscle loss along with fat.",
  },
{
    question: "Is body fat percentage better than BMI?",
    answer: "Yes, for most people. BMI does not distinguish between muscle and fat, so muscular individuals may be classified as overweight despite having low body fat. Body fat percentage gives a more accurate picture of body composition and health risk.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
