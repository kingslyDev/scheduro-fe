import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10,}$/.test(formData.phone))
      newErrors.phone = "Phone number must be at least 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", formData);
    }
  };

<div className="flex h-screen"></div>
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT: Form */}
        <div className="h-screen overflow-y-auto px-8 py-6 flex justify-center items-start">
          <div className="w-full max-w-md">
            {/* Judul */}
            <h2 className="text-3xl font-bold text-[#6387CE] mb-8 text-center">
              Start Your Journey !
            </h2>
  
            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full border rounded px-4 py-2"
                />
                <p className="text-sm text-red-500 mt-1">Username is required</p>
              </div>
  
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full border rounded px-4 py-2"
                />
                <p className="text-sm text-red-500 mt-1">Email is required</p>
              </div>
  
              <div>
                <label className="block font-semibold">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border rounded px-4 py-2"
                />
                <p className="text-sm text-red-500 mt-1">Phone number is required</p>
              </div>
  
              <div>
                <label className="block font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full border rounded px-4 py-2"
                />
                <p className="text-sm text-red-500 mt-1">Password is required</p>
              </div>
  
              <div>
                <label className="block font-semibold">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="w-full border rounded px-4 py-2"
                />
                <p className="text-sm text-red-500 mt-1">Confirm your password</p>
              </div>
  
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <label className="text-sm">
                  I agree with the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
                </label>
              </div>
  
              <button
                type="submit"
                className="w-full bg-[#6387CE] text-white py-2 rounded font-semibold"
              >
                Register
              </button>
              <p className="text-center text-sm mt-4">
  Already have an account?{' '}
  <a href="/login" className="text-blue-600 hover:underline">
    Login
  </a>
</p>
            </form>
          </div>
        </div>

  {/* RIGHT: Image */}
<div className="hidden md:block h-screen w-full relative">
  <div
    className="absolute inset-0 bg-no-repeat bg-right bg-cover"
    style={{
      backgroundImage: "url('/images/register.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover", 
      backgroundPosition: "right center", 
    }}
  />
</div>
      </div>
    );
  }
  
export default Register;
