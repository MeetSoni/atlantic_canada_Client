'use client'
import React, { useEffect, useState } from 'react';
import  API_URL  from '@/constants/constant';

interface Video {
  title: string;
  url_webapp: string;
}

function Page(): JSX.Element {
  const [state, setState] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL.YOUTUBE}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { videos: Video[] }[] = await response.json();
        console.log(data[0].videos);
        const newdata = data[0].videos;
        setState(newdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     <div className="container mx-auto py-8 bg-gradient-to-r from-grad_red to-grad_white">
  <h1 className="text-3xl font-bold mb-4 text-center">Best Videos</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center items-center">
    {state.map((item, index) => (
      <div key={index} className="max-w-sm rounded shadow-lg overflow-hidden bg-white">
        <iframe
          width="100%"
          height="200"
          src={item.url_webapp}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="object-cover h-40 md:h-48 lg:h-56"
        ></iframe>
        <div className="px-6 py-4">
          <div className="font-bold text-lg mb-2 text-customRed">{item.title}</div>
         
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-customRed text-white px-3 py-1 text-sm font-semibold rounded-full mr-2">Category: </span>
          <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full"> Views</span>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default Page;

