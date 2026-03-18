export default function XmlSignatureGeneratorVerifierSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML digital signature tool implements the W3C XML Signature standard to sign and verify XML documents.
            It uses cryptographic algorithms to ensure data integrity and authenticate the signer's identity.
          </p>
          <p className="text-muted-foreground">
            The signing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Generate key pair:</strong> A private key (for signing) and public key (for verification) are created using RSA or ECDSA.</li>
            <li><strong className="text-foreground">Create digest:</strong> The XML content is hashed using SHA-256 or similar algorithm to create a unique fingerprint.</li>
            <li><strong className="text-foreground">Sign the digest:</strong> The private key encrypts the digest, creating the digital signature.</li>
            <li><strong className="text-foreground">Embed signature:</strong> The signature is inserted into the XML as a <Signature> element with key info and algorithms used.</li>
          </ol>
          <p className="text-muted-foreground">
            Verification reverses the process: the signature is decrypted with the public key, the content is re-hashed,
            and both hashes are compared. A match proves the document hasn't been altered and was signed by the key holder.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Signing software release manifests",
              description: "Package managers use XML signatures to verify software hasn't been tampered with. Sign your release manifests before distribution."
            },
            {
              title: "Securing SOAP web service messages",
              description: "WS-Security uses XML signatures to protect SOAP messages. Sign requests and responses to ensure integrity in enterprise integrations."
            },
            {
              title: "Creating signed SAML assertions",
              description: "Single Sign-On systems use SAML tokens with XML signatures. Identity providers sign assertions that service providers verify."
            },
            {
              title: "Validating legal document authenticity",
              description: "Contracts or legal filings in XML format can be digitally signed to prove they haven't been altered after signing."
            },
            {
              title: "Protecting configuration file integrity",
              description: "Critical application configs can be signed. The app verifies the signature before loading, detecting any unauthorized modifications."
            },
            {
              title: "Implementing secure data exchange",
              description: "B2B data exchanges often require signed XML to prove the sender's identity and ensure data wasn't modified in transit."
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
              caveat: "Private keys must stay private",
              explanation: "Never share your private key. Anyone with it can sign documents as you. Store it securely, ideally in a hardware token or HSM."
            },
            {
              caveat: "Signature placement matters",
              explanation: "Enveloped signatures (inside the signed document) require careful handling to avoid signing the signature itself. Canonicalization handles this."
            },
            {
              caveat: "Certificate chains verify identity",
              explanation: "For trusted verification, signers need certificates from a trusted CA. Self-signed certificates work but require manual trust setup."
            },
            {
              caveat: "Timestamps prove signing time",
              explanation: "Adding a trusted timestamp proves the document existed and was signed at a specific time, important for legal and compliance purposes."
            },
            {
              caveat: "Algorithm choice affects security",
              explanation: "Use RSA-2048 or higher, or ECDSA P-256+. Avoid deprecated algorithms like SHA-1 or RSA-1024 for new implementations."
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
              question: "What's the difference between enveloped and enveloping signatures?",
              answer: "Enveloped: signature is inside the document it signs. Enveloping: signature contains the signed data. Detached: signature references external data via URI."
            },
            {
              question: "Can I sign only part of an XML document?",
              answer: "Yes. Use XPath transforms to select specific elements for signing. This is common when multiple parties sign different sections."
            },
            {
              question: "How do I distribute the public key for verification?",
              answer: "Include it in the signature's KeyInfo element, distribute via certificate, or use a public key infrastructure (PKI) with trusted CAs."
            },
            {
              question: "What happens if the signed XML is modified?",
              answer: "Verification will fail. Even changing a single character alters the hash, causing the signature check to reject the document."
            },
            {
              question: "Can XML signatures be copied to fake documents?",
              answer: "No. The signature is computed from the document content. Copying a signature to different content fails verification because hashes won't match."
            },
            {
              question: "Do I need special libraries to verify signatures?",
              answer: "Most platforms have built-in support: .NET has System.Security.Cryptography.Xml, Java has javax.xml.crypto, and browsers support Web Crypto API."
            },
            {
              question: "What's XML canonicalization and why is it needed?",
              answer: "Canonicalization normalizes XML (whitespace, attribute order, etc.) before signing. This ensures semantically identical XML produces the same signature."
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
