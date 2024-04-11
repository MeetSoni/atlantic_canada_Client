import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import API_URL  from "@/constants/constant";

interface Province {
  _id: string;
  province: string;
  description: string;
  images: string[];
}

const Page: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

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
  
        const data: Province[] = await response.json();
        setProvinces(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 

  return (
    <>
      <div className="p-5 md:p-10 shadow-lg md:shadow-2xl">
        <div className="container mx-auto">
          <div>
            <h1 className="text-customRed text-center font-extrabold text-xl mt-10 md:text-2xl lg:text-3xl p-2">
              Major Provinces of Atlantic Canada
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {provinces.map((province, index) => (
                <div
                key={index}
                className="relative p-2 md:p-4 shadow-md rounded-3xl group transition-transform mt-4 hover:shadow-lg hover:scale-105 duration-300 ease-out"
              >
                <img
                  className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-3xl"
                  src={province.images[1]}
                  alt={`City ${index + 1}`}
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gray-200 opacity-20 rounded-3xl transition-opacity duration-300 hover:opacity-0 transition-delay-300">
                  <h1 className="text-customRed mt-6 md:mt-12 text-center font-extrabold text-base md:text-lg lg:text-xl p-2 opacity-100 border border-gray-200 transition-opacity">
                    {province.province}
                  </h1>
                </div>
                <Link href={`/province/${province._id}`}>
                  <button className="absolute inset-0 z-10"></button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-opacity-50 p-9 rounded-md shadow-lg text-black bg-white w-full flex flex-col md:flex-row">
        <div className="p-9 card flex-1 md:w-1/2">
          <Image src="/images/girl.jpeg" alt="Photo 1" className="card-img" width={600} height={400} />
        </div>
        <div className="p-9 card flex-1 p-3 md:w-1/2">
          <h1 className="text-black text-center font-extrabold text-xl md:text-2xl lg:text-3xl p-2">
            Reach out for Immigration help
          </h1>
          <p className="text-center md:text-left">
            Tap into a wealth of knowledge and expertise by reaching out to our recommended immigration consultants. Your journey to Atlantic Canada becomes smoother with personalized guidance from professionals who understand the intricacies of the immigration landscape.
          </p>
          <ul className="text-customRed mt-4 md:mt-6">
            <li>👉 Study permit</li>
            <li>👉 Permanent Residence</li>
            <li>👉 Citizenship</li>
            <li>👉 SIN number</li>
          </ul>
          <div className="mx-auto text-center mt-6 md:mt-10">
            <a href="/Contact">
            <button className="text-white bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
              Consult now
            </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
