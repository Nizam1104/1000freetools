"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MomentofInertiaPage() {
  const config = converterMappings["Moment of Inertia"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Moment of Inertia"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Moment of Inertia Converter</h1>
        <p className="text-muted-foreground">Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics.</p>
      </div>
      <UnitConverterBase
        title="Moment of Inertia Converter"
        description="Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
