import React from "react"

export default function JwtSecretKeyGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the JWT Secret Key Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates cryptographically secure keys for signing and verifying JSON Web Tokens.
            It supports three key types: HMAC (symmetric), RSA (asymmetric), and ECDSA (elliptic curve), each with different security characteristics.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Key Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select the key type: HMAC for simple setups, RSA or ECDSA for asymmetric signing</li>
            <li>For HMAC, choose the key size: 256-bit, 384-bit, or 512-bit</li>
            <li>Click &quot;Generate Key&quot; to create a cryptographically random key</li>
            <li>For RSA/ECDSA, a public/private key pair is generated using the Web Crypto API</li>
            <li>Keys are formatted in PEM format for easy copy-paste into configuration files</li>
            <li>Copy the generated key(s) and store them securely in your application</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Setting Up New Authentication System</h3>
            <p className="text-sm text-muted-foreground">
              A developer building a new API needs a secure secret for JWT signing. They generate a 256-bit HMAC key
              and configure it in their authentication middleware environment variables.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Migrating to Asymmetric Keys</h3>
            <p className="text-sm text-muted-foreground">
              A team moving from monolithic to microservices architecture needs separate signing and verification keys.
              They generate an RSA key pair - private key stays with the auth service, public key is distributed to other services.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Key Rotation Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Following security best practices, an engineer generates new keys quarterly.
              They use this tool to create replacement keys before the old ones expire.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Development Environment Setup</h3>
            <p className="text-sm text-muted-foreground">
              A developer setting up a local development environment needs test keys that match production key types.
              They generate keys of the same type but different values for safe local testing.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">ECDSA for Mobile/Embedded Applications</h3>
            <p className="text-sm text-muted-foreground">
              A mobile team chooses ECDSA keys for their smaller size and faster verification.
              The shorter keys reduce bandwidth and improve performance on resource-constrained devices.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding key types and security considerations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>HMAC keys are symmetric - the same key signs and verifies tokens</li>
            <li>RSA and ECDSA are asymmetric - private key signs, public key verifies</li>
            <li>256-bit HMAC (HS256) is secure for most applications</li>
            <li>RSA keys are larger but widely supported across all platforms</li>
            <li>ECDSA keys are smaller and faster but require newer library support</li>
            <li>Keys are generated using browser&apos;s crypto.getRandomValues() - cryptographically secure</li>
            <li>Store private keys securely - never commit them to version control</li>
            <li>PEM format includes BEGIN/END markers for easy identification</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Which key type should I choose?</h3>
            <p className="text-sm text-muted-foreground">
              For simple single-service applications, HMAC (HS256) is easiest. For microservices or when you need to distribute
              verification capability without signing capability, use RSA (RS256) or ECDSA (ES256).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How long should my HMAC secret be?</h3>
            <p className="text-sm text-muted-foreground">
              Match the key size to your algorithm: 256 bits for HS256, 384 bits for HS384, 512 bits for HS512.
              Longer keys provide more security but the algorithm strength is the limiting factor.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between public and private keys?</h3>
            <p className="text-sm text-muted-foreground">
              The private key signs tokens and must be kept secret. The public key verifies tokens and can be shared.
              Never share your private key - if it&apos;s compromised, attackers can forge tokens.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I use the same key for multiple applications?</h3>
            <p className="text-sm text-muted-foreground">
              It&apos;s better to use separate keys for each application. If one key is compromised, only that application is affected.
              Use descriptive names in your key management to track which key belongs to which service.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How often should I rotate JWT keys?</h3>
            <p className="text-sm text-muted-foreground">
              Security best practices suggest rotating keys every 90 days, or immediately if you suspect compromise.
              Plan your rotation strategy - with asymmetric keys, you can publish new public keys before retiring old ones.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why are RSA/ECDSA keys so much longer than HMAC keys?</h3>
            <p className="text-sm text-muted-foreground">
              Asymmetric cryptography requires larger keys for equivalent security. A 256-bit ECDSA key provides similar
              security to a 3072-bit RSA key. HMAC can use shorter keys because it&apos;s symmetric cryptography.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
