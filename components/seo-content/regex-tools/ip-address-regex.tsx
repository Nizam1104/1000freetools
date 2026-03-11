export default function IpAddressRegexSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This IP address validator checks if strings match valid IPv4 or IPv6 address 
            formats, ensuring network addresses are properly formatted.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Version detection:</strong> Input is checked for IPv4 (dotted decimal) or IPv6 (hexadecimal) format.</li>
            <li><strong className="text-foreground">Segment validation:</strong> Each segment is verified to be within valid range (0-255 for IPv4).</li>
            <li><strong className="text-foreground">Format verification:</strong> Overall structure is checked (4 segments for IPv4, 8 for IPv6).</li>
            <li><strong className="text-foreground">Special address detection:</strong> Private, loopback, and reserved ranges are identified.</li>
          </ol>
          <p className="text-muted-foreground">
            IP address validation is essential for network configuration, security 
            systems, logging, and any application that processes network addresses.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Network Configuration",
              description: "Validate IP addresses when configuring network settings and connections."
            },
            {
              title: "Firewall Rules",
              description: "Verify IP addresses in firewall and access control configurations."
            },
            {
              title: "Log Analysis",
              description: "Extract and validate IP addresses from server and application logs."
            },
            {
              title: "Geolocation Services",
              description: "Validate IP addresses before looking up geographic location data."
            },
            {
              title: "Security Monitoring",
              description: "Check IP addresses in security alerts and intrusion detection systems."
            },
            {
              title: "API Rate Limiting",
              description: "Validate and track IP addresses for rate limiting and abuse prevention."
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
              caveat: "IPv4 and IPv6 are different",
              explanation: "IPv4: 192.168.1.1 (4 numbers). IPv6: 2001:0db8:85a3::8a2e:0370:7334 (8 hex groups). Validate based on expected version."
            },
            {
              caveat: "Some addresses are reserved",
              explanation: "127.0.0.1 is loopback, 10.x.x.x and 192.168.x.x are private, 0.0.0.0 is special. Valid format doesn't mean routable."
            },
            {
              caveat: "Leading zeros can be ambiguous",
              explanation: "192.168.001.001 might be interpreted as octal. Standard notation doesn't use leading zeros."
            },
            {
              caveat: "IPv6 has compression rules",
              explanation: ":: represents consecutive zero groups. 2001:db8::1 is valid shorthand. Only one :: allowed per address."
            },
            {
              caveat: "Port numbers are separate",
              explanation: "192.168.1.1:8080 includes a port. Validate IP and port separately. IPv6 ports use brackets: [::1]:8080"
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
              question: "What's the regex for IPv4?",
              answer: "Basic: /^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/. Strict (valid ranges): /^(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.(same)\\.(same)\\.(same)$/"
            },
            {
              question: "What's the regex for IPv6?",
              answer: "Complex due to compression. Basic: /^[0-9a-fA-F:]+$/. Full validation requires checking segment count and :: rules."
            },
            {
              question: "Is 256.1.1.1 a valid IP?",
              answer: "No. Each IPv4 segment must be 0-255. 256 exceeds the maximum. This is a common validation error."
            },
            {
              question: "What's a private IP address?",
              answer: "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. These aren't routable on the public internet."
            },
            {
              question: "What is 127.0.0.1?",
              answer: "Loopback address - refers to the local machine. Used for testing and local services. Also called 'localhost'."
            },
            {
              question: "Can IP addresses start with 0?",
              answer: "Technically yes (0.0.0.0 is valid), but leading zeros in segments are non-standard and may be interpreted as octal."
            },
            {
              question: "How do I validate IP with port?",
              answer: "Split on last colon for IPv4 (192.168.1.1:8080). For IPv6, parse bracketed format ([::1]:8080). Validate IP and port separately."
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
