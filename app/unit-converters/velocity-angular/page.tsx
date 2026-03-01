"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VelocityAngularPage() {
  const config = converterMappings["Velocity - Angular"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Velocity - Angular"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Angular Velocity Converter</h1>
        <p className="text-muted-foreground">Convert angular velocity units — radians per second, degrees per second, RPM, and more. Free online angular velocity converter for physics, mechanics, and engineering.</p>
      </div>
      <UnitConverterBase
        title="Angular Velocity Converter"
        description="Convert angular velocity units — radians per second, degrees per second, RPM, and more. Free online angular velocity converter for physics, mechanics, and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Angular Velocity</h2>
          <p className="text-muted-foreground mb-4">
            Angular velocity measures how fast an object rotates or revolves. You express it in radians per second (rad/s), degrees per second, or revolutions per minute (RPM). Angular velocity describes rotational motion analogous to linear velocity.
          </p>
          <p className="text-muted-foreground mb-4">
            Angular velocity is a vector quantity with direction along the rotation axis. Right-hand rule determines direction: curl fingers in rotation direction, thumb points along angular velocity vector.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Angular Velocity Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ω = Δθ / Δt</p>
            <p className="text-muted-foreground text-sm">
              Definition: Angular velocity equals change in angle divided by change in time. Omega (ω) represents angular velocity.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">v = ω × r</p>
            <p className="text-muted-foreground text-sm">
              Linear velocity: Tangential velocity equals angular velocity times radius. Connects rotational and linear motion.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ω = 2 × π × f</p>
            <p className="text-muted-foreground text-sm">
              Frequency relationship: Angular velocity equals 2π times frequency in Hz. One revolution equals 2π radians.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A motor spinning at 3,000 RPM has ω = 3,000 × 2π / 60 = 314 rad/s.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Angular Velocity Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">rad/s</th>
                  <th className="border border-border p-2 text-left">deg/s</th>
                  <th className="border border-border p-2 text-left">RPM</th>
                  <th className="border border-border p-2 text-left">rad/min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.000291</td>
                  <td className="border border-border p-2">0.0167</td>
                  <td className="border border-border p-2">0.00278</td>
                  <td className="border border-border p-2">0.0175</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.0175</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.167</td>
                  <td className="border border-border p-2">1.05</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.105</td>
                  <td className="border border-border p-2">6</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">6.28</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">57.3</td>
                  <td className="border border-border p-2">9.55</td>
                  <td className="border border-border p-2">60</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">104.7</td>
                  <td className="border border-border p-2">6,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">6,283</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rotational Speed Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">Speed (RPM)</th>
                  <th className="border border-border p-2 text-left">Speed (rad/s)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Earth Rotation</td>
                  <td className="border border-border p-2">0.0007</td>
                  <td className="border border-border p-2">0.000073</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ceiling Fan</td>
                  <td className="border border-border p-2">100-300</td>
                  <td className="border border-border p-2">10-30</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Car Engine (idle)</td>
                  <td className="border border-border p-2">600-1,000</td>
                  <td className="border border-border p-2">60-100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Car Engine (max)</td>
                  <td className="border border-border p-2">6,000-8,000</td>
                  <td className="border border-border p-2">600-800</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hard Disk Drive</td>
                  <td className="border border-border p-2">5,400-15,000</td>
                  <td className="border border-border p-2">565-1,570</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Dental Drill</td>
                  <td className="border border-border p-2">200,000-400,000</td>
                  <td className="border border-border p-2">20,000-40,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Jet Engine Turbine</td>
                  <td className="border border-border p-2">10,000-20,000</td>
                  <td className="border border-border p-2">1,000-2,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electric Motors</h3>
              <p className="text-muted-foreground text-sm">
                Motor speed ratings specify RPM at rated load. AC induction motors run at synchronous speed minus slip. 4-pole 60 Hz motors run at approximately 1,750 RPM.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Centrifuges</h3>
              <p className="text-muted-foreground text-sm">
                Laboratory centrifuges separate samples by density. Speed ranges 1,000-30,000 RPM. Relative centrifugal force (RCF) depends on both speed and rotor radius.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Gyroscopes</h3>
              <p className="text-muted-foreground text-sm">
                Gyroscopes maintain orientation using high-speed rotors. Navigation gyros spin at 10,000-24,000 RPM. MEMS gyros measure angular velocity for stabilization.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Wind Turbines</h3>
              <p className="text-muted-foreground text-sm">
                Large wind turbines rotate slowly, 10-20 RPM. Gearboxes increase speed to 1,500-1,800 RPM for generators. Tip speed ratio optimizes energy extraction.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do you convert RPM to rad/s?</h3>
              <p className="text-muted-foreground text-sm">
                Multiply RPM by 2π/60 or approximately 0.1047. One revolution equals 2π radians. One minute equals 60 seconds. So rad/s = RPM × 2π / 60.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between angular velocity and angular frequency?</h3>
              <p className="text-muted-foreground text-sm">
                Angular velocity describes physical rotation. Angular frequency describes oscillation in radians per second. Both use rad/s units but represent different phenomena.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure angular velocity?</h3>
              <p className="text-muted-foreground text-sm">
                Tachometers measure RPM directly. Optical encoders count rotations. Gyroscope sensors output angular velocity. Stroboscopes freeze rotating objects for visual measurement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is critical speed?</h3>
              <p className="text-muted-foreground text-sm">
                Critical speed occurs when rotation frequency matches natural frequency. Resonance causes excessive vibration. Rotating machinery must operate below or above critical speeds.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
