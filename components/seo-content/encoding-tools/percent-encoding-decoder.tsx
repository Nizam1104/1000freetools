import React from "react"

export default function PercentEncodingDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Percent Encoding Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste URL-encoded text into the input field. The decoder automatically detects and converts percent-encoded sequences. Results appear instantly as you type.
          </p>
          <p>
            Percent encoding replaces special characters with % followed by two hex digits. Space becomes %20, slash becomes %2F. The decoder reverses this process.
          </p>
          <p>
            Choose the character encoding - typically UTF-8 for modern URLs. The decoder converts hex bytes to characters using your selected encoding. Handles plus signs as spaces for form data.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging URL parameters</h3>
            <p className="text-sm text-muted-foreground">
              Received a URL with encoded parameters? Decode to see the actual values. Debug query strings with special characters or non-ASCII text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing web traffic</h3>
            <p className="text-sm text-muted-foreground">
              Proxy logs show encoded URLs. Decode to understand what was requested. Security analysis often requires decoding suspicious URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing form submissions</h3>
            <p className="text-sm text-muted-foreground">
              Form data arrives URL-encoded. Decode POST body or query parameters to get user input. Essential for web application development.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with REST APIs</h3>
            <p className="text-sm text-muted-foreground">
              API responses may contain encoded strings. Decode path parameters or query values. Understand the actual data being transmitted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investigating encoded payloads</h3>
            <p className="text-sm text-muted-foreground">
              Security researchers decode suspicious URLs. Attack payloads are often percent-encoded. Decode to analyze potential threats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling international domains</h3>
            <p className="text-sm text-muted-foreground">
              IDN domains use punycode, but paths may have encoded Unicode. Decode to see actual international characters in URLs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Plus sign handling varies.</strong>
              In query strings, + often means space. In path segments, + is literal. This tool lets you choose how to handle plus signs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double encoding exists.</strong>
              Sometimes encoded strings get encoded again. %2520 is double-encoded space (%25 = %, so %2520 = %20). May need multiple decode passes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Encoding must match.</strong>
              UTF-8 is standard for modern web. Older systems may use Latin-1 or other encodings. Wrong encoding produces garbled output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Invalid sequences indicate problems.</strong>
              %ZZ where ZZ isn't valid hex indicates corruption. Incomplete sequences (%2) suggest truncation. These indicate data issues.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When debugging, decode step by step. First decode the URL, then examine parameters. Some parameters may themselves be encoded. Nested encoding is common in complex applications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters get encoded?</h3>
            <p className="text-sm text-muted-foreground">
              Reserved characters: : / ? # [ ] @ ! $ & ' ( ) * + , ; =. Also spaces and non-ASCII. Unreserved (A-Z a-z 0-9 - _ . ~) stay as-is.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why encode spaces as %20?</h3>
            <p className="text-sm text-muted-foreground">
              Spaces aren't allowed in URLs. %20 is the hex code for space (ASCII 32). In query strings, + is often used instead of %20 for spaces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode with this tool?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on decoding. For encoding, use a URL encoder. Many tools provide both encode and decode functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about punycode?</h3>
            <p className="text-sm text-muted-foreground">
              Punycode encodes international domain names differently. It uses xn-- prefix. This tool handles percent encoding, not punycode decoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is %2F the same as /?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, %2F decodes to forward slash. In path segments, they're equivalent. In some contexts, encoded slashes are treated differently for security.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some characters still encoded?</h3>
            <p className="text-sm text-muted-foreground">
              Some characters remain encoded if they're part of the URL structure. The decoder converts percent sequences but preserves URL format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this handle malformed input?</h3>
            <p className="text-sm text-muted-foreground">
              Invalid sequences are preserved as-is. %GG stays %GG since GG isn't valid hex. This helps identify encoding problems in the source data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
