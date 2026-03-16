import React from "react"

export default function JavascriptRegexTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Regex Tester Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your regex pattern without the surrounding slashes. Select flags like global (g), case-insensitive (i), or multiline (m). The tester builds the RegExp object automatically.
          </p>
          <p>
            Paste your test string and click Test Regex. Matches are highlighted in the text and listed in detail below. Capture groups are shown with their indices and values.
          </p>
          <p>
            The highlighted view shows exactly where matches occur in your text. Each match displays its position, captured groups, and the matched text. Invalid patterns show clear error messages.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building validation patterns</h3>
            <p className="text-sm text-muted-foreground">
              Creating email or phone validators? Test your regex against valid and invalid examples. Ensure it catches edge cases before deploying to production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging existing regex</h3>
            <p className="text-sm text-muted-foreground">
              Found a regex in codebase that doesn't work? Paste it here with sample text. See exactly what it matches and where capture groups go.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning regular expressions</h3>
            <p className="text-sm text-muted-foreground">
              New to regex? Experiment with patterns and see immediate results. Understand quantifiers, character classes, and anchors through hands-on testing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting data from text</h3>
            <p className="text-sm text-muted-foreground">
              Need to pull dates, IDs, or specific patterns from logs? Build and test your extraction regex before writing the parsing code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing replacement patterns</h3>
            <p className="text-sm text-muted-foreground">
              Using regex for find-and-replace? Verify your pattern matches the right text. Check capture group references work correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating user input formats</h3>
            <p className="text-sm text-muted-foreground">
              Building form validation? Test regex against real user input samples. Catch edge cases like international formats or unusual but valid inputs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't include the slashes.</strong>
              Enter the pattern only, not /pattern/. The tool adds them automatically. Including slashes makes them part of the pattern.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Global flag finds all matches.</strong>
              Without the 'g' flag, only the first match is found. Enable global to see every occurrence in your test string.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need escaping.</strong>
              Dots, brackets, and parentheses have special meaning. Escape them with backslash to match literally. The error message helps identify issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Capture groups are numbered.</strong>
              Parentheses create capture groups. $1, $2, etc. reference them. The tester shows each group's content clearly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production regex, add comments explaining complex patterns. Regex is write-only code - future you will thank present you for documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between g and i flags?</h3>
            <p className="text-sm text-muted-foreground">
              'g' (global) finds all matches, not just the first. 'i' (ignoreCase) makes matching case-insensitive. Use both for comprehensive matching.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my pattern show invalid?</h3>
            <p className="text-sm text-muted-foreground">
              Common causes: unescaped special characters, unclosed brackets or parentheses, invalid quantifiers. The error message points to the issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match a literal dot?</h3>
            <p className="text-sm text-muted-foreground">
              Escape it: use \. instead of .. A bare dot matches any character. Escaping makes it match only the period character.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I test lookaheads and lookbehinds?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, modern JavaScript supports lookaheads (?=...) and lookbehinds (?&lt;=...). Browser compatibility varies for lookbehinds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the multiline flag do?</h3>
            <p className="text-sm text-muted-foreground">
              'm' makes ^ and $ match line starts/ends, not just string start/end. Essential for matching patterns in multi-line text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I match newlines?</h3>
            <p className="text-sm text-muted-foreground">
              Use [\s\S] or enable the 's' (dotAll) flag. Regular dot (.) doesn't match newlines by default in JavaScript regex.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for replace operations?</h3>
            <p className="text-sm text-muted-foreground">
              This tool tests matches only. For replacements, test the pattern here first, then use JavaScript's replace() method in your code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
