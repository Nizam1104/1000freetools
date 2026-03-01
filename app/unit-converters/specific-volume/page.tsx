"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SpecificVolumePage() {
  const config = converterMappings["Specific Volume"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Specific Volume"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Specific Volume Converter</h1>
        <p className="text-muted-foreground">Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics.</p>
      </div>
      <UnitConverterBase
        title="Specific Volume Converter"
        description="Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
