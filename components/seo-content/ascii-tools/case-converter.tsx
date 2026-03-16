import React from "react"

export default function CaseConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool takes your input text and applies different case transformations
            by analyzing word boundaries and applying specific capitalization rules.
            It first splits your text into words by detecting spaces, hyphens, underscores,
            and camelCase transitions, then rebuilds it according to each case style.
          </p>

          <p>
            For programming cases like camelCase, snake_case, and kebab-case, the converter
            identifies word boundaries and applies the appropriate separator and capitalization.
            Title case capitalizes the first letter of each word, while sentence case only
            capitalizes the first letter of the first word and proper nouns after punctuation.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Case styles explained:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">UPPERCASE</code>
                <span>All letters capitalized</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">camelCase</code>
                <span>First word lowercase, rest capitalized, no separators</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">snake_case</code>
                <span>All lowercase with underscores between words</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">kebab-case</code>
                <span>All lowercase with hyphens between words</span>
              </div>
            </div>
          </div>

          <p>
            All conversions happen instantly in your browser as you type. Click any
            conversion result to copy it directly to your clipboard, or use the quick
            convert buttons for one-click transformations.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Refactoring variable names in code</h3>
            <p className="text-sm text-muted-foreground">
              A developer imports a legacy codebase with inconsistent naming—some variables
              use PascalCase, others use snake_case. They paste the old names into the
              converter and quickly transform everything to match their team's camelCase
              standard before committing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing email subject lines</h3>
            <p className="text-sm text-muted-foreground">
              A marketing specialist drafts an email campaign and wants to test different
              subject line styles. They convert "summer sale starts monday" to Title Case
              for a professional look, then to UPPERCASE for urgency testing in A/B variants.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating CSS class names</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer has a list of component names like "User Profile Card"
              and needs kebab-case for CSS classes. Instead of manually typing
              "user-profile-card" for each one, they convert the entire list at once.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting database column names</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer designs a new table schema. They have business terms like
              "Customer Order Date" and need snake_case for PostgreSQL columns. The converter
              transforms them to "customer_order_date" instantly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing accidentally caps-locked text</h3>
            <p className="text-sm text-muted-foreground">
              Someone sends a message in ALL CAPS and the recipient needs to normalize it
              for a report. They paste the text, convert to Sentence case, and get properly
              formatted text without retyping everything.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing API constant names</h3>
            <p className="text-sm text-muted-foreground">
              A developer defines environment variable names and API status codes that
              conventionally use CONSTANT_CASE. They convert "api timeout error" to
              "API_TIMEOUT_ERROR" for their configuration file.
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
              <strong className="text-foreground">Word detection isn't perfect for all inputs.</strong>
              The converter splits on spaces, hyphens, underscores, and camelCase transitions.
              But "iPhone" becomes "I Phone" in Title Case, and acronyms like "NASA" get
              treated as regular words. Review results before using in production code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Title Case follows simple rules, not style guides.</strong>
              This tool capitalizes every word's first letter. It doesn't know AP Style
              rules about lowercase articles and prepositions. For "the lord of the rings",
              you get "The Lord Of The Rings" instead of "The Lord of the Rings".
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sentence case only detects basic sentence boundaries.</strong>
              The converter capitalizes after periods, exclamation marks, and question marks.
              But it can't distinguish "Mr. Smith" from end-of-sentence periods, so you
              might get "Mr. smith" instead of "Mr. Smith".
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Programming cases strip all original formatting.</strong>
              When converting to camelCase, snake_case, or kebab-case, all original
              punctuation and spacing gets replaced with the target format's separator.
              This is intentional but means you lose the original structure.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For code refactoring, convert to snake_case first
              (which handles word boundaries well), then to your target case. This two-step
              approach often produces cleaner results than direct conversion from mixed formats.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between camelCase and PascalCase?</h3>
            <p className="text-sm text-muted-foreground">
              camelCase starts with a lowercase letter (firstName, calculateTotal), while
              PascalCase starts with uppercase (FirstName, CalculateTotal). JavaScript uses
              camelCase for variables and functions, PascalCase for classes and React
              components.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use snake_case vs kebab-case?</h3>
            <p className="text-sm text-muted-foreground">
              snake_case is standard in Python, Ruby, and database column names. kebab-case
              is used in URLs, CSS classes, and HTML attributes. Neither works in JavaScript
              variable names because the hyphen is interpreted as subtraction.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this convert entire files at once?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste any amount of text. However, for large codebases, consider using
              automated refactoring tools like ESLint with naming convention rules. This
              tool works best for targeted conversions of specific identifiers or short texts.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my CONSTANT_CASE look weird?</h3>
            <p className="text-sm text-muted-foreground">
              CONSTANT_CASE uppercases everything and uses underscores. If your input has
              acronyms like "XML", they become part of the constant (XML_PARSER becomes
              X_M_L_PARSER). For better results with acronyms, manually adjust after
              conversion.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve numbers in variable names?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, numbers are preserved but treated as word boundaries. "version2update"
              becomes "version_2_update" in snake_case. This is usually what you want,
              but be aware that leading numbers in identifiers may cause issues in some
              languages.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert from camelCase back to readable text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste camelCase text and convert to Title Case or sentence case.
              "firstName" becomes "First Name" in Title Case. The tool detects camelCase
              boundaries automatically, so you don't need to add spaces first.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a character limit?</h3>
            <p className="text-sm text-muted-foreground">
              The tool runs entirely in your browser with no server limits. However, very
              large texts (thousands of words) may cause slight delays as all nine case
              variations compute simultaneously. For most use cases, performance is instant.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
