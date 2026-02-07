import Faqs from '@/components/utils/Faqs';
import React from 'react';

const FaqDemoPage = () => {
  const sampleFaqs = [
    {
      question: 'How do I get started with the service?',
      answer: 'Getting started is simple. Just sign up for an account, verify your email, and you can begin using our services immediately.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal and bank transfers.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'Do you offer technical support?',
      answer: 'Absolutely! Our technical support team is available 24/7 via email and live chat to assist you with any questions or issues.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Security is our top priority. We use industry-standard encryption protocols and follow best practices to ensure your data remains secure.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">FAQ Component Demo</h1>
        <Faqs faqs={sampleFaqs} />
      </div>
    </div>
  );
};

export default FaqDemoPage;