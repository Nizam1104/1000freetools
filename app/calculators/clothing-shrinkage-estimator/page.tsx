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

interface ShrinkageResult {
  fabricType: string;
  originalDimensions: { length: number; width: number };
  shrinkageRate: { length: number; width: number };
  newDimensions: { length: number; width: number };
  changeInches: { length: number; width: number };
  careRecommendations: string[];
  washTempImpact: string;
}

const fabricShrinkageRates: Record<string, { length: number; width: number; description: string }> = {
  cotton: { length: 5, width: 3, description: "Natural fiber, prone to shrinkage" },
  cottonPreshrunk: { length: 2, width: 1, description: "Pre-shrunk cotton, minimal shrinkage" },
  wool: { length: 8, width: 5, description: "High shrinkage, especially in hot water" },
  linen: { length: 4, width: 3, description: "Natural fiber, moderate shrinkage" },
  polyester: { length: 1, width: 1, description: "Synthetic, minimal shrinkage" },
  nylon: { length: 1, width: 1, description: "Synthetic, very stable" },
  rayon: { length: 6, width: 4, description: "Semi-synthetic, significant shrinkage" },
  silk: { length: 3, width: 2, description: "Delicate, moderate shrinkage" },
  blend5050: { length: 3, width: 2, description: "Cotton/poly blend, reduced shrinkage" },
  denim: { length: 7, width: 4, description: "Heavy cotton, significant shrinkage" },
};

const washTempMultipliers: Record<string, number> = {
  cold: 0.5,
  warm: 1.0,
  hot: 1.5,
  boiling: 2.0,
};

