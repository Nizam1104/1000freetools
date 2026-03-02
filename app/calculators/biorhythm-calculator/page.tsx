"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BiorhythmCalculatorPage() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [result, setResult] = useState<{
    physical: number;
    emotional: number;
    intellectual: number;
    physicalStatus: string;
    emotionalStatus: string;
    intellectualStatus: string;
    overallDay: string;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();
    
    // Calculate days lived
    const daysLived = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLived < 0) return;

    // Biorhythm cycles (in days)
    const physicalCycle = 23;
    const emotionalCycle = 28;
    const intellectualCycle = 33;

    // Calculate biorhythm values using sine wave
    const physical = Math.sin((2 * Math.PI * daysLived) / physicalCycle) * 100;
    const emotional = Math.sin((2 * Math.PI * daysLived) / emotionalCycle) * 100;
    const intellectual = Math.sin((2 * Math.PI * daysLived) / intellectualCycle) * 100;

    // Determine status for each cycle
    const getStatus = (value: number) => {
      if (value >= 80) return "Peak (+80-100%)";
      if (value >= 50) return "High (+50-80%)";
      if (value >= 20) return "Positive (+20-50%)";
      if (value >= -20) return "Neutral (-20-+20%)";
      if (value >= -50) return "Negative (-50--20%)";
      if (value >= -80) return "Low (-80--50%)";
      return "Critical (-100--80%)";
    };

    // Calculate overall day score
    const overallScore = (physical + emotional + intellectual) / 3;
    let overallDay: string;
    if (overallScore >= 60) overallDay = "Excellent Day!";
    else if (overallScore >= 30) overallDay = "Good Day";
    else if (overallScore >= -30) overallDay = "Average Day";
    else if (overallScore >= -60) overallDay = "Challenging Day";
    else overallDay = "Difficult Day";

    setResult({
      physical: Math.round(physical),
      emotional: Math.round(emotional),
      intellectual: Math.round(intellectual),
      physicalStatus: getStatus(physical),
      emotionalStatus: getStatus(emotional),
      intellectualStatus: getStatus(intellectual),
      overallDay
    });
  };

  const reset = () => {
    setBirthDate("");
    setTargetDate("");
    setResult(null);
  };

  // Set default target date to today
  useState(() => {
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles</h1>
          <p className="text-muted-foreground">
            Discover your natural performance rhythms with our Biorhythm Calculator. Enter your birth date to see your current physical, emotional, and intellectual cycle positions — helping you plan important activities on your peak days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth</Label>
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={birthDate} 
                  onChange={(e) => setBirthDate(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input 
                  id="targetDate" 
                  type="date" 
                  value={targetDate} 
                  onChange={(e) => setTargetDate(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Leave as today for current readings</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Cycles
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Overall Day Rating</p>
                    <p className={`text-2xl font-bold ${
                      result.overallDay.includes("Excellent") ? "text-green-500" :
                      result.overallDay.includes("Good") ? "text-blue-500" :
                      result.overallDay.includes("Average") ? "text-yellow-500" :
                      result.overallDay.includes("Challenging") ? "text-orange-500" : "text-red-500"
                    }`}>{result.overallDay}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Physical (23 days)</span>
                        <span className="text-sm font-semibold">{result.physical}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            result.physical >= 50 ? "bg-green-500" :
                            result.physical >= 0 ? "bg-blue-500" :
                            result.physical >= -50 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.abs(result.physical)}%`, marginLeft: result.physical < 0 ? `${50 + result.physical/2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.physicalStatus}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Emotional (28 days)</span>
                        <span className="text-sm font-semibold">{result.emotional}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            result.emotional >= 50 ? "bg-green-500" :
                            result.emotional >= 0 ? "bg-blue-500" :
                            result.emotional >= -50 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.abs(result.emotional)}%`, marginLeft: result.emotional < 0 ? `${50 + result.emotional/2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.emotionalStatus}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Intellectual (33 days)</span>
                        <span className="text-sm font-semibold">{result.intellectual}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            result.intellectual >= 50 ? "bg-green-500" :
                            result.intellectual >= 0 ? "bg-blue-500" :
                            result.intellectual >= -50 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.abs(result.intellectual)}%`, marginLeft: result.intellectual < 0 ? `${50 + result.intellectual/2}%` : '50%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.intellectualStatus}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Understanding Your Cycles:</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• <strong>Physical:</strong> Energy, strength, endurance, coordination</li>
                      <li>• <strong>Emotional:</strong> Mood, creativity, sensitivity, relationships</li>
                      <li>• <strong>Intellectual:</strong> Logic, analysis, memory, decision-making</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your birth date and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
