"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FertilizerRequirementCalculatorPage() {
  const [cropType, setCropType] = useState<string>("wheat");
  const [fieldArea, setFieldArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"acre" | "hectare">("acre");
  const [soilN, setSoilN] = useState<string>("");
  const [soilP, setSoilP] = useState<string>("");
  const [soilK, setSoilK] = useState<string>("");
  const [fertilizerType, setFertilizerType] = useState<string>("urea");
  const [result, setResult] = useState<{
    nRequired: number;
    pRequired: number;
    kRequired: number;
    fertilizerAmount: number;
    npkRatio: string;
  } | null>(null);

  // NPK requirements per hectare for different crops (kg/ha)
  const cropNutrientRequirements: Record<string, { n: number; p: number; k: number }> = {
    wheat: { n: 120, p: 60, k: 40 },
    rice: { n: 100, p: 50, k: 40 },
    corn: { n: 180, p: 80, k: 100 },
    soybean: { n: 40, p: 80, k: 80 },
    cotton: { n: 150, p: 70, k: 80 },
    tomato: { n: 200, p: 100, k: 150 },
    potato: { n: 150, p: 100, k: 200 },
    sugarcane: { n: 250, p: 100, k: 150 },
    banana: { n: 300, p: 100, k: 400 },
    vegetables: { n: 150, p: 80, k: 100 },
  };

  // Fertilizer compositions (N-P-K percentages)
  const fertilizerComposition: Record<string, { n: number; p: number; k: number; name: string }> = {
    urea: { n: 46, p: 0, k: 0, name: "Urea (46-0-0)" },
    dap: { n: 18, p: 46, k: 0, name: "DAP (18-46-0)" },
    npk151515: { n: 15, p: 15, k: 15, name: "NPK 15-15-15" },
    npk191919: { n: 19, p: 19, k: 19, name: "NPK 19-19-19" },
    npk102626: { n: 10, p: 26, k: 26, name: "NPK 10-26-26" },
    mop: { n: 0, p: 0, k: 60, name: "MOP - Muriate of Potash (0-0-60)" },
    ssp: { n: 0, p: 16, k: 0, name: "SSP - Single Super Phosphate (0-16-0)" },
    ammonium_sulfate: { n: 21, p: 0, k: 0, name: "Ammonium Sulfate (21-0-0)" },
  };

  const calculate = () => {
    const area = parseFloat(fieldArea);
    const soilNitrogen = parseFloat(soilN) || 0;
    const soilPhosphorus = parseFloat(soilP) || 0;
    const soilPotassium = parseFloat(soilK) || 0;

    if (isNaN(area) || area <= 0) return;

    // Convert area to hectares
    let areaInHectares = area;
    if (areaUnit === "acre") {
      areaInHectares = area * 0.404686;
    }

    // Get crop nutrient requirements
    const cropReq = cropNutrientRequirements[cropType];

    // Calculate net nutrient requirement (crop need - soil available)
    const nRequired = Math.max(0, cropReq.n - soilNitrogen);
    const pRequired = Math.max(0, cropReq.p - soilPhosphorus);
    const kRequired = Math.max(0, cropReq.k - soilPotassium);

    // Get fertilizer composition
    const fert = fertilizerComposition[fertilizerType];

    // Calculate fertilizer amount needed based on primary nutrient
    let fertilizerAmount = 0;
    if (fert.n > 0 && nRequired > 0) {
      fertilizerAmount = (nRequired * areaInHectares) / (fert.n / 100);
    } else if (fert.p > 0 && pRequired > 0) {
      fertilizerAmount = (pRequired * areaInHectares) / (fert.p / 100);
    } else if (fert.k > 0 && kRequired > 0) {
      fertilizerAmount = (kRequired * areaInHectares) / (fert.k / 100);
    }

    setResult({
      nRequired: Math.round(nRequired * 100) / 100,
      pRequired: Math.round(pRequired * 100) / 100,
      kRequired: Math.round(kRequired * 100) / 100,
      fertilizerAmount: Math.round(fertilizerAmount * 100) / 100,
      npkRatio: `${fert.n}-${fert.p}-${fert.k}`,
    });
  };

  const reset = () => {
    setFieldArea("");
    setSoilN("");
    setSoilP("");
    setSoilK("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Fertilizer Requirement Calculator – Calculate NPK Fertilizer Dose Per Acre
          </h1>
          <p className="text-muted-foreground">
            Apply the right fertilizer at the right dose with our Fertilizer Requirement Calculator.
            Based on your soil test results and crop's NPK requirements, get precise fertilizer
            application rates to boost yield and reduce input costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice/Paddy</SelectItem>
                    <SelectItem value="corn">Corn/Maize</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="vegetables">Vegetables (General)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldArea">Field Area</Label>
                <div className="flex gap-2">
                  <Input
                    id="fieldArea"
                    type="number"
                    placeholder="e.g., 10"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as "acre" | "hectare")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acre">Acres</SelectItem>
                      <SelectItem value="hectare">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Soil Test Results (kg/ha)</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="soilN">Nitrogen (N)</Label>
                    <Input
                      id="soilN"
                      type="number"
                      placeholder="0"
                      value={soilN}
                      onChange={(e) => setSoilN(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilP">Phosphorus (P)</Label>
                    <Input
                      id="soilP"
                      type="number"
                      placeholder="0"
                      value={soilP}
                      onChange={(e) => setSoilP(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilK">Potassium (K)</Label>
                    <Input
                      id="soilK"
                      type="number"
                      placeholder="0"
                      value={soilK}
                      onChange={(e) => setSoilK(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                <Select value={fertilizerType} onValueChange={setFertilizerType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urea">Urea (46-0-0)</SelectItem>
                    <SelectItem value="dap">DAP (18-46-0)</SelectItem>
                    <SelectItem value="npk151515">NPK 15-15-15</SelectItem>
                    <SelectItem value="npk191919">NPK 19-19-19</SelectItem>
                    <SelectItem value="npk102626">NPK 10-26-26</SelectItem>
                    <SelectItem value="mop">MOP (0-0-60)</SelectItem>
                    <SelectItem value="ssp">SSP (0-16-0)</SelectItem>
                    <SelectItem value="ammonium_sulfate">Ammonium Sulfate (21-0-0)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Fertilizer Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Fertilizer Required</p>
                    <p className="text-3xl font-bold text-primary">{result.fertilizerAmount} kg</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({fertilizerComposition[fertilizerType].name})
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold mb-2">Nutrient Requirements (kg/ha)</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Nitrogen (N)</span>
                        <span className="font-bold">{result.nRequired} kg/ha</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Phosphorus (P)</span>
                        <span className="font-bold">{result.pRequired} kg/ha</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Potassium (K)</span>
                        <span className="font-bold">{result.kRequired} kg/ha</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Fertilizer NPK Ratio</p>
                    <p className="text-2xl font-bold">{result.npkRatio}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> Split nitrogen application for better uptake. Apply P
                      and K at planting, N in split doses.
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
          <h3 className="text-lg font-semibold mb-3">Fertilizer Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Net N Required = Crop N Need - Soil Available N</div>
            <div>Fertilizer Amount = (Net Nutrient × Area) ÷ (Nutrient % in Fertilizer / 100)</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Fertilizer</th>
                <th className="text-left py-2">N-P-K %</th>
                <th className="text-left py-2">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Urea</td>
                <td className="py-2">46-0-0</td>
                <td className="py-2">Nitrogen source</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">DAP</td>
                <td className="py-2">18-46-0</td>
                <td className="py-2">Phosphorus source</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">MOP</td>
                <td className="py-2">0-0-60</td>
                <td className="py-2">Potassium source</td>
              </tr>
              <tr>
                <td className="py-2">NPK 15-15-15</td>
                <td className="py-2">15-15-15</td>
                <td className="py-2">Balanced fertilizer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Fertilizer Requirements</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Select Your Crop</h3>
              <p className="text-sm text-muted-foreground">Choose your crop type to access specific NPK nutrient requirements based on agricultural research data.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Field Details</h3>
              <p className="text-sm text-muted-foreground">Input your field area and soil test results for nitrogen, phosphorus, and potassium levels.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Fertilizer Recommendations</h3>
              <p className="text-sm text-muted-foreground">Receive precise fertilizer amounts in kilograms based on your selected fertilizer type.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Fertilizer Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Crop-Specific NPK Requirements</h3>
            <p className="text-sm text-muted-foreground">Pre-loaded nutrient requirements for 10+ common crops including wheat, rice, corn, soybean, cotton, and vegetables.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Soil Test Integration</h3>
            <p className="text-sm text-muted-foreground">Subtracts existing soil nutrients from crop needs to prevent over-fertilization and save money.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Multiple Fertilizer Types</h3>
            <p className="text-sm text-muted-foreground">Supports urea, DAP, NPK blends, MOP, SSP, and ammonium sulfate with accurate N-P-K percentages.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Flexible Area Units</h3>
            <p className="text-sm text-muted-foreground">Calculate for acres or hectares with automatic conversion for global farming applications.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Common Fertilizer Types and NPK Values</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Fertilizer</th>
                <th className="text-left py-2">N-P-K %</th>
                <th className="text-left py-2">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Urea</td>
                <td className="py-2">46-0-0</td>
                <td className="py-2">Nitrogen source for leaf growth</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">DAP</td>
                <td className="py-2">18-46-0</td>
                <td className="py-2">Phosphorus for root development</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">MOP</td>
                <td className="py-2">0-0-60</td>
                <td className="py-2">Potassium for disease resistance</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">NPK 15-15-15</td>
                <td className="py-2">15-15-15</td>
                <td className="py-2">Balanced general purpose</td>
              </tr>
              <tr>
                <td className="py-2">SSP</td>
                <td className="py-2">0-16-0</td>
                <td className="py-2">Phosphorus with calcium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How do I calculate fertilizer dose per acre?</h3>
            <p className="text-sm text-muted-foreground">First, determine your crop&apos;s NPK requirement (e.g., wheat needs 120-60-40 kg/ha). Subtract soil test values, then divide by the fertilizer&apos;s nutrient percentage. For urea (46% N): (120 - soil N) / 0.46 = kg urea needed per hectare. Convert to acres by multiplying by 0.4047.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the NPK ratio and why does it matter?</h3>
            <p className="text-sm text-muted-foreground">NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) - the three primary nutrients plants need. Different crops require different ratios. Leafy crops need more nitrogen, root crops need more phosphorus, and fruiting crops need more potassium.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How much urea is needed for 1 acre of wheat?</h3>
            <p className="text-sm text-muted-foreground">Wheat typically needs 120 kg N per hectare (48.5 kg/acre). With urea at 46% nitrogen, you need about 105 kg urea per hectare or 42.5 kg per acre. Adjust based on your soil test results using this calculator.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I apply all fertilizer at once?</h3>
            <p className="text-sm text-muted-foreground">No. Nitrogen should be split into 2-3 applications (basal, tillering, flowering) to prevent leaching and improve uptake. Phosphorus and potassium are typically applied as basal dose before planting.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens if I use too much fertilizer?</h3>
            <p className="text-sm text-muted-foreground">Over-fertilization can burn plant roots, cause excessive vegetative growth with poor yields, contaminate groundwater, and waste money. Always base applications on soil tests and crop requirements.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Agriculture Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/seed-rate-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Seed Rate Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate the optimal seed quantity needed for your field area.</p>
          </a>
          <a href="/calculators/irrigation-water-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Irrigation Water Calculator</h3>
            <p className="text-sm text-muted-foreground">Determine water requirements for crop irrigation based on evapotranspiration.</p>
          </a>
          <a href="/calculators/crop-yield-estimator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Crop Yield Estimator</h3>
            <p className="text-sm text-muted-foreground">Estimate expected crop yield based on field conditions and inputs.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
