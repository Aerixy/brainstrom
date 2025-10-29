import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Tambahkan warna neon khusus
      colors: {
        neon: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // cyan
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          // pink neon
          pink: {
            500: "#ff00ff",
            600: "#ff33ff",
          },
        },
      },
      // Efek glow neon
      boxShadow: {
        neon: "0 0 5px #0ea5e9, 0 0 15px #0ea5e9, 0 0 30px #0ea5e9",
        "neon-pink":
          "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff",
      },
      animation: {
        'gradient-slow': 'gradient 15s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'wiggle': "wiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
    },
  },
  plugins: [],
};

export default config;