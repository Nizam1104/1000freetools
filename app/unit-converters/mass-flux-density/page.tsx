"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MassFluxDensityPage() {
  const config = converterMappings["Mass Flux Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Mass Flux Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Mass Flux Density Converter</h1>
        <p className="text-muted-foreground">Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering, filtration, and membrane technology.</p>
      </div>
      <UnitConverterBase
        title="Mass Flux Density Converter"
        description="Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering, filtration, and membrane technology."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Mass Flux Density</h2>
          <p className="text-muted-foreground mb-4">
            Mass flux density measures mass flow rate per unit area. You express this property in kilograms per square meter per second (kg/(m²·s)) in SI units. Engineers use mass flux to characterize filtration rates and membrane performance.
          </p>
          <p className="text-muted-foreground">
            Mass flux combines flow rate and area effects into one parameter. You compare different sized systems using mass flux. Membrane manufacturers specify maximum allowable flux to prevent fouling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mass Flux Density Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate mass flux density from mass flow rate and area:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">G = ṁ / A</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where G equals mass flux density, ṁ equals mass flow rate, and A equals cross-sectional area.
          </p>
          <p className="text-muted-foreground mb-4">
            Relate to velocity and density:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">G = ρ × v</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Water (ρ = 1000 kg/m³) flows at 2 m/s:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">G = 1000 × 2 = 2000 kg/(m²·s)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typical Mass Flux Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">kg/(m²·s)</th>
                  <th className="border border-border p-2 text-left">lb/(ft²·s)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Reverse osmosis</td>
                  <td className="border border-border p-2">0.0005-0.002</td>
                  <td className="border border-border p-2">0.0001-0.0004</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Ultrafiltration</td>
                  <td className="border border-border p-2">0.001-0.01</td>
                  <td className="border border-border p-2">0.0002-0.002</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Microfiltration</td>
                  <td className="border border-border p-2">0.01-0.1</td>
                  <td className="border border-border p-2">0.002-0.02</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Cooling tower</td>
                  <td className="border border-border p-2">0.5-2</td>
                  <td className="border border-border p-2">0.1-0.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Pipe flow (water)</td>
                  <td className="border border-border p-2">100-5000</td>
                  <td className="border border-border p-2">20-1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications</h2>
          <p className="text-muted-foreground mb-4">
            Membrane processes specify flux limits to control fouling. Reverse osmosis systems operate at 0.0005 to 0.002 kg/(m²·s). You increase flux by raising pressure but risk membrane damage.
          </p>
          <p className="text-muted-foreground mb-4">
            Cooling towers use mass flux for water distribution design. Uniform flux ensures efficient heat transfer. You calculate required area from total flow and target flux.
          </p>
          <p className="text-muted-foreground">
            Boiling and condensation heat transfer use mass flux for two-phase flow analysis. Critical heat flux depends on mass flux. You optimize flux for maximum heat transfer without dryout.
          </p>
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
                  <td className="border border-border p-2">kg/(m²·s)</td>
                  <td className="border border-border p-2">0.2048</td>
                  <td className="border border-border p-2">lb/(ft²·s)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">lb/(ft²·s)</td>
                  <td className="border border-border p-2">4.882</td>
                  <td className="border border-border p-2">kg/(m²·s)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kg/(m²·s)</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">g/(m²·s)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">g/(cm²·s)</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">kg/(m²·s)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">lb/(ft²·h)</td>
                  <td className="border border-border p-2">0.001356</td>
                  <td className="border border-border p-2">kg/(m²·s)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How does mass flux differ from velocity</h3>
              <p className="text-muted-foreground">
                Velocity measures distance per time. Mass flux includes fluid density. Same velocity gives different mass flux for different fluids. Water at 1 m/s has 1000 times the mass flux of air at 1 m/s.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What limits membrane flux</h3>
              <p className="text-muted-foreground">
                Concentration polarization and fouling limit practical flux. Higher flux increases these effects. You balance productivity against cleaning frequency and membrane life.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate required membrane area</h3>
              <p className="text-muted-foreground">
                Divide total mass flow by target flux. For 1 kg/s flow at 0.001 kg/(m²·s) flux, you need 1000 m² area. Add safety factor for fouling and degradation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why use mass flux instead of volumetric flux</h3>
              <p className="text-muted-foreground">
                Mass flux accounts for density variations. Temperature and pressure affect volume but not mass. Mass flux gives consistent performance comparison across conditions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
