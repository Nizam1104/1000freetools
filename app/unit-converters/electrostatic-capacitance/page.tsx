"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectrostaticCapacitancePage() {
  const config = converterMappings["Electrostatic Capacitance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electrostatic Capacitance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Capacitance Converter</h1>
        <p className="text-muted-foreground">Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Capacitance Converter"
        description="Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
