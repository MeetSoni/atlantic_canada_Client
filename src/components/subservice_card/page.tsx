import React,{use, useEffect,useState} from 'react';
import { useAppContext } from '@/context';
import Link from 'next/link';
import  API_URL  from '@/constants/constant';

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
  const [provinceId,setselectedProvinceId]=useState('')


  useEffect(() => {
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
        console.log("All province data",provincesData)
        setProvinces(provincesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    if(provinceId != ''){
       
    }
  
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinceId = e.target.value;
    setprovinceId(selectedProvinceId);
  };

  return (
    <>
     <div>
        <div>
          <label htmlFor="province_id" className="block text-sm font-medium text-gray-600">
            Province
          </label>
          <select
            id="province_id"
            name="province_id"
            value={auth_provinceId} // Use auth_provinceId as the value for the dropdown
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
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ld-gap-6 md-gap-6 gap-6 mt-10 px-4 md:px-10 py-10 '>
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
