"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
