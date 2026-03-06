"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BatteryCRateCalculator() {
  const [capacity, setCapacity] = useState<string>("");
  const [cRate, setCRate] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [mode, setMode] = useState<"c_to_current" | "current_to_c">("c_to_current");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Cap = parseFloat(capacity);
    const C = parseFloat(cRate);
    const I = parseFloat(current);

    if (mode === "c_to_current" && Cap > 0 && C > 0) {
      const current = Cap * C;
      const time = 60 / C; // minutes
      setResults({ current, time: Math.round(time * 10) / 10 });
    } else if (mode === "current_to_c" && Cap > 0 && I > 0) {
      const cRate = I / Cap;
      const time = 60 / cRate;
      setResults({ cRate: Math.round(cRate * 100) / 100, time: Math.round(time * 10) / 10 });
    }
  };

  const reset = () => {
    setCapacity(""); setCRate(""); setCurrent(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "c_to_current" ? "default" : "outline"} size="sm" onClick={() => setMode("c_to_current")}>C-Rate → Current</Button>
              <Button variant={mode === "current_to_c" ? "default" : "outline"} size="sm" onClick={() => setMode("current_to_c")}>Current → C-Rate</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Battery Capacity (Ah)</Label><Input value={capacity} onChange={e => setCapacity(e.target.value)} /></div>
              {mode === "c_to_current" ? (
                <div><Label>C-Rate</Label><Input value={cRate} onChange={e => setCRate(e.target.value)} placeholder="e.g., 1, 2, 0.5" /></div>
              ) : (
                <div><Label>Current (A)</Label><Input value={current} onChange={e => setCurrent(e.target.value)} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {results.current !== undefined && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="text-3xl font-bold">{results.current} A</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Charge/Discharge Time</p>
                        <p className="text-2xl font-bold">{results.time} min</p>
                      </div>
                    </>
                  )}
                  {results.cRate !== undefined && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">C-Rate</p>
                        <p className="text-3xl font-bold">{results.cRate}C</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time to Full</p>
                        <p className="text-2xl font-bold">{results.time} min</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Battery C-Rate Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Choose your calculation mode</p>
              <p className="text-sm text-muted-foreground">Select C-Rate to Current if you know the C-rate and want to find the current. Select Current to C-Rate if you know the current and want to find the C-rate.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Enter battery capacity and known value</p>
              <p className="text-sm text-muted-foreground">Input the battery capacity in amp-hours. Then enter either the C-rate (like 1C, 2C, 0.5C) or the current in amps, depending on your mode.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Click Calculate to see results</p>
              <p className="text-sm text-muted-foreground">Get the corresponding current or C-rate, plus the theoretical charge or discharge time in minutes.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>C-Rate Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">C-Rate</th>
                  <th className="text-left py-3 px-2 font-semibold">Current (for 10Ah)</th>
                  <th className="text-left py-3 px-2 font-semibold">Time to Full</th>
                  <th className="text-left py-3 px-2 font-semibold">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">0.1C</td>
                  <td className="py-3 px-2">1A</td>
                  <td className="py-3 px-2">10 hours</td>
                  <td className="py-3 px-2">Slow charging, longevity</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">0.2C</td>
                  <td className="py-3 px-2">2A</td>
                  <td className="py-3 px-2">5 hours</td>
                  <td className="py-3 px-2">Standard charging</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">0.5C</td>
                  <td className="py-3 px-2">5A</td>
                  <td className="py-3 px-2">2 hours</td>
                  <td className="py-3 px-2">Fast charging</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">1C</td>
                  <td className="py-3 px-2">10A</td>
                  <td className="py-3 px-2">1 hour</td>
                  <td className="py-3 px-2">Standard discharge</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">2C</td>
                  <td className="py-3 px-2">20A</td>
                  <td className="py-3 px-2">30 minutes</td>
                  <td className="py-3 px-2">High-power discharge</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">5C</td>
                  <td className="py-3 px-2">50A</td>
                  <td className="py-3 px-2">12 minutes</td>
                  <td className="py-3 px-2">RC models, power tools</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-mono">10C</td>
                  <td className="py-3 px-2">100A</td>
                  <td className="py-3 px-2">6 minutes</td>
                  <td className="py-3 px-2">High-performance applications</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Times are theoretical. Actual charge/discharge times vary with battery chemistry, temperature, and efficiency losses.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding C-Rate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">What Is C-Rate?</h4>
            <p>
              C-rate measures how fast a battery charges or discharges relative to its capacity. 1C means the battery will fully charge or discharge in one hour. 2C means half an hour. 0.5C means two hours. It is a normalized way to compare batteries of different sizes.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">The Math Behind C-Rate</h4>
            <p>
              C-rate equals current divided by capacity. For a 10Ah battery, 1C equals 10 amps. 2C equals 20 amps. 0.1C equals 1 amp. The formula is: Current (A) = C-Rate × Capacity (Ah). This calculator does the math for you.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Why C-Rate Matters</h4>
            <p>
              Different applications need different C-rates. A solar storage battery might only need 0.2C discharge. An RC car battery needs 50C or more. Electric vehicles typically use 1-3C during acceleration. Matching C-rate to application prevents overheating and premature failure.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Charge vs Discharge C-Rates</h4>
            <p>
              Many batteries can discharge faster than they can safely charge. A lithium cell might handle 5C discharge but only 1C charge. Fast charging generates heat and stress. Always check the manufacturer specifications for maximum charge and discharge C-rates.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Working with C-Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Respect maximum C-rate limits</p>
              <p>Exceeding the rated C-rate causes heat, voltage sag, and reduced lifespan. Check your battery datasheet for continuous and pulse ratings.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Charge slower for longer life</p>
              <p>Charging at 0.5C or less extends battery lifespan. Fast charging at 1C or higher is convenient but stresses the cells. Use slow charging when time allows.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Watch for voltage sag at high C-rates</p>
              <p>High discharge rates cause voltage to drop under load. A 12V battery might read 10V during a 5C discharge. This is normal but affects performance.</p>
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
            <h4 className="font-medium text-foreground mb-2">What does 1C mean on a battery?</h4>
            <p>
              1C means the battery will fully charge or discharge in exactly one hour. For a 5Ah battery, 1C equals 5 amps. For a 100Ah battery, 1C equals 100 amps. It scales with capacity.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">How do I calculate C-rate from current?</h4>
            <p>
              Divide the current by the battery capacity. If you have a 20Ah battery and draw 10 amps, the C-rate is 10/20 = 0.5C. This calculator does it automatically.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">What is a good C-rate for lithium batteries?</h4>
            <p>
              It depends on the application. For solar storage, 0.2C to 0.5C is common. For power tools, 5C to 10C. For RC models, 50C to 100C. Always check your specific battery specifications.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Can I charge at the same C-rate as discharge?</h4>
            <p>
              Usually not. Most batteries have lower maximum charge C-rates than discharge C-rates. Charging generates more heat and stress. A battery rated for 10C discharge might only support 1C charge.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Does C-rate affect battery life?</h4>
            <p>
              Yes. Higher C-rates generate more heat and cause more wear. Regularly charging or discharging at high C-rates reduces cycle life. For maximum lifespan, use lower C-rates when possible.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <a
            href="/calculators/battery-life-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Battery Life Calculator</span>
            <p className="text-muted-foreground">Estimate battery runtime based on capacity and load</p>
          </a>
          <a
            href="/calculators/battery-backup-time-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Battery Backup Time Calculator</span>
            <p className="text-muted-foreground">Calculate how long a battery will power your devices</p>
          </a>
          <a
            href="/calculators/amp-hours-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Amp Hours Calculator</span>
            <p className="text-muted-foreground">Calculate amp hours from watts, volts, and time</p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
