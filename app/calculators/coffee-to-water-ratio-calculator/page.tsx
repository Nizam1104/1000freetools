"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coffee, Info, Droplets } from "lucide-react";

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
      </div>
    </div>
  );
}
