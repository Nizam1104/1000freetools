"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function EnergyPage() {
  const config = converterMappings["Energy"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Energy"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Energy Converter</h1>
        <p className="text-muted-foreground">Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs.</p>
      </div>
      <UnitConverterBase
        title="Energy Converter"
        description="Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
