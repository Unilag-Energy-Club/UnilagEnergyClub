/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgba(233, 194, 2, 1)',
          dark: 'rgb(45, 42, 24)',
        },
        secondary: {
          DEFAULT: 'rgba(32, 32, 32, 1)',
        },
        mainText: 'rgba(45, 45, 45, 1)',
        subtext: 'rgba(81, 99, 113, 1)',
        sectionBg1: 'rgba(233, 194, 2, 1)',
        sectionBg2: 'rgba(255, 255, 255, 1)',
        border: 'rgba(0, 0, 0, 0.12)',
        boxBg1: 'rgba(217, 217, 217, 1)',
        boxBg2: 'rgba(233, 194, 2, 1)',
        iconColor: 'rgba(236, 253, 243, 1)',
        bg1: 'rgba(248, 248, 248)',
        bg2: 'rgba(255, 255, 255)',
        socialIconLinkBg: 'rgba(255, 255, 255, 1)',
        socialIconLinkClr: 'rgba(70, 70, 70, 1)',
      },
      fontFamily: {
        'mayo-regular': ['MayoClinicSansRegular', 'Helvetica', 'Arial', 'sans-serif'],
        'mayo-bold': ['MayoClinicSansBold', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 25px 30px 0px rgba(0, 65, 232, 0.1)',
      },
      borderRadius: {
        'custom': '1.5rem',
        'custom-lg': '50px',
      },
      keyframes: {
        arrowAnimation: {
          '0%': { opacity: '1' },
          '50%': { transform: 'translateX(20px) translateY(-20px)', opacity: '0' },
          '51%': { transform: 'translateX(-20px) translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        arrowEnter: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'arrow': 'arrowAnimation 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'arrow-enter': 'arrowEnter 0.3s ease-in-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
