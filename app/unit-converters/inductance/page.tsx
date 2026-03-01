"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function InductancePage() {
  const config = converterMappings["Inductance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Inductance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Inductance Converter</h1>
        <p className="text-muted-foreground">Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design.</p>
      </div>
      <UnitConverterBase
        title="Inductance Converter"
        description="Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
