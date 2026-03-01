"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThermalResistancePage() {
  const config = converterMappings["Thermal Resistance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thermal Resistance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thermal Resistance Converter</h1>
        <p className="text-muted-foreground">Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design.</p>
      </div>
      <UnitConverterBase
        title="Thermal Resistance Converter"
        description="Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
