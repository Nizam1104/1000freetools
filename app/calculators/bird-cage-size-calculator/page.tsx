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
                How to Use This Bird Cage Size Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your bird species</p>
                    <p>Choose from the dropdown list or enter a custom wingspan measurement in inches.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the number of birds</p>
                    <p>If housing multiple birds together, input the total number to get adjusted space requirements.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review cage size recommendations</p>
                    <p>Get minimum length, width, height, and volume requirements tailored to your bird.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Minimum Cage Sizes by Species
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Species</th>
                      <th className="text-left py-3 px-2 font-semibold">Min Length</th>
                      <th className="text-left py-3 px-2 font-semibold">Min Width</th>
                      <th className="text-left py-3 px-2 font-semibold">Min Height</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Finch</td>
                      <td className="py-3 px-2">12"</td>
                      <td className="py-3 px-2">12"</td>
                      <td className="py-3 px-2">12"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Canary</td>
                      <td className="py-3 px-2">16"</td>
                      <td className="py-3 px-2">16"</td>
                      <td className="py-3 px-2">16"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Budgie/Parakeet</td>
                      <td className="py-3 px-2">18"</td>
                      <td className="py-3 px-2">18"</td>
                      <td className="py-3 px-2">18"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Lovebird</td>
                      <td className="py-3 px-2">18"</td>
                      <td className="py-3 px-2">18"</td>
                      <td className="py-3 px-2">18"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cockatiel</td>
                      <td className="py-3 px-2">24"</td>
                      <td className="py-3 px-2">24"</td>
                      <td className="py-3 px-2">24"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Conure</td>
                      <td className="py-3 px-2">24"</td>
                      <td className="py-3 px-2">24"</td>
                      <td className="py-3 px-2">24"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">African Grey</td>
                      <td className="py-3 px-2">36"</td>
                      <td className="py-3 px-2">36"</td>
                      <td className="py-3 px-2">36"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Amazon Parrot</td>
                      <td className="py-3 px-2">36"</td>
                      <td className="py-3 px-2">36"</td>
                      <td className="py-3 px-2">36"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cockatoo</td>
                      <td className="py-3 px-2">48"</td>
                      <td className="py-3 px-2">48"</td>
                      <td className="py-3 px-2">48"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Macaw</td>
                      <td className="py-3 px-2">60"</td>
                      <td className="py-3 px-2">60"</td>
                      <td className="py-3 px-2">60"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are minimum sizes for single birds. Larger is always better.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Cage Size Matters for Birds
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Physical Health</h4>
                  <p>
                    Birds need space to stretch their wings fully without touching the sides. A cage that is too
                    small can lead to muscle atrophy, obesity, and joint problems. Flightless birds still need
                    room to hop, climb, and exercise their wings.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Mental Wellbeing</h4>
                  <p>
                    Confined birds develop behavioral problems like feather plucking, screaming, and aggression.
                    These are signs of stress and boredom. A spacious cage with room for toys, perches, and
                    foraging activities keeps birds mentally stimulated.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Natural Behaviors</h4>
                  <p>
                    Wild birds fly miles each day. While captivity limits this, they still need space for short
                    flights between perches. Horizontal space is more important than vertical for most species
                    because birds fly horizontally, not up and down like elevators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Choosing the Right Cage
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Prioritize horizontal space</p>
                    <p>Most birds fly horizontally. A long, wide cage is better than a tall, narrow one.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check bar spacing</p>
                    <p>Small birds can escape through wide bars or get their heads stuck. Use 1/4" for finches and budgies, 1/2" for cockatiels, 3/4" for large parrots.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Plan for out-of-cage time</p>
                    <p>No cage replaces daily supervised flight time. Aim for 2-4 hours outside the cage daily.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider cage placement</p>
                    <p>Place the cage in a social area but away from drafts, direct sunlight, and kitchen fumes.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Is bigger always better for bird cages?</h4>
                  <p>
                    Yes. There is no such thing as a cage being too large. Birds use every inch of available space.
                    If you can afford a bigger cage than the minimum recommendation, get it. Your bird will be
                    healthier and happier.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I keep multiple birds in one cage?</h4>
                  <p>
                    Yes, but you need more space. This calculator adjusts for multiple birds by adding 50% more
                    space for each additional bird. However, some species are territorial and should not be housed
                    together. Research your species before combining birds.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Do round cages work for birds?</h4>
                  <p>
                    Round cages are not recommended. Birds need corners to retreat to when feeling insecure. Round
                    cages also make it difficult to place perches properly and can cause stress because birds cannot
                    find a safe spot.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How important is cage height?</h4>
                  <p>
                    Height matters less than length and width for most species. Parrots climb, so they use vertical
                    space, but they fly horizontally. A cage that is wider than it is tall is usually better than
                    a tall, narrow aviary-style cage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What else should I include in the cage?</h4>
                  <p>
                    Add multiple perches of varying diameters to exercise feet, toys for mental stimulation, food
                    and water dishes, and a bath area. Rotate toys regularly to prevent boredom. Leave some empty
                    space for movement — don't fill every inch with accessories.
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
                  href="/calculators/pet-calorie-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Pet Calorie Calculator</span>
                  <p className="text-muted-foreground">Calculate daily calorie needs for dogs and cats based on weight and activity</p>
                </a>
                <a
                  href="/calculators/fish-tank-volume-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Fish Tank Volume Calculator</span>
                  <p className="text-muted-foreground">Calculate aquarium volume and determine appropriate fish stocking levels</p>
                </a>
                <a
                  href="/calculators/dog-age-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Dog Age Calculator</span>
                  <p className="text-muted-foreground">Convert dog years to human years based on breed and size</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
