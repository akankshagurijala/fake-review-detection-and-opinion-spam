/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          hover: '#1F293D'
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        emerald: {
          500: '#10B981',
          400: '#34D399',
        },
        rose: {
          500: '#F43F5E',
          400: '#FB7185',
        },
        amber: {
          500: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
