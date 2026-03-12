"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function BMICalculatorPage() {
  const config = converterMappings["BMI Calculator"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "BMI Calculator"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">BMI Calculator — Body Mass Index</h1>
        <p className="text-muted-foreground">Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.</p>
      </div>
      <UnitConverterBase
        title="BMI Calculator — Body Mass Index"
        description="Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">BMI Formula and Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Body Mass Index (BMI) measures body fat based on height and weight. The formula divides weight by height squared, providing a simple screening tool for weight categories.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">BMI Calculation Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Metric: BMI = weight (kg) / height² (m²)</p>
            <p>Imperial: BMI = 703 × weight (lb) / height² (in²)</p>
          </div>

          <p className="text-muted-foreground mb-4">
            The metric formula uses kilograms and meters. The imperial formula includes a conversion factor of 703 to adjust for pounds and inches. Both formulas produce identical BMI values.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <p className="font-semibold mb-2">Calculation Example</p>
            <p className="text-muted-foreground">
              Weight: 70 kg (154 lb)<br />
              Height: 1.75 m (5 ft 9 in)<br />
              BMI = 70 / (1.75 × 1.75) = 22.86<br />
              Result: Normal weight range
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">BMI Categories Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Category</th>
                  <th className="border border-border p-3 text-left">BMI Range</th>
                  <th className="border border-border p-3 text-left">Health Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Underweight</td>
                  <td className="border border-border p-3">Below 18.5</td>
                  <td className="border border-border p-3">Malnutrition, osteoporosis</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Normal Weight</td>
                  <td className="border border-border p-3">18.5 - 24.9</td>
                  <td className="border border-border p-3">Low risk</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Overweight</td>
                  <td className="border border-border p-3">25.0 - 29.9</td>
                  <td className="border border-border p-3">Moderate risk</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Obese Class I</td>
                  <td className="border border-border p-3">30.0 - 34.9</td>
                  <td className="border border-border p-3">High risk</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Obese Class II</td>
                  <td className="border border-border p-3">35.0 - 39.9</td>
                  <td className="border border-border p-3">Very high risk</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Obese Class III</td>
                  <td className="border border-border p-3">40.0 and above</td>
                  <td className="border border-border p-3">Extremely high risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Health Implications of BMI</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Underweight Health Concerns</p>
              <p className="text-muted-foreground">
                BMI below 18.5 may indicate malnutrition or underlying health conditions. Risks include weakened immune system, osteoporosis, fertility issues, and nutrient deficiencies. Consult a healthcare provider for persistent underweight status.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Normal Weight Benefits</p>
              <p className="text-muted-foreground">
                BMI between 18.5 and 24.9 correlates with lowest health risks. People in this range typically have lower rates of heart disease, diabetes, and certain cancers. Maintain through balanced diet and regular exercise.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Overweight and Obesity Risks</p>
              <p className="text-muted-foreground">
                Higher BMI increases risk of type 2 diabetes, heart disease, stroke, certain cancers, sleep apnea, and joint problems. Even modest weight loss of 5-10 percent improves health markers significantly.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">BMI Limitations</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Muscle Mass Consideration</p>
              <p className="text-muted-foreground">
                BMI does not distinguish between muscle and fat. Athletes and bodybuilders may have high BMI despite low body fat. Consider body composition measurements for accurate assessment.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Age and Gender Factors</p>
              <p className="text-muted-foreground">
                Older adults naturally lose muscle mass. Women typically have higher body fat than men at the same BMI. BMI percentiles are used for children and teens instead of adult categories.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Ethnic Variations</p>
              <p className="text-muted-foreground">
                Health risks vary by ethnicity at the same BMI. Asian populations face higher diabetes risk at lower BMI. Some groups have different body fat distribution patterns affecting health outcomes.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Better Assessment Methods</p>
              <p className="text-muted-foreground">
                Combine BMI with waist circumference, body fat percentage, blood pressure, cholesterol levels, and blood sugar for comprehensive health assessment. These measurements provide clearer risk profiles.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a healthy BMI range?</h3>
              <p className="text-muted-foreground">
                A healthy BMI falls between 18.5 and 24.9 for most adults. This range correlates with lowest mortality and morbidity rates. Individual optimal BMI may vary based on age, muscle mass, and health conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate is BMI for athletes?</h3>
              <p className="text-muted-foreground">
                BMI often misclassifies athletes as overweight or obese due to high muscle mass. Use body fat percentage, waist-to-hip ratio, or DEXA scans for accurate body composition assessment in athletic populations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What BMI is considered obese?</h3>
              <p className="text-muted-foreground">
                BMI of 30.0 or higher indicates obesity. Class I obesity spans 30-34.9, Class II spans 35-39.9, and Class III (morbid obesity) is 40 and above. Higher classes carry greater health risks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How can I lower my BMI?</h3>
              <p className="text-muted-foreground">
                Create a calorie deficit through diet and exercise. Aim for 1-2 pounds of weight loss per week. Include strength training to preserve muscle mass. Consult healthcare providers before starting weight loss programs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
