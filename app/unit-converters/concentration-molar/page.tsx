"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcentrationMolarPage() {
  const config = converterMappings["Concentration - Molar"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concentration - Molar"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Molar Concentration Converter</h1>
        <p className="text-muted-foreground">Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation.</p>
      </div>
      <UnitConverterBase
        title="Molar Concentration Converter"
        description="Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
