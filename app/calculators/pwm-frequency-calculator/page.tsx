"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PwmFrequencyCalculator() {
  const [clock, setClock] = useState<string>("");
  const [prescaler, setPrescaler] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const fclk = parseFloat(clock);
    const presc = parseInt(prescaler);
    const n = parseInt(resolution);

    if (fclk > 0 && presc > 0 && n > 0) {
      const fpwm = fclk / (presc * Math.pow(2, n));
      const period = 1 / fpwm;

      setResults({
        frequency: fpwm,
        period: period,
        periodMs: period * 1000,
        periodUs: period * 1e6,
      });
    }
  };

  const reset = () => {
    setClock(""); setPrescaler(""); setResolution(""); setResults(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>PWM Frequency Calculator – Calculate PWM Output Frequency</CardTitle>
          <CardDescription>
            Calculate PWM frequency based on clock speed, prescaler, and resolution. Essential for motor control and power electronics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Clock Freq (Hz)</Label><Input value={clock} onChange={e => setClock(e.target.value)} placeholder="e.g., 16000000" /></div>
              <div><Label>Prescaler</Label><Input type="number" value={prescaler} onChange={e => setPrescaler(e.target.value)} placeholder="e.g., 1, 8, 64" /></div>
              <div><Label>Resolution (bits)</Label><Input type="number" value={resolution} onChange={e => setResolution(e.target.value)} placeholder="e.g., 8, 10, 16" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate PWM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">PWM Frequency</p>
                    <p className="text-2xl font-bold">{results.frequency >= 1e6 ? (results.frequency / 1e6).toFixed(2) + " MHz" : results.frequency >= 1000 ? (results.frequency / 1000).toFixed(2) + " kHz" : Math.round(results.frequency) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-xl font-bold">{results.periodUs >= 1000 ? (results.periodMs).toFixed(2) + " ms" : results.periodUs.toFixed(2) + " µs"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How PWM Frequency Calculation Works</CardTitle>
          <CardDescription>Understanding pulse-width modulation timing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Apply the Prescaler</h4>
                <p className="text-sm text-muted-foreground">
                  The prescaler divides the input clock frequency. A prescaler of 64 means the timer counts once for every 64 clock cycles, effectively slowing down the base frequency before PWM generation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Account for Resolution</h4>
                <p className="text-sm text-muted-foreground">
                  Resolution in bits determines the PWM counter range. An 8-bit resolution means 2^8 = 256 steps. Higher resolution gives finer duty cycle control but lowers maximum frequency.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Calculate Final Frequency</h4>
                <p className="text-sm text-muted-foreground">
                  PWM frequency equals clock frequency divided by (prescaler × 2^resolution). The period is simply the inverse – how long one complete PWM cycle takes in seconds or microseconds.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PWM Frequency Features and Applications</CardTitle>
          <CardDescription>Why PWM frequency matters in electronics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Motor Speed Control**</h4>
              <p className="text-xs text-muted-foreground">
                PWM frequency affects motor performance. Too low causes audible whine and torque ripple. Too high increases switching losses. Typical motor control uses 8-20 kHz for optimal efficiency.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**LED Dimming**</h4>
              <p className="text-xs text-muted-foreground">
                LED drivers use PWM for smooth dimming. Frequencies above 200 Hz prevent visible flicker. High-end lighting uses 1-10 kHz for camera-compatible, flicker-free operation.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Power Supply Regulation**</h4>
              <p className="text-xs text-muted-foreground">
                Switch-mode power supplies rely on PWM. Higher frequencies allow smaller inductors and capacitors but increase switching losses. Typical SMPS operates at 50 kHz to 2 MHz.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Audio Signal Generation**</h4>
              <p className="text-xs text-muted-foreground">
                Class-D amplifiers use PWM to reproduce audio. Frequencies must exceed 20 kHz (above human hearing) with careful filtering. High-quality audio PWM runs at 300-500 kHz.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Common PWM Frequency Ranges</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application</TableHead>
                  <TableHead>Typical Frequency</TableHead>
                  <TableHead>Resolution</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">DC Motor Control</TableCell>
                  <TableCell className="font-mono">8-20 kHz</TableCell>
                  <TableCell className="font-mono">8-10 bit</TableCell>
                  <TableCell className="text-xs">Above audible range</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">LED Dimming</TableCell>
                  <TableCell className="font-mono">200 Hz - 10 kHz</TableCell>
                  <TableCell className="font-mono">8-12 bit</TableCell>
                  <TableCell className="text-xs">Flicker-free visible light</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Switch-Mode PSU</TableCell>
                  <TableCell className="font-mono">50 kHz - 2 MHz</TableCell>
                  <TableCell className="font-mono">8-16 bit</TableCell>
                  <TableCell className="text-xs">Trade-off: size vs efficiency</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Servo Control</TableCell>
                  <TableCell className="font-mono">50-400 Hz</TableCell>
                  <TableCell className="font-mono">10-12 bit</TableCell>
                  <TableCell className="text-xs">Standard hobby servo protocol</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Class-D Audio</TableCell>
                  <TableCell className="font-mono">300-500 kHz</TableCell>
                  <TableCell className="font-mono">16-24 bit</TableCell>
                  <TableCell className="text-xs">Ultrasonic carrier frequency</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a good PWM frequency for motors?</h4>
            <p className="text-xs text-muted-foreground">
              For DC motors, 8-20 kHz works well. Below 8 kHz causes audible noise; above 20 kHz increases switching losses without benefit. Brushless motors often use 16-32 kHz. Stepper motors benefit from 20-40 kHz for smooth microstepping.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does PWM resolution affect frequency?</h4>
            <p className="text-xs text-muted-foreground">
              Higher resolution means more steps per cycle, which lowers maximum frequency. Doubling resolution (e.g., 8 to 9 bits) halves the max frequency. Choose resolution based on control precision needs, not just maximum frequency.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the prescaler do in PWM?</h4>
            <p className="text-xs text-muted-foreground">
              The prescaler divides the clock before it reaches the PWM timer. Common values are 1, 8, 64, 256. It lets you achieve lower frequencies without changing resolution, useful when your clock is too fast for your application.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is my PWM making noise?</h4>
            <p className="text-xs text-muted-foreground">
              Audible noise means your PWM frequency is below 20 kHz. Motors and inductors physically vibrate at the PWM frequency. Increase frequency above 20 kHz or add mechanical damping. Check for loose components resonating at your PWM frequency.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I change PWM frequency on Arduino?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, by modifying timer prescalers and registers. Arduino Uno defaults to ~490 Hz (pins 5,6: ~980 Hz). You can reconfigure timers for frequencies from a few Hz to 62.5 kHz, but it requires direct register manipulation.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/duty-cycle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Duty Cycle Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate PWM duty cycle and on-time</p>
            </a>
            <a href="/calculators/frequency-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Frequency Calculator</p>
              <p className="text-xs text-muted-foreground">Convert between frequency and period</p>
            </a>
            <a href="/calculators/rc-time-constant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">RC Time Constant Calculator</p>
              <p className="text-xs text-muted-foreground">Design PWM filter circuits</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
