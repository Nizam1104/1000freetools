"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function DeepSleepCyclePlanner() {
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [bedtime, setBedtime] = useState<string>("");
  const [sleepCycles, setSleepCycles] = useState<number>(5);
  const [results, setResults] = useState<{
    bedtimes: string[];
    deepSleepWindows: string[];
  } | null>(null);

  const addMinutes = (timeStr: string, minutes: number): string => {
    const [hours, mins] = timeStr.split(":").map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMins = totalMins % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
  };

  const subtractMinutes = (timeStr: string, minutes: number): string => {
    const [hours, mins] = timeStr.split(":").map(Number);
    const totalMins = hours * 60 + mins - minutes;
    let newHours = Math.floor(totalMins / 60);
    if (newHours < 0) newHours += 24;
    const newMins = ((totalMins % 60) + 60) % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
  };

  const calculate = () => {
    if (!wakeTime) return;

    // Sleep cycle is ~90 minutes
    // Deep sleep occurs primarily in first half of night
    // Typically cycles 3-5, with more deep sleep in earlier cycles

    const bedtimes: string[] = [];
    const deepSleepWindows: string[] = [];

    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepDuration = cycles * 90;
      const bedtime = subtractMinutes(wakeTime, sleepDuration + 15); // +15 min to fall asleep
      bedtimes.push(bedtime);

      // Deep sleep windows (primarily in first 3-4 hours)
      const deepSleepStart = bedtime;
      const deepSleepEnd = addMinutes(bedtime, Math.min(cycles * 90, 240));
      deepSleepWindows.push(`${deepSleepStart} - ${deepSleepEnd}`);
    }

    setResults({
      bedtimes,
      deepSleepWindows,
    });
    setSleepCycles(5);
  };

  const calculateFromBedtime = () => {
    if (!bedtime || !wakeTime) return;

    const bedMins = parseInt(bedtime.split(":")[0]) * 60 + parseInt(bedtime.split(":")[1]);
    const wakeMins = parseInt(wakeTime.split(":")[0]) * 60 + parseInt(wakeTime.split(":")[1]);

    let sleepDuration = wakeMins - bedMins;
    if (sleepDuration < 0) sleepDuration += 24 * 60;

    const cycles = Math.round(sleepDuration / 90);
    setSleepCycles(cycles);

    const deepSleepHours = Math.min(cycles * 90, 240) / 60;
    setResults({
      bedtimes: [bedtime],
      deepSleepWindows: [`~${deepSleepHours.toFixed(1)} hours of deep sleep potential`],
    });
  };

  const reset = () => {
    setWakeTime("07:00");
    setBedtime("");
    setSleepCycles(5);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="wakeTime">Desired Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bedtime">Or Enter Your Bedtime (to analyze)</Label>
              <div className="flex gap-2">
                <Input
                  id="bedtime"
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                />
                <Button onClick={calculateFromBedtime}>Analyze</Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Optimal Bedtimes</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="font-medium mb-2">Recommended Bedtimes:</p>
                  <div className="space-y-2">
                    {results.bedtimes.map((bt, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-background rounded">
                        <span>{sleepCycles === 5 ? `${6 - i} cycles` : `${3 + i} cycles`}</span>
                        <span className="font-bold">{bt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Deep Sleep Windows:</p>
                  <div className="space-y-2">
                    {results.deepSleepWindows.map((window, i) => (
                      <div key={i} className="p-2 bg-background rounded">
                        <span className="text-sm">{window}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>💡 Tip: Deep sleep occurs primarily in the first 3-4 hours. Going to bed earlier maximizes deep sleep.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Deep Sleep Planner
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your desired wake time</p>
                  <p>Select the time you need to wake up. The calculator works backward to find optimal bedtimes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Or enter your bedtime to analyze</p>
                  <p>If you already have a bedtime, enter it along with wake time to see your sleep cycle analysis.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review recommended bedtimes and deep sleep windows</p>
                  <p>The planner shows bedtimes for 3-6 sleep cycles and estimates your deep sleep potential for each option.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Sleep Cycle Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Sleep Cycles</th>
                    <th className="text-left py-3 px-2 font-semibold">Total Duration</th>
                    <th className="text-left py-3 px-2 font-semibold">Deep Sleep Time</th>
                    <th className="text-left py-3 px-2 font-semibold">Quality Rating</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">3 cycles</td>
                    <td className="py-3 px-2">4.5 hours</td>
                    <td className="py-3 px-2">~45 min</td>
                    <td className="py-3 px-2">Minimum (not recommended)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4 cycles</td>
                    <td className="py-3 px-2">6 hours</td>
                    <td className="py-3 px-2">~60 min</td>
                    <td className="py-3 px-2">Below average</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">5 cycles</td>
                    <td className="py-3 px-2">7.5 hours</td>
                    <td className="py-3 px-2">~75-90 min</td>
                    <td className="py-3 px-2">Optimal for most adults</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6 cycles</td>
                    <td className="py-3 px-2">9 hours</td>
                    <td className="py-3 px-2">~90-105 min</td>
                    <td className="py-3 px-2">Excellent (teens, athletes)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">7+ cycles</td>
                    <td className="py-3 px-2">10.5+ hours</td>
                    <td className="py-3 px-2">Variable</td>
                    <td className="py-3 px-2">May indicate sleep debt</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Each sleep cycle averages 90 minutes. Deep sleep comprises 15-25% of total sleep time in healthy adults.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Sleep Cycles
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">The 90-Minute Cycle</h4>
                <p>
                  Sleep happens in 90-minute cycles. Each cycle includes light sleep (N1, N2), deep sleep (N3), and REM sleep. You cycle through these stages 4-6 times per night. Waking between cycles — rather than during them — leaves you feeling refreshed.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Deep Sleep Matters</h4>
                <p>
                  Deep sleep (slow-wave sleep) is when your body repairs tissue, builds bone and muscle, and strengthens immunity. Growth hormone releases during deep sleep. Memory consolidation happens too. Missing deep sleep leaves you physically exhausted.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Deep Sleep Happens Early</h4>
                <p>
                  Most deep sleep occurs in the first 3-4 hours of the night. Later cycles contain more REM and light sleep. This is why going to bed earlier — not just sleeping longer — improves sleep quality.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Sleep Pressure and Timing</h4>
                <p>
                  Adenosine builds up during wakefulness, creating &quot;sleep pressure.&quot; Caffeine blocks adenosine receptors. Your circadian rhythm also affects sleep timing — most people feel sleepiest around 9-11 PM and 2-4 AM.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Better Deep Sleep
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Keep a Consistent Schedule</p>
                  <p>Go to bed and wake up at the same time daily, even weekends. Regularity strengthens your circadian rhythm and improves deep sleep quality.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Exercise During the Day</p>
                  <p>Moderate aerobic exercise increases deep sleep. Finish intense workouts 3+ hours before bed — elevated body temperature delays sleep onset.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Limit Alcohol Before Bed</p>
                  <p>Alcohol helps you fall asleep faster but fragments sleep and suppresses deep sleep and REM. Avoid alcohol within 3-4 hours of bedtime.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Optimize Your Sleep Environment</p>
                  <p>Keep your bedroom cool (65-68°F / 18-20°C), dark, and quiet. Use blackout curtains and white noise if needed. A cool room promotes deeper sleep.</p>
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
    question: "How many sleep cycles do I need?",
    answer: "Most adults need 5 cycles (7.5 hours) per night. Some function well on 4 cycles (6 hours), others need 6 cycles (9 hours). Teens and athletes often need more. Listen to how you feel upon waking.",
  },
{
    question: "Why do I wake up tired after 8 hours?",
    answer: "You may be waking during deep sleep rather than between cycles. Try adjusting your bedtime by 15-30 minutes. Sleep quality matters more than duration — alcohol, stress, and irregular schedules reduce deep sleep.",
  },
{
    question: "Can I catch up on deep sleep?",
    answer: "Your body prioritizes deep sleep after deprivation — you&apos;ll get more deep sleep the next night. But chronic sleep debt has cumulative effects. Consistent adequate sleep is better than weekend catch-up.",
  },
{
    question: "Does age affect deep sleep?",
    answer: "Yes. Deep sleep decreases with age. Children get the most deep sleep. Adults over 60 may get very little deep sleep and wake frequently. This is normal but still important to optimize what you get.",
  },
{
    question: "What&apos;s the best time to go to bed?",
    answer: "For most people, 9-11 PM aligns with natural circadian rhythms. Earlier bedtimes (9-10 PM) maximize deep sleep since it concentrates in the first sleep cycles. Night owls may shift later but should maintain consistency.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
