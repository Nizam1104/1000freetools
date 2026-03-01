"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RunningPacetoSpeedConverterPage() {
  const config = converterMappings["Running Pace to Speed Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Running Pace to Speed Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Running Pace to Speed Converter</h1>
        <p className="text-muted-foreground">Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.</p>
      </div>
      <UnitConverterBase
        title="Running Pace to Speed Converter"
        description="Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Running Pace and Speed</h2>
          <p className="text-muted-foreground mb-4">Pace measures time per distance unit. Speed measures distance per time unit. Runners typically use pace (minutes per mile or kilometer). Cyclists and vehicles use speed (miles or kilometers per hour).</p>
          <p className="text-muted-foreground mb-4">Faster running means lower pace numbers and higher speed numbers. A 6-minute mile pace equals 10 mph speed. Understanding both formats helps with training plans and race predictions.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Running Pace Conversions</h2>
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Pace (min/mile)</th>
                  <th className="text-left py-3 px-4 font-medium">Pace (min/km)</th>
                  <th className="text-left py-3 px-4 font-medium">Speed (mph)</th>
                  <th className="text-left py-3 px-4 font-medium">Speed (km/h)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">4:00</td>
                  <td className="py-3 px-4">2:29</td>
                  <td className="py-3 px-4">15.0</td>
                  <td className="py-3 px-4">24.1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5:00</td>
                  <td className="py-3 px-4">3:06</td>
                  <td className="py-3 px-4">12.0</td>
                  <td className="py-3 px-4">19.3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6:00</td>
                  <td className="py-3 px-4">3:44</td>
                  <td className="py-3 px-4">10.0</td>
                  <td className="py-3 px-4">16.1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">7:00</td>
                  <td className="py-3 px-4">4:21</td>
                  <td className="py-3 px-4">8.57</td>
                  <td className="py-3 px-4">13.8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8:00</td>
                  <td className="py-3 px-4">4:58</td>
                  <td className="py-3 px-4">7.5</td>
                  <td className="py-3 px-4">12.1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9:00</td>
                  <td className="py-3 px-4">5:36</td>
                  <td className="py-3 px-4">6.67</td>
                  <td className="py-3 px-4">10.7</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10:00</td>
                  <td className="py-3 px-4">6:13</td>
                  <td className="py-3 px-4">6.0</td>
                  <td className="py-3 px-4">9.7</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">11:00</td>
                  <td className="py-3 px-4">6:50</td>
                  <td className="py-3 px-4">5.45</td>
                  <td className="py-3 px-4">8.8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">12:00</td>
                  <td className="py-3 px-4">7:27</td>
                  <td className="py-3 px-4">5.0</td>
                  <td className="py-3 px-4">8.0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">13:00</td>
                  <td className="py-3 px-4">8:04</td>
                  <td className="py-3 px-4">4.62</td>
                  <td className="py-3 px-4">7.4</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">14:00</td>
                  <td className="py-3 px-4">8:42</td>
                  <td className="py-3 px-4">4.29</td>
                  <td className="py-3 px-4">6.9</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">15:00</td>
                  <td className="py-3 px-4">9:19</td>
                  <td className="py-3 px-4">4.0</td>
                  <td className="py-3 px-4">6.4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pace and Speed Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between pace and speed using these formulas.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Speed (mph) = 60 ÷ Pace (min/mile)</div>
            <div>Speed (km/h) = 60 ÷ Pace (min/km)</div>
            <div>Pace (min/mile) = 60 ÷ Speed (mph)</div>
            <div>Pace (min/km) = 60 ÷ Speed (km/h)</div>
            <div>Pace (min/km) = Pace (min/mile) × 0.621371</div>
            <div>Pace (min/mile) = Pace (min/km) ÷ 0.621371</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 8:00 min/mile pace to speed</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Speed (mph) = 60 ÷ 8 = 7.5 mph
            Speed (km/h) = 7.5 × 1.60934 = 12.07 km/h
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Marathon Pace Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Finish Time</th>
                  <th className="text-left py-3 px-4 font-medium">Pace (min/mile)</th>
                  <th className="text-left py-3 px-4 font-medium">Pace (min/km)</th>
                  <th className="text-left py-3 px-4 font-medium">Speed (mph)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">3:00:00</td>
                  <td className="py-3 px-4">6:52</td>
                  <td className="py-3 px-4">4:16</td>
                  <td className="py-3 px-4">8.73</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3:30:00</td>
                  <td className="py-3 px-4">8:01</td>
                  <td className="py-3 px-4">4:58</td>
                  <td className="py-3 px-4">7.48</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4:00:00</td>
                  <td className="py-3 px-4">9:09</td>
                  <td className="py-3 px-4">5:41</td>
                  <td className="py-3 px-4">6.55</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4:30:00</td>
                  <td className="py-3 px-4">10:18</td>
                  <td className="py-3 px-4">6:24</td>
                  <td className="py-3 px-4">5.82</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5:00:00</td>
                  <td className="py-3 px-4">11:27</td>
                  <td className="py-3 px-4">7:07</td>
                  <td className="py-3 px-4">5.23</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5:30:00</td>
                  <td className="py-3 px-4">12:35</td>
                  <td className="py-3 px-4">7:49</td>
                  <td className="py-3 px-4">4.76</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6:00:00</td>
                  <td className="py-3 px-4">13:44</td>
                  <td className="py-3 px-4">8:32</td>
                  <td className="py-3 px-4">4.37</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Running Training Zones by Pace</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Zone 1 (Recovery): 65-75% max HR, conversational pace</li>
            <li>Zone 2 (Aerobic): 75-85% max HR, comfortable steady pace</li>
            <li>Zone 3 (Tempo): 85-90% max HR, comfortably hard pace</li>
            <li>Zone 4 (Threshold): 90-95% max HR, race pace effort</li>
            <li>Zone 5 (VO2 Max): 95-100% max HR, interval pace</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is a good running pace for beginners?</h3>
              <p className="text-muted-foreground">Beginners typically run 12-15 minute miles (7:30-9:20 min/km). Focus on completing distance rather than speed. Pace improves with consistent training over weeks and months.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I convert between mile and kilometer pace?</h3>
              <p className="text-muted-foreground">Multiply min/mile pace by 0.621371 to get min/km. Divide min/km pace by 0.621371 to get min/mile. An 8:00 min/mile pace equals approximately 4:58 min/km.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What pace do I need for a Boston Marathon qualifying time?</h3>
              <p className="text-muted-foreground">Qualifying times vary by age and gender. For men 18-34, you need 3:00:00 (6:52 min/mile). For women 18-34, you need 3:30:00 (8:01 min/mile). Older age groups have slower qualifying standards.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How can I improve my running pace?</h3>
              <p className="text-muted-foreground">Add interval training at faster than race pace. Include tempo runs at comfortably hard effort. Build aerobic base with easy mileage. Strength training improves running economy and pace sustainability.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
