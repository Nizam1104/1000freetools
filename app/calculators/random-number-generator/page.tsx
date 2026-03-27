"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";


export default function RandomNumberGenerator() {
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);
    
    if (!isNaN(minVal) && !isNaN(maxVal) && !isNaN(countVal) && minVal <= maxVal) {
      const nums: number[] = [];
      
      if (allowDuplicates) {
        for (let i = 0; i < countVal; i++) {
          nums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
        }
      } else {
        const range = maxVal - minVal + 1;
        const actualCount = Math.min(countVal, range);
        const available = new Set<number>();
        for (let i = minVal; i <= maxVal; i++) available.add(i);
        
        for (let i = 0; i < actualCount && available.size > 0; i++) {
          const arr = Array.from(available);
          const idx = Math.floor(Math.random() * arr.length);
          nums.push(arr[idx]);
          available.delete(arr[idx]);
        }
      }
      
      setResults(nums);
    }
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setAllowDuplicates(true);
    setResults([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Min</label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Max</label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Count</label>
                <Input
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="duplicates"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="duplicates" className="text-sm">Allow duplicates</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={generate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {results.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Random Numbers</p>
                <p className="text-xl font-semibold">{results.join(", ")}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Random Number Generator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Set your range</p>
                  <p>Enter the minimum and maximum values for your random numbers. The generator will pick values within this range.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose how many numbers</p>
                  <p>Specify how many random numbers you need. You can generate one number or hundreds at once.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Generate and copy</p>
                  <p>Click Generate to get your random numbers. Select and copy them for use in your project or drawing.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Random Number Generation
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                This generator uses your browser's built-in Math.random() function, which produces
                pseudo-random numbers. These numbers appear random for most practical purposes like
                games, drawings, and sampling.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                random = min + Math.floor(Math.random() × (max - min + 1))
              </div>
              <p>
                For cryptographic security or scientific simulations, use a dedicated hardware random
                number generator or cryptographically secure API. This tool is designed for everyday use.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Uses for Random Numbers
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Lottery and Raffles</p>
                <p className="text-muted-foreground">Pick lottery numbers, conduct fair drawings, or select raffle winners</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Games and Gambling</p>
                <p className="text-muted-foreground">Roll dice, shuffle cards, or determine game outcomes fairly</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Sampling and Research</p>
                <p className="text-muted-foreground">Select random samples from a population for surveys or studies</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Testing and Development</p>
                <p className="text-muted-foreground">Generate test data, random IDs, or simulate user inputs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              With or Without Duplicates?
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The "Allow duplicates" option controls whether the same number can appear multiple times.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-2">With Duplicates</p>
                  <p className="text-muted-foreground">Each number is independent. Like rolling dice — you can get the same result twice. Use for simulations and games.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-2">Without Duplicates</p>
                  <p className="text-muted-foreground">Each number appears only once. Like drawing names from a hat. Use for lotteries and random selection.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "Are these numbers truly random?",
    answer: "They are pseudo-random, generated by Math.random(). For most uses like games and drawings, they work fine. True randomness requires physical processes like radioactive decay or atmospheric noise.",
  },
{
    question: "Can I use this for lottery numbers?",
    answer: "Yes. Many people use random generators to pick lottery numbers. Remember that every combination has equal odds — random picks are no better or worse than choosing birthdays.",
  },
{
    question: "What is the maximum range?",
    answer: "JavaScript can safely handle integers up to 9,007,199,254,740,991. For practical purposes, you can generate numbers in any range you would actually need for games or drawings.",
  },
{
    question: "Is this secure for passwords?",
    answer: "No. Do not use this for passwords, encryption keys, or security tokens. Use a dedicated password manager or cryptographically secure random generator for security purposes.",
  },
{
    question: "Can I generate negative numbers?",
    answer: "Yes. Enter a negative minimum value. For example, min=-10 and max=10 will generate random integers from -10 to 10, including zero.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
