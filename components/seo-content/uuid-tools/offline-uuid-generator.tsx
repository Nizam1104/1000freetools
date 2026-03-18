import React from "react"

export default function OfflineUuidGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Generate UUIDs entirely in your browser without any network requests. The generator uses cryptographically secure random number generation (crypto.getRandomValues) to create UUID version 4 identifiers.
          </p>
          <p>
            Since all processing happens locally, you can generate UUIDs even without an internet connection. This is essential for offline-first applications, air-gapped systems, and privacy-sensitive environments.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example generated UUIDs:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Offline-generated UUID v4:
f47ac10b-58cc-4372-a567-0e02b2c3d479
7d4e8f2a-1b3c-4d5e-8f9a-0b1c2d3e4f5a
9e3f7a2b-6c8d-4e1f-a9b0-c1d2e3f4a5b6

Each UUID is:
- 128 bits of randomness
- Version 4 (random)
- Format: 8-4-4-4-12 hex digits</pre>
          </div>
          <p>
            The generator follows RFC 4122 specification for UUID version 4. It sets the version bits to 4 and variant bits to 10xx, ensuring compatibility with UUID parsers worldwide.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Offline-first mobile apps</h3>
            <p className="text-sm text-muted-foreground">
              Mobile apps need to create records while offline. Generate UUIDs locally for new items, sync to server when connectivity returns. No need to wait for server-assigned IDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Privacy-sensitive applications</h3>
            <p className="text-sm text-muted-foreground">
              Generating UUIDs client-side means the server never sees your random number generation. For privacy-focused apps, this prevents any potential fingerprinting through ID patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Air-gapped development environments</h3>
            <p className="text-sm text-muted-foreground">
              Secure facilities block internet access. Developers still need unique identifiers for testing. Offline UUID generation works without compromising security policies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Progressive Web Apps (PWAs)</h3>
            <p className="text-sm text-muted-foreground">
              PWAs work offline using service workers. UUID generation must also work offline. Client-side generation ensures consistent behavior regardless of network status.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">High-volume ID generation</h3>
            <p className="text-sm text-muted-foreground">
              Generating thousands of UUIDs? Doing it client-side reduces server load and latency. No API calls needed - just generate as many as you need instantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing and development</h3>
            <p className="text-sm text-muted-foreground">
              Need test data with unique IDs? Generate UUIDs offline without hitting rate limits or consuming API quotas. Perfect for seeding development databases.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Uses cryptographically secure randomness.</strong>
              The generator uses crypto.getRandomValues(), which provides cryptographically strong random values. This is suitable for most applications but not for cryptographic keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No server dependency means no coordination.</strong>
              Unlike server-generated UUIDs, there's no central authority. This is fine for UUID v4 since the collision probability is astronomically low even without coordination.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser support is excellent.</strong>
              crypto.getRandomValues() is supported in all modern browsers, including mobile. For very old browsers (IE 10 and below), a fallback would be needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Generated UUIDs are version 4.</strong>
              Offline generation produces random UUIDs (v4). If you need time-based UUIDs (v1), those require access to system time and potentially MAC address, which may not be available offline.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For distributed systems, combine offline UUID generation with a node identifier. This gives you the benefits of local generation with guaranteed uniqueness across nodes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is offline UUID generation secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, when using crypto.getRandomValues(). This API provides cryptographically strong random numbers. However, don't use UUIDs as cryptographic keys - they're identifiers, not secrets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the collision probability?</h3>
            <p className="text-sm text-muted-foreground">
              For UUID v4, you'd need to generate about 2.71 quintillion UUIDs to have a 1 in a billion chance of collision. Practically impossible for any real application.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I generate UUIDs in Node.js offline?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Node.js has crypto.randomBytes() for secure random generation. The uuid npm package works offline. Same principle: generate locally without network calls.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many UUIDs can I generate at once?</h3>
            <p className="text-sm text-muted-foreground">
              As many as you need. Generation is instantaneous - millions per second on modern hardware. The only limit is your application's memory and processing capacity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do offline UUIDs work with online systems?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, UUID v4 is a standard format. Whether generated offline or online, all valid UUIDs work together. Servers can't distinguish between offline and online generated UUIDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if crypto.getRandomValues isn't available?</h3>
            <p className="text-sm text-muted-foreground">
              In modern browsers, it's always available. For legacy support, fall back to Math.random() (less secure) or use a polyfill. Most applications can require modern browsers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I verify an offline-generated UUID?</h3>
            <p className="text-sm text-muted-foreground">
              Use a UUID regex tester to validate format. But you can't verify "authenticity" - there's no signature or central registry. Any properly formatted UUID is valid.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
