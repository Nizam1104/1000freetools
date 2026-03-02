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

interface BreathingPattern {
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
  benefits: string[];
}

const breathingPatterns: BreathingPattern[] = [
  {
    name: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: "Navy SEAL technique for stress management and focus",
    benefits: ["Reduces stress", "Improves focus", "Calms nervous system"],
  },
  {
    name: "4-7-8 Breathing",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: "Dr. Andrew Weil's relaxation technique",
    benefits: ["Promotes sleep", "Reduces anxiety", "Calms mind"],
  },
  {
    name: "Coherent Breathing",
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    description: "Resonant frequency breathing for HRV optimization",
    benefits: ["Increases HRV", "Balances autonomic system", "Reduces stress"],
  },
  {
    name: "Wim Hof Method",
    inhale: 3,
    hold1: 0,
    exhale: 3,
    hold2: 15,
    description: "Power breathing for energy and immune support",
    benefits: ["Boosts energy", "Strengthens immune system", "Increases alkalinity"],
  },
  {
    name: "Buteyko Breathing",
    inhale: 2,
    hold1: 0,
    exhale: 3,
    hold2: 0,
    description: "Shallow nasal breathing for respiratory health",
    benefits: ["Improves asthma", "Reduces hyperventilation", "Nasal breathing"],
  },
  {
    name: "Alternate Nostril",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 2,
    description: "Yogic Nadi Shodhana for balance",
    benefits: ["Balances brain hemispheres", "Calms mind", "Prepares for meditation"],
  },
];

export default function BreathingExerciseTimerPage() {
  const [selectedPattern, setSelectedPattern] = useState<string>("Box Breathing");
  const [cycleCount, setCycleCount] = useState<string>("5");
  const [sessionMinutes, setSessionMinutes] = useState<string>("5");
  const [result, setResult] = useState<BreathingPattern | null>(null);

  const calculate = () => {
    const pattern = breathingPatterns.find((p) => p.name === selectedPattern);
    if (!pattern) return;

    setResult(pattern);
  };

  const reset = () => {
    setResult(null);
  };

  const pattern = breathingPatterns.find((p) => p.name === selectedPattern);
  const totalCycleTime = pattern ? pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2 : 0;
  const cycles = parseInt(cycleCount) || 5;
  const totalSeconds = totalCycleTime * cycles;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Breathing Exercise Timer – Guided Timer for Box Breathing, 4-7-8 & More
          </h1>
          <p className="text-muted-foreground">
            Reduce stress and improve focus with our Breathing Exercise Timer.
            Choose from popular techniques like box breathing (4-4-4-4) or the 4-7-8 method
            and follow guided visual cues through each inhale, hold, and exhale phase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pattern">Breathing Technique</Label>
                <Select value={selectedPattern} onValueChange={setSelectedPattern}>
                  <SelectTrigger id="pattern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {breathingPatterns.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name} ({p.inhale}-{p.hold1}-{p.exhale}-{p.hold2})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {pattern && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">{pattern.description}</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                      <p className="text-xs text-muted-foreground">Inhale</p>
                      <p className="text-lg font-bold">{pattern.inhale}s</p>
                    </div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                      <p className="text-xs text-muted-foreground">Hold</p>
                      <p className="text-lg font-bold">{pattern.hold1}s</p>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                      <p className="text-xs text-muted-foreground">Exhale</p>
                      <p className="text-lg font-bold">{pattern.exhale}s</p>
                    </div>
                    {pattern.hold2 > 0 && (
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                        <p className="text-xs text-muted-foreground">Hold</p>
                        <p className="text-lg font-bold">{pattern.hold2}s</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="cycles">Number of Cycles</Label>
                  <Input
                    id="cycles"
                    type="number"
                    value={cycleCount}
                    onChange={(e) => setCycleCount(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="minutes">Session (minutes)</Label>
                  <Input
                    id="minutes"
                    type="number"
                    value={sessionMinutes}
                    onChange={(e) => setSessionMinutes(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              {totalCycleTime > 0 && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cycle duration:</span>
                    <span className="font-medium">{totalCycleTime} seconds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total time:</span>
                    <span className="font-medium">{totalSeconds} seconds ({(totalSeconds/60).toFixed(1)} min)</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Start Exercise
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Exercise Details</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Selected Technique</p>
                    <p className="text-2xl font-bold text-primary">{result.name}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{result.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Benefits</h4>
                    <ul className="space-y-1">
                      {result.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-green-500">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">
                      How to Practice:
                    </h4>
                    <ol className="space-y-1 text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside">
                      <li>Find a comfortable seated position</li>
                      <li>Keep your spine straight and shoulders relaxed</li>
                      <li>Breathe through your nose (unless specified)</li>
                      <li>Follow the timing pattern for {cycleCount} cycles</li>
                      <li>Practice 1-3 times daily for best results</li>
                    </ol>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Tip:</strong> If you feel lightheaded, return to normal
                      breathing. Start with fewer cycles and gradually increase.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a breathing pattern and click Start to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Breathing Exercise Benefits
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Controlled breathing activates the parasympathetic nervous system:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Reduces cortisol:</strong> Lowers stress hormone levels
                  </li>
                  <li>
                    <strong>Improves HRV:</strong> Heart rate variability increases
                  </li>
                  <li>
                    <strong>Better sleep:</strong> Calms the mind before bed
                  </li>
                  <li>
                    <strong>Enhanced focus:</strong> Improves concentration and clarity
                  </li>
                  <li>
                    <strong>Emotional regulation:</strong> Helps manage anxiety and anger
                  </li>
                </ul>
                <p>
                  <strong>Science:</strong> Slow breathing (5-6 breaths/minute) optimizes
                  heart rate variability and activates the vagus nerve for relaxation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
