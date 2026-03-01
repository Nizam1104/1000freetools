"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TemperatureIntervalPage() {
  const config = converterMappings["Temperature Interval"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Temperature Interval"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Temperature Interval Converter</h1>
        <p className="text-muted-foreground">Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC.</p>
      </div>
      <UnitConverterBase
        title="Temperature Interval Converter"
        description="Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Temperature Interval</h2>
          <p className="text-muted-foreground mb-4">
            Temperature interval measures the difference between two temperatures, not an absolute temperature value. You express temperature differences in kelvin (K), degrees Celsius (°C), degrees Fahrenheit (°F), or degrees Rankine (°R).
          </p>
          <p className="text-muted-foreground">
            Temperature interval conversion differs from absolute temperature conversion. A 10°C temperature difference equals a 10 K difference. The same difference equals 18°F or 18°R. You multiply by 9/5 to convert Celsius intervals to Fahrenheit intervals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Interval Conversion Formula</h2>
          <p className="text-muted-foreground mb-4">
            Convert temperature intervals using these relationships:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">1 K = 1°C = 1.8°F = 1.8°R = 0.8°Re</p>
          </div>
          <p className="text-muted-foreground mb-4">
            To convert from Celsius interval to Fahrenheit interval:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ΔT(°F) = ΔT(°C) × 9/5</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A temperature rise from 20°C to 45°C represents a 25°C interval. Converting to Fahrenheit:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ΔT(°F) = 25 × 9/5 = 45°F</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Verify: 20°C = 68°F and 45°C = 113°F. The difference is 113 - 68 = 45°F.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Scale Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Scale</th>
                  <th className="border border-border p-2 text-left">Unit Symbol</th>
                  <th className="border border-border p-2 text-left">Interval Size</th>
                  <th className="border border-border p-2 text-left">Zero Point</th>
                  <th className="border border-border p-2 text-left">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Kelvin</td>
                  <td className="border border-border p-2">K</td>
                  <td className="border border-border p-2">1 (base)</td>
                  <td className="border border-border p-2">Absolute zero</td>
                  <td className="border border-border p-2">Science, engineering</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Celsius</td>
                  <td className="border border-border p-2">°C</td>
                  <td className="border border-border p-2">1 (same as K)</td>
                  <td className="border border-border p-2">Water freezing</td>
                  <td className="border border-border p-2">Worldwide, science</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Fahrenheit</td>
                  <td className="border border-border p-2">°F</td>
                  <td className="border border-border p-2">5/9 of °C</td>
                  <td className="border border-border p-2">Brine freezing</td>
                  <td className="border border-border p-2">United States</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Rankine</td>
                  <td className="border border-border p-2">°R</td>
                  <td className="border border-border p-2">5/9 of °C</td>
                  <td className="border border-border p-2">Absolute zero</td>
                  <td className="border border-border p-2">US engineering</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Réaumur</td>
                  <td className="border border-border p-2">°Re</td>
                  <td className="border border-border p-2">1.25 × °C</td>
                  <td className="border border-border p-2">Water freezing</td>
                  <td className="border border-border p-2">Historical, cheese</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Temperature Intervals</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">°C</th>
                  <th className="border border-border p-2 text-left">°F</th>
                  <th className="border border-border p-2 text-left">K</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">HVAC comfort range</td>
                  <td className="border border-border p-2">5</td>
                  <td className="border border-border p-2">9</td>
                  <td className="border border-border p-2">5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Refrigerator temperature drop</td>
                  <td className="border border-border p-2">15</td>
                  <td className="border border-border p-2">27</td>
                  <td className="border border-border p-2">15</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Engine operating range</td>
                  <td className="border border-border p-2">60</td>
                  <td className="border border-border p-2">108</td>
                  <td className="border border-border p-2">60</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Water boiling to freezing</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">180</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Industrial oven range</td>
                  <td className="border border-border p-2">200</td>
                  <td className="border border-border p-2">360</td>
                  <td className="border border-border p-2">200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversion Factors</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">From Unit</th>
                  <th className="border border-border p-2 text-left">Multiply By</th>
                  <th className="border border-border p-2 text-left">To Get</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">K</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">°C</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">K</td>
                  <td className="border border-border p-2">1.8</td>
                  <td className="border border-border p-2">°F</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">K</td>
                  <td className="border border-border p-2">1.8</td>
                  <td className="border border-border p-2">°R</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">K</td>
                  <td className="border border-border p-2">0.8</td>
                  <td className="border border-border p-2">°Re</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">°F</td>
                  <td className="border border-border p-2">5/9</td>
                  <td className="border border-border p-2">K</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">°C</td>
                  <td className="border border-border p-2">1.8</td>
                  <td className="border border-border p-2">°F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why is temperature interval different from absolute temperature conversion</h3>
              <p className="text-muted-foreground">
                Absolute temperature conversion accounts for different zero points. Temperature interval conversion only considers unit size differences. A 10°C difference equals 10 K, but 10°C absolute equals 283.15 K.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">When should I use Kelvin versus Celsius for temperature differences</h3>
              <p className="text-muted-foreground">
                Use kelvin for scientific calculations involving thermodynamic equations. Celsius intervals work for everyday applications. Both have identical interval sizes, so numerical values match.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the Rankine scale used for</h3>
              <p className="text-muted-foreground">
                Rankine serves US engineering applications requiring absolute temperature. Power plant calculations and aerospace engineering use Rankine. The scale combines Fahrenheit intervals with absolute zero.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert temperature coefficients between scales</h3>
              <p className="text-muted-foreground">
                Temperature coefficients use interval units. Convert using interval conversion factors. A coefficient of 0.001/°C equals 0.001/K or 0.000556/°F.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
