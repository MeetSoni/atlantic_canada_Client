"use client"
import React from 'react'

function Footer() {
  return (
   <>
    <div className="bg-black text-white p-8">
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Company</h2>
        <ul>
          <li>About Us</li>
          <li>Contact</li>
          <li>Careers</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Services</h2>
        <ul>
          <li>Banking</li>
          <li>Housing</li>
          <li>Mobile Internet</li>
          <li>Gas Station</li>

        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4">
        <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
        <p>Subscribe to our newsletter for updates and special offers.</p>
        <input
          type="email"
          placeholder="Your email"
          className="bg-gray-700 text-white mt-2 p-2 w-full rounded"
        />
        <button className="bg-customRed text-white mt-2 px-4 py-2 rounded-full hover:bg-blue-600">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  <div className="mt-8 border-t border-gray-600 pt-4">
    <p className="text-center text-sm">
      &copy; 2024 Canada settlers. All rights reserved.
    </p>
  </div>
</div>

   </>
  )
}

export default Footer;
