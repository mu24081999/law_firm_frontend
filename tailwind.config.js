import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  // darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    ".flowbite-react/class-list.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [flowbiteReact],
};
