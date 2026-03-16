import React from "react"

export default function RandomNumberGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Random Number Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates random numbers within a specified range using cryptographically secure random number generation.
            Configure the minimum, maximum, quantity, and options for duplicates and sorting.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Random Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Set the minimum and maximum values for your range</li>
            <li>Specify how many random numbers to generate (up to 10,000)</li>
            <li>Choose whether to allow duplicate numbers</li>
            <li>Optionally sort results in ascending order</li>
            <li>Click &quot;Generate&quot; to create your random numbers</li>
            <li>Copy results or download as CSV for use in spreadsheets</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Raffle and Lottery Draws</h3>
            <p className="text-sm text-muted-foreground">
              An organizer needs to pick 5 winning tickets from 500 entries. They set min=1, max=500, count=5,
              disable duplicates, and generate the winning numbers fairly.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Statistical Sampling</h3>
            <p className="text-sm text-muted-foreground">
              A researcher needs random sample IDs from a population of 10,000. They generate 100 unique random numbers
              to select which records to include in their analysis.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Game Development Testing</h3>
            <p className="text-sm text-muted-foreground">
              A game developer tests random loot drop mechanics. They generate thousands of random numbers
              to verify drop rates match the intended probabilities.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Classroom Random Selection</h3>
            <p className="text-sm text-muted-foreground">
              A teacher assigns each student a number and uses this tool to randomly select who answers questions.
              The sorted option helps them call numbers in order.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Monte Carlo Simulations</h3>
            <p className="text-sm text-muted-foreground">
              An analyst runs simulations requiring random inputs. They generate large sets of random numbers
              and download as CSV to import into their simulation software.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding random number generation options:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses browser&apos;s crypto.getRandomValues() for cryptographically secure randomness</li>
            <li>Without duplicates: if range is smaller than count, you get all available numbers</li>
            <li>With duplicates: same number can appear multiple times</li>
            <li>Sorted output displays numbers in ascending order for easier reading</li>
            <li>CSV download creates one number per line for easy import</li>
            <li>Maximum 10,000 numbers per generation for performance</li>
            <li>Range must have minimum less than maximum</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Are these numbers truly random?</h3>
            <p className="text-sm text-muted-foreground">
              The tool uses crypto.getRandomValues(), which generates cryptographically secure random numbers.
              This is suitable for most applications including lotteries, sampling, and testing.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What happens if I request more numbers than the range allows?</h3>
            <p className="text-sm text-muted-foreground">
              With duplicates disabled, you&apos;ll get all unique numbers in the range. For example,
              requesting 100 numbers from 1-10 without duplicates returns all 10 numbers (1-10).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I generate negative random numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, set the minimum to a negative value. For example, min=-50 and max=50 generates
              random numbers from -50 to 50 inclusive.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I ensure no duplicate numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Uncheck the &quot;Allow duplicates&quot; option. The tool will generate unique numbers
              by removing each selected number from the available pool.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What format is the CSV download?</h3>
            <p className="text-sm text-muted-foreground">
              The CSV file contains one number per line, making it easy to import into Excel,
              Google Sheets, or any data analysis tool that accepts CSV format.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I use this for gambling or real lotteries?</h3>
            <p className="text-sm text-muted-foreground">
              While the numbers are cryptographically random, always check local regulations.
              For official lotteries, use certified random number generators as required by law.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
