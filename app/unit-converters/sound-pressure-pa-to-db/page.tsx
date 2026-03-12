"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SoundPressurePatodBPage() {
  const config = converterMappings["Sound Pressure (Pa to dB)"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Sound Pressure (Pa to dB)"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Sound Pressure Converter — Pa to dB</h1>
        <p className="text-muted-foreground">Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement.</p>
      </div>
      <UnitConverterBase
        title="Sound Pressure Converter — Pa to dB"
        description="Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Sound Pressure</h2>
          <p className="text-muted-foreground mb-4">
            Sound pressure measures the deviation from ambient atmospheric pressure caused by sound waves. As sound propagates through air, it creates alternating regions of compression (higher pressure) and rarefaction (lower pressure). Sound pressure level (SPL) quantifies these variations on a logarithmic scale in decibels.
          </p>
          <p className="text-muted-foreground">
            The SI unit for sound pressure is the pascal (Pa). Human hearing spans an enormous range: from 20 micropascals (threshold of hearing) to over 100 pascals (threshold of pain). The decibel scale compresses this range into manageable numbers from 0 dB to 140 dB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sound Pressure Level Formula</h2>
          <p className="text-muted-foreground mb-4">
            Convert sound pressure in pascals to decibels SPL:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Lp = 20 × log₁₀(p / p₀)</p>
            <p className="text-sm text-muted-foreground mt-2">where Lp = sound pressure level (dB SPL), p = measured sound pressure (Pa), p₀ = reference pressure (20 μPa)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Convert from decibels to pascals:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">p = p₀ × 10^(Lp / 20)</p>
            <p className="text-sm text-muted-foreground mt-2">where p₀ = 20 × 10⁻⁶ Pa = 20 μPa</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Convert 1 Pa to dB SPL:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Lp = 20 × log₁₀(1 / 20×10⁻⁶) = 20 × log₁₀(50,000) = 20 × 4.699 = 94 dB SPL</p>
          </div>
          <p className="text-muted-foreground">
            Example: Convert 100 dB SPL to pascals:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">p = 20×10⁻⁶ × 10^(100/20) = 20×10⁻⁶ × 10⁵ = 2 Pa</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sound Pressure Reference Levels</h2>
          <p className="text-muted-foreground mb-4">
            Common sound pressure levels in everyday environments:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Sound Source</th>
                  <th className="border border-border p-3 text-left">dB SPL</th>
                  <th className="border border-border p-3 text-left">Sound Pressure (Pa)</th>
                  <th className="border border-border p-3 text-left">Sound Pressure (μPa)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Threshold of hearing (0 phon)</td>
                  <td className="border border-border p-3">0</td>
                  <td className="border border-border p-3">0.000020</td>
                  <td className="border border-border p-3">20</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Rustling leaves</td>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">0.000063</td>
                  <td className="border border-border p-3">63</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Normal breathing</td>
                  <td className="border border-border p-3">20</td>
                  <td className="border border-border p-3">0.00020</td>
                  <td className="border border-border p-3">200</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Whisper (1 m distance)</td>
                  <td className="border border-border p-3">30</td>
                  <td className="border border-border p-3">0.00063</td>
                  <td className="border border-border p-3">632</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Quiet library</td>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">0.0020</td>
                  <td className="border border-border p-3">2,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Moderate rainfall</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">0.0063</td>
                  <td className="border border-border p-3">6,325</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Normal conversation (1 m)</td>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">0.020</td>
                  <td className="border border-border p-3">20,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Vacuum cleaner (3 m)</td>
                  <td className="border border-border p-3">70</td>
                  <td className="border border-border p-3">0.063</td>
                  <td className="border border-border p-3">63,246</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Busy street traffic</td>
                  <td className="border border-border p-3">80</td>
                  <td className="border border-border p-3">0.20</td>
                  <td className="border border-border p-3">200,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Subway train (inside)</td>
                  <td className="border border-border p-3">90</td>
                  <td className="border border-border p-3">0.63</td>
                  <td className="border border-border p-3">632,456</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Motorcycle (5 m)</td>
                  <td className="border border-border p-3">95</td>
                  <td className="border border-border p-3">1.12</td>
                  <td className="border border-border p-3">1,122,018</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Rock concert (front row)</td>
                  <td className="border border-border p-3">110</td>
                  <td className="border border-border p-3">6.32</td>
                  <td className="border border-border p-3">6,324,555</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jackhammer (1 m)</td>
                  <td className="border border-border p-3">120</td>
                  <td className="border border-border p-3">20.0</td>
                  <td className="border border-border p-3">20,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Jet engine (30 m)</td>
                  <td className="border border-border p-3">130</td>
                  <td className="border border-border p-3">63.2</td>
                  <td className="border border-border p-3">63,245,553</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Threshold of pain</td>
                  <td className="border border-border p-3">140</td>
                  <td className="border border-border p-3">200.0</td>
                  <td className="border border-border p-3">200,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Gunshot (1 m)</td>
                  <td className="border border-border p-3">150 to 170</td>
                  <td className="border border-border p-3">632 to 6,320</td>
                  <td className="border border-border p-3">632M to 6.3B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Decibel Arithmetic</h2>
          <p className="text-muted-foreground mb-4">
            Adding sound sources requires logarithmic addition, not simple arithmetic:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Ltotal = 10 × log₁₀(10^(L1/10) + 10^(L2/10) + ...)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Two identical 80 dB sources:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Ltotal = 10 × log₁₀(10⁸ + 10⁸) = 10 × log₁₀(2 × 10⁸) = 83 dB</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Key rules for combining sound levels:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Two equal sources: add 3 dB (80 + 80 = 83 dB)</li>
            <li>Ten equal sources: add 10 dB (80 × 10 = 90 dB)</li>
            <li>Sources differing by 10 dB or more: the louder dominates (80 + 70 ≈ 80.4 dB)</li>
            <li>Doubling distance from point source: subtract 6 dB</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Distance and Sound Level</h2>
          <p className="text-muted-foreground mb-4">
            Sound pressure level decreases with distance from a point source following the inverse square law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L₂ = L₁ - 20 × log₁₀(r₂ / r₁)</p>
            <p className="text-sm text-muted-foreground mt-2">where L₁ = level at distance r₁, L₂ = level at distance r₂</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Sound level is 100 dB at 1 m. What is the level at 10 m?
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L₂ = 100 - 20 × log₁₀(10 / 1) = 100 - 20 = 80 dB</p>
          </div>
          <p className="text-muted-foreground">
            Doubling distance reduces level by 6 dB. Ten times the distance reduces level by 20 dB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">A-Weighting and dBA</h2>
          <p className="text-muted-foreground mb-4">
            A-weighting adjusts sound measurements to match human hearing sensitivity. The human ear is less sensitive to low and very high frequencies. A-weighted decibels (dBA) approximate how loud sounds seem to humans.
          </p>
          <p className="text-muted-foreground mb-4">
            A-weighting corrections by frequency:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Frequency (Hz)</th>
                  <th className="border border-border p-3 text-left">A-weighting Correction (dB)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">20</td>
                  <td className="border border-border p-3">-50.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">31.5</td>
                  <td className="border border-border p-3">-39.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">63</td>
                  <td className="border border-border p-3">-26.2</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">125</td>
                  <td className="border border-border p-3">-16.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">250</td>
                  <td className="border border-border p-3">-8.6</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">500</td>
                  <td className="border border-border p-3">-3.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1000</td>
                  <td className="border border-border p-3">0.0 (reference)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">2000</td>
                  <td className="border border-border p-3">+1.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4000</td>
                  <td className="border border-border p-3">+1.0</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">8000</td>
                  <td className="border border-border p-3">-1.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">16000</td>
                  <td className="border border-border p-3">-6.6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Noise Exposure Limits</h2>
          <p className="text-muted-foreground mb-4">
            Occupational safety regulations limit noise exposure to prevent hearing loss:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Sound Level (dBA)</th>
                  <th className="border border-border p-3 text-left">Max Daily Exposure (OSHA)</th>
                  <th className="border border-border p-3 text-left">Max Daily Exposure (NIOSH)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">80</td>
                  <td className="border border-border p-3">No limit</td>
                  <td className="border border-border p-3">25 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">85</td>
                  <td className="border border-border p-3">16 hours</td>
                  <td className="border border-border p-3">8 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">88</td>
                  <td className="border border-border p-3">12 hours</td>
                  <td className="border border-border p-3">4 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">90</td>
                  <td className="border border-border p-3">8 hours</td>
                  <td className="border border-border p-3">2 hours 30 min</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">95</td>
                  <td className="border border-border p-3">4 hours</td>
                  <td className="border border-border p-3">47 minutes</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">100</td>
                  <td className="border border-border p-3">2 hours</td>
                  <td className="border border-border p-3">15 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">105</td>
                  <td className="border border-border p-3">1 hour</td>
                  <td className="border border-border p-3">5 minutes</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">110</td>
                  <td className="border border-border p-3">30 minutes</td>
                  <td className="border border-border p-3">2 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">115</td>
                  <td className="border border-border p-3">15 minutes</td>
                  <td className="border border-border p-3">Less than 1 minute</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            NIOSH recommends a 3 dB exchange rate (every 3 dB increase halves safe exposure time). OSHA uses a 5 dB exchange rate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between sound pressure units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>0 dB SPL = 20 μPa = 0.00002 Pa (threshold of hearing)</li>
            <li>20 dB SPL = 200 μPa = 0.0002 Pa</li>
            <li>40 dB SPL = 2,000 μPa = 0.002 Pa</li>
            <li>60 dB SPL = 20,000 μPa = 0.02 Pa (conversation)</li>
            <li>80 dB SPL = 200,000 μPa = 0.2 Pa (traffic)</li>
            <li>94 dB SPL = 1 Pa (reference level)</li>
            <li>100 dB SPL = 2 Pa</li>
            <li>120 dB SPL = 20 Pa (threshold of discomfort)</li>
            <li>140 dB SPL = 200 Pa (threshold of pain)</li>
            <li>1 Pa = 94 dB SPL</li>
            <li>1 μPa = -26 dB SPL</li>
            <li>1 bar = 100,000 Pa = 194 dB SPL</li>
            <li>1 atm = 101,325 Pa = 194.1 dB SPL</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Sound Pressure Measurement</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Noise pollution monitoring and compliance</li>
            <li>Occupational hearing conservation programs</li>
            <li>Audio equipment testing and calibration</li>
            <li>Room acoustics and reverberation analysis</li>
            <li>Environmental impact assessments</li>
            <li>Product noise labeling</li>
            <li>Hearing aid fitting and verification</li>
            <li>Concert and event sound level management</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is 20 micropascals the reference for dB SPL?</h3>
            <p className="text-muted-foreground">
              Twenty micropascals approximates the threshold of human hearing at 1 kHz for young, healthy ears. This reference was chosen in the 1930s based on psychoacoustic research. Using this reference, 0 dB SPL represents the quietest sound humans can detect, making the scale intuitive for hearing-related applications.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between dB and dBA?</h3>
            <p className="text-muted-foreground">
              dB SPL measures actual sound pressure without frequency weighting. dBA applies A-weighting that reduces low and high frequencies to match human hearing sensitivity. Environmental noise regulations typically specify dBA limits. For pure tones or low-frequency noise, dB and dBA readings can differ significantly.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How loud is too loud?</h3>
            <p className="text-muted-foreground">
              Sounds above 85 dBA can cause hearing damage with prolonged exposure. The NIOSH recommends limiting exposure to 85 dBA for 8 hours, with exposure time halving for every 3 dB increase. Sounds above 120 dBA can cause immediate damage. Pain occurs around 140 dB. Use hearing protection when noise levels exceed 85 dBA.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does doubling sound pressure add 6 dB?</h3>
            <p className="text-muted-foreground">
              The decibel formula uses 20 times the logarithm of the pressure ratio. When pressure doubles, log₁₀(2) = 0.301, and 20 × 0.301 = 6.02 dB. This relationship comes from the fact that sound power is proportional to pressure squared, and power ratios use 10 × log while pressure ratios use 20 × log.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
