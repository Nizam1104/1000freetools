import React from "react"

export default function RegexTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool uses JavaScript's RegExp engine to test your pattern against input
            text in real-time. As you type a regex pattern, it compiles the expression
            and runs it against your test string, showing all matches with their positions
            and captured groups.
          </p>

          <p>
            The regex engine supports standard flags: g (global) finds all matches instead
            of stopping at the first one, i (case-insensitive) ignores letter case, m
            (multiline) makes ^ and $ match line boundaries, and s (dotall) lets dot
            match newline characters.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common regex patterns included:</p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-muted">
                <strong>Email:</strong> Matches standard email formats with local part,
                @ symbol, and domain.
              </div>
              <div className="p-2 rounded bg-muted">
                <strong>URL:</strong> Matches http/https URLs with domain and path.
              </div>
              <div className="p-2 rounded bg-muted">
                <strong>Phone (US):</strong> Matches various US phone number formats
                with optional parentheses and dashes.
              </div>
              <div className="p-2 rounded bg-muted">
                <strong>Date (YYYY-MM-DD):</strong> Matches ISO format dates.
              </div>
            </div>
          </div>

          <p>
            Match results are highlighted in the test string and displayed in a table
            showing the matched text, position, and any captured groups. Invalid patterns
            show error messages explaining what went wrong with the regex syntax.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating form input patterns</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer builds a registration form and needs to validate
              email addresses, phone numbers, and passwords. They test their regex
              patterns against sample inputs to ensure valid data passes and invalid
              data gets rejected before writing the validation code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting data from log files</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer needs to pull IP addresses, timestamps, and error codes
              from server logs. They paste sample log lines and refine their regex
              pattern until it correctly captures all the fields they need for analysis.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding and replacing text in bulk</h3>
            <p className="text-sm text-muted-foreground">
              A content manager needs to reformat dates from MM/DD/YYYY to YYYY-MM-DD
              across hundreds of articles. They test their capture group regex to ensure
              it correctly identifies and rearranges the date components before running
              the bulk replacement.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging someone else's regex</h3>
            <p className="text-sm text-muted-foreground">
              A developer inherits code with a complex regex pattern that's not working
              correctly. They paste the pattern and sample data into the tester to see
              what it actually matches, helping them understand the intent and fix the
              bug.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning regex syntax by experimentation</h3>
            <p className="text-sm text-muted-foreground">
              A junior developer studying regular expressions tests different patterns
              to understand how quantifiers, character classes, and anchors work.
              Immediate visual feedback helps them learn faster than reading documentation
              alone.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scraping structured data from web pages</h3>
            <p className="text-sm text-muted-foreground">
              A data analyst needs to extract product prices, SKUs, or dates from HTML
              snippets. They paste the HTML and test regex patterns to isolate the
              specific data points before building their scraping script.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This uses JavaScript regex flavor.</strong>
              JavaScript regex differs slightly from PCRE (PHP), Python, or .NET. Features
              like lookbehind assertions have limited support. For production code in
              other languages, verify patterns work in your target environment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters must be escaped.</strong>
              Characters like . * + ? ^ $ { } ( ) | \ have special meaning in regex.
              To match them literally, prefix with backslash. For example, match a
              literal dot with \. not just .
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Global flag affects match behavior.</strong>
              Without the g flag, regex stops after the first match. With g, it finds
              all matches. For validation, you usually don't need g. For extraction or
              replacement, you typically do.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Greedy vs lazy quantifiers matter.</strong>
              By default, quantifiers like * and + are greedy—they match as much as
              possible. Add ? to make them lazy (match as little as possible). This
              affects what gets captured in complex patterns.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Start simple and build incrementally. Test each
              part of your regex before combining. For email validation, start with
              basic pattern, then add edge cases. Complex regex is harder to debug
              than multiple simpler patterns.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the g flag do?</h3>
            <p className="text-sm text-muted-foreground">
              The g (global) flag tells the regex engine to find all matches, not just
              the first one. Without g, testing "a" against "banana" finds one match.
              With g, it finds all three "a" characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match exactly 10 digits?</h3>
            <p className="text-sm text-muted-foreground">
              Use \d{10} to match exactly 10 digits. For phone numbers where you want
              exactly 10 digits with no extra characters, use ^\d{10}$ to anchor the
              pattern to start and end of string.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between .* and .+?</h3>
            <p className="text-sm text-muted-foreground">
              .* matches zero or more of any character. .+ matches one or more. So .*
              matches empty strings, while .+ requires at least one character. Use .*
              when the content is optional, .+ when it's required.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I make regex case-insensitive?</h3>
            <p className="text-sm text-muted-foreground">
              Add the i flag. The pattern /hello/i matches "hello", "HELLO", "Hello",
              "HeLLo", etc. Without the i flag, /hello/ only matches lowercase "hello"
              exactly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are capture groups?</h3>
            <p className="text-sm text-muted-foreground">
              Capture groups are parts of the pattern enclosed in parentheses (). They
              extract specific portions of the match. In /(\d{3})-(\d{4})/, the first
              group captures 3 digits, the second captures 4 digits—useful for phone
              number parsing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my regex matching too much?</h3>
            <p className="text-sm text-muted-foreground">
              You're probably experiencing greedy matching. Quantifiers like .* match
              as much as possible. Try making them lazy with .*? or use more specific
              character classes like [^,]* to stop at commas.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use regex for HTML parsing?</h3>
            <p className="text-sm text-muted-foreground">
              For simple extraction from known HTML structures, yes. For robust HTML
              parsing, no—HTML isn't a regular language. Use DOM parsers or libraries
              like Cheerio for production HTML processing. Regex works for quick
              extraction from predictable formats.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match special characters like brackets?</h3>
            <p className="text-sm text-muted-foreground">
              Escape them with backslash. To match "[test]", use \[test\]. Characters
              that need escaping: . * + ? ^ $ { } ( ) | \ [ ]. Inside character classes
              [], fewer characters need escaping.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
