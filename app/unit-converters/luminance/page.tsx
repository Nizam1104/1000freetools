"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LuminancePage() {
  const config = converterMappings["Luminance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Luminance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Luminance Converter</h1>
        <p className="text-muted-foreground">Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design.</p>
      </div>
      <UnitConverterBase
        title="Luminance Converter"
        description="Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
