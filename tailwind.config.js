module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
        'open-sans': ['OpenSans', 'sans-serif'],
      },
      colors: {
        primary: '#031B4E',
        secondary: {
          500: '#0076E5',
          600: '#339CFF',
          700: '#66B5FF',
          800: '#99CEFF',
          900: '#CCE6FF',
        },
        neutral: {
          200: '#282F3E',
          500: '#58688A',
          600: '#B6BBD6',
          700: '#F1F2F8',
          0: '#FFFFFF',
        },
        semantic: {
          error: '#E00505',
          success: '#009444',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
