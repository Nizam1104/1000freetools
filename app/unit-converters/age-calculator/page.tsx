"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AgeCalculatorPage() {
  const config = converterMappings["Age Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Age Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Age Calculator</h1>
        <p className="text-muted-foreground">Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.</p>
      </div>
      <UnitConverterBase
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
