import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-gray-50 py-4 px-5 flex items-center justify-between mt-5 sticky top-0 z-50 ${className}`}>
      {/* Logo and Brand */}
      <div className="flex items-center ml-2 md:ml-[85px]">
        <Image src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png" alt="Scheduro Logo" width={48} height={48} className="object-contain" />
        <span className="text-[19px] md:text-[26px] font-[650] ml-2 font-poppins">Scheduro</span>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden flex items-center p-2" onClick={toggleMenu} aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6387CE">
          {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile & Tablet Menu (This section now uses the toggle button) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-white p-4 shadow-md z-50 border-t border-gray-100`}>
        <ul className="flex flex-col space-y-4 mb-4">
          <li>
            <Link href="/" className="font-poppins hover:text-[#6387CE] transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="font-poppins hover:text-[#6387CE] transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="#feature" className="font-poppins hover:text-[#6387CE] transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
          </li>
        </ul>
        <div className="flex flex-col space-y-3">
          <Link href="/login" className="border-[#6387CE] bg-[#6387CE] text-white py-2 px-4 rounded-full text-[16px] font-poppins flex justify-center items-center" onClick={() => setIsMenuOpen(false)} style={{ borderRadius: '40px', borderWidth: '2px' }}>
            Login
          </Link>
          <Link
            href="/register"
            className="border border-[#6387CE] text-[#6387CE] py-2 px-4 rounded-full text-[16px] font-poppins flex justify-center items-center"
            onClick={() => setIsMenuOpen(false)}
            style={{ borderRadius: '40px', borderWidth: '2px' }}
          >
            Register
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex items-center ml-[100px]">
          <li className="mx-6">
            <Link href="/" className="font-poppins hover:text-[#6387CE] transition-colors">
              Home
            </Link>
          </li>
          <li className="mx-6">
            <Link href="#about" className="font-poppins hover:text-[#6387CE] transition-colors">
              About
            </Link>
          </li>
          <li className="mx-6">
            <Link href="#feature" className="font-poppins hover:text-[#6387CE] transition-colors">
              Features
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center mr-2 md:mr-[85px]">
        <Link href="/login" className="border-[#6387CE] bg-[#6387CE] text-white py-1.5 px-4 rounded-full text-[16px] font-poppins flex justify-center items-center" style={{ width: '120px', height: '40px', borderRadius: '40px', borderWidth: '2px' }}>
          Login
        </Link>
        <Link
          href="/register"
          className="border border-[#6387CE] text-[#6387CE] py-1.5 px-4 rounded-full ml-6 text-[16px] font-poppins flex justify-center items-center"
          style={{ width: '120px', height: '40px', borderRadius: '40px', borderWidth: '2px' }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
