"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DopplerEffectCalculator() {
  const [sourceFreq, setSourceFreq] = useState<string>("");
  const [sourceVelocity, setSourceVelocity] = useState<string>("");
  const [observerVelocity, setObserverVelocity] = useState<string>("");
  const [waveType, setWaveType] = useState<"sound" | "light">("sound");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const fs = parseFloat(sourceFreq);
    const vs = parseFloat(sourceVelocity);
    const vo = parseFloat(observerVelocity);
    const c = waveType === "sound" ? 343 : 299792458;

    if (fs > 0 && c > 0) {
      // Observer moving towards source: +vo, Source moving towards observer: -vs
      const fo = fs * (c + vo) / (c - vs);
      const shift = fo - fs;
      const redshift = waveType === "light" ? (fo - fs) / fs : null;

      setResults({
        observedFreq: Math.round(fo * 100) / 100,
        shift: Math.round(shift * 100) / 100,
        redshift: redshift ? redshift.toExponential(4) : null,
      });
    }
  };

  const reset = () => {
    setSourceFreq(""); setSourceVelocity(""); setObserverVelocity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Wave Type</Label>
              <Select value={waveType} onValueChange={(v) => setWaveType(v as typeof waveType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sound">Sound (c = 343 m/s)</SelectItem>
                  <SelectItem value="light">Light (c = 3×10⁸ m/s)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Source Freq (Hz)</Label><Input value={sourceFreq} onChange={e => setSourceFreq(e.target.value)} /></div>
              <div><Label>Source Velocity (m/s)</Label><Input value={sourceVelocity} onChange={e => setSourceVelocity(e.target.value)} /></div>
              <div><Label>Observer Velocity (m/s)</Label><Input value={observerVelocity} onChange={e => setObserverVelocity(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Positive = moving towards each other</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Observed Frequency</p>
                    <p className="text-3xl font-bold">{results.observedFreq} Hz</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency Shift</p>
                    <p className="text-2xl font-bold">{results.shift > 0 ? "+" : ""}{results.shift} Hz</p>
                  </div>
                </div>
                {results.redshift && (
                  <div>
                    <p className="text-sm text-muted-foreground">Redshift (z)</p>
                    <p className="text-xl font-bold">{results.redshift}</p>
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
              How to Use This Doppler Effect Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select the wave type</p>
                  <p>Choose between sound waves (for acoustic Doppler effects) or light waves (for astronomical redshift calculations). The speed of wave propagation differs significantly between these types.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the source frequency and velocities</p>
                  <p>Input the original frequency emitted by the source. Enter the velocity of both the source and observer. Positive values indicate motion toward each other.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to see the frequency shift</p>
                  <p>You will see the observed frequency, the amount of frequency shift, and for light waves, the redshift value used in astronomy.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Doppler Effect Examples
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                    <th className="text-left py-3 px-2 font-semibold">Source Motion</th>
                    <th className="text-left py-3 px-2 font-semibold">Effect</th>
                    <th className="text-left py-3 px-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Approaching</td>
                    <td className="py-3 px-2">Moving toward observer</td>
                    <td className="py-3 px-2">Higher frequency (blueshift)</td>
                    <td className="py-3 px-2">Ambulance siren approaching</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Receding</td>
                    <td className="py-3 px-2">Moving away from observer</td>
                    <td className="py-3 px-2">Lower frequency (redshift)</td>
                    <td className="py-3 px-2">Ambulance siren passing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Stationary</td>
                    <td className="py-3 px-2">No relative motion</td>
                    <td className="py-3 px-2">No frequency shift</td>
                    <td className="py-3 px-2">Parked car horn</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Cosmological</td>
                    <td className="py-3 px-2">Galaxy moving away</td>
                    <td className="py-3 px-2">Light redshift</td>
                    <td className="py-3 px-2">Distant galaxies</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Radar</td>
                    <td className="py-3 px-2">Object reflecting waves</td>
                    <td className="py-3 px-2">Double Doppler shift</td>
                    <td className="py-3 px-2">Police speed radar</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Medical</td>
                    <td className="py-3 px-2">Blood cells moving</td>
                    <td className="py-3 px-2">Ultrasound frequency shift</td>
                    <td className="py-3 px-2">Doppler ultrasound</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Blueshift means higher frequency (shorter wavelength), redshift means lower frequency (longer wavelength).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding the Doppler Effect
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is the Doppler Effect?</h4>
                <p>
                  The Doppler effect is the change in frequency or wavelength of a wave in relation to an observer who is moving relative to the wave source. When the source and observer move toward each other, the observed frequency increases. When they move apart, the observed frequency decreases. This effect applies to all types of waves, including sound, light, and water waves.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Doppler Formula</h4>
                <p>
                  For sound waves, the observed frequency is calculated as: f_observed = f_source × (c + v_observer) / (c - v_source), where c is the speed of sound, v_observer is the observer velocity, and v_source is the source velocity. Positive velocities indicate motion toward each other. For light waves at high speeds, relativistic corrections are needed.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Redshift and Blueshift</h4>
                <p>
                  In astronomy, the Doppler effect for light is called redshift when objects move away (light shifts toward the red end of the spectrum) and blueshift when objects approach (light shifts toward blue). Edwin Hubble used redshift measurements to discover that the universe is expanding.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Everyday Examples</h4>
                <p>
                  The most common experience of the Doppler effect is hearing a siren change pitch as an ambulance passes. The pitch sounds higher as it approaches and lower as it moves away. Race car fans notice the same effect with engine noise. Weather radar uses the Doppler effect to measure wind speed and detect tornadoes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Applications of the Doppler Effect
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Radar Speed Detection</p>
                  <p>Police radar guns bounce radio waves off vehicles. The frequency shift of the reflected wave reveals the vehicle speed. This same principle is used in sports radar guns for baseball and tennis.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Weather Radar</p>
                  <p>Doppler weather radar measures the velocity of raindrops and snowflakes. This allows meteorologists to detect rotation in storms, identify wind patterns, and issue tornado warnings before visible funnel clouds form.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Medical Ultrasound</p>
                  <p>Doppler ultrasound measures blood flow velocity by detecting frequency shifts in sound waves reflected from moving blood cells. This helps diagnose heart conditions, blood clots, and fetal health during pregnancy.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Astronomy and Cosmology</p>
                  <p>Astronomers measure redshift of distant galaxies to determine their velocity and distance. Hubble used this to discover the expanding universe. Redshift is also used to detect exoplanets by measuring stellar wobble.</p>
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
                <h4 className="font-medium text-foreground mb-2">What causes the Doppler effect?</h4>
                <p>
                  The Doppler effect occurs because wave fronts get compressed when the source moves toward the observer and stretched when it moves away. This compression or stretching changes the wavelength, which changes the frequency. The effect depends only on relative motion between source and observer.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does a siren change pitch as it passes?</h4>
                <p>
                  As the ambulance approaches, each sound wave is emitted from a position closer to you than the previous wave. This compresses the waves, raising the pitch. After it passes, each wave is emitted from a position farther away, stretching the waves and lowering the pitch.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is redshift in astronomy?</h4>
                <p>
                  Redshift is the Doppler effect for light from objects moving away from Earth. The light wavelength stretches, shifting toward the red end of the spectrum. Astronomers measure redshift to determine how fast galaxies are receding and how far away they are. Greater redshift means greater distance and velocity.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does the Doppler effect apply to light?</h4>
                <p>
                  Yes, the Doppler effect applies to all waves including light. For light, frequency changes appear as color shifts. However, at very high speeds approaching the speed of light, relativistic effects must be considered. The basic principle remains the same: approaching sources appear bluer, receding sources appear redder.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How is the Doppler effect used in radar?</h4>
                <p>
                  Radar systems emit radio waves that bounce off objects and return. If the object is moving, the reflected waves have a different frequency due to the Doppler effect. By measuring this frequency shift, radar can calculate the object speed. This works for vehicles, aircraft, weather systems, and even sports balls.
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
                href="/calculators/wavelength-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Wavelength Calculator</span>
                <p className="text-muted-foreground">Calculate wavelength from frequency and wave velocity</p>
              </a>
              <a
                href="/calculators/frequency-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Frequency Calculator</span>
                <p className="text-muted-foreground">Convert between frequency, period, and angular frequency</p>
              </a>
              <a
                href="/calculators/sound-speed-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Sound Speed Calculator</span>
                <p className="text-muted-foreground">Calculate the speed of sound in different conditions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
