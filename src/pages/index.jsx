import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const ScheduloWebsite = () => {
  return (
      <div className="font-poppins bg-white">
<div className="font-poppins bg-white">
  {/* Navigation */}
  <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex flex-wrap justify-between items-center px-6 md:px-16 py-4">
    {/* Logo */}
    <div className="flex items-center">
      <img
        src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png"
        alt="Scheduro Logo"
        className="w-12 h-12"
      />
      <span className="ml-2 text-2xl font-bold text-[#6387CE]">Scheduro</span>
    </div>

    {/* Menu */}
    <ul className="hidden md:flex space-x-6 lg:space-x-12 text-gray-800">
  <li>
    <a href="#home" className="font-medium hover:text-[#6387CE]">
      Home
    </a>
  </li>
  <li>
    <a href="#about" className="font-medium hover:text-[#6387CE]">
      About
    </a>
  </li>
  <li>
    <a href="#features" className="font-medium hover:text-[#6387CE]">
      Features
    </a>
  </li>
  <li>
    <a href="#reviews" className="font-medium hover:text-[#6387CE]">
      Reviews
    </a>
  </li>
</ul>

    {/* Tombol Login & Register */}
    <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
      <button className="border border-[#6387CE] bg-[#6387CE] text-white px-6 md:px-8 py-2 rounded-full hover:bg-[#4058A4]">
        Login
      </button>
      <button className="border border-[#6387CE] bg-white text-[#6387CE] px-6 md:px-8 py-2 rounded-full hover:bg-[#f6f6f6]">
        Register
      </button>
    </div>
  </nav>
</div>

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
          <img
            src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287250/char_1_1_ugxw4a.png"
            alt="Character with productivity icons"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-[180px] bg-gradient-to-r from-[#6387CE] to-[#455CB0]"></div>

      {/* About Section */}
<section id="about" className="py-16 px-8 md:px-16">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl text-[#6387CE] text-center font-extrabold mb-8">ABOUT</h2>
    
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
      {/* Bagian Gambar */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287251/iPhone_16_Pro_1_tqqkm2.png"
          alt="Scheduro app on iPhone"
          className="w-72 md:w-96"
        />
      </div>

      {/* Bagian Teks */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 px-4">
        <p className="text-lg font-semibold text-black leading-relaxed">
          Scheduro makes scheduling easy and boosts productivity. Manage meetings, appointments, and tasks without hassle. 
          With smart automation and an intuitive design, stay organized and efficient in one powerful app.
        </p>
        <p className="text-lg font-semibold text-black mt-4">
          Take control of your time effortlessly with Scheduro!
        </p>
      </div>
    </div>
  </div>
</section>

  {/* Features Section */}
    <section id="features" className="py-16 px-8 md:px-16 bg-white">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl text-[#6387CE] text-center font-extrabold mb-8">FEATURES</h2>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Everything You Need to Stay on Track</h3>
            <p className="text-gray-600">
              Manage your schedule with ease and stay ahead effortlessly!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
  {/* Feature 1 */}
  <div className="flex flex-col items-start">
    <div className="bg-[#6387CE] text-white p-4 rounded-lg mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    </div>
    <h4 className="text-lg font-bold mb-2">Task Breakdown with AI</h4>
    <p className="text-gray-600">
      Automate and simplify your tasks for better efficiency and productivity.
    </p>
  </div>

  {/* Feature 2 */}
  <div className="flex flex-col items-start">
    <div className="bg-[#6387CE] text-white p-4 rounded-lg mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <h4 className="text-lg font-bold mb-2">Integrated with Calendar</h4>
    <p className="text-gray-600">
      Sync your schedule seamlessly and stay on top of important tasks.
    </p>
  </div>

  {/* Feature 3 */}
  <div className="flex flex-col items-start">
    <div className="bg-[#6387CE] text-white p-4 rounded-lg mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    </div>
    <h4 className="text-lg font-bold mb-2">A simple and intuitive Kanban Board</h4>
    <p className="text-gray-600">
      Visualize your workflow, track progress, and stay organized effortlessly.
    </p>
  </div>

  {/* Feature 4 */}
  <div className="flex flex-col items-start">
    <div className="bg-[#6387CE] text-white p-4 rounded-lg mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
    <h4 className="text-lg font-bold mb-2">Notifications integrated with WhatsApp</h4>
    <p className="text-gray-600">
      Get real-time updates and never miss important tasks or reminders.
    </p>
  </div>
</div>

</div>
</section> 
<div id="reviews" className="flex flex-col items-center mt-12 px-4 md:px-16 mb-16">
  <h2 className="text-2xl text-[#6387CE] text-center font-extrabold mb-8">REVIEW</h2>
  <h3 className="text-2xl font-bold mb-6">What do users say?</h3>
  <p className="text-gray-600 mt-2 text-center max-w-2xl">
    Our users’ experiences while using the various outstanding features available.
  </p>

  {/* Grid untuk Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center w-full mt-8">
    {/* Card 1 */}
    <div className="group relative w-full max-w-sm md:w-auto h-[200px] bg-white text-black p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#6387CE] will-change-transform flex flex-col justify-center items-center text-center">
      <h4 className="font-bold mb-2 transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
        Hasan Junal
      </h4>
      <p className="text-gray-600 text-sm transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
      Scheduro helps me stay on top of my assignments. The AI task breakdown makes big projects more manageable, and the WhatsApp reminders keep me from missing deadlines!
      </p>
    </div>

    {/* Card 2 */}
    <div className="group relative w-full max-w-sm md:w-auto h-[200px] bg-white text-black p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#6387CE] will-change-transform flex flex-col justify-center items-center text-center">
      <h4 className="font-bold mb-2 transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
        Mirza Fathir
      </h4>
      <p className="text-gray-600 text-sm transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
      I love the simple UI and Kanban Board. It keeps my projects organized, but I’d love to see a team collaboration feature in the future!
      </p>
    </div>

    {/* Card 3 */}
    <div className="group relative w-full max-w-sm md:w-auto h-[200px] bg-white text-black p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#6387CE] will-change-transform flex flex-col justify-center items-center text-center">
      <h4 className="font-bold mb-2 transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
        Azka Mujaddid
      </h4>
      <p className="text-gray-600 text-sm transition-all duration-300 transform group-hover:scale-105 group-hover:text-white">
      Scheduro has improved my time management. The task prioritization feature is great—Google Calendar integration would make it even better!
      </p>
    </div>
  </div>

  {/* Back to Top - Dijamin Tengah */}
  <div className="w-full flex justify-center items-center mt-12">
  <a href="#home" className="px-6 py-2 bg-gray-200 rounded-lg text-black hover:bg-gray-300 transition-all duration-300">
    Back to Top ↑
  </a>
</div>
  
  {/* Garis pemisah */}
  <div className="w-full border-t border-gray-300 my-10"></div>

  {/* Footer */}
  <p className="text-gray-500 text-sm">© Copyright 2025 Scheduro. All Rights Reserved</p>
</div>

</div>
);
};

export default ScheduloWebsite;
