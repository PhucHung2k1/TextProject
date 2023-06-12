/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1520px',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '13xl': '2rem',
    },
    extend: {
      colors: {
        'mango-primary-blue': '#00BED6',
        'mango-text-black-1': '#262626',
        'mango-text-blue-1': '#2F54EB',
        'mango-text-blue-2': '#0288D1',
        'mango-text-gray-1': '#A7A7A7',
        'mango-text-gray-2': '#737277',
        'mango-gray-light-1': '#D5D7DA',
        'text-title': '#1F1F23',
        'text-secondary': '#737277',
        'text-disable': '#C5C4C9',
        'text-primary-dark': '#00ADC3',
        'mango-gray-light-2': '#F5F5F5',
        'icon-color': '#5C5D6A',
        'primary-dark': '#404044',
        26: '#262626',
        50: '#505050',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        'background-paper-elevation-1': '#ecedee',
        'primary-states-hover': 'rgba(0, 189, 214, 0.08)',
        'text-primary': '#404044',
        'switch-knobfill': '#fafafa',
        'switch-slidefill': '#000',
        'line-light': '#eaeaf0',
        'primary-main': '#00bdd6',
        'primary-contrast': '#fff',
      },
    },
  },
  plugins: [],
};
