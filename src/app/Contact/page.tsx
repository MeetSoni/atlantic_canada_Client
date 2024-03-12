import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faRunning, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface InfoCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
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
  return (
    <div className="bg-gradient-to-r from-grad_red to-grad_white py-12 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex md:p-6 lg:p-6 p-6 md:max-w-6xl">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl text-gray-800 font-bold">Contact Us</h1>
            <p className="text-gray-600 mt-4">Any questions or remarks? Just write us a message!</p>
          </div>
          <div className="mt-8">
            <form>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0 md:w-1/2">
                  <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter a valid email address"/>
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter your Name"/>
                </div>
              </div>
              <div className="text-center mt-8">
                <button className="btn-transform bg-customRed hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto md:flex mt-12 md:space-x-4 md:max-w-6xl">
        <InfoCard icon={faRunning} title="ABOUT CLUB" description="Running Guide Workouts" />
        <InfoCard icon={faPhone} title="PHONE (LANDLINE)" description="+1-674-897-0340\n+1-674-897-0341" />
        <InfoCard icon={faMapMarkerAlt} title="OUR OFFICE LOCATION" description="The Atlantic Canada Consultation\nToronto Downtown, ON, CANADA" />
      </div>
    </div>
  );
}

export default Contact;
