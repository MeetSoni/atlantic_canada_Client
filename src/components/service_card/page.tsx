import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from "@/context";

interface Service {
  _id: string;
  svs_name: string;
  svs_image: string;
  svs_loc: string;
  svs_contact: string;
  svs_info: string;
  svs_id: string;
}

interface ServiceCardProps {
  state: Service[];
}

function Page({ state }: ServiceCardProps) {
  const navigate = useRouter();
  const { authToken, setauthToken } = useAppContext();
  const { auth_userName, setauthuserName } = useAppContext();
  const { auth_provinceId, setprovinceId } = useAppContext();
  const { selectedItemId,setSelectedItemId}=useAppContext();

  const handleExploreClick = (itemId: string) => {
    setSelectedItemId(itemId);
   {authToken ? navigate.push('/services/subservices'): navigate.push('/login')} // Navigate to the subservices page
  };

  

  return (
    <>
      <div className='mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6' style={{ maxWidth: '1200px' }}>
        {state.map((item, index) => (
          <div key={index} className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out h-full"> {/* Flex container for the card */}
            <img src={item.svs_image} alt={item.svs_name} className="w-full h-48 object-cover" />
            <div className="flex-1 p-6 flex flex-col justify-between"> {/* Flex container for content + button */}
              <div>
                <div className="font-bold text-xl text-customRed mb-2">{item.svs_name}</div>
                <p className="text-gray-700 text-base mb-1">
                  {item.svs_loc}
                </p>
                <p className="text-gray-600 text-sm mb-1">{item.svs_contact}</p>
                <p className="text-gray-600 text-sm">{item.svs_info}</p> {/* Removed mb-4 to use space more efficiently */}
              </div>
              <div> {/* This div wraps the button ensuring it stays at the bottom */}
                <button 
                  onClick={() => handleExploreClick(item._id)}
                  className="mt-4 inline-block bg-customRed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center transition-colors duration-200 ease-in-out"
                >
                  Explore More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
