export default function UrlWaybackMachineCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool checks the Internet Archive's Wayback Machine to see historical versions 
            of any website, allowing you to view how pages looked in the past.
          </p>
          <p className="text-muted-foreground">
            The lookup process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL submission:</strong> The target URL is submitted to the Wayback Machine API.</li>
            <li><strong className="text-foreground">Archive search:</strong> The system searches for all archived snapshots of that URL.</li>
            <li><strong className="text-foreground">Timeline display:</strong> Available snapshots are shown on a timeline with dates.</li>
            <li><strong className="text-foreground">Access:</strong> Click any snapshot to view the archived version of the page.</li>
          </ol>
          <p className="text-muted-foreground">
            The Wayback Machine has archived over 800 billion web pages since 1996, making it 
            an invaluable resource for research, verification, and digital preservation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Historical Research",
              description: "View how websites looked in the past for academic research or nostalgia."
            },
            {
              title: "Content Verification",
              description: "Verify what content appeared on a page at a specific date for legal or journalistic purposes."
            },
            {
              title: "Competitor Analysis",
              description: "Track how competitor websites have evolved their design, messaging, and offerings over time."
            },
            {
              title: "Recovering Lost Content",
              description: "Find and recover content from your own website that was accidentally deleted."
            },
            {
              title: "Domain Research",
              description: "Check what websites previously occupied a domain before you acquired it."
            },
            {
              title: "SEO Analysis",
              description: "Analyze historical SEO changes, content strategies, and site structure evolution."
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
              caveat: "Not all pages are archived",
              explanation: "The Wayback Machine doesn't capture everything. Some sites block archiving via robots.txt, and many pages are simply never crawled."
            },
            {
              caveat: "Archives may be incomplete",
              explanation: "Captured pages may have broken images, missing stylesheets, or non-functional forms. The HTML is preserved but external resources may not be."
            },
            {
              caveat: "Frequency varies by site",
              explanation: "Popular sites are archived frequently (daily or weekly). Smaller sites might have only a few snapshots per year."
            },
            {
              caveat: "Some content is excluded",
              explanation: "Sites can request exclusion from archiving. Sensitive or private content may be retroactively removed upon request."
            },
            {
              caveat: "JavaScript functionality is limited",
              explanation: "Archived pages may not execute JavaScript properly. Dynamic content and modern web apps may not function as originally intended."
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
              question: "How far back does the Wayback Machine go?",
              answer: "The earliest archives date to 1996. Coverage varies by site - some have continuous archives for decades, others have sporadic snapshots."
            },
            {
              question: "Can I save a page to the Wayback Machine?",
              answer: "Yes! Use the 'Save Page Now' feature on archive.org to immediately archive any public URL. This is useful before making major site changes."
            },
            {
              question: "Why are some dates highlighted and others not?",
              answer: "Highlighted dates indicate successful captures. Circle size often represents the number of captures that day. Gray dates have no archives."
            },
            {
              question: "Can I download archived pages?",
              answer: "You can view them in your browser and save manually. Bulk downloading requires using their API or specialized tools like wayback-machine-downloader."
            },
            {
              question: "Are Wayback Machine archives admissible in court?",
              answer: "Yes, they're frequently used as evidence. Courts generally accept them with proper authentication. The Archive can provide certified copies for legal proceedings."
            },
            {
              question: "How do I find a specific version from a certain date?",
              answer: "Use the calendar view to navigate to your target date. Green/blue highlighted dates have captures. Click the timestamp for that day's snapshot."
            },
            {
              question: "Can website owners remove archives?",
              answer: "Yes, owners can request removal via archive.org's exclusion policy. Future archiving can be blocked via robots.txt, though this may also remove existing archives."
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
