"use client";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqsProps = {
  faqs: FaqItem[];
};

export default function Faqs({ faqs }: FaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto py-6">
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full text-left p-4 sm:p-5 md:p-6 hover:bg-opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-opacity-50 transition-colors duration-200"
            >
              <span className="pr-4 text-sm sm:text-base md:text-lg font-medium flex-grow leading-relaxed">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 text-xl sm:text-2xl font-bold min-w-[24px] sm:min-w-[30px] text-right transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-answer-${index}`}
                  className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
