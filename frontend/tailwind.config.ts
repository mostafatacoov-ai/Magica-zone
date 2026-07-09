import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'magica-navy': {
          50: '#f2f3f7',
          100: '#e1e3ec',
          200: '#c5c9d9',
          300: '#9ea5bf',
          400: '#717ca1',
          500: '#525f87',
          600: '#404a6f',
          700: '#343c5b',
          800: '#2d334d',
          900: '#282d41',
          950: '#1b1c2b', // Closest to text/eagle
        },
        'magica-orange': {
          50: '#fff7ed',
          100: '#ffeadd',
          200: '#ffcfb4',
          300: '#ffaa82',
          400: '#ff7c46',
          500: '#f26b27', // Base orange
          600: '#e64f14',
          700: '#bf3911',
          800: '#982f16',
          900: '#7a2915',
          950: '#411208',
        },
        'magica-teal': {
          50: '#f2f8fa',
          100: '#e0eff4',
          200: '#c5e0ea',
          300: '#9bc9d9',
          400: '#6aa8c0',
          500: '#4b8ca8',
          600: '#3c708a',
          700: '#345b72',
          800: '#2d4b5e',
          900: '#284050',
          950: '#152936',
        },
        'magica-purple': {
          50: '#f7f3f9',
          100: '#efe6f3',
          200: '#e0cde7',
          300: '#cba8d5',
          400: '#b17dbf',
          500: '#9454a7',
          600: '#7c408e',
          700: '#643273',
          800: '#532b5e',
          900: '#46274e',
          950: '#2a1231',
        },
        'magica-yellow': {
          50: '#fff9eb',
          100: '#fff2c6',
          200: '#ffe188',
          300: '#ffcb4a',
          400: '#ffb520',
          500: '#fbb040',
          600: '#e28d09',
          700: '#bc690b',
          800: '#975112',
          900: '#7a4213',
          950: '#462104',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

// Trigger tailwind rebuild
