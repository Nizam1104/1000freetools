import CsvJoinMerge from "@/components/csv-tools/csv-join-merge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Join/Merge - SQL-Style Joins on Two CSV Files (Inner, Left, Right, Full)",
  description:
    "Join two CSV files using SQL-style joins: inner, left, right, full outer. Match on key columns like database JOIN operations. Free online CSV join tool.",
  openGraph: {
    title: "CSV Join/Merge - SQL-Style Joins on Two CSV Files",
    description:
      "Perform SQL-style joins (inner, left, right, full) on two CSV files.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-join-merge",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvJoinMerge />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool joins two CSV files based on a common key column, similar to SQL JOIN operations. Upload a left table and right table, select the key column from each, choose the join type, and get a merged CSV with combined data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Join Types
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inner Join:</strong> Only rows where the key exists in BOTH tables. Excludes unmatched rows from both sides.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Left Join:</strong> All rows from the left table, plus matching rows from the right. Unmatched right columns are empty.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Right Join:</strong> All rows from the right table, plus matching rows from the left. Unmatched left columns are empty.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Full Outer Join:</strong> All rows from both tables. Unmatched columns from either side are empty.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Inner Join
          </h2>
          <p className="text-muted-foreground mb-4">Left table (customers.csv):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`customer_id,name
1,Alice
2,Bob
3,Charlie`}
          </pre>
          <p className="text-muted-foreground mb-4">Right table (orders.csv):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`customer_id,product,amount
1,Widget,100
2,Gadget,50
4,Gizmo,75`}
          </pre>
          <p className="text-muted-foreground mb-4">Inner Join on customer_id:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`customer_id,name,product,amount
1,Alice,Widget,100
2,Bob,Gadget,50`}
          </pre>
          <p className="text-muted-foreground mb-4">Result: Only customers with orders (Charlie excluded, order for customer 4 excluded)</p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Left Join
          </h2>
          <p className="text-muted-foreground mb-4">Left Join on customer_id:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`customer_id,name,product,amount
1,Alice,Widget,100
2,Bob,Gadget,50
3,Charlie,,`}
          </pre>
          <p className="text-muted-foreground mb-6">Result: All customers, with order data where available. Charlie has no order, so product and amount are empty.</p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use Each Join Type
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inner Join:</strong> When you only want records that exist in both datasets. Example: Find customers who have placed orders.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Left Join:</strong> When you want all records from the primary table plus any matching data. Example: List all customers with their orders (if any).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Right Join:</strong> Less common. Use when the right table is your primary focus. Example: List all orders with customer info (including orphaned orders).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Full Outer Join:</strong> When you need everything from both tables. Example: Complete audit of customers and orders, including unmatched records on both sides.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Customer + Order data:</strong> Join customer profiles with transaction history for analysis.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Product + Inventory:</strong> Combine product catalog with stock levels.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Employee + Department:</strong> Merge employee records with department information.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Student + Grades:</strong> Join student roster with grade records.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data enrichment:</strong> Add additional attributes to existing data by joining on a common key.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Prefixes
          </h2>
          <p className="text-muted-foreground mb-4">
            When both tables have columns with the same name (other than the key), use prefixes to avoid conflicts:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Left prefix:  left_
Right prefix: right_

Result: left_name, right_name, customer_id, left_amount, right_amount`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Key Matching
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Exact matching:</strong> Keys must match exactly (case-sensitive). "Alice" and "alice" won't match.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data types:</strong> Keys are compared as strings. "1" and "001" are different keys.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Tip:</strong> Clean and normalize key columns before joining for best results.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Two tables only:</strong> This tool joins exactly two CSV files. For multiple joins, chain operations or use a database.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Memory:</strong> Both files load into memory. Files over 50MB each may cause performance issues.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Many-to-many joins:</strong> If keys aren't unique, you get a Cartesian product (all combinations). This may create many more rows than expected.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if my key columns have different names?</h3>
          <p className="text-muted-foreground mb-4">
            Select the appropriate key column from each table. They can have different names — the tool matches on values, not column names.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I join on multiple columns?</h3>
          <p className="text-muted-foreground mb-4">
            This tool supports single-column joins. For composite keys, merge the key columns first or use a database.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle duplicate keys?</h3>
          <p className="text-muted-foreground mb-6">
            Duplicate keys create multiple output rows (Cartesian product). Deduplicate your data before joining if you want one-to-one matches.
          </p>
        </div>
      </div>
    </>
  );
}
