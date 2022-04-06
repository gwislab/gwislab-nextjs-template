module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  media: true,
  theme: {
    extend: {
      colors: {
        'primary': '#091D38',
        'placeholder': '#031F4690',
        'nav': '#021023',
        'secondary': "#FFCB27",
        'scrollBar': '#69788D',
        'facebook': '#039BE6',
        'instagram': '#FB0D4B',
        'twitter': '#0288D1',
        'linkedin': '#0288D1',
        'whatsapp': '#40C351',
        'behance': '#000000',
      },
      fontFamily: {
        'title': ['Risque', 'cursive'],
        'text': ['Poppins', 'sans-serif']
      },
      screens: {
        'tablet': '910px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar')],
}
