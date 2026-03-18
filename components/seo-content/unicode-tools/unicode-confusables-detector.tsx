import React from "react"

export default function UnicodeConfusablesDetectorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Confusables Detector Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter text to analyze for confusable characters. The tool checks each character against the Unicode confusables database. Identifies characters that look similar to others.
          </p>
          <p>
            Confusables include homoglyphs: Latin 'A' and Cyrillic 'А'. Different code points, identical appearance. The detector shows all confusable alternatives for each character.
          </p>
          <p>
            Security analysis highlights potential spoofing risks. See which characters could be confused in your text. Essential for security auditing and input validation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Detecting phishing attempts</h3>
            <p className="text-sm text-muted-foreground">
              URLs with confusable characters? 'раураl.com' looks like 'paypal.com'. Detect homoglyph attacks. Protect users from phishing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating usernames</h3>
            <p className="text-sm text-muted-foreground">
              Prevent confusing usernames. 'admin' vs 'аdmin' (Cyrillic a). Reject confusables. Avoid impersonation risks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security auditing</h3>
            <p className="text-sm text-muted-foreground">
              Audit user input for confusables. Identify potential spoofing. Security best practice for forms and APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Domain name analysis</h3>
            <p className="text-sm text-muted-foreground">
              Check domains for confusables. Homoglyph domains used for phishing. Identify suspicious registrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review for security</h3>
            <p className="text-sm text-muted-foreground">
              Variable names with confusables? Could be malicious. Audit code for homoglyphs. Prevent supply chain attacks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning about Unicode security</h3>
            <p className="text-sm text-muted-foreground">
              Understand confusable attacks. See real examples. Educational tool for security awareness.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Confusables aren't always malicious.</strong>
              Some are legitimate (accented letters). Context matters. Don't flag all confusables as attacks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Many scripts have confusables.</strong>
              Latin/Cyrillic/Greek most common. But also CJK, Arabic, others. Any similar-looking characters can confuse.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some confusables are intentional.</strong>
              Stylistic choices, brand names. Not all confusables are attacks. Consider legitimate use cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode has a confusables file.</strong>
              confusables.txt defines known confusables. This tool uses that database. Authoritative source from Unicode Consortium.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For security-critical input (passwords, domains), restrict to ASCII or specific scripts. Don't allow mixed scripts where confusables are possible.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are confusable characters?</h3>
            <p className="text-sm text-muted-foreground">
              Characters that look similar or identical. Latin 'A' (U+0041) and Cyrillic 'А' (U+0410). Different code points, same appearance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are confusables used in attacks?</h3>
            <p className="text-sm text-muted-foreground">
              Homoglyph attacks replace characters. 'paypal' becomes 'раураl'. Users can't tell the difference. Phishing and impersonation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I prevent confusable attacks?</h3>
            <p className="text-sm text-muted-foreground">
              Validate input scripts. Restrict to expected characters. Use confusable detection. Educate users about the risk.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are all confusables security risks?</h3>
            <p className="text-sm text-muted-foreground">
              No. Accented letters are confusables but legitimate. Context determines risk. Security-critical fields need stricter validation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a homoglyph?</h3>
            <p className="text-sm text-muted-foreground">
              Characters that look the same. From Greek 'homo' (same) + 'glyph'. Confusables are homoglyphs from different scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can confusables affect search?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Search for 'cafe' won't find 'саfе' (Cyrillic). Different code points. Search engines handle this differently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do browsers handle confusables?</h3>
            <p className="text-sm text-muted-foreground">
              Modern browsers punycode IDN domains with confusables. Shows 'xn--' in address bar. Warns users about suspicious domains.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
