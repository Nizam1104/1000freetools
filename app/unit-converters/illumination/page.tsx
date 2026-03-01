"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function IlluminationPage() {
  const config = converterMappings["Illumination"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Illumination"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Illuminance Converter</h1>
        <p className="text-muted-foreground">Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance.</p>
      </div>
      <UnitConverterBase
        title="Illuminance Converter"
        description="Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
