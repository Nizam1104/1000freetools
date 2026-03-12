"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcentrationMolarPage() {
  const config = converterMappings["Concentration - Molar"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concentration - Molar"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Molar Concentration Converter</h1>
        <p className="text-muted-foreground">Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation.</p>
      </div>
      <UnitConverterBase
        title="Molar Concentration Converter"
        description="Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Molar Concentration</h2>
          <p className="text-muted-foreground mb-4">
            Molar concentration, also called molarity, expresses the amount of solute dissolved in a solution. Chemists use molarity to prepare solutions with precise chemical amounts for reactions, analysis, and biological experiments. The unit mol/L (or M) indicates moles of solute per liter of solution.
          </p>
          <p className="text-muted-foreground">
            Molar concentration differs from mass concentration because it accounts for molecular weight. One molar solution of glucose (180 g/mol) contains 180 g/L, while one molar sodium chloride (58.44 g/mol) contains 58.44 g/L.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Molarity Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate molar concentration from moles and volume:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">C = n / V</p>
            <p className="text-sm text-muted-foreground mt-2">where C = molar concentration (mol/L), n = amount of solute (mol), V = solution volume (L)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Calculate moles from mass and molecular weight:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">n = m / M</p>
            <p className="text-sm text-muted-foreground mt-2">where m = mass (g), M = molar mass (g/mol)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Combined formula for preparing solutions:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">m = C × V × M</p>
            <p className="text-sm text-muted-foreground mt-2">where m = mass to weigh (g), C = desired concentration (mol/L), V = desired volume (L), M = molar mass (g/mol)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Prepare 500 mL of 0.1 M sodium chloride solution (NaCl, M = 58.44 g/mol):
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">m = 0.1 mol/L × 0.5 L × 58.44 g/mol = 2.922 g</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Procedure: Weigh 2.922 g of NaCl, dissolve in about 400 mL of distilled water, then add water to reach exactly 500 mL total volume.
          </p>
          <p className="text-muted-foreground mb-4">
            Convert 0.1 mol/L to mmol/L:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">0.1 mol/L × 1000 = 100 mmol/L</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dilution Equation</h2>
          <p className="text-muted-foreground mb-4">
            Use the dilution equation to calculate volumes when preparing diluted solutions from concentrated stock:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">C₁ × V₁ = C₂ × V₂</p>
            <p className="text-sm text-muted-foreground mt-2">where C₁ = initial concentration, V₁ = volume of stock needed, C₂ = final concentration, V₂ = final volume</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Prepare 100 mL of 0.05 M HCl from 1 M stock solution:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">V₁ = (C₂ × V₂) / C₁ = (0.05 M × 100 mL) / 1 M = 5 mL</p>
          </div>
          <p className="text-muted-foreground">
            Take 5 mL of 1 M HCl and dilute to 100 mL with distilled water.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Molar Concentration Units</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Symbol</th>
                  <th className="border border-border p-3 text-left">Equivalent to mol/L</th>
                  <th className="border border-border p-3 text-left">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">mol per cubic meter</td>
                  <td className="border border-border p-3">mol/m³</td>
                  <td className="border border-border p-3">0.001</td>
                  <td className="border border-border p-3">SI unit, engineering</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">mol per liter</td>
                  <td className="border border-border p-3">mol/L, M</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">General chemistry</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">millimol per liter</td>
                  <td className="border border-border p-3">mmol/L, mM</td>
                  <td className="border border-border p-3">0.001</td>
                  <td className="border border-border p-3">Biochemistry, clinical</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">micromol per liter</td>
                  <td className="border border-border p-3">μmol/L, μM</td>
                  <td className="border border-border p-3">10⁻⁶</td>
                  <td className="border border-border p-3">Enzyme kinetics, drugs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">nanomol per liter</td>
                  <td className="border border-border p-3">nmol/L, nM</td>
                  <td className="border border-border p-3">10⁻⁹</td>
                  <td className="border border-border p-3">Hormones, receptors</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">kilomol per cubic meter</td>
                  <td className="border border-border p-3">kmol/m³</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">Chemical engineering</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">mol per cubic centimeter</td>
                  <td className="border border-border p-3">mol/cm³</td>
                  <td className="border border-border p-3">1,000,000</td>
                  <td className="border border-border p-3">High concentration systems</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">pound-mol per cubic foot</td>
                  <td className="border border-border p-3">lbmol/ft³</td>
                  <td className="border border-border p-3">16.018</td>
                  <td className="border border-border p-3">US chemical industry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typical Concentrations in Biology and Chemistry</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Substance</th>
                  <th className="border border-border p-3 text-left">Typical Concentration</th>
                  <th className="border border-border p-3 text-left">Context</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Blood glucose</td>
                  <td className="border border-border p-3">4 to 6 mmol/L</td>
                  <td className="border border-border p-3">Fasting human blood</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Blood sodium</td>
                  <td className="border border-border p-3">135 to 145 mmol/L</td>
                  <td className="border border-border p-3">Normal range</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Blood potassium</td>
                  <td className="border border-border p-3">3.5 to 5.0 mmol/L</td>
                  <td className="border border-border p-3">Normal range</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">PBS buffer</td>
                  <td className="border border-border p-3">10 mM phosphate</td>
                  <td className="border border-border p-3">Cell culture</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Tris buffer</td>
                  <td className="border border-border p-3">10 to 100 mM</td>
                  <td className="border border-border p-3">Molecular biology</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SDS-PAGE running buffer</td>
                  <td className="border border-border p-3">25 mM Tris, 192 mM glycine</td>
                  <td className="border border-border p-3">Protein electrophoresis</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Enzyme Km values</td>
                  <td className="border border-border p-3">0.001 to 10 mM</td>
                  <td className="border border-border p-3">Michaelis constant</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Drug IC50 values</td>
                  <td className="border border-border p-3">1 nM to 100 μM</td>
                  <td className="border border-border p-3">Pharmacology</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Concentrated HCl</td>
                  <td className="border border-border p-3">12 M</td>
                  <td className="border border-border p-3">Laboratory reagent</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Concentrated H2SO4</td>
                  <td className="border border-border p-3">18 M</td>
                  <td className="border border-border p-3">Laboratory reagent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between molar concentration units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 mol/L = 1000 mmol/L = 1,000,000 μmol/L</li>
            <li>1 mol/L = 1000 mol/m³</li>
            <li>1 mol/L = 0.001 mol/cm³</li>
            <li>1 mol/L = 16.018 lbmol/ft³</li>
            <li>1 kmol/m³ = 1 mol/L</li>
            <li>1 μM = 0.001 mM = 10⁻⁶ M</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Molar Concentration</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Preparing buffer solutions for biochemical experiments</li>
            <li>Calculating reaction stoichiometry in chemistry</li>
            <li>Expressing drug concentrations in pharmacology</li>
            <li>Reporting clinical laboratory results</li>
            <li>Describing enzyme kinetics parameters (Km, Vmax)</li>
            <li>Water quality analysis and environmental monitoring</li>
            <li>Chemical process design and control</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between M and mol/L?</h3>
            <p className="text-muted-foreground">
              M (molar) and mol/L are equivalent units. The capital M is shorthand notation for mol/L. A 1 M solution contains 1 mole of solute per liter of solution. Both notations are acceptable, though mol/L is preferred in formal scientific writing to avoid confusion with the symbol M for molar mass.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I convert mg/L to mmol/L?</h3>
            <p className="text-muted-foreground">
              Divide the concentration in mg/L by the molecular weight in mg/mmol (numerically equal to g/mol). For example, glucose (MW = 180 g/mol) at 90 mg/L equals 90 / 180 = 0.5 mmol/L. This conversion requires knowing the molecular weight of the specific substance.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why use millimolar instead of molar for biological solutions?</h3>
            <p className="text-muted-foreground">
              Biological molecules typically function at millimolar to micromolar concentrations. Blood glucose at 5 mM is easier to write and comprehend than 0.005 M. Enzyme concentrations in cells range from nanomolar to micromolar. Using appropriate prefixes avoids excessive decimal places and reduces errors.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Does temperature affect molar concentration?</h3>
            <p className="text-muted-foreground">
              Yes, because molarity is based on solution volume, which changes with temperature due to thermal expansion. A 1 M solution at 20°C will have slightly lower molarity at 30°C because the volume increases. For precise work, specify the temperature or use molality (mol/kg solvent) which is temperature-independent.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
