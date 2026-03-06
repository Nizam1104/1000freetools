"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OneRMCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [results, setResults] = useState<{ formula: string, value: number }[]>([]);

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) return;

    // Epley: weight × (1 + reps/30)
    const epley = w * (1 + r / 30);

    // Brzycki: weight × 36/(37-reps)
    const brzycki = r < 37 ? w * (36 / (37 - r)) : epley;

    // Lander: weight × (100 / (101.3 - 2.67123 × reps))
    const lander = w * (100 / (101.3 - 2.67123 * r));

    // Lombardi: weight × reps^0.10
    const lombardi = w * Math.pow(r, 0.10);

    setResults([
      { formula: "Epley", value: Math.round(epley) },
      { formula: "Brzycki", value: Math.round(brzycki) },
      { formula: "Lander", value: Math.round(lander) },
      { formula: "Lombardi", value: Math.round(lombardi) },
      { formula: "Average", value: Math.round((epley + brzycki + lander + lombardi) / 4) },
    ]);
  };

  const reset = () => {
    setWeight("");
    setReps("");
    setResults([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>

        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight Lifted</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "kg" | "lbs")}>
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
              <Label htmlFor="reps">Repetitions Performed</Label>
              <Input
                id="reps"
                type="number"
                placeholder="e.g., 5"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                For best accuracy, use 3-10 reps
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate 1RM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-3">Estimated One Rep Max</p>
                <div className="space-y-2">
                  {results.map((item) => (
                    <div key={item.formula} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{item.formula}</span>
                      <span className="text-lg font-semibold">{item.value} {unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How to Use This 1RM Calculator */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">How to Use This 1RM Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <h3 className="font-semibold mb-2">Enter Your Lift Data</h3>
              <p className="text-sm text-muted-foreground">Input the weight you lifted and the number of reps you completed with good form.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <h3 className="font-semibold mb-2">Calculate Your 1RM</h3>
              <p className="text-sm text-muted-foreground">Click "Calculate 1RM" to see your estimated one-rep max across multiple formulas.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <h3 className="font-semibold mb-2">Use Your Results</h3>
              <p className="text-sm text-muted-foreground">Apply your 1RM to set training percentages for strength, hypertrophy, or endurance work.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 1RM Formula Comparison */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">1RM Formula Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Formula</th>
                <th className="text-left py-3 px-4 font-semibold">Best For</th>
                <th className="text-left py-3 px-4 font-semibold">Characteristics</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Epley</td>
                <td className="py-3 px-4">Higher reps (8+)</td>
                <td className="py-3 px-4 text-muted-foreground">Most commonly used formula. Simple calculation that works well across rep ranges.</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Brzycki</td>
                <td className="py-3 px-4">Lower reps (3-7)</td>
                <td className="py-3 px-4 text-muted-foreground">Gives conservative estimates. More accurate when testing with heavier weights and fewer reps.</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Lander</td>
                <td className="py-3 px-4">Moderate rep ranges</td>
                <td className="py-3 px-4 text-muted-foreground">Balanced approach. Works well for mid-range rep testing between 5-10 reps.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Lombardi</td>
                <td className="py-3 px-4">Higher rep ranges</td>
                <td className="py-3 px-4 text-muted-foreground">Tends to overestimate for very high reps. Uses exponential calculation method.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rep Max Percentage Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Rep Max Percentage Chart</h2>
        <p className="text-muted-foreground mb-4">Use this chart to plan training loads based on your 1RM. Each rep range corresponds to a percentage of your one-rep max.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Reps</th>
                <th className="text-left py-3 px-4 font-semibold">% of 1RM</th>
                <th className="text-left py-3 px-4 font-semibold">Training Focus</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">1</td>
                <td className="py-3 px-4">100%</td>
                <td className="py-3 px-4 text-muted-foreground">Maximum strength</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">2</td>
                <td className="py-3 px-4">95%</td>
                <td className="py-3 px-4 text-muted-foreground">Maximum strength</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">3</td>
                <td className="py-3 px-4">93%</td>
                <td className="py-3 px-4 text-muted-foreground">Strength</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">4</td>
                <td className="py-3 px-4">90%</td>
                <td className="py-3 px-4 text-muted-foreground">Strength</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">5</td>
                <td className="py-3 px-4">87%</td>
                <td className="py-3 px-4 text-muted-foreground">Strength</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">6</td>
                <td className="py-3 px-4">85%</td>
                <td className="py-3 px-4 text-muted-foreground">Strength / Power</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">7</td>
                <td className="py-3 px-4">83%</td>
                <td className="py-3 px-4 text-muted-foreground">Strength / Hypertrophy</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">8</td>
                <td className="py-3 px-4">80%</td>
                <td className="py-3 px-4 text-muted-foreground">Hypertrophy</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">9</td>
                <td className="py-3 px-4">77%</td>
                <td className="py-3 px-4 text-muted-foreground">Hypertrophy</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">10</td>
                <td className="py-3 px-4">75%</td>
                <td className="py-3 px-4 text-muted-foreground">Hypertrophy</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">11</td>
                <td className="py-3 px-4">72%</td>
                <td className="py-3 px-4 text-muted-foreground">Hypertrophy / Endurance</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">12</td>
                <td className="py-3 px-4">70%</td>
                <td className="py-3 px-4 text-muted-foreground">Muscular endurance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safe Rep Ranges for Testing */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Safe Rep Ranges for Testing</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Why You Shouldn't Test 1RM Directly</h3>
            <p className="text-muted-foreground">Testing your actual one-rep max carries real risks. Heavy single attempts put significant stress on your joints, connective tissue, and central nervous system. The injury risk goes up when you're fatigued or your form breaks down under maximal load. Most lifters don't need to test true 1RM regularly.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Best Rep Ranges for Testing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">3-5 Reps (Strength Focus)</h4>
                <p className="text-sm text-muted-foreground">Best for strength athletes. Heavy enough to give accurate 1RM estimates while keeping form solid. Lower CNS fatigue than true max attempts.</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">8-10 Reps (Hypertrophy Focus)</h4>
                <p className="text-sm text-muted-foreground">Better for bodybuilding or general fitness. Less joint stress, safer for solo training. Form stays cleaner through the set.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">When to Use Submaximal Testing vs Actual 1RM</h3>
            <p className="text-muted-foreground">Use submaximal testing (3-10 reps) for most training cycles. It's safer, easier to recover from, and gives you the data you need. Save actual 1RM attempts for competition prep or specific testing phases—maybe 2-3 times per year max. Even then, work up gradually and stop if form breaks down.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">How accurate are 1RM calculators?</h3>
            <p className="text-muted-foreground">1RM calculators give estimates, not exact numbers. They're usually within 5-10% of your actual 1RM when you test in the 3-10 rep range. Accuracy drops outside that range. Use them as a guide, not a guarantee.</p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">What's the best rep range for testing 1RM?</h3>
            <p className="text-muted-foreground">3-5 reps works best for strength-focused lifts. 8-10 reps is better for hypertrophy work or if you're training alone. Both ranges give solid estimates without the risks of max testing.</p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Should I test my 1RM directly?</h3>
            <p className="text-muted-foreground">Most of the time, no. Submaximal testing is safer and easier to recover from. Only test true 1RM if you're preparing for competition or have a specific reason. Even then, limit it to a few times per year.</p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Do different formulas give different results?</h3>
            <p className="text-muted-foreground">Yes. Each formula uses different math, so results vary—especially at higher rep counts. That's why this calculator shows multiple formulas. The average usually gives a reasonable estimate.</p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Can I use this for any exercise?</h3>
            <p className="text-muted-foreground">This works best for compound lifts like squat, bench press, deadlift, and overhead press. It's less accurate for isolation exercises or movements where fatigue hits before the target muscles do (like grip on deadlifts).</p>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div className="mt-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/calculators/bmi-calculator" className="block p-4 border rounded-md hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">BMI Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate your Body Mass Index to assess weight status.</p>
          </a>
          <a href="/calculators/tdee-calculator" className="block p-4 border rounded-md hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">TDEE Calculator</h3>
            <p className="text-sm text-muted-foreground">Estimate your Total Daily Energy Expenditure for calorie planning.</p>
          </a>
          <a href="/calculators/body-fat-calculator" className="block p-4 border rounded-md hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Body Fat Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate body fat percentage using multiple measurement methods.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
