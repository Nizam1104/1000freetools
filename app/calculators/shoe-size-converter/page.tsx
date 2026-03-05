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

interface ShoeSizeResult {
  usSize: number;
  gender: string;
  ukSize: string;
  euSize: number;
  cmSize: number;
  jpSize: string;
  conversions: Array<{ region: string; size: string }>;
}

const shoeSizeChart: Record<string, { uk: string; eu: number; cm: number; jp: string }> = {
  "3.5": { uk: "3", eu: 36, cm: 22.5, jp: "22.5" },
  "4": { uk: "3.5", eu: 36.5, cm: 23, jp: "23" },
  "4.5": { uk: "4", eu: 37.5, cm: 23.5, jp: "23.5" },
  "5": { uk: "4.5", eu: 38, cm: 24, jp: "24" },
  "5.5": { uk: "5", eu: 38.5, cm: 24.5, jp: "24.5" },
  "6": { uk: "5.5", eu: 39, cm: 25, jp: "25" },
  "6.5": { uk: "6", eu: 40, cm: 25.5, jp: "25.5" },
  "7": { uk: "6.5", eu: 40.5, cm: 26, jp: "26" },
  "7.5": { uk: "7", eu: 41, cm: 26.5, jp: "26.5" },
  "8": { uk: "7.5", eu: 42, cm: 27, jp: "27" },
  "8.5": { uk: "8", eu: 42.5, cm: 27.5, jp: "27.5" },
  "9": { uk: "8.5", eu: 43, cm: 28, jp: "28" },
  "9.5": { uk: "9", eu: 44, cm: 28.5, jp: "28.5" },
  "10": { uk: "9.5", eu: 44.5, cm: 29, jp: "29" },
  "10.5": { uk: "10", eu: 45, cm: 29.5, jp: "29.5" },
  "11": { uk: "10.5", eu: 46, cm: 30, jp: "30" },
  "11.5": { uk: "11", eu: 46.5, cm: 30.5, jp: "30.5" },
  "12": { uk: "11.5", eu: 47, cm: 31, jp: "31" },
  "13": { uk: "12.5", eu: 48, cm: 32, jp: "32" },
  "14": { uk: "13.5", eu: 49, cm: 33, jp: "33" },
};

export default function ShoeSizeConverterPage() {
  const [inputSize, setInputSize] = useState<string>("");
  const [gender, setGender] = useState<string>("men");
  const [fromRegion, setFromRegion] = useState<string>("us");
  const [result, setResult] = useState<ShoeSizeResult | null>(null);

  const calculate = () => {
    const sizeNum = parseFloat(inputSize);
    if (isNaN(sizeNum)) return;

    // Convert input to US size first
    let usSize = sizeNum;

    if (fromRegion === "uk") {
      usSize = sizeNum + 0.5;
    } else if (fromRegion === "eu") {
      // Find closest EU size
      for (const [us, data] of Object.entries(shoeSizeChart)) {
        if (Math.abs(data.eu - sizeNum) < 0.5) {
          usSize = parseFloat(us);
          break;
        }
      }
    } else if (fromRegion === "cm") {
      // Find closest CM size
      for (const [us, data] of Object.entries(shoeSizeChart)) {
        if (Math.abs(data.cm - sizeNum) < 0.25) {
          usSize = parseFloat(us);
          break;
        }
      }
    }

    // Get conversions
    const sizeKey = usSize.toString();
    const conversion = shoeSizeChart[sizeKey];

    let ukSize = "-";
    let euSize = 0;
    let cmSize = 0;
    let jpSize = "-";

    if (conversion) {
      ukSize = conversion.uk;
      euSize = conversion.eu;
      cmSize = conversion.cm;
      jpSize = conversion.jp;
    } else {
      // Approximate for sizes not in chart
      ukSize = (usSize - 0.5).toString();
      euSize = Math.round(33 + usSize * 1.33);
      cmSize = 22 + (usSize - 3.5) * 0.85;
      jpSize = cmSize.toFixed(1);
    }

    // Gender adjustments
    if (gender === "women") {
      usSize = usSize + 1.5; // Women's sizes run 1.5 higher
      ukSize = (parseFloat(ukSize) + 1.5).toString();
    }

    const conversions = [
      { region: "US", size: usSize.toFixed(1) },
      { region: "UK", size: ukSize },
      { region: "EU", size: euSize.toFixed(0) },
      { region: "CM", size: cmSize.toFixed(1) },
      { region: "Japan", size: jpSize },
    ];

    setResult({
      usSize,
      gender,
      ukSize,
      euSize,
      cmSize,
      jpSize,
      conversions,
    });
  };

  const reset = () => {
    setInputSize("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM
          </h1>
          <p className="text-muted-foreground">
            Shop shoes from any country with confidence using our Shoe Size Converter.
            Instantly convert between US, UK, European, and centimeter shoe sizes for
            men, women, and children — eliminating sizing confusion when shopping
            internationally or online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men&apos;s</SelectItem>
                    <SelectItem value="women">Women&apos;s</SelectItem>
                    <SelectItem value="youth">Youth/Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="from-region">From Region</Label>
                  <Select value={fromRegion} onValueChange={setFromRegion}>
                    <SelectTrigger id="from-region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">US</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="eu">EU</SelectItem>
                      <SelectItem value="cm">CM/JP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="input-size">Your Size</Label>
                  <Input
                    id="input-size"
                    type="number"
                    step="0.5"
                    value={inputSize}
                    onChange={(e) => setInputSize(e.target.value)}
                    placeholder="e.g., 9"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  How to Measure:
                </p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Place foot on paper, trace outline</li>
                  <li>Measure heel to longest toe</li>
                  <li>Use cm measurement for accuracy</li>
                  <li>Measure both feet, use larger</li>
                </ol>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Convert
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Size Conversions</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {result.conversions.map((conv, i) => (
                      <div key={i} className="p-4 bg-primary/10 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">{conv.region}</p>
                        <p className="text-3xl font-bold text-primary">{conv.size}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Converted for: <span className="font-semibold capitalize">{result.gender}&apos;s</span> sizing
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> Sizes vary by brand. When in doubt,
                      measure your foot in cm and compare to the brand&apos;s size chart.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Size Notes</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• US & UK differ by ~0.5-1 size</li>
                      <li>• EU sizes increase by ~0.67 per US size</li>
                      <li>• CM/JP = foot length in centimeters</li>
                      <li>• Women&apos;s US = Men&apos;s US + 1.5</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your size and click Convert to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Regional Size Systems
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>US:</strong> Based on barleycorn (1/3 inch), different for men/women
                  </li>
                  <li>
                    <strong>UK:</strong> Similar to US but starts from different zero point
                  </li>
                  <li>
                    <strong>EU:</strong> Based on foot length in Paris points (2/3 cm)
                  </li>
                  <li>
                    <strong>CM/JP:</strong> Direct foot length measurement - most accurate
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Athletic shoes often run small. Consider going
                  up 0.5 size for running shoes. Dress shoes may require breaking in.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
