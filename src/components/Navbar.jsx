// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-5 flex items-center justify-between">
      {/* Logo and Brand */}
      <div className="flex items-center ml-[85px]">
        <Image src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png" alt="Scheduro Logo" width={50} height={50} className="object-contain" />
        <span className="text-[28px] font-[700] ml-2 font-poppins">Scheduro</span>
      </div>

      {/* Navigation Links - Centered */}
      <div className="flex-1 flex justify-center">
        <ul className="flex items-center ml-[100px]">
          <li className="mx-6">
            <Link href="/" className="font-poppins hover:text-[#6387CE] transition-colors">
              Home
            </Link>
          </li>
          <li className="mx-6">
            <Link href="/about" className="font-poppins hover:text-[#6387CE] transition-colors">
              About
            </Link>
          </li>
          <li className="mx-6">
            <Link href="/features" className="font-poppins hover:text-[#6387CE] transition-colors">
              Features
            </Link>
          </li>
          <li className="mx-6">
            <Link href="/review" className="font-poppins hover:text-[#6387CE] transition-colors">
              Review
            </Link>
          </li>
        </ul>
      </div>

      {/* Auth Buttons - Styling Applied */}
      <div className="flex items-center mr-[85px]">
        <Link href="/login" className="bg-[#6387CE] text-white py-2 px-6 rounded-full text-[20px] font-poppins flex justify-center items-center" style={{ width: '148px', height: '52px', borderRadius: '50px', borderWidth: '2px' }}>
          Login
        </Link>
        <Link
          href="/register"
          className="border border-[#6387CE] text-[#6387CE] py-2 px-6 rounded-full ml-6 text-[20px] font-poppins flex justify-center items-center"
          style={{ width: '148px', height: '52px', borderRadius: '50px', borderWidth: '2px' }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
