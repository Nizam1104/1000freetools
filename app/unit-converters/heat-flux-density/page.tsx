"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HeatFluxDensityPage() {
  const config = converterMappings["Heat Flux Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Heat Flux Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Heat Flux Density Converter</h1>
        <p className="text-muted-foreground">Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation.</p>
      </div>
      <UnitConverterBase
        title="Heat Flux Density Converter"
        description="Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Heat Flux Density</h2>
          <p className="text-muted-foreground mb-4">
            Heat flux density measures heat energy transfer rate per unit area. You express this property in watts per square meter (W/m²) in SI units. Engineers use heat flux to size heat exchangers and evaluate insulation performance.
          </p>
          <p className="text-muted-foreground">
            Solar irradiance represents heat flux from the sun. Peak solar flux reaches 1000 W/m² at Earth surface. Building designers use heat flux calculations to determine cooling loads and insulation requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Heat Flux Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate heat flux from heat transfer rate and area:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">q = Q / A</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where q equals heat flux density in W/m², Q equals heat transfer rate in watts, and A equals area in square meters.
          </p>
          <p className="text-muted-foreground mb-4">
            For conduction through a plane wall, use Fourier law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">q = k × ΔT / d</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where k equals thermal conductivity, ΔT equals temperature difference, and d equals wall thickness.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A wall with k = 0.5 W/(m·K), thickness 0.2 m, and ΔT = 20°C has heat flux:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">q = 0.5 × 20 / 0.2 = 50 W/m²</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Heat Flux Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Source/Application</th>
                  <th className="border border-border p-2 text-left">W/m²</th>
                  <th className="border border-border p-2 text-left">BTU/(h·ft²)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Solar constant (outer space)</td>
                  <td className="border border-border p-2">1361</td>
                  <td className="border border-border p-2">431</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Solar peak (Earth surface)</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">317</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Human body heat loss</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">32</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Building wall (winter)</td>
                  <td className="border border-border p-2">30</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">CPU heat sink</td>
                  <td className="border border-border p-2">50,000</td>
                  <td className="border border-border p-2">15,850</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Nuclear reactor core</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">317,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Re-entry vehicle</td>
                  <td className="border border-border p-2">5,000,000</td>
                  <td className="border border-border p-2">1,585,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Heat Transfer Modes</h2>
          <p className="text-muted-foreground mb-4">
            Heat flux occurs through three mechanisms. Conduction transfers heat through solid materials. Fourier law governs conductive flux.
          </p>
          <p className="text-muted-foreground mb-4">
            Convection transfers heat between surfaces and fluids. Newton law of cooling describes convective flux:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">q = h × (Ts - T∞)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where h equals convective heat transfer coefficient, Ts equals surface temperature, and T∞ equals fluid temperature.
          </p>
          <p className="text-muted-foreground">
            Radiation transfers heat through electromagnetic waves. Stefan-Boltzmann law gives radiative flux:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">q = ε × σ × (Ts⁴ - T∞⁴)</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Where ε equals emissivity and σ equals Stefan-Boltzmann constant (5.67×10⁻⁸ W/(m²·K⁴)).
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
                  <td className="border border-border p-2">W/m²</td>
                  <td className="border border-border p-2">0.317</td>
                  <td className="border border-border p-2">BTU/(h·ft²)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">BTU/(h·ft²)</td>
                  <td className="border border-border p-2">3.155</td>
                  <td className="border border-border p-2">W/m²</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">W/m²</td>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">W/cm²</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">W/cm²</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">W/m²</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">W/m²</td>
                  <td className="border border-border p-2">2.39×10⁻⁵</td>
                  <td className="border border-border p-2">cal/(s·cm²)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">cal/(s·cm²)</td>
                  <td className="border border-border p-2">41,840</td>
                  <td className="border border-border p-2">W/m²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is critical heat flux in boiling</h3>
              <p className="text-muted-foreground">
                Critical heat flux marks the transition from nucleate to film boiling. Exceeding this limit causes rapid surface temperature rise. You design boilers and heat exchangers to operate below critical flux.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I measure heat flux</h3>
              <p className="text-muted-foreground">
                Heat flux sensors use thermopiles to measure temperature gradient across a thin layer. You calculate flux from the measured voltage. Gardon gauges and Schmidt-Boelter sensors serve high-flux applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What limits heat flux in electronics cooling</h3>
              <p className="text-muted-foreground">
                Chip power density increases with transistor count. Air cooling handles up to 200 W/cm². Liquid cooling extends this to 500 W/cm². Two-phase cooling reaches beyond 1000 W/cm².
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does surface orientation affect heat flux</h3>
              <p className="text-muted-foreground">
                Natural convection depends on orientation. Horizontal surfaces facing up have higher heat flux than downward-facing surfaces. Vertical surfaces fall between these extremes. Forced convection reduces orientation effects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
