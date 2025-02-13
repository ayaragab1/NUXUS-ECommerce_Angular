/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}",
     "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem', // Adds padding to the container
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}

