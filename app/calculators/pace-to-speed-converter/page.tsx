"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function PaceToSpeedConverter() {
  const [paceMin, setPaceMin] = useState<string>("");
  const [paceSec, setPaceSec] = useState<string>("");
  const [unit, setUnit] = useState<"km" | "mile">("km");
  const [speed, setSpeed] = useState<number | null>(null);

  const calculate = () => {
    const min = parseFloat(paceMin);
    const sec = parseFloat(paceSec);

    if (isNaN(min) || isNaN(sec) || min <= 0) return;

    const totalMinutes = min + sec / 60;
    
    // Speed = 60 / pace (in min per unit)
    const speedValue = 60 / totalMinutes;
    setSpeed(Math.round(speedValue * 100) / 100);
  };

  const reset = () => {
    setPaceMin("");
    setPaceSec("");
    setSpeed(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Distance Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "km" | "mile")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">min/km → km/h</SelectItem>
                  <SelectItem value="mile">min/mile → mph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paceMin">Minutes</Label>
                <Input
                  id="paceMin"
                  type="number"
                  placeholder="e.g., 5"
                  value={paceMin}
                  onChange={(e) => setPaceMin(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="paceSec">Seconds</Label>
                <Input
                  id="paceSec"
                  type="number"
                  placeholder="e.g., 30"
                  value={paceSec}
                  onChange={(e) => setPaceSec(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {speed !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Speed</p>
                <p className="text-4xl font-bold mt-1">{speed}</p>
                <p className="text-lg font-medium mt-1">
                  {unit === "km" ? "km/h" : "mph"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {paceMin}:{paceSec.padStart(2, "0")} {unit === "km" ? "min/km" : "min/mile"} = {speed} {unit === "km" ? "km/h" : "mph"}
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
              How to Use This Pace to Speed Converter
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your distance unit</p>
                  <p>Choose min/km for metric or min/mile for imperial measurements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your pace</p>
                  <p>Input minutes and seconds per kilometer or mile. For example, 5 minutes 30 seconds.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Convert instantly</p>
                  <p>Click Convert to see your speed in km/h or mph. The conversion happens automatically.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Running Pace Reference Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Pace (min/km)</th>
                    <th className="text-right py-3 px-2 font-semibold">Speed (km/h)</th>
                    <th className="text-right py-3 px-2 font-semibold">Pace (min/mile)</th>
                    <th className="text-right py-3 px-2 font-semibold">Speed (mph)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">3:00</td>
                    <td className="text-right py-3 px-2">20.0</td>
                    <td className="text-right py-3 px-2">4:50</td>
                    <td className="text-right py-3 px-2">12.4</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4:00</td>
                    <td className="text-right py-3 px-2">15.0</td>
                    <td className="text-right py-3 px-2">6:26</td>
                    <td className="text-right py-3 px-2">9.3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">5:00</td>
                    <td className="text-right py-3 px-2">12.0</td>
                    <td className="text-right py-3 px-2">8:03</td>
                    <td className="text-right py-3 px-2">7.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6:00</td>
                    <td className="text-right py-3 px-2">10.0</td>
                    <td className="text-right py-3 px-2">9:39</td>
                    <td className="text-right py-3 px-2">6.2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">7:00</td>
                    <td className="text-right py-3 px-2">8.6</td>
                    <td className="text-right py-3 px-2">11:16</td>
                    <td className="text-right py-3 px-2">5.4</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">8:00</td>
                    <td className="text-right py-3 px-2">7.5</td>
                    <td className="text-right py-3 px-2">12:52</td>
                    <td className="text-right py-3 px-2">4.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Pace and Speed
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Running Pace?</h4>
                <p>
                  Pace measures how many minutes it takes to cover one kilometer or mile. Runners prefer
                  pace because it directly relates to effort — a 5:00 min/km pace feels the same whether
                  you run 1 km or 10 km. Lower pace numbers mean faster running.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Pace vs Speed</h4>
                <p>
                  Speed measures distance per time (km/h or mph). Pace measures time per distance
                  (min/km or min/mile). They are inverses: speed = 60 / pace. Cyclists and drivers
                  use speed; runners and walkers use pace. Both describe the same motion differently.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Converting Between Units</h4>
                <p>
                  To convert min/km to min/mile, multiply by 1.609 (there are 1.609 km in a mile).
                  A 5:00 min/km pace equals 8:03 min/mile. To convert to speed, divide 60 by the
                  pace in decimal minutes: 60 / 5.0 = 12 km/h.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Running Pace Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Start slower than goal pace</p>
                  <p>Begin races and long runs 10-15 seconds per km slower than target. Negative splits work best.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use a GPS watch or app</p>
                  <p>Track pace in real-time during runs. Most watches show current, lap, and average pace.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Practice pace by feel</p>
                  <p>Run without watching your watch occasionally. Learn what different paces feel like internally.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Account for terrain and weather</p>
                  <p>Hills, heat, and wind slow your pace. Adjust expectations and effort accordingly.</p>
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
    question: "What is a good running pace?",
    answer: "It depends on distance and experience. For 5K, recreational runners average 5:00-7:00 min/km. For marathons, 4:30-6:30 min/km is common. Elite runners go much faster — world record marathon pace is about 2:50 min/km. Compare yourself to your own progress.",
  },
{
    question: "How do I convert treadmill speed to pace?",
    answer: "Treadmills display speed in km/h or mph. To get pace, divide 60 by the speed. For example, 10 km/h = 60/10 = 6:00 min/km. Many treadmills now show pace directly.",
  },
{
    question: "Why is my outdoor pace slower than treadmill pace?",
    answer: "Outdoor running has wind resistance, terrain changes, and no belt assistance. Treadmill pace feels easier. Add 0.5-1% incline on the treadmill to better match outdoor effort. GPS watches can also be slightly inaccurate in certain conditions.",
  },
{
    question: "How accurate are GPS pace measurements?",
    answer: "GPS watches are generally accurate within 1-3% in open areas. Buildings, trees, and bridges can cause signal issues. Instant pace fluctuates — look at lap or average pace for more reliable readings. Newer multi-band GPS is more accurate.",
  },
{
    question: "Should I train at race pace?",
    answer: "Include some race-pace workouts but not exclusively. Most training should be easier than race pace to build aerobic base. Include intervals at faster than race pace and long runs slower than race pace. Race-pace runs teach your body the specific effort.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
