export default function UrlIpAddressLookupSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool looks up the IP address associated with a domain name or hostname using 
            DNS (Domain Name System) resolution - the same system your browser uses to find websites.
          </p>
          <p className="text-muted-foreground">
            The lookup process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Domain input:</strong> Enter a domain name like "example.com" or a full URL.</li>
            <li><strong className="text-foreground">DNS query:</strong> The tool sends a DNS A record query to resolve the domain to its IPv4 address.</li>
            <li><strong className="text-foreground">Response processing:</strong> The returned IP address is displayed along with additional information if available.</li>
            <li><strong className="text-foreground">Multiple records:</strong> For domains with multiple IPs (load balancing), all addresses are shown.</li>
          </ol>
          <p className="text-muted-foreground">
            This is useful for troubleshooting, verifying DNS propagation, identifying server 
            locations, and understanding where a website is actually hosted.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "DNS Propagation Checks",
              description: "After changing DNS records, verify the new IP address is resolving correctly from your location."
            },
            {
              title: "Website Troubleshooting",
              description: "Diagnose connectivity issues by confirming a domain resolves to the expected IP address."
            },
            {
              title: "Server Migration Verification",
              description: "After moving a website to a new server, confirm the domain points to the new IP."
            },
            {
              title: "Competitor Analysis",
              description: "Identify hosting providers and server infrastructure used by other websites."
            },
            {
              title: "Security Investigations",
              description: "Look up IP addresses associated with suspicious domains during security research."
            },
            {
              title: "Network Configuration",
              description: "Get IP addresses for hosts file entries, firewall rules, or network documentation."
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
              caveat: "Results vary by location",
              explanation: "CDNs and geo-DNS serve different IPs based on your location. Someone in Europe might see a different IP than someone in Asia for the same domain."
            },
            {
              caveat: "Some domains don't resolve directly",
              explanation: "Domains using certain CDNs or proxy services (like Cloudflare) show the CDN's IP, not the origin server's actual IP address."
            },
            {
              caveat: "IPv6 addresses may differ",
              explanation: "This tool typically shows IPv4 addresses. Domains may have different IPv6 addresses (AAAA records) for next-generation internet protocol."
            },
            {
              caveat: "DNS caching affects results",
              explanation: "Your local DNS cache or ISP's cache might show old records. Use incognito mode or flush DNS cache for fresh results."
            },
            {
              caveat: "Some domains have no A records",
              explanation: "Domains configured only for email (MX records) or using CNAME aliases may not return direct IP addresses."
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
              question: "Why does a domain have multiple IP addresses?",
              answer: "Multiple IPs indicate load balancing or redundancy. Traffic is distributed across servers for performance and reliability. Large sites often have dozens of IPs across different data centers."
            },
            {
              question: "Can I find the physical location of an IP?",
              answer: "IP geolocation gives approximate location (city/region level) but isn't exact. The IP shows where the server is registered, not necessarily its physical location. CDNs complicate this further."
            },
            {
              question: "Why doesn't the IP match the hosting provider?",
              answer: "The domain might use a CDN, reverse proxy, or DNS service that masks the origin IP. The returned IP belongs to the intermediary service, not the actual web server."
            },
            {
              question: "How long does DNS propagation take?",
              answer: "Typically 24-48 hours globally, but varies by TTL (Time To Live) settings. Some DNS servers respect TTL strictly, others cache longer. Use this tool from different locations to check progress."
            },
            {
              question: "Can I look up my own IP with this tool?",
              answer: "This tool resolves domain names to IPs. To find your own public IP, you'd need a different tool that shows your outgoing connection's IP address."
            },
            {
              question: "What's the difference between A and AAAA records?",
              answer: "A records map domains to IPv4 addresses (like 192.168.1.1). AAAA records map to IPv6 addresses (like 2001:db8::1). This tool typically shows A records."
            },
            {
              question: "Why would I need to know a website's IP address?",
              answer: "Common reasons: bypassing DNS issues, configuring hosts files, setting up firewall rules, verifying server migrations, or troubleshooting network connectivity problems."
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
