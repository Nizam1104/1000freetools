"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MagneticFluxPage() {
  const config = converterMappings["Magnetic Flux"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Magnetic Flux"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Magnetic Flux Converter</h1>
        <p className="text-muted-foreground">Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis.</p>
      </div>
      <UnitConverterBase
        title="Magnetic Flux Converter"
        description="Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
