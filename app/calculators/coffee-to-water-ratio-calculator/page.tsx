"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coffee, Info, Droplets } from "lucide-react";
import Faqs from "@/components/utils/Faqs";


interface CoffeeResult {
  coffeeGrams: number;
  waterMl: number;
  coffeeOz: number;
  waterOz: number;
  coffeeTbsp: number;
  waterCups: number;
  ratio: string;
  strength: string;
}

export default function CoffeeToWaterRatioCalculatorPage() {
  const [waterAmount, setWaterAmount] = useState<string>("500");
  const [ratioCoffee, setRatioCoffee] = useState<string>("1");
  const [ratioWater, setRatioWater] = useState<string>("16");
  const [waterUnit, setWaterUnit] = useState<"ml" | "oz" | "cups">("ml");
  const [brewMethod, setBrewMethod] = useState<"drip" | "french-press" | "pour-over" | "espresso" | "cold-brew">("pour-over");
  const [result, setResult] = useState<CoffeeResult | null>(null);

  const handleMethodChange = (value: string) => {
    setBrewMethod(value as "drip" | "french-press" | "pour-over" | "espresso" | "cold-brew");
  };

  const calculateRatio = () => {
    let waterMl = parseFloat(waterAmount);
    const coffeeRatio = parseFloat(ratioCoffee) || 1;
    const waterRatio = parseFloat(ratioWater) || 16;

    if (isNaN(waterMl)) return;

    if (waterUnit === "oz") {
      waterMl = waterMl * 29.5735;
    } else if (waterUnit === "cups") {
      waterMl = waterMl * 236.588;
    }

    const coffeeGrams = waterMl / (waterRatio / coffeeRatio);

    const ratio = `${coffeeRatio}:${waterRatio}`;

    let strength: string;
    if (waterRatio <= 15) strength = "Strong";
    else if (waterRatio <= 17) strength = "Medium";
    else if (waterRatio <= 18) strength = "Medium-Light";
    else strength = "Light";

    setResult({
      coffeeGrams: Math.round(coffeeGrams * 10) / 10,
      waterMl: Math.round(waterMl),
      coffeeOz: Math.round((coffeeGrams / 28.3495) * 10) / 10,
      waterOz: Math.round((waterMl / 29.5735) * 10) / 10,
      coffeeTbsp: Math.round((coffeeGrams / 5) * 10) / 10,
      waterCups: Math.round((waterMl / 236.588) * 10) / 10,
      ratio,
      strength,
    });
  };

  const applyBrewMethod = (method: string) => {
    switch (method) {
      case "drip":
        setRatioCoffee("1");
        setRatioWater("17");
        break;
      case "french-press":
        setRatioCoffee("1");
        setRatioWater("15");
        break;
      case "pour-over":
        setRatioCoffee("1");
        setRatioWater("16");
        break;
      case "espresso":
        setRatioCoffee("1");
        setRatioWater("2");
        break;
      case "cold-brew":
        setRatioCoffee("1");
        setRatioWater("8");
        break;
    }
  };

  const reset = () => {
    setWaterAmount("500");
    setRatioCoffee("1");
    setRatioWater("16");
    setResult(null);
  };

  useEffect(() => {
    calculateRatio();
  }, [waterAmount, ratioCoffee, ratioWater, waterUnit]);

  useEffect(() => {
    applyBrewMethod(brewMethod);
  }, [brewMethod]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Coffee to Water Ratio Calculator – Perfect Coffee Every Time</h1>
          <p className="text-muted-foreground">
            Brew the perfect cup of coffee with our Coffee to Water Ratio Calculator. Enter your desired water amount and brewing method to get the ideal coffee-to-water ratio — essential for baristas and coffee enthusiasts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Brew Settings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="water">Water Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="water"
                        type="number"
                        placeholder="e.g., 500"
                        value={waterAmount}
                        onChange={(e) => setWaterAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={waterUnit} onValueChange={(v) => setWaterUnit(v as "ml" | "oz" | "cups")}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                          <SelectItem value="cups">cups</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Brew Method</Label>
                    <Select value={brewMethod} onValueChange={handleMethodChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pour-over">Pour Over (1:16)</SelectItem>
                        <SelectItem value="drip">Drip Coffee (1:17)</SelectItem>
                        <SelectItem value="french-press">French Press (1:15)</SelectItem>
                        <SelectItem value="espresso">Espresso (1:2)</SelectItem>
                        <SelectItem value="cold-brew">Cold Brew (1:8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Custom Ratio (Optional)</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="ratio-coffee">Coffee Parts</Label>
                    <Input
                      id="ratio-coffee"
                      type="number"
                      placeholder="1"
                      value={ratioCoffee}
                      onChange={(e) => setRatioCoffee(e.target.value)}
                    />
                  </div>
                  <span className="text-2xl font-bold">:</span>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="ratio-water">Water Parts</Label>
                    <Input
                      id="ratio-water"
                      type="number"
                      placeholder="16"
                      value={ratioWater}
                      onChange={(e) => setRatioWater(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Coffee className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Golden ratio for most brew methods: 1:15 to 1:18 (coffee to water). Adjust to taste preference.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRatio} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Coffee Needed</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.coffeeGrams}g</p>
                      <p className="text-lg text-muted-foreground">({result.coffeeOz} oz)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        Water
                      </p>
                      <p className="text-lg font-bold">{result.waterMl} ml</p>
                      <p className="text-xs text-muted-foreground">{result.waterCups} cups</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Coffee (volume)</p>
                      <p className="text-lg font-bold">{result.coffeeTbsp} tbsp</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Ratio</p>
                      <p className="text-lg font-bold">1:{result.ratio.split(':')[1]}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Strength</p>
                      <p className="text-lg font-bold">{result.strength}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Tip:</strong> 1 tbsp of coffee ≈ 5 grams</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Coffee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter water amount to calculate coffee needed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Brew Method Ratios Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Method</th>
                    <th className="text-left py-2 pr-4">Ratio</th>
                    <th className="text-left py-2">Grind Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Espresso</td>
                    <td className="py-2 pr-4 font-mono">1:2</td>
                    <td className="py-2">Extra Fine</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Cold Brew</td>
                    <td className="py-2 pr-4 font-mono">1:8 (concentrate)</td>
                    <td className="py-2">Extra Coarse</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">French Press</td>
                    <td className="py-2 pr-4 font-mono">1:15</td>
                    <td className="py-2">Coarse</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Pour Over</td>
                    <td className="py-2 pr-4 font-mono">1:16</td>
                    <td className="py-2">Medium-Fine</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Drip Coffee</td>
                    <td className="py-2 pr-4 font-mono">1:17</td>
                    <td className="py-2">Medium</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">AeroPress</td>
                    <td className="py-2 pr-4 font-mono">1:12 - 1:16</td>
                    <td className="py-2">Medium-Fine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Coffee to Water Ratio Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your brew method</p>
                    <p>Choose from pour over, drip, French press, espresso, or cold brew. Each method has an optimal ratio pre-loaded based on industry standards.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your desired water amount</p>
                    <p>Input how much coffee you want to make in milliliters, ounces, or cups. The calculator automatically converts between units.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Get your coffee measurement</p>
                    <p>Results show grams of coffee needed, tablespoons for scoop measurement, and the strength level. Adjust the ratio manually if you prefer stronger or weaker coffee.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Coffee Strength Guide by Ratio
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Ratio</th>
                      <th className="text-left py-3 px-2 font-semibold">Coffee (g)</th>
                      <th className="text-left py-3 px-2 font-semibold">Water (ml)</th>
                      <th className="text-left py-3 px-2 font-semibold">Strength</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">1:12</td>
                      <td className="py-3 px-2">25g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-red-600 font-medium">Very Strong</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:14</td>
                      <td className="py-3 px-2">21g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-orange-600 font-medium">Strong</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:15</td>
                      <td className="py-3 px-2">20g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-blue-600 font-medium">Medium-Strong</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:16</td>
                      <td className="py-3 px-2">19g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-green-600 font-medium">Medium (Golden)</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:17</td>
                      <td className="py-3 px-2">18g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-blue-600 font-medium">Medium-Light</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">1:18</td>
                      <td className="py-3 px-2">17g</td>
                      <td className="py-3 px-2">300ml</td>
                      <td className="py-3 px-2"><span className="text-gray-600 font-medium">Light</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: The 1:16 ratio is considered the &quot;golden ratio&quot; by the Specialty Coffee Association. Adjust based on your taste preference and coffee origin.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Coffee Extraction
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What the Ratio Controls</h4>
                  <p>
                    The coffee to water ratio determines extraction strength, not extraction yield. A 1:12 ratio produces a stronger, more concentrated cup. A 1:18 ratio produces a lighter, more tea-like cup. The ratio doesn&apos;t change how much flavor is extracted from the grounds, just how diluted the final drink is.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Golden Ratio Explained</h4>
                  <p>
                    The Specialty Coffee Association recommends 55 grams of coffee per liter of water, which equals a 1:18 ratio. Many baristas prefer 1:15 to 1:17 for better balance. This range extracts enough soluble compounds for full flavor without excessive bitterness or sourness.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Espresso Uses Different Ratios</h4>
                  <p>
                    Espresso uses a 1:2 ratio because it&apos;s measured by output, not input. An 18 gram dose yielding 36 grams of liquid espresso is a 1:2 ratio. The high pressure and fine grind extract coffee much more efficiently than drip methods, requiring less water for the same strength.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Brewing Tips for Better Coffee
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Weigh your coffee and water</p>
                    <p>Volume measurements vary with grind size and packing. A gram scale gives consistent results. Entry-level scales cost under 20 dollars and transform your brewing consistency.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Match grind size to method</p>
                    <p>Espresso needs extra fine, pour over needs medium-fine, French press needs coarse. Wrong grind size causes over or under extraction regardless of ratio. Invest in a burr grinder for consistent particle size.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use proper water temperature</p>
                    <p>Ideal brewing temperature is 195-205 F (90-96 C). Boiling water scorches coffee. Water that&apos;s too cool under extracts. Let boiling water rest 30 seconds before brewing, or use a temperature-controlled kettle.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adjust to taste</p>
                    <p>Start with the recommended ratio for your method. If coffee tastes weak or sour, use more coffee (lower ratio number). If it tastes bitter or harsh, use less coffee (higher ratio number). Your preference matters more than any rule.</p>
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
    question: "How much coffee per cup?",
    answer: "For a standard 6 oz (180 ml) cup at 1:16 ratio, use 11 grams of coffee. For a 12 oz (355 ml) mug, use 22 grams. A typical 10 cup drip maker holds 60 oz and needs about 60 grams of coffee at 1:16 ratio.",
  },
{
    question: "Should I measure coffee by volume or weight?",
    answer: "Weight is more accurate. One tablespoon of fine espresso grind weighs more than one tablespoon of coarse French press grind. If you must use volume, 1 tablespoon of medium ground coffee equals about 5 grams.",
  },
{
    question: "Why does my coffee taste bitter?",
    answer: "Bitter coffee usually means over extraction. Try a coarser grind, shorter brew time, or lower water temperature. You can also use a higher ratio like 1:17 or 1:18 to dilute the strength slightly.",
  },
{
    question: "Why does my coffee taste sour?",
    answer: "Sour coffee indicates under extraction. Use a finer grind, longer brew time, or hotter water. A lower ratio like 1:14 or 1:15 will also increase strength and mask some sourness.",
  },
{
    question: "Does cold brew use the same ratios?",
    answer: "Cold brew concentrate uses 1:8 ratio, then gets diluted 1:1 with water or milk for drinking. This equals 1:16 when served. Cold extraction is less efficient, so the higher initial concentration compensates.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
