// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom-folder>/**/*.{js,jsx,ts,tsx}", './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        lightblue: "#edeff7",
        darkblue: "#19204f",
        gray:"#f0f0f0",
        white:"#fff",
        blue:"#4d77bf"

      },
    },

    plugins: [],
  }
}