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

interface TrailResult {
  distance: number;
  elevationGain: number;
  terrainType: string;
  difficultyScore: number;
  difficultyRating: string;
  estimatedTime: string;
  calorieBurn: number;
  recommendations: string[];
  trailClass: string;
}

export default function TrailDifficultyEstimatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [elevationGain, setElevationGain] = useState<string>("");
  const [terrainType, setTerrainType] = useState<string>("moderate");
  const [unit, setUnit] = useState<string>("km");
  const [result, setResult] = useState<TrailResult | null>(null);

  const calculate = () => {
    const distanceNum = parseFloat(distance) || 0;
    const elevationNum = parseFloat(elevationGain) || 0;

    if (distanceNum === 0) return;

    // Convert to km if needed
    let distanceKm = distanceNum;
    if (unit === "miles") {
      distanceKm = distanceNum * 1.609;
    }

    // Calculate difficulty score (0-100)
    // Based on distance, elevation, and terrain
    const distanceScore = distanceKm * 5; // 5 points per km
    const elevationScore = elevationNum / 100; // 1 point per 100m elevation
    
    const terrainMultipliers: Record<string, number> = {
      easy: 1.0,
      moderate: 1.2,
      rough: 1.5,
      technical: 1.8,
      extreme: 2.0,
    };
    const terrainMult = terrainMultipliers[terrainType] || 1.0;

    let difficultyScore = (distanceScore + elevationScore) * terrainMult;
    difficultyScore = Math.min(100, difficultyScore);

    // Determine difficulty rating
    let difficultyRating = "";
    let trailClass = "";
    
    if (difficultyScore < 20) {
      difficultyRating = "Easy - Suitable for beginners";
      trailClass = "Class 1";
    } else if (difficultyScore < 40) {
      difficultyRating = "Moderate - Some fitness required";
      trailClass = "Class 2";
    } else if (difficultyScore < 60) {
      difficultyRating = "Challenging - Good fitness needed";
      trailClass = "Class 3";
    } else if (difficultyScore < 80) {
      difficultyRating = "Difficult - Experienced hikers only";
      trailClass = "Class 4";
    } else {
      difficultyRating = "Very Difficult - Expert level";
      trailClass = "Class 5";
    }

    // Estimate time using Naismith's rule
    // 1 hour per 5km + 1 hour per 600m elevation
    const baseHours = distanceKm / 5;
    const elevationHours = elevationNum / 600;
    const totalHours = (baseHours + elevationHours) * terrainMult;
    
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    const estimatedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    // Estimate calorie burn (approximate)
    // ~100 cal/km + elevation factor
    const calorieBurn = Math.round((distanceKm * 100 + elevationNum * 0.1) * terrainMult);

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`⏱️ Estimated time: ${estimatedTime}`);
    recommendations.push(`🔥 Estimated calories: ${calorieBurn} kcal`);

    if (difficultyScore < 30) {
      recommendations.push("👟 Suitable for casual hikers and families");
      recommendations.push("💧 Bring at least 0.5L water per hour");
    } else if (difficultyScore < 60) {
      recommendations.push("🥾 Proper hiking boots recommended");
      recommendations.push("🎒 Bring 1L water per 2 hours");
      recommendations.push("📱 Inform someone of your plans");
    } else {
      recommendations.push("⚠️ Technical gear may be required");
      recommendations.push("🧭 Navigation skills essential");
      recommendations.push("🚨 Consider hiking with partner");
      recommendations.push("📞 Carry emergency communication device");
    }

    if (elevationNum > 1000) {
      recommendations.push("🏔️ High elevation - watch for altitude symptoms");
    }

    setResult({
      distance: distanceKm,
      elevationGain: elevationNum,
      terrainType,
      difficultyScore: parseFloat(difficultyScore.toFixed(1)),
      difficultyRating,
      estimatedTime,
      calorieBurn,
      recommendations,
      trailClass,
    });
  };

  const reset = () => {
    setDistance("");
    setElevationGain("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is
          </h1>
          <p className="text-muted-foreground">
            Choose the right hiking trail for your fitness level with our Trail Difficulty Estimator.
            Input trail distance, total elevation gain, and terrain type to get an objective
            difficulty rating — ensuring safe and enjoyable outdoor adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="distance">Trail Distance</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km">Kilometers</SelectItem>
                      <SelectItem value="miles">Miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevation">Total Elevation Gain (meters)</Label>
                <Input
                  id="elevation"
                  type="number"
                  value={elevationGain}
                  onChange={(e) => setElevationGain(e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terrain">Terrain Type</Label>
                <Select value={terrainType} onValueChange={setTerrainType}>
                  <SelectTrigger id="terrain">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy (Well-maintained trail)</SelectItem>
                    <SelectItem value="moderate">Moderate (Some rough sections)</SelectItem>
                    <SelectItem value="rough">Rough (Rocky, uneven)</SelectItem>
                    <SelectItem value="technical">Technical (Scrambling required)</SelectItem>
                    <SelectItem value="extreme">Extreme (Exposed, dangerous)</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Trail Assessment</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.difficultyScore < 30 ? "bg-green-100 dark:bg-green-900/20" :
                    result.difficultyScore < 60 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Difficulty Score</p>
                    <p className="text-4xl font-bold">{result.difficultyScore}/100</p>
                    <p className="text-sm mt-1 font-medium">{result.difficultyRating}</p>
                    <p className="text-xs text-muted-foreground mt-1">{result.trailClass}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Est. Time</p>
                      <p className="text-lg font-bold">{result.estimatedTime}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-bold">{result.calorieBurn}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Distance:</span>
                      <span className="font-semibold">{result.distance.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Elevation Gain:</span>
                      <span className="font-semibold">{result.elevationGain} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Terrain:</span>
                      <span className="font-semibold capitalize">{result.terrainType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter trail details and click Calculate to see assessment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Trail Difficulty Classes
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Class 1 (Easy):</strong> Flat, well-marked trails
                  </li>
                  <li>
                    <strong>Class 2 (Moderate):</strong> Some elevation, clear trail
                  </li>
                  <li>
                    <strong>Class 3 (Challenging):</strong> Steep sections, route finding
                  </li>
                  <li>
                    <strong>Class 4 (Difficult):</strong> Exposure, hands may be needed
                  </li>
                  <li>
                    <strong>Class 5 (Extreme):</strong> Technical climbing, ropes recommended
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This estimator uses Naismith&apos;s rule for time
                  estimation. Actual times vary based on fitness, pack weight, and conditions.
                  Always check current trail conditions before hiking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
