"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CurrentPage() {
  const config = converterMappings["Current"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Current"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Current Converter</h1>
        <p className="text-muted-foreground">Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design.</p>
      </div>
      <UnitConverterBase
        title="Electric Current Converter"
        description="Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
