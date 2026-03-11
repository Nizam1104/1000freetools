"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ScatterPlotGenerator() {
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

    if (xValues.some(isNaN) || yValues.some(isNaN)) {
      setError("Please enter valid numbers only");
      return;
    }

    const n = xValues.length;
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yValues.reduce((sum, y) => sum + y * y, 0);

    const meanX = sumX / n;
    const meanY = sumY / n;

    const SSxy = sumXY - (sumX * sumY) / n;
    const SSxx = sumX2 - (sumX * sumX) / n;
    const SSyy = sumY2 - (sumY * sumY) / n;

    const slope = SSxx !== 0 ? SSxy / SSxx : 0;
    const intercept = meanY - slope * meanX;

    const r = SSxx !== 0 && SSyy !== 0 
      ? SSxy / Math.sqrt(SSxx * SSyy) 
      : 0;

    const points = xValues.map((x, i) => ({
      x,
      y: yValues[i],
      xNorm: ((x - minX) / (maxX - minX || 1)) * 80 + 10,
      yNorm: 90 - ((yValues[i] - minY) / (maxY - minY || 1)) * 70 - 10
    }));

    const lineStart = {
      x: minX,
      y: slope * minX + intercept
    };
    const lineEnd = {
      x: maxX,
      y: slope * maxX + intercept
    };

    setResult({
      n,
      minX,
      maxX,
      minY,
      maxY,
      meanX: Math.round(meanX * 10000) / 10000,
      meanY: Math.round(meanY * 10000) / 10000,
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 10000) / 10000,
      r: Math.round(r * 10000) / 10000,
      rSquared: Math.round(r * r * 10000) / 10000,
      points,
      lineStart,
      lineEnd,
      lineStartNorm: {
        x: 10,
        y: 90 - (((slope * minX + intercept) - minY) / (maxY - minY || 1)) * 70 - 10
      },
      lineEndNorm: {
        x: 90,
        y: 90 - (((slope * maxX + intercept) - minY) / (maxY - minY || 1)) * 70 - 10
      }
    });
  };

  const reset = () => {
    setXData("");
    setYData("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setXData("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYData("2.1, 3.8, 5.2, 7.1, 8.9, 10.5, 12.8, 14.2, 16.1, 18.5");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scatter Plot Generator – Create Scatter Plots Online Free</h1>
        <p className="text-muted-foreground">
          Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>X Values (Independent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={xData}
              onChange={(e) => setXData(e.target.value)}
              rows={5}
            />
          </div>
          <div>
            <Label>Y Values (Dependent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={yData}
              onChange={(e) => setYData(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Scatter Plot</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4">Scatter Plot</h4>
              <div className="relative w-full aspect-video border-2 border-border bg-background">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <line x1="10" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  <line x1="10" y1="10" x2="10" y2="95" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  
                  <line 
                    x1={result.lineStartNorm.x} 
                    y1={result.lineStartNorm.y} 
                    x2={result.lineEndNorm.x} 
                    y2={result.lineEndNorm.y} 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                    className="text-primary"
                  />
                  
                  {result.points.map((point: any, i: number) => (
                    <circle
                      key={i}
                      cx={point.xNorm}
                      cy={point.yNorm}
                      r="2"
                      className="fill-primary"
                    />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  X Variable
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground origin-center">
                  Y Variable
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>X: {result.minX} - {result.maxX}</span>
                <span>Y: {result.minY} - {result.maxY}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.n}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Correlation (r)</p>
                <p className={`text-xl font-bold ${
                  result.r > 0.7 ? 'text-green-600' : 
                  result.r < -0.7 ? 'text-red-600' : ''
                }`}>{result.r}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">R²</p>
                <p className="text-xl font-bold">{result.rSquared}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Trend</p>
                <p className="text-sm font-semibold">
                  {result.r > 0.3 ? 'Positive' : result.r < -0.3 ? 'Negative' : 'No clear'}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Regression Line</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                y = {result.slope}x + {result.intercept}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                For each unit increase in X, Y changes by {result.slope} units.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Scatter Plot Generator Works</h2>
          <p className="text-muted-foreground mb-4">
            A scatter plot displays individual data points on a two-dimensional coordinate system, with one variable on the x-axis (horizontal) and another on the y-axis (vertical). This visualization helps you identify patterns, trends, and relationships between two variables.
          </p>
          <p className="text-muted-foreground mb-4">
            This tool automatically calculates the <strong>line of best fit</strong> (linear regression line) using the least squares method. The correlation coefficient (r) tells you how strongly the variables are related:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>r ≈ 1:</strong> Strong positive correlation (as X increases, Y increases)</li>
            <li><strong>r ≈ -1:</strong> Strong negative correlation (as X increases, Y decreases)</li>
            <li><strong>r ≈ 0:</strong> No linear correlation</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            The R² value (coefficient of determination) shows what percentage of the variation in Y can be explained by X.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Data Sets</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Study Time vs. Test Scores</h3>
          <p className="text-muted-foreground mb-2">
            Track how study hours affect exam performance:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>X (Hours): 1, 2, 3, 4, 5, 6, 7, 8</p>
            <p>Y (Score): 52, 58, 65, 70, 78, 85, 88, 94</p>
            <p className="mt-2 text-muted-foreground">Expected: Strong positive correlation (r &gt; 0.9)</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Temperature vs. Heating Costs</h3>
          <p className="text-muted-foreground mb-2">
            See how outdoor temperature affects your heating bill:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>X (Temp °F): 20, 30, 40, 50, 60, 70</p>
            <p>Y (Cost $): 180, 150, 120, 90, 60, 40</p>
            <p className="mt-2 text-muted-foreground">Expected: Strong negative correlation (r &lt; -0.9)</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Age vs. Reaction Time</h3>
          <p className="text-muted-foreground mb-2">
            Examine how reaction time changes with age:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>X (Age): 20, 30, 40, 50, 60, 70</p>
            <p>Y (ms): 220, 235, 255, 280, 310, 350</p>
            <p className="mt-2 text-muted-foreground">Expected: Moderate positive correlation</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: The Father of Regression</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              <strong>Sir Francis Galton</strong> (1822-1911), a cousin of Charles Darwin, pioneered the concept of regression analysis while studying heredity. He noticed that extreme characteristics in parents (like very tall height) tended to "regress toward the mean" in their children. Galton coined the term "regression toward mediocrity" (now called regression toward the mean). His work laid the foundation for modern statistics, correlation analysis, and the scatter plot visualization we use today. Interestingly, Galton also invented the weather map and pioneered the use of questionnaires in research.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What does a scatter plot show?</h3>
              <p className="text-muted-foreground">
                A scatter plot shows the relationship between two numerical variables. Each point represents one observation with its X and Y values. By looking at the overall pattern, you can see if the variables are related, whether the relationship is positive or negative, and how strong that relationship is.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the line of best fit?</h3>
              <p className="text-muted-foreground">
                The line of best fit (regression line) is the straight line that minimizes the total distance between itself and all data points. It's calculated using the least squares method and has the equation y = mx + b, where m is the slope and b is the y-intercept. This line helps predict Y values for given X values.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I interpret the correlation coefficient?</h3>
              <p className="text-muted-foreground">
                The correlation coefficient (r) ranges from -1 to +1. Values near +1 indicate a strong positive relationship, values near -1 indicate a strong negative relationship, and values near 0 indicate no linear relationship. As a rule of thumb: |r| &gt; 0.7 is strong, 0.3-0.7 is moderate, and |r| &lt; 0.3 is weak.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is R² and why does it matter?</h3>
              <p className="text-muted-foreground">
                R² (R-squared) is the coefficient of determination. It tells you what percentage of the variation in the dependent variable (Y) can be explained by the independent variable (X). An R² of 0.85 means 85% of the variation in Y is explained by X. Higher R² values indicate a better fit.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use this for non-linear relationships?</h3>
              <p className="text-muted-foreground">
                This tool calculates linear regression, which works best for straight-line relationships. If your data shows a curve (like exponential growth or a parabola), the linear correlation may be misleading. You can still plot the data to visualize the pattern, but consider specialized tools for non-linear regression.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many data points do I need?</h3>
              <p className="text-muted-foreground">
                While you can create a scatter plot with just 2 points, meaningful correlation analysis typically requires at least 10-15 data points. More data points give you more reliable correlation coefficients and better predictions from the regression line.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does correlation mean causation?</h3>
              <p className="text-muted-foreground">
                No! Correlation only shows that two variables move together—it doesn't prove one causes the other. For example, ice cream sales and drowning deaths are positively correlated (both increase in summer), but ice cream doesn't cause drowning. A third factor (hot weather) explains both.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/correlation-coefficient-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Correlation Coefficient Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate Pearson's r and other correlation measures for your data.</p>
            </a>
            <a href="/math-tools/linear-regression-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Linear Regression Calculator</h3>
              <p className="text-sm text-muted-foreground">Get detailed regression analysis with confidence intervals and residuals.</p>
            </a>
            <a href="/math-tools/mean-median-mode-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Mean, Median, Mode Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate descriptive statistics for your data sets.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
