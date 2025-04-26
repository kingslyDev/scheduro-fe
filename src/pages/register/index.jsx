import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
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

    if (!formData.agree)
      newErrors.agree = "You must agree to the terms and privacy policy";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: Illustration Section */}
      <div className="hidden md:block h-screen w-full m-0 p-0 overflow-hidden">
        <div
          className="absolute left-0 bottom-0 h-full w-1/2"
          style={{
            backgroundImage: "url('/images/register.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "left bottom",
          }}
        />
      </div>

      {/* RIGHT: Form Section */}
      <div className="h-screen overflow-y-auto p-8 py-16">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#6387CE] mb-8 text-center">Create an account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${errors.username ? "border-red-500" : "focus:ring-2 focus:ring-[#6387CE]"
                  }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${errors.email ? "border-red-500" : "focus:ring-2 focus:ring-[#6387CE]"
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${errors.phone ? "border-red-500" : "focus:ring-2 focus:ring-[#6387CE]"
                  }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block font-semibold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${errors.password ? "border-red-500" : "focus:ring-2 focus:ring-[#6387CE]"
                  }`}
              />
              <div
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">
              <label className="block font-semibold mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${errors.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-[#6387CE]"
                  }`}
              />
              <div
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start text-sm gap-2 mt-2 mb-1">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="accent-[#6387CE] mt-1"
              />
              <label>
                I agree with the{" "}
                <a href="#" className="text-[#6387CE]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#6387CE]">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agree && (
              <p className="text-sm text-red-500 mb-4">{errors.agree}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-50 bg-[#4F6EC1] text-white font-medium py-2 rounded-md mt-8 hover:bg-[#6387CE] transition mx-auto block"
            >
              Register
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-[#6387CE] font-medium hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
