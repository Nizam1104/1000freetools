export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Disclaimer</h1>

      <p>
        1000FreeTools is a collection of browser-based utilities. They&apos;re
        free to use, but there are a few things you should know before relying
        on them for anything important.
      </p>

      <section>
        <h2 className="text-xl font-semibold">
          Results aren&apos;t guaranteed
        </h2>
        <p>
          The tools work well in most cases, but we can&apos;t promise
          they&apos;ll always produce accurate or complete results. If
          you&apos;re using output from these tools for something with real
          consequences — a medical decision, a legal document, financial
          calculations — verify it independently.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Your call, your responsibility
        </h2>
        <p>
          Whatever you do with the output is on you. We built these tools to be
          genuinely useful, but we&apos;re not in the loop on how you apply
          them. Decisions you make based on results from this site are your own.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Uploaded files</h2>
        <p>
          Some tools let you upload images, PDFs, or text. We process them to do
          what the tool promises, nothing more. We&apos;re not responsible for
          the content you upload or what happens if you upload something you
          shouldn&apos;t.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Liability</h2>
        <p>
          1000FreeTools and its owner are not liable for damages — direct or
          indirect — that result from using or being unable to use these tools.
          That includes data loss, incorrect outputs, or anything downstream of
          those.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Using this site means you accept this
        </h2>
        <p>You use these tools at your own risk. That&apos;s the deal.</p>
      </section>
    </main>
  );
}
