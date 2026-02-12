import type { Metadata } from 'next';
import MockDataGenerator from '@/components/developer-tools/mockdata-generator/MockDataGenerator';
import Script from 'next/script';
import Faqs from '@/components/utils/Faqs';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
    title: 'Free Mock Data Generator – CSV, JSON, Excel Test Data Online',
    description: 'Generate realistic test data instantly with our free mock data generator. Create datasets in multiple formats including CSV, JSON, Excel, XML, SQL, and HTML.',
    openGraph: {
        title: 'Free Mock Data Generator Tool',
        description: 'Create realistic test data in seconds. Generate CSV, JSON, Excel files with customizable fields and data types.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Mock Data Generator Tool',
        description: 'Create realistic test data in seconds. Generate CSV, JSON, Excel files with customizable fields and data types.',
    },
    alternates: {
        canonical: 'https://1000freetools.com/tools/mock-data-generator'
    },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is this mock data generator free to use?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, the tool is completely free with no registration required. You can generate as many datasets as you need for your projects."
            }
        },
        {
            "@type": "Question",
            "name": "How many rows can I generate at once?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Depending on your device, number of columns, and selected data types, you can generate up to a million rows or more."
            }
        },
        {
            "@type": "Question",
            "name": "Can I create custom data types?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You can create custom options using the Random Element from Array field type by providing comma-separated values."
            }
        },
        {
            "@type": "Question",
            "name": "Will my field configuration be saved?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, your field configuration is automatically saved in your browser's local storage and restored when you return."
            }
        },
        {
            "@type": "Question",
            "name": "What file formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The tool supports CSV, JSON, Excel (.xlsx), XML, SQL INSERT statements, and HTML table formats."
            }
        },
        {
            "@type": "Question",
            "name": "Can I include blank or null values?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You can specify a blank percentage for each field to simulate real-world incomplete data."
            }
        }
    ]
};

export default function MockDataGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd),
                }}
            />
            <div className='mb-2 sm:mb-4 md:-6'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/developer-tools">Developer Tools</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/developer-tools/mock-data-generator">
                                Mock Data Generator
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Mock Data Generator</h1>
                <p className="text-xl text-muted-foreground">
                    Create test data for your development and testing needs for absolutely free upto a million rows with 120+ data types.
                </p>
            </header>

            <MockDataGenerator />

            <article className="mt-16 mx-auto px-2 sm:px-4 prose prose-neutral dark:prose-invert">

                {/* How to Use */}
                <section className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        How to Use the Mock Data Generator
                    </h2>

                    <ol className="mt-4 space-y-2 text-base sm:text-lg">
                        <li>Add the number of fields you need</li>
                        <li>Enter meaningful field names</li>
                        <li>Select appropriate data types (name, age, UUID, etc.)</li>
                        <li>Configure blank or null percentage if required</li>
                        <li>Select an output format (CSV, JSON, Excel, SQL, XML)</li>
                        <li>Enter the number of rows and click <strong>Generate</strong></li>
                    </ol>
                </section>

                {/* What the tool does */}
                <section className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        What This Mock Data Generator Can Do
                    </h2>

                    <p className="mt-4 text-base sm:text-lg">
                        This free mock data generator helps developers, testers, and data engineers
                        create realistic dummy data for development, testing, and performance benchmarking.
                    </p>

                    <p className="mt-2 text-base sm:text-lg">
                        The tool supports more than <strong>120 data types</strong> including names,
                        numbers, emails, UUIDs, dates, IDs, and custom values. You can generate
                        datasets with up to <strong>one million rows</strong>, depending on your device.
                    </p>
                </section>

                {/* Use cases */}
                <section className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Common Use Cases for Dummy Data Generation
                    </h2>

                    <div className="mt-4 space-y-4 text-base sm:text-lg">
                        <p>
                            <strong>Frontend performance testing:</strong>
                            Generate large datasets (100,000+ rows) to test how tables, lists,
                            and virtualized components perform in your UI.
                        </p>

                        <p>
                            <strong>API load and stress testing:</strong>
                            Create thousands of JSON objects to simulate real-world API payloads
                            and measure request handling, throughput, and response times.
                        </p>

                        <p>
                            <strong>Database testing:</strong>
                            Populate SQL or NoSQL databases with realistic mock data to test queries,
                            indexing, migrations, and overall database performance.
                        </p>

                        <p>
                            <strong>Prototyping and demos:</strong>
                            Quickly generate meaningful sample data for demos, client presentations,
                            or internal tools without exposing real user information.
                        </p>
                    </div>
                </section>

                {/* Supported formats */}
                <section className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Supported File Formats
                    </h2>

                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-base sm:text-lg">
                        <li>CSV</li>
                        <li>JSON</li>
                        <li>Excel (.xlsx)</li>
                        <li>XML</li>
                        <li>SQL INSERT statements</li>
                        <li>HTML tables</li>
                    </ul>
                </section>

            </article>


            <section className=''>
                <h2 className='text-base sm:text-xl md:text-2xl font-semibold'>Frequently Asked Question</h2>
                <Faqs
                    faqs={[
                        {
                            question: "Is this mock data generator free to use?",
                            answer: "Yes, the tool is completely free with no registration required. You can generate as many datasets as you need for your projects."
                        },
                        {
                            question: "How many rows can I generate at once?",
                            answer: "Depending on your device, number of columns, and selected data types, you can generate up to a million rows or more."
                        },
                        {
                            question: "Can I create custom data types?",
                            answer: "Yes. You can create custom options using the Random Element from Array field type by providing comma-separated values."
                        },
                        {
                            question: "Will my field configuration be saved?",
                            answer: "Yes, your field configuration is automatically saved in your browser's local storage and restored when you return."
                        },
                        {
                            question: "What file formats are supported?",
                            answer: "The tool supports CSV, JSON, Excel (.xlsx), XML, SQL INSERT statements, and HTML table formats."
                        },
                        {
                            question: "Can I include blank or null values?",
                            answer: "Yes. You can specify a blank percentage for each field to simulate real-world incomplete data."
                        }
                    ]}
                />
            </section>
        </div>
    );
}
