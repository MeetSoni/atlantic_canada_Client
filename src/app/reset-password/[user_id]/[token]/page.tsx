'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Specific_service from '@/components/spec_service/page';
import { useParams } from 'next/navigation';
import API_URL from '@/constants/constant';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface FAQ {
  que: string;
  ans: string;
  // Add other properties if needed
}


interface PageProps {
  params: {
    user_id: string;
    token: string;
  };
}

function Page({ params }: PageProps) {
const[passwordError,setPasswordError]=useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_confirmation, setpassword_confirmation] = useState<string>('');
 
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const navigate = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL.RESETPASSWORD}/${params.user_id}/${params.token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, password_confirmation: password_confirmation }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.status);

      if(data.status != "failed"){
        setPasswordError(data.message);
        navigate.push('/');

      }

      else{
        setPasswordError(data.message);

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Ensure loading state is false on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when the fetch begins
      try {
        console.log(`http://localhost:3000/reset-password/${params.user_id}/${params.token}`);

        const response = await fetch(
            `${API_URL.RESETPASSWORD}/${params.user_id}/${params.token}`,
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

        const data = await response.json();
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Ensure loading state is false on error
      }
    };

    fetchData();
  }, [params.user_id, params.token]); // Depend on params to refetch if they change

  return (
    <>
      <div className=" p-10 min-h-screen flex items-center justify-center bg-gray-100  bg-gradient-to-r from-grad_red to-grad_white">
        
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Change Password</h2>
       

          <form id="signup-form" className="space-y-4" onSubmit={handleSubmit}>

            {passwordError && <h1>{passwordError}</h1>}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
         

            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
              <input 
              
              type="password"
              value={password_confirmation}
              onChange={(e) => setpassword_confirmation(e.target.value)}
              
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            
            
            
            <button type="submit" className="w-full bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
              Set Password
            </button>
          </form>
        

        </div>
      </div>
    </>
  );
}

export default Page;
