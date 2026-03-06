"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState<string>("");
  const [results, setResults] = useState<{
    devine: number;
    robinson: number;
    miller: number;
    hamwi: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (isNaN(h) || h <= 0) return;

    let heightCm: number;
    let heightInches: number;

    if (unit === "metric") {
      heightCm = h;
      heightInches = h / 2.54;
    } else {
      heightCm = h * 2.54;
      heightInches = h;
    }

    // Height over 5 feet (60 inches)
    const heightOver5Feet = heightInches - 60;

    // Devine formula (1974)
    // Men: 50 kg + 2.3 kg per inch over 5 feet
    // Women: 45.5 kg + 2.3 kg per inch over 5 feet
    const devine = gender === "male"
      ? 50 + 2.3 * heightOver5Feet
      : 45.5 + 2.3 * heightOver5Feet;

    // Robinson formula (1983)
    // Men: 52 kg + 1.9 kg per inch over 5 feet
    // Women: 49 kg + 1.7 kg per inch over 5 feet
    const robinson = gender === "male"
      ? 52 + 1.9 * heightOver5Feet
      : 49 + 1.7 * heightOver5Feet;

    // Miller formula (1983)
    // Men: 56.2 kg + 1.41 kg per inch over 5 feet
    // Women: 53.1 kg + 1.36 kg per inch over 5 feet
    const miller = gender === "male"
      ? 56.2 + 1.41 * heightOver5Feet
      : 53.1 + 1.36 * heightOver5Feet;

    // Hamwi formula (1964)
    // Men: 48 kg + 2.7 kg per inch over 5 feet
    // Women: 45.5 kg + 2.2 kg per inch over 5 feet
    const hamwi = gender === "male"
      ? 48 + 2.7 * heightOver5Feet
      : 45.5 + 2.2 * heightOver5Feet;

    setResults({
      devine: Math.round(devine * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      hamwi: Math.round(hamwi * 10) / 10,
    });
  };

  const reset = () => {
    setHeight("");
    setResults(null);
  };

  const convertToLbs = (kg: number) => Math.round(kg * 2.20462 * 10) / 10;

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

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Ideal Weight</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Your Ideal Weight Range</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Devine Formula</p>
                    <p className="text-xl font-bold">
                      {results.devine} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.devine) : results.devine * 2.20462} lbs)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Robinson Formula</p>
                    <p className="text-xl font-bold">
                      {results.robinson} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.robinson) : results.robinson * 2.20462} lbs)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Miller Formula</p>
                    <p className="text-xl font-bold">
                      {results.miller} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.miller) : results.miller * 2.20462} lbs)
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Hamwi Formula</p>
                    <p className="text-xl font-bold">
                      {results.hamwi} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.hamwi) : results.hamwi * 2.20462} lbs)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Average: <span className="font-semibold">
                      {Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 10) / 10} kg
                      <span className="font-normal">
                        ({unit === "metric"
                          ? Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 2.20462 * 10) / 10
                          : Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 2.20462 * 10) / 10} lbs)
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Ideal Weight Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your gender</p>
                  <p>Choose male or female. Formulas account for typical body composition differences between genders.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose your unit system</p>
                  <p>Select metric (centimeters) or imperial (inches) for height input based on your preference.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your height and calculate</p>
                  <p>Input your height and click Calculate. Results show ideal weight from four established formulas.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Ideal Weight Formulas Compared
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">Year</th>
                    <th className="text-left py-3 px-2 font-semibold">Male Base</th>
                    <th className="text-left py-3 px-2 font-semibold">Female Base</th>
                    <th className="text-left py-3 px-2 font-semibold">Per Inch Over 5ft</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Devine</td>
                    <td className="py-3 px-2">1974</td>
                    <td className="py-3 px-2">50 kg</td>
                    <td className="py-3 px-2">45.5 kg</td>
                    <td className="py-3 px-2">2.3 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Robinson</td>
                    <td className="py-3 px-2">1983</td>
                    <td className="py-3 px-2">52 kg</td>
                    <td className="py-3 px-2">49 kg</td>
                    <td className="py-3 px-2">1.9 kg (M) / 1.7 kg (F)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Miller</td>
                    <td className="py-3 px-2">1983</td>
                    <td className="py-3 px-2">56.2 kg</td>
                    <td className="py-3 px-2">53.1 kg</td>
                    <td className="py-3 px-2">1.41 kg (M) / 1.36 kg (F)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Hamwi</td>
                    <td className="py-3 px-2">1964</td>
                    <td className="py-3 px-2">48 kg</td>
                    <td className="py-3 px-2">45.5 kg</td>
                    <td className="py-3 px-2">2.7 kg (M) / 2.2 kg (F)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              These formulas estimate ideal body weight for adults of average build. They do not account for muscle mass, bone density, or body composition.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Ideal Weight Calculations
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Ideal Body Weight?</h4>
                <p>
                  Ideal body weight (IBW) estimates a healthy weight based on height. It originated from life insurance data linking weight to longevity. IBW helps doctors dose medications and assess nutritional status. It is a reference point, not a strict target.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Multiple Formulas?</h4>
                <p>
                  Different formulas were developed for different purposes. Devine is widely used for medical dosing. Hamwi is common in nutrition counseling. Robinson and Miller came from analyses of large populations. Each gives slightly different results — the average provides a reasonable range.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Limitations of IBW Formulas</h4>
                <p>
                  These formulas assume average body composition. They do not distinguish muscle from fat. Athletes may weigh more than IBW due to muscle mass. Older adults may have lower muscle mass at the same weight. Frame size also matters — small frames weigh less than large frames at the same height.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">IBW vs BMI</h4>
                <p>
                  BMI uses weight and height to classify underweight, normal, overweight, and obese. IBW gives a specific target weight. Both have limitations. BMI does not account for muscle mass or fat distribution. IBW does not account for age or body composition. Use both as screening tools, not diagnoses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Healthy Weight Management
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Focus on habits, not just the scale</p>
                  <p>Eat mostly whole foods, move your body daily, sleep 7-9 hours, and manage stress. Weight often follows naturally.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Build muscle through strength training</p>
                  <p>Muscle burns more calories at rest than fat. Strength training 2-3 times per week improves body composition even if the scale does not change much.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Prioritize protein and fiber</p>
                  <p>Protein keeps you full and preserves muscle during weight loss. Fiber from vegetables, fruits, and whole grains supports digestion and satiety.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Be patient with progress</p>
                  <p>Healthy weight loss is 0.5-1 kg (1-2 lbs) per week. Faster loss often means muscle loss and rebound gain. Consistency beats intensity over time.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Which ideal weight formula is most accurate?</h4>
                <p>
                  No single formula is best for everyone. Devine is most cited in medical literature. Robinson and Miller may be more accurate for modern populations. Using the average of all four gives a reasonable range. For individual advice, consult a healthcare provider.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does ideal weight account for age?</h4>
                <p>
                  No, these formulas do not include age. Some research suggests slightly higher weights may be healthy for older adults. Body composition changes with age — muscle decreases and fat increases even at stable weight.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if I am very muscular?</h4>
                <p>
                  Ideal weight formulas will underestimate your healthy weight if you have high muscle mass. Athletes and bodybuilders often exceed IBW while being very lean. Body fat percentage or waist circumference may be better health indicators for muscular individuals.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I know my frame size?</h4>
                <p>
                  Wrap your thumb and middle finger around your wrist. If they overlap, you have a small frame. If they touch, medium frame. If they do not touch, large frame. Large frames may healthily weigh 10% more than IBW; small frames 10% less.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I use ideal weight or BMI?</h4>
                <p>
                  Both have uses. BMI screens for weight categories linked to health risks. IBW gives a specific target. For most people, a weight within the normal BMI range (18.5-24.9) that feels sustainable is appropriate. Discuss personal targets with a doctor or dietitian.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/bmi-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">BMI Calculator</span>
                <p className="text-muted-foreground">Calculate body mass index and weight category</p>
              </a>
              <a
                href="/calculators/body-fat-percentage-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Body Fat Percentage Calculator</span>
                <p className="text-muted-foreground">Estimate body fat using US Navy method</p>
              </a>
              <a
                href="/calculators/ideal-bedtime-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ideal Bedtime Calculator</span>
                <p className="text-muted-foreground">Find optimal sleep times for better health</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
