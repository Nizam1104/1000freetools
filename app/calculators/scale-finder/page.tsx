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

interface ScaleResult {
  rootNote: string;
  scaleType: string;
  notes: string[];
  intervals: string[];
  chords: string[];
  description: string;
}

const scales: Record<string, { intervals: number[]; description: string }> = {
  major: { intervals: [0, 2, 4, 5, 7, 9, 11], description: "Ionian mode - bright, happy sound" },
  naturalMinor: { intervals: [0, 2, 3, 5, 7, 8, 10], description: "Aeolian mode - sad, melancholic sound" },
  harmonicMinor: { intervals: [0, 2, 3, 5, 7, 8, 11], description: "Minor with raised 7th - exotic sound" },
  melodicMinor: { intervals: [0, 2, 3, 5, 7, 9, 11], description: "Jazz minor - smooth ascending sound" },
  dorian: { intervals: [0, 2, 3, 5, 7, 9, 10], description: "Minor with raised 6th - jazzy minor" },
  phrygian: { intervals: [0, 1, 3, 5, 7, 8, 10], description: "Minor with flat 2nd - Spanish/flamenco sound" },
  lydian: { intervals: [0, 2, 4, 6, 7, 9, 11], description: "Major with raised 4th - dreamy sound" },
  mixolydian: { intervals: [0, 2, 4, 5, 7, 9, 10], description: "Major with flat 7th - bluesy sound" },
  locrian: { intervals: [0, 1, 3, 5, 6, 8, 10], description: "Diminished - unstable, tense sound" },
  pentatonicMajor: { intervals: [0, 2, 4, 7, 9], description: "5-note major scale - versatile" },
  pentatonicMinor: { intervals: [0, 3, 5, 7, 10], description: "5-note minor scale - blues/rock" },
  blues: { intervals: [0, 3, 5, 6, 7, 10], description: "Minor pentatonic with flat 5 - blues sound" },
  wholeTone: { intervals: [0, 2, 4, 6, 8, 10], description: "All whole steps - dreamy, ambiguous" },
  diminished: { intervals: [0, 2, 3, 5, 6, 8, 9, 11], description: "Alternating whole/half steps - tense" },
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function ScaleFinderPage() {
  const [rootNote, setRootNote] = useState<string>("C");
  const [scaleType, setScaleType] = useState<string>("major");
  const [result, setResult] = useState<ScaleResult | null>(null);

  const calculate = () => {
    const rootIndex = NOTES.indexOf(rootNote);
    const scaleData = scales[scaleType];

    if (rootIndex === -1 || !scaleData) return;

    // Calculate scale notes
    const notes = scaleData.intervals.map(interval => {
      const noteIndex = (rootIndex + interval) % 12;
      return NOTES[noteIndex];
    });

    // Generate intervals string
    const intervalNames = ["1", "b2", "2", "b3", "3", "4", "#4", "5", "b6", "6", "b7", "7"];
    const intervals = scaleData.intervals.map(interval => intervalNames[interval]);

    // Generate diatonic chords (for 7-note scales)
    const chords: string[] = [];
    if (scaleData.intervals.length === 7) {
      const chordQualities: Record<string, string[]> = {
        major: ["", "m", "m", "", "", "m", "dim"],
        naturalMinor: ["m", "dim", "", "m", "m", "", ""],
        harmonicMinor: ["m", "dim", "aug", "m", "", "m", "dim"],
        dorian: ["m", "m", "", "", "m", "dim", ""],
        phrygian: ["m", "", "", "m", "dim", "", "m"],
        lydian: ["", "", "m", "dim", "", "m", "m"],
        mixolydian: ["", "m", "dim", "", "m", "m", ""],
      };
      const qualities = chordQualities[scaleType] || Array(7).fill("");

      for (let i = 0; i < 7; i++) {
        const chordRoot = notes[i];
        const quality = qualities[i];
        chords.push(`${chordRoot}${quality}`);
      }
    }

    setResult({
      rootNote,
      scaleType,
      notes,
      intervals,
      chords,
      description: scaleData.description,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Scale Finder – Find the Right Musical Scale for Any Key or Note Set
          </h1>
          <p className="text-muted-foreground">
            Discover which musical scales fit your notes with our Scale Finder.
            Enter a root note and select a scale type to view the notes, intervals,
            and diatonic chords — perfect for songwriters and improvising musicians.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="root-note">Root Note</Label>
                  <Select value={rootNote} onValueChange={setRootNote}>
                    <SelectTrigger id="root-note">
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
                  <Label htmlFor="scale-type">Scale Type</Label>
                  <Select value={scaleType} onValueChange={setScaleType}>
                    <SelectTrigger id="scale-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Major (Ionian)</SelectItem>
                      <SelectItem value="naturalMinor">Natural Minor (Aeolian)</SelectItem>
                      <SelectItem value="harmonicMinor">Harmonic Minor</SelectItem>
                      <SelectItem value="melodicMinor">Melodic Minor</SelectItem>
                      <SelectItem value="dorian">Dorian</SelectItem>
                      <SelectItem value="phrygian">Phrygian</SelectItem>
                      <SelectItem value="lydian">Lydian</SelectItem>
                      <SelectItem value="mixolydian">Mixolydian</SelectItem>
                      <SelectItem value="locrian">Locrian</SelectItem>
                      <SelectItem value="pentatonicMajor">Pentatonic Major</SelectItem>
                      <SelectItem value="pentatonicMinor">Pentatonic Minor</SelectItem>
                      <SelectItem value="blues">Blues</SelectItem>
                      <SelectItem value="wholeTone">Whole Tone</SelectItem>
                      <SelectItem value="diminished">Diminished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Select:
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => { setRootNote("C"); setScaleType("major"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    C Major
                  </button>
                  <button
                    onClick={() => { setRootNote("A"); setScaleType("naturalMinor"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    A Minor
                  </button>
                  <button
                    onClick={() => { setRootNote("G"); setScaleType("mixolydian"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    G Mixolydian
                  </button>
                  <button
                    onClick={() => { setRootNote("D"); setScaleType("dorian"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    D Dorian
                  </button>
                  <button
                    onClick={() => { setRootNote("E"); setScaleType("pentatonicMinor"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    E Minor Pentatonic
                  </button>
                  <button
                    onClick={() => { setRootNote("C"); setScaleType("blues"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    C Blues
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Find Scale
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Scale Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Scale</p>
                    <p className="text-2xl font-bold text-primary">{result.rootNote} {result.scaleType.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.notes.map((note, i) => (
                        <div key={i} className="px-3 py-2 bg-primary text-primary-foreground rounded font-bold">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Intervals</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.intervals.map((interval, i) => (
                        <span key={i} className="px-2 py-1 bg-muted-foreground/20 rounded text-sm font-mono">
                          {interval}
                        </span>
                      ))}
                    </div>
                  </div>

                  {result.chords.length > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Diatonic Chords</h4>
                      <div className="grid grid-cols-7 gap-1">
                        {result.chords.map((chord, i) => (
                          <div key={i} className="text-center p-2 bg-muted-foreground/20 rounded">
                            <p className="text-xs text-muted-foreground">{i + 1}</p>
                            <p className="font-bold">{chord}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> Use these notes for improvisation, songwriting,
                      or melody creation in the key of {result.rootNote}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a root note and scale type to see the scale</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How the Scale Finder Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Select Root Note</h4>
                  <p className="text-sm text-muted-foreground">Choose the starting note (tonic) for your scale from any of the 12 chromatic notes.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Choose Scale Type</h4>
                  <p className="text-sm text-muted-foreground">Pick from major, minor, modes, pentatonic, blues, and other scale varieties.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Get Scale Details</h4>
                  <p className="text-sm text-muted-foreground">View all notes, intervals, and diatonic chords for your selected scale instantly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">15 Scale Types</h4>
                    <p className="text-sm text-muted-foreground">Major, minor, all 7 modes, pentatonic, blues, whole tone, and diminished scales.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Diatonic Chords</h4>
                    <p className="text-sm text-muted-foreground">Automatically generated chord progressions for 7-note scales.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Interval Display</h4>
                    <p className="text-sm text-muted-foreground">See the interval structure (1, b3, 5, etc.) for music theory understanding.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Quick Presets</h4>
                    <p className="text-sm text-muted-foreground">One-click access to common scales like C Major, A Minor, and E Minor Pentatonic.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">What is the difference between major and minor scales?</h4>
                  <p className="text-sm text-muted-foreground">Major scales have a bright, happy sound with the pattern W-W-H-W-W-W-H. Natural minor scales sound sadder with the pattern W-H-W-W-H-W-W. The third note determines the mood.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What are modes in music?</h4>
                  <p className="text-sm text-muted-foreground">Modes are scales derived from the major scale by starting on different degrees. Dorian starts on the 2nd, Phrygian on the 3rd, Lydian on the 4th, Mixolydian on the 5th, and Locrian on the 7th degree.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">When should I use pentatonic scales?</h4>
                  <p className="text-sm text-muted-foreground">Pentatonic scales are perfect for beginners and improvisation. The minor pentatonic is essential for blues and rock guitar solos. They work over many chord progressions due to their simple, consonant structure.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What are diatonic chords?</h4>
                  <p className="text-sm text-muted-foreground">Diatonic chords are built from each note of a scale using only notes from that scale. In C Major, these are C, Dm, Em, F, G, Am, and Bdim. They form the basis of countless songs.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How do I practice scales effectively?</h4>
                  <p className="text-sm text-muted-foreground">Start slow with a metronome, play ascending and descending, practice in all 12 keys, and apply scales to real music by improvising over backing tracks in the same key.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
        </div>
      </div>
    </div>
  );
}
