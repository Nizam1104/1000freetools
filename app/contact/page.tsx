import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - 1000 Free Tools",
  description: "Contact us for any queries, bug reports, or tool requests",
  keywords: [
    "contact",
    "support",
    "1000freetools",
    "queries",
    "bug reports",
    "tool requests",
  ],
  alternates: {
    canonical: "https://1000freetools.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-4 min-h-[calc(100vh-200px)] w-full items-center justify-center p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Contact Us</h1>
        <p className="text-muted-foreground">
          Mail us your queries, bug reports, or tool requests
        </p>
      </div>
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-lg">
        <div className="flex justify-center py-4">
          <Link href="mailto:contact@1000freetools.com">
            <Button variant="default" size="lg" className="text-lg px-6">
              contact@1000freetools.com
            </Button>
          </Link>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-center">
            We'll get back to you as soon as possible!
          </p>
        </div>
      </Card>
    </div>
  );
}
