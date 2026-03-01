"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SpecificHeatCapacityPage() {
  const config = converterMappings["Specific Heat Capacity"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Specific Heat Capacity"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Specific Heat Capacity Converter</h1>
        <p className="text-muted-foreground">Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online specific heat converter for thermodynamics, chemistry, and material science.</p>
      </div>
      <UnitConverterBase
        title="Specific Heat Capacity Converter"
        description="Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online specific heat converter for thermodynamics, chemistry, and material science."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Specific Heat Capacity</h2>
          <p className="text-muted-foreground mb-4">
            Specific heat capacity measures how much energy you need to raise the temperature of one kilogram of a substance by one kelvin. You express this property in joules per kilogram per kelvin (J/(kg·K)) in SI units. Engineers and scientists use specific heat capacity to calculate energy requirements for heating and cooling processes.
          </p>
          <p className="text-muted-foreground">
            Water has a high specific heat capacity of 4184 J/(kg·K). This property makes water effective for thermal storage and cooling applications. Metals like copper and aluminum have lower values around 385 and 897 J/(kg·K) respectively. These materials heat up and cool down faster than water.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Heat Capacity Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate specific heat capacity using this formula:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">c = Q / (m × ΔT)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where c equals specific heat capacity, Q equals heat energy in joules, m equals mass in kilograms, and ΔT equals temperature change in kelvin.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: You add 10000 joules to heat 2 kg of water by 1.19°C. The calculation gives you:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">c = 10000 J / (2 kg × 1.19 K) = 4202 J/(kg·K)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Specific Heat Capacity Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Substance</th>
                  <th className="border border-border p-2 text-left">J/(kg·K)</th>
                  <th className="border border-border p-2 text-left">cal/(g·°C)</th>
                  <th className="border border-border p-2 text-left">BTU/(lb·°F)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Water (liquid)</td>
                  <td className="border border-border p-2">4184</td>
                  <td className="border border-border p-2">1.00</td>
                  <td className="border border-border p-2">1.00</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Ice</td>
                  <td className="border border-border p-2">2093</td>
                  <td className="border border-border p-2">0.50</td>
                  <td className="border border-border p-2">0.50</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">897</td>
                  <td className="border border-border p-2">0.21</td>
                  <td className="border border-border p-2">0.21</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Copper</td>
                  <td className="border border-border p-2">385</td>
                  <td className="border border-border p-2">0.092</td>
                  <td className="border border-border p-2">0.092</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Iron</td>
                  <td className="border border-border p-2">449</td>
                  <td className="border border-border p-2">0.107</td>
                  <td className="border border-border p-2">0.107</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Lead</td>
                  <td className="border border-border p-2">129</td>
                  <td className="border border-border p-2">0.031</td>
                  <td className="border border-border p-2">0.031</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversion Factors</h2>
          <p className="text-muted-foreground mb-4">
            Use these factors to convert between specific heat capacity units:
          </p>
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
                  <td className="border border-border p-2">J/(kg·K)</td>
                  <td className="border border-border p-2">0.000239</td>
                  <td className="border border-border p-2">cal/(g·°C)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">J/(kg·K)</td>
                  <td className="border border-border p-2">0.000239</td>
                  <td className="border border-border p-2">BTU/(lb·°F)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">cal/(g·°C)</td>
                  <td className="border border-border p-2">4184</td>
                  <td className="border border-border p-2">J/(kg·K)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">BTU/(lb·°F)</td>
                  <td className="border border-border p-2">4186.8</td>
                  <td className="border border-border p-2">J/(kg·K)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kJ/(kg·K)</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">J/(kg·K)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <p className="text-muted-foreground mb-4">
            Engineers use specific heat capacity in HVAC system design. You calculate the energy needed to heat or cool air and water in buildings. Higher specific heat materials store more thermal energy per unit mass.
          </p>
          <p className="text-muted-foreground mb-4">
            Food processors rely on specific heat values for pasteurization and sterilization. You determine heating times and energy costs using these properties. Water content in food affects its overall specific heat capacity.
          </p>
          <p className="text-muted-foreground">
            Automotive engineers select coolant fluids based on specific heat. Ethylene glycol mixtures provide freeze protection while maintaining adequate heat transfer. You balance thermal performance with corrosion protection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why does water have such a high specific heat capacity</h3>
              <p className="text-muted-foreground">
                Water molecules form hydrogen bonds that absorb energy before increasing molecular motion. These bonds must break before temperature rises. This property stabilizes Earth climate and makes water ideal for cooling systems.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert J/(kg·K) to BTU/(lb·°F)</h3>
              <p className="text-muted-foreground">
                Multiply the value in J/(kg·K) by 0.000239 to get BTU/(lb·°F). For example, 4184 J/(kg·K) equals 1.0 BTU/(lb·°F). The conversion accounts for differences in energy, mass, and temperature units.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between specific heat and heat capacity</h3>
              <p className="text-muted-foreground">
                Specific heat capacity is an intensive property per unit mass. Heat capacity is an extensive property for a specific object. You multiply specific heat by mass to get total heat capacity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does specific heat change with temperature</h3>
              <p className="text-muted-foreground">
                Yes, specific heat varies with temperature for most substances. Water changes from 4184 J/(kg·K) at 20°C to 4217 J/(kg·K) at 0°C. Engineers use average values for practical calculations over limited temperature ranges.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
