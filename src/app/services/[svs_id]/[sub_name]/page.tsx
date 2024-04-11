'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Specific_service from '@/components/spec_service/page';
import { useParams } from 'next/navigation';
import API_URL from '@/constants/constant';
import Link from 'next/link';
import { useAppContext } from "@/context";

interface FAQ {
  que: string;
  ans: string;
  // Add other properties if needed
}

interface SubService {
  svs_id: string;
  subsvs_name: string;
  subsvs_sub_img: string;
  subsvs_short_desc: string;
  subsvs_img: string;
  subsvs_desc: string;
  subsvs_links: string;
  subsvs_youtube_url: string;
  faq_Que: FAQ[];
  subsvs_url: string;
}

interface PageProps {
  params: {
    svs_id: string;
    sub_name: string;
  };
}

function Page({ params }: PageProps) {
  const [name, setName] = useState<string>('');
  const [moreData, setMoreData] = useState<SubService[]>([]);
  const [state, setState] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const { auth_provinceId } = useAppContext();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when the fetch begins
      try {
        const response = await fetch(
          `${API_URL.GET_SERVICE_DATA}/${params.sub_name}/${auth_provinceId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: SubService[] = await response.json();
        console.log(data)
        setName(data[0].subsvs_name);
        setState(data[0].faq_Que);
        setMoreData(data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Ensure loading state is false on error
      }
    };

    fetchData();
  }, [params.svs_id, params.sub_name]); // Depend on params to refetch if they change

  if (isLoading) {
    return <div>Loading data...</div>; // Show loading message while data is being fetched
  }

  return (
    <>
      {moreData.map((item: SubService, index: number) => (
        <div key={index} className="w-full  md:flex lg:flex  shadow mt-20">
          <div className="lg:w-2/4 md:w-full p-10">
            <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">
              {item.subsvs_name}
            </h1>
            <p>{item.subsvs_desc}</p>
            <div className="w-full container flex justify-center mt-20">
              <Link href={item.subsvs_url}>
                <button className="bg-customRed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-2/4 md:w-full">
            <img
              src={item.subsvs_sub_img}
              alt="Sub Service"
              className="w-full p-7 object-cover"
            />
          </div>
        </div>
      ))}

      <div className='bg-gradient-to-r from-grad_red to-grad_white p-5'>
        <Specific_service state={state} />
      </div>
    </>
  );
}

export default Page;
