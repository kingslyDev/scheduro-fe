import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

const Navbar = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-gray-50 py-4 px-5 flex items-center justify-between mt-5 sticky top-0 z-50 ${className}`}>
      {/* Logo and Brand */}
      <div className="flex items-center ml-2 md:ml-[85px]">
        <Image src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742279884/logo_ovq2n3.svg" alt="Scheduro Logo" width={48} height={48} className="object-contain" />
        <span className="text-[19px] md:text-[26px] font-bold ml-2 font-poppins">Scheduro</span>
      </div>

      {/* Mobile Try it now button and Menu */}
      <div className="flex items-center gap-3 md:hidden">
        {/* Mobile Try it now button */}
        <Link href="/dashboard" passHref>
          <Button className="bg-[#6387CE] text-white px-3 py-2 rounded-lg shadow-md hover:bg-[#4058A4] text-sm">
            Try it now
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center p-2" onClick={toggleMenu} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6387CE">
            {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

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
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex flex-1 items-center justify-between">
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center">
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

        <div className="ml-8 mr-20">
          <Link href="/dashboard" passHref>
            <Button className="bg-[#6387CE] text-white px-6 py-6 rounded-lg shadow-md hover:bg-[#4058A4]">
              <span className="text-base font-medium">Try it now</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
