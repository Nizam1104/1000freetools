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

interface TemperatureResult {
  celsius: number;
  fahrenheit: number;
  gasMark: number | string;
  gasMarkDescription: string;
  cookingMethod: string;
}

const gasMarks = [
  { mark: 0.25, celsius: 110, fahrenheit: 225, description: "Very Cool" },
  { mark: 0.5, celsius: 120, fahrenheit: 250, description: "Very Cool" },
  { mark: 1, celsius: 140, fahrenheit: 275, description: "Cool" },
  { mark: 2, celsius: 150, fahrenheit: 300, description: "Slow" },
  { mark: 3, celsius: 160, fahrenheit: 325, description: "Moderately Slow" },
  { mark: 4, celsius: 180, fahrenheit: 350, description: "Moderate" },
  { mark: 5, celsius: 190, fahrenheit: 375, description: "Moderate" },
  { mark: 6, celsius: 200, fahrenheit: 400, description: "Moderately Hot" },
  { mark: 7, celsius: 220, fahrenheit: 425, description: "Hot" },
  { mark: 8, celsius: 230, fahrenheit: 450, description: "Hot" },
  { mark: 9, celsius: 240, fahrenheit: 475, description: "Very Hot" },
  { mark: 10, celsius: 260, fahrenheit: 500, description: "Extremely Hot" },
];

