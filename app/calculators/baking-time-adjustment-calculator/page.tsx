"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

interface BakingResult {
  originalPan: { diameter: number; area: number };
  newPan: { diameter: number; area: number };
  areaRatio: number;
  adjustedTime: string;
  adjustedTemp: number;
  batterDepth: string;
  recommendations: string[];
}

export default function BakingTimeAdjustmentCalculatorPage() {
  const [originalDiameter, setOriginalDiameter] = useState<string>("9");
  const [newDiameter, setNewDiameter] = useState<string>("");
  const [originalTime, setOriginalTime] = useState<string>("30");
  const [originalTemp, setOriginalTemp] = useState<string>("350");
  const [panShape, setPanShape] = useState<string>("round");
  const [result, setResult] = useState<BakingResult | null>(null);

  const calculate = () => {
    const origDia = parseFloat(originalDiameter) || 9;
    const newDia = parseFloat(newDiameter) || 0;
    const origTime = parseFloat(originalTime) || 30;
    const origTemp = parseFloat(originalTemp) || 350;

    if (newDia === 0) return;

    // Calculate pan areas
    const origArea = panShape === "round" 
      ? Math.PI * Math.pow(origDia / 2, 2)
      : origDia * origDia;
    
    const newArea = panShape === "round"
      ? Math.PI * Math.pow(newDia / 2, 2)
      : newDia * newDia;

    // Area ratio
    const areaRatio = newArea / origArea;

    // Adjusted time (larger pan = less time, smaller pan = more time)
    // Time is inversely proportional to area for same batter amount
    const timeFactor = origArea / newArea;
    const adjustedTimeMin = origTime * timeFactor;

    // Format time
    const hours = Math.floor(adjustedTimeMin / 60);
    const minutes = Math.round(adjustedTimeMin % 60);
    const adjustedTime = hours > 0 
      ? `${hours}h ${minutes}m`
      : `${minutes} minutes`;

    // Temperature adjustment (slightly lower for larger pans)
    let adjustedTemp = origTemp;
    if (areaRatio > 1.5) {
      adjustedTemp = origTemp - 25;
    } else if (areaRatio > 1.2) {
      adjustedTemp = origTemp - 15;
    } else if (areaRatio < 0.8) {
      adjustedTemp = origTemp + 15;
    }

    // Batter depth change
    let batterDepth = "";
    if (areaRatio > 1.3) {
      batterDepth = "Shallower - will bake faster";
    } else if (areaRatio < 0.7) {
      batterDepth = "Deeper - will take longer to bake through";
    } else {
      batterDepth = "Similar depth to original";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Area ratio: ${areaRatio.toFixed(2)}x original`);
    recommendations.push(`⏱️ Check for doneness ${Math.round(adjustedTimeMin * 0.8)} minutes in`);
    
    if (areaRatio > 1.5) {
      recommendations.push("⚠️ Larger pan - reduce temperature to prevent over-browning");
      recommendations.push("👀 Watch edges carefully, may brown faster");
    } else if (areaRatio < 0.7) {
      recommendations.push("⚠️ Smaller/deeper pan - may need to cover with foil");
      recommendations.push("🌡️ Lower temperature helps center cook through");
    }

    recommendations.push("🧪 Use toothpick test for doneness");
    recommendations.push("🔄 Rotate pan halfway through baking");

    setResult({
      originalPan: { diameter: origDia, area: parseFloat(origArea.toFixed(1)) },
      newPan: { diameter: newDia, area: parseFloat(newArea.toFixed(1)) },
      areaRatio: parseFloat(areaRatio.toFixed(2)),
      adjustedTime,
      adjustedTemp,
      batterDepth,
      recommendations,
    });
  };

  const reset = () => {
    setNewDiameter("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes
          </h1>
          <p className="text-muted-foreground">
            Get perfect bakes every time with our Baking Time Adjustment Calculator.
            When you change pan size, get adjusted baking time and temperature to ensure
            even cooking and consistent results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan-shape">Pan Shape</Label>
                <Select value={panShape} onValueChange={setPanShape}>
                  <SelectTrigger id="pan-shape">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="original-diameter">Original Pan ({panShape === "round" ? "diameter" : "side"})</Label>
                  <Input
                    id="original-diameter"
                    type="number"
                    value={originalDiameter}
                    onChange={(e) => setOriginalDiameter(e.target.value)}
                    placeholder="9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-diameter">New Pan ({panShape === "round" ? "diameter" : "side"})</Label>
                  <Input
                    id="new-diameter"
                    type="number"
                    value={newDiameter}
                    onChange={(e) => setNewDiameter(e.target.value)}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="original-time">Original Time (min)</Label>
                  <Input
                    id="original-time"
                    type="number"
                    value={originalTime}
                    onChange={(e) => setOriginalTime(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="original-temp">Original Temp (°F)</Label>
                  <Input
                    id="original-temp"
                    type="number"
                    value={originalTemp}
                    onChange={(e) => setOriginalTemp(e.target.value)}
                    placeholder="350"
                  />
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
              <h3 className="text-lg font-semibold mb-4">Baking Adjustments</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Adjusted Time</p>
                      <p className="text-2xl font-bold text-primary">{result.adjustedTime}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Adjusted Temp</p>
                      <p className="text-2xl font-bold text-primary">{result.adjustedTemp}°F</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Original Pan:</span>
                      <span className="font-semibold">{result.originalPan.diameter}&quot; ({result.originalPan.area} sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Pan:</span>
                      <span className="font-semibold">{result.newPan.diameter}&quot; ({result.newPan.area} sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Area Ratio:</span>
                      <span className="font-semibold">{result.areaRatio}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batter Depth:</span>
                      <span className="font-semibold">{result.batterDepth}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Baking Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter pan details and click Calculate to see adjustments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Baking Time Adjustment Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
                  <div>
                    <p className="font-medium text-foreground">Select your pan shape and enter dimensions</p>
                    <p>Choose round or square. Enter the original pan size from your recipe, then the pan you want to use instead.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
                  <div>
                    <p className="font-medium text-foreground">Enter the original baking time and temperature</p>
                    <p>Use the time and temperature from your recipe. Most cakes bake at 350°F for 25-35 minutes in a 9-inch pan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate and review the adjustments</p>
                    <p>You will see the new baking time, recommended temperature adjustment, and tips for your specific pan change.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Pan Size Conversions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Original Pan</th>
                      <th className="text-left py-3 px-2 font-semibold">New Pan</th>
                      <th className="text-left py-3 px-2 font-semibold">Time Change</th>
                      <th className="text-left py-3 px-2 font-semibold">Temp Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">9-inch round</td>
                      <td className="py-3 px-2">8-inch round</td>
                      <td className="py-3 px-2">+10-15 minutes</td>
                      <td className="py-3 px-2">-25°F</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">9-inch round</td>
                      <td className="py-3 px-2">9x13 rectangle</td>
                      <td className="py-3 px-2">-10-15 minutes</td>
                      <td className="py-3 px-2">None</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">9x13 rectangle</td>
                      <td className="py-3 px-2">Two 9-inch rounds</td>
                      <td className="py-3 px-2">-5-10 minutes</td>
                      <td className="py-3 px-2">None</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">8-inch square</td>
                      <td className="py-3 px-2">9-inch square</td>
                      <td className="py-3 px-2">-5-8 minutes</td>
                      <td className="py-3 px-2">None</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">9-inch round</td>
                      <td className="py-3 px-2">Bundt pan</td>
                      <td className="py-3 px-2">+15-25 minutes</td>
                      <td className="py-3 px-2">-25°F</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are general guidelines. Always check for doneness with a toothpick or cake tester.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Pan Size Affects Baking Time
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Surface Area Matters</h4>
                  <p>
                    A larger pan spreads the same batter thinner. Thinner batter bakes faster because heat reaches the center more quickly. A 9-inch round pan has about 64 square inches of surface area. A 9x13 rectangle has 117 square inches — nearly double. The same batter in the larger pan will be half as thick and bake much faster.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Edge-to-Center Ratio</h4>
                  <p>
                    Pan edges bake faster than the center. Round pans have less edge relative to their area compared to square pans. This is why square cakes often have drier edges. Rectangular pans have even more edge, which is why brownies baked in rectangles develop those chewy edge pieces everyone fights over.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Material Changes Everything</h4>
                  <p>
                    Dark metal pans absorb more heat and bake faster. Light aluminum pans reflect heat and bake more gently. Glass pans heat slowly but retain heat well — reduce temperature by 25°F when using glass. Silicone pans are flexible and nonstick but can make cakes pale on the sides.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Pan Substitutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check early and often</p>
                  <p>Start checking 5-10 minutes before the calculated time. Ovens vary, and pan material affects results. Better to check early than overbake.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Rotate the pan halfway through</p>
                  <p>Most ovens have hot spots. Rotating the pan 180 degrees halfway through baking helps ensure even browning on all sides.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use the toothpick test</p>
                  <p>Insert a toothpick into the center. It should come out clean or with a few moist crumbs. Wet batter means keep baking. Bone dry means you waited too long.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Don't fill pans more than 2/3 full</p>
                  <p>Batter rises during baking. If the pan is too full, it will overflow. For deeper cakes, consider splitting batter between two pans.</p>
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
    question: "Can I use a 9x13 pan instead of two 9-inch rounds?",
    answer: "Yes. A 9x13 pan has roughly the same area as two 9-inch round pans. The cake will be slightly thinner and may bake 5-10 minutes faster. This works well for sheet cakes but won't give you layer cake height.",
  },
{
    question: "Why do I need to lower the temperature for dark pans?",
    answer: "Dark metal absorbs more radiant heat than light aluminum. This causes the edges and bottom to brown faster, sometimes burning before the center is done. Lowering the temperature by 25°F slows the exterior browning so the interior can catch up.",
  },
{
    question: "What if my batter overflows the pan?",
    answer: "Pans should only be filled 2/3 full to allow for rising. If you overflowed, the pan was too small. Next time, use a larger pan or divide the batter. You can bake the extra in a muffin tin for bonus cupcakes.",
  },
{
    question: "How do I know when a cake is done?",
    answer: "Use three tests together. The toothpick should come out clean or with moist crumbs. The edges should pull slightly away from the pan. The center should spring back when gently pressed. If it leaves an indent, it needs more time.",
  },
{
    question: "Can I convert between round and square pans?",
    answer: "Yes, but expect different results. An 8-inch square pan has more area than an 8-inch round. A 9-inch square is closer to a 10-inch round. Square cakes have more edge (great for brownies) and may bake unevenly at the corners.",
  }
  ]} />
</section>
        </div>
      </div>
    </div>
  );
}
