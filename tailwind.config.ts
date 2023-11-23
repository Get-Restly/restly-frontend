import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
} satisfies Config;
