import XmlToCsv from "@/components/csv-tools/xml-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML to CSV Converter - Parse XML and Extract Data to CSV",
  description:
    "Convert XML files to CSV format. Extracts repeating element structures from both attribute-based and element-based XML. Free online XML to CSV converter.",
  openGraph: {
    title: "XML to CSV Converter - Parse XML and Extract Data to CSV",
    description:
      "Convert XML to CSV by extracting repeating element structures.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/xml-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <XmlToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool parses XML documents and extracts repeating data structures into flat CSV format. It uses the browser's DOMParser to read XML, identifies repeating elements (like rows), and flattens their content into columns. Works with both attribute-based and child element-based XML.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Supported XML Formats
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Attribute-based XML:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`<data>
  <row name="Alice" age="30" city="New York"/>
  <row name="Bob" age="25" city="Los Angeles"/>
</data>`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Element-based XML:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`<data>
  <row>
    <name>Alice</name>
    <age>30</age>
    <city>New York</city>
  </row>
  <row>
    <name>Bob</name>
    <age>25</age>
    <city>Los Angeles</city>
  </row>
</data>`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Both formats convert to the same CSV output with columns: name, age, city.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter selection:</strong> Choose comma, semicolon, pipe, or tab as the output delimiter for your CSV.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Automatic structure detection:</strong> The tool identifies the repeating element pattern and extracts all unique fields as columns.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>API response analysis:</strong> Convert XML API responses to CSV for quick inspection in Excel or Google Sheets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Legacy data migration:</strong> Extract data from XML exports of old systems for import into modern databases.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>RSS feed processing:</strong> Convert RSS or Atom feeds to CSV for content analysis or archival.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration data extraction:</strong> Pull settings or data from XML configuration files into spreadsheet format.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Report generation:</strong> Transform XML data exports into CSV reports for stakeholders who prefer spreadsheets.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool parses XML using the browser's built-in DOMParser. It finds the first level of repeating elements and extracts:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Attributes:</strong> All attributes on repeating elements become columns.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Child elements:</strong> Direct child element text content becomes column values.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Mixed content:</strong> If XML has both attributes and child elements, both are extracted as separate columns.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Deep nesting:</strong> Only the first level of repeating elements extracts. Deeply nested structures flatten to the first level only.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Mixed structures:</strong> If different rows have different child elements, columns are the union of all elements. Missing values become empty cells.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Arrays in XML:</strong> Repeating child elements within a row (like multiple &lt;tag&gt; elements) don't convert cleanly to CSV.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> Works best with XML files under 20MB. Large files may cause slow parsing in the browser.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if my XML has namespaces?</h3>
          <p className="text-muted-foreground mb-4">
            Namespaces are stripped during extraction. Element names like "ns:item" become "item" in the CSV headers.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this handle large XML files?</h3>
          <p className="text-muted-foreground mb-4">
            The entire XML file loads into browser memory for parsing. Files over 20MB may cause slow performance or memory issues.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this work with RSS feeds?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. RSS feeds have repeating &lt;item&gt; elements with child elements like &lt;title&gt;, &lt;link&gt;, &lt;description&gt;. These extract cleanly to CSV.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert CSV back to XML?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the CSV to XML tool. You can configure root element name, row element name, and choose between child elements or attributes output.
          </p>
        </div>
      </div>
    </>
  );
}
