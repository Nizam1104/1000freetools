"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LengthPage() {
  const config = converterMappings["Length"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Length"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Length Converter</h1>
        <p className="text-muted-foreground">Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.</p>
      </div>
      <UnitConverterBase
        title="Length Converter"
        description="Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
