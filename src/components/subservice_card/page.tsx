'use client'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import Link from 'next/link';
import API_URL from '@/constants/constant';

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
  const [provinces, setProvinces] = useState<any[]>([]);
  const { auth_provinceId, setprovinceId } = useAppContext();
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [onload,setonload]=useState(false)
  const [subServiceData, setSubServiceData] = useState<SubService[]>([]);

  useEffect(() => {
    setSubServiceData(state)
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { selectedItemId}=useAppContext();
  
    const getSubserviceData = async () => {
     
      try {
       
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
        setSubServiceData(data)
        console.log(data);

       state = data;

      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };
 

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL.GET_ALL_HOME_PROVINCES}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const provincesData = await response.json();
      setProvinces(provincesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinceId = e.target.value;
    setprovinceId(selectedProvinceId);
   
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("on submit  ")
     setonload(true);
    e.preventDefault();
    getSubserviceData();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="province_id" className="block text-sm font-medium text-gray-600">
            Province
          </label>
          <select
            id="province_id"
            name="province_id"
            value={auth_provinceId}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.province}
              </option>
            ))}
          </select>
          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
      {/* Display data based on selectedProvinceId */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ld-gap-6 md-gap-6 gap-6 mt-10 px-4 md:px-10 py-10">
        {subServiceData.map((item, index) => (
          <div key={index} className="flex flex-col justify-between rounded-lg bg-white overflow-hidden shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
            <img src={item.subsvs_img} alt="Photo" className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <div className="font-bold text-customRed text-xl mb-2">{item.subsvs_name}</div>
              <p className="text-gray-700 text-base flex-1">{item.subsvs_short_desc}</p>
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
