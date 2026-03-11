export default function MacAddressRegexSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This MAC address validator checks if strings match valid Media Access Control 
            address formats used for network interface identification.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Input is checked against common MAC address formats (colon, hyphen, dot separated).</li>
            <li><strong className="text-foreground">Hex validation:</strong> Each segment must contain valid hexadecimal characters (0-9, A-F).</li>
            <li><strong className="text-foreground">Length verification:</strong> MAC addresses must have exactly 12 hex digits (6 bytes).</li>
            <li><strong className="text-foreground">Format normalization:</strong> Valid addresses can be converted to standard format.</li>
          </ol>
          <p className="text-muted-foreground">
            MAC address validation is essential for network administration, device 
            management, and security systems that use hardware-based identification.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Network Device Registration",
              description: "Validate MAC addresses when registering devices for network access control."
            },
            {
              title: "DHCP Configuration",
              description: "Verify MAC addresses in DHCP reservation configurations."
            },
            {
              title: "Security Whitelisting",
              description: "Validate MAC addresses for network access control lists."
            },
            {
              title: "Inventory Management",
              description: "Ensure device MAC addresses are correctly recorded in asset databases."
            },
            {
              title: "Network Troubleshooting",
              description: "Verify MAC address format when diagnosing network connectivity issues."
            },
            {
              title: "IoT Device Setup",
              description: "Validate MAC addresses during IoT device onboarding and configuration."
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
              caveat: "Multiple formats are valid",
              explanation: "00:1A:2B:3C:4D:5E, 00-1A-2B-3C-4D-5E, and 001A.2B3C.4D5E are all valid. Format depends on system requirements."
            },
            {
              caveat: "Case doesn't matter",
              explanation: "MAC addresses are case-insensitive. 00:1a:2b and 00:1A:2B are equivalent."
            },
            {
              caveat: "First 3 bytes identify manufacturer",
              explanation: "The OUI (Organizationally Unique Identifier) identifies the manufacturer. Can be looked up in OUI databases."
            },
            {
              caveat: "MAC addresses can be spoofed",
              explanation: "Validation confirms format, not authenticity. MAC addresses can be changed in software on most devices."
            },
            {
              caveat: "IPv6 uses modified MAC format",
              explanation: "EUI-64 format inserts FF:FE in the middle and flips a bit for IPv6 address generation."
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
              question: "What's the regex for MAC addresses?",
              answer: "Colon format: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/. Hyphen format: /^([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}$/. Cisco format: /^[0-9A-Fa-f]{4}\\.[0-9A-Fa-f]{4}\\.[0-9A-Fa-f]{4}$/"
            },
            {
              question: "What are the common MAC address formats?",
              answer: "Unix/Linux: 00:1A:2B:3C:4D:5E (colon). Windows: 00-1A-2B-3C-4D-5E (hyphen). Cisco: 001A.2B3C.4D5E (dot-separated groups of 4)."
            },
            {
              question: "Can MAC addresses contain letters?",
              answer: "Yes, A-F (or a-f) are valid hex digits. MAC addresses use hexadecimal (0-9, A-F) to represent 6 bytes."
            },
            {
              question: "What's a broadcast MAC address?",
              answer: "FF:FF:FF:FF:FF:FF is the broadcast address, sent to all devices on a network segment."
            },
            {
              question: "How do I find my MAC address?",
              answer: "Windows: ipconfig /all. macOS/Linux: ifconfig or ip link. Look for 'Physical Address' or 'ether'."
            },
            {
              question: "Are MAC addresses unique?",
              answer: "They should be globally unique, assigned by IEEE to manufacturers. However, virtual machines and spoofing can create duplicates."
            },
            {
              question: "What's the difference between MAC and IP?",
              answer: "MAC is hardware-based, permanent (usually), local network only. IP is software-assigned, can change, works across networks."
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
