import React from 'react';

const ScheduloWebsite = () => {
  return (
    <div className="font-['Poppins'] bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-16 py-4">
        <div className="flex items-center">
          <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png" alt="Scheduro Logo" className="w-12 h-12" />
          <span className="ml-2 text-2xl font-bold">Scheduro</span>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-12">
            <li>
              <a href="#" className="font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="font-medium">
                About
              </a>
            </li>
            <li>
              <a href="#" className="font-medium">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="font-medium">
                Review
              </a>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4">
          <button className="bg-[#5271C2] text-white px-8 py-2 rounded-full">Login</button>
          <button className="border border-[#5271C2] text-[#5271C2] px-8 py-2 rounded-full">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex justify-between items-center px-16 py-12">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">
            Seamless
            <br />
            <span className="text-[#6B89D6]">Scheduling</span>,
            <br />
            Ultimate
            <br />
            <span className="text-[#6B89D6]">Productivity</span>
          </h1>
          <p className="my-6 text-lg">
            Scheduro helps you manage your task and time effectively,
            <br />
            giving you the control to focus on what truly matters.
          </p>
          <button className="bg-[#5271C2] text-white px-6 py-3 rounded-lg flex items-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3v18l14-9z" />
            </svg>
            <div>
              <div className="text-sm">GET IT ON</div>
              <div className="text-base font-medium">Google Play</div>
            </div>
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287250/char_1_1_ugxw4a.png" alt="Character with productivity icons" className="w-96" />
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-[180px] bg-gradient-to-r from-[#6387CE] to-[#455CB0]"></div>

      {/* About Section */}
      <section className="py-16">
        <h2 className="text-3xl text-[#5271C2] text-center font-medium mb-16">ABOUT</h2>

        <div className="flex justify-center items-center px-16">
          <div className="w-1/2 flex justify-center">
            <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287251/iPhone_16_Pro_1_tqqkm2.png" alt="Scheduro app on iPhone" className="w-96" />
          </div>
          <div className="w-1/2">
            <p className="text-lg mb-8">
              Scheduro makes scheduling easy and boosts productivity. Manage meetings, appointments, and tasks without hassle. With smart automation and an intuitive design, stay organized and efficient in one powerful app.
            </p>
            <p className="text-lg font-semibold">Take control of your time effortlessly with Scheduro!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduloWebsite;
