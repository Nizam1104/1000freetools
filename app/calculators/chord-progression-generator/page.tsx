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

interface ChordProgression {
  name: string;
  chords: string[];
  romanNumerals: string[];
  mood: string;
  genre: string[];
  example: string;
}

const chordProgressions: Record<string, ChordProgression[]> = {
  major: [
    {
      name: "I-V-vi-IV (Pop Progression)",
      chords: ["C", "G", "Am", "F"],
      romanNumerals: ["I", "V", "vi", "IV"],
      mood: "Uplifting, emotional",
      genre: ["Pop", "Rock", "Country"],
      example: "Let It Be, With Or Without You, Don't Stop Believin'",
    },
    {
      name: "vi-IV-I-V (Sensitive)",
      chords: ["Am", "F", "C", "G"],
      romanNumerals: ["vi", "IV", "I", "V"],
      mood: "Melancholic, hopeful",
      genre: ["Pop", "Ballad"],
      example: "Someone Like You, Zombie",
    },
    {
      name: "I-vi-IV-V (50s Progression)",
      chords: ["C", "Am", "F", "G"],
      romanNumerals: ["I", "vi", "IV", "V"],
      mood: "Nostalgic, classic",
      genre: ["Doo-wop", "Oldies", "Pop"],
      example: "Stand By Me, Earth Angel",
    },
    {
      name: "I-IV-V (Blues)",
      chords: ["C", "F", "G"],
      romanNumerals: ["I", "IV", "V"],
      mood: "Classic, driving",
      genre: ["Blues", "Rock", "Country"],
      example: "La Bamba, Twist and Shout",
    },
    {
      name: "I-V-IV-IV (Anthemic)",
      chords: ["C", "G", "F", "F"],
      romanNumerals: ["I", "V", "IV", "IV"],
      mood: "Triumphant, powerful",
      genre: ["Rock", "Alternative"],
      example: "Hey Soul Sister, Home",
    },
  ],
  minor: [
    {
      name: "i-VI-III-VII (Epic)",
      chords: ["Am", "F", "C", "G"],
      romanNumerals: ["i", "VI", "III", "VII"],
      mood: "Epic, dramatic",
      genre: ["Pop", "Electronic", "Cinematic"],
      example: "The Nights, Faded",
    },
    {
      name: "i-VII-VI-VII (Andalusian)",
      chords: ["Am", "G", "F", "G"],
      romanNumerals: ["i", "VII", "VI", "VII"],
      mood: "Flamenco, exotic",
      genre: ["Flamenco", "Latin", "Metal"],
      example: "Hit the Road Jack, Sultans of Swing",
    },
    {
      name: "i-iv-V (Minor Blues)",
      chords: ["Am", "Dm", "E"],
      romanNumerals: ["i", "iv", "V"],
      mood: "Bluesy, soulful",
      genre: ["Blues", "Jazz", "R&B"],
      example: "I Put a Spell on You",
    },
    {
      name: "vi-iii-I-IV (Emotional)",
      chords: ["Am", "Em", "C", "F"],
      romanNumerals: ["vi", "iii", "I", "IV"],
      mood: "Introspective, emotional",
      genre: ["Indie", "Alternative"],
      example: "No Woman No Cry (verse)",
    },
  ],
  jazz: [
    {
      name: "ii-V-I (Jazz Cadence)",
      chords: ["Dm7", "G7", "Cmaj7"],
      romanNumerals: ["ii7", "V7", "Imaj7"],
      mood: "Sophisticated, resolved",
      genre: ["Jazz", "Bebop"],
      example: "Take Five, countless jazz standards",
    },
    {
      name: "I-vi-ii-V (Rhythm Changes)",
      chords: ["Cmaj7", "Am7", "Dm7", "G7"],
      romanNumerals: ["Imaj7", "vi7", "ii7", "V7"],
      mood: "Classic jazz",
      genre: ["Jazz", "Swing"],
      example: "I Got Rhythm",
    },
  ],
};

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function ChordProgressionGeneratorPage() {
  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedScale, setSelectedScale] = useState<string>("major");
  const [selectedMood, setSelectedMood] = useState<string>("any");
  const [result, setResult] = useState<ChordProgression[] | null>(null);

  const calculate = () => {
    let progressions = chordProgressions[selectedScale] || [];

    if (selectedMood !== "any") {
      // Filter by mood keyword match
      progressions = progressions.filter((p) =>
        p.mood.toLowerCase().includes(selectedMood.toLowerCase())
      );
    }

    // Transpose chords to selected key
    const transposedProgressions = progressions.map((prog) => {
      const keyIndex = keys.indexOf("C");
      const targetIndex = keys.indexOf(selectedKey);
      const semitones = targetIndex - keyIndex;

      const transposedChords = prog.romanNumerals.map((_, i) => {
        // This is simplified - real transposition would need full chord knowledge
        return transposeChord(prog.chords[i], semitones);
      });

      return {
        ...prog,
        chords: transposedChords,
      };
    });

    setResult(transposedProgressions);
  };

  const transposeChord = (chord: string, semitones: number): string => {
    // Extract root note and chord quality
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;

    const [, root, quality] = match;
    const rootIndex = keys.indexOf(root);
    if (rootIndex === -1) return chord;

    const newIndex = ((rootIndex + semitones) % 12 + 12) % 12;
    return keys[newIndex] + quality;
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Chord Progression Generator – Create Chord Progressions in Any Key & Scale
          </h1>
          <p className="text-muted-foreground">
            Find the perfect chord progression for your song with our Chord Progression Generator.
            Select your key, scale, and mood to generate common and creative chord sequences —
            ideal for songwriters and music producers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="key">Key</Label>
                  <Select value={selectedKey} onValueChange={setSelectedKey}>
                    <SelectTrigger id="key">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {keys.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="scale">Scale</Label>
                  <Select value={selectedScale} onValueChange={setSelectedScale}>
                    <SelectTrigger id="scale">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="mood">Mood (optional)</Label>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Any mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="uplifting">Uplifting</SelectItem>
                    <SelectItem value="emotional">Emotional</SelectItem>
                    <SelectItem value="melancholic">Melancholic</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="sophisticated">Sophisticated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Start Progressions:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { setSelectedScale("major"); setSelectedKey("C"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    🎵 Pop (I-V-vi-IV)
                  </button>
                  <button
                    onClick={() => { setSelectedScale("minor"); setSelectedKey("Am"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    🎸 Epic Minor
                  </button>
                  <button
                    onClick={() => { setSelectedScale("jazz"); setSelectedKey("C"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    🎷 Jazz ii-V-I
                  </button>
                  <button
                    onClick={() => { setSelectedScale("major"); setSelectedKey("G"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    🎹 50s Progression
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Generate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Chord Progressions</h3>
              {result && result.length > 0 ? (
                <div className="space-y-4">
                  {result.map((prog, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{prog.name}</h4>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {prog.genre[0]}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {prog.chords.map((chord, j) => (
                          <div key={j} className="px-3 py-2 bg-primary text-primary-foreground rounded font-mono font-bold">
                            {chord}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{prog.romanNumerals.join(" - ")}</span>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Mood: </span>
                        <span>{prog.mood}</span>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Examples: </span>
                        <span className="italic">{prog.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : result ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No progressions match your criteria. Try different options.</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select your preferences and click Generate to see progressions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Chord Progressions
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Chord progressions are the foundation of songwriting:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Roman numerals:</strong> Show chord function regardless of key
                  </li>
                  <li>
                    <strong>Uppercase (I, IV, V):</strong> Major chords
                  </li>
                  <li>
                    <strong>Lowercase (i, iv, v):</strong> Minor chords
                  </li>
                  <li>
                    <strong>° (diminished):</strong> Diminished chords (vii°)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> The I-V-vi-IV progression is used in thousands of
                  hit songs across all genres. Try it in different keys and tempos!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Chord Progression Generator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your key and scale</p>
                    <p>Choose from any of the 12 musical keys and select major, minor, or jazz scale. The progressions will be transposed to your selected key automatically.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Optionally filter by mood</p>
                    <p>Select a mood like uplifting, emotional, or epic to narrow down progressions that match your song&apos;s vibe. Leave as &quot;Any&quot; to see all options.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Generate and explore results</p>
                    <p>Each progression shows chord names, Roman numerals, mood description, genre tags, and real song examples. Use these as starting points for your own songs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Chord Progressions Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Progression</th>
                      <th className="text-left py-3 px-2 font-semibold">Roman Numerals</th>
                      <th className="text-left py-3 px-2 font-semibold">Key of C</th>
                      <th className="text-left py-3 px-2 font-semibold">Common Genres</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">I-V-vi-IV</td>
                      <td className="py-3 px-2">I - V - vi - IV</td>
                      <td className="py-3 px-2">C - G - Am - F</td>
                      <td className="py-3 px-2">Pop, Rock, Country</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">vi-IV-I-V</td>
                      <td className="py-3 px-2">vi - IV - I - V</td>
                      <td className="py-3 px-2">Am - F - C - G</td>
                      <td className="py-3 px-2">Pop, Ballad</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">I-vi-IV-V</td>
                      <td className="py-3 px-2">I - vi - IV - V</td>
                      <td className="py-3 px-2">C - Am - F - G</td>
                      <td className="py-3 px-2">Doo-wop, Oldies</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">ii-V-I</td>
                      <td className="py-3 px-2">ii7 - V7 - Imaj7</td>
                      <td className="py-3 px-2">Dm7 - G7 - Cmaj7</td>
                      <td className="py-3 px-2">Jazz, Bebop</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">i-VI-III-VII</td>
                      <td className="py-3 px-2">i - VI - III - VII</td>
                      <td className="py-3 px-2">Am - F - C - G</td>
                      <td className="py-3 px-2">Pop, Electronic</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">I-IV-V</td>
                      <td className="py-3 px-2">I - IV - V</td>
                      <td className="py-3 px-2">C - F - G</td>
                      <td className="py-3 px-2">Blues, Rock, Country</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These progressions work in any key. The Roman numerals indicate chord function, which stays the same regardless of key.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Roman Numeral Notation
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Use Roman Numerals</h4>
                  <p>
                    Roman numerals show chord function independent of key. A I-V-vi-IV progression works the same way in C major (C-G-Am-F) as in G major (G-D-Em-C). This makes it easy to transpose songs and understand the underlying harmonic structure across different keys.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Uppercase vs Lowercase Numerals</h4>
                  <p>
                    Uppercase numerals (I, IV, V) represent major chords. Lowercase numerals (i, iv, v) represent minor chords. In major keys, I, IV, and V are major while ii, iii, and vi are minor. The vii chord is diminished (written as vii with a degree symbol).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Chord Functions in Major Keys</h4>
                  <p>
                    The I chord (tonic) feels like home, the resting point. The V chord (dominant) creates tension that wants to resolve to I. The IV chord (subdominant) moves away from tonic. The vi chord (relative minor) shares notes with I and provides emotional contrast. Understanding these functions helps you write progressions that tell a musical story.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Songwriting Tips for Using Progressions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Vary rhythm and strumming patterns</p>
                    <p>The same four chords can sound completely different with changed rhythms. Try arpeggios for verses and strumming for choruses. Syncopation adds energy and interest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add chord extensions and inversions</p>
                    <p>Turn basic triads into seventh chords, add9, or sus4 chords for color. Use inversions to create smooth bass movement. A C/E (C major with E in bass) flows nicely into F major.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use different progressions for sections</p>
                    <p>Verses often use more complex or ambiguous progressions. Choruses typically feature stronger, more resolved progressions with clear tonic emphasis. Bridges may modulate or use unexpected chords.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Study songs you love</p>
                    <p>Learn the chord progressions from your favorite songs. Notice patterns across genres. The I-V-vi-IV progression appears in thousands of hits from &quot;Let It Be&quot; to &quot;Don&apos;t Stop Believin&apos;.&quot; There&apos;s a reason these progressions work.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is the most popular chord progression?</h4>
                  <p>
                    The I-V-vi-IV progression (called the &quot;pop progression&quot; or &quot;axis progression&quot;) appears in countless hit songs across decades and genres. Examples include &quot;Let It Be,&quot; &quot;With or Without You,&quot; &quot;Don&apos;t Stop Believin&apos;,&quot; and &quot;Someone Like You.&quot; Its popularity comes from its emotional balance and strong resolution.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I transpose a progression to a different key?</h4>
                  <p>
                    Keep the Roman numerals the same and apply them to the new key. For example, I-V-vi-IV in C is C-G-Am-F. In G major, it becomes G-D-Em-C. Count the scale degrees: I is the 1st note, V is the 5th, vi is the 6th (minor), IV is the 4th.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I use minor progressions in major keys?</h4>
                  <p>
                    Yes. Modal interchange (borrowing chords from parallel modes) is common in songwriting. A major key song might use the minor iv chord for emotional effect. The Beatles&apos; &quot;In My Life&quot; uses a borrowed minor chord. Experiment with mixing major and minor sounds.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What makes a chord progression sound sad or happy?</h4>
                  <p>
                    Major progressions tend to sound brighter, minor progressions darker. But context matters. A vi-IV-I-V progression uses the same chords as I-V-vi-IV but starts on the minor chord, creating a more melancholic feel. Tempo, rhythm, and melody also shape emotional perception.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How many chords should a progression have?</h4>
                  <p>
                    Most pop and rock songs use 3-4 chords per section. Two-chord vamps work for some styles. Jazz progressions often have more chords with faster changes. Start simple. You can always add complexity later. Many classic songs use the same 4 chords throughout.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
