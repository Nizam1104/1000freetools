"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FlowMolarPage() {
  const config = converterMappings["Flow - Molar"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Flow - Molar"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Molar Flow Rate Converter</h1>
        <p className="text-muted-foreground">Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering, reaction kinetics, and process design.</p>
      </div>
      <UnitConverterBase
        title="Molar Flow Rate Converter"
        description="Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering, reaction kinetics, and process design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Molar Flow Rate</h2>
          <p className="text-muted-foreground mb-4">
            Molar flow rate measures amount of substance passing through a cross-section per unit time. You express this property in moles per second (mol/s) in SI units. Common units include kmol/h, mol/min, and lbmol/h.
          </p>
          <p className="text-muted-foreground">
            Chemical engineers use molar flow for reaction stoichiometry and material balances. Molar basis simplifies calculations because reactions occur in mole ratios. Gas processing plants track molar flow for separation efficiency.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Molar Flow Rate Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Calculate molar flow rate from mass flow and molecular weight:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ṅ = ṁ / M</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where ṅ equals molar flow rate, ṁ equals mass flow rate, and M equals molecular weight.
          </p>
          <p className="text-muted-foreground mb-4">
            For ideal gases, calculate from volumetric flow:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ṅ = P × Q / (R × T)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where P equals pressure, Q equals volumetric flow, R equals gas constant, and T equals absolute temperature.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: Methane (M = 16 g/mol) flows at 100 kg/h:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ṅ = 100,000 g/h / 16 g/mol = 6250 mol/h = 6.25 kmol/h</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Molecular Weights</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Substance</th>
                  <th className="border border-border p-2 text-left">Formula</th>
                  <th className="border border-border p-2 text-left">Molecular Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Hydrogen</td>
                  <td className="border border-border p-2">H₂</td>
                  <td className="border border-border p-2">2.016 g/mol</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Oxygen</td>
                  <td className="border border-border p-2">O₂</td>
                  <td className="border border-border p-2">32.00 g/mol</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Nitrogen</td>
                  <td className="border border-border p-2">N₂</td>
                  <td className="border border-border p-2">28.01 g/mol</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Methane</td>
                  <td className="border border-border p-2">CH₄</td>
                  <td className="border border-border p-2">16.04 g/mol</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Carbon dioxide</td>
                  <td className="border border-border p-2">CO₂</td>
                  <td className="border border-border p-2">44.01 g/mol</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Water</td>
                  <td className="border border-border p-2">H₂O</td>
                  <td className="border border-border p-2">18.02 g/mol</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ammonia</td>
                  <td className="border border-border p-2">NH₃</td>
                  <td className="border border-border p-2">17.03 g/mol</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Ethanol</td>
                  <td className="border border-border p-2">C₂H₅OH</td>
                  <td className="border border-border p-2">46.07 g/mol</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications in Chemical Engineering</h2>
          <p className="text-muted-foreground mb-4">
            Reaction engineering uses molar flow for rate calculations. You write material balances in moles for stoichiometric consistency. Conversion and yield calculations use molar flow ratios.
          </p>
          <p className="text-muted-foreground mb-4">
            Distillation columns separate components based on vapor-liquid equilibrium. Molar flow rates determine tray sizing and reflux ratios. You track component molar flows through the column.
          </p>
          <p className="text-muted-foreground">
            Combustion calculations use molar flow for air-fuel ratios. Stoichiometric combustion of methane requires 2 moles oxygen per mole methane. Excess air calculations use molar basis.
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
                  <td className="border border-border p-2">mol/s</td>
                  <td className="border border-border p-2">3600</td>
                  <td className="border border-border p-2">mol/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">mol/s</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">kmol/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kmol/h</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">mol/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">lbmol/h</td>
                  <td className="border border-border p-2">453.59</td>
                  <td className="border border-border p-2">mol/h</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">mol/min</td>
                  <td className="border border-border p-2">60</td>
                  <td className="border border-border p-2">mol/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">kmol/h</td>
                  <td className="border border-border p-2">2.205</td>
                  <td className="border border-border p-2">lbmol/h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between mol and lbmol</h3>
              <p className="text-muted-foreground">
                One lbmol equals 453.59 mol (one pound-mole). The lbmol contains Avogadro number of molecules per pound molecular weight. US chemical plants often use lbmol while SI systems use mol or kmol.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate molar flow for gas mixtures</h3>
              <p className="text-muted-foreground">
                Use average molecular weight of the mixture. Multiply mole fractions by component molecular weights and sum. Total molar flow equals mass flow divided by average molecular weight.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why use kmol instead of mol in industry</h3>
              <p className="text-muted-foreground">
                Industrial flows are large. Using kmol (1000 mol) gives manageable numbers. One kmol of ideal gas occupies 22.4 m³ at STP. Process equipment sizing uses kmol/h routinely.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does pressure affect molar flow measurement</h3>
              <p className="text-muted-foreground">
                Molar flow meters measure actual molecule count, unaffected by pressure. Volumetric meters require pressure correction. Higher pressure compresses gas, reducing volume for same molar flow.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
