"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PascalsTriangleCalculator() {
  const [rows, setRows] = useState<string>("");
  const [result, setResult] = useState<number[][] | null>(null);

  const calculate = () => {
    const n = parseInt(rows);
    
    if (!isNaN(n) && n > 0 && n <= 20) {
      const triangle: number[][] = [];
      
      for (let i = 0; i < n; i++) {
        triangle[i] = [1];
        for (let j = 1; j < i; j++) {
          triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
        if (i > 0) triangle[i].push(1);
      }
      
      setResult(triangle);
    }
  };

  const reset = () => {
    setRows("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number of rows</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-3">Triangle</p>
                <div className="text-center space-y-1">
                  {result.map((row, i) => (
                    <div key={i} className="text-sm font-mono">
                      {row.join("  ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use Pascal's Triangle Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the number of rows</p>
                <p>Input how many rows of Pascal's triangle you want to generate. The calculator supports up to 20 rows.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Click Generate</p>
                <p>The calculator will build Pascal's triangle row by row, starting with a single 1 at the top.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">View and use the results</p>
                <p>Each row shows the binomial coefficients. Use these for probability calculations, combinatorics, or algebraic expansions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pascal's Triangle Reference (First 10 Rows)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Row (n)</th>
                    <th className="text-left py-3 px-2 font-semibold">Coefficients</th>
                    <th className="text-left py-3 px-2 font-semibold">Sum of Row</th>
                    <th className="text-left py-3 px-2 font-semibold">Binomial Form</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2 font-mono">1</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">(a+b)⁰</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2 font-mono">1  1</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">(a+b)¹</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2 font-mono">1  2  1</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2">(a+b)²</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2 font-mono">1  3  3  1</td>
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">(a+b)³</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2 font-mono">1  4  6  4  1</td>
                    <td className="py-3 px-2">16</td>
                    <td className="py-3 px-2">(a+b)⁴</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2 font-mono">1  5  10  10  5  1</td>
                    <td className="py-3 px-2">32</td>
                    <td className="py-3 px-2">(a+b)⁵</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2 font-mono">1  6  15  20  15  6  1</td>
                    <td className="py-3 px-2">64</td>
                    <td className="py-3 px-2">(a+b)⁶</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">7</td>
                    <td className="py-3 px-2 font-mono">1  7  21  35  35  21  7  1</td>
                    <td className="py-3 px-2">128</td>
                    <td className="py-3 px-2">(a+b)⁷</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2 font-mono">1  8  28  56  70  56  28  8  1</td>
                    <td className="py-3 px-2">256</td>
                    <td className="py-3 px-2">(a+b)⁸</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">9</td>
                    <td className="py-3 px-2 font-mono">1  9  36  84  126  126  84  36  9  1</td>
                    <td className="py-3 px-2">512</td>
                    <td className="py-3 px-2">(a+b)⁹</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Pascal's Triangle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Is Pascal's Triangle?</h4>
              <p>Pascal's triangle is a triangular arrangement of numbers where each number is the sum of the two numbers directly above it. The triangle starts with a single 1 at the top. Each row begins and ends with 1. Despite its name, the pattern was known to mathematicians in Persia, China, and India centuries before Blaise Pascal studied it in the 1600s.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How to Build the Triangle</h4>
              <p>Start with 1 at the top (row 0). Row 1 has two 1s. For each new row, add adjacent pairs from the row above. If there's no neighbor on one side, treat it as 0. So row 2 becomes: 1, (1+1)=2, 1. Row 3: 1, (1+2)=3, (2+1)=3, 1. This simple rule generates the entire triangle.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Connection to Binomial Expansion</h4>
              <p>The numbers in row n give the coefficients when expanding (a + b)ⁿ. For example, (a + b)³ = 1a³ + 3a²b + 3ab² + 1b³. The coefficients 1, 3, 3, 1 come directly from row 3 of Pascal's triangle. This makes the triangle invaluable for algebra.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Patterns Hidden in the Triangle</h4>
              <p>Pascal's triangle contains many surprising patterns. The diagonals give counting numbers, triangular numbers, and tetrahedral numbers. The sum of row n equals 2ⁿ. Shallow diagonals sum to Fibonacci numbers. Color odd numbers one color and even numbers another to reveal the Sierpinski triangle fractal.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications of Pascal's Triangle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Combinatorics</p>
                <p>The entry in row n, position k equals "n choose k" — the number of ways to select k items from n items.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Probability Theory</p>
                <p>Row n gives the probabilities for n coin flips. Row 4 (1, 4, 6, 4, 1) divided by 16 gives probabilities for 0, 1, 2, 3, 4 heads.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Algebra</p>
                <p>Use row n coefficients to expand (x + y)ⁿ without multiplying everything out by hand.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Computer Science</p>
                <p>Pascal's triangle appears in algorithms for computing combinations and in understanding recursion patterns.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What is the formula for Pascal's triangle?</h4>
              <p>Each entry equals the sum of the two entries above it: C(n,k) = C(n-1,k-1) + C(n-1,k). You can also calculate directly using combinations: C(n,k) = n! / (k! × (n-k)!), where n is the row number and k is the position in the row.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why is row 0 at the top?</h4>
              <p>Row numbering starts at 0 because it corresponds to (a+b)⁰ = 1. This convention matches the binomial theorem and combinatorics, where "n choose 0" equals 1 for any n. The top single 1 is row 0, the next row with two 1s is row 1, and so on.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the sum of row n in Pascal's triangle?</h4>
              <p>The sum of row n equals 2ⁿ. Row 0 sums to 1 (2⁰). Row 1 sums to 2 (2¹). Row 5 sums to 32 (2⁵). This happens because the sum represents all possible subsets of an n-element set, which equals 2ⁿ.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How does Pascal's triangle relate to combinations?</h4>
              <p>The kth entry in row n equals "n choose k" — written as C(n,k) or ₙCₖ. This counts how many ways you can choose k items from n items. For example, C(5,2) = 10, which is the third number in row 5.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Who invented Pascal's triangle?</h4>
              <p>Blaise Pascal didn't invent it — he studied its properties in 1653. Chinese mathematician Jia Xian described it around 1050. Persian mathematician Omar Khayyam studied it in the 11th century. It appears in Indian mathematics even earlier. Different cultures called it by different names.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
