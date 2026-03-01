"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AnglePage() {
  const config = converterMappings["Angle"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Angle"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Angle Converter</h1>
        <p className="text-muted-foreground">Convert angle units including degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry, trigonometry, and engineering.</p>
      </div>
      <UnitConverterBase
        title="Angle Converter"
        description="Convert angle units including degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry, trigonometry, and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
