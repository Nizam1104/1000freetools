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
                How to Use This Pet Age Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your pet type</p>
                    <p>Choose between dog or cat. For dogs, you will also need to select their size category since larger breeds age faster than smaller ones.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your pet&apos;s age in years</p>
                    <p>Use decimals for partial years. For example, enter 2.5 for a two-and-a-half-year-old pet.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see results</p>
                    <p>You will see the human age equivalent, life stage, health considerations, and milestone comparisons for your pet.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Dog Age to Human Years Conversion Chart
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Dog Age</th>
                      <th className="text-left py-3 px-2 font-semibold">Small Dog</th>
                      <th className="text-left py-3 px-2 font-semibold">Medium Dog</th>
                      <th className="text-left py-3 px-2 font-semibold">Large Dog</th>
                      <th className="text-left py-3 px-2 font-semibold">Giant Dog</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">1 year</td>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">15 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">2 years</td>
                      <td className="py-3 px-2">24 years</td>
                      <td className="py-3 px-2">24 years</td>
                      <td className="py-3 px-2">24 years</td>
                      <td className="py-3 px-2">24 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">5 years</td>
                      <td className="py-3 px-2">36 years</td>
                      <td className="py-3 px-2">40 years</td>
                      <td className="py-3 px-2">45 years</td>
                      <td className="py-3 px-2">50 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">8 years</td>
                      <td className="py-3 px-2">48 years</td>
                      <td className="py-3 px-2">56 years</td>
                      <td className="py-3 px-2">66 years</td>
                      <td className="py-3 px-2">76 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">10 years</td>
                      <td className="py-3 px-2">56 years</td>
                      <td className="py-3 px-2">66 years</td>
                      <td className="py-3 px-2">78 years</td>
                      <td className="py-3 px-2">92 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">76 years</td>
                      <td className="py-3 px-2">89 years</td>
                      <td className="py-3 px-2">108 years</td>
                      <td className="py-3 px-2">127 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Small dogs are under 20 lbs, medium dogs are 20-50 lbs, large dogs are 50-90 lbs, and giant dogs are over 90 lbs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Pet Age Conversion
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why the 7-Year Rule Is Wrong</h4>
                  <p>
                    The common belief that one dog year equals seven human years is a myth. This oversimplified rule does not account for the fact that dogs mature much faster in their first two years, and that different breeds age at different rates. A Chihuahua and a Great Dane are not the same age just because they were born on the same day.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Dogs Age</h4>
                  <p>
                    Dogs reach physical maturity much faster than humans. By their first birthday, most dogs are already in their teenage years in human terms. The second year adds about nine more human years. After that, the aging rate depends heavily on size. Small dogs tend to live longer and age more slowly, while giant breeds have shorter lifespans and age more quickly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Cats Age</h4>
                  <p>
                    Cats follow a similar pattern to dogs in their first two years. After that, they age at a more consistent rate of about four human years per cat year. Indoor cats typically live longer than outdoor cats, with many reaching their late teens or even early twenties.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Size Matters for Dogs</h4>
                  <p>
                    This is one of the stranger facts about dogs: smaller breeds generally live longer than larger ones. A toy poodle might live 15 years or more, while an Irish Wolfhound averages closer to 8 years. Scientists believe this has to do with the rapid growth that large breeds undergo, which may accelerate aging at the cellular level.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pet Life Stages and Care Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Puppy/Kitten Stage (0-1 year)</p>
                    <p>Focus on socialization, basic training, and establishing a vaccination schedule. This is when pets learn most about their world.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adolescent Stage (1-3 years)</p>
                    <p>Energy levels peak. Continue training and establish consistent exercise routines. Consider spaying or neutering if not already done.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adult Stage (3-7 years)</p>
                    <p>Maintain annual vet checkups and dental care. Watch for weight gain as metabolism slows. Keep up regular exercise.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Senior Stage (7+ years)</p>
                    <p>Switch to twice-yearly vet visits. Monitor for arthritis, dental disease, and organ function. Adjust diet and exercise for aging bodies.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How do I calculate my dog age in human years?</h4>
                  <p>
                    The first year of a dog life equals about 15 human years. The second year adds about 9 more years. After that, each dog year equals 4 to 7 human years depending on size. Small dogs age slower (about 4-5 human years per dog year), while giant breeds age faster (about 7-8 human years per dog year).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is one dog year really equal to 7 human years?</h4>
                  <p>
                    No, this is a myth. The 7-to-1 ratio does not reflect how dogs actually age. Dogs mature much faster in their first two years, and the rate varies significantly by breed size. A more accurate approach uses different multipliers based on the dog age and size category.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How old is my cat in human years?</h4>
                  <p>
                    A one-year-old cat is about 15 in human years. A two-year-old cat is about 24. After that, add about 4 human years for each cat year. So a 10-year-old cat would be roughly 56 in human years. Indoor cats often live into their late teens or early twenties.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why do larger dogs age faster than smaller dogs?</h4>
                  <p>
                    Scientists believe rapid growth in large breed puppies may accelerate cellular aging. Large dogs also have higher rates of age-related diseases like cancer. A Great Dane reaches senior status around 5-6 years, while a Chihuahua might not be considered senior until 10-11 years.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When is my pet considered a senior?</h4>
                  <p>
                    For small dogs, senior status typically starts around 10-11 years. Medium dogs become seniors around 8-9 years. Large and giant breeds are considered seniors by 5-7 years. Cats are generally considered seniors at around 11 years and geriatric at 15 years.
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
                  href="/calculators/dog-calorie-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Dog Calorie Calculator</span>
                  <p className="text-muted-foreground">Calculate daily calorie needs for dogs based on weight, age, and activity level</p>
                </a>
                <a
                  href="/calculators/cat-calorie-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Cat Calorie Calculator</span>
                  <p className="text-muted-foreground">Determine how many calories your cat needs per day for optimal health</p>
                </a>
                <a
                  href="/calculators/bmi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">BMI Calculator</span>
                  <p className="text-muted-foreground">Check your body mass index and understand your health status</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
