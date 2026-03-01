"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricConductancePage() {
  const config = converterMappings["Electric Conductance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Conductance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Conductance Converter</h1>
        <p className="text-muted-foreground">Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis.</p>
      </div>
      <UnitConverterBase
        title="Electric Conductance Converter"
        description="Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
