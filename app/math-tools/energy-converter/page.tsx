"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3600000,
  btu: 1055.06,
  footPound: 1.35582,
  electronVolt: 1.60218e-19,
  therm: 105506000,
  quad: 1.055e18,
};

const unitLabels: Record<string, string> = {
  joule: "Joules (J)",
  kilojoule: "Kilojoules (kJ)",
  calorie: "Calories (cal)",
  kilocalorie: "Kilocalories (kcal/Calories)",
  wattHour: "Watt-hours (Wh)",
  kilowattHour: "Kilowatt-hours (kWh)",
  btu: "British Thermal Units (BTU)",
  footPound: "Foot-pounds (ft-lb)",
  electronVolt: "Electron volts (eV)",
  therm: "Therms",
  quad: "Quads",
};

export default function EnergyConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("joule");
  const [toUnit, setToUnit] = useState("kilojoule");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const joules = val * units[fromUnit];
    const converted = joules / units[toUnit];
    setResult(converted);
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (value) {
      const val = parseFloat(value);
      if (!isNaN(val)) {
        const joules = val * units[toUnit];
        const converted = joules / units[fromUnit];
        setResult(converted);
      }
    }
  };

  const loadExample = (val: string, from: string, to: string) => {
    setValue(val);
    setFromUnit(from);
    setToUnit(to);
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(8)).toString();
  };

  const getUnitSymbol = (unit: string): string => {
    const symbols: Record<string, string> = {
      joule: "J",
      kilojoule: "kJ",
      calorie: "cal",
      kilocalorie: "kcal",
      wattHour: "Wh",
      kilowattHour: "kWh",
      btu: "BTU",
      footPound: "ft-lb",
      electronVolt: "eV",
      therm: "therm",
      quad: "quad",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Energy Converter – Convert Joules, Calories, kWh Online</h1>
        <p className="text-muted-foreground">
          Convert between any energy unit with our free online energy converter. Supports joules, calories, kilocalories, kilowatt-hours, BTU, electron volts, and more for science, engineering, and nutrition calculations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); setResult(null); }}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swap} className="w-12 h-10 p-0">⇄</Button>
          </div>

          <div className="md:col-span-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg min-h-[42px] flex items-center">
                {result !== null ? `${round(result)} ${getUnitSymbol(toUnit)}` : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("1", "kilowattHour", "joule")}>1 kWh to J</Button>
          <Button variant="outline" onClick={() => loadExample("100", "calorie", "joule")}>100 cal to J</Button>
          <Button variant="outline" onClick={() => loadExample("1", "btu", "joule")}>1 BTU to J</Button>
          <Button variant="outline" onClick={() => loadExample("2000", "kilocalorie", "kilojoule")}>2000 kcal to kJ</Button>
          <Button variant="outline" onClick={() => loadExample("1", "joule", "electronVolt")}>1 J to eV</Button>
          <Button variant="outline" onClick={() => loadExample("1", "therm", "kilowattHour")}>1 therm to kWh</Button>
        </div>

        {result !== null && value && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Conversion Result</h4>
              <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
                {value} {getUnitSymbol(fromUnit)} = {round(result)} {getUnitSymbol(toUnit)}
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">In Joules (Base Unit)</h4>
              <p className="text-2xl font-mono">{round(parseFloat(value) * units[fromUnit])} J</p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Energy Units</h2>
        <p className="text-muted-foreground">
          Energy comes in many forms and is measured in many units. The joule is the SI unit, defined as the work done by a force of one newton moving an object one meter. But different fields use different units based on what makes sense for their applications.
        </p>
        <p className="text-muted-foreground">
          Nutrition uses Calories (kilocalories). Electricity uses kilowatt-hours. Heating uses BTUs. Physics uses electron volts for atomic-scale energy. Understanding how to convert between them is essential for comparing energy across contexts – like figuring out how many calories in a snack equals the energy to charge your phone.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Energy Units Explained</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">SI Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Joule (J):</strong> Base SI unit. Work done by 1N over 1m.</div>
              <div><strong>Kilojoule (kJ):</strong> 1,000 joules. Used in nutrition outside the US.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Nutrition Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Calorie (cal):</strong> Energy to heat 1g water by 1°C.</div>
              <div><strong>Kilocalorie (kcal):</strong> 1,000 calories = 1 food Calorie (capital C).</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Electrical Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Watt-hour (Wh):</strong> Energy of 1 watt for 1 hour.</div>
              <div><strong>Kilowatt-hour (kWh):</strong> 3.6 million joules. What your electric bill uses.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Heating Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>BTU:</strong> British Thermal Unit. Heat to raise 1lb water by 1°F.</div>
              <div><strong>Therm:</strong> 100,000 BTU. Natural gas billing unit.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Scientific Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Electron volt (eV):</strong> Energy gained by electron across 1 volt. Tiny unit for atomic physics.</div>
              <div><strong>Foot-pound:</strong> Imperial unit. Work of 1lb force over 1 foot.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Large Scale Units</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Quad:</strong> 10¹⁵ BTU. Used for national energy consumption.</div>
              <div><strong>1 quad = 1.055 exajoules</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 1 kWh to Joules</h4>
            <div className="text-sm space-y-2">
              <p>From: 1 kilowatt-hour</p>
              <p>To: Joules</p>
              <p>Result: 3,600,000 J (3.6 MJ)</p>
              <p className="text-muted-foreground">One kWh is the energy of a 1000W appliance running for 1 hour. That's 3.6 million joules – enough to lift a car about 360 meters.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 100 Calories to Joules</h4>
            <div className="text-sm space-y-2">
              <p>From: 100 calories (small c)</p>
              <p>To: Joules</p>
              <p>Result: 418.4 J</p>
              <p className="text-muted-foreground">Note: Food labels use Calories (kcal). 100 food Calories = 100,000 cal = 418,400 J. That's the energy in about 1/4 of a banana.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 1 BTU to Joules</h4>
            <div className="text-sm space-y-2">
              <p>From: 1 BTU</p>
              <p>To: Joules</p>
              <p>Result: 1,055.06 J</p>
              <p className="text-muted-foreground">A typical window AC unit is rated in BTUs. A 10,000 BTU unit removes about 10.5 million joules of heat per hour.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Daily Calorie Intake to Kilojoules</h4>
            <div className="text-sm space-y-2">
              <p>From: 2000 kilocalories (food Calories)</p>
              <p>To: Kilojoules</p>
              <p>Result: 8,368 kJ</p>
              <p className="text-muted-foreground">The recommended 2000 Cal/day diet equals about 8,368 kJ. Australia and other countries list energy in kJ on food labels.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: 1 Joule to Electron Volts</h4>
            <div className="text-sm space-y-2">
              <p>From: 1 joule</p>
              <p>To: Electron volts</p>
              <p>Result: 6.242 × 10¹⁸ eV</p>
              <p className="text-muted-foreground">The electron volt is tiny – it takes over 6 quintillion eV to make 1 joule. Particle physicists use eV because atomic energies are so small.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: 1 Therm to kWh</h4>
            <div className="text-sm space-y-2">
              <p>From: 1 therm</p>
              <p>To: Kilowatt-hours</p>
              <p>Result: 29.3 kWh</p>
              <p className="text-muted-foreground">Natural gas is billed in therms. One therm equals about 29 kWh – enough to power an average home for a day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The Calorie on food labels is actually a kilocalorie.</strong> When a candy bar says "250 Calories," it means 250 kilocalories or 250,000 calories (small c). This convention started in the early 1900s to avoid writing large numbers. The capital C distinguishes food Calories from scientific calories.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between calorie and Calorie?</h4>
            <p className="text-sm text-muted-foreground">
              A calorie (lowercase c) is the energy to heat 1 gram of water by 1°C. A Calorie (uppercase C, also called kilocalorie) is 1,000 calories. Food labels use Calories. 1 Cal = 1 kcal = 4,184 J.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do electric bills use kWh instead of joules?</h4>
            <p className="text-sm text-muted-foreground">
              Kilowatt-hours are more practical for household energy. One joule is tiny – a 100W bulb uses 100 joules every second. kWh gives manageable numbers: that same bulb uses 0.1 kWh per hour.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much energy is in a gallon of gasoline?</h4>
            <p className="text-sm text-muted-foreground">
              About 120-125 million joules (120 MJ) or 33 kWh. That's roughly 1,300 food Calories per gallon. A typical car gets 25-30 miles per gallon, so each mile costs about 4-5 Calories of gasoline energy.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a quad used for?</h4>
            <p className="text-sm text-muted-foreground">
              Quads measure national or global energy consumption. The US uses about 100 quads per year. One quad equals 1 quadrillion (10¹⁵) BTU or about 293 terawatt-hours.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do physicists use electron volts?</h4>
            <p className="text-sm text-muted-foreground">
              Atomic and particle energies are tiny in joules. An electron accelerated through 1 volt gains 1 eV = 1.6 × 10⁻¹⁹ J. Using eV avoids writing lots of zeros. Particle masses are even given in eV/c².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I compare energy costs across fuels?</h4>
            <p className="text-sm text-muted-foreground">
              Convert everything to the same unit (like kWh or MJ), then divide price by energy content. Natural gas is often cheapest per unit energy, followed by electricity, then gasoline.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
