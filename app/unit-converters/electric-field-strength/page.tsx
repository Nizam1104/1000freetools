"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricFieldStrengthPage() {
  const config = converterMappings["Electric Field Strength"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Field Strength"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Field Strength Converter</h1>
        <p className="text-muted-foreground">Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility.</p>
      </div>
      <UnitConverterBase
        title="Electric Field Strength Converter"
        description="Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
