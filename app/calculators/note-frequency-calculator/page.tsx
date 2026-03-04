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

interface NoteFrequencyResult {
  note: string;
  octave: number;
  frequency: number;
  wavelength: number;
  midiNumber: number;
  centsFromA4: number;
  nearbyNotes: Array<{ note: string; frequency: number; difference: number }>;
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function NoteFrequencyCalculatorPage() {
  const [selectedNote, setSelectedNote] = useState<string>("A");
  const [selectedOctave, setSelectedOctave] = useState<string>("4");
  const [referenceFreq, setReferenceFreq] = useState<string>("440");
  const [result, setResult] = useState<NoteFrequencyResult | null>(null);

  const calculate = () => {
    const noteIndex = NOTES.indexOf(selectedNote);
    const octaveNum = parseInt(selectedOctave) || 4;
    const refFreq = parseFloat(referenceFreq) || 440;

    if (noteIndex === -1) return;

    // Calculate semitones from A4
    // A4 is at index 9 in our NOTES array, octave 4
    const semitonesFromA4 = noteIndex - 9 + (octaveNum - 4) * 12;

    // Calculate frequency using equal temperament
    // f = A4 × 2^(n/12) where n is semitones from A4
    const frequency = refFreq * Math.pow(2, semitonesFromA4 / 12);

    // Calculate wavelength (speed of sound / frequency)
    // Speed of sound ≈ 343 m/s at 20°C
    const wavelength = 343 / frequency;

    // MIDI note number (A4 = 69)
    const midiNumber = 69 + semitonesFromA4;

    // Cents from A4 (100 cents = 1 semitone)
    const centsFromA4 = semitonesFromA4 * 100;

    // Find nearby notes
    const nearbyNotes = [];
    const semitoneOffsets = [-1, 0, 1];

    for (const offset of semitoneOffsets) {
      const newSemitones = semitonesFromA4 + offset;
      const newFreq = refFreq * Math.pow(2, newSemitones / 12);
      const newNoteIndex = ((noteIndex + offset) % 12 + 12) % 12;
      let newOctave = octaveNum;
      if (noteIndex + offset < 0) newOctave--;
      if (noteIndex + offset >= 12) newOctave++;

      nearbyNotes.push({
        note: `${NOTES[newNoteIndex]}${newOctave}`,
        frequency: parseFloat(newFreq.toFixed(2)),
        difference: offset * 100,
      });
    }

    setResult({
      note: selectedNote,
      octave: octaveNum,
      frequency: parseFloat(frequency.toFixed(2)),
      wavelength: parseFloat(wavelength.toFixed(4)),
      midiNumber,
      centsFromA4,
      nearbyNotes,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Note Frequency Calculator – Find the Hz Frequency of Any Musical Note
          </h1>
          <p className="text-muted-foreground">
            Find the exact frequency of any musical note with our Note Frequency Calculator.
            Enter a note name and octave to instantly get its frequency in Hz — perfect for
            musicians, audio engineers, and instrument tuners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Frequency (A4)</Label>
                <Input
                  id="reference"
                  type="number"
                  value={referenceFreq}
                  onChange={(e) => setReferenceFreq(e.target.value)}
                  placeholder="440"
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 440 Hz, Alternative: 432 Hz
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Select:
                </p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => { setSelectedNote("C"); setSelectedOctave("4"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    C4 (Middle C)
                  </button>
                  <button
                    onClick={() => { setSelectedNote("A"); setSelectedOctave("4"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    A4 (440 Hz)
                  </button>
                  <button
                    onClick={() => { setSelectedNote("E"); setSelectedOctave("2"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    E2 (Bass)
                  </button>
                  <button
                    onClick={() => { setSelectedNote("C"); setSelectedOctave("5"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    C5 (High)
                  </button>
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
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="text-5xl font-bold text-primary">{result.frequency} Hz</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.note}{result.octave} @ {referenceFreq} Hz reference
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Wavelength</p>
                      <p className="text-lg font-bold">{result.wavelength} m</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">MIDI</p>
                      <p className="text-lg font-bold">{result.midiNumber}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Cents</p>
                      <p className="text-lg font-bold">{result.centsFromA4}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Nearby Notes</h4>
                    <div className="space-y-1">
                      {result.nearbyNotes.map((n, i) => (
                        <div
                          key={i}
                          className={`flex justify-between p-2 rounded text-sm ${i === 1 ? "bg-primary/10" : "bg-muted/50"
                            }`}
                        >
                          <span className="font-medium">{n.note}</span>
                          <span className="font-mono">{n.frequency} Hz</span>
                          <span className="text-muted-foreground">{n.difference > 0 ? "+" : ""}{n.difference} cents</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> f = A4 × 2^(n/12)
                      <br />
                      where n = semitones from A4
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a note and click Calculate to see frequency</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Note Frequencies
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Equal temperament:</strong> Each semitone is 2^(1/12) ≈ 1.0595×
                    the previous frequency
                  </li>
                  <li>
                    <strong>A4 = 440 Hz:</strong> International standard since 1955
                  </li>
                  <li>
                    <strong>Octave relationship:</strong> Each octave doubles the frequency
                    (A4 = 440 Hz, A5 = 880 Hz)
                  </li>
                  <li>
                    <strong>MIDI notes:</strong> A4 = MIDI note 69, each semitone ±1
                  </li>
                  <li>
                    <strong>Wavelength:</strong> λ = v/f where v ≈ 343 m/s (speed of sound)
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Some orchestras tune to 442 Hz or 444 Hz for a
                  brighter sound. Historical pitch varied widely (A = 415 Hz in Baroque era).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">How to Calculate Note Frequency</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                  <h3 className="font-semibold mb-2">Select Your Note</h3>
                  <p className="text-sm text-muted-foreground">Choose the note name (C, D, E, etc.) and octave number from the dropdown menus.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                  <h3 className="font-semibold mb-2">Set Reference Pitch</h3>
                  <p className="text-sm text-muted-foreground">Use standard A4=440Hz or adjust for alternative tunings like 432Hz.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                  <h3 className="font-semibold mb-2">Get Instant Results</h3>
                  <p className="text-sm text-muted-foreground">View the exact frequency in Hz, wavelength, MIDI number, and nearby notes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Key Features of This Note Frequency Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Equal Temperament Formula
                  </h3>
                  <p className="text-sm text-muted-foreground">Uses the standard f = A4 × 2^(n/12) formula for accurate frequency calculations across all octaves.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Custom Reference Frequency
                  </h3>
                  <p className="text-sm text-muted-foreground">Adjust the A4 reference from standard 440Hz to 432Hz, 442Hz, or any custom tuning.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    MIDI Note Numbers
                  </h3>
                  <p className="text-sm text-muted-foreground">Get the corresponding MIDI note number for digital audio workstation integration.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Wavelength Calculation
                  </h3>
                  <p className="text-sm text-muted-foreground">See the sound wavelength in meters based on the speed of sound at room temperature.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Nearby Notes Reference
                  </h3>
                  <p className="text-sm text-muted-foreground">View adjacent semitones with their frequencies and cent differences for tuning context.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions About Note Frequencies</h2>
              <div className="space-y-4">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is the frequency of middle C?</h3>
                  <p className="text-sm text-muted-foreground">Middle C (C4) has a frequency of approximately 261.63 Hz when A4 is tuned to 440 Hz. This is the C closest to the middle of a piano keyboard.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">Why is A4 set to 440 Hz?</h3>
                  <p className="text-sm text-muted-foreground">A4=440Hz became the international standard in 1955 (ISO 16). Before that, tuning varied widely - Baroque orchestras often used A=415Hz, while some modern orchestras prefer 442Hz for a brighter sound.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How do you calculate frequency from note name?</h3>
                  <p className="text-sm text-muted-foreground">Use the formula f = 440 × 2^(n/12), where n is the number of semitones from A4. For example, C5 is 9 semitones above A4, so f = 440 × 2^(9/12) ≈ 523.25 Hz.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is 432 Hz tuning?</h3>
                  <p className="text-sm text-muted-foreground">432 Hz tuning sets A4 to 432 Hz instead of 440 Hz. Proponents claim it sounds more natural, though this is debated. All other notes shift proportionally - C4 becomes about 256 Hz instead of 261.63 Hz.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How does octave affect frequency?</h3>
                  <p className="text-sm text-muted-foreground">Each octave doubles the frequency. A4 is 440 Hz, A5 is 880 Hz, and A3 is 220 Hz. This 2:1 ratio is why notes an octave apart sound so similar - they share the same harmonic series.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Related Music and Audio Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/frequency-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Frequency Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate frequency from wavelength, period, or angular velocity for any wave.</p>
                </a>
                <a href="/calculators/tempo-to-delay-time-converter" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Tempo to Delay Time Converter</h3>
                  <p className="text-sm text-muted-foreground">Convert BPM to milliseconds for audio delay effects and music production.</p>
                </a>
                <a href="/calculators/sound-speed-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Sound Speed Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate the speed of sound in different mediums and temperatures.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
