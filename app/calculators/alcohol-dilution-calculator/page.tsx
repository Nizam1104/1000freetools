"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DilutionResult {
  initialABV: number;
  initialVolume: number;
  targetABV: number;
  waterToAdd: number;
  finalVolume: number;
  alcoholContent: number;
  proofBefore: number;
  proofAfter: number;
  recommendations: string[];
}

export default function AlcoholDilutionCalculatorPage() {
  const [initialABV, setInitialABV] = useState<string>("");
  const [initialVolume, setInitialVolume] = useState<string>("");
  const [targetABV, setTargetABV] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("ml");
  const [result, setResult] = useState<DilutionResult | null>(null);

  const calculate = () => {
    const initialABVNum = parseFloat(initialABV) || 0;
    const initialVolumeNum = parseFloat(initialVolume) || 0;
    const targetABVNum = parseFloat(targetABV) || 0;

    if (initialABVNum === 0 || initialVolumeNum === 0 || targetABVNum === 0) return;
    if (targetABVNum >= initialABVNum) return; // Can't dilute to higher ABV

    // Pearson's Square / Alligation method
    // C1 × V1 = C2 × V2
    // Where C = concentration, V = volume

    // Alcohol content stays constant
    const alcoholContent = initialVolumeNum * (initialABVNum / 100);

    // Final volume needed for target ABV
    const finalVolume = alcoholContent / (targetABVNum / 100);

    // Water to add
    const waterToAdd = finalVolume - initialVolumeNum;

    // Proof (US)
    const proofBefore = initialABVNum * 2;
    const proofAfter = targetABVNum * 2;

    // Recommendations
    const recommendations: string[] = [];

    if (targetABVNum < 40) {
      recommendations.push("🥃 Diluting below 40% ABV may affect flavor preservation.");
    }
    if (targetABVNum >= 40 && targetABVNum <= 45) {
      recommendations.push("✅ 40-45% ABV is ideal for most spirits.");
    }
    if (targetABVNum > 50) {
      recommendations.push("🔥 High ABV - consider further dilution for tasting.");
    }

    recommendations.push(`💧 Add water gradually and taste as you go.`);
    recommendations.push(`🕐 Let the spirit rest for 24-48 hours after dilution.`);
    recommendations.push(`🧊 Use distilled water for best results.`);

    if (waterToAdd > initialVolumeNum * 0.5) {
      recommendations.push(`⚠️ Large dilution (>50%). Consider step-wise dilution.`);
    }

    setResult({
      initialABV: initialABVNum,
      initialVolume: initialVolumeNum,
      targetABV: targetABVNum,
      waterToAdd: parseFloat(waterToAdd.toFixed(1)),
      finalVolume: parseFloat(finalVolume.toFixed(1)),
      alcoholContent: parseFloat(alcoholContent.toFixed(1)),
      proofBefore,
      proofAfter,
      recommendations,
    });
  };

  const reset = () => {
    setInitialABV("");
    setInitialVolume("");
    setTargetABV("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Alcohol Dilution Calculator – Calculate Water to Add for Target ABV
          </h1>
          <p className="text-muted-foreground">
            Dilute spirits to your desired strength with our Alcohol Dilution Calculator.
            Enter starting ABV and volume along with your target ABV to calculate exactly
            how much water to add — perfect for home distillers and bartenders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="initial-abv">Initial ABV (%)</Label>
                  <Input
                    id="initial-abv"
                    type="number"
                    step="0.1"
                    value={initialABV}
                    onChange={(e) => setInitialABV(e.target.value)}
                    placeholder="e.g., 60"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="target-abv">Target ABV (%)</Label>
                  <Input
                    id="target-abv"
                    type="number"
                    step="0.1"
                    value={targetABV}
                    onChange={(e) => setTargetABV(e.target.value)}
                    placeholder="e.g., 40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="initial-volume">Initial Volume</Label>
                  <Input
                    id="initial-volume"
                    type="number"
                    value={initialVolume}
                    onChange={(e) => setInitialVolume(e.target.value)}
                    placeholder="e.g., 750"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="volume-unit">Unit</Label>
                  <select
                    id="volume-unit"
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="ml">ml</option>
                    <option value="liters">Liters</option>
                    <option value="oz">fl oz</option>
                    <option value="gallons">Gallons</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Bottling Strengths:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 40% ABV (80 proof) - Standard</li>
                  <li>• 43% ABV (86 proof) - Premium</li>
                  <li>• 46% ABV (92 proof) - Cask strength entry</li>
                  <li>• 50% ABV (100 proof) - Bottled in bond</li>
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
              <h3 className="text-lg font-semibold mb-4">Dilution Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Water to Add</p>
                    <p className="text-4xl font-bold text-primary">{result.waterToAdd} {volumeUnit}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      to reach {result.targetABV}% ABV
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Initial</p>
                      <p className="text-lg font-semibold">{result.initialABV}% ABV</p>
                      <p className="text-xs text-muted-foreground">{result.proofBefore} proof</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Final</p>
                      <p className="text-lg font-semibold">{result.targetABV}% ABV</p>
                      <p className="text-xs text-muted-foreground">{result.proofAfter} proof</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Initial Volume:</span>
                      <span className="font-semibold">{result.initialVolume} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Water Added:</span>
                      <span className="font-semibold">{result.waterToAdd} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Final Volume:</span>
                      <span className="font-semibold">{result.finalVolume} {volumeUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pure Alcohol:</span>
                      <span className="font-semibold">{result.alcoholContent} {volumeUnit}</span>
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

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> V₁ × C₁ = V₂ × C₂
                      <br />
                      (Initial Volume × Initial ABV = Final Volume × Target ABV)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dilution details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dilution Tips for Spirits
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Water quality:</strong> Use distilled or spring water.
                    Tap water can add off-flavors.
                  </li>
                  <li>
                    <strong>Temperature:</strong> Dilute at room temperature for
                    accurate measurements.
                  </li>
                  <li>
                    <strong>Resting:</strong> Let diluted spirits rest 24-48 hours
                    for flavors to integrate.
                  </li>
                  <li>
                    <strong>Step dilution:</strong> For large dilutions, add water
                    in stages for better mixing.
                  </li>
                  <li>
                    <strong>Taste testing:</strong> Dilute slightly less than calculated,
                    taste, then add more if needed.
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Dilution can &quot;open up&quot; spirits, releasing
                  aromas and flavors that are masked at higher ABV. Many whiskies benefit
                  from a few drops of water even after bottling.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO Content Sections */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How to Use This Alcohol Dilution Calculator</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <p className="font-medium text-foreground">Enter your starting measurements</p>
                    <p className="text-sm">Input the initial ABV (alcohol by volume) of your spirit and the volume you have. Select your volume unit (ml, liters, fl oz, or gallons).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <p className="font-medium text-foreground">Set your target ABV</p>
                    <p className="text-sm">Enter the ABV percentage you want to reach. Common bottling strengths are 40% for standard spirits, 43-46% for premium expressions, and 50% for bottled-in-bond.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and follow the results</p>
                    <p className="text-sm">Click Calculate to see exactly how much water to add. The calculator also shows your final volume, proof before and after, and provides recommendations based on your target strength.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Understanding Alcohol Dilution</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What Is Dilution?</h3>
                  <p className="text-sm">
                    Dilution means reducing the alcohol concentration (ABV) of a spirit by adding water. When you add water to high-proof alcohol, the total volume increases while the amount of pure alcohol stays the same, resulting in a lower percentage of alcohol by volume.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Dilution Formula</h3>
                  <p className="text-sm mb-2">
                    Alcohol dilution follows the basic concentration formula:
                  </p>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm text-center">
                    C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub>
                  </div>
                  <p className="text-sm mt-2">
                    Where C<sub>1</sub> is the initial concentration (ABV), V<sub>1</sub> is the initial volume, C<sub>2</sub> is the target concentration, and V<sub>2</sub> is the final volume. To find how much water to add, calculate V<sub>2</sub> and subtract V<sub>1</sub>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why Dilute Alcohol?</h3>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-foreground">Taste:</strong> High ABV can overwhelm your palate. Dilution opens up flavors and aromas that are masked at higher strengths.</li>
                    <li><strong className="text-foreground">Safety:</strong> Drinking spirits at very high ABV (above 60%) can be harsh and potentially harmful.</li>
                    <li><strong className="text-foreground">Regulations:</strong> Most countries require bottled spirits to be between 37.5% and 50% ABV for legal sale.</li>
                    <li><strong className="text-foreground">Consistency:</strong> Dilution allows producers to maintain consistent ABV across batches.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Proof vs ABV</h3>
                  <p className="text-sm">
                    In the United States, proof is simply twice the ABV percentage. So 40% ABV equals 80 proof, 50% ABV equals 100 proof, and so on. The term comes from historical methods of testing alcohol content. In the UK, proof was historically calculated differently (about 1.75 times ABV), but they now use ABV exclusively.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Common Alcohol Dilution Scenarios</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Scenario</th>
                      <th className="text-left py-2 px-3 font-semibold">Starting ABV</th>
                      <th className="text-left py-2 px-3 font-semibold">Target ABV</th>
                      <th className="text-left py-2 px-3 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium text-foreground">Moonshine</td>
                      <td className="py-2 px-3">80%</td>
                      <td className="py-2 px-3">40%</td>
                      <td className="py-2 px-3">Typical drinking strength</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium text-foreground">Home Distilling</td>
                      <td className="py-2 px-3">95%</td>
                      <td className="py-2 px-3">40-50%</td>
                      <td className="py-2 px-3">Standard bottling strength</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium text-foreground">Tinctures</td>
                      <td className="py-2 px-3">95%</td>
                      <td className="py-2 px-3">60-70%</td>
                      <td className="py-2 px-3">Optimal extraction strength</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-foreground">Cocktails</td>
                      <td className="py-2 px-3">40%</td>
                      <td className="py-2 px-3">10-15%</td>
                      <td className="py-2 px-3">After mixing with other ingredients</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Dilution Water Calculation Examples</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Example 1: Diluting Moonshine</p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Starting:</strong> 1 liter at 80% ABV<br />
                    <strong className="text-foreground">Target:</strong> 40% ABV<br />
                    <strong className="text-foreground">Calculation:</strong> (1L × 80%) ÷ 40% = 2L final volume<br />
                    <strong className="text-foreground">Water to add:</strong> 2L - 1L = <span className="text-primary font-semibold">1 liter of water</span>
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Example 2: Home Distilling</p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Starting:</strong> 500ml at 95% ABV<br />
                    <strong className="text-foreground">Target:</strong> 50% ABV<br />
                    <strong className="text-foreground">Calculation:</strong> (500ml × 95%) ÷ 50% = 950ml final volume<br />
                    <strong className="text-foreground">Water to add:</strong> 950ml - 500ml = <span className="text-primary font-semibold">450ml of water</span>
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Example 3: Adjusting Whiskey</p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Starting:</strong> 750ml at 60% ABV<br />
                    <strong className="text-foreground">Target:</strong> 40% ABV<br />
                    <strong className="text-foreground">Calculation:</strong> (750ml × 60%) ÷ 40% = 1125ml final volume<br />
                    <strong className="text-foreground">Water to add:</strong> 1125ml - 750ml = <span className="text-primary font-semibold">375ml of water</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Important Dilution Tips</h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">1</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Use distilled or reverse osmosis water</p>
                    <p className="text-xs">Tap water contains minerals and chlorine that can affect flavor. Distilled or RO water is neutral and won't introduce off-flavors to your spirit.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">2</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Add alcohol to water, not water to alcohol</p>
                    <p className="text-xs">This is a safety and mixing best practice. Adding alcohol to water helps prevent localized high-concentration zones and promotes better mixing.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">3</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Let diluted spirits rest before bottling</p>
                    <p className="text-xs">After dilution, give your spirit 24-48 hours to rest. This allows the water and alcohol to fully integrate and flavors to stabilize.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">4</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Temperature affects final volume</p>
                    <p className="text-xs">Alcohol and water expand and contract at different rates with temperature changes. For precise measurements, dilute at room temperature (around 20°C / 68°F).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">5</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Watch for louche (cloudiness)</p>
                    <p className="text-xs">Some spirits, especially those with botanical oils like absinthe or gin, may turn cloudy when diluted. This is normal and called the louche effect.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do I calculate how much water to add?</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the formula: Water to add = (Initial Volume × Initial ABV ÷ Target ABV) - Initial Volume. For example, to dilute 1 liter of 60% ABV to 40%: (1000ml × 60 ÷ 40) - 1000ml = 500ml of water. Or simply use this calculator to do the math for you.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">What kind of water should I use for dilution?</h3>
                  <p className="text-sm text-muted-foreground">
                    Distilled water or reverse osmosis (RO) water is best. These have no minerals, chlorine, or other compounds that could affect the taste of your spirit. Avoid tap water and most bottled spring waters, as their mineral content can introduce off-flavors or cause cloudiness.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I dilute any type of alcohol?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can dilute any distilled spirit - whiskey, vodka, rum, gin, moonshine, neutral spirits, and more. However, some aged spirits may benefit from gradual dilution and resting to allow flavors to re-integrate. Flavored spirits and liqueurs may behave differently due to added sugars and flavorings.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Does diluting alcohol reduce the total alcohol content?</h3>
                  <p className="text-sm text-muted-foreground">
                    No. Dilution reduces the concentration (percentage) of alcohol, but the total amount of pure alcohol stays the same. If you dilute 1 liter of 50% ABV spirit to 40% ABV, you still have 500ml of pure alcohol - it's just spread across a larger total volume (1.25 liters instead of 1 liter).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why does my diluted spirit look cloudy?</h3>
                  <p className="text-sm text-muted-foreground">
                    Cloudiness after dilution is called &quot;louche&quot; or &quot;ouzo effect.&quot; It happens when certain compounds (like essential oils from botanicals or fatty acids from grains) that are soluble in high-proof alcohol become insoluble at lower ABV. It's harmless and common with gin, absinthe, ouzo, and some whiskies. Filtering through a coffee filter can remove cloudiness if desired.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
              <div className="space-y-2">
                <a href="/calculators/dilution-calculator" className="block p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                  <p className="font-medium text-foreground text-sm">Dilution Calculator</p>
                  <p className="text-xs text-muted-foreground">General-purpose dilution calculator for any solution</p>
                </a>
                <a href="/calculators/dilution-factor-calculator" className="block p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                  <p className="font-medium text-foreground text-sm">Dilution Factor Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate dilution factors and serial dilutions</p>
                </a>
                <a href="/calculators/beer-abv-calculator" className="block p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                  <p className="font-medium text-foreground text-sm">Beer ABV Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate alcohol content in homemade beer</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
