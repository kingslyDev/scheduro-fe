import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Login Submitted:", formData);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen h-screen">
      {/* LEFT: Form */}
      <div className="flex items-center justify-center p-8 mb-9">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold text-[#6387CE] mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-center mb-8 text-l">
            Login Now & Start Managing Your Time and Tasks More Efficiently!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-[#6387CE]"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
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
                className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-[#6387CE] mb-7"
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-40 bg-[#4F6EC1] text-white font-medium py-2 rounded-md mt-4 hover:bg-[#6387CE] transition mx-auto block"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-[#6387CE] font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* LEFT: Illustration */}
      <div className="hidden md:block h-screen w-full m-0 p-0 overflow-hidden">
        <div
          className="absolute right-0 bottom-0 h-full w-1/2"
          style={{
            backgroundImage: "url('/images/login.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "right bottom",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
