module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  media: true,
  theme: {
    extend: {
      colors: {
        red: "#DE212B",
        black: "#000000",
        white: "#ffffff",
        normal: "#FCFCFD",
        primary: "#FEAA53",
        secondary: "#7A24A1",
        transparent: "transparent"
      },
      fontFamily: {
        title: ["Risque", "cursive"],
        text: ["Poppins", "sans-serif"]
      },
      screens: {
        tablet: "910px"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("tailwind-scrollbar")]
};
