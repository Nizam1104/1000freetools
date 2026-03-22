"use client";
import Script from "next/script";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqsProps = {
  faqs: FaqItem[];
};

export default function Faqs({ faqs }: FaqsProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full mx-auto py-6">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-center w-full text-left px-1 md:px-4 py-1 md:py-4 sm:p-5 md:p-6">
                <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                  {faq.question}
                </span>
              </div>
              <div
                id={`faq-answer-${index}`}
                className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
