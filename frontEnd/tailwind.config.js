/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      "brand1": "#4529E6",
      "brand2": "#5126EA",
      "brand3": "#B0A6F0",
      "brand4": "#EDEAFD",
      "grey": {
        "0": "#0B0B0D",
        "1": "#212529",
        "2": "#495057",
        "3": "#868E96",
        "4": "#ADB5BD",
        "5": "#CED4DA",
        "6": "#DEE2E6",
        "7": "#E9ECEF",
        "8": "#F1F3F5",
        "9": "#F8F9FA",
        "10": "#FDFDFD",
      },
      "white": "#FFFFFF",
      "alert": {
        "1": "#CD2B31",
        "2": "#FDD8D8",
        "3": "#FFE5E5",
      },
      "success": {
        "1": "#18794E",
        "2": "#CCEBD7",
        "3": "#DDF3E4"
      }
    },
    fontFamily: {
      "inter": ["inter", "sans-serif"],
      "lexend": ["lexend", "sans-serif"],
    },
    fontSize: {
      "h0": "44px",
      "h1": "36px",
      "h2": "32px",
      "h3": "28px",
      "h4": "24px",
      "h5": "20px",
      "h6": "16px",
      "b0": "16px",
      "b1": "14px",
    }
  },
  plugins: [],
}
