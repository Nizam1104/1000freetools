"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ChargePage() {
  const config = converterMappings["Charge"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Charge"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Charge Converter</h1>
        <p className="text-muted-foreground">Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics.</p>
      </div>
      <UnitConverterBase
        title="Electric Charge Converter"
        description="Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
