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

interface FiltrationResult {
  tankVolume: number;
  fishLoad: string;
  turnoverRate: number;
  minFlowRate: number;
  recommendedFlowRate: number;
  filterTypes: Array<{ type: string; description: string; recommended: boolean }>;
  recommendations: string[];
}

export default function AquariumFiltrationCalculatorPage() {
  const [tankVolume, setTankVolume] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("liters");
  const [fishLoad, setFishLoad] = useState<string>("light");
  const [fishCount, setFishCount] = useState<string>("");
  const [result, setResult] = useState<FiltrationResult | null>(null);

  const calculate = () => {
    let volumeNum = parseFloat(tankVolume) || 0;
    const fishCountNum = parseInt(fishCount) || 0;

    if (volumeNum === 0) return;

    // Convert to liters if needed
    let volumeLiters = volumeNum;
    if (volumeUnit === "gallons") {
      volumeLiters = volumeNum * 3.785;
    }

    // Turnover rate based on fish load
    const turnoverRates: Record<string, number> = {
      light: 4,
      moderate: 6,
      heavy: 8,
      cichlid: 10,
    };
    const turnoverRate = turnoverRates[fishLoad] || 4;

    // Minimum flow rate (GPH or LPH)
    const minFlowRate = volumeLiters * turnoverRate;

    // Recommended flow rate (add 20% headroom)
    const recommendedFlowRate = minFlowRate * 1.2;

    // Filter type recommendations
    const filterTypes = [
      { type: "Hang-On-Back (HOB)", description: "Good for tanks up to 150L", recommended: volumeLiters <= 150 },
      { type: "Canister Filter", description: "Best for tanks 100-500L", recommended: volumeLiters > 100 && volumeLiters <= 500 },
      { type: "Sump Filter", description: "Best for large tanks 300L+", recommended: volumeLiters > 300 },
      { type: "Sponge Filter", description: "Good for breeding tanks, low flow", recommended: fishLoad === "light" },
      { type: "Internal Filter", description: "Compact, good for small tanks", recommended: volumeLiters < 100 },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`💧 Minimum flow rate: ${minFlowRate.toFixed(0)} LPH (${(minFlowRate / 3.785).toFixed(0)} GPH)`);
    recommendations.push(`🎯 Recommended flow rate: ${recommendedFlowRate.toFixed(0)} LPH (${(recommendedFlowRate / 3.785).toFixed(0)} GPH)`);
    recommendations.push(`🔄 Turnover rate: ${turnoverRate}x per hour`);

    if (fishLoad === "heavy" || fishLoad === "cichlid") {
      recommendations.push("⚠️ Heavy bioload - consider oversizing filter by 50%");
      recommendations.push("💨 Add additional aeration for high bioload");
    }

    if (volumeLiters < 50) {
      recommendations.push("🐠 Small tanks require more frequent maintenance");
      recommendations.push("💧 Consider weekly 25-30% water changes");
    }

    recommendations.push("🧽 Clean/replace filter media monthly");
    recommendations.push("🦠 Never replace all filter media at once");

    setResult({
      tankVolume: volumeLiters,
      fishLoad,
      turnoverRate,
      minFlowRate: parseFloat(minFlowRate.toFixed(0)),
      recommendedFlowRate: parseFloat(recommendedFlowRate.toFixed(0)),
      filterTypes,
      recommendations,
    });
  };

  const reset = () => {
    setTankVolume("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank
          </h1>
          <p className="text-muted-foreground">
            Keep your aquarium water crystal clear with our Filtration Calculator.
            Enter tank volume and fish stocking level to calculate the minimum required
            filter flow rate — ensuring healthy water quality for all tank inhabitants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="tank-volume">Tank Volume</Label>
                  <Input
                    id="tank-volume"
                    type="number"
                    value={tankVolume}
                    onChange={(e) => setTankVolume(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="volume-unit">Unit</Label>
                  <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                    <SelectTrigger id="volume-unit">
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
                <Label htmlFor="fish-load">Fish Load / Stocking Level</Label>
                <Select value={fishLoad} onValueChange={setFishLoad}>
                  <SelectTrigger id="fish-load">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light (Few small fish)</SelectItem>
                    <SelectItem value="moderate">Moderate (Community tank)</SelectItem>
                    <SelectItem value="heavy">Heavy (Cichlids, goldfish)</SelectItem>
                    <SelectItem value="cichlid">Very Heavy (African cichlids)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fish-count">Number of Fish (optional)</Label>
                <Input
                  id="fish-count"
                  type="number"
                  value={fishCount}
                  onChange={(e) => setFishCount(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Turnover Rate Guide:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Light: 4x/hour</li>
                  <li>• Moderate: 6x/hour</li>
                  <li>• Heavy: 8x/hour</li>
                  <li>• Cichlids: 10x/hour</li>
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
              <h3 className="text-lg font-semibold mb-4">Filtration Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Flow Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.recommendedFlowRate} LPH</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(result.recommendedFlowRate / 3.785).toFixed(0)} GPH
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Minimum Flow</p>
                      <p className="text-lg font-bold">{result.minFlowRate} LPH</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Turnover Rate</p>
                      <p className="text-lg font-bold">{result.turnoverRate}x/hr</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommended Filter Types</h4>
                    <div className="space-y-2">
                      {result.filterTypes.filter(f => f.recommended).map((filter, i) => (
                        <div key={i} className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-800 dark:text-green-200">{filter.type}</p>
                          <p className="text-sm text-green-700 dark:text-green-300">{filter.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Maintenance Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter tank details and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Filtration Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Turnover rate:</strong> How many times water passes through filter per hour
                  </li>
                  <li>
                    <strong>Three stages:</strong> Mechanical, chemical, and biological filtration
                  </li>
                  <li>
                    <strong>Never clean all media:</strong> Preserve beneficial bacteria
                  </li>
                  <li>
                    <strong>Oversize filters:</strong> Better to have too much filtration than too little
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are general guidelines. Specific fish species
                  may have unique requirements. Cichlids and goldfish produce more waste and
                  need higher turnover rates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Use This Aquarium Filtration Calculator */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Aquarium Filtration Calculator
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Enter Your Tank Volume</h3>
                    <p className="text-sm text-muted-foreground">
                      Input your aquarium's water capacity in either liters or gallons. If you're not sure of the exact volume, use our{" "}
                      <a href="/calculators/aquarium-volume-calculator" className="text-primary hover:underline">
                        Aquarium Volume Calculator
                      </a>{" "}
                      to determine it based on tank dimensions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Select Your Fish Load</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose the stocking level that matches your tank. Light load means a few small fish. Moderate is a typical community tank. Heavy covers messy fish like cichlids or goldfish that produce more waste.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Get Your Filter Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      Click Calculate to see the minimum and recommended flow rates for your setup. The calculator also suggests filter types that work best for your tank size and provides maintenance tips to keep your water clear.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Aquarium Filtration */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding Aquarium Filtration
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Why Filtration Is Essential</h3>
                  <p className="text-sm text-muted-foreground">
                    Filtration keeps your aquarium water safe and healthy for fish. Without proper filtration, waste products like ammonia and nitrite build up quickly – these are toxic to fish even at low levels. A good filter removes physical debris, breaks down harmful chemicals, and provides surface area for beneficial bacteria that convert ammonia into less harmful nitrate. Filtration also creates water movement that oxygenates the water, which fish need to breathe through their gills.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">The Three Types of Filtration</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">Mechanical Filtration</p>
                      <p className="text-xs text-muted-foreground">
                        Physically traps particles like uneaten food, fish waste, and plant debris. Uses sponge, filter floss, or filter pads. Needs regular cleaning or replacement.
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">Biological Filtration</p>
                      <p className="text-xs text-muted-foreground">
                        Uses beneficial bacteria to break down toxic ammonia into nitrite, then into nitrate. Happens on surfaces like ceramic rings, bio-balls, and sponge. Never clean all biological media at once – you'll crash your cycle.
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">Chemical Filtration</p>
                      <p className="text-xs text-muted-foreground">
                        Removes dissolved waste, medications, and discoloration from water. Activated carbon is the most common chemical media. Resin can target specific compounds like phosphate. Needs periodic replacement.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Understanding Turnover Rate</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Turnover rate tells you how many times per hour the entire volume of water in your tank passes through the filter. A 100-liter tank with a 400 LPH (liters per hour) filter has a 4x turnover rate.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The general rule for most aquariums is 4 to 10 times the tank volume per hour. Heavily stocked tanks, messy fish, and reef setups need higher turnover. Lightly stocked planted tanks can get by with lower turnover.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtration Rate Guidelines by Tank Type */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Filtration Rate Guidelines by Tank Type
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">Tank Type</th>
                      <th className="text-left py-2 px-3 font-medium">Turnover Rate</th>
                      <th className="text-left py-2 px-3 font-medium">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-3">Freshwater Community</td>
                      <td className="py-3 px-3">4-6x per hour</td>
                      <td className="py-3 px-3 text-muted-foreground">Standard tropical fish with moderate waste production</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">Cichlid Tanks</td>
                      <td className="py-3 px-3">6-8x per hour</td>
                      <td className="py-3 px-3 text-muted-foreground">High bioload, aggressive fish produce more waste</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">Goldfish Tanks</td>
                      <td className="py-3 px-3">8-10x per hour</td>
                      <td className="py-3 px-3 text-muted-foreground">Very messy eaters, constant waste production</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-3">Reef Tanks</td>
                      <td className="py-3 px-3">10-20x per hour</td>
                      <td className="py-3 px-3 text-muted-foreground">Corals need pristine water and strong flow</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">Quarantine Tanks</td>
                      <td className="py-3 px-3">4-6x per hour</td>
                      <td className="py-3 px-3 text-muted-foreground">Low stress environment for sick or new fish</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                These are starting points. Adjust based on your specific livestock and observed water quality.
              </p>
            </CardContent>
          </Card>

          {/* Types of Filter Media */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Types of Filter Media
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Mechanical Media</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Mechanical media physically traps debris before it can break down and pollute your water. It's the first line of defense in any filter.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
                    <li><strong>Sponge:</strong> Reusable, provides some biological filtration</li>
                    <li><strong>Filter floss:</strong> Fine particles, disposable</li>
                    <li><strong>Filter pads:</strong> Various densities, replace when clogged</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Biological Media</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Biological media provides surface area for beneficial bacteria to colonize. These bacteria are the engine of your nitrogen cycle.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
                    <li><strong>Ceramic rings:</strong> High surface area, long-lasting</li>
                    <li><strong>Bio-balls:</strong> Good water flow, easy to clean</li>
                    <li><strong>Lava rock:</strong> Natural option, rough surface for bacteria</li>
                    <li><strong>Sponge:</strong> Dual mechanical and biological function</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Chemical Media</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Chemical media absorbs or reacts with dissolved substances in the water. Use based on specific needs.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
                    <li><strong>Activated carbon:</strong> Removes medications, tannins, odors</li>
                    <li><strong>Phosphate resin:</strong> Controls algae by removing phosphate</li>
                    <li><strong>Ammonia absorber:</strong> Emergency use for spikes</li>
                    <li><strong>Purigen:</strong> Reusable synthetic adsorbent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sizing Your Filter System */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Sizing Your Filter System
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Step 1: Calculate Tank Volume</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with the actual water volume, not the marketed tank size. A "100-liter" tank might only hold 90 liters once you account for substrate, rocks, and water level below the rim. Use our{" "}
                    <a href="/calculators/aquarium-volume-calculator" className="text-primary hover:underline">
                      Aquarium Volume Calculator
                    </a>{" "}
                    for accurate measurements.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Step 2: Multiply by Turnover Rate</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Take your tank volume and multiply by the turnover rate for your setup. For a 100-liter community tank at 5x turnover:
                  </p>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    100 L × 5 = 500 LPH minimum flow rate
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Step 3: Consider Fish Load</h3>
                  <p className="text-sm text-muted-foreground">
                    More fish means more waste. If your tank is heavily stocked, increase your target flow rate by 25-50%. Cichlids, goldfish, and large catfish produce significantly more waste than small tetras or rasboras.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Step 4: Account for Filter Media Displacement</h3>
                  <p className="text-sm text-muted-foreground">
                    Filter media takes up space inside the filter housing, reducing actual flow. Manufacturers rate filters with empty media chambers. Expect 10-20% reduction in real-world flow. This is why we recommend adding 20% headroom to your calculated minimum.
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium mb-1">Quick Sizing Formula</p>
                  <p className="text-sm text-muted-foreground">
                    Tank Volume (L) × Turnover Rate × 1.2 (headroom) = Recommended Filter Rating
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">How do I calculate what size filter I need?</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiply your tank's water volume by the turnover rate for your setup. A 200-liter community tank needs 4-6x turnover, so you're looking at 800-1200 LPH. Add 20% headroom to account for media displacement and filter aging. Our calculator above does this math for you.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Is more filtration better?</h3>
                  <p className="text-sm text-muted-foreground">
                    Within reason, yes. You can't really over-filter an aquarium. Higher flow means better water quality and more oxygen. The downsides are cost, noise, and strong current that some fish don't tolerate. If flow is too strong, use spray bars or lily pipes to diffuse it.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">What type of filter is best for my aquarium?</h3>
                  <p className="text-sm text-muted-foreground">
                    It depends on tank size and your goals. Hang-on-back filters work well for tanks up to 150 liters. Canister filters are best for 100-500 liter setups and offer the most media capacity. Sump filters are ideal for large tanks and reef setups. Sponge filters are great for breeding tanks and quarantine setups where gentle flow is needed.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">How often should I clean filter media?</h3>
                  <p className="text-sm text-muted-foreground">
                    Mechanical media (sponge, floss) should be rinsed or replaced monthly, or when flow noticeably decreases. Biological media should only be gently swished in old tank water during water changes – never under tap water, as chlorine kills beneficial bacteria. Chemical media like carbon should be replaced every 4-6 weeks.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Can I have too much filtration?</h3>
                  <p className="text-sm text-muted-foreground">
                    Not in terms of water quality, but excessive flow can stress fish that prefer calm water. Bettas, discus, and some catfish struggle in strong currents. If fish are being tossed around or hiding constantly, reduce flow or add decorations to break up current. You can also aim filter outputs at the tank wall to diffuse flow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Related Tools
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/calculators/aquarium-volume-calculator"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block"
                >
                  <p className="font-medium text-sm mb-1">Aquarium Volume Calculator</p>
                  <p className="text-xs text-muted-foreground">
                    Calculate tank volume from dimensions
                  </p>
                </a>
                <a
                  href="/calculators/aquarium-co-calculator"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block"
                >
                  <p className="font-medium text-sm mb-1">Aquarium CO2 Calculator</p>
                  <p className="text-xs text-muted-foreground">
                    Optimize CO2 levels for planted tanks
                  </p>
                </a>
                <a
                  href="/calculators/water-flow-rate-calculator"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block"
                >
                  <p className="font-medium text-sm mb-1">Water Flow Rate Calculator</p>
                  <p className="text-xs text-muted-foreground">
                    Calculate flow rates for plumbing
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
