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

interface ContainerSize {
  name: string;
  length: number; // mm
  width: number; // mm
  height: number; // mm
  doorWidth: number; // mm
  doorHeight: number; // mm
  maxPayload: number; // kg
  internalVolume: number; // m³
}

const containerSizes: ContainerSize[] = [
  {
    name: "20ft Standard",
    length: 5898,
    width: 2352,
    height: 2393,
    doorWidth: 2340,
    doorHeight: 2280,
    maxPayload: 28200,
    internalVolume: 33.2,
  },
  {
    name: "40ft Standard",
    length: 12032,
    width: 2352,
    height: 2393,
    doorWidth: 2340,
    doorHeight: 2280,
    maxPayload: 28600,
    internalVolume: 67.7,
  },
  {
    name: "40ft High Cube",
    length: 12032,
    width: 2352,
    height: 2698,
    doorWidth: 2340,
    doorHeight: 2585,
    maxPayload: 28600,
    internalVolume: 76.4,
  },
  {
    name: "45ft High Cube",
    length: 13716,
    width: 2352,
    height: 2698,
    doorWidth: 2340,
    doorHeight: 2585,
    maxPayload: 29500,
    internalVolume: 86.1,
  },
];

interface LoadResult {
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  boxLength: number;
  boxWidth: number;
  boxHeight: number;
  orientation: string;
  boxesPerLayer: number;
  layers: number;
  totalBoxes: number;
  volumeUsed: number;
  volumeUtilization: number;
  totalWeight: number;
  weightUtilization: number;
  palletMode?: boolean;
  palletsCount?: number;
}

