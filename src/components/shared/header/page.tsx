'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar/page';

export default function Header() {
  const navigate = useRouter();

  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignup=()=>{
    navigate.push('/signUp');
  }

  const handleLogin=()=>{
    navigate.push('/login');
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-white h-13 z-10 shadow-lg top-0 text-b_head bg-gradient-to-r from-grad_red to-grad_white`}>
      {/* Header */}
      <nav className={` p-7  lg:flex md:block sm:block items-center justify-between transition-all duration-300 ${scrolling ? 'py-1' : 'py-3'}`}>
        <div className="font-bold ">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={1}
          />
        </div>
        <div className="text-2xl text-center text-customRed font-bold ">
          <h1>Atlantic Canada Settlers</h1>
        </div>
  
       {/* <nav className={`bg-white  bg-gradient-to-r from-grad_red to-grad_white  p-4 mx-auto flex items-center justify-between sticky top-0 w-full transition-all duration-300 ${scrolling ? 'py-1' : 'py-4'}`}> */}
       <div className="text-xl font-bold">
          {/* Navbar Menu List */}
          <ul className={`hidden ml-10 lg:flex space-x-10 text-m`}>
            <li>
              <a href="/" className="text-customRed 	">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-customRed">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="text-customRed">
                Services
              </a>
          
            </li>
            <li>
              <a href="/videos" className="text-customRed">
                Videos
              </a>
            </li>

            <li>
              <a href="/Contact" className="text-customRed">
                Contact
              </a>
            </li>

          </ul>
        </div>
  
        {/* Login and Signup Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button onClick={handleLogin}  className="text-customRed bg-transparent border border-solid border-customRed py-2 px-4 rounded hover:bg-customRed hover:text-white transition duration-300">
            Login
          </button>
          <button onClick={handleSignup} className="text-white bg-customRed py-2 px-4 rounded hover:bg-white hover:text-customRed hover:border hover:border-solid hover:border-customRed transition duration-300">
            Signup
          </button>
        </div>
  
        {/* Mobile Menu Button */}
        <div className="lg:hidden text-end">
          <button onClick={toggleMobileMenu} className="text-customRed mx-2" aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}>
            {mobileMenuOpen ? '' : 'Menu'}
          </button>
        </div>
      </nav>
  
      {/* Sidebar - Conditionally rendered based on mobileMenuOpen state */}
      {mobileMenuOpen && <Sidebar closeMenu={closeMobileMenu} />}
    </div>
  );
  
}
