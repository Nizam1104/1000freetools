"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ViscosityKinematicPage() {
  const config = converterMappings["Viscosity - Kinematic"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Viscosity - Kinematic"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Kinematic Viscosity Converter</h1>
        <p className="text-muted-foreground">Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems.</p>
      </div>
      <UnitConverterBase
        title="Kinematic Viscosity Converter"
        description="Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
