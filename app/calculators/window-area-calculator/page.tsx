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

interface WindowAreaResult {
  windows: Array<{
    id: number;
    width: number;
    height: number;
    area: number;
    quantity: number;
    totalArea: number;
  }>;
  totalArea: number;
  totalAreaSqM: number;
  glassCost: number;
  heatLossBTU: number;
  heatLossWatts: number;
  recommendations: string[];
}

export default function WindowAreaCalculatorPage() {
  const [windows, setWindows] = useState<Array<{
    id: number;
    width: string;
    height: string;
    quantity: string;
  }>>([
    { id: 1, width: "", height: "", quantity: "1" },
  ]);
  const [unit, setUnit] = useState<string>("feet");
  const [glassPrice, setGlassPrice] = useState<string>("15");
  const [result, setResult] = useState<WindowAreaResult | null>(null);

  const addWindow = () => {
    setWindows([...windows, {
      id: Date.now(),
      width: "",
      height: "",
      quantity: "1",
    }]);
  };

  const removeWindow = (id: number) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const updateWindow = (id: number, field: string, value: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const calculate = () => {
    let totalAreaSqFt = 0;
    const windowResults = [];
    const pricePerSqFt = parseFloat(glassPrice) || 15;

    for (const win of windows) {
      const width = parseFloat(win.width) || 0;
      const height = parseFloat(win.height) || 0;
      const quantity = parseInt(win.quantity) || 1;

      if (width === 0 || height === 0) continue;

      let area = width * height;

      // Convert to sq ft if needed
      if (unit === "inches") {
        area = (width * height) / 144;
      } else if (unit === "cm") {
        area = (width * height) / 929.03;
      } else if (unit === "meters") {
        area = width * height * 10.764;
      }

      const totalWindowArea = area * quantity;
      totalAreaSqFt += totalWindowArea;

      windowResults.push({
        id: win.id,
        width,
        height,
        area: parseFloat(area.toFixed(2)),
        quantity,
        totalArea: parseFloat(totalWindowArea.toFixed(2)),
      });
    }

    // Convert to sq meters
    const totalAreaSqM = totalAreaSqFt / 10.764;

    // Glass cost estimate
    const glassCost = totalAreaSqFt * pricePerSqFt;

    // Heat loss estimate (simplified)
    // Typical single-pane window: U-value ≈ 1.0 BTU/hr·ft²·°F
    // Assuming 40°F temperature difference
    const heatLossBTU = totalAreaSqFt * 1.0 * 40;
    const heatLossWatts = heatLossBTU * 0.293;

    // Recommendations
    const recommendations: string[] = [];

    if (totalAreaSqFt > 200) {
      recommendations.push("⚠️ Large window area - consider energy-efficient glazing");
    }
    if (totalAreaSqFt > 0) {
      recommendations.push(`💰 Estimated glass cost: $${glassCost.toFixed(2)} at $${pricePerSqFt}/sq ft`);
    }
    recommendations.push(`🌡️ Estimated heat loss: ${heatLossBTU.toFixed(0)} BTU/hr (40°F ΔT)`);
    recommendations.push("💡 Double/triple glazing can reduce heat loss by 50-70%");
    recommendations.push("🪟 Low-E coating improves energy efficiency");

    setResult({
      windows: windowResults,
      totalArea: parseFloat(totalAreaSqFt.toFixed(2)),
      totalAreaSqM: parseFloat(totalAreaSqM.toFixed(2)),
      glassCost: parseFloat(glassCost.toFixed(2)),
      heatLossBTU: parseFloat(heatLossBTU.toFixed(0)),
      heatLossWatts: parseFloat(heatLossWatts.toFixed(0)),
      recommendations,
    });
  };

  const reset = () => {
    setWindows([{ id: 1, width: "", height: "", quantity: "1" }]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss
          </h1>
          <p className="text-muted-foreground">
            Calculate the exact area of your windows with our Window Area Calculator.
            Enter window dimensions to find total glazing area — useful for ordering glass,
            estimating heat loss, and window treatment planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Measurement Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="inches">Inches</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Windows</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addWindow}>
                    + Add Window
                  </Button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {windows.map((win, index) => (
                    <div key={win.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Window {index + 1}</span>
                        {windows.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeWindow(win.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Width</Label>
                          <Input
                            type="number"
                            value={win.width}
                            onChange={(e) => updateWindow(win.id, "width", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Height</Label>
                          <Input
                            type="number"
                            value={win.height}
                            onChange={(e) => updateWindow(win.id, "height", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            value={win.quantity}
                            onChange={(e) => updateWindow(win.id, "quantity", e.target.value)}
                            placeholder="1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="glass-price">Glass Price ($/sq ft)</Label>
                <Input
                  id="glass-price"
                  type="number"
                  value={glassPrice}
                  onChange={(e) => setGlassPrice(e.target.value)}
                  placeholder="15"
                />
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
              <h3 className="text-lg font-semibold mb-4">Window Area Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Total Area</p>
                      <p className="text-2xl font-bold text-primary">{result.totalArea} sq ft</p>
                      <p className="text-xs text-muted-foreground">{result.totalAreaSqM} m²</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Glass Cost</p>
                      <p className="text-2xl font-bold text-primary">${result.glassCost}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Heat Loss (BTU/hr):</span>
                      <span className="font-semibold">{result.heatLossBTU}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Heat Loss (Watts):</span>
                      <span className="font-semibold">{result.heatLossWatts}</span>
                    </div>
                  </div>

                  {result.windows.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Window Breakdown</h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {result.windows.map((win) => (
                          <div key={win.id} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                            <span>{win.width}×{win.height} ×{win.quantity}</span>
                            <span>{win.totalArea} sq ft</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add windows and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Window Energy Efficiency Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Double glazing:</strong> Reduces heat loss by ~50%
                  </li>
                  <li>
                    <strong>Triple glazing:</strong> Reduces heat loss by ~70%
                  </li>
                  <li>
                    <strong>Low-E coating:</strong> Reflects heat while allowing light
                  </li>
                  <li>
                    <strong>Gas fill:</strong> Argon or krypton between panes improves insulation
                  </li>
                  <li>
                    <strong>Window treatments:</strong> Cellular shades add insulation value
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Heat loss calculation assumes single-pane glass
                  with 40°F temperature difference. Actual values vary based on glazing type,
                  frame material, and weather conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Window Area</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Add Window Dimensions</h3>
                <p className="text-sm text-muted-foreground">Enter width and height for each window. Add multiple windows as needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Set Quantity & Options</h3>
                <p className="text-sm text-muted-foreground">Specify how many of each window size. Enter glass price per sq ft if needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Area & Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">See total area, glass cost estimate, and heat loss calculations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Window Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Multiple Windows**</h3>
              <p className="text-sm text-muted-foreground">Add and calculate area for multiple windows of different sizes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Cost Estimation**</h3>
              <p className="text-sm text-muted-foreground">Calculate glass replacement cost based on area and price per unit.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Heat Loss Analysis**</h3>
              <p className="text-sm text-muted-foreground">Estimate heat loss through windows in BTU and watts.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Dual Unit Support**</h3>
              <p className="text-sm text-muted-foreground">Work in feet or meters with automatic conversions.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do I measure a window for area?</h3>
              <p className="text-sm text-muted-foreground">Measure the width and height of the glass area (not the frame). Multiply width × height for area. For multiple windows, add all areas together.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How much does window glass cost?</h3>
              <p className="text-sm text-muted-foreground">Standard glass costs $10-20/sq ft. Tempered glass: $25-40/sq ft. Double-pane: $50-100/sq ft installed. Prices vary by region and glass type.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do windows affect energy bills?</h3>
              <p className="text-sm text-muted-foreground">Windows can account for 25-30% of heating/cooling costs. Single-pane windows lose heat 4x faster than walls. Upgrading to double-pane can save 12-33% on energy bills.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is the standard window size?</h3>
              <p className="text-sm text-muted-foreground">Common sizes: Double-hung 36×48 in, Picture windows 48×72 in, Sliding 60×48 in. Custom sizes are available but cost more.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do I calculate heat loss through windows?</h3>
              <p className="text-sm text-muted-foreground">Heat loss = Area × U-value × Temperature Difference. Single-pane U-value ≈ 1.0, double-pane ≈ 0.5. Larger temperature differences mean more heat loss.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/paint-coverage-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Paint Coverage Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate paint needed for walls, accounting for windows and doors.</p>
            </a>
            <a href="/calculators/flooring-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Flooring Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate flooring materials for home improvement projects.</p>
            </a>
            <a href="/calculators/wallpaper-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Wallpaper Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate wallpaper rolls needed for room decoration.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
