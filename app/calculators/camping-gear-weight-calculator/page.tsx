"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CampingGearResult {
  items: Array<{ name: string; weight: number }>;
  totalWeight: number;
  baseWeight: number;
  wornWeight: number;
  consumables: number;
  packWeightCategory: string;
  recommendations: string[];
}

export default function CampingGearWeightCalculatorPage() {
  const [items, setItems] = useState<Array<{ name: string; weight: string; category: string }>>([
    { name: "Tent", weight: "", category: "shelter" },
    { name: "Sleeping Bag", weight: "", category: "sleep" },
    { name: "Backpack", weight: "", category: "pack" },
  ]);
  const [wornWeight, setWornWeight] = useState<string>("");
  const [result, setResult] = useState<CampingGearResult | null>(null);

  const addItem = () => {
    setItems([...items, { name: `Item ${items.length + 1}`, weight: "", category: "other" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculate = () => {
    const wornWeightNum = parseFloat(wornWeight) || 0;
    let totalWeight = 0;
    let baseWeight = 0;
    const processedItems: Array<{ name: string; weight: number }> = [];

    for (const item of items) {
      const weight = parseFloat(item.weight) || 0;
      if (weight === 0) continue;

      totalWeight += weight;

      // Base weight excludes consumables and worn items
      if (item.category !== "consumable" && item.category !== "worn") {
        baseWeight += weight;
      }

      processedItems.push({
        name: item.name,
        weight,
      });
    }

    // Add worn weight
    totalWeight += wornWeightNum;

    // Pack weight category
    let packWeightCategory = "";
    if (baseWeight < 4.5) {
      packWeightCategory = "🏆 Ultralight (<10 lbs base)";
    } else if (baseWeight < 9) {
      packWeightCategory = "✅ Lightweight (10-20 lbs base)";
    } else if (baseWeight < 13.5) {
      packWeightCategory = "⚖️ Traditional (20-30 lbs base)";
    } else {
      packWeightCategory = "⚠️ Heavy (>30 lbs base)";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🎒 Total pack weight: ${(totalWeight).toFixed(2)} kg (${(totalWeight * 2.205).toFixed(1)} lbs)`);
    recommendations.push(`📦 Base weight: ${(baseWeight).toFixed(2)} kg (${(baseWeight * 2.205).toFixed(1)} lbs)`);
    recommendations.push(`👕 Worn weight: ${wornWeightNum.toFixed(2)} kg (${(wornWeightNum * 2.205).toFixed(1)} lbs)`);

    if (baseWeight > 9) {
      recommendations.push("⚠️ Consider ultralight alternatives for big three (tent, bag, pack)");
      recommendations.push("🔪 Look for multi-use items to reduce gear count");
    }

    if (baseWeight < 4.5) {
      recommendations.push("🏆 Excellent ultralight setup!");
    }

    recommendations.push("📊 Aim for base weight under 10 lbs for comfortable hiking");
    recommendations.push("⚖️ Every gram counts on long trips");

    setResult({
      items: processedItems,
      totalWeight,
      baseWeight: parseFloat(baseWeight.toFixed(2)),
      wornWeight: wornWeightNum,
      consumables: 0,
      packWeightCategory,
      recommendations,
    });
  };

  const reset = () => {
    setItems([
      { name: "Tent", weight: "", category: "shelter" },
      { name: "Sleeping Bag", weight: "", category: "sleep" },
      { name: "Backpack", weight: "", category: "pack" },
    ]);
    setWornWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip
          </h1>
          <p className="text-muted-foreground">
            Pack smart with our Camping Gear Weight Calculator. List all your gear items
            with individual weights to calculate total pack weight and identify heavy items —
            helping backpackers and campers stay within comfortable carry limits.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Gear Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    + Add Item
                  </Button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <Input
                          value={item.name}
                          onChange={(e) => updateItem(index, "name", e.target.value)}
                          className="w-32"
                          placeholder="Item name"
                        />
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Weight (kg)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.weight}
                            onChange={(e) => updateItem(index, "weight", e.target.value)}
                            placeholder="0.5"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Category</Label>
                          <select
                            value={item.category}
                            onChange={(e) => updateItem(index, "category", e.target.value)}
                            className="w-full p-2 border rounded-md bg-background text-sm"
                          >
                            <option value="shelter">Shelter</option>
                            <option value="sleep">Sleep System</option>
                            <option value="pack">Pack</option>
                            <option value="cooking">Cooking</option>
                            <option value="clothing">Clothing</option>
                            <option value="consumable">Consumable</option>
                            <option value="worn">Worn (not in pack)</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="worn-weight">Worn Weight (clothes, shoes, etc.)</Label>
                <Input
                  id="worn-weight"
                  type="number"
                  step="0.1"
                  value={wornWeight}
                  onChange={(e) => setWornWeight(e.target.value)}
                  placeholder="e.g., 1.5"
                />
                <p className="text-xs text-muted-foreground">
                  Items worn on body, not in pack
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Pack Weight Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.baseWeight < 4.5 ? "bg-green-100 dark:bg-green-900/20" :
                      result.baseWeight < 9 ? "bg-blue-100 dark:bg-blue-900/20" :
                        result.baseWeight < 13.5 ? "bg-amber-100 dark:bg-amber-900/20" :
                          "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Pack Weight Category</p>
                    <p className="text-lg font-bold mt-1">{result.packWeightCategory}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-lg font-bold">{result.totalWeight.toFixed(2)} kg</p>
                      <p className="text-xs text-muted-foreground">{(result.totalWeight * 2.205).toFixed(1)} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Base</p>
                      <p className="text-lg font-bold">{result.baseWeight.toFixed(2)} kg</p>
                      <p className="text-xs text-muted-foreground">{(result.baseWeight * 2.205).toFixed(1)} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Worn</p>
                      <p className="text-lg font-bold">{result.wornWeight.toFixed(2)} kg</p>
                      <p className="text-xs text-muted-foreground">{(result.wornWeight * 2.205).toFixed(1)} lbs</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Gear List</h4>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {result.items.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{item.name}</span>
                          <span className="font-mono">{item.weight.toFixed(2)} kg</span>
                        </div>
                      ))}
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
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add your gear and click Calculate to see pack weight</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pack Weight Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Base weight:</strong> Total pack weight minus consumables
                  </li>
                  <li>
                    <strong>Ultralight:</strong> Base weight under 4.5 kg (10 lbs)
                  </li>
                  <li>
                    <strong>Lightweight:</strong> Base weight under 9 kg (20 lbs)
                  </li>
                  <li>
                    <strong>Big three:</strong> Tent, sleeping bag, and pack = ~60% of base weight
                  </li>
                  <li>
                    <strong>Rule of thumb:</strong> Pack weight should not exceed 20% of body weight
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Focus on reducing the &quot;big three&quot; first for maximum
                  weight savings. Then look at clothing, cooking gear, and miscellaneous items.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Camping Gear Weight</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">List Your Gear</h3>
                  <p className="text-muted-foreground text-sm">Add each item you plan to bring, including its weight and category (shelter, sleep, cooking, etc.).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Add Worn Weight</h3>
                  <p className="text-muted-foreground text-sm">Enter the weight of clothes and shoes you'll wear (not carried in your pack).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Pack Analysis</h3>
                  <p className="text-muted-foreground text-sm">See your total pack weight, base weight, and personalized recommendations for lighter packing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Benefits of Using This Gear Weight Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🎒 Base Weight Tracking</h3>
                <p className="text-muted-foreground text-sm">Calculate your base weight (pack weight without consumables) to compare against ultralight benchmarks and track gear improvements.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚖️ Pack Weight Categories</h3>
                <p className="text-muted-foreground text-sm">Instantly see if your setup qualifies as ultralight, lightweight, or traditional, with clear targets for improvement.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Item-by-Item Breakdown</h3>
                <p className="text-muted-foreground text-sm">Identify which items contribute most to your pack weight, helping you prioritize upgrades for maximum savings.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🏕️ Smart Recommendations</h3>
                <p className="text-muted-foreground text-sm">Get personalized tips based on your gear list, including suggestions for the "big three" weight-saving opportunities.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Pack Weight Classification Guide</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Base Weight</th>
                    <th className="text-left py-3 px-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🏆 Ultralight</td>
                    <td className="py-3 px-4">Under 4.5 kg (10 lbs)</td>
                    <td className="py-3 px-4">Long-distance hiking, thru-hiking</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">✅ Lightweight</td>
                    <td className="py-3 px-4">4.5-9 kg (10-20 lbs)</td>
                    <td className="py-3 px-4">Weekend trips, backpacking</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">⚖️ Traditional</td>
                    <td className="py-3 px-4">9-13.5 kg (20-30 lbs)</td>
                    <td className="py-3 px-4">Car camping, short hikes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">⚠️ Heavy</td>
                    <td className="py-3 px-4">Over 13.5 kg (30+ lbs)</td>
                    <td className="py-3 px-4">Expedition camping, winter trips</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Camping Gear Weight FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is base weight in backpacking?</h3>
                <p className="text-muted-foreground text-sm">Base weight is your total pack weight minus consumables (food, water, fuel). It's the standard measurement for comparing gear setups because consumables vary by trip length.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What are the "big three" in ultralight backpacking?</h3>
                <p className="text-muted-foreground text-sm">The big three are your shelter, sleep system (bag + pad), and backpack. These typically account for 60% of base weight, so upgrading them gives the biggest weight savings.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How much should my backpack weigh?</h3>
                <p className="text-muted-foreground text-sm">A good rule is that total pack weight shouldn't exceed 20% of your body weight. For ultralight backpacking, aim for a base weight under 10 lbs (4.5 kg).</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's the difference between pack weight and base weight?</h3>
                <p className="text-muted-foreground text-sm">Pack weight includes everything you carry (gear + consumables). Base weight excludes consumables. Total weight adds worn weight (clothes, shoes on your body).</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How can I reduce my camping gear weight?</h3>
                <p className="text-muted-foreground text-sm">Start with the big three: get a lighter tent, sleeping bag, and pack. Then eliminate duplicates, choose multi-use items, and cut unnecessary "just in case" gear.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Outdoor & Travel Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/cargo-volume-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Cargo Volume Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate shipping volume and chargeable weight for freight and logistics planning.</p>
              </a>
              <a href="/calculators/container-load-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Container Load Calculator</h3>
                <p className="text-muted-foreground text-sm">Optimize container loading to maximize space utilization for shipping boxes.</p>
              </a>
              <a href="/calculators/carbon-footprint-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Carbon Footprint Calculator</h3>
                <p className="text-muted-foreground text-sm">Measure your environmental impact from travel, home energy, and lifestyle choices.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
