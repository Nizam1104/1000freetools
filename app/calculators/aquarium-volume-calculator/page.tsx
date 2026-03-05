"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fish, Info, Droplets, Ruler } from "lucide-react";

interface AquariumResult {
  volumeGallons: number;
  volumeLiters: number;
  surfaceArea: number;
  fishCapacity: string;
  waterWeight: number;
}

export default function AquariumVolumeCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [waterLevel, setWaterLevel] = useState<string>("");
  const [unit, setUnit] = useState<"inches" | "cm">("inches");
  const [shape, setShape] = useState<"rectangular" | "cylinder">("rectangular");
  const [diameter, setDiameter] = useState<string>("");
  const [result, setResult] = useState<AquariumResult | null>(null);

  const calculateVolume = () => {
    let len = parseFloat(length);
    let wid = parseFloat(width);
    let hgt = parseFloat(height);
    let water = parseFloat(waterLevel) || hgt;
    let dia = parseFloat(diameter);

    if (isNaN(len) || isNaN(wid) || isNaN(hgt)) return;

    let volumeCubicInches: number;
    let surfaceAreaSqInches: number;

    if (shape === "cylinder") {
      if (isNaN(dia)) return;
      const radius = dia / 2;
      volumeCubicInches = Math.PI * radius * radius * water;
      surfaceAreaSqInches = Math.PI * radius * radius;
    } else {
      volumeCubicInches = len * wid * water;
      surfaceAreaSqInches = len * wid;
    }

    if (unit === "cm") {
      volumeCubicInches *= 0.0610237;
      surfaceAreaSqInches *= 0.155;
    }

    const volumeGallons = volumeCubicInches * 0.00372094;
    const volumeLiters = volumeGallons * 3.78541;
    const waterWeight = volumeGallons * 8.34;

    let fishCapacity: string;
    const inchesOfFish = volumeGallons;
    if (inchesOfFish < 5) {
      fishCapacity = "Too small for fish (consider betta or shrimp)";
    } else if (inchesOfFish < 20) {
      fishCapacity = `${Math.round(inchesOfFish)} inches of small fish (e.g., neon tetras)`;
    } else if (inchesOfFish < 55) {
      fishCapacity = `${Math.round(inchesOfFish * 0.8)} inches of medium fish`;
    } else {
      fishCapacity = `${Math.round(inchesOfFish * 0.6)} inches of larger fish`;
    }

    setResult({
      volumeGallons: Math.round(volumeGallons * 10) / 10,
      volumeLiters: Math.round(volumeLiters * 10) / 10,
      surfaceArea: Math.round(surfaceAreaSqInches * 100) / 100,
      fishCapacity,
      waterWeight: Math.round(waterWeight * 10) / 10,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setWaterLevel("");
    setDiameter("");
    setResult(null);
  };

  useEffect(() => {
    calculateVolume();
  }, [length, width, height, waterLevel, diameter, unit, shape]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Aquarium Volume Calculator – Calculate Fish Tank Water Capacity</h1>
          <p className="text-muted-foreground">
            Calculate your aquarium's water volume instantly with our free Aquarium Volume Calculator. Enter tank dimensions to find gallons, liters, and recommended fish capacity — essential for proper stocking and water treatment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Tank Shape & Dimensions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shape">Tank Shape</Label>
                    <Select value={shape} onValueChange={(v) => setShape(v as "rectangular" | "cylinder")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rectangular">Rectangular</SelectItem>
                        <SelectItem value="cylinder">Cylindrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={(v) => setUnit(v as "inches" | "cm")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="cm">Centimeters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {shape === "rectangular" ? (
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 36" : "e.g., 90"}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 18" : "e.g., 45"}
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 20" : "e.g., 50"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="diameter">Diameter</Label>
                      <Input
                        id="diameter"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 18" : "e.g., 45"}
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height-cyl">Height</Label>
                      <Input
                        id="height-cyl"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 24" : "e.g., 60"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterLevel">Water Level (optional)</Label>
                <Input
                  id="waterLevel"
                  type="number"
                  placeholder="Leave empty for full tank"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typically fill to 1-2 inches below the rim
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Fish capacity follows the "1 inch of fish per gallon" rule for small fish. Larger fish require more space.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateVolume} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Water Volume</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">{result.volumeGallons} gal</p>
                      <p className="text-lg text-muted-foreground">({result.volumeLiters} L)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        Water Weight
                      </p>
                      <p className="text-lg font-bold">{result.waterWeight} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        Surface Area
                      </p>
                      <p className="text-lg font-bold">{result.surfaceArea} in²</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Fish className="h-4 w-4 text-green-500" />
                      <p className="text-sm font-semibold text-green-500">Fish Capacity</p>
                    </div>
                    <p className="text-sm">{result.fishCapacity}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formulas:</strong></p>
                    <p className="font-mono text-xs mt-1">Rectangular: L × W × H</p>
                    <p className="font-mono text-xs">Cylinder: π × r² × h</p>
                    <p className="font-mono text-xs">1 cubic inch = 0.00372 gallons</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Fish className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter tank dimensions to calculate volume</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Fish className="h-5 w-5" />
              Aquarium Stocking Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">General Rules:</h4>
                <ul className="space-y-2">
                  <li>• <strong>1 inch per gallon:</strong> For small fish (tetras, guppies)</li>
                  <li>• <strong>1 inch per 2 gallons:</strong> For medium fish (angelfish, gouramis)</li>
                  <li>• <strong>1 inch per 3+ gallons:</strong> For large fish (cichlids, goldfish)</li>
                  <li>• Consider filtration capacity and swimming space</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Important Considerations:</h4>
                <ul className="space-y-2">
                  <li>• Account for decorations displacing water</li>
                  <li>• Surface area affects oxygen exchange</li>
                  <li>• Some fish need schools/groups</li>
                  <li>• Research adult size, not juvenile size</li>
                  <li>• Consider territorial behavior</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content Sections */}
        <div className="mt-8 space-y-8">
          {/* How to Use Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use This Aquarium Volume Calculator</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-semibold">Choose Tank Shape</h3>
                </div>
                <p className="text-sm text-muted-foreground">Select whether your aquarium is rectangular (most common) or cylindrical. This determines which formula the calculator uses.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="font-semibold">Enter Dimensions</h3>
                </div>
                <p className="text-sm text-muted-foreground">Input the length, width, and height of your tank. Use inches or centimeters—just be consistent. Measure the inside glass-to-glass for accuracy.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="font-semibold">Get Results</h3>
                </div>
                <p className="text-sm text-muted-foreground">The calculator instantly shows water volume in gallons and liters, plus water weight and recommended fish capacity based on standard stocking rules.</p>
              </div>
            </div>
          </section>

          {/* Understanding Aquarium Volume Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Understanding Aquarium Volume</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Why Volume Matters</h3>
                <p className="text-sm">Water volume is the foundation of every aquarium decision. It determines how many fish you can keep, what size filter you need, how much medication to dose, and how often to perform water changes. Getting the volume wrong means risking fish health through overcrowding, under-filtration, or incorrect chemical dosing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Actual vs. Nominal Volume</h3>
                <p className="text-sm">The "20 gallon" label on your tank is a rough estimate, not a precise measurement. Actual water capacity is almost always less than advertised. Glass thickness (especially on larger tanks), substrate depth, decorations, and equipment all displace water. A tank sold as 55 gallons might hold 48-50 gallons at typical water levels. That 10% difference matters when dosing medication or calculating bioload.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Why Calculate Real Volume</h3>
                <p className="text-sm">Manufacturers round numbers for marketing. They measure to the very top of the tank, but you never fill an aquarium to the brim—typically leaving 1-2 inches of headspace. Substrate and rocks can displace 10-20% of your water volume. For serious fishkeeping, knowing your actual water volume prevents costly mistakes with water treatments, salt mixes, and medication overdoses.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Water Weight Consideration</h3>
                <p className="text-sm">Water weighs approximately 8.3 pounds per gallon (1 kg per liter). A 55-gallon aquarium doesn't just weigh 55 pounds—it weighs over 460 pounds when full, plus the weight of the tank, stand, substrate, and equipment. This matters for floor loading, stand selection, and deciding where to place your aquarium. Never underestimate water weight.</p>
              </div>
            </div>
          </section>

          {/* Formulas Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Aquarium Volume Formulas by Shape</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Rectangular Aquarium</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded mb-2">Volume = Length × Width × Height</p>
                <p className="text-sm text-muted-foreground">Most common aquarium shape. Multiply interior length, width, and water height. All measurements in the same unit.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cube Aquarium</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded mb-2">Volume = Side³</p>
                <p className="text-sm text-muted-foreground">Special case of rectangular where all sides are equal. Cube the length of one side.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cylindrical Aquarium</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded mb-2">Volume = π × r² × Height</p>
                <p className="text-sm text-muted-foreground">Common for small desktop tanks. Use radius (half of diameter) squared, multiplied by pi (3.14159) and height.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Bow Front Aquarium</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded mb-2">Volume = Rectangular + Segment</p>
                <p className="text-sm text-muted-foreground">Calculate the rectangular portion normally, then add the curved bow segment. For precision, treat as rectangular with 10-15% added volume.</p>
              </div>
            </div>
          </section>

          {/* Common Aquarium Sizes Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Common Aquarium Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Tank Size</th>
                    <th className="text-left p-3 font-semibold">Dimensions (L×W×H)</th>
                    <th className="text-right p-3 font-semibold">Volume (gal)</th>
                    <th className="text-right p-3 font-semibold">Volume (L)</th>
                    <th className="text-right p-3 font-semibold">Water Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">5 gallon</td>
                    <td className="p-3 font-mono">16×8×10 in</td>
                    <td className="p-3 text-right">5 gal</td>
                    <td className="p-3 text-right">19 L</td>
                    <td className="p-3 text-right">42 lbs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">10 gallon</td>
                    <td className="p-3 font-mono">20×10×12 in</td>
                    <td className="p-3 text-right">10 gal</td>
                    <td className="p-3 text-right">38 L</td>
                    <td className="p-3 text-right">83 lbs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">20 gallon</td>
                    <td className="p-3 font-mono">24×12×16 in</td>
                    <td className="p-3 text-right">20 gal</td>
                    <td className="p-3 text-right">76 L</td>
                    <td className="p-3 text-right">167 lbs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">40 gallon</td>
                    <td className="p-3 font-mono">36×18×16 in</td>
                    <td className="p-3 text-right">40 gal</td>
                    <td className="p-3 text-right">151 L</td>
                    <td className="p-3 text-right">334 lbs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">55 gallon</td>
                    <td className="p-3 font-mono">48×13×21 in</td>
                    <td className="p-3 text-right">55 gal</td>
                    <td className="p-3 text-right">208 L</td>
                    <td className="p-3 text-right">460 lbs</td>
                  </tr>
                  <tr>
                    <td className="p-3">75 gallon</td>
                    <td className="p-3 font-mono">48×18×21 in</td>
                    <td className="p-3 text-right">75 gal</td>
                    <td className="p-3 text-right">284 L</td>
                    <td className="p-3 text-right">625 lbs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Note: Dimensions are nominal. Actual water volume varies based on fill level and displacement.</p>
          </section>

          {/* Why Accurate Volume Matters Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Accurate Volume Matters</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Fish Stocking Density</h3>
                <p className="text-sm text-muted-foreground">Overcrowding is the leading cause of aquarium failure. Accurate volume tells you the true bioload capacity. The "1 inch per gallon" rule only works with real water volume, not marketing numbers.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Medication Dosing</h3>
                <p className="text-sm text-muted-foreground">Fish medications are dosed per gallon. Overdose by 20% and you risk killing fish. Underdose and the treatment fails. Always calculate actual water volume before adding any medication.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Filter Sizing</h3>
                <p className="text-sm text-muted-foreground">Filters are rated for specific tank sizes. A filter rated for "up to 55 gallons" should handle your actual volume with room to spare. Undersized filtration leads to ammonia spikes and fish stress.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Heater Sizing</h3>
                <p className="text-sm text-muted-foreground">Heaters are sized at 2.5-5 watts per gallon depending on room temperature. Too small and water stays cold. Too large and the heater short-cycles, reducing lifespan and causing temperature swings.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg md:col-span-2">
                <h3 className="font-semibold mb-2">Water Change Calculations</h3>
                <p className="text-sm text-muted-foreground">Weekly water changes are typically 25-50% of tank volume. Knowing your exact volume means you know exactly how much water to remove and replace. This keeps water parameters stable and reduces fish stress during maintenance.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">How do I calculate my aquarium volume?</h3>
                <p className="text-sm text-muted-foreground">Measure the interior length, width, and water height in inches. Multiply: Length × Width × Height = cubic inches. Divide by 231 to get gallons (or use our calculator above). For cylindrical tanks, use π × radius² × height.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Why is actual volume different from advertised?</h3>
                <p className="text-sm text-muted-foreground">Manufacturers measure to the very top of the tank and don't account for glass thickness, substrate, or decorations. You also never fill an aquarium completely—typically leaving 1-2 inches of headspace. A "55 gallon" tank often holds 48-52 gallons in real use.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">How much does aquarium water weigh?</h3>
                <p className="text-sm text-muted-foreground">Freshwater weighs about 8.3 pounds per gallon (1 kg per liter). Saltwater is slightly heavier at about 8.6 pounds per gallon. A 55-gallon freshwater tank weighs approximately 460 pounds—just the water, not including tank, stand, substrate, or equipment.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Should I measure to the water line?</h3>
                <p className="text-sm text-muted-foreground">Yes. Measure to where you actually keep the water level, not the top of the tank. Most aquarists fill to 1-2 inches below the rim to prevent overflow and allow fish to jump without escaping. This is your real working volume.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I calculate volume for odd-shaped tanks?</h3>
                <p className="text-sm text-muted-foreground">Break the tank into regular shapes. A bow front is a rectangle plus a curved segment. Calculate each section separately and add them together. For complex custom tanks, fill with measured buckets of water—tedious but 100% accurate.</p>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/aquarium-filtration-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Aquarium Filtration Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate proper filter flow rate and turnover for your tank size.</p>
              </a>
              <a href="/calculators/water-tank-volume-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Water Tank Volume Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate volume for large water storage tanks and cisterns.</p>
              </a>
              <a href="/calculators/volume-of-cuboid-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Volume of Cuboid Calculator</h3>
                <p className="text-sm text-muted-foreground">General-purpose rectangular volume calculator for any application.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
