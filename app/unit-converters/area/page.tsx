"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AreaPage() {
  const config = converterMappings["Area"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Area"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Area Converter</h1>
        <p className="text-muted-foreground">Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction.</p>
      </div>
      <UnitConverterBase
        title="Area Converter"
        description="Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
