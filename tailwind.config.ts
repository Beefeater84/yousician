import type { Config } from "tailwindcss";
import { BREAKPOINTS } from "./src/application/constants/constants";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/featured/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
      },
    },
  },
  plugins: [],
};
export default config;
