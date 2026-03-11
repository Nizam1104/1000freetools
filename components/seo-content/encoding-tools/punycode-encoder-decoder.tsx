import React from "react"

export default function PunycodeEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool encodes Unicode domain names to punycode (ASCII-compatible
            encoding) and decodes punycode back to Unicode. DNS only understands
            ASCII, so international domain names need conversion.
          </p>
          <p>
            Punycode uses the "xn--" prefix followed by encoded characters. The
            algorithm preserves ASCII characters and encodes non-ASCII using a
            compact representation based on their Unicode code points.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">münchen.de</code>
                <span>encodes to xn--mnchen-3ya.de</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">日本.jp</code>
                <span>encodes to xn--wgv71a.jp</span>
              </div>
            </div>
          </div>
          <p>
            Enter a Unicode domain to encode, or punycode to decode. The tool
            validates the format and shows both representations for use in
            DNS configuration, SSL certificates, or email systems.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuring DNS for international domains</h3>
            <p className="text-sm text-muted-foreground">
              A business registers an IDN like café.com. Their DNS provider
              requires the punycode version xn--caf-dma.com for zone file
              entries. They convert to configure DNS correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up SSL certificates for IDNs</h3>
            <p className="text-sm text-muted-foreground">
              Someone orders an SSL certificate for their international domain.
              The certificate authority needs the punycode version in the CSR,
              but the certificate displays the Unicode version to visitors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing phishing attempts</h3>
            <p className="text-sm text-muted-foreground">
              A security analyst investigates a suspicious domain that looks
              like a legitimate site. They decode the punycode to reveal
              homograph attacks using lookalike Cyrillic or Greek characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing email bounces for IDN domains</h3>
            <p className="text-sm text-muted-foreground">
              A mail server admin troubleshoots bounce messages with punycode
              domains. They decode to readable Unicode to understand which
              actual domain the email was sent to.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building domain validation tools</h3>
            <p className="text-sm text-muted-foreground">
              A developer creates a form accepting international domains. They
              convert to punycode for backend validation and WHOIS lookups
              since those systems only handle ASCII domains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating email systems with IDN</h3>
            <p className="text-sm text-muted-foreground">
              An IT admin migrates email for a company with an IDN domain.
              They convert between Unicode and punycode to configure MX
              records while keeping user-facing addresses in Unicode.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only the domain label gets encoded.</strong>
              Each label (between dots) converts separately. "www.münchen.de"
              becomes "www.xn--mnchen-3ya.de". Only labels with non-ASCII
              characters get the xn-- prefix.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browsers handle conversion automatically.</strong>
              Modern browsers convert IDNs to punycode for DNS lookups
              automatically. You usually only need punycode for configuration
              files and APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some registries restrict IDN registration.</strong>
              Not all TLDs support internationalized domains. Country-code
              TLDs often have rules about which characters are allowed based
              on the language.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Email addresses need special handling.</strong>
              The domain part converts to punycode, but the local part
              (before @) may need separate encoding using SMTPUTF8 extension
              for full internationalization.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security warning:</strong> Punycode enables homograph
              attacks where attackers register domains looking identical to
              legitimate ones using different Unicode characters. Always
              verify domains carefully, especially in emails.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does xn-- stand for?</h3>
            <p className="text-sm text-muted-foreground">
              xn-- is the ACE (ASCII-Compatible Encoding) prefix that identifies
              a punycode-encoded label. It tells DNS and browsers that the
              label contains encoded Unicode characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use punycode in email addresses?</h3>
            <p className="text-sm text-muted-foreground">
              The domain part automatically converts. user@münchen.de becomes
              user@xn--mnchen-3ya.de in mail headers. Modern email clients
              handle this transparently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do search engines treat punycode domains differently?</h3>
            <p className="text-sm text-muted-foreground">
              No, search engines understand both forms are identical. They
              index the Unicode version for display but recognize punycode
              as the same domain. No SEO difference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type international domain characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use your keyboard's input method for the language. On Windows,
              add the keyboard layout. On mobile, switch keyboards. Or
              copy-paste characters from a character map.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are IDN domains more expensive?</h3>
            <p className="text-sm text-muted-foreground">
              Usually the same price as regular domains. Some registries
              charge slightly more for IDNs, but most price them identically
              to ASCII domains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert just part of a domain?</h3>
            <p className="text-sm text-muted-foreground">
              Each label converts independently. Only labels with non-ASCII
              characters get encoded. ASCII labels stay unchanged in the
              punycode version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I use an international domain?</h3>
            <p className="text-sm text-muted-foreground">
              IDNs make domains accessible in native scripts. Local customers
              find them easier to remember and type in their own language.
              They're especially valuable for non-English markets.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
