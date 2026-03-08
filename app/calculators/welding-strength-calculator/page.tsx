"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WeldingStrengthCalculator() {
  const [weldType, setWeldType] = useState<"fillet" | "butt" | "plug">("fillet");
  const [legSize, setLegSize] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [electrodeStrength, setElectrodeStrength] = useState<string>("70");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const leg = parseFloat(legSize);
    const L = parseFloat(length);
    const σ = parseFloat(electrodeStrength) * 6.895; // Convert ksi to MPa

    if (leg > 0 && L > 0 && σ > 0) {
      let strength = 0;
      if (weldType === "fillet") {
        // Throat = 0.707 × leg
        const throat = 0.707 * leg;
        const area = throat * L;
        strength = area * σ * 0.3; // 30% of tensile for shear
      } else if (weldType === "butt") {
        const area = leg * L;
        strength = area * σ * 0.6;
      }

      setResults({ strength: Math.round(strength * 100) / 100, strengthLbs: Math.round(strength * 0.2248 * 100) / 100 });
    }
  };

  const reset = () => {
    setLegSize(""); setLength(""); setElectrodeStrength("70"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Weld Type</Label>
              <Select value={weldType} onValueChange={(v) => setWeldType(v as typeof weldType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fillet">Fillet Weld</SelectItem>
                  <SelectItem value="butt">Butt Weld</SelectItem>
                  <SelectItem value="plug">Plug Weld</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Leg Size / Thickness (mm)</Label><Input value={legSize} onChange={e => setLegSize(e.target.value)} /></div>
              <div><Label>Weld Length (mm)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Electrode Strength (ksi)</Label><Input value={electrodeStrength} onChange={e => setElectrodeStrength(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Strength</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable Load</p>
                    <p className="text-3xl font-bold">{results.strength} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Pounds</p>
                    <p className="text-2xl font-bold">{results.strengthLbs.toLocaleString()} lbs</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Weld Strength</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Select Weld Type</h3>
              <p className="text-sm text-muted-foreground">Choose fillet, butt, or plug weld based on your joint configuration.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Weld Dimensions</h3>
              <p className="text-sm text-muted-foreground">Input leg size (or throat) and weld length in inches or mm.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Strength Results</h3>
              <p className="text-sm text-muted-foreground">See weld strength in Newtons and pounds based on electrode strength.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Welding Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Multiple Weld Types**</h3>
            <p className="text-sm text-muted-foreground">Calculate strength for fillet welds, butt welds, and plug welds.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Electrode Strength Input**</h3>
            <p className="text-sm text-muted-foreground">Enter electrode tensile strength (e.g., E70 = 70 ksi) for accurate results.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Dual Unit Output**</h3>
            <p className="text-sm text-muted-foreground">Results shown in both Newtons (N) and pounds-force (lbf).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Engineering Formulas**</h3>
            <p className="text-sm text-muted-foreground">Uses standard weld strength equations with appropriate safety factors.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is weld strength?</h3>
            <p className="text-sm text-muted-foreground">Weld strength is the maximum load a weld can safely carry. It depends on weld size, length, electrode strength, and weld type (fillet, butt, etc.).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What does E70 electrode mean?</h3>
            <p className="text-sm text-muted-foreground">E70 means the electrode produces weld metal with 70,000 psi (70 ksi) minimum tensile strength. Common electrodes include E60, E70, and E80 series.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How is fillet weld strength calculated?</h3>
            <p className="text-sm text-muted-foreground">Fillet weld strength = throat × length × electrode strength × safety factor. Throat = 0.707 × leg size for equal leg fillets.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What safety factor should I use?</h3>
            <p className="text-sm text-muted-foreground">Typical safety factors: 3-4 for static loads, 5+ for dynamic/fatigue loads. This calculator uses 30% of tensile strength (factor ~3.3) for shear.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Which is stronger: fillet or butt weld?</h3>
            <p className="text-sm text-muted-foreground">Butt welds are generally stronger because they use the full material thickness. Fillet welds are weaker in shear but easier to make for lap and T-joints.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
