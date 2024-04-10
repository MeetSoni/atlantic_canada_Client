'use client'
import React, { useEffect, useState } from 'react';
import API_URL from '@/constants/constant';

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
            'Content-Type': 'application/json',
          },
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
    <div className="container mx-auto p-8 ">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Best Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-
3 lg:grid-cols-3 gap-8">
{state.map((item, index) => (
<div key={index} className="flex flex-col rounded-lg shadow-lg bg-white overflow-hidden h-auto flex justify-between">
<iframe
           className="w-full h-48"
           src={item.url_webapp}
           title="YouTube video player"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           allowFullScreen
         ></iframe>
<div className="p-6 flex-grow">
<div className="font-bold text-xl mb-2 text-gray-800" style={{ minHeight: '64px' }}>{item.title}</div>
</div>
<div className="px-6 pb-4 flex justify-between items-center">

</div>
</div>
))}
</div>
</div>
);
}

export default Page;

