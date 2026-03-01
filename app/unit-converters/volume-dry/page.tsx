"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VolumeDryPage() {
  const config = converterMappings["Volume - Dry"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume - Dry"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dry Volume Converter</h1>
        <p className="text-muted-foreground">Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading.</p>
      </div>
      <UnitConverterBase
        title="Dry Volume Converter"
        description="Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
