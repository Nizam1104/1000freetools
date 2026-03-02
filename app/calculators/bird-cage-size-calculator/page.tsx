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

interface BirdSpecies {
  name: string;
  wingspan: number; // inches
  minLength: number; // inches
  minWidth: number; // inches
  minHeight: number; // inches
  activityLevel: "low" | "medium" | "high";
}

const birdSpecies: BirdSpecies[] = [
  { name: "Budgie/Parakeet", wingspan: 12, minLength: 18, minWidth: 18, minHeight: 18, activityLevel: "high" },
  { name: "Cockatiel", wingspan: 14, minLength: 24, minWidth: 24, minHeight: 24, activityLevel: "high" },
  { name: "Lovebird", wingspan: 10, minLength: 18, minWidth: 18, minHeight: 18, activityLevel: "high" },
  { name: "Conure", wingspan: 16, minLength: 24, minWidth: 24, minHeight: 24, activityLevel: "high" },
  { name: "African Grey", wingspan: 20, minLength: 36, minWidth: 36, minHeight: 36, activityLevel: "high" },
  { name: "Amazon Parrot", wingspan: 22, minLength: 36, minWidth: 36, minHeight: 36, activityLevel: "high" },
  { name: "Cockatoo", wingspan: 30, minLength: 48, minWidth: 48, minHeight: 48, activityLevel: "high" },
  { name: "Macaw", wingspan: 40, minLength: 60, minWidth: 60, minHeight: 60, activityLevel: "high" },
  { name: "Canary", wingspan: 8, minLength: 16, minWidth: 16, minHeight: 16, activityLevel: "medium" },
  { name: "Finch", wingspan: 6, minLength: 12, minWidth: 12, minHeight: 12, activityLevel: "medium" },
  { name: "Dove", wingspan: 14, minLength: 20, minWidth: 20, minHeight: 20, activityLevel: "low" },
  { name: "Pigeon", wingspan: 20, minLength: 24, minWidth: 24, minHeight: 24, activityLevel: "medium" },
];

interface CageResult {
  minLength: number;
  minWidth: number;
  minHeight: number;
  minVolume: number;
  wingspanRatio: number;
  recommendation: string;
  activityNote: string;
}

export default function BirdCageSizeCalculatorPage() {
  const [selectedBird, setSelectedBird] = useState<string>("");
  const [customWingspan, setCustomWingspan] = useState<string>("");
  const [numBirds, setNumBirds] = useState<string>("1");
  const [result, setResult] = useState<CageResult | null>(null);

  const calculate = () => {
    let wingspan = 0;
    let baseLength = 0;
    let baseWidth = 0;
    let baseHeight = 0;
    let activityLevel: "low" | "medium" | "high" = "medium";

    if (selectedBird) {
      const bird = birdSpecies.find((b) => b.name === selectedBird);
      if (bird) {
        wingspan = bird.wingspan;
        baseLength = bird.minLength;
        baseWidth = bird.minWidth;
        baseHeight = bird.minHeight;
        activityLevel = bird.activityLevel;
      }
    } else if (customWingspan) {
      wingspan = parseFloat(customWingspan);
      if (!isNaN(wingspan)) {
        baseLength = wingspan * 2;
        baseWidth = wingspan * 1.5;
        baseHeight = wingspan * 1.5;
      }
    }

    if (wingspan === 0) return;

    const numBirdsNum = parseInt(numBirds) || 1;
    
    // Multiply space requirements by number of birds (with diminishing returns for flock birds)
    const multiplier = numBirdsNum === 1 ? 1 : 1 + (numBirdsNum - 1) * 0.5;
    
    const minLength = Math.round(baseLength * multiplier);
    const minWidth = Math.round(baseWidth * multiplier);
    const minHeight = Math.round(baseHeight * multiplier);
    const minVolume = Math.round((minLength * minWidth * minHeight) / 1728); // Convert to cubic feet
    const wingspanRatio = minLength / wingspan;

    let activityNote = "";
    if (activityLevel === "high") {
      activityNote = "High activity level: This bird needs extra flight space and enrichment.";
    } else if (activityLevel === "medium") {
      activityNote = "Medium activity level: Provide regular out-of-cage exercise time.";
    } else {
      activityNote = "Low activity level: Still needs space for wing stretching and hopping.";
    }

    setResult({
      minLength,
      minWidth,
      minHeight,
      minVolume,
      wingspanRatio,
      recommendation: `Minimum cage size should be at least ${wingspanRatio.toFixed(1)}x the wingspan in length.`,
      activityNote,
    });
  };

  const reset = () => {
    setSelectedBird("");
    setCustomWingspan("");
    setNumBirds("1");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird
          </h1>
          <p className="text-muted-foreground">
            Give your bird the space it deserves with our Bird Cage Size Calculator.
            Enter your bird species to get minimum recommended cage dimensions based on
            wingspan and behavioral needs — ensuring a healthy, stress-free environment
            for your feathered friend.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bird-species">Bird Species</Label>
                <Select value={selectedBird} onValueChange={setSelectedBird}>
                  <SelectTrigger id="bird-species">
                    <SelectValue placeholder="Select bird species" />
                  </SelectTrigger>
                  <SelectContent>
                    {birdSpecies.map((bird) => (
                      <SelectItem key={bird.name} value={bird.name}>
                        {bird.name} (wingspan: {bird.wingspan}&quot;)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-wingspan">
                  Or Enter Custom Wingspan (inches)
                </Label>
                <Input
                  id="custom-wingspan"
                  type="number"
                  placeholder="e.g., 14"
                  value={customWingspan}
                  onChange={(e) => setCustomWingspan(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="num-birds">Number of Birds</Label>
                <Input
                  id="num-birds"
                  type="number"
                  min="1"
                  value={numBirds}
                  onChange={(e) => setNumBirds(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Length</p>
                      <p className="text-xl font-bold text-primary">
                        {result.minLength}&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Width</p>
                      <p className="text-xl font-bold text-primary">
                        {result.minWidth}&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="text-xl font-bold text-primary">
                        {result.minHeight}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume:</span>
                      <span className="font-semibold">{result.minVolume} cu ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wingspan Ratio:</span>
                      <span className="font-semibold">{result.wingspanRatio.toFixed(1)}x</span>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium mb-1">Recommendation:</p>
                    <p className="text-sm">{result.recommendation}</p>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      {result.activityNote}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a bird species or enter wingspan to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Cage Size Matters for Birds
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Birds are active creatures that need space to stretch their wings,
                  hop between perches, and engage in natural behaviors. A cage that&apos;s
                  too small can lead to stress, feather plucking, and health problems.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Minimum length:</strong> At least 2x the wingspan for horizontal flyers
                  </li>
                  <li>
                    <strong>Minimum width:</strong> At least 1.5x the wingspan
                  </li>
                  <li>
                    <strong>Minimum height:</strong> At least 1.5x the wingspan (more for climbers)
                  </li>
                  <li>
                    <strong>Bar spacing:</strong> Should be appropriate for species (1/4&quot; for small birds, 3/4&quot; for large)
                  </li>
                </ul>
                <p>
                  Remember: Bigger is always better! These are minimum recommendations.
                  Provide additional out-of-cage exercise time daily for optimal bird health.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
