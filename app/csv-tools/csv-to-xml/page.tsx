import CsvToXml from "@/components/csv-tools/csv-to-xml";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to XML Converter - Transform CSV to XML with Custom Element Names",
  description:
    "Convert CSV files to XML format. Configure root element name, row element name, and attribute-based output. Free online CSV to XML converter.",
  openGraph: {
    title: "CSV to XML Converter - Transform CSV to XML with Custom Element Names",
    description:
      "Convert CSV to XML with configurable element names and attribute output.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-xml",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">


        <CsvToXml />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into well-formed XML documents. Each CSV row becomes an XML element, and each column becomes either a child element or an attribute. You control the root element name, row element name, and output structure.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            XML Output Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Root element name:</strong> The wrapper element for the entire document. Default is "data". Use something meaningful like "products", "customers", or "orders".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row element name:</strong> Each CSV row becomes this element. Default is "row". Consider "product", "customer", "record", etc.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Child elements (default):</strong> Columns become nested elements like {"<name>Alice</name>"}.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Attributes mode:</strong> Columns become XML attributes like {"<row name=\"Alice\" age=\"30\" />"}.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>XML declaration:</strong> Output includes {'<?xml version="1.0" encoding="UTF-8"?>'} for proper XML parsing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversions
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`name,age,city
Alice,30,New York
Bob,25,Los Angeles`}
          </pre>
          <p className="text-muted-foreground mb-4">Output XML (child elements):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`<?xml version="1.0" encoding="UTF-8"?>
<data>
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
          <p className="text-muted-foreground mb-4">Output XML (attributes):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
            {`<?xml version="1.0" encoding="UTF-8"?>
<data>
  <row name="Alice" age="30" city="New York"/>
  <row name="Bob" age="25" city="Los Angeles"/>
</data>`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use XML
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Legacy system integration:</strong> Many enterprise systems, especially older ones, use XML for data exchange.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>SOAP APIs:</strong> SOAP-based web services require XML-formatted request and response bodies.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration files:</strong> Some applications use XML for configuration (Java Spring, .NET app.config).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Document formats:</strong> Office Open XML (.docx, .xlsx) and OpenDocument formats are XML-based.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data publishing:</strong> RSS feeds, sitemaps, and syndication formats use XML.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            XML Escaping
          </h2>
          <p className="text-muted-foreground mb-4">
            Special characters in CSV data are properly escaped for XML:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&amp; becomes &amp;amp;</strong>
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&lt; becomes &amp;lt;</strong>
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&gt; becomes &amp;gt;</strong>
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>" becomes &amp;quot;</strong>
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>' becomes &amp;apos;</strong>
          </p>
          <p className="text-muted-foreground mb-6">
            This ensures the output is valid XML that parses correctly in any XML parser.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Child Elements vs Attributes
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Use child elements when:</strong> Values might be empty (attributes can't distinguish empty from missing), you need extensibility for nested structures, or readability matters.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Use attributes when:</strong> Data is simple and atomic, you want more compact output, or the target system expects attribute-based XML.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Flat structure only:</strong> CSV is flat, so the XML output is flat. Nested XML structures require manual editing after conversion.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Element name validation:</strong> Custom element names must be valid XML names (start with letter or underscore, no spaces or special characters).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> XML is verbose. A 1MB CSV may become 3-5MB of XML. Works best with files under 20MB.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I customize the XML structure further?</h3>
          <p className="text-muted-foreground mb-4">
            This tool provides basic customization (root name, row name, elements vs attributes). For complex XML schemas, use XSLT or a scripting language after conversion.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this validate against an XSD schema?</h3>
          <p className="text-muted-foreground mb-4">
            No. This tool generates well-formed XML but doesn't validate against specific schemas. Use an XML validator if schema compliance is required.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert XML back to CSV?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the XML to CSV tool. It extracts repeating element structures and flattens them into CSV rows and columns.
          </p>
        </div>
      </div>
    </>
  );
}
