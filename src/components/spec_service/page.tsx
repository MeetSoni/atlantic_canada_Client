'use client'
import React from 'react';
import Link from 'next/link';

interface FAQ {
  que: string;
  ans: string;
  // Add other properties if needed
}

interface SubService {
  svs_id: string;
  subsvs_name: string;
  subsvs_img: string;
  subsvs_desc: string;
  subsvs_links: string;
  subsvs_youtube_url: string;
}

interface ServiceCardProps {
  state: FAQ[];
}

function Page({ state }: ServiceCardProps): JSX.Element {
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-customRed text-center mb-8">Frequently Asked Questions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2.5 gap-6 bg-gradient-to-r from-grad_red to-grad_white">
          {state.map((item, index) => (
            <div key={index} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg ">
              <div className="px-6 py-4 flex flex-col h-full">
                <div className="font-bold text-customRed text-xl mb-2 min-h-[4rem]">
                  <h1>{item.que}</h1>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 text-base min-h-[6rem]">{item.ans}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