export default function ClothingShrinkageEstimatorPage() {
  const [fabricType, setFabricType] = useState<string>("cotton");
  const [originalLength, setOriginalLength] = useState<string>("");
  const [originalWidth, setOriginalWidth] = useState<string>("");
  const [washTemp, setWashTemp] = useState<string>("warm");
  const [dryMethod, setDryMethod] = useState<string>("machine");
  const [result, setResult] = useState<ShrinkageResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(originalLength) || 0;
    const widthNum = parseFloat(originalWidth) || 0;

    if (lengthNum === 0 || widthNum === 0) return;

    const baseRate = fabricShrinkageRates[fabricType];
    const tempMultiplier = washTempMultipliers[washTemp] || 1.0;

    // Adjust for drying method
    let dryMultiplier = 1.0;
    if (dryMethod === "machine-high") dryMultiplier = 1.3;
    else if (dryMethod === "machine-low") dryMultiplier = 1.1;
    else if (dryMethod === "air") dryMultiplier = 0.7;

    // Calculate shrinkage
    const lengthShrinkRate = baseRate.length * tempMultiplier * dryMultiplier;
    const widthShrinkRate = baseRate.width * tempMultiplier * dryMultiplier;

    // Calculate new dimensions
    const newLength = lengthNum * (1 - lengthShrinkRate / 100);
    const newWidth = widthNum * (1 - widthShrinkRate / 100);

    // Calculate change
    const lengthChange = lengthNum - newLength;
    const widthChange = widthNum - newWidth;

    // Wash temp impact
    let washTempImpact = "";
    if (washTemp === "cold") {
      washTempImpact = "Cold water minimizes shrinkage - best for delicate fabrics";
    } else if (washTemp === "warm") {
      washTempImpact = "Warm water is standard - expect normal shrinkage";
    } else if (washTemp === "hot") {
      washTempImpact = "Hot water increases shrinkage significantly - use with caution";
    } else {
      washTempImpact = "Boiling water causes maximum shrinkage - not recommended";
    }

    // Care recommendations
    const careRecommendations: string[] = [];

    if (fabricType === "cotton" || fabricType === "denim") {
      careRecommendations.push("Wash in cold water to minimize shrinkage");
      careRecommendations.push("Air dry or tumble dry low");
      careRecommendations.push("Remove from dryer while slightly damp");
    } else if (fabricType === "wool") {
      careRecommendations.push("Hand wash or dry clean only");
      careRecommendations.push("Never use hot water or high heat");
      careRecommendations.push("Lay flat to dry to maintain shape");
    } else if (fabricType === "silk") {
      careRecommendations.push("Dry clean recommended");
      careRecommendations.push("If washing, use cold water and gentle cycle");
      careRecommendations.push("Never wring or twist");
    } else if (fabricType === "polyester" || fabricType === "nylon") {
      careRecommendations.push("Low heat drying recommended");
      careRecommendations.push("Remove promptly to prevent wrinkles");
    }

    if (dryMethod === "machine-high") {
      careRecommendations.push("⚠️ High heat drying significantly increases shrinkage");
    }

    setResult({
      fabricType: fabricShrinkageRates[fabricType].description,
      originalDimensions: { length: lengthNum, width: widthNum },
      shrinkageRate: { length: parseFloat(lengthShrinkRate.toFixed(1)), width: parseFloat(widthShrinkRate.toFixed(1)) },
      newDimensions: { length: parseFloat(newLength.toFixed(2)), width: parseFloat(newWidth.toFixed(2)) },
      changeInches: { length: parseFloat(lengthChange.toFixed(2)), width: parseFloat(widthChange.toFixed(2)) },
      careRecommendations,
      washTempImpact,
    });
  };

  const reset = () => {
    setOriginalLength("");
    setOriginalWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink
          </h1>
          <p className="text-muted-foreground">
            Avoid ruining your clothes with our Clothing Shrinkage Estimator.
            Enter fabric type, washing temperature, and garment dimensions to predict
            post-wash shrinkage — helping you buy the right size and care for your wardrobe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fabric-type">Fabric Type</Label>
                <Select value={fabricType} onValueChange={setFabricType}>
                  <SelectTrigger id="fabric-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cotton">Cotton (5% length, 3% width)</SelectItem>
                    <SelectItem value="cottonPreshrunk">Cotton (Pre-shrunk)</SelectItem>
                    <SelectItem value="denim">Denim (7% length, 4% width)</SelectItem>
                    <SelectItem value="wool">Wool (8% length, 5% width)</SelectItem>
                    <SelectItem value="linen">Linen (4% length, 3% width)</SelectItem>
                    <SelectItem value="rayon">Rayon (6% length, 4% width)</SelectItem>
                    <SelectItem value="silk">Silk (3% length, 2% width)</SelectItem>
                    <SelectItem value="blend5050">50/50 Cotton/Poly Blend</SelectItem>
                    <SelectItem value="polyester">Polyester (1% length, 1% width)</SelectItem>
                    <SelectItem value="nylon">Nylon (1% length, 1% width)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length (inches)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={originalLength}
                    onChange={(e) => setOriginalLength(e.target.value)}
                    placeholder="e.g., 28"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width (inches)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={originalWidth}
                    onChange={(e) => setOriginalWidth(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="wash-temp">Wash Temperature</Label>
                  <Select value={washTemp} onValueChange={setWashTemp}>
                    <SelectTrigger id="wash-temp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold">Cold (60-80°F)</SelectItem>
                      <SelectItem value="warm">Warm (90-110°F)</SelectItem>
                      <SelectItem value="hot">Hot (130-150°F)</SelectItem>
                      <SelectItem value="boiling">Boiling (212°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dry-method">Drying Method</Label>
                  <Select value={dryMethod} onValueChange={setDryMethod}>
                    <SelectTrigger id="dry-method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air">Air Dry</SelectItem>
                      <SelectItem value="machine-low">Machine Low Heat</SelectItem>
                      <SelectItem value="machine">Machine Medium Heat</SelectItem>
                      <SelectItem value="machine-high">Machine High Heat</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Shrinkage Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Length</p>
                      <p className="text-sm line-through text-muted-foreground">{result.originalDimensions.length}&quot;</p>
                      <p className="text-2xl font-bold text-red-600">{result.newDimensions.length}&quot;</p>
                      <p className="text-xs text-red-600">-{result.changeInches.length}&quot; ({result.shrinkageRate.length}%)</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Width</p>
                      <p className="text-sm line-through text-muted-foreground">{result.originalDimensions.width}&quot;</p>
                      <p className="text-2xl font-bold text-red-600">{result.newDimensions.width}&quot;</p>
                      <p className="text-xs text-red-600">-{result.changeInches.width}&quot; ({result.shrinkageRate.width}%)</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Fabric:</p>
                    <p className="text-sm text-muted-foreground">{result.fabricType}</p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {result.washTempImpact}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Care Recommendations</h4>
                    <ul className="space-y-1">
                      {result.careRecommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter garment details and click Calculate to see shrinkage estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Fabric Shrinkage Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Cotton:</strong> Natural fiber that shrinks 3-5% typically,
                    up to 10% in hot water
                  </li>
                  <li>
                    <strong>Wool:</strong> Highest shrinkage risk - can felt in hot water
                  </li>
                  <li>
                    <strong>Synthetics:</strong> Polyester and nylon are very stable
                  </li>
                  <li>
                    <strong>Blends:</strong> Cotton/poly blends shrink less than 100% cotton
                  </li>
                  <li>
                    <strong>Pre-shrunk:</strong> Look for &quot;pre-shrunk&quot; label for minimal shrinkage
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always wash new clothes in cold water first to
                  minimize initial shrinkage. When in doubt, air dry!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Clothing Shrinkage Estimator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your fabric type</p>
                    <p>Choose from common fabrics like cotton, wool, polyester, or blends. Each fabric has different shrinkage characteristics based on fiber content and construction.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter garment dimensions and washing settings</p>
                    <p>Input the current length and width in inches. Select your wash temperature and drying method. Hotter water and higher heat cause more shrinkage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see results</p>
                    <p>The estimator shows predicted new dimensions, percentage shrinkage, and care recommendations specific to your fabric type.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Fabric Shrinkage Rates Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Fabric Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Length Shrinkage</th>
                      <th className="text-left py-3 px-2 font-semibold">Width Shrinkage</th>
                      <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Wool</td>
                      <td className="py-3 px-2">8 percent</td>
                      <td className="py-3 px-2">5 percent</td>
                      <td className="py-3 px-2"><span className="text-red-600 font-medium">High</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Denim</td>
                      <td className="py-3 px-2">7 percent</td>
                      <td className="py-3 px-2">4 percent</td>
                      <td className="py-3 px-2"><span className="text-red-600 font-medium">High</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Rayon</td>
                      <td className="py-3 px-2">6 percent</td>
                      <td className="py-3 px-2">4 percent</td>
                      <td className="py-3 px-2"><span className="text-yellow-600 font-medium">Moderate</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cotton</td>
                      <td className="py-3 px-2">5 percent</td>
                      <td className="py-3 px-2">3 percent</td>
                      <td className="py-3 px-2"><span className="text-yellow-600 font-medium">Moderate</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Linen</td>
                      <td className="py-3 px-2">4 percent</td>
                      <td className="py-3 px-2">3 percent</td>
                      <td className="py-3 px-2"><span className="text-yellow-600 font-medium">Moderate</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Silk</td>
                      <td className="py-3 px-2">3 percent</td>
                      <td className="py-3 px-2">2 percent</td>
                      <td className="py-3 px-2"><span className="text-blue-600 font-medium">Low</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Polyester/Nylon</td>
                      <td className="py-3 px-2">1 percent</td>
                      <td className="py-3 px-2">1 percent</td>
                      <td className="py-3 px-2"><span className="text-green-600 font-medium">Very Low</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Rates shown are for warm water wash with machine drying. Cold water and air drying reduce shrinkage significantly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Clothes Shrink
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fiber Relaxation</h4>
                  <p>
                    During manufacturing, fibers are stretched under tension. When exposed to heat and moisture, they relax back to their natural length. This is the primary cause of shrinkage in natural fibers like cotton and wool. Pre-shrunk fabrics have undergone this process before garment construction.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Felting in Wool</h4>
                  <p>
                    Wool fibers have microscopic scales that interlock when agitated in warm water. This felting process causes significant, irreversible shrinkage. Wool garments often specify &quot;dry clean only&quot; or &quot;hand wash cold&quot; to prevent felting.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Heat Effects on Synthetics</h4>
                  <p>
                    Synthetic fibers like polyester and nylon are heat-set during manufacturing. They resist shrinkage under normal washing conditions. However, very high dryer temperatures can still cause some shrinkage or damage to synthetic fabrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips to Prevent Shrinkage
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Wash in cold water</p>
                    <p>Cold water (60-80 F) minimizes fiber relaxation and prevents felting. Modern detergents work effectively in cold water. This is the single most effective step to prevent shrinkage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Air dry when possible</p>
                    <p>Hanging or laying flat to dry eliminates dryer heat entirely. This is essential for wool, rayon, and other high-shrinkage fabrics. Use a drying rack or clothesline.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Buy pre-shrunk or sanforized fabrics</p>
                    <p>Pre-shrunk cotton and sanforized denim have already undergone shrinkage during manufacturing. These fabrics typically shrink less than 2 percent with normal washing.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Size up for high-shrinkage fabrics</p>
                    <p>If buying 100 percent cotton or denim that isn&apos;t pre-shrunk, consider buying one size larger. Account for 5-7 percent shrinkage in length and 3-4 percent in width.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does all clothing shrink?</h4>
                  <p>
                    Most natural fiber clothing shrinks to some degree. Cotton, wool, linen, and rayon all shrink with heat and moisture. Synthetic fibers like polyester and nylon are much more stable. Blends shrink less than 100 percent natural fibers. Pre-shrunk fabrics minimize but don&apos;t eliminate shrinkage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I unshrink clothes?</h4>
                  <p>
                    Sometimes. Soak shrunken wool or cotton in lukewarm water with hair conditioner or baby shampoo for 30 minutes. Gently stretch back to original size and lay flat to dry. This works best on wool. Cotton that&apos;s severely shrunk is difficult to restore completely.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much does denim shrink?</h4>
                  <p>
                    Raw (unwashed) denim can shrink 7-10 percent in length and 4-5 percent in width during the first wash. Sanforized denim shrinks 1-3 percent. Most jeans are sanforized. Check the label. If it says &quot;shrink-to-fit&quot; or &quot;raw,&quot; expect significant shrinkage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does washing in hot water always cause shrinkage?</h4>
                  <p>
                    Hot water increases shrinkage risk but doesn&apos;t guarantee it. Pre-shrunk and synthetic fabrics handle hot water well. Natural fibers that haven&apos;t been pre-shrunk will shrink more in hot water. The dryer&apos;s heat often causes more shrinkage than the wash temperature.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why do clothes shrink more in length than width?</h4>
                  <p>
                    Fabric is woven or knitted with lengthwise (warp) and crosswise (weft) threads. The warp threads are under more tension during manufacturing, so they have more potential to relax and shrink. This is why length shrinkage typically exceeds width shrinkage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/fabric-yardage-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Fabric Yardage Calculator</span>
                  <p className="text-muted-foreground">Calculate how much fabric you need for sewing projects</p>
                </a>
                <a
                  href="/calculators/washing-machine-capacity-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Washing Machine Capacity Calculator</span>
                  <p className="text-muted-foreground">Determine optimal load sizes for your washing machine</p>
                </a>
                <a
                  href="/calculators/dryer-time-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Dryer Time Estimator</span>
                  <p className="text-muted-foreground">Estimate drying time based on fabric type and load size</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
