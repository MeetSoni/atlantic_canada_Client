// Sidebar.js
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';



interface SidebarProps {
  closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMenu }) => {
  const {authToken,setauthToken}=useAppContext();
  const {auth_userName,setauthuserName}=useAppContext();
  const {auth_provinceId,setprovinceId}=useAppContext();
  const {profilePic}=useAppContext();
  const navigate = useRouter();
  
  const handleSignup=()=>{
    navigate.push('/signUp');
  }

  const handleprofile = () => {
    navigate.push(`/profile/${auth_userName}`);
  };
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
        <a href="#" className="text-white my-2">
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
        <div className="hidden lg:flex space-x-4">
          {authToken=='' && <button onClick={handleLogin}  className="text-customRed bg-transparent border border-solid border-customRed py-2 px-4 rounded hover:bg-customRed hover:text-white transition duration-300">
            Login
          </button>}
         {/* {authToken ==='' &&  <button onClick={handleSignup} className="text-white bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
            Signup
          </button>} */}
       {/* { authToken!='' &&    <button onClick={handlelogout} className="text-white bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
            logout
          </button>} */}

          { authToken!='' &&    <button onClick={handleprofile} style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%', width: 40, height: 40 }}>
  <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</button>
}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
