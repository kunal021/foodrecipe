/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FFFFFF",
          text: "#000000",
          primary: "#007AFF",
          secondary: "#5856D6",
          card: "#F2F2F7",
        },
        dark: {
          background: "#000000",
          text: "#FFFFFF",
          primary: "#0A84FF",
          secondary: "#5E5CE6",
          card: "#1C1C1E",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
