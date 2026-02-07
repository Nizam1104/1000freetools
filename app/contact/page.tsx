import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Mail us your queries, bug reports, or tool requests
          </p>
          
          <div className="flex justify-center py-4">
            <Link href="mailto:contact@1000freetools.com">
              <Button variant="default" size="lg" className="text-lg px-6">
                contact@1000freetools.com
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-center">We'll get back to you as soon as possible!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}