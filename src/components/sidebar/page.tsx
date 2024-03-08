// Sidebar.js
import React from 'react';
interface SidebarProps {
  closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMenu }) => {
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
        <a href="#" className="text-white my-2">
          About
        </a>
        <a href="#" className="text-white my-2">
          Services
        </a>
        <a href="#" className="text-white my-2">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
