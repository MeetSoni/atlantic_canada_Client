// Sidebar.js
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';


interface SidebarProps {
  closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMenu }) => {
  const navigate = useRouter();
  
  const handleSignup=()=>{
    navigate.push('/signUp');
  }

  const handleLogin=()=>{
    navigate.push('/login');
  }
  return (
    <div className="fixed z-10	 inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="flex justify-end p-4">
        <button className="text-white" onClick={closeMenu}>
          Close
        </button>
      </div>
      <div className="flex flex-col items-center p-4">
        <a href="/" className="text-white my-2">
          Home
        </a>
        <a href="/about" className="text-white my-2">
          About
        </a>
        <a href="/services" className="text-white my-2">
          Services
        </a>
        <a href="/Contact" className="text-white my-2">
          Contact
        </a>
      <a href="/login">
      <button onClick={handleLogin}  className="text-white mt-2 bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
            Login
          </button>
      </a>
        <a href="/signUp">
        <button onClick={handleSignup} className="text-white mt-2 bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
            Signup
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
