"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TuningResult {
  referenceFrequency: number;
  note: string;
  octave: number;
  frequency: number;
  frequencyShift: number;
  centsOff: number;
  allNotes: Array<{ note: string; frequency: number; shift: number }>;
  temperament: string;
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function TuningFrequencyConverterPage() {
  const [referenceFreq, setReferenceFreq] = useState<string>("440");
  const [targetFreq, setTargetFreq] = useState<string>("432");
  const [selectedNote, setSelectedNote] = useState<string>("A");
  const [selectedOctave, setSelectedOctave] = useState<string>("4");
  const [result, setResult] = useState<TuningResult | null>(null);

  const calculate = () => {
    const refNum = parseFloat(referenceFreq) || 440;
    const targetNum = parseFloat(targetFreq) || 432;
    const noteIndex = NOTES.indexOf(selectedNote);
    const octaveNum = parseInt(selectedOctave) || 4;

    if (noteIndex === -1) return;

    // Calculate frequency of selected note at reference tuning
    // A4 = reference frequency
    // Formula: f = ref × 2^(n/12) where n is semitones from A4
    const semitonesFromA4 = noteIndex - 9 + (octaveNum - 4) * 12;
    const frequency = refNum * Math.pow(2, semitonesFromA4 / 12);

    // Calculate frequency at target tuning
    const targetFrequency = targetNum * Math.pow(2, semitonesFromA4 / 12);

    // Frequency shift
    const frequencyShift = targetFrequency - frequency;

    // Cents difference (100 cents = 1 semitone)
    const centsOff = 1200 * Math.log2(targetNum / refNum);

    // Generate all notes for the octave at both tunings
    const allNotes = NOTES.map((note, i) => {
      const noteSemitones = i - 9 + (octaveNum - 4) * 12;
      const refFreq = refNum * Math.pow(2, noteSemitones / 12);
      const tgtFreq = targetNum * Math.pow(2, noteSemitones / 12);
      return {
        note,
        frequency: parseFloat(tgtFreq.toFixed(2)),
        shift: parseFloat((tgtFreq - refFreq).toFixed(2)),
      };
    });

    // Temperament description
    let temperament = "";
    if (targetNum === 432) {
      temperament = "Verdi tuning - claimed to be more natural/resonant";
    } else if (targetNum === 444) {
      temperament = "Modern orchestral tuning - brighter sound";
    } else if (targetNum === 415) {
      temperament = "Baroque pitch - approximately one semitone lower";
    } else if (targetNum === 440) {
      temperament = "Standard concert pitch (ISO 16)";
    } else {
      temperament = `Custom tuning - ${centsOff.toFixed(1)} cents ${targetNum > refNum ? "sharp" : "flat"}`;
    }

    setResult({
      referenceFrequency: refNum,
      note: selectedNote,
      octave: octaveNum,
      frequency: parseFloat(frequency.toFixed(2)),
      frequencyShift: parseFloat(frequencyShift.toFixed(2)),
      centsOff: parseFloat(centsOff.toFixed(1)),
      allNotes,
      temperament,
    });
  };

  const reset = () => {
    setReferenceFreq("440");
    setTargetFreq("432");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch
          </h1>
          <p className="text-muted-foreground">
            Explore alternative tuning standards with our Tuning Frequency Converter.
            Change the A4 reference pitch from 440Hz to 432Hz, 444Hz, or any custom value
            and see how every note&apos;s frequency adjusts — useful for musicians working
            with different orchestras and DAWs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="ref-freq">Reference (Current) Hz</Label>
                  <Input
                    id="ref-freq"
                    type="number"
                    value={referenceFreq}
                    onChange={(e) => setReferenceFreq(e.target.value)}
                    placeholder="440"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="target-freq">Target Hz</Label>
                  <Input
                    id="target-freq"
                    type="number"
                    value={targetFreq}
                    onChange={(e) => setTargetFreq(e.target.value)}
                    placeholder="432"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium mb-2">Common Reference Pitches:</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => { setReferenceFreq("440"); setTargetFreq("432"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    440 → 432 Hz
                  </button>
                  <button
                    onClick={() => { setReferenceFreq("440"); setTargetFreq("444"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    440 → 444 Hz
                  </button>
                  <button
                    onClick={() => { setReferenceFreq("440"); setTargetFreq("415"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    440 → 415 Hz
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="note">Note</Label>
                  <Select value={selectedNote} onValueChange={setSelectedNote}>
                    <SelectTrigger id="note">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NOTES.map((note) => (
                        <SelectItem key={note} value={note}>
                          {note}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="octave">Octave</Label>
                  <Select value={selectedOctave} onValueChange={setSelectedOctave}>
                    <SelectTrigger id="octave">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequency Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      {result.note}{result.octave} at {result.referenceFrequency}Hz → {targetFreq}Hz
                    </p>
                    <p className="text-3xl font-bold text-primary mt-2">
                      {result.frequency} Hz → {parseFloat((result.frequency + result.frequencyShift).toFixed(2))} Hz
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Shift: {result.frequencyShift > 0 ? "+" : ""}{result.frequencyShift} Hz ({result.centsOff} cents)
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Temperament</p>
                    <p className="text-sm text-muted-foreground">{result.temperament}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">All Notes (Octave {result.octave})</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-1">Note</th>
                            <th className="text-right">@ {targetFreq}Hz</th>
                            <th className="text-right">Shift</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.allNotes.map((n, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-1 font-medium">{n.note}</td>
                              <td className="text-right font-mono">{n.frequency} Hz</td>
                              <td className={`text-right font-mono ${n.shift > 0 ? "text-green-600" : n.shift < 0 ? "text-red-600" : ""}`}>
                                {n.shift > 0 ? "+" : ""}{n.shift} Hz
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> f = A4 × 2^(n/12) where n = semitones from A4
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter frequencies and click Calculate to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tuning Standards Explained
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>440 Hz:</strong> ISO 16 standard since 1955. Used by most
                    orchestras and music production.
                  </li>
                  <li>
                    <strong>432 Hz:</strong> &quot;Verdi tuning&quot; - claimed by some to be
                    more natural and resonant. Popular in meditation music.
                  </li>
                  <li>
                    <strong>444 Hz:</strong> Modern orchestral tuning - produces a
                    brighter, more brilliant sound.
                  </li>
                  <li>
                    <strong>415 Hz:</strong> Baroque pitch - approximately one semitone
                    below 440 Hz, used for period instruments.
                  </li>
                  <li>
                    <strong>442 Hz:</strong> Common in European orchestras for a
                    slightly brighter sound.
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> A difference of 1 cent is generally imperceptible.
                  Most people can detect differences of 5-10 cents.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Convert Tuning Frequencies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Set Reference and Target Frequencies</h3>
                <p className="text-sm text-muted-foreground">Enter your current tuning standard (e.g., 440Hz) and the target frequency you want to convert to.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Select the Note to Convert</h3>
                <p className="text-sm text-muted-foreground">Choose any note from C to B and specify the octave to see its frequency at both tunings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">View Complete Frequency Table</h3>
                <p className="text-sm text-muted-foreground">See all 12 notes with their converted frequencies and the shift in Hz and cents.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Tuning Frequency Converter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Multiple Reference Pitches</h3>
              <p className="text-sm text-muted-foreground">Convert between 440Hz, 432Hz, 444Hz, 415Hz, and custom frequencies for any musical application.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Complete Note Table</h3>
              <p className="text-sm text-muted-foreground">Generate all 12 chromatic notes at once with precise frequency values for your DAW or tuner.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Cents Calculation</h3>
              <p className="text-sm text-muted-foreground">See the exact pitch difference in cents for microtuning and instrument setup adjustments.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Historical Temperaments</h3>
              <p className="text-sm text-muted-foreground">Explore Baroque pitch (415Hz), Verdi tuning (432Hz), and modern orchestral standards (442-444Hz).</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Common Tuning Standards Reference</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Standard</th>
                  <th className="text-left py-2">A4 Frequency</th>
                  <th className="text-left py-2">Use Case</th>
                  <th className="text-left py-2">Cents vs 440Hz</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Baroque Pitch</td>
                  <td className="py-2 font-mono">415 Hz</td>
                  <td className="py-2">Period instruments</td>
                  <td className="py-2">-100 cents</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Verdi Tuning</td>
                  <td className="py-2 font-mono">432 Hz</td>
                  <td className="py-2">Meditation, alternative</td>
                  <td className="py-2">-32 cents</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Concert Pitch</td>
                  <td className="py-2 font-mono">440 Hz</td>
                  <td className="py-2">Standard (ISO 16)</td>
                  <td className="py-2">0 cents</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">European Orchestra</td>
                  <td className="py-2 font-mono">442 Hz</td>
                  <td className="py-2">European orchestras</td>
                  <td className="py-2">+8 cents</td>
                </tr>
                <tr>
                  <td className="py-2">Modern Orchestra</td>
                  <td className="py-2 font-mono">444 Hz</td>
                  <td className="py-2">Bright orchestral sound</td>
                  <td className="py-2">+16 cents</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between 440Hz and 432Hz tuning?</h3>
              <p className="text-sm text-muted-foreground">432Hz is 32 cents lower than 440Hz, creating a slightly warmer, more relaxed sound. Proponents claim 432Hz is more natural and resonant, though this is debated. The difference is subtle but noticeable to trained ears.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do orchestras tune to 442Hz or 444Hz?</h3>
              <p className="text-sm text-muted-foreground">Higher tuning creates a brighter, more brilliant sound that projects better in concert halls. European orchestras commonly use 442Hz, while some modern ensembles use 444Hz for extra brilliance.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is Baroque pitch (415Hz)?</h3>
              <p className="text-sm text-muted-foreground">415Hz is approximately one semitone below 440Hz, used for historically informed performances of Baroque music. This lower pitch was common in the 17th-18th centuries and affects instrument string tension and tone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I retune my guitar to 432Hz?</h3>
              <p className="text-sm text-muted-foreground">Use a chromatic tuner set to 432Hz reference, or tune normally then flatten each string by about 32 cents. Alternatively, capo at fret 1 and tune down a semitone for approximate 432Hz sound.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I hear the difference between tuning standards?</h3>
              <p className="text-sm text-muted-foreground">Most people can detect differences of 5-10 cents. The 32-cent difference between 440Hz and 432Hz is clearly audible. Side-by-side comparisons make the warmer character of lower tunings obvious.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Music Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/note-frequency-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Note Frequency Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the exact frequency of any musical note.</p>
            </a>
            <a href="/calculators/tempo-to-delay-time-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Tempo to Delay Time Converter</h3>
              <p className="text-sm text-muted-foreground">Convert BPM to milliseconds for audio delay effects.</p>
            </a>
            <a href="/calculators/chord-progression-generator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Chord Progression Generator</h3>
              <p className="text-sm text-muted-foreground">Create harmonic progressions for your compositions.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
