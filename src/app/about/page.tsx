'use client'
import API_URL  from '@/constants/constant';
import React, { useEffect, useState } from 'react';

interface TeamMember {
  about_emp_img: string;
  about_emp_name: string;
  about_emp_job_title: string;
}

interface AboutUsInfo {
  title: string;
  description: string;
  team_members: TeamMember[];
}

function About() {
  // State to store fetched data with TypeScript type
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutUsInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL.ABOUT_US, {
          
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data[0]);
        setAboutUsInfo(data[0].about_us); // Adjusted to match your data structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!aboutUsInfo) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <>
      {/* Hero and Mission Sections... */}
      <div className=" text-gray-800 text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">{aboutUsInfo.title}</h1>
        <p className="text-black mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 shadow-lg p-6 bg-gradient-to-r from-grad_gray to-grad_white rounded-lg">
          {aboutUsInfo.description}
        </p>
      </div>

      {/* Mission Statement with Image */}
      <div className="flex flex-wrap items-center ">
        <div className="w-full md:w-1/2 p-5">
          <img src="https://newlifevisa.com/wp-content/uploads/2019/10/138.jpg" alt="Mission" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 p-5">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-black mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 shadow-lg p-6 bg-gradient-to-r from-grad_gray to-grad_white rounded-lg">
            {aboutUsInfo.description}
          </p>
        </div>
      </div>

      {/* Team Section with Dynamic Data */}
      <div className="py-10 ">
        <div className="container mx-auto px-2">
          <h2 className="text-3xl font-bold text-center mb-5">Meet Our Team</h2>
          <div className="grid grid-cols-1 p-5  md:grid-cols-2 lg:grid-cols-3 gap-2">
            {aboutUsInfo.team_members.map((member, index) => (
              <div key={index} className="p-2">
                <div className="bg-gradient-to-r from-grad_gray to-grad_white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img src={member.about_emp_img} alt={member.about_emp_name} className="w-full" style={{ height: '300px', objectFit: 'cover' }} />
                  <div className="p-4 ">
                    <h3 className="font-headline text-lg mb-1">{member.about_emp_name}</h3>
                    <p className="text-gray-600 text-sm ">{member.about_emp_job_title}</p>
                    {/* Optionally, display the description if needed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
