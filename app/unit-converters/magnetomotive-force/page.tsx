"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MagnetomotiveForcePage() {
  const config = converterMappings["Magnetomotive Force"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Magnetomotive Force"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Magnetomotive Force Converter</h1>
        <p className="text-muted-foreground">Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design and electromagnetic engineering.</p>
      </div>
      <UnitConverterBase
        title="Magnetomotive Force Converter"
        description="Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design and electromagnetic engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Magnetomotive Force</h2>
          <p className="text-muted-foreground mb-4">
            Magnetomotive force (MMF) drives magnetic flux through magnetic circuits. You express MMF in ampere-turns (A·t), representing current times number of coil turns. MMF is the magnetic equivalent of electromotive force (voltage).
          </p>
          <p className="text-muted-foreground mb-4">
            MMF creates magnetic field strength in a circuit. Higher MMF produces more flux, limited by core saturation. Transformers, motors, and relays all rely on MMF for operation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetomotive Force Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">F = N × I</p>
            <p className="text-muted-foreground text-sm">
              Definition: MMF equals number of turns times current in amperes. F represents magnetomotive force in ampere-turns.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">F = Φ × R</p>
            <p className="text-muted-foreground text-sm">
              Hopkinson's Law: MMF equals flux times reluctance. This is the magnetic equivalent of Ohm's law.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">F = H × l</p>
            <p className="text-muted-foreground text-sm">
              Field relationship: MMF equals magnetic field strength times magnetic path length.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A relay coil with 1,000 turns carrying 50 mA produces F = 1,000 × 0.05 = 50 ampere-turns of MMF.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common MMF Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Ampere-turns (A·t)</th>
                  <th className="border border-border p-2 text-left">Kiloampere-turns (kA·t)</th>
                  <th className="border border-border p-2 text-left">Gilberts (Gi)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.7958</td>
                  <td className="border border-border p-2">0.0007958</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1.257</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">12.57</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">125.7</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,257</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Circuit Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Electrical</th>
                  <th className="border border-border p-2 text-left">Magnetic</th>
                  <th className="border border-border p-2 text-left">Relationship</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">EMF (V)</td>
                  <td className="border border-border p-2">MMF (A·t)</td>
                  <td className="border border-border p-2">Driving force</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Current (A)</td>
                  <td className="border border-border p-2">Flux (Wb)</td>
                  <td className="border border-border p-2">Flow quantity</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Resistance (Ω)</td>
                  <td className="border border-border p-2">Reluctance (A·t/Wb)</td>
                  <td className="border border-border p-2">Opposition</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Conductivity (S/m)</td>
                  <td className="border border-border p-2">Permeability (H/m)</td>
                  <td className="border border-border p-2">Material property</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Relay and Contactor Design</h3>
              <p className="text-muted-foreground text-sm">
                MMF determines pull-in force. Typical relays require 50-500 A·t. Holding MMF is lower than pull-in MMF. Air gap size affects required MMF significantly.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Transformer Excitation</h3>
              <p className="text-muted-foreground text-sm">
                Magnetizing current creates MMF to establish core flux. No-load current is 2-5 percent of rated current. Core material and geometry determine excitation requirements.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electromagnet Lifting</h3>
              <p className="text-muted-foreground text-sm">
                Lifting capacity depends on MMF and air gap. Scrap handling magnets use 5,000-20,000 A·t. DC excitation provides constant holding force.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Magnetic Amplifiers</h3>
              <p className="text-muted-foreground text-sm">
                Control winding MMF modulates core saturation. Small control MMF regulates large load current. Used in high-reliability power control applications.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between MMF and EMF?</h3>
              <p className="text-muted-foreground text-sm">
                EMF (electromotive force) drives electric current in electrical circuits. MMF (magnetomotive force) drives magnetic flux in magnetic circuits. Both represent driving potential.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a gilbert?</h3>
              <p className="text-muted-foreground text-sm">
                Gilbert is the CGS unit of magnetomotive force. One gilbert equals 0.7958 ampere-turns. The unit honors William Gilbert, pioneer in magnetism research.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does air gap affect MMF requirements?</h3>
              <p className="text-muted-foreground text-sm">
                Air has much higher reluctance than iron. Most MMF drops across air gaps. Doubling gap length approximately doubles required MMF for same flux.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate reluctance?</h3>
              <p className="text-muted-foreground text-sm">
                Reluctance equals path length divided by permeability times area. R = l / (μ × A). Total reluctance sums series reluctances like resistances.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
