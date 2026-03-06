"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, Cell } from "recharts";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    let bmiValue: number;

    if (unit === "metric") {
      const heightInMeters = h / 100;
      bmiValue = w / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (w * 703) / (h * h);
    }

    setBmi(Math.round(bmiValue * 10) / 10);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  // Generate BMI category chart data
  const bmiCategoryData = [
    { category: "Underweight", range: "<18.5", min: 0, max: 18.5, color: "#3b82f6" },
    { category: "Normal", range: "18.5-25", min: 18.5, max: 25, color: "#22c55e" },
    { category: "Overweight", range: "25-30", min: 25, max: 30, color: "#eab308" },
    { category: "Obese", range: "30+", min: 30, max: 40, color: "#ef4444" },
  ];

  const getPositionData = () => {
    if (bmi === null) return [];
    return bmiCategoryData.map(cat => ({
      ...cat,
      highlight: bmi >= cat.min && bmi < cat.max ? 1 : 0.3,
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BMI</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bmi !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your BMI</p>
                <p className="text-4xl font-bold mt-1">{bmi}</p>
                <p className="text-lg font-medium mt-2">{category}</p>
              </div>
            )}
          </div>

          {bmi !== null && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Where Your BMI Falls</h3>
              <div className="h-[150px]">
                <ChartContainer
                  config={{
                    value: { label: "BMI", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getPositionData()} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 40]} />
                      <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 10 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="highlight" fill="#8884d8">
                        {getPositionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} opacity={entry.highlight} />
                        ))}
                      </Bar>
                      <ReferenceLine x={bmi} stroke="black" strokeWidth={2} strokeDasharray="3 3" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is BMI?</CardTitle>
          <CardDescription>Understanding Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            BMI (Body Mass Index) is a simple screening tool that relates your weight to your height. It's calculated by dividing weight in kilograms by height in meters squared. The result places you in a category: underweight, normal, overweight, or obese.
          </p>
          <p className="text-sm text-muted-foreground">
            BMI was developed in the 1830s by Belgian mathematician Adolphe Quetelet. It's not a diagnostic tool – it doesn't measure body fat directly or account for muscle mass, bone density, or fat distribution. A muscular athlete might have a "high" BMI but low body fat.
          </p>
          <p className="text-sm text-muted-foreground">
            Despite its limitations, BMI correlates reasonably well with body fat for most people and predicts health risks at the population level. It's most useful as a starting point, not a final verdict on your health.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>BMI Categories and Health Risks</CardTitle>
          <CardDescription>What your BMI number means</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>BMI Range</TableHead>
                <TableHead>Health Risk</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-blue-600">Underweight</TableCell>
                <TableCell className="font-mono">&lt; 18.5</TableCell>
                <TableCell className="text-xs">Malnutrition, osteoporosis, weakened immunity</TableCell>
                <TableCell className="text-xs">Consult doctor, focus on nutrient-dense foods</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-green-600">Normal weight</TableCell>
                <TableCell className="font-mono">18.5 – 24.9</TableCell>
                <TableCell className="text-xs">Lowest risk for weight-related diseases</TableCell>
                <TableCell className="text-xs">Maintain current habits, regular exercise</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-yellow-600">Overweight</TableCell>
                <TableCell className="font-mono">25 – 29.9</TableCell>
                <TableCell className="text-xs">Increased risk of heart disease, diabetes</TableCell>
                <TableCell className="text-xs">Moderate calorie reduction, increase activity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">Obese (Class I)</TableCell>
                <TableCell className="font-mono">30 – 34.9</TableCell>
                <TableCell className="text-xs">High risk of cardiovascular disease, type 2 diabetes</TableCell>
                <TableCell className="text-xs">Structured weight loss program recommended</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">Obese (Class II)</TableCell>
                <TableCell className="font-mono">35 – 39.9</TableCell>
                <TableCell className="text-xs">Very high risk of serious health conditions</TableCell>
                <TableCell className="text-xs">Medical supervision for weight loss advised</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">Obese (Class III)</TableCell>
                <TableCell className="font-mono">≥ 40</TableCell>
                <TableCell className="text-xs">Extremely high risk, life-threatening</TableCell>
                <TableCell className="text-xs">Immediate medical intervention may be needed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Source: World Health Organization (WHO) BMI classification for adults.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>BMI Limitations</CardTitle>
          <CardDescription>When BMI doesn't tell the full story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Doesn't distinguish muscle from fat</h4>
              <p className="text-xs text-muted-foreground">
                Muscle weighs more than fat per unit volume. A bodybuilder with 10% body fat might have a BMI of 28 (overweight range) while a sedentary person with 25% body fat could have a BMI of 23 (normal). BMI alone can't tell you if you're fit or fat.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Ignores fat distribution</h4>
              <p className="text-xs text-muted-foreground">
                Where you carry fat matters. Belly fat (visceral fat) is more dangerous than fat stored in hips and thighs. Two people with identical BMIs can have very different health risks based on waist circumference and waist-to-hip ratio.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Varies by age, sex, and ethnicity</h4>
              <p className="text-xs text-muted-foreground">
                Older adults naturally lose muscle and gain fat at the same BMI. Women typically have more body fat than men at the same BMI. Asian populations face health risks at lower BMIs – some countries use cutoffs of 23 for overweight, 27.5 for obese.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Healthy Weight Range by Height</CardTitle>
          <CardDescription>Weight ranges for normal BMI (18.5-24.9)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Height</TableHead>
                <TableHead>Healthy Weight Range (kg)</TableHead>
                <TableHead>Healthy Weight Range (lbs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">5'0" (152 cm)</TableCell>
                <TableCell className="font-mono text-xs">43 – 58 kg</TableCell>
                <TableCell className="font-mono text-xs">95 – 128 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5'2" (157 cm)</TableCell>
                <TableCell className="font-mono text-xs">46 – 62 kg</TableCell>
                <TableCell className="font-mono text-xs">102 – 136 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5'4" (163 cm)</TableCell>
                <TableCell className="font-mono text-xs">49 – 66 kg</TableCell>
                <TableCell className="font-mono text-xs">108 – 145 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5'6" (168 cm)</TableCell>
                <TableCell className="font-mono text-xs">53 – 70 kg</TableCell>
                <TableCell className="font-mono text-xs">115 – 154 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5'8" (173 cm)</TableCell>
                <TableCell className="font-mono text-xs">56 – 75 kg</TableCell>
                <TableCell className="font-mono text-xs">122 – 164 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5'10" (178 cm)</TableCell>
                <TableCell className="font-mono text-xs">59 – 79 kg</TableCell>
                <TableCell className="font-mono text-xs">129 – 174 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">6'0" (183 cm)</TableCell>
                <TableCell className="font-mono text-xs">63 – 84 kg</TableCell>
                <TableCell className="font-mono text-xs">137 – 184 lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">6'2" (188 cm)</TableCell>
                <TableCell className="font-mono text-xs">66 – 89 kg</TableCell>
                <TableCell className="font-mono text-xs">145 – 195 lbs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            These ranges assume adult height. Growing children and teens should use age-specific BMI percentiles, not adult cutoffs.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a healthy BMI?</h4>
            <p className="text-xs text-muted-foreground">
              For most adults, a BMI between 18.5 and 24.9 is considered healthy. However, "healthy" depends on individual factors. Some research suggests the lowest mortality risk is actually in the 22-27 range, especially for older adults.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is BMI accurate for athletes?</h4>
            <p className="text-xs text-muted-foreground">
              No. Athletes with high muscle mass often have BMIs in the overweight or obese range despite having low body fat. NFL linemen average BMI of 30+ but many are under 15% body fat. Athletes should use body fat percentage, not BMI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What BMI is considered obese?</h4>
            <p className="text-xs text-muted-foreground">
              BMI of 30 or higher is classified as obese. This is further divided into Class I (30-34.9), Class II (35-39.9), and Class III (40+), sometimes called "morbid obesity." Each class carries progressively higher health risks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does BMI apply to children?</h4>
            <p className="text-xs text-muted-foreground">
              Children use BMI-for-age percentiles, not adult cutoffs. A child's BMI is compared to others of the same age and sex. Underweight is &lt;5th percentile, healthy is 5th-85th, overweight is 85th-95th, obese is ≥95th percentile.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I lose weight if my BMI is high?</h4>
            <p className="text-xs text-muted-foreground">
              Not necessarily. If you're muscular, your high BMI isn't a concern. If you have excess body fat, weight loss may improve health. But focus on behaviors (diet quality, activity, sleep) rather than the number. Small, sustainable changes beat crash diets.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/waist-to-hip-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Waist-to-Hip Ratio</p>
              <p className="text-xs text-muted-foreground">Assess fat distribution</p>
            </a>
            <a href="/calculators/body-fat-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Body Fat Calculator</p>
              <p className="text-xs text-muted-foreground">Estimate body fat percentage</p>
            </a>
            <a href="/calculators/tdee-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">TDEE Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate daily calorie needs</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
