"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceTensionPage() {
  const config = converterMappings["Surface Tension"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Tension"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Tension Converter</h1>
        <p className="text-muted-foreground">Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies.</p>
      </div>
      <UnitConverterBase
        title="Surface Tension Converter"
        description="Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Surface Tension</h2>
          <p className="text-muted-foreground mb-4">
            Surface tension arises from cohesive forces between liquid molecules. Molecules at the surface experience net inward attraction because they lack neighboring molecules above them. This creates a stretched membrane effect that minimizes surface area, causing water droplets to form spheres and insects to walk on water.
          </p>
          <p className="text-muted-foreground">
            Surface tension is measured in force per unit length. The SI unit is newton per meter (N/m). Common alternatives include millinewton per meter (mN/m) and dyne per centimeter (dyn/cm), which are numerically equivalent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Surface Tension Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate surface tension as force divided by length:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">γ = F / L</p>
            <p className="text-sm text-muted-foreground mt-2">where γ = surface tension (N/m), F = force (N), L = length (m)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Surface tension also equals surface energy per unit area:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">γ = dE / dA</p>
            <p className="text-sm text-muted-foreground mt-2">where E = surface energy (J), A = area (m²)</p>
          </div>
          <p className="text-muted-foreground">
            This dual interpretation explains why surface tension has units of both N/m and J/m², which are equivalent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Capillary Action</h2>
          <p className="text-muted-foreground mb-4">
            Capillary action describes liquid rise or fall in narrow tubes due to surface tension and adhesion. The height of capillary rise follows Jurin's law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">h = (2 × γ × cos θ) / (ρ × g × r)</p>
            <p className="text-sm text-muted-foreground mt-2">where h = capillary rise (m), γ = surface tension (N/m), θ = contact angle, ρ = liquid density (kg/m³), g = gravitational acceleration (9.81 m/s²), r = tube radius (m)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Water at 20°C (γ = 0.0728 N/m, ρ = 1000 kg/m³, θ ≈ 0°) in a glass capillary with 0.5 mm radius:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">h = (2 × 0.0728 × cos 0°) / (1000 × 9.81 × 0.0005) = 0.0297 m = 29.7 mm</p>
          </div>
          <p className="text-muted-foreground">
            Capillary action drives water transport in plants, ink flow in fountain pens, and wicking in fabrics and paper towels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Droplet Formation and Laplace Pressure</h2>
          <p className="text-muted-foreground mb-4">
            Surface tension creates excess pressure inside curved liquid interfaces. The Young-Laplace equation describes this pressure difference:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ΔP = 2γ / r</p>
            <p className="text-sm text-muted-foreground mt-2">where ΔP = pressure difference (Pa), γ = surface tension (N/m), r = droplet radius (m)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A water droplet with 1 mm radius at 20°C:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ΔP = 2 × 0.0728 / 0.001 = 145.6 Pa</p>
          </div>
          <p className="text-muted-foreground">
            Smaller droplets have higher internal pressure. This principle affects bubble stability, aerosol formation, and emulsion behavior in food and cosmetics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Surface Tension Values for Common Liquids at 20°C</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Liquid</th>
                  <th className="border border-border p-3 text-left">Surface Tension (N/m)</th>
                  <th className="border border-border p-3 text-left">Surface Tension (mN/m)</th>
                  <th className="border border-border p-3 text-left">Surface Tension (dyn/cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Water (pure)</td>
                  <td className="border border-border p-3">0.0728</td>
                  <td className="border border-border p-3">72.8</td>
                  <td className="border border-border p-3">72.8</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Seawater</td>
                  <td className="border border-border p-3">0.0735</td>
                  <td className="border border-border p-3">73.5</td>
                  <td className="border border-border p-3">73.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Ethanol</td>
                  <td className="border border-border p-3">0.0223</td>
                  <td className="border border-border p-3">22.3</td>
                  <td className="border border-border p-3">22.3</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Methanol</td>
                  <td className="border border-border p-3">0.0226</td>
                  <td className="border border-border p-3">22.6</td>
                  <td className="border border-border p-3">22.6</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Acetone</td>
                  <td className="border border-border p-3">0.0237</td>
                  <td className="border border-border p-3">23.7</td>
                  <td className="border border-border p-3">23.7</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Isopropanol</td>
                  <td className="border border-border p-3">0.0217</td>
                  <td className="border border-border p-3">21.7</td>
                  <td className="border border-border p-3">21.7</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Glycerin</td>
                  <td className="border border-border p-3">0.0634</td>
                  <td className="border border-border p-3">63.4</td>
                  <td className="border border-border p-3">63.4</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Olive oil</td>
                  <td className="border border-border p-3">0.0320</td>
                  <td className="border border-border p-3">32.0</td>
                  <td className="border border-border p-3">32.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">0.4865</td>
                  <td className="border border-border p-3">486.5</td>
                  <td className="border border-border p-3">486.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Benzene</td>
                  <td className="border border-border p-3">0.0289</td>
                  <td className="border border-border p-3">28.9</td>
                  <td className="border border-border p-3">28.9</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Toluene</td>
                  <td className="border border-border p-3">0.0284</td>
                  <td className="border border-border p-3">28.4</td>
                  <td className="border border-border p-3">28.4</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Hexane</td>
                  <td className="border border-border p-3">0.0184</td>
                  <td className="border border-border p-3">18.4</td>
                  <td className="border border-border p-3">18.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Acetic acid</td>
                  <td className="border border-border p-3">0.0276</td>
                  <td className="border border-border p-3">27.6</td>
                  <td className="border border-border p-3">27.6</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Soapy water</td>
                  <td className="border border-border p-3">0.0250</td>
                  <td className="border border-border p-3">25.0</td>
                  <td className="border border-border p-3">25.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Blood plasma</td>
                  <td className="border border-border p-3">0.0580</td>
                  <td className="border border-border p-3">58.0</td>
                  <td className="border border-border p-3">58.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Effect on Surface Tension</h2>
          <p className="text-muted-foreground mb-4">
            Surface tension decreases with increasing temperature and becomes zero at the critical point. The Eötvös rule provides an approximation:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">γ = k × (Tc - T) / V^(2/3)</p>
            <p className="text-sm text-muted-foreground mt-2">where k = constant (2.1 × 10⁻⁷ J/K), Tc = critical temperature, T = current temperature, V = molar volume</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Water surface tension decreases from 75.6 mN/m at 0°C to 58.9 mN/m at 100°C. This 22 percent reduction affects cleaning efficiency, which is why hot water often cleans better than cold water.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Surfactants and Surface Tension Reduction</h2>
          <p className="text-muted-foreground mb-4">
            Surfactants (surface-active agents) dramatically reduce surface tension by accumulating at interfaces. Soap molecules have hydrophilic heads and hydrophobic tails that orient at the water-air boundary, weakening cohesive forces.
          </p>
          <p className="text-muted-foreground mb-4">
            Adding 1 percent sodium dodecyl sulfate (SDS) to water reduces surface tension from 72.8 mN/m to about 35 mN/m. This reduction enables:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Better wetting of surfaces for cleaning</li>
            <li>Formation of stable foams and emulsions</li>
            <li>Improved spreading of pesticides on leaves</li>
            <li>Enhanced oil recovery from reservoirs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between surface tension units using these relationships:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 N/m = 1000 mN/m</li>
            <li>1 N/m = 1000 dyn/cm</li>
            <li>1 mN/m = 1 dyn/cm (numerically equal)</li>
            <li>1 N/m = 0.06852 lbf/ft</li>
            <li>1 lbf/ft = 14.5939 N/m</li>
            <li>1 N/m = 1 J/m²</li>
          </ul>
          <p className="text-muted-foreground">
            The equivalence between mN/m and dyn/cm makes conversion between SI and CGS systems straightforward for surface tension measurements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Surface Tension</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Detergent and soap formulation for cleaning products</li>
            <li>Inkjet printer droplet control</li>
            <li>Pesticide spray optimization for agriculture</li>
            <li>Emulsion stabilization in food and cosmetics</li>
            <li>Coating and painting processes</li>
            <li>Microfluidics and lab-on-chip devices</li>
            <li>Pulmonary surfactant therapy for premature infants</li>
            <li>Flotation processes in mineral processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does water have such high surface tension?</h3>
            <p className="text-muted-foreground">
              Water molecules form strong hydrogen bonds with each other. Each water molecule can hydrogen bond with up to four neighbors, creating a cohesive network. At the surface, molecules experience unbalanced inward forces, resulting in high surface tension of 72.8 mN/m at 20°C.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do water striders walk on water?</h3>
            <p className="text-muted-foreground">
              Water striders distribute their weight across long, hydrophobic legs that dimple the water surface without breaking it. Surface tension provides upward force that supports their weight. A typical water strider creates dimples about 4 mm deep, with surface tension supporting 10 to 15 times the insect's body weight.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What causes tears of wine in a glass?</h3>
            <p className="text-muted-foreground">
              The Marangoni effect creates wine tears. Alcohol evaporates faster than water from the thin film climbing the glass, increasing surface tension in that region. Higher surface tension pulls more liquid upward until droplets form and fall back. This phenomenon also drives coating flows and crystal growth patterns.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How is surface tension measured?</h3>
            <p className="text-muted-foreground">
              Common methods include the du Noüy ring method, Wilhelmy plate method, and pendant drop analysis. The du Noüy ring measures the force required to pull a platinum ring from the liquid surface. The Wilhelmy plate measures force on a thin plate partially immersed in the liquid. Pendant drop analysis calculates surface tension from the shape of a hanging droplet.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
