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

interface TeaResult {
  teaType: string;
  waterTemp: number;
  steepTime: string;
  teaAmount: string;
  waterAmount: number;
  caffeineLevel: string;
  resteeepable: boolean;
  recommendations: string[];
}

const teaTypes: Record<string, { temp: number; time: string; amount: string; caffeine: string; resteeepable: boolean; description: string }> = {
  black: { temp: 100, time: "3-5 minutes", amount: "1 tsp (2g) per cup", caffeine: "High (40-70mg)", resteeepable: true, description: "Bold, robust flavor" },
  green: { temp: 80, time: "2-3 minutes", amount: "1 tsp (2g) per cup", caffeine: "Medium (20-45mg)", resteeepable: true, description: "Fresh, grassy flavor" },
  white: { temp: 75, time: "4-5 minutes", amount: "1.5 tsp (3g) per cup", caffeine: "Low (15-30mg)", resteeepable: true, description: "Delicate, subtle flavor" },
  oolong: { temp: 90, time: "3-5 minutes", amount: "1 tsp (2g) per cup", caffeine: "Medium (30-50mg)", resteeepable: true, description: "Complex, floral flavor" },
  herbal: { temp: 100, time: "5-7 minutes", amount: "1 tbsp (3g) per cup", caffeine: "None (0mg)", resteeepable: false, description: "Varies by blend" },
  puErh: { temp: 100, time: "3-4 minutes", amount: "1 tsp (2g) per cup", caffeine: "Medium (30-60mg)", resteeepable: true, description: "Earthy, aged flavor" },
  matcha: { temp: 80, time: "Whisk until frothy", amount: "1/2 tsp (1g) per cup", caffeine: "High (70mg)", resteeepable: false, description: "Intense, umami flavor" },
  chai: { temp: 100, time: "5-7 minutes", amount: "1 tsp (2g) per cup", caffeine: "Medium (40-60mg)", resteeepable: false, description: "Spiced, warming flavor" },
};

