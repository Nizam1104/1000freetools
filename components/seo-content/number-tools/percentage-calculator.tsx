import React from "react"

export default function PercentageCalculatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Percentage Calculator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool handles four common percentage calculation types using a tabbed interface.
            Each calculator shows the formula used and provides step-by-step results for transparency.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Four Calculation Modes</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><strong>What is X% of Y?</strong> - Calculates the portion (e.g., 20% of 150 = 30)</li>
            <li><strong>X is what % of Y?</strong> - Finds the percentage ratio (e.g., 30 is 20% of 150)</li>
            <li><strong>Percentage Change</strong> - Computes increase/decrease between two values</li>
            <li><strong>X is Y% of what?</strong> - Finds the original whole from a part and percentage</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Shopping Discount Calculations</h3>
            <p className="text-sm text-muted-foreground">
              A shopper sees a &quot;30% off&quot; sale on a $200 item. They use &quot;What is X% of Y?&quot; to quickly find the discount amount ($60)
              and final price ($140) before deciding to purchase.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Investment Return Analysis</h3>
            <p className="text-sm text-muted-foreground">
              An investor bought stock at $50 and sold at $75. They use &quot;Percentage Change&quot; to calculate the 50% return
              and compare it against other investment options.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Grade Percentage Calculation</h3>
            <p className="text-sm text-muted-foreground">
              A student scored 87 points out of 100 on an exam. They use &quot;X is what % of Y?&quot; to confirm their 87% grade
              and calculate what they need on the final to maintain their target average.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Sales Tax and Tip Calculations</h3>
            <p className="text-sm text-muted-foreground">
              At a restaurant, the bill is $85 and they want to leave an 18% tip. Using &quot;What is X% of Y?&quot;,
              they quickly find the tip amount ($15.30) and total ($100.30).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Reverse Percentage for Original Price</h3>
            <p className="text-sm text-muted-foreground">
              Someone knows they paid $80 after a 20% discount but wants to know the original price.
              Using &quot;X is Y% of what?&quot;, they find the original was $100.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding the calculations and their applications:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>All calculations show the formula used for educational transparency</li>
            <li>Results are displayed with up to 4 decimal places for precision</li>
            <li>Percentage change shows whether it&apos;s an increase or decrease</li>
            <li>Division by zero is handled gracefully with error messages</li>
            <li>Accepts decimal inputs for precise calculations</li>
            <li>Results can be copied to clipboard for use in spreadsheets or documents</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I calculate percentage increase?</h3>
            <p className="text-sm text-muted-foreground">
              Use the &quot;Percentage Change&quot; tab. Enter the original value and new value.
              The formula is: ((new - original) / original) × 100. A positive result means increase, negative means decrease.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the formula for &quot;X is what percent of Y&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              The formula is (X / Y) × 100. For example, to find what percent 25 is of 200:
              (25 / 200) × 100 = 12.5%.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I find the original price before a discount?</h3>
            <p className="text-sm text-muted-foreground">
              Use &quot;X is Y% of what?&quot; If you paid $80 after 20% off, you paid 80% of the original.
              Enter 80 as the value and 80 as the percentage to get $100 original price.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I calculate percentage decrease?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the &quot;Percentage Change&quot; tab. If the new value is less than the original,
              the result will be negative, indicating a decrease. The tool labels it as &quot;decrease&quot;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why are there decimal places in my percentage result?</h3>
            <p className="text-sm text-muted-foreground">
              Percentages don&apos;t always result in whole numbers. The tool shows up to 4 decimal places
              for accuracy. You can round the result as needed for your use case.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
