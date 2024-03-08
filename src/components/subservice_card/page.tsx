import React from 'react';
import Link from 'next/link';

interface SubService {
  svs_id: string;
  subsvs_name: string;
  subsvs_img: string;
  subsvs_desc: string;
  subsvs_short_desc: string;
  subsvs_links: string;
  subsvs_youtube_url: string;
}

interface ServiceCardProps {
  state: SubService[];
}

function Page({ state }: ServiceCardProps) {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-10 py-10 gap-6 bg-gradient-to-r from-grad_red to-grad_white'>
        {state.map((item, index) => (
          <div key={index} className="flex flex-col justify-between rounded-lg bg-white overflow-hidden shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
            <img src={item.subsvs_img} alt="Photo" className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col"> {/* Use flex container for content */}
              <div className="font-bold text-customRed text-xl mb-2">{item.subsvs_name}</div>
              <p className="text-gray-700 text-base flex-1">{item.subsvs_short_desc}</p> {/* Flex-1 for content to push button down */}
              <Link href={`/services/${item.svs_id}/${item.subsvs_name}`}>
                <button className="mt-4 bg-customRed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center transition-colors duration-200 ease-in-out">
                  Explore More
                </button>
              </Link>
            </div>  
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
