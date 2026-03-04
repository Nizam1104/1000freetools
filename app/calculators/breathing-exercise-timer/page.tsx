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
                    <span className="font-medium">{totalSeconds} seconds ({(totalSeconds / 60).toFixed(1)} min)</span>
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

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Breathing Exercise Timer
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose a breathing technique</p>
                    <p>Select from popular patterns like Box Breathing (4-4-4-4), 4-7-8 method, or Wim Hof. Each technique has different timing for inhale, hold, exhale, and second hold phases.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your session length</p>
                    <p>Enter the number of cycles or total minutes. Beginners should start with 5 cycles or 3-5 minutes. Experienced practitioners can work up to 10-20 minute sessions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start and follow the guided pattern</p>
                    <p>The timer displays each phase clearly. Breathe through your nose unless the technique specifies otherwise. If you feel lightheaded, return to normal breathing.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Breathing Techniques Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Technique</th>
                      <th className="text-left py-3 px-2 font-semibold">Pattern (seconds)</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Box Breathing</td>
                      <td className="py-3 px-2">4-4-4-4</td>
                      <td className="py-3 px-2">Focus, stress relief</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4-7-8 Breathing</td>
                      <td className="py-3 px-2">4-7-8-0</td>
                      <td className="py-3 px-2">Sleep, anxiety</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Coherent Breathing</td>
                      <td className="py-3 px-2">5-0-5-0</td>
                      <td className="py-3 px-2">HRV optimization</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Wim Hof Method</td>
                      <td className="py-3 px-2">3-0-3-15</td>
                      <td className="py-3 px-2">Energy, immunity</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Buteyko</td>
                      <td className="py-3 px-2">2-0-3-0</td>
                      <td className="py-3 px-2">Asthma, nasal breathing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Patterns show inhale-hold-exhale-hold timing in seconds. Start with shorter sessions and gradually increase duration as you build tolerance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Breathing Techniques
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Controlled Breathing Affects Your Body</h4>
                  <p>
                    Slow, controlled breathing activates the parasympathetic nervous system — your rest-and-digest mode. This lowers heart rate, reduces blood pressure, and decreases cortisol levels. The vagus nerve carries signals from your diaphragm to your brain, triggering relaxation within minutes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Box Breathing Works for Stress</h4>
                  <p>
                    Box breathing's equal 4-second phases create a predictable rhythm that occupies your mind and prevents racing thoughts. The holds increase CO2 tolerance, which reduces the panic response. Navy SEALs use it because it works under extreme pressure.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Science Behind 4-7-8 Breathing</h4>
                  <p>
                    Dr. Andrew Weil's 4-7-8 technique extends the exhale to twice the length of the inhale. Longer exhales stimulate the vagus nerve more strongly, producing deeper relaxation. The 7-second hold allows oxygen to fully saturate your bloodstream.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Heart Rate Variability and Coherent Breathing</h4>
                  <p>
                    Breathing at 5-6 breaths per minute (like 5-second inhale, 5-second exhale) synchronizes your heart rate with your breath. This resonance frequency maximizes heart rate variability — a key marker of stress resilience and cardiovascular health.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Effective Breathing Practice
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start Small and Build Gradually</p>
                    <p>Begin with 3-5 minutes daily. Your body needs time to adapt to new breathing patterns. After two weeks, increase to 10 minutes. Consistency matters more than duration.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Practice at the Same Time Daily</p>
                    <p>Morning practice sets a calm tone for the day. Evening practice improves sleep quality. Many people benefit from both — 5 minutes upon waking and 10 minutes before bed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Nasal Breathing When Possible</p>
                    <p>Your nose filters, warms, and humidifies air. Nasal breathing also produces nitric oxide, which improves oxygen uptake. Mouth breathing should be reserved for specific techniques like Wim Hof.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Stop If You Feel Dizzy or Uncomfortable</p>
                    <p>Lightheadedness means you're hyperventilating or holding too long. Return to normal breathing immediately. Resume with shorter holds or fewer cycles. Never push through discomfort.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How long should I practice breathing exercises?</h4>
                  <p>
                    Start with 3-5 minutes daily. Most people see benefits with 10-15 minutes per day. You can split this into multiple short sessions — 5 minutes morning and evening works well for many people.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Which breathing technique is best for anxiety?</h4>
                  <p>
                    The 4-7-8 method is particularly effective for anxiety because the extended exhale strongly activates the relaxation response. Box breathing also works well, especially for acute stress during the day.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can breathing exercises help me fall asleep?</h4>
                  <p>
                    Yes. The 4-7-8 technique was specifically designed for sleep. Practice it lying in bed with lights out. Most people fall asleep within 5-10 minutes. It works by slowing heart rate and quieting mental chatter.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is it normal to feel weird during Wim Hof breathing?</h4>
                  <p>
                    Tingling in extremities and lightheadedness are common due to temporary changes in blood CO2 and pH. These sensations should pass quickly. Never practice Wim Hof near water or while driving. Skip the holds if you have health conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How quickly will I notice results?</h4>
                  <p>
                    Many people feel calmer immediately after a single session. For lasting changes in stress levels and sleep quality, expect 2-4 weeks of daily practice. Heart rate variability improvements typically show up within 2 weeks.
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
                  href="/calculators/meditation-timer"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Meditation Timer</span>
                  <p className="text-muted-foreground">Customizable timer for mindfulness and meditation sessions</p>
                </a>
                <a
                  href="/calculators/heart-rate-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Heart Rate Calculator</span>
                  <p className="text-muted-foreground">Calculate target heart rate zones for exercise and training</p>
                </a>
                <a
                  href="/calculators/sleep-cycle-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Sleep Cycle Calculator</span>
                  <p className="text-muted-foreground">Find optimal wake times based on 90-minute sleep cycles</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
