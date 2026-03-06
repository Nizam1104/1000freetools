"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BodySurfaceAreaCalculator() {
  const [height, setHeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "inches">("cm");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [formula, setFormula] = useState<string>("mosteller");
  const [bsa, setBsa] = useState<number | null>(null);

  const calculate = () => {
    let heightValue = parseFloat(height);
    let weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) return;

    // Convert to cm and kg
    if (heightUnit === "inches") {
      heightValue = heightValue * 2.54;
    }
    if (weightUnit === "lbs") {
      weightValue = weightValue * 0.453592;
    }

    let result: number;

    switch (formula) {
      case "mosteller":
        // Mosteller: √(height(cm) × weight(kg) / 3600)
        result = Math.sqrt((heightValue * weightValue) / 3600);
        break;
      case "dubois":
        // DuBois: 0.007184 × h^0.725 × w^0.425
        result = 0.007184 * Math.pow(heightValue, 0.725) * Math.pow(weightValue, 0.425);
        break;
      case "haycock":
        // Haycock: 0.024265 × h^0.3964 × w^0.5378
        result = 0.024265 * Math.pow(heightValue, 0.3964) * Math.pow(weightValue, 0.5378);
        break;
      default:
        result = Math.sqrt((heightValue * weightValue) / 3600);
    }

    setBsa(Math.round(result * 100) / 100);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBsa(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={heightUnit} onValueChange={(v) => setHeightUnit(v as "cm" | "inches")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="formula">Formula</Label>
              <Select value={formula} onValueChange={(v) => setFormula(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mosteller">Mosteller (Most Common)</SelectItem>
                  <SelectItem value="dubois">DuBois & DuBois</SelectItem>
                  <SelectItem value="haycock">Haycock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BSA</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bsa !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Body Surface Area ({formula.charAt(0).toUpperCase() + formula.slice(1)} formula)</p>
                <p className="text-4xl font-bold mt-1">{bsa} <span className="text-lg font-normal">m²</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This BSA Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter height and weight</p>
                  <p>Input your height and weight, selecting the appropriate units (cm/inches and kg/lbs).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose a calculation formula</p>
                  <p>Select from Mosteller (most common), DuBois, or Haycock formula based on your needs.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate and view results</p>
                  <p>Get your body surface area in square meters for medication dosing or clinical use.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              BSA Formulas Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Formula</th>
                    <th className="text-left py-3 px-2 font-semibold">Equation</th>
                    <th className="text-left py-3 px-2 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Mosteller</td>
                    <td className="py-3 px-2">√(height × weight / 3600)</td>
                    <td className="py-3 px-2">General clinical use, chemotherapy</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">DuBois & DuBois</td>
                    <td className="py-3 px-2">0.007184 × h^0.725 × w^0.425</td>
                    <td className="py-3 px-2">Historical standard, research</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Haycock</td>
                    <td className="py-3 px-2">0.024265 × h^0.3964 × w^0.5378</td>
                    <td className="py-3 px-2">Pediatric patients</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Gehan & George</td>
                    <td className="py-3 px-2">0.0235 × h^0.42246 × w^0.51456</td>
                    <td className="py-3 px-2">Alternative method</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Boyd</td>
                    <td className="py-3 px-2">Complex exponential formula</td>
                    <td className="py-3 px-2">Research applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Mosteller is recommended for most clinical applications due to its simplicity and accuracy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Body Surface Area
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is BSA?</h4>
                <p>
                  Body Surface Area (BSA) is the total surface area of the human body, measured in square meters.
                  The average adult BSA is about 1.7 m² for men and 1.6 m² for women. BSA correlates better with
                  metabolic rate and organ size than body weight alone.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why BSA Matters in Medicine</h4>
                <p>
                  BSA is used to calculate medication dosages for drugs with narrow therapeutic windows, such as
                  chemotherapy agents and corticosteroids. It is also used to determine cardiac index, glomerular
                  filtration rate, and fluid requirements for burn patients.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">BSA vs Body Weight</h4>
                <p>
                  Weight-based dosing can lead to overdosing in obese patients and underdosing in very thin patients.
                  BSA accounts for both height and weight, providing a more accurate reflection of metabolic mass
                  and organ function across different body types.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Clinical Applications of BSA
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Chemotherapy dosing</p>
                  <p>Most chemotherapy drugs are dosed per m² of BSA to account for differences in drug metabolism and toxicity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Cardiac index calculation</p>
                  <p>Cardiac output is normalized to BSA to compare heart function across patients of different sizes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Burn treatment</p>
                  <p>Fluid resuscitation for burn patients is calculated based on percentage of BSA affected.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Kidney function (GFR)</p>
                  <p>Glomerular filtration rate is often normalized to 1.73 m² BSA for standardization.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is a normal BSA value?</h4>
                <p>
                  Average BSA for adult men is approximately 1.9 m², and for adult women about 1.6 m². Values
                  typically range from 1.5 to 2.2 m² for most adults. Children have lower BSA values that increase
                  with growth.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Which BSA formula is most accurate?</h4>
                <p>
                  Studies show all major formulas produce similar results for average-sized adults. Mosteller is
                  preferred clinically because it is easy to calculate and remember. Haycock may be more accurate
                  for children and infants.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is BSA used for all medication dosing?</h4>
                <p>
                  No. Most medications use weight-based or fixed dosing. BSA-based dosing is reserved for drugs
                  with narrow therapeutic indices where small dosing errors could cause serious harm, such as
                  chemotherapy and some immunosuppressants.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How is BSA measured directly?</h4>
                <p>
                  Direct measurement uses 3D scanning or the DuBois method with paper cutouts, but these are
                  impractical for routine use. Formulas based on height and weight provide estimates accurate
                  enough for clinical purposes.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does obesity affect BSA accuracy?</h4>
                <p>
                  BSA formulas may overestimate metabolic mass in obese patients because adipose tissue has lower
                  metabolic activity than lean tissue. Some clinicians use adjusted body weight or ideal body
                  weight for BSA calculations in obese patients.
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
                href="/calculators/body-fat-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Body Fat Calculator</span>
                <p className="text-muted-foreground">Estimate body fat percentage using the US Navy method</p>
              </a>
              <a
                href="/calculators/bmi-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">BMI Calculator</span>
                <p className="text-muted-foreground">Calculate body mass index and assess weight status</p>
              </a>
              <a
                href="/calculators/ideal-weight-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ideal Weight Calculator</span>
                <p className="text-muted-foreground">Determine healthy weight range based on height and frame size</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
