import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Config File Validator Online",
  description: "Validate JSON configuration files and check for required keys and correct structure. Our free JSON Config Validator helps prevent misconfiguration errors before deployment.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-config-validator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
