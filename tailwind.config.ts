import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        btn:{
          'primary':'hsl(248, 32%, 49%)',
        }
      },
      backgroundImage: {
        'bg-base': 'url("/images/bg-intro-desktop.png")',
        'emptyTextBox': 'url(/images/icon-error.svg)',
      },
    },
  },
  plugins: [],
};
export default config;
