"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DimWeightResult {
  dimensions: { length: number; width: number; height: number };
  actualWeight: number;
  dimWeight: number;
  billableWeight: number;
  carrier: string;
  dimFactor: number;
  savings: string;
  recommendations: string[];
}

export default function DimensionalWeightCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [carrier, setCarrier] = useState<string>("fedex");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<DimWeightResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(height) || 0;
    const actualWeightNum = parseFloat(actualWeight) || 0;

    if (lengthNum === 0 || widthNum === 0 || heightNum === 0) return;

    // DIM factors by carrier
    const dimFactors: Record<string, number> = {
      fedex: 139,
      ups: 139,
      dhl: 139,
      usps: 166,
      freight: 139,
    };
    const dimFactor = dimFactors[carrier] || 139;

    // Calculate dimensional weight
    let dimWeight = 0;

    if (unit === "inches") {
      // (L × W × H) / DIM Factor
      dimWeight = (lengthNum * widthNum * heightNum) / dimFactor;
    } else if (unit === "cm") {
      // (L × W × H) / 5000 (international standard)
      dimWeight = (lengthNum * widthNum * heightNum) / 5000;
      // Convert to lbs
      dimWeight = dimWeight * 2.205;
    }

    // Billable weight is the greater of actual or dimensional
    const billableWeight = Math.max(actualWeightNum, dimWeight);

    // Determine which weight applies
    let savings = "";
    if (dimWeight > actualWeightNum) {
      savings = `⚠️ DIM weight applies (+${(dimWeight - actualWeightNum).toFixed(1)} lbs)`;
    } else {
      savings = `✅ Actual weight applies (DIM would be +${(dimWeight - actualWeightNum).toFixed(1)} lbs)`;
    }

    // Recommendations
    const recommendations: string[] = [];

    if (dimWeight > actualWeightNum) {
      recommendations.push("📦 Your package is lightweight but bulky - DIM pricing applies");
      recommendations.push("💡 Consider smaller packaging to reduce DIM weight");
      recommendations.push("🗑️ Remove excess air/void fill if possible");
    } else {
      recommendations.push("✅ Dense package - you're paying for actual weight");
    }

    if (carrier === "usps") {
      recommendations.push("📬 USPS has higher DIM factor (166) - may be cheaper for light packages");
    }

    recommendations.push(`📏 Current volume: ${(lengthNum * widthNum * heightNum).toFixed(0)} cubic ${unit}`);

    setResult({
      dimensions: { length: lengthNum, width: widthNum, height: heightNum },
      actualWeight: actualWeightNum,
      dimWeight: parseFloat(dimWeight.toFixed(1)),
      billableWeight: parseFloat(billableWeight.toFixed(1)),
      carrier,
      dimFactor,
      savings,
      recommendations,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setActualWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Dimensional Weight Calculator – Calculate DIM Weight for FedEx, UPS & DHL
          </h1>
          <p className="text-muted-foreground">
            Calculate the correct billed weight for your shipments with our Dimensional Weight Calculator.
            Enter package dimensions and select your carrier to apply the correct DIM factor and determine
            whether actual or dimensional weight applies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="unit">Dimension Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Select value={carrier} onValueChange={setCarrier}>
                    <SelectTrigger id="carrier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedex">FedEx (DIM: 139)</SelectItem>
                      <SelectItem value="ups">UPS (DIM: 139)</SelectItem>
                      <SelectItem value="dhl">DHL (DIM: 139)</SelectItem>
                      <SelectItem value="usps">USPS (DIM: 166)</SelectItem>
                      <SelectItem value="freight">Freight (DIM: 139)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual-weight">Actual Weight (lbs)</Label>
                <Input
                  id="actual-weight"
                  type="number"
                  step="0.1"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  placeholder="0"
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
              <h3 className="text-lg font-semibold mb-4">DIM Weight Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Actual Weight</p>
                      <p className="text-2xl font-bold">{result.actualWeight} lbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">DIM Weight</p>
                      <p className="text-2xl font-bold">{result.dimWeight} lbs</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg text-center ${result.billableWeight === result.dimWeight
                      ? "bg-amber-100 dark:bg-amber-900/20"
                      : "bg-green-100 dark:bg-green-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Billable Weight</p>
                    <p className="text-4xl font-bold">{result.billableWeight} lbs</p>
                    <p className="text-sm mt-1">{result.savings}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Carrier:</span>
                      <span className="font-semibold uppercase">{result.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">DIM Factor:</span>
                      <span className="font-semibold">{result.dimFactor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensions:</span>
                      <span className="font-semibold">
                        {result.dimensions.length}×{result.dimensions.width}×{result.dimensions.height} {unit}
                      </span>
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
                  <p>Enter package details and click Calculate to see DIM weight</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Dimensional Weight Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter package dimensions</p>
                    <p>Type the length, width, and height of your package. Select inches or centimeters. Measure at the longest points of each dimension.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select carrier and enter actual weight</p>
                    <p>Choose your shipping carrier (FedEx, UPS, DHL, USPS, or Freight). Each uses different DIM factors. Enter the package's actual weight in pounds.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review results</p>
                    <p>Click Calculate to see dimensional weight, billable weight, and whether DIM or actual weight applies. Follow recommendations to reduce shipping costs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Carrier DIM Factors Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Carrier</th>
                      <th className="text-left py-3 px-2 font-semibold">DIM Factor (inches)</th>
                      <th className="text-left py-3 px-2 font-semibold">DIM Factor (cm)</th>
                      <th className="text-left py-3 px-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">FedEx</td>
                      <td className="py-3 px-2">139</td>
                      <td className="py-3 px-2">5000</td>
                      <td className="py-3 px-2">Standard for all domestic and international</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">UPS</td>
                      <td className="py-3 px-2">139</td>
                      <td className="py-3 px-2">5000</td>
                      <td className="py-3 px-2">Applied to all services</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">DHL</td>
                      <td className="py-3 px-2">139</td>
                      <td className="py-3 px-2">5000</td>
                      <td className="py-3 px-2">International shipments</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">USPS</td>
                      <td className="py-3 px-2">166</td>
                      <td className="py-3 px-2">5000</td>
                      <td className="py-3 px-2">Only for Priority Mail, larger packages</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Freight</td>
                      <td className="py-3 px-2">139</td>
                      <td className="py-3 px-2">5000</td>
                      <td className="py-3 px-2">LTL and FTL shipments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: USPS has a higher DIM factor (166), which means lower dimensional weight and potentially lower costs for lightweight, bulky packages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dimensional Weight
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Dimensional weight (DIM weight) is a pricing technique carriers use to charge for the space a package occupies rather than just its actual weight. Lightweight but bulky packages cost more to ship because they take up valuable space in trucks and planes.
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Carriers Use DIM Weight</h4>
                  <p>
                    A truck can only hold so many packages. A box of pillows takes the same space as a box of books but weighs much less. Without DIM pricing, shipping lightweight bulky items would be underpriced. DIM weight ensures carriers charge fairly for the space used.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How DIM Weight Is Calculated</h4>
                  <p>
                    Formula (inches): (Length x Width x Height) / DIM Factor = DIM Weight in lbs. For FedEx/UPS with DIM factor 139: a 20x15x10 inch box = 3000/139 = 21.6 lbs DIM weight. If actual weight is 10 lbs, you pay for 22 lbs (rounded up).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Billable Weight</h4>
                  <p>
                    Carriers charge based on the greater of actual weight or dimensional weight. Dense packages (actual weight higher) are charged by weight. Light, bulky packages (DIM weight higher) are charged by size. This is why packaging matters.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">International DIM Factor</h4>
                  <p>
                    International shipments typically use a DIM factor of 5000 when measuring in centimeters. This is roughly equivalent to 139 in inches. The formula is (L x W x H in cm) / 5000 = DIM weight in kg, then converted to lbs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                DIM Weight Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Package Size</th>
                      <th className="text-left py-3 px-2 font-semibold">Actual Weight</th>
                      <th className="text-left py-3 px-2 font-semibold">DIM Weight</th>
                      <th className="text-left py-3 px-2 font-semibold">Billable Weight</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">12x10x8 in</td>
                      <td className="py-3 px-2">5 lbs</td>
                      <td className="py-3 px-2">7 lbs</td>
                      <td className="py-3 px-2">7 lbs (DIM applies)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">16x12x10 in</td>
                      <td className="py-3 px-2">15 lbs</td>
                      <td className="py-3 px-2">14 lbs</td>
                      <td className="py-3 px-2">15 lbs (actual applies)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">20x16x12 in</td>
                      <td className="py-3 px-2">8 lbs</td>
                      <td className="py-3 px-2">28 lbs</td>
                      <td className="py-3 px-2">28 lbs (DIM applies)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">24x18x14 in</td>
                      <td className="py-3 px-2">25 lbs</td>
                      <td className="py-3 px-2">44 lbs</td>
                      <td className="py-3 px-2">44 lbs (DIM applies)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">10x8x6 in</td>
                      <td className="py-3 px-2">12 lbs</td>
                      <td className="py-3 px-2">3 lbs</td>
                      <td className="py-3 px-2">12 lbs (actual applies)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips to Reduce DIM Weight Charges
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use the Smallest Box Possible</p>
                    <p>Every inch matters. A box that's 2 inches too large in each dimension can increase DIM weight by 30%. Measure your item and choose a box with minimal extra space.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Remove Excess Air from Poly Mailers</p>
                    <p>For soft goods, use poly mailers instead of boxes when possible. Squeeze out air before sealing. Some sellers use vacuum bags for clothing to minimize volume.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider USPS for Lightweight Items</p>
                    <p>USPS uses a DIM factor of 166 vs. 139 for FedEx/UPS. For a 20x16x12 box, USPS DIM weight is 23 lbs vs. 28 lbs for FedEx. This can save money on lightweight shipments.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Negotiate DIM Factors for High Volume</p>
                    <p>High-volume shippers can sometimes negotiate better DIM factors with carriers. If you ship hundreds of packages monthly, ask your rep about custom pricing.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Audit Your Packaging Regularly</p>
                    <p>Review your most-shipped items quarterly. Look for patterns where DIM weight applies. Small packaging changes across many shipments add up to significant savings.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "When does DIM weight apply?",
    answer: "DIM weight applies when it's greater than actual weight. For FedEx and UPS, DIM pricing applies to all packages. For USPS, it only applies to Priority Mail packages larger than 1 cubic foot (1,728 cubic inches).",
  },
{
    question: "How do carriers measure package dimensions?",
    answer: "Carriers measure at the longest points of each dimension, including any bulges or irregularities. They round up to the nearest whole inch. A box measuring 10.2 x 8.5 x 6.1 inches is billed as 11 x 9 x 7 inches.",
  },
{
    question: "Why is USPS DIM factor higher?",
    answer: "USPS has a DIM factor of 166 vs. 139 for private carriers. This means USPS dimensional weight calculations result in lower weights. For bulky, lightweight items, USPS is often cheaper due to this more favorable factor.",
  },
{
    question: "Do international shipments use DIM weight?",
    answer: "Yes. International carriers use DIM weight with a metric formula: (L x W x H in cm) / 5000 = DIM weight in kg. This is roughly equivalent to the 139 factor used domestically in inches.",
  },
{
    question: "Can I dispute DIM weight charges?",
    answer: "If you believe a package was measured incorrectly, you can request a re-measurement. Carriers use automated systems that can make errors. Take photos of your packaged item with a measuring tape before shipping as evidence.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
