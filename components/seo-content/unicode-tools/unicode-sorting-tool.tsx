import React from "react"

export default function UnicodeSortingToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode Sorting Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a list of text items to sort, one per line. Choose the sorting method: code point order, locale-aware, case-sensitive or insensitive, natural sort, or custom collation.
          </p>
          <p>
            Unicode sorting considers character properties beyond simple ASCII values. Accented characters, case folding, and locale-specific rules affect sort order. The tool applies Unicode Collation Algorithm (UCA) rules.
          </p>
          <p>
            Preview the sorted results instantly. Compare different sorting methods side by side. Export the sorted list. Essential for internationalized applications.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sorting international names</h3>
            <p className="text-sm text-muted-foreground">
              Customer names from different countries? Sort correctly with locale-aware sorting. Ä sorts differently in German vs Swedish. Get it right for each locale.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building multilingual apps</h3>
            <p className="text-sm text-muted-foreground">
              Your app displays sorted lists. Implement proper Unicode sorting. Test against this reference. Ensure correct order in all languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing bibliographies</h3>
            <p className="text-sm text-muted-foreground">
              Academic references with international authors? Sort according to style guidelines. Handle diacritics correctly. Professional bibliography preparation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Organizing multilingual content</h3>
            <p className="text-sm text-muted-foreground">
              Content in multiple languages? Sort each language appropriately. Locale-specific sorting respects language rules. Better user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing sort implementations</h3>
            <p className="text-sm text-muted-foreground">
              Built a sorting algorithm? Test against this reference. Verify Unicode compliance. Catch edge cases with special characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data cleaning and normalization</h3>
            <p className="text-sm text-muted-foreground">
              Deduplicate lists with proper sorting. Similar names sort together. Identify near-duplicates for review. Clean data more effectively.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sort order varies by locale.</strong>
              German: Ä sorts like Ae. Swedish: Ä sorts after Z. Spanish: CH was once a separate letter. Locale determines correct order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity matters.</strong>
              Case-sensitive: 'Z' before 'a'. Case-insensitive: 'a' before 'Z'. Choose based on your needs. Affects sort results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Natural sort handles numbers.</strong>
              'file2' before 'file10' in natural sort. Code point sort: 'file10' before 'file2'. Natural sort is more human-friendly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Diacritics affect sorting.</strong>
              Some locales ignore diacritics (é = e). Others sort them specially. Know your locale's rules for correct sorting.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For databases, use collation settings that match your users' locale. UTF-8 alone isn't enough. Collation determines sort order. Choose carefully during schema design.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is Unicode sorting?</h3>
            <p className="text-sm text-muted-foreground">
              Sorting text according to Unicode rules. Considers character properties, not just byte values. Handles international characters correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why doesn't ASCII sort work?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII sort uses byte values. 'Z' (90) before 'a' (97). Accented chars sort unpredictably. Unicode sorting respects language rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's natural sorting?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers in strings sort numerically. 'file2' before 'file10'. More intuitive than character-by-character comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I sort emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji sort by code point. Grouped by category in Unicode. Not particularly meaningful. Consider custom ordering for emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Unicode Collation Algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              UTS #10 defines Unicode sorting. Multiple comparison levels (base, accent, case). Locale-specific tailoring. Industry standard.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort right-to-left text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but sort order is logical, not visual. Arabic and Hebrew sort by their code points. Locale settings affect collation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle mixed scripts?</h3>
            <p className="text-sm text-muted-foreground">
              Sort by script first, then within script. Or use a common collation. Depends on your use case. Consider user expectations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
