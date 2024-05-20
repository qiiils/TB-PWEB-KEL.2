/** @type {import('tailwindcss').Config} */
module.exports = {
    // configure the paths to all of your source files
    content: ["./views/*.{html,js,ejs}", "node_modules/preline/dist/*.js"],
  
    // enable dark mode via class strategy
    darkMode: 'class',
  
    theme: {
        colors: {
            'blue': '#0085FF',
            black: {
                DEFAULT: '#212121',
                dark: '#000000',
            }
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
      extend: {
        // extend base Tailwind CSS utility classes
      },
    },
  
    // add plugins to your Tailwind CSS project
    plugins: [
      require('@tailwindcss/forms'),
      require('preline/plugin'),
    ],
  }