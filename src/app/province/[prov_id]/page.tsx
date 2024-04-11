'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import API_URL from '@/constants/constant';
import Spinner from '@/components/spinner/page';

// Define the Service interface
interface Service {
  _id: string;
  province: string;
  description: string;
  provincial_gov_website: string;
  latest_news: {
    title: string;
    date: string;
    desc: string;
    link: string;
  }[];
  images: string[];
  youtube_videos: {
    title: string;
    url_webapp: string;
    url_mobileapp: string;
  }[];
  svs_id: string;
}

interface PageProps {
  params: {
    prov_id: string;
    token: string;
  };
}

// Define the Page component
function Page({ params }: PageProps): JSX.Element {
  const [services, setServices] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [news, setNews] = useState<{ title: string; date: string; desc: string; link: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch(` ${API_URL.PROVINCE_BY_ID}/${params.prov_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setServices(data);
        setImages(data.images);
        setVideos(data.youtube_videos);
        setNews(data.latest_news);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.prov_id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!services) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="px-4 mt-10">
      <div className="rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl text-center font-bold mb-4">{services.province}</h1>
          <p className="text-base mb-4">{services.description}</p>
          <h2 className="text-lg font-semibold mb-2">Province Link:</h2>
          <a href={services.provincial_gov_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{services.provincial_gov_website}</a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 mt-10">
        {images.map((image, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden m-auto aspect-w-1 aspect-h-1 shadow-lg">
            <img
              src={image}
              alt={`Image ${index}`}
              className="object-cover w-full h-full rounded-lg transition transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition duration-300 flex items-center justify-center">
              <p className="text-white text-center">Click to enlarge</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8 mb-8">
        {videos.map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg bg-white overflow-hidden">
            <iframe
              className="w-full h-48"
              src={item.url_webapp}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="p-6">
              <div className="font-bold text-xl mb-2 text-gray-800" style={{ minHeight: '64px' }}>
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {news.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
              <a href={item.link} className="text-blue-500 hover:underline text-sm">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
