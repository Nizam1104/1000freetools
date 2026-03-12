"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LuminousIntensityPage() {
  const config = converterMappings["Luminous Intensity"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Luminous Intensity"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Luminous Intensity Converter</h1>
        <p className="text-muted-foreground">Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering.</p>
      </div>
      <UnitConverterBase
        title="Luminous Intensity Converter"
        description="Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Luminous Intensity</h2>
          <p className="text-muted-foreground mb-4">
            Luminous intensity measures the power of light emitted by a source in a specific direction. You express it in candelas (cd), one of the seven SI base units. One candela equals the luminous intensity of a standard candle.
          </p>
          <p className="text-muted-foreground mb-4">
            Luminous intensity differs from luminous flux. Flux measures total light output in all directions. Intensity measures light in a particular direction. LEDs and spotlights specify intensity for beam characterization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Luminous Intensity Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = dΦ / dΩ</p>
            <p className="text-muted-foreground text-sm">
              Definition: Intensity equals luminous flux per unit solid angle. Units are candelas (cd) or lumens per steradian.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = I / d²</p>
            <p className="text-muted-foreground text-sm">
              Inverse square law: Illuminance equals intensity divided by distance squared for point sources.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Φ = I × Ω</p>
            <p className="text-muted-foreground text-sm">
              Total flux: For uniform emission over solid angle, flux equals intensity times solid angle.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: An LED producing 0.1 lumens into a 0.1 steradian beam has I = 0.1 / 0.1 = 1 candela intensity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Luminous Intensity Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Candela (cd)</th>
                  <th className="border border-border p-2 text-left">Millicandela (mcd)</th>
                  <th className="border border-border p-2 text-left">Candlepower (cp)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Light Source Intensity Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Light Source</th>
                  <th className="border border-border p-2 text-left">Intensity (cd)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Candle Flame</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">LED Indicator</td>
                  <td className="border border-border p-2">0.1-10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">High-Brightness LED</td>
                  <td className="border border-border p-2">10-100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Car Headlight (low beam)</td>
                  <td className="border border-border p-2">500-1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Car Headlight (high beam)</td>
                  <td className="border border-border p-2">2,000-5,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Searchlight</td>
                  <td className="border border-border p-2">100,000-1,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">LED Selection</h3>
              <p className="text-muted-foreground text-sm">
                LED datasheets specify intensity in millicandelas. Indicator LEDs range 100-5,000 mcd. High-power LEDs reach 10,000+ mcd. Beam angle affects perceived brightness.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Automotive Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Regulations specify minimum and maximum intensity for headlights, taillights, and turn signals. ECE and SAE standards define photometric requirements for vehicle lighting.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Aviation Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Aircraft position lights have specified intensity and color. Runway edge lights use intensity settings for different visibility conditions. Obstruction lights mark tall structures.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Signal and Warning Lights</h3>
              <p className="text-muted-foreground text-sm">
                Emergency vehicles use high-intensity beacons. Intensity requirements ensure visibility in daylight. Flash patterns and color complement intensity for recognition.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between candela and lumens?</h3>
              <p className="text-muted-foreground text-sm">
                Candela measures intensity in one direction. Lumens measure total output in all directions. A focused spotlight has high candela but moderate lumens.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is candlepower?</h3>
              <p className="text-muted-foreground text-sm">
                Candlepower is an older term for luminous intensity. One candlepower equals one candela. The term persists in some industries but candela is the official SI unit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do LEDs specify millicandela?</h3>
              <p className="text-muted-foreground text-sm">
                Most indicator LEDs produce less than one candela. Millicandela provides convenient numbers without decimals. A 5,000 mcd LED equals 5 cd.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does beam angle affect intensity?</h3>
              <p className="text-muted-foreground text-sm">
                Narrower beam angles concentrate flux into smaller solid angles, increasing intensity. Same lumens with half the beam angle produces roughly four times the peak intensity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
