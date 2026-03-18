export default function XmlXpathTesterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XPath tester lets you evaluate XPath expressions against your XML document directly in the browser.
            It uses the browser's native DOMParser and XPathEvaluator APIs to process queries without sending
            your data to any server.
          </p>
          <p className="text-muted-foreground">
            The evaluation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> Your XML input is parsed into a DOM document structure.</li>
            <li><strong className="text-foreground">Compile XPath:</strong> The XPath expression is compiled into an executable query.</li>
            <li><strong className="text-foreground">Evaluate:</strong> The query runs against the DOM, returning matching nodes or values.</li>
            <li><strong className="text-foreground">Display results:</strong> Matched nodes, their count, and values are shown with highlighting.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool supports XPath 1.0 functions like count(), text(), contains(), and positional predicates.
            Results update instantly as you type, making it easy to debug complex expressions.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Debugging XPath in XSLT stylesheets",
              description: "You're writing an XSLT transformation and the select attribute isn't matching. Test the XPath here first before debugging the full stylesheet."
            },
            {
              title: "Extracting data from XML feeds",
              description: "Working with an RSS feed or SOAP response? Build and test the XPath that pulls out exactly the nodes you need."
            },
            {
              title: "Learning XPath syntax",
              description: "Students studying XML technologies can experiment with predicates, axes, and functions to see immediate results."
            },
            {
              title: "Validating XML against business rules",
              description: "Use XPath with count() and boolean functions to check constraints like 'every order must have at least one item'."
            },
            {
              title: "Testing XPath in code before deployment",
              description: "Developers using XPath in Java, .NET, or Python can verify their expressions work correctly before writing unit tests."
            },
            {
              title: "Scraping structured XML data",
              description: "When automating data extraction from XML sources, prototype your XPath queries here to ensure they're robust."
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
              caveat: "Browser XPath support varies",
              explanation: "Most browsers support XPath 1.0. XPath 2.0+ features like regex or advanced functions may not work in all environments."
            },
            {
              caveat: "Namespaces must be declared",
              explanation: "If your XML uses namespaces, you need to declare them in the XPath evaluator. Unprefixed elements in namespaced XML won't match without proper setup."
            },
            {
              caveat: "Case sensitivity matters",
              explanation: "Element and attribute names are case-sensitive. <Product> and <product> are different elements in XPath."
            },
            {
              caveat: "Position is 1-based, not 0-based",
              explanation: "XPath uses 1-based indexing. The first node is position 1, not 0. This trips up JavaScript developers frequently."
            },
            {
              caveat: "Text() vs string values",
              explanation: "text() returns text nodes. Using the string value of an element includes all descendant text. Know which one you need."
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
              question: "What's the difference between / and // in XPath?",
              answer: "/ selects from the root or current context. // selects from anywhere in the document. /book/title gets direct children; //title gets all title elements anywhere."
            },
            {
              question: "How do I select attributes in XPath?",
              answer: "Use the @ prefix. @id selects the id attribute. //book[@category='fiction'] finds books with category='fiction'."
            },
            {
              question: "Can I use logical operators in XPath?",
              answer: "Yes. Use and, or, and not(). Example: //book[price > 10 and price < 50] finds books priced between 10 and 50."
            },
            {
              question: "What does the count() function return?",
              answer: "count() returns the number of nodes in a node-set. count(//book) gives the total number of book elements in the document."
            },
            {
              question: "How do I handle namespaces in XPath?",
              answer: "You need to register namespace prefixes with the evaluator. In this tool, declare namespaces and use prefixes like ns:element in your XPath."
            },
            {
              question: "What's the difference between . and .. in XPath?",
              answer: ". refers to the current node (self). .. refers to the parent node. Use .. to navigate up the tree from your context."
            },
            {
              question: "Can XPath modify XML documents?",
              answer: "No. XPath is a query language for selecting nodes, not modifying them. Use XSLT or DOM manipulation for changes."
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
