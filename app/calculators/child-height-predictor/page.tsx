"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ChildHeightPredictor() {
  const [fatherHeight, setFatherHeight] = useState<string>("");
  const [motherHeight, setMotherHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [predictedHeight, setPredictedHeight] = useState<number | null>(null);
  const [heightRange, setHeightRange] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const father = parseFloat(fatherHeight);
    const mother = parseFloat(motherHeight);

    if (isNaN(father) || isNaN(mother) || father <= 0 || mother <= 0 || !gender) return;

    let predicted: number;

    // Mid-parental height method
    if (gender === "boy") {
      predicted = (father + mother + 13) / 2;
    } else {
      predicted = (father + mother - 13) / 2;
    }

    setPredictedHeight(Math.round(predicted * 10) / 10);
    setHeightRange({
      min: Math.round((predicted - 10) * 10) / 10,
      max: Math.round((predicted + 10) * 10) / 10,
    });
  };

  const reset = () => {
    setFatherHeight("");
    setMotherHeight("");
    setGender("");
    setPredictedHeight(null);
    setHeightRange(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fatherHeight">Father's Height (cm)</Label>
              <Input
                id="fatherHeight"
                type="number"
                placeholder="e.g., 180"
                value={fatherHeight}
                onChange={(e) => setFatherHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="motherHeight">Mother's Height (cm)</Label>
              <Input
                id="motherHeight"
                type="number"
                placeholder="e.g., 165"
                value={motherHeight}
                onChange={(e) => setMotherHeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Child's Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Boy</SelectItem>
                  <SelectItem value="girl">Girl</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Predict Height</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {predictedHeight !== null && heightRange && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Adult Height</p>
                  <p className="text-4xl font-bold mt-1">{predictedHeight} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Normal Range (±10 cm)</p>
                  <p className="text-lg font-medium mt-1">
                    {heightRange.min} cm – {heightRange.max} cm
                  </p>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  This prediction uses the mid-parental height method. Actual height may vary based on genetics, nutrition, and other factors.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Child Height Predictor
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the father&apos;s height in centimeters</p>
                  <p>Use the actual measured height. For example, if the father is 5 feet 11 inches, enter 180 cm.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the mother&apos;s height in centimeters</p>
                  <p>Enter the mother&apos;s actual height. If you only know feet and inches, convert to cm (1 inch = 2.54 cm).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Select the child&apos;s gender and click Predict</p>
                  <p>The calculator uses different formulas for boys and girls. You&apos;ll see the predicted adult height with a normal range of plus or minus 10 cm.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Height Prediction by Parent Heights
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Father Height</th>
                    <th className="text-left py-3 px-2 font-semibold">Mother Height</th>
                    <th className="text-left py-3 px-2 font-semibold">Boy (Predicted)</th>
                    <th className="text-left py-3 px-2 font-semibold">Girl (Predicted)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">165 cm (5&apos;5&quot;)</td>
                    <td className="py-3 px-2">155 cm (5&apos;1&quot;)</td>
                    <td className="py-3 px-2">167 cm</td>
                    <td className="py-3 px-2">154 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">170 cm (5&apos;7&quot;)</td>
                    <td className="py-3 px-2">160 cm (5&apos;3&quot;)</td>
                    <td className="py-3 px-2">172 cm</td>
                    <td className="py-3 px-2">159 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">175 cm (5&apos;9&quot;)</td>
                    <td className="py-3 px-2">163 cm (5&apos;4&quot;)</td>
                    <td className="py-3 px-2">176 cm</td>
                    <td className="py-3 px-2">163 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">180 cm (5&apos;11&quot;)</td>
                    <td className="py-3 px-2">165 cm (5&apos;5&quot;)</td>
                    <td className="py-3 px-2">180 cm</td>
                    <td className="py-3 px-2">167 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">183 cm (6&apos;0&quot;)</td>
                    <td className="py-3 px-2">168 cm (5&apos;6&quot;)</td>
                    <td className="py-3 px-2">183 cm</td>
                    <td className="py-3 px-2">170 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">188 cm (6&apos;2&quot;)</td>
                    <td className="py-3 px-2">173 cm (5&apos;8&quot;)</td>
                    <td className="py-3 px-2">188 cm</td>
                    <td className="py-3 px-2">175 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These are mid-parental height predictions. Actual adult height typically falls within plus or minus 10 cm of the predicted value.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How the Mid-Parental Height Method Works
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The Formula Behind the Prediction</h4>
                <p>
                  The mid-parental height method was developed in the 1970s and remains one of the most widely used approaches for estimating a child&apos;s adult height. For boys, the formula adds 13 cm to the average of both parents&apos; heights. For girls, it subtracts 13 cm from that average. This 13 cm difference accounts for the average height gap between adult men and women.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why the Plus or Minus 10 cm Range</h4>
                <p>
                  Height is influenced by many genes, not just the parents&apos; direct genetic contribution. Grandparents, great-grandparents, and even distant relatives can contribute height-related genes. The 10 cm range (about 4 inches on either side) captures roughly 95 percent of children whose parents have average heights. Some children will fall outside this range, and that&apos;s normal.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When Predictions Are Less Accurate</h4>
                <p>
                  The mid-parental method works best when both parents are close to average height. Predictions become less reliable when one parent is very tall and the other is very short, because children in these families tend to regress toward the population average. The method also doesn&apos;t account for early or late puberty, which can affect final height.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Factors That Influence Adult Height
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Genetics (60-80 percent of variation)</p>
                  <p>Height is highly heritable. Most of your child&apos;s height potential comes from their genes, with hundreds of genetic variants contributing small effects.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Nutrition during childhood</p>
                  <p>Adequate protein, calcium, vitamin D, and overall calories are essential for reaching genetic height potential. Malnutrition can significantly reduce adult height.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sleep and growth hormone</p>
                  <p>Growth hormone is primarily released during deep sleep. Children need 9-12 hours of quality sleep per night for optimal growth.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Health and chronic conditions</p>
                  <p>Chronic illnesses, hormonal disorders, and certain medications can affect growth. Most children with proper medical care reach their genetic potential.</p>
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
                <h4 className="font-medium text-foreground mb-2">How accurate is the mid-parental height method?</h4>
                <p>
                  The mid-parental method predicts adult height within about 10 cm (4 inches) for roughly 95 percent of children. It works best for children whose parents are both close to average height. The prediction becomes less precise when parents have very different heights or when there&apos;s a family history of early or late puberty.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can a child be taller than both parents?</h4>
                <p>
                  Yes, this happens regularly. Height genes can skip generations, so a child might inherit tall genes from grandparents or other relatives. Children of short parents can also be tall if they inherit favorable combinations of height-related genes. Nutrition and health during childhood also play significant roles.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">At what age do children stop growing?</h4>
                <p>
                  Girls typically stop growing around age 14-16, about 2 years after their first period. Boys continue growing until age 16-18, sometimes into their early 20s. Growth plates in the bones close after puberty, which ends the possibility of natural height increase.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does exercise help children grow taller?</h4>
                <p>
                  Regular physical activity supports healthy bone development and growth hormone release, but it won&apos;t make a child exceed their genetic potential. Activities like swimming, basketball, and hanging exercises are often recommended, but their main benefit is overall health, not height increase beyond genetics.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I be concerned if my child is shorter than predicted?</h4>
                <p>
                  Children grow at different rates. Some are &quot;late bloomers&quot; who catch up during puberty. If your child&apos;s height falls below the 3rd percentile or if growth suddenly slows, consult a pediatrician. Most children who are shorter than predicted are healthy and simply on their own growth trajectory.
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
                href="/calculators/bmi-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">BMI Calculator</span>
                <p className="text-muted-foreground">Calculate body mass index to assess healthy weight for height</p>
              </a>
              <a
                href="/calculators/ideal-weight-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Ideal Weight Calculator</span>
                <p className="text-muted-foreground">Find healthy weight ranges based on height and body frame</p>
              </a>
              <a
                href="/calculators/toddler-growth-chart-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Toddler Growth Chart Calculator</span>
                <p className="text-muted-foreground">Track your child&apos;s growth percentiles over time</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
