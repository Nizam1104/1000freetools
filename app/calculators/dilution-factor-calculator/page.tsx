"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FlaskConical, Droplets } from "lucide-react";

interface DilutionResult {
  dilutionFactor: number;
  ratio: string;
  finalConcentration: number;
  volumeNeeded: number;
  unit: string;
}

export default function DilutionFactorCalculatorPage() {
  const [initialConcentration, setInitialConcentration] = useState<string>("");
  const [finalConcentration, setFinalConcentration] = useState<string>("");
  const [finalVolume, setFinalVolume] = useState<string>("");
  const [concentrationUnit, setConcentrationUnit] = useState<"M" | "mM" | "μM" | "%" | "mg/mL">("M");
  const [volumeUnit, setVolumeUnit] = useState<"L" | "mL" | "μL">("mL");
  const [result, setResult] = useState<DilutionResult | null>(null);

  const calculateDilution = () => {
    const C1 = parseFloat(initialConcentration);
    const C2 = parseFloat(finalConcentration);
    const V2 = parseFloat(finalVolume);

    if (isNaN(C1) || isNaN(C2) || isNaN(V2) || C1 <= 0 || C2 <= 0 || V2 <= 0) {
      setResult(null);
      return;
    }

    if (C2 >= C1) {
      setResult(null);
      return;
    }

    const dilutionFactor = C1 / C2;
    const V1 = (C2 * V2) / C1;
    const ratio = `1:${Math.round(dilutionFactor)}`;

    setResult({
      dilutionFactor: Math.round(dilutionFactor * 100) / 100,
      ratio,
      finalConcentration: C2,
      volumeNeeded: Math.round(V1 * 1000) / 1000,
      unit: concentrationUnit,
    });
  };

  const reset = () => {
    setInitialConcentration("");
    setFinalConcentration("");
    setFinalVolume("");
    setResult(null);
  };

  useEffect(() => {
    calculateDilution();
  }, [initialConcentration, finalConcentration, finalVolume, concentrationUnit, volumeUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dilution Factor Calculator – Calculate Solution Dilution Ratios</h1>
          <p className="text-muted-foreground">
            Calculate dilution factors and volumes needed for preparing solutions. Essential for laboratory work, chemistry experiments, and preparing reagents with the C1V1 = C2V2 formula.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Solution Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialConcentration">Initial Concentration (C1)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="initialConcentration"
                        type="number"
                        placeholder="e.g., 1"
                        value={initialConcentration}
                        onChange={(e) => setInitialConcentration(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={concentrationUnit}
                        onChange={(e) => setConcentrationUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="M">M</option>
                        <option value="mM">mM</option>
                        <option value="μM">μM</option>
                        <option value="%">%</option>
                        <option value="mg/mL">mg/mL</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalConcentration">Final Concentration (C2)</Label>
                    <Input
                      id="finalConcentration"
                      type="number"
                      placeholder="e.g., 0.1"
                      value={finalConcentration}
                      onChange={(e) => setFinalConcentration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalVolume">Final Volume (V2)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="finalVolume"
                        type="number"
                        placeholder="e.g., 100"
                        value={finalVolume}
                        onChange={(e) => setFinalVolume(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={volumeUnit}
                        onChange={(e) => setVolumeUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="L">L</option>
                        <option value="mL">mL</option>
                        <option value="μL">μL</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Uses C1V1 = C2V2 formula. Stock solution must be more concentrated than final solution.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDilution} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Dilution Factor</p>
                    <p className="text-3xl font-bold text-primary">{result.ratio}</p>
                    <p className="text-sm text-muted-foreground">({result.dilutionFactor}-fold dilution)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Stock Volume (V1)</p>
                      <p className="text-lg font-semibold">{result.volumeNeeded} {volumeUnit}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Diluent Volume</p>
                      <p className="text-lg font-semibold">{(parseFloat(finalVolume) - result.volumeNeeded).toFixed(2)} {volumeUnit}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Final Concentration</p>
                    <p className="text-lg font-semibold">{result.finalConcentration} {result.unit}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> C1V1 = C2V2</p>
                    <p className="mt-1">C1=initial concentration, V1=stock volume, C2=final concentration, V2=final volume</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter concentrations and volume to calculate dilution</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Common Dilution Examples</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Serial Dilutions:
                </h4>
                <ul className="space-y-1">
                  <li>1:10 dilution = 1 part stock + 9 parts diluent</li>
                  <li>1:100 dilution = 1 part stock + 99 parts diluent</li>
                  <li>1:1000 dilution = 1 part stock + 999 parts diluent</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Lab Tips:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always add stock to diluent, not vice versa</li>
                  <li>Mix thoroughly after each dilution</li>
                  <li>Use calibrated pipettes for accuracy</li>
                  <li>Label all diluted solutions clearly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Dilutions</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Know Stock Concentration</h3>
                <p className="text-sm text-muted-foreground">Start with the concentration of your stock solution (C1).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Set Target Concentration</h3>
                <p className="text-sm text-muted-foreground">Define the desired final concentration (C2).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Choose Final Volume</h3>
                <p className="text-sm text-muted-foreground">Decide how much final solution you need (V2).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Calculate Stock Volume</h3>
                <p className="text-sm text-muted-foreground">Calculator determines volume of stock needed (V1).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  C1V1 = C2V2 Formula
                </h3>
                <p className="text-sm text-muted-foreground">Standard dilution equation used in laboratories worldwide.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Concentration Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for M, mM, μM, percentage, and mg/mL units.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Diluent Volume
                </h3>
                <p className="text-sm text-muted-foreground">Shows how much diluent to add for complete preparation.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Dilution Ratio
                </h3>
                <p className="text-sm text-muted-foreground">Expresses dilution as easy-to-understand 1:X ratio format.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the dilution factor?</h3>
                <p className="text-sm text-muted-foreground">Dilution factor is the ratio of initial to final concentration. A 1:10 dilution factor means the stock is 10 times more concentrated than the final solution.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I make a 1:100 dilution?</h3>
                <p className="text-sm text-muted-foreground">Mix 1 part stock solution with 99 parts diluent. For 100 mL total, add 1 mL stock to 99 mL diluent.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is C1V1 = C2V2?</h3>
                <p className="text-sm text-muted-foreground">This equation states that initial concentration times initial volume equals final concentration times final volume. It's the foundation of all dilution calculations.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I dilute to a higher concentration?</h3>
                <p className="text-sm text-muted-foreground">No, dilution always reduces concentration. To increase concentration, you need to add more solute or evaporate solvent, not dilute.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I do serial dilutions?</h3>
                <p className="text-sm text-muted-foreground">Perform multiple sequential dilutions. For example, three 1:10 dilutions in series give a final 1:1000 dilution (10 × 10 × 10).</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
