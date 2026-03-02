"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Scale Theory Basics
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Major scale:</strong> The foundation of Western music
                  </li>
                  <li>
                    <strong>Modes:</strong> Scales derived from major scale starting on different degrees
                  </li>
                  <li>
                    <strong>Pentatonic:</strong> 5-note scales, very versatile
                  </li>
                  <li>
                    <strong>Blues scale:</strong> Pentatonic with added &quot;blue&quot; note
                  </li>
                </ul>
                <p>
                  <strong>Practice tip:</strong> Play scales in different keys to internalize
                  the sound and pattern. Start slow and use a metronome.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
