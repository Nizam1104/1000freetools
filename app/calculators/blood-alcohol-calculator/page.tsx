"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function BloodAlcoholCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [drinks, setDrinks] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [bac, setBac] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseInt(drinks);
    const h = parseFloat(hours);

    if (isNaN(w) || isNaN(d) || isNaN(h) || w <= 0 || d < 0 || h < 0) return;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const weightGrams = weightKg * 1000;
    
    // Standard drink = 14g pure alcohol
    const alcoholGrams = d * 14;
    
    // Widmark factor: 0.68 for men, 0.55 for women
    const r = gender === "male" ? 0.68 : 0.55;
    
    // BAC formula
    let bacValue = (alcoholGrams / (weightGrams * r)) * 100;
    
    // Metabolism: 0.015% per hour
    bacValue = bacValue - (0.015 * h);
    bacValue = Math.max(0, bacValue);
    
    setBac(Math.round(bacValue * 1000) / 1000);
  };

  const reset = () => {
    setWeight("");
    setDrinks("");
    setHours("");
    setBac(null);
  };

  const getBacInfo = (bacValue: number) => {
    if (bacValue === 0) return { label: "Sober", color: "text-green-600" };
    if (bacValue < 0.02) return { label: "Minimal impairment", color: "text-green-600" };
    if (bacValue < 0.05) return { label: "Mild impairment", color: "text-yellow-600" };
    if (bacValue < 0.08) return { label: "Impaired - Do not drive", color: "text-orange-600" };
    if (bacValue < 0.15) return { label: "Highly impaired", color: "text-red-600" };
    return { label: "Dangerous - Medical risk", color: "text-red-700" };
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weightUnit">Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="drinks">Number of Standard Drinks</Label>
              <Input
                id="drinks"
                type="number"
                placeholder="e.g., 3"
                value={drinks}
                onChange={(e) => setDrinks(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                1 drink = 12oz beer, 5oz wine, or 1.5oz spirits
              </p>
            </div>

            <div>
              <Label htmlFor="hours">Hours Since First Drink</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                placeholder="e.g., 2"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BAC</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bac !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Estimated BAC</p>
                <p className="text-4xl font-bold mt-1">{bac.toFixed(3)}%</p>
                <p className={`text-lg font-medium mt-2 ${getBacInfo(bac).color}`}>
                  {getBacInfo(bac).label}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Your body metabolizes approximately 0.015% BAC per hour.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This BAC Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your gender and weight</p>
                  <p>Select your gender and input your body weight. These affect how alcohol distributes in your body.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Input drinks and time elapsed</p>
                  <p>Enter the number of standard drinks consumed and hours since your first drink.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View your estimated BAC level</p>
                  <p>Get your blood alcohol content estimate along with impairment level information.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              BAC Levels and Impairment Effects
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">BAC Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Impairment Level</th>
                    <th className="text-left py-3 px-2 font-semibold">Effects</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">0.00%</td>
                    <td className="py-3 px-2">Sober</td>
                    <td className="py-3 px-2">No impairment</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.01-0.02%</td>
                    <td className="py-3 px-2">Minimal</td>
                    <td className="py-3 px-2">Relaxation, slight mood change</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.03-0.05%</td>
                    <td className="py-3 px-2">Mild</td>
                    <td className="py-3 px-2">Reduced inhibition, impaired judgment</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.06-0.07%</td>
                    <td className="py-3 px-2">Impaired</td>
                    <td className="py-3 px-2">Reduced coordination, slower reaction time</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.08-0.10%</td>
                    <td className="py-3 px-2">Legally Intoxicated</td>
                    <td className="py-3 px-2">Poor muscle coordination, impaired balance and speech</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.11-0.15%</td>
                    <td className="py-3 px-2">Highly Impaired</td>
                    <td className="py-3 px-2">Significant motor impairment, slurred speech</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">0.16-0.20%</td>
                    <td className="py-3 px-2">Severely Impaired</td>
                    <td className="py-3 px-2">Nausea, vomiting, dysphoria</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">0.25%+</td>
                    <td className="py-3 px-2">Dangerous</td>
                    <td className="py-3 px-2">Risk of alcohol poisoning, loss of consciousness</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Blood Alcohol Content
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is BAC?</h4>
                <p>
                  Blood Alcohol Content (BAC) measures the percentage of alcohol in your bloodstream. A BAC of 0.08%
                  means 0.08 grams of alcohol per 100 milliliters of blood. This is the legal limit for driving in
                  most U.S. states, though impairment begins at much lower levels.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How the Widmark Formula Works</h4>
                <p>
                  This calculator uses the Widmark formula, developed in the 1930s. It accounts for total alcohol
                  consumed, body weight, gender (which affects water content), and time for metabolism. The formula
                  estimates peak BAC, then subtracts alcohol metabolized over time at approximately 0.015% per hour.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Gender Matters</h4>
                <p>
                  Women typically have higher BAC than men after drinking the same amount. This is because women
                  have less body water (about 55% vs 68% in men) and lower levels of alcohol dehydrogenase, the
                  enzyme that breaks down alcohol in the stomach.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Responsible Drinking
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Never drink and drive</p>
                  <p>Even one drink can impair driving. Plan a ride home before you start drinking.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Pace yourself</p>
                  <p>Limit yourself to one standard drink per hour. Your liver can only process about one drink per hour.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Eat before and during drinking</p>
                  <p>Food slows alcohol absorption. Avoid drinking on an empty stomach.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Know what counts as a standard drink</p>
                  <p>12 oz beer (5%), 5 oz wine (12%), or 1.5 oz spirits (40%) each contain about 14g of pure alcohol.</p>
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
    question: "How accurate is this BAC calculator?",
    answer: "This calculator provides an estimate based on the Widmark formula. Actual BAC varies based on genetics, metabolism, food intake, medication, and other factors. Never rely on calculator results to determine if you are safe to drive.",
  },
{
    question: "How long does it take to sober up?",
    answer: "Your body metabolizes alcohol at about 0.015% BAC per hour. If your BAC is 0.08%, it takes roughly 5-6 hours to reach zero. Coffee, cold showers, and exercise do not speed up this process — only time works.",
  },
{
    question: "Can I be under the limit but still impaired?",
    answer: "Yes. Impairment begins with the first drink. Studies show reduced reaction time and judgment at 0.02% BAC. The legal limit is not a safety threshold — it is a legal definition for prosecution.",
  },
{
    question: "What affects how quickly I get drunk?",
    answer: "Body weight, gender, food intake, drinking speed, medication, fatigue, and genetics all affect BAC. Carbonated drinks may increase absorption rate. Drinking on an empty stomach leads to faster and higher peak BAC.",
  },
{
    question: "Is the legal BAC limit the same everywhere?",
    answer: "No. Most U.S. states use 0.08% for regular drivers, but commercial drivers face a 0.04% limit. Some countries have lower limits (0.05% in much of Europe, 0.02% in parts of Asia). For drivers under 21, most U.S. states have zero tolerance laws (0.01-0.02%).",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
