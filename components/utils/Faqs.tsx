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
    <div className="space-y-1">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0">
          <button
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            onClick={() => toggleFaq(index)}
            className="flex justify-between items-center w-full text-left font-medium focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <span className="pr-4">{faq.question}</span>
            <span className="flex-shrink-0 text-lg font-bold min-w-[24px] text-right">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div
              id={`faq-answer-${index}`}
              className="pl-0 sm:pl-2 pr-4 text-sm sm:text-base"
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
