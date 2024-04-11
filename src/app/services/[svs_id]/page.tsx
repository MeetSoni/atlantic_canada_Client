'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Subservice_card from '@/components/subservice_card/page';
import { useParams } from 'next/navigation';
import API_URL from '@/constants/constant';
import { useAppContext } from '@/context';

interface SubService {
  svs_id: string;
  subsvs_name: string;  
  subsvs_img: string;
  subsvs_desc: string;
  subsvs_short_desc: string;
  subsvs_links: string;
  subsvs_youtube_url: string;
}

interface PageProps {
  params: {
    svs_id: string;
  };
}

function Page({ params }: PageProps) {
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added state to track loading status.
  const { auth_provinceId }=useAppContext();
  const { selectedItemId}=useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Ensure loading state is true when starting to fetch data
      try {
        console.log(params.svs_id);
        const response = await fetch(`${API_URL.GET_SERVICE_DATA}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            serviceId: selectedItemId, // Use params.svs_id from props
            provinceId: auth_provinceId // Update with the correct provinceId value
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: SubService[] = await response.json();
        console.log(data);

        setSubServices(data); // Update the state with the fetched data
        setIsLoading(false); // Set loading state to false after data is fetched

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Ensure loading state is false even when an error occurs
      }
    };

    fetchData();
  }, [params.svs_id]); // Add params.svs_id as a dependency to re-fetch data when it changes

  return (
    <>
      <div className=''>
        {isLoading ? (
          <div>Loading data...</div> // Display this message while isLoading is true
        ) : (
          <Subservice_card state={subServices} /> // Render the Subservice_card component once data is loaded
        )}
      </div>
    </>
  );
}

export default Page;
