"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TempoToDelayTimeConverterPage() {
  const [bpm, setBpm] = useState<string>("120");
  const [result, setResult] = useState<{
    quarterNote: number;
    eighthNote: number;
    sixteenthNote: number;
    dottedEighth: number;
    dottedQuarter: number;
    tripletEighth: number;
    tripletQuarter: number;
  } | null>(null);

  const calculate = () => {
    const tempo = parseFloat(bpm);
    if (isNaN(tempo) || tempo <= 0) return;

    // Calculate beat duration in milliseconds
    const quarterNoteMs = 60000 / tempo;

    setResult({
      quarterNote: Math.round(quarterNoteMs),
      eighthNote: Math.round(quarterNoteMs / 2),
      sixteenthNote: Math.round(quarterNoteMs / 4),
      dottedEighth: Math.round(quarterNoteMs / 2 * 1.5),
      dottedQuarter: Math.round(quarterNoteMs * 1.5),
      tripletEighth: Math.round(quarterNoteMs / 3),
      tripletQuarter: Math.round(quarterNoteMs / 3 * 2)
    });
  };

  const reset = () => {
    setBpm("120");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms</h1>
          <p className="text-muted-foreground">
            Sync your delay effects perfectly with your track's tempo using our BPM to Delay Converter. Enter your song's BPM to get delay times in milliseconds for quarter notes, eighth notes, dotted values, and more — essential for producers and guitarists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bpm">Tempo (BPM)</Label>
                <Input
                  id="bpm"
                  type="number"
                  placeholder="e.g., 120"
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Common tempos: 60-200 BPM</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Convert
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Delay Times (ms)</h3>
              {result ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Quarter Note</p>
                      <p className="text-xl font-bold text-primary">{result.quarterNote} ms</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Dotted Quarter</p>
                      <p className="text-xl font-bold text-primary">{result.dottedQuarter} ms</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Eighth Note</p>
                      <p className="text-lg font-semibold">{result.eighthNote} ms</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Dotted Eighth</p>
                      <p className="text-lg font-semibold">{result.dottedEighth} ms</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Sixteenth Note</p>
                      <p className="text-lg font-semibold">{result.sixteenthNote} ms</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Triplet Eighth</p>
                      <p className="text-lg font-semibold">{result.tripletEighth} ms</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Pro Tip:</p>
                    <p className="text-sm">Use dotted eighth notes (3/16) for classic slapback echo. Quarter note delays work great for ambient soundscapes.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter BPM and click Convert to see delay times</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Your Tempo</h4>
                    <p className="text-xs text-muted-foreground">Input your song or track tempo in beats per minute (BPM). Common tempos range from 60 BPM (ballads) to 180+ BPM (drum and bass).</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Calculate Note Values</h4>
                    <p className="text-xs text-muted-foreground">The calculator converts BPM to milliseconds for quarter notes, eighth notes, dotted values, and triplets automatically.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Apply to Delay Plugin</h4>
                    <p className="text-xs text-muted-foreground">Use the calculated millisecond values in your delay plugin to create tempo-synced echoes that groove with your track.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Delay Note Values Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Note Value</th>
                      <th className="text-left py-2 px-3 font-semibold">Formula</th>
                      <th className="text-left py-2 px-3 font-semibold">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Quarter Note</td>
                      <td className="py-2 px-3 font-mono text-xs">60000 / BPM</td>
                      <td className="py-2 px-3 text-xs">Long delays, ambient textures</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Dotted Quarter</td>
                      <td className="py-2 px-3 font-mono text-xs">(60000 / BPM) × 1.5</td>
                      <td className="py-2 px-3 text-xs">U2-style rhythmic delays</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Eighth Note</td>
                      <td className="py-2 px-3 font-mono text-xs">30000 / BPM</td>
                      <td className="py-2 px-3 text-xs">Standard rhythmic delay</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Dotted Eighth</td>
                      <td className="py-2 px-3 font-mono text-xs">(30000 / BPM) × 1.5</td>
                      <td className="py-2 px-3 text-xs">Classic slapback, rockabilly</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Sixteenth Note</td>
                      <td className="py-2 px-3 font-mono text-xs">15000 / BPM</td>
                      <td className="py-2 px-3 text-xs">Tight, fast repeats</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Triplet Eighth</td>
                      <td className="py-2 px-3 font-mono text-xs">20000 / BPM</td>
                      <td className="py-2 px-3 text-xs">Swing feel, shuffle rhythms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Tempo-Synced Delays</h4>
                  <p className="text-xs text-muted-foreground">Create delay effects that lock perfectly to your track's tempo, eliminating timing guesswork and manual tapping.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Multiple Note Values</h4>
                  <p className="text-xs text-muted-foreground">Get instant conversions for quarter, eighth, sixteenth, dotted, and triplet note delays in one calculation.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Production Ready</h4>
                  <p className="text-xs text-muted-foreground">Results displayed in milliseconds – the standard unit for delay plugins in all major DAWs.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Creative Inspiration</h4>
                  <p className="text-xs text-muted-foreground">Explore different delay times to discover new rhythmic patterns and spatial effects for your mixes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I convert BPM to delay time in milliseconds?</h4>
                <p className="text-xs text-muted-foreground">
                  Divide 60,000 by the BPM to get quarter note delay in ms. For example: 60000 / 120 BPM = 500ms. For eighth notes, divide by 2 (250ms). For dotted eighth, multiply eighth note by 1.5 (375ms).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is dotted eighth note delay?</h4>
                <p className="text-xs text-muted-foreground">
                  A dotted eighth note equals an eighth note plus a sixteenth (1.5 × eighth note duration). At 120 BPM, that's 375ms. This creates a distinctive rhythmic pattern famously used by The Edge from U2 on songs like "Where the Streets Have No Name."
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What delay time should I use for slapback echo?</h4>
                <p className="text-xs text-muted-foreground">
                  Classic slapback echo uses 75-150ms delay with 1-3 repeats. For tempo-synced slapback, use dotted eighth note delay at faster tempos (140+ BPM) or sixteenth note at medium tempos (80-120 BPM).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Should delay be synced to tempo?</h4>
                <p className="text-xs text-muted-foreground">
                  Tempo-synced delay creates rhythmic cohesion in produced music. However, unsynced delays can sound more natural and organic. Use synced delays for electronic, pop, and rock; try free-time delays for ambient, classical, or acoustic music.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What's the difference between triplet and straight delay?</h4>
                <p className="text-xs text-muted-foreground">
                  Triplet delays divide the beat into 3 equal parts instead of 2 or 4. At 120 BPM, an eighth note triplet is 333ms (vs. 250ms for straight eighth). Triplets create a swing or shuffle feel, great for blues, hip-hop, and groovy rock.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Related Tools</h3>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/calculators/note-frequency-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Note Frequency Calculator</p>
                  <p className="text-xs text-muted-foreground">Convert musical notes to Hz</p>
                </a>
                <a href="/calculators/audio-dynamic-range-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Audio Dynamic Range Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate dB headroom</p>
                </a>
                <a href="/calculators/db-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Decibel Calculator</p>
                  <p className="text-xs text-muted-foreground">Convert dB to power ratios</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
