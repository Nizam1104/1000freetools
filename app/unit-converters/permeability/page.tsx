"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function PermeabilityPage() {
  const config = converterMappings["Permeability"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Permeability"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Permeability Converter</h1>
        <p className="text-muted-foreground">Convert permeability units including darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering, hydrogeology, and porous media analysis.</p>
      </div>
      <UnitConverterBase
        title="Permeability Converter"
        description="Convert permeability units including darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering, hydrogeology, and porous media analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Permeability</h2>
          <p className="text-muted-foreground mb-4">
            Permeability quantifies how easily fluids flow through porous materials like soil, rock, or ceramic filters. This intrinsic property depends on pore size, connectivity, and tortuosity, but not on the fluid properties. High permeability materials allow rapid fluid flow, while low permeability materials restrict flow.
          </p>
          <p className="text-muted-foreground">
            The darcy (D) honors Henry Darcy, who established the fundamental law of flow through porous media. One darcy represents high permeability typical of clean gravel. Most reservoir rocks have permeability in the millidarcy (mD) range.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Darcy's Law</h2>
          <p className="text-muted-foreground mb-4">
            Henry Darcy established the fundamental equation for fluid flow through porous media in 1856:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q = (k × A × ΔP) / (μ × L)</p>
            <p className="text-sm text-muted-foreground mt-2">where Q = volumetric flow rate (m³/s), k = permeability (m²), A = cross-sectional area (m²), ΔP = pressure difference (Pa), μ = fluid viscosity (Pa·s), L = flow path length (m)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Rearranging to solve for permeability:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">k = (Q × μ × L) / (A × ΔP)</p>
          </div>
          <p className="text-muted-foreground">
            Example: Water (μ = 0.001 Pa·s) flows at 1 mL/s through a 10 cm long core sample with 5 cm² cross-section under 100 kPa pressure difference:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">k = (1×10⁻⁶ × 0.001 × 0.1) / (5×10⁻⁴ × 100,000) = 2×10⁻¹² m² = 2.03 D</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Soil Permeability Classes</h2>
          <p className="text-muted-foreground mb-4">
            Soil scientists classify materials by hydraulic conductivity, which combines permeability with fluid properties:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Soil Type</th>
                  <th className="border border-border p-3 text-left">Permeability (m²)</th>
                  <th className="border border-border p-3 text-left">Permeability (Darcy)</th>
                  <th className="border border-border p-3 text-left">Hydraulic Conductivity (m/s)</th>
                  <th className="border border-border p-3 text-left">Flow Characteristics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Clean gravel</td>
                  <td className="border border-border p-3">10⁻⁷ to 10⁻⁹</td>
                  <td className="border border-border p-3">10⁵ to 10³</td>
                  <td className="border border-border p-3">10⁻¹ to 10⁻³</td>
                  <td className="border border-border p-3">Very high flow</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Coarse sand</td>
                  <td className="border border-border p-3">10⁻⁹ to 10⁻¹⁰</td>
                  <td className="border border-border p-3">10³ to 10²</td>
                  <td className="border border-border p-3">10⁻³ to 10⁻⁴</td>
                  <td className="border border-border p-3">High flow</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Fine sand</td>
                  <td className="border border-border p-3">10⁻¹⁰ to 10⁻¹¹</td>
                  <td className="border border-border p-3">10² to 10</td>
                  <td className="border border-border p-3">10⁻⁴ to 10⁻⁵</td>
                  <td className="border border-border p-3">Moderate flow</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Silt</td>
                  <td className="border border-border p-3">10⁻¹¹ to 10⁻¹³</td>
                  <td className="border border-border p-3">10 to 0.1</td>
                  <td className="border border-border p-3">10⁻⁵ to 10⁻⁷</td>
                  <td className="border border-border p-3">Slow flow</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Clay</td>
                  <td className="border border-border p-3">10⁻¹³ to 10⁻¹⁷</td>
                  <td className="border border-border p-3">0.1 to 10⁻⁵</td>
                  <td className="border border-border p-3">10⁻⁷ to 10⁻¹¹</td>
                  <td className="border border-border p-3">Very slow flow</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Unfractured shale</td>
                  <td className="border border-border p-3">10⁻¹⁷ to 10⁻²⁰</td>
                  <td className="border border-border p-3">10⁻⁵ to 10⁻⁸</td>
                  <td className="border border-border p-3">10⁻¹¹ to 10⁻¹⁴</td>
                  <td className="border border-border p-3">Impermeable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Petroleum Reservoir Permeability</h2>
          <p className="text-muted-foreground mb-4">
            Oil and gas reservoir rocks show a wide range of permeability values:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Rock Type</th>
                  <th className="border border-border p-3 text-left">Permeability Range (mD)</th>
                  <th className="border border-border p-3 text-left">Typical Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Unconsolidated sand</td>
                  <td className="border border-border p-3">1000 to 10000</td>
                  <td className="border border-border p-3">High-productivity oil wells</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Sandstone (good)</td>
                  <td className="border border-border p-3">100 to 1000</td>
                  <td className="border border-border p-3">Conventional reservoirs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Sandstone (average)</td>
                  <td className="border border-border p-3">10 to 100</td>
                  <td className="border border-border p-3">Standard production</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Sandstone (poor)</td>
                  <td className="border border-border p-3">1 to 10</td>
                  <td className="border border-border p-3">Low-productivity wells</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Tight gas sand</td>
                  <td className="border border-border p-3">0.01 to 1</td>
                  <td className="border border-border p-3">Requires hydraulic fracturing</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Shale gas</td>
                  <td className="border border-border p-3">0.0001 to 0.01</td>
                  <td className="border border-border p-3">Requires extensive fracturing</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Limestone (fractured)</td>
                  <td className="border border-border p-3">1 to 500</td>
                  <td className="border border-border p-3">Carbonate reservoirs</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Limestone (matrix)</td>
                  <td className="border border-border p-3">0.01 to 10</td>
                  <td className="border border-border p-3">Low matrix permeability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Groundwater Flow Calculations</h2>
          <p className="text-muted-foreground mb-4">
            Hydrogeologists use Darcy's law to estimate groundwater velocity and aquifer recharge rates:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">v = (k × i) / n</p>
            <p className="text-sm text-muted-foreground mt-2">where v = seepage velocity (m/s), k = hydraulic conductivity (m/s), i = hydraulic gradient, n = porosity</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: An aquifer with hydraulic conductivity of 10⁻⁴ m/s, hydraulic gradient of 0.01, and porosity of 0.25:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">v = (10⁻⁴ × 0.01) / 0.25 = 4 × 10⁻⁶ m/s = 0.35 m/day</p>
          </div>
          <p className="text-muted-foreground">
            Groundwater travels about 127 meters per year under these conditions. This calculation helps predict contaminant transport and well capture zones.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between permeability units using these factors:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 darcy (D) = 9.869233 × 10⁻¹³ m²</li>
            <li>1 millidarcy (mD) = 9.869233 × 10⁻¹⁶ m²</li>
            <li>1 microdarcy (μD) = 9.869233 × 10⁻¹⁹ m²</li>
            <li>1 m² = 1.01325 × 10¹² D</li>
            <li>1 cm² = 1.01325 × 10⁸ D</li>
            <li>1 ft² = 9.39187 × 10¹⁰ D</li>
          </ul>
          <p className="text-muted-foreground">
            The darcy is defined such that a fluid with 1 centipoise viscosity flows at 1 cm³/s through a 1 cm² cross-section under 1 atm/cm pressure gradient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Factors Affecting Permeability</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li><strong>Grain size:</strong> Larger grains create larger pores and higher permeability</li>
            <li><strong>Sorting:</strong> Well-sorted sediments have higher permeability than poorly sorted ones</li>
            <li><strong>Packing:</strong> Loose packing increases permeability compared to tight packing</li>
            <li><strong>Cementation:</strong> Mineral cement filling pores reduces permeability</li>
            <li><strong>Fractures:</strong> Natural or induced fractures dramatically increase effective permeability</li>
            <li><strong>Clay content:</strong> Clay minerals swell when wet, reducing permeability</li>
            <li><strong>Overburden pressure:</strong> Higher stress closes pores and fractures, reducing permeability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Permeability</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Oil and gas reservoir characterization and production forecasting</li>
            <li>Groundwater resource assessment and well siting</li>
            <li>Contaminant transport modeling for environmental remediation</li>
            <li>Landfill liner design to prevent leachate migration</li>
            <li>Dam and levee seepage analysis</li>
            <li>Ceramic filter and membrane design</li>
            <li>Concrete durability assessment</li>
            <li>Carbon sequestration site evaluation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between permeability and porosity?</h3>
            <p className="text-muted-foreground">
              Porosity measures the fraction of void space in a material, while permeability measures how well those voids connect to allow fluid flow. A material can have high porosity but low permeability if the pores are isolated. Clay has high porosity (30 to 50 percent) but very low permeability because the tiny pores restrict flow.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is permeability measured in darcys?</h3>
            <p className="text-muted-foreground">
              The darcy unit was established by petroleum engineers in the 1930s to honor Henry Darcy. One darcy represents practical permeability for oil reservoirs. Most commercial oil wells produce from rocks with 10 to 500 millidarcy permeability. Using square meters would require unwieldy powers of 10 for typical values.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do you measure rock permeability?</h3>
            <p className="text-muted-foreground">
              Laboratory permeameters force fluid through core samples under controlled pressure. Gas permeameters use nitrogen or helium for low-permeability rocks. Well tests like drill stem tests and pressure buildup tests measure formation permeability in situ. Wireline logs provide indirect permeability estimates from porosity and resistivity measurements.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What permeability is needed for economic oil production?</h3>
            <p className="text-muted-foreground">
              Conventional oil wells typically require at least 10 to 50 millidarcy permeability for economic production without stimulation. Tight oil formations with 0.001 to 1 millidarcy permeability need hydraulic fracturing to create artificial permeability. Shale gas wells may have matrix permeability below 0.0001 millidarcy and rely entirely on fracture networks for production.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
