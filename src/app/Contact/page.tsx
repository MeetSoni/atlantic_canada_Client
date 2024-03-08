'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Service_card from '@/components/service_card/page';
import API_URL from '@/constants/constant';
import ShimmerEffect from '@/components/ShimmerEffect/ShimmerEffect';
import Spinner from '@/components/spinner/page';

interface Service {
  svs_name: string;
  svs_image: string;
  svs_loc: string;
  svs_contact: string;
  svs_info: string;
}

function Page(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added state to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL.GET_SERVICE_DATA, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Service[] = await response.json();
        setServices(data); // Update state with fetched data
        setIsLoading(false); // Set loading status to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Ensure loading status is set to false even on error
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <div className='w-full container flex shadow mt-20'>
        <div className='w-2/4 p-10'>
          <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">Services</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt soluta fugiat cumque beatae in voluptas tempore, deserunt repellat nemo eaque, quibusdam iure aliquam! Voluptates sint blanditiis, quo impedit mollitia libero beatae ipsa facilis numquam nostrum laborum nemo reiciendis voluptate hic ullam culpa odio magnam officiis accusamus delectus dolores dolorem possimus.</p>
        </div>
        <div className='w-2/4 '>
          <Image
            src="/images/service_page.jpg"
            alt="Logo"
            width={0}
            height={50}
            className="w-full"
          />
        </div>
      </div>

      <div className='w-full flex p-10 bg-gradient-to-r from-grad_red to-grad_white'>
        <div className='w-1/4 p-5 border shadow-gray-900 bg-white '>
          <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">Services we provide</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem sed eligendi molestiae nobis provident vel, asperiores ipsum illum architecto vero?</p>
        </div>

        {/* Conditional rendering based on isLoading state */}
        {isLoading ? (
         <Spinner/>
        ) : (
          <Service_card state={services}/>
        )}

      </div>
    </>
  );
}

export default Page;
