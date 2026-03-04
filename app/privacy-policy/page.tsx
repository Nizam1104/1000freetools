export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy policy</h1>

      <p>
        Short version: most tools run entirely in your browser, we don&apos;t
        ask you to sign up, and we&apos;re not selling your data. Here&apos;s
        the longer version.
      </p>

      <section>
        <h2 className="text-xl font-semibold">What we collect</h2>
        <p>
          Not much. You don&apos;t need an account to use anything on this site.
          We don&apos;t collect your name, email, or any personal details just
          to let you use a tool.
        </p>
        <p className="mt-2">
          We may use basic analytics (like page view counts) to understand how
          the site is being used. That data is anonymous and tells us things
          like &quot;the image compressor got 500 uses today,&quot; not anything
          about you specifically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Files you upload</h2>
        <p>
          Some tools require you to upload a file — an image, PDF, or text
          document. Those files are processed to do what the tool says it does.
          We don&apos;t store them after processing, and we don&apos;t use them
          for anything else.
        </p>
        <p className="mt-2">
          That said, if you&apos;re uploading something sensitive, it&apos;s
          worth understanding that browser-based tools still involve your
          device, your network, and sometimes a server. Use your judgment.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>
          The site may use cookies for basic things like remembering preferences
          or tracking session state. We don&apos;t use tracking cookies to
          follow you around the web.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Third-party services</h2>
        <p>
          We use a third-party analytics tool to understand how people use the
          site. It collects anonymous data — pages visited, time on site, that
          sort of thing. It doesn&apos;t know who you are.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Updates to this policy</h2>
        <p>
          If something changes significantly, we&apos;ll update this page. The
          date at the top will reflect when it was last revised.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Questions</h2>
        <p>
          If you have questions about how your data is handled, reach out
          through the contact page.
        </p>
      </section>
    </main>
  );
}
