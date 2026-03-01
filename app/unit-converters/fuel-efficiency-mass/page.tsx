"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FuelEfficiencyMassPage() {
  const config = converterMappings["Fuel Efficiency - Mass"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fuel Efficiency - Mass"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fuel Efficiency by Mass Converter</h1>
        <p className="text-muted-foreground">Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles.</p>
      </div>
      <UnitConverterBase
        title="Fuel Efficiency by Mass Converter"
        description="Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
