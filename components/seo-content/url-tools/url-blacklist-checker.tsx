export default function UrlBlacklistCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool checks if a URL or domain appears on security blacklists maintained by 
            organizations that track malicious websites, helping you verify site safety before visiting or sharing.
          </p>
          <p className="text-muted-foreground">
            The checking process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL normalization:</strong> The input URL is parsed to extract the domain for blacklist checking.</li>
            <li><strong className="text-foreground">Database queries:</strong> The domain is checked against multiple blacklist databases including Google Safe Browsing, phishing lists, and malware databases.</li>
            <li><strong className="text-foreground">Result aggregation:</strong> Results from all sources are combined into a single safety report.</li>
            <li><strong className="text-foreground">Risk assessment:</strong> The tool provides a clear safety status with details about any detected threats.</li>
          </ol>
          <p className="text-muted-foreground">
            Blacklists are updated continuously as new threats are discovered, making this 
            a valuable tool for verifying the safety of links before clicking.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Suspicious Link Verification",
              description: "Before clicking links in emails, messages, or social media, verify they're not known malicious sites."
            },
            {
              title: "Website Security Audits",
              description: "Check your own websites to ensure they haven't been compromised and added to blacklists."
            },
            {
              title: "Email Campaign Validation",
              description: "Verify that links in your marketing emails won't be flagged as suspicious by email providers."
            },
            {
              title: "User-Generated Content Moderation",
              description: "Screen URLs submitted by users before publishing them on your platform."
            },
            {
              title: "Security Incident Response",
              description: "Investigate potentially compromised systems by checking if they're communicating with known bad domains."
            },
            {
              title: "Parental Control Verification",
              description: "Check if websites children want to visit have been flagged for malicious content."
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
              caveat: "Blacklists aren't comprehensive",
              explanation: "New malicious sites appear faster than they can be blacklisted. A clean result doesn't guarantee safety - use other security measures too."
            },
            {
              caveat: "False positives can occur",
              explanation: "Legitimate sites can be incorrectly blacklisted, especially if they're on shared hosting with malicious neighbors. Verify before assuming a site is bad."
            },
            {
              caveat: "Different blacklists have different criteria",
              explanation: "Some focus on malware, others on phishing, spam, or adult content. A site might be on one list but not others depending on the threat type."
            },
            {
              caveat: "Blacklist status changes over time",
              explanation: "Sites can be cleaned and removed from blacklists, or newly compromised and added. Check regularly for time-sensitive decisions."
            },
            {
              caveat: "This tool checks domains, not specific pages",
              explanation: "A domain might be clean overall but have individual malicious pages. Subdirectory-level threats may not be detected."
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
              question: "What happens if my site is blacklisted?",
              answer: "First, identify and remove the malicious content. Then request review from the blacklist provider (Google Safe Browsing has a review process). Prevention through security updates is better than remediation."
            },
            {
              question: "How often are blacklists updated?",
              answer: "Major blacklists like Google Safe Browsing update multiple times per hour. Smaller lists may update daily or weekly. Fresh threats can appear between updates."
            },
            {
              question: "Can a site be blacklisted unfairly?",
              answer: "Yes, through nofault compromises (hacked sites), shared hosting issues (bad neighbors), or false positives. Most blacklist providers have appeal processes for legitimate site owners."
            },
            {
              question: "What types of threats do blacklists track?",
              answer: "Common categories include malware distribution, phishing sites, spam sources, command-and-control servers, exploit kits, and sites hosting illegal content."
            },
            {
              question: "Should I avoid all blacklisted sites?",
              answer: "Generally yes, but understand why it's blacklisted. A site flagged for adult content is different from one distributing malware. Context matters for risk assessment."
            },
            {
              question: "How do sites get removed from blacklists?",
              answer: "Site owners must fix the underlying issue (remove malware, patch vulnerabilities), then request review. Google's Safe Browsing review typically takes a few hours to a few days."
            },
            {
              question: "Can I check multiple URLs at once?",
              answer: "This tool checks one URL at a time. For bulk checking, consider API access to blacklist services or dedicated security scanning platforms."
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
