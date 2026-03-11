import React from "react"

export default function PunycodeConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Punycode converts Unicode domain names (internationalized domain names
            or IDNs) into ASCII-compatible encoding (ACE) that the DNS system can
            resolve. DNS only understands ASCII, so Unicode domains need translation.
          </p>
          <p>
            The encoding adds "xn--" prefix followed by the encoded Unicode string.
            For example, "münchen.de" becomes "xn--mnchen-3ya.de". The algorithm
            preserves basic ASCII characters and encodes non-ASCII characters
            using a compact representation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversions:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">münchen.de</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">xn--mnchen-3ya.de</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">日本.jp</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">xn--wgv71a.jp</code>
              </div>
            </div>
          </div>
          <p>
            Enter a Unicode domain to encode, or a punycode domain to decode.
            The tool validates the format and shows both representations for
            copy-paste use.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Registering international domain names</h3>
            <p className="text-sm text-muted-foreground">
              A business in Munich wants the domain münchen.de. The registrar
              converts it to punycode xn--mnchen-3ya.de for DNS registration.
              Both work in browsers, but DNS records use the punycode version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging DNS resolution issues</h3>
            <p className="text-sm text-muted-foreground">
              A developer troubleshoots why an IDN domain isn't resolving. They
              convert to punycode and check DNS records using the ASCII version,
              since DNS tools don't understand Unicode domains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuring SSL certificates for IDN domains</h3>
            <p className="text-sm text-muted-foreground">
              Someone orders an SSL certificate for their international domain.
              The certificate authority requires the punycode version in the
              CSR, but the certificate displays the Unicode version to users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing phishing domains</h3>
            <p className="text-sm text-muted-foreground">
              A security analyst investigates a suspicious IDN domain that looks
              like a legitimate site. They decode the punycode to reveal homograph
              attacks using lookalike characters from different scripts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building domain validation tools</h3>
            <p className="text-sm text-muted-foreground">
              A developer creates a form that accepts international domain names.
              They use punycode conversion to validate domains against DNS and
              check availability using the ASCII representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating email systems with IDN domains</h3>
            <p className="text-sm text-muted-foreground">
              An IT admin migrates email servers for a company with an IDN domain.
              They convert to punycode for MX record configuration while keeping
              the Unicode version for user-facing email addresses.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Punycode only encodes the domain label, not the TLD.</strong>
              Each label (between dots) is encoded separately. "münchen.de"
              becomes "xn--mnchen-3ya.de"—only the first label changes. The
              TLD stays as-is unless it's also internationalized.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all browsers display Unicode domains by default.</strong>
              Some browsers show punycode for security reasons, especially for
              mixed-script domains that could be homograph attacks. This varies
              by browser and security settings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Email addresses with IDN domains need special handling.</strong>
              The domain part converts to punycode, but the local part (before @)
              may need separate encoding. Full email address internationalization
              uses SMTPUTF8 extension.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some registries restrict IDN registration.</strong>
              Not all TLDs support internationalized domains. Country-code TLDs
              often have specific rules about which characters are allowed based
              on the language of that country.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security warning:</strong> Punycode enables homograph attacks
              where attackers register domains that look identical to legitimate
              ones using different Unicode characters. Always verify domains
              carefully, especially in emails.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does xn-- mean in a domain?</h3>
            <p className="text-sm text-muted-foreground">
              xn-- is the prefix that identifies a punycode-encoded internationalized
              domain. It tells browsers and DNS systems that the label contains
              encoded Unicode characters. All IDNs start with xn--.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use punycode domains in email?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but the domain part converts to punycode automatically.
              user@münchen.de becomes user@xn--mnchen-3ya.de in the mail
              system. Modern email clients handle this transparently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I use an international domain?</h3>
            <p className="text-sm text-muted-foreground">
              IDNs make domains accessible in native scripts. A Chinese company
              can have a .中国 domain. Local customers find it easier to remember
              and type in their own language.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do search engines treat punycode domains differently?</h3>
            <p className="text-sm text-muted-foreground">
              Search engines understand both forms are identical. They index the
              Unicode version for display but recognize the punycode as the same
              domain. No SEO difference between the two.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I type international domain characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use your keyboard's input method for the language. On Windows,
              add the keyboard layout. On mobile, switch keyboards. Or copy-paste
              the characters from a character map tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are punycode domains more expensive?</h3>
            <p className="text-sm text-muted-foreground">
              Usually the same price as regular domains. Some registries charge
              slightly more for IDNs due to additional processing, but most
              price them identically to ASCII domains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert just part of a domain?</h3>
            <p className="text-sm text-muted-foreground">
              Each label converts independently. www.münchen.de becomes
              www.xn--mnchen-3ya.de. Only labels with non-ASCII characters
              get the xn-- prefix. ASCII labels stay unchanged.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
