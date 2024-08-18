/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 1px 3px -2px black",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #A160A9, #FDFDFD)",
        "offer-gradient": "linear-gradient(90deg, #FEDBD9, #FF7235)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".custom-backdrop": {
          "background-color": "rgba(255, 255, 255, 0.6)",
          "backdrop-filter": "blur(5px)",
          "-webkit-backdrop-filter": "blur(20px)",
        },
      });
    },
  ],
};