export default function OvenTemperatureConverterPage() {
  const [temperature, setTemperature] = useState<string>("");
  const [unit, setUnit] = useState<string>("celsius");
  const [result, setResult] = useState<TemperatureResult | null>(null);

  const calculate = () => {
    const tempNum = parseFloat(temperature);
    if (isNaN(tempNum)) return;

    let celsius = tempNum;
    let fahrenheit = tempNum;

    // Convert to both scales
    if (unit === "celsius") {
      celsius = tempNum;
      fahrenheit = (tempNum * 9 / 5) + 32;
    } else if (unit === "fahrenheit") {
      fahrenheit = tempNum;
      celsius = (tempNum - 32) * 5 / 9;
    } else if (unit === "gasMark") {
      const gasMark = tempNum;
      const gasMarkData = gasMarks.find(gm => gm.mark === gasMark);
      if (gasMarkData) {
        celsius = gasMarkData.celsius;
        fahrenheit = gasMarkData.fahrenheit;
      }
    }

    // Find closest gas mark
    let closestGasMark: number | string = "N/A";
    let gasMarkDescription = "";
    let minDiff = Infinity;

    for (const gm of gasMarks) {
      const diff = Math.abs(gm.celsius - celsius);
      if (diff < minDiff) {
        minDiff = diff;
        closestGasMark = gm.mark;
        gasMarkDescription = gm.description;
      }
    }

    // Determine cooking method based on temperature
    let cookingMethod = "";
    if (celsius < 140) {
      cookingMethod = "Proofing, dehydrating, keeping warm";
    } else if (celsius < 160) {
      cookingMethod = "Slow roasting, meringues";
    } else if (celsius < 180) {
      cookingMethod = "Roasting vegetables, slow baking";
    } else if (celsius < 200) {
      cookingMethod = "Baking cakes, cookies, bread";
    } else if (celsius < 220) {
      cookingMethod = "Roasting meat, baking pastry";
    } else if (celsius < 240) {
      cookingMethod = "High-heat roasting, pizza";
    } else {
      cookingMethod = "Searing, broiling, artisan bread";
    }

    setResult({
      celsius: parseFloat(celsius.toFixed(0)),
      fahrenheit: parseFloat(fahrenheit.toFixed(0)),
      gasMark: closestGasMark,
      gasMarkDescription,
      cookingMethod,
    });
  };

  const reset = () => {
    setTemperature("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Oven Temperature Converter – Convert Celsius, Fahrenheit & Gas Mark Instantly
          </h1>
          <p className="text-muted-foreground">
            Never miscalculate your oven temperature again with our Oven Temperature Converter.
            Convert between Celsius, Fahrenheit, and Gas Mark numbers instantly — essential for
            following international recipes from any cookbook.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Temperature Scale</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="gasMark">Gas Mark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder={unit === "gasMark" ? "e.g., 4" : "e.g., 180"}
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">Quick Reference:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>180°C = 350°F = Gas 4</div>
                  <div>200°C = 400°F = Gas 6</div>
                  <div>220°C = 425°F = Gas 7</div>
                  <div>160°C = 325°F = Gas 3</div>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Celsius</p>
                      <p className="text-2xl font-bold text-primary">{result.celsius}°C</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Fahrenheit</p>
                      <p className="text-2xl font-bold text-primary">{result.fahrenheit}°F</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Gas Mark</p>
                      <p className="text-2xl font-bold text-primary">{result.gasMark}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Heat Level:</span>
                      <span className="font-semibold">{result.gasMarkDescription}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best For:</span>
                      <span className="font-semibold text-sm">{result.cookingMethod}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formulas:</strong>
                      <br />
                      °F = (°C × 9/5) + 32
                      <br />
                      °C = (°F - 32) × 5/9
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter temperature and click Calculate to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Temperature Conversion Chart
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Gas Mark</th>
                      <th className="text-right">Celsius</th>
                      <th className="text-right">Fahrenheit</th>
                      <th className="text-right">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gasMarks.map((gm) => (
                      <tr key={gm.mark} className="border-b">
                        <td className="py-2 font-medium">{gm.mark}</td>
                        <td className="text-right">{gm.celsius}°C</td>
                        <td className="text-right">{gm.fahrenheit}°F</td>
                        <td className="text-right">{gm.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Oven Temperature Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Preheating:</strong> Always preheat your oven for 10-15 minutes
                    before baking for consistent results.
                  </li>
                  <li>
                    <strong>Oven thermometer:</strong> Oven dials can be inaccurate by 25°F.
                    Use an oven thermometer for precision baking.
                  </li>
                  <li>
                    <strong>Convection ovens:</strong> Reduce temperature by 25°F (15°C) when
                    using convection/fan settings.
                  </li>
                  <li>
                    <strong>Altitude:</strong> At high altitudes, baking temperatures may
                    need adjustment.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How It Works Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">How to Convert Oven Temperatures</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Select Your Scale</h3>
                <p className="text-sm text-muted-foreground">Choose whether you're converting from Celsius, Fahrenheit, or Gas Mark.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Enter Temperature</h3>
                <p className="text-sm text-muted-foreground">Type in your recipe's temperature value in the selected scale.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get All Conversions</h3>
                <p className="text-sm text-muted-foreground">See the equivalent temperatures in all three scales plus cooking tips.</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Why Use This Oven Temperature Converter</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Three-Way Conversion
                </h3>
                <p className="text-sm text-muted-foreground">Convert between Celsius, Fahrenheit, and Gas Mark numbers in one click.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Gas Mark Reference
                </h3>
                <p className="text-sm text-muted-foreground">British recipes use Gas Marks — we show you the exact Celsius and Fahrenheit equivalents.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Cooking Method Guide
                </h3>
                <p className="text-sm text-muted-foreground">Learn what each temperature range is best for, from slow roasting to searing.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Complete Conversion Chart
                </h3>
                <p className="text-sm text-muted-foreground">Full reference table with all Gas Marks from 0.25 to 10 for quick lookup.</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Temperature Conversion Formulas</h3>
              <div className="bg-card p-4 rounded font-mono text-sm mb-4 space-y-1">
                <div>Fahrenheit = (Celsius × 9/5) + 32</div>
                <div>Celsius = (Fahrenheit - 32) × 5/9</div>
                <div>Gas Mark = (Fahrenheit - 225) / 25</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">Common Baking Temperatures:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 180°C / 350°F / Gas 4 - Cakes and cookies</li>
                    <li>• 200°C / 400°F / Gas 6 - Roasting vegetables</li>
                    <li>• 220°C / 425°F / Gas 7 - Pizza and bread</li>
                    <li>• 160°C / 325°F / Gas 3 - Slow baking</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Convection Oven Tip:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Reduce temperature by 25°F (15°C)</li>
                    <li>• 350°F conventional = 325°F convection</li>
                    <li>• 180°C conventional = 160°C convection</li>
                    <li>• Cooking time may also be reduced by 25%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Oven Temperatures</h2>
            <div className="space-y-4">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What is 180°C in Fahrenheit?</h3>
                <p className="text-sm text-muted-foreground">180°C equals 350°F, which is Gas Mark 4. This is the most common baking temperature for cakes, cookies, and many baked goods.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What does Gas Mark mean?</h3>
                <p className="text-sm text-muted-foreground">Gas Mark is a temperature scale used on gas ovens in the UK and some Commonwealth countries. Gas Mark 1 is 275°F (140°C), and each increment adds 25°F.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Should I adjust temperature for convection ovens?</h3>
                <p className="text-sm text-muted-foreground">Yes. Convection ovens circulate hot air, cooking food faster and more evenly. Reduce the temperature by 25°F (15°C) from conventional oven recipes.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Why do American recipes use Fahrenheit?</h3>
                <p className="text-sm text-muted-foreground">The US is one of the few countries still using Fahrenheit for cooking. Most other countries use Celsius. Gas Mark is primarily used in the UK for gas ovens.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">How accurate are oven temperature dials?</h3>
                <p className="text-sm text-muted-foreground">Oven dials can be off by 25-50°F. For precision baking, use a standalone oven thermometer. It's a cheap tool that can save ruined batches.</p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
        </div>
      </div>
    </div>
  );
}
