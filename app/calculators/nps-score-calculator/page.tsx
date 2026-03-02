"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NPSScoreCalculatorPage() {
  const [promoters, setPromoters] = useState<string>("");
  const [passives, setPassives] = useState<string>("");
  const [detractors, setDetractors] = useState<string>("");
  const [result, setResult] = useState<{
    nps: number;
    totalResponses: number;
    promoterPercent: number;
    passivePercent: number;
    detractorPercent: number;
    rating: string;
    interpretation: string;
  } | null>(null);

  const calculate = () => {
    const prom = parseInt(promoters) || 0;
    const pass = parseInt(passives) || 0;
    const det = parseInt(detractors) || 0;

    const total = prom + pass + det;
    if (total === 0) return;

    const promoterPercent = (prom / total) * 100;
    const passivePercent = (pass / total) * 100;
    const detractorPercent = (det / total) * 100;

    // NPS = % Promoters - % Detractors
    const nps = Math.round(promoterPercent - detractorPercent);

    // Determine rating
    let rating: string;
    let interpretation: string;

    if (nps >= 75) {
      rating = "World Class";
      interpretation = "Exceptional customer loyalty! Your customers are highly likely to recommend your brand.";
    } else if (nps >= 50) {
      rating = "Excellent";
      interpretation = "Strong customer loyalty with great advocacy. Keep up the excellent work!";
    } else if (nps >= 30) {
      rating = "Good";
      interpretation = "Above average loyalty. Most customers are satisfied but there's room for improvement.";
    } else if (nps >= 0) {
      rating = "Average";
      interpretation = "Neutral sentiment. Focus on converting passives and reducing detractors.";
    } else if (nps >= -30) {
      rating = "Poor";
      interpretation = "Below average loyalty. Significant work needed to improve customer experience.";
    } else {
      rating = "Critical";
      interpretation = "Serious customer satisfaction issues. Immediate action required to address customer concerns.";
    }

    setResult({
      nps,
      totalResponses: total,
      promoterPercent: Math.round(promoterPercent * 10) / 10,
      passivePercent: Math.round(passivePercent * 10) / 10,
      detractorPercent: Math.round(detractorPercent * 10) / 10,
      rating,
      interpretation
    });
  };

  const reset = () => {
    setPromoters("");
    setPassives("");
    setDetractors("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results</h1>
          <p className="text-muted-foreground">
            Measure customer loyalty in seconds with our NPS Score Calculator. Enter the number of Promoters, Passives, and Detractors from your survey to calculate your Net Promoter Score — the gold standard for measuring customer satisfaction and brand advocacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="promoters">Promoters (Score 9-10)</Label>
                <Input 
                  id="promoters" 
                  type="number" 
                  placeholder="e.g., 50" 
                  value={promoters} 
                  onChange={(e) => setPromoters(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Loyal enthusiasts who keep buying and refer others</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passives">Passives (Score 7-8)</Label>
                <Input 
                  id="passives" 
                  type="number" 
                  placeholder="e.g., 30" 
                  value={passives} 
                  onChange={(e) => setPassives(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Satisfied but unenthusiastic customers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detractors">Detractors (Score 0-6)</Label>
                <Input 
                  id="detractors" 
                  type="number" 
                  placeholder="e.g., 20" 
                  value={detractors} 
                  onChange={(e) => setDetractors(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Unhappy customers who can damage your brand</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate NPS
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
                    <p className="text-sm text-muted-foreground">Net Promoter Score</p>
                    <p className={`text-5xl font-bold ${
                      result.nps >= 50 ? "text-green-500" :
                      result.nps >= 30 ? "text-blue-500" :
                      result.nps >= 0 ? "text-yellow-500" : "text-red-500"
                    }`}>{result.nps}</p>
                    <p className="text-sm mt-2 font-semibold">{result.rating}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Promoters</span>
                      <span className="text-sm font-semibold">{result.promoterPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${result.promoterPercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Passives</span>
                      <span className="text-sm font-semibold">{result.passivePercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: `${result.passivePercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Detractors</span>
                      <span className="text-sm font-semibold">{result.detractorPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: `${result.detractorPercent}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{result.interpretation}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">NPS Scale:</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• 75-100: World Class</li>
                      <li>• 50-74: Excellent</li>
                      <li>• 30-49: Good</li>
                      <li>• 0-29: Average</li>
                      <li>• Below 0: Needs Improvement</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter survey responses and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
