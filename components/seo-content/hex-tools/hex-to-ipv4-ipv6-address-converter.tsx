export default function HexToIpv4Ipv6AddressConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This hex to IP converter translates between hexadecimal representation and
            standard IPv4/IPv6 network addresses.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Identify whether input is hex or IP address format.</li>
            <li><strong className="text-foreground">Byte extraction:</strong> Parse the hex string into individual bytes (2 hex chars = 1 byte).</li>
            <li><strong className="text-foreground">Address construction:</strong> For IPv4: 4 bytes become dotted decimal. For IPv6: 16 bytes become colon-separated hex groups.</li>
            <li><strong className="text-foreground">Validation:</strong> Verify the resulting address is valid according to IP addressing standards.</li>
          </ol>
          <p className="text-muted-foreground">
            Network protocols often represent IP addresses in hex format internally,
            making this conversion essential for network programming and analysis.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Network Packet Analysis",
              description: "Decode IP addresses from packet captures that display addresses in hexadecimal format."
            },
            {
              title: "Database Storage",
              description: "Convert IP addresses to hex for compact storage in databases, then back for display."
            },
            {
              title: "Firewall Rule Configuration",
              description: "Translate hex values from network logs into readable IP addresses for firewall rules."
            },
            {
              title: "Reverse Engineering",
              description: "Understand network-related code that stores or transmits IP addresses as hex values."
            },
            {
              title: "IPv6 Address Manipulation",
              description: "Work with IPv6 addresses in their raw hex form for subnetting or address generation."
            },
            {
              title: "Security Research",
              description: "Analyze malware or exploits that obfuscate IP addresses using hex encoding."
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
              caveat: "Byte order (endianness) matters",
              explanation: "Network byte order is big-endian. Some systems store IPs in little-endian. The tool typically uses network order."
            },
            {
              caveat: "IPv4 uses 4 bytes (8 hex chars)",
              explanation: "An IPv4 address like 192.168.1.1 becomes C0A80101 in hex (8 characters, no separators)."
            },
            {
              caveat: "IPv6 uses 16 bytes (32 hex chars)",
              explanation: "IPv6 addresses require 32 hex characters. They're often displayed with :: compression for readability."
            },
            {
              caveat: "Leading zeros may be omitted",
              explanation: "Hex input may have varying numbers of digits. The tool should handle both padded and unpadded input."
            },
            {
              caveat: "Some hex values aren't valid IPs",
              explanation: "Not every 8 or 32 character hex string represents a valid IP. Some ranges are reserved or invalid."
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
              question: "How do I convert 192.168.1.1 to hex?",
              answer: "Convert each octet: 192=C0, 168=A8, 1=01, 1=01. Result: C0A80101 (or 0xC0A80101 with prefix)."
            },
            {
              question: "What's the hex for localhost (127.0.0.1)?",
              answer: "7F000001. Breaking it down: 127=7F, 0=00, 0=00, 1=01."
            },
            {
              question: "Can IPv6 addresses be converted too?",
              answer: "Yes. IPv6 uses 128 bits (16 bytes = 32 hex chars). Example: 2001:0db8:85a3::8a2e:0370:7334 has a hex representation."
            },
            {
              question: "Why would IPs be stored as hex?",
              answer: "Compactness, easier binary operations, consistent with how they're stored in memory and transmitted over networks."
            },
            {
              question: "What's network byte order?",
              answer: "Big-endian format used in network protocols. Most significant byte first. x86 CPUs use little-endian, requiring conversion."
            },
            {
              question: "Are there special hex IP formats?",
              answer: "Yes. Some tools use 0x prefix, some add dots (C0.A8.01.01), some reverse byte order. Know your source format."
            },
            {
              question: "Can I convert hostnames to hex?",
              answer: "Not directly. First resolve the hostname to an IP (DNS lookup), then convert the IP to hex."
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
