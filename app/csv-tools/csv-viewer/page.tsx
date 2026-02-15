"use client";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import TableRender from "@/components/table-utils/TableRenderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Head from "next/head";

import ToolLinkCards from "@/components/utils/ToolLinkCards";

const CSVViewerPage = () => {
  const relatedTools = [
    {
      name: "Mock Data Generator",
      description: "Generate Test Data, 120+ fields, unlimited rows",
      href: "/csv-tools/csv-viewer",
    },
  ];
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [header, setHeader] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 20000;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate the data slice for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFileName(file.name);

    Papa.parse(file, {
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const parsedData = results.data as string[][];
          const headerRow = parsedData[0];
          const bodyData = parsedData.slice(1);

          const transformedData = bodyData.map((row) => {
            const obj: Record<string, string> = {};
            headerRow.forEach((header, index) => {
              obj[header] = row[index] || "";
            });
            return obj;
          });

          setHeader(headerRow);
          setData(transformedData);
        } else {
          setHeader([]);
          setData([]);
        }
        setCurrentPage(1);
        setIsLoading(false);
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
        setIsLoading(false);
      },
      skipEmptyLines: true,
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my CSV file safe when I upload it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your files are completely safe. Everything happens right in your browser—your CSV never gets uploaded to any server. It stays on your computer the whole time.",
        },
      },
      {
        "@type": "Question",
        name: "What's the largest CSV file I can view?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can view files with millions of rows. We show 20,000 rows at a time to keep things running smoothly, but you can navigate through all your data using the page controls.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nope! This tool works entirely in your web browser. No downloads, no installations, no sign-ups required.",
        },
      },
      {
        "@type": "Question",
        name: "Can I view files with different delimiters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! While we're optimized for standard comma-separated files, the viewer also works with tab-separated (TSV) and other common delimiters.",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>
          Free CSV Viewer Online - View CSV Files Instantly in Browser
        </title>
        <meta
          name="description"
          content="View CSV files instantly with our free online CSV viewer. No installation needed. Fast, secure, and supports large files. Preview your data in seconds."
        />
        <meta
          name="keywords"
          content="csv viewer, online csv viewer, view csv file, csv file reader, csv preview, free csv viewer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yoursite.com/csv-viewer" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Free CSV Viewer Online - View CSV Files Instantly"
        />
        <meta
          property="og:description"
          content="View CSV files instantly with our free online CSV viewer. No installation needed. Fast, secure, and supports large files."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/csv-viewer" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free CSV Viewer Online - View CSV Files Instantly"
        />
        <meta
          name="twitter:description"
          content="View CSV files instantly with our free online CSV viewer. No installation needed. Fast, secure, and supports large files."
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="mx-auto max-w-6xl flex flex-col min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            CSV Viewer
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
            Upload your CSV file and view it instantly in a clean table format.
            No downloads or installations needed—just drag, drop, and explore
            your data right here in your browser.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
            <Button
              onClick={triggerFileInput}
              variant="default"
              className="w-full max-w-md"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Upload CSV File"}
            </Button>
          </div>

          {error && (
            <div className="w-full p-4 bg-destructive/10 text-destructive rounded-md mt-4">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {data.length === 0 && !isLoading && !fileName && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex flex-col items-center text-center max-w-md">
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  No CSV file uploaded
                </h3>
                <p className="text-muted-foreground mt-2">
                  Upload a CSV file to view its contents in the table
                </p>
              </div>
            </div>
          )}
        </div>

        {data.length > 0 && (
          <div className="mt-8 space-y-4 flex flex-col flex-1 min-h-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {endIndex - startIndex} of {data.length} rows with{" "}
                {header.length} columns - Page {currentPage} of {totalPages}
              </div>
            </div>

            <Separator />

            <div className="overflow-auto border">
              <TableRender<Record<string, string>>
                data={currentData}
                maxTableHeightInPx={700}
              />
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {currentPage > 2 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(1);
                            }}
                            isActive={1 === currentPage}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage - 1);
                          }}
                          isActive={false}
                        >
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        isActive={true}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage + 1);
                          }}
                          isActive={false}
                        >
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(totalPages);
                            }}
                            isActive={totalPages === currentPage}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-[300px] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              What Are CSV Files?
            </h2>
            <p className="mb-3 text-muted-foreground">
              CSV files are simple text files that store data in rows and
              columns, kind of like a basic spreadsheet. They're super popular
              because almost every program can read them—from Excel to databases
              to analytics tools.
            </p>
            <p className="mb-3 text-muted-foreground">
              People use CSV files to export data from databases, share
              information between different apps, backup spreadsheets, or move
              data around without worrying about compatibility issues.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Why Use This Viewer?
            </h2>
            <p className="mb-3 text-muted-foreground">
              Sometimes you just want to peek at a CSV file without opening
              Excel or importing it into a database. That's where we come in.
              This viewer lets you see what's inside your file instantly, right
              in your browser.
            </p>
            <p className="mb-3 text-muted-foreground">
              Plus, everything stays private—your file never leaves your
              computer. We built this to be fast, simple, and completely secure
              for handling your data.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            How to Use the CSV Viewer
          </h2>
          <p className="mb-4 text-muted-foreground">
            It's pretty straightforward. Click the upload button, choose your
            CSV file, and you'll see it laid out in a nice table format. You can
            scroll through rows and columns to check your data, spot any issues,
            or just get a quick overview of what's inside.
          </p>
          <p className="text-muted-foreground">
            For larger files, we'll paginate the results so everything loads
            smoothly. Use the navigation controls at the bottom to jump between
            pages and explore your entire dataset.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 text-foreground text-lg">
                Is my CSV file safe when I upload it?
              </h3>
              <p className="text-muted-foreground">
                Yes, your files are completely safe. Everything happens right in
                your browser—your CSV never gets uploaded to any server. It
                stays on your computer the whole time.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground text-lg">
                What's the largest CSV file I can view?
              </h3>
              <p className="text-muted-foreground">
                You can view files with millions of rows. We show 20,000 rows at
                a time to keep things running smoothly, but you can navigate
                through all your data using the page controls.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground text-lg">
                Do I need to install anything?
              </h3>
              <p className="text-muted-foreground">
                Nope! This tool works entirely in your web browser. No
                downloads, no installations, no sign-ups required.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground text-lg">
                Can I view files with different delimiters?
              </h3>
              <p className="text-muted-foreground">
                Yes! While we're optimized for standard comma-separated files,
                the viewer also works with tab-separated (TSV) and other common
                delimiters.
              </p>
            </div>
          </div>
        </div>
        <ToolLinkCards tools={relatedTools} />
      </div>
    </>
  );
};

export default CSVViewerPage;
