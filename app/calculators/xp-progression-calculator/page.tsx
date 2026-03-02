"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
