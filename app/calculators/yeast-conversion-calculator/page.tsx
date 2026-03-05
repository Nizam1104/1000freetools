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

interface YeastConversion {
  inputAmount: number;
  inputUnit: string;
  activeDry: number;
  instant: number;
  fresh: number;
  rapidRise: number;
}

export default function YeastConversionCalculatorPage() {
  const [amount, setAmount] = useState<string>("");
  const [yeastType, setYeastType] = useState<string>("active-dry");
  const [result, setResult] = useState<YeastConversion | null>(null);

  // Conversion ratios (relative to active dry yeast = 1)
  const conversionRatios = {
    "active-dry": 1,
    "instant": 0.75,
    "rapid-rise": 0.75,
    "fresh": 2.5,
    "fresh-cake": 2.5,
  };

  const calculate = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const inputRatio = conversionRatios[yeastType as keyof typeof conversionRatios];

    // Convert everything to active dry equivalent first
    const activeDryEquivalent = amountNum / inputRatio;

    const conversions: YeastConversion = {
      inputAmount: amountNum,
      inputUnit: yeastType,
      activeDry: parseFloat((activeDryEquivalent * 1).toFixed(2)),
      instant: parseFloat((activeDryEquivalent * 0.75).toFixed(2)),
      fresh: parseFloat((activeDryEquivalent * 2.5).toFixed(2)),
      rapidRise: parseFloat((activeDryEquivalent * 0.75).toFixed(2)),
    };

    setResult(conversions);
  };

  const reset = () => {
    setAmount("");
    setYeastType("active-dry");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Yeast Conversion Calculator – Convert Between Dry, Instant & Fresh Yeast
          </h1>
          <p className="text-muted-foreground">
            Substitute yeast types without ruining your recipe using our Yeast Conversion Calculator.
            Convert between active dry yeast, instant yeast, and fresh yeast with accurate ratios —
            perfect for bakers who need to work with what&apos;s available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yeast-type">Your Yeast Type</Label>
                <Select value={yeastType} onValueChange={setYeastType}>
                  <SelectTrigger id="yeast-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
                    <SelectItem value="instant">Instant Yeast</SelectItem>
                    <SelectItem value="rapid-rise">Rapid Rise Yeast</SelectItem>
                    <SelectItem value="fresh">Fresh Yeast (Cake)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 7"
                    className="flex-1"
                  />
                  <select className="w-24 p-2 border rounded-md bg-background">
                    <option value="grams">grams</option>
                    <option value="tsp">tsp</option>
                    <option value="tbsp">tbsp</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Common measurements:
                </p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 1 packet yeast = 7g = 2¼ tsp</li>
                  <li>• 1 oz yeast = 28g = 9 tsp</li>
                  <li>• 1 cake fresh yeast = 43g = 1.5 oz</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Conversions</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Your Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.inputAmount}g {result.inputUnit.replace("-", " ")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Active Dry Yeast</span>
                      <span className="text-lg font-bold">{result.activeDry}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Instant Yeast</span>
                      <span className="text-lg font-bold">{result.instant}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Rapid Rise Yeast</span>
                      <span className="text-lg font-bold">{result.rapidRise}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Fresh Yeast (Cake)</span>
                      <span className="text-lg font-bold">{result.fresh}g</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Conversion Ratios:</strong>
                      <br />
                      1 part Instant = 1.33 parts Active Dry = 3.33 parts Fresh
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter amount and click Calculate to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Yeast Type Differences
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Active Dry Yeast:</strong> Granular, needs to be dissolved in
                    warm water before use. Most common type.
                  </li>
                  <li>
                    <strong>Instant Yeast:</strong> Finer granules, can be mixed directly
                    with flour. Works faster than active dry.
                  </li>
                  <li>
                    <strong>Rapid Rise Yeast:</strong> Similar to instant, formulated for
                    single-rise recipes.
                  </li>
                  <li>
                    <strong>Fresh Yeast (Cake):</strong> Moist, perishable blocks. Preferred
                    by professional bakers for flavor.
                  </li>
                </ul>
                <p className="pt-2">
                  <strong>Substitution Tips:</strong> When substituting, use less instant
                  yeast than active dry (about 25% less). Fresh yeast requires about 2.5x
                  the amount of dry yeast.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Convert Between Yeast Types</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Select Your Yeast Type</h3>
                <p className="text-sm text-muted-foreground">Choose the type of yeast you have: active dry, instant, rapid rise, or fresh.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Your Amount</h3>
                <p className="text-sm text-muted-foreground">Input the amount of yeast your recipe calls for in grams or teaspoons.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get All Conversions</h3>
                <p className="text-sm text-muted-foreground">See equivalent amounts for all yeast types to use what you have on hand.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Yeast Conversion Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Accurate Substitution Ratios</h3>
              <p className="text-sm text-muted-foreground">Professional baker ratios ensure your bread rises properly regardless of yeast type used.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">All Yeast Types Covered</h3>
              <p className="text-sm text-muted-foreground">Convert between active dry, instant, rapid rise, and fresh cake yeast instantly.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Multiple Unit Support</h3>
              <p className="text-sm text-muted-foreground">Work in grams, teaspoons, tablespoons, or ounces for flexible recipe adaptation.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Baking Success Guaranteed</h3>
              <p className="text-sm text-muted-foreground">Never ruin a recipe due to wrong yeast amounts—get perfect conversions every time.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Yeast Conversion Ratios Reference</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Yeast Type</th>
                  <th className="text-left py-2">Ratio</th>
                  <th className="text-left py-2">For 7g Active Dry</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Active Dry</td>
                  <td className="py-2">1.0</td>
                  <td className="py-2">7g (baseline)</td>
                  <td className="py-2">Dissolve in warm water first</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Instant Yeast</td>
                  <td className="py-2">0.75</td>
                  <td className="py-2">5.25g</td>
                  <td className="py-2">Mix directly with flour</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Rapid Rise</td>
                  <td className="py-2">0.75</td>
                  <td className="py-2">5.25g</td>
                  <td className="py-2">Fastest acting, single rise</td>
                </tr>
                <tr>
                  <td className="py-2">Fresh/Cake</td>
                  <td className="py-2">2.5</td>
                  <td className="py-2">17.5g</td>
                  <td className="py-2">Refrigerate, use within 2 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I substitute instant yeast for active dry?</h3>
              <p className="text-sm text-muted-foreground">Yes! Use 25% less instant yeast than active dry. For 1 tablespoon active dry, use 2¼ teaspoons instant. Instant yeast can be mixed directly into flour without proofing.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much fresh yeast equals dry yeast?</h3>
              <p className="text-sm text-muted-foreground">Use 2.5 times more fresh yeast than dry. One 7g packet of active dry yeast equals about 17-18g (0.6 oz) of fresh cake yeast. Fresh yeast gives superior flavor but spoils faster.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I use too much yeast?</h3>
              <p className="text-sm text-muted-foreground">Too much yeast causes over-proofing: bread rises too fast then collapses, creating large holes and yeasty flavor. It may also taste bitter. Reduce yeast by 25% next time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I know if my yeast is still active?</h3>
              <p className="text-sm text-muted-foreground">Proof test: Mix 1 tsp yeast + 1 tsp sugar in ¼ cup warm water (105-115°F). If it doesn't foam within 10 minutes, the yeast is dead and won't leaven your bread.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I convert yeast measurements to teaspoons?</h3>
              <p className="text-sm text-muted-foreground">Yes. One standard yeast packet = 7g = 2¼ teaspoons active dry = 1¾ teaspoons instant. For bulk yeast: 1 teaspoon ≈ 3g active dry or 2.25g instant yeast.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Baking Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/recipe-scaler-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Recipe Scaler Calculator</h3>
              <p className="text-sm text-muted-foreground">Scale baking recipes up or down for any batch size.</p>
            </a>
            <a href="/calculators/baking-time-adjustment-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Baking Time Adjustment Calculator</h3>
              <p className="text-sm text-muted-foreground">Adjust baking times for different pan sizes and altitudes.</p>
            </a>
            <a href="/calculators/kitchen-measurement-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Kitchen Measurement Converter</h3>
              <p className="text-sm text-muted-foreground">Convert between cups, grams, ounces, and other cooking units.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
