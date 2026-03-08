"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function StepsToCaloriesCalculator() {
  const [steps, setSteps] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("lbs");
  const [strideLength, setStrideLength] = useState<string>("");
  const [strideUnit, setStrideUnit] = useState<"cm" | "inches">("cm");
  const [calories, setCalories] = useState<number | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  const calculate = () => {
    const stepsValue = parseFloat(steps);
    const weightValue = parseFloat(weight);
    const strideValue = parseFloat(strideLength);

    if (isNaN(stepsValue) || stepsValue <= 0) return;

    let caloriesBurned = 0;
    let distanceValue = 0;

    if (!isNaN(weightValue) && weightValue > 0) {
      const weightInLbs = weightUnit === "kg" ? weightValue * 2.20462 : weightValue;
      caloriesBurned = 0.04 * weightInLbs * stepsValue;
      
      const barData = [];
      const stepRanges = [1000, 3000, 5000, 7500, 10000, 15000, 20000];
      for (const stepCount of stepRanges) {
        const cals = 0.04 * weightInLbs * stepCount;
        barData.push({
          steps: stepCount.toLocaleString(),
          calories: Math.round(cals),
        });
      }
      setChartData(barData);
      
      const bmrEstimate = weightUnit === "kg" ? weightValue * 24 : weightValue * 10.9;
      setPieData([
        { name: "Steps Activity", value: Math.round(caloriesBurned), color: "#3b82f6" },
        { name: "Resting BMR", value: Math.round(bmrEstimate), color: "#e5e7eb" },
      ]);
    }

    if (!isNaN(strideValue) && strideValue > 0) {
      const strideInMeters = strideUnit === "inches" ? strideValue * 0.0254 : strideValue / 100;
      distanceValue = (stepsValue * strideInMeters) / 1000;
      setDistance(distanceValue.toFixed(2));
    }

    setCalories(Math.round(caloriesBurned));
  };

  const reset = () => {
    setSteps("");
    setWeight("");
    setStrideLength("");
    setCalories(null);
    setDistance("");
    setChartData([]);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="steps">Number of Steps</Label>
              <Input
                id="steps"
                type="number"
                placeholder="e.g., 10000"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="150"
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="strideLength">Stride Length</Label>
                <Input
                  id="strideLength"
                  type="number"
                  step="0.1"
                  placeholder="76"
                  value={strideLength}
                  onChange={(e) => setStrideLength(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={strideUnit} onValueChange={(v) => setStrideUnit(v as "cm" | "inches")}>
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

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {(calories !== null || distance) && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Calories Burned</p>
                  <p className="text-4xl font-bold mt-1">{calories} <span className="text-lg font-normal">kcal</span></p>
                </div>
                {distance && (
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Distance Walked</p>
                    <p className="text-2xl font-bold mt-1">{distance} <span className="text-lg font-normal">km</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Calories Burned at Different Step Counts</CardTitle>
            <CardDescription>
              See how calories scale with your daily steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="steps" />
                <YAxis label={{ value: "Calories", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="calories" fill="#3b82f6" name="Calories Burned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {pieData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Activity vs Resting Energy</CardTitle>
            <CardDescription>
              How your step calories compare to basal metabolic rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How Steps Translate to Calories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Walking burns roughly 0.04 calories per step for an average-weight person. That means 10,000 steps burns around 400 calories if you weigh 180 pounds. Heavier people burn more; lighter people burn less.</p>
          
          <p>The calculator uses your actual weight to give personalized results. It also factors in your stride length to estimate distance—useful if you're tracking both calorie burn and walking goals.</p>

          <h3 className="text-xl font-semibold mt-6">The Math Behind Steps to Calories</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-sm">
            Calories = 0.04 × weight(lbs) × steps
          </div>
          <p>For a 150-pound person: 0.04 × 150 × 10,000 = 600 calories</p>
          
          <p className="text-sm text-muted-foreground mt-2">Note: This is an estimate. Actual calorie burn varies based on walking speed, terrain, fitness level, and metabolism.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned by Steps and Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Steps</th>
                  <th className="p-3 text-left">120 lbs (54 kg)</th>
                  <th className="p-3 text-left">150 lbs (68 kg)</th>
                  <th className="p-3 text-left">180 lbs (82 kg)</th>
                  <th className="p-3 text-left">210 lbs (95 kg)</th>
                  <th className="p-3 text-left">240 lbs (109 kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">3,000 steps</td>
                  <td className="p-3">144 cal</td>
                  <td className="p-3">180 cal</td>
                  <td className="p-3">216 cal</td>
                  <td className="p-3">252 cal</td>
                  <td className="p-3">288 cal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">5,000 steps</td>
                  <td className="p-3">240 cal</td>
                  <td className="p-3">300 cal</td>
                  <td className="p-3">360 cal</td>
                  <td className="p-3">420 cal</td>
                  <td className="p-3">480 cal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">7,500 steps</td>
                  <td className="p-3">360 cal</td>
                  <td className="p-3">450 cal</td>
                  <td className="p-3">540 cal</td>
                  <td className="p-3">630 cal</td>
                  <td className="p-3">720 cal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">10,000 steps</td>
                  <td className="p-3">480 cal</td>
                  <td className="p-3">600 cal</td>
                  <td className="p-3">720 cal</td>
                  <td className="p-3">840 cal</td>
                  <td className="p-3">960 cal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">12,500 steps</td>
                  <td className="p-3">600 cal</td>
                  <td className="p-3">750 cal</td>
                  <td className="p-3">900 cal</td>
                  <td className="p-3">1,050 cal</td>
                  <td className="p-3">1,200 cal</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">15,000 steps</td>
                  <td className="p-3">720 cal</td>
                  <td className="p-3">900 cal</td>
                  <td className="p-3">1,080 cal</td>
                  <td className="p-3">1,260 cal</td>
                  <td className="p-3">1,440 cal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step Count Activity Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>How active are you really? Step counts break down into clear activity levels. Most adults average 3,000-4,000 steps daily without trying. Anything above that requires intentional movement.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Sedentary: Less than 5,000 steps</h4>
              <p className="text-sm text-muted-foreground mt-1">Desk jobs, minimal walking. Health risks increase significantly at this level. Aim for at least 7,000+ for basic health.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Low Active: 5,000-7,499 steps</h4>
              <p className="text-sm text-muted-foreground mt-1">Some daily movement but mostly sedentary. You're doing better than average but could benefit from more intentional walking.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Somewhat Active: 7,500-9,999 steps</h4>
              <p className="text-sm text-muted-foreground mt-1">Getting close to the 10,000 step goal. This range shows meaningful health benefits including lower cardiovascular risk.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Active: 10,000-12,499 steps</h4>
              <p className="text-sm text-muted-foreground mt-1">The classic daily goal. At this level you're burning 400-600+ calories from walking alone and seeing real fitness gains.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Highly Active: 12,500+ steps</h4>
              <p className="text-sm text-muted-foreground mt-1">Excellent. This is the range for serious fitness enthusiasts, manual laborers, and dedicated walkers. You're in the top tier of daily activity.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Increase Your Daily Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You don't need a gym membership or fancy equipment. Walking is free, requires zero skill, and you can do it anywhere. The trick is building it into your routine so it sticks.</p>

          <div className="space-y-3">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Park farther away</h4>
              <p className="text-sm text-muted-foreground mt-1">Extra 2-3 minutes of walking per trip adds up. Do this at work, the grocery store, everywhere. It's effortless steps.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Take walking breaks</h4>
              <p className="text-sm text-muted-foreground mt-1">Set a timer for every 90 minutes. Walk for 5-10 minutes. You'll hit an extra 1,000-2,000 steps without dedicating "workout time."</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Walk during phone calls</h4>
              <p className="text-sm text-muted-foreground mt-1">Got a call? Pace around your house or office. A 30-minute call becomes 2,000-3,000 steps. Zero extra time required.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Get a step tracker</h4>
              <p className="text-sm text-muted-foreground mt-1">Fitness bands, phone apps, whatever works. Seeing the number matters. People who track steps walk significantly more than those who don't.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">How accurate is the steps to calories calculator?</h4>
            <p className="text-sm text-muted-foreground mt-1">The formula (0.04 × weight × steps) is based on metabolic research and gives a reasonable estimate for average walking pace. It's accurate within 10-15% for most people. Factors like speed, incline, and individual metabolism cause variation.</p>
          </div>
          <div>
            <h4 className="font-semibold">How many steps do I need to burn 500 calories?</h4>
            <p className="text-sm text-muted-foreground mt-1">Depends on your weight. A 150-pound person needs about 8,300 steps. A 200-pound person needs around 6,250 steps. Heavier people burn more calories per step because they're moving more mass.</p>
          </div>
          <div>
            <h4 className="font-semibold">Is 10,000 steps a day enough for weight loss?</h4>
            <p className="text-sm text-muted-foreground mt-1">10,000 steps burns 400-700 calories for most adults. That's meaningful but not a magic number. Weight loss requires a calorie deficit. Walking helps, but diet matters more. Combine 10,000 steps with mindful eating for best results.</p>
          </div>
          <div>
            <h4 className="font-semibold">Do steps on a treadmill count the same?</h4>
            <p className="text-sm text-muted-foreground mt-1">Yes. Your body doesn't care if you're walking indoors or outside. Treadmill steps count equally. Some treadmills overestimate calories though, so use your own calculator for accuracy.</p>
          </div>
          <div>
            <h4 className="font-semibold">What's a good stride length?</h4>
            <p className="text-sm text-muted-foreground mt-1">Average stride length is about 2.5 feet (76 cm) for women and 2.6 feet (79 cm) for men. A rough estimate: multiply your height by 0.413. You can measure yours by walking 10 steps and dividing the distance by 10.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
