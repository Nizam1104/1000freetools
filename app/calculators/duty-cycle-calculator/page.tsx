"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Faqs from "@/components/utils/Faqs";


export default function DutyCycleCalculator() {
  const [onTime, setOnTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [dutyCycle, setDutyCycle] = useState<number>(50);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Ton = parseFloat(onTime);
    const T = parseFloat(period);
    const f = parseFloat(frequency);

    if (Ton > 0 && T > 0) {
      const duty = (Ton / T) * 100;
      const freq = 1 / T;
      setResults({ duty: Math.round(duty * 100) / 100, frequency: freq, period: T });
    } else if (f > 0 && dutyCycle > 0) {
      const T = 1 / f;
      const Ton = (dutyCycle / 100) * T;
      const Toff = T - Ton;
      setResults({ duty: dutyCycle, frequency: f, period: T, onTime: Ton, offTime: Toff });
    }
  };

  const reset = () => {
    setOnTime(""); setPeriod(""); setFrequency(""); setDutyCycle(50); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>On-Time (s)</Label><Input value={onTime} onChange={e => setOnTime(e.target.value)} /></div>
              <div><Label>Period (s)</Label><Input value={period} onChange={e => setPeriod(e.target.value)} /></div>
              <div><Label>Frequency (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
            </div>

            <div>
              <Label>Duty Cycle: {dutyCycle}%</Label>
              <Slider
                value={[dutyCycle]}
                onValueChange={(v) => setDutyCycle(v[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Duty Cycle</p>
                    <p className="text-3xl font-bold">{results.duty}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="text-xl font-bold">{results.frequency >= 1000 ? (results.frequency / 1000).toFixed(2) + " kHz" : Math.round(results.frequency) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-xl font-bold">{(results.period * 1e6).toFixed(2)} µs</p>
                  </div>
                </div>
                {results.onTime !== undefined && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">On-Time</p>
                      <p className="text-xl font-bold">{(results.onTime * 1e6).toFixed(2)} µs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Off-Time</p>
                      <p className="text-xl font-bold">{(results.offTime * 1e6).toFixed(2)} µs</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Duty Cycle Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter on-time and period values</p>
                  <p>Input the on-time (how long the signal is high) and the total period time. Both values should be in the same units, typically seconds or milliseconds.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Or use frequency and duty cycle</p>
                  <p>Alternatively, enter the frequency and desired duty cycle percentage. The calculator will determine the on-time and off-time for you.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to see results</p>
                  <p>You will see the duty cycle percentage, signal frequency, period, and the on-time and off-time durations for your PWM signal.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Duty Cycle Applications
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Application</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Duty Cycle</th>
                    <th className="text-left py-3 px-2 font-semibold">Purpose</th>
                    <th className="text-left py-3 px-2 font-semibold">Frequency Range</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">LED Dimming</td>
                    <td className="py-3 px-2">1-100%</td>
                    <td className="py-3 px-2">Brightness control</td>
                    <td className="py-3 px-2">100 Hz - 1 kHz</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">DC Motor Speed</td>
                    <td className="py-3 px-2">10-90%</td>
                    <td className="py-3 px-2">Speed regulation</td>
                    <td className="py-3 px-2">1-20 kHz</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Servo Control</td>
                    <td className="py-3 px-2">5-10%</td>
                    <td className="py-3 px-2">Position control</td>
                    <td className="py-3 px-2">50 Hz (20 ms period)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Buck Converter</td>
                    <td className="py-3 px-2">10-90%</td>
                    <td className="py-3 px-2">Voltage step-down</td>
                    <td className="py-3 px-2">50-500 kHz</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Boost Converter</td>
                    <td className="py-3 px-2">10-80%</td>
                    <td className="py-3 px-2">Voltage step-up</td>
                    <td className="py-3 px-2">50-500 kHz</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Class D Audio</td>
                    <td className="py-3 px-2">Variable</td>
                    <td className="py-3 px-2">Audio amplification</td>
                    <td className="py-3 px-2">200-500 kHz</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Duty cycle determines the average power delivered. Higher duty cycle means more on-time and higher average output.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Duty Cycle and PWM
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Duty Cycle?</h4>
                <p>
                  Duty cycle is the percentage of time a periodic signal is in its active (high) state. A 50% duty cycle means the signal is high for half the period and low for the other half. A 25% duty cycle means the signal is high for one-quarter of the period. Duty cycle directly controls average power delivery.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">PWM Basics</h4>
                <p>
                  Pulse Width Modulation (PWM) varies the width of pulses while keeping frequency constant. By changing the duty cycle, you control the average voltage or power without changing the supply voltage. This is highly efficient because the switching element is either fully on or fully off.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Duty Cycle Formula</h4>
                <p>
                  Duty cycle equals on-time divided by period, multiplied by 100. D = (T_on / T) × 100%. The period is the inverse of frequency: T = 1/f. Off-time equals period minus on-time: T_off = T - T_on.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Frequency Considerations</h4>
                <p>
                  PWM frequency affects performance. Too low and you get visible flicker in LEDs or audible noise in motors. Too high and switching losses increase. For motors, 1-20 kHz works well. For LEDs, 100 Hz minimum to avoid flicker. Power supplies often use 50-500 kHz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              PWM Design Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose the Right Frequency</p>
                  <p>For motor control, use 1-20 kHz to avoid audible noise. For LED dimming, use at least 200 Hz to prevent visible flicker. For power converters, higher frequencies allow smaller components but increase switching losses.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Mind the Dead Time</p>
                  <p>In H-bridge and half-bridge circuits, add dead time between switching transitions. This prevents shoot-through where both transistors conduct simultaneously, causing high current spikes and potential damage.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use Proper Filtering</p>
                  <p>PWM outputs often need filtering. Motors have inherent inductance that smooths current. LEDs may need current-limiting resistors. Power supplies require LC filters to convert PWM to smooth DC voltage.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider Minimum On/Off Times</p>
                  <p>Some loads need minimum on-time or off-time. Motors need minimum pulse width to overcome friction. Switching power supplies have minimum on-time limits. Ensure your duty cycle range accounts for these constraints.</p>
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
    question: "What does a 100% duty cycle mean?",
    answer: "A 100% duty cycle means the signal is always high (on) with no off-time. The output delivers full continuous power, equivalent to a direct connection to the supply. There is no PWM effect at 100% duty cycle since the signal never switches off.",
  },
{
    question: "How do I calculate duty cycle from frequency?",
    answer: "First find the period: T = 1/frequency. Then duty cycle = (on-time / period) × 100%. For example, at 1 kHz (1 ms period) with 0.25 ms on-time, duty cycle = (0.25 / 1) × 100% = 25%.",
  },
{
    question: "What frequency should I use for PWM motor control?",
    answer: "For DC motors, 1-20 kHz is typical. Below 1 kHz, you may hear audible whining. Above 20 kHz, switching losses increase without benefit. Small motors can use higher frequencies. Large motors often work well at 2-8 kHz.",
  },
{
    question: "Why does my LED flicker with PWM?",
    answer: "Flicker occurs when PWM frequency is too low. The human eye can detect flicker below about 100 Hz, especially in peripheral vision. Use at least 200 Hz for general lighting, 1 kHz or higher for camera applications to avoid banding in video.",
  },
{
    question: "What is the difference between duty cycle and frequency?",
    answer: "Frequency is how many complete cycles occur per second. Duty cycle is what percentage of each cycle the signal is on. You can change duty cycle without changing frequency, which is how PWM controls power while maintaining constant switching rate.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
