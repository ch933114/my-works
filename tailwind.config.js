/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#131516',
        secondary: '#2E4365',
        accent1: '#E5902C',
        accent2: '#F3D58D',
        'primary-light': '#EBDDC5',
        'secondary-light': '#C3B49F',
        danger: '#E65C45',
        success: '#A4B8AF',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        Han: ['"Source Han Serif"', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        md: '1rem', // 16px (等於 base)
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        '4xl': '2.5rem', // 40px
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
    },
  },
  plugins: [],
}
