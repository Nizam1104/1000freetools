"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LuminancePage() {
  const config = converterMappings["Luminance"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Luminance"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Luminance Converter</h1>
        <p className="text-muted-foreground">Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design.</p>
      </div>
      <UnitConverterBase
        title="Luminance Converter"
        description="Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Luminance</h2>
          <p className="text-muted-foreground mb-4">
            Luminance measures the brightness of a surface as perceived by the human eye. You express luminance in candelas per square meter (cd/m²), also called nits. This photometric quantity describes light emitted, reflected, or transmitted from a surface.
          </p>
          <p className="text-muted-foreground mb-4">
            Luminance differs from illuminance. Illuminance measures light falling on a surface. Luminance measures light leaving a surface. Your eyes respond to luminance, not illuminance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Luminance Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">L = I / A</p>
            <p className="text-muted-foreground text-sm">
              Definition: Luminance equals luminous intensity divided by projected area. Units are cd/m² or nits.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">L = E × ρ / π</p>
            <p className="text-muted-foreground text-sm">
              Reflecting surface: Luminance equals illuminance times reflectance divided by pi for Lambertian surfaces.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">L = Φ / (A × Ω)</p>
            <p className="text-muted-foreground text-sm">
              Extended source: Luminance equals luminous flux divided by area times solid angle.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A display producing 300 cd intensity over 0.1 m² area has L = 300 / 0.1 = 3,000 cd/m² or 3,000 nits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Luminance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">cd/m² (nits)</th>
                  <th className="border border-border p-2 text-left">cd/ft²</th>
                  <th className="border border-border p-2 text-left">Foot-lamberts (fL)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.2919</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.0929</td>
                  <td className="border border-border p-2">0.2919</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">3.426</td>
                  <td className="border border-border p-2">0.3183</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.929</td>
                  <td className="border border-border p-2">2.919</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">9.29</td>
                  <td className="border border-border p-2">29.19</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">92.9</td>
                  <td className="border border-border p-2">291.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Display Luminance Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Display Type</th>
                  <th className="border border-border p-2 text-left">Typical Luminance (nits)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Indoor SDR Monitor</td>
                  <td className="border border-border p-2">200-300</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">HDR Monitor</td>
                  <td className="border border-border p-2">400-1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Smartphone</td>
                  <td className="border border-border p-2">500-1,500</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Outdoor Display</td>
                  <td className="border border-border p-2">2,000-5,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Cinema Screen</td>
                  <td className="border border-border p-2">48-108</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Clear Sky</td>
                  <td className="border border-border p-2">2,000-8,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Display Calibration</h3>
              <p className="text-muted-foreground text-sm">
                Professional displays calibrate to 100-120 cd/m² for color grading. HDR content requires higher peak luminance. Calibration ensures accurate color reproduction.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Roadway Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Road surface luminance determines visibility. Standards specify 0.5-2 cd/m² for different road classes. Uniformity ratios ensure consistent visibility.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Photography and Cinematography</h3>
              <p className="text-muted-foreground text-sm">
                Light meters measure scene luminance. Incident meters measure illuminance. Understanding both ensures proper exposure settings.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Workplace Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Office tasks require specific luminance ratios. Display-to-surround ratio should be 3:1 to 10:1. Excessive contrast causes eye strain.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between nits and lumens?</h3>
              <p className="text-muted-foreground text-sm">
                Nits measure luminance (brightness per area). Lumens measure total luminous flux. A projector might output 3,000 lumens but produce 100 nits on a screen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a foot-lambert?</h3>
              <p className="text-muted-foreground text-sm">
                Foot-lambert is the Imperial unit of luminance. One foot-lambert equals 3.426 cd/m². Cinema screens traditionally specify luminance in foot-lamberts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How bright should a TV be?</h3>
              <p className="text-muted-foreground text-sm">
                For dark rooms, 100-150 nits works well. Bright rooms need 300-500 nits. HDR content benefits from 600+ nits peak brightness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure luminance?</h3>
              <p className="text-muted-foreground text-sm">
                Use a luminance meter or spot photometer. These instruments measure cd/m² from a specific viewing angle. Camera-based systems map luminance across scenes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
