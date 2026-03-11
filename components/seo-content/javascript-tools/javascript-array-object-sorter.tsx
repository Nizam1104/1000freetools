import React from "react"

export default function JavascriptArrayObjectSorterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Array & Object Sorter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JavaScript array into the input field. Choose whether you're sorting primitive values (numbers, strings) or objects with properties. The sorter handles both automatically.
          </p>
          <p>
            For objects, specify which property to sort by. The tool intelligently detects whether values are numbers or strings and applies the correct comparison logic. Toggle between ascending and descending order with a single click.
          </p>
          <p>
            Results appear instantly in the output panel. Copy the sorted array with one click or continue refining your sort criteria. All processing happens in your browser - no data leaves your machine.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sorting API response data</h3>
            <p className="text-sm text-muted-foreground">
              Your backend returns an array of user objects. Sort them by name, registration date, or account status before displaying in your UI. No need to write custom sort functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Organizing configuration arrays</h3>
            <p className="text-sm text-muted-foreground">
              You have an array of feature flags or settings objects. Sort them alphabetically by key name to make debugging and code reviews easier.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for charts</h3>
            <p className="text-sm text-muted-foreground">
              Chart libraries often require data sorted by date or value. Sort your dataset before passing it to Chart.js or D3 for correct visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging unsorted data</h3>
            <p className="text-sm text-muted-foreground">
              Your list appears in random order. Paste the array here to verify sorting logic is working correctly before integrating into your application.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JavaScript sort behavior</h3>
            <p className="text-sm text-muted-foreground">
              Students can experiment with different arrays to understand how JavaScript's sort() method works with numbers versus strings, and why custom comparators matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick data cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Received a messy JSON file? Paste the array, sort by the relevant field, and copy the cleaned output. Faster than opening a code editor.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Input must be valid JSON.</strong>
              The tool expects a properly formatted JavaScript array. Objects need quoted keys and proper syntax. Invalid JSON will show an error.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">String sorting is alphabetical, not numeric.</strong>
              "10" comes before "2" in string sorting. If sorting numbers stored as strings, convert them first or expect alphabetical order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Missing properties sort to the end.</strong>
              Objects without the specified sort property are placed at the end of the array. This prevents errors but may affect your results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sorting is case-sensitive for strings.</strong>
              Uppercase letters sort before lowercase in ASCII order. "Zebra" comes before "apple". Use consistent casing for predictable results.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production code, use Array.sort() with a custom comparator function. This tool is great for quick tasks and learning, but inline sorting gives you more control in actual applications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort by multiple properties?</h3>
            <p className="text-sm text-muted-foreground">
              This tool sorts by a single property. For multi-level sorting (e.g., sort by department, then by name), you'd need a custom comparator function in your code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this modify my original array?</h3>
            <p className="text-sm text-muted-foreground">
              No. The tool creates a copy before sorting. Your pasted input remains unchanged. JavaScript's sort() method modifies arrays in place, but we avoid that here.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens with null or undefined values?</h3>
            <p className="text-sm text-muted-foreground">
              Objects with null or undefined for the sort property are placed at the end of the array. This prevents comparison errors while keeping your data intact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort nested objects?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. You can only sort by top-level properties. For nested properties like user.address.city, you'd need to flatten the data first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do numbers sometimes sort wrong?</h3>
            <p className="text-sm text-muted-foreground">
              If numbers are stored as strings ("10", "2"), they sort alphabetically. The tool tries to detect numeric values, but quoted numbers in JSON are strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a size limit for arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Very large arrays (thousands of items) may slow down your browser. For huge datasets, use server-side sorting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the sorted result?</h3>
            <p className="text-sm text-muted-foreground">
              Use the copy button to grab the sorted JSON. Paste it into your code editor or save it as a .json file. The output is ready to use.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
