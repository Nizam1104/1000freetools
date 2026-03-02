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

interface PetAgeData {
  petType: "dog" | "cat";
  size?: "small" | "medium" | "large" | "giant";
}

interface AgeResult {
  humanAge: number;
  lifeStage: string;
  lifeExpectancy: string;
  healthConsiderations: string[];
  equivalentMilestones: string[];
}

export default function PetAgeCalculatorPage() {
  const [petType, setPetType] = useState<string>("dog");
  const [petAge, setPetAge] = useState<string>("");
  const [dogSize, setDogSize] = useState<string>("medium");
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(petAge);
    if (isNaN(ageNum)) return;

    let humanAge = 0;
    let lifeStage = "";
    let lifeExpectancy = "";
    let healthConsiderations: string[] = [];
    let equivalentMilestones: string[] = [];

    if (petType === "dog") {
      // Dog age calculation based on size
      // First year = 15 human years
      // Second year = +9 human years
      // After that, varies by size

      if (ageNum <= 1) {
        humanAge = ageNum * 15;
      } else if (ageNum <= 2) {
        humanAge = 15 + (ageNum - 1) * 9;
      } else {
        const sizeMultipliers: Record<string, number> = {
          small: 4.5,
          medium: 5.5,
          large: 6.5,
          giant: 7.5,
        };
        humanAge = 24 + (ageNum - 2) * (sizeMultipliers[dogSize] || 5.5);
      }

      // Life stages for dogs
      if (ageNum < 1) {
        lifeStage = "Puppy";
        lifeExpectancy = "Rapid growth phase";
        healthConsiderations = ["Vaccination schedule", "Socialization", "Training basics"];
        equivalentMilestones = ["Learning to walk", "Teething", "Weaning"];
      } else if (ageNum < 3) {
        lifeStage = "Adolescent/Young Adult";
        lifeExpectancy = "Peak energy period";
        healthConsiderations = ["Spay/neuter consideration", "Continued training", "Exercise needs"];
        equivalentMilestones = ["Teenage years", "Full height reached", "Sexual maturity"];
      } else if (ageNum < 7) {
        lifeStage = "Adult";
        lifeExpectancy = "Prime of life";
        healthConsiderations = ["Annual vet checkups", "Dental care", "Weight management"];
        equivalentMilestones = ["Young adult", "Career age", "Peak fitness"];
      } else if (ageNum < 11) {
        lifeStage = "Mature/Senior";
        lifeExpectancy = "Slowing down";
        healthConsiderations = ["Bi-annual vet visits", "Joint health", "Diet adjustments"];
        equivalentMilestones = ["Middle age", "Empty nesters", "Retirement planning"];
      } else {
        lifeStage = "Geriatric";
        lifeExpectancy = "Golden years";
        healthConsiderations = ["Comfort care", "Mobility support", "Quality of life monitoring"];
        equivalentMilestones = ["Retired", "Grandparent age", "Wisdom years"];
      }
    } else {
      // Cat age calculation
      // First year = 15 human years
      // Second year = +9 human years (24 total)
      // After that, +4 human years per cat year

      if (ageNum <= 1) {
        humanAge = ageNum * 15;
      } else if (ageNum <= 2) {
        humanAge = 15 + (ageNum - 1) * 9;
      } else {
        humanAge = 24 + (ageNum - 2) * 4;
      }

      // Life stages for cats
      if (ageNum < 1) {
        lifeStage = "Kitten";
        lifeExpectancy = "Rapid growth phase";
        healthConsiderations = ["Vaccination schedule", "Socialization", "Spay/neuter timing"];
        equivalentMilestones = ["Learning to walk", "Teething", "Weaning"];
      } else if (ageNum < 3) {
        lifeStage = "Junior/Young Adult";
        lifeExpectancy = "Peak energy period";
        healthConsiderations = ["Annual checkups", "Dental care", "Exercise and play"];
        equivalentMilestones = ["Teenage years", "Full size reached", "Sexual maturity"];
      } else if (ageNum < 7) {
        lifeStage = "Prime Adult";
        lifeExpectancy = "Prime of life";
        healthConsiderations = ["Annual vet visits", "Weight monitoring", "Dental care"];
        equivalentMilestones = ["Young adult", "Career age", "Peak fitness"];
      } else if (ageNum < 11) {
        lifeStage = "Mature";
        lifeExpectancy = "Slowing down";
        healthConsiderations = ["Bi-annual vet visits", "Kidney function monitoring", "Diet adjustments"];
        equivalentMilestones = ["Middle age", "Empty nesters", "Retirement planning"];
      } else if (ageNum < 15) {
        lifeStage = "Senior";
        lifeExpectancy = "Golden years";
        healthConsiderations = ["Arthritis monitoring", "Dental health", "Comfort care"];
        equivalentMilestones = ["Retired", "Grandparent age", "Wisdom years"];
      } else {
        lifeStage = "Geriatric";
        lifeExpectancy = "Exceptional age";
        healthConsiderations = ["Quality of life focus", "Pain management", "Special diet"];
        equivalentMilestones = ["Centenarian equivalent", "Living legend", "Treasured elder"];
      }
    }

    setResult({
      humanAge: parseFloat(humanAge.toFixed(1)),
      lifeStage,
      lifeExpectancy,
      healthConsiderations,
      equivalentMilestones,
    });
  };

  const reset = () => {
    setPetAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Pet Age Calculator – Convert Dog & Cat Age to Human Years
          </h1>
          <p className="text-muted-foreground">
            Find out how old your pet really is in human years with our Pet Age Calculator.
            Based on current scientific research on dog and cat aging rates, get a more accurate
            conversion than the outdated &apos;7 dog years per human year&apos; myth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pet-type">Pet Type</Label>
                <Select value={petType} onValueChange={setPetType}>
                  <SelectTrigger id="pet-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {petType === "dog" && (
                <div className="space-y-2">
                  <Label htmlFor="dog-size">Dog Size</Label>
                  <Select value={dogSize} onValueChange={setDogSize}>
                    <SelectTrigger id="dog-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (&lt;20 lbs)</SelectItem>
                      <SelectItem value="medium">Medium (20-50 lbs)</SelectItem>
                      <SelectItem value="large">Large (50-90 lbs)</SelectItem>
                      <SelectItem value="giant">Giant (&gt;90 lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Larger dogs age faster than smaller dogs
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="pet-age">Pet&apos;s Age (years)</Label>
                <Input
                  id="pet-age"
                  type="number"
                  step="0.5"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="e.g., 3"
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
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Human Age Equivalent</p>
                    <p className="text-5xl font-bold text-primary">{result.humanAge} years</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Life Stage:</span>
                      <span className="font-semibold">{result.lifeStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="font-semibold">{result.lifeExpectancy}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Health Considerations</h4>
                    <ul className="space-y-1">
                      {result.healthConsiderations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Human Milestones</h4>
                    <ul className="space-y-1">
                      {result.equivalentMilestones.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your pet&apos;s details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How Pet Age Conversion Works
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The old &quot;7 dog years per human year&quot; rule is a myth. Modern veterinary
                  science uses more accurate calculations based on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>First year:</strong> Dogs and cats mature rapidly, reaching
                    adolescence by 1 year (≈15 human years)
                  </li>
                  <li>
                    <strong>Second year:</strong> Continued development (adds ≈9 human years)
                  </li>
                  <li>
                    <strong>After 2 years:</strong> Aging rate depends on species and size
                  </li>
                  <li>
                    <strong>Dog size matters:</strong> Large dogs age faster than small dogs
                  </li>
                  <li>
                    <strong>Cats:</strong> Generally age more consistently after year 2
                    (≈4 human years per cat year)
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> These are estimates. Individual pets age differently
                  based on genetics, diet, exercise, and healthcare.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
