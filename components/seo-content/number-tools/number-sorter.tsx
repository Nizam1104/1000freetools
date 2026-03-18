import React from "react"

export default function NumberSorterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste or type a list of numbers separated by commas, spaces, or newlines. The sorter arranges them in ascending (smallest to largest) or descending (largest to smallest) order.
          </p>
          <p>
            Optional features include removing duplicates and calculating statistics like count, minimum, maximum, sum, average, and range. The tool handles integers, decimals, and negative numbers.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example sorting:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Input: 45, 12, 89, 12, 3, 67, 45
Ascending: 3, 12, 12, 45, 45, 67, 89
Descending: 89, 67, 45, 45, 12, 12, 3
Without duplicates: 3, 12, 45, 67, 89

Statistics:
Count: 7 numbers
Min: 3, Max: 89
Sum: 273, Average: 39
Range: 86</pre>
          </div>
          <p>
            Results display in a copy-friendly format. Paste sorted lists into spreadsheets, reports, or code. Statistics help understand the data distribution at a glance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Grade and score analysis</h3>
            <p className="text-sm text-muted-foreground">
              A teacher has test scores: 78, 92, 85, 78, 91, 88. Sorting shows the distribution. Statistics reveal the class average (85.3) and range (14 points) for reporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Price comparison shopping</h3>
            <p className="text-sm text-muted-foreground">
              Comparing prices from multiple retailers: $45.99, $42.50, $48.00, $42.50, $44.75. Sorted ascending shows the best deal first. Removing duplicates reveals 4 unique prices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data cleanup for spreadsheets</h3>
            <p className="text-sm text-muted-foreground">
              Exported data has unsorted IDs: 1045, 892, 1045, 756, 892. Sorting and removing duplicates creates a clean list for importing into a database or CRM system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ranking and leaderboards</h3>
            <p className="text-sm text-muted-foreground">
              Game scores need ranking: 1500, 2300, 1800, 2300, 1200. Sorted descending shows the leaderboard. The statistics show the score range (1100 points) between lowest and highest.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inventory and stock management</h3>
            <p className="text-sm text-muted-foreground">
              Product quantities across warehouses: 45, 12, 89, 23, 45. Sorting identifies which locations have the most and least stock. The sum (214) shows total inventory.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific data processing</h3>
            <p className="text-sm text-muted-foreground">
              Lab measurements: 3.42, 3.38, 3.45, 3.42, 3.41. Sorted values help identify outliers. The average (3.416) and range (0.07) indicate measurement consistency.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative numbers sort correctly.</strong>
              -50 is less than -10, which is less than 0. The sorter handles negative numbers properly, placing them before positive numbers in ascending order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Decimals sort by numeric value.</strong>
              2.5 comes before 10.3, not after. Text sorting would put "10.3" before "2.5" alphabetically. This tool uses numeric comparison for correct results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Duplicate removal is optional.</strong>
              Keep duplicates to see frequency, or remove them for a unique list. The statistics update based on whether duplicates are included or removed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple separators work.</strong>
              Use commas, spaces, tabs, or newlines to separate numbers. Mix separators if needed - the tool parses them all. "1, 2 3\n4" works fine.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large datasets, check the statistics first. A huge range or unexpected average might indicate data entry errors before you start sorting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does the average calculation work?</h3>
            <p className="text-sm text-muted-foreground">
              The average (mean) is the sum of all numbers divided by the count. For [3, 12, 45], sum is 60, count is 3, so average is 20. The tool shows this with 2 decimal places.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "range" mean in statistics?</h3>
            <p className="text-sm text-muted-foreground">
              Range is the difference between maximum and minimum values. For [3, 12, 45, 89], range is 89 - 3 = 86. It shows how spread out the data is.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort very large lists?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the sorter handles thousands of numbers. For extremely large lists (10,000+), consider using a spreadsheet or database. Browser performance may slow with massive inputs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens with invalid input?</h3>
            <p className="text-sm text-muted-foreground">
              Non-numeric values are ignored. "1, 2, abc, 3" sorts as [1, 2, 3]. Empty entries and extra separators are also ignored. Only valid numbers are processed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I sort in descending order?</h3>
            <p className="text-sm text-muted-foreground">
              Select the "Descending" option or view both ascending and descending results. Descending order shows largest numbers first, useful for rankings and top-N lists.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the sorted results?</h3>
            <p className="text-sm text-muted-foreground">
              Use the copy button to copy sorted results to clipboard. Paste into Excel, Google Sheets, or any text editor. The comma-separated format works with most spreadsheet import functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between mean and median?</h3>
            <p className="text-sm text-muted-foreground">
              This tool calculates the mean (average). The median is the middle value when sorted. For [1, 2, 100], mean is 34.3 but median is 2. Median is less affected by outliers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
