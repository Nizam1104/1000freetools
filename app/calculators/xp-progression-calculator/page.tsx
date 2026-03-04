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

interface XPResult {
  currentXP: number;
  targetXP: number;
  xpNeeded: number;
  xpPerHour: number;
  hoursNeeded: number;
  daysNeeded: number;
  sessionsNeeded: number;
  sessionLength: number;
  totalPlaytime: string;
  milestones: Array<{ level: string; xp: number; hours: number }>;
}

export default function XPProgressionCalculatorPage() {
  const [currentXP, setCurrentXP] = useState<string>("");
  const [targetXP, setTargetXP] = useState<string>("");
  const [xpPerHour, setXpPerHour] = useState<string>("");
  const [sessionLength, setSessionLength] = useState<string>("2");
  const [result, setResult] = useState<XPResult | null>(null);

  const calculate = () => {
    const currentNum = parseFloat(currentXP) || 0;
    const targetNum = parseFloat(targetXP) || 0;
    const xpPerHourNum = parseFloat(xpPerHour) || 0;
    const sessionNum = parseFloat(sessionLength) || 2;

    if (targetNum === 0 || xpPerHourNum === 0) return;

    const xpNeeded = targetNum - currentNum;

    if (xpNeeded <= 0) {
      setResult({
        currentXP: currentNum,
        targetXP: targetNum,
        xpNeeded: 0,
        xpPerHour: xpPerHourNum,
        hoursNeeded: 0,
        daysNeeded: 0,
        sessionsNeeded: 0,
        sessionLength: sessionNum,
        totalPlaytime: "Already at target!",
        milestones: [],
      });
      return;
    }

    const hoursNeeded = xpNeeded / xpPerHourNum;
    const daysNeeded = hoursNeeded / 24;
    const sessionsNeeded = Math.ceil(hoursNeeded / sessionNum);
    const totalPlaytime = formatTime(hoursNeeded);

    // Generate milestones
    const milestones = [];
    const milestoneIntervals = [0.25, 0.5, 0.75, 1.0];

    for (const interval of milestoneIntervals) {
      const milestoneXP = currentNum + (xpNeeded * interval);
      const milestoneHours = (milestoneXP - currentNum) / xpPerHourNum;
      milestones.push({
        level: `${(interval * 100).toFixed(0)}%`,
        xp: Math.round(milestoneXP),
        hours: parseFloat(milestoneHours.toFixed(1)),
      });
    }

    setResult({
      currentXP: currentNum,
      targetXP: targetNum,
      xpNeeded: Math.round(xpNeeded),
      xpPerHour: xpPerHourNum,
      hoursNeeded: parseFloat(hoursNeeded.toFixed(1)),
      daysNeeded: parseFloat(daysNeeded.toFixed(1)),
      sessionsNeeded,
      sessionLength: sessionNum,
      totalPlaytime,
      milestones,
    });
  };

  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = (hours % 24).toFixed(1);
      return `${days}d ${remainingHours}h`;
    }
  };

  const reset = () => {
    setCurrentXP("");
    setTargetXP("");
    setXpPerHour("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            XP Progression Calculator – Calculate How Long to Reach Your Target Level
          </h1>
          <p className="text-muted-foreground">
            Plan your grinding sessions with our XP Progression Calculator.
            Enter your current XP, target level XP threshold, and average XP per hour
            to see how long it will take to level up in your favorite RPG or online game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-xp">Current XP</Label>
                <Input
                  id="current-xp"
                  type="number"
                  value={currentXP}
                  onChange={(e) => setCurrentXP(e.target.value)}
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-xp">Target XP</Label>
                <Input
                  id="target-xp"
                  type="number"
                  value={targetXP}
                  onChange={(e) => setTargetXP(e.target.value)}
                  placeholder="e.g., 100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="xp-per-hour">XP per Hour</Label>
                <Input
                  id="xp-per-hour"
                  type="number"
                  value={xpPerHour}
                  onChange={(e) => setXpPerHour(e.target.value)}
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-muted-foreground">
                  Average XP gained per hour of gameplay
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-length">Session Length (hours)</Label>
                <Input
                  id="session-length"
                  type="number"
                  step="0.5"
                  value={sessionLength}
                  onChange={(e) => setSessionLength(e.target.value)}
                  placeholder="2"
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
              <h3 className="text-lg font-semibold mb-4">Progression Results</h3>
              {result ? (
                <div className="space-y-4">
                  {result.xpNeeded === 0 ? (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        🎉 Target Reached!
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        You&apos;ve already achieved your goal!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-primary/10 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">XP Needed</p>
                        <p className="text-3xl font-bold text-primary">{result.xpNeeded.toLocaleString()}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-muted rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">Time Required</p>
                          <p className="text-lg font-semibold">{result.totalPlaytime}</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">Sessions</p>
                          <p className="text-lg font-semibold">{result.sessionsNeeded}</p>
                          <p className="text-xs text-muted-foreground">{result.sessionLength}h each</p>
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current XP:</span>
                          <span className="font-semibold">{result.currentXP.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Target XP:</span>
                          <span className="font-semibold">{result.targetXP.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">XP/Hour:</span>
                          <span className="font-semibold">{result.xpPerHour.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Days (continuous):</span>
                          <span className="font-semibold">{result.daysNeeded}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Progress Milestones</h4>
                        <div className="space-y-2">
                          {result.milestones.map((milestone, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                              <span className="text-sm font-medium">{milestone.level}</span>
                              <div className="text-right">
                                <p className="text-sm font-semibold">{milestone.xp.toLocaleString()} XP</p>
                                <p className="text-xs text-muted-foreground">{milestone.hours} hours</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your XP details and click Calculate to see progression</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                XP Grinding Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Efficient routes:</strong> Find high XP/hour activities in your game
                  </li>
                  <li>
                    <strong>Bonus events:</strong> Take advantage of double XP events
                  </li>
                  <li>
                    <strong>Rest bonuses:</strong> Some games give XP boosts after breaks
                  </li>
                  <li>
                    <strong>Group bonuses:</strong> Party play often gives XP multipliers
                  </li>
                  <li>
                    <strong>Daily quests:</strong> Complete daily objectives for bonus XP
                  </li>
                </ul>
                <p>
                  <strong>Remember:</strong> Take breaks! Extended gaming sessions can lead
                  to burnout. The 20-20-20 rule: every 20 minutes, look at something 20 feet
                  away for 20 seconds.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate XP Progression Time</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Current & Target XP</h3>
                <p className="text-sm text-muted-foreground">Input your current XP and the XP needed for your target level.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Set XP Rate & Session Length</h3>
                <p className="text-sm text-muted-foreground">Enter your average XP per hour and typical gaming session duration.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Time Estimates</h3>
                <p className="text-sm text-muted-foreground">See total hours needed, number of sessions, and progress milestones.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This XP Progression Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Time Planning</h3>
              <p className="text-sm text-muted-foreground">Know exactly how long it will take to reach your target level for better gaming schedule planning.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Session Tracking</h3>
              <p className="text-sm text-muted-foreground">Calculate how many gaming sessions you need based on your typical play time.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Progress Milestones</h3>
              <p className="text-sm text-muted-foreground">See XP checkpoints at 25%, 50%, 75%, and 100% to track your grinding progress.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Any Game Support</h3>
              <p className="text-sm text-muted-foreground">Works with any RPG, MMO, or progression-based game with XP systems.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">XP Calculation Formulas</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Calculation</th>
                  <th className="text-left py-2">Formula</th>
                  <th className="text-left py-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">XP Needed</td>
                  <td className="py-2 font-mono">Target XP - Current XP</td>
                  <td className="py-2">100,000 - 50,000 = 50,000 XP</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Hours Required</td>
                  <td className="py-2 font-mono">XP Needed ÷ XP/Hour</td>
                  <td className="py-2">50,000 ÷ 5,000 = 10 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Sessions Needed</td>
                  <td className="py-2 font-mono">Hours ÷ Session Length</td>
                  <td className="py-2">10 hrs ÷ 2 hrs = 5 sessions</td>
                </tr>
                <tr>
                  <td className="py-2">Days (Continuous)</td>
                  <td className="py-2 font-mono">Hours ÷ 24</td>
                  <td className="py-2">10 hrs ÷ 24 = 0.42 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I find my XP per hour rate?</h3>
              <p className="text-sm text-muted-foreground">Track your XP gain over a timed session. Divide total XP earned by hours played. For accuracy, average multiple sessions. Example: 15,000 XP in 3 hours = 5,000 XP/hour.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's the fastest way to gain XP?</h3>
              <p className="text-sm text-muted-foreground">Focus on high-XP activities: main quests, dungeons with XP bonuses, events with multipliers, and group play bonuses. Check your game's wiki for optimal grinding spots.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do rest bonuses affect XP calculations?</h3>
              <p className="text-sm text-muted-foreground">Yes, many MMOs offer rested XP bonuses (50-200% extra) after logging out. Factor this into your XP/hour rate when planning grinding sessions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How can I level up faster?</h3>
              <p className="text-sm text-muted-foreground">Use XP potions/scrolls, play during double XP events, complete daily/weekly bonuses, join a guild for XP buffs, and focus on high-efficiency activities over low-reward tasks.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is it healthy to grind for long periods?</h3>
              <p className="text-sm text-muted-foreground">Take regular breaks to avoid burnout and health issues. Follow the 20-20-20 rule for eye strain, stay hydrated, stretch regularly, and maintain a balanced gaming schedule with other activities.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Gaming Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/gacha-pull-probability-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Gacha Pull Probability Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate your odds of getting desired characters or items.</p>
            </a>
            <a href="/calculators/loot-probability-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Loot Probability Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate drop rates and expected attempts for rare items.</p>
            </a>
            <a href="/calculators/screen-time-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Screen Time Calculator</h3>
              <p className="text-sm text-muted-foreground">Track and manage your daily gaming and screen time.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
