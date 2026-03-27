"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";


export default function ModeCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ modes: number[]; frequencies: Record<number, number> } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const frequencies: Record<number, number> = {};
      nums.forEach((n) => {
        frequencies[n] = (frequencies[n] || 0) + 1;
      });
      
      const maxFreq = Math.max(...Object.values(frequencies));
      const modes = Object.entries(frequencies)
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => parseFloat(num));
      
      setResult({ modes, frequencies });
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1, 2, 2, 3, 4, 4, 4"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Mode(s)</p>
                  <p className="text-2xl font-semibold">{result.modes.join(", ")}</p>
                </div>
                {result.modes.length > 1 && (
                  <p className="text-xs text-muted-foreground">This dataset is multimodal</p>
                )}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Frequency distribution:</p>
                  <div className="text-xs mt-1 space-y-1">
                    {Object.entries(result.frequencies).map(([num, freq]) => (
                      <div key={num}>{num}: {freq} time{freq > 1 ? 's' : ''}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-sm mb-2">What Is the Mode?</h4>
            <p className="text-xs text-muted-foreground">
              The mode is the value that appears most frequently in a dataset. A dataset can have one mode (unimodal), two modes (bimodal), or multiple modes (multimodal). If all values appear equally, there is no mode.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Mode Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter your numbers</p>
                <p>Type or paste numbers separated by commas. Example: "1, 2, 2, 3, 4, 4, 4"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate</p>
                <p>The calculator counts how many times each value appears.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">View the mode(s)</p>
                <p>See which value(s) appear most frequently and the full frequency distribution.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding the Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The mode is one of three measures of central tendency, along with the mean (average) and median (middle value). Unlike mean and median, the mode works with categorical data—like finding the most common eye color in a group.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Measure</th>
                  <th className="text-left py-2 px-2 font-semibold">Definition</th>
                  <th className="text-left py-2 px-2 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Mode</td>
                  <td className="py-2 px-2">Most frequent value</td>
                  <td className="py-2 px-2">Categories, discrete data</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Median</td>
                  <td className="py-2 px-2">Middle value</td>
                  <td className="py-2 px-2">Skewed distributions</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Mean</td>
                  <td className="py-2 px-2">Sum divided by count</td>
                  <td className="py-2 px-2">Symmetric distributions</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-muted/50 rounded text-xs space-y-1">
            <div><strong>Example:</strong> Shoe sizes sold: 7, 8, 8, 9, 9, 9, 10, 11</div>
            <div><strong>Mode:</strong> 9 (appears 3 times)</div>
            <div><strong>Use:</strong> Stock more size 9 shoes</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>When to Use the Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Categorical data</p>
                <p>Find the most common category: favorite color, preferred brand, most frequent complaint type.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Discrete whole numbers</p>
                <p>Family size, number of pets, products per order—values where "average" doesn't make sense.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Identifying peaks in distributions</p>
                <p>Bimodal data has two peaks—like exam scores where two distinct groups performed differently.</p>
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
    question: "Can a dataset have more than one mode?",
    answer: "Yes. Two modes = bimodal. Three modes = trimodal. More than three = multimodal. This often indicates distinct subgroups in your data. Example: A bimodal age distribution at a family restaurant might show peaks for children and parents.",
  },
{
    question: "What if every value appears the same number of times?",
    answer: "Then there is no mode. Every value is equally common. This happens with uniform distributions. In such cases, the mean or median may be more useful measures of central tendency.",
  },
{
    question: "Can the mode be used with decimal numbers?",
    answer: "Yes, but exact matches are rare with continuous data. For measurements like height or weight, values are often grouped into ranges first (e.g., 150-155 cm, 155-160 cm) before finding the modal range.",
  },
{
    question: "When is mode better than mean or median?",
    answer: "Use mode for categorical data (you can't average \"red\" and \"blue\"). Also useful when you need the most common value for decision-making—like which product size to stock more of.",
  },
{
    question: "How do I find the mode manually?",
    answer: "List all unique values. Count how many times each appears. The value(s) with the highest count is the mode. For large datasets, a frequency table or this calculator makes it easier.",
  }
  ]} />
</section>
    </div>
  );
}
