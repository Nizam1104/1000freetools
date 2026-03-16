import React from "react"

export default function NumberSorterOrganizerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Sorter and Organizer Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool sorts lists of numbers in ascending or descending order, removes duplicates, and calculates statistics.
            It handles comma, space, or newline-separated input for flexibility.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Sorting and Analysis Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste or type your numbers (separated by commas, spaces, or newlines)</li>
            <li>Choose your input separator type if needed</li>
            <li>Optionally enable &quot;Remove duplicates&quot; to eliminate repeated values</li>
            <li>Click &quot;Sort Numbers&quot; to process</li>
            <li>View results in both ascending and descending order</li>
            <li>Review statistics: count, min, max, sum, average, and range</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Data Cleaning for Analysis</h3>
            <p className="text-sm text-muted-foreground">
              An analyst receives survey responses with ratings in random order. They paste the values,
              remove duplicates, and sort to identify the distribution of responses.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Grade Book Organization</h3>
            <p className="text-sm text-muted-foreground">
              A teacher has test scores from multiple classes. They sort scores to find the class average,
              identify the highest and lowest performers, and calculate the grade range.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Price Comparison</h3>
            <p className="text-sm text-muted-foreground">
              A shopper collects prices from different stores for the same product. Sorting helps them
              quickly identify the best deal and calculate the average market price.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Sports Statistics</h3>
            <p className="text-sm text-muted-foreground">
              A coach reviews player performance metrics. Sorting helps rank players,
              and statistics show the team&apos;s average performance and range.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Quality Control Measurements</h3>
            <p className="text-sm text-muted-foreground">
              A manufacturer tracks product dimensions. Sorting reveals outliers,
              and the range shows if production stays within tolerance limits.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding sorting options and statistics:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Accepts integers and decimal numbers</li>
            <li>Supports three input formats: comma, space, or newline separated</li>
            <li>Duplicate removal keeps only unique values</li>
            <li>Statistics include: count, minimum, maximum, sum, average, and range</li>
            <li>Results can be copied to clipboard for use in spreadsheets</li>
            <li>Handles negative numbers correctly</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What sorting algorithm is used?</h3>
            <p className="text-sm text-muted-foreground">
              The tool uses JavaScript&apos;s built-in sort with a numeric comparator,
              which typically implements a variant of merge sort or quicksort - efficient for most datasets.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I remove duplicate numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Check the &quot;Remove duplicates&quot; option before sorting. The tool uses a Set internally
              to keep only unique values, then sorts the result.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does &quot;range&quot; mean in statistics?</h3>
            <p className="text-sm text-muted-foreground">
              Range is the difference between the maximum and minimum values.
              It shows the spread of your data. For example, if min=10 and max=50, range=40.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I sort decimal numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the tool handles decimals correctly. Unlike text sorting (which would put 10 before 2),
              numeric sorting correctly orders 1.5, 2, 10, 25.5.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How is the average calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Average (mean) = sum of all values ÷ count of values.
              The tool shows it rounded to 2 decimal places for readability.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I paste numbers from Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Excel copies cells with newlines between them. Select &quot;Newline&quot; as the separator,
              paste your data, and the tool will parse it correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
