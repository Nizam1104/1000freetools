import React from "react"

export default function UnicodeConfusablesHomoglyphDetectorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Confusables Detector Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool scans your text for characters that look similar to other characters - known as confusables or homoglyphs. For example, Cyrillic "а" (U+0430) looks identical to Latin "a" (U+0061) but is a completely different character.
          </p>
          <p>
            Each detected character gets a risk rating: High risk means the character has common lookalikes frequently used in attacks. Medium risk indicates less common confusables. Low risk means the confusables exist but are rarely exploited.
          </p>
          <p>
            The detector shows all possible confusables for each character. For "e", it might list Cyrillic "е" (U+0435), Greek "ε" (U+03B5), and others. This helps you understand what an attacker could substitute.
          </p>
          <p>
            Position information tells you exactly where in the string each confusable appears. This matters for long URLs or documents where manually finding the suspicious character would be tedious.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying suspicious links before clicking</h3>
            <p className="text-sm text-muted-foreground">
              Received "apple.com" from an unknown sender? Paste it here. If the "a" is actually Cyrillic (U+0430), you're looking at a phishing site. The real Apple domain uses Latin characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing user-submitted usernames</h3>
            <p className="text-sm text-muted-foreground">
              Someone registered "PayPaӏ" (with Cyrillic palochka instead of Latin "l") to impersonate PayPal. Catch these before they appear in your platform's public profiles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing brand mentions for impersonation</h3>
            <p className="text-sm text-muted-foreground">
              Search social media for your brand name, then check results for homoglyphs. Scammers create accounts like "Micrоsoft" (with Cyrillic о) to trick users into sharing credentials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating cryptocurrency addresses</h3>
            <p className="text-sm text-muted-foreground">
              Crypto addresses are long hex strings. Attackers substitute characters (0 vs O, 1 vs l) to redirect payments. Verify addresses character-by-character before sending funds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking code dependencies for typosquatting</h3>
            <p className="text-sm text-muted-foreground">
              Malicious packages use names like "ӏodash" (Cyrillic І) instead of "lodash". Scan your package.json or requirements.txt for confusables before installing dependencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Moderating content on multilingual platforms</h3>
            <p className="text-sm text-muted-foreground">
              Users might bypass filters by substituting characters. "fасеbооk" (with Cyrillic а and о) could evade brand protection filters. Detect these variations automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all confusables are malicious.</strong>
              Multilingual users legitimately mix scripts. A Greek user might write "Ελληνικά" with Greek epsilon - it's not an attack just because epsilon looks like Latin E.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Risk ratings are context-dependent.</strong>
              High risk characters (а, е, о, р, с) are dangerous in domain names but harmless in Russian text. Consider where the text appears, not just what characters it contains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some confusables only work at certain sizes.</strong>
              Characters like "ӏ" (Cyrillic palochka) and "l" (Latin L) look identical at 12px but differ at 48px. Attackers rely on users reading quickly at normal sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This tool detects, doesn't prevent.</strong>
              Finding confusables is the first step. You still need to decide: Is this legitimate multilingual content? A typo? Or a deliberate attack? Context determines the answer.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For domain verification, also check the Punycode encoding. Browsers display "аррӏе.com" as "xn--80ak6aa92e.com" in the address bar when detecting mixed scripts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the most common homoglyph attack?</h3>
            <p className="text-sm text-muted-foreground">
              Cyrillic substitutions in brand names: "а" for "a", "е" for "e", "о" for "o", "р" for "p". The word "apple" can be written entirely with Cyrillic characters that look identical.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can numbers be confusables too?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Zero (0) can be confused with Latin O, capital O, or Greek omicron. One (1) looks like lowercase l, capital I, or Roman numeral I. Two (2) resembles Z in some fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type these characters myself?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Character Map (Windows) or Character Viewer (macOS) to insert specific Unicode characters. Or copy from this tool's output. But remember: using them deceptively is illegal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are all Cyrillic-Latin pairs dangerous?</h3>
            <p className="text-sm text-muted-foreground">
              No. Characters like Cyrillic "ж" or "щ" have no Latin lookalikes. Only specific pairs are confusables: а/а, е/е, о/о, р/р, с/с, у/у, х/х. The rest are obviously different.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about fullwidth characters?</h3>
            <p className="text-sm text-muted-foreground">
              Fullwidth Latin (like "A" U+FF21) looks like regular Latin but wider. They're used in Asian typography but can confuse Western systems. This tool detects them as low-risk confusables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can emoji be confusables?</h3>
            <p className="text-sm text-muted-foreground">
              Rarely. Some emoji have text variants (❤ vs ❤️) that could theoretically be confused. But emoji confusables aren't commonly exploited for attacks - they're more of a rendering issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I protect my brand from homoglyphs?</h3>
            <p className="text-sm text-muted-foreground">
              Register domain variants with common substitutions. Monitor social media for confusable usernames. Use trademark enforcement. And educate users to check URLs carefully.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
