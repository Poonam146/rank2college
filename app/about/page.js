"use client";
import React from 'react';
import Image from 'next/image';

function AboutPage() {
  return (
    <div className="p-5 min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-md px-8 py-10">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 text-center">
          <span className="font-semibold"> JEE Main College Predictor</span>
        </p>
        <div className="mb-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Designed to help students make informed decisions
            about <span className="font-medium">college admissions based on JEE Main ranks</span>.
            Our platform provides personalized lists of eligible colleges as per your preferences and previous years  data for a smooth counseling process.
          </p>
          <p className="mt-4">
            Whether you &apos; re aiming for NITs, IIITs, or GFTIs, College Nexus is a reliable guidance tool, making your college search simpler and clearer.
            We update our predictions with the latest available cutoff data each year for the best accuracy.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col items-center">
        


<Image
  src="https://ui-avatars.com/api/?name=Poonam+Mahawar&background=5a67d8&color=fff&size=128"
  alt="Developer: Poonam Mahawar"
  width={80}
  height={80}
  className="rounded-full shadow-lg mb-4"
/>

          <div className="text-gray-900 dark:text-gray-100 font-semibold">
            Developed by Poonam Mahawar
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            IIIT Bhagalpur | Batch of 2027
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
