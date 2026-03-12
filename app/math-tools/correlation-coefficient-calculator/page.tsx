"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CorrelationCoefficientCalculator() {
  const [xData, setXData] = useState("");
  const [yData, setYData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const xValues = xData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);
    const yValues = yData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (xValues.length !== yValues.length) {
      setError("X and Y datasets must have the same number of values");
      return;
    }

    if (xValues.length < 2) {
      setError("Please enter at least 2 data points");
      return;
    }

    if (xValues.length > 1000) {
      setError("For performance reasons, please limit to 1000 data points");
      return;
    }

    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yValues.reduce((sum, y) => sum + y * y, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) {
      setError("Cannot calculate correlation: one variable has no variation");
      return;
    }

    const r = numerator / denominator;
    const rSquared = r * r;

    const meanX = sumX / n;
    const meanY = sumY / n;
    const stdX = Math.sqrt((sumX2 - sumX * sumX / n) / (n - 1));
    const stdY = Math.sqrt((sumY2 - sumY * sumY / n) / (n - 1));

    let strength = "";
    let direction = "";

    const absR = Math.abs(r);
    if (absR >= 0.9) strength = "Very strong";
    else if (absR >= 0.7) strength = "Strong";
    else if (absR >= 0.5) strength = "Moderate";
    else if (absR >= 0.3) strength = "Weak";
    else strength = "Very weak or none";

    direction = r > 0 ? "positive" : r < 0 ? "negative" : "no";

    setResult({
      r: Math.round(r * 10000) / 10000,
      rSquared: Math.round(rSquared * 10000) / 10000,
      n,
      meanX: Math.round(meanX * 10000) / 10000,
      meanY: Math.round(meanY * 10000) / 10000,
      stdX: Math.round(stdX * 10000) / 10000,
      stdY: Math.round(stdY * 10000) / 10000,
      strength,
      direction,
      steps: [
        `n = ${n} data points`,
        `Σx = ${sumX}, Σy = ${sumY}`,
        `Σxy = ${sumXY}, Σx² = ${sumX2}, Σy² = ${sumY2}`,
        `r = (nΣxy - ΣxΣy) / √[(nΣx² - (Σx)²)(nΣy² - (Σy)²)]`,
        `r = (${n}(${sumXY}) - ${sumX}(${sumY})) / √[(${n}(${sumX2}) - ${sumX}²)(${n}(${sumY2}) - ${sumY}²)]`,
        `r = ${numerator.toFixed(4)} / ${denominator.toFixed(4)} = ${r.toFixed(6)}`
      ]
    });
  };

  const reset = () => {
    setXData("");
    setYData("");
    setResult(null);
    setError("");
  };

  const loadExample = (type: string) => {
    const examples: Record<string, { x: string; y: string }> = {
      positive: {
        x: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
        y: "2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 14.2, 16.1, 18.2, 20.1"
      },
      negative: {
        x: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
        y: "20, 18, 16, 14, 12, 10, 8, 6, 4, 2"
      },
      weak: {
        x: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
        y: "5, 8, 6, 9, 7, 10, 8, 11, 9, 12"
      },
      height_weight: {
        x: "160, 165, 170, 175, 180, 165, 170, 175, 180, 185",
        y: "55, 58, 65, 70, 78, 60, 67, 72, 80, 85"
      },
      study_grades: {
        x: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
        y: "65, 68, 72, 75, 78, 82, 85, 88, 90, 94"
      },
      price_demand: {
        x: "10, 15, 20, 25, 30, 35, 40, 45, 50, 55",
        y: "100, 92, 85, 78, 70, 62, 55, 48, 42, 35"
      },
      perfect: {
        x: "1, 2, 3, 4, 5",
        y: "2, 4, 6, 8, 10"
      }
    };
    const ex = examples[type] || examples.positive;
    setXData(ex.x);
    setYData(ex.y);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Correlation Coefficient Calculator – Find Pearson r Online</h1>
        <p className="text-muted-foreground">
          Calculate the Pearson correlation coefficient between two variables with our free online calculator. Measure the strength and direction of linear relationships in your data.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>X Values (Variable 1)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={xData}
              onChange={(e) => setXData(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <Label>Y Values (Variable 2)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={yData}
              onChange={(e) => setYData(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate Correlation</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("positive")}>Positive</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("negative")}>Negative</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("weak")}>Weak</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("height_weight")}>Height/Weight</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("study_grades")}>Study/Grades</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("price_demand")}>Price/Demand</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("perfect")}>Perfect</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Correlation (r)</p>
                <p className={`text-2xl font-bold ${result.r > 0.7 ? 'text-green-600' :
                    result.r < -0.7 ? 'text-red-600' : ''
                  }`}>{result.r}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">R²</p>
                <p className="text-2xl font-bold">{result.rSquared}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.n}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Relationship</p>
                <p className="text-sm font-semibold">{result.strength} {result.direction}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">X Statistics</p>
                <p className="text-sm">Mean: <span className="font-semibold">{result.meanX}</span></p>
                <p className="text-sm">Std Dev: <span className="font-semibold">{result.stdX}</span></p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Y Statistics</p>
                <p className="text-sm">Mean: <span className="font-semibold">{result.meanY}</span></p>
                <p className="text-sm">Std Dev: <span className="font-semibold">{result.stdY}</span></p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Calculation</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Interpretation</h4>
              <p className="text-sm text-muted-foreground">
                r = {result.r} indicates a <strong>{result.strength.toLowerCase()} {result.direction}</strong> linear correlation.
                {result.rSquared > 0.5
                  ? ` About ${Math.round(result.rSquared * 100)}% of the variation in Y can be explained by X.`
                  : ` Only about ${Math.round(result.rSquared * 100)}% of the variation in Y can be explained by X.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Correlation</h2>
        <p className="text-muted-foreground">
          Correlation measures how two variables move together. When one goes up, does the other go up too? Go down? Or is there no pattern at all? The correlation coefficient, written as r, gives you a single number that captures this relationship.
        </p>
        <p className="text-muted-foreground">
          The value of r always falls between -1 and +1. A positive r means the variables move in the same direction – as one increases, so does the other. A negative r means they move in opposite directions – as one increases, the other decreases. An r near zero means there's no linear relationship.
        </p>
        <p className="text-muted-foreground">
          The closer r is to -1 or +1, the stronger the relationship. At exactly +1 or -1, the points fall perfectly on a straight line. But remember: correlation doesn't mean causation. Just because two things are correlated doesn't mean one causes the other – they might both be caused by something else entirely.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Pearson Correlation Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4 text-center">
            r = (nΣxy - ΣxΣy) / √[(nΣx² - (Σx)²)(nΣy² - (Σy)²)]
          </div>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            This formula calculates how much x and y vary together, relative to how much they vary individually.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">n</div>
                <div className="text-muted-foreground">Number of data points</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Σx, Σy</div>
                <div className="text-muted-foreground">Sum of x values, sum of y values</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Σxy</div>
                <div className="text-muted-foreground">Sum of each x multiplied by its paired y</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Σx², Σy²</div>
                <div className="text-muted-foreground">Sum of squared x values, sum of squared y values</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">r</div>
                <div className="text-muted-foreground">Correlation coefficient (-1 to +1)</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">r²</div>
                <div className="text-muted-foreground">Coefficient of determination (explained variance)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Interpreting r Values</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>±0.9 to ±1.0</span>
                <span className="font-semibold">Very strong</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>±0.7 to ±0.9</span>
                <span className="font-semibold">Strong</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>±0.5 to ±0.7</span>
                <span className="font-semibold">Moderate</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>±0.3 to ±0.5</span>
                <span className="font-semibold">Weak</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>0 to ±0.3</span>
                <span className="font-semibold">Very weak or none</span>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Important Caveats</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="font-semibold text-amber-800">Correlation ≠ Causation</div>
                <div className="text-amber-700">Just because two variables are correlated doesn't mean one causes the other. There could be a third variable causing both, or it could be coincidence.</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="font-semibold text-amber-800">Only Linear Relationships</div>
                <div className="text-amber-700">Pearson's r only measures linear (straight-line) relationships. Two variables could have a strong curved relationship and still have r ≈ 0.</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="font-semibold text-amber-800">Sensitive to Outliers</div>
                <div className="text-amber-700">A single extreme value can dramatically change the correlation. Always look at a scatterplot to check for outliers.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Study Time and Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-3">Does studying more lead to better grades? Let's check the correlation.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div><strong>Hours (X):</strong> 1, 2, 3, 4, 5, 6, 7, 8</div>
                <div><strong>Scores (Y):</strong> 60, 65, 70, 72, 78, 82, 88, 92</div>
              </div>
              <div className="pt-2 border-t">
                <div>n = 8 students</div>
                <div>Σx = 36, Σy = 607</div>
                <div>Σxy = 2,934</div>
                <div>Σx² = 204, Σy² = 47,045</div>
              </div>
              <div className="pt-2 font-semibold">
                r = 0.986 (very strong positive correlation)
              </div>
              <div className="text-muted-foreground">
                Students who study more tend to score higher. The relationship is almost perfectly linear.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Price and Demand</h3>
            <p className="text-sm text-muted-foreground mb-3">Economics says higher prices reduce demand. Let's verify.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div><strong>Price (X):</strong> 10, 15, 20, 25, 30, 35, 40</div>
                <div><strong>Demand (Y):</strong> 100, 88, 75, 65, 52, 42, 30</div>
              </div>
              <div className="pt-2 border-t">
                <div>n = 7 price points</div>
                <div>Σx = 175, Σy = 452</div>
                <div>Σxy = 9,575</div>
                <div>Σx² = 5,775, Σy² = 33,082</div>
              </div>
              <div className="pt-2 font-semibold">
                r = -0.993 (very strong negative correlation)
              </div>
              <div className="text-muted-foreground">
                As price increases, demand decreases almost perfectly. This is the classic demand curve from economics.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Shoe Size and IQ</h3>
            <p className="text-sm text-muted-foreground mb-3">A classic example of no correlation.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div><strong>Shoe Size (X):</strong> 6, 7, 8, 9, 10, 11, 12</div>
                <div><strong>IQ (Y):</strong> 105, 98, 112, 95, 108, 102, 99</div>
              </div>
              <div className="pt-2 border-t">
                <div>n = 7 people</div>
              </div>
              <div className="pt-2 font-semibold">
                r = -0.08 (essentially no correlation)
              </div>
              <div className="text-muted-foreground">
                There's no relationship between shoe size and intelligence. The correlation is essentially zero, as expected.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Height and Weight</h3>
            <p className="text-sm text-muted-foreground mb-3">Taller people tend to weigh more, but the relationship isn't perfect.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div><strong>Height cm (X):</strong> 160, 165, 170, 175, 180, 185</div>
                <div><strong>Weight kg (Y):</strong> 55, 60, 68, 72, 80, 88</div>
              </div>
              <div className="pt-2 border-t">
                <div>n = 6 people</div>
              </div>
              <div className="pt-2 font-semibold">
                r = 0.982 (very strong positive correlation)
              </div>
              <div className="text-muted-foreground">
                Height and weight are strongly correlated, but not perfectly. Body composition, muscle mass, and other factors create variation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Karl Pearson</strong> (1857-1936), the British mathematician who developed the correlation coefficient, was one of the most influential statisticians in history. He founded the world's first university statistics department at University College London in 1911. Pearson also developed the chi-squared test, introduced the concept of standard deviation, and coined the term "histogram." His work laid the foundation for modern statistics, though some of his views on eugenics are now rightly criticized. The Pearson correlation coefficient remains the most widely used measure of linear association in science, business, and social research.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between correlation and causation?</h3>
            <p className="text-sm text-muted-foreground">
              Correlation means two variables tend to move together. Causation means one variable actually causes changes in the other. Ice cream sales and drowning deaths are correlated (both increase in summer), but ice cream doesn't cause drowning – hot weather causes both. Always look for alternative explanations before assuming causation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can correlation be greater than 1 or less than -1?</h3>
            <p className="text-sm text-muted-foreground">
              No, mathematically impossible. The correlation coefficient is bounded between -1 and +1. If you calculate an r outside this range, there's an error in your calculation. The formula is designed so that the numerator can never exceed the denominator in absolute value.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What does r-squared tell me?</h3>
            <p className="text-sm text-muted-foreground">
              R² (r-squared) tells you what percentage of the variation in Y can be explained by X. If r = 0.8, then r² = 0.64, meaning 64% of Y's variation is explained by its linear relationship with X. The remaining 36% is due to other factors or random variation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How many data points do I need for a reliable correlation?</h3>
            <p className="text-sm text-muted-foreground">
              You can calculate r with just 2 points (you'll get ±1), but it's meaningless. For any reliability, aim for at least 10-15 data points. With 30+ points, you can start making statistical inferences. More data always gives more reliable results, especially for detecting weak correlations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What if my data has outliers?</h3>
            <p className="text-sm text-muted-foreground">
              Outliers can dramatically distort correlation. A single extreme point can turn a strong correlation into a weak one, or vice versa. Always plot your data first. Consider calculating correlation with and without outliers, or use Spearman's rank correlation which is less sensitive to extreme values.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can two variables have zero correlation but still be related?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Pearson's r only measures linear relationships. If Y = X² (a perfect parabola), the correlation would be zero because the relationship is curved, not straight. Always visualize your data with a scatterplot – you might discover strong non-linear patterns that r misses.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">When should I use Spearman correlation instead?</h3>
            <p className="text-sm text-muted-foreground">
              Use Spearman's rank correlation when your data isn't normally distributed, has outliers, or is ordinal (ranked) rather than continuous. Spearman converts values to ranks before calculating correlation, making it more robust to extreme values and non-linear but monotonic relationships.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
