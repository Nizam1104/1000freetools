"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AccelerationAngularPage() {
  const config = converterMappings["Acceleration - Angular"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Acceleration - Angular"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Angular Acceleration Converter</h1>
        <p className="text-muted-foreground">Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering.</p>
      </div>
      <UnitConverterBase
        title="Angular Acceleration Converter"
        description="Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Angular Acceleration</h2>
          <p className="text-muted-foreground mb-4">
            Angular acceleration measures the rate of change of angular velocity. You express it in radians per second squared (rad/s²). One rad/s² means angular velocity increases by one radian per second every second.
          </p>
          <p className="text-muted-foreground mb-4">
            Angular acceleration is the rotational equivalent of linear acceleration. Positive angular acceleration increases rotational speed. Negative angular acceleration (angular deceleration) decreases rotational speed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Angular Acceleration Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">α = Δω / Δt</p>
            <p className="text-muted-foreground text-sm">
              Definition: Angular acceleration equals change in angular velocity divided by change in time. Alpha (α) represents angular acceleration.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">τ = I × α</p>
            <p className="text-muted-foreground text-sm">
              Rotational Newton's Law: Torque equals moment of inertia times angular acceleration. Analogous to F = m × a.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ω² = ω₀² + 2 × α × θ</p>
            <p className="text-muted-foreground text-sm">
              Rotational kinematic: Final angular velocity squared equals initial squared plus 2 times angular acceleration times angular displacement.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A motor accelerating from 0 to 3,000 RPM (314 rad/s) in 2 seconds has α = 314 / 2 = 157 rad/s².
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Angular Acceleration Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">rad/s²</th>
                  <th className="border border-border p-2 text-left">deg/s²</th>
                  <th className="border border-border p-2 text-left">rev/min²</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.000291</td>
                  <td className="border border-border p-2">0.0167</td>
                  <td className="border border-border p-2">0.167</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.0175</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.105</td>
                  <td className="border border-border p-2">6</td>
                  <td className="border border-border p-2">60</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">57.3</td>
                  <td className="border border-border p-2">573</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">573</td>
                  <td className="border border-border p-2">5,730</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Angular Acceleration Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">Angular Acceleration (rad/s²)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Earth Rotation Change</td>
                  <td className="border border-border p-2">~0</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ceiling Fan Start</td>
                  <td className="border border-border p-2">1-5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Car Engine Acceleration</td>
                  <td className="border border-border p-2">50-200</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Electric Motor Start</td>
                  <td className="border border-border p-2">100-500</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hard Disk Spin-up</td>
                  <td className="border border-border p-2">200-1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">High-Performance Servo</td>
                  <td className="border border-border p-2">1,000-10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Motor Control</h3>
              <p className="text-muted-foreground text-sm">
                Servo motors specify maximum angular acceleration. Higher acceleration enables faster positioning. Acceleration limits prevent mechanical stress and overshoot.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Robotics</h3>
              <p className="text-muted-foreground text-sm">
                Robot joints require precise angular acceleration control. Trajectory planning specifies acceleration profiles. Smooth acceleration reduces vibration and wear.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Vehicle Dynamics</h3>
              <p className="text-muted-foreground text-sm">
                Engine angular acceleration affects vehicle response. Transmission shifts manage acceleration transitions. Electric vehicles provide instant torque and high acceleration.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Flywheel Energy Storage</h3>
              <p className="text-muted-foreground text-sm">
                Flywheels store energy as rotational kinetic energy. Charging requires angular acceleration. Discharging produces angular deceleration. High-speed flywheels reach 50,000+ RPM.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do you calculate angular acceleration from torque?</h3>
              <p className="text-muted-foreground text-sm">
                Use α = τ / I where τ is torque and I is moment of inertia. Higher torque produces more acceleration. Larger inertia resists acceleration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is moment of inertia?</h3>
              <p className="text-muted-foreground text-sm">
                Moment of inertia measures resistance to angular acceleration. Depends on mass distribution relative to rotation axis. Analogous to mass in linear motion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does angular acceleration relate to tangential acceleration?</h3>
              <p className="text-muted-foreground text-sm">
                Tangential acceleration equals angular acceleration times radius. a_t = α × r. Points farther from axis experience more tangential acceleration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What limits angular acceleration in motors?</h3>
              <p className="text-muted-foreground text-sm">
                Current limits restrict torque production. Mechanical strength limits shaft torque. Load inertia affects achievable acceleration. Control bandwidth limits response speed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