export default function ContainerLoadCalculatorPage() {
  const [containerType, setContainerType] = useState<string>("20ft Standard");
  const [boxLength, setBoxLength] = useState<string>("");
  const [boxWidth, setBoxWidth] = useState<string>("");
  const [boxHeight, setBoxHeight] = useState<string>("");
  const [boxWeight, setBoxWeight] = useState<string>("");
  const [unit, setUnit] = useState<string>("cm");
  const [loadingMode, setLoadingMode] = useState<string>("boxes");
  const [palletLength, setPalletLength] = useState<string>("120");
  const [palletWidth, setPalletWidth] = useState<string>("100");
  const [boxesPerPallet, setBoxesPerPallet] = useState<string>("10");
  const [result, setResult] = useState<LoadResult | null>(null);

  const calculate = () => {
    const container = containerSizes.find((c) => c.name === containerType);
    if (!container) return;

    let bLength = parseFloat(boxLength);
    let bWidth = parseFloat(boxWidth);
    let bHeight = parseFloat(boxHeight);
    let bWeight = parseFloat(boxWeight) || 0;

    if (isNaN(bLength) || isNaN(bWidth) || isNaN(bHeight)) return;

    // Convert box dimensions to mm
    if (unit === "cm") {
      bLength *= 10;
      bWidth *= 10;
      bHeight *= 10;
    } else if (unit === "in") {
      bLength *= 25.4;
      bWidth *= 25.4;
      bHeight *= 25.4;
    }

    // Try different orientations to find optimal loading
    const orientations = [
      { l: bLength, w: bWidth, h: bHeight, name: "L×W×H" },
      { l: bLength, w: bHeight, h: bWidth, name: "L×H×W" },
      { l: bWidth, w: bLength, h: bHeight, name: "W×L×H" },
      { l: bWidth, w: bHeight, h: bLength, name: "W×H×L" },
      { l: bHeight, w: bLength, h: bWidth, name: "H×L×W" },
      { l: bHeight, w: bWidth, h: bLength, name: "H×W×L" },
    ];

    let bestResult = { total: 0, orientation: orientations[0] };

    for (const orient of orientations) {
      // Check if box fits through door
      if (orient.w > container.doorWidth || orient.h > container.doorHeight) {
        continue;
      }

      // Calculate boxes per layer (lengthwise and widthwise)
      const boxesLengthwise = Math.floor(container.length / orient.l);
      const boxesWidthwise = Math.floor(container.width / orient.w);
      const boxesPerLayer = boxesLengthwise * boxesWidthwise;

      // Calculate number of layers
      const layers = Math.floor(container.height / orient.h);

      const total = boxesPerLayer * layers;

      if (total > bestResult.total) {
        bestResult = { total, orientation: orient };
      }
    }

    if (bestResult.total === 0) {
      setResult(null);
      return;
    }

    const orient = bestResult.orientation;
    const boxesLengthwise = Math.floor(container.length / orient.l);
    const boxesWidthwise = Math.floor(container.width / orient.w);
    const boxesPerLayer = boxesLengthwise * boxesWidthwise;
    const layers = Math.floor(container.height / orient.h);
    const totalBoxes = boxesPerLayer * layers;

    // Volume calculations
    const boxVolume = (orient.l * orient.w * orient.h) / 1e9; // Convert to m³
    const totalVolumeUsed = boxVolume * totalBoxes;
    const volumeUtilization = (totalVolumeUsed / container.internalVolume) * 100;

    // Weight calculations
    const totalWeight = totalBoxes * bWeight;
    const weightUtilization = (totalWeight / container.maxPayload) * 100;

    setResult({
      containerLength: container.length,
      containerWidth: container.width,
      containerHeight: container.height,
      boxLength: orient.l,
      boxWidth: orient.w,
      boxHeight: orient.h,
      orientation: orient.name,
      boxesPerLayer,
      layers,
      totalBoxes,
      volumeUsed: parseFloat(totalVolumeUsed.toFixed(2)),
      volumeUtilization: parseFloat(volumeUtilization.toFixed(1)),
      totalWeight: parseFloat(totalWeight.toFixed(2)),
      weightUtilization: parseFloat(weightUtilization.toFixed(1)),
      palletMode: loadingMode === "pallets",
    });
  };

  const reset = () => {
    setBoxLength("");
    setBoxWidth("");
    setBoxHeight("");
    setBoxWeight("");
    setUnit("cm");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Container Load Calculator – How Many Boxes Fit in a 20ft or 40ft Container?
          </h1>
          <p className="text-muted-foreground">
            Optimize your container loading with our Container Load Calculator.
            Enter your cargo dimensions and container size (20ft, 40ft, 40ft HC) to
            calculate the maximum number of boxes that can fit, maximizing shipping efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="container-type">Container Size</Label>
                <Select value={containerType} onValueChange={setContainerType}>
                  <SelectTrigger id="container-type">
                    <SelectValue placeholder="Select container size" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerSizes.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name} ({c.internalVolume} m³)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Loading Mode</Label>
                <Select value={loadingMode} onValueChange={setLoadingMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boxes">Direct Box Loading</SelectItem>
                    <SelectItem value="pallets">Pallet Loading (coming soon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="box-length">Length</Label>
                  <Input
                    id="box-length"
                    type="number"
                    value={boxLength}
                    onChange={(e) => setBoxLength(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="box-width">Width</Label>
                  <Input
                    id="box-width"
                    type="number"
                    value={boxWidth}
                    onChange={(e) => setBoxWidth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="box-height">Height</Label>
                  <Input
                    id="box-height"
                    type="number"
                    value={boxHeight}
                    onChange={(e) => setBoxHeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="box-weight">Weight per Box (kg)</Label>
                  <Input
                    id="box-weight"
                    type="number"
                    value={boxWeight}
                    onChange={(e) => setBoxWeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">inches</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Loading Plan</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Boxes</p>
                    <p className="text-4xl font-bold text-primary">{result.totalBoxes}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg space-y-1">
                      <p className="text-xs text-muted-foreground">Boxes per Layer</p>
                      <p className="text-lg font-semibold">{result.boxesPerLayer}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg space-y-1">
                      <p className="text-xs text-muted-foreground">Number of Layers</p>
                      <p className="text-lg font-semibold">{result.layers}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Orientation:</span>
                      <span className="font-medium">{result.orientation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Box Dimensions:</span>
                      <span className="font-medium">
                        {(result.boxLength / 10).toFixed(1)} × {(result.boxWidth / 10).toFixed(1)} × {(result.boxHeight / 10).toFixed(1)} cm
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Volume Utilization</span>
                        <span className="font-medium">{result.volumeUtilization}%</span>
                      </div>
                      <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(result.volumeUtilization, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.volumeUsed} m³ of {containerSizes.find(c => c.name === containerType)?.internalVolume} m³
                      </p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Weight Utilization</span>
                        <span className="font-medium">{result.weightUtilization}%</span>
                      </div>
                      <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(result.weightUtilization, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.totalWeight} kg of {containerSizes.find(c => c.name === containerType)?.maxPayload.toLocaleString()} kg
                      </p>
                    </div>
                  </div>

                  {result.volumeUtilization > 100 && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        ⚠️ Volume exceeds container capacity. Consider using a larger container.
                      </p>
                    </div>
                  )}

                  {result.weightUtilization > 100 && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        ⚠️ Weight exceeds container payload limit. Reduce box count or weight.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter box dimensions and click Calculate to see loading plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Container Loading Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Door clearance:</strong> Boxes must fit through the container door opening.
                    Our calculator automatically checks door dimensions.
                  </li>
                  <li>
                    <strong>Weight distribution:</strong> Distribute heavy boxes evenly and place them
                    at the bottom for stability during transport.
                  </li>
                  <li>
                    <strong>Load factor:</strong> Aim for 75-85% volume utilization for practical loading.
                    100% is theoretical maximum.
                  </li>
                  <li>
                    <strong>Stacking strength:</strong> Ensure bottom boxes can support the weight of
                    boxes stacked above them.
                  </li>
                  <li>
                    <strong>Secure the load:</strong> Use dunnage bags, straps, or bracing to prevent
                    cargo shift during transit.
                  </li>
                </ul>
                <p className="pt-2">
                  <strong>Note:</strong> This calculator provides an estimate based on ideal rectangular
                  packing. Actual loading may vary based on box strength, loading method, and safety requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Standard Container Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Container</th>
                      <th className="text-right">Length</th>
                      <th className="text-right">Width</th>
                      <th className="text-right">Height</th>
                      <th className="text-right">Volume</th>
                      <th className="text-right">Max Payload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containerSizes.map((c) => (
                      <tr key={c.name} className="border-b">
                        <td className="py-2 font-medium">{c.name}</td>
                        <td className="text-right">{(c.length / 1000).toFixed(2)}m</td>
                        <td className="text-right">{(c.width / 1000).toFixed(2)}m</td>
                        <td className="text-right">{(c.height / 1000).toFixed(2)}m</td>
                        <td className="text-right">{c.internalVolume} m³</td>
                        <td className="text-right">{c.maxPayload.toLocaleString()} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Container Loading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Select Container Size</h3>
                  <p className="text-muted-foreground text-sm">Choose from 20ft, 40ft, 40ft High Cube, or 45ft High Cube standard containers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Box Dimensions</h3>
                  <p className="text-muted-foreground text-sm">Input your carton/box length, width, height, and weight per box.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Loading Plan</h3>
                  <p className="text-muted-foreground text-sm">See maximum boxes that fit, optimal orientation, and volume/weight utilization.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Use This Container Load Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📦 Maximize Container Space</h3>
                <p className="text-muted-foreground text-sm">Find the optimal box orientation and loading pattern to fit the maximum number of boxes per container.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚖️ Weight & Volume Analysis</h3>
                <p className="text-muted-foreground text-sm">Track both volume utilization and weight limits to ensure safe, compliant container loading.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚢 Multiple Container Sizes</h3>
                <p className="text-muted-foreground text-sm">Compare loading across 20ft, 40ft, 40ft HC, and 45ft HC containers to choose the most cost-effective option.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚪 Door Clearance Check</h3>
                <p className="text-muted-foreground text-sm">Automatically verifies boxes fit through container door opening before calculating loading plan.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Standard Shipping Container Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Container Type</th>
                    <th className="text-left py-3 px-4">Internal Length</th>
                    <th className="text-left py-3 px-4">Internal Volume</th>
                    <th className="text-left py-3 px-4">Max Payload</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">20ft Standard</td>
                    <td className="py-3 px-4">5.90 m</td>
                    <td className="py-3 px-4">33.2 m³</td>
                    <td className="py-3 px-4">28,200 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">40ft Standard</td>
                    <td className="py-3 px-4">12.03 m</td>
                    <td className="py-3 px-4">67.7 m³</td>
                    <td className="py-3 px-4">28,600 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">40ft High Cube</td>
                    <td className="py-3 px-4">12.03 m</td>
                    <td className="py-3 px-4">76.4 m³</td>
                    <td className="py-3 px-4">28,600 kg</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">45ft High Cube</td>
                    <td className="py-3 px-4">13.72 m</td>
                    <td className="py-3 px-4">86.1 m³</td>
                    <td className="py-3 px-4">29,500 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Container Loading FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How many boxes fit in a 20ft container?</h3>
                <p className="text-muted-foreground text-sm">It depends on box size. For standard cartons (40×40×40cm), approximately 1,000-1,200 boxes fit in a 20ft container.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the most efficient container loading pattern?</h3>
                <p className="text-muted-foreground text-sm">Interlocking patterns (like bricklaying) provide stability. This calculator finds the orientation that maximizes box count while ensuring door clearance.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I calculate CBM for container loading?</h3>
                <p className="text-muted-foreground text-sm">CBM = Length × Width × Height (in meters). Total shipment CBM = box CBM × quantity. Compare to container volume for utilization percentage.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the door opening size for containers?</h3>
                <p className="text-muted-foreground text-sm">20ft/40ft Standard: 2.34m wide × 2.28m high. High Cube containers: 2.34m wide × 2.58m high. Boxes must fit through this opening.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Should I fill container to 100% volume?</h3>
                <p className="text-muted-foreground text-sm">No, aim for 75-85% practical utilization. 100% is theoretical maximum. Leave space for proper load securing and ventilation.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Shipping & Logistics Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/cargo-volume-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Cargo Volume Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate total shipment volume and chargeable weight for freight.</p>
              </a>
              <a href="/calculators/camping-gear-weight-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Camping Gear Weight Calculator</h3>
                <p className="text-muted-foreground text-sm">Plan pack weight distribution for outdoor adventures.</p>
              </a>
              <a href="/calculators/carbon-footprint-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carbon Footprint Calculator</h3>
                <p className="text-muted-foreground text-sm">Measure environmental impact of shipping and logistics operations.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
