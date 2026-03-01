"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FrequencytoMusicalNoteConverterPage() {
  const config = converterMappings["Frequency to Musical Note Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Frequency to Musical Note Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Frequency to Musical Note Converter</h1>
        <p className="text-muted-foreground">Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.</p>
      </div>
      <UnitConverterBase
        title="Frequency to Musical Note Converter"
        description="Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Musical Frequency</h2>
          <p className="text-muted-foreground mb-4">Musical notes correspond to specific frequencies measured in Hertz. Higher frequencies produce higher pitches. Lower frequencies produce lower pitches. The standard tuning reference is A4 at 440 Hz.</p>
          <p className="text-muted-foreground mb-4">Each octave doubles the frequency. A4 at 440 Hz becomes A5 at 880 Hz. A3 sits at 220 Hz. This doubling pattern applies to all notes across the musical spectrum.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Note Frequency Chart (Equal Temperament)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Note</th>
                  <th className="text-left py-3 px-4 font-medium">Octave 3</th>
                  <th className="text-left py-3 px-4 font-medium">Octave 4</th>
                  <th className="text-left py-3 px-4 font-medium">Octave 5</th>
                  <th className="text-left py-3 px-4 font-medium">Octave 6</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">C</td>
                  <td className="py-3 px-4">130.81 Hz</td>
                  <td className="py-3 px-4">261.63 Hz</td>
                  <td className="py-3 px-4">523.25 Hz</td>
                  <td className="py-3 px-4">1046.50 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">C#/Db</td>
                  <td className="py-3 px-4">138.59 Hz</td>
                  <td className="py-3 px-4">277.18 Hz</td>
                  <td className="py-3 px-4">554.37 Hz</td>
                  <td className="py-3 px-4">1108.73 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">D</td>
                  <td className="py-3 px-4">146.83 Hz</td>
                  <td className="py-3 px-4">293.66 Hz</td>
                  <td className="py-3 px-4">587.33 Hz</td>
                  <td className="py-3 px-4">1174.66 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">D#/Eb</td>
                  <td className="py-3 px-4">155.56 Hz</td>
                  <td className="py-3 px-4">311.13 Hz</td>
                  <td className="py-3 px-4">622.25 Hz</td>
                  <td className="py-3 px-4">1244.51 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">E</td>
                  <td className="py-3 px-4">164.81 Hz</td>
                  <td className="py-3 px-4">329.63 Hz</td>
                  <td className="py-3 px-4">659.25 Hz</td>
                  <td className="py-3 px-4">1318.51 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">F</td>
                  <td className="py-3 px-4">174.61 Hz</td>
                  <td className="py-3 px-4">349.23 Hz</td>
                  <td className="py-3 px-4">698.46 Hz</td>
                  <td className="py-3 px-4">1396.91 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">F#/Gb</td>
                  <td className="py-3 px-4">185.00 Hz</td>
                  <td className="py-3 px-4">369.99 Hz</td>
                  <td className="py-3 px-4">739.99 Hz</td>
                  <td className="py-3 px-4">1479.98 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">G</td>
                  <td className="py-3 px-4">196.00 Hz</td>
                  <td className="py-3 px-4">392.00 Hz</td>
                  <td className="py-3 px-4">783.99 Hz</td>
                  <td className="py-3 px-4">1567.98 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">G#/Ab</td>
                  <td className="py-3 px-4">207.65 Hz</td>
                  <td className="py-3 px-4">415.30 Hz</td>
                  <td className="py-3 px-4">830.61 Hz</td>
                  <td className="py-3 px-4">1661.22 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">A</td>
                  <td className="py-3 px-4">220.00 Hz</td>
                  <td className="py-3 px-4">440.00 Hz</td>
                  <td className="py-3 px-4">880.00 Hz</td>
                  <td className="py-3 px-4">1760.00 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">A#/Bb</td>
                  <td className="py-3 px-4">233.08 Hz</td>
                  <td className="py-3 px-4">466.16 Hz</td>
                  <td className="py-3 px-4">932.33 Hz</td>
                  <td className="py-3 px-4">1864.66 Hz</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">B</td>
                  <td className="py-3 px-4">246.94 Hz</td>
                  <td className="py-3 px-4">493.88 Hz</td>
                  <td className="py-3 px-4">987.77 Hz</td>
                  <td className="py-3 px-4">1975.53 Hz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequency to Note Conversion Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate musical note from frequency using equal temperament tuning.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>n = 12 × log2(frequency ÷ 440) + 69</div>
            <div>note = round(n) - 69 (semitones from A4)</div>
            <div>octave = floor((round(n) - 9) ÷ 12)</div>
            <div>frequency = 440 × 2^(n/12)</div>
          </div>
          <p className="text-muted-foreground mb-4">Where n = MIDI note number, A4 = MIDI note 69, frequency in Hz</p>
          <p className="text-muted-foreground mb-4">Example: Finding the note for 523.25 Hz</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            n = 12 × log2(523.25 ÷ 440) + 69 = 72
            MIDI note 72 = C5 (Middle C is C4 at 261.63 Hz)
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Standard Tuning References</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Standard</th>
                  <th className="text-left py-3 px-4 font-medium">A4 Frequency</th>
                  <th className="text-left py-3 px-4 font-medium">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Concert Pitch</td>
                  <td className="py-3 px-4">440 Hz</td>
                  <td className="py-3 px-4">International standard since 1955</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Baroque Pitch</td>
                  <td className="py-3 px-4">415 Hz</td>
                  <td className="py-3 px-4">Historical performance practice</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Classical Pitch</td>
                  <td className="py-3 px-4">430 Hz</td>
                  <td className="py-3 px-4">18th-19th century orchestras</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Orchestral Pitch</td>
                  <td className="py-3 px-4">442 Hz</td>
                  <td className="py-3 px-4">Modern European orchestras</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">High Pitch</td>
                  <td className="py-3 px-4">444 Hz</td>
                  <td className="py-3 px-4">Some modern orchestras</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Scientific Pitch</td>
                  <td className="py-3 px-4">432 Hz</td>
                  <td className="py-3 px-4">Alternative tuning movement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Guitar Standard Tuning Frequencies</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>6th string (E2): 82.41 Hz</li>
            <li>5th string (A2): 110.00 Hz</li>
            <li>4th string (D3): 146.83 Hz</li>
            <li>3rd string (G3): 196.00 Hz</li>
            <li>2nd string (B3): 246.94 Hz</li>
            <li>1st string (E4): 329.63 Hz</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is the frequency of middle C?</h3>
              <p className="text-muted-foreground">Middle C (C4) vibrates at 261.63 Hz in equal temperament tuning with A4 = 440 Hz. This note sits on the first ledger line below the treble clef staff.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why is A4 set to 440 Hz?</h3>
              <p className="text-muted-foreground">The International Organization for Standardization adopted 440 Hz as the concert pitch standard in 1955. This unified tuning across orchestras and instrument manufacturers worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the highest note humans can hear?</h3>
              <p className="text-muted-foreground">Young adults can hear up to 20,000 Hz (20 kHz). The highest piano note (C8) reaches 4186 Hz. Hearing range decreases with age, especially for high frequencies.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I tune my instrument using frequency?</h3>
              <p className="text-muted-foreground">Use a tuner app or device that displays frequency. Play each string or note and adjust until the displayed frequency matches the target. Fine-tune by listening for beats to disappear.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
