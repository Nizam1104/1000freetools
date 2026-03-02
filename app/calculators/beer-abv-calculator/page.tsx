"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      </div>
    </div>
  );
}
