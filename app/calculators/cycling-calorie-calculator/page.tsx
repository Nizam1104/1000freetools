"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CyclingCalorieCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [intensity, setIntensity] = useState<string>("moderate");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [calories, setCalories] = useState<number | null>(null);

  // MET values for cycling
  const metValues: Record<string, number> = {
    leisure: 4,      // Leisure cycling (< 10 mph)
    moderate: 8,     // Moderate cycling (10-12 mph)
    vigorous: 10,    // Vigorous cycling (12-14 mph)
    racing: 12       // Racing (> 14 mph)
  };

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const timeValue = parseFloat(time);

    if (isNaN(weightValue) || isNaN(timeValue) || weightValue <= 0 || timeValue <= 0) return;

    // Convert weight to kg
    const weightInKg = weightUnit === "lbs" ? weightValue * 0.453592 : weightValue;

    // Convert time to hours
    const timeInHours = timeUnit === "minutes" ? timeValue / 60 : timeValue;

    // Get MET value
    const met = metValues[intensity] || 8;

    // Calculate calories: Calories = MET × weight(kg) × time(hours)
    const calculatedCalories = met * weightInKg * timeInHours;
    setCalories(Math.round(calculatedCalories));
  };

  const reset = () => {
    setWeight("");
    setTime("");
    setCalories(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
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
              <Label htmlFor="intensity">Cycling Intensity</Label>
              <Select value={intensity} onValueChange={(v) => setIntensity(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leisure">Leisure (&lt; 10 mph / 16 km/h)</SelectItem>
                  <SelectItem value="moderate">Moderate (10-12 mph / 16-19 km/h)</SelectItem>
                  <SelectItem value="vigorous">Vigorous (12-14 mph / 19-23 km/h)</SelectItem>
                  <SelectItem value="racing">Racing (&gt; 14 mph / 23 km/h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="time">Duration</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="45"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "minutes" | "hours")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Calories</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {calories !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-4xl font-bold mt-1">{calories} <span className="text-lg font-normal">kcal</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Cycling Calorie Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your weight</p>
                  <p>Input your current body weight in kilograms or pounds. This affects how many calories you burn — heavier riders burn more calories at the same intensity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your cycling intensity</p>
                  <p>Choose from leisure, moderate, vigorous, or racing. Be honest about your pace — this has the biggest impact on calorie burn.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter ride duration and calculate</p>
                  <p>Input how long you rode in minutes or hours. Click Calculate to see your estimated calorie burn based on MET values for cycling.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Cycling MET Values by Intensity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Intensity Level</th>
                    <th className="text-left py-3 px-2 font-semibold">Speed Range</th>
                    <th className="text-left py-3 px-2 font-semibold">MET Value</th>
                    <th className="text-left py-3 px-2 font-semibold">Calories/Hour (70kg)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Leisure</td>
                    <td className="py-3 px-2">&lt; 10 mph (16 km/h)</td>
                    <td className="py-3 px-2">4.0</td>
                    <td className="py-3 px-2">280 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Moderate</td>
                    <td className="py-3 px-2">10-12 mph (16-19 km/h)</td>
                    <td className="py-3 px-2">8.0</td>
                    <td className="py-3 px-2">560 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Vigorous</td>
                    <td className="py-3 px-2">12-14 mph (19-23 km/h)</td>
                    <td className="py-3 px-2">10.0</td>
                    <td className="py-3 px-2">700 kcal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Racing</td>
                    <td className="py-3 px-2">&gt; 14 mph (23 km/h)</td>
                    <td className="py-3 px-2">12.0</td>
                    <td className="py-3 px-2">840 kcal</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Mountain biking</td>
                    <td className="py-3 px-2">Variable terrain</td>
                    <td className="py-3 px-2">8.5</td>
                    <td className="py-3 px-2">595 kcal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              MET (Metabolic Equivalent of Task) values from the Compendium of Physical Activities. Actual calorie burn varies by fitness level, terrain, and wind conditions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How Cycling Burns Calories
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The MET Formula</h4>
                <p>
                  Calories burned = MET × weight (kg) × time (hours). MET values represent how much energy an activity uses compared to resting. Cycling at moderate intensity (8 METs) burns 8 times more calories than sitting still.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Weight Matters</h4>
                <p>
                  Heavier riders burn more calories because they move more mass. A 90kg rider burns about 29% more calories than a 70kg rider at the same speed. This is why calorie calculators always ask for weight first.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Intensity Is Everything</h4>
                <p>
                  Doubling your speed more than doubles calorie burn due to air resistance. Racing at 16+ mph burns 3× more calories per hour than leisure cycling. Hills and headwinds increase intensity without requiring higher speed.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Afterburn Effect</h4>
                <p>
                  Vigorous cycling triggers EPOC (excess post-exercise oxygen consumption). Your body continues burning extra calories for hours after intense rides as it repairs muscle and restores energy stores.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Maximizing Calorie Burn
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Add Interval Training</p>
                  <p>Alternate 30 seconds of hard effort with 90 seconds of easy spinning. Repeat 8-10 times. This burns more calories in less time than steady riding.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Find Hills</p>
                  <p>Climbing burns 20-50% more calories than flat riding at the same speed. Even small inclines add up over a long ride.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Ride Before Breakfast</p>
                  <p>Fast morning rides may increase fat burning. Keep intensity moderate and bring a snack for rides over 60 minutes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Track Your Rides</p>
                  <p>Use a cycling computer or phone app to log distance, elevation, and time. Seeing progress keeps you motivated to ride more.</p>
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
                <h4 className="font-medium text-foreground mb-2">How many calories does cycling burn per hour?</h4>
                <p>
                  It depends on intensity and your weight. A 70kg person burns about 280 calories/hour at leisure pace, 560 at moderate pace, and 840+ at racing intensity. Heavier riders burn proportionally more.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is cycling good for weight loss?</h4>
                <p>
                  Yes. Cycling is sustainable cardio that burns significant calories without high joint impact. Combine regular rides with a modest calorie deficit for steady weight loss. Aim for 150-300 minutes of moderate cycling per week.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does stationary cycling burn the same calories?</h4>
                <p>
                  Roughly yes, if intensity matches. Stationary bikes eliminate wind resistance and coasting, which can make effort more consistent. However, outdoor riding engages more stabilizer muscles and varies terrain naturally.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate is this cycling calorie calculator?</h4>
                <p>
                  It provides estimates based on established MET values. Actual burn varies by fitness level, bike type, terrain, wind, and riding efficiency. Use it as a guideline, not an exact measurement. Heart rate monitors provide more personalized estimates.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I eat back the calories I burn cycling?</h4>
                <p>
                  For weight loss, generally no — most people overestimate calories burned. For rides under 90 minutes, normal meals are sufficient. For longer rides, replace 50-75% of burned calories to maintain energy without negating the deficit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
