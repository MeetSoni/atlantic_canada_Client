'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Service_card from '@/components/service_card/page';
import API_URL from '@/constants/constant';
import ShimmerEffect from '@/components/ShimmerEffect/ShimmerEffect';
import Spinner from '@/components/spinner/page';
import { motion , AnimatePresence} from 'framer-motion';


interface Service {
  _id:string;
  svs_id:string;
  svs_name: string;
  svs_image: string;
  svs_loc: string;
  svs_contact: string;
  svs_info: string;
}

function Page(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceimg,setserviceimg]=useState('https://imgvisuals.com/cdn/shop/products/animated-studying-girl-character-648111.gif?v=1697059330');
  const [isLoading, setIsLoading] = useState(true); // Added state to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL.GET_ALL_SERVICE_DATA, {
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
      <div className='   md:flex lg:flex shadow mt-20'>
        <div className='lg:w-2/4 md:w-full  p-10'>
          <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">Services</h1>
          <p>Atlantic Canada is a region in eastern Canada consisting of four provinces: Newfoundland and Labrador, Prince Edward Island, Nova Scotia, and New Brunswick. Each province has its own unique culture, landscapes, and economic opportunities. Here is some general information about each province app services:</p>
        </div>
        <div className='lg:w-2/4 md:w-full '>
          <img
            src={serviceimg}
            alt="Logo"
            width={0}
            height={50}
            className="w-full"
          />
        </div>
      </div>

      <div className='w-full lg:flex  p-10 bg-gradient-to-r '>
        <div className='lg:w-1/4 p-5  shadow-gray-900  '>
          <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">Services we provide</h1>
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ scale: 1 }}
                animate={{ scale: 0.9 }}
                exit={{ scale:0.9 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: index * 0.1 }}
                className="bg-white mt-10 p-4 border shadow-md rounded-md"
              >
                <h2 className="text-lg font-bold mb-2">{service.svs_name}</h2>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Conditional rendering based on isLoading state */}
        {isLoading ? (
         <ShimmerEffect/>
        ) : (
          <Service_card state={services}/>
        )}

      </div>
    </>
  );
}

export default Page;
