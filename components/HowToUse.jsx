"use client";
import React from 'react';

export default function HowToUse() {
  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        How to Use This Tool
      </h2>
      <ol className="list-decimal pl-6 space-y-3 text-gray-800 dark:text-gray-300 text-lg">
        <li>
          <span className="font-semibold">Enter your JEE Main rank</span> and select your <span className="font-semibold">category</span> (such as Open, OBC-NCL, SC, ST, etc.).
        </li>
        <li>
          Choose your preferred <span className="font-semibold">type of college</span> (NIT, IIIT, GFTI, or All).
        </li>
        <li>
          Select your <span className="font-semibold">home state (domicile)</span> and <span className="font-semibold">gender</span> if required.
        </li>
        <li>
          Click on <span className="font-semibold">"Predict My Colleges"</span> to view the list of colleges and courses where you may be eligible.
        </li>
        <li>
          Review your eligible options, check opening/closing ranks, and use the "chance" indicator to understand your admission probability.
        </li>
        <li>
          If you get no results, try adjusting your filters or contact support through the FAQs page for more help.
        </li>
      </ol>
    </section>
  );
}
