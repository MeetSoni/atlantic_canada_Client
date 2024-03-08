'use client';
import React from "react";
import Image from "next/image";

const Page: React.FC = () => {
  const cities = [
    { name: "New Brenswik", image: "/images/city1.jpeg" },
    { name: "Prince Edward Island", image: "/images/city2.jpeg" },
    { name: "Newfoundland", image: "/images/city3.jpeg" },
    { name: "Nova Scotia", image: "/images/city4.jpeg" },
    // Add more cities as needed
  ];

  return (
    <>
      {/* Main Container */}
      <div className="container bg-white mt-10 md:mt-20 lg:mt-40 p-5 md:p-10 shadow-lg md:shadow-2xl">

        {/* Sub Container */}
        <div className="container mx-auto">

          {/* Heading Division */}
          <div>
            <h1 className="text-customRed text-center font-extrabold text-xl md:text-2xl lg:text-3xl p-2">
              Major Provinces of Atlantic Canada
            </h1>
          </div>

          {/* Image card division */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {cities.map((city, index) => (
              <div
                key={index}
                className="relative p-2 md:p-4 shadow-md rounded-3xl group transition-transform mt-4 hover:shadow-lg hover:scale-105 duration-300 ease-out"
              >
                <Image
                  className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-3xl"
                  src={city.image}
                  alt={`City ${index + 1}`}
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gray-200 opacity-75 rounded-3xl transition-opacity duration-300 hover:opacity-0 transition-delay-300">
                  <h1 className="text-customRed mt-6 md:mt-12 text-center font-extrabold text-base md:text-lg lg:text-xl p-2 opacity-100 border border-gray-200 transition-opacity">
                    {city.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Immigration Help Section */}
      <div className="bg-white bg-opacity-50 p-6 rounded-md shadow-lg w-full flex flex-col md:flex-row">

        {/* First Card (Photo) */}
        <div className="card flex-1 md:w-1/2">
          <Image src="/images/girl.jpeg" alt="Photo 1" className="card-img" width={600} height={400} />
        </div>

        {/* Second Card (Content) */}
        <div className="card flex-1 p-3 md:w-1/2">
          <h1 className="text-customRed text-center font-extrabold text-xl md:text-2xl lg:text-3xl p-2">
            Reach out for Immigration help
          </h1>
          <p className="text-center md:text-left">
            Tap into a wealth of knowledge and expertise by reaching out to our recommended immigration consultants. Your journey to Atlantic Canada becomes smoother with personalized guidance from professionals who understand the intricacies of the immigration landscape.
          </p>
          
          <ul className="text-customRed mt-4 md:mt-6">
            <li>👉 Study permit</li>
            <li>👉 Work permit</li>
            <li>👉 Permanent Residence</li>
            <li>👉 Citizenship</li>
            <li>👉 SIN number</li>
          </ul>
          
          <div className="mx-auto text-center mt-6 md:mt-10">
            <button className="text-white bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
              Consult now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
