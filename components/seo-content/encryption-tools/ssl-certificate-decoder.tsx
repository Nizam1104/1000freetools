export default function SslCertificateDecoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SSL certificate decoder parses X.509 certificates to display their contents
            in human-readable format. Certificates contain identity information, public keys,
            and digital signatures that enable secure HTTPS connections.
          </p>
          <p className="text-muted-foreground">
            The decoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Identifies whether the certificate is PEM (text with BEGIN/END markers) or DER (binary format).</li>
            <li><strong className="text-foreground">ASN.1 parsing:</strong> Certificates use ASN.1 encoding. The decoder traverses this structure to extract fields.</li>
            <li><strong className="text-foreground">Field extraction:</strong> Pulls out subject, issuer, validity dates, public key info, extensions, and signature.</li>
            <li><strong className="text-foreground">Validation checks:</strong> Verifies dates, checks for self-signed status, and identifies potential security issues.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool displays certificate chain information, key algorithms, and extensions
            like Subject Alternative Names (SANs) that specify which domains the certificate covers.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Troubleshooting HTTPS Errors",
              description: "Diagnose certificate warnings by examining expiry dates, domain mismatches, or chain issues."
            },
            {
              title: "Verifying Certificate Before Deployment",
              description: "Check that a newly issued certificate has correct domains, dates, and key sizes before installing on servers."
            },
            {
              title: "Security Auditing",
              description: "Review certificates across your infrastructure to identify weak algorithms, expiring certs, or misconfigurations."
            },
            {
              title: "Understanding Certificate Structure",
              description: "Learn what information certificates contain and how to interpret fields like CN, SAN, and key usage extensions."
            },
            {
              title: "Debugging TLS Connection Issues",
              description: "Compare server certificates with expected values when clients report certificate validation failures."
            },
            {
              title: "Checking Certificate Transparency",
              description: "Verify certificate details match what's logged in CT logs, ensuring no unauthorized certificates were issued."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "This tool decodes but doesn't validate trust",
              explanation: "It shows certificate contents but doesn't verify the certificate chain against trusted root CAs. A valid-looking cert might still be untrusted."
            },
            {
              caveat: "PEM vs DER format matters",
              explanation: "PEM is text format with -----BEGIN CERTIFICATE----- markers. DER is binary. Most web servers use PEM; Windows often uses DER (.cer files)."
            },
            {
              caveat: "Certificate files may contain multiple certs",
              explanation: "Bundle files include the server cert plus intermediate CA certs. This tool typically shows the first certificate (your server cert)."
            },
            {
              caveat: "Private keys are NOT in certificates",
              explanation: "Certificates only contain public keys. Private keys are separate files (.key, .p12, .pfx). Never share private keys - they're secret."
            },
            {
              caveat: "Self-signed certificates have security implications",
              explanation: "Self-signed certs aren't verified by a CA. Browsers warn about them. They're fine for internal use but not for public websites."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What's the difference between subject and issuer?",
              answer: "Subject is who the certificate belongs to (your domain). Issuer is who signed/issued it (the Certificate Authority). For self-signed certs, these are identical."
            },
            {
              question: "What are Subject Alternative Names (SANs)?",
              answer: "SANs list all domains the certificate covers. Modern certs use SANs instead of Common Name (CN). A cert can cover multiple domains via SANs."
            },
            {
              question: "How do I know if a certificate is about to expire?",
              answer: "Check the 'Not After' date. Browsers typically warn 30 days before expiry. Plan renewal at least 2 weeks ahead to avoid service disruption."
            },
            {
              question: "What key size is considered secure?",
              answer: "RSA 2048-bit minimum (3072+ recommended). ECDSA P-256 or higher. RSA 1024 is deprecated and insecure. Check the 'Public Key Algorithm' field."
            },
            {
              question: "What does 'self-signed certificate' mean?",
              answer: "The certificate was signed by its own private key, not by a trusted CA. Browsers don't trust these by default. Fine for internal/testing use."
            },
            {
              question: "Can I extract the public key from a certificate?",
              answer: "Yes! The certificate contains the public key. This tool displays it. The corresponding private key is separate and must be kept secret."
            },
            {
              question: "What are certificate extensions?",
              answer: "Extensions add extra information: Key Usage (what the key can do), Extended Key Usage (TLS server, code signing), SANs, CRL/OCSP endpoints, and more."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
