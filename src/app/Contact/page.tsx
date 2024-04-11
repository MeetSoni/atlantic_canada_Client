'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faRunning, faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import API_URL from '@/constants/constant';

interface InfoCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex-1 flex items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 md:w-1/3 m-2">
      <div className="mr-4">
        <div className="rounded-full bg-customRed text-white p-5 animate-pulse">
          <FontAwesomeIcon icon={icon} className="h-6 w-6" />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Your code for sending the email...
    const response = await fetch(`${API_URL.SEND_CONTACT_INFO}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    });


    // Assuming email is sent successfully
    if(response.ok){
      setShowPopup(true);
    }

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  return (
    <div className=" py-12 px-6 lg:px-20">
      {showPopup && (
        <div className="bg-green-200 border border-green-600 text-green-900 px-4 py-2 rounded-md shadow-md my-4">
          Email sent successfully!
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex md:p-6 lg:p-6 p-6 md:max-w-6xl">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl text-gray-800 font-bold">Contact Us</h1>
            <p className="text-gray-600 mt-4">Any questions or remarks? Just write us a message!</p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0 md:w-1/2">
                  <input type="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter a valid email address" name='email' value={formData.email} onChange={(e)=>handleChange(e)}required />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter your Name" name='name' value={formData.name }onChange={(e)=>handleChange(e)} required />
                </div>
              </div>
              <div className="mb-6">
                <textarea className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Write your message here" rows={4} name='message' value={formData.message} onChange={(e)=>handleChange(e)} required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn-transform bg-customRed hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto md:flex mt-12 md:space-x-4 md:max-w-6xl">
       
        <InfoCard icon={faPhone} title="PHONE (LANDLINE)" description="+1 647-535-8974" />
        <InfoCard icon={faMapMarkerAlt} title="OUR OFFICE LOCATION" description="The Atlantic Canada Consultation\nToronto Downtown, ON, CANADA" />
        <InfoCard icon={faEnvelope} title="SEND US A MESSAGE" description="atlanticconnectapp@gmail.com" />
      </div>
    </div>
  );
}

export default Contact;
