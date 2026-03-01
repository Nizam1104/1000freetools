"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FlowPage() {
  const config = converterMappings["Flow"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Flow"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volumetric Flow Rate Converter</h1>
        <p className="text-muted-foreground">Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering.</p>
      </div>
      <UnitConverterBase
        title="Volumetric Flow Rate Converter"
        description="Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
