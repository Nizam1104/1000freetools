"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LuminousIntensityPage() {
  const config = converterMappings["Luminous Intensity"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Luminous Intensity"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Luminous Intensity Converter</h1>
        <p className="text-muted-foreground">Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering.</p>
      </div>
      <UnitConverterBase
        title="Luminous Intensity Converter"
        description="Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
