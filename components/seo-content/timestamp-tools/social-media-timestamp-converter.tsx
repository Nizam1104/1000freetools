export default function SocialMediaTimestampConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This social media timestamp converter extracts and decodes embedded timestamps
            from Facebook IDs, Twitter Snowflake IDs, and other social platform identifiers.
          </p>
          <p className="text-muted-foreground">
            The extraction and decoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">ID input:</strong> Enter the social media ID (Facebook numeric ID, Twitter Snowflake, etc.).</li>
            <li><strong className="text-foreground">Format detection:</strong> Identify the platform based on ID structure and magnitude.</li>
            <li><strong className="text-foreground">Bit extraction:</strong> Extract the timestamp bits from the ID according to the platform's ID generation algorithm.</li>
            <li><strong className="text-foreground">Date conversion:</strong> Convert the extracted timestamp to a human-readable date and time.</li>
          </ol>
          <p className="text-muted-foreground">
            Many social platforms encode creation timestamps directly in their IDs,
            allowing you to determine when an account, post, or comment was created.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Content Verification",
              description: "Verify when a social media post was actually created to fact-check claims about timing."
            },
            {
              title: "Digital Investigations",
              description: "Determine account creation dates during OSINT investigations or background research."
            },
            {
              title: "Social Media Analysis",
              description: "Analyze posting patterns and account ages for marketing research or competitive analysis."
            },
            {
              title: "Fraud Detection",
              description: "Identify suspicious accounts by checking if creation dates match claimed account history."
            },
            {
              title: "Legal Discovery",
              description: "Establish timelines for social media activity in legal cases or compliance investigations."
            },
            {
              title: "Archive Organization",
              description: "Sort and organize archived social media content by extracting creation dates from IDs."
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
              caveat: "Not all IDs contain timestamps",
              explanation: "Some platforms use random or sequential IDs without embedded timestamps. This tool works only for platforms that encode time in IDs."
            },
            {
              caveat: "Facebook IDs have evolved",
              explanation: "Older Facebook IDs (pre-2012) were simpler. Newer IDs use a different format. The tool handles both where possible."
            },
            {
              caveat: "Twitter Snowflake has specific structure",
              explanation: "Twitter IDs encode timestamp (41 bits), machine ID (10 bits), and sequence (12 bits). Only the timestamp portion is extracted."
            },
            {
              caveat: "Timezone affects displayed time",
              explanation: "Extracted timestamps are typically in UTC. The displayed time may be converted to your local timezone."
            },
            {
              caveat: "IDs can be scraped or faked",
              explanation: "Don't rely solely on ID timestamps for verification. Cross-reference with other evidence when accuracy matters."
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
              question: "How do I find a Facebook ID?",
              answer: "Right-click on a profile/page and view source, or use online FB ID lookup tools. The ID appears in the page's metadata."
            },
            {
              question: "What's a Twitter Snowflake ID?",
              answer: "Twitter's ID format introduced in 2010. It's a 64-bit number encoding timestamp, machine ID, and sequence number."
            },
            {
              question: "Can I determine exact post time from an ID?",
              answer: "Yes, to the millisecond for Twitter. Facebook IDs give approximate creation time. Both are generally accurate."
            },
            {
              question: "Do Instagram IDs work?",
              answer: "Instagram (owned by Meta) uses similar ID structures to Facebook. Some Instagram IDs can be decoded similarly."
            },
            {
              question: "Why would platforms embed timestamps in IDs?",
              answer: "It helps with sorting, distributed ID generation, and database sharding. Chronological ordering is built into the ID."
            },
            {
              question: "Are these timestamps trustworthy?",
              answer: "Generally yes - they're generated by the platform's servers. But they represent server time, not necessarily when the user took the action."
            },
            {
              question: "Can I use this for deleted content?",
              answer: "If you have the ID from an archive or screenshot, yes. The timestamp extraction works regardless of whether the content still exists."
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
