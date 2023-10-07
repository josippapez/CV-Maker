module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './modules/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#121230',
        'almost-black-input': '#2f3132',
        'almost-black': '#1e1f1f',
        'almost-white': '#adaca9',
        'slight-gray': '#deded4',
      },
    },
  },
  plugins: [],
};
