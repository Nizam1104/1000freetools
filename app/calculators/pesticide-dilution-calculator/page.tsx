"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PesticideDilutionCalculatorPage() {
  const [targetConcentration, setTargetConcentration] = useState<string>("");
  const [totalSprayVolume, setTotalSprayVolume] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<"liters" | "gallons">("liters");
  const [productConcentration, setProductConcentration] = useState<string>("");
  const [pesticideType, setPesticideType] = useState<"liquid" | "powder" | "granular">("liquid");
  const [result, setResult] = useState<{
    pesticideAmount: number;
    waterAmount: number;
    dilutionRatio: string;
    applicationRate: number;
  } | null>(null);

  // Common pesticide concentrations
  const commonProducts = [
    { name: "Glyphosate 41%", concentration: "41" },
    { name: "Malathion 50%", concentration: "50" },
    { name: "Carbaryl 50%", concentration: "50" },
    { name: "Permethrin 36%", concentration: "36" },
    { name: "Imidacloprid 17.8%", concentration: "17.8" },
    { name: "Copper Sulfate 98%", concentration: "98" },
    { name: "Neem Oil 70%", concentration: "70" },
    { name: "Bt (Bacillus thuringiensis)", concentration: "32" },
  ];

  const applyPreset = (concentration: string) => {
    setProductConcentration(concentration);
  };

  const calculate = () => {
    const targetConc = parseFloat(targetConcentration);
    const totalVolume = parseFloat(totalSprayVolume);
    const productConc = parseFloat(productConcentration);

    if (isNaN(targetConc) || isNaN(totalVolume) || isNaN(productConc) ||
      targetConc <= 0 || totalVolume <= 0 || productConc <= 0) return;

    // Calculate amount of pesticide concentrate needed
    // C1V1 = C2V2 (dilution equation)
    // V1 = (C2 × V2) / C1
    const pesticideAmount = (targetConc * totalVolume) / productConc;
    const waterAmount = totalVolume - pesticideAmount;

    // Calculate dilution ratio (1:X)
    const ratio = totalVolume / pesticideAmount;

    // Application rate per hectare (assuming 100-500 L/ha typical spray volume)
    const applicationRate = pesticideAmount / (totalVolume / 100); // per 100L

    setResult({
      pesticideAmount: Math.round(pesticideAmount * 100) / 100,
      waterAmount: Math.round(waterAmount * 100) / 100,
      dilutionRatio: `1:${Math.round(ratio)}`,
      applicationRate: Math.round(applicationRate * 100) / 100,
    });
  };

  const reset = () => {
    setTargetConcentration("");
    setTotalSprayVolume("");
    setProductConcentration("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Pesticide Dilution Calculator – Calculate the Right Pesticide-to-Water Ratio
          </h1>
          <p className="text-muted-foreground">
            Mix pesticides safely and accurately with our Pesticide Dilution Calculator. Enter the
            required concentration, total spray volume, and product label rate to get the exact
            amount of concentrate to add to water for effective pest control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Common Products (Quick Select)</Label>
                <div className="flex flex-wrap gap-2">
                  {commonProducts.map((product) => (
                    <Button
                      key={product.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(product.concentration)}
                      className="text-xs"
                    >
                      {product.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productConcentration">Product Concentration (%)</Label>
                <Input
                  id="productConcentration"
                  type="number"
                  placeholder="e.g., 41"
                  step="0.1"
                  value={productConcentration}
                  onChange={(e) => setProductConcentration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Check product label for active ingredient %
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetConcentration">Target Concentration (%)</Label>
                <Input
                  id="targetConcentration"
                  type="number"
                  placeholder="e.g., 1"
                  step="0.1"
                  value={targetConcentration}
                  onChange={(e) => setTargetConcentration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical: 0.5-2% for most applications
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSprayVolume">Total Spray Volume</Label>
                <div className="flex gap-2">
                  <Input
                    id="totalSprayVolume"
                    type="number"
                    placeholder="e.g., 100"
                    value={totalSprayVolume}
                    onChange={(e) => setTotalSprayVolume(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={volumeUnit} onValueChange={(v) => setVolumeUnit(v as "liters" | "gallons")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liters">Liters</SelectItem>
                      <SelectItem value="gallons">Gallons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pesticideType">Pesticide Formulation</Label>
                <Select value={pesticideType} onValueChange={(v) => setPesticideType(v as "liquid" | "powder" | "granular")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liquid">Liquid Concentrate (EC, SC)</SelectItem>
                    <SelectItem value="powder">Wettable Powder (WP)</SelectItem>
                    <SelectItem value="granular">Water Dispersible Granule (WG)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Dilution Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Pesticide Concentrate Needed</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.pesticideAmount} {volumeUnit === "liters" ? "mL" : "fl oz"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Water Needed</p>
                      <p className="text-lg font-bold">{result.waterAmount} {volumeUnit}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Dilution Ratio</p>
                      <p className="text-lg font-bold">{result.dilutionRatio}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Application Rate</p>
                    <p className="text-xl font-bold">{result.applicationRate} {volumeUnit === "liters" ? "mL" : "fl oz"} per 100L</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Mixing Instructions</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Fill spray tank 1/4 with water</li>
                      <li>Add {result.pesticideAmount} {volumeUnit === "liters" ? "mL" : "fl oz"} of concentrate</li>
                      <li>Add remaining water to reach {totalSprayVolume} {volumeUnit}</li>
                      <li>Agitate thoroughly before and during application</li>
                    </ol>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded">
                    <p className="text-sm text-amber-800 dark:text-amber-400">
                      <strong>⚠ Safety:</strong> Always wear PPE (gloves, mask, goggles) when handling pesticides.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Dilution Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>C1V1 = C2V2 (Dilution Equation)</div>
            <div>V1 = (C2 × V2) / C1</div>
            <div>Where: C1 = Product concentration, V1 = Product volume needed</div>
            <div>C2 = Target concentration, V2 = Total spray volume</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> To make 100L of 1% solution from 41% concentrate:
            <br />
            V1 = (1 × 100) / 41 = 2.44L or 2440mL of concentrate
            <br />
            Water = 100L - 2.44L = 97.56L
          </p>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Calculate Pesticide Dilution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Check product concentration</p>
                <p className="text-sm text-muted-foreground">Find the active ingredient percentage on the pesticide label (e.g., 41% for glyphosate).</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Enter target concentration and volume</p>
                <p className="text-sm text-muted-foreground">Input the desired spray concentration (usually 0.5-2%) and total spray volume needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Get mixing instructions</p>
                <p className="text-sm text-muted-foreground">Receive exact amounts of concentrate and water needed, plus step-by-step mixing guidance.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Accurate Dilution Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Effective pest control</p>
                <p className="text-sm text-muted-foreground">Correct concentration ensures the pesticide works as intended without under-dosing.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Prevents crop damage</p>
                <p className="text-sm text-muted-foreground">Over-concentrated sprays can burn plants and damage foliage.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Cost savings</p>
                <p className="text-sm text-muted-foreground">Avoid wasting expensive concentrate by mixing only what you need.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Environmental safety</p>
                <p className="text-sm text-muted-foreground">Proper dilution reduces chemical runoff and environmental impact.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Regulatory compliance</p>
                <p className="text-sm text-muted-foreground">Follow label rates to stay within legal application requirements.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">How do I calculate pesticide dilution ratio?</p>
                <p className="text-sm text-muted-foreground">Use C1V1 = C2V2. For example, to make 10L of 1% spray from 50% concentrate: V1 = (1 × 10) / 50 = 0.2L or 200mL of concentrate.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What is a typical pesticide dilution rate?</p>
                <p className="text-sm text-muted-foreground">Most foliar sprays use 0.5-2% concentration. Soil drenches may use 0.1-0.5%. Always check the product label for specific rates.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How much water do I add to pesticide concentrate?</p>
                <p className="text-sm text-muted-foreground">Subtract the concentrate volume from your total spray volume. For 100L total with 2L concentrate, add 98L of water.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Can I mix different pesticides together?</p>
                <p className="text-sm text-muted-foreground">Only if the labels allow tank mixing. Some combinations cause chemical reactions or reduce effectiveness. Test compatibility first.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What PPE should I wear when mixing pesticides?</p>
                <p className="text-sm text-muted-foreground">Wear chemical-resistant gloves, long sleeves, long pants, closed shoes, safety goggles, and a mask or respirator as specified on the label.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Agriculture Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Try our other farming tools: the <a href="/calculators/fertilizer-requirement-calculator" className="text-primary hover:underline">fertilizer requirement calculator</a> for nutrient planning, the <a href="/calculators/seed-rate-calculator" className="text-primary hover:underline">seed rate calculator</a> for planting density, and the <a href="/calculators/irrigation-water-calculator" className="text-primary hover:underline">irrigation water calculator</a> for water management.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
