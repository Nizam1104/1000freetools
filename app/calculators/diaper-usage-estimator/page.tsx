"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiaperResult {
  age: number;
  diapersPerDay: number;
  diapersPerMonth: number;
  diapersPerYear: number;
  costPerMonth: number;
  costPerYear: number;
  totalCostToPottyTrain: number;
  breakdown: Array<{ age: string; perDay: number; description: string }>;
  recommendations: string[];
}

export default function DiaperUsageEstimatorPage() {
  const [babyAge, setBabyAge] = useState<string>("");
  const [diapersPerDay, setDiapersPerDay] = useState<string>("");
  const [costPerDiaper, setCostPerDiaper] = useState<string>("0.25");
  const [result, setResult] = useState<DiaperResult | null>(null);

  const calculate = () => {
    const ageMonths = parseFloat(babyAge) || 0;
    let diapersPerDayNum = parseFloat(diapersPerDay) || 0;
    const costNum = parseFloat(costPerDiaper) || 0.25;

    if (ageMonths === 0 && diapersPerDayNum === 0) return;

    // If diapers per day not entered, estimate from age
    if (diapersPerDayNum === 0) {
      if (ageMonths < 1) {
        diapersPerDayNum = 12;
      } else if (ageMonths < 6) {
        diapersPerDayNum = 10;
      } else if (ageMonths < 12) {
        diapersPerDayNum = 8;
      } else if (ageMonths < 24) {
        diapersPerDayNum = 6;
      } else if (ageMonths < 36) {
        diapersPerDayNum = 5;
      } else {
        diapersPerDayNum = 4;
      }
    }

    const diapersPerMonth = diapersPerDayNum * 30;
    const diapersPerYear = diapersPerDayNum * 365;
    const costPerMonth = diapersPerMonth * costNum;
    const costPerYear = diapersPerYear * costNum;

    // Estimate total cost to potty training (assume 30 months average)
    const remainingMonths = Math.max(0, 30 - ageMonths);
    let totalDiapers = 0;

    for (let month = ageMonths; month < 30; month++) {
      let dailyRate = 12;
      if (month >= 1 && month < 6) dailyRate = 10;
      else if (month >= 6 && month < 12) dailyRate = 8;
      else if (month >= 12 && month < 24) dailyRate = 6;
      else if (month >= 24 && month < 30) dailyRate = 5;
      totalDiapers += dailyRate * 30;
    }

    const totalCostToPottyTrain = totalDiapers * costNum;

    // Age-based breakdown
    const breakdown = [
      { age: "0-1 month", perDay: 12, description: "Newborn - frequent changes" },
      { age: "1-6 months", perDay: 10, description: "Infant - still very frequent" },
      { age: "6-12 months", perDay: 8, description: "Solid foods begin" },
      { age: "1-2 years", perDay: 6, description: "Toddler - fewer changes" },
      { age: "2-3 years", perDay: 5, description: "Potty training begins" },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (ageMonths < 6) {
      recommendations.push("👶 Newborn stage - expect 10-12 diapers daily");
      recommendations.push("💡 Consider subscription delivery for convenience");
    } else if (ageMonths < 12) {
      recommendations.push("🍼 Starting solids may change diaper patterns");
      recommendations.push("💰 Bulk buying can save 20-30%");
    } else if (ageMonths < 24) {
      recommendations.push("🚶 Toddler mobility may make changes challenging");
      recommendations.push("📦 Consider cloth diapers for cost savings");
    } else {
      recommendations.push("🎯 Potty training may begin soon");
      recommendations.push("💡 Pull-ups can help transition to underwear");
    }

    recommendations.push(`💵 At ${costNum.toFixed(2)}/diaper, you're spending $${costPerMonth.toFixed(0)}/month`);

    if (costNum > 0.35) {
      recommendations.push("⚠️ Your cost per diaper is above average. Consider bulk buying or store brands.");
    }

    setResult({
      age: ageMonths,
      diapersPerDay: diapersPerDayNum,
      diapersPerMonth: Math.round(diapersPerMonth),
      diapersPerYear: Math.round(diapersPerYear),
      costPerMonth: parseFloat(costPerMonth.toFixed(2)),
      costPerYear: parseFloat(costPerYear.toFixed(2)),
      totalCostToPottyTrain: parseFloat(totalCostToPottyTrain.toFixed(2)),
      breakdown,
      recommendations,
    });
  };

  const reset = () => {
    setBabyAge("");
    setDiapersPerDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby
          </h1>
          <p className="text-muted-foreground">
            Budget for baby with our Diaper Usage Estimator. Enter your baby&apos;s age
            and diaper usage to calculate monthly usage and total diaper expenses —
            helping new parents plan their budgets confidently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-age">Baby&apos;s Age (months)</Label>
                <Input
                  id="baby-age"
                  type="number"
                  step="0.5"
                  value={babyAge}
                  onChange={(e) => setBabyAge(e.target.value)}
                  placeholder="e.g., 6"
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank if you want to estimate from age
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diapers-per-day">Diapers Per Day</Label>
                <Input
                  id="diapers-per-day"
                  type="number"
                  value={diapersPerDay}
                  onChange={(e) => setDiapersPerDay(e.target.value)}
                  placeholder="Auto-calculated from age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost-per-diaper">Cost Per Diaper ($)</Label>
                <Input
                  id="cost-per-diaper"
                  type="number"
                  step="0.01"
                  value={costPerDiaper}
                  onChange={(e) => setCostPerDiaper(e.target.value)}
                  placeholder="0.25"
                />
                <p className="text-xs text-muted-foreground">
                  Average: $0.20-0.35 for disposables
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Diaper Cost Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Per Month</p>
                      <p className="text-2xl font-bold text-primary">{result.diapersPerMonth}</p>
                      <p className="text-sm text-muted-foreground">${result.costPerMonth}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Per Year</p>
                      <p className="text-2xl font-bold text-primary">{result.diapersPerYear}</p>
                      <p className="text-sm text-muted-foreground">${result.costPerYear}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Estimated Total to Potty Training
                    </p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                      ${result.totalCostToPottyTrain}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      (~{Math.round(result.totalCostToPottyTrain / result.costPerMonth)} months at current rate)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Usage by Age</h4>
                    <div className="space-y-1">
                      {result.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <div>
                            <span className="font-medium">{item.age}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <span className="font-mono">{item.perDay}/day</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Money-Saving Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter baby&apos;s details and click Calculate to see estimates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Diaper Usage Estimator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your baby's age in months</p>
                    <p>Type your baby's current age. For a 3-month-old, enter "3". For a 4.5-month-old, enter "4.5". The calculator uses this to estimate typical diaper usage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input diapers per day and cost per diaper</p>
                    <p>Enter how many diapers you use daily, or leave blank to use age-based estimates. Add your actual cost per diaper for accurate budget calculations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your estimates and savings tips</p>
                    <p>See monthly and yearly diaper costs, plus the estimated total cost until potty training. Age-specific money-saving tips help you cut expenses.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Diaper Usage by Age
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Age Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Diapers Per Day</th>
                      <th className="text-left py-3 px-2 font-semibold">Diapers Per Month</th>
                      <th className="text-left py-3 px-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">0-1 month</td>
                      <td className="py-3 px-2">10-12</td>
                      <td className="py-3 px-2">300-360</td>
                      <td className="py-3 px-2">Newborns eat frequently, produce more waste</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1-6 months</td>
                      <td className="py-3 px-2">8-10</td>
                      <td className="py-3 px-2">240-300</td>
                      <td className="py-3 px-2">Still frequent but slightly less than newborn</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">6-12 months</td>
                      <td className="py-3 px-2">6-8</td>
                      <td className="py-3 px-2">180-240</td>
                      <td className="py-3 px-2">Solid foods begin, patterns change</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1-2 years</td>
                      <td className="py-3 px-2">5-6</td>
                      <td className="py-3 px-2">150-180</td>
                      <td className="py-3 px-2">Toddlers have more predictable patterns</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">2-3 years</td>
                      <td className="py-3 px-2">4-5</td>
                      <td className="py-3 px-2">120-150</td>
                      <td className="py-3 px-2">Potty training may begin</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">3+ years</td>
                      <td className="py-3 px-2">0-3</td>
                      <td className="py-3 px-2">0-90</td>
                      <td className="py-3 px-2">Most children potty trained by age 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are averages. Individual babies vary based on feeding, health, and development.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Diaper Costs
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Diapers are one of the biggest expenses in a baby's first years. The average baby goes through 6,000 to 8,000 diapers before potty training. Understanding usage patterns helps you budget accurately and find savings.
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Newborns Use More Diapers</h4>
                  <p>
                    Newborns eat every 2-3 hours, and their digestive systems process food quickly. Breastfed babies may have a bowel movement after every feeding. Their bladders are also tiny, filling up frequently. This is why the first month sees the highest diaper usage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Solid Foods Change Diaper Patterns</h4>
                  <p>
                    Around 6 months, when babies start solids, diaper output changes. Stool becomes more formed and less frequent. Some babies go from 10 diapers a day to 6 or 7. This is normal and continues as they transition to table foods.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Disposable vs. Cloth Diaper Costs</h4>
                  <p>
                    Disposables cost $0.20-0.40 per diaper, totaling $2,000-3,000 to potty training. Cloth diapers cost $200-500 upfront plus laundry expenses. Families using cloth typically spend $500-800 total. Cloth requires more work but saves money, especially with multiple children.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When Potty Training Typically Happens</h4>
                  <p>
                    Most children show readiness between 18-30 months. Some train earlier, some later. Girls often train slightly earlier than boys. Starting before a child is ready usually backfires, extending the process. The average age for complete daytime training is around 27-30 months.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Diaper Cost Comparison by Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Diaper Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Cost Per Diaper</th>
                      <th className="text-left py-3 px-2 font-semibold">Est. Total to Potty Training</th>
                      <th className="text-left py-3 px-2 font-semibold">Pros</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Premium disposables</td>
                      <td className="py-3 px-2">$0.35-0.50</td>
                      <td className="py-3 px-2">$2,500-3,500</td>
                      <td className="py-3 px-2">Best absorbency, fewer leaks</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Store brand disposables</td>
                      <td className="py-3 px-2">$0.15-0.25</td>
                      <td className="py-3 px-2">$1,200-2,000</td>
                      <td className="py-3 px-2">Budget-friendly, widely available</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cloth (with laundry)</td>
                      <td className="py-3 px-2">$0.05-0.10</td>
                      <td className="py-3 px-2">$500-800</td>
                      <td className="py-3 px-2">Reusable, eco-friendly, lowest cost</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Hybrid (cloth + disposable)</td>
                      <td className="py-3 px-2">$0.15-0.25</td>
                      <td className="py-3 px-2">$1,000-1,500</td>
                      <td className="py-3 px-2">Flexibility, less laundry</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Eco-friendly disposables</td>
                      <td className="py-3 px-2">$0.40-0.60</td>
                      <td className="py-3 px-2">$2,800-4,000</td>
                      <td className="py-3 px-2">Biodegradable, fewer chemicals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Money-Saving Tips for Diapers
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Buy in Bulk</p>
                    <p>Costco, Sam's Club, and Amazon Subscribe & Save offer 20-30% savings per diaper. Make sure you're buying the right size — babies grow quickly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Subscription Services</p>
                    <p>Amazon Family, Hello Bello, and brand subscriptions offer 15-20% off plus free shipping. You can usually skip or adjust deliveries as needed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Try Store Brands</p>
                    <p>Target's Up & Up, Walmart's Parent's Choice, and Kirkland Signature perform comparably to name brands at half the price. Test a small pack first.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for Sales and Stock Up</p>
                    <p>Diapers go on sale every 6-8 weeks at major retailers. Buy 2-3 months' supply when prices drop. Combine sales with coupons for maximum savings.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Cloth for Younger Babies</p>
                    <p>Since newborns use the most diapers, using cloth during the first 6 months can save hundreds. Switch to disposables later when usage drops.</p>
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
    question: "How many diapers does a newborn use per day?",
    answer: "Newborns typically use 10-12 diapers per day. Some use as many as 15 in the first week. This decreases to 8-10 by 1-2 months as their bladder capacity increases and feeding patterns stabilize.",
  },
{
    question: "When should I move up a diaper size?",
    answer: "Move up when you see red marks around the legs or waist, frequent leaks, or difficulty fastening tabs. Don't size up too early — ill-fitting diapers leak more. Most babies stay in each size 2-3 months.",
  },
{
    question: "Are expensive diapers worth it?",
    answer: "Premium diapers have better absorbency and fewer leaks, which matters for overnight or long outings. For daytime changes every 2-3 hours, store brands work fine. Many families use both — premium at night, budget during the day.",
  },
{
    question: "How can I reduce diaper waste?",
    answer: "Consider cloth diapers, even part-time. Choose eco-friendly disposable brands made with fewer chemicals. Some brands are biodegradable or compostable. Proper disposal (not flushing) prevents environmental contamination.",
  },
{
    question: "What's the average total cost of diapers?",
    answer: "The average baby uses 6,000-8,000 diapers before potty training. At $0.25 per diaper, that's $1,500-2,000. Premium brands run $2,500-3,500. Cloth diapering costs $500-800 including laundry, making it the most economical option.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
