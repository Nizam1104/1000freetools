"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ApparentMagnitudeConverterPage() {
  const config = converterMappings["Apparent Magnitude Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Apparent Magnitude Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Apparent Magnitude Converter</h1>
        <p className="text-muted-foreground">Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers.</p>
      </div>
      <UnitConverterBase
        title="Apparent Magnitude Converter"
        description="Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Stellar Magnitude</h2>
          <p className="text-muted-foreground mb-4">
            Apparent magnitude measures how bright a celestial object appears from Earth. The scale is logarithmic and inverted: brighter objects have lower (or negative) magnitudes. A difference of 5 magnitudes equals a brightness ratio of exactly 100.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Magnitude Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Brightness Ratio = 100^(Δm/5) = 2.512^Δm</p>
            <p>m - M = 5 log₁₀(d) - 5 (Distance Modulus)</p>
            <p>M = m - 5 log₁₀(d/10)</p>
            <p>L/L☉ = 10^((M☉ - M)/2.5)</p>
          </div>

          <p className="text-muted-foreground">
            Apparent magnitude (m) is observed brightness. Absolute magnitude (M) is brightness at 10 parsecs. Distance (d) is in parsecs. Each magnitude step equals a brightness factor of 2.512 (the fifth root of 100).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Star Magnitude Reference Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Object</th>
                  <th className="border border-border p-3 text-left">Apparent Mag</th>
                  <th className="border border-border p-3 text-left">Absolute Mag</th>
                  <th className="border border-border p-3 text-left">Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Sun</td>
                  <td className="border border-border p-3">-26.74</td>
                  <td className="border border-border p-3">+4.83</td>
                  <td className="border border-border p-3">1 AU</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Full Moon</td>
                  <td className="border border-border p-3">-12.74</td>
                  <td className="border border-border p-3">-</td>
                  <td className="border border-border p-3">384,400 km</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Venus (max)</td>
                  <td className="border border-border p-3">-4.89</td>
                  <td className="border border-border p-3">-</td>
                  <td className="border border-border p-3">varies</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Sirius</td>
                  <td className="border border-border p-3">-1.46</td>
                  <td className="border border-border p-3">+1.42</td>
                  <td className="border border-border p-3">8.6 ly</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Vega</td>
                  <td className="border border-border p-3">+0.03</td>
                  <td className="border border-border p-3">+0.58</td>
                  <td className="border border-border p-3">25 ly</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Betelgeuse</td>
                  <td className="border border-border p-3">+0.42</td>
                  <td className="border border-border p-3">-5.85</td>
                  <td className="border border-border p-3">548 ly</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Andromeda Galaxy</td>
                  <td className="border border-border p-3">+3.44</td>
                  <td className="border border-border p-3">-</td>
                  <td className="border border-border p-3">2.5 Mly</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Naked Eye Limit</td>
                  <td className="border border-border p-3">+6.0</td>
                  <td className="border border-border p-3">-</td>
                  <td className="border border-border p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnitude and Brightness</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Brightness Ratio Examples</p>
              <p className="text-muted-foreground">
                1 magnitude difference: 2.512× brighter<br />
                2 magnitude difference: 6.31× brighter<br />
                3 magnitude difference: 15.85× brighter<br />
                5 magnitude difference: 100× brighter
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Magnitude Scale Ranges</p>
              <p className="text-muted-foreground">
                Negative magnitudes: Very bright (Sun, Moon, planets)<br />
                0 to +3: Bright stars<br />
                +3 to +6: Naked eye visible<br />
                +6 to +30: Telescope required
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Distance Modulus</p>
              <p className="text-muted-foreground">
                m - M = 5 log₁₀(d) - 5<br />
                At 10 pc: m = M (definition)<br />
                At 100 pc: m - M = 5<br />
                At 1000 pc: m - M = 10
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Luminosity Calculation</p>
              <p className="text-muted-foreground">
                L/L☉ = 10^((4.83 - M)/2.5)<br />
                M = 4.83: L = 1 L☉ (Sun)<br />
                M = -0.17: L = 100 L☉<br />
                M = -5.17: L = 10,000 L☉
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnitude Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Sirius Distance Modulus</p>
              <p className="text-muted-foreground">
                Apparent magnitude (m): -1.46<br />
                Absolute magnitude (M): +1.42<br />
                Distance modulus: -1.46 - 1.42 = -2.88<br />
                Distance: 10^((-2.88+5)/5) = 2.64 pc = 8.6 ly
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Betelgeuse Luminosity</p>
              <p className="text-muted-foreground">
                Absolute magnitude (M): -5.85<br />
                Sun absolute magnitude: +4.83<br />
                Difference: 4.83 - (-5.85) = 10.68<br />
                Luminosity: 10^(10.68/2.5) = 126,000 L☉
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Brightness Comparison</p>
              <p className="text-muted-foreground">
                Sirius: m = -1.46<br />
                Vega: m = +0.03<br />
                Difference: 1.49 magnitudes<br />
                Brightness ratio: 2.512^1.49 = 3.94×
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Absolute Magnitude from Distance</p>
              <p className="text-muted-foreground">
                Star at 100 pc, m = +10<br />
                M = m - 5 log₁₀(d/10)<br />
                M = 10 - 5 log₁₀(100/10)<br />
                M = 10 - 5(1) = +5
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Telescope Magnitude Limits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Aperture and Limiting Magnitude</p>
              <p className="text-muted-foreground">
                Naked eye (7mm): +6.0<br />
                Binoculars 50mm: +10.5<br />
                Telescope 150mm: +13.5<br />
                Telescope 300mm: +15.0
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Professional Observatories</p>
              <p className="text-muted-foreground">
                1-meter telescope: +18.5<br />
                4-meter telescope: +21.5<br />
                10-meter telescope: +24.0<br />
                Hubble Space Telescope: +31.0
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Variable Star Ranges</p>
              <p className="text-muted-foreground">
                Mira: +2 to +10 (8 mag range)<br />
                Algol: +2.1 to +3.4<br />
                Delta Cephei: +3.5 to +4.4<br />
                RR Lyrae: +7 to +8
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Planetary Magnitudes</p>
              <p className="text-muted-foreground">
                Venus: -3.8 to -4.9<br />
                Jupiter: -1.6 to -2.9<br />
                Saturn: +0.5 to -0.5<br />
                Mars: +1.8 to -2.9
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why is the magnitude scale backwards?</h3>
              <p className="text-muted-foreground">
                The system dates to ancient Greece where brightest stars were first magnitude. Fainter stars received higher numbers. The modern scale preserved this convention while making it mathematical and precise.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between apparent and absolute magnitude?</h3>
              <p className="text-muted-foreground">
                Apparent magnitude is how bright a star appears from Earth. Absolute magnitude is how bright it would appear at 10 parsecs (32.6 light-years). Absolute magnitude indicates true luminosity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much brighter is a magnitude 1 star than magnitude 6?</h3>
              <p className="text-muted-foreground">
                A 5 magnitude difference equals exactly 100 times brightness ratio. A magnitude 1 star appears 100 times brighter than a magnitude 6 star to the human eye.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can magnitude be negative?</h3>
              <p className="text-muted-foreground">
                Yes, very bright objects have negative magnitudes. The Sun is -26.74. Full Moon is -12.74. Venus reaches -4.89. Sirius, the brightest star, is -1.46.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
