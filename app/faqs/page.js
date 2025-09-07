"use client";
import React, { useState } from 'react';

function Page() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqsData = [
    {
      id: 1,
      question: 'What is the JEE Main College Predictor?',
      answer: 'The JEE Main College Predictor is a tool that helps you find the list of colleges you may be eligible for based on your JEE Main rank, category, and other preferences.'
    },
    {
      id: 2,
      question: 'At some ranks no college eligible is shown, Why?',
      answer: (
        <div className="space-y-4">
          <p>There could be several reasons why no colleges are shown as eligible for a particular rank:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-medium">High Rank:</span> Your rank might not be in the range of previous year OR-CR range, so no college is filtered. Try approximating your rank by +/- 100 ranks for better results.</li>
           <li>
  <span className="font-medium">Data Limitations:</span> The predictions are based on previous year&apos;s cutoff data (JoSAA 2024, 5th round). Please note that cutoffs can vary each year due to factors such as exam difficulty, number of applicants, and seat availability.
</li>

            <li><span className="font-medium">Filters:</span> Selected filters may limit the result set. Adjust filters to broaden the results.</li>
          </ul>
          <p>If unsure, contact us at <a href="mailto:support@gmail.com" className="text-blue-300 hover:underline">support@gmail.com</a>.</p>
        </div>
      )
    },
    {
      id: 3,
      question: 'How accurate is the prediction?',
      answer: 'The predictions are based on JoSAA (2023) data and provide a good estimate, but actual cutoffs can vary.'
    },
    {
      id: 4,
      question: 'Can I rely on this tool for my final college decision?',
      answer: 'It is a guidance tool. Always refer to official sources and counseling for final decisions.'
    },
    {
      id: 5,
      question: 'What if I encounter issues using the tool?',
      answer: 'Please contact us at infincodes@gmail.com if you have any questions.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className='p-5 min-h-screen bg-gray-100 dark:bg-gray-800'>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqsData.map(({ id, question, answer }) => (
          <div key={id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleFaq(id)}
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <span className="font-medium text-lg">{question}</span>
              <span className={`transform transition-transform ${openFaq === id ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <div className={`px-6 pb-4 transition-all duration-300 ease-in-out ${openFaq === id ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="text-gray-700 dark:text-gray-300 text-base">
                {answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
