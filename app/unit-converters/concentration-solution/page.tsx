"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcentrationSolutionPage() {
  const config = converterMappings["Concentration - Solution"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concentration - Solution"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Solution Concentration Converter</h1>
        <p className="text-muted-foreground">Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing.</p>
      </div>
      <UnitConverterBase
        title="Solution Concentration Converter"
        description="Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Solution Concentration</h2>
          <p className="text-muted-foreground mb-4">
            Solution concentration expresses how much solute is dissolved in a solvent. Environmental scientists, water treatment operators, and chemists use various units depending on the concentration range. Trace contaminants are measured in parts per billion, while major constituents use percent or g/L.
          </p>
          <p className="text-muted-foreground">
            For dilute aqueous solutions, mg/L equals ppm (parts per million) because 1 liter of water weighs approximately 1 kilogram. This equivalence simplifies water quality reporting and regulatory compliance calculations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Concentration Units and Definitions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Meaning</th>
                  <th className="border border-border p-3 text-left">Ratio</th>
                  <th className="border border-border p-3 text-left">Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Percent (%)</td>
                  <td className="border border-border p-3">Parts per hundred</td>
                  <td className="border border-border p-3">1 in 100</td>
                  <td className="border border-border p-3">10,000 ppm</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Per mille (‰)</td>
                  <td className="border border-border p-3">Parts per thousand</td>
                  <td className="border border-border p-3">1 in 1,000</td>
                  <td className="border border-border p-3">1,000 ppm</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ppm</td>
                  <td className="border border-border p-3">Parts per million</td>
                  <td className="border border-border p-3">1 in 1,000,000</td>
                  <td className="border border-border p-3">1 mg/L (water)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">ppb</td>
                  <td className="border border-border p-3">Parts per billion</td>
                  <td className="border border-border p-3">1 in 1,000,000,000</td>
                  <td className="border border-border p-3">1 μg/L (water)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ppt</td>
                  <td className="border border-border p-3">Parts per trillion</td>
                  <td className="border border-border p-3">1 in 1,000,000,000,000</td>
                  <td className="border border-border p-3">1 ng/L (water)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">mg/L</td>
                  <td className="border border-border p-3">Milligrams per liter</td>
                  <td className="border border-border p-3">Mass/Volume</td>
                  <td className="border border-border p-3">1 ppm (water)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">g/L</td>
                  <td className="border border-border p-3">Grams per liter</td>
                  <td className="border border-border p-3">Mass/Volume</td>
                  <td className="border border-border p-3">1000 ppm</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">μg/L</td>
                  <td className="border border-border p-3">Micrograms per liter</td>
                  <td className="border border-border p-3">Mass/Volume</td>
                  <td className="border border-border p-3">1 ppb (water)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Concentration Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Convert between parts-per notation and mass concentration:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ppm = (mass of solute / mass of solution) × 10⁶</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">mg/L = ppm × density (for aqueous solutions, density ≈ 1 kg/L)</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Percent = ppm / 10,000</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ppb = ppm × 1000</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Convert 250 ppm to percent:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Percent = 250 / 10,000 = 0.025%</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Convert 0.5 percent to ppm:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ppm = 0.5 × 10,000 = 5,000 ppm</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Water Quality Standards</h2>
          <p className="text-muted-foreground mb-4">
            Regulatory agencies set maximum contaminant levels (MCL) for drinking water in ppm or ppb:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Contaminant</th>
                  <th className="border border-border p-3 text-left">MCL (US EPA)</th>
                  <th className="border border-border p-3 text-left">Health Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Arsenic</td>
                  <td className="border border-border p-3">10 ppb (0.01 mg/L)</td>
                  <td className="border border-border p-3">Cancer, skin damage</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Lead</td>
                  <td className="border border-border p-3">15 ppb (0.015 mg/L)</td>
                  <td className="border border-border p-3">Neurological damage</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Nitrate</td>
                  <td className="border border-border p-3">10 ppm (10 mg/L)</td>
                  <td className="border border-border p-3">Blue baby syndrome</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Fluoride</td>
                  <td className="border border-border p-3">4 ppm (4 mg/L)</td>
                  <td className="border border-border p-3">Dental fluorosis</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Chlorine (residual)</td>
                  <td className="border border-border p-3">4 ppm (4 mg/L)</td>
                  <td className="border border-border p-3">Disinfection byproducts</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Copper</td>
                  <td className="border border-border p-3">1.3 ppm (1.3 mg/L)</td>
                  <td className="border border-border p-3">Liver/kidney damage</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">2 ppb (0.002 mg/L)</td>
                  <td className="border border-border p-3">Kidney damage</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">TDS (Total Dissolved Solids)</td>
                  <td className="border border-border p-3">500 ppm (secondary)</td>
                  <td className="border border-border p-3">Taste, corrosion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Concentration Ranges</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Application</th>
                  <th className="border border-border p-3 text-left">Typical Range</th>
                  <th className="border border-border p-3 text-left">Common Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Ocean salinity</td>
                  <td className="border border-border p-3">35,000 ppm</td>
                  <td className="border border-border p-3">ppt or ppm</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Freshwater TDS</td>
                  <td className="border border-border p-3">50 to 500 ppm</td>
                  <td className="border border-border p-3">ppm or mg/L</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Pool chlorine</td>
                  <td className="border border-border p-3">1 to 3 ppm</td>
                  <td className="border border-border p-3">ppm</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Blood glucose</td>
                  <td className="border border-border p-3">70 to 100 mg/dL</td>
                  <td className="border border-border p-3">mg/dL</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Air CO2</td>
                  <td className="border border-border p-3">420 ppm</td>
                  <td className="border border-border p-3">ppm (volume)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Pesticide residues</td>
                  <td className="border border-border p-3">0.01 to 1 ppm</td>
                  <td className="border border-border p-3">ppm or ppb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Pharmaceutical impurities</td>
                  <td className="border border-border p-3">0.05 to 10 ppm</td>
                  <td className="border border-border p-3">ppm</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Groundwater contaminants</td>
                  <td className="border border-border p-3">1 to 100 ppb</td>
                  <td className="border border-border p-3">ppb or μg/L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between solution concentration units (for aqueous solutions):
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1% = 10,000 ppm = 10,000 mg/L</li>
            <li>1‰ = 1,000 ppm = 1,000 mg/L</li>
            <li>1 ppm = 1 mg/L = 1,000 ppb = 1,000 μg/L</li>
            <li>1 ppb = 1 μg/L = 1,000 ppt = 1,000 ng/L</li>
            <li>1 ppt = 1 ng/L = 0.001 ppb</li>
            <li>1 g/L = 1,000 mg/L = 1,000 ppm</li>
            <li>1 mg/kg = 1 ppm (for solids)</li>
            <li>1 μg/kg = 1 ppb (for solids)</li>
          </ul>
          <p className="text-muted-foreground">
            Note: The mg/L to ppm equivalence assumes water density of 1 kg/L. For other solvents, multiply by the actual density.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Solution Concentration</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Drinking water quality monitoring and treatment</li>
            <li>Wastewater discharge permit compliance</li>
            <li>Environmental contamination assessment</li>
            <li>Pharmaceutical formulation and quality control</li>
            <li>Food and beverage analysis</li>
            <li>Aquarium and aquaculture water management</li>
            <li>Swimming pool and spa chemical balance</li>
            <li>Hydroponic nutrient solution preparation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Is ppm the same as mg/L?</h3>
            <p className="text-muted-foreground">
              For dilute aqueous solutions, ppm equals mg/L because 1 liter of water weighs 1 kilogram. One mg in 1 kg equals 1 part per million. This equivalence works for drinking water, wastewater, and most environmental samples. For concentrated solutions or non-aqueous solvents, you must account for density differences.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I convert percent to ppm?</h3>
            <p className="text-muted-foreground">
              Multiply the percent value by 10,000 to get ppm. For example, 0.5 percent equals 0.5 × 10,000 = 5,000 ppm. To convert from ppm to percent, divide by 10,000. This relationship exists because percent means parts per hundred and ppm means parts per million, a factor of 10,000 apart.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What does ppb mean in water testing?</h3>
            <p className="text-muted-foreground">
              PPB stands for parts per billion, representing one microgram per liter (μg/L) in water. This unit measures trace contaminants like lead, mercury, and pesticides. The EPA lead action level of 15 ppb means 15 micrograms of lead per liter of water, equivalent to 15 grams in an Olympic swimming pool.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why use different concentration units?</h3>
            <p className="text-muted-foreground">
              Different units suit different concentration ranges. Percent works for major constituents like salt in seawater (3.5 percent). Ppm fits minor components like water hardness (100 to 300 ppm). Ppb handles trace contaminants like arsenic (less than 10 ppb). Using appropriate units avoids excessive zeros and makes values easier to read and compare.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
