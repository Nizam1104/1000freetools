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

interface BackpackResult {
  bodyWeight: number;
  tripType: string;
  maxPackWeight: number;
  baseWeight: number;
  consumables: number;
  comfortRating: string;
  weightDistribution: Array<{ item: string; percentage: number; weight: number }>;
  recommendations: string[];
}

export default function BackpackLoadCalculatorPage() {
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [tripType, setTripType] = useState<string>("day");
  const [experience, setExperience] = useState<string>("intermediate");
  const [weightUnit, setWeightUnit] = useState<string>("lbs");
  const [result, setResult] = useState<BackpackResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(bodyWeight) || 0;
    if (weightNum === 0) return;

    // Convert to lbs if needed
    let weightLbs = weightNum;
    if (weightUnit === "kg") {
      weightLbs = weightNum * 2.205;
    }

    // Maximum pack weight by trip type (percentage of body weight)
    const maxPercentages: Record<string, number> = {
      day: 0.10,      // 10% for day hikes
      overnight: 0.15, // 15% for overnight
      weekend: 0.20,   // 20% for weekend trips
      week: 0.25,      // 25% for week-long trips
      extended: 0.30,  // 30% max for extended expeditions
    };

    // Experience modifier
    const experienceModifiers: Record<string, number> = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.15,
    };

    const maxPercent = maxPercentages[tripType] || 0.20;
    const expMod = experienceModifiers[experience] || 1.0;

    const maxPackWeight = weightLbs * maxPercent * expMod;

    // Weight breakdown estimates
    const baseWeight = maxPackWeight * 0.6; // Gear weight
    const consumables = maxPackWeight * 0.4; // Food, water, fuel

    // Weight distribution
    const weightDistribution = [
      { item: "Shelter & Sleep System", percentage: 35, weight: maxPackWeight * 0.35 },
      { item: "Food & Water", percentage: 30, weight: maxPackWeight * 0.30 },
      { item: "Clothing", percentage: 15, weight: maxPackWeight * 0.15 },
      { item: "Cooking & Hydration", percentage: 10, weight: maxPackWeight * 0.10 },
      { item: "Safety & Misc", percentage: 10, weight: maxPackWeight * 0.10 },
    ];

    // Comfort rating
    let comfortRating = "";
    if (maxPercent <= 0.15) {
      comfortRating = "Very Comfortable - Light and fast";
    } else if (maxPercent <= 0.20) {
      comfortRating = "Comfortable - Standard backpacking load";
    } else if (maxPercent <= 0.25) {
      comfortRating = "Moderate - Experienced hikers";
    } else {
      comfortRating = "Challenging - Maximum recommended load";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (experience === "beginner") {
      recommendations.push("🎒 Start with lighter loads to build strength and technique");
      recommendations.push("📦 Rent or borrow gear before buying");
    }

    if (tripType === "day") {
      recommendations.push("☀️ Day hikes: 10% body weight is plenty - water is your heaviest item");
    } else if (tripType === "overnight" || tripType === "weekend") {
      recommendations.push("⛏️ Weekend trips: Focus on lightweight shelter and sleep system");
    } else {
      recommendations.push("📅 Extended trips: Plan resupply points to reduce initial pack weight");
    }

    recommendations.push(`🎯 Target base weight: ${baseWeight.toFixed(1)} ${weightUnit}`);
    recommendations.push(`💧 Consumables (food/water): ${consumables.toFixed(1)} ${weightUnit}`);

    if (maxPackWeight > 40) {
      recommendations.push("⚠️ Pack weight exceeds 40 lbs - consider ultralight gear options");
    }

    setResult({
      bodyWeight: weightLbs,
      tripType,
      maxPackWeight: parseFloat(maxPackWeight.toFixed(1)),
      baseWeight: parseFloat(baseWeight.toFixed(1)),
      consumables: parseFloat(consumables.toFixed(1)),
      comfortRating,
      weightDistribution,
      recommendations,
    });
  };

  const reset = () => {
    setBodyWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Backpack Load Calculator – Find Your Safe Maximum Pack Weight
          </h1>
          <p className="text-muted-foreground">
            Protect your body on the trail with our Backpack Load Calculator.
            Enter your body weight and trip type to see the maximum recommended
            pack weight based on guidelines from hiking experts — preventing
            injury from overloaded packs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="body-weight">Body Weight</Label>
                  <Input
                    id="body-weight"
                    type="number"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="weight-unit">Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="weight-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trip-type">Trip Type</Label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger id="trip-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Hike (no overnight gear)</SelectItem>
                    <SelectItem value="overnight">Overnight (1 night)</SelectItem>
                    <SelectItem value="weekend">Weekend (2-3 nights)</SelectItem>
                    <SelectItem value="week">Week-long (4-7 nights)</SelectItem>
                    <SelectItem value="extended">Extended (7+ nights)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experience} onValueChange={setExperience}>
                  <SelectTrigger id="experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (first few trips)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (regular hiker)</SelectItem>
                    <SelectItem value="advanced">Advanced (ultralight experienced)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Pack Weight Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.maxPackWeight < 20 ? "bg-green-100 dark:bg-green-900/20" :
                      result.maxPackWeight < 35 ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Maximum Pack Weight</p>
                    <p className="text-4xl font-bold">{result.maxPackWeight} {weightUnit}</p>
                    <p className="text-sm mt-1">{result.comfortRating}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Base Weight</p>
                      <p className="text-xl font-bold">{result.baseWeight} {weightUnit}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Consumables</p>
                      <p className="text-xl font-bold">{result.consumables} {weightUnit}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Weight Distribution</h4>
                    <div className="space-y-2">
                      {result.weightDistribution.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.item}</span>
                            <span>{item.weight.toFixed(1)} {weightUnit} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your details and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Backpack Load Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your body weight</p>
                    <p>Use your current weight in pounds or kilograms. Be honest — the calculator adjusts recommendations based on this number.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your trip type</p>
                    <p>Day hikes need minimal gear. Overnight and weekend trips require shelter and sleep systems. Extended trips need more food and fuel.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose your experience level</p>
                    <p>Beginners should carry lighter loads while building strength. Advanced hikers can handle heavier packs with proper conditioning.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Maximum Pack Weight by Trip Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Trip Type</th>
                      <th className="text-left py-3 px-2 font-semibold">% of Body Weight</th>
                      <th className="text-left py-3 px-2 font-semibold">Example (150 lb person)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Day Hike</td>
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">15 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Overnight (1 night)</td>
                      <td className="py-3 px-2">15%</td>
                      <td className="py-3 px-2">22.5 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Weekend (2-3 nights)</td>
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">30 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Week-long (4-7 nights)</td>
                      <td className="py-3 px-2">25%</td>
                      <td className="py-3 px-2">37.5 lbs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Extended (7+ nights)</td>
                      <td className="py-3 px-2">30% max</td>
                      <td className="py-3 px-2">45 lbs max</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are general guidelines. Individual capacity varies based on fitness, experience, and personal comfort.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Base Weight vs Total Pack Weight
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Base Weight (Gear)</h4>
                  <p>
                    Base weight includes everything you carry except consumables — your pack, shelter,
                    sleep system, cooking gear, clothing, and miscellaneous items. This is the weight
                    you have control over through gear choices. Ultralight hikers target base weights
                    under 10 lbs. Traditional backpackers often carry 15-25 lbs of gear.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Consumables (Food, Water, Fuel)</h4>
                  <p>
                    Consumables are items you use up during your trip. Plan for 1.5-2 lbs of food per day.
                    Water weighs 2.2 lbs per liter — carry only what you need between sources. Fuel canisters
                    weigh 0.5-1 lb depending on trip length. These weights decrease as you consume them.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why the Distinction Matters</h4>
                  <p>
                    Base weight stays constant. Consumables vary by trip length and water availability.
                    Reducing base weight gives you more capacity for food on long trips or safety gear
                    in challenging conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Backpack Weight Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Category</th>
                      <th className="text-left py-3 px-2 font-semibold">% of Total</th>
                      <th className="text-left py-3 px-2 font-semibold">Example (30 lb pack)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Shelter &amp; Sleep System</td>
                      <td className="py-3 px-2">35%</td>
                      <td className="py-3 px-2">10.5 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Food &amp; Water</td>
                      <td className="py-3 px-2">30%</td>
                      <td className="py-3 px-2">9 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Clothing</td>
                      <td className="py-3 px-2">15%</td>
                      <td className="py-3 px-2">4.5 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cooking &amp; Hydration</td>
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">3 lbs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Safety &amp; Miscellaneous</td>
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">3 lbs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Reducing Pack Weight
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Invest in the Big Three First</p>
                    <p>Your pack, shelter, and sleep system account for 60%+ of base weight. A lighter tent, quilt, and backpack make the biggest difference.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Weigh Everything</p>
                    <p>Use a kitchen scale. You&apos;ll be surprised how small items add up. Create a gear list with weights for every item.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Cut the &quot;Just in Case&quot; Items</p>
                    <p>If you haven&apos;t used it in three trips, leave it home. Pack for likely scenarios, not every possible emergency.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Repackage Consumables</p>
                    <p>Remove excess packaging. Transfer food to lightweight bags. Carry only the fuel and water you actually need.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Health Risks of Carrying Too Much Weight
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Short-Term Effects</h4>
                  <p>
                    Overloaded packs cause immediate strain. Your heart rate increases. Balance suffers
                    on uneven terrain. Fatigue sets in faster. You&apos;re more likely to trip or twist an ankle.
                    Heavy loads also compress your spine temporarily — most people lose 0.5-1 inch of
                    height after a long day with a heavy pack.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Long-Term Injury Risks</h4>
                  <p>
                    Chronic heavy packing leads to stress fractures, tendonitis, and joint damage.
                    Shoulders and hips bear the brunt. Knee problems develop from the added weight
                    on descents. Lower back pain is common. These injuries can end your hiking career
                    prematurely if ignored.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Who Should Be Extra Careful</h4>
                  <p>
                    Beginners lack the conditioning for heavy loads. Older hikers have less recovery
                    capacity. Anyone with existing back, knee, or hip issues should keep packs light.
                    When in doubt, err on the side of lighter.
                  </p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good backpack weight for hiking?</h4>
                  <p>
                    For day hikes, keep your pack under 10% of body weight. Weekend trips typically
                    range from 15-25 lbs total. Week-long expeditions might reach 30-40 lbs. The key
                    is matching weight to your fitness level and experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is 40 pounds too heavy for backpacking?</h4>
                  <p>
                    For most people, yes. A 40 lb pack exceeds recommended guidelines unless you&apos;re
                    an experienced hiker with excellent conditioning. Most weekend trips can be done
                    comfortably with 20-30 lbs. Only carry 40+ lbs when necessary for extended remote
                    trips with no resupply options.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How can I make my backpack lighter?</h4>
                  <p>
                    Start by weighing every item. Cut &quot;just in case&quot; gear. Invest in lighter versions
                    of the Big Three (pack, shelter, sleep system). Repackage food and toiletries.
                    Share group gear. Every ounce counts over long distances.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What should I pack for a weekend hiking trip?</h4>
                  <p>
                    Essentials include: shelter (tent or hammock), sleep system (bag + pad), cooking
                    gear, 2-3 days of food, water treatment, first aid kit, navigation, extra clothing
                    layer, and emergency items. Total weight should stay under 20-25 lbs for most people.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much water should I carry while hiking?</h4>
                  <p>
                    Plan for 0.5-1 liter per hour of hiking in moderate conditions. Carry more in hot
                    weather or if water sources are unreliable. Water weighs 2.2 lbs per liter, so
                    balance hydration needs against pack weight. Use water filters or purification
                    tablets to refill from natural sources.
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
                  href="/calculators/hiking-pace-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Hiking Pace Calculator</span>
                  <p className="text-muted-foreground">Estimate your hiking speed and trip duration based on distance and elevation</p>
                </a>
                <a
                  href="/calculators/camping-gear-weight-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Camping Gear Weight Calculator</span>
                  <p className="text-muted-foreground">Calculate and optimize your total camping gear weight</p>
                </a>
                <a
                  href="/calculators/water-requirement-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Water Requirement Calculator</span>
                  <p className="text-muted-foreground">Determine daily water needs based on activity level and conditions</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
