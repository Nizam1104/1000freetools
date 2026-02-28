import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JMESPath Query Tool – Run JMESPath Online",
  description: "Execute JMESPath expressions on JSON for advanced filtering, projection, and transformation. Our free JMESPath tool is ideal for AWS CLI users and developers working with complex JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/jmespath-query",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