export default function TeaBrewingStrengthCalculatorPage() {
  const [teaType, setTeaType] = useState<string>("black");
  const [cups, setCups] = useState<string>("1");
  const [strength, setStrength] = useState<string>("normal");
  const [result, setResult] = useState<TeaResult | null>(null);

  const calculate = () => {
    const teaData = teaTypes[teaType];
    const cupsNum = parseInt(cups) || 1;

    if (!teaData) return;

    // Adjust steep time based on strength
    let steepTime = teaData.time;
    let teaAmount = teaData.amount;

    if (strength === "weak") {
      steepTime = teaData.time.replace(/(\d+)-(\d+)/, (match, p1, p2) =>
        `${Math.max(1, parseInt(p1) - 1)}-${parseInt(p2) - 1} minutes`
      );
    } else if (strength === "strong") {
      steepTime = teaData.time.replace(/(\d+)-(\d+)/, (match, p1, p2) =>
        `${parseInt(p1) + 1}-${parseInt(p2) + 1} minutes`
      );
      teaAmount = teaData.amount.replace(/(\d+) tsp/, (match, p1) => `${parseInt(p1) + 0.5} tsp`);
    }

    // Water amount
    const waterAmount = cupsNum * 240; // ml per cup

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`💧 Water temperature: ${teaData.temp}°C (${(teaData.temp * 9 / 5 + 32).toFixed(0)}°F)`);
    recommendations.push(`⏱️ Steep time: ${steepTime}`);
    recommendations.push(`🍃 Tea amount: ${teaAmount}`);

    if (teaData.resteeepable) {
      recommendations.push("♻️ This tea can be resteeped 2-3 times");
      recommendations.push("💡 Increase steep time by 30 seconds for each resteep");
    }

    if (teaType === "green" || teaType === "white") {
      recommendations.push("⚠️ Don't use boiling water - it will make tea bitter");
    }

    if (teaType === "matcha") {
      recommendations.push("🥄 Sift matcha to avoid clumps");
      recommendations.push("🍵 Use bamboo whisk for best results");
    }

    recommendations.push(`☕ Total water: ${waterAmount}ml for ${cupsNum} cup(s)`);

    setResult({
      teaType: teaType.charAt(0).toUpperCase() + teaType.slice(1),
      waterTemp: teaData.temp,
      steepTime,
      teaAmount,
      waterAmount,
      caffeineLevel: teaData.caffeine,
      resteeepable: teaData.resteeepable,
      recommendations,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio
          </h1>
          <p className="text-muted-foreground">
            Brew the perfect cup of tea with our Tea Brewing Strength Calculator.
            Select your tea type and desired strength to get optimal steeping time,
            temperature, and tea leaf quantity per cup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tea-type">Tea Type</Label>
                <Select value={teaType} onValueChange={setTeaType}>
                  <SelectTrigger id="tea-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black Tea</SelectItem>
                    <SelectItem value="green">Green Tea</SelectItem>
                    <SelectItem value="white">White Tea</SelectItem>
                    <SelectItem value="oolong">Oolong Tea</SelectItem>
                    <SelectItem value="herbal">Herbal Tea</SelectItem>
                    <SelectItem value="puErh">Pu-erh Tea</SelectItem>
                    <SelectItem value="matcha">Matcha</SelectItem>
                    <SelectItem value="chai">Chai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cups">Number of Cups</Label>
                <Input
                  id="cups"
                  type="number"
                  min="1"
                  value={cups}
                  onChange={(e) => setCups(e.target.value)}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="strength">Desired Strength</Label>
                <Select value={strength} onValueChange={setStrength}>
                  <SelectTrigger id="strength">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weak">Weak (Light)</SelectItem>
                    <SelectItem value="normal">Normal (Standard)</SelectItem>
                    <SelectItem value="strong">Strong (Bold)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  {teaTypes[teaType]?.description}
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
              <h3 className="text-lg font-semibold mb-4">Brewing Guide</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Tea Type</p>
                    <p className="text-2xl font-bold text-primary">{result.teaType}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Water Temp</p>
                      <p className="text-xl font-bold">{result.waterTemp}°C</p>
                      <p className="text-xs text-muted-foreground">{(result.waterTemp * 9 / 5 + 32).toFixed(0)}°F</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Steep Time</p>
                      <p className="text-xl font-bold">{result.steepTime}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tea Amount:</span>
                      <span className="font-semibold">{result.teaAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Water Amount:</span>
                      <span className="font-semibold">{result.waterAmount}ml</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Caffeine:</span>
                      <span className="font-semibold">{result.caffeineLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Resteeepable:</span>
                      <span className="font-semibold">{result.resteeepable ? "Yes" : "No"}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Brewing Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select tea type and click Calculate to see brewing guide</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tea Brewing Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Water quality:</strong> Use filtered water for best taste
                  </li>
                  <li>
                    <strong>Preheat vessel:</strong> Warm your teapot/cup before brewing
                  </li>
                  <li>
                    <strong>Cover while steeping:</strong> Traps heat and volatile oils
                  </li>
                  <li>
                    <strong>Don&apos;t oversteep:</strong> Causes bitterness, especially in green tea
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are general guidelines. Premium teas may
                  have specific brewing instructions from the producer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Select Tea Type</h4>
                    <p className="text-xs text-muted-foreground">Choose from black, green, white, oolong, herbal, pu-erh, matcha, or chai – each has unique brewing requirements.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Set Cups & Strength</h4>
                    <p className="text-xs text-muted-foreground">Enter number of cups and choose weak, normal, or strong to adjust steep time and leaf quantity.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Brewing Guide</h4>
                    <p className="text-xs text-muted-foreground">Receive precise water temperature, steep time, tea amount, and expert tips for perfect tea every time.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tea Brewing Temperature & Time Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Tea Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Water Temp</th>
                      <th className="text-left py-2 px-3 font-semibold">Steep Time</th>
                      <th className="text-left py-2 px-3 font-semibold">Amount per Cup</th>
                      <th className="text-left py-2 px-3 font-semibold">Resteepable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Black Tea</td>
                      <td className="py-2 px-3 font-mono text-xs">100°C / 212°F</td>
                      <td className="py-2 px-3 text-xs">3-5 min</td>
                      <td className="py-2 px-3 text-xs">1 tsp (2g)</td>
                      <td className="py-2 px-3 text-xs">Yes (2-3x)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Green Tea</td>
                      <td className="py-2 px-3 font-mono text-xs">80°C / 176°F</td>
                      <td className="py-2 px-3 text-xs">2-3 min</td>
                      <td className="py-2 px-3 text-xs">1 tsp (2g)</td>
                      <td className="py-2 px-3 text-xs">Yes (2-3x)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">White Tea</td>
                      <td className="py-2 px-3 font-mono text-xs">75°C / 167°F</td>
                      <td className="py-2 px-3 text-xs">4-5 min</td>
                      <td className="py-2 px-3 text-xs">1.5 tsp (3g)</td>
                      <td className="py-2 px-3 text-xs">Yes (2-3x)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Oolong Tea</td>
                      <td className="py-2 px-3 font-mono text-xs">90°C / 194°F</td>
                      <td className="py-2 px-3 text-xs">3-5 min</td>
                      <td className="py-2 px-3 text-xs">1 tsp (2g)</td>
                      <td className="py-2 px-3 text-xs">Yes (3-5x)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Herbal Tea</td>
                      <td className="py-2 px-3 font-mono text-xs">100°C / 212°F</td>
                      <td className="py-2 px-3 text-xs">5-7 min</td>
                      <td className="py-2 px-3 text-xs">1 tbsp (3g)</td>
                      <td className="py-2 px-3 text-xs">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Matcha</td>
                      <td className="py-2 px-3 font-mono text-xs">80°C / 176°F</td>
                      <td className="py-2 px-3 text-xs">Whisk until frothy</td>
                      <td className="py-2 px-3 text-xs">½ tsp (1g)</td>
                      <td className="py-2 px-3 text-xs">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">8 Tea Varieties Supported</h4>
                  <p className="text-xs text-muted-foreground">From delicate white tea to robust pu-erh, get precise brewing parameters for all major tea types.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Strength Customization</h4>
                  <p className="text-xs text-muted-foreground">Adjust steep time and leaf quantity for weak, normal, or strong tea based on your preference.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Temperature Conversion</h4>
                  <p className="text-xs text-muted-foreground">See water temperature in both Celsius and Fahrenheit for international users.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Expert Brewing Tips</h4>
                  <p className="text-xs text-muted-foreground">Get tea-specific recommendations including resteeping guidance and preparation techniques.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">Why does green tea need lower temperature?</h4>
                <p className="text-xs text-muted-foreground">
                  Green tea is unoxidized and delicate. Boiling water (100°C) burns the leaves, releasing excessive tannins that make tea bitter and astringent. 75-85°C water extracts flavor gently, preserving the fresh, grassy notes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How much tea should I use per cup?</h4>
                <p className="text-xs text-muted-foreground">
                  Standard ratio is 1 teaspoon (2g) of loose leaf tea per 240ml (8oz) cup. Adjust to taste – use 1.5 tsp for stronger tea or larger cups. Tea bags typically contain 2-2.5g per bag.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Can I resteep tea leaves?</h4>
                <p className="text-xs text-muted-foreground">
                  Yes! High-quality loose leaf teas (green, white, oolong, pu-erh) can be resteeped 2-5 times. Increase steep time by 30 seconds for each resteep. Black tea can be resteeped 2-3 times. Herbal teas generally cannot be resteeped.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What happens if I oversteep tea?</h4>
                <p className="text-xs text-muted-foreground">
                  Oversteeping releases excessive tannins, making tea bitter, astringent, and unpleasant. Green tea becomes especially bitter after 4 minutes. Set a timer and remove leaves promptly for best flavor.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Does tea strength affect caffeine content?</h4>
                <p className="text-xs text-muted-foreground">
                  Yes. Longer steeping extracts more caffeine. Strong tea (5+ min steep) has 20-30% more caffeine than weak tea (2 min). However, water temperature matters more – hotter water extracts caffeine faster than longer steeping.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Related Tools</h3>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/calculators/coffee-to-water-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Coffee to Water Ratio Calculator</p>
                  <p className="text-xs text-muted-foreground">Perfect coffee brewing ratios</p>
                </a>
                <a href="/calculators/recipe-scaler-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Recipe Scaler Calculator</p>
                  <p className="text-xs text-muted-foreground">Scale recipes up or down</p>
                </a>
                <a href="/calculators/kitchen-measurement-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Kitchen Measurement Converter</p>
                  <p className="text-xs text-muted-foreground">Convert cooking measurements</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
