/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Untuk Next.js dengan Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Untuk komponen
    "./app/**/*.{js,ts,jsx,tsx}", // Untuk Next.js dengan App Router (Opsional)
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Menambahkan font Poppins ke Tailwind
      },
    },
  },
  plugins: [],
};
