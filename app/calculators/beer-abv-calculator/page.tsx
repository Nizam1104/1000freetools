"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function BeerABVCalculatorPage() {
  const [og, setOg] = useState<string>("");
  const [fg, setFg] = useState<string>("");
  const [result, setResult] = useState<{
    abv: number;
    abw: number;
    style: string;
  } | null>(null);

  const calculate = () => {
    const originalGravity = parseFloat(og);
    const finalGravity = parseFloat(fg);
    
    if (isNaN(originalGravity) || isNaN(finalGravity)) return;
    if (originalGravity < 1 || finalGravity < 1 || finalGravity >= originalGravity) return;

    // ABV = (OG - FG) * 131.25 (standard formula)
    const abv = (originalGravity - finalGravity) * 131.25;
    
    // ABW (Alcohol By Weight) = ABV * 0.789
    const abw = abv * 0.789;

    // Determine beer style based on ABV
    let style: string;
    if (abv < 3.5) style = "Light Beer / Session Beer";
    else if (abv < 5) style = "Pale Lager / Wheat Beer";
    else if (abv < 6.5) style = "IPA / Amber Ale";
    else if (abv < 8) style = "Strong IPA / Belgian Ale";
    else if (abv < 10) style = "Double IPA / Barleywine";
    else style = "Imperial Stout / Extreme Beer";

    setResult({
      abv: Math.round(abv * 100) / 100,
      abw: Math.round(abw * 100) / 100,
      style
    });
  };

  const reset = () => {
    setOg("");
    setFg("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew</h1>
          <p className="text-muted-foreground">
            Know exactly how strong your home brew is with our Beer ABV Calculator. Enter your original gravity (OG) and final gravity (FG) readings to calculate the alcohol by volume percentage of your beer — an essential tool for home brewers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og">Original Gravity (OG)</Label>
                <Input 
                  id="og" 
                  type="number" 
                  step="0.001"
                  placeholder="e.g., 1.050" 
                  value={og} 
                  onChange={(e) => setOg(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Typical range: 1.030 - 1.120</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fg">Final Gravity (FG)</Label>
                <Input 
                  id="fg" 
                  type="number" 
                  step="0.001"
                  placeholder="e.g., 1.010" 
                  value={fg} 
                  onChange={(e) => setFg(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Typical range: 1.000 - 1.030</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate ABV
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
                    <p className="text-sm text-muted-foreground">Alcohol by Volume (ABV)</p>
                    <p className="text-3xl font-bold text-primary">{result.abv}%</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Alcohol by Weight (ABW)</p>
                      <p className="text-lg font-semibold">{result.abw}%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Beer Style</p>
                      <p className="text-sm font-semibold">{result.style}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Brewing Tip:</p>
                    <p className="text-sm">For accurate readings, ensure your hydrometer is calibrated and take readings at the recommended temperature (usually 60°F/15.5°C).</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter OG and FG values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use This Beer ABV Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Take your original gravity reading</p>
                <p className="text-sm text-muted-foreground">Measure the specific gravity before fermentation begins. This is your OG. Typical values range from 1.030 for light beers to 1.100+ for strong styles.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Take your final gravity reading</p>
                <p className="text-sm text-muted-foreground">Measure again after fermentation completes. This is your FG. Most beers finish between 1.000 and 1.020. Ensure fermentation is truly complete before measuring.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Enter values and calculate</p>
                <p className="text-sm text-muted-foreground">Input both readings and click Calculate. Get your alcohol by volume percentage, alcohol by weight, and estimated beer style classification.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beer Style ABV Ranges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Beer Style</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical ABV Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical OG</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical FG</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Light Lager</td>
                    <td className="py-3 px-2">3.5-4.5%</td>
                    <td className="py-3 px-2">1.030-1.045</td>
                    <td className="py-3 px-2">1.002-1.010</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Pilsner</td>
                    <td className="py-3 px-2">4.5-5.5%</td>
                    <td className="py-3 px-2">1.045-1.055</td>
                    <td className="py-3 px-2">1.008-1.015</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Pale Ale</td>
                    <td className="py-3 px-2">5.0-6.0%</td>
                    <td className="py-3 px-2">1.050-1.060</td>
                    <td className="py-3 px-2">1.010-1.016</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">IPA</td>
                    <td className="py-3 px-2">6.0-7.5%</td>
                    <td className="py-3 px-2">1.060-1.075</td>
                    <td className="py-3 px-2">1.010-1.018</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Stout/Porter</td>
                    <td className="py-3 px-2">5.0-7.0%</td>
                    <td className="py-3 px-2">1.050-1.070</td>
                    <td className="py-3 px-2">1.012-1.020</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Belgian Tripel</td>
                    <td className="py-3 px-2">8.0-10.0%</td>
                    <td className="py-3 px-2">1.080-1.100</td>
                    <td className="py-3 px-2">1.010-1.018</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Imperial Stout</td>
                    <td className="py-3 px-2">9.0-12.0%</td>
                    <td className="py-3 px-2">1.090-1.120</td>
                    <td className="py-3 px-2">1.018-1.030</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These are general guidelines. Craft brewers often push style boundaries. Session IPAs and hazy IPAs may fall outside traditional ranges.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding ABV Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">How ABV Is Calculated</h4>
              <p>
                The standard formula is ABV = (OG - FG) × 131.25. This works because alcohol is less dense than water. As yeast converts sugar to alcohol, the specific gravity drops. The difference between original and final gravity tells you how much sugar was converted, which tells you how much alcohol was produced.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Original Gravity (OG)</h4>
              <p>
                OG measures the density of wort before fermentation. It reflects the amount of dissolved sugars from your grains. Higher OG means more fermentable material and potentially higher alcohol. OG is affected by grain bill, mash efficiency, and boil concentration.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Final Gravity (FG)</h4>
              <p>
                FG measures the density after fermentation completes. It includes unfermentable sugars, proteins, and other dissolved solids. Lower FG means more complete fermentation. FG depends on yeast strain, fermentation temperature, and the proportion of unfermentable sugars in your wort.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">ABV vs ABW</h4>
              <p>
                ABV (alcohol by volume) is the standard measurement in most countries. ABW (alcohol by weight) is used in some US states for labeling. ABW is always lower than ABV because alcohol weighs less than water. The conversion is ABW = ABV × 0.789.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Accurate ABV Measurements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Calibrate your hydrometer</p>
                <p>Test your hydrometer in distilled water at the calibration temperature (usually 60°F). It should read exactly 1.000. If not, note the offset and adjust your readings accordingly.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Temperature correct your readings</p>
                <p>Hydrometers are calibrated for a specific temperature. If your sample is warmer or cooler, the reading will be off. Use a temperature correction calculator or bring samples to calibration temperature.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Confirm fermentation is complete</p>
                <p>Take FG readings on consecutive days. If the reading is stable, fermentation is done. Bottling before fermentation completes risks over-carbonation or bottle bombs.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Avoid bubbles on your sample</p>
                <p>CO2 bubbles can make your hydrometer float higher, giving a falsely high reading. Degas your sample by gently swirling or pouring between containers before measuring FG.</p>
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
    question: "What is a good ABV for homebrew beer?",
    answer: "Most homebrewers target 5-7% ABV for standard ales and lagers. This range is approachable for most drinkers and manageable for yeast. Session beers run 3-4%, while strong ales and barleywines can reach 10% or higher.",
  },
{
    question: "Why is my ABV lower than expected?",
    answer: "Common causes include low mash temperature (producing more unfermentable sugars), poor yeast health, fermentation temperature too low, or inaccurate gravity readings. Check your thermometer calibration and ensure healthy yeast pitching.",
  },
{
    question: "Can ABV be too high for yeast?",
    answer: "Yes. Most ale yeasts struggle above 10-12% ABV. Wine yeasts or champagne yeasts handle higher alcohol. For strong beers, consider step feeding (adding sugar gradually) or blending with high-gravity distillates after fermentation.",
  },
{
    question: "Do I need to temperature-correct my gravity readings?",
    answer: "Yes, if your sample temperature differs significantly from the hydrometer's calibration temperature. A 20°F difference can cause a 0.002-0.003 error, which translates to 0.3-0.4% ABV error. For precise measurements, correction matters.",
  },
{
    question: "What's the difference between ABV and proof?",
    answer: "Proof is simply twice the ABV in the US system. A 5% ABV beer is 10 proof. The term comes from historical gunpowder tests for alcohol content. Most countries now use ABV exclusively for labeling.",
  }
  ]} />
</section>
      </div>
    </div>
  );
}
