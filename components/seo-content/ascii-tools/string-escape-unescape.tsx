import React from "react"

export default function StringEscapeUnescapeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            String escaping converts special characters into escape sequences so
            they can be safely included in string literals. The tool replaces
            characters like quotes, backslashes, and control characters with their
            escaped equivalents.
          </p>
          <p>
            Common escapes include backslash (\) becoming \\, newline becoming \n,
            tab becoming \t, and quotes becoming \" or \'. Unescaping reverses
            the process, converting escape sequences back to their original
            characters.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common escape sequences:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">\n</code>
                <span>Newline character</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">\t</code>
                <span>Tab character</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">\\</code>
                <span>Literal backslash</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">\"</code>
                <span>Double quote</span>
              </div>
            </div>
          </div>
          <p>
            Paste your string and choose escape or unescape. The tool processes
            instantly and shows the result with a copy button for quick use in
            your code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing strings for JavaScript code</h3>
            <p className="text-sm text-muted-foreground">
              A developer copies user input containing quotes and newlines into
              a JavaScript string literal. They escape it first so the quotes
              don't break the syntax and newlines display correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating JSON string values</h3>
            <p className="text-sm text-muted-foreground">
              Someone builds JSON manually and needs to include text with special
              characters. They escape the string so quotes become \" and backslashes
              become \\, making valid JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging log output with control characters</h3>
            <p className="text-sm text-muted-foreground">
              A developer sees weird output in logs and suspects hidden control
              characters. They escape the string to reveal \n, \r, and \t
              characters that were causing formatting issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing regex patterns as strings</h3>
            <p className="text-sm text-muted-foreground">
              A programmer writes a regex pattern inside a string literal. They
              need to escape backslashes so \\d becomes \\\\d in the string,
              which the regex engine then interprets as \d.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing escaped API responses</h3>
            <p className="text-sm text-muted-foreground">
              An API returns double-escaped JSON strings. The developer unescapes
              once to parse the JSON, then unescapes again to get the actual
              string content for display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating code snippets dynamically</h3>
            <p className="text-sm text-muted-foreground">
              A tool generates JavaScript code that includes dynamic string values.
              The generator escapes all user-provided strings before inserting
              them into the code template to prevent syntax errors.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different languages have different escape rules.</strong>
              JavaScript, Python, Java, and C all handle escapes slightly differently.
              This tool uses JavaScript/JSON escape sequences. Other languages may
              need different handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode escapes use different formats.</strong>
              JavaScript uses {"\\uXXXX"} for Unicode. Some characters outside the
              basic multilingual plane need {"\\u{XXXXX}"} syntax. This tool handles
              common Unicode but may not cover all edge cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double escaping can happen accidentally.</strong>
              Escaping an already-escaped string turns \n into \\n. Always check
              if your input is already escaped before applying escaping again.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HTML entities are different from string escapes.</strong>
              &amp;lt; is an HTML entity. \u003C is a Unicode escape. Don't mix
              them up. This tool handles string escapes, not HTML entities.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> Escaping helps prevent some injection
              attacks but isn't complete protection. For user input in HTML, use
              HTML entity encoding. For SQL, use parameterized queries. Match the
              escaping to your context.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between escape and encode?</h3>
            <p className="text-sm text-muted-foreground">
              Escape handles special characters for string literals (quotes,
              backslashes, control chars). Encode transforms data for specific
              contexts like URLs (encodeURIComponent) or HTML (entity encoding).
              They serve different purposes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do I need to escape backslashes?</h3>
            <p className="text-sm text-muted-foreground">
              Backslash is the escape character itself. To include a literal
              backslash in a string, you escape it as \\. Without escaping,
              the backslash would try to escape the next character instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape entire files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste any amount of text. However, very large files may cause
              slight delays. For massive files, consider using command-line tools
              like sed or a dedicated file processor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about template literals in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Template literals (backtick strings) still need escaping for
              backslashes and quotes that match the delimiter. They also need
              {"\\${"} escaped if you want literal {`${""}{...}`} instead of interpolation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I unescape a string?</h3>
            <p className="text-sm text-muted-foreground">
              Use the unescape function in this tool. Paste the escaped string
              and select unescape. \n becomes a newline, \t becomes a tab,
              and \\ becomes a single backslash.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Unicode characters can be escaped as \uXXXX sequences. The
              tool preserves Unicode characters as-is or can convert them to
              escape sequences depending on your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are my newlines showing as \n in output?</h3>
            <p className="text-sm text-muted-foreground">
              That's the escaped representation. In the actual string value,
              \n is a single newline character. When displayed in code or logs,
              it shows as the two characters \ and n for clarity.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
