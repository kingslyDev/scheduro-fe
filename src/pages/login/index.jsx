"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      terms: "",
    };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ email, password, agreeToTerms });
      // Proceed with login logic
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Illustration */}
      <div
        className="hidden md:flex flex-col justify-center items-center relative w-1/2 min-h-screen -ml-8"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dy8fe8tbe/image/upload/v1745079384/background_kajdxm.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-8 z-10">
          <h1 className="text-xl md:text-xl font-bold text-[#333333] mb-4">
            Too Busy? Just <span className="text-[#6387CE]">Scheduro</span> It!
          </h1>
          <p className="text-[#333333] text-base md:text-lg mb-6">
            Stay organized, stay stress-free.
          </p>
          <Image
            src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1745053743/login_ae8k5s.svg"
            alt="Login Illustration"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 justify-center items-center px-4 py-8 overflow-auto">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-3xl font-bold text-[#6387CE]">Welcome Back!</h1>
            <p className="text-gray-600 mb-10">
              Login now & start managing your time and tasks more efficiently!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-[#6387CE]"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-[#6387CE] mb-6"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-40 bg-[#4F6EC1] text-white font-medium py-2 rounded-md mt-4 hover:bg-[#6387CE] transition mx-auto block"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#6387CE] hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
