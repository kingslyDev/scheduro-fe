import React from 'react';
import Navbar from '../components/Navbar';

const ScheduloWebsite = () => {
  return (
    <div className="font-poppins bg-white">
      {/* Navigation */}
      <Navbar />

      <main className="pt-20"></main>

      {/* Hero Section */}
      <div id="home"></div>
      <section className="flex flex-col md:flex-row justify-between items-center px-16 py-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Seamless
            <br />
            <span className="text-[#6387CE]">Scheduling</span>,
            <br />
            Ultimate
            <br />
            <span className="text-[#6387CE]">Productivity</span>
          </h1>
          <p className="my-6 text-lg text-gray-700">
            Scheduro helps you manage your tasks and time effectively,
            <br />
            giving you the control to focus on what truly matters.
          </p>
          <button className="bg-[#6387CE] text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-[#4058A4]">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3v18l14-9z" />
            </svg>
            <div className="text-left flex flex-col">
              <span className="text-sm">GET IT ON</span>
              <span className="text-base font-medium">Google Play</span>
            </div>
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287250/char_1_1_ugxw4a.png" alt="Character with productivity icons" className="w-72 md:w-96" />
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-[180px] bg-gradient-to-r from-[#6387CE] to-[#455CB0]"></div>

      {/* About Section */}
      <section id="about" className="py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl text-[#6387CE] text-center font-extrabold mb-8">ABOUT</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="w-full md:w-1/2 flex justify-center">
              <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287251/iPhone_16_Pro_1_tqqkm2.png" alt="Scheduro app on iPhone" className="w-72 md:w-96" />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 px-4">
              <p className="text-lg font-semibold text-black leading-relaxed">
                Scheduro makes scheduling easy and boosts productivity. Manage meetings, appointments, and tasks without hassle. With smart automation and an intuitive design, stay organized and efficient in one powerful app.
              </p>
              <p className="text-lg font-semibold text-black mt-4">Take control of your time effortlessly with Scheduro!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduloWebsite;
