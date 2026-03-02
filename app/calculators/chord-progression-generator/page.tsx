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
      </div>
    </div>
  );
}
