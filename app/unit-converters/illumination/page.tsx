"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function IlluminationPage() {
  const config = converterMappings["Illumination"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Illumination"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Illuminance Converter</h1>
        <p className="text-muted-foreground">Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance.</p>
      </div>
      <UnitConverterBase
        title="Illuminance Converter"
        description="Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Illuminance</h2>
          <p className="text-muted-foreground mb-4">
            Illuminance measures the amount of light falling on a surface. You express illuminance in lux (lx), where one lux equals one lumen per square meter. This photometric quantity determines how well you can see tasks and objects.
          </p>
          <p className="text-muted-foreground mb-4">
            Illuminance differs from luminance. Illuminance measures incoming light. Luminance measures reflected or emitted light. Lighting design specifies illuminance levels for different activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Illuminance Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = Φ / A</p>
            <p className="text-muted-foreground text-sm">
              Definition: Illuminance equals luminous flux divided by area. Units are lux (lm/m²) or foot-candles (lm/ft²).
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = I / d² × cos(θ)</p>
            <p className="text-muted-foreground text-sm">
              Inverse square law: Illuminance equals intensity divided by distance squared, times cosine of incidence angle.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = L × π × ρ</p>
            <p className="text-muted-foreground text-sm">
              From luminance: Illuminance equals luminance times pi times reflectance for uniform diffuse surfaces.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 1,000 lumen lamp illuminating 10 m² produces E = 1,000 / 10 = 100 lux average illuminance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Illuminance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Lux (lx)</th>
                  <th className="border border-border p-2 text-left">Foot-candles (fc)</th>
                  <th className="border border-border p-2 text-left">Phot (ph)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.0929</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.00000929</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.0929</td>
                  <td className="border border-border p-2">0.0001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.929</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">9.29</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">92.9</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">929</td>
                  <td className="border border-border p-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Illuminance Levels</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Space/Task</th>
                  <th className="border border-border p-2 text-left">Illuminance (lux)</th>
                  <th className="border border-border p-2 text-left">Illuminance (fc)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Moonlight (full)</td>
                  <td className="border border-border p-2">0.1-0.3</td>
                  <td className="border border-border p-2">0.01-0.03</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Living Room</td>
                  <td className="border border-border p-2">100-150</td>
                  <td className="border border-border p-2">10-15</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Office (general)</td>
                  <td className="border border-border p-2">300-500</td>
                  <td className="border border-border p-2">30-50</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Office (desk task)</td>
                  <td className="border border-border p-2">500-750</td>
                  <td className="border border-border p-2">50-75</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Surgical Lighting</td>
                  <td className="border border-border p-2">10,000-50,000</td>
                  <td className="border border-border p-2">1,000-5,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Direct Sunlight</td>
                  <td className="border border-border p-2">32,000-100,000</td>
                  <td className="border border-border p-2">3,000-10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Office Lighting Design</h3>
              <p className="text-muted-foreground text-sm">
                EN 12464-1 specifies 500 lux for office workstations. Uniformity ratio should exceed 0.6. Glare control requires proper luminaire selection and placement.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Photography Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Portrait photography uses 500-1,000 lux key light. Product photography may need 2,000-5,000 lux. Light meters measure illuminance for exposure settings.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Workplace Safety</h3>
              <p className="text-muted-foreground text-sm">
                OSHA specifies minimum illuminance for different tasks. Assembly work requires 100 fc (1,000 lux). Warehouses need 5-10 fc (50-100 lux).
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Plant Growth Lighting</h3>
              <p className="text-muted-foreground text-sm">
                Photosynthesis requires specific illuminance levels. Leafy greens need 10,000-20,000 lux. Fruiting plants require 20,000-40,000 lux for optimal growth.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between lux and lumens?</h3>
              <p className="text-muted-foreground text-sm">
                Lumens measure total light output from a source. Lux measures light arriving at a surface. One lumen spread over one square meter equals one lux.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a foot-candle?</h3>
              <p className="text-muted-foreground text-sm">
                Foot-candle is the Imperial unit of illuminance. One foot-candle equals one lumen per square foot. One foot-candle equals 10.76 lux.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate illuminance from a light bulb?</h3>
              <p className="text-muted-foreground text-sm">
                Use the inverse square law. E = I/d² where I is luminous intensity in candelas and d is distance in meters. For omnidirectional bulbs, I ≈ lumens/4π.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure illuminance?</h3>
              <p className="text-muted-foreground text-sm">
                Use a lux meter or light meter. Place the sensor at the work surface height. Take multiple readings to assess uniformity. Smartphone apps provide approximate readings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
