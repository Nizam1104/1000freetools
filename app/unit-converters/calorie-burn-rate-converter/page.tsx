"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CalorieBurnRateConverterPage() {
  const config = converterMappings["Calorie Burn Rate Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Calorie Burn Rate Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Calorie Burn Rate Calculator</h1>
        <p className="text-muted-foreground">Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.</p>
      </div>
      <UnitConverterBase
        title="Calorie Burn Rate Calculator"
        description="Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Calorie Burn Calculations</h2>
          <p className="text-muted-foreground mb-4">Calorie burn depends on activity intensity and body weight. MET values measure exercise intensity. One MET equals resting energy expenditure. Higher MET values burn more calories per minute.</p>
          <p className="text-muted-foreground mb-4">Body weight directly affects calorie burn. Heavier people burn more calories doing the same activity. Fitness level and muscle mass also influence total energy expenditure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">MET Values for Common Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Activity</th>
                  <th className="text-left py-3 px-4 font-medium">MET Value</th>
                  <th className="text-left py-3 px-4 font-medium">Calories/Hour (70kg)</th>
                  <th className="text-left py-3 px-4 font-medium">Intensity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Sleeping</td>
                  <td className="py-3 px-4">0.9</td>
                  <td className="py-3 px-4">63</td>
                  <td className="py-3 px-4">Rest</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sitting quietly</td>
                  <td className="py-3 px-4">1.0</td>
                  <td className="py-3 px-4">70</td>
                  <td className="py-3 px-4">Sedentary</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Walking (2 mph)</td>
                  <td className="py-3 px-4">2.5</td>
                  <td className="py-3 px-4">175</td>
                  <td className="py-3 px-4">Light</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Walking (3.5 mph)</td>
                  <td className="py-3 px-4">4.3</td>
                  <td className="py-3 px-4">301</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Walking (4 mph)</td>
                  <td className="py-3 px-4">5.0</td>
                  <td className="py-3 px-4">350</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Jogging (5 mph)</td>
                  <td className="py-3 px-4">8.0</td>
                  <td className="py-3 px-4">560</td>
                  <td className="py-3 px-4">Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Running (6 mph)</td>
                  <td className="py-3 px-4">9.8</td>
                  <td className="py-3 px-4">686</td>
                  <td className="py-3 px-4">Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Running (7.5 mph)</td>
                  <td className="py-3 px-4">11.5</td>
                  <td className="py-3 px-4">805</td>
                  <td className="py-3 px-4">Very Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cycling (leisure)</td>
                  <td className="py-3 px-4">4.0</td>
                  <td className="py-3 px-4">280</td>
                  <td className="py-3 px-4">Light</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cycling (12-14 mph)</td>
                  <td className="py-3 px-4">8.0</td>
                  <td className="py-3 px-4">560</td>
                  <td className="py-3 px-4">Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Swimming (moderate)</td>
                  <td className="py-3 px-4">5.8</td>
                  <td className="py-3 px-4">406</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Swimming (vigorous)</td>
                  <td className="py-3 px-4">9.8</td>
                  <td className="py-3 px-4">686</td>
                  <td className="py-3 px-4">Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Weight training</td>
                  <td className="py-3 px-4">3.5</td>
                  <td className="py-3 px-4">245</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Yoga</td>
                  <td className="py-3 px-4">2.5</td>
                  <td className="py-3 px-4">175</td>
                  <td className="py-3 px-4">Light</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">HIIT training</td>
                  <td className="py-3 px-4">8.0</td>
                  <td className="py-3 px-4">560</td>
                  <td className="py-3 px-4">Vigorous</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Jump rope</td>
                  <td className="py-3 px-4">11.0</td>
                  <td className="py-3 px-4">770</td>
                  <td className="py-3 px-4">Very Vigorous</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Calorie Burn Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate calories burned using MET values and body weight.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Calories/minute = (MET × 3.5 × Weight in kg) ÷ 200</div>
            <div>Calories/hour = Calories/minute × 60</div>
            <div>Total Calories = Calories/minute × Duration in minutes</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating calories burned running at 6 mph (9.8 MET) for 30 minutes at 70 kg</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            (9.8 × 3.5 × 70) ÷ 200 = 12.0 calories/minute
            12.0 × 30 = 360 calories total
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Factors Affecting Calorie Burn</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Body weight directly impacts energy expenditure during activity</li>
            <li>Muscle mass increases resting metabolic rate and calorie burn</li>
            <li>Age affects metabolism with gradual decline after age 30</li>
            <li>Gender influences basal metabolic rate and muscle composition</li>
            <li>Fitness level improves efficiency, potentially reducing calorie burn for same activity</li>
            <li>Environmental conditions like heat and altitude increase energy demands</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How accurate are calorie burn calculations?</h3>
              <p className="text-muted-foreground">MET-based calculations provide estimates within 10-20 percent of actual values. Individual variations in metabolism, fitness, and body composition affect actual burn. Use calculations as guidelines, not exact measurements.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Does body weight affect calories burned?</h3>
              <p className="text-muted-foreground">Yes. Heavier people burn more calories doing the same activity. A 90 kg person burns about 30 percent more calories than a 70 kg person performing identical exercise.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What burns more calories, running or cycling?</h3>
              <p className="text-muted-foreground">Running typically burns more calories per minute than cycling at moderate intensities. Running at 6 mph burns about 686 calories/hour while cycling at 12-14 mph burns about 560 calories/hour for a 70 kg person.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I increase calorie burn during exercise?</h3>
              <p className="text-muted-foreground">Increase intensity, duration, or add resistance. High-intensity interval training maximizes calorie burn. Adding weight or incline increases energy demands. Build muscle mass to boost resting metabolism.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
