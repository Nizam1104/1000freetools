"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MomentofForcePage() {
  const config = converterMappings["Moment of Force"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Moment of Force"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Moment of Force Converter</h1>
        <p className="text-muted-foreground">Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations.</p>
      </div>
      <UnitConverterBase
        title="Moment of Force Converter"
        description="Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
